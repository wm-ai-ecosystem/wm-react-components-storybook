import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import WmPagination from "@wavemaker/react-runtime/components/data/pagination";
import { LIST_NAVIGATION_TYPES } from "../utils/constants";
import { ListPaginationProps } from "./props";
import { INavigation } from "../props";

/**
 * Maps list navigation types to pagination navigation types
 */
const mapNavigationType = (navigation: INavigation): INavigation => {
  switch (navigation) {
    case LIST_NAVIGATION_TYPES.BASIC:
    case LIST_NAVIGATION_TYPES.PAGER:
    case LIST_NAVIGATION_TYPES.CLASSIC:
      return navigation;
    case LIST_NAVIGATION_TYPES.ADVANCED:
      return LIST_NAVIGATION_TYPES.CLASSIC;
    default:
      return LIST_NAVIGATION_TYPES.BASIC;
  }
};

/**
 * Determines if pagination should be hidden
 */
/**
 * Determines if pagination should be hidden
 */
const shouldHidePagination = (
  navigation: INavigation,
  allowpagesizechange: boolean,
  datasetLength: number,
  pagesize: number,
  paginationMeta?: Record<string, any>,
  totalItems?: number
): boolean => {
  // Hide for certain navigation types
  const isNone = String(navigation) === String(LIST_NAVIGATION_TYPES.NONE) || navigation === "None";
  const isOnDemand =
    String(navigation) === String(LIST_NAVIGATION_TYPES.ON_DEMAND) || navigation === "On-Demand";

  if (isNone || isOnDemand) {
    return true;
  }

  // If we have pagination metadata with totalElements or totalPages, use that to determine visibility
  if (paginationMeta) {
    // Show pagination if totalPages is provided and greater than 1
    if (paginationMeta.totalPages !== undefined && paginationMeta.totalPages > 1) {
      return false;
    }

    // Show pagination if totalElements is provided and greater than pagesize
    if (paginationMeta.totalElements !== undefined && paginationMeta.totalElements > pagesize) {
      return false;
    }
  }

  // Use totalItems (calculated in hook) if provided
  if (totalItems !== undefined && totalItems > pagesize) {
    return false;
  }

  // Hide if page size change is disabled and all items fit on one page
  if (!allowpagesizechange && datasetLength <= pagesize) {
    return true;
  }

  // Always show pagination if we have page size change enabled
  if (allowpagesizechange) {
    return false;
  }

  // Default to showing pagination if we have items
  return datasetLength === 0;
};

/**
 * List Pagination Component
 * Handles pagination for the list component with improved type safety and structure
 */
export const ListPagination: React.FC<ListPaginationProps> = props => {
  const {
    name,
    navigation,
    orderedDataset,
    pagesize,
    currentPage,
    navigationalign,
    showrecordcount,
    maxsize,
    boundarylinks,
    paginationclass,
    allowpagesizechange = true,
    pagesizeoptions = "5,10,20,50,100",
    onPaginationChange,
    onSetRecord,
    onPageSizeChange,
    listener,
    paginationMeta,
    totalItems,
    datasource,
    isLoadingMore,
    setIsLoadingMore,
    isServerSidePagination,
  } = props;
  // Early return if pagination should be hidden
  const hidePagination = useMemo(
    () =>
      shouldHidePagination(
        navigation,
        allowpagesizechange,
        orderedDataset.length,
        pagesize,
        paginationMeta,
        totalItems
      ),
    [
      navigation,
      allowpagesizechange,
      orderedDataset.length,
      pagesize,
      props.paginationMeta,
      props.totalItems,
    ]
  );

  // Get the appropriate navigation type for the pagination component
  const paginationNavigation = useMemo(() => mapNavigationType(navigation), [navigation]);

  // Wrap handlers to match the expected signatures
  const handlePaginationChange = useMemo(
    () => (event: React.MouseEvent | null, widget: unknown, index: number) => {
      onPaginationChange(event, widget, index);
    },
    [onPaginationChange]
  );

  const handleSetRecord = useMemo(
    () => (event: React.MouseEvent | null, widget: unknown, index: number, data: any) => {
      onSetRecord(event, widget, index, data);
    },
    [onSetRecord]
  );

  if (hidePagination) {
    return null;
  }

  return (
    <Box
      component="div"
      className={clsx("pagination-container", "app-datanavigator", `text-${navigationalign}`)}
    >
      <WmPagination
        name={`${name}_pagination`}
        // If we have pagination metadata with totalElements, create a dataset array of the right length
        dataset={totalItems ? Array(totalItems).fill(null) : orderedDataset}
        maxResults={pagesize}
        currentPage={currentPage}
        navigation={paginationNavigation}
        navigationalign={navigationalign}
        showrecordcount={showrecordcount}
        maxsize={maxsize}
        boundarylinks={boundarylinks}
        directionlinks={true}
        allowpagesizechange={allowpagesizechange}
        pagesizeoptions={pagesizeoptions}
        className={clsx("pagination", paginationclass)}
        listener={listener}
        onPaginationChange={handlePaginationChange}
        onSetRecord={handleSetRecord}
        onPageSizeChange={onPageSizeChange}
        // Pass pagination metadata to WmPagination component if available
        paginationMeta={paginationMeta}
        totalItems={totalItems}
        // Pass datasource for API-based pagination
        datasource={datasource}
        isLoadingMore={isLoadingMore}
        setIsLoadingMore={setIsLoadingMore}
        isServerSidePagination={isServerSidePagination}
      />
    </Box>
  );
};
