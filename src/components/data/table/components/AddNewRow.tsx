import React, { ReactElement } from "react";
import { TableRow, TableCell, Box } from "@mui/material";
import clsx from "clsx";
import { filter } from "lodash-es";
import { WmTableColumnProps, AddNewRowProps, TableEditMode } from "../props";
import WmTableRowAction from "../table-row-action";

// Helper function to create empty cells
const createEmptyCell = (key: string, className: string = "text-center"): ReactElement => (
  <TableCell key={key}>
    <Box className={className}>{/* Empty cell placeholder */}</Box>
  </TableCell>
);

// Helper function to create action buttons
const createActionButton = (
  key: string,
  name: string,
  actionKey: string,
  title: string,
  iconClass: string,
  onClick: () => void,
  listener: any
): ReactElement => (
  <WmTableRowAction
    key={key}
    name={name}
    className={`${actionKey === "acceptNew" ? "save" : "cancel"} row-action-button btn app-button btn-transparent ${name}-button`}
    data-action-key={actionKey}
    displayName=""
    title={title}
    iconclass={iconClass}
    action={actionKey === "acceptNew" ? "save" : "cancel"}
    row={{}}
    rowIndex={-1}
    listener={listener}
    show={true}
    onClick={event => {
      event?.preventDefault();
      event?.stopPropagation();
      onClick();
    }}
  />
);

// Helper function to create action buttons cell
const createActionButtonsCell = (
  key: string,
  editMode: TableEditMode,
  onSave: () => void,
  onCancel: () => void,
  listener: any
): ReactElement => (
  <TableCell key={key}>
    <Box component="span" className="actions-column">
      {editMode === "inline" ? (
        // Show save/cancel buttons for inline edit
        <>
          {createActionButton(
            "accept-new",
            "accept-new-row",
            "acceptNew",
            "Save",
            "wi wi-done",
            onSave,
            listener
          )}
          {createActionButton(
            "cancel-new",
            "cancel-new-row",
            "cancelNew",
            "Cancel",
            "wi wi-cancel",
            onCancel,
            listener
          )}
        </>
      ) : // No actions for quick edit mode
      null}
    </Box>
  </TableCell>
);

export const AddNewRow: React.FC<AddNewRowProps> = ({
  isAddingNewRow,
  editMode,
  wmTableColumns,
  rowActions,
  showrowindex,
  radioselect = false,
  multiselect = false,
  sessionKey,
  editingRowData,
  renderEditableCell,
  onKeyDown,
  handleSave: onSave,
  handleCancel: onCancel,
  listener,
  hasRowExpansion = false,
  expansionPosition = 0,
}) => {
  if (!isAddingNewRow || (editMode !== "inline" && editMode !== "quickedit")) {
    return null;
  }

  const rowKey = editMode === "quickedit" ? "quick-edit-new-row" : "add-new-row";

  // Filter visible columns and separate manual action column
  const allVisibleColumns = filter(
    wmTableColumns,
    col => col.show !== false
  ) as WmTableColumnProps[];
  const manualActionColumn = allVisibleColumns.find(col => col.binding === "rowOperations");
  const visibleColumns = allVisibleColumns.filter(col => col.binding !== "rowOperations");

  // Calculate total columns including system columns
  const totalCells = [];

  // Add selection column
  if (radioselect || multiselect) {
    totalCells.push(createEmptyCell(`${rowKey}-selection`));
  }

  // Add row index column
  if (showrowindex) {
    totalCells.push(createEmptyCell(`${rowKey}-index`));
  }

  // Add manual action column if positioned at 0
  if (manualActionColumn && manualActionColumn.rowactionsposition === 0) {
    totalCells.push(
      createActionButtonsCell(`${rowKey}-manual-actions`, editMode, onSave, onCancel, listener)
    );
  }

  // Calculate expansion cell position
  const dataColumnStartIndex = totalCells.length;
  const calculateExpansionIndex = () => {
    if (!hasRowExpansion) return -1;

    // Handle numeric positions
    if (typeof expansionPosition === "number" || !isNaN(Number(expansionPosition))) {
      return dataColumnStartIndex + Number(expansionPosition);
    }
    // Handle -1 position (after all columns)
    else if (expansionPosition === "-1" || String(expansionPosition) === "-1") {
      return dataColumnStartIndex + visibleColumns.length;
    }
    // Handle column name positions
    else if (typeof expansionPosition === "string") {
      // For nested paths like "name.location.url", we need to match the exact field value
      const columnIndex = visibleColumns.findIndex(
        col => col.field === expansionPosition || col.binding === expansionPosition
      );
      // Place AFTER the named column
      return columnIndex >= 0 ? dataColumnStartIndex + columnIndex + 1 : dataColumnStartIndex;
    }
    // Default to beginning
    return dataColumnStartIndex;
  };
  const expansionInsertIndex = calculateExpansionIndex();

  // Add expansion cell at the beginning if it's positioned before all data columns
  let expansionCellAdded = false;
  if (hasRowExpansion && expansionInsertIndex === dataColumnStartIndex) {
    totalCells.push(createEmptyCell(`${rowKey}-expansion`));
    expansionCellAdded = true;
  }

  // Add data columns
  for (let index = 0; index < visibleColumns.length; index++) {
    const column = visibleColumns[index];
    const actualIndex = dataColumnStartIndex + index;

    // Insert expansion cell at calculated position
    if (hasRowExpansion && actualIndex === expansionInsertIndex && !expansionCellAdded) {
      totalCells.push(createEmptyCell(`${rowKey}-expansion`));
      expansionCellAdded = true;
    }

    // Insert manual action column if positioned at this index
    if (
      manualActionColumn &&
      manualActionColumn.rowactionsposition !== undefined &&
      manualActionColumn.rowactionsposition !== 0 &&
      Number(manualActionColumn.rowactionsposition) === index + 1
    ) {
      totalCells.push(
        createActionButtonsCell(`${rowKey}-manual-actions`, editMode, onSave, onCancel, listener)
      );
    }

    const fieldName = String(column.field || `field_${index}`);
    const widgetType = String(column.editWidgetType || "WmText");
    const editValue = editingRowData[fieldName] ?? column.defaultvalue ?? "";

    totalCells.push(
      <TableCell
        key={`new-row-${fieldName}`}
        className={clsx("app-datagrid-cell cell-editing form-group", {
          "required-field": column.required,
        })}
      >
        {column.readonly ? (
          <></>
        ) : (
          renderEditableCell(column, fieldName, widgetType, editValue, "new-row")
        )}
      </TableCell>
    );
  }

  // Add expansion cell at the end if it's positioned after all data columns
  if (
    hasRowExpansion &&
    expansionInsertIndex === dataColumnStartIndex + visibleColumns.length &&
    !expansionCellAdded
  ) {
    totalCells.push(createEmptyCell(`${rowKey}-expansion`));
  }

  // Add manual action column at the end if not already added
  if (
    manualActionColumn &&
    (manualActionColumn.rowactionsposition === undefined ||
      manualActionColumn.rowactionsposition === -1 ||
      Number(manualActionColumn.rowactionsposition) > visibleColumns.length)
  ) {
    totalCells.push(
      createActionButtonsCell(`${rowKey}-manual-actions`, editMode, onSave, onCancel, listener)
    );
  }

  // Add default actions column if no manual action column
  if (!manualActionColumn && rowActions.length > 0) {
    totalCells.push(
      createActionButtonsCell(`${rowKey}-actions`, editMode, onSave, onCancel, listener)
    );
  }

  return (
    <TableRow className="add-new-row" key={rowKey}>
      {totalCells}
    </TableRow>
  );
};
