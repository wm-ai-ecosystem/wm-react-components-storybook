import React, { memo, useState, useEffect, useRef } from "react";
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

    const clearLocalSearchControls = React.useCallback(() => {
      setInputValue("");
      setLocalSelectedColumn("");
    }, []);

    useEffect(() => {
      if (listener && listener.onChange && name) {
        listener.onChange(name, {
          clearFilter: clearLocalSearchControls,
        });
      }
    }, []);

    // Filter out non-data columns for the dropdown using lodash
    const actionColumnIds = [
      "actions",
      "row-operations",
      "multiSelect",
      "radioSelect",
      "row-index",
    ];
    const searchableColumns = filter(
      columns || [],
      col => col?.accessorKey && !includes(actionColumnIds, col?.id)
    );

    const handleSearch = () => {
      // Always update the value when search is triggered
      onChange(inputValue);

      // Update column selection if it changed
      if (localSelectedColumn !== selectedColumn) {
        onColumnChange(localSelectedColumn);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    };

    return (
      <Box component="form" className="form-search form-inline" onSubmit={e => e.preventDefault()}>
        <Box className="form-group form-group-sm">
          <Input
            type="text"
            className="form-control app-textbox"
            placeholder={searchLabel}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
          />
        </Box>
        <Box className="input-append input-group input-group-sm" component="div">
          <Box
            component="select"
            name="wm-datatable"
            data-element="dgFilterValue"
            className="form-control app-select input-sm"
            value={localSelectedColumn}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setLocalSelectedColumn(e.target.value)
            }
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

    const handleApplyFilter = (e: React.KeyboardEvent) => {
      const inputValue = (e.target as HTMLInputElement).value ?? localValue;
      // Only trigger onChange if the value has actually changed
      if (inputValue !== value) {
        onChange(columnId, inputValue, selectedMatchMode);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleApplyFilter(e);
      }
      e.stopPropagation(); // Prevent table keyboard shortcuts
    };

    const handleFilterIconClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setAnchorEl(filterButtonRef.current);
    };

    const handleClosePopover = () => {
      setAnchorEl(null);
    };

    const handleMatchModeSelect = (matchMode: string) => {
      setSelectedMatchMode(matchMode);
      if (onMatchModeChange) {
        onMatchModeChange(columnId, matchMode);
      }
      // Apply the filter with new match mode if there's a value
      if (localValue) {
        onChange(columnId, localValue, matchMode);
      }
      handleClosePopover();
    };

    // Get the data type from widget type
    const getDataTypeFromWidget = (widget: string): string => {
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
    };

    // Get available match modes for the column type
    const getMatchModes = () => {
      const dataType = getDataTypeFromWidget(widgetType);
      const matchModeMap = getMatchModeTypesMap() as Record<string, string[]>;
      return matchModeMap[dataType] || matchModeMap["default"] || [];
    };

    const matchModes = getMatchModes();
    const matchModeMessages = getMatchModeMsgs(listener?.appLocale);

    // Get CSS class based on widget type
    const getInputGroupClass = () => {
      const dataType = getDataTypeFromWidget(widgetType);
      switch (dataType) {
        case "number":
          return "input-group number input-group-sm";
        case "date":
          return "input-group date input-group-sm";
        default:
          return "input-group text input-group-sm";
      }
    };

    const handleClearFilterIconClick = () => {
      onChange(columnId, "", selectedMatchMode);
      setLocalValue("");
    };

    return (
      <div data-col-identifier={columnAccessorKey} className={getInputGroupClass()}>
        <Box
          onBlur={handleApplyFilter}
          onKeyDown={handleKeyDown}
          onClick={e => e.stopPropagation()}
        >
          {renderFormWidget(
            columnId,
            widgetType,
            localValue,
            (value: any) => setLocalValue(value),
            {
              placeholder: "",
              sessionKey: `filter_${columnId}`,
              column: columnMeta,
            }
          )}
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
  }
);

TableFilterRow.displayName = "TableFilterRow";
