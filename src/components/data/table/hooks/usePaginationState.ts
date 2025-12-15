import { useCallback, useRef, useEffect } from "react";
import { UsePaginationStateProps, UsePaginationStateReturn } from "../props";

/**
 * Hook to manage pagination state and behavior
 */
export const usePaginationState = ({
  table,
  editmode,
  internalDataset,
  isAddingNewRow,
  cancelEditing,
  datasource,
  isServerSidePagination,
}: UsePaginationStateProps): UsePaginationStateReturn => {
  const prevPageRef = useRef(table.getState().pagination.pageIndex);

  // Hide add new row when page changes
  useEffect(() => {
    const currentPage = table.getState().pagination.pageIndex;
    if (currentPage !== prevPageRef.current && isAddingNewRow) {
      cancelEditing();
    }
    prevPageRef.current = currentPage;
  }, [table, isAddingNewRow, cancelEditing]);

  const handlePaginationChange = useCallback(
    (event: any, widget: any, index: number) => {
      if (editmode === "quickedit" && !isServerSidePagination) {
        const newPageIndex = index - 1; // Convert to 0-based index
        const pageSize = table.getState().pagination.pageSize;
        const dataLength = internalDataset.length;
        const startIdx = newPageIndex * pageSize;

        // If this would be an empty page (no data on it), prevent navigation
        if (startIdx >= dataLength && dataLength > 0) {
          // Calculate the correct page to navigate to
          const correctPage = Math.ceil(dataLength / pageSize);
          if (correctPage > 0) {
            table.setPageIndex(correctPage - 1); // Convert to 0-based index
            return;
          }
        }
      }
      table.setPageIndex(index - 1);
    },
    [editmode, internalDataset, table, isServerSidePagination]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      // Update datasource maxResults if datasource has paging capability
      if (isServerSidePagination && datasource && datasource.maxResults !== undefined) {
        datasource.maxResults = newPageSize;
      }

      table.setPageSize(newPageSize);
      table.setPageIndex(0); // Reset to first page
    },
    [table, isServerSidePagination, datasource]
  );

  return {
    handlePaginationChange,
    handlePageSizeChange,
  };
};
