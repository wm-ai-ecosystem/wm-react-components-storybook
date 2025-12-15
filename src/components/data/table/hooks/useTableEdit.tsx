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

      // Cancel add new row if configured for this mode
      if (config.cancelsAddNewRowOnEdit && isAddingNewRow) {
        setIsAddingNewRow(false);
      }

      // Reset editing data and start fresh
      resetEditingData();
      setEditingRowId(rowId);
      editingRowDataRef.current = { ...rowData };
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
    ]
  );

  // Cancel editing function
  const cancelEditing = useCallback(() => {
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
    resetValidationState,
    setEditingRowId,
    setIsAddingNewRow,
    incrementSessionKey,
    resetEditingData,
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

      // Get original row data
      const originalRow =
        !isNewRow && rowId ? internalDataset.find(row => row._wmTableRowId === rowId) : null;
      const currentEditingData = rowDataRef.current;

      // For existing rows, check if there are any changes
      if (!isNewRow && rowId && originalRow) {
        const hasChanges = Object.keys(currentEditingData).some(
          key => currentEditingData[key] !== originalRow[key]
        );

        if (!hasChanges) {
          if (showToast) {
            showToast("No Changes Detected", "Info");
          }
          if (onSaveSuccess) {
            onSaveSuccess();
          }
          return true;
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
    [editMode, editingRowId, wmTableColumns, cellState]
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
            onKeyDown={config.hasKeyboardNavigation ? e => handleKeyDown(e, rowId) : undefined}
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
      ? (e: React.KeyboardEvent) => handleKeyDown(e, "new-row")
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
