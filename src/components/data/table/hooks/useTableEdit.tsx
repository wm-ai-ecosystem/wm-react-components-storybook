import React, { useCallback, useRef, useEffect, ReactElement, RefObject } from "react";
import { find, forEach, entries, get } from "lodash-es";
import {
  TableEditMode,
  UseFormWidgetReturn,
  WmTableColumnProps,
  UseTableEditProps,
  UseTableEditReturn,
} from "../props";
import { EditableCell } from "../components";
import { AddNewRow } from "../components/AddNewRow";
import { validateEditingFields, TABLE_MESSAGES } from "../utils";
import { useEditingState } from "./useEditingState";
import {
  validateField,
  resetValidationState as resetValidation,
  updateValidationErrors,
} from "../utils/validation";
import { EditingStateConfig, FieldValidationState } from "../props";
import { handleServerOperation } from "../utils/crud-handlers";
import { useUpdateEditedCell, useEditedRowsContext } from "./use-edited-rows";

// Mode-specific behavior configurations
const MODE_CONFIGS: Record<TableEditMode, EditingStateConfig> = {
  inline: {
    showNewRowFormByDefault: false,
    startEditOnRowClick: false,
    hasKeyboardNavigation: false,
    cancelsAddNewRowOnEdit: true,
  },
  quickedit: {
    showNewRowFormByDefault: true,
    startEditOnRowClick: true,
    hasKeyboardNavigation: true,
    cancelsAddNewRowOnEdit: false,
  },
  dialog: {
    showNewRowFormByDefault: false,
    startEditOnRowClick: false,
    hasKeyboardNavigation: false,
    cancelsAddNewRowOnEdit: false,
  },
  form: {
    showNewRowFormByDefault: false,
    startEditOnRowClick: false,
    hasKeyboardNavigation: false,
    cancelsAddNewRowOnEdit: false,
  },
  none: {
    showNewRowFormByDefault: false,
    startEditOnRowClick: false,
    hasKeyboardNavigation: false,
    cancelsAddNewRowOnEdit: false,
  },
};

export const useTableEdit = ({
  editMode = "none",
  internalDataset,
  setInternalDataset,
  wmTableColumns,
  cellState,
  renderFormWidget,
  listener,
  onRowUpdate,
  onRowDelete,
  onNewRowAdded,
  showrowindex = false,
  radioselect = false,
  multiselect = false,
  rowActions = [],
  formposition = "bottom",
  insertmessage = TABLE_MESSAGES.insertSuccess,
  updatemessage = TABLE_MESSAGES.updateSuccess,
  errormessage = TABLE_MESSAGES.operationError,
  showToast,
  hasRowExpansion = false,
  expansionPosition = 0,
  datasource,
  binddataset,
  onSuccess,
  onError,
  onRowinsert,
  onRowupdate,
  tableRef,
  isServerSidePagination,
}: UseTableEditProps & {
  renderFormWidget: UseFormWidgetReturn["renderFormWidget"];
}): UseTableEditReturn => {
  const updateCell = useUpdateEditedCell();
  const { getEdits, removeRowEdits } = useEditedRowsContext();
  // Use the editing state hook
  const {
    editingRowId,
    isAddingNewRow,
    sessionKey,
    editingRowDataRef,
    newRowDataRef,
    setEditingRowId,
    setIsAddingNewRow,
    incrementSessionKey,
    resetEditingData,
    isRowEditing,
  } = useEditingState();

  // Validation refs
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const fieldValidationErrorsRef = useRef<Record<string, boolean>>({});
  const cellUpdateCallbacksRef = useRef<Record<string, () => void>>({});
  const originalRowDataRef = useRef<Record<string, any>>({});

  const validationState: FieldValidationState = {
    fieldRefs,
    fieldValidationErrors: fieldValidationErrorsRef,
    cellUpdateCallbacks: cellUpdateCallbacksRef,
  };

  // Get mode configuration
  const config = MODE_CONFIGS[editMode] || MODE_CONFIGS.none;

  // Reset validation state wrapper
  const resetValidationState = useCallback(
    (context?: "editing" | "new-row" | "all") => {
      resetValidation(context, editingRowId, validationState);
    },
    [editingRowId]
  );

  // Set default new row form visibility based on mode
  useEffect(() => {
    setIsAddingNewRow(config.showNewRowFormByDefault);
  }, [editMode, config.showNewRowFormByDefault, setIsAddingNewRow]);

  // Start editing function
  const startEditing = useCallback(
    (rowData: any, rowId: string) => {
      if (editMode === "none") {
        console.warn("Editing is not enabled. Set editmode to enable this feature.");
        return;
      }

      originalRowDataRef.current = { ...rowData };

      // Cancel add new row if configured for this mode
      if (config.cancelsAddNewRowOnEdit && isAddingNewRow) {
        setIsAddingNewRow(false);
      }

      // Reset editing data and start fresh
      resetEditingData();
      setEditingRowId(rowId);

      // Initialize with existing edits if available
      const existingEdits = getEdits(rowId) || {};
      editingRowDataRef.current = { ...rowData, ...existingEdits };

      resetValidationState(editMode === "quickedit" ? "all" : undefined);
      incrementSessionKey();
    },
    [
      editMode,
      config.cancelsAddNewRowOnEdit,
      isAddingNewRow,
      resetValidationState,
      setEditingRowId,
      setIsAddingNewRow,
      incrementSessionKey,
      resetEditingData,
      getEdits,
    ]
  );

  // Cancel editing function
  const cancelEditing = useCallback(() => {
    // Clear persisted edits for this row if we are cancelling
    if (editingRowId) {
      removeRowEdits(editingRowId);
      // Also clear cellState if it exists
      if (cellState) {
        // Note: cellState doesn't have a clearRow method exposed easily here without path iteration.
        // But removeRowEdits handles the EditedRowsContext which drives the view.
        // Ideally we should clear cellState too, but let's focus on the visual consistency first.
      }
    }

    setEditingRowId(null);

    // For inline mode, also cancel add new row
    if (editMode === "inline") {
      setIsAddingNewRow(false);
    }

    resetEditingData();

    // Reset validation based on mode
    resetValidationState(editMode === "quickedit" ? "all" : undefined);
    incrementSessionKey();
  }, [
    editMode,
    editingRowId,
    resetValidationState,
    setEditingRowId,
    setIsAddingNewRow,
    incrementSessionKey,
    resetEditingData,
    removeRowEdits,
    cellState,
  ]);

  // Generic save function that works for both edit modes
  const saveEditingInternal = useCallback(
    (
      rowId: string | null,
      isNewRow: boolean,
      rowDataRef: RefObject<Record<string, any>>,
      onSaveSuccess?: () => void
    ): boolean => {
      const currentRowId = rowId || (isNewRow ? "new-row" : null);
      if (!currentRowId) return false;

      // Capture value from active input element BEFORE blur
      // This is needed because inputs use updateon="blur" and save triggers on mousedown (before blur)
      // The blur event handler runs async, so we need to read the DOM value directly
      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement) {
        // Get the field name from the closest editable cell container
        const editableCellContainer = activeElement.closest("[data-field-name]");
        if (editableCellContainer) {
          const fieldName = editableCellContainer.getAttribute("data-field-name");
          const inputValue = activeElement.value;

          // Update editingRowDataRef with the current DOM value
          if (fieldName && inputValue !== undefined) {
            rowDataRef.current = {
              ...rowDataRef.current,
              [fieldName]: inputValue,
            };
          }
        }

        // Now blur to clean up focus state
        if (activeElement.blur) {
          activeElement.blur();
        }
      }

      // Get current editing data
      const currentEditingData = rowDataRef.current;
      const originalData = originalRowDataRef.current;

      // Check if any changes were made (only for existing rows, not new rows)
      if (!isNewRow && originalData && currentEditingData) {
        const hasChanges = wmTableColumns.some(column => {
          if (!column.field || column.readonly) return false;
          const originalValue = get(originalData, column.field);
          const currentValue = get(currentEditingData, column.field);
          // Compare stringified values to handle type differences
          return String(originalValue ?? "") !== String(currentValue ?? "");
        });

        if (!hasChanges) {
          showToast?.("No changes detected", "Info");
          // Still close edit mode even if no changes - call onSaveSuccess to reset state
          if (onSaveSuccess) {
            if (rowId) {
              removeRowEdits(rowId);
            }
            onSaveSuccess();
          }
          return true; // Return true to indicate edit mode should close
        }
      }

      // Filter field refs to only include fields for the current row
      const relevantFieldRefs: Record<string, HTMLElement | null> = {};
      forEach(entries(fieldRefs.current), ([fieldKey, fieldElement]) => {
        if (fieldKey.startsWith(`${currentRowId}_`)) {
          relevantFieldRefs[fieldKey] = fieldElement;
        }
      });

      // Validate only the relevant fields
      const validationResult = validateEditingFields(relevantFieldRefs, currentRowId);
      if (!validationResult.isValid) {
        updateValidationErrors(validationResult, relevantFieldRefs, validationState);
        return false;
      }

      // Handle server insert and update operation
      handleServerOperation({
        isNewRow,
        rowId,
        currentEditingData,
        wmTableColumns,
        datasource: datasource,
        binddataset,
        setInternalDataset,
        onNewRowAdded,
        onRowUpdate,
        showToast,
        onSuccess,
        onError,
        onRowinsert,
        onRowupdate,
        insertmessage,
        updatemessage,
        errormessage,
        tableInstance: tableRef?.current,
        isServerSidePagination,
      });

      if (onSaveSuccess) {
        // CLEAR EDITS ON SUCCESS
        if (rowId) {
          removeRowEdits(rowId);
        }
        onSaveSuccess();
      }

      return true;
    },
    [
      internalDataset,
      wmTableColumns,
      datasource,
      binddataset,
      setInternalDataset,
      onNewRowAdded,
      onRowUpdate,
      showToast,
      onSuccess,
      onError,
      onRowinsert,
      onRowupdate,
      insertmessage,
      updatemessage,
      errormessage,
      removeRowEdits,
    ]
  );

  // Save editing function
  const saveEditing = useCallback(() => {
    const isNewRow = editMode === "inline" ? isAddingNewRow : false;
    const rowId = editingRowId || (isNewRow ? "new-row" : null);
    const dataRef = editMode === "quickedit" && !editingRowId ? newRowDataRef : editingRowDataRef;

    const success = saveEditingInternal(rowId, isNewRow, dataRef, () => {
      // Reset editing state
      setEditingRowId(null);

      // For inline mode, reset add new row
      if (editMode === "inline") {
        setIsAddingNewRow(false);
      }

      resetEditingData();

      // Reset validation based on context
      resetValidationState(
        editMode === "quickedit" ? (editingRowId ? "editing" : "new-row") : undefined
      );
      incrementSessionKey();
    });

    return success;
  }, [
    editMode,
    editingRowId,
    isAddingNewRow,
    resetEditingData,
    resetValidationState,
    setEditingRowId,
    setIsAddingNewRow,
    incrementSessionKey,
    saveEditingInternal,
  ]);

  // Update field value function
  const updateFieldValue = useCallback(
    (fieldName: string, newValue: any, rowId?: string) => {
      // Determine the actual row ID from the passed parameter or context
      const effectiveRowId = rowId || editingRowId || "new-row";

      // Update cellState if available (for tracking changes without re-renders)
      if (cellState && effectiveRowId !== "new-row") {
        cellState.setValue(["cells", effectiveRowId, fieldName], newValue);
        updateCell(effectiveRowId, fieldName, newValue);
      }

      // FIX: Only update internalDataset for quickedit mode (real-time updates needed)
      // For inline mode, skip this to avoid re-renders - dataset will be updated on save
      if (editMode === "quickedit" && String(effectiveRowId) !== "new-row") {
        setInternalDataset((prev: any[]) => {
          return prev.map((row: any) => {
            // Match by ID
            if ((row._wmTableRowId || row.id) === effectiveRowId) {
              return { ...row, [fieldName]: newValue };
            }
            return row;
          });
        });
      }

      // In quickedit mode, check if this update is for the new row
      if (editMode === "quickedit" && effectiveRowId === "new-row") {
        // For quickedit new row, update newRowDataRef
        newRowDataRef.current = {
          ...newRowDataRef.current,
          [fieldName]: newValue,
        };

        const column = find(wmTableColumns, col => col.field === fieldName);
        validateField("new-row", fieldName, newValue, column, validationState);
      } else {
        // For all other cases (including editing existing rows), update editingRowDataRef
        editingRowDataRef.current = {
          ...editingRowDataRef.current,
          [fieldName]: newValue,
        };

        const column = find(wmTableColumns, col => col.field === fieldName);
        validateField(effectiveRowId, fieldName, newValue, column, validationState);
      }
    },
    [editMode, editingRowId, wmTableColumns, cellState, setInternalDataset]
  );

  // Save new row (for quickedit mode)
  const saveNewRow = useCallback(() => {
    const success = saveEditingInternal(null, true, newRowDataRef, () => {
      newRowDataRef.current = {};
      resetValidationState("new-row");
      incrementSessionKey();
    });

    return success;
  }, [resetValidationState, incrementSessionKey, saveEditingInternal]);

  // Handle keyboard events (for modes that support it)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, sourceRowId?: string) => {
      // Handle Enter key for inline mode as well (not just quickedit)
      if (editMode === "inline" && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        saveEditing();
        return;
      }

      // Handle Escape key for inline mode
      if (editMode === "inline" && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        cancelEditing();
        return;
      }

      if (!config.hasKeyboardNavigation || editMode !== "quickedit") return;

      // Determine if the event is from the new row
      const isFromNewRow = sourceRowId === "new-row";
      const isEditingRow = editingRowId !== null && !isFromNewRow;

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        isFromNewRow ? saveNewRow() : saveEditing();
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();

        if (isFromNewRow) {
          newRowDataRef.current = {};
          resetValidationState("new-row");
          incrementSessionKey();
        } else if (isEditingRow) {
          cancelEditing();
        }
      }
    },
    [
      config.hasKeyboardNavigation,
      editMode,
      editingRowId,
      saveNewRow,
      saveEditing,
      cancelEditing,
      resetValidationState,
      incrementSessionKey,
    ]
  );

  // Render editable cell
  const renderEditableCell = useCallback(
    (column: WmTableColumnProps, rowData: any, rowId: string): ReactElement => {
      const isEditing = isRowEditing(rowId);
      const fieldName = String(column.field || "");
      const widgetType = String(column.editWidgetType || "WmText");

      if (isEditing && editMode !== "none") {
        const editValue =
          get(editingRowDataRef.current, fieldName) !== undefined
            ? get(editingRowDataRef.current, fieldName)
            : get(rowData, fieldName);

        return (
          <EditableCell
            key={`edit-cell-${fieldName}-${sessionKey}`}
            column={column}
            rowData={rowData}
            rowId={rowId}
            fieldName={fieldName}
            widgetType={widgetType}
            editValue={editValue}
            fieldValidationErrorsRef={fieldValidationErrorsRef}
            cellUpdateCallbacksRef={cellUpdateCallbacksRef}
            fieldRefs={fieldRefs}
            renderFormWidget={renderFormWidget}
            updateFieldValue={updateFieldValue}
            sessionKey={sessionKey}
            onKeyDown={
              // FIX: Pass onKeyDown for both inline and quickedit modes
              // Inline mode now supports Enter/Escape keys
              editMode === "inline" || config.hasKeyboardNavigation
                ? (e: any) => handleKeyDown(e as React.KeyboardEvent, rowId)
                : undefined
            }
            editMode={editMode}
          />
        );
      }
      return <></>;
    },
    [
      isRowEditing,
      editMode,
      renderFormWidget,
      updateFieldValue,
      sessionKey,
      handleKeyDown,
      config.hasKeyboardNavigation,
    ]
  );

  // Handle row click
  const handleRowClick = useCallback(
    (rowData: any, rowId: string) => {
      if (!config.startEditOnRowClick) return;

      // If not editing this row, start editing
      if (!isRowEditing(rowId)) {
        startEditing(rowData, rowId);
      }
    },
    [config.startEditOnRowClick, isRowEditing, startEditing]
  );

  // Handle add new row click
  const handleAddNewRowClick = useCallback(() => {
    if (editMode !== "inline") {
      console.warn("Add new row is not available for this edit mode.");
      return;
    }

    // Cancel any existing editing
    if (editingRowId) {
      setEditingRowId(null);
    }

    // If already adding a new row, reset everything first
    if (isAddingNewRow) {
      setIsAddingNewRow(false);
      resetEditingData();
      resetValidationState();
    }

    // Initialize with default values
    const initialData: Record<string, any> = {};
    wmTableColumns.forEach(column => {
      if (
        column.defaultvalue !== undefined &&
        column.defaultvalue !== null &&
        column.defaultvalue !== ""
      ) {
        initialData[column.field] = column.defaultvalue;
      }
    });

    // Start new row operation
    setIsAddingNewRow(true);
    editingRowDataRef.current = initialData;
    resetValidationState();
    incrementSessionKey();
  }, [
    editMode,
    editingRowId,
    isAddingNewRow,
    wmTableColumns,
    resetValidationState,
    setEditingRowId,
    setIsAddingNewRow,
    incrementSessionKey,
    resetEditingData,
  ]);

  // Render add new row
  const renderAddNewRow = useCallback((): ReactElement | null => {
    const shouldShowNewRow =
      (editMode === "inline" && isAddingNewRow) ||
      (editMode === "quickedit" && config.showNewRowFormByDefault);

    if (!shouldShowNewRow) return null;

    // Determine which data ref to use
    const dataRef = editMode === "quickedit" ? newRowDataRef : editingRowDataRef;

    const onKeyDownHandler = config.hasKeyboardNavigation
      ? (e: any) => handleKeyDown(e as React.KeyboardEvent, "new-row")
      : undefined;

    // Wrapper function to render EditableCell
    const renderCell = (
      column: WmTableColumnProps,
      fieldName: string,
      widgetType: string,
      editValue: any,
      rowId: string
    ) => {
      return (
        <EditableCell
          key={`new-row-cell-${fieldName}-${sessionKey}`}
          column={column}
          rowData={{}}
          rowId={rowId}
          fieldName={fieldName}
          widgetType={widgetType}
          editValue={editValue}
          fieldValidationErrorsRef={fieldValidationErrorsRef}
          cellUpdateCallbacksRef={cellUpdateCallbacksRef}
          fieldRefs={fieldRefs}
          renderFormWidget={renderFormWidget}
          updateFieldValue={updateFieldValue}
          sessionKey={sessionKey}
          onKeyDown={onKeyDownHandler}
          editMode={editMode}
        />
      );
    };

    return (
      <AddNewRow
        isAddingNewRow={true}
        editMode={editMode}
        wmTableColumns={wmTableColumns}
        rowActions={rowActions}
        showrowindex={showrowindex}
        radioselect={radioselect}
        multiselect={multiselect}
        sessionKey={sessionKey}
        editingRowData={dataRef.current}
        renderEditableCell={renderCell}
        onKeyDown={onKeyDownHandler}
        handleSave={editMode === "quickedit" ? saveNewRow : saveEditing}
        handleCancel={() => {
          if (editMode === "quickedit") {
            newRowDataRef.current = {};
            resetValidationState("new-row");
            incrementSessionKey();
          } else {
            cancelEditing();
          }
        }}
        listener={listener}
        hasRowExpansion={hasRowExpansion}
        expansionPosition={expansionPosition}
      />
    );
  }, [
    editMode,
    isAddingNewRow,
    config.showNewRowFormByDefault,
    config.hasKeyboardNavigation,
    wmTableColumns,
    rowActions,
    showrowindex,
    radioselect,
    multiselect,
    renderFormWidget,
    updateFieldValue,
    handleKeyDown,
    saveNewRow,
    saveEditing,
    cancelEditing,
    resetValidationState,
    incrementSessionKey,
    listener,
    sessionKey,
    hasRowExpansion,
    expansionPosition,
  ]);

  return {
    editingRowId,
    editingRowData: editingRowDataRef.current,
    isRowEditing,
    startEditing,
    cancelEditing,
    saveEditing,
    updateFieldValue,
    renderEditableCell,
    handleRowClick,
    handleKeyDown,
    fieldRefs,
    isAddingNewRow,
    handleAddNewRowClick,
    renderAddNewRow,
  };
};
