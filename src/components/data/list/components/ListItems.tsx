import React, { useMemo, useEffect } from "react";
import { LoadMoreButton } from "./LoadMoreButton";
import { StandardListItems } from "./StandardListItems";
import { GroupedListItems } from "./GroupedListItems";
import { LIST_NAVIGATION_TYPES } from "../utils/constants";
import { ListItemsProps } from "./props";
import { useCurrentPageItems, usePaginatedGroupedData } from "../hooks";
import { ListItemData } from "../props";

/**
 * Main ListItems component - orchestrates rendering of list items
 * with support for grouping, pagination, and on-demand loading
 */
export const ListItems = <T extends ListItemData = ListItemData>({
  items,
  groupedData,
  groupby,
  navigation,
  currentPage,
  pagesize,
  visibleItems,
  orderby,
  disableitem,
  itemclass,
  itemsPerRowClass,
  direction,
  enablereorder,
  activeItems,
  name,
  tabIndex,
  renderItem,
  itemTemplate,
  nodatamessage,
  ondemandmessage,
  loadingicon,
  loadingdatamsg,
  paginationclass,
  isLoadingMore,
  collapsible,
  showcount,
  groupCollapsed,
  handleListItemClick,
  handleListItemDoubleClick,
  handleListItemMouseEnter,
  handleListItemMouseLeave,
  handleDragEnd,
  handleLoadMore,
  handleHeaderClick,
  onBeforedatarender,
  onRender,
  widgetInstance,
  rawDataset,
  datasource,
  totalItems,
  isServerSidePagination,
  showNavigation,
}: ListItemsProps<T>) => {
  // Use the server-side pagination flag passed from parent
  const isServerPaginated = !!isServerSidePagination;

  // Get pagination metadata from datasource
  const paginationMeta = datasource?.pagination;

  // Calculate current page items from raw dataset (unsorted) for onBeforedatarender
  const rawCurrentPageItems = useCurrentPageItems<T>({
    items: rawDataset || [],
    navigation,
    currentPage,
    pagesize,
    visibleItems,
    isServerPaginated, // Pass flag to indicate server pagination
  });

  // Calculate current page items from sorted dataset for rendering and onRender
  const currentPageItems = useCurrentPageItems<T>({
    items,
    navigation,
    currentPage,
    pagesize,
    visibleItems,
    isServerPaginated, // Pass flag to indicate server pagination
  });

  // Calculate paginated grouped data
  const paginatedGroupedData = usePaginatedGroupedData<T>({
    groupedData: groupedData || [],
    navigation,
    currentPage,
    pagesize,
    visibleItems,
  });

  // Create stable identifiers for data changes
  const rawCurrentItemsKey = useMemo(
    () => JSON.stringify(rawCurrentPageItems.currentItems),
    [rawCurrentPageItems.currentItems]
  );

  const currentItemsKey = useMemo(
    () => JSON.stringify(currentPageItems.currentItems),
    [currentPageItems.currentItems]
  );

  const paginatedGroupedDataKey = useMemo(
    () => JSON.stringify(paginatedGroupedData),
    [paginatedGroupedData]
  );

  // Call onBeforedatarender with unsorted current page items - only when data changes
  useEffect(() => {
    if (onBeforedatarender && widgetInstance) {
      if (groupby) {
        // For grouped data, we need to get unsorted items for the current page
        // Since grouped data is already sorted, we'll use the raw dataset approach
        onBeforedatarender(widgetInstance, rawCurrentPageItems.currentItems);
      } else {
        // For standard lists, use raw current page items (unsorted)
        onBeforedatarender(widgetInstance, rawCurrentPageItems.currentItems);
      }
    }
  }, [rawCurrentItemsKey, groupby]);

  // Call onRender with sorted current page items - only when data changes
  useEffect(() => {
    if (onRender && widgetInstance) {
      const timer = setTimeout(() => {
        if (groupby) {
          // For grouped data, flatten the current page grouped items (sorted)
          const currentPageGroupedItems = paginatedGroupedData.reduce((acc: T[], group) => {
            return acc.concat(group.data);
          }, []);
          onRender(widgetInstance, currentPageGroupedItems);
        } else {
          // For standard lists, use sorted current page items
          onRender(widgetInstance, currentPageItems.currentItems);
        }
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [currentItemsKey, paginatedGroupedDataKey, groupby]);

  // Calculate total items for grouped data
  const totalGroupedItems = useMemo(() => {
    if (!groupedData || !Array.isArray(groupedData)) return 0;
    return groupedData.reduce((total, group) => total + (group.data?.length || 0), 0);
  }, [groupedData]);

  // Determine if load more button should be shown
  const shouldShowLoadMore = useMemo(() => {
    if (navigation !== LIST_NAVIGATION_TYPES.ON_DEMAND) {
      return false;
    }

    // If we have pagination metadata with 'last' property, use it
    if (paginationMeta?.last !== undefined) {
      return !paginationMeta.last; // Show Load More if not the last page
    }

    // For server-side pagination with totalItems
    if (totalItems !== undefined && datasource) {
      if (groupby) {
        // For grouped data, we need to check if all groups have been loaded
        // This is tricky with server-side pagination as groups might span pages
        return totalGroupedItems < totalItems;
      } else {
        // For non-grouped data, check if all items have been loaded
        return items.length < totalItems;
      }
    }

    // For client-side pagination
    if (groupby) {
      return visibleItems < totalGroupedItems;
    } else {
      return visibleItems < items.length;
    }
  }, [
    navigation,
    paginationMeta?.last,
    totalItems,
    datasource,
    groupby,
    totalGroupedItems,
    items.length,
    visibleItems,
  ]);

  return (
    <>
      {groupby ? (
        <GroupedListItems<T>
          groupedData={groupedData || []}
          paginatedGroupedData={paginatedGroupedData}
          direction={direction}
          disableitem={disableitem}
          itemclass={itemclass}
          itemsPerRowClass={itemsPerRowClass}
          name={name}
          tabIndex={tabIndex}
          activeItems={activeItems}
          collapsible={collapsible}
          showcount={showcount}
          groupCollapsed={groupCollapsed}
          renderItem={renderItem}
          itemTemplate={itemTemplate}
          nodatamessage={nodatamessage}
          onItemClick={handleListItemClick}
          onItemDoubleClick={handleListItemDoubleClick}
          onItemMouseEnter={handleListItemMouseEnter}
          onItemMouseLeave={handleListItemMouseLeave}
          onHeaderClick={handleHeaderClick}
        />
      ) : (
        <StandardListItems<T>
          items={items}
          currentPageItems={currentPageItems}
          direction={direction}
          enablereorder={enablereorder}
          disableitem={disableitem}
          itemclass={itemclass}
          itemsPerRowClass={itemsPerRowClass}
          name={name}
          tabIndex={tabIndex}
          activeItems={activeItems}
          renderItem={renderItem}
          itemTemplate={itemTemplate}
          nodatamessage={nodatamessage}
          onItemClick={handleListItemClick}
          onItemDoubleClick={handleListItemDoubleClick}
          onItemMouseEnter={handleListItemMouseEnter}
          onItemMouseLeave={handleListItemMouseLeave}
          onDragEnd={handleDragEnd}
        />
      )}

      {shouldShowLoadMore && showNavigation !== false && (
        <LoadMoreButton
          paginationclass={paginationclass}
          isLoadingMore={isLoadingMore}
          loadingicon={loadingicon}
          loadingdatamsg={loadingdatamsg}
          ondemandmessage={ondemandmessage}
          onLoadMore={handleLoadMore}
        />
      )}
    </>
  );
};
