import { useEffect } from "react";
import { get } from "lodash-es";
import { UseTableInitializationProps } from "../props";

/**
 * Hook to handle table initialization and active row synchronization logic
 */
export const useTableInitialization = ({
  internalDataset,
  wmTableColumns,
  cellState,
  gridfirstrowselect,
  useRadioSelect,
  useMultiSelect,
  setActiveRow,
  selectedRowId,
  selectedRowIds,
  activeRowIds,
  formName,
  editmode,
  listener,
}: UseTableInitializationProps) => {
  // Initialize cell state with dataset values for editable columns
  useEffect(() => {
    if (!internalDataset || internalDataset.length === 0) return;

    // Find columns that have edit widgets (they might have cell state)
    const editableColumns = wmTableColumns.filter(col => col.editWidgetType && !col.readonly);

    // Initialize cell state for each row and editable column
    internalDataset.forEach(row => {
      const rowId = row._wmTableRowId || String(row.id) || "";

      editableColumns.forEach(column => {
        const fieldName = column.field;
        const currentValue = get(row, fieldName);
        cellState.setValue(["cells", rowId, fieldName], currentValue);
      });
    });
  }, [internalDataset, wmTableColumns, cellState]);

  // First row active logic (when no selection mode is active)
  useEffect(() => {
    if (gridfirstrowselect && !useRadioSelect && !useMultiSelect && internalDataset.length > 0) {
      const firstRowData = internalDataset[0];
      const firstRowId = firstRowData._wmTableRowId || String(firstRowData.id) || String(0);
      setActiveRow(firstRowId);
    }
  }, [gridfirstrowselect, useRadioSelect, useMultiSelect, internalDataset, setActiveRow]);

  /**
   * Sync active rows with selected rows for multiselect mode
   * When multiselect is enabled, all selected rows should be marked as active
   */
  useEffect(() => {
    if (useMultiSelect) {
      // Set all selected rows as active
      setActiveRow(selectedRowIds);
    }
  }, [selectedRowIds, useMultiSelect, setActiveRow]);

  /**
   * Sync active row with selected row for radioselect mode
   * When radioselect is enabled, the selected row should be marked as active
   */
  useEffect(() => {
    if (useRadioSelect && selectedRowId) {
      // Set the selected row as active
      setActiveRow(selectedRowId);
    }
  }, [selectedRowId, useRadioSelect, setActiveRow]);

  // Monitor when there are no active rows
  useEffect(() => {
    // Check if there are no active rows
    const hasNoActiveRows = !activeRowIds || activeRowIds.length === 0;

    if (hasNoActiveRows) {
      // Handle the case when there are no active rows
      // You can customize this logic based on your requirements
      if (listener && editmode === "form" && formName) {
        setTimeout(() => {
          listener.Widgets[formName]?.setShowViewMode(true);
        }, 10);
      }
    } else {
      if (activeRowIds.length > 0 && listener && editmode === "form" && formName) {
        setTimeout(() => {
          const formWidget = listener.Widgets[formName];
          const getRow = internalDataset.find(row => {
            if (row._wmTableRowId === activeRowIds[0]) return true;
          });
          formWidget?.edit(getRow);
          formWidget?.setShowViewMode(true);
        }, 10);
      }
    }
  }, [activeRowIds, internalDataset, gridfirstrowselect]);
};
