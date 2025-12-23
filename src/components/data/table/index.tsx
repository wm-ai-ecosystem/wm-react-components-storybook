import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  HTMLAttributes,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Box, Table } from "@mui/material";
import { uniqueId, find, isEqual, cloneDeep } from "lodash-es";
import withBaseWrapper from "../../../higherOrder/withBaseWrapper";
import WmPagination from "../pagination";

// Import custom hooks and utilities
import {
  useTableData,
  useFormWidget,
  usePanelStructure,
  useTableEdit,
  useTableColumns,
  useRowSelection,
  useTableState,
  useCellState,
  useRowHandlers,
  usePaginationState,
  useTableInitialization,
  useRowExpansion,
  useServerSideSorting,
  useTableEffects,
  useTableStateManager,
  useTableFilter,
  useDynamicColumns,
} from "./hooks";
import {
  parseTableColumns,
  parseTableRowActions,
  parseTableActions,
  parseTableRowExpansion,
  getSpacingClasses,
  TABLE_CSS_CLASSES,
  TABLE_MESSAGES,
  getTableState,
  saveTableState,
  clearTableState,
  addUniqueRowIds,
} from "./utils";
import { TableSortState } from "./utils/table-helpers";
import { handleNewRowNavigation } from "./utils";
import {
  TablePanelHeading,
  TableFooterActions,
  TableBodyComponent,
  TableHeaderComponent,
  GlobalSearchFilter,
  SummaryRowFooter,
} from "./components";
import {
  ToastType,
  WmTableColumnProps,
  WmTableProps,
  SummaryRowDef,
  SummaryRowDefObject,
} from "./props";
import { buildSelectionColumns } from "./utils/buildSelectionColumns";
import LoadingComponent from "../pagination/components/LoadingComponent";
import { createColumnsProxy } from "./utils/columnProxy";
import { StorageType } from "../../../utils/state-persistance";
import { useDataSourceSubscription } from "../../../hooks/useDataSourceSubscription";
import { refreshDataSource } from "./utils/crud-handlers";
import { DataSource } from "../types";
import { EditedRowsProvider } from "./hooks/use-edited-rows";

export const WmTableComponent: React.FC<WmTableProps> = memo(
  ({
    name,
    dataset = [],
    navigation = "Pager",
    children,
    listener,
    pagesize = 5,
    navigationalign = "left",
    showrecordcount = false,
    maxsize = 5,
    boundarylinks = false,
    allowpagesizechange = false,
    pagesizeoptions = "5,10,20,50,100",
    formposition = "bottom",
    editmode = "none",
    spacing = "normal",
    title,
    subheading,
    iconclass,
    exportformat = [],
    exportdatasize,
    onBeforeexport,
    shownavigation = true,
    onDemandLoad = false,
    showrowindex = false,
    showheader = true,
    enablesort = true,
    radioselect = false,
    radioselecttitle = "",
    radioselectarialabel = TABLE_MESSAGES.radioSelectAriaLabel,
    multiselect = false,
    multiselecttitle = "",
    multiselectarialabel = TABLE_MESSAGES.multiSelectAriaLabel,
    gridfirstrowselect = false,
    rowClass = "",
    deleteoktext = TABLE_MESSAGES.deleteOkText,
    deletecanceltext = TABLE_MESSAGES.deleteCancelText,
    confirmdelete = TABLE_MESSAGES.deleteConfirmMessage,
    errormessage = TABLE_MESSAGES.operationError,
    nodatamessage = TABLE_MESSAGES.noDataMessage,
    loadingdatamsg = TABLE_MESSAGES.loadingMessage,
    insertmessage = TABLE_MESSAGES.insertSuccess,
    updatemessage = TABLE_MESSAGES.updateSuccess,
    deletemessage = TABLE_MESSAGES.deleteSuccess,
    onRowDelete,
    onRowUpdate,
    datasource,
    binddataset,
    onSuccess,
    onError,
    onRowinsert,
    onRowupdate,
    onRowdelete,
    onRowclick,
    statehandler,
    formName,
    filtermode,
    searchlabel = "Search",
    onBeforedatarender,
    onDatarender,
    className,
    ...props
  }) => {
    const [loading, setLoading] = useState(datasource?.loading || false);
    const prevDatasetRef = useRef(dataset);
    const prevSelectedRow = useRef<string | null>(null);
    const tableApisRegistered = useRef<boolean>(false);

    useEffect(() => {
      // Sync local loading state with datasource loading
      if (datasource?.loading !== undefined) {
        setLoading(datasource.loading);
      }
    }, [datasource?.loading]);

    // State for accumulated data in Scroll navigation mode
    const [scrollAccumulatedData, setScrollAccumulatedData] = useState<any[]>([]);

    // Callback to receive accumulated data from pagination
    const handleScrollDataUpdate = useCallback((data: any[]) => {
      // Only update if data has actually changed to prevent unnecessary re-renders
      setScrollAccumulatedData(prevData => {
        // If lengths are different, it's definitely new data
        if (prevData.length !== data.length) {
          return data;
        }
        // Otherwise keep the previous reference to avoid re-render
        return prevData;
      });
    }, []);

    // Reset accumulated data when navigation changes or dataset changes
    useEffect(() => {
      if (navigation !== "Scroll") {
        setScrollAccumulatedData([]);
      }
    }, [navigation]);

    // Create a centralized toast notification function
    const showToast = useCallback(
      (message: string, type: ToastType) => {
        if (listener && listener.App && typeof listener.App.notifyApp === "function") {
          listener.App.notifyApp(message, type);
        }
      },
      [listener]
    );

    // Determine if we're using server-side pagination
    // Check if datasource is API-aware (server-side) rather than checking runtime pagination data
    const isServerSidePagination = useMemo(() => {
      if (navigation === "None") {
        return false;
      }

      return !!(
        datasource &&
        datasource.execute &&
        datasource.execute(DataSource.Operation.IS_PAGEABLE)
      );
    }, [datasource]);

    // Disable state management for Scroll navigation
    const effectiveStateHandler = navigation === "Scroll" ? "none" : statehandler;

    // Use datasource subscription for SSP state restoration - RUN FIRST
    // This hook must run before other hooks to ensure datasource state is properly initialized
    useDataSourceSubscription({
      datasource,
      statehandler: effectiveStateHandler as StorageType,
      name: name,
      widgetType: "table",
      onPageRestored: () => {
        // This will be called when datasource loads with restored page
        // The page is already set in datasource options, so we don't need to do anything here
      },
    });

    // Use custom hooks for organized functionality
    const { internalDataset, setInternalDataset, deleteRecord, renderConfirmDialog } = useTableData(
      {
        dataset,
        onRowDelete,
        deleteoktext,
        deletecanceltext,
        confirmdelete,
        deletemessage,
        errormessage,
        showToast,
        datasource,
        binddataset,
        onSuccess,
        onError,
        onRowdelete,
        isServerSidePagination,
      }
    );

    const { renderFormWidget } = useFormWidget({
      listener,
    });

    // Use generic cell state hook for managing cell values and selections
    // Use the table name as unique ID to prevent collisions between multiple tables
    const cellState = useCellState(name);

    // ==================== STATE PERSISTENCE ====================
    // Restore persisted state before initializing table
    const {
      initialPage,
      initialPageSize,
      initialActualPageSize,
      initialSearchState,
      initialSortState,
    } = useMemo(() => {
      // Skip state restoration for Scroll navigation
      if (navigation === "Scroll") {
        return {
          initialPage: 1,
          initialPageSize: pagesize,
          initialActualPageSize: undefined,
          initialSearchState: undefined,
          initialSortState: undefined,
        };
      }

      const persisted = getTableState(name, effectiveStateHandler as StorageType);

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
        // Check if there's an active filter/search state
        const hasActiveFilter = persisted.search && persisted.search.length > 0;

        // If there's an active filter, don't restore pagination - start from page 1
        // The server will return new filtered data, so old pagination is invalid
        const restoredPage = hasActiveFilter ? 1 : persisted.pagination || 1;

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
          initialActualPageSize: actualPageSize,
          initialSearchState: persisted.search || undefined,
          initialSortState: persisted.sort || undefined,
        };
      }

      return {
        initialPage: 1,
        initialPageSize: pagesize,
        initialActualPageSize: actualPageSize,
        initialSearchState: undefined,
        initialSortState: undefined,
      };
    }, [name, effectiveStateHandler, pagesize, isServerSidePagination, datasource, navigation]);

    // Create a ref to hold the table instance
    const tableRef = React.useRef<ReturnType<typeof useReactTable> | null>(null);

    // Track previous page index to detect actual page changes
    const prevPageIndexRef = useRef(-1);

    // Use pagination state hook - manages controlled pagination state
    const {
      paginationState,
      setPaginationState,
      handlePaginationChange,
      handlePageSizeChange: handlePageSizeChangeBase,
    } = usePaginationState({
      initialPage,
      initialPageSize,
      editmode,
      internalDataset,
      datasource,
      isServerSidePagination,
    });

    // Use row selection hook
    const {
      selectedRowId,
      selectedRowIds,
      useMultiSelect,
      useRadioSelect,
      handleRadioSelection,
      handleMultiSelection,
      handleSelectAll,
      handleRowSelectionClick,
      isRowSelected,
    } = useRowSelection({
      radioselect,
      multiselect,
      gridfirstrowselect,
      internalDataset,
      cellState,
      name: name,
      statehandler: effectiveStateHandler as StorageType,
      initialActualPageSize,
      getTableState: () =>
        tableRef.current
          ? {
              currentPage: tableRef.current.getState().pagination.pageIndex + 1,
              currentPageSize: tableRef.current.getState().pagination.pageSize,
            }
          : { currentPage: 1, currentPageSize: pagesize },
    });

    // Use table state hook
    const { activeRowIds, setActiveRow, handleRowActiveClick, isRowActive } = useTableState({
      editMode: editmode,
      radioselect,
      multiselect,
    });

    // Use dynamic columns hook to generate columns from data when no children are provided
    const { dynamicColumns, isDynamicTable } = useDynamicColumns({
      dataset: internalDataset,
      children,
      listener,
    });

    // Parse table structure from children using utilities
    const { wmTableColumns, rowActions, headerActions, footerActions, rowExpansionConfig } =
      useMemo(() => {
        const allTableActions = parseTableActions(children);

        // Filter out addNewRow action when editmode is 'none' or 'quickedit'
        const filteredActions =
          editmode === "none" || editmode === "quickedit"
            ? allTableActions.filter(action => action.key !== "addNewRow")
            : allTableActions;

        // Split actions based on position - handle comma-separated positions
        const headerActions = filteredActions.filter(action => {
          const position = action.position || "footer";
          return position === "header" || position.includes("header");
        });

        const footerActions = filteredActions.filter(action => {
          const position = action.position || "footer";
          return position === "footer" || position.includes("footer") || !action.position;
        });

        // Get static columns from children
        const staticColumns = parseTableColumns(children, internalDataset);

        // Use dynamic columns if no static columns are provided
        // For dynamic tables, prefer dynamic columns even if they're empty initially (data loading)
        const finalColumns =
          staticColumns.length > 0
            ? staticColumns
            : isDynamicTable
              ? dynamicColumns
              : staticColumns;

        return {
          wmTableColumns: finalColumns,
          rowActions: parseTableRowActions(children),
          tableActions: filteredActions,
          headerActions,
          footerActions,
          rowExpansionConfig: parseTableRowExpansion(children),
        };
      }, [children, editmode, dynamicColumns]);

    // Use unified table edit functionality
    const {
      editingRowId,
      isRowEditing,
      startEditing,
      cancelEditing,
      saveEditing,
      renderEditableCell,
      isAddingNewRow,
      handleAddNewRowClick,
      renderAddNewRow,
      handleRowClick: handleTableEditRowClick,
      handleKeyDown: handleTableEditKeyDown,
    } = useTableEdit({
      editMode: editmode,
      internalDataset,
      setInternalDataset,
      wmTableColumns,
      cellState,
      renderFormWidget,
      listener,
      onRowUpdate,
      onRowDelete,
      onNewRowAdded: newRecord => {
        // Use shared navigation utility function
        handleNewRowNavigation(tableRef, newRecord, internalDataset);
      },
      showrowindex,
      radioselect,
      multiselect,
      rowActions,
      formposition,
      insertmessage,
      updatemessage,
      errormessage,
      showToast,
      hasRowExpansion: rowExpansionConfig ? rowExpansionConfig.show : false,
      expansionPosition: rowExpansionConfig
        ? parseInt(String(rowExpansionConfig.position || "0"), 10)
        : 0,
      datasource,
      binddataset,
      onSuccess,
      onError,
      onRowinsert,
      onRowupdate,
      onRowdelete,
      tableRef,
      isServerSidePagination,
    });

    // Use the row handlers hook
    const { handleRowClick } = useRowHandlers({
      editingRowId,
      isAddingNewRow,
      handleRowSelectionClick,
      handleTableEditRowClick: handleTableEditRowClick,
      handleRowActiveClick,
      onRowclick,
    });

    // Effect to cancel editing when page changes
    useEffect(() => {
      const currentPage = paginationState.pageIndex;
      if (currentPage !== prevPageIndexRef.current && isAddingNewRow) {
        cancelEditing();
      }
      // Don't update the ref here - it's updated in the data render effect
    }, [paginationState.pageIndex, isAddingNewRow, cancelEditing]);

    // Track sorting and column sizing states
    const [sorting, setSorting] = useState<SortingState>(() => {
      // Convert initialSortState to TanStack Table sorting format
      if (initialSortState) {
        return [
          {
            id: initialSortState.field,
            desc: initialSortState.direction === "desc",
          },
        ];
      }
      return [];
    });
    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({});
    const [isResizing, setIsResizing] = useState(false);

    // Custom sorting change handler that resets page to 1 when sorting changes
    const handleSortingChange = useCallback(
      (updaterOrValue: React.SetStateAction<SortingState>) => {
        setSorting(updaterOrValue);
        // Reset to first page when sorting changes
        setPaginationState(prev => ({ ...prev, pageIndex: 0 }));
      },
      []
    );

    // Use row expansion hook
    const { expandedRows, toggleRowExpansion, isRowExpanded } = useRowExpansion({
      rowExpansionConfig,
      internalDataset,
    });

    // Use table columns hook to get column definitions
    const { columns: baseColumns } = useTableColumns({
      wmTableColumns,
      rowActions,
      listener,
      deleteRecord: (rowData: Record<string, unknown>) => deleteRecord(rowData, tableRef.current),
      showrowindex,
      editmode,
      renderEditableCell,
      isRowEditing,
      startEditing,
      cancelEditing,
      saveEditing,
      editingRowId,
      cellState,
      isResizing,
    });

    // Add radio select or multiselect column if enabled and memoize with stable references
    const columns = useMemo(() => {
      const selectionColumn = buildSelectionColumns({
        useRadioSelect,
        useMultiSelect,
        selectedRowId, // Keep these for interface compatibility but they're not used in column structure
        selectedRowIds,
        handleRadioSelection,
        handleMultiSelection,
        handleSelectAll,
        internalDataset,
        radioselecttitle,
        radioselectarialabel,
        multiselecttitle,
        multiselectarialabel,
        tableName: name,
      });

      if (selectionColumn) {
        return [selectionColumn, ...baseColumns];
      }

      return baseColumns;
    }, [
      baseColumns,
      useRadioSelect,
      useMultiSelect,
      handleRadioSelection,
      handleMultiSelection,
      handleSelectAll,
      radioselecttitle,
      radioselectarialabel,
      multiselecttitle,
      multiselectarialabel,
      name,
    ]);

    //column proxy changes
    const columnsStateRef = useRef(columns);
    const [columnsVersion, setColumnsVersion] = useState(0);
    const [columnOverrides, setColumnOverrides] = useState<Record<number, Record<string, unknown>>>(
      {}
    );
    const applyOverride = useCallback((index: number, key: string, value: unknown) => {
      setColumnOverrides(prev => ({
        ...prev,
        [index]: { ...(prev[index] || {}), [key]: value },
      }));
    }, []);

    const [summaryRowDefs, setSummaryRowDefs] = useState<SummaryRowDef[]>([]);
    const [summaryRowEnabled, setSummaryRowEnabled] = useState(false);
    const [summaryRowDefObjects, setSummaryRowDefObjects] = useState<Record<string, any>[]>([]);
    // Store column show property for summary rows: [rowIndex][columnKey] => show boolean
    const [summaryRowColumnShow, setSummaryRowColumnShow] = useState<
      Record<number, Record<string, boolean>>
    >({});

    const setSummaryRowDef = useCallback(
      (columnKey: string, data: any, rowIndex: number, refresh: boolean, show?: boolean) => {
        setSummaryRowDefs(prev => {
          const newDefs = [...prev];
          newDefs[rowIndex] = { ...newDefs[rowIndex], [columnKey]: data };
          return newDefs;
        });
        setSummaryRowDefObjects(prev => {
          const newObjs = [...prev];
          newObjs[rowIndex] = { ...newObjs[rowIndex], [columnKey]: data };
          return newObjs;
        });
        // Store column's show property
        if (show !== undefined) {
          setSummaryRowColumnShow(prev => {
            const newShow = { ...prev };
            if (!newShow[rowIndex]) {
              newShow[rowIndex] = {};
            }
            newShow[rowIndex] = { ...newShow[rowIndex], [columnKey]: show };
            return newShow;
          });
        }
        setSummaryRowEnabled(true);
      },
      []
    );

    const columnsProxy = useMemo(
      () => createColumnsProxy(wmTableColumns, applyOverride, setColumnsVersion, setSummaryRowDef),
      [wmTableColumns, applyOverride, setColumnsVersion, setSummaryRowDef]
    );

    columnsStateRef.current = columns;

    const columnsForTable = useMemo(() => {
      const base = columnsStateRef.current || [];
      return base.map((col, idx) => ({ ...col, ...(columnOverrides[idx] || {}) }));
    }, [columns, columnOverrides, columnsVersion, editingRowId]);

    // Compute  class signature from columns meta.className to trigger header and body re-render on class updates
    const ColClassSignature = useMemo(() => {
      try {
        return (columnsForTable || [])
          .map((col: any) => String(col?.meta?.className || ""))
          .join("|");
      } catch {
        return "";
      }
    }, [columnsForTable]);

    // Use filter hook for filtering functionality
    const {
      globalFilter,
      setGlobalFilter: setGlobalFilterOriginal,
      globalSearchColumn,
      setGlobalSearchColumn,
      columnFilters,
      setColumnFilter: setColumnFilterOriginal,
      filteredData,
      getFilterFields,
      transformFilterFields,
    } = useTableFilter({
      filterMode: filtermode,
      columns: columnsForTable,
      dataset:
        navigation === "Scroll" && scrollAccumulatedData.length > 0
          ? scrollAccumulatedData
          : internalDataset,
      initialSearchState,
    });

    // Wrap filter setters to reset page when filters change
    const setGlobalFilter = useCallback(
      (value: string) => {
        setGlobalFilterOriginal(value);
        // Reset to first page when filter changes
        setPaginationState(prev => ({ ...prev, pageIndex: 0 }));
      },
      [setGlobalFilterOriginal]
    );

    const setColumnFilter = useCallback(
      (columnId: string, value: string | number | boolean | null, matchMode?: string) => {
        setColumnFilterOriginal(columnId, value, matchMode);
        // Reset to first page when filter changes
        setPaginationState(prev => ({ ...prev, pageIndex: 0 }));
      },
      [setColumnFilterOriginal]
    );

    // Use refs to track resizing state and debounce timer
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Memoize the column sizing change handler with smart resizing detection
    const handleColumnSizingChange = useCallback(
      (updaterOrValue: React.SetStateAction<Record<string, number>>) => {
        // Only update resizing state if it's not already true
        setIsResizing(prev => {
          if (!prev) return true;
          return prev;
        });
        setColumnSizing(updaterOrValue);

        // Clear any existing timeout
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }

        // Set a debounced timeout to detect when resizing has stopped
        resizeTimeoutRef.current = setTimeout(() => {
          setIsResizing(false);
        }, 150); // 150ms delay to detect when user stops resizing
      },
      []
    );

    // Create custom row selection state for TanStack Table
    const rowSelection = useMemo(() => {
      const selection: Record<string, boolean> = {};
      if (useMultiSelect) {
        selectedRowIds.forEach(id => {
          selection[id] = true;
        });
      } else if (useRadioSelect && selectedRowId) {
        selection[selectedRowId] = true;
      }
      return selection;
    }, [useMultiSelect, useRadioSelect, selectedRowIds, selectedRowId]);

    // Determine if we're using server-side sorting (same as server-side pagination)
    const isServerSideSorting = isServerSidePagination;

    // Use accumulated data for Scroll navigation, otherwise use normal dataset
    const tableData = useMemo(() => {
      if (navigation === "Scroll" && scrollAccumulatedData.length > 0) {
        return filtermode ? filteredData : scrollAccumulatedData;
      }
      return filtermode ? filteredData : internalDataset;
    }, [navigation, scrollAccumulatedData, filteredData, internalDataset, filtermode]);

    // Memoize pagination options to prevent unnecessary re-renders
    const memoizedPagination = useMemo(
      () => ({
        pageSize: navigation === "None" ? tableData?.length || 0 : paginationState.pageSize,
        pageIndex: paginationState.pageIndex,
      }),
      [navigation, tableData?.length, paginationState.pageSize, paginationState.pageIndex]
    );

    const table = useReactTable({
      data: tableData,
      columns: columnsForTable,
      state: {
        sorting,
        columnSizing,
        rowSelection, // Add row selection state
        pagination: memoizedPagination,
      },
      onSortingChange: handleSortingChange,
      onColumnSizingChange: handleColumnSizingChange,
      onPaginationChange: setPaginationState,
      getCoreRowModel: getCoreRowModel(),
      // Only use pagination model for client-side pagination
      getPaginationRowModel: isServerSidePagination ? undefined : getPaginationRowModel(),
      // Use sorted row model only for client-side sorting
      getSortedRowModel: isServerSideSorting ? undefined : getSortedRowModel(),

      enableSorting: enablesort,
      enableSortingRemoval: false,
      autoResetPageIndex: false,
      enableColumnResizing: true,
      columnResizeMode: "onChange", // Keep onChange for real-time visual feedback
      enableRowSelection: true, // Enable row selection
      // Use manual pagination and sorting for server-side operations
      manualPagination: isServerSidePagination,
      manualSorting: isServerSideSorting,
      pageCount:
        isServerSidePagination && datasource?.pagination?.totalPages
          ? datasource.pagination.totalPages
          : undefined,
      getRowId: row => row._wmTableRowId || String(row.id) || uniqueId("row_"),
    });

    // Update the table ref
    tableRef.current = table;

    // Memoize filter fields to prevent unnecessary re-renders in useServerSideSorting
    const memoizedFilterFields = useMemo(() => {
      if (!filtermode) return {};

      const searchObj =
        filtermode === "search"
          ? [
              {
                field: globalSearchColumn,
                value: globalFilter,
                matchMode: "anywhereignorecase",
                type: "string",
              },
            ]
          : transformFilterFields(columnFilters);

      return getFilterFields(searchObj);
    }, [
      filtermode,
      globalSearchColumn,
      globalFilter,
      columnFilters,
      getFilterFields,
      transformFilterFields,
    ]);

    // Memoize logical operator
    const memoizedLogicalOp = useMemo(() => {
      return filtermode === "search" && !globalSearchColumn ? "OR" : "AND";
    }, [filtermode, globalSearchColumn]);

    // Use server-side sorting hook to handle data fetching
    useServerSideSorting({
      datasource,
      sorting,
      setInternalDataset,
      showToast,
      isServerSidePagination,
      pageIndex: table.getState().pagination.pageIndex,
      onError,
      setLoading,
      filterFields: memoizedFilterFields,
      logicalOp: memoizedLogicalOp,
    });

    // Panel structure management
    const { showPanelHeading, showPagination } = usePanelStructure({
      title,
      subheading,
      iconclass,
      exportformat,
      headerActions,
      footerActions,
      shownavigation,
      onDemandLoad,
      internalDataset,
      pagesize,
      allowpagesizechange,
      datasource,
    });

    // Memoize sortInfo for export to prevent unnecessary re-renders
    const sortInfoForExport = useMemo(() => {
      if (sorting.length > 0) {
        return {
          field: sorting[0].id,
          direction: sorting[0].desc ? "desc" : "asc",
        };
      }
      return undefined;
    }, [sorting]);

    // Update grid edit mode (includes inline editing and add new row)
    const isGridEditModeComplete = isAddingNewRow || editingRowId !== null;

    // Generate spacing-related classes based on spacing prop
    const spacingClasses = getSpacingClasses(spacing);

    // ==================== STATE MANAGEMENT ====================
    // Prepare filter data based on filter mode - always in array format
    const filterDataForState = useMemo(() => {
      if (!filtermode) return undefined;

      if (filtermode === "search") {
        if (globalFilter || globalSearchColumn) {
          // Find column type for the selected search column
          const columnType = globalSearchColumn
            ? (() => {
                const col = find(columnsForTable, c => {
                  const column = c as {
                    id?: string;
                    accessorKey?: string;
                    meta?: { type?: string; editinputtype?: string };
                  };
                  return (
                    column.accessorKey === globalSearchColumn || column.id === globalSearchColumn
                  );
                }) as { meta?: { type?: string; editinputtype?: string } } | undefined;
                return col?.meta?.type || col?.meta?.editinputtype || "string";
              })()
            : "string";

          return [
            {
              field: globalSearchColumn || "",
              value: globalFilter,
              matchMode: "anywhereignorecase",
              type: columnType,
            },
          ];
        }
      } else if (filtermode === "multicolumn") {
        const activeFilters = Object.entries(columnFilters)
          .filter(([_, filter]) => filter.value)
          .map(([field, filter]) => {
            // Find column type for each field
            const columnType = (() => {
              const col = find(columnsForTable, c => {
                const column = c as {
                  id?: string;
                  accessorKey?: string;
                  meta?: { type?: string; editinputtype?: string };
                };
                return column.accessorKey === field || column.id === field;
              }) as { meta?: { type?: string; editinputtype?: string } } | undefined;
              return col?.meta?.type || col?.meta?.editinputtype || "string";
            })();

            return {
              field,
              value: filter.value,
              matchMode: filter.matchMode,
              type: columnType,
            };
          });
        return activeFilters.length > 0 ? activeFilters : undefined;
      }
      return undefined;
    }, [filtermode, globalFilter, globalSearchColumn, columnFilters, columnsForTable]);

    // Convert TanStack Table sorting state to our format
    const sortDataForState = useMemo(() => {
      if (sorting.length > 0) {
        const firstSort = sorting[0]; // We only support single column sorting for state persistence
        return {
          field: firstSort.id,
          direction: firstSort.desc ? "desc" : "asc",
        } as TableSortState;
      }
      return undefined;
    }, [sorting]);

    const stateManager = useTableStateManager({
      name: name,
      storage: effectiveStateHandler as StorageType,
      currentPage: table.getState().pagination.pageIndex + 1,
      currentPageSize: table.getState().pagination.pageSize,
      selectedRowId,
      selectedRowIds,
      internalDataset,
      initialActualPageSize,
      datasource,
      multiselect,
      filterData: filterDataForState,
      sortData: sortDataForState,
      navigation,
      isStateConfigured: effectiveStateHandler !== undefined && effectiveStateHandler !== "none",
      defaultPageSize: pagesize, // Original page size from props
      initialSortState,
      initialFilterState: initialSearchState,
    });

    // Enhanced page size change handler with state persistence
    const handlePageSizeChange = useCallback(
      (newPageSize: number) => {
        // Get old page size before updating for state persistence
        const oldPageSize = paginationState.pageSize;

        // Call base handler from hook
        handlePageSizeChangeBase(newPageSize);

        // Skip state persistence for Scroll navigation
        if (navigation !== "Scroll") {
          // Get current persisted state to access all selected items across pages
          const currentPersistedState = getTableState(name, effectiveStateHandler as StorageType);

          // Build the state for page size change
          const newState = stateManager.getStateForPageSizeChange(
            newPageSize,
            currentPersistedState?.selectedItem,
            oldPageSize // Pass the old page size
          );

          // Clear the existing state first to avoid merge issues with setWidgetState
          clearTableState(name, effectiveStateHandler as StorageType);

          // Only save if there's something to save (not in default state)
          if (Object.keys(newState).length > 0) {
            // If pagesize equals default, remove it from the state
            if (newPageSize === pagesize) {
              delete newState.pagesize;
            }

            // Only save if there are still properties after removing default pagesize
            if (Object.keys(newState).length > 0) {
              saveTableState(name, effectiveStateHandler as StorageType, newState);
            }
          }
        }
      },
      [
        handlePageSizeChangeBase,
        paginationState.pageSize,
        name,
        effectiveStateHandler,
        stateManager,
        pagesize,
        navigation,
      ]
    );

    // Call data render callbacks for dynamic tables or when data changes
    useEffect(() => {
      // For dynamic tables, call callbacks when we have data
      // For static tables, call callbacks when we have both data and columns
      const shouldCallCallbacks = isDynamicTable
        ? internalDataset.length > 0
        : internalDataset.length > 0 && wmTableColumns.length > 0;

      if (shouldCallCallbacks) {
        const currentPageIndex = table.getState().pagination.pageIndex;

        // Update the tracked page index
        prevPageIndexRef.current = currentPageIndex;

        if (!isEqual(prevDatasetRef.current, internalDataset)) {
          prevDatasetRef.current = internalDataset;
          // Call onBeforedatarender callback
          if (onBeforedatarender) {
            onBeforedatarender(
              listener?.Widgets[name], // widget reference
              internalDataset, // data
              columnsProxy // columns (including dynamic ones)
            );
          }
        }

        // Schedule onDatarender callback after rendering is complete
        // Use requestAnimationFrame to ensure DOM is fully painted
        requestAnimationFrame(() => {
          if (onDatarender) {
            onDatarender(
              listener?.Widgets[name], // widget reference to match Angular format
              { $data: internalDataset, data: internalDataset } // match Angular's format with both $data and data
            );
          }
        });
      }
    }, [
      internalDataset,
      wmTableColumns,
      onBeforedatarender,
      onDatarender,
      name,
      isDynamicTable,
      table.getState().pagination.pageIndex,
    ]);
    // Use table initialization hook
    useTableInitialization({
      internalDataset,
      wmTableColumns,
      cellState,
      gridfirstrowselect,
      useRadioSelect,
      useMultiSelect,
      setActiveRow,
      selectedRowId,
      selectedRowIds,
      formName,
      editmode,
      activeRowIds,
      listener,
    });

    // Use table effects hook for state persistence
    const { restoredPageNumber, restoredSelectedIndices, setIsRestoringSelection } =
      useTableEffects({
        name: name,
        navigation,
        datasource,
        internalDataset,
        statehandler: effectiveStateHandler as StorageType,
        selectedRowId,
        selectedRowIds,
        currentPage: table.getState().pagination.pageIndex + 1, // Convert to 1-based
        currentPageSize: table.getState().pagination.pageSize,
        sorting,
        isGridEditMode: isGridEditModeComplete,
        stateManager,
        initialActualPageSize,
      });

    // Apply restored state
    useEffect(() => {
      if (restoredPageNumber !== null && restoredPageNumber > 1) {
        // Set the restored page (convert to 0-based index)
        table.setPageIndex(restoredPageNumber - 1);
      }
    }, [restoredPageNumber, table]);

    // Track if we've already restored selection to avoid loops
    const hasRestoredSelectionRef = useRef(false);

    useEffect(() => {
      if (
        restoredSelectedIndices.length > 0 &&
        internalDataset.length > 0 &&
        !hasRestoredSelectionRef.current
      ) {
        // Mark as restored to prevent running again
        hasRestoredSelectionRef.current = true;

        // Set flag to prevent saving while restoring
        setIsRestoringSelection(true);

        // Apply restored selections by converting indices to row IDs
        if (useMultiSelect) {
          // For multiselect, set all restored items by index
          const selectedRowIds: string[] = [];
          restoredSelectedIndices.forEach(index => {
            if (index >= 0 && index < internalDataset.length) {
              const row = internalDataset[index];
              if (row && row._wmTableRowId) {
                handleMultiSelection(row._wmTableRowId, row, true);
                // Collect all selected row IDs
                selectedRowIds.push(row._wmTableRowId);
              }
            }
          });
          // Set all selected rows as active
          if (selectedRowIds.length > 0) {
            setActiveRow(selectedRowIds);
          }
        } else {
          // For radio select or default mode (single selection), only restore the first selection
          const firstIndex = restoredSelectedIndices[0];
          if (firstIndex >= 0 && firstIndex < internalDataset.length) {
            const row = internalDataset[firstIndex];
            if (row && row._wmTableRowId) {
              handleRadioSelection(row._wmTableRowId, row);
              // Also set as active row for single selection
              setActiveRow(row._wmTableRowId);
            }
          }
        }

        // Reset flag after restoration is complete
        setTimeout(() => {
          setIsRestoringSelection(false);
        }, 0);
      }
    }, [
      restoredSelectedIndices,
      internalDataset,
      useMultiSelect,
      handleMultiSelection,
      handleRadioSelection,
      setIsRestoringSelection,
    ]);

    // Cleanup resize timeout on unmount and when component updates
    useEffect(() => {
      const currentTimeout = resizeTimeoutRef.current;
      return () => {
        if (currentTimeout) {
          clearTimeout(currentTimeout);
        }
      };
    }, []);

    // Create wrapper functions for external API
    const editRow = useCallback(
      (
        event: React.MouseEvent | null,
        widget?: unknown,
        row?: Record<string, unknown> & { _wmTableRowId?: string }
      ) => {
        if (!row || !row._wmTableRowId) {
          console.warn("Invalid row data provided to editRow");
          return;
        }
        startEditing(row, row._wmTableRowId);
      },
      [startEditing]
    );

    const deleteRow = useCallback(
      (event: React.MouseEvent | null, widget?: unknown, row?: Record<string, unknown>) => {
        if (!row) {
          console.warn("Invalid row data provided to deleteRow");
          return;
        }
        deleteRecord(row, tableRef.current);
      },
      [deleteRecord]
    );

    // Refresh table data
    const refresh = useCallback(
      async (newData: boolean = false) => {
        if (!datasource) {
          console.warn("No datasource available for refresh");
          return;
        }

        try {
          // Use tableRef.current to access the latest table instance
          const currentTable = tableRef.current;
          if (!currentTable) {
            console.warn("Table instance not available");
            return;
          }

          let targetPage = currentTable.getState().pagination.pageIndex + 1;
          const currentPageSize =
            datasource.pagination?.size || currentTable.getState().pagination.pageSize;
          let shouldNavigateToLastPage = false;

          // If newData is true and we have pagination metadata, calculate the last page
          if (newData && datasource.pagination) {
            const { totalElements } = datasource.pagination;
            if (totalElements !== undefined && currentPageSize > 0) {
              // Calculate the last page
              // For example: 15 elements with page size 5 = 3 pages
              // Adding 1 element makes it 16 elements = 4 pages (since page 3 is full)
              const totalAfterAdd = totalElements + 1;
              const lastPage = Math.ceil(totalAfterAdd / currentPageSize);
              targetPage = lastPage;
              shouldNavigateToLastPage = true;
            }
          }

          // For server-side pagination, use datasource invoke
          if (isServerSidePagination) {
            const response = await refreshDataSource(datasource, {
              page: targetPage,
              pagesize: currentPageSize,
              filterFields: memoizedFilterFields || {},
              condition: memoizedLogicalOp,
            });

            // The datasource should update its data property automatically
            // which will trigger a re-render through the dataset prop
            if (response && response.data) {
              const dataWithIds = addUniqueRowIds(response.data);
              setInternalDataset(dataWithIds);

              // Set the table to the last page AFTER data is loaded
              if (shouldNavigateToLastPage) {
                // Use requestAnimationFrame for better performance than setTimeout
                requestAnimationFrame(() => {
                  currentTable.setPageIndex(targetPage);
                });
              }
            }
          } else {
            // For client-side pagination, just set the page index
            if (shouldNavigateToLastPage) {
              currentTable.setPageIndex(targetPage);
            }
          }

          // Show success notification
          if (showToast) {
            showToast("Table refreshed successfully", "Success");
          }
        } catch (error) {
          console.error("Error refreshing table data:", error);
          if (showToast) {
            showToast("Failed to refresh table data", "Error");
          }
          if (onError) {
            onError("refresh", error);
          }
        }
      },
      [datasource, isServerSidePagination, setInternalDataset, showToast, onError]
    ); // Removed 'table' from dependencies to prevent recreation

    const tableApis = {
      columns: columnsProxy,
      addNewRow: handleAddNewRowClick,
      editRow,
      deleteRow,
      refresh,
      datasource,
    };

    // Expose table API through listener
    useEffect(() => {
      if (listener && listener.onChange && !gridfirstrowselect && !tableApisRegistered.current) {
        listener.onChange(name, tableApis);
        tableApisRegistered.current = true;
      }
    }, []);

    const updateSelectedItem = () => {
      if (listener && listener.onChange) {
        let selecteditem: any = null;

        // Priority 1: Check if radioselect or multiselect is enabled
        if (useRadioSelect && selectedRowId) {
          // Single selection mode - find the selected row
          selecteditem = internalDataset.find(
            (row: any) => row._wmTableRowId === selectedRowId || String(row.id) === selectedRowId
          );
        } else if (useMultiSelect && selectedRowIds.length > 0) {
          // Multi-selection mode - find first selected row
          selecteditem =
            internalDataset.find((row: any) =>
              selectedRowIds.includes(row._wmTableRowId || String(row.id))
            ) || null;
        } else if (activeRowIds.length > 0) {
          // Priority 2: No explicit selection mode - use active row (clicked/highlighted row)
          const activeIds = activeRowIds as string[];
          // Get the first active row
          selecteditem =
            internalDataset.find((row: any) => {
              const rowId = row._wmTableRowId || String(row.id);
              return activeIds.includes(rowId);
            }) || null;
        }

        // Update widget state with selected row data
        if (!isEqual(prevSelectedRow.current, selecteditem)) {
          prevSelectedRow.current = selecteditem;
          if (!tableApisRegistered.current) {
            listener.onChange(name, {
              ...tableApis,
              selecteditem: cloneDeep(selecteditem),
            });
            tableApisRegistered.current = true;
            return;
          }
          listener.onChange(name, {
            selecteditem: cloneDeep(selecteditem),
          });
        }
      }
    };

    // Expose active/selected row data through listener
    // This updates whenever the active/selected row changes (when user clicks on a row)
    useEffect(() => {
      updateSelectedItem();
    }, [
      activeRowIds,
      selectedRowId,
      selectedRowIds,
      useRadioSelect,
      useMultiSelect,
      internalDataset,
      name,
    ]);

    return (
      <Box
        hidden={props.hidden}
        className={"app-livegrid"}
        {...({ name: name } as HTMLAttributes<HTMLDivElement>)}
      >
        <Box
          className={`app-grid app-panel panel app-datagrid ${className}`.trim()}
          {...({ name: name } as HTMLAttributes<HTMLDivElement>)}
          {...({ editmode: editmode } as HTMLAttributes<HTMLDivElement>)}
          {...({ navigation: navigation } as HTMLAttributes<HTMLDivElement>)}
          {...({ title: title } as HTMLAttributes<HTMLDivElement>)}
          {...({
            currentpage: table.getState().pagination.pageIndex + 1,
          } as HTMLAttributes<HTMLDivElement>)}
        >
          {/* Render delete confirmation dialog */}
          {renderConfirmDialog()}

          {/* Panel Heading */}
          {showPanelHeading && (
            <TablePanelHeading
              title={title}
              subheading={subheading}
              iconclass={iconclass}
              exportformat={exportformat}
              headerActions={headerActions}
              spacing={spacing}
              isGridEditMode={isGridEditModeComplete}
              isLoading={datasource?.loading}
              listener={listener}
              datasource={datasource}
              columns={wmTableColumns}
              sortInfo={sortInfoForExport}
              filterInfo={filterDataForState}
              exportdatasize={exportdatasize}
              onBeforeExport={onBeforeexport}
            />
          )}

          {/* Table Container */}
          <Box className="app-datagrid" onKeyDown={e => handleTableEditKeyDown(e)}>
            {/* Global Search Filter */}
            {filtermode === "search" && (
              <GlobalSearchFilter
                value={globalFilter}
                onChange={setGlobalFilter}
                selectedColumn={globalSearchColumn}
                onColumnChange={setGlobalSearchColumn}
                columns={columnsForTable}
                searchLabel={searchlabel}
                name={name}
                listener={listener}
              />
            )}
            <Box className="table-container table-responsive">
              <Box className="app-grid-header">
                <Box
                  className="app-grid-header-inner"
                  style={{ height: "100%", overflow: "auto", position: "relative" }}
                >
                  {loading && <LoadingComponent message={loadingdatamsg} />}
                  <Table
                    key={`table-${isDynamicTable ? "dynamic" : "static"}-${wmTableColumns.length}-page-${table.getState().pagination.pageIndex}`} // Force complete rebuild on pagination
                    className={`${TABLE_CSS_CLASSES.gridDefault} table-striped table-hover ${spacingClasses}`.trim()}
                    sx={{ width: props.width || "100%" }}
                    {...({ name: name } as HTMLAttributes<HTMLTableElement>)}
                  >
                    {showheader && wmTableColumns.length > 0 && (
                      <TableHeaderComponent
                        table={table}
                        enablesort={enablesort}
                        rowClass={rowClass}
                        ColClassSignature={ColClassSignature}
                        sorting={sorting}
                        columnSizing={columnSizing}
                        rowSelection={rowSelection}
                        rowExpansionConfig={rowExpansionConfig}
                        columnsVersion={columnsVersion}
                        filterMode={filtermode}
                        columnFilters={columnFilters}
                        onColumnFilterChange={setColumnFilter}
                        renderFormWidget={renderFormWidget}
                        listener={listener}
                      />
                    )}
                    <TableBodyComponent
                      table={table}
                      columns={columns}
                      rowClass={rowClass}
                      formposition={formposition}
                      renderAddNewRow={renderAddNewRow}
                      onRowClick={handleRowClick}
                      isRowActive={isRowActive}
                      isRowSelected={isRowSelected}
                      nodatamessage={nodatamessage}
                      loadingdatamsg={loadingdatamsg}
                      isLoading={datasource?.loading}
                      rowExpansionConfig={rowExpansionConfig}
                      expandedRows={expandedRows}
                      toggleRowExpansion={toggleRowExpansion}
                      isRowExpanded={isRowExpanded}
                      rowsVersion={tableData.length}
                      ColClassSignature={ColClassSignature}
                      tableData={tableData}
                      editingRowId={editingRowId}
                      activeRowIds={activeRowIds}
                      name={name}
                      listener={listener}
                    />
                    {/* Summary Row Footer */}

                    {summaryRowEnabled && summaryRowDefs.length > 0 && (
                      <SummaryRowFooter
                        summaryRowDefs={summaryRowDefs}
                        summaryRowDefObjects={summaryRowDefObjects}
                        columns={wmTableColumns}
                        tableName={name}
                        summaryRowColumnShow={summaryRowColumnShow}
                      />
                    )}
                  </Table>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Footer with Pagination and Actions */}
          <Box className="panel-footer clearfix">
            {/* Pagination */}
            {showPagination && (
              <Box className="app-datagrid-paginator">
                <WmPagination
                  name={`${name || "table"}_pagination`}
                  dataset={filtermode ? filteredData : internalDataset}
                  maxResults={pagesize}
                  currentPage={table.getState().pagination.pageIndex + 1}
                  navigation={navigation}
                  navigationalign={navigationalign}
                  showrecordcount={showrecordcount}
                  maxsize={maxsize}
                  boundarylinks={boundarylinks}
                  directionlinks={true}
                  allowpagesizechange={allowpagesizechange}
                  pagesizeoptions={pagesizeoptions}
                  listener={listener}
                  onPaginationChange={handlePaginationChange}
                  onPageSizeChange={handlePageSizeChange}
                  onDataUpdate={handleScrollDataUpdate}
                  // Pass pagination metadata from datasource if available
                  paginationMeta={datasource?.pagination}
                  totalItems={datasource?.pagination?.totalElements}
                  // Pass datasource for API-based pagination
                  datasource={datasource}
                  // Pass server-side pagination flag
                  isServerSidePagination={isServerSidePagination}
                  // Pass additional invoke options for server-side operations
                  datasourceInvokeOptions={
                    isServerSidePagination
                      ? {
                          orderBy:
                            sorting.length > 0
                              ? sorting.map(s => `${s.id} ${s.desc ? "desc" : "asc"}`).join(", ")
                              : undefined,
                          filterFields: memoizedFilterFields,
                          condition: memoizedLogicalOp,
                        }
                      : undefined
                  }
                />
              </Box>
            )}

            {/* Footer Actions */}
            <TableFooterActions
              footerActions={footerActions}
              spacing={spacing}
              isGridEditMode={isGridEditModeComplete}
              isLoading={datasource?.loading}
              listener={listener}
            />
          </Box>
        </Box>
      </Box>
    );
  },
  (prev, current) => {
    // Check if core data and configuration props are the same
    const keys: (keyof WmTableProps)[] = [
      "dataset",
      "editmode",
      "navigation",
      "pagesize",
      "showrowindex",
      "showheader",
      "enablesort",
      "radioselect",
      "radioselecttitle",
      "radioselectarialabel",
      "multiselect",
      "multiselecttitle",
      "multiselectarialabel",
      "gridfirstrowselect",
      "rowClass",
      "deleteoktext",
      "deletecanceltext",
      "confirmdelete",
      "errormessage",
      "nodatamessage",
      "loadingdatamsg",
      "insertmessage",
      "updatemessage",
      "deletemessage",
      "spacing",
      "title",
      "subheading",
      "iconclass",
      "allowpagesizechange",
      "pagesizeoptions",
      "datasource",
      "binddataset",
      "onSuccess",
      "onError",
      "onRowinsert",
      "onRowupdate",
      "onRowdelete",
      "statehandler",
      "filtermode",
      "children",
      "listener",
      "hidden",
    ];

    // First check the simple props
    const simplePropsEqual = keys.every(key => prev[key] === current[key]);
    if (!simplePropsEqual) return false;

    // Check if children structure has changed (column/action definitions)
    const prevChildrenCount = React.Children.count(prev.children);
    const currentChildrenCount = React.Children.count(current.children);
    if (prevChildrenCount !== currentChildrenCount) return false;

    // If all checks pass, consider components equal (skip re-render)
    return true;
  }
);

WmTableComponent.displayName = "WmTableComponent";

// Wrapper component that provides EditedRowsContext to WmTableComponent
const WmTableWithProvider: React.FC<WmTableProps> = props => {
  return (
    <EditedRowsProvider>
      <WmTableComponent {...props} />
    </EditedRowsProvider>
  );
};

// @ts-ignore
const WmTable = withBaseWrapper(WmTableWithProvider);
// Override the displayName set by withBaseWrapper
WmTable.displayName = "WmTable";

export default WmTable;
