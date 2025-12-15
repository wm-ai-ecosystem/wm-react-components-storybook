import React, { useCallback, useRef, useEffect } from "react";
import { findIndex, includes, filter, slice, min, max } from "lodash-es";
import { ListItemData } from "../props";
import { UseListEventHandlersProps, ListEventHandlers } from "./props";
import { getSelectedItemWidgets } from "../utils/list-helpers";

/**
 * Custom hook for managing list event handlers
 * Extracts all event handling logic from the main component
 */
export const useListEventHandlers = <T extends ListItemData = ListItemData>(
  props: UseListEventHandlersProps<T> & { widgetInstance?: unknown }
): ListEventHandlers<T> => {
  const {
    items,
    multiselect,
    disableitem,
    selectionlimit,
    collapsible,
    selectedItems,
    setSelectedItems,
    activeItems,
    setActiveItems,
    firstSelectedItem,
    setFirstSelectedItem,
    groupCollapsed,
    setGroupCollapsed,
    currentPage,
    setCurrentPage,
    visibleItems,
    setVisibleItems,
    setIsLoadingMore,
    onClick,
    onDblclick,
    onMouseEnter,
    onMouseLeave,
    onSelectionlimitexceed,
    onPaginationchange,
    onPageChange,
    onSetrecord,
    widgetInstance,
    onSelect,
    userInitiatedSelectionRef,
    datasource,
    isServerSidePagination,
    pagesize,
    navigation,
    onDemandCurrentPage,
    setOnDemandCurrentPage,
    listener,
    name,
  } = props;

  const selectedItemsRef = useRef(selectedItems);

  useEffect(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);

  // Helper function to call onSelect and mark as user-initiated
  const callOnSelect = useCallback(
    (selectedItem: T | null) => {
      if (onSelect && widgetInstance) {
        if (userInitiatedSelectionRef) {
          userInitiatedSelectionRef.current = true;
        }
        if (listener?.onChange) {
          listener.onChange(name, {
            selecteditem: multiselect ? selectedItemsRef.current : selectedItem,
          });
        }
        onSelect(widgetInstance, selectedItem);
      }
    },
    [onSelect, widgetInstance, userInitiatedSelectionRef]
  );

  const handleListItemClick = useCallback(
    (event: React.MouseEvent, item: T) => {
      if (disableitem) return;

      const selectCount = selectedItems.length;
      const isItemSelected = includes(selectedItems, item);
      const isItemActive = activeItems.has(item);

      if (multiselect) {
        // Handle Shift+Click for range selection
        if (event.shiftKey && firstSelectedItem && firstSelectedItem !== item) {
          const firstIndex = findIndex(items, i => i === firstSelectedItem);
          const lastIndex = findIndex(items, i => i === item);

          if (firstIndex !== -1 && lastIndex !== -1) {
            const start = min([firstIndex, lastIndex]) as number;
            const end = max([firstIndex, lastIndex]) as number;
            const rangeCount = end - start + 1;

            if (selectionlimit > 0 && rangeCount > selectionlimit) {
              onSelectionlimitexceed?.(event, widgetInstance);
              return;
            }

            const rangeItems = slice(items, start, end + 1);
            selectedItemsRef.current = rangeItems;
            setSelectedItems(rangeItems);
            setActiveItems(new Set(rangeItems));
            // Only call onSelect if this is a new selection (not already active)
            if (!isItemActive) {
              callOnSelect(item); // Pass the current item that triggered the range selection
            }
            onClick?.(event, widgetInstance); // Use widgetInstance instead of item
            return;
          }
        }

        // Handle Ctrl+Click for individual item selection toggle
        if (event.ctrlKey) {
          if (selectionlimit > 0 && selectCount >= selectionlimit && !isItemSelected) {
            onSelectionlimitexceed?.(event, widgetInstance);
            return;
          }

          if (isItemSelected) {
            const newSelectedItems = filter(selectedItems, selectedItem => selectedItem !== item);
            selectedItemsRef.current = newSelectedItems;
            setSelectedItems(newSelectedItems);
            const newActiveItems = new Set(activeItems);
            newActiveItems.delete(item);
            setActiveItems(newActiveItems);
          } else {
            const newSelectedItems = [...selectedItems, item];
            selectedItemsRef.current = newSelectedItems;
            setSelectedItems(newSelectedItems);
            const newActiveItems = new Set(activeItems);
            newActiveItems.add(item);
            setActiveItems(newActiveItems);
            // Only call onSelect if this is a new selection (not already active)
            if (!isItemActive) {
              callOnSelect(item); // Pass the current item being selected
            }
          }
          setFirstSelectedItem(item);
        } else {
          // Normal click without Ctrl - select item without deselecting if already selected
          if (!isItemSelected) {
            // If clicking an unselected item, select only this item
            const newSelectedItems = [item];
            selectedItemsRef.current = newSelectedItems;
            setSelectedItems(newSelectedItems);
            setActiveItems(new Set([item]));
            setFirstSelectedItem(item);
            // Only call onSelect if this is a new selection (not already active)
            if (!isItemActive) {
              callOnSelect(item); // Pass the current item being selected
            }
          }
          // If item is already selected, do nothing (don't deselect)
        }
      } else {
        // Single select mode - only select, don't deselect on normal click
        if (!isItemSelected) {
          // If clicking an unselected item, select it
          const newSelectedItems = [item];
          selectedItemsRef.current = newSelectedItems;
          setSelectedItems(newSelectedItems);
          setActiveItems(new Set([item]));
          setFirstSelectedItem(item);
          // Only call onSelect if this is a new selection (not already active)
          if (!isItemActive) {
            callOnSelect(item); // Pass the current item being selected
          }
        }
        // If item is already selected, do nothing (don't deselect)
      }
      getSelectedItemWidgets(event, listener, name || "");
      if (widgetInstance) {
        delete widgetInstance._wmListItemId;
        widgetInstance.item = item;
      }
      onClick?.(event, widgetInstance); // Use widgetInstance instead of item
    },
    [
      disableitem,
      selectedItems,
      multiselect,
      firstSelectedItem,
      items,
      selectionlimit,
      activeItems,
      setSelectedItems,
      setActiveItems,
      setFirstSelectedItem,
      onSelectionlimitexceed,
      onClick,
      callOnSelect,
    ]
  );

  const handleListItemDoubleClick = useCallback(
    (event: React.MouseEvent, item: T) => {
      onDblclick?.(event, widgetInstance); // Use widgetInstance instead of item
    },
    [onDblclick]
  );

  const handleListItemMouseEnter = useCallback(
    (event: React.MouseEvent, item: T) => {
      onMouseEnter?.(event, widgetInstance); // Use widgetInstance instead of item
    },
    [onMouseEnter]
  );

  const handleListItemMouseLeave = useCallback(
    (event: React.MouseEvent, item: T) => {
      onMouseLeave?.(event, widgetInstance); // Use widgetInstance instead of item
    },
    [onMouseLeave]
  );

  const handleHeaderClick = useCallback(
    (groupKey: string) => {
      if (collapsible) {
        setGroupCollapsed({
          ...groupCollapsed,
          [groupKey]: !groupCollapsed[groupKey],
        });
      }
    },
    [collapsible, groupCollapsed, setGroupCollapsed]
  );

  const handlePaginationChange = useCallback(
    (event: React.MouseEvent | null, widget: unknown, index: number) => {
      if (index && currentPage !== index) {
        // Update the current page
        setCurrentPage(index);

        // Trigger the callbacks - datasource handling is now done in usePagination hook
        onPaginationchange?.(event, widgetInstance, index);
        onPageChange?.(event, index);
      }
    },
    [currentPage, setCurrentPage, onPaginationchange, onPageChange, widgetInstance]
  );

  const handleSetRecord = useCallback(
    (event: React.MouseEvent | null, widget: unknown, index: number, data: T) => {
      if (index) {
        setCurrentPage(index);
        onSetrecord?.(event, widgetInstance, index, data);
      }
    },
    [setCurrentPage, onSetrecord]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      // Update the current page
      setCurrentPage(page);

      // For server-side pagination, invoke the datasource
      if (isServerSidePagination && datasource && typeof datasource.invoke === "function") {
        // Set loading state
        setIsLoadingMore(true);

        // Invoke datasource for the new page
        const invokeResult = datasource.invoke({ page: page });
        Promise.resolve(invokeResult)
          .then(() => {
            // Trigger the callbacks after successful data fetch
            onPaginationchange?.(null, widgetInstance, page);
            onPageChange?.(null, page);
            setIsLoadingMore(false);
          })
          .catch((error: Error) => {
            console.error("Error loading page data:", error);
            setIsLoadingMore(false);
            // Revert to previous page on error
            setCurrentPage(currentPage);
          });
      } else {
        // For client-side pagination, just trigger callbacks
        onPaginationchange?.(null, widgetInstance, page);
        onPageChange?.(null, page);
      }
    },
    [
      setCurrentPage,
      onPaginationchange,
      onPageChange,
      widgetInstance,
      currentPage,
      setIsLoadingMore,
      isServerSidePagination,
      datasource,
    ]
  );

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);

    const pageSize = pagesize || 10;
    let nextPage: number;

    // For server-side pagination
    if (isServerSidePagination && datasource && typeof datasource.invoke === "function") {
      // For On-Demand navigation, use our tracked page state
      if (navigation === "On-Demand" && onDemandCurrentPage !== undefined) {
        // onDemandCurrentPage is 0-indexed (0 = page 1)
        // We need to load the next page: current + 1, then convert to 1-indexed for API
        const nextPageZeroIndexed = onDemandCurrentPage + 1;
        nextPage = nextPageZeroIndexed + 1; // Convert to 1-indexed for API
      } else {
        // For other navigation types, use pagination metadata
        const currentPageFromMeta = datasource.pagination?.number;
        if (currentPageFromMeta !== undefined) {
          // currentPageFromMeta is 0-indexed, add 2 to get next page for 1-indexed API
          nextPage = currentPageFromMeta + 2;
        } else {
          // Fallback calculation
          const loadedItems = items.length;
          const currentPage = Math.floor(loadedItems / pageSize);
          nextPage = currentPage + 1;
        }
      }

      // Invoke the datasource for the next page
      // Wrap the result in Promise.resolve to handle cases where invoke doesn't return a Promise
      const invokeResult = datasource.invoke({ page: nextPage });
      Promise.resolve(invokeResult)
        .then(() => {
          // Update visible items to reflect the expected count
          setVisibleItems(visibleItems + pageSize);

          // For On-Demand, update the page state after successful load
          if (navigation === "On-Demand" && setOnDemandCurrentPage) {
            // Page has been loaded, update to the loaded page number (0-indexed)
            setOnDemandCurrentPage(onDemandCurrentPage! + 1);
          }

          setIsLoadingMore(false);
        })
        .catch((error: Error) => {
          console.error("Error loading more data:", error);
          setIsLoadingMore(false);
        });
    } else {
      // Client-side pagination
      const currentPage = Math.floor(visibleItems / pageSize);
      nextPage = currentPage + 1;
      setVisibleItems(min([visibleItems + pageSize, items.length]) as number);
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 10);
    }

    onPageChange?.(null, nextPage);
  }, [
    setIsLoadingMore,
    setVisibleItems,
    visibleItems,
    items.length,
    onPageChange,
    datasource,
    pagesize,
    navigation,
    onDemandCurrentPage,
    setOnDemandCurrentPage,
  ]);

  return {
    handleListItemClick,
    handleListItemDoubleClick,
    handleListItemMouseEnter,
    handleListItemMouseLeave,
    handleHeaderClick,
    handlePaginationChange,
    handleSetRecord,
    handlePageChange,
    handleLoadMore,
  };
};
