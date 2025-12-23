import React, { memo, useMemo } from "react";
import { TableCell, Box, CircularProgress } from "@mui/material";
import { SummaryCellProps, SummaryRowValue } from "../props";
import { TABLE_CSS_CLASSES } from "../utils";

/**
 * SummaryCell Component
 * Renders a single cell in the summary row footer.
 * Supports HTML content, custom styling, and Promise loading states.
 */
const SummaryCellBase: React.FC<SummaryCellProps> = ({
  columnKey,
  column,
  rowDef,
  rowDefObject,
  colIndex,
  show,
}) => {
  // Get the value for this cell
  const columnValue = rowDef[columnKey];
  const columnValueObject = rowDefObject[columnKey];

  // Extract styling from the value object
  const cellStyling = useMemo(() => {
    if (
      columnValueObject &&
      typeof columnValueObject === "object" &&
      "class" in columnValueObject
    ) {
      return (columnValueObject as SummaryRowValue).class || "";
    }
    return "";
  }, [columnValueObject]);

  // Check if value is a Promise (loading state)
  const isLoading = columnValue instanceof Promise;

  // Get text alignment from column configuration
  const textAlign = useMemo(() => {
    return column?.textalignment || "left";
  }, [column]);

  // Render loading spinner for Promise values
  if (isLoading) {
    return (
      <TableCell
        className={`${TABLE_CSS_CLASSES.tableCell} app-datagrid-cell summary-cell ${cellStyling}`.trim()}
        data-col-id={colIndex}
        role="cell"
        tabIndex={0}
        style={{ textAlign }}
      >
        <Box className="overlay" sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={16} />
        </Box>
      </TableCell>
    );
  }

  // Get display value - handle various formats
  const displayValue = useMemo(() => {
    if (columnValue === undefined || columnValue === null) {
      return "";
    }

    // If columnValue is an object, extract the value property (safeguard in case setSummaryRowDef didn't extract it)
    if (typeof columnValue === "object" && !(columnValue instanceof Promise)) {
      // Check if it's a SummaryRowValue object with a 'value' property
      if ("value" in columnValue) {
        return (columnValue as SummaryRowValue).value;
      }
      // If it's an object without 'value', try to stringify it (fallback)
      return String(columnValue);
    }

    return columnValue;
  }, [columnValue]);

  // Check if value contains HTML (for rendering dangerously)
  const isHtmlContent = useMemo(() => {
    if (typeof displayValue === "string") {
      return /<[^>]+>/.test(displayValue);
    }
    return false;
  }, [displayValue]);

  return (
    <TableCell
      className={`${TABLE_CSS_CLASSES.tableCell} app-datagrid-cell summary-cell ${cellStyling}`.trim()}
      data-col-id={colIndex}
      role="cell"
      tabIndex={0}
      style={{
        textAlign,
        backgroundColor: column?.backgroundcolor,
        position: "relative",
        display: show ? "" : "none",
      }}
    >
      {isHtmlContent ? (
        <span dangerouslySetInnerHTML={{ __html: displayValue as string }} />
      ) : (
        displayValue
      )}
    </TableCell>
  );
};

export const SummaryCell = memo(SummaryCellBase);
SummaryCell.displayName = "SummaryCell";
