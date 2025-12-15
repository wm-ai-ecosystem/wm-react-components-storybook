import { FormFieldMetadata, APIFieldResponse, WidgetType } from "./props";

// Widget type mapping from API types to component types
const API_TYPE_TO_WIDGET_MAP: Record<string, WidgetType> = {
  text: "text",
  string: "text",
  email: "text",
  password: "text",
  textarea: "textarea",
  number: "number",
  integer: "number",
  decimal: "number",
  float: "number",
  currency: "currency",
  select: "select",
  dropdown: "select",
  choice: "select",
  radio: "radioset",
  radioset: "radioset",
  checkbox: "checkbox",
  checkboxset: "checkboxset",
  switch: "switch",
  toggle: "switch",
  slider: "slider",
  range: "slider",
  rating: "rating",
  date: "date",
  datetime: "datetime",
  time: "time",
  color: "colorpicker",
  file: "fileupload",
  upload: "fileupload",
  chips: "chips",
  tags: "chips",
  calendar: "calendar",
};

/**
 * Transform API response fields to FormFieldMetadata
 */
export const transformAPIResponse = (apiFields: APIFieldResponse[]): FormFieldMetadata[] => {
  return apiFields.map(field => transformSingleField(field));
};

/**
 * Transform a single API field to FormFieldMetadata
 */
export const transformSingleField = (apiField: APIFieldResponse): FormFieldMetadata => {
  const widget = API_TYPE_TO_WIDGET_MAP[apiField.type.toLowerCase()] || "text";

  const formField: FormFieldMetadata = {
    name: apiField.name,
    widget,
    label: apiField.label || apiField.name,
    placeholder: apiField.placeholder,
    required: apiField.required || false,
    datavalue: apiField.value || apiField.defaultvalue,
    defaultvalue: apiField.defaultvalue,
  };

  // Handle validation properties
  if (apiField.validation) {
    const { validation } = apiField;
    if (validation.maxLength) formField.maxchars = validation.maxLength;
    if (validation.minLength) formField.minchars = validation.minLength;
    if (validation.min) formField.minvalue = validation.min;
    if (validation.max) formField.maxvalue = validation.max;
    if (validation.pattern) formField.regexp = validation.pattern;
  }

  // Handle select/choice fields
  if (widget === "select" || widget === "radioset" || widget === "checkboxset") {
    if (apiField.options) {
      formField.dataset = apiField.options.map(option => ({
        key: option.value,
        value: option.label,
        ...option,
      }));
      formField.datafield = "key";
      formField.displayfield = "value";
    }
  }

  // Copy any additional properties
  Object.keys(apiField).forEach(key => {
    if (
      !formField.hasOwnProperty(key) &&
      key !== "type" &&
      key !== "validation" &&
      key !== "options"
    ) {
      formField[key] = apiField[key];
    }
  });

  return formField;
};

/**
 * Validate a form field value
 */
export const validateField = (field: FormFieldMetadata, value: any): string | null => {
  // Required field validation
  if (field.required && (value === null || value === undefined || value === "")) {
    return `${field.label || field.name} is required`;
  }

  // Skip other validations if value is empty and field is not required
  if (value === null || value === undefined || value === "") {
    return null;
  }

  // String length validation
  if (typeof value === "string") {
    if (field.maxchars && value.length > field.maxchars) {
      return `${field.label || field.name} must not exceed ${field.maxchars} characters`;
    }
    if (field.minchars && value.length < field.minchars) {
      return `${field.label || field.name} must be at least ${field.minchars} characters`;
    }
  }

  // Number validation
  if (field.widget === "number" && typeof value === "number") {
    if (field.minvalue !== undefined && value < field.minvalue) {
      return `${field.label || field.name} must be at least ${field.minvalue}`;
    }
    if (field.maxvalue !== undefined && value > field.maxvalue) {
      return `${field.label || field.name} must not exceed ${field.maxvalue}`;
    }
  }

  // Regex validation
  if (field.regexp && typeof value === "string") {
    const regex = new RegExp(field.regexp);
    if (!regex.test(value)) {
      return field.regexpmessage || `${field.label || field.name} format is invalid`;
    }
  }

  return null;
};

/**
 * Validate all fields in a form
 */
export const validateForm = (
  fields: FormFieldMetadata[],
  formData: Record<string, any>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  fields.forEach(field => {
    const error = validateField(field, formData[field.name]);
    if (error) {
      errors[field.name] = error;
    }
  });

  return errors;
};

/**
 * Get form data values from fields
 */
export const getFormData = (fields: FormFieldMetadata[]): Record<string, any> => {
  const data: Record<string, any> = {};

  fields.forEach(field => {
    data[field.name] = field.datavalue || field.defaultvalue || "";
  });

  return data;
};

/**
 * Update a field's value in the fields array
 */
export const updateFieldValue = (
  fields: FormFieldMetadata[],
  fieldName: string,
  value: any
): FormFieldMetadata[] => {
  return fields.map(field => (field.name === fieldName ? { ...field, datavalue: value } : field));
};

/**
 * Get field by name
 */
export const getFieldByName = (
  fields: FormFieldMetadata[],
  fieldName: string
): FormFieldMetadata | undefined => {
  return fields.find(field => field.name === fieldName);
};

/**
 * Check if form has any validation errors
 */
export const hasFormErrors = (
  fields: FormFieldMetadata[],
  formData: Record<string, any>
): boolean => {
  const errors = validateForm(fields, formData);
  return Object.keys(errors).length > 0;
};

/**
 * Create default field metadata
 */
export const createDefaultField = (
  name: string,
  widget: WidgetType = "text"
): FormFieldMetadata => ({
  name,
  widget,
  label: name.charAt(0).toUpperCase() + name.slice(1),
  required: false,
  datavalue: "",
});

/**
 * Sort fields by a given property
 */
export const sortFields = (
  fields: FormFieldMetadata[],
  sortBy: keyof FormFieldMetadata = "name"
): FormFieldMetadata[] => {
  return [...fields].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal);
    }
    return String(aVal).localeCompare(String(bVal));
  });
};

/**
 * Filter fields by widget type
 */
export const filterFieldsByWidget = (
  fields: FormFieldMetadata[],
  widgetTypes: WidgetType[]
): FormFieldMetadata[] => {
  return fields.filter(field => widgetTypes.includes(field.widget));
};
