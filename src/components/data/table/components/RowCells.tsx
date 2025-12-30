import React, { memo, Fragment, ReactNode } from "react";
import { TableCell } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import { getColClass, TABLE_CSS_CLASSES } from "../utils";

// Memoized cell content component to prevent re-renders when activeRowIds changes
export interface MemoizedRowCellsProps {
  cells: any[];
  hasExpansion: boolean;
  expansionInsertIndex: number;
  renderExpansionCell: (rowId: string, rowData: any) => ReactNode;
  rowId: string;
  rowData: any;
  ColClassSignature?: string;
  rowsVersion?: number;
  tableData?: any[];
  isEditingRow?: boolean;
}

export const RowCells = memo<MemoizedRowCellsProps>(
  ({
    cells,
    hasExpansion,
    expansionInsertIndex,
    renderExpansionCell,
    rowId,
    rowData,
    isEditingRow,
  }) => {
    return (
      <>
        {cells.map((cell: any, cellIndex: number) => {
          const colClassExpression = cell?.column.columnDef.meta?.colClass || "";
          const columnId = cell?.column?.id || cell?.column.columnDef?.accessorKey || "";
          const colClass = getColClass(colClassExpression, rowData, columnId);

          return (
            <Fragment key={`cell-${cellIndex}`}>
              {hasExpansion &&
                cellIndex === expansionInsertIndex &&
                renderExpansionCell(rowId, rowData)}

              <TableCell
                key={cell.id}
                title={cell.getValue() ? String(cell.getValue()) : ""}
                role="cell"
                tabIndex={0}
                data-col-id={cellIndex}
                className={`${TABLE_CSS_CLASSES.tableCell} ${colClass || ""}  ${cell.column.columnDef.meta?.className || ""}`.trim()}
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
                {/* When editing, always use flexRender to go through renderCell logic for editable cells */}
                {cell.column.columnDef.meta?.renderCellContent && !isEditingRow
                  ? cell.column.columnDef.meta?.renderCellContent(rowData, cell.column.columnDef)
                  : flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            </Fragment>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) => {
    // Compare cells first - if column definitions changed (e.g., selection state), cells will be different
    // Also compare rowData and isEditingRow which are used in rendering
    return (
      prevProps.cells === nextProps.cells &&
      prevProps.rowData === nextProps.rowData &&
      prevProps.isEditingRow === nextProps.isEditingRow
    );
  }
);
RowCells.displayName = "RowCells";
