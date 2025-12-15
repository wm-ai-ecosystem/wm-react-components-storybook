import { useState, useEffect, useMemo } from "react";
import { ceil, sumBy, slice, split, map, filter, toNumber, head, isArray, get } from "lodash-es";
import { ListItemData } from "../props";
import { UseListPaginationProps, ListPaginationState } from "./props";
import { DEFAULT_PAGINATION_META } from "../utils/constants";

/**
 * Custom hook for managing list pagination
 * Handles both regular and grouped data pagination
 * Uses pagination metadata from datasource when available
 */
export const useListPagination = <T extends ListItemData = ListItemData>(
  props: UseListPaginationProps<T>
): ListPaginationState<T> => {
  const {
    items,
    groupedData,
    groupby,
    pagesize,
    allowpagesizechange,
    pagesizeoptions,
    navigation,
    initialPage = 1,
    datasource,
  } = props;

  // Get pagination metadata from datasource if available
  const paginationMeta = useMemo(() => {
    // Default pagination metadata
    let metadata = DEFAULT_PAGINATION_META; // Try all possible locations where pagination metadata might be found
    if (datasource) {
      if (datasource.pagination) {
        metadata = datasource.pagination;
      }
    }

    return metadata;
  }, [datasource, items, pagesize]);

  // Initialize page size based on allowpagesizechange
  const getInitialPageSize = () => {
    // Always use the pagesize prop first (which may contain the restored value)
    // Only fall back to first option if pagesize is not provided
    if (pagesize) {
      return pagesize;
    }

    // Use paginationMeta.size if available
    if (paginationMeta?.size) {
      return paginationMeta.size;
    }

    if (allowpagesizechange) {
      // Parse pagesizeoptions and use the first value as fallback
      const firstOption = head(
        filter(
          map(split(pagesizeoptions, ","), opt => toNumber(opt.trim())),
          opt => !isNaN(opt)
        )
      );
      return firstOption || 10; // Default to 10 if no valid options
    }

    return 10; // Default page size
  };

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [currentPageSize, setCurrentPageSize] = useState<number>(getInitialPageSize());
  const [visibleItems, setVisibleItems] = useState<number>(() => {
    // For on-demand navigation, show items up to the initial page
    if (navigation === "On-Demand" && initialPage > 1) {
      return initialPage * pagesize;
    }
    return pagesize;
  });

  // Calculate total pages based on datasource pagination metadata if available
  const totalPages = useMemo(() => {
    // If pagination metadata is available, use it
    if (paginationMeta.totalPages !== undefined) {
      return paginationMeta.totalPages;
    }

    // Fall back to calculating from items length
    const validItems = isArray(items) ? items : [];
    return ceil(validItems.length / currentPageSize);
  }, [items, currentPageSize, paginationMeta]);

  // Calculate total items for grouped data or from pagination metadata
  const totalItems = useMemo(() => {
    // If pagination metadata is available, use it
    if (paginationMeta.totalElements !== undefined) {
      return paginationMeta.totalElements;
    }

    // For grouped data
    if (groupby && groupedData && isArray(groupedData)) {
      return sumBy(groupedData, group => group.data?.length || 0);
    }

    // Fall back to items length
    return isArray(items) ? items.length : 0;
  }, [groupedData, items, paginationMeta, groupby]);

  // Calculate effective total pages (considers grouping and pagination metadata)
  const effectiveTotalPages = useMemo(() => {
    // If pagination metadata has totalPages, use it directly
    if (paginationMeta.totalPages !== undefined) {
      return paginationMeta.totalPages;
    }

    // For grouped data
    if (groupby && groupedData) {
      return ceil(totalItems / currentPageSize);
    }

    return totalPages;
  }, [groupby, groupedData, totalItems, currentPageSize, totalPages, paginationMeta]);

  // Calculate current page items
  const currentPageItems = useMemo(() => {
    if (!items || !isArray(items) || items.length === 0) {
      return { currentItems: [] as T[], startIndex: 0, endIndex: 0 };
    }

    const startIndex = navigation === "On-Demand" ? 0 : (currentPage - 1) * currentPageSize;
    const endIndex = navigation === "On-Demand" ? visibleItems : currentPage * currentPageSize;

    const currentItems = slice(items, startIndex, endIndex);

    return { currentItems, startIndex, endIndex };
  }, [items, navigation, currentPage, currentPageSize, visibleItems]);

  // Sync current page with datasource pagination metadata for SSP
  useEffect(() => {
    // Only sync if we have server-side pagination with metadata
    if (
      datasource &&
      paginationMeta.number !== undefined &&
      paginationMeta.totalElements !== undefined
    ) {
      // paginationMeta.number is 0-indexed, so add 1 for 1-indexed page number
      const serverPage = paginationMeta.number + 1;

      // Only update if the server page is different from current page
      if (serverPage !== currentPage && serverPage > 0 && serverPage <= effectiveTotalPages) {
        setCurrentPage(serverPage);
      }
    }
  }, [paginationMeta.number, paginationMeta.totalElements, effectiveTotalPages]);

  return {
    currentPage,
    setCurrentPage,
    currentPageSize,
    setCurrentPageSize,
    totalPages,
    visibleItems,
    setVisibleItems,
    currentPageItems,
    effectiveTotalPages,
    totalItems,
    paginationMeta,
  };
};
