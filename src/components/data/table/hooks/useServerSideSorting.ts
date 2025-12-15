import React, { useEffect, useRef, useCallback } from "react";
import { SortingState } from "@tanstack/react-table";
import { ToastType } from "../props";
import { refreshDataSource } from "../utils/crud-handlers";
import { addUniqueRowIds } from "../utils";
import { LiveVariableConfig } from "@wavemaker/react-runtime/variables/live-variable";

export interface UseServerSideSortingProps {
  datasource?: LiveVariableConfig;
  sorting: SortingState;
  setInternalDataset: React.Dispatch<React.SetStateAction<any[]>>;
  showToast?: (message: string, type: ToastType) => void;
  isServerSidePagination: boolean;
  pageIndex: number;
  onError?: (operation: string, error: any) => void;
  filterFields?: Record<string, any>;
  logicalOp?: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UseServerSideSortingReturn {
  handleSortingChange: (updaterOrValue: React.SetStateAction<SortingState>) => void;
  isServerSideSorting: boolean;
}

/**
 * Hook to handle server-side sorting for table data
 */
export const useServerSideSorting = ({
  datasource,
  sorting,
  setInternalDataset,
  showToast,
  isServerSidePagination,
  pageIndex,
  onError,
  filterFields,
  logicalOp,
  setLoading,
}: UseServerSideSortingProps): UseServerSideSortingReturn => {
  const prevSortingRef = useRef<SortingState>(sorting);
  const prevPageRef = useRef<number>(pageIndex);
  const prevFilterRef = useRef<string>("");
  const isMountedRef = useRef(false);
  const isFetchingRef = useRef(false);

  // Determine if we should use server-side sorting
  const isServerSideSorting = !!(datasource && isServerSidePagination);

  // Convert TanStack sorting state to orderBy string
  const convertSortingToOrderBy = useCallback((sortingState: SortingState): string => {
    if (!sortingState || sortingState.length === 0) {
      return "";
    }

    // Map sorting state to orderBy format (e.g., "name asc, age desc")
    return sortingState.map(sort => `${sort.id} ${sort.desc ? "desc" : "asc"}`).join(", ");
  }, []);

  // Fetch data with sorting
  const fetchSortedData = useCallback(
    async (forcePage?: number) => {
      if (!datasource || !isServerSideSorting || isFetchingRef.current) {
        return;
      }

      // Prevent duplicate fetches
      isFetchingRef.current = true;
      setLoading(true);

      try {
        const orderBy = convertSortingToOrderBy(sorting);
        // Use forcePage if provided (for sorting changes), otherwise use current page
        const currentPage = forcePage !== undefined ? forcePage : pageIndex + 1; // Convert 0-based to 1-based

        const response = await refreshDataSource(datasource, {
          orderBy,
          page: currentPage || 1,
          filterFields: filterFields || {},
          condition: logicalOp || "",
        });

        if (response) {
          let responseData = [];

          // Handle different response formats
          if (response.data) {
            responseData = response.data;
          }
          // Add unique row IDs to the server response data
          const dataWithIds = addUniqueRowIds(responseData);
          setInternalDataset(dataWithIds);
        }
      } catch (error: any) {
        console.error("Error fetching sorted data:", error);
        if (showToast) {
          showToast("Failed to sort data", "Error");
        }
        if (onError) {
          onError("sort", error);
        }
      } finally {
        isFetchingRef.current = false;
        setLoading(false);
      }
    },
    [
      datasource,
      isServerSideSorting,
      sorting,
      pageIndex,
      convertSortingToOrderBy,
      setInternalDataset,
      showToast,
      onError,
      filterFields,
      logicalOp,
    ]
  );

  // Combined effect to handle sorting, pagination, and filter changes
  useEffect(() => {
    // Skip if not server-side sorting
    if (!isServerSideSorting) {
      return;
    }

    // Skip initial mount
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      prevSortingRef.current = sorting;
      prevPageRef.current = pageIndex;
      prevFilterRef.current = JSON.stringify({ filterFields, logicalOp });
      return;
    }

    // Check what changed
    const sortingString = JSON.stringify(sorting);
    const prevSortingString = JSON.stringify(prevSortingRef.current);
    const filterString = JSON.stringify({ filterFields, logicalOp });

    const sortingChanged = sortingString !== prevSortingString;
    // const pageChanged = pageIndex !== prevPageRef.current;
    const filterChanged = filterString !== prevFilterRef.current;

    // Only fetch if something actually changed
    if (sortingChanged || filterChanged) {
      // Update refs before fetching to prevent duplicate calls
      prevSortingRef.current = sorting;
      prevPageRef.current = pageIndex;
      prevFilterRef.current = filterString;

      // When sorting or filter changes, fetch from page 1
      fetchSortedData(1);
    }
  }, [sorting, pageIndex, filterFields, logicalOp, isServerSideSorting, fetchSortedData]);

  // Custom sorting change handler
  const handleSortingChange = useCallback((updaterOrValue: React.SetStateAction<SortingState>) => {
    // This will be called instead of the default setSorting
    // We'll still update the sorting state, but also trigger server-side fetch
    return updaterOrValue;
  }, []);

  return {
    handleSortingChange,
    isServerSideSorting,
  };
};
