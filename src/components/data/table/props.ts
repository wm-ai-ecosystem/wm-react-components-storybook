import {
  Dispatch,
  SetStateAction,
  RefObject,
  CSSProperties,
  ReactElement,
  ReactNode,
  MouseEvent,
} from "react";
import { BaseProps } from "../../../higherOrder/withBaseWrapper";
import { ButtonProps } from "@mui/material";
import { ColumnDef, Table, SortingState } from "@tanstack/react-table";
import { IAlignment, INavigation } from "../list/props";
import { EditWidgetType } from "./utils";
import { StorageType } from "../../../utils/state-persistance";
import { LiveVariableConfig } from "@wavemaker/react-runtime/variables/live-variable";

// ========================================
// TYPE DEFINITIONS AND ENUMS
// ========================================

export type TableEditMode = "inline" | "dialog" | "form" | "quickedit" | "none";
export type TableActionPosition = "header" | "footer";
export type TableFormPosition = "top" | "bottom";
export type TablePanelSpacing = "normal" | "condensed";
export type ToastType = "Success" | "Error" | "Info" | "Warning";
export type TableFilterMode = "multicolumn" | "search";

// ========================================
// MAIN TABLE COMPONENT PROPS
// ========================================

export interface WmTableProps extends BaseProps {
  // Edit and state management
  editmode?: TableEditMode;
  statehandler?: StorageType;

  // Display options
  showrowindex?: boolean;
  showheader?: boolean;
  enablesort?: boolean;
  shownavigation?: boolean;
  showrecordcount?: boolean;

  // Selection options
  radioselect?: boolean;
  radioselecttitle?: string;
  radioselectarialabel?: string;
  multiselect?: boolean;
  multiselecttitle?: string;
  multiselectarialabel?: string;
  gridfirstrowselect?: boolean;

  // Row expansion
  isrowexpansionenabled?: boolean;
  formposition?: TableFormPosition;

  // Styling
  rowClass?: string;
  spacing?: TablePanelSpacing;

  // Content and data
  title?: string;
  subheading?: string;
  iconclass?: string;
  dataset?: any[];
  navigation?: INavigation;
  isdynamictable?: boolean;
  table_reference?: string;
  formName?: string;

  // Pagination
  pagesize?: number;
  navigationalign?: IAlignment;
  maxsize?: number;
  boundarylinks?: boolean;
  allowpagesizechange?: boolean;
  pagesizeoptions?: string;
  onDemandLoad?: boolean;

  filtermode?: TableFilterMode;
  searchlabel?: string;
  // Export options
  exportOptions?: any[];

  // Messages
  confirmdelete?: string;
  deleteoktext?: string;
  deletecanceltext?: string;
  errormessage?: string;
  nodatamessage?: string;
  loadingdatamsg?: string;
  insertmessage?: string;
  updatemessage?: string;
  deletemessage?: string;

  // Event handlers
  onRowDelete?: (deletedRowData: any, deletedRowIndex: number, updatedDataset: any[]) => void;
  onRowUpdate?: (updatedRowData: any, rowIndex: number, updatedDataset: any[]) => void;
  onRowclick?: (event: any, widget: any, row: any) => void;
  onBeforedatarender?: (widget: any, data: any, columns: any) => void;
  onDatarender?: (widget: any, data: any) => void;

  // Required props
  children: ReactNode;
  listener: any;
  onRowinsert?: (event: any, data: any) => void;
  datasource?: LiveVariableConfig;
  binddataset?: string;
  onSuccess?: (operation: string, data: any) => void;
  onError?: (operation: string, error: any) => void;
}

// ========================================
// TABLE COLUMN PROPS
// ========================================

export interface WmTableColumnProps extends BaseProps {
  // Core properties
  listener: any;
  binding: string;
  field: string;
  caption: string;
  colClass?: string;
  displayName?: string;
  widgetType: "label" | "button" | string;
  editWidgetType?: EditWidgetType;

  // Display settings
  show?: boolean;
  pcdisplay?: boolean;
  mobiledisplay?: boolean;
  tabletdisplay?: boolean;

  // Positioning
  index: number;
  headerindex: string;

  // Sorting
  sortable?: boolean;
  sortby?: string;

  // Styling
  textalignment?: IAlignment;
  backgroundcolor?: string;
  textcolor?: string;
  width?: string;
  className?: string;
  styles?: CSSProperties;

  // Form field properties
  required?: boolean;
  defaultvalue?: string | number | boolean;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  editinputtype?:
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

  // Row operations column specific
  rowactionsposition?: number;

  // Data type properties
  type?: string;
  columntype?: string;
  searchable?: boolean;
  showinfilter?: boolean;

  // Children
  children?: ReactNode;

  // Event handlers
  onClick?: ($event: any, widget: any, row: any) => void;
  onFocus?: ($event: any, widget: any, row: any) => void;
  onBlur?: ($event: any, widget: any, row: any) => void;
  onChange?: ($event: any, widget: any, row: any) => void;
  onKeypress?: ($event: any, widget: any, row: any) => void;
  onKeydown?: ($event: any, widget: any, row: any) => void;
  onKeyup?: ($event: any, widget: any, row: any) => void;
  onMouseEnter?: ($event: any, widget: any, row: any) => void;
  onMouseLeave?: ($event: any, widget: any, row: any) => void;
}

// ========================================
// TABLE ACTION PROPS
// ========================================

export interface WmTableActionProps extends BaseProps {
  listener: any;
  widgetType: "button";
  key: string;
  displayName: string;
  iconclass?: string;
  action: string;
  position?: TableActionPosition | string; // Support comma-separated positions like "header,footer"
  shortcutkey?: string;
  children?: ReactNode;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  tabindex?: number;
  disabled?: boolean;
}

export interface WmTableRowActionProps extends BaseProps {
  listener: any;
  key: string;
  name: string;
  displayName: string;
  title: string;
  iconclass?: string;
  action: string;
  className?: string;
  show: boolean;
  row?: any;
  rowIndex?: number;
  children?: ReactNode;
}

// ========================================
// TABLE ROW EXPANSION PROPS
// ========================================

export interface WmTableRowProps extends BaseProps {
  listener: any;
  content?: string;
  expandicon?: string;
  collapseicon?: string;
  position?: number | string;
  closeothers?: boolean;
  widgetType?: "button" | "anchor";
  displayName?: string;
  expandtitle?: string;
  collapsetitle?: string;
  show?: boolean;
  disabled?: boolean;
  columnwidth?: string;
  name: string;
  className?: string;
  renderPartial?: (props: Record<string, any>, onLoad: () => void) => ReactNode;
  children?: ReactNode;

  // Event handlers
  onBeforerowexpand?: ($event: any, widget: any, row: any, $data: any) => void;
  onRowexpand?: ($event: any, widget: any, row: any, $data: any) => void;
  onBeforerowcollapse?: ($event: any, widget: any, row: any, $data: any) => void;
  onRowcollapse?: ($event: any, widget: any, row: any) => void;
}

// ========================================
// COMPONENT-SPECIFIC PROPS
// ========================================

// Table Body Component Props
export interface TableBodyProps {
  table: Table<any>;
  columns: ColumnDef<any>[];
  rowClass?: string;
  formposition?: TableFormPosition;
  renderAddNewRow: () => ReactElement | null;
  onRowClick: (event: MouseEvent, rowData: any, rowId: string) => void;
  isRowActive: (rowId: string, isSelected: boolean) => boolean;
  isRowSelected: (rowId: string) => boolean;
  nodatamessage?: string;
  loadingdatamsg?: string;
  isLoading?: boolean;
  rowExpansionConfig?: WmTableRowProps | null;
  expandedRows?: Set<string>;
  toggleRowExpansion?: (rowId: string, rowData: any) => void;
  isRowExpanded?: (rowId: string) => boolean;
  rowsVersion?: number;
  ColClassSignature?: string;
  tableData?: any[];
}

// Table Header Component Props
export interface TableHeaderProps {
  table: Table<any>;
  enablesort: boolean;
  rowClass?: string;
  sorting?: SortingState;
  columnSizing?: Record<string, number>;
  rowSelection?: Record<string, boolean>;
  rowExpansionConfig?: WmTableRowProps | null;
  columnsVersion?: number;
  filterMode?: TableFilterMode;
  listener: any;
  columnFilters?: Record<string, any>;
  onColumnFilterChange?: (columnId: string, value: string, matchMode?: string) => void;
  renderFormWidget: (
    fieldName: string,
    widgetType: string,
    value: any,
    onChange: (value: any) => void,
    additionalProps?: any
  ) => React.ReactNode;
  ColClassSignature?: string;
}

// Row Expansion Button Props
export interface RowExpansionButtonProps {
  rowId: string;
  rowData: any;
  isExpanded: boolean;
  onToggle: (rowId: string, rowData: any) => void;
  config: WmTableRowProps;
}

// Add New Row Component Props
export interface AddNewRowProps {
  isAddingNewRow: boolean;
  editMode: TableEditMode;
  wmTableColumns: WmTableColumnProps[];
  rowActions: WmTableRowActionProps[];
  showrowindex: boolean;
  radioselect?: boolean;
  multiselect?: boolean;
  sessionKey: number;
  editingRowData: Record<string, any>;
  renderEditableCell: (
    column: WmTableColumnProps,
    fieldName: string,
    widgetType: string,
    editValue: any,
    rowId: string
  ) => ReactElement;
  onKeyDown?: (e: KeyboardEvent, sourceRowId?: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
  listener?: any;
  hasRowExpansion?: boolean;
  expansionPosition?: number | string;
}

// Editable Cell Props
export interface EditableCellProps {
  column: WmTableColumnProps;
  rowData: any;
  rowId: string;
  fieldName: string;
  widgetType: string;
  editValue: any;
  fieldValidationErrorsRef: RefObject<Record<string, boolean>>;
  cellUpdateCallbacksRef: RefObject<Record<string, () => void>>;
  fieldRefs: RefObject<Record<string, HTMLElement | null>>;
  renderFormWidget: (
    name: string,
    type: string,
    value: any,
    onChange: (newValue: any) => void,
    props: any
  ) => ReactElement;
  updateFieldValue: (fieldName: string, newValue: any, rowId?: string) => void;
  sessionKey?: number;
  onKeyDown?: (e: KeyboardEvent, sourceRowId?: string) => void;
  editMode?: TableEditMode;
}

// Field Validation Error Props
export interface FieldValidationErrorProps {
  showError: boolean;
  title?: string;
}

// Table Panel Components
export interface TableFooterActionsProps {
  footerActions: any[];
  spacing?: TablePanelSpacing;
  isGridEditMode?: boolean;
  isLoading?: boolean;
  listener?: any;
}

export interface TablePanelHeadingProps {
  title?: string;
  subheading?: string;
  iconclass?: string;
  exportOptions?: any[];
  headerActions: any[];
  spacing?: TablePanelSpacing;
  isGridEditMode?: boolean;
  isLoading?: boolean;
  listener?: any;
}

// ========================================
// UTILITY INTERFACES
// ========================================

// Cell Rendering Utilities
export interface CellRendererContext {
  column: WmTableColumnProps;
  rowData: any;
  listener?: any;
  cellState?: CellStateReturn;
}

export interface CellProps {
  fieldName: string;
  value: any;
  caption: string;
  className: string;
  iconclass: string;
  onClick: (rowData: any) => void;
}

// Action Button Configuration
export interface ActionButtonConfig {
  key: string;
  name: string;
  className: string;
  dataActionKey: string;
  displayName: string;
  title: string;
  iconclass: string;
  action: string;
  show: boolean;
  widgettype: string;
}

// Selection Column Builder Props
export interface BuildSelectionColumnsProps {
  useRadioSelect: boolean;
  useMultiSelect: boolean;
  selectedRowId: string | null;
  selectedRowIds: string[];
  handleRadioSelection: (rowId: string, rowData?: any) => void;
  handleMultiSelection: (rowId: string, rowData: any, isSelected: boolean) => void;
  handleSelectAll: (isSelected: boolean) => void;
  internalDataset: any[];
  radioselecttitle?: string;
  radioselectarialabel?: string;
  multiselecttitle?: string;
  multiselectarialabel?: string;
  tableName?: string;
}

// ========================================
// HOOK INTERFACES
// ========================================

// useTableData Hook
export interface UseTableDataProps {
  dataset?: any[];
  onRowDelete?: (deletedRowData: any, deletedRowIndex: number, updatedDataset: any[]) => void;
  deleteoktext?: string;
  deletecanceltext?: string;
  confirmdelete?: string;
  deletemessage?: string;
  errormessage?: string;
  showToast?: (message: string, type: ToastType) => void;
  datasource?: LiveVariableConfig;
  binddataset?: string;
  onSuccess?: (operation: string, data: any) => void;
  onError?: (operation: string, error: any) => void;
  onRowdelete?: (event: any, data: any) => void;
  isServerSidePagination?: boolean;
}

export interface UseTableDataReturn {
  internalDataset: any[];
  setInternalDataset: Dispatch<SetStateAction<any[]>>;
  deleteRecord: (rowData: any, tableInstance?: any) => Promise<boolean>;
  renderConfirmDialog: () => ReactElement | null;
}

// useFormWidget Hook
export interface UseFormWidgetProps {
  listener?: any;
}

export interface UseFormWidgetReturn {
  renderFormWidget: (
    fieldName: string,
    widgetType: string,
    value: any,
    onFieldChange?: (newValue: any) => void,
    widgetProps?: {
      required?: boolean;
      disabled?: boolean;
      placeholder?: string;
      defaultvalue?: string | number | boolean;
      sessionKey?: string | number;
    }
  ) => ReactElement;
}

// useTableEdit Hook
export interface UseTableEditProps {
  editMode?: TableEditMode;
  internalDataset: any[];
  setInternalDataset: Dispatch<SetStateAction<any[]>>;
  wmTableColumns: WmTableColumnProps[];
  listener?: any;
  onRowUpdate?: (updatedRowData: any, rowIndex: number, updatedDataset: any[]) => void;
  onNewRowAdded?: (newRecord: any) => void;
  showToast?: (message: string, type: ToastType) => void;
  onRowDelete?: (deletedRowData: any, deletedRowIndex: number, updatedDataset: any[]) => void;
  showrowindex?: boolean;
  radioselect?: boolean;
  multiselect?: boolean;
  rowActions?: any[];
  formposition?: TableFormPosition;
  insertmessage?: string;
  updatemessage?: string;
  errormessage?: string;
  cellState?: CellStateReturn;
  hasRowExpansion?: boolean;
  expansionPosition?: number | string;
  datasource?: LiveVariableConfig;
  binddataset?: string;
  onSuccess?: (operation: string, data: any) => void;
  onError?: (operation: string, error: any) => void;
  onRowdelete?: (event: any, data: any) => void;
  onRowinsert?: (event: any, data: any) => void;
  onRowupdate?: (event: any, data: any) => void;
  tableRef?: React.RefObject<any>;
  isServerSidePagination?: boolean;
}

export interface UseTableEditReturn {
  editingRowId: string | null;
  editingRowData: Record<string, any>;
  isRowEditing: (rowId: string) => boolean;
  startEditing: (rowData: any, rowId: string) => void;
  cancelEditing: () => void;
  saveEditing: () => void;
  updateFieldValue: (fieldName: string, newValue: any, rowId?: string) => void;
  renderEditableCell: (column: WmTableColumnProps, rowData: any, rowId: string) => ReactElement;
  handleRowClick: (rowData: any, rowId: string) => void;
  handleKeyDown: (e: React.KeyboardEvent, sourceRowId?: string) => void;
  fieldRefs: RefObject<Record<string, HTMLElement | null>>;
  isAddingNewRow: boolean;
  handleAddNewRowClick: () => void;
  renderAddNewRow: () => ReactElement | null;
}

// useTableColumns Hook
export interface UseTableColumnsProps {
  wmTableColumns: WmTableColumnProps[];
  rowActions: WmTableRowActionProps[];
  listener?: any;
  deleteRecord: (rowData: any, tableInstance?: any) => Promise<boolean>;
  showrowindex?: boolean;
  editmode: TableEditMode;
  renderEditableCell: (column: WmTableColumnProps, rowData: any, rowId: string) => ReactNode;
  isRowEditing: (rowId: string) => boolean;
  startEditing: (rowData: any, rowId: string) => void;
  cancelEditing: () => void;
  saveEditing: () => void;
  editingRowId: string | null;
  cellState?: CellStateReturn;
  isResizing?: boolean;
}

export interface UseTableColumnsReturn {
  columns: ColumnDef<any>[];
  wmTableColumns: WmTableColumnProps[];
  rowActions: WmTableRowActionProps[];
}

// useTableActions Hook
export interface UseTableActionsProps {
  children: ReactNode;
  listener?: any;
  onAddNewRowClick?: () => void;
}

export interface UseTableActionsReturn {
  tableActions: WmTableActionProps[];
  renderFooterActions: () => ReactElement | null;
}

// usePanelStructure Hook
export interface UsePanelStructureProps {
  title?: string;
  subheading?: string;
  iconclass?: string;
  exportOptions?: any[];
  headerActions: any[];
  footerActions: any[];
  shownavigation: boolean;
  onDemandLoad: boolean;
  internalDataset: any[];
  pagesize: number;
  allowpagesizechange: boolean;
  datasource?: LiveVariableConfig;
}

export interface UsePanelStructureReturn {
  showPanelHeading: boolean;
  showPagination: boolean;
}

// useRowSelection Hook
export interface UseRowSelectionProps {
  radioselect?: boolean;
  multiselect?: boolean;
  gridfirstrowselect?: boolean;
  internalDataset: any[];
  cellState: CellStateReturn;
  name: string;
  statehandler?: StorageType;
  initialActualPageSize?: number;
  getTableState?: () => { currentPage: number; currentPageSize: number };
}

export interface UseRowSelectionReturn {
  selectedRowId: string | null;
  selectedRowIds: string[];
  useMultiSelect: boolean;
  useRadioSelect: boolean;
  handleRadioSelection: (rowId: string, rowData?: any) => void;
  handleMultiSelection: (rowId: string, rowData: any, isSelected: boolean) => void;
  handleSelectAll: (isSelected: boolean) => void;
  handleRowSelectionClick: (event: MouseEvent, rowId: string, rowData: any) => boolean;
  isRowSelected: (rowId: string) => boolean;
  isInteractiveElement: (event: MouseEvent) => boolean;
}

// useTableState Hook
export interface UseTableStateProps {
  editMode?: TableEditMode;
  radioselect?: boolean;
  multiselect?: boolean;
}

export interface UseTableStateReturn {
  activeRowIds: string[] | [];
  setActiveRow: (rowIds: string | string[] | null) => void;
  clearActiveRow: () => void;
  handleRowActiveClick: (
    rowId: string,
    isSelectionHandled: boolean,
    isEditingOrAdding: boolean
  ) => void;
  isRowActive: (rowId: string, isSelected: boolean) => boolean;
}

export interface SuccessHandlerOptions {
  showToast?: (message: string, type: ToastType) => void;
  onSuccess?: (operation: string, data: any) => void;
  onRowCallback?: (event: any, data: any) => void;
  message?: string;
}

export interface DatasetUpdateOptions {
  setInternalDataset: (updater: (prevDataset: any[]) => any[]) => void;
  onNewRowAdded?: (newRecord: any) => void;
  onRowUpdate?: (updatedRowData: any, rowIndex: number, updatedDataset: any[]) => void;
  showToast?: (message: string, type: ToastType) => void;
  insertmessage?: string;
  updatemessage?: string;
}

export interface ServerOperationOptions {
  isNewRow: boolean;
  rowId: string | null;
  currentEditingData: Record<string, any>;
  wmTableColumns: any[];
  datasource?: LiveVariableConfig;
  binddataset?: string;
  setInternalDataset: (updater: (prevDataset: any[]) => any[]) => void;
  onNewRowAdded?: (newRecord: any) => void;
  onRowUpdate?: (updatedRowData: any, rowIndex: number, updatedDataset: any[]) => void;
  showToast?: (message: string, type: ToastType) => void;
  onSuccess?: (operation: string, data: any) => void;
  onError?: (operation: string, error: any) => void;
  onRowinsert?: (event: any, data: any) => void;
  onRowupdate?: (event: any, data: any) => void;
  insertmessage?: string;
  updatemessage?: string;
  errormessage?: string;
  tableInstance?: any;
  isServerSidePagination?: boolean;
}

export interface DeleteOperationOptions {
  rowData: any;
  tableInstance?: any;
  internalDataset: any[];
  setInternalDataset: (updater: (prevDataset: any[]) => any[]) => void;
  datasource?: LiveVariableConfig;
  binddataset?: string;
  onRowDelete?: (deletedRowData: any, deletedRowIndex: number, updatedDataset: any[]) => void;
  showToast?: (message: string, type: ToastType) => void;
  onSuccess?: (operation: string, data: any) => void;
  onError?: (operation: string, error: any) => void;
  onRowdelete?: (event: any, data: any) => void;
  deletemessage?: string;
  errormessage?: string;
  isServerSidePagination?: boolean;
}

// ==================== CELL STATE INTERFACES ====================

/**
 * Interface for the table state structure
 */
export interface TableState {
  cells?: Record<string, Record<string, any>>;
  selection?: {
    selectedRowId?: string | null;
    selectedRowIds?: string[];
  };
  [key: string]: any; // Allow custom fields
}

/**
 * Interface for the cell state hook return value
 */
export interface CellStateReturn {
  // Get a value from the state
  getValue: <T = any>(path: string | string[], defaultValue?: T) => T | undefined;

  // Set a value in the state
  setValue: <T = any>(path: string | string[], value: T) => void;

  // Update multiple fields at once
  updateState: (updates: Record<string, any> | ((currentState: TableState) => TableState)) => void;

  // Check if a path exists
  hasValue: (path: string | string[]) => boolean;

  // Remove a value
  removeValue: (path: string | string[]) => void;

  // Clear all state
  clearState: () => void;

  // Get the entire state
  getState: () => TableState;

  // Set the entire state
  setState: (state: TableState) => void;

  // Table ID for debugging
  tableId: string;
}

// ==================== EDITING STATE INTERFACES ====================

export interface EditingStateConfig {
  showNewRowFormByDefault: boolean;
  startEditOnRowClick: boolean;
  hasKeyboardNavigation: boolean;
  cancelsAddNewRowOnEdit: boolean;
}

export interface UseEditingStateReturn {
  // State
  editingRowId: string | null;
  isAddingNewRow: boolean;
  sessionKey: number;
  editingRowDataRef: RefObject<Record<string, any>>;
  newRowDataRef: RefObject<Record<string, any>>;

  // Actions
  setEditingRowId: (id: string | null) => void;
  setIsAddingNewRow: (value: boolean) => void;
  incrementSessionKey: () => void;
  resetEditingData: () => void;
  isRowEditing: (rowId: string) => boolean;
}

// ==================== TABLE INITIALIZATION INTERFACES ====================

export interface UseTableInitializationProps {
  internalDataset: any[];
  wmTableColumns: WmTableColumnProps[];
  cellState: CellStateReturn;
  gridfirstrowselect: boolean;
  useRadioSelect: boolean;
  useMultiSelect: boolean;
  setActiveRow: (rowIds: string | string[] | null) => void;
  selectedRowId: string | null;
  selectedRowIds: string[];
  formName?: string;
  activeRowIds: string[];
  listener: any;
  editmode: TableEditMode;
}

// ==================== ROW HANDLERS INTERFACES ====================

export interface UseRowHandlersProps {
  editingRowId: string | null;
  isAddingNewRow: boolean;
  handleRowSelectionClick: UseRowSelectionReturn["handleRowSelectionClick"];
  handleTableEditRowClick: (rowData: any, rowId: string) => void;
  handleRowActiveClick: (
    rowId: string,
    isSelectionHandled: boolean,
    isEditingOrAdding: boolean
  ) => void;
  onRowclick?: (event: any, widget: any, row: any) => void;
}

export interface UseRowHandlersReturn {
  handleRowClick: (event: MouseEvent, rowData: any, rowId: string) => void;
}

// ==================== PAGINATION STATE INTERFACES ====================

export interface UsePaginationStateProps {
  table: Table<any>;
  editmode: string;
  internalDataset: any[];
  isAddingNewRow: boolean;
  cancelEditing: () => void;
  datasource?: LiveVariableConfig;
  isServerSidePagination: boolean;
}

export interface UsePaginationStateReturn {
  handlePaginationChange: (event: any, widget: any, index: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
}

// ==================== ROW EXPANSION INTERFACES ====================

export interface UseRowExpansionProps {
  rowExpansionConfig: WmTableRowProps | null;
  internalDataset: any[];
}

export interface UseRowExpansionReturn {
  expandedRows: Set<string>;
  toggleRowExpansion: (rowId: string, rowData: any) => void;
  isRowExpanded: (rowId: string) => boolean;
  collapseAllRows: () => void;
  rowExpansionConfig: WmTableRowProps | null;
}

// ==================== VALIDATION INTERFACES ====================

export interface FieldValidationState {
  fieldRefs: RefObject<Record<string, HTMLElement | null>>;
  fieldValidationErrors: RefObject<Record<string, boolean>>;
  cellUpdateCallbacks: RefObject<Record<string, () => void>>;
}

export interface ValidationResult {
  isValid: boolean;
  invalidElements: HTMLElement[];
  invalidFieldKeys?: string[];
  firstInvalidElement?: HTMLElement;
}
