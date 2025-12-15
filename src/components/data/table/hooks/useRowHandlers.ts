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
}: UseRowHandlersProps): UseRowHandlersReturn => {
  const handleRowClick = useCallback(
    (event: React.MouseEvent, rowData: any, rowId: string) => {
      // Handle row selection first
      const isSelectionHandled = handleRowSelectionClick(event, rowId, rowData);
      if (onRowclick) {
        onRowclick(event, {}, cleanRowData(rowData));
      }

      // Handle table edit row click (works for both inline and quickedit)
      handleTableEditRowClick(rowData, rowId);

      // Don't change active row if currently editing or adding new row
      const isEditingOrAdding = editingRowId !== null || isAddingNewRow;

      // Handle active row state
      handleRowActiveClick(rowId, isSelectionHandled, isEditingOrAdding);
    },
    [
      editingRowId,
      isAddingNewRow,
      handleRowSelectionClick,
      handleTableEditRowClick,
      handleRowActiveClick,
    ]
  );

  return {
    handleRowClick,
  };
};
