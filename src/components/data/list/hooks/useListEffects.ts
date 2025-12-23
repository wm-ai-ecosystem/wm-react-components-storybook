import { useEffect, useState, useRef } from "react";
import { ListItemData } from "../props";
import { LIST_NAVIGATION_TYPES } from "../utils/constants";
import {
  saveListState,
  clearListState,
  getListState,
  getSelectedItemWidgets,
} from "../utils/list-helpers";
import { StorageType } from "@wavemaker/react-runtime/utils/state-persistance";
import { UseListStateManagerReturn } from "./useListStateManager";

interface UseListEffectsProps {
  // Data props
  name: string;
  navigation: string;
  datasource: any;
  safeDataset: ListItemData[];
  items: ListItemData[];
  orderedDataset: ListItemData[];
  groupedData: any;
  groupby: string;
  orderby: string;
  selectfirstitem: boolean;
  statehandler: StorageType;

  // State values
  accumulatedData: ListItemData[];
  lastLoadedPage: number;
  isFirstLoad: boolean;
  onDemandCurrentPage: number;
  hasBeenReordered: boolean;
  initialRender: boolean;
  initialPage: number;
  initialPageSize: number;
  initialSelectedItems: number[];
  initialActualPageSize?: number;
  restoredPageNumber: number | null;

  // State setters
  setAccumulatedData: (data: ListItemData[] | ((prev: ListItemData[]) => ListItemData[])) => void;
  setLastLoadedPage: (page: number) => void;
  setIsFirstLoad: (isFirst: boolean) => void;
  setOnDemandCurrentPage: (page: number) => void;
  setinitialRender: (initial: boolean) => void;
  setRestoredPageNumber: (page: number | null) => void;

  // List state
  listState: {
    selectedItems: ListItemData[];
    activeItems: Set<ListItemData>;
    firstSelectedItem: ListItemData | null;
    setSelectedItems: (items: ListItemData[]) => void;
    setActiveItems: (items: Set<ListItemData>) => void;
    setFirstSelectedItem: (item: ListItemData | null) => void;
  };

  // Pagination state
  paginationState: {
    currentPage: number;
    currentPageSize: number;
    setCurrentPage: (page: number) => void;
    setVisibleItems: (count: number) => void;
  };

  // Widget methods
  widgetMethods: {
    selectItem: (item: any) => void;
    deselectItem: (item: any) => void;
    getItem: (index: number) => any;
    getIndex: (item: any) => number;
    clear: () => void;
    getWidgets: (widgetName: string, index?: number) => any;
  };

  // Event handlers
  onSelect?: (widget: any, item: any) => void;
  onRender?: (widget: any, item: any) => void;
  onBeforedatarender?: (widget: any, item: any) => void;

  // Other props
  widgetInstance: any;
  listener: any;
  userInitiatedSelectionRef: React.MutableRefObject<boolean>;
  showNavigation: boolean;
  stateManager: UseListStateManagerReturn;
}

export const useListEffects = (props: UseListEffectsProps) => {
  const {
    name,
    navigation,
    datasource,
    safeDataset,
    items,
    orderedDataset,
    groupedData,
    groupby,
    orderby,
    selectfirstitem,
    statehandler,
    accumulatedData,
    lastLoadedPage,
    isFirstLoad,
    onDemandCurrentPage,
    hasBeenReordered,
    initialRender,
    initialPage,
    initialPageSize,
    initialSelectedItems,
    initialActualPageSize,
    setAccumulatedData,
    setLastLoadedPage,
    setIsFirstLoad,
    setOnDemandCurrentPage,
    setinitialRender,
    listState,
    paginationState,
    widgetMethods,
    onSelect,
    widgetInstance,
    listener,
    userInitiatedSelectionRef,
    restoredPageNumber,
    setRestoredPageNumber,
    showNavigation,
    stateManager,
  } = props;

  // Track page size changes
  const [lastPageSize, setLastPageSize] = useState(paginationState.currentPageSize);
  const rafRef1 = useRef<number | null>(null);
  const rafRef2 = useRef<number | null>(null);
  const isStateUpdated = useRef<boolean>(false);
  const hasInitialWidgetUpdateRun = useRef(false);

  // Effect 1: Accumulate data for On-Demand navigation
  useEffect(() => {
    if (navigation === LIST_NAVIGATION_TYPES.ON_DEMAND && datasource && safeDataset.length > 0) {
      // Get the current page from pagination metadata (0-indexed: 0 = page 1)
      const currentPageFromMeta = datasource.pagination?.number ?? 0;

      if (isFirstLoad) {
        // Initial load - just set the data
        setAccumulatedData(safeDataset);
        setLastLoadedPage(currentPageFromMeta);
        setIsFirstLoad(false);
        // Sync the onDemandCurrentPage with the actual loaded page
        if (currentPageFromMeta !== onDemandCurrentPage) {
          setOnDemandCurrentPage(currentPageFromMeta);
        }
      } else if (currentPageFromMeta > lastLoadedPage) {
        // This is a new page - append the data
        setAccumulatedData(prev => [...prev, ...safeDataset]);
        setLastLoadedPage(currentPageFromMeta);
      } else if (currentPageFromMeta === 0 && lastLoadedPage > 0) {
        // Data was reset (e.g., filter changed), start fresh
        setAccumulatedData(safeDataset);
        setLastLoadedPage(0);
        setIsFirstLoad(false);
        setOnDemandCurrentPage(0);
      }
    }
  }, [
    navigation,
    datasource,
    safeDataset,
    isFirstLoad,
    lastLoadedPage,
    onDemandCurrentPage,
    accumulatedData.length,
  ]);

  // Effect 2: Reset accumulated data when orderby changes
  useEffect(() => {
    if (navigation === LIST_NAVIGATION_TYPES.ON_DEMAND && datasource) {
      // Reset accumulated data when query parameters change
      setAccumulatedData([]);
      setLastLoadedPage(-1);
      setIsFirstLoad(true);
      setOnDemandCurrentPage(0); // Reset to page 0 (0-indexed)
    }
  }, [orderby]); // Reset when sorting changes

  // Effect 3: Expose methods through widget instance
  useEffect(() => {
    if (listener?.onChange) {
      listener.onChange(name, {
        selectItem: widgetMethods.selectItem,
        deselectItem: widgetMethods.deselectItem,
        getItem: widgetMethods.getItem,
        getIndex: widgetMethods.getIndex,
        clear: widgetMethods.clear,
        getWidgets: widgetMethods.getWidgets,
        showNavigation: showNavigation,
      });
    }
  }, []);

  // Effect 3: Expose methods through widget instance
  useEffect(() => {
    if (
      listener?.onChange &&
      props.navigation !== LIST_NAVIGATION_TYPES.NONE &&
      !isStateUpdated.current
    ) {
      listener.onChange(name, {
        selecteditem: listState.selectedItems[0],
      });
      isStateUpdated.current = true;
    }
  }, [listState.selectedItems]);

  // Effect 3b: Update selected item widgets for state restoration (not selectfirstitem)

  useEffect(() => {
    // Only run once on initial load when there are selected items from state restoration
    // Skip if selectfirstitem is true (handled in useListState)
    if (
      hasInitialWidgetUpdateRun.current ||
      !listener?.onChange ||
      listState.selectedItems.length === 0 ||
      initialRender ||
      selectfirstitem
    ) {
      return;
    }

    // Mark as run
    hasInitialWidgetUpdateRun.current = true;

    // Use double RAF to ensure DOM is fully updated
    rafRef1.current = requestAnimationFrame(() => {
      // getSelectedItemWidgets(null, listener, name);
      rafRef2.current = requestAnimationFrame(() => {
        getSelectedItemWidgets(null, listener, name);
      });
    });

    return () => {
      if (rafRef1.current) {
        cancelAnimationFrame(rafRef1.current);
      }
      if (rafRef2.current) {
        cancelAnimationFrame(rafRef2.current);
      }
    };
  }, [name, listState.selectedItems.length, initialRender, selectfirstitem]);

  // Effect 5: Handle selectfirstitem with onSelect
  useEffect(() => {
    if (selectfirstitem && widgetInstance && onSelect && listState.selectedItems.length > 0) {
      // Only trigger onSelect for selectfirstitem if it's the initial selection and not user-initiated
      if (
        listState.selectedItems.length === 1 &&
        items.length > 0 &&
        listState.selectedItems[0] === items[0]
      ) {
        if (!userInitiatedSelectionRef.current) {
          onSelect(widgetInstance, listState.selectedItems[0]); // Pass the first selected item
        }
      }
    }
  }, [selectfirstitem, listState.selectedItems]);

  // Effect 6: Handle selectfirstitem for grouped data
  useEffect(() => {
    if (selectfirstitem && groupby && groupedData && groupedData.length > 0) {
      const firstGroup = groupedData[0];
      if (firstGroup && firstGroup.data && firstGroup.data.length > 0) {
        const firstItemInGroup = firstGroup.data[0];

        const setFirstItem = () => {
          listState.setSelectedItems([firstItemInGroup]);
          listState.setActiveItems(new Set([firstItemInGroup]));
          listState.setFirstSelectedItem(firstItemInGroup);
          // Trigger onSelect for the initial selection of first item in grouped data only if not user-initiated
          if (onSelect && widgetInstance && !userInitiatedSelectionRef.current) {
            onSelect(widgetInstance, firstItemInGroup); // Pass the first item in group
          }
        };

        // Check if the currently selected first item is different from the grouped first item
        if (listState.selectedItems.length && listState.selectedItems[0] !== firstItemInGroup) {
          setFirstItem();
        } else if (listState.selectedItems.length === 0) {
          setFirstItem();
        }
      }
    }
  }, [groupby, groupedData, selectfirstitem, listState]);

  // Effect 7: Reset user-initiated flag after selectedItems change
  useEffect(() => {
    const timer = setTimeout(() => {
      userInitiatedSelectionRef.current = false;
    }, 0);
    return () => clearTimeout(timer);
  }, [listState.selectedItems]);

  // Effect 8: Load persisted state when items are available
  useEffect(() => {
    // Only run this effect once when items become available
    if (items.length > 0 && initialRender) {
      // Restore selected items from our parsed initial state
      if (initialSelectedItems.length > 0) {
        // Map indexes to actual items
        const selectedItems = initialSelectedItems
          .map(idx => (idx >= 0 && idx < items.length ? items[idx] : null))
          .filter(Boolean) as ListItemData[];

        if (selectedItems.length > 0) {
          listState.setSelectedItems(selectedItems);
          listState.setActiveItems(new Set(selectedItems));
          listState.setFirstSelectedItem(selectedItems[0]);
        }
      }

      // For on-demand navigation, update visible items to show items up to the restored page
      if (navigation === LIST_NAVIGATION_TYPES.ON_DEMAND && initialPage > 1) {
        paginationState.setVisibleItems(initialPage * paginationState.currentPageSize);
      }

      // Mark initialization as complete
      setinitialRender(false);
    }
  }, [
    items,
    initialRender,
    initialPage,
    initialSelectedItems,
    paginationState.currentPageSize,
    paginationState.setVisibleItems,
    paginationState.setCurrentPage,
    navigation,
    datasource,
    listState.setSelectedItems,
    listState.setActiveItems,
    listState.setFirstSelectedItem,
  ]);

  // Effect 9: Clear persisted state when items are reordered
  useEffect(() => {
    // Skip state clearing for On-Demand navigation
    if (navigation === LIST_NAVIGATION_TYPES.ON_DEMAND) {
      return;
    }

    if (hasBeenReordered) {
      // Clear the persisted state
      clearListState(name, statehandler as StorageType);
    }
  }, [hasBeenReordered, navigation]);

  // Effect 10: Restore selections when page size changes
  useEffect(() => {
    // Skip for On-Demand navigation
    if (navigation === LIST_NAVIGATION_TYPES.ON_DEMAND) {
      return;
    }

    // Check if page size has changed and we have items
    const pageSizeChanged = lastPageSize !== paginationState.currentPageSize;
    if (pageSizeChanged && items.length > 0 && statehandler) {
      const savedState = getListState(name, statehandler);

      if (savedState?.selectedItem && savedState.selectedItem.length > 0) {
        // Filter selections for the current page (should be page 1 after size change)
        const currentPageSelections = savedState.selectedItem
          .filter(item => item.page === paginationState.currentPage)
          .map(item => item.index);

        // Map indexes to actual items
        const selectedItems = currentPageSelections
          .map(idx => (idx >= 0 && idx < items.length ? items[idx] : null))
          .filter(Boolean) as ListItemData[];

        if (selectedItems.length > 0) {
          listState.setSelectedItems(selectedItems);
          listState.setActiveItems(new Set(selectedItems));
          listState.setFirstSelectedItem(selectedItems[0]);
        }
      }

      setLastPageSize(paginationState.currentPageSize);
    }
  }, [
    items,
    paginationState.currentPageSize,
    paginationState.currentPage,
    lastPageSize,
    navigation,
    statehandler,
    name,
    listState,
  ]);

  // Effect 11: Persist state on changes
  useEffect(() => {
    // Skip state persistence for On-Demand navigation
    if (navigation === LIST_NAVIGATION_TYPES.ON_DEMAND) {
      return;
    }

    // Check if we're in default state
    if (items.length > 0 && !hasBeenReordered && !stateManager.isDefaultState()) {
      // Get existing persisted state
      const existingState = getListState(name, statehandler);

      // Merge current state with existing state
      const stateToSave = stateManager.mergeWithExisting(stateManager.currentState, existingState);

      // Compare state content, not object references
      const existingStateStr = JSON.stringify(existingState);
      const stateToSaveStr = JSON.stringify(stateToSave);
      const statesAreEqual = existingStateStr === stateToSaveStr;

      // Save the state only if content has actually changed
      if (!statesAreEqual) {
        saveListState(name, statehandler, stateToSave);
      }
    }
  }, [
    listState.selectedItems,
    paginationState.currentPage,
    items,
    name,
    navigation,
    hasBeenReordered,
    statehandler,
  ]);

  useEffect(() => {
    if (restoredPageNumber !== null && paginationState) {
      paginationState.setCurrentPage(restoredPageNumber);
      // Clear the restored page number after applying
      setRestoredPageNumber(null);
    }
  }, [restoredPageNumber, paginationState]);
};
