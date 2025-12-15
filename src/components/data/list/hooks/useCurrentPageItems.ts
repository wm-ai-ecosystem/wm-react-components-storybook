import { useMemo } from "react";
import { LIST_NAVIGATION_TYPES } from "../utils/constants";
import { ListItemData } from "../props";
import { UseCurrentPageItemsProps, CurrentPageItemsResult } from "../components/props";

/**
 * Hook for calculating current page items based on navigation type and pagination
 */
export const useCurrentPageItems = <T extends ListItemData = ListItemData>({
  items,
  navigation,
  currentPage,
  pagesize,
  visibleItems,
  isServerPaginated = false,
}: UseCurrentPageItemsProps<T>): CurrentPageItemsResult<T> => {
  return useMemo(() => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return { currentItems: [] as T[], startIndex: 0, endIndex: 0 };
    }

    // For server-paginated data, use all items as-is since the server has already paginated the data
    if (isServerPaginated) {
      return {
        currentItems: items,
        startIndex: 0,
        endIndex: items.length,
      };
    }

    // For client-side pagination, calculate the slice indexes
    const startIndex =
      navigation === LIST_NAVIGATION_TYPES.ON_DEMAND ? 0 : (currentPage - 1) * pagesize;
    const endIndex =
      navigation === LIST_NAVIGATION_TYPES.ON_DEMAND ? visibleItems : currentPage * pagesize;

    const currentItems = items.slice(startIndex, endIndex);

    return { currentItems, startIndex, endIndex };
  }, [items, navigation, currentPage, pagesize, visibleItems, isServerPaginated]);
};
