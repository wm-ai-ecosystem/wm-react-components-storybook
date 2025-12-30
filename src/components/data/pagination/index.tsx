import React, { memo, useMemo, useCallback } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { usePagination, useNavigationSize } from "./hooks";
import {
  BasicPagination,
  ClassicPagination,
  PagerNavigation,
  TotalRecords,
  PageSizeSelector,
} from "./components";
import { WmPaginationProps } from "./hooks/props";
import { LIST_ALIGN, LIST_NAVIGATION_TYPES } from "../list/utils/constants";

const WmPagination = memo((props: WmPaginationProps) => {
  const {
    name,
    dataset,
    maxResults = 10,
    currentPage,
    navigation = LIST_NAVIGATION_TYPES.BASIC,
    navigationsize,
    navigationalign = LIST_ALIGN.LEFT,
    showrecordcount = false,
    maxsize = 5,
    boundarylinks = false,
    directionlinks = true,
    allowpagesizechange = false,
    pagesizeoptions = "5,10,20,50,100",
    className,
    styles,
    listener,
    onPaginationChange,
    onSetRecord,
    onPageSizeChange,
    datasource,
    isLoadingMore,
    setIsLoadingMore,
    isServerSidePagination,
    onDataUpdate,
    // On-Demand navigation props
    ondemandmessage = "Load More",
    viewlessmessage = "View Less",
    showviewlessbutton = false,
  } = props;

  // Custom hooks for pagination logic and navigation sizing
  const pagination = usePagination({
    dataset,
    maxResults,
    currentPage,
    navigation,
    name,
    listener,
    onPaginationChange,
    onSetRecord,
    onPageSizeChange,
    paginationMeta: props.paginationMeta,
    totalItems: props.totalItems,
    datasource,
    isLoadingMore,
    setIsLoadingMore,
    isServerSidePagination,
    datasourceInvokeOptions: props.datasourceInvokeOptions,
  });

  // Notify parent component when data changes in Scroll or On-Demand mode
  const prevResultLengthRef = React.useRef<number>(0);
  React.useEffect(() => {
    const isAccumulatingMode = navigation === "Scroll" || navigation === "On-Demand";
    if (isAccumulatingMode && onDataUpdate && pagination.result) {
      // Only update if the result length has changed (new data added)
      if (pagination.result.length !== prevResultLengthRef.current) {
        prevResultLengthRef.current = pagination.result.length;
        onDataUpdate(pagination.result);
      }
    }
  }, [navigation, onDataUpdate, pagination.result]);

  const { navigationClass } = useNavigationSize({
    navigation,
    navigationsize,
  });

  // Memoized flex container styles for better performance
  const flexContainerStyles = useMemo(() => {
    const baseStyles = {
      display: "flex",
      alignItems: "center",
      width: "100%",
      gap: 2,
    };

    // When showrecordcount is false, align based on navigationalign
    // When showrecordcount is true, use space-between for proper distribution
    if (!showrecordcount) {
      return {
        ...baseStyles,
        justifyContent:
          navigationalign === "right"
            ? "flex-end"
            : navigationalign === "center"
              ? "center"
              : "flex-start",
      };
    }

    return {
      ...baseStyles,
      justifyContent: "space-between",
    };
  }, [showrecordcount, navigationalign]);

  // Memoized common page size selector
  const pageSizeSelector = useMemo(() => {
    if (!allowpagesizechange) return null;

    return (
      <PageSizeSelector
        pagesizeoptions={pagesizeoptions}
        maxResults={pagination.currentMaxResults}
        currentPage={pagination.currentPage}
        dataSize={pagination.dataSize}
        paginationMeta={props.paginationMeta}
        onPageSizeChange={pagination.handlePageSizeChange}
      />
    );
  }, [
    allowpagesizechange,
    pagesizeoptions,
    pagination.currentMaxResults,
    pagination.currentPage,
    pagination.dataSize,
    pagination.handlePageSizeChange,
    props.paginationMeta,
  ]);

  // Simple layout helper function - not memoized to avoid dependency issues
  const renderWithLayout = (children: React.ReactNode, recordCountVariant: "Basic" | "Classic") => {
    // When showrecordcount is false, use simple flex container with alignment
    if (!showrecordcount) {
      return (
        <Box sx={flexContainerStyles}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>{children}</Box>
        </Box>
      );
    }

    // When showrecordcount is true, use complex layout with proper distribution
    if (navigationalign === "center") {
      return (
        <Box sx={flexContainerStyles}>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {children}
            <TotalRecords dataSize={pagination.dataSize} variant={recordCountVariant} />
          </Box>
          <Box sx={{ flex: 1 }} />
        </Box>
      );
    }

    return (
      <Box sx={flexContainerStyles}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            order: navigationalign === "right" ? 2 : 1,
          }}
        >
          {children}
        </Box>
        <Box sx={{ order: navigationalign === "right" ? 1 : 2 }}>
          <TotalRecords dataSize={pagination.dataSize} variant={recordCountVariant} />
        </Box>
      </Box>
    );
  };

  // Render navigation components directly - avoid over-memoization
  const renderNavigation = () => {
    // Only show navigation when there are multiple pages (i.e., not all items are visible on current page)
    const showNavigation = pagination.pageCount > 1;

    switch (pagination.navcontrols) {
      case "Basic":
        return showNavigation ? (
          <BasicPagination
            pageCount={pagination.pageCount}
            currentPage={pagination.currentPage}
            dataSize={pagination.dataSize}
            maxResults={pagination.currentMaxResults}
            boundarylinks={boundarylinks}
            directionlinks={directionlinks}
            navigationsize={navigationsize}
            navigationClass={navigationClass}
            maxsize={maxsize}
            onPageChange={pagination.handlePageChange}
          />
        ) : null;

      case "Classic":
        return showNavigation ? (
          <ClassicPagination
            currentPage={pagination.currentPage}
            pageCount={pagination.pageCount}
            dataSize={pagination.dataSize}
            maxResults={pagination.currentMaxResults}
            navigationClass={navigationClass}
            showrecordcount={false}
            isDisableFirst={pagination.isDisableFirst}
            isDisablePrevious={pagination.isDisablePrevious}
            isDisableNext={pagination.isDisableNext}
            isDisableLast={pagination.isDisableLast}
            isDisableCurrent={pagination.isDisableCurrent}
            isDisableCount={pagination.isDisableCount}
            onNavigate={pagination.navigatePage}
            onInputChange={pagination.handleInputChange}
            onModelChange={pagination.onModelChange}
            onKeyDown={pagination.onKeyDown}
          />
        ) : null;

      case "Pager":
        return showNavigation ? (
          <PagerNavigation
            navigationClass={navigationClass}
            isDisablePrevious={pagination.isDisablePrevious}
            isDisableNext={pagination.isDisableNext}
            onNavigate={pagination.navigatePage}
          />
        ) : null;

      default:
        return null;
    }
  };

  // Simple render function - avoid over-optimization that causes re-renders
  const renderPaginationContent = () => {
    if (navigation === "None" || navigation === "Scroll") {
      return null;
    }

    const navigationComponent = renderNavigation();

    const content = (
      <>
        {pageSizeSelector}
        {navigationComponent}
      </>
    );

    // Return early if no content to render
    if (!pageSizeSelector && !navigationComponent) {
      return null;
    }

    // Get the appropriate record count variant based on navigation type
    const recordCountVariant: "Basic" | "Classic" =
      pagination.navcontrols === "Classic" ? "Classic" : "Basic";

    return renderWithLayout(content, recordCountVariant);
  };

  // Render On-Demand navigation content
  if (pagination.navcontrols === "On-Demand") {
    // Check if there's data to show and it's more than one page worth
    // Don't show navigation if data is empty or already shows all items
    const hasEnoughData =
      pagination.dataSize > 0 && pagination.dataSize > pagination.currentMaxResults;

    // Determine if we should show Load More button
    // Only show when there's more data AND accumulated data is less than total
    const shouldShowLoadMore =
      hasEnoughData &&
      pagination.hasMoreData &&
      pagination.accumulatedDataCount < pagination.dataSize;

    // Determine if we should show View Less button
    // Show when all data is loaded, showviewlessbutton is true, and more than first page is loaded
    const shouldShowViewLess =
      hasEnoughData &&
      !pagination.hasMoreData &&
      showviewlessbutton &&
      pagination.accumulatedDataCount > pagination.currentMaxResults;

    // Determine which button to show (if any)
    const showButton = shouldShowLoadMore || shouldShowViewLess;

    // If nothing to show and not loading, return null
    if (!showButton && !pagination.isLoadingMore) {
      return null;
    }

    // Determine button properties based on state
    const buttonText = shouldShowViewLess ? viewlessmessage : ondemandmessage;
    const buttonAction = shouldShowViewLess
      ? pagination.resetAccumulatedData
      : pagination.loadMoreData;

    return (
      <Box
        component="div"
        className={clsx("on-demand-datagrid", className)}
        sx={{ ...styles }}
        id={name}
      >
        {/* Loading indicator */}
        {pagination.isLoadingMore && (
          <Box
            component="div"
            className="loading-data-msg spin-icon-in-center"
            sx={{ textAlign: "center", padding: "16px" }}
          >
            <Box component="span">
              <Box
                component="i"
                className="app-icon panel-icon fa-spin fa fa-circle-o-notch"
                aria-hidden="true"
              />
              <Box component="span" className="sr-only">
                Loading
              </Box>
              <Box component="span" className="loading-text" sx={{ marginLeft: 1 }}>
                Loading...
              </Box>
            </Box>
          </Box>
        )}

        {/* On-Demand action button (Load More or View Less) */}
        {showButton && !pagination.isLoadingMore && (
          <Box
            component="a"
            className="app-button btn btn-block on-demand-load-btn"
            onClick={buttonAction}
            sx={{
              cursor: "pointer",
              display: "block",
              textAlign: "center",
              padding: "10px",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            {buttonText}
          </Box>
        )}
      </Box>
    );
  }

  // Render infinite scroll content
  if (pagination.navcontrols === "Scroll") {
    return (
      <Box
        className={clsx("app-datanavigator clearfix", className)}
        sx={{
          ...styles,
          width: "100%",
          position: "relative",
        }}
        id={name}
      >
        {/* Loading indicator */}
        {pagination.isLoadingMore && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              width: "100%",
              textAlign: "center",
            }}
          >
            <Box className="status">
              <i className="fa fa-circle-o-notch fa-spin"></i>
              <Box component="span" className="message" sx={{ marginLeft: 1 }}>
                Loading...
              </Box>
            </Box>
          </Box>
        )}

        {/* No more data indicator */}
        {!pagination.hasMoreData && pagination.dataSize > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              width: "100%",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <span>No more data to load</span>
          </Box>
        )}

        {/* Sentinel element for intersection observer */}
        <Box
          ref={(el: HTMLDivElement | null) => {
            if (pagination.sentinelRef) {
              pagination.sentinelRef.current = el;
            }
            // Observer setup is handled by useEffect in the hook when data is initialized
          }}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            visibility: "hidden",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </Box>
    );
  }

  return (
    <Box
      className={clsx("app-datanavigator clearfix", className)}
      sx={{
        ...styles,
        width: "100%",
      }}
      id={name}
      onClick={e => e.stopPropagation()}
    >
      {renderPaginationContent()}
    </Box>
  );
});

WmPagination.displayName = "WmPagination";

export default withBaseWrapper(WmPagination);
