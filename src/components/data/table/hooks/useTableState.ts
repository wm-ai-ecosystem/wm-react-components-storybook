import { useState, useCallback } from "react";
import { UseTableStateProps, UseTableStateReturn } from "../props";

export const useTableState = ({
  editMode = "none",
  radioselect = false,
  multiselect = false,
}: UseTableStateProps): UseTableStateReturn => {
  // State to track active rows - now supports multiple rows
  const [activeRowIds, setActiveRowIds] = useState<string[]>([]);

  // Handle row click for active state
  const handleRowActiveClick = useCallback(
    (rowId: string, isSelectionHandled: boolean, isEditingOrAdding: boolean): void => {
      // Don't change active row if currently editing a row or adding new row
      if (isEditingOrAdding) {
        return;
      }

      // For multiselect, active state is synced with selection state
      // so we don't need to manually toggle here
      if (multiselect) {
        // Active state will be synced via the useEffect in the main table component
        return;
      } else {
        // For single selection or no selection, replace with single row
        setActiveRowIds([rowId]);
      }
    },
    [multiselect]
  );

  // Check if a row is active
  const isRowActive = useCallback(
    (rowId: string, isSelected: boolean): boolean => {
      // Check if the row is in the active rows array
      return activeRowIds && Array.isArray(activeRowIds) && activeRowIds.includes(rowId);
    },
    [activeRowIds]
  );

  // Clear active rows
  const clearActiveRow = useCallback(() => {
    setActiveRowIds([]);
  }, []);

  // Set active rows directly - now accepts string, array, or null
  const setActiveRow = useCallback((rowIds: string | string[] | null) => {
    if (rowIds === null) {
      setActiveRowIds([]);
    } else if (typeof rowIds === "string" || typeof rowIds === "number") {
      setActiveRowIds([String(rowIds)]);
    } else if (Array.isArray(rowIds)) {
      setActiveRowIds(rowIds);
    } else {
      // Fallback for unexpected types
      console.warn("Unexpected type for rowIds:", typeof rowIds, rowIds);
      setActiveRowIds([]);
    }
  }, []);

  // For backwards compatibility, provide activeRowId as the first active row
  const activeRowId = activeRowIds && activeRowIds.length > 0 ? activeRowIds[0] : null;

  return {
    activeRowIds,
    setActiveRow,
    clearActiveRow,
    handleRowActiveClick,
    isRowActive,
  };
};
