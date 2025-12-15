import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Box, Radio, Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { UseRowSelectionReturn, BuildSelectionColumnsProps } from "../props";
import { TABLE_MESSAGES } from "./index";
import { size, pickBy } from "lodash-es";

export const buildSelectionColumns = ({
  useRadioSelect,
  useMultiSelect,
  selectedRowId,
  selectedRowIds,
  handleRadioSelection,
  handleMultiSelection,
  handleSelectAll,
  internalDataset,
  radioselecttitle = "",
  radioselectarialabel = TABLE_MESSAGES.radioSelectAriaLabel,
  multiselecttitle = "",
  multiselectarialabel = TABLE_MESSAGES.multiSelectAriaLabel,
  tableName = "table",
}: BuildSelectionColumnsProps): ColumnDef<any> | null => {
  // Radio select column
  if (useRadioSelect) {
    return {
      id: "radioSelect",
      header: () => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {/* Empty header cell for radio column */}
        </Box>
      ),
      cell: ({ row, table }: any) => {
        const rowId = row.id;
        // Get selection state from table's rowSelection state
        const isSelected = table.getState().rowSelection?.[rowId] || false;
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title={radioselecttitle} placement="top">
              <Box className="radio app-radio">
                <FormControlLabel
                  control={
                    <Radio
                      checked={isSelected}
                      onChange={() => handleRadioSelection(rowId, row.original)}
                      value={rowId}
                      name={`wmRadioselect-${tableName}`}
                      inputProps={{
                        "aria-label": radioselectarialabel,
                      }}
                      // @ts-ignore - Custom attribute for WaveMaker specific functionality
                      rowselectinput=""
                      size="small"
                    />
                  }
                  label=""
                  className="caption"
                />
              </Box>
            </Tooltip>
          </Box>
        );
      },
      size: 40,
      minSize: 40,
      maxSize: 40,
      enableResizing: false,
    };
  }

  // Multiselect column
  if (useMultiSelect) {
    return {
      id: "multiSelect",
      header: ({ table }: any) => {
        // Get the current data and selection state from the table instance
        const currentData = table.options.data || [];
        const rowSelection = table.getState().rowSelection || {};
        const selectedCount = size(pickBy(rowSelection));
        const isAllSelected = selectedCount > 0 && selectedCount === currentData.length;
        const isIndeterminate = selectedCount > 0 && selectedCount < currentData.length;

        return (
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Box className="app-checkbox checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={e => handleSelectAll(e.target.checked)}
                    size="small"
                    inputProps={{
                      "aria-label": "Select all rows",
                    }}
                  />
                }
                label=""
                className="caption"
              />
            </Box>
          </Box>
        );
      },
      cell: ({ row, table }: any) => {
        const rowId = row.id;
        // Get selection state from table's rowSelection state
        const isSelected = table.getState().rowSelection?.[rowId] || false;

        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title={multiselecttitle} placement="top">
              <Box className="app-checkbox checkbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isSelected}
                      onChange={e => handleMultiSelection(rowId, row.original, e.target.checked)}
                      value={rowId}
                      name="gridMultiSelect"
                      inputProps={{
                        "aria-label": multiselectarialabel,
                        role: "checkbox",
                        "aria-live": "assertive",
                      }}
                      size="small"
                    />
                  }
                  label=""
                  className="caption"
                />
              </Box>
            </Tooltip>
            {isSelected ? (
              <span className="sr-only" aria-live="assertive">
                Row Selected
              </span>
            ) : (
              <span className="sr-only" aria-live="assertive">
                Row Deselected
              </span>
            )}
          </Box>
        );
      },
      size: 40,
      minSize: 40,
      maxSize: 40,
      enableResizing: false,
    };
  }

  return null;
};
