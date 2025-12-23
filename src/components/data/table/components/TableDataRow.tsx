import React, { memo, Fragment, useMemo, useCallback } from "react";
import { TableRow } from "@mui/material";
import { merge } from "lodash-es";
import { RowCells } from "./RowCells";
import { useEditedRow } from "../hooks/use-edited-rows";
import { TABLE_CSS_CLASSES } from "../utils";

interface DataRowProps {
  row: any;
  rowId: string;
  isSelected: boolean;
  isActive: boolean;
  rowIsExpanded: boolean;
  isEditingRow: boolean;
  hasExpansion: boolean;
  expansionInsertIndex: number;
  renderExpansionCell: (rowId: string, rowData: any) => React.ReactNode;
  rowClass: string;
  onRowClick: (event: React.MouseEvent, rowOriginal: any, rowId: string) => void;
  ColClassSignature: string;
  rowsVersion: number;
  tableData: any[];
  ExpandedContent: React.ComponentType<any>;
  rowExpansionConfig: any;
  totalColumns: number;
  index: number;
}

const TableDataRowComponent: React.FC<DataRowProps> = ({
  row,
  rowId,
  isSelected,
  isActive,
  rowIsExpanded,
  isEditingRow,
  hasExpansion,
  expansionInsertIndex,
  renderExpansionCell,
  rowClass,
  onRowClick,
  ColClassSignature,
  rowsVersion,
  tableData,
  ExpandedContent,
  rowExpansionConfig,
  totalColumns,
  index,
}) => {
  // Subscribe to edits for this specific row.
  // This hook will only trigger a re-render for THIS component if the data for this row changes.
  const editedTableData = useEditedRow(rowId);

  // Create a merged data object that proxies `getProperty` to return edited values
  const mergedRowData = useMemo(() => {
    // If no edits, return original (ensure referential stability if possible, though row.original might change)
    if (!editedTableData) {
      return row.original;
    }

    // Create a shallow copy first
    // we use a safe approach: spread original, then spread edits
    const merged = { ...row.original, ...editedTableData };

    // Now strict overrides for getProperty
    // If the original data has a getProperty method (WaveMaker specific), we need to wrap it.
    if (typeof row.original.getProperty === "function") {
      // Define getProperty on the merged object
      // We use Object.defineProperty to make it non-enumerable if strictness is needed, but simple assignment is usually fine.
      merged.getProperty = (key: string) => {
        // 1. Check if we have an edited value for this key
        if (editedTableData && Object.prototype.hasOwnProperty.call(editedTableData, key)) {
          return editedTableData[key];
        }
        // 2. Fallback to original getProperty
        return row.original.getProperty(key);
      };
    }

    return merged;
  }, [row.original, editedTableData]);

  return (
    <Fragment key={rowId}>
      <TableRow
        className={`${TABLE_CSS_CLASSES.tableRow} ${isActive ? "active" : ""} ${rowClass}`}
        onClick={event => onRowClick(event, row.original, rowId)}
        data-row-id={row.index}
        role="row"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        data-editing={isEditingRow}
      >
        <RowCells
          cells={row.getVisibleCells()}
          hasExpansion={hasExpansion}
          expansionInsertIndex={expansionInsertIndex}
          renderExpansionCell={renderExpansionCell}
          rowId={rowId}
          // Pass the merged data which includes the "live" edited values and the smart getProperty
          rowData={mergedRowData}
          ColClassSignature={ColClassSignature}
          rowsVersion={rowsVersion}
          tableData={tableData}
          isEditingRow={isEditingRow}
        />
      </TableRow>

      {hasExpansion && rowIsExpanded && rowExpansionConfig && (
        <ExpandedContent
          rowId={rowId}
          rowData={row.original}
          config={rowExpansionConfig}
          colSpan={totalColumns}
        />
      )}
    </Fragment>
  );
};

export const TableDataRow = memo(TableDataRowComponent, (prev, next) => {
  const keys: (keyof DataRowProps)[] = [
    "isSelected",
    "isActive",
    "rowIsExpanded",
    "isEditingRow",
    "rowClass",
    "ColClassSignature",
    "rowsVersion",
    "row",
    "index",
  ];
  return keys.every(key => prev[key] === next[key]);
});
