import { ColumnDef } from "@tanstack/react-table";

/**
 * Column types that should not participate in equal width distribution
 * These columns have specific functional purposes and should use their default/fixed sizes
 */
const NON_DATA_COLUMN_IDS = ["radioSelect", "multiSelect", "rowIndex", "actions"];

/**
 * Determines if a column is a data column that should participate in equal width distribution
 */
export const isDataColumn = (column: ColumnDef<any>): boolean => {
  return !NON_DATA_COLUMN_IDS.includes(column.id || "");
};

/**
 * Determines if a column has an explicit width defined
 */
export const hasExplicitWidth = (column: ColumnDef<any>): boolean => {
  return typeof column.size === "number" && column.size > 0;
};

/**
 * Calculates equal width distribution for data columns without explicit widths.
 *
 * This function implements the logic to ensure that:
 * 1. Non-data columns (S.No, Actions, MultiSelect, RadioSelect) take only minimum necessary width
 * 2. Data columns without explicit widths automatically share remaining space equally
 * 3. Data columns with explicit widths (via column.width or column.styles.width) maintain their specified size
 *
 * @param columns - Array of column definitions
 * @param tableWidth - Total available table width (default: 1200px for calculations)
 * @returns Modified column definitions with auto-sized data columns
 */
export const distributeColumnWidths = (
  columns: ColumnDef<any>[],
  tableWidth: number = 1200
): ColumnDef<any>[] => {
  // Calculate total width used by non-data columns and data columns with explicit widths
  let usedWidth = 0;
  let dataColumnsNeedingWidth = 0;

  columns.forEach(column => {
    if (!isDataColumn(column)) {
      // Non-data column - use its default size
      const size = column.size || getDefaultColumnSize(column.id || "");
      usedWidth += size;
    } else if (hasExplicitWidth(column)) {
      // Data column with explicit width
      usedWidth += column.size!;
    } else {
      // Data column needing auto-sizing
      dataColumnsNeedingWidth++;
    }
  });

  // Calculate width for auto-sized data columns
  let autoColumnWidth = 150; // Default fallback width
  if (dataColumnsNeedingWidth > 0) {
    const remainingWidth = Math.max(tableWidth - usedWidth, dataColumnsNeedingWidth * 100);
    autoColumnWidth = Math.floor(remainingWidth / dataColumnsNeedingWidth);
    // Ensure minimum width
    autoColumnWidth = Math.max(autoColumnWidth, 100);
  }

  // Apply calculated widths to columns
  return columns.map(column => {
    if (isDataColumn(column) && !hasExplicitWidth(column)) {
      return {
        ...column,
        size: autoColumnWidth,
        minSize: 100, // Ensure reasonable minimum for data columns
        enableResizing: true, // Allow resizing for auto-sized columns
      };
    }
    return column;
  });
};

/**
 * Get default size for non-data columns
 */
const getDefaultColumnSize = (columnId: string): number => {
  switch (columnId) {
    case "radioSelect":
    case "multiSelect":
    case "rowIndex":
    case "actions":
      return 60;
    default:
      return 150;
  }
};
