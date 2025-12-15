import { useMemo } from "react";
import { isArray, slice, min, find, forEach, flatMap } from "lodash-es";
import { LIST_NAVIGATION_TYPES } from "../utils/constants";
import { ListItemData } from "../props";
import { UsePaginatedGroupedDataProps, PaginatedGroupedDataItem } from "../components/props";

/**
 * Hook for calculating paginated grouped data based on navigation type and pagination
 */
export const usePaginatedGroupedData = <T extends ListItemData = ListItemData>({
  groupedData,
  navigation,
  currentPage,
  pagesize,
  visibleItems,
}: UsePaginatedGroupedDataProps<T>): PaginatedGroupedDataItem<T>[] => {
  return useMemo(() => {
    if (!groupedData || !isArray(groupedData) || groupedData.length === 0) {
      return [];
    }

    // For on-demand navigation, show all items up to visibleItems
    if (navigation === LIST_NAVIGATION_TYPES.ON_DEMAND) {
      let itemCount = 0;
      const paginatedGroups: PaginatedGroupedDataItem<T>[] = [];

      for (const group of groupedData) {
        const remainingItems = visibleItems - itemCount;
        if (remainingItems <= 0) break;

        const groupItems = slice(group.data, 0, min([group.data.length, remainingItems]) as number);
        if (groupItems.length > 0) {
          paginatedGroups.push({
            ...group,
            data: groupItems,
            startIndexInGroup: 0,
          });
          itemCount += groupItems.length;
        }
      }

      return paginatedGroups;
    }

    // For regular pagination
    const startIndex = (currentPage - 1) * pagesize;
    const endIndex = currentPage * pagesize;

    // Flatten all items with their group information
    interface FlattenedItem {
      item: T;
      groupKey: string;
      indexInGroup: number;
      globalIndex: number;
    }

    let globalIndexCounter = 0;
    const flattenedItems: FlattenedItem[] = flatMap(groupedData, group => {
      const groupStartIndex = globalIndexCounter;
      const items = group.data.map((item, indexInGroup) => ({
        item,
        groupKey: group.key,
        indexInGroup,
        globalIndex: groupStartIndex + indexInGroup,
      }));
      globalIndexCounter += group.data.length;
      return items;
    });

    // Get items for current page
    const pageItems = slice(flattenedItems, startIndex, endIndex);

    // Reconstruct groups with only the items on the current page
    const groupsMap = new Map<string, PaginatedGroupedDataItem<T>>();

    forEach(pageItems, ({ item, groupKey, indexInGroup }) => {
      if (!groupsMap.has(groupKey)) {
        const originalGroup = find(groupedData, g => g.key === groupKey);
        groupsMap.set(groupKey, {
          key: groupKey,
          data: [],
          originalDataLength: originalGroup?.data.length || 0,
          startIndexInGroup: indexInGroup,
        });
      }
      groupsMap.get(groupKey)!.data.push(item);
    });

    // Convert map to array and maintain original group order
    const result: PaginatedGroupedDataItem<T>[] = [];
    for (const group of groupedData) {
      if (groupsMap.has(group.key)) {
        result.push(groupsMap.get(group.key)!);
      }
    }

    return result;
  }, [groupedData, navigation, currentPage, pagesize, visibleItems]);
};
