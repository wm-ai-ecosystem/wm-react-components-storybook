import React, { memo } from "react";
import { TableHead, TableRow, TableCell, Box } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import { TABLE_CSS_CLASSES } from "../utils";
import { TableHeaderProps } from "../props";
import { TableFilterRow } from "./TableFilters";

export const TableHeaderComponent: React.FC<TableHeaderProps> = memo(
  ({
    table,
    enablesort,
    rowClass = "",
    sorting,
    columnSizing,
    rowSelection,
    rowExpansionConfig,
    filterMode,
    columnFilters,
    onColumnFilterChange,
    renderFormWidget,
    listener,
  }) => {
    const hasExpansion = rowExpansionConfig && rowExpansionConfig.show;

    // Calculate where to insert the expansion header
    const getExpansionInsertIndex = React.useMemo(() => {
      if (!hasExpansion || !rowExpansionConfig) return -1;

      const position = rowExpansionConfig.position;
      const headers = table.getHeaderGroups()[0]?.headers || [];

      // If position is -1, insert before last column
      if (position === "-1" || position === -1) {
        return headers.length - 1;
      }

      // If position is a number, use it as index for data columns
      if (
        typeof position === "number" ||
        (typeof position === "string" && !isNaN(Number(position)))
      ) {
        const positionNum = Number(position);
        // Find the index of the first data column
        let dataColumnStartIndex = 0;
        for (let i = 0; i < headers.length; i++) {
          const header = headers[i];
          // Skip system columns (multiSelect, radioSelect, row-index, actions)
          if (
            header.id !== "multiSelect" &&
            header.id !== "radioSelect" &&
            header.id !== "row-index" &&
            header.id !== "actions"
          ) {
            dataColumnStartIndex = i;
            break;
          }
        }
        return dataColumnStartIndex + positionNum;
      }

      // If position is a string (column name), find the column
      if (typeof position === "string") {
        const columnIndex = headers.findIndex(header => {
          // Check direct match with id
          if (header.id === position || header.column.id === position) {
            return true;
          }
          // Check accessorKey for nested paths
          const column = header.column.columnDef as any;
          if (column.accessorKey === position) {
            return true;
          }
          // For nested paths like "name.location.url", TanStack converts dots to underscores in id
          const normalizedPosition = position.replace(/\./g, "_");
          return header.id === normalizedPosition || header.column.id === normalizedPosition;
        });
        // Return index + 1 to place AFTER the named column
        return columnIndex >= 0 ? columnIndex + 1 : 0;
      }

      return 0;
    }, [hasExpansion, rowExpansionConfig, table]);

    return (
      <TableHead className="table-header thead-sticky">
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} className={`${TABLE_CSS_CLASSES.tableRow} ${rowClass}`}>
            {headerGroup.headers.map((header, headerIndex) => {
              const cells = [];

              // Insert expansion header before this cell if it's at the calculated position
              if (hasExpansion && headerIndex === getExpansionInsertIndex) {
                cells.push(
                  <TableCell
                    key={`expansion-header-${headerIndex}`}
                    className={TABLE_CSS_CLASSES.headerCell}
                    style={{
                      width: rowExpansionConfig?.columnwidth || "50px",
                      padding: "8px",
                      userSelect: "none",
                    }}
                  >
                    {/* Empty header for expansion column */}
                  </TableCell>
                );
              }

              // Add the regular header cell
              cells.push(
                <TableCell
                  key={header.id}
                  className={`${TABLE_CSS_CLASSES.headerCell} ${(header.column.columnDef as any)?.meta?.className || ""}`.trim()}
                  style={{
                    cursor: enablesort && header.column.getCanSort() ? "pointer" : "default",
                    userSelect: "none",
                    width: header.getSize(),
                    position: "relative",
                  }}
                  title={
                    header.column.columnDef.header &&
                    typeof header.column.columnDef.header !== "function"
                      ? (header.column.columnDef.header.toString() as string)
                      : ""
                  }
                  onClick={
                    enablesort && header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  <Box component={"span"}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Box>
                  {enablesort && header.column.getCanSort() && (
                    <Box
                      style={{ zIndex: 90 }}
                      component="span"
                      className={`sort-buttons-container ${header.column.getIsSorted() ? "active" : ""}`}
                    >
                      <Box
                        component="i"
                        className={`sort-icon${header.column.getIsSorted() === "asc" ? ` ${TABLE_CSS_CLASSES.ascIcon}` : header.column.getIsSorted() === "desc" ? ` ${TABLE_CSS_CLASSES.descIcon}` : ""}`}
                      />
                    </Box>
                  )}
                  {header.column.getCanResize() && (
                    <Box
                      className="ui-resizable-handle ui-resizable-e"
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  )}
                </TableCell>
              );

              return <React.Fragment key={`header-group-${headerIndex}`}>{cells}</React.Fragment>;
            })}
          </TableRow>
        ))}
        {filterMode === "multicolumn" && (
          <TableFilterRow
            columns={table.getAllFlatColumns().map(col => col.columnDef)}
            columnFilters={columnFilters || {}}
            onColumnFilterChange={onColumnFilterChange || (() => {})}
            filterMode={filterMode}
            renderFormWidget={renderFormWidget}
            listener={listener}
          />
        )}
      </TableHead>
    );
  },
  (prevProps, nextProps) => {
    // Compare props including the sorting state
    const prevSorting = prevProps.sorting || [];
    const nextSorting = nextProps.sorting || [];
    if (prevProps.ColClassSignature !== nextProps.ColClassSignature) {
      return false;
    }

    // Deep compare sorting arrays
    const sortingEqual =
      prevSorting.length === nextSorting.length &&
      prevSorting.every((prevSort, index) => {
        const nextSort = nextSorting[index];
        return prevSort.id === nextSort.id && prevSort.desc === nextSort.desc;
      });

    // Compare column sizing
    const prevSizing = prevProps.columnSizing || {};
    const nextSizing = nextProps.columnSizing || {};
    const sizingKeys = new Set([...Object.keys(prevSizing), ...Object.keys(nextSizing)]);
    const sizingEqual = Array.from(sizingKeys).every(key => prevSizing[key] === nextSizing[key]);

    // Compare row selection
    const prevSelection = prevProps.rowSelection || {};
    const nextSelection = nextProps.rowSelection || {};
    const selectionKeys = new Set([...Object.keys(prevSelection), ...Object.keys(nextSelection)]);
    const selectionEqual =
      selectionKeys.size === Object.keys(prevSelection).length &&
      selectionKeys.size === Object.keys(nextSelection).length &&
      Array.from(selectionKeys).every(key => prevSelection[key] === nextSelection[key]);

    return (
      prevProps.enablesort === nextProps.enablesort &&
      prevProps.rowClass === nextProps.rowClass &&
      sortingEqual &&
      sizingEqual &&
      selectionEqual &&
      prevProps.rowExpansionConfig === nextProps.rowExpansionConfig &&
      prevProps.columnsVersion === nextProps.columnsVersion &&
      prevProps.filterMode === nextProps.filterMode &&
      JSON.stringify(prevProps.columnFilters || {}) ===
        JSON.stringify(nextProps.columnFilters || {})
    );
  }
);

TableHeaderComponent.displayName = "TableHeaderComponent";
