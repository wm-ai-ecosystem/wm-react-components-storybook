import { useCallback, useEffect, useRef, useState } from "react";
import { UseRowExpansionProps, UseRowExpansionReturn } from "../props";
import { cleanRowData } from "../utils";

/**
 * Hook to manage row expansion state
 */
export const useRowExpansion = ({
  rowExpansionConfig,
  internalDataset,
}: UseRowExpansionProps): UseRowExpansionReturn => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const expandedRowsRef = useRef(expandedRows);

  // Keep ref in sync with state
  useEffect(() => {
    expandedRowsRef.current = expandedRows;
  }, [expandedRows]);

  const toggleRowExpansion = useCallback(
    (rowId: string, rowData: any) => {
      if (!rowExpansionConfig || !rowExpansionConfig.show) return;

      const isCurrentlyExpanded = expandedRowsRef.current.has(rowId);

      // Handle before expand/collapse events
      if (!isCurrentlyExpanded) {
        // Before expand event
        if (rowExpansionConfig.onBeforerowexpand) {
          let defaultPrevented = false;
          const event = {
            preventDefault: () => {
              defaultPrevented = true;
            },
            get defaultPrevented() {
              return defaultPrevented;
            },
          };
          rowExpansionConfig.onBeforerowexpand?.(
            event,
            {},
            cleanRowData(rowData),
            cleanRowData(internalDataset)
          );
          if (defaultPrevented) return;
        }
      } else {
        // Before collapse event
        if (rowExpansionConfig.onBeforerowcollapse) {
          let defaultPrevented = false;
          const event = {
            preventDefault: () => {
              defaultPrevented = true;
            },
            get defaultPrevented() {
              return defaultPrevented;
            },
          };
          rowExpansionConfig.onBeforerowcollapse?.(
            event,
            {},
            cleanRowData(rowData),
            cleanRowData(internalDataset)
          );
          if (defaultPrevented) return;
        }
      }

      setExpandedRows(prev => {
        const newExpandedRows = new Set(prev);

        if (isCurrentlyExpanded) {
          // Collapse the row
          newExpandedRows.delete(rowId);

          // Fire collapse event
          if (rowExpansionConfig.onRowcollapse) {
            setTimeout(() => {
              rowExpansionConfig.onRowcollapse?.({}, {}, cleanRowData(rowData));
            }, 0);
          }
        } else {
          // If closeothers is true, clear all other expanded rows
          if (rowExpansionConfig.closeothers) {
            newExpandedRows.clear();
          }

          // Expand the row
          newExpandedRows.add(rowId);

          // Fire expand event
          if (rowExpansionConfig.onRowexpand) {
            setTimeout(() => {
              rowExpansionConfig.onRowexpand?.(
                {},
                { rowExpansionConfig },
                cleanRowData(rowData),
                cleanRowData(internalDataset)
              );
            }, 0);
          }
        }

        return newExpandedRows;
      });
    },
    [rowExpansionConfig, internalDataset]
  );

  const isRowExpanded = useCallback(
    (rowId: string): boolean => {
      return expandedRows.has(rowId);
    },
    [expandedRows]
  );

  const collapseAllRows = useCallback(() => {
    setExpandedRows(new Set());
  }, []);

  return {
    expandedRows,
    toggleRowExpansion,
    isRowExpanded,
    collapseAllRows,
    rowExpansionConfig,
  };
};
