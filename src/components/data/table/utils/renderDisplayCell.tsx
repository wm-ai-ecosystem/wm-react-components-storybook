import React from "react";
import { WmButton } from "../../../form/button";
import { WmCheckbox } from "../../../input/default/checkbox/index";
import { WmLabel } from "../../../basic/label";
import { getWidgetMappingForType } from "./index";
import { WmTableColumnProps, CellRendererContext, CellProps, CellStateReturn } from "../props";
import { WmAnchor } from "../../../basic/anchor";
import { WmIcon } from "../../../basic/icon";
import { WmPicture } from "../../../basic/picture";
import { get, toString, isUndefined, noop } from "lodash-es";
import { getCellValue as getCellStateValue, setCellValue as setCellStateValue } from "../hooks";

/**
 * Extracts common props from column configuration
 */
const extractCellProps = (column: WmTableColumnProps, rowData: any): CellProps => {
  const fieldName = toString(get(column, "field", ""));
  const value = get(rowData, fieldName, "");

  // Extract props from column children if it's a React element
  const childProps = React.isValidElement(column.children)
    ? get(column.children as React.ReactElement<any>, "props", {})
    : {};

  return {
    fieldName,
    value,
    caption: get(childProps, "caption", value),
    className: get(childProps, "className", ""),
    iconclass: get(childProps, "iconclass", ""),
    onClick: get(childProps, "onClick", noop),
  };
};

/**
 * Creates common props for all widget components
 */
const createBaseProps = (fieldName: string, suffix: string, className: string, listener?: any) => ({
  name: `${fieldName}_${suffix}`,
  className,
  listener,
});

/**
 * Widget renderer factory functions
 */
const widgetRenderers = {
  WmButton: ({ column, rowData, listener }: CellRendererContext) => {
    const { fieldName, caption, className, iconclass, onClick } = extractCellProps(column, rowData);
    const value = rowData[fieldName] || caption;
    return (
      <WmButton
        {...createBaseProps(fieldName, "button", className, listener)}
        iconclass={iconclass}
        caption={value || "Button"}
        onClick={(event: any) => {
          event.preventDefault();
          event.stopPropagation();
          onClick(rowData);
        }}
      />
    );
  },

  WmCheckbox: ({ column, rowData, listener, cellState }: CellRendererContext) => {
    const { fieldName, value, className } = extractCellProps(column, rowData);
    const rowId = rowData._wmTableRowId || String(rowData.id) || "";

    // Use cell state manager if available, otherwise use the value from data
    const checkboxValue = cellState
      ? getCellStateValue(cellState, rowId, fieldName, !!value)
      : !!value;

    return (
      <WmCheckbox
        {...createBaseProps(fieldName, "checkbox", className, listener)}
        datavalue={checkboxValue}
        onChange={(event: any, widget: any, newValue: any) => {
          if (cellState) {
            setCellStateValue(cellState, rowId, fieldName, newValue);
          }
        }}
      />
    );
  },

  WmAnchor: ({ column, rowData, listener }: CellRendererContext) => {
    const { fieldName, className, caption } = extractCellProps(column, rowData);
    const href = get(rowData, column.field);

    return (
      <WmAnchor
        {...createBaseProps(fieldName, "anchor", className, listener)}
        hyperlink={href || ""}
        caption={caption || href}
      />
    );
  },

  WmIcon: ({ column, rowData, listener }: CellRendererContext) => {
    const { fieldName, value, className } = extractCellProps(column, rowData);

    return (
      <WmIcon
        {...createBaseProps(fieldName, "icon", className, listener)}
        iconclass={!isUndefined(value) ? toString(value) : ""}
        caption={!isUndefined(value) ? toString(value) : "Icon"}
      />
    );
  },

  WmPicture: ({ column, rowData, listener }: CellRendererContext) => {
    const { fieldName, value, caption, className } = extractCellProps(column, rowData);

    return (
      <WmPicture
        {...createBaseProps(fieldName, "picture", className, listener)}
        picturesource={!isUndefined(value) ? toString(value) : ""}
        alt={caption || "Image alt text not provided"}
      />
    );
  },

  WmLabel: ({ column, rowData, listener }: CellRendererContext) => {
    const { fieldName, value, className } = extractCellProps(column, rowData);

    return (
      <WmLabel
        {...createBaseProps(fieldName, "label", className, listener)}
        caption={!isUndefined(value) ? toString(value) : "Label"}
        type="p"
      />
    );
  },

  // Special renderer for dynamic columns - renders raw text like Angular
  "dynamic-text": ({ column, rowData }: CellRendererContext) => {
    const fieldName = toString(get(column, "field", ""));
    const value = get(rowData, fieldName, "");

    // Return raw text content directly (no WmLabel wrapper)
    return <>{!isUndefined(value) ? toString(value) : ""}</>;
  },
};

/**
 * Renders a table cell based on the widget-type property of the column
 * @param column - The column configuration
 * @param rowData - The row data object
 * @param listener - Optional event listener
 * @param cellState - Optional cell state manager
 * @returns React element for the cell content
 */
export const renderDisplayCell = (
  column: WmTableColumnProps,
  rowData: any,
  listener?: any,
  cellState?: CellStateReturn
): React.ReactElement => {
  const widgetType = get(column, "widgetType", "label");
  const mappedWidgetType = getWidgetMappingForType(widgetType);

  // Get the appropriate renderer, defaulting to WmLabel
  const renderer = get(widgetRenderers, mappedWidgetType) || widgetRenderers.WmLabel;

  return renderer({ column, rowData, listener, cellState });
};
