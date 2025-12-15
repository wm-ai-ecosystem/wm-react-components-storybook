import React, { useCallback, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Box } from "@mui/material";
import { filter, map } from "lodash-es";
import { getActionButtonClass, parseWidth } from "../utils";
import { renderDisplayCell } from "../utils/renderDisplayCell";
import {
  createRowIndexColumn,
  createDataColumns,
  createEditingActionButtons,
  getActionColumnSize,
} from "../utils/columnBuilder";
import { distributeColumnWidths } from "../utils/columnWidthDistribution";
import { useResponsiveColumns } from "./useResponsiveColumns";
import WmTableRowAction from "../table-row-action";
import {
  UseTableColumnsProps,
  UseTableColumnsReturn,
  WmTableColumnProps,
  WmTableRowActionProps,
} from "../props";

// Extract action button rendering to reduce re-renders
const ActionButton = React.memo<{
  action: WmTableRowActionProps;
  index: number;
  rowData: any;
  rowIndex: number;
  rowId: string;
  listener?: any;
}>(({ action, index, rowData, rowIndex, rowId, listener }) => {
  const actionKey = action.key || action.name;
  const btnClass = getActionButtonClass(action);

  return (
    <WmTableRowAction
      key={`row-action-${index}-${actionKey}`}
      name={action.name || `table-row-action-${index}-${actionKey}`}
      className={btnClass}
      data-action-key={actionKey}
      displayName={action["displayName"] || ""}
      title={action.title}
      iconclass={action.iconclass}
      action={action.action}
      row={rowData}
      rowIndex={rowIndex}
      listener={listener}
      show={action.show}
      onClick={action.onClick}
      widgettype={action.widgettype}
    />
  );
});

ActionButton.displayName = "ActionButton";

// Extract editing action buttons
const EditingActionButtons = React.memo<{
  onSave: () => void;
  onCancel: () => void;
  rowData: any;
  rowIndex: number;
  listener?: any;
}>(({ onSave, onCancel, rowData, rowIndex, listener }) => {
  const buttons = createEditingActionButtons();

  return (
    <>
      {buttons.map(button => (
        <WmTableRowAction
          key={button.key}
          name={button.name}
          className={button.className}
          data-action-key={button.dataActionKey}
          displayName={button.displayName}
          title={button.title}
          iconclass={button.iconclass}
          action={button.action}
          row={rowData}
          rowIndex={rowIndex}
          listener={listener}
          show={button.show}
          onClick={(event?: React.MouseEvent<HTMLElement>, widget?: Record<string, any>) => {
            event?.preventDefault();
            event?.stopPropagation();
            button.key === "save-edit" ? onSave() : onCancel();
          }}
          widgettype={button.widgettype}
        />
      ))}
    </>
  );
});

EditingActionButtons.displayName = "EditingActionButtons";

export const useTableColumns = ({
  wmTableColumns,
  rowActions,
  listener,
  deleteRecord,
  showrowindex,
  editmode,
  renderEditableCell,
  isRowEditing,
  startEditing,
  cancelEditing,
  saveEditing,
  cellState,
  isResizing,
}: UseTableColumnsProps): UseTableColumnsReturn => {
  // Filter columns based on viewport
  const visibleColumns = useResponsiveColumns(wmTableColumns);

  // Memoize the cell render function to prevent re-renders
  const renderCell = useCallback(
    (wmColumn: WmTableColumnProps, row: any) => {
      const rowId = row.original._wmTableRowId || row.id;

      return (
        <Box data-col-identifier={wmColumn.field}>
          {(editmode === "inline" || editmode === "quickedit") &&
          isRowEditing(rowId) &&
          !wmColumn.readonly
            ? renderEditableCell(wmColumn, row.original, rowId)
            : renderDisplayCell(wmColumn, row.original, listener, cellState)}
        </Box>
      );
    },
    [editmode, isRowEditing, renderEditableCell, cellState, listener]
  );

  // Filter row actions once
  const filteredRowActions = useMemo(() => {
    if (editmode === "quickedit") {
      return filter(rowActions, action => action.key === "deleterow" || action.action === "delete");
    }
    return rowActions;
  }, [rowActions, editmode]);

  // Create action column cell renderer
  const renderActionCell = useCallback(
    ({ row }: any) => {
      const rowId = row.original._wmTableRowId || row.id;
      const isEditing = isRowEditing(rowId);

      return (
        <Box component="span" className="actions-column" data-identifier="actionButtons">
          {isEditing && editmode !== "quickedit" ? (
            <EditingActionButtons
              onSave={saveEditing}
              onCancel={cancelEditing}
              rowData={row.original}
              rowIndex={row.index}
              listener={listener}
            />
          ) : (
            map(filteredRowActions, (action: WmTableRowActionProps, index: number) => (
              <ActionButton
                key={`${row.id}-${index}`}
                action={action}
                index={index}
                rowData={row.original}
                rowIndex={row.index}
                rowId={rowId}
                listener={listener}
              />
            ))
          )}
        </Box>
      );
    },
    [isRowEditing, editmode, filteredRowActions, saveEditing, cancelEditing, listener]
  );

  // Create TanStack table column definitions
  const columns = useMemo<ColumnDef<any>[]>(() => {
    const columnDefs: ColumnDef<any>[] = [];

    // Separate manual action column (binding="rowOperations") from regular columns
    const manualActionColumn = visibleColumns.find(col => col.binding === "rowOperations");
    const dataColumns = visibleColumns.filter(col => col.binding !== "rowOperations");

    // Add row index column if showrowindex is true
    if (showrowindex) {
      columnDefs.push(createRowIndexColumn());
    }

    // Determine where to insert the actions column
    const insertActionColumn = () => {
      // If we have a manual action column, create a custom action column with its properties
      if (manualActionColumn) {
        const { size, minSize } = getActionColumnSize(editmode);

        // Extract width from manual action column styles or width prop
        let columnSize = size;
        if (manualActionColumn.width) {
          columnSize = parseInt(manualActionColumn.width);
        } else if (manualActionColumn.styles?.width) {
          columnSize = parseWidth(manualActionColumn.styles.width);
        }

        columnDefs.push({
          id: "actions",
          header: manualActionColumn.caption || "Actions",
          size: columnSize,
          minSize,
          enableResizing: true,
          cell: renderActionCell,
          enableSorting: manualActionColumn.sortable !== false,
          meta: {
            textAlign: manualActionColumn.textalignment,
            backgroundColor: manualActionColumn.backgroundcolor,
            className: manualActionColumn.colClass,
            ...manualActionColumn.styles,
          },
        });
      }
      // If no manual action column but we have row actions and editmode is not 'none'
      else if (rowActions.length > 0 && editmode !== "none") {
        const { size, minSize } = getActionColumnSize(editmode);
        columnDefs.push({
          id: "actions",
          header: "Actions",
          size,
          minSize,
          maxSize: size, // Fix the width for default action columns
          enableResizing: false, // Disable resizing for default action columns
          cell: renderActionCell,
        });
      }
    };

    // Handle action column positioning
    if (manualActionColumn || (rowActions.length > 0 && editmode !== "none")) {
      // For manual action column, use its rowactionsposition property
      const position =
        manualActionColumn?.rowactionsposition !== undefined
          ? Number(manualActionColumn.rowactionsposition)
          : -1;

      // Position 0 means right after system columns (row index, selection) but before data columns
      if (position === 0) {
        // Insert action column immediately after system columns
        insertActionColumn();
        // Then add all data columns
        columnDefs.push(...createDataColumns(dataColumns, renderCell));
      }
      // Positive position means insert at specific index among data columns
      else if (position > 0 && position <= dataColumns.length) {
        // Add data columns before position
        const columnsBeforePosition = dataColumns.slice(0, position);
        columnDefs.push(...createDataColumns(columnsBeforePosition, renderCell));

        // Insert action column
        insertActionColumn();

        // Add remaining data columns
        const columnsAfterPosition = dataColumns.slice(position);
        columnDefs.push(...createDataColumns(columnsAfterPosition, renderCell));
      }
      // Default or -1: add action column at the end
      else {
        // Add all data columns first
        columnDefs.push(...createDataColumns(dataColumns, renderCell));
        // Then add action column
        insertActionColumn();
      }
    } else {
      // No actions column needed, just add data columns
      columnDefs.push(...createDataColumns(dataColumns, renderCell));
    }

    // Apply equal width distribution for data columns without explicit widths
    // This ensures non-data columns (S.No, Actions, MultiSelect, RadioSelect) take minimum space
    // while data columns without explicit widths share the remaining space equally
    // Skip width distribution during active resizing to prevent infinite loops
    return isResizing ? columnDefs : distributeColumnWidths(columnDefs);
  }, [
    visibleColumns,
    rowActions,
    showrowindex,
    editmode,
    renderCell,
    renderActionCell,
    isResizing,
  ]);

  return {
    columns,
    wmTableColumns,
    rowActions,
  };
};
