import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  // Track if initial first row selection has been done (for gridfirstrowselect)
  const initialSelectionDoneRef = useRef(false);

  // State only for forcing updates when needed
  const [updateTrigger, forceUpdate] = useState({});

  // Priority rule: If both radioselect and multiselect are true, multiselect takes precedence
  const useMultiSelect = multiselect;
  const useRadioSelect = radioselect && !multiselect;

  // Determine if any selection mode is active
  const hasSelectionMode = useRadioSelect || useMultiSelect;

  // Helper function to save state immediately
  const saveStateImmediate = useCallback(() => {
    if (!statehandler || !getTableCurrentState) {
      return;
    }

    const { currentPage, currentPageSize } = getTableCurrentState();

    // Get current selections from the unified array
    const selectedIds = selectionStateHelpers.getSelection(cellState);

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

      // For radio select, don't merge - just replace with current selection
      if (useRadioSelect) {
        stateToSave.selectedItem = selectedItemsWithPage;
      } else if (useMultiSelect) {
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

  // Handle selection for radio mode (replaces previous selection)
  const handleRadioSelection = useCallback(
    (rowId: string, rowData?: any) => {
      selectionStateHelpers.setSelection(cellState, rowId);
      forceUpdate({});
      saveStateImmediate();
    },
    [cellState, saveStateImmediate]
  );

  // Handle selection for multiselect mode (add/remove from selection)
  const handleMultiSelection = useCallback(
    (rowId: string, rowData: any, isSelected: boolean) => {
      if (isSelected) {
        selectionStateHelpers.addToSelection(cellState, rowId);
      } else {
        selectionStateHelpers.removeFromSelection(cellState, rowId);
      }
      forceUpdate({});
      saveStateImmediate();
    },
    [cellState, saveStateImmediate]
  );

  // Toggle all rows selection for multiselect
  const handleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        // Use ref to ensure we always have the latest dataset
        const allRowIds = getRowIdsFromDataset(datasetRef.current);
        selectionStateHelpers.setAllSelection(cellState, allRowIds);
      } else {
        selectionStateHelpers.clearSelection(cellState);
      }
      forceUpdate({});
      saveStateImmediate();
    },
    [cellState, saveStateImmediate]
  );

  // Handle row selection on click - unified handler
  const handleRowSelectionClick = useCallback(
    (event: React.MouseEvent, rowId: string, rowData: any): boolean => {
      // If clicking on an interactive element, don't handle row selection
      if (isInteractiveElement(event)) {
        return false;
      }

      // Handle based on selection mode
      if (useMultiSelect) {
        // Toggle selection for multiselect
        selectionStateHelpers.toggleSelection(cellState, rowId);
        forceUpdate({});
        saveStateImmediate();
        return true;
      } else {
        // Replace selection for radio select (or default mode)
        handleRadioSelection(rowId, rowData);
        return true;
      }
    },
    [useMultiSelect, handleRadioSelection, cellState, saveStateImmediate]
  );

  // First row selection logic - only runs once on initial render
  useEffect(() => {
    // Skip if initial selection has already been done
    if (initialSelectionDoneRef.current) {
      return;
    }

    // Only proceed if gridfirstrowselect is true and we have data
    if (gridfirstrowselect && internalDataset.length > 0) {
      const firstRowData = internalDataset[0];
      const firstRowId = firstRowData._wmTableRowId || String(firstRowData.id) || String(0);

      // Check if any row is currently selected
      const currentSelection = selectionStateHelpers.getSelection(cellState);

      if (currentSelection.length === 0) {
        // No selection - select the first row
        if (useMultiSelect) {
          selectionStateHelpers.addToSelection(cellState, firstRowId);
        } else {
          selectionStateHelpers.setSelection(cellState, firstRowId);
        }
        forceUpdate({});
        initialSelectionDoneRef.current = true;
      } else if (!useMultiSelect) {
        // For radio select, check if the selected row still exists
        const selectedId = currentSelection[0];
        if (!rowExistsInDataset(selectedId, internalDataset)) {
          selectionStateHelpers.setSelection(cellState, firstRowId);
          forceUpdate({});
          initialSelectionDoneRef.current = true;
        }
      }
    }
  }, [gridfirstrowselect, internalDataset, useMultiSelect, cellState]);

  // Check if a row is selected - memoized
  const isRowSelected = useCallback(
    (rowId: string): boolean => {
      return selectionStateHelpers.isRowSelected(cellState, rowId);
    },
    [cellState]
  );

  // Get selected row IDs - unified array that works for both modes
  // For radio select: contains at most 1 item
  // For multiselect: can contain multiple items
  const selectedRowIds = useMemo(() => {
    if (!hasSelectionMode) return [];
    return selectionStateHelpers.getSelection(cellState);
  }, [hasSelectionMode, cellState, updateTrigger]);

  return {
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
