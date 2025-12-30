import React, { memo, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Box, Input, ClickAwayListener } from "@mui/material";
import { filter, map, includes } from "lodash-es";
import { TableFilterMode } from "../props";
import { getMatchModeTypesMap, getMatchModeMsgs } from "../../utils";

interface GlobalSearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  selectedColumn: string;
  onColumnChange: (columnId: string) => void;
  columns: any[];
  searchLabel?: string;
  name?: string;
  listener?: any;
  filteronkeypress?: boolean;
}

export const GlobalSearchFilter = memo(
  ({
    value,
    onChange,
    selectedColumn,
    onColumnChange,
    columns,
    searchLabel = "Search",
    name,
    filteronkeypress = false,
    listener,
  }: GlobalSearchFilterProps) => {
    // Local state for input value
    const [inputValue, setInputValue] = useState(value);
    // Local state for selected column to prevent immediate API calls
    const [localSelectedColumn, setLocalSelectedColumn] = useState(selectedColumn);

    // Update local value when prop changes
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Update local column when prop changes
    useEffect(() => {
      setLocalSelectedColumn(selectedColumn);
    }, [selectedColumn]);

    const clearLocalSearchControls = useCallback(() => {
      setInputValue("");
      setLocalSelectedColumn("");
    }, []);

    useEffect(() => {
      if (listener && listener.onChange && name) {
        listener.onChange(name, {
          clearFilter: clearLocalSearchControls,
        });
      }
    }, [clearLocalSearchControls]);

    // Filter out non-data columns for the dropdown using lodash - memoize to prevent recalculation
    const actionColumnIds = useMemo(
      () => ["actions", "row-operations", "multiSelect", "radioSelect", "row-index"],
      []
    );

    const searchableColumns = useMemo(
      () => filter(columns || [], col => col?.accessorKey && !includes(actionColumnIds, col?.id)),
      [columns, actionColumnIds]
    );

    const handleColumnChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColumn = e.target.value;
        setLocalSelectedColumn(newColumn);

        // If filteronkeypress is true, apply filter immediately when column changes
        if (filteronkeypress && inputValue) {
          onColumnChange(newColumn);
          // Re-apply the filter with the new column
          onChange(inputValue);
        }
      },
      [filteronkeypress, inputValue, onColumnChange, onChange]
    );

    const handleSearch = useCallback(() => {
      // Always update the value when search is triggered
      onChange(inputValue);

      // Update column selection if it changed
      if (localSelectedColumn !== selectedColumn) {
        onColumnChange(localSelectedColumn);
      }
    }, [inputValue, localSelectedColumn, selectedColumn, onChange, onColumnChange]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // If filteronkeypress is true, apply filter on every keystroke
        if (filteronkeypress) {
          onChange(newValue);

          // Update column selection if it changed
          if (localSelectedColumn !== selectedColumn) {
            onColumnChange(localSelectedColumn);
          }
        }
      },
      [filteronkeypress, localSelectedColumn, selectedColumn, onChange, onColumnChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          // Only trigger search manually if filteronkeypress is false
          if (!filteronkeypress) {
            handleSearch();
          }
        }
      },
      [filteronkeypress, handleSearch]
    );

    return (
      <Box component="form" className="form-search form-inline" onSubmit={e => e.preventDefault()}>
        <Box className="form-group form-group-sm">
          <Input
            type="text"
            className="form-control app-textbox"
            placeholder={searchLabel}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            size="small"
            sx={{
              "& input::placeholder": {
                color: "text.secondary",
                opacity: 0.7,
                fontWeight: "normal",
              },
            }}
          />
        </Box>
        <Box className="input-append input-group input-group-sm" component="div">
          <Box
            component="select"
            name="wm-datatable"
            data-element="dgFilterValue"
            className="form-control app-select input-sm"
            value={localSelectedColumn}
            onChange={handleColumnChange}
          >
            <option value="" className="placeholder">
              Select Field
            </option>
            {map(searchableColumns, (column, index) => (
              <option
                key={column.id || column.accessorKey}
                value={column.accessorKey}
                data-coldef-index={index}
              >
                {column.header}
              </option>
            ))}
          </Box>
          <Box component="span" className="input-group-addon">
            <Box
              component="button"
              type="button"
              data-element="dgSearchButton"
              className="app-search-button"
              title={searchLabel}
              onClick={handleSearch}
            >
              <Box component="i" className="wi wi-search" />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.value === nextProps.value &&
      prevProps.selectedColumn === nextProps.selectedColumn &&
      prevProps.columns === nextProps.columns &&
      prevProps.searchLabel === nextProps.searchLabel &&
      prevProps.name === nextProps.name &&
      prevProps.filteronkeypress === nextProps.filteronkeypress &&
      prevProps.onChange === nextProps.onChange &&
      prevProps.onColumnChange === nextProps.onColumnChange &&
      prevProps.listener === nextProps.listener
    );
  }
);

GlobalSearchFilter.displayName = "GlobalSearchFilter";

interface TableFilterRowProps {
  columns: any[];
  columnFilters: Record<string, any>;
  onColumnFilterChange: (columnId: string, value: string, matchMode?: string) => void;
  filterMode?: TableFilterMode;
  listener: any;
  renderFormWidget: (
    fieldName: string,
    widgetType: string,
    value: any,
    onChange: (value: any) => void,
    additionalProps?: any
  ) => React.ReactNode;
}

// Component to handle individual column filter with local state
const ColumnFilterCell = memo(
  ({
    columnId,
    value,
    onChange,
    widgetType,
    columnMeta,
    columnAccessorKey,
    listener,
    renderFormWidget,
    onMatchModeChange,
  }: {
    columnId: string;
    value: string;
    onChange: (columnId: string, value: string, matchMode?: string) => void;
    widgetType: string;
    columnMeta: any;
    columnAccessorKey?: string;
    renderFormWidget: any;
    listener: any;
    onMatchModeChange?: (columnId: string, matchMode: string) => void;
  }) => {
    const [localValue, setLocalValue] = useState(value);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedMatchMode, setSelectedMatchMode] = useState("anywhereignorecase");
    const filterButtonRef = useRef<HTMLElement>(null);
    const clearFilterButtonRef = useRef<HTMLElement>(null);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleApplyFilter = useCallback(
      (e: React.KeyboardEvent) => {
        const inputValue = (e.target as HTMLInputElement).value ?? localValue;
        // Only trigger onChange if the value has actually changed
        if (inputValue !== value) {
          onChange(columnId, inputValue, selectedMatchMode);
        }
      },
      [localValue, value, columnId, selectedMatchMode, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleApplyFilter(e);
        }
        e.stopPropagation(); // Prevent table keyboard shortcuts
      },
      [handleApplyFilter]
    );

    const handleFilterIconClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setAnchorEl(filterButtonRef.current);
    }, []);

    const handleClosePopover = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const handleMatchModeSelect = useCallback(
      (matchMode: string) => {
        setSelectedMatchMode(matchMode);
        if (onMatchModeChange) {
          onMatchModeChange(columnId, matchMode);
        }
        // Apply the filter with new match mode if there's a value
        if (localValue) {
          onChange(columnId, localValue, matchMode);
        }
        handleClosePopover();
      },
      [columnId, localValue, onChange, onMatchModeChange, handleClosePopover]
    );

    // Get the data type from widget type - memoize to prevent recalculation
    const getDataTypeFromWidget = useCallback(
      (widget: string): string => {
        const editType = columnMeta.editinputtype;

        // Check edit input type first
        if (editType === "number") return "number";
        if (editType === "date" || editType === "datetime-local" || editType === "time")
          return "date";

        // Check widget type
        switch (widget) {
          case "number":
          case "currency":
          case "integer":
            return "number";
          case "date":
          case "datetime":
          case "time":
          case "timestamp":
            return "date";
          case "text":
          case "textarea":
          case "string":
          default:
            return "string";
        }
      },
      [columnMeta.editinputtype]
    );

    // Get available match modes for the column type - memoize
    const matchModes = useMemo(() => {
      const dataType = getDataTypeFromWidget(widgetType);
      const matchModeMap = getMatchModeTypesMap() as Record<string, string[]>;
      return matchModeMap[dataType] || matchModeMap["default"] || [];
    }, [widgetType, getDataTypeFromWidget]);

    const matchModeMessages = useMemo(
      () => getMatchModeMsgs(listener?.appLocale),
      [listener?.appLocale]
    );

    // Get CSS class based on widget type - memoize
    const inputGroupClass = useMemo(() => {
      const dataType = getDataTypeFromWidget(widgetType);
      switch (dataType) {
        case "number":
          return "input-group number input-group-sm";
        case "date":
          return "input-group date input-group-sm";
        default:
          return "input-group text input-group-sm";
      }
    }, [widgetType, getDataTypeFromWidget]);

    const handleClearFilterIconClick = useCallback(() => {
      onChange(columnId, "", selectedMatchMode);
      setLocalValue("");
    }, [columnId, selectedMatchMode, onChange]);

    const handleLocalValueChange = useCallback((value: any) => {
      setLocalValue(value);
    }, []);

    return (
      <div data-col-identifier={columnAccessorKey} className={inputGroupClass}>
        <Box
          component="div"
          tabIndex={0}
          onBlur={handleApplyFilter as unknown as React.FocusEventHandler<HTMLDivElement>}
          onKeyDown={handleKeyDown as React.KeyboardEventHandler<HTMLDivElement>}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {renderFormWidget(columnId, widgetType, localValue, handleLocalValueChange, {
            placeholder: "",
            sessionKey: `filter_${columnId}`,
            column: columnMeta,
          })}
        </Box>

        <span className="input-group-addon filter-clear-icon">
          <Box
            hidden={!localValue || localValue === ""}
            ref={clearFilterButtonRef}
            component="button"
            type="button"
            className="btn-transparent btn app-button"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            onClick={handleClearFilterIconClick}
          >
            <i className="app-icon wi wi-clear" />
          </Box>
        </span>
        <Box component="span" className="input-group-addon">
          <Box
            ref={filterButtonRef}
            component="button"
            type="button"
            className="btn-transparent btn app-button"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            onClick={handleFilterIconClick}
          >
            <Box component="i" className="app-icon wi wi-filter-list" />
          </Box>
          {Boolean(anchorEl) && (
            <ClickAwayListener onClickAway={handleClosePopover}>
              <Box
                className="dropdown open show"
                style={{ position: "absolute", top: "100%", right: 0, zIndex: 1000 }}
              >
                <ul className="matchmode-dropdown dropdown-menu">
                  {map(matchModes, (mode: string) => (
                    <Box
                      key={mode}
                      component="li"
                      className={selectedMatchMode === mode ? "active" : ""}
                    >
                      <Box
                        component="a"
                        onClick={() => handleMatchModeSelect(mode)}
                        sx={{ cursor: "pointer", textDecoration: "none" }}
                      >
                        {(matchModeMessages as Record<string, string>)[mode] || mode}
                      </Box>
                    </Box>
                  ))}
                </ul>
              </Box>
            </ClickAwayListener>
          )}
        </Box>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.columnId === nextProps.columnId &&
      prevProps.value === nextProps.value &&
      prevProps.widgetType === nextProps.widgetType &&
      prevProps.columnMeta === nextProps.columnMeta &&
      prevProps.columnAccessorKey === nextProps.columnAccessorKey &&
      prevProps.onChange === nextProps.onChange &&
      prevProps.renderFormWidget === nextProps.renderFormWidget &&
      prevProps.listener === nextProps.listener &&
      prevProps.onMatchModeChange === nextProps.onMatchModeChange
    );
  }
);

ColumnFilterCell.displayName = "ColumnFilterCell";

export const TableFilterRow = memo(
  ({
    columns,
    columnFilters,
    onColumnFilterChange,
    filterMode,
    renderFormWidget,
    listener,
  }: TableFilterRowProps) => {
    if (filterMode !== "multicolumn") {
      return null;
    }

    return (
      <tr className="table-filter-row">
        {map(columns, (column, index) => {
          // Use accessorKey as the column ID if id is not present
          const columnId = column.id || column.accessorKey;

          // Skip filter for action columns or columns that are not filterable
          const actionColumnIds = [
            "actions",
            "row-operations",
            "multiSelect",
            "radioSelect",
            "row-index",
          ];
          const isActionColumn = includes(actionColumnIds, columnId) || column.isRowIndex;

          if (isActionColumn || column.enableColumnFilter === false || !column.accessorKey) {
            return <th key={columnId} />;
          }

          // Get the original column metadata if available
          const columnMeta = column.meta || {};
          const widgetType = columnMeta.editWidgetType || columnMeta.widgetType || "text";

          return (
            <th key={columnId} data-col-id={index + 1}>
              <ColumnFilterCell
                columnId={columnId}
                value={columnFilters[columnId]?.value || ""}
                onChange={onColumnFilterChange}
                widgetType={widgetType}
                columnMeta={columnMeta}
                columnAccessorKey={column.accessorKey}
                renderFormWidget={renderFormWidget}
                listener={listener}
              />
            </th>
          );
        })}
      </tr>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.columns === nextProps.columns &&
      prevProps.columnFilters === nextProps.columnFilters &&
      prevProps.filterMode === nextProps.filterMode &&
      prevProps.onColumnFilterChange === nextProps.onColumnFilterChange &&
      prevProps.renderFormWidget === nextProps.renderFormWidget &&
      prevProps.listener === nextProps.listener
    );
  }
);

TableFilterRow.displayName = "TableFilterRow";
