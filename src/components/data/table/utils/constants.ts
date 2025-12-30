// CSS Class Names Constants
export const TABLE_CSS_CLASSES = {
  tableRow: "app-datagrid-row",
  headerCell: "app-datagrid-header-cell",
  groupHeaderCell: "app-datagrid-group-header-cell",
  tableCell: "app-datagrid-cell",
  grid: "",
  gridDefault: "table",
  gridBody: "app-datagrid-body",
  gridFooter: "app-datagrid-footer",
  deleteRow: "danger",
  ascIcon: "asc wi wi-long-arrow-up",
  descIcon: "desc wi wi-long-arrow-down",
  selectedColumn: "selected-column",
  rowExpandIcon: "wi wi-minus-square",
  rowCollapseIcon: "wi wi-plus-square",
  gridRowExpansionClass: "table-row-expansion",
  expandedRowClass: "expanded",
} as const;

// Data States Constants
export const TABLE_DATA_STATES = {
  loading: "Loading...",
  ready: "",
  error: "An error occurred in loading the data.",
  nodata: "No data found.",
} as const;

// Table Messages Constants
export const TABLE_MESSAGES = {
  // Delete dialog messages
  deleteConfirmTitle: "Delete Record",
  deleteConfirmMessage: "Are you sure you want to delete this record?",
  deleteOkText: "Ok",
  deleteCancelText: "Cancel",

  // Toast messages
  deleteSuccess: "Record deleted successfully",
  deleteError: "Failed to delete record",
  insertSuccess: "Record added successfully",
  updateSuccess: "Record updated successfully",
  operationError: "An error occurred",

  // Table states
  noDataMessage: "No data found",
  loadingMessage: "Loading...",
  errorStateMessage: "An error occurred",

  // Selection
  radioSelectAriaLabel: "Select row",
  multiSelectAriaLabel: "Select all rows",
} as const;

/**
 * Interactive element classes and attributes that should prevent row selection
 */
export const INTERACTIVE_CLASSES = [
  // MUI base components
  "MuiInputBase",
  "MuiSelect",
  "MuiButton",
  "MuiCheckbox",
  "MuiRadio",
  "MuiSlider",
  "MuiSwitch",
  "MuiTextField",
  "MuiAutocomplete",
  "MuiChip",
  "MuiRating",
  "MuiToggleButton",

  // Date/time pickers
  "MuiPickersDay",
  "MuiDatePicker",
  "MuiTimePicker",
  "MuiDateTimePicker",
  "MuiCalendarPicker",
  "MuiClockPicker",

  // Color picker
  "MuiColorPicker",

  // Form controls
  "MuiFormControl",
  "MuiFormGroup",
  "MuiFormControlLabel",

  // WaveMaker specific widgets
  "app-text",
  "app-textarea",
  "app-checkbox",
  "app-slider",
  "app-currency",
  "app-switch",
  "app-select",
  "app-checkboxset",
  "app-radioset",
  "app-date",
  "app-time",
  "app-timestamp",
  "app-rating",
  "app-datetime",
  "app-search",
  "app-chips",
  "app-colorpicker",
  "app-calendar",
  "app-editor",
] as const;

export const INTERACTIVE_ROLES = ["button", "textbox", "combobox", "listbox"] as const;

export const INTERACTIVE_DATA_ROLES = [
  "input",
  "select",
  "date",
  "time",
  "color",
  "editor",
  "checkbox",
  "radio",
  "slider",
  "chips",
  "rating",
] as const;

export const INTERACTIVE_TAG_NAMES = [
  "INPUT",
  "BUTTON",
  "SELECT",
  "TEXTAREA",
  "A",
  "LABEL",
] as const;

// Dynamic Columns Constants
export const DYNAMIC_COLUMNS_CONFIG = {
  maxColumns: 10, // Maximum number of columns to generate from data (matching Angular behavior)
  sampleSize: 3, // Number of rows to sample for column detection
} as const;

// Navigation types that don't support state persistence
// These navigation types accumulate data and don't maintain traditional pagination state
export const UNSUPPORTED_STATE_PERSISTENCE_TYPES: readonly string[] = [
  "Scroll",
  "On-Demand",
  "Inline",
];
