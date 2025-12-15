import { useMemo } from "react";
import { WmTableColumnProps } from "../props";
import { isColumnVisibleForViewport } from "../utils";

export const useResponsiveColumns = (columns: WmTableColumnProps[]) => {
  // Get viewport width once at initialization
  const viewportWidth = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 1024; // Default desktop width for SSR
  }, []); // Empty dependency array - only calculated once

  // Filter columns based on initial viewport
  const visibleColumns = useMemo(() => {
    if (!columns || !Array.isArray(columns)) {
      return [];
    }

    try {
      return columns.filter(column => {
        if (!column) return false;
        return isColumnVisibleForViewport(column, viewportWidth);
      });
    } catch (error) {
      console.error("Error filtering columns:", error);
      return columns; // Return all columns if filtering fails
    }
  }, [columns, viewportWidth]);

  return visibleColumns;
};
