import { set, has, unset, cloneDeep, get, isEqual } from "lodash-es";
import { useRef, useCallback } from "react";
import { TableState, CellStateReturn } from "../props";

/**
 * Generic hook to manage table state
 * @param tableId - Unique identifier for the table instance (e.g., table name)
 */
export const useCellState = (tableId: string): CellStateReturn => {
  // Store state with initial structure
  const stateRef = useRef<TableState>({
    cells: {},
    selection: {
      selectedRowIds: [],
    },
  });

  // Get a value from the state using lodash path
  const getValue = useCallback(
    <T = any>(path: string | string[], defaultValue?: T): T | undefined => {
      return get(stateRef.current, path, defaultValue) as T;
    },
    []
  );

  // Set a value in the state using lodash path
  const setValue = useCallback(<T = any>(path: string | string[], value: T) => {
    const existingValue = get(stateRef.current, path);

    // Only set if different
    if (!isEqual(existingValue, value)) {
      set(stateRef.current, path, value);
    }
  }, []);

  // Update multiple fields at once
  const updateState = useCallback(
    (updates: Record<string, any> | ((currentState: TableState) => TableState)) => {
      if (typeof updates === "function") {
        stateRef.current = updates(cloneDeep(stateRef.current));
      } else {
        Object.entries(updates).forEach(([path, value]) => {
          set(stateRef.current, path, value);
        });
      }
    },
    []
  );

  // Check if a path exists
  const hasValue = useCallback((path: string | string[]): boolean => {
    return has(stateRef.current, path);
  }, []);

  // Remove a value
  const removeValue = useCallback((path: string | string[]) => {
    unset(stateRef.current, path);
  }, []);

  // Clear all state
  const clearState = useCallback(() => {
    stateRef.current = {
      cells: {},
      selection: {
        selectedRowIds: [],
      },
    };
  }, []);

  // Get the entire state
  const getState = useCallback((): TableState => {
    return cloneDeep(stateRef.current);
  }, []);

  // Set the entire state
  const setState = useCallback((state: TableState) => {
    stateRef.current = cloneDeep(state);
  }, []);

  return {
    getValue,
    setValue,
    updateState,
    hasValue,
    removeValue,
    clearState,
    getState,
    setState,
    tableId,
  };
};

// Helper functions for common operations
export const getCellValue = <T = any>(
  state: CellStateReturn,
  rowId: string,
  fieldName: string,
  defaultValue?: T
): T | undefined => {
  return state.getValue<T>(["cells", rowId, fieldName], defaultValue);
};

export const setCellValue = (
  state: CellStateReturn,
  rowId: string,
  fieldName: string,
  value: any
) => {
  state.setValue(["cells", rowId, fieldName], value);
};

// Unified selection helpers - uses single selectedRowIds array for both radio and multiselect
export const getSelectedRowIds = (state: CellStateReturn): string[] => {
  return state.getValue<string[]>("selection.selectedRowIds", []) ?? [];
};

export const setSelectedRowIds = (state: CellStateReturn, rowIds: string[]) => {
  state.setValue("selection.selectedRowIds", rowIds);
};
