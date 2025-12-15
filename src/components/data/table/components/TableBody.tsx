import React, { memo, Fragment, useMemo, useCallback } from "react";
import { TableBody, TableRow, TableCell, Box } from "@mui/material";
import { flexRender, Table, ColumnDef } from "@tanstack/react-table";
import { TABLE_CSS_CLASSES, TABLE_MESSAGES } from "../utils";
import { WmTableRowProps, TableBodyProps } from "../props";
import { RowExpansionButton } from "./RowExpansionButton";

// Constants
const SYSTEM_COLUMN_IDS = ["multiSelect", "radioSelect", "row-index", "actions"];
const DEFAULT_EXPANSION_WIDTH = "50px";
const EXPANDED_ROW_BG_COLOR = "#f5f5f5";
const DEFAULT_CELL_PADDING = "2rem";

// Helper functions
const isSystemColumn = (columnId: string): boolean => SYSTEM_COLUMN_IDS.includes(columnId);

const parsePosition = (position: string | number | undefined): number => {
  if (!position) return 0;
  if (position === "-1" || position === -1) return -1;
  return typeof position === "number" ? position : Number(position);
};

const EmptyRow: React.FC<{ colSpan: number; message: string; rowClass?: string }> = memo(
  ({ colSpan, message, rowClass = "" }) => (
    <TableRow className={rowClass}>
      <TableCell
        colSpan={colSpan}
        className={`${TABLE_CSS_CLASSES.tableCell} text-center`}
        style={{ padding: DEFAULT_CELL_PADDING }}
      >
        {message}
      </TableCell>
    </TableRow>
  )
);
EmptyRow.displayName = "EmptyRow";

const ExpansionCell: React.FC<{
  rowId: string;
  rowData: any;
  isExpanded: boolean;
  onToggle: (rowId: string, rowData: any) => void;
  config: WmTableRowProps;
}> = memo(({ rowId, rowData, isExpanded, onToggle, config }) => (
  <TableCell
    className="app-datagrid-cell row-expansion-cell"
    style={{
      textAlign: "center",
      position: "relative",
      width: config.columnwidth || DEFAULT_EXPANSION_WIDTH,
      padding: "4px",
    }}
  >
    <Box component="span" className="row-expansion-column" data-identifier="rowExpansionButtons">
      <RowExpansionButton
        rowId={rowId}
        rowData={rowData}
        isExpanded={isExpanded}
        onToggle={onToggle}
        config={config}
      />
    </Box>
  </TableCell>
));
ExpansionCell.displayName = "ExpansionCell";

const ExpandedContent: React.FC<{
  rowId: string;
  rowData: any;
  config: WmTableRowProps;
  colSpan: number;
}> = memo(({ rowId, rowData, config, colSpan }) => {
  const renderContent = useCallback(() => {
    if (config.renderPartial) {
      const { name, content, ...restConfig } = config;
      const partialProps = {
        name: name || "table_row",
        content: content,
        rowData,
        rowId,
        ...restConfig,
      };

      const onLoad = () => {
        console.log("Partial content loaded for row:", rowId);
      };

      return config.renderPartial(partialProps, onLoad);
    }

    if (config.children) {
      return config.children;
    }

    return <div>{config.content || "No content available"}</div>;
  }, [config, rowData, rowId]);

  return (
    <TableRow
      className="expanded-row-content"
      data-row-id={rowId}
      style={{ backgroundColor: EXPANDED_ROW_BG_COLOR }}
    >
      <TableCell
        colSpan={colSpan}
        style={{
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {renderContent()}
      </TableCell>
    </TableRow>
  );
});
ExpandedContent.displayName = "ExpandedContent";

// Custom hook for expansion logic
const useExpansionPosition = (
  hasExpansion: boolean,
  rowExpansionConfig: WmTableRowProps | null,
  columns: ColumnDef<any>[]
): number => {
  return useMemo(() => {
    if (!hasExpansion || !rowExpansionConfig) return -1;

    const { position } = rowExpansionConfig;
    const parsedPosition = parsePosition(position);

    // Insert before last column
    if (parsedPosition === -1) {
      return columns.length - 1;
    }

    // Position is a number - calculate based on data columns
    if (!isNaN(parsedPosition)) {
      const firstDataColumnIndex = columns.findIndex(col => !isSystemColumn(col.id as string));
      return Math.max(0, firstDataColumnIndex + parsedPosition);
    }

    // Position is a column name
    if (typeof position === "string") {
      const columnIndex = columns.findIndex(col => {
        // Check direct match with id or accessorKey
        if (col.id === position || (col as any).accessorKey === position) {
          return true;
        }
        // For nested paths like "name.location.url", TanStack converts dots to underscores in id
        const normalizedPosition = position.replace(/\./g, "_");
        return col.id === normalizedPosition;
      });
      // Return index + 1 to place AFTER the named column
      return columnIndex >= 0 ? columnIndex + 1 : 0;
    }

    return 0;
  }, [hasExpansion, rowExpansionConfig, columns]);
};

// Main component
const TableBodyComponentBase: React.FC<TableBodyProps> = ({
  table,
  columns,
  rowClass = "",
  formposition = "bottom",
  renderAddNewRow,
  onRowClick,
  isRowActive,
  isRowSelected,
  nodatamessage = TABLE_MESSAGES.noDataMessage,
  loadingdatamsg = TABLE_MESSAGES.loadingMessage,
  isLoading = false,
  rowExpansionConfig,
  expandedRows = new Set(),
  toggleRowExpansion,
  isRowExpanded,
}) => {
  const hasExpansion = !!(rowExpansionConfig?.show && toggleRowExpansion && isRowExpanded);

  const expansionInsertIndex = useExpansionPosition(
    hasExpansion,
    rowExpansionConfig || null,
    columns
  );
  const totalColumns = columns.length + (hasExpansion ? 1 : 0);

  const renderExpansionCell = useCallback(
    (rowId: string, rowData: any) => {
      if (!hasExpansion || !rowExpansionConfig) return null;

      return (
        <ExpansionCell
          key={`expansion-${rowId}`}
          rowId={rowId}
          rowData={rowData}
          isExpanded={isRowExpanded!(rowId)}
          onToggle={toggleRowExpansion!}
          config={rowExpansionConfig}
        />
      );
    },
    [hasExpansion, rowExpansionConfig, isRowExpanded, toggleRowExpansion]
  );

  const renderDataRow = useCallback(
    (row: any) => {
      const rowId = row.id;
      const isSelected = isRowSelected(rowId);
      const isActive = isRowActive(rowId, isSelected);
      const rowIsExpanded = isRowExpanded?.(rowId) || false;

      return (
        <Fragment key={rowId}>
          <TableRow
            className={`${TABLE_CSS_CLASSES.tableRow} ${isActive ? "active" : ""} ${rowClass}`}
            onClick={event => onRowClick(event, row.original, rowId)}
            style={{ cursor: "pointer" }}
          >
            {row.getVisibleCells().map((cell: any, cellIndex: number) => (
              <Fragment key={`cell-${cellIndex}`}>
                {hasExpansion &&
                  cellIndex === expansionInsertIndex &&
                  renderExpansionCell(rowId, row.original)}

                <TableCell
                  key={cell.id}
                  title={row.getValue(cell.column.id) ? String(row.getValue(cell.column.id)) : ""}
                  className={`${TABLE_CSS_CLASSES.tableCell} ${cell.column.columnDef.meta?.className || ""}`.trim()}
                  style={{
                    width: cell.column.getSize(),
                    textAlign: cell.column.columnDef.meta?.textAlign,
                    backgroundColor: cell.column.columnDef.meta?.backgroundColor,
                    ...(() => {
                      const { className, textAlign, backgroundColor, ...otherMeta } =
                        cell.column.columnDef.meta || {};
                      return otherMeta;
                    })(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              </Fragment>
            ))}
          </TableRow>

          {hasExpansion && rowIsExpanded && rowExpansionConfig && (
            <ExpandedContent
              rowId={rowId}
              rowData={row.original}
              config={rowExpansionConfig}
              colSpan={totalColumns}
            />
          )}
        </Fragment>
      );
    },
    [
      isRowSelected,
      isRowActive,
      rowClass,
      onRowClick,
      hasExpansion,
      expansionInsertIndex,
      renderExpansionCell,
      isRowExpanded,
      rowExpansionConfig,
      totalColumns,
    ]
  );

  // Render logic
  const renderTableContent = () => {
    const rows = table.getRowModel().rows;
    if (rows.length === 0) {
      return <EmptyRow colSpan={totalColumns} message={nodatamessage} rowClass={rowClass} />;
    }

    return rows.map(renderDataRow);
  };

  return (
    <TableBody className={`app-grid-content ${TABLE_CSS_CLASSES.gridBody}`}>
      {formposition === "top" && renderAddNewRow()}
      {renderTableContent()}
      {formposition === "bottom" && renderAddNewRow()}
    </TableBody>
  );
};

export const TableBodyComponent = memo(TableBodyComponentBase, (prev, current) => {
  const keys: (keyof TableBodyProps)[] = [
    "isLoading",
    "rowClass",
    "formposition",
    "nodatamessage",
    "loadingdatamsg",
    "rowsVersion",
    "tableData",
    "ColClassSignature",
  ];
  return keys.every(key => prev[key] === current[key]);
});
TableBodyComponent.displayName = "TableBodyComponent";
