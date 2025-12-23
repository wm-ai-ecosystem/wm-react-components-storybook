import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Box } from "@mui/material";
import { get } from "lodash-es";
import { WmTableColumnProps, ActionButtonConfig } from "../props";
import { parseWidth } from ".";

/**
 * Creates row index column definition
 */
export const createRowIndexColumn = (): ColumnDef<any> => ({
  id: "rowIndex",
  header: "S. No.",
  size: 60,
  minSize: 60,
  maxSize: 60,
  enableResizing: false,
  cell: ({ row, table }) => {
    // Get current page information for continuous numbering across pages
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    // Check if we're using manual pagination (server-side)
    const isManualPagination = table.options.manualPagination;

    let rowPositionOnPage: number;

    if (isManualPagination) {
      // For server-side pagination, use the row's index in the current data
      rowPositionOnPage = row.index;
    } else {
      // For client-side pagination, find position within paginated rows
      const paginationModel = table.getPaginationRowModel();
      const currentPageRows = paginationModel.rows;
      rowPositionOnPage = currentPageRows.findIndex(pageRow => pageRow.id === row.id);
    }

    // Calculate continuous row number across pages
    const rowNumber = pageIndex * pageSize + rowPositionOnPage + 1;

    return <Box data-col-identifier="rowIndex">{rowNumber}</Box>;
  },
  enableSorting: false,
});

/**
 * Creates data column definition from WmTableColumnProps
 */
export const createDataColumn = (
  wmColumn: WmTableColumnProps,
  renderCell: (wmColumn: WmTableColumnProps, row: any) => React.ReactNode
): ColumnDef<any> => {
  // Extract width from either width prop or styles prop
  let columnSize: number | undefined;
  if (wmColumn.width) {
    columnSize = parseInt(wmColumn.width);
  } else if (wmColumn.styles?.width) {
    columnSize = parseWidth(wmColumn.styles.width);
  }

  return {
    accessorKey: wmColumn.field,
    // Use sortby field for sorting if provided, otherwise use the display field
    // Supports nested properties like "department.store.employee"
    accessorFn: wmColumn.sortby ? row => get(row, wmColumn.sortby || "") : undefined,
    header: wmColumn.caption,
    size: columnSize,
    minSize: 50, // Minimum column width in pixels
    maxSize: columnSize, // Set maxSize if we have a specific width to maintain the width
    enableResizing: !columnSize, // Disable resizing if width is specified
    cell: ({ row }) => renderCell(wmColumn, row),
    enableSorting: wmColumn.sortable,
    // Pass column styles and properties through meta for TableCell styling and filtering
    meta: {
      textAlign: wmColumn.textalignment,
      backgroundColor: wmColumn.backgroundcolor,
      className: wmColumn.colClass,
      colClass: wmColumn.colClass, // Store colClass separately for expression evaluation
      ...wmColumn.styles,
      // Include widget types for filter rendering
      widgetType: wmColumn.widgetType,
      editWidgetType: wmColumn.editWidgetType,
      editinputtype: wmColumn.editinputtype,
      // Include column type for filtering
      type: wmColumn.type || wmColumn.columntype || "string",
      searchable: wmColumn.searchable !== false,
      // Custom cell renderer for optimized rendering in MemoizedRowCells
      renderCellContent: wmColumn?.renderCellContent,
    },
  };
};

/**
 * Creates column definitions from table columns
 */
export const createDataColumns = (
  wmTableColumns: WmTableColumnProps[],
  renderCell: (wmColumn: WmTableColumnProps, row: any) => React.ReactNode
): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [];

  wmTableColumns.forEach(wmColumn => {
    if (wmColumn.show) {
      columns.push(createDataColumn(wmColumn, renderCell));
    }
  });

  return columns;
};

/**
 * Creates save/cancel action buttons for editing mode
 */
export const createEditingActionButtons = (): ActionButtonConfig[] => [
  {
    key: "save-edit",
    name: "save-edit-row",
    className: "save row-action-button btn app-button btn-transparent save-edit-row-button",
    dataActionKey: "saveEdit",
    displayName: "",
    title: "Save",
    iconclass: "wi wi-done",
    action: "save",
    show: true,
    widgettype: "button",
  },
  {
    key: "cancel-edit",
    name: "cancel-edit-row",
    className: "cancel row-action-button btn app-button btn-transparent cancel-edit-row-button",
    dataActionKey: "cancelEdit",
    displayName: "",
    title: "Cancel",
    iconclass: "wi wi-cancel",
    action: "cancel",
    show: true,
    widgettype: "button",
  },
];

/**
 * Creates a default WmTableColumnProps object for dynamic column generation
 * @param field - The field name for the column
 * @param displayName - The display name/caption for the column
 * @param type - The data type of the column
 * @param index - The column index
 * @returns A complete WmTableColumnProps object with sensible defaults
 */
export const createDefaultColumnProps = (
  field: string,
  displayName: string,
  type: string,
  index: number
): WmTableColumnProps => ({
  // Core properties
  field,
  binding: field,
  caption: displayName,
  displayName,
  widgetType: "dynamic-text", // Special type for dynamic columns to render raw text
  editWidgetType: "WmText",

  // Display settings
  show: true,
  pcdisplay: true,
  mobiledisplay: true,
  tabletdisplay: true,

  // Positioning
  index,
  headerindex: index.toString(),

  // Sorting and searching
  sortable: true,
  searchable: true,
  showinfilter: true,

  // Styling
  textalignment: "left" as const,
  // width: "150px", // Fixed width to disable resizing for dynamic columns

  // Data type properties
  type,
  columntype: type,

  // Form field properties
  required: false,
  disabled: false,
  readonly: false,

  // Required props for compatibility
  listener: null as any, // Will be set by the component
  name: field,
});

/**
 * Get action column size based on edit mode
 */
export const getActionColumnSize = (editmode: string): { size: number; minSize: number } => {
  return editmode === "quickedit" ? { size: 80, minSize: 60 } : { size: 100, minSize: 80 };
};
