"use client";
import React, { HtmlHTMLAttributes, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { InlineNavigation } from "@wavemaker/react-runtime/components/data/pagination/components";
import { NoDataMessage, useDragAndDrop } from "./components";
import { WmListProps, ListItemData } from "./props";
import { StorageType, setWidgetState } from "@wavemaker/react-runtime/utils/state-persistance";
import { AppSpinner } from "@wavemaker/react-runtime/components/common";

// Import hooks
import {
  useListData,
  useListState,
  useGroupedData,
  useListEventHandlers,
  useListPagination,
  useListEffects,
  useDataSourceSubscription,
  useListStateManager,
} from "./hooks";

// Import components
import { ListHeader, ListPagination, ListItems } from "./components";

// Import utilities
import {
  DEFAULT_CLS,
  LIST_NAVIGATION_TYPES,
  LIST_DEFAULTS,
  LIST_MESSAGES,
  LIST_ALIGN,
  LIST_DIRECTION,
} from "./utils/constants";
import {
  getItemsPerRowClass,
  getTextAlignClass,
  getSafeDataset,
  getListState,
  saveListState,
} from "./utils/list-helpers";
import { addUniqueRowIds } from "../table/utils";
import { useListWidgetMethods } from "./utils/list-widget-methods";
import { DataSource } from "../types";

const WmList: React.FC<WmListProps> = props => {
  // ==================== PROPS DESTRUCTURING ====================
  const {
    // Layout & Styling
    className,
    styles,
    width,
    height,
    tabIndex = 0,

    // List Configuration
    name = "list",
    boundarylinks = LIST_DEFAULTS.BOUNDARY_LINKS,
    collapsible = LIST_DEFAULTS.COLLAPSIBLE,
    direction = LIST_DIRECTION.VERTICAL,
    disableitem = false,
    enablereorder = false,
    multiselect = LIST_DEFAULTS.MULTISELECT,
    selectfirstitem = LIST_DEFAULTS.SELECT_FIRST_ITEM,
    selectionlimit = LIST_DEFAULTS.SELECTION_LIMIT,
    hidehorizontalscrollbar = false,

    // Data Props
    dataset = [],
    datafield = "",
    displayfield = "",
    displaylabel,
    getDisplayExpression,
    datasource,
    deferload = false,

    // Grouping & Ordering
    groupby = "",
    orderby = "",

    // Pagination
    navigation = LIST_NAVIGATION_TYPES.NONE,
    navigationalign = LIST_ALIGN.LEFT,
    pagesize = LIST_DEFAULTS.PAGESIZE,
    maxsize = LIST_DEFAULTS.MAX_SIZE,
    showcount = LIST_DEFAULTS.SHOW_COUNT,
    showrecordcount = LIST_DEFAULTS.SHOW_RECORD_COUNT,
    allowpagesizechange = true,
    pagesizeoptions = "5,10,20,50,100",
    paginationclass = "",
    showNavigation = true,

    // Display Text
    title = "",
    subheading = "",
    iconclass = "",
    nodatamessage = LIST_MESSAGES.NO_DATA,
    loadingdatamsg = LIST_MESSAGES.LOADING,
    loadingicon = "fa-spinner",
    ondemandmessage = LIST_MESSAGES.LOAD_MORE,

    // Styling Classes
    listclass = "list-group media-list",
    itemclass = "list-group-item",
    horizontalalign = LIST_ALIGN.LEFT,
    itemsperrow,

    // State Management
    statehandler = "URL",

    // Event Handlers
    onSelect,
    onClick,
    onDblclick,
    onMouseEnter,
    onMouseLeave,
    onReorder,
    onSelectionlimitexceed,
    onBeforedatarender,
    onRender,
    onPaginationchange,
    onSetrecord,
    onPageChange,

    // Template & Rendering
    renderItem,
    children,

    // Widget Instance
    listener,
  } = props;

  // ==================== DATASOURCE SUBSCRIPTION ====================
  // Disable state management for On-Demand and Scroll navigation
  const effectiveStateHandlerForSubscription =
    navigation === LIST_NAVIGATION_TYPES.ON_DEMAND || navigation === LIST_NAVIGATION_TYPES.SCROLL
      ? "none"
      : statehandler;

  // Subscribe to 'toggle-variable-state' event to handle state params
  useDataSourceSubscription({
    datasource,
    statehandler: effectiveStateHandlerForSubscription,
    name,
    onPageRestored: restoredPage => {
      // Store the restored page number to apply when pagination is ready
      setRestoredPageNumber(restoredPage);
    },
  });

  // ==================== STATE INITIALIZATION ====================
  const widgetInstance = listener?.Widgets[name];

  // is dataset from modal variable
  const [isDatasetFromModalVariable, setIsDatasetFromModalVariable] = useState(false);

  // Ensure dataset is always an array and add unique IDs
  const safeDataset = useMemo(() => {
    const data = getSafeDataset(dataset);
    return addUniqueRowIds(data, { type: "list" });
  }, [dataset]);

  // Initial render tracking
  const [initialRender, setinitialRender] = useState(true);

  // User interaction tracking
  const userInitiatedSelectionRef = React.useRef<boolean>(false);

  // ==================== ON-DEMAND NAVIGATION STATE ====================
  // For On-Demand navigation, accumulate data from multiple pages
  const [accumulatedData, setAccumulatedData] = useState<ListItemData[]>([]);
  const [lastLoadedPage, setLastLoadedPage] = useState(-1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [onDemandCurrentPage, setOnDemandCurrentPage] = useState(0);

  // Determine if we're using server-side pagination
  // Check if datasource is API-aware (server-side) rather than checking runtime pagination data
  const isServerSidePagination = useMemo(() => {
    return !!(
      datasource &&
      datasource.execute &&
      datasource.execute(DataSource.Operation.IS_PAGEABLE)
    );
  }, [datasource]);

  // Use accumulated data for On-Demand navigation, otherwise use regular dataset
  const effectiveDataset = useMemo(() => {
    if (
      navigation === LIST_NAVIGATION_TYPES.ON_DEMAND &&
      datasource &&
      accumulatedData.length > 0
    ) {
      return accumulatedData;
    }
    return safeDataset;
  }, [navigation, datasource, accumulatedData, safeDataset]);

  // ==================== STATE PERSISTENCE ====================
  // Restore persisted state before initializing hooks
  const { initialPage, initialPageSize, initialSelectedItems, initialActualPageSize } =
    useMemo(() => {
      // Skip state restoration for On-Demand and Scroll navigation
      if (
        navigation === LIST_NAVIGATION_TYPES.ON_DEMAND ||
        navigation === LIST_NAVIGATION_TYPES.SCROLL
      ) {
        return {
          initialPage: 1,
          initialPageSize: pagesize,
          initialSelectedItems: [],
          initialActualPageSize: undefined,
        };
      }

      const persisted = getListState(name, statehandler as StorageType);

      // Determine the actual page size (original datasource page size)
      let actualPageSize: number | undefined;

      if (persisted?.actualpagesize !== undefined) {
        // If we have a persisted actualPageSize, use it (it should never change)
        actualPageSize = persisted.actualpagesize;
      } else if (datasource?.pagination?.size) {
        // Otherwise, if this is the first load, capture it from datasource
        actualPageSize = datasource.pagination.size;
      } else if (datasource?.maxResults) {
        // Fallback to maxResults if available
        actualPageSize = datasource.maxResults;
      }

      if (persisted) {
        // Get the pagination page
        const restoredPage = persisted.pagination || 1;

        // Get selected indices for the restored page if selectedItem exists
        const selectedItemIndexes = persisted.selectedItem
          ? persisted.selectedItem
              .filter(item => item.page === restoredPage)
              .map(item => item.index)
          : [];

        // Get persisted page size
        const persistedPageSize = persisted.pagesize || pagesize;

        // Set datasource maxResults if we have a persisted pageSize and datasource
        if (
          persisted.pagesize &&
          isServerSidePagination &&
          datasource &&
          datasource.maxResults !== undefined
        ) {
          datasource.maxResults = persistedPageSize;
        }

        return {
          initialPage: restoredPage,
          initialPageSize: persistedPageSize,
          initialSelectedItems: selectedItemIndexes,
          initialActualPageSize: actualPageSize,
        };
      }

      return {
        initialPage: 1,
        initialPageSize: pagesize,
        initialSelectedItems: [],
        initialActualPageSize: actualPageSize,
      };
    }, [name, statehandler, pagesize, navigation, isServerSidePagination, datasource]);

  // ==================== PAGE RESTORE STATE ====================
  // Store the restored page number until pagination state is ready
  const [restoredPageNumber, setRestoredPageNumber] = useState<number | null>(null);

  // ==================== DATA PROCESSING HOOKS ====================
  // Process dataset with ordering and transformations
  const orderedDataset = useListData(effectiveDataset, {
    datafield,
    displayfield,
    displaylabel,
    getDisplayExpression,
    orderby,
    groupby,
  });

  // Drag and drop functionality
  const { items, handleDragEnd, hasBeenReordered } = useDragAndDrop(
    orderedDataset,
    onReorder,
    orderby
  );

  // Group data if groupby is specified
  const groupedData = useGroupedData(items, groupby);

  // ==================== PAGINATION HOOK ====================
  const paginationState = useListPagination({
    items,
    groupedData,
    groupby,
    pagesize: initialPageSize,
    allowpagesizechange,
    pagesizeoptions,
    navigation,
    initialPage,
    datasource,
  });

  // ==================== LIST STATE HOOK ====================
  const listState = useListState(
    items,
    paginationState.currentPageSize,
    selectfirstitem,
    selectionlimit,
    listener,
    name
  );

  // ==================== EVENT HANDLERS HOOK ====================
  const eventHandlers = useListEventHandlers({
    items,
    multiselect,
    disableitem,
    selectionlimit,
    collapsible,
    selectedItems: listState.selectedItems,
    setSelectedItems: listState.setSelectedItems,
    activeItems: listState.activeItems,
    setActiveItems: listState.setActiveItems,
    firstSelectedItem: listState.firstSelectedItem,
    setFirstSelectedItem: listState.setFirstSelectedItem,
    groupCollapsed: listState.groupCollapsed,
    setGroupCollapsed: listState.setGroupCollapsed,
    currentPage: paginationState.currentPage,
    setCurrentPage: paginationState.setCurrentPage,
    visibleItems: paginationState.visibleItems,
    setVisibleItems: paginationState.setVisibleItems,
    isLoadingMore: listState.isLoadingMore,
    setIsLoadingMore: listState.setIsLoadingMore,
    onClick,
    onDblclick,
    onMouseEnter,
    onMouseLeave,
    onSelectionlimitexceed,
    onPaginationchange,
    onPageChange,
    onSetrecord,
    widgetInstance,
    onSelect,
    userInitiatedSelectionRef,
    datasource,
    pagesize: paginationState.currentPageSize,
    navigation,
    onDemandCurrentPage,
    setOnDemandCurrentPage,
    isServerSidePagination,
    listener,
    name,
  });

  // ==================== WIDGET METHODS ====================
  const widgetMethods = useListWidgetMethods(
    items,
    listState,
    multiselect,
    onSelect,
    widgetInstance,
    listener,
    userInitiatedSelectionRef,
    name
  );

  // ==================== STATE MANAGEMENT ====================
  // Disable state management for On-Demand and Scroll navigation
  const effectiveStateHandler =
    navigation === LIST_NAVIGATION_TYPES.ON_DEMAND || navigation === LIST_NAVIGATION_TYPES.SCROLL
      ? "none"
      : statehandler;

  const stateManager = useListStateManager({
    name,
    storage: effectiveStateHandler as StorageType,
    currentPage: paginationState.currentPage,
    currentPageSize: paginationState.currentPageSize,
    selectedItems: listState.selectedItems,
    items,
    initialActualPageSize,
    multiselect,
    isServerSidePagination,
    datasource,
  });

  // ==================== ALL SIDE EFFECTS ====================
  useListEffects({
    name,
    navigation,
    datasource,
    safeDataset,
    items,
    orderedDataset,
    groupedData,
    groupby,
    orderby,
    selectfirstitem,
    statehandler: effectiveStateHandler,
    accumulatedData,
    lastLoadedPage,
    isFirstLoad,
    onDemandCurrentPage,
    hasBeenReordered,
    initialRender,
    initialPage,
    initialPageSize,
    initialSelectedItems,
    initialActualPageSize,
    setAccumulatedData,
    setLastLoadedPage,
    setIsFirstLoad,
    setOnDemandCurrentPage,
    setinitialRender,
    listState,
    paginationState,
    widgetMethods,
    onSelect,
    widgetInstance,
    listener,
    userInitiatedSelectionRef,
    restoredPageNumber,
    setRestoredPageNumber,
    showNavigation,
    stateManager,
  });

  // ==================== COMPUTED VALUES ====================
  // Use datasource noDataFound if available, otherwise check safeDataset
  const noDataFound = !safeDataset || safeDataset.length === 0;
  const itemsPerRowClass = getItemsPerRowClass(itemsperrow, direction);
  const textAlignClass = getTextAlignClass(horizontalalign);

  // ==================== EVENT HANDLER FUNCTIONS ====================
  const handlePageSizeChange = (newPageSize: number) => {
    // Get the old page size BEFORE updating
    const oldPageSize = paginationState.currentPageSize;

    // Get current persisted state to access all selected items across pages
    const currentPersistedState = getListState(name, statehandler as StorageType);

    // Build the state for page size change
    const newState = stateManager.getStateForPageSizeChange(
      newPageSize,
      currentPersistedState?.selectedItem,
      currentPersistedState?.pagesize || oldPageSize
    );

    // Save the state BEFORE changing page size
    saveListState(name, statehandler as StorageType, newState);

    // Update datasource maxResults if datasource has paging capability (similar to Angular)
    if (isServerSidePagination && datasource && datasource.maxResults !== undefined) {
      datasource.maxResults = newPageSize;
    }

    // Update page size
    paginationState.setCurrentPageSize(newPageSize);

    // Reset to first page (similar to Angular behavior)
    paginationState.setCurrentPage(1);
    paginationState.setVisibleItems(newPageSize);
  };

  const showPaginationBasedOnVariableConfiguration = useMemo(() => {
    // if dataset is from modal variable(means client side pagination, all records are loaded in the dataset on first load itself) then show pagination if records are greater than 5 records

    if (isDatasetFromModalVariable && paginationState?.totalItems) {
      // if records are less than 5 records then do not show pagination
      if (paginationState?.totalItems < LIST_DEFAULTS.PAGESIZE_FOR_MODAL_VARIABLE) {
        return false;
      }
      // In modal variable if total records are greater than 5 then set current page size to 5 and show pagination
      paginationState.setCurrentPageSize(LIST_DEFAULTS.PAGESIZE_FOR_MODAL_VARIABLE);
      return true;
    }

    if (
      paginationState?.paginationMeta?.totalElements === undefined ||
      paginationState?.paginationMeta?.size === undefined
    ) {
      return false;
    }
    return paginationState?.paginationMeta?.totalElements > paginationState.paginationMeta?.size;
  }, [
    paginationState?.paginationMeta?.totalElements,
    paginationState?.paginationMeta?.size,
    isDatasetFromModalVariable,
    paginationState?.totalItems,
  ]);

  // check if dataset is from modal variable
  useEffect(() => {
    (async () => {
      // if result is false then set isDatasetFromModalVariable to true
      const result: boolean = await (datasource &&
        datasource.execute &&
        datasource?.execute(DataSource.Operation.IS_API_AWARE));
      if (result === false) {
        setIsDatasetFromModalVariable(true);
      } else {
        setIsDatasetFromModalVariable(false);
      }
    })();
  }, [datasource]);

  // ==================== RENDER ====================
  return (
    <Box
      className={clsx(DEFAULT_CLS, groupby ? listclass : className)}
      sx={{
        ...styles,
        height: `${height} !important`,
        width: `${width} !important`,
        overflow: "inherit !important",
        position: "relative",
      }}
      component="div"
      data-name={name}
      {...({ name } as HtmlHTMLAttributes<HTMLDivElement>)}
      data-navigation={navigation}
    >
      {/* List Header */}
      <ListHeader title={title} subheading={subheading} iconclass={iconclass} />

      {/* Loading State */}
      {datasource?.loading ? (
        <AppSpinner show={true} spinnermessages={[loadingdatamsg]} />
      ) : (
        /* Main Content */
        <InlineNavigation
          navigation={navigation}
          currentPage={paginationState.currentPage}
          totalPages={paginationState.effectiveTotalPages}
          noDataFound={noDataFound}
          onPageChange={eventHandlers.handlePageChange}
          isLoading={listState.isLoadingMore}
          showNavigation={showNavigation}
        >
          {/* List Container */}
          <List
            className={clsx(
              "app-livelist-container",
              "clearfix",
              listclass,
              textAlignClass,
              hidehorizontalscrollbar ? "hide-scrollbar" : "",
              direction === LIST_DIRECTION.HORIZONTAL ? "app-horizontal-list" : ""
            )}
            tabIndex={tabIndex}
            role="list"
            sx={{
              "& .app-livelist": {
                overflowX: "hidden",
              },
              '&[data-dnd-dragging="true"]': {
                overflowX: "hidden",
              },
              // Simple horizontal list layout
              "& .app-horizontal-list": {
                display: "flex",
                flexDirection: "row",
                flexWrap: direction === LIST_DIRECTION.HORIZONTAL ? "wrap" : "nowrap",
                "& .app-list-item": {
                  minWidth: "fit-content",
                  flexShrink: 0,
                },
              },
            }}
          >
            {/* List Content */}
            {noDataFound ? (
              <NoDataMessage message={nodatamessage} />
            ) : (
              <ListItems
                items={items}
                groupedData={groupedData}
                groupby={groupby}
                navigation={navigation}
                currentPage={paginationState.currentPage}
                pagesize={paginationState.currentPageSize}
                visibleItems={paginationState.visibleItems}
                orderby={orderby}
                disableitem={disableitem}
                itemclass={itemclass}
                itemsPerRowClass={itemsPerRowClass}
                direction={direction}
                enablereorder={enablereorder}
                activeItems={listState.activeItems}
                name={name}
                tabIndex={tabIndex}
                renderItem={renderItem}
                itemTemplate={children}
                nodatamessage={nodatamessage}
                ondemandmessage={ondemandmessage}
                loadingicon={loadingicon}
                loadingdatamsg={loadingdatamsg}
                paginationclass={paginationclass}
                isLoadingMore={listState.isLoadingMore}
                collapsible={collapsible}
                showcount={showcount}
                groupCollapsed={listState.groupCollapsed}
                handleListItemClick={eventHandlers.handleListItemClick}
                handleListItemDoubleClick={eventHandlers.handleListItemDoubleClick}
                handleListItemMouseEnter={eventHandlers.handleListItemMouseEnter}
                handleListItemMouseLeave={eventHandlers.handleListItemMouseLeave}
                handleDragEnd={handleDragEnd}
                handleLoadMore={eventHandlers.handleLoadMore}
                handleHeaderClick={eventHandlers.handleHeaderClick}
                onBeforedatarender={onBeforedatarender}
                onRender={onRender}
                widgetInstance={widgetInstance}
                rawDataset={safeDataset}
                datasource={datasource}
                totalItems={paginationState.totalItems}
                isServerSidePagination={isServerSidePagination}
                showNavigation={showNavigation}
              />
            )}
          </List>

          {/* Footer Pagination */}
          {showPaginationBasedOnVariableConfiguration &&
            showNavigation &&
            navigation &&
            navigation !== LIST_NAVIGATION_TYPES.INLINE &&
            navigation !== LIST_NAVIGATION_TYPES.ON_DEMAND &&
            navigation !== LIST_NAVIGATION_TYPES.NONE && (
              <Box component="div" className="panel-footer">
                <ListPagination
                  name={name}
                  navigation={navigation}
                  orderedDataset={groupby ? Array(paginationState.totalItems).fill(null) : items}
                  pagesize={paginationState.currentPageSize}
                  navigationalign={navigationalign}
                  showrecordcount={showrecordcount}
                  maxsize={maxsize}
                  boundarylinks={boundarylinks}
                  paginationclass={paginationclass}
                  allowpagesizechange={allowpagesizechange}
                  pagesizeoptions={pagesizeoptions}
                  widgetInstance={widgetInstance}
                  onPaginationChange={eventHandlers.handlePaginationChange}
                  onSetRecord={eventHandlers.handleSetRecord}
                  onPageSizeChange={handlePageSizeChange}
                  currentPage={paginationState.currentPage}
                  listener={listener}
                  paginationMeta={paginationState.paginationMeta}
                  totalItems={paginationState.totalItems}
                  datasource={datasource}
                  isLoadingMore={listState.isLoadingMore}
                  setIsLoadingMore={listState.setIsLoadingMore}
                  isServerSidePagination={isServerSidePagination}
                />
              </Box>
            )}
        </InlineNavigation>
      )}
    </Box>
  );
};

export default withBaseWrapper(WmList as any);
