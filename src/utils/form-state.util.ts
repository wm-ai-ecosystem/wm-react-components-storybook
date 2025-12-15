/**
 * Form State Utility
 *
 * Handles form field registration and management within the widget context.
 * This utility provides centralized logic for registering form fields and form widgets
 * to their parent form context.
 */

import get from "lodash-es/get";

/**
 * Interface for widget properties related to form field registration
 */
interface FormFieldWidget {
  name?: string;
  formName?: string;
  field?: string;
  fieldName?: string;
  formKey?: string;
  [key: string]: any;
}

/**
 * Interface for the context structure where form fields are registered
 */
interface WidgetsContext {
  [formName: string]: {
    formfields?: Record<string, any>;
    formWidgets?: Record<string, any>;
    [key: string]: any;
  };
}

/**
 * Checks if a widget is a form field (not a formWidget wrapper)
 * @param widgetName - The name of the widget
 * @returns true if the widget is NOT a formWidget wrapper
 */
const isFormField = (widgetName?: string): boolean => {
  return !widgetName?.includes("formWidget");
};

/**
 * Checks if a widget should be registered as a form field
 * @param widget - The widget object to check
 * @returns true if the widget should be registered as a form field
 */
export const shouldRegisterFormField = (widget: FormFieldWidget): boolean => {
  const isField = get(widget, "field", "false") === "true";
  const hasFormName = Boolean(widget.formName);
  const isNotFormWidget = isFormField(widget.name);

  return isField && hasFormName && isNotFormWidget;
};

/**
 * Registers a form field widget with its parent form in the context
 * This creates references in both formfields and formWidgets collections
 *
 * @param widgetsContext - The Widgets context object where forms are stored
 * @param widget - The widget/proxy to register
 * @param widgetProps - The widget properties containing form metadata
 */
export const registerFormField = (
  widgetsContext: WidgetsContext,
  widget: any,
  widgetProps: FormFieldWidget
): void => {
  const formName = widgetProps?.formName;

  if (!formName || !shouldRegisterFormField(widgetProps)) {
    return;
  }

  const formKey = widgetProps.formKey || widgetProps.fieldName;
  const fieldName = widgetProps.fieldName;

  if (!formKey || !fieldName) {
    return;
  }

  // Ensure the form structure exists in the context
  if (!widgetsContext[formName]) {
    return;
  }

  widgetsContext[formName].formfields = widgetsContext[formName].formfields || {};
  widgetsContext[formName].formWidgets = widgetsContext[formName].formWidgets || {};

  // Register the field using the formKey (primary key)
  widgetsContext[formName].formfields[formKey] = widget;

  // Register using fieldName for direct access
  widgetsContext[formName].formWidgets[fieldName] = widget;

  // Register formWidget variants (for form field wrapper components)
  widgetsContext[formName].formfields[`${fieldName}_formWidget`] = widget;
  widgetsContext[formName].formWidgets[`${fieldName}_formWidget`] = widget;
};

/**
 * Ensures the form structure exists in the widgets context and registers a form field
 * with safe object spreading to merge properties
 *
 * @param widgetsContext - The Widgets context object where forms are stored
 * @param fieldProps - The field properties to register
 */
export const registerFormFieldSafe = (
  widgetsContext: WidgetsContext,
  fieldProps: FormFieldWidget
): void => {
  const formName = fieldProps?.formName;

  if (!formName || !shouldRegisterFormField(fieldProps)) {
    return;
  }

  const formKey = fieldProps.formKey || fieldProps.fieldName;
  const fieldName = fieldProps.fieldName;

  if (!formKey || !fieldName) {
    return;
  }

  // ✅ Ensure all nested structures exist using nullish coalescing
  widgetsContext[formName] ??= {};
  widgetsContext[formName].formfields ??= {};
  widgetsContext[formName].formWidgets ??= {};

  // ✅ Only add if not already present
  widgetsContext[formName].formfields[formKey] = {
    ...fieldProps,
  };

  widgetsContext[formName].formWidgets[fieldName] = {
    ...fieldProps,
  };
  widgetsContext[formName].formfields[`${fieldName}_formWidget`] = {
    ...fieldProps,
  };

  widgetsContext[formName].formWidgets[`${fieldName}_formWidget`] = {
    ...fieldProps,
  };
};

/**
 * Unregisters a form field from its parent form
 *
 * @param widgetsContext - The Widgets context object where forms are stored
 * @param formName - The name of the parent form
 * @param fieldName - The name of the field to unregister
 * @param formKey - Optional form key (defaults to fieldName if not provided)
 */
export const unregisterFormField = (
  widgetsContext: WidgetsContext,
  formName: string,
  fieldName: string,
  formKey?: string
): void => {
  if (!widgetsContext[formName]) {
    return;
  }

  const keyToRemove = formKey || fieldName;

  // Remove from formfields
  if (widgetsContext[formName].formfields) {
    delete widgetsContext[formName].formfields[keyToRemove];
    delete widgetsContext[formName].formfields[`${fieldName}_formWidget`];
  }

  // Remove from formWidgets
  if (widgetsContext[formName].formWidgets) {
    delete widgetsContext[formName].formWidgets[fieldName];
    delete widgetsContext[formName].formWidgets[`${fieldName}_formWidget`];
  }
};
