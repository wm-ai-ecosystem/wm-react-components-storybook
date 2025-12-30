import { useCallback } from "react";
import { UseRowHandlersProps, UseRowHandlersReturn } from "../props";
import { cleanRowData } from "../utils";

/**
 * Hook to consolidate all row click handlers
 */
export const useRowHandlers = ({
  editingRowId,
  isAddingNewRow,
  handleRowSelectionClick,
  handleTableEditRowClick,
  handleRowActiveClick,
  onRowclick,
  useRadioSelect = false,
  useMultiSelect = false,
  isrowselectable = false,
}: UseRowHandlersProps): UseRowHandlersReturn => {
  const handleRowClick = useCallback(
    (event: React.MouseEvent, rowData: any, rowId: string) => {
      // Determine if selection mode is enabled
      const hasSelectionMode = useRadioSelect || useMultiSelect;

      // Handle row selection based on isrowselectable setting
      // When isrowselectable is false and selection mode is enabled,
      // only allow selection through the radio/checkbox column (not row click)
      let isSelectionHandled = false;
      if (hasSelectionMode && isrowselectable) {
        // Current behavior: clicking anywhere on row selects it
        isSelectionHandled = handleRowSelectionClick(event, rowId, rowData);
      } else if (!hasSelectionMode) {
        // No selection mode enabled, just handle as normal (makes row active)
        isSelectionHandled = handleRowSelectionClick(event, rowId, rowData);
      }
      // When hasSelectionMode && !isrowselectable, skip row selection from row click
      // Selection will only happen through the radio/checkbox column click

      if (onRowclick) {
        onRowclick(event, {}, cleanRowData(rowData));
      }

      // Handle table edit row click (works for both inline and quickedit)
      handleTableEditRowClick(rowData, rowId);

      // Don't change active row if currently editing or adding new row
      const isEditingOrAdding = editingRowId !== null || isAddingNewRow;

      // Handle active row state
      // When isrowselectable is false and selection mode is enabled,
      // don't set the active class on row click - only through radio/checkbox column
      if (hasSelectionMode && !isrowselectable) {
        // Skip setting active row when isrowselectable is false with selection mode
        return;
      }

      handleRowActiveClick(rowId, isSelectionHandled, isEditingOrAdding);
    },
    [
      editingRowId,
      isAddingNewRow,
      handleRowSelectionClick,
      handleTableEditRowClick,
      handleRowActiveClick,
      onRowclick,
      useRadioSelect,
      useMultiSelect,
      isrowselectable,
    ]
  );

  return {
    handleRowClick,
  };
};
