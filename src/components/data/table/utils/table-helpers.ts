import {
  clearWidgetState,
  getWidgetState,
  setWidgetState,
  StorageType,
} from "@wavemaker/react-runtime/utils/state-persistance";
import { forEach } from "lodash-es";

// Type definition for search/filter item
export interface TableSearchFilter {
  field: string;
  value: string | number | boolean | null | undefined;
  matchMode: string;
  type: string;
}

// Type definition for filter field object format (for datasource)
export interface FilterFieldObject {
  value: string | number | boolean | null | undefined;
  logicalOp: string;
  matchMode: string;
  type?: string;
}

// Type definition for filter fields object (for datasource.invoke)
export type FilterFieldsObject = Record<string, FilterFieldObject>;

// Type definition for sort state
export interface TableSortState {
  field: string;
  direction: "asc" | "desc";
}

// Type definition for table state
export interface TableStateData {
  pagination: number;
  pagesize?: number; // Made optional for backward compatibility
  actualpagesize?: number;
  selectedItem: Array<{
    page: number;
    index: number; // Using index similar to List
  }>;
  search?: TableSearchFilter[]; // Search/filter state as array of filters
  sort?: TableSortState; // Sort state
}

/**
 * Save table state
 * @param name - Table widget name
 * @param storage - Storage type (session/local)
 * @param stateToSave - State object to save
 */
export const saveTableState = (
  name: string,
  storage: StorageType,
  stateToSave: Partial<TableStateData>
) => {
  // Simply save the provided state
  setWidgetState(
    {
      name,
      type: "table",
      storage,
    },
    stateToSave
  );
};

/**
 * Get table state from storage
 * @param name - Table widget name
 * @param storage - Storage type (session/local)
 * @returns Table state data or null
 */
export const getTableState = (name: string, storage: StorageType): TableStateData | null => {
  const state = getWidgetState({
    name,
    type: "table",
    storage,
  });

  return state as TableStateData;
};

/**
 * Clear table state from storage
 * @param name - Table widget name
 * @param storage - Storage type (session/local)
 */
export const clearTableState = (name: string, storage: StorageType) => {
  clearWidgetState({
    name,
    storage,
    type: "table",
  });
};

/**
 * Convert filter array format to object format for datasource.invoke
 * @param filterArray - Array of TableSearchFilter items
 * @param defaultLogicalOp - Default logical operator (default: 'AND')
 * @returns FilterFieldsObject for datasource
 */
export const convertFilterArrayToObject = (
  filterArray: TableSearchFilter[],
  defaultLogicalOp: string = "AND"
): FilterFieldsObject => {
  const filterObject: FilterFieldsObject = {};

  forEach(filterArray, filter => {
    if (filter.field) {
      filterObject[filter.field] = {
        value: filter.value,
        logicalOp: defaultLogicalOp,
        matchMode: filter.matchMode || "anywhereignorecase",
        type: filter.type,
      };
    }
  });

  return filterObject;
};

/**
 * Convert filter object format to array format for internal state
 * @param filterObject - FilterFieldsObject from datasource
 * @returns Array of TableSearchFilter items
 */
export const convertFilterObjectToArray = (
  filterObject: FilterFieldsObject
): TableSearchFilter[] => {
  const filterArray: TableSearchFilter[] = [];

  forEach(filterObject, (filter, field) => {
    filterArray.push({
      field,
      value: filter.value,
      matchMode: filter.matchMode || "anywhereignorecase",
      type: filter.type || "string",
    });
  });

  return filterArray;
};
