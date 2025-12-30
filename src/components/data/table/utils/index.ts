import {
  forEach,
  entries,
  size,
  isEmpty,
  isArray,
  map,
  get,
  trim,
  startsWith,
  findIndex,
  assign,
  floor,
  ceil,
  max,
  omit,
  isObject,
  isNil,
  transform,
  sum,
  round,
  mean,
  min,
} from "lodash-es";
import React from "react";
import {
  WmTableColumnProps,
  WmTableRowActionProps,
  WmTableRowProps,
  WmTableActionProps,
  ValidationResult,
} from "../props";
import { TABLE_CSS_CLASSES } from "./constants";

const formWidgets = [
  "WmText",
  "WmTextarea",
  "WmCheckbox",
  "WmSlider",
  "WmCurrency",
  "WmSwitch",
  "WmSelect",
  "WmCheckboxSet",
  "WmRadioSet",
  "WmDate",
  "WmTime",
  "WmTimestamp",
  "WmRating",
  "WmDatetime",
  "WmSearch",
  "WmChips",
  "WmColorPicker",
] as const;

type FormWidgetType = (typeof formWidgets)[number];

export type EditWidgetType = FormWidgetType;

const hashString = (str: string, index: number): string => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return `row_${Math.abs(hash)}_${index}`;
};

const generateDeterministicHash = (obj: any, index: number): string => {
  const hashSource =
    index.toString() +
    (isObject(obj)
      ? transform(
          omit(obj, "_wmTableRowId"),
          (result: string[], value, key) => {
            if (!isNil(value)) {
              result.push(`${key}:${isObject(value) ? JSON.stringify(value) : String(value)}`);
            }
          },
          []
        )
          .sort()
          .join("|")
      : String(obj));

  return hashString(hashSource, index);
};

/**
 * Adds unique row IDs to the dataset if they don't already have them.
 * Uses _wmTableRowId or _wmListItemId as the primary key, falling back to a generated ID.
 *
 * @param dataset - The dataset to process
 * @param options - Options for ID generation
 * @param options.type - Type of widget ('table' or 'list')
 * @param options.idProperty - Custom property name for the ID (defaults to _wmTableRowId for table, _wmListItemId for list)
 * @returns The dataset with unique row IDs added
 */
export const addUniqueRowIds = (
  dataset: any,
  options: { type?: "table" | "list"; idProperty?: string } = {}
): any[] => {
  // Handle non-array inputs (e.g., empty objects, null, undefined)
  if (!isArray(dataset)) {
    return [];
  }

  // Determine the ID property based on type or custom property
  const idProperty =
    options.idProperty || (options.type === "list" ? "_wmListItemId" : "_wmTableRowId");

  return map(dataset, (item, index) => {
    // If item is not an object (primitive values like strings, numbers), return as-is
    if (typeof item !== "object" || item === null || isArray(item)) {
      return item;
    }
    const getProperty = (propName: string) => get(item, propName);

    // Skip if the item already has a unique row ID
    if (item[idProperty]) {
      return item.getProperty ? item : { ...item, getProperty };
    }

    // Generate a unique ID based on existing id field or create a deterministic hash
    const rowId = item.id || item.ID || item.Id || generateDeterministicHash(item, index);

    // Use spread operator for objects to add the ID property and getProperty helper
    return {
      ...item,
      [idProperty]: rowId,
      getProperty,
    };
  });
};

// Widget mapping utilities
export const getWidgetMappingForType = (widgetType: string): string => {
  const widgetMappings: Record<string, string> = {
    text: "WmText",
    password: "WmPassword",
    textarea: "WmTextarea",
    number: "WmNumber",
    checkbox: "WmCheckbox",
    toggle: "WmToggle",
    switch: "WmSwitch",
    slider: "WmSlider",
    richtext: "WmRichtext",
    richtexteditor: "WmRichtexteditor",
    currency: "WmCurrency",
    select: "WmSelect",
    checkboxset: "WmCheckboxset",
    radioset: "WmRadioset",
    date: "WmDate",
    time: "WmTime",
    timestamp: "WmTimestamp",
    datetime: "WmDatetime",
    rating: "WmRating",
    autocomplete: "WmAutocomplete",
    chips: "WmChips",
    colorpicker: "WmColorpicker",
    upload: "WmFileupload",
    label: "WmLabel",
    button: "WmButton",
    icon: "WmIcon",
    image: "WmPicture",
    anchor: "WmAnchor",
  };

  return widgetMappings[widgetType] || widgetType;
};

export const getBooleanDataset = () => [
  { key: true, value: "Yes" },
  { key: false, value: "No" },
];

// Check if column should be visible based on current viewport
export const isColumnVisibleForViewport = (
  column: WmTableColumnProps,
  viewportWidth: number
): boolean => {
  // Validate inputs
  if (!column || typeof viewportWidth !== "number" || viewportWidth < 0) {
    return true; // Default to showing column if invalid inputs
  }

  // Define breakpoints (matching Bootstrap)
  const MOBILE_BREAKPOINT = 576;
  const TABLET_BREAKPOINT = 768;
  const DESKTOP_BREAKPOINT = 992;

  // Determine current device type
  const isMobile = viewportWidth < MOBILE_BREAKPOINT;
  const isTablet = viewportWidth >= MOBILE_BREAKPOINT && viewportWidth < DESKTOP_BREAKPOINT;
  const isDesktop = viewportWidth >= DESKTOP_BREAKPOINT;

  // Default all display properties to true if not explicitly set
  const mobiledisplay = column.mobiledisplay !== false;
  const tabletdisplay = column.tabletdisplay !== false;
  const pcdisplay = column.pcdisplay !== false;

  // Check visibility based on device type
  if (isMobile && !mobiledisplay) {
    return false;
  }

  if (isTablet && !tabletdisplay) {
    return false;
  }

  if (isDesktop && !pcdisplay) {
    return false;
  }

  return true;
};

function transformExpression(exp: string) {
  if (typeof exp === "string") {
    // First replacing generic getProperty calls with rowData
    // Matches patterns like: fragment.row?.getProperty?.("key") -> rowData['key']
    let transformedExp = exp.replace(
      /(?:[\w$]+(?:\?\.|\.))*getProperty(?:\?\.)?\(\s*(['"])(.*?)\1\s*\)/g,
      (_, quote, key) => `rowData['${key}']`
    );

    // Regex to split by string literals (double or single quoted)
    const parts = transformedExp.split(/(".*?"|'.*?')/);

    return parts
      .map(part => {
        // If part is a string literal, return as is
        if (part.startsWith('"') || part.startsWith("'")) {
          return part;
        }

        // Replace identifiers that are not keywords
        // Identifiers start with letter, _, or $
        return part.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, match => {
          const keywords = [
            "true",
            "false",
            "null",
            "undefined",
            "NaN",
            "Infinity",
            "in",
            "instanceof",
            "typeof",
            "void",
            "new",
            "delete",
            "rowData", // Don't replace rowData if it's already there
          ];
          if (keywords.includes(match)) {
            return match;
          }
          return `rowData['${match}']`;
        });
      })
      .join("");
  }
  return exp;
}

// Table structure types for grouping
export interface TableGroup {
  isGroup: true;
  field: string;
  displayName: string;
  columns: (TableGroup | WmTableColumnProps)[];
  textAlignment?: string;
  backgroundColor?: string;
  class?: string;
  colClass?: string;
  styles?: React.CSSProperties;
}

export type TableStructureItem = TableGroup | WmTableColumnProps;

// Children parsing utilities
export const parseTableColumns = (
  children: React.ReactNode,
  dataset: any
): WmTableColumnProps[] => {
  const columns: WmTableColumnProps[] = [];

  React.Children.forEach(children, (child: any) => {
    if (child && child.props && child.props.name && child.props.name.includes("wm_table_column")) {
      const props = get(child, "props", {});

      const binding = get(props, "binding");
      const aggregate = getAggregateFunctions(dataset, binding);
      columns.push({
        ...props,
        field: get(props, "binding"),
        caption: get(props, "caption"),
        displayName: get(props, "caption"),
        show: get(props, "show", true) !== false,
        sortable: get(props, "sortable", true) !== false,
        textalignment: get(props, "textalignment", "left"),
        backgroundcolor: get(props, "backgroundcolor"),
        textcolor: get(props, "textcolor"),
        width: get(props, "width"),
        editWidgetType: get(props, "editWidgetType", "WmText"),
        widgetType: get(props, "widgetType", "label"),
        required: get(props, "required") === true || get(props, "required") === "true",
        defaultvalue: get(props, "defaultvalue"),
        disabled: transformExpression(get(props, "disabled")),
        readonly: get(props, "readonly") || get(props, "readonly") === "true",
        placeholder: get(props, "placeholder"),
        sortby: get(props, "sortby"),
        aggregate: aggregate,
        colClass: get(props, "colClass"),
      });
    }
  });

  return columns;
};

export const getAggregateFunctions = (dataset: any[], binding: string) => {
  function _getColumnData() {
    return map(dataset, binding);
  }
  const aggregate: Record<string, Function> = {
    sum: () => {
      return sum(_getColumnData());
    },
    average: (precision: number = 2) => {
      return round(mean(_getColumnData()), precision);
    },
    count: () => {
      return _getColumnData().length;
    },
    minimum: () => {
      return min(_getColumnData());
    },
    maximum: () => {
      return max(_getColumnData());
    },
    percent: (value: any, precision: number = 2) => {
      return round((sum(_getColumnData()) / value) * 100, precision);
    },
  };

  return aggregate;
};
// Parse table structure with groups support
export const parseTableStructureWithGroups = (children: React.ReactNode): TableStructureItem[] => {
  const structure: TableStructureItem[] = [];

  React.Children.forEach(children, (child: any) => {
    if (!child || !child.props) return;

    const childName = get(child, "props.name", "");

    // Handle WmTableGroup
    if (childName.includes("group")) {
      const props = get(child, "props", {});
      const group: TableGroup = {
        isGroup: true,
        field: get(props, "name", ""),
        displayName: get(props, "caption", ""),
        textAlignment: get(props, "textalignment"),
        backgroundColor: get(props, "backgroundcolor"),
        class: get(props, "class"),
        colClass: get(props, "col-class"),
        styles: get(props, "styles"),
        columns: parseTableStructureWithGroups(child.props.children), // Recursive for nested groups
      };
      structure.push(group);
    }
    // Handle WmTableColumn
    else if (childName.includes("wm_table_column")) {
      const props = get(child, "props", {});
      const column: WmTableColumnProps = {
        field: get(props, "binding"),
        caption: get(props, "caption"),
        displayName: get(props, "caption"),
        show: get(props, "show", true) !== false,
        sortable: get(props, "sortable", true) !== false,
        textalignment: get(props, "textalignment", "left"),
        backgroundcolor: get(props, "backgroundcolor"),
        textcolor: get(props, "textcolor"),
        width: get(props, "width"),
        editWidgetType: get(props, "editWidgetType", "WmText"),
        widgetType: get(props, "widgetType", "label"),
        required: get(props, "required") === true || get(props, "required") === "true",
        defaultvalue: get(props, "defaultvalue"),
        disabled: get(props, "disabled") === true || get(props, "disabled") === "true",
        placeholder: get(props, "placeholder"),
        sortby: get(props, "sortby"),
        ...props,
      };
      structure.push(column);
    }
  });

  return structure;
};

// Flatten hierarchical structure to get all columns
export const flattenTableStructure = (structure: TableStructureItem[]): WmTableColumnProps[] => {
  const columns: WmTableColumnProps[] = [];

  structure.forEach(item => {
    if ("isGroup" in item && item.isGroup) {
      // Recursively flatten groups
      columns.push(...flattenTableStructure(item.columns));
    } else {
      // It's a column
      columns.push(item as WmTableColumnProps);
    }
  });

  return columns;
};

export const parseTableRowActions = (children: React.ReactNode): WmTableRowActionProps[] => {
  const actions: WmTableRowActionProps[] = [];

  React.Children.forEach(children, (child: any) => {
    if (
      child &&
      child.props &&
      child.props.name &&
      child.props.name.includes("wm_table_row_action")
    ) {
      const props = get(child, "props", {});
      const actionProps = assign({}, props);
      if (child.key) {
        actionProps.key = child.key;
      }
      actions.push(actionProps);
    }
  });

  return actions;
};

export const parseTableActions = (children: React.ReactNode): WmTableActionProps[] => {
  const actions: WmTableActionProps[] = [];

  React.Children.forEach(children, (child: any) => {
    if (child && child.props && child.props.name && child.props.name.includes("wm_table_action")) {
      const props = get(child, "props", {});
      const actionProps = assign({}, props);
      if (child.key) {
        actionProps.key = child.key;
      }
      actions.push(actionProps);
    }
  });

  return actions;
};

// Parse WmTableRow component for row expansion
export const parseTableRowExpansion = (children: React.ReactNode): WmTableRowProps | null => {
  let rowExpansionConfig: WmTableRowProps | null = null;

  React.Children.forEach(children, (child: any) => {
    if (child && child.type && (child.type as any).displayName === "WmTableRow") {
      // Check by displayName to ensure we get the right component
      const props = get(child, "props", {});
      rowExpansionConfig = props as WmTableRowProps;
    } else if (child && child.props && child.props.name) {
      // Fallback: check by name but ensure it's not a row action
      const name = child.props.name;
      // Match names that start with "wm_table_row_" followed by a hash/id, but not "wm_table_row_action"
      if (name.startsWith("wm_table_row_") && !name.includes("_action")) {
        const props = get(child, "props", {});
        rowExpansionConfig = props as WmTableRowProps;
      }
    }
  });

  return rowExpansionConfig;
};

// Action type checking utilities
export const isEditAction = (actionKey: string): boolean => actionKey === "updaterow";
export const isDeleteAction = (actionKey: string): boolean => actionKey === "deleterow";
export const isAddNewAction = (actionKey: string): boolean => actionKey === "addNewRow";

// CSS class utilities
export const getActionButtonClass = (action: WmTableRowActionProps): string => {
  const actionKey = get(action, "key") || get(action, "name") || get(action, "action");

  if (isEditAction(actionKey)) {
    return "row-action row-action-button btn-transparent edit edit-row-button";
  }

  if (isDeleteAction(actionKey) || actionKey === "delete") {
    return `row-action row-action-button btn-transparent delete delete-row-button ${TABLE_CSS_CLASSES.deleteRow}`;
  }

  return `row-action row-action-button ${get(action, "className", "btn-transparent")}`;
};

export const getTableActionButtonClass = (action: WmTableActionProps): string => {
  return `btn ${get(action, "className", "btn-primary")} ${isAddNewAction(get(action, "key")) ? "add-action" : ""}`;
};

// Validation utilities for edit modes

/**
 * Validates editing fields and focuses first invalid field if validation fails
 * Can be used across different edit modes (inline, dialog, quick edit)
 *
 * @param fieldRefs - Record of field references from editing form
 * @param editingRowId - Optional ID for logging/debugging purposes
 * @returns ValidationResult object with validation status and invalid elements
 */
export const validateEditingFields = (
  fieldRefs: Record<string, HTMLElement | null>,
  editingRowId?: string
): ValidationResult => {
  const invalidElements: HTMLElement[] = [];
  const invalidFieldKeys: string[] = [];

  // Helper to determine if a field needs validation based on the rowId prefix
  const shouldValidateField = (fieldKey: string): boolean => {
    if (!editingRowId) return true; // Validate all if no rowId provided
    return startsWith(fieldKey, `${editingRowId}_`);
  };

  // Check each field reference for validity
  forEach(entries(fieldRefs), ([fieldKey, fieldElement]) => {
    // Skip fields that don't belong to the current editing row
    if (!shouldValidateField(fieldKey) || !fieldElement) {
      return;
    }

    let isInvalid = false;

    // First check for HTML5 validation
    const inputs = fieldElement.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input, select, textarea");

    forEach(inputs, input => {
      // Check HTML5 validation
      if (input && !input.validity.valid && input.hasAttribute("required")) {
        invalidElements.push(input);
        isInvalid = true;
      }

      // Check for custom validation classes
      if (input && input.classList.contains("ng-invalid")) {
        invalidElements.push(input);
        isInvalid = true;
      }

      // Check for required fields that are empty
      if (input && input.hasAttribute("required") && !trim(input.value)) {
        invalidElements.push(input);
        isInvalid = true;
      }
    });

    // Then check for "required" attribute on the field element itself
    if (fieldElement.hasAttribute("required")) {
      const inputEl = fieldElement.querySelector("input, textarea, select") as HTMLInputElement;
      if (inputEl && !trim(inputEl.value)) {
        invalidElements.push(inputEl);
        isInvalid = true;
      }
    }

    if (isInvalid) {
      invalidFieldKeys.push(fieldKey);
    }
  });

  // If invalid elements found, focus the first one
  if (size(invalidElements) > 0) {
    const logPrefix = editingRowId ? `[${editingRowId}]` : "[Validation]";
    console.log(`${logPrefix} Validation failed: Found ${size(invalidElements)} invalid elements`);

    // Focus the first invalid element
    const firstInvalidElement = get(invalidElements, "[0]");
    if (firstInvalidElement) {
      // Find the closest container cell
      const cell = firstInvalidElement.closest("td, .app-datagrid-cell, .form-field");

      if (cell) {
        // Try to find a specific focus-target, or fallback to the input itself
        const focusTarget = cell.querySelector(
          "[focus-target], input, textarea, select"
        ) as HTMLElement;
        if (focusTarget) {
          setTimeout(() => {
            focusTarget.focus();
            console.log(`${logPrefix} Focused first invalid field:`, focusTarget);
          }, 0);
        }
      } else {
        // If we can't find a container, try to focus the element directly
        setTimeout(() => {
          firstInvalidElement.focus();
        }, 0);
      }
    }
  }

  return {
    isValid: isEmpty(invalidElements),
    invalidElements,
    invalidFieldKeys,
    firstInvalidElement: size(invalidElements) > 0 ? get(invalidElements, "[0]") : undefined,
  };
};

// Panel and button styling utilities
export const getButtonClasses = (
  action: any,
  spacing: string = "normal",
  isGridEditMode: boolean = false,
  isLoading: boolean = false
): string => {
  const baseClass = `btn ${get(action, "className", "btn-primary")} ${isAddNewAction(get(action, "key")) ? "add-action" : ""}`;
  const spacingClass = spacing === "condensed" ? "btn-sm" : "";
  const disabledClass =
    get(action, "key") === "addNewRow" && (isGridEditMode || isLoading) ? "disabled-new" : "";

  return trim(`${baseClass} ${spacingClass} ${disabledClass}`);
};

export const getSpacingClasses = (spacing: string = "normal"): string => {
  const classes = [];
  if (spacing === "condensed") {
    classes.push("table-condensed");
  }
  return classes.join(" ");
};

// Pagination display logic
export const shouldShowPagination = ({
  shownavigation,
  onDemandLoad,
  internalDataset,
  pagesize,
  allowpagesizechange,
  datasource,
}: {
  shownavigation: boolean;
  onDemandLoad: boolean;
  internalDataset: any[];
  pagesize: number;
  allowpagesizechange: boolean;
  datasource?: any;
}): boolean => {
  // If shownavigation is false, don't show pagination
  if (!shownavigation) return false;

  // If datasource has pagination metadata, show pagination
  if (datasource?.pagination?.totalElements > 0) return true;

  // If allowpagesizechange is true, always show pagination
  if (allowpagesizechange) return true;

  // If using on-demand load or if dataset is larger than page size, show pagination
  return onDemandLoad || size(internalDataset) > pagesize;
};

// Panel structure utilities
export const shouldShowPanelHeading = (
  title?: string,
  subheading?: string,
  iconclass?: string,
  exportformat: any[] = [],
  headerActions: any[] = []
): boolean => {
  return (
    !isEmpty(title) ||
    !isEmpty(subheading) ||
    !isEmpty(iconclass) ||
    size(exportformat) > 0 ||
    size(headerActions) > 0
  );
};

/**
 * Utility function to handle navigation after a new row is added to the table
 * Used by both inline edit and quick edit modes
 */
export const handleNewRowNavigation = (
  tableRef: React.RefObject<any>,
  newRecord: any,
  internalDataset: any[]
): void => {
  if (!get(tableRef, "current")) return;

  const table = get(tableRef, "current");
  const sortingState = get(table.getState(), "sorting");
  const hasSorting = sortingState && size(sortingState) > 0;

  if (hasSorting) {
    // If sorting is active, find where the new record ends up
    setTimeout(() => {
      const sortedRows = get(table.getSortedRowModel(), "rows", []);
      const newRecordIndex = findIndex(
        sortedRows,
        (row: any) => get(row, "original._wmTableRowId") === get(newRecord, "_wmTableRowId")
      );

      if (newRecordIndex !== -1) {
        const currentPageSize = get(table.getState(), "pagination.pageSize");
        const targetPage = floor(newRecordIndex / currentPageSize);
        table.setPageIndex(targetPage);
      }
    }, 0);
  } else {
    // If no sorting, navigate to the last page
    const currentPageSize = get(table.getState(), "pagination.pageSize");
    // Add 1 because the new record hasn't been added to internalDataset state yet
    const newDatasetLength = size(internalDataset) + 1;
    const totalPages = ceil(newDatasetLength / currentPageSize);
    table.setPageIndex(max([0, totalPages - 1]));
  }
};

/**
 * List of internal properties that should be removed from row data
 * before passing to external handlers
 */
export const INTERNAL_PROPERTIES = [
  "_wmTableRowId", // Internal row identifier
  "getProperty", // Helper function to get property values
];

/**
 * Cleans row data by removing internal properties
 * Handles both single objects and arrays of objects
 * @param data The raw data - can be a single object, array of objects, or primitive
 * @returns The cleaned data without internal properties
 */
export const cleanRowData = (data: any): any => {
  if (!data) return data;

  // For arrays, clean each item
  if (isArray(data)) {
    return data.map(item => cleanRowData(item));
  }

  // For objects, remove internal properties
  if (typeof data === "object") {
    return omit(data, INTERNAL_PROPERTIES);
  }

  // For primitive types, return as is
  return data;
};

// Helper function to parse width values
export const parseWidth = (width: string | number, fallbackSize = 150): number => {
  let columnSize = fallbackSize;
  const styleWidth = width;
  if (typeof styleWidth === "string") {
    // Convert percentage to a pixel value (assuming viewport width)
    if (styleWidth.endsWith("%")) {
      const percentage = parseFloat(styleWidth);
      // Use a base width of 1200px for percentage calculations
      columnSize = Math.round((percentage / 100) * 1200);
    } else if (styleWidth.endsWith("px")) {
      columnSize = parseInt(styleWidth);
    } else {
      columnSize = parseInt(styleWidth);
    }
  }
  return columnSize;
};

export const getColClass = (colClass: string, rowData: any, columnName: string): string => {
  // Return empty string if colClass is not provided or not a string
  if (!colClass || typeof colClass !== "string") {
    return "";
  }

  // Trim whitespace
  const trimmedClass = trim(colClass);
  if (!trimmedClass) {
    return "";
  }

  const hasExpressionOperators =
    /[?&|<>!=]/.test(trimmedClass) ||
    trimmedClass.includes("(") ||
    trimmedClass.includes("&&") ||
    trimmedClass.includes("||") ||
    trimmedClass.includes("===") ||
    trimmedClass.includes("!==");

  const hasRowDataReference = trimmedClass.includes("rowData");
  const hasColumnNameReference = trimmedClass.includes("columnName");

  const isExpression = hasExpressionOperators || hasRowDataReference || hasColumnNameReference;

  // If it's not an expression, return as-is
  if (!isExpression) {
    return trimmedClass;
  }

  // Evaluate the expression using Function constructor
  try {
    let expressionToEvaluate = trimmedClass;

    const evaluated = new Function("rowData", "columnName", `return ${expressionToEvaluate}`)(
      rowData,
      columnName
    );

    // Convert result to string (handles boolean, number, null, undefined)
    if (evaluated === null || evaluated === undefined) {
      return "";
    }

    // If it's a boolean, return empty string (falsy) or convert to string
    if (typeof evaluated === "boolean") {
      return evaluated ? String(evaluated) : "";
    }

    return String(evaluated);
  } catch (error) {
    console.warn("Failed to evaluate colClass expression:", trimmedClass, error);
    // Return empty string on error to prevent breaking the UI
    return "";
  }
};

// Export utilities
export * from "./constants";
export * from "./renderDisplayCell";
export * from "./buildSelectionColumns";
export * from "./validation";
export * from "./selectionUtils";
export * from "./columnBuilder";
export * from "./columnWidthDistribution";
export * from "./table-helpers";
