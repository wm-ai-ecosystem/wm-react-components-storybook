import React, { memo } from "react";
import { TableRow } from "@mui/material";
import { SummaryRowProps } from "../props";
import { SummaryCell } from "./SummaryCell";
import { TABLE_CSS_CLASSES } from "../utils";

/**
 * SummaryRow Component
 * Renders a single row in the summary row footer.
 * Maps over columns to render SummaryCell components.
 */
const SummaryRowBase: React.FC<SummaryRowProps> = ({
  rowDef,
  rowDefObject,
  rowIndex,
  columns,
  summaryRowColumnShow,
}) => {
  return (
    <TableRow
      role="row"
      tabIndex={0}
      className={`${TABLE_CSS_CLASSES.tableRow} app-datagrid-row summary-row`}
      data-row-id={`summary-${rowIndex}`}
    >
      {columns.map((column, colIndex) => {
        const columnKey = column.field || column.binding;

        // Skip columns without a binding/field
        if (!columnKey) {
          return null;
        }

        // Check if column should be shown based on stored show property or column's show property
        // Priority: summaryRowColumnShow > column.show > true (default)
        const columnShow =
          summaryRowColumnShow?.[rowIndex]?.[columnKey] !== undefined
            ? summaryRowColumnShow[rowIndex][columnKey]
            : column.show !== undefined
              ? column.show
              : true;

        return (
          <SummaryCell
            key={`summary-cell-${rowIndex}-${columnKey}`}
            columnKey={columnKey}
            column={column}
            rowDef={rowDef}
            rowDefObject={rowDefObject}
            colIndex={colIndex}
            show={columnShow}
          />
        );
      })}
    </TableRow>
  );
};

export const SummaryRow = memo(SummaryRowBase);
SummaryRow.displayName = "SummaryRow";
