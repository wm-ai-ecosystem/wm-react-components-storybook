import React, { memo } from "react";
import { TableFooter } from "@mui/material";
import { SummaryRowFooterProps } from "../props";
import { SummaryRow } from "./SummaryRow";

/**
 * SummaryRowFooter Component
 * Renders the table footer section containing summary rows.
 * Displays aggregated data like totals, averages, etc.
 */
const SummaryRowFooterBase: React.FC<SummaryRowFooterProps> = ({
  summaryRowDefs,
  summaryRowDefObjects,
  columns,
  tableName,
  summaryRowColumnShow,
}) => {
  // Don't render if no summary rows
  if (!summaryRowDefs || summaryRowDefs.length === 0) {
    return null;
  }
  return (
    <TableFooter
      className="app-datagrid-footer"
      style={{ borderTop: "3px solid #eee" }}
      data-table-name={tableName}
    >
      {summaryRowDefs.map((rowDef, rowIndex) => (
        <SummaryRow
          key={`summary-row-${rowIndex}`}
          rowDef={rowDef}
          rowDefObject={summaryRowDefObjects[rowIndex] || {}}
          rowIndex={rowIndex}
          columns={columns}
          summaryRowColumnShow={summaryRowColumnShow}
        />
      ))}
    </TableFooter>
  );
};

export const SummaryRowFooter = memo(SummaryRowFooterBase);
SummaryRowFooter.displayName = "SummaryRowFooter";
