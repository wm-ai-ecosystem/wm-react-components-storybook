import { useCallback, useEffect, useRef, useState } from "react";
import { UseRowSelectionProps, UseRowSelectionReturn } from "../props";
import {
  isInteractiveElement,
  getRowIdsFromDataset,
  rowExistsInDataset,
  selectionStateHelpers,
} from "../utils/selectionUtils";
import { saveTableState, getTableState } from "../utils/table-helpers";
import { StorageType } from "@wavemaker/react-runtime/utils/state-persistance";

export const useRowSelection = ({
  radioselect = false,
  multiselect = false,
  gridfirstrowselect = false,
  internalDataset,
  cellState,
  name,
  statehandler,
  initialActualPageSize,
  getTableState: getTableCurrentState,
}: UseRowSelectionProps): UseRowSelectionReturn => {
  // Keep a ref to always have the latest dataset
  const datasetRef = useRef(internalDataset);
  useEffect(() => {
    datasetRef.current = internalDataset;
  }, [internalDataset]);

  // State only for forcing updates when needed
  const [, forceUpdate] = useState({});

  // Priority rule: If both radioselect and multiselect are true, multiselect takes precedence
  const useMultiSelect = multiselect;
  const useRadioSelect = radioselect && !multiselect;

  // Helper function to save state immediately
  const saveStateImmediate = useCallback(() => {
    if (!statehandler || !getTableCurrentState) {
      return;
    }

    const { currentPage, currentPageSize } = getTableCurrentState();

    // Get current selections
    // If not multiselect, treat as radio select (single selection)
    const selectedIds = useMultiSelect
      ? selectionStateHelpers.getMultiSelection(cellState)
      : selectionStateHelpers.getRadioSelection(cellState)
        ? [selectionStateHelpers.getRadioSelection(cellState)!]
        : [];

    // Find selected indices in current dataset
    const selectedIndices: number[] = [];
    selectedIds.forEach(rowId => {
      const index = internalDataset.findIndex(
        row => row._wmTableRowId === rowId || row.id === rowId
      );
      if (index >= 0) {
        selectedIndices.push(index);
      }
    });

    // Build selected items with page info
    const selectedItemsWithPage = selectedIndices.map(idx => ({
      page: currentPage,
      index: idx,
    }));

    const stateToSave: any = {
      pagination: currentPage,
      selectedItem: selectedItemsWithPage,
    };

    // Include actualPageSize if available
    if (initialActualPageSize !== undefined) {
      stateToSave.actualpagesize = initialActualPageSize;
    }

    // Check if this is default state
    const isDefaultState = currentPage === 1 && selectedIds.length === 0;

    if (isDefaultState) {
      // Clear state if returning to default
      saveTableState(name, statehandler as StorageType, {});
    } else {
      // Get existing state
      const existingState = getTableState(name, statehandler as StorageType);

      // For radio select or default mode (when neither multi nor radio is explicitly enabled),
      // don't merge - just replace with current selection
      if (useRadioSelect || !useMultiSelect) {
        // Radio select or default mode should only have one item selected at a time
        stateToSave.selectedItem = selectedItemsWithPage;
      } else {
        // For multi-select, merge selected items from different pages
        if (existingState && existingState.selectedItem) {
          const otherPageSelections = existingState.selectedItem.filter(
            (item: { page: number; index: number }) => item.page !== currentPage
          );
          stateToSave.selectedItem = [...otherPageSelections, ...selectedItemsWithPage];
        }
      }

      // Preserve pagesize if exists
      if (existingState?.pagesize) {
        stateToSave.pagesize = existingState.pagesize;
      }

      // Preserve actualpagesize if exists and not in new state
      if (!stateToSave.actualpagesize && existingState?.actualpagesize) {
        stateToSave.actualpagesize = existingState.actualpagesize;
      }

      saveTableState(name, statehandler as StorageType, stateToSave);
    }
  }, [
    statehandler,
    getTableCurrentState,
    name,
    useMultiSelect,
    useRadioSelect,
    cellState,
    internalDataset,
    initialActualPageSize,
  ]);

  // Handle radio selection changes
  const handleRadioSelection = useCallback(
    (rowId: string, rowData?: any) => {
      selectionStateHelpers.setRadioSelection(cellState, rowId);
      forceUpdate({});
      saveStateImmediate(); // Save state immediately
    },
    [cellState, saveStateImmediate]
  );

  // Handle multiselect checkbox changes
  const handleMultiSelection = useCallback(
    (rowId: string, rowData: any, isSelected: boolean) => {
      if (isSelected) {
        selectionStateHelpers.addToMultiSelection(cellState, rowId);
      } else {
        selectionStateHelpers.removeFromMultiSelection(cellState, rowId);
      }
      forceUpdate({});
      saveStateImmediate(); // Save state immediately
    },
    [cellState, saveStateImmediate]
  );

  // Toggle all rows selection for multiselect
  const handleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        // Use ref to ensure we always have the latest dataset
        const allRowIds = getRowIdsFromDataset(datasetRef.current);
        selectionStateHelpers.setAllMultiSelection(cellState, allRowIds);
      } else {
        selectionStateHelpers.clearMultiSelection(cellState);
      }
      forceUpdate({});
      saveStateImmediate(); // Save state immediately
    },
    [cellState, saveStateImmediate]
  );

  // Handle row selection on click
  const handleRowSelectionClick = useCallback(
    (event: React.MouseEvent, rowId: string, rowData: any): boolean => {
      // If clicking on an interactive element, don't handle row selection
      if (isInteractiveElement(event)) {
        return false;
      }

      // Handle multiselect if enabled
      if (useMultiSelect) {
        selectionStateHelpers.toggleMultiSelection(cellState, rowId);
        saveStateImmediate(); // Save state immediately
        return true;
      }
      // Handle radio selection if enabled (and multiselect is not)
      else {
        handleRadioSelection(rowId, rowData);
        // No need to call saveStateImmediate here as handleRadioSelection already does it
        return true;
      }
    },
    [useMultiSelect, useRadioSelect, handleRadioSelection, cellState, saveStateImmediate]
  );

  // First row selection logic
  useEffect(() => {
    // Only proceed if gridfirstrowselect is true and we have data
    if (gridfirstrowselect && internalDataset.length > 0) {
      const firstRowData = internalDataset[0];
      const firstRowId = firstRowData._wmTableRowId || String(firstRowData.id) || String(0);

      if (useMultiSelect) {
        // For multiselect, only add to selection if no rows are currently selected
        const selectedIds = selectionStateHelpers.getMultiSelection(cellState);
        if (selectedIds.length === 0) {
          selectionStateHelpers.addToMultiSelection(cellState, firstRowId);
        }
      } else {
        // For radio select or default mode (when neither is explicitly enabled),
        // only select the first row if no row is currently selected
        // or if the currently selected row no longer exists in the dataset
        const currentSelectedId = selectionStateHelpers.getRadioSelection(cellState);
        if (!currentSelectedId || !rowExistsInDataset(currentSelectedId, internalDataset)) {
          handleRadioSelection(firstRowId, firstRowData);
        }
      }
    }
  }, [
    gridfirstrowselect,
    internalDataset,
    useMultiSelect,
    useRadioSelect,
    handleRadioSelection,
    cellState,
  ]);

  // Check if a row is selected - memoized
  const isRowSelected = useCallback(
    (rowId: string): boolean => {
      return selectionStateHelpers.isRowSelected(cellState, rowId, useMultiSelect, useRadioSelect);
    },
    [useMultiSelect, useRadioSelect, cellState]
  );

  // Get selected values without forcing re-renders
  const selectedRowId = useRadioSelect ? selectionStateHelpers.getRadioSelection(cellState) : null;
  const selectedRowIds = useMultiSelect ? selectionStateHelpers.getMultiSelection(cellState) : [];

  return {
    selectedRowId,
    selectedRowIds,
    useMultiSelect,
    useRadioSelect,
    handleRadioSelection,
    handleMultiSelection,
    handleSelectAll,
    handleRowSelectionClick,
    isRowSelected,
    isInteractiveElement,
  };
};
