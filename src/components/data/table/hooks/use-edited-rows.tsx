import {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";

interface EditedRows {
  [rowId: string]: Record<string, any>;
}

interface EditedRowsContextType {
  updateCell: (rowId: string, field: string, value: any) => void;
  getEdits: (rowId: string) => Record<string, any> | undefined;
  getAllEdits: () => Record<string, Record<string, any>>;
  subscribe: (rowId: string, callback: () => void) => () => void;
  subscribeToAll: (callback: () => void) => () => void;
  removeRowEdits: (rowId: string) => void;
}

const EditedRowsContext = createContext<EditedRowsContextType>({
  updateCell: () => {},
  getEdits: () => undefined,
  getAllEdits: () => ({}),
  subscribe: () => () => {},
  subscribeToAll: () => () => {},
  removeRowEdits: () => {},
});

export const EditedRowsProvider = ({ children }: { children: ReactNode }) => {
  // Store the actual edited data
  const editedRowsRef = useRef<EditedRows>({});

  // Registry of listeners: rowId -> Set of callbacks
  const listenersRef = useRef<Record<string, Set<() => void>>>({});

  // Global listeners for any change
  const globalListenersRef = useRef<Set<() => void>>(new Set());

  const updateCell = useCallback((rowId: string, field: string, value: any) => {
    // 1. Update the data
    if (!editedRowsRef.current[rowId]) {
      editedRowsRef.current[rowId] = {};
    }

    // Check if value actually changed to avoid unnecessary notifies
    if (editedRowsRef.current[rowId][field] === value) return;

    editedRowsRef.current[rowId][field] = value;

    // 2. Notify row listeners
    if (listenersRef.current[rowId]) {
      listenersRef.current[rowId].forEach(cb => cb());
    }

    // 3. Notify global listeners
    if (globalListenersRef.current.size > 0) {
      globalListenersRef.current.forEach(cb => cb());
    }
  }, []);

  const getEdits = useCallback((rowId: string) => {
    return editedRowsRef.current[rowId];
  }, []);

  const getAllEdits = useCallback(() => {
    return editedRowsRef.current;
  }, []);

  const removeRowEdits = useCallback((rowId: string) => {
    if (editedRowsRef.current[rowId]) {
      delete editedRowsRef.current[rowId];
      // Notify listeners so they can update (e.g. revert to original)
      if (listenersRef.current[rowId]) {
        listenersRef.current[rowId].forEach(cb => cb());
      }
      // Notify global listeners
      if (globalListenersRef.current.size > 0) {
        globalListenersRef.current.forEach(cb => cb());
      }
    }
  }, []);

  const subscribe = useCallback((rowId: string, callback: () => void) => {
    if (!listenersRef.current[rowId]) {
      listenersRef.current[rowId] = new Set();
    }
    listenersRef.current[rowId].add(callback);

    // Unsubscribe function
    return () => {
      if (listenersRef.current[rowId]) {
        listenersRef.current[rowId].delete(callback);
        if (listenersRef.current[rowId].size === 0) {
          delete listenersRef.current[rowId];
        }
      }
    };
  }, []);

  const subscribeToAll = useCallback((callback: () => void) => {
    globalListenersRef.current.add(callback);
    return () => {
      globalListenersRef.current.delete(callback);
    };
  }, []);

  return (
    <EditedRowsContext.Provider
      value={{ updateCell, getEdits, getAllEdits, subscribe, subscribeToAll, removeRowEdits }}
    >
      {children}
    </EditedRowsContext.Provider>
  );
};

// Hook for components to subscribe to edits for a specific row
export const useEditedRow = (rowId: string) => {
  const context = useContext(EditedRowsContext);

  // Local state to force re-render when subscription fires
  // We use a simple counter
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = context.subscribe(rowId, () => {
      setTick(t => t + 1);
    });
    return unsubscribe;
  }, [context, rowId]);

  return context.getEdits(rowId);
};

export const useEditedRowsContext = () => {
  return useContext(EditedRowsContext);
};

export const useUpdateEditedCell = () => {
  return useContext(EditedRowsContext).updateCell;
};
