import { useMemo, useCallback, useRef, useEffect } from "react";
import {
  TableStateData,
  TableSearchFilter,
  TableSortState,
  saveTableState,
  getTableState,
  clearTableState,
} from "../utils/table-helpers";
import { StorageType } from "@wavemaker/react-runtime/utils/state-persistance";
import { isArray } from "lodash-es";
import { LiveVariableConfig } from "@wavemaker/react-runtime/variables/live-variable";

interface UseTableStateManagerProps {
  name: string;
  storage: StorageType;
  currentPage: number;
  currentPageSize: number;
  selectedRowId?: string | null;
  selectedRowIds?: string[];
  internalDataset: Array<Record<string, unknown> & { _wmRowId?: string }>;
  initialActualPageSize?: number;
  datasource?: LiveVariableConfig | { loading?: boolean };
  multiselect: boolean;
  filterData?: TableSearchFilter[]; // Current filter/search data
  sortData?: TableSortState; // Current sort data
  navigation?: string; // Navigation type
  isStateConfigured?: boolean; // Whether state persistence is configured
  defaultPageSize?: number; // Default page size to compare against
  initialSortState?: TableSortState; // Initial sort state from persistence
  initialFilterState?: TableSearchFilter[]; // Initial filter state from persistence
}

export interface UseTableStateManagerReturn {
  currentState: Partial<TableStateData>;
  getStateForPageSizeChange: (
    newPageSize: number,
    existingSelectedItems?: Array<{ page: number; index: number }>,
    oldPageSize?: number
  ) => Partial<TableStateData>;
  isDefaultState: () => boolean;
  mergeWithExisting: (
    newState: Partial<TableStateData>,
    existingState: TableStateData | null
  ) => Partial<TableStateData>;
  handleFilterStateChange: () => void;
  handleSortStateChange: () => void;
}

// Unsupported navigation types for state persistence
const UNSUPPORTED_STATE_PERSISTENCE_TYPES = ["Scroll", "On-Demand", "Inline"];

export const useTableStateManager = (
  props: UseTableStateManagerProps
): UseTableStateManagerReturn => {
  const {
    name,
    storage,
    currentPage,
    currentPageSize,
    selectedRowId,
    selectedRowIds,
    internalDataset,
    initialActualPageSize,
    datasource,
    multiselect,
    filterData,
    sortData,
    navigation = "Pager",
    isStateConfigured = false,
    defaultPageSize,
    initialSortState,
    initialFilterState,
  } = props;

  // Track previous state to return when loading
  const prevStateRef = useRef<Partial<TableStateData>>({});

  // Track if we've already calculated state after loading
  const hasCalculatedAfterLoadingRef = useRef(false);

  // Track the previous loading state
  const wasLoadingRef = useRef(false);

  // Track complete selection state with page info for multiselect
  const selectionStateRef = useRef<Array<{ page: number; index: number; id: string }>>([]);

  // Track previous filter data to detect changes
  const prevFilterDataRef = useRef<TableSearchFilter[] | undefined>(undefined);

  // Track if filter state has been persisted after a change
  const filterStatePersistenceTriggeredRef = useRef(false);

  // Track previous sort data to detect changes
  const prevSortDataRef = useRef<TableSortState | undefined>(undefined);

  // Build the current state object
  const currentState = useMemo((): Partial<TableStateData> => {
    const isLoading = !!datasource?.loading;

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
      // Clear selection state ref for fresh start after loading
      if (multiselect) {
        selectionStateRef.current = [];
      }
      // Return minimal state for first calculation after loading to avoid stale data
      return {
        pagination: currentPage,
      };
    }

    // Otherwise, calculate the new state
    const state: Partial<TableStateData> = {};

    // Check if filtering is active and different from initial
    const hasActiveFilter =
      filterData !== undefined &&
      filterData.length > 0 &&
      JSON.stringify(filterData) !== JSON.stringify(initialFilterState || []);

    // Include actualPageSize if it's provided (should be persisted once and never change)
    if (initialActualPageSize !== undefined) {
      state.actualpagesize = initialActualPageSize;
    }

    // Include search/filter state if it differs from initial
    if (hasActiveFilter) {
      state.search = filterData;

      // Include sort state if it differs from initial (even when filtering)
      const isSortChanged =
        sortData && JSON.stringify(sortData) !== JSON.stringify(initialSortState);
      if (isSortChanged) {
        state.sort = sortData;
      }

      // When filtering is active, don't include pagination or selectedItem at all
      // They should be completely removed from state
      // Save the calculated state for next time
      prevStateRef.current = state;
      return state;
    }

    // Include sort state if it differs from initial
    const isSortChanged = sortData && JSON.stringify(sortData) !== JSON.stringify(initialSortState);
    if (isSortChanged) {
      state.sort = sortData;
    }

    // Only include pagination if not on page 1 (default)
    if (currentPage !== 1) {
      state.pagination = currentPage;
    }

    // Get selected items based on multiselect mode
    const selectedIds = multiselect ? selectedRowIds || [] : selectedRowId ? [selectedRowId] : [];

    if (multiselect) {
      // For multiselect, we need to maintain selections across pages
      // Get all currently selected IDs
      const allSelectedIds = new Set(selectedIds);

      // Build a map of items on the current page for quick lookup
      const currentPageItemsMap = new Map<string, number>();
      internalDataset.forEach((item, index) => {
        if (item._wmRowId) {
          currentPageItemsMap.set(item._wmRowId, index);
        }
      });

      // Update selection state:
      // 1. Keep selections from other pages if their IDs are still selected
      // 2. Add/update selections from current page
      const updatedSelections: Array<{ page: number; index: number; id: string }> = [];

      // Keep selections from other pages that are still selected
      selectionStateRef.current.forEach(item => {
        if (item.page !== currentPage && allSelectedIds.has(item.id)) {
          updatedSelections.push(item);
        }
      });

      // Add selections from current page
      allSelectedIds.forEach(id => {
        const index = currentPageItemsMap.get(id);
        if (index !== undefined) {
          updatedSelections.push({ page: currentPage, index, id });
        }
      });

      // Update the ref
      selectionStateRef.current = updatedSelections;

      // Only include selectedItem if there are selections
      if (updatedSelections.length > 0) {
        state.selectedItem = updatedSelections.map(({ page, index }) => ({ page, index }));
      }
    } else {
      // For single select, just find the selected item in current dataset
      const selectedIndices: number[] = [];

      selectedIds.forEach(id => {
        const index = internalDataset.findIndex(item => item._wmRowId === id);
        if (index >= 0) {
          selectedIndices.push(index);
        }
      });

      // Only include selectedItem if there are selections
      if (selectedIndices.length > 0) {
        // Build selected items with page info
        const selectedItemsWithPage = selectedIndices.map(idx => ({
          page: currentPage,
          index: idx,
        }));

        state.selectedItem = selectedItemsWithPage;
      }
    }

    // Save the calculated state for next time
    prevStateRef.current = state;

    // Only include pagesize if it differs from default
    if (defaultPageSize && currentPageSize !== defaultPageSize) {
      state.pagesize = currentPageSize;
    }

    return state;
  }, [
    currentPage,
    currentPageSize,
    selectedRowId,
    selectedRowIds,
    internalDataset,
    initialActualPageSize,
    multiselect,
    datasource?.loading,
    filterData,
    sortData,
    defaultPageSize,
    initialSortState,
    initialFilterState,
  ]);

  // Get state for page size change
  const getStateForPageSizeChange = useCallback(
    (
      newPageSize: number,
      existingSelectedItems?: Array<{ page: number; index: number }>,
      oldPageSize?: number
    ): Partial<TableStateData> => {
      // Check if filtering is currently active and different from initial
      const hasActiveFilter =
        filterData !== undefined &&
        filterData.length > 0 &&
        JSON.stringify(filterData) !== JSON.stringify(initialFilterState || []);

      const state: Partial<TableStateData> = {};

      // Always include pagesize in page size change state
      // This ensures proper state management when changing page sizes
      state.pagesize = newPageSize;

      // Include actualPageSize if it's provided (should be persisted)
      if (initialActualPageSize !== undefined) {
        state.actualpagesize = initialActualPageSize;
      }

      // If filtering is active, maintain the filter but don't include pagination or selectedItem
      if (hasActiveFilter) {
        state.search = filterData;
      }

      // Include sort if it differs from initial
      const isSortChanged =
        sortData && JSON.stringify(sortData) !== JSON.stringify(initialSortState);
      if (isSortChanged) {
        state.sort = sortData;
      }

      // If filtering is active, don't include pagination or selectedItem
      if (hasActiveFilter) {
        return state;
      }

      // Only handle pagination and selectedItem if no filter is active
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

      // Clear selection state ref when page size changes
      if (multiselect) {
        selectionStateRef.current = [];
      }

      // Don't include pagination if it's page 1 (default)
      // state.pagination = 1; // Don't include this as it's the default

      // Only include selectedItem if there are selections
      if (recalculatedItems.length > 0) {
        state.selectedItem = recalculatedItems;
      }

      return state;
    },
    [
      initialActualPageSize,
      multiselect,
      filterData,
      sortData,
      defaultPageSize,
      initialSortState,
      initialFilterState,
    ]
  );

  // Check if current state is default (no need to persist)
  const isDefaultState = useCallback(() => {
    const hasSelection =
      (selectedRowId !== null && selectedRowId !== undefined) ||
      (selectedRowIds && selectedRowIds.length > 0);

    // Check if filter differs from initial
    const hasFilterChange =
      filterData &&
      filterData.length > 0 &&
      JSON.stringify(filterData) !== JSON.stringify(initialFilterState || []);

    // Check if sort differs from initial
    const hasSortChange = sortData && JSON.stringify(sortData) !== JSON.stringify(initialSortState);

    // Check if page size differs from default
    const hasPageSizeChange = defaultPageSize && currentPageSize !== defaultPageSize;

    // If nothing has changed from defaults, it's default state
    return (
      currentPage === 1 && !hasSelection && !hasFilterChange && !hasSortChange && !hasPageSizeChange
    );
  }, [
    currentPage,
    currentPageSize,
    selectedRowId,
    selectedRowIds,
    filterData,
    sortData,
    defaultPageSize,
    initialSortState,
    initialFilterState,
  ]);

  // Merge with existing state
  const mergeWithExisting = useCallback(
    (
      newState: Partial<TableStateData>,
      existingState: TableStateData | null
    ): Partial<TableStateData> => {
      if (!existingState) {
        return newState;
      }

      const merged: Partial<TableStateData> = { ...newState };

      // Check if filtering is active in the new state
      const hasActiveFilter = newState.search !== undefined && newState.search.length > 0;

      // If filtering is active, return only what's in newState plus preserved size properties
      if (hasActiveFilter) {
        // Start fresh with only what's in newState
        const filteredMerged: Partial<TableStateData> = { ...newState };

        // Only preserve pagesize from existing if not in new state and it differs from default
        if (
          !filteredMerged.pagesize &&
          existingState.pagesize &&
          (!defaultPageSize || existingState.pagesize !== defaultPageSize)
        ) {
          filteredMerged.pagesize = existingState.pagesize;
        }
        // Preserve actualPageSize from existing state if not in new state
        if (!filteredMerged.actualpagesize && existingState.actualpagesize !== undefined) {
          filteredMerged.actualpagesize = existingState.actualpagesize;
        }
        if (!filteredMerged.sort && existingState.sort) {
          filteredMerged.sort = existingState.sort;
        }

        // Explicitly ensure pagination and selectedItem are not in the merged state
        delete filteredMerged.pagination;
        delete filteredMerged.selectedItem;

        return filteredMerged;
      }

      // If no active filter, proceed with normal merging
      // Handle selected items based on multiselect mode
      if (newState.selectedItem !== undefined) {
        // For multiselect, the newState already contains all selections across pages
        // For single select, use the new selection if available, otherwise keep existing
        if (multiselect || newState.selectedItem.length > 0) {
          merged.selectedItem = newState.selectedItem;
        } else if (existingState.selectedItem) {
          // For single select with no current selection, keep existing
          merged.selectedItem = existingState.selectedItem;
        }
      } else if (existingState.selectedItem && !hasActiveFilter) {
        // Preserve existing selectedItem if not in new state and no filter
        merged.selectedItem = existingState.selectedItem;
      }

      // Preserve pagesize if not in new state and it differs from default
      if (
        !merged.pagesize &&
        existingState.pagesize &&
        (!defaultPageSize || existingState.pagesize !== defaultPageSize)
      ) {
        merged.pagesize = existingState.pagesize;
      }

      // Preserve actualPageSize from existing state if not in new state
      if (!merged.actualpagesize && existingState.actualpagesize !== undefined) {
        merged.actualpagesize = existingState.actualpagesize;
      }

      // Preserve pagination if not in new state and no filter AND not on page 1
      if (
        !merged.pagination &&
        existingState.pagination &&
        !hasActiveFilter &&
        existingState.pagination !== 1
      ) {
        merged.pagination = existingState.pagination;
      }

      // Preserve sort if not in new state
      if (!merged.sort && existingState.sort) {
        merged.sort = existingState.sort;
      }

      return merged;
    },
    [multiselect, defaultPageSize]
  );

  // Handle filter state changes
  const handleFilterStateChange = useCallback(() => {
    // Check if state persistence is supported for this navigation type
    if (
      !isStateConfigured ||
      storage === "none" ||
      UNSUPPORTED_STATE_PERSISTENCE_TYPES.includes(navigation)
    ) {
      if (navigation && UNSUPPORTED_STATE_PERSISTENCE_TYPES.includes(navigation)) {
        console.warn(
          `Retain State handling on Widget ${name} is not supported for ${navigation} navigation type.`
        );
      }
      return;
    }

    // Check if filter data is different from initial
    const hasFilterData = isArray(filterData) && filterData.length > 0;
    const isFilterChanged =
      hasFilterData && JSON.stringify(filterData) !== JSON.stringify(initialFilterState || []);

    if (isFilterChanged) {
      // When filter is applied, we need to save a state that explicitly excludes pagination and selectedItem
      // Get the current full state
      const currentFullState = getTableState(name, storage);

      // Build new state with only the properties we want to keep
      const newState: Partial<TableStateData> = {
        search: filterData,
      };

      // Include actualPageSize if available
      if (currentFullState?.actualpagesize !== undefined) {
        newState.actualpagesize = currentFullState.actualpagesize;
      } else if (initialActualPageSize !== undefined) {
        newState.actualpagesize = initialActualPageSize;
      }

      // Only include pagesize if it differs from default
      if (
        currentFullState?.pagesize !== undefined &&
        defaultPageSize &&
        currentFullState.pagesize !== defaultPageSize
      ) {
        newState.pagesize = currentFullState.pagesize;
      }

      // Only include sort if it differs from initial
      if (currentFullState?.sort !== undefined) {
        const isSortChanged =
          JSON.stringify(currentFullState.sort) !== JSON.stringify(initialSortState);
        if (isSortChanged) {
          newState.sort = currentFullState.sort;
        }
      }

      // Clear and save to ensure no merge happens
      clearTableState(name, storage);
      saveTableState(name, storage, newState);

      // Clear the selection state ref for multiselect
      if (multiselect) {
        selectionStateRef.current = [];
      }
    } else if (!hasFilterData && initialFilterState && initialFilterState.length > 0) {
      // When filter is cleared but there was an initial filter, we need to update state
      const currentFullState = getTableState(name, storage);
      const newState: Partial<TableStateData> = {};

      // Include actualPageSize if available
      if (currentFullState?.actualpagesize !== undefined) {
        newState.actualpagesize = currentFullState.actualpagesize;
      } else if (initialActualPageSize !== undefined) {
        newState.actualpagesize = initialActualPageSize;
      }

      // Only include pagesize if it differs from default
      if (
        currentFullState?.pagesize !== undefined &&
        defaultPageSize &&
        currentFullState.pagesize !== defaultPageSize
      ) {
        newState.pagesize = currentFullState.pagesize;
      }

      // Only include sort if it differs from initial
      if (currentFullState?.sort !== undefined) {
        const isSortChanged =
          JSON.stringify(currentFullState.sort) !== JSON.stringify(initialSortState);
        if (isSortChanged) {
          newState.sort = currentFullState.sort;
        }
      }

      // Clear and save if there's anything to save
      if (Object.keys(newState).length > 0) {
        clearTableState(name, storage);
        saveTableState(name, storage, newState);
      } else {
        clearTableState(name, storage);
      }

      // Clear the selection state ref for multiselect
      if (multiselect) {
        selectionStateRef.current = [];
      }
    }
  }, [
    filterData,
    isStateConfigured,
    storage,
    navigation,
    name,
    multiselect,
    defaultPageSize,
    initialSortState,
    initialFilterState,
  ]);

  // Handle sort state changes
  const handleSortStateChange = useCallback(() => {
    // Check if state persistence is supported for this navigation type
    if (
      !isStateConfigured ||
      storage === "none" ||
      UNSUPPORTED_STATE_PERSISTENCE_TYPES.includes(navigation)
    ) {
      return;
    }

    // Check if sort actually changed from initial
    const hasSortChanged =
      sortData && JSON.stringify(sortData) !== JSON.stringify(initialSortState);
    const isSortReset = !sortData && initialSortState;

    if (hasSortChanged || isSortReset) {
      // If we're in default state after this change, clear everything
      if (isDefaultState()) {
        clearTableState(name, storage);
      } else {
        // Build a clean state with only non-default values
        const newState: Partial<TableStateData> = {};

        // Include actualPageSize if available
        if (initialActualPageSize !== undefined) {
          newState.actualpagesize = initialActualPageSize;
        }

        // Only include sort if it changed from initial
        if (hasSortChanged) {
          newState.sort = sortData;
        }

        // Only include pagination if not on page 1
        if (currentPage !== 1) {
          newState.pagination = currentPage;
        }

        // Only include pagesize if it differs from default
        if (defaultPageSize && currentPageSize !== defaultPageSize) {
          newState.pagesize = currentPageSize;
        }

        // Only include search if it differs from initial
        const hasActiveFilter =
          filterData &&
          filterData.length > 0 &&
          JSON.stringify(filterData) !== JSON.stringify(initialFilterState || []);
        if (hasActiveFilter) {
          newState.search = filterData;
        }

        // Only include selectedItem if there are selections
        const hasSelection =
          (selectedRowId !== null && selectedRowId !== undefined) ||
          (selectedRowIds && selectedRowIds.length > 0);
        if (hasSelection && currentState.selectedItem && currentState.selectedItem.length > 0) {
          newState.selectedItem = currentState.selectedItem;
        }

        // Clear and save to ensure clean state
        clearTableState(name, storage);
        if (Object.keys(newState).length > 0) {
          saveTableState(name, storage, newState);
        }
      }
    }
  }, [
    sortData,
    isStateConfigured,
    storage,
    navigation,
    name,
    currentState,
    initialSortState,
    isDefaultState,
    currentPage,
    currentPageSize,
    defaultPageSize,
    filterData,
    initialFilterState,
    selectedRowId,
    selectedRowIds,
  ]);

  // Detect filter data changes and handle state persistence
  useEffect(() => {
    // Check if filter data has changed
    const filterDataChanged =
      JSON.stringify(filterData) !== JSON.stringify(prevFilterDataRef.current);

    if (filterDataChanged) {
      // Reset the flag when filter data changes
      filterStatePersistenceTriggeredRef.current = false;

      // Handle the filter state change
      handleFilterStateChange();

      // Update the previous filter data reference
      prevFilterDataRef.current = filterData;
    }
  }, [filterData, handleFilterStateChange]);

  // Detect sort data changes and handle state persistence
  useEffect(() => {
    // Check if sort data has changed
    const sortDataChanged = JSON.stringify(sortData) !== JSON.stringify(prevSortDataRef.current);

    if (sortDataChanged) {
      // Handle the sort state change
      handleSortStateChange();

      // Update the previous sort data reference
      prevSortDataRef.current = sortData;
    }
  }, [sortData, handleSortStateChange]);

  return {
    currentState,
    getStateForPageSizeChange,
    isDefaultState,
    mergeWithExisting,
    handleFilterStateChange,
    handleSortStateChange,
  };
};
