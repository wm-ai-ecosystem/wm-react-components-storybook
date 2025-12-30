import { useEffect, useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { StorageType } from "@wavemaker/react-runtime/utils/state-persistance";
import { saveTableState, clearTableState, getTableState } from "../utils/table-helpers";
import { UseTableStateManagerReturn } from "./useTableStateManager";
import { UNSUPPORTED_STATE_PERSISTENCE_TYPES } from "../utils/constants";

interface UseTableEffectsProps {
  // Data props
  name: string;
  navigation: string;
  datasource: any;
  internalDataset: any[];
  statehandler: StorageType;

  // Selection state - unified array for both radio and multiselect
  selectedRowIds: string[];

  // Pagination state
  currentPage: number;
  currentPageSize: number;

  // Sorting state
  sorting: SortingState;

  // Other props
  isGridEditMode: boolean;
  stateManager: UseTableStateManagerReturn;
  initialActualPageSize?: number;
}

export const useTableEffects = (props: UseTableEffectsProps) => {
  const {
    name,
    navigation,
    internalDataset,
    statehandler,
    selectedRowIds,
    currentPage,
    currentPageSize,
    isGridEditMode,
    stateManager,
  } = props;

  // State to track if we've restored state
  const [hasRestoredState, setHasRestoredState] = useState(false);
  const [restoredPageNumber, setRestoredPageNumber] = useState<number | null>(null);
  const [restoredSelectedRowIds, setRestoredSelectedRowIds] = useState<string[]>([]);
  const [restoredSelectedIndices, setRestoredSelectedIndices] = useState<number[]>([]);
  const [isRestoringSelection, setIsRestoringSelection] = useState(false);

  // Effect 1: Load persisted state when component mounts
  useEffect(() => {
    // Skip state restoration for navigation types that don't support it
    if (UNSUPPORTED_STATE_PERSISTENCE_TYPES.includes(navigation)) {
      setHasRestoredState(true);
      return;
    }

    if (!hasRestoredState && statehandler && internalDataset.length > 0) {
      const savedState = getTableState(name, statehandler);

      if (savedState) {
        // Check if there's an active filter
        const hasActiveFilter = savedState.search && savedState.search.length > 0;

        // Extract page number (only if no active filter)
        if (savedState.pagination && !hasActiveFilter) {
          setRestoredPageNumber(savedState.pagination);
        }

        // Extract selected indices for the current page (only if no active filter)
        if (savedState.selectedItem && savedState.selectedItem.length > 0 && !hasActiveFilter) {
          // Only restore selections for the current page
          const currentPageSelections = savedState.selectedItem
            .filter(item => item.page === savedState.pagination)
            .map(item => item.index);
          setRestoredSelectedIndices(currentPageSelections);
        }
        // If there's an active filter, don't restore selections as the data is completely different
      }

      setHasRestoredState(true);
    }
  }, [name, statehandler, hasRestoredState, internalDataset.length, navigation]);

  // Effect 2: Persist state on changes
  useEffect(() => {
    // Skip persistence for navigation types that don't support it
    if (UNSUPPORTED_STATE_PERSISTENCE_TYPES.includes(navigation)) {
      return;
    }

    // Skip persistence if we haven't loaded initial data yet
    if (internalDataset.length === 0 || !statehandler) {
      return;
    }

    // Skip persistence during edit mode or when restoring selection
    if (isGridEditMode || isRestoringSelection) {
      return;
    }

    // Check if we're in default state
    if (!stateManager.isDefaultState()) {
      // Get existing persisted state
      const existingState = getTableState(name, statehandler);

      // Merge current state with existing state
      const stateToSave = stateManager.mergeWithExisting(stateManager.currentState, existingState);

      // Clean up the state to save - remove default values
      const cleanedState: Partial<typeof stateToSave> = {};

      // Only include non-default values
      if (stateToSave.pagination && stateToSave.pagination !== 1) {
        cleanedState.pagination = stateToSave.pagination;
      }

      if (stateToSave.pagesize) {
        cleanedState.pagesize = stateToSave.pagesize;
      }

      if (stateToSave.selectedItem && stateToSave.selectedItem.length > 0) {
        cleanedState.selectedItem = stateToSave.selectedItem;
      }

      if (stateToSave.search && stateToSave.search.length > 0) {
        cleanedState.search = stateToSave.search;
      }

      if (stateToSave.sort) {
        cleanedState.sort = stateToSave.sort;
      }

      // Include actualpagesize if present
      if (stateToSave.actualpagesize !== undefined) {
        cleanedState.actualpagesize = stateToSave.actualpagesize;
      }

      // Only save if there's something to save
      if (Object.keys(cleanedState).length > 0) {
        // If we have a filter active, use clear-then-save to avoid merge issues
        const hasActiveFilter = cleanedState.search && cleanedState.search.length > 0;
        if (hasActiveFilter) {
          // Clear first to ensure no merge happens
          clearTableState(name, statehandler);
        }

        // Save the cleaned state
        saveTableState(name, statehandler, cleanedState);
      } else {
        // If nothing to save, clear the state
        clearTableState(name, statehandler);
      }
    }
  }, [
    selectedRowIds,
    currentPage,
    currentPageSize,
    internalDataset,
    name,
    statehandler,
    isGridEditMode,
    isRestoringSelection,
    stateManager,
    navigation,
  ]);

  return {
    restoredPageNumber,
    restoredSelectedRowIds,
    restoredSelectedIndices,
    hasRestoredState,
    setIsRestoringSelection,
  };
};
