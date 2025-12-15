import { useState, useRef, useCallback } from "react";
import { UseEditingStateReturn } from "../props";

/**
 * Hook to manage editing state for table rows
 */
export const useEditingState = (): UseEditingStateReturn => {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const editingRowDataRef = useRef<Record<string, any>>({});
  const newRowDataRef = useRef<Record<string, any>>({});

  const incrementSessionKey = useCallback(() => {
    setSessionKey(prev => prev + 1);
  }, []);

  const resetEditingData = useCallback(() => {
    editingRowDataRef.current = {};
    newRowDataRef.current = {};
  }, []);

  const isRowEditing = useCallback(
    (rowId: string): boolean => {
      return editingRowId === rowId;
    },
    [editingRowId]
  );

  return {
    editingRowId,
    isAddingNewRow,
    sessionKey,
    editingRowDataRef,
    newRowDataRef,
    setEditingRowId,
    setIsAddingNewRow,
    incrementSessionKey,
    resetEditingData,
    isRowEditing,
  };
};
