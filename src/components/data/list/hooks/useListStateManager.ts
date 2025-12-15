import { useMemo, useCallback, useRef } from "react";
import { ListStateData } from "../utils/list-helpers";
import { ListItemData } from "../props";
import { StorageType } from "@wavemaker/react-runtime/utils/state-persistance";

interface UseListStateManagerProps {
  name: string;
  storage: StorageType;
  currentPage: number;
  currentPageSize: number;
  selectedItems: ListItemData[];
  items: ListItemData[];
  initialActualPageSize?: number;
  multiselect: boolean;
  isServerSidePagination: boolean;
  datasource?: any;
}

export interface UseListStateManagerReturn {
  currentState: Partial<ListStateData>;
  getStateForPageSizeChange: (
    newPageSize: number,
    existingSelectedItems?: Array<{ page: number; index: number }>,
    oldPageSize?: number
  ) => Partial<ListStateData>;
  isDefaultState: () => boolean;
  mergeWithExisting: (
    newState: Partial<ListStateData>,
    existingState: ListStateData | null
  ) => Partial<ListStateData>;
}

export const useListStateManager = (props: UseListStateManagerProps): UseListStateManagerReturn => {
  const { currentPage, selectedItems, items, initialActualPageSize, multiselect, datasource } =
    props;

  // Track previous state to return when loading
  const prevStateRef = useRef<Partial<ListStateData>>({});

  // Track if we've already calculated state after loading
  const hasCalculatedAfterLoadingRef = useRef(false);

  // Track the previous loading state
  const wasLoadingRef = useRef(false);

  // Build the current state object
  const currentState = useMemo((): Partial<ListStateData> => {
    const isLoading = datasource?.loading;
    // Detect first calculation after loading becomes false
    const isFirstCalculationAfterLoading =
      wasLoadingRef.current && !isLoading && !hasCalculatedAfterLoadingRef.current;

    // If loading just started, reset the flag for next time
    if (isLoading && !wasLoadingRef.current) {
      hasCalculatedAfterLoadingRef.current = false;
    }

    // Update the loading state tracker
    wasLoadingRef.current = isLoading;

    // If datasource is loading, return the previous state without any calculations
    if (isLoading) {
      return prevStateRef.current;
    }

    // If this is the first calculation after loading, mark as calculated and return minimal state
    if (isFirstCalculationAfterLoading) {
      hasCalculatedAfterLoadingRef.current = true;
      // Return minimal state for first calculation after loading to avoid stale data
      return {
        pagination: currentPage,
      };
    }

    // Otherwise, calculate the new state
    const state: Partial<ListStateData> = {
      pagination: currentPage,
    };

    // Include actualPageSize if available
    if (initialActualPageSize !== undefined) {
      state.actualpagesize = initialActualPageSize;
    }

    // Find selected indices in current items
    const selectedIndices: number[] = [];

    // For single select, ensure we only process one item
    const itemsToProcess = multiselect ? selectedItems : selectedItems.slice(0, 1);

    itemsToProcess.forEach(selectedItem => {
      // For SSP, we need to match by unique ID since object references change between pages
      // Use _wmListItemId which is unique for each item
      const index = items.findIndex(item => {
        // First try to match by _wmListItemId for SSP
        if (item._wmListItemId && selectedItem._wmListItemId) {
          return item._wmListItemId === selectedItem._wmListItemId;
        }
        // Fallback to object reference for non-SSP cases
        return item === selectedItem;
      });
      if (index >= 0) {
        selectedIndices.push(index);
      }
    });

    // Build selected items with page info
    const selectedItemsWithPage = selectedIndices.map(idx => ({
      page: currentPage,
      index: idx,
    }));

    state.selectedItem = selectedItemsWithPage;

    // Save the calculated state for next time
    prevStateRef.current = state;

    return state;
  }, [currentPage, selectedItems, items, initialActualPageSize, multiselect, datasource?.loading]);

  // Get state for page size change
  const getStateForPageSizeChange = useCallback(
    (
      newPageSize: number,
      existingSelectedItems?: Array<{ page: number; index: number }>,
      oldPageSize?: number
    ): Partial<ListStateData> => {
      let recalculatedItems: Array<{ page: number; index: number }> = [];

      if (existingSelectedItems && existingSelectedItems.length > 0 && oldPageSize) {
        // Recalculate selected items positions based on new page size
        recalculatedItems = existingSelectedItems.map(({ page, index }) => {
          // Calculate absolute position using the OLD page size
          const absoluteIndex = (page - 1) * oldPageSize + index;

          // Calculate new page and index with the NEW page size
          const newPage = Math.floor(absoluteIndex / newPageSize) + 1;
          const newIndex = absoluteIndex % newPageSize;

          return {
            page: newPage,
            index: newIndex,
          };
        });
      }

      const state: Partial<ListStateData> = {
        pagination: 1, // Reset to first page
        pagesize: newPageSize,
        selectedItem: recalculatedItems,
      };

      // Always include actualPageSize if available
      if (initialActualPageSize !== undefined) {
        state.actualpagesize = initialActualPageSize;
      }

      return state;
    },
    [initialActualPageSize]
  );

  // Check if current state is default (no need to persist)
  const isDefaultState = useCallback(() => {
    return currentPage === 1 && selectedItems.length === 0;
  }, [currentPage, selectedItems]);

  // Merge with existing state
  const mergeWithExisting = useCallback(
    (
      newState: Partial<ListStateData>,
      existingState: ListStateData | null
    ): Partial<ListStateData> => {
      if (!existingState) {
        return newState;
      }

      const merged: Partial<ListStateData> = { ...newState };

      // Handle selected items based on multiselect mode
      if (existingState.selectedItem && newState.selectedItem !== undefined) {
        if (multiselect) {
          // For multiselect: check if this is a single selection (normal click)
          // If we have exactly one selection on the current page, it means the user
          // did a normal click (not Ctrl+click), so we should clear all other selections
          if (newState.selectedItem.length === 1) {
            // Single click in multiselect mode - replace all selections
            merged.selectedItem = newState.selectedItem;
          } else {
            // Multiple selections or no selections - merge from different pages
            const currentPageSelections = newState.selectedItem;
            const otherPageSelections = existingState.selectedItem.filter(
              item => item.page !== newState.pagination
            );
            merged.selectedItem = [...otherPageSelections, ...currentPageSelections];
          }
        } else {
          // For single select:
          // If current page has selections, use only those
          // If current page has no selections, keep existing selection
          if (newState.selectedItem.length > 0) {
            merged.selectedItem = newState.selectedItem;
          } else {
            merged.selectedItem = existingState.selectedItem;
          }
        }
      }

      // Preserve pagesize if not in new state
      if (!merged.pagesize && existingState.pagesize) {
        merged.pagesize = existingState.pagesize;
      }

      // Preserve actualpagesize if not in new state
      if (!merged.actualpagesize && existingState.actualpagesize) {
        merged.actualpagesize = existingState.actualpagesize;
      }

      return merged;
    },
    [multiselect]
  );

  return {
    currentState,
    getStateForPageSizeChange,
    isDefaultState,
    mergeWithExisting,
  };
};
