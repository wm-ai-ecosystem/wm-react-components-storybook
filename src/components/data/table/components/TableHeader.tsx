import React, { memo, useMemo } from "react";
import { TableHead, TableRow, TableCell, Box } from "@mui/material";
import { flexRender, Header } from "@tanstack/react-table";
import { TABLE_CSS_CLASSES } from "../utils";
import { TableHeaderProps } from "../props";
import { TableFilterRow } from "./TableFilters";
import { calculateMaxDepth, generateHeaderRows, hasTableGroups } from "../utils/groupHeaderUtils";
import type { HeaderCellData } from "../props";

// Helper component for rendering a standard table header cell
const StandardHeaderCell = memo(
  ({
    header,
    enablesort,
    rowSpan = 1,
    children,
    className,
    style,
    title,
    onClick,
    ...rest
  }: {
    header: Header<any, unknown>;
    enablesort: boolean;
    rowSpan?: number;
    children?: React.ReactNode;
  } & React.HTMLAttributes<HTMLTableCellElement>) => {
    const canSort = enablesort && header.column.getCanSort();
    const isSorted = header.column.getIsSorted();

    // Merge className with meta className if present
    const metaClassName = (header.column.columnDef as any)?.meta?.className || "";
    const mergedClassName =
      `${TABLE_CSS_CLASSES.headerCell} ${metaClassName} ${className || ""}`.trim();

    // Merge default styles with provided styles
    const mergedStyle: React.CSSProperties = {
      cursor: canSort ? "pointer" : "default",
      userSelect: "none",
      width: header.getSize(),
      position: "relative",
      ...style,
    };

    // Get title from header definition or use provided title
    const headerTitle =
      header.column.columnDef.header && typeof header.column.columnDef.header !== "function"
        ? (header.column.columnDef.header.toString() as string)
        : "";

    return (
      <TableCell
        className={mergedClassName}
        rowSpan={rowSpan}
        style={mergedStyle}
        title={title || headerTitle}
        onClick={onClick || (canSort ? header.column.getToggleSortingHandler() : undefined)}
        {...rest}
      >
        {children || (
          <>
            <Box component="span">
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </Box>
            {canSort && (
              <Box
                style={{ zIndex: 90 }}
                component="span"
                className={`sort-buttons-container ${isSorted ? "active" : ""}`}
              >
                <Box
                  component="i"
                  className={`sort-icon${
                    isSorted === "asc"
                      ? ` ${TABLE_CSS_CLASSES.ascIcon}`
                      : isSorted === "desc"
                        ? ` ${TABLE_CSS_CLASSES.descIcon}`
                        : ""
                  }`}
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
          </>
        )}
      </TableCell>
    );
  }
);

StandardHeaderCell.displayName = "StandardHeaderCell";

// Helper component for rendering a group header cell
const GroupHeaderCell = memo(({ headerCell }: { headerCell: HeaderCellData }) => {
  const groupClasses = ["app-datagrid-group-header-cell"];
  if (headerCell.class) groupClasses.push(headerCell.class);
  if (headerCell.colClass) groupClasses.push(headerCell.colClass);

  const groupStyles: React.CSSProperties = {
    textAlign: (headerCell.textAlignment || "center") as React.CSSProperties["textAlign"],
    backgroundColor: headerCell.backgroundColor,
    ...(headerCell.styles || {}),
  };

  return (
    <TableCell
      className={groupClasses.join(" ")}
      colSpan={headerCell.colspan || 1}
      style={groupStyles}
      title={headerCell.displayName}
    >
      <span className="header-data">{headerCell.displayName}</span>
    </TableCell>
  );
});

GroupHeaderCell.displayName = "GroupHeaderCell";

// Helper component for expansion header cell
const ExpansionHeaderCell = memo(
  ({
    rowSpan = 1,
    columnwidth,
    ...rest
  }: { rowSpan?: number; columnwidth?: string } & React.HTMLAttributes<HTMLTableCellElement>) => (
    <TableCell
      {...rest}
      className={`${TABLE_CSS_CLASSES.headerCell} ${rest.className || ""}`.trim()}
      rowSpan={rowSpan}
      style={{
        width: columnwidth || "50px",
        padding: "8px",
        userSelect: "none",
        ...rest.style,
      }}
    >
      {/* Empty header for expansion column */}
    </TableCell>
  )
);

ExpansionHeaderCell.displayName = "ExpansionHeaderCell";

export const TableHeaderComponent: React.FC<TableHeaderProps> = memo(
  ({
    table,
    enablesort,
    enablecolumnselection = false,
    rowClass = "",
    rowExpansionConfig,
    filterMode,
    columnFilters,
    onColumnFilterChange,
    renderFormWidget,
    listener,
    tableStructure,
    onColumnSelect,
    onColumnDeselect,
  }) => {
    const hasExpansion = rowExpansionConfig && rowExpansionConfig.show;

    // Check if we have grouped columns
    const hasGroups = useMemo(() => {
      return tableStructure && hasTableGroups(tableStructure);
    }, [tableStructure]);

    // Calculate the maximum depth of the header structure
    const maxHeaderDepth = useMemo(() => {
      if (!hasGroups || !tableStructure) return 1;
      return calculateMaxDepth(tableStructure);
    }, [hasGroups, tableStructure]);

    // Generate header rows for grouped columns
    const groupHeaderRows = useMemo(() => {
      if (!hasGroups || !tableStructure) return [];
      return generateHeaderRows(tableStructure, maxHeaderDepth);
    }, [hasGroups, tableStructure, maxHeaderDepth]);

    // Calculate where to insert the expansion header for non-grouped tables
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

    // Render grouped headers if we have groups
    if (hasGroups && groupHeaderRows.length > 0) {
      return (
        <TableHead className="table-header thead-sticky">
          {table.getHeaderGroups().map((headerGroup, groupIndex) => {
            // For grouped tables, we only render the first header group from the table
            // and replace its content with our grouped structure
            if (groupIndex > 0) return null;

            return groupHeaderRows.map((headerRow, rowIndex) => (
              <TableRow
                key={`header-row-${rowIndex}`}
                className={`${TABLE_CSS_CLASSES.tableRow} ${rowClass}`}
              >
                {/* Render system columns at the beginning (multiSelect, radioSelect, rowIndex) */}
                {rowIndex === 0 &&
                  headerGroup.headers
                    .filter(header =>
                      ["multiSelect", "radioSelect", "row-index"].includes(header.column.id)
                    )
                    .map(header => (
                      <StandardHeaderCell
                        key={header.id}
                        header={header}
                        enablesort={enablesort}
                        rowSpan={maxHeaderDepth}
                      />
                    ))}

                {/* Render expansion column if needed */}
                {rowIndex === 0 && hasExpansion && (
                  <ExpansionHeaderCell
                    key="expansion-header"
                    rowSpan={maxHeaderDepth}
                    columnwidth={rowExpansionConfig?.columnwidth}
                  />
                )}

                {/* Render grouped headers */}
                {headerRow.map((headerCell: HeaderCellData, cellIndex) => {
                  if (headerCell.isGroup) {
                    return (
                      <GroupHeaderCell
                        key={`group-${cellIndex}-${headerCell.field}`}
                        headerCell={headerCell}
                      />
                    );
                  } else if (headerCell.column) {
                    // Find the corresponding header from the table
                    const header = headerGroup.headers.find(
                      h =>
                        h.column.id === headerCell.field ||
                        (h.column.columnDef as any).accessorKey === headerCell.field
                    );

                    if (header) {
                      return (
                        <StandardHeaderCell
                          key={header.id}
                          header={header}
                          enablesort={enablesort}
                          rowSpan={headerCell.rowspan || 1}
                        />
                      );
                    }
                  }
                  return null;
                })}

                {/* Render actions column at the end of the first row */}
                {rowIndex === 0 &&
                  headerGroup.headers
                    .filter(header => header.column.id === "actions")
                    .map(header => (
                      <StandardHeaderCell
                        key={header.id}
                        header={header}
                        enablesort={enablesort}
                        rowSpan={maxHeaderDepth}
                      />
                    ))}
              </TableRow>
            ));
          })}
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
    }

    // Default rendering for non-grouped tables
    return (
      <TableHead className="table-header thead-sticky">
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow
            key={headerGroup.id}
            className={`${TABLE_CSS_CLASSES.tableRow} ${rowClass}`}
            tabIndex={0}
            role="row"
          >
            {headerGroup.headers.map((header, headerIndex) => {
              const cells = [];

              // Insert expansion header before this cell if it's at the calculated position
              if (hasExpansion && headerIndex === getExpansionInsertIndex) {
                cells.push(
                  <ExpansionHeaderCell
                    key={`expansion-header-${headerIndex}`}
                    className={TABLE_CSS_CLASSES.headerCell}
                    style={{
                      width: rowExpansionConfig?.columnwidth || "50px",
                      padding: "8px",
                      userSelect: "none",
                    }}
                    role="columnheader"
                    data-col-id={headerIndex}
                    tabIndex={0}
                    data-col-field={header.column.id}
                    columnwidth={rowExpansionConfig?.columnwidth}
                  />
                );
              }

              // Column selection feature
              const columnId = header.column.id;

              // Determine if this is a system column (excluded from column selection)
              const isSystemColumn =
                columnId === "multiSelect" ||
                columnId === "radioSelect" ||
                columnId === "row-index" ||
                columnId === "actions";

              // Handle header cell click - column selection takes priority over sorting
              const handleHeaderClick = (event: React.MouseEvent) => {
                // Skip system columns from column selection
                if (enablecolumnselection && !isSystemColumn) {
                  // Column selection has priority - toggle class directly on the element
                  const target = event.currentTarget as HTMLElement;
                  const isCurrentlySelected = target.classList.contains(
                    TABLE_CSS_CLASSES.selectedColumn
                  );

                  // Get current visible rows directly from table at click time
                  // This ensures we get the actual displayed rows based on current page size
                  const currentRows = table.getRowModel().rows.map(row => row.original);

                  // Extract column data from current visible rows
                  const colDef = header.column.columnDef as any;
                  const accessorKey = colDef.accessorKey || columnId;
                  const columnData = currentRows.map((row: any) => {
                    // Handle nested paths (e.g., "name.location.url")
                    if (accessorKey.includes(".")) {
                      return accessorKey
                        .split(".")
                        .reduce((obj: any, key: string) => obj?.[key], row);
                    }
                    return row[accessorKey];
                  });

                  if (isCurrentlySelected) {
                    // Deselect: remove the class and call callback
                    target.classList.remove(TABLE_CSS_CLASSES.selectedColumn);
                    onColumnDeselect?.(event, columnId, header.column.columnDef, columnData);
                  } else {
                    // Select: add the class and call callback
                    target.classList.add(TABLE_CSS_CLASSES.selectedColumn);
                    onColumnSelect?.(event, columnId, header.column.columnDef, columnData);
                  }
                  return; // Don't execute sorting
                }

                // Fall back to sorting if column selection is not enabled
                if (enablesort && header.column.getCanSort()) {
                  header.column.getToggleSortingHandler()?.(event);
                }
              };

              const isClickable =
                (enablecolumnselection && !isSystemColumn) ||
                (enablesort && header.column.getCanSort());

              // Add the regular header cell
              cells.push(
                <TableCell
                  key={header.id}
                  className={`${TABLE_CSS_CLASSES.headerCell} ${(header.column.columnDef as any)?.meta?.className || ""}`.trim()}
                  style={{
                    cursor: isClickable ? "pointer" : "default",
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
                  onClick={handleHeaderClick}
                  role="columnheader"
                  data-col-id={headerIndex}
                  tabIndex={0}
                  data-col-field={header.column.id}
                >
                  <Box component={"span"}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Box>
                  {enablesort && !enablecolumnselection && header.column.getCanSort() && (
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
      prevProps.enablecolumnselection === nextProps.enablecolumnselection &&
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
