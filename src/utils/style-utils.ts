/**
 * Utility functions for CSS style handling and validation
 */

/**
 * Validates and sanitizes a style object to ensure it contains only valid CSS properties
 * @param styleObj - The style object to sanitize
 * @returns A sanitized style object with only valid CSS properties
 */
export const sanitizeStyleObject = (styleObj: any): Record<string, any> => {
  if (!styleObj || typeof styleObj !== "object") {
    return {};
  }

  // Filter out invalid CSS properties and values
  const validStyles: Record<string, any> = {};
  Object.entries(styleObj).forEach(([key, value]) => {
    // Skip if key is not a string or value is null/undefined
    if (typeof key === "string" && value != null) {
      // Convert camelCase to kebab-case for CSS properties if needed
      // and ensure the value is a valid CSS value
      if (typeof value === "string" || typeof value === "number") {
        validStyles[key] = value;
      }
    }
  });

  return validStyles;
};

/**
 * Merges multiple style objects safely, sanitizing each one
 * @param styleObjects - Array of style objects to merge
 * @returns A merged and sanitized style object
 */
export const mergeStyleObjects = (...styleObjects: any[]): Record<string, any> => {
  const sanitizedStyles = styleObjects.map(sanitizeStyleObject);
  return Object.assign({}, ...sanitizedStyles);
};

/**
 * Validates if a value is a valid CSS style object
 * @param value - The value to check
 * @returns True if the value is a valid style object
 */
export const isValidStyleObject = (value: any): boolean => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  // Check if all keys are strings and values are valid CSS values
  return Object.entries(value).every(
    ([key, val]) =>
      typeof key === "string" && val != null && (typeof val === "string" || typeof val === "number")
  );
};
