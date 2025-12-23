import React, { useEffect, useRef, RefObject, useState } from "react";
import { Box } from "@mui/material";
import { TableEditMode, WmTableColumnProps, EditableCellProps } from "../props";
import { FieldValidationError } from "./FieldValidationError";

export const EditableCell: React.FC<EditableCellProps> = ({
  column,
  rowData,
  rowId,
  fieldName,
  widgetType,
  editValue,
  fieldValidationErrorsRef,
  cellUpdateCallbacksRef,
  fieldRefs,
  renderFormWidget,
  updateFieldValue,
  sessionKey = 0,
  onKeyDown,
  editMode = "inline",
}) => {
  const cellRef = useRef<HTMLDivElement | null>(null);
  const [, setForceUpdate] = useState(0);

  // Generate a unique field key for validation tracking
  const fieldKey = `${rowId}_${fieldName}`;

  // Create a ref callback to register the cell element for validation
  const cellRefCallback = (element: HTMLDivElement | null) => {
    cellRef.current = element;
    if (element && fieldRefs.current) {
      fieldRefs.current[fieldKey] = element;
    }
  };

  // Register a cell update callback to force re-render on validation state changes
  useEffect(() => {
    if (cellUpdateCallbacksRef.current) {
      cellUpdateCallbacksRef.current[fieldKey] = () => setForceUpdate(prev => prev + 1);
    }

    return () => {
      if (cellUpdateCallbacksRef.current) {
        delete cellUpdateCallbacksRef.current[fieldKey];
      }
    };
  }, [fieldKey, cellUpdateCallbacksRef]);

  // Determine if we should show validation error
  const showError = fieldValidationErrorsRef.current?.[fieldKey] === true;

  // Handle keyboard events for quick edit mode
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(e, rowId);
    }
  };

  return (
    <Box
      ref={cellRefCallback}
      onKeyDown={editMode === "quickedit" || editMode === "inline" ? handleKeyDown : undefined}
      data-field-name={fieldName}
      data-row-id={rowId}
    >
      {renderFormWidget(
        fieldName,
        widgetType,
        editValue,
        (newValue: any) => updateFieldValue(fieldName, newValue, rowId),
        {
          required: column.required,
          disabled: column.disabled,
          placeholder: column.placeholder,
          defaultvalue: column.defaultvalue,
          sessionKey: `${sessionKey}_${rowId}_${fieldName}`,
          rowData: rowData,
          column: column,
        }
      )}

      {showError && (
        <FieldValidationError
          showError={true}
          title={column.required ? "This field is required" : "Field validation failed"}
        />
      )}
    </Box>
  );
};

export default EditableCell;
