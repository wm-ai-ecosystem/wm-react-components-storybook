import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { isArray, isEmpty, isNull } from "lodash";
import { UsePaginationProps } from "./props";
import { addUniqueRowIds } from "../../table/utils";

// Utility function to check if the datasource has paging capability
const isDataSourceHasPaging = (datasource: any): boolean => {
  return (
    datasource && typeof datasource.execute === "function" && datasource.execute("IS_PAGEABLE")
  );
};

// Utility function to calculate paging values
const calculatePagingValues = (dataSize: number, maxResults: number): number => {
  return dataSize > maxResults ? Math.ceil(dataSize / maxResults) : dataSize < 0 ? 0 : 1;
};

export const usePagination = ({
  dataset,
  maxResults = 10,
  currentPage: initialPage,
  navigation,
  name,
  listener,
  onPaginationChange,
  onSetRecord,
  onPageSizeChange,
  paginationMeta,
  totalItems,
  datasource,
  setIsLoadingMore,
  isServerSidePagination = false,
  datasourceInvokeOptions,
}: UsePaginationProps) => {
  // Extract onPageSizeChange from listener if not provided directly
  const pageSizeChangeHandler = onPageSizeChange || listener?.onPageSizeChange;
  const widgetInstance = listener?.Widgets?.[name];
  // Consolidated pagination state
  const [paginationState, setPaginationState] = useState({
    currentPage: initialPage || 1,
    pageCount: 0,
    dataSize: 0,
    currentMaxResults: paginationMeta?.size || maxResults,
    error: null as string | null,
  });

  // Data state
  const [dataState, setDataState] = useState({
    fullData: [] as any[],
    result: [] as any[],
  });

  // Accumulated data state - used for both Scroll and On-Demand navigation
  // Both modes need to accumulate data as user loads more pages
  const [accumulatingState, setAccumulatingState] = useState({
    accumulatedData: [] as any[],
    lastLoadedPage: 0,
    isAccumulating: navigation === "Scroll" || navigation === "On-Demand",
    isInitialized: false,
  });

  // Navigation disable states - consolidated for better performance
  const [disableStates, setDisableStates] = useState({
    isDisableNext: true,
    isDisablePrevious: true,
    isDisableFirst: true,
    isDisableLast: true,
    isDisableCurrent: false,
    isDisableCount: false,
  });
  const isFetchingRef = useRef(false);

  // Refs for accumulated data (Scroll and On-Demand)
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLElement | null>(null);
  const accumulatingStateRef = useRef(accumulatingState);

  // Keep ref in sync with state
  useEffect(() => {
    accumulatingStateRef.current = accumulatingState;
  }, [accumulatingState]);

  // Memoized computed values for better performance
  const isFirstPage = useMemo(() => {
    // First check pagination metadata if available
    if (paginationMeta && paginationMeta.first !== undefined) {
      return paginationMeta.first;
    }
    // Fall back to calculation
    return paginationState.currentPage === 1 || !paginationState.currentPage;
  }, [paginationState.currentPage, paginationMeta]);

  const isLastPage = useMemo(() => {
    // First check pagination metadata if available
    if (paginationMeta && paginationMeta.last !== undefined) {
      return paginationMeta.last;
    }
    // Fall back to calculation
    return paginationState.currentPage === paginationState.pageCount;
  }, [paginationState.currentPage, paginationState.pageCount, paginationMeta]);

  // Navigation controls
  const allowedNavControls = ["Basic", "Classic", "Pager", "Scroll", "On-Demand"] as const;
  const getValidNavControl = (
    nav?: string
  ): "Basic" | "Classic" | "Pager" | "Scroll" | "On-Demand" => {
    return allowedNavControls.includes(nav as (typeof allowedNavControls)[number])
      ? (nav as "Basic" | "Classic" | "Pager" | "Scroll" | "On-Demand")
      : "Basic";
  };
  const [navcontrols, setNavcontrols] = useState<
    "Basic" | "Classic" | "Pager" | "Scroll" | "On-Demand"
  >(getValidNavControl(navigation));

  // Function to invoke datasource for API-based pagination
  const datasourceInvoke = useCallback(
    (page: number, size?: number, isScrollMode = false) => {
      // Only invoke datasource if server-side pagination is enabled
      if (isServerSidePagination && datasource && typeof datasource.invoke === "function") {
        // Prevent concurrent requests
        if (isFetchingRef.current) {
          return Promise.resolve();
        }

        isFetchingRef.current = true;
        setPaginationState(prev => ({ ...prev, error: null }));

        try {
          // Prepare invoke options with page and optionally size
          const invokeOptions: any = { page };
          if (size !== undefined) {
            invokeOptions.size = size;
          }

          // Include additional invoke options if provided (for table sorting/filtering)
          if (datasourceInvokeOptions) {
            // Merge the additional options with page/size
            Object.assign(invokeOptions, datasourceInvokeOptions);
          }

          // Wrap the result in Promise.resolve to handle cases where invoke doesn't return a Promise
          const result = datasource.invoke(invokeOptions);
          return Promise.resolve(result)
            .then(response => {
              isFetchingRef.current = false;

              // For accumulating mode (Scroll/On-Demand), we need to accumulate data instead of replacing
              if (isScrollMode && response && response.data) {
                // Get the new accumulated data using ref to avoid circular dependency
                const currentAccumulatedData = accumulatingStateRef.current.accumulatedData;

                // Ensure unique row IDs using the existing utility
                const newDataWithIds = addUniqueRowIds(response.data);

                const newAccumulatedData = [...currentAccumulatedData, ...newDataWithIds];

                setAccumulatingState(prev => ({
                  ...prev,
                  accumulatedData: newAccumulatedData,
                  lastLoadedPage: page,
                }));

                // Immediately update the data state with accumulated data
                setDataState(prev => ({
                  ...prev,
                  fullData: newAccumulatedData,
                  result: newAccumulatedData,
                }));
              }

              return response;
            })
            .catch((error: any) => {
              isFetchingRef.current = false;
              console.error("Error fetching page data:", error);
              setPaginationState(prev => ({
                ...prev,
                error: error.message || "Failed to fetch page data",
              }));
              return Promise.reject(error);
            });
        } catch (error: any) {
          isFetchingRef.current = false;
          console.error("Error invoking datasource:", error);
          setPaginationState(prev => ({
            ...prev,
            error: error.message || "Failed to invoke datasource",
          }));
          return Promise.reject(error);
        }
      }
      return Promise.resolve();
    },
    [datasource, isServerSidePagination, datasourceInvokeOptions]
  );

  // Function to load more data for Scroll and On-Demand navigation
  const loadMoreData = useCallback(() => {
    // Support both Scroll and On-Demand navigation
    const isAccumulatingMode = navigation === "Scroll" || navigation === "On-Demand";
    if (!isAccumulatingMode || isLastPage || isFetchingRef.current) {
      return;
    }

    // For client-side pagination (non-server), just show more items
    if (!isServerSidePagination) {
      const currentVisible = accumulatingStateRef.current.accumulatedData.length;
      const totalAvailable = dataState.fullData.length;
      const nextBatchSize = paginationState.currentMaxResults;
      const newVisibleCount = Math.min(currentVisible + nextBatchSize, totalAvailable);

      // Get next batch of data
      const nextBatch = dataState.fullData.slice(currentVisible, newVisibleCount);
      const newAccumulatedData = [...accumulatingStateRef.current.accumulatedData, ...nextBatch];

      setAccumulatingState(prev => ({
        ...prev,
        accumulatedData: newAccumulatedData,
        lastLoadedPage: prev.lastLoadedPage + 1,
      }));

      // Update the result to show accumulated data
      setDataState(prev => ({
        ...prev,
        result: newAccumulatedData,
      }));

      // Update current page
      const nextPage = accumulatingStateRef.current.lastLoadedPage + 1;
      setPaginationState(prev => ({ ...prev, currentPage: nextPage }));

      if (onPaginationChange) {
        onPaginationChange(null, widgetInstance, nextPage);
      }

      return;
    }

    // Server-side pagination
    const nextPage = accumulatingStateRef.current.lastLoadedPage + 1;

    if (setIsLoadingMore) {
      setIsLoadingMore(true);
    }

    datasourceInvoke(nextPage, paginationState.currentMaxResults, true)
      .then(() => {
        setPaginationState(prev => ({ ...prev, currentPage: nextPage }));

        if (onPaginationChange) {
          onPaginationChange(null, widgetInstance, nextPage);
        }

        if (setIsLoadingMore) {
          setIsLoadingMore(false);
        }
      })
      .catch(() => {
        if (setIsLoadingMore) {
          setIsLoadingMore(false);
        }
      });
  }, [
    navigation,
    isServerSidePagination,
    isLastPage,
    setIsLoadingMore,
    datasourceInvoke,
    paginationState.currentMaxResults,
    onPaginationChange,
    widgetInstance,
    dataState.fullData,
  ]);

  // Function to reset accumulated data (for View Less button in On-Demand navigation)
  const resetAccumulatedData = useCallback(() => {
    // Reset to initial state
    setAccumulatingState({
      accumulatedData: [],
      lastLoadedPage: 0,
      isAccumulating: navigation === "On-Demand",
      isInitialized: false,
    });

    // Reset current page to 1
    setPaginationState(prev => ({ ...prev, currentPage: 1 }));

    // For client-side, reset result to first page
    if (!isServerSidePagination && dataState.fullData.length > 0) {
      const firstPageData = dataState.fullData.slice(0, paginationState.currentMaxResults);
      setDataState(prev => ({
        ...prev,
        result: firstPageData,
      }));

      // Re-initialize with first page data
      setTimeout(() => {
        setAccumulatingState({
          accumulatedData: firstPageData,
          lastLoadedPage: 1,
          isAccumulating: true,
          isInitialized: true,
        });
      }, 0);
    }

    // For server-side, refetch first page
    if (isServerSidePagination && datasource && typeof datasource.invoke === "function") {
      if (setIsLoadingMore) {
        setIsLoadingMore(true);
      }

      const invokeOptions: Record<string, string | number | Record<string, unknown>> = { page: 1 };

      // Include additional options if provided
      if (datasourceInvokeOptions) {
        Object.assign(invokeOptions, datasourceInvokeOptions);
      }

      const result = datasource.invoke(invokeOptions);
      Promise.resolve(result)
        .then((response: { data?: unknown[] }) => {
          if (response && response.data) {
            const newDataWithIds = addUniqueRowIds(response.data);
            setAccumulatingState({
              accumulatedData: newDataWithIds,
              lastLoadedPage: 1,
              isAccumulating: true,
              isInitialized: true,
            });
            setDataState(prev => ({
              ...prev,
              fullData: newDataWithIds,
              result: newDataWithIds,
            }));
          }
          if (setIsLoadingMore) {
            setIsLoadingMore(false);
          }
        })
        .catch(() => {
          if (setIsLoadingMore) {
            setIsLoadingMore(false);
          }
        });
    }

    // Trigger pagination change callback
    if (onPaginationChange) {
      onPaginationChange(null, widgetInstance, 1);
    }
  }, [
    navigation,
    isServerSidePagination,
    datasource,
    datasourceInvokeOptions,
    dataState.fullData,
    paginationState.currentMaxResults,
    setIsLoadingMore,
    onPaginationChange,
    widgetInstance,
  ]);

  // Set up intersection observer for infinite scroll
  const setupInfiniteScrollObserver = useCallback(
    (sentinel: HTMLElement | null) => {
      // Clean up existing observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!sentinel || navigation !== "Scroll" || !accumulatingStateRef.current.isInitialized) {
        return;
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          // Only trigger if initialized, intersecting, not last page, and not already fetching
          if (
            entry.isIntersecting &&
            accumulatingStateRef.current.isInitialized &&
            !isLastPage &&
            !isFetchingRef.current
          ) {
            loadMoreData();
          }
        },
        {
          root: null,
          rootMargin: "100px", // Start loading 100px before reaching the bottom
          threshold: 0.1,
        }
      );

      observerRef.current.observe(sentinel);
    },
    [navigation, isLastPage, loadMoreData]
  );

  // Function to reset the paging values to default

  // Function to calculate the paging values

  // Function to set default values to the paging parameters
  const setDefaultPagingValues = useCallback(
    (newDataSize: number, newMaxResults?: number, currentPage?: number) => {
      setPaginationState(prev => {
        // If neither 'dataSize' nor 'maxResults' is set, then set default values to the paging parameters
        if (!newDataSize && !newMaxResults) {
          return {
            ...prev,
            pageCount: 1,
            dataSize: newDataSize,
            currentPage: currentPage !== undefined ? currentPage : prev.currentPage,
          };
        } else {
          // Else, set the specified values and recalculate paging parameters
          const updatedMaxResults = newMaxResults || prev.currentMaxResults;
          const updatedDataSize = newDataSize !== undefined ? newDataSize : prev.dataSize;
          const updatedCurrentPage = currentPage !== undefined ? currentPage : prev.currentPage;

          // Calculate page count based on updated values
          // Use paginationMeta.totalPages if available
          const newPageCount =
            paginationMeta?.totalPages !== undefined
              ? paginationMeta.totalPages
              : updatedDataSize > updatedMaxResults
                ? Math.ceil(updatedDataSize / updatedMaxResults)
                : updatedDataSize < 0
                  ? 0
                  : 1;

          return {
            ...prev,
            currentPage: updatedCurrentPage,
            dataSize: updatedDataSize,
            pageCount: newPageCount,
          };
        }
      });
    },
    [paginationMeta]
  );

  // Function to disable navigation based on the current and total pages
  const disableNavigation = useCallback(() => {
    setDisableStates({
      isDisableFirst: isFirstPage,
      isDisablePrevious: isFirstPage,
      isDisableNext: isLastPage,
      isDisableLast: isLastPage,
      isDisableCurrent: isFirstPage && isLastPage,
      isDisableCount: false,
    });
  }, [isFirstPage, isLastPage]);

  // Set non-pageable data
  const setNonPageableData = useCallback(
    (newVal: any) => {
      let newDataSize: number, newMaxResults: number, currentPage: number, startIndex: number;

      // For server-side pagination, use totalItems or paginationMeta.totalElements as dataSize
      // This represents the total count of all records, not just the current page
      if (isServerSidePagination) {
        const serverTotalCount = totalItems ?? paginationMeta?.totalElements;
        newDataSize =
          serverTotalCount !== undefined && serverTotalCount >= 0
            ? serverTotalCount
            : isArray(newVal)
              ? newVal.length
              : isEmpty(newVal)
                ? 0
                : 1;
      } else {
        // For client-side pagination, use the array length
        newDataSize = isArray(newVal) ? newVal.length : isEmpty(newVal) ? 0 : 1;
      }

      newMaxResults = paginationState.currentMaxResults || newDataSize;
      // Don't default to 1 if currentPage exists
      currentPage = paginationState.currentPage;

      setDefaultPagingValues(newDataSize, newMaxResults, currentPage);
      disableNavigation();

      startIndex = (currentPage - 1) * newMaxResults;
      setDataState(prev => ({
        ...prev,
        result: isArray(newVal) ? newVal.slice(startIndex, startIndex + newMaxResults) : newVal,
      }));
    },
    [
      paginationState.currentPage,
      paginationState.currentMaxResults,
      disableNavigation,
      setDefaultPagingValues,
      isServerSidePagination,
      totalItems,
      paginationMeta,
    ]
  );

  // Set pagination values
  const setPagingValues = useCallback(
    (newVal: any) => {
      // Check if we're in accumulating mode (Scroll or On-Demand with server-side pagination)
      const isAccumulatingMode =
        (navigation === "Scroll" || navigation === "On-Demand") && isServerSidePagination;

      if (isAccumulatingMode) {
        // Use ref to check accumulated data to avoid circular dependency
        const currentAccumulatedData = accumulatingStateRef.current.accumulatedData;

        // Only update on initial load (when accumulated data is empty)
        if (currentAccumulatedData.length === 0 && isArray(newVal)) {
          // Ensure initial data has unique IDs using the existing utility
          const initialDataWithIds = addUniqueRowIds(newVal);

          setAccumulatingState(prev => ({
            ...prev,
            accumulatedData: initialDataWithIds,
            lastLoadedPage: 1,
            isInitialized: true,
          }));
          setDataState(prev => ({
            ...prev,
            fullData: initialDataWithIds,
            result: initialDataWithIds,
          }));
        } else if (currentAccumulatedData.length > 0) {
          // For subsequent updates in accumulating mode, always use accumulated data
          setDataState(prev => ({
            ...prev,
            fullData: currentAccumulatedData,
            result: currentAccumulatedData,
          }));
        }
        // Always return early for accumulating mode to prevent normal pagination logic
        return;
      }

      // For On-Demand with client-side pagination
      if (navigation === "On-Demand" && !isServerSidePagination) {
        // Store the full data
        setDataState(prev => ({
          ...prev,
          fullData: isArray(newVal) ? newVal : [],
        }));

        const currentAccumulatedData = accumulatingStateRef.current.accumulatedData;

        // Initialize accumulated data with first page if empty
        if (currentAccumulatedData.length === 0 && isArray(newVal) && newVal.length > 0) {
          const firstPageData = newVal.slice(0, paginationState.currentMaxResults);
          setAccumulatingState(prev => ({
            ...prev,
            accumulatedData: firstPageData,
            lastLoadedPage: 1,
            isInitialized: true,
          }));
          setDataState(prev => ({
            ...prev,
            result: firstPageData,
          }));
        } else if (currentAccumulatedData.length > 0) {
          // Use accumulated data for result
          setDataState(prev => ({
            ...prev,
            result: currentAccumulatedData,
          }));
        }

        // Update dataSize for proper pagination calculation
        if (isArray(newVal)) {
          setDefaultPagingValues(newVal.length, paginationState.currentMaxResults, 1);
        }
        return;
      }

      // Standard pagination logic
      // Store the data in fullData. This is used for client side searching without modifying the actual dataset
      setDataState(prev => ({
        ...prev,
        fullData: isArray(newVal) ? newVal : [],
      }));

      if (newVal && !isArray(newVal)) {
        setNonPageableData(newVal);
      } else if (newVal) {
        setNonPageableData(newVal);
      } else {
        setDataState(prev => ({ ...prev, result: newVal }));
        // Don't reset page navigation when dataset is empty - just update counts
        setPaginationState(prev => ({ ...prev, pageCount: 0, dataSize: 0 }));
      }
    },
    [
      setNonPageableData,
      navigation,
      isServerSidePagination,
      paginationState.currentMaxResults,
      setDefaultPagingValues,
    ]
  );

  // Validate current page
  const validateCurrentPage = useCallback(
    (event?: React.SyntheticEvent): boolean => {
      const { currentPage, pageCount } = paginationState;
      // If the value entered is greater than the last page number or invalid value, then update the page
      if (
        event &&
        (isNaN(currentPage) ||
          currentPage <= 0 ||
          (pageCount && (currentPage > pageCount || isNull(currentPage))))
      ) {
        if (currentPage <= 0) {
          setPaginationState(prev => ({ ...prev, currentPage: 1 }));
        } else if (currentPage > pageCount) {
          setPaginationState(prev => ({ ...prev, currentPage: pageCount }));
        }
        return false;
      }
      return true;
    },
    [paginationState]
  );

  // Go to page
  const goToPage = useCallback(() => {
    const { currentPage, currentMaxResults } = paginationState;
    const { fullData } = dataState;
    const firstRow = (currentPage - 1) * currentMaxResults;
    const startIndex = firstRow;
    const data = isArray(fullData)
      ? fullData.slice(startIndex, startIndex + currentMaxResults)
      : fullData;

    setDataState(prev => ({ ...prev, result: data }));
    disableNavigation();
  }, [paginationState, dataState.fullData, disableNavigation]);

  // Shared function for common pagination logic
  const performPageNavigation = useCallback(
    (newPage: number, previousPage?: number) => {
      // Set loading state if available
      if (setIsLoadingMore) {
        setIsLoadingMore(true);
      }

      // Always update the current page immediately for better UX
      setPaginationState(prev => ({ ...prev, currentPage: newPage }));

      // If server-side pagination is enabled, use API-based pagination
      if (isServerSidePagination) {
        datasourceInvoke(newPage)
          .then(() => {
            // Only trigger callbacks on successful data fetch
            if (onPaginationChange) {
              onPaginationChange(null, widgetInstance, newPage);
            }

            // Call onSetRecord with the new page data
            if (onSetRecord) {
              const firstRow = (newPage - 1) * paginationState.currentMaxResults;
              const startIndex = firstRow;
              const data = isArray(dataState.fullData)
                ? dataState.fullData.slice(
                    startIndex,
                    startIndex + paginationState.currentMaxResults
                  )
                : dataState.fullData;
              onSetRecord(null, widgetInstance, newPage, data);
            }

            // Clear loading state immediately for better UX
            if (setIsLoadingMore) {
              setIsLoadingMore(false);
            }
          })
          .catch(() => {
            // If the data fetch fails, revert to the previous page
            setPaginationState(prev => ({
              ...prev,
              currentPage: previousPage || paginationState.currentPage,
            }));

            // Clear loading state
            if (setIsLoadingMore) {
              setIsLoadingMore(false);
            }
          });
      } else {
        // Client-side pagination - no API call needed
        // Just trigger the callbacks directly
        if (onPaginationChange) {
          onPaginationChange(null, widgetInstance, newPage);
        }

        // Call onSetRecord with the new page data
        if (onSetRecord) {
          const firstRow = (newPage - 1) * paginationState.currentMaxResults;
          const startIndex = firstRow;
          const data = isArray(dataState.fullData)
            ? dataState.fullData.slice(startIndex, startIndex + paginationState.currentMaxResults)
            : dataState.fullData;
          onSetRecord(null, widgetInstance, newPage, data);
        }

        // Clear loading state immediately - no delay needed for client-side pagination
        if (setIsLoadingMore) {
          setIsLoadingMore(false);
        }
      }
    },
    [
      isServerSidePagination,
      datasourceInvoke,
      onPaginationChange,
      onSetRecord,
      widgetInstance,
      paginationState,
      dataState.fullData,
      setIsLoadingMore,
    ]
  );

  // Navigate to page
  const navigatePage = useCallback(
    (
      index: "first" | "prev" | "next" | "last",
      event?: React.SyntheticEvent,
      isRefresh = false
    ) => {
      // Convert the current page to a valid page number
      const currentPage = +paginationState.currentPage;
      let newPage = currentPage;

      switch (index) {
        case "first":
          if (!isFirstPage) {
            newPage = 1;
          } else if (isRefresh) {
            goToPage();
            return;
          } else {
            return;
          }
          break;
        case "prev":
          // Return if already on the first page or invalid page
          if (isFirstPage || !validateCurrentPage(event)) {
            return;
          }
          // Decrement the current page by 1
          newPage = currentPage - 1;
          break;
        case "next":
          // Return if already on the last page or invalid page
          if (isLastPage || !validateCurrentPage(event)) {
            return;
          }
          // Increment the current page by 1
          newPage = currentPage + 1;
          break;
        case "last":
          if (!isLastPage) {
            newPage = paginationState.pageCount;
          } else if (isRefresh) {
            goToPage();
            return;
          } else {
            return;
          }
          break;
        default:
          return;
      }

      // Call handlers only when page actually changes
      if (newPage !== currentPage) {
        performPageNavigation(newPage, currentPage);
      }
    },
    [paginationState, isFirstPage, isLastPage, validateCurrentPage, goToPage, performPageNavigation]
  );

  // Handle page change for basic pagination
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      // Do not call goToPage if page has not changed
      if (page !== paginationState.currentPage) {
        // Save current page to restore in case of error
        const previousPage = paginationState.currentPage;
        performPageNavigation(page, previousPage);
      }
    },
    [paginationState.currentPage, performPageNavigation]
  );

  // Handle input change for classic pagination
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setPaginationState(prev => ({ ...prev, currentPage: value }));
    }
  }, []);

  // Handle model change
  const onModelChange = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!validateCurrentPage(event)) {
        return;
      }

      // Call onSetRecord with the current page data
      if (onSetRecord) {
        const { currentPage, currentMaxResults } = paginationState;
        const { fullData } = dataState;
        const firstRow = (currentPage - 1) * currentMaxResults;
        const startIndex = firstRow;
        const data = isArray(fullData)
          ? fullData.slice(startIndex, startIndex + currentMaxResults)
          : fullData;
        onSetRecord(null, widgetInstance, currentPage, data);
      }

      goToPage();
    },
    [
      goToPage,
      validateCurrentPage,
      onSetRecord,
      paginationState,
      dataState.fullData,
      widgetInstance,
    ]
  );

  // Handle key down
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "KeyE") {
      (event.currentTarget as HTMLInputElement).classList.add("ng-invalid");
      return false;
    }
    (event.currentTarget as HTMLInputElement).classList.remove("ng-invalid");
    return true;
  }, []);

  // Handle page size change
  const handlePageSizeChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, pageSize: number) => {
      const { currentMaxResults: oldPageSize, currentPage: oldPage, dataSize } = paginationState;

      // Store actualPageSize (the previous page size) similar to Angular
      const actualPageSize = oldPageSize;

      // Update datasource maxResults if datasource has paging capability
      if (isDataSourceHasPaging(datasource) && datasource) {
        datasource.maxResults = pageSize;
      }

      // Update page size and reset to first page (similar to Angular behavior)
      setPaginationState(prev => {
        // Calculate new page count
        const newPageCount = calculatePagingValues(dataSize, pageSize);

        return {
          ...prev,
          currentMaxResults: pageSize,
          currentPage: 1, // Always go to first page like Angular
          pageCount: newPageCount,
        };
      });

      // Set loading state if available
      if (setIsLoadingMore) {
        setIsLoadingMore(true);
      }

      // Call the external handler if provided
      if (pageSizeChangeHandler) {
        pageSizeChangeHandler(pageSize);
      }

      // Invoke datasource with new page size for server-side pagination
      if (isServerSidePagination) {
        datasourceInvoke(1, pageSize)
          .then(() => {
            // Trigger paginationchange event
            if (onPaginationChange) {
              onPaginationChange(null, widgetInstance, 1);
            }

            // Call onSetRecord with the new page data
            if (onSetRecord) {
              const data = isArray(dataState.fullData)
                ? dataState.fullData.slice(0, pageSize)
                : dataState.fullData;
              onSetRecord(null, widgetInstance, 1, data);
            }

            // Clear loading state
            if (setIsLoadingMore) {
              setIsLoadingMore(false);
            }
          })
          .catch(() => {
            // Clear loading state on error
            if (setIsLoadingMore) {
              setIsLoadingMore(false);
            }
          });
      } else {
        // For client-side pagination, navigate to first page
        setTimeout(() => {
          navigatePage("first", event, true);
        }, 0);

        // Clear loading state immediately for client-side pagination
        if (setIsLoadingMore) {
          setIsLoadingMore(false);
        }
      }
    },
    [
      pageSizeChangeHandler,
      navigatePage,
      datasource,
      paginationState,
      isServerSidePagination,
      datasourceInvoke,
      onPaginationChange,
      onSetRecord,
      widgetInstance,
      dataState.fullData,
      setIsLoadingMore,
    ]
  );

  // Effect for navigation controls
  useEffect(() => {
    setNavcontrols(getValidNavControl(navigation));

    // Reset accumulated data state when navigation changes to Scroll or On-Demand
    if (navigation === "Scroll" || navigation === "On-Demand") {
      setAccumulatingState({
        accumulatedData: [],
        lastLoadedPage: 0,
        isAccumulating: true,
        isInitialized: false,
      });
    }
  }, [navigation]);

  // for dataset changes
  useEffect(() => {
    if (dataset !== undefined) {
      setPagingValues(dataset);
    }
  }, [dataset, setPagingValues]);

  // For server-side pagination, update dataSize and pageCount based on metadata
  useEffect(() => {
    if (isServerSidePagination) {
      // Handle totalItems/totalElements
      const totalCount = totalItems ?? paginationMeta?.totalElements;
      if (totalCount !== undefined && totalCount >= 0) {
        setPaginationState(prev => {
          let updates: Partial<typeof prev> = {
            dataSize: totalCount,
          };

          // If totalPages not provided, calculate it
          if (paginationMeta?.totalPages !== undefined) {
            updates.pageCount = paginationMeta.totalPages;
          } else if (prev.currentMaxResults > 0) {
            updates.pageCount = Math.ceil(totalCount / prev.currentMaxResults) || 1;
          }

          // Handle edge case: current page is out of range
          if (paginationMeta?.totalPages && prev.currentPage > paginationMeta.totalPages) {
            updates.currentPage = Math.max(1, paginationMeta.totalPages);
          }

          // Handle empty results
          if (totalCount === 0) {
            updates.pageCount = 1; // Show at least one page for empty results
            updates.currentPage = 1;
          }

          return { ...prev, ...updates };
        });
      }
    }
  }, [isServerSidePagination, totalItems, paginationMeta]);

  // Sync internal state with currentPage prop changes (for controlled pagination)
  useEffect(() => {
    if (initialPage !== undefined && initialPage !== paginationState.currentPage) {
      setPaginationState(prev => ({ ...prev, currentPage: initialPage }));
      // Update navigation buttons when page changes
      disableNavigation();
    }
  }, [initialPage, paginationState.currentPage, disableNavigation]);

  // Re-setup observer when initialization state changes
  useEffect(() => {
    if (accumulatingState.isInitialized && sentinelRef.current && navigation === "Scroll") {
      setupInfiniteScrollObserver(sentinelRef.current);
    }
  }, [accumulatingState.isInitialized, navigation, setupInfiniteScrollObserver]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return {
    // State
    currentPage: paginationState.currentPage,
    pageCount: paginationState.pageCount,
    dataSize: paginationState.dataSize,
    result: dataState.result,
    navcontrols,
    currentMaxResults: paginationState.currentMaxResults,
    error: paginationState.error,

    // Disable states
    isDisableNext: disableStates.isDisableNext,
    isDisablePrevious: disableStates.isDisablePrevious,
    isDisableFirst: disableStates.isDisableFirst,
    isDisableLast: disableStates.isDisableLast,
    isDisableCurrent: disableStates.isDisableCurrent,
    isDisableCount: disableStates.isDisableCount,

    // Actions
    navigatePage,
    handlePageChange,
    handleInputChange,
    onModelChange,
    onKeyDown,
    setDn: (value: { currentPage: number }) => setPaginationState(prev => ({ ...prev, ...value })),
    handlePageSizeChange,

    // Utilities
    isFirstPage,
    isLastPage,
    isFetching: isFetchingRef.current,

    // Infinite scroll specific
    setupInfiniteScrollObserver,
    sentinelRef,
    isLoadingMore:
      isFetchingRef.current &&
      (navigation === "Scroll" || navigation === "On-Demand") &&
      accumulatingStateRef.current.lastLoadedPage > 0,
    hasMoreData: !isLastPage && (navigation === "Scroll" || navigation === "On-Demand"),

    // On-Demand specific
    loadMoreData,
    resetAccumulatedData,
    accumulatedDataCount: accumulatingStateRef.current.accumulatedData.length,
  };
};
