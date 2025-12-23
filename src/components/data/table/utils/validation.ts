import { RefObject } from "react";
import { forEach, entries, keys } from "lodash-es";
import { WmTableColumnProps, FieldValidationState } from "../props";

/**
 * Validates a single field and updates validation state
 */
export const validateField = (
  rowId: string,
  fieldName: string,
  value: any,
  column: WmTableColumnProps | undefined,
  validationState: FieldValidationState
): boolean => {
  const fieldKey = `${rowId}_${fieldName}`;
  const { fieldRefs, fieldValidationErrors, cellUpdateCallbacks } = validationState;

  if (!column?.required) return true;

  // Check required validation
  if (column?.required && (value === undefined || value === null || value === "")) {
    fieldValidationErrors.current[fieldKey] = true;
    cellUpdateCallbacks.current[fieldKey]?.();
    return false;
  }

  // Check HTML5 validation
  const fieldElement = fieldRefs.current[fieldKey];
  if (fieldElement) {
    const input = fieldElement.querySelector("input, textarea, select") as HTMLInputElement;
    if (input && !input.validity.valid) {
      fieldValidationErrors.current[fieldKey] = true;
      cellUpdateCallbacks.current[fieldKey]?.();
      return false;
    }
  }

  // Mark as valid
  fieldValidationErrors.current[fieldKey] = false;
  cellUpdateCallbacks.current[fieldKey]?.();
  return true;
};

/**
 * Resets validation state for specific context
 */
export const resetValidationState = (
  context: "editing" | "new-row" | "all" | undefined,
  editingRowId: string | null,
  validationState: FieldValidationState
) => {
  const { fieldRefs, fieldValidationErrors, cellUpdateCallbacks } = validationState;

  if (context === "editing" && editingRowId) {
    // Clear only editing row fields
    forEach(keys(fieldRefs.current), key => {
      if (key.startsWith(`${editingRowId}_`)) {
        delete fieldRefs.current[key];
        delete fieldValidationErrors.current[key];
        delete cellUpdateCallbacks.current[key];
      }
    });
  } else if (context === "new-row") {
    // Clear only new row fields
    forEach(keys(fieldRefs.current), key => {
      if (key.startsWith("new-row_")) {
        delete fieldRefs.current[key];
        delete fieldValidationErrors.current[key];
        delete cellUpdateCallbacks.current[key];
      }
    });
  } else {
    // Clear all
    forEach(keys(fieldRefs.current), key => {
      delete fieldRefs.current[key];
    });
    fieldValidationErrors.current = {};
    cellUpdateCallbacks.current = {};
  }
};

/**
 * Updates validation errors for fields based on validation results
 */
export const updateValidationErrors = (
  validationResult: any,
  relevantFieldRefs: Record<string, HTMLElement | null>,
  validationState: FieldValidationState
) => {
  const { fieldValidationErrors, cellUpdateCallbacks } = validationState;

  // Initialize all fields as valid
  const errors: Record<string, boolean> = {};
  forEach(keys(relevantFieldRefs), fieldKey => {
    errors[fieldKey] = false;
  });

  // If we have the invalidFieldKeys property, use it directly
  if (validationResult.invalidFieldKeys && validationResult.invalidFieldKeys.length > 0) {
    forEach(validationResult.invalidFieldKeys, (fieldKey: string) => {
      errors[fieldKey] = true;
    });
  } else {
    // Fallback to the previous method using invalidElements
    validationResult.invalidElements.forEach((invalidElement: HTMLElement) => {
      forEach(entries(relevantFieldRefs), ([fieldKey, fieldElement]) => {
        if (fieldElement === invalidElement || fieldElement?.contains(invalidElement)) {
          errors[fieldKey] = true;
        }
      });
    });
  }

  // Update validation errors for each field key
  forEach(entries(errors), ([fieldKey, hasError]) => {
    if (fieldValidationErrors.current[fieldKey] !== hasError) {
      fieldValidationErrors.current[fieldKey] = hasError;
      cellUpdateCallbacks.current[fieldKey]?.();
    }
  });
};
