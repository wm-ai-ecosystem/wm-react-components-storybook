import { useCallback, useState } from "react";
import { UsePaginationStateProps, UsePaginationStateReturn, PaginationState } from "../props";

/**
 * Hook to manage pagination state and behavior for TanStack Table
 * Provides controlled pagination state management
 */
export const usePaginationState = ({
  initialPage,
  initialPageSize,
  editmode,
  internalDataset,
  datasource,
  isServerSidePagination,
}: UsePaginationStateProps): UsePaginationStateReturn => {
  // Local state for pagination - needed for controlled TanStack Table pagination
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: initialPage - 1, // Convert to 0-based index
    pageSize: initialPageSize,
  });

  // Direct pagination handler - avoids redundant table.setPageIndex() call
  const handlePaginationChange = useCallback(
    (event: any, widget: any, index: number) => {
      const newPageIndex = index - 1; // Convert to 0-based index

      // Handle quickedit edge case - prevent navigation to empty pages
      if (editmode === "quickedit" && !isServerSidePagination) {
        const pageSize = paginationState.pageSize;
        const dataLength = internalDataset.length;
        const startIdx = newPageIndex * pageSize;

        if (startIdx >= dataLength && dataLength > 0) {
          const correctPage = Math.ceil(dataLength / pageSize);
          if (correctPage > 0) {
            setPaginationState(prev => ({ ...prev, pageIndex: correctPage - 1 }));
            return;
          }
        }
      }

      // Directly update pagination state - no need for table.setPageIndex() roundtrip
      setPaginationState(prev => ({ ...prev, pageIndex: newPageIndex }));
    },
    [editmode, isServerSidePagination, internalDataset.length, paginationState.pageSize]
  );

  // Page size change handler
  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      // Update datasource maxResults if datasource has paging capability
      if (isServerSidePagination && datasource && datasource.maxResults !== undefined) {
        datasource.maxResults = newPageSize;
      }

      // Directly update pagination state - pageSize and reset to first page
      setPaginationState({ pageIndex: 0, pageSize: newPageSize });
    },
    [isServerSidePagination, datasource]
  );

  return {
    paginationState,
    setPaginationState,
    handlePaginationChange,
    handlePageSizeChange,
  };
};
