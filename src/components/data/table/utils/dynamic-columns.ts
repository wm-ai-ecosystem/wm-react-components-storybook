import { startCase } from "lodash-es";
import { WmTableColumnProps } from "../props";
import { createDefaultColumnProps } from "./columnBuilder";
import { DYNAMIC_COLUMNS_CONFIG } from "./constants";
import { INTERNAL_PROPERTIES } from "./index";

/**
 * List of internal WaveMaker field prefixes that should be excluded
 * from dynamic column generation
 */
const INTERNAL_FIELD_PATTERNS = [
  "_wm", // All fields starting with _wm (like _wmTableRowId, _wmListItemId, etc.)
  "__", // Double underscore fields (system fields)
];

/**
 * Check if a field should be excluded from dynamic column generation
 * Combines existing INTERNAL_PROPERTIES with pattern-based detection
 * @param fieldName - The field name to check
 * @returns true if the field should be excluded
 */
export const isInternalField = (fieldName: string): boolean => {
  // Check exact matches from INTERNAL_PROPERTIES
  if (INTERNAL_PROPERTIES.includes(fieldName)) {
    return true;
  }

  // Check pattern-based exclusions
  return INTERNAL_FIELD_PATTERNS.some(pattern => fieldName.startsWith(pattern));
};

/**
 * Infer column type from data value
 */
const inferColumnType = (value: any): string => {
  if (value === null || value === undefined) {
    return "string";
  }

  if (typeof value === "number") {
    return "number";
  }

  if (typeof value === "boolean") {
    return "boolean";
  }

  if (value instanceof Date) {
    return "date";
  }

  if (typeof value === "string") {
    // Check if it looks like a date
    if (!isNaN(Date.parse(value)) && value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return "date";
    }
    // Check if it looks like a number
    if (!isNaN(Number(value)) && value.trim() !== "") {
      return "number";
    }
  }

  return "string";
};

/**
 * Generate column definitions from data array
 * Similar to Angular's prepareFieldDefs function
 */
export const generateColumnsFromData = (data: any[]): WmTableColumnProps[] => {
  if (!data || data.length === 0) {
    return [];
  }

  // Get all unique keys from the first few rows to handle sparse data
  const allKeys = new Set<string>();
  const sampleSize = Math.min(DYNAMIC_COLUMNS_CONFIG.sampleSize, data.length);

  for (let i = 0; i < sampleSize; i++) {
    if (data[i] && typeof data[i] === "object") {
      Object.keys(data[i]).forEach(key => {
        // Only add non-internal fields
        if (!isInternalField(key)) {
          allKeys.add(key);
        }
      });
    }
  }

  const keys = Array.from(allKeys).slice(0, DYNAMIC_COLUMNS_CONFIG.maxColumns);

  if (keys.length === 0) {
    return [];
  }

  // Generate column definitions using existing utility functions
  const columns: WmTableColumnProps[] = keys.map((key, index) => {
    const firstNonNullValue = data.find(
      row => row && row[key] !== null && row[key] !== undefined
    )?.[key];
    const inferredType = inferColumnType(firstNonNullValue);
    const displayName = startCase(key); // Convert snake_case/kebab-case to Title Case

    // Create column using the existing utility function
    return createDefaultColumnProps(key, displayName, inferredType, index);
  });

  return columns;
};

/**
 * Check if data is valid for column generation
 */
export const isValidDataForColumns = (data: any[]): boolean => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.some(row => row && typeof row === "object" && Object.keys(row).length > 0)
  );
};
