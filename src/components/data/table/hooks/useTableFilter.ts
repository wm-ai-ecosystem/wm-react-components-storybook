import { useState, useCallback, useMemo } from "react";
import {
  get,
  isEmpty,
  toString,
  toLower,
  startsWith,
  endsWith,
  includes,
  isEqual,
  toNumber,
  filter,
  find,
  forEach,
  isArray,
  isNull,
  isNil,
  isString,
  map,
} from "lodash-es";
import { TableFilterMode } from "../props";
import { TableSearchFilter, FilterFieldsObject } from "../utils/table-helpers";
import { DataType } from "../../types";

interface UseTableFilterProps {
  filterMode?: TableFilterMode;
  columns: Array<Record<string, unknown>>; // Accept flexible column type
  dataset: Array<Record<string, unknown>>;
  initialSearchState?: TableSearchFilter[]; // Initial search/filter state from persistence
}

interface ColumnFilter {
  value: string | number | boolean | null;
  matchMode: string;
}

interface UseTableFilterReturn {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  globalSearchColumn: string;
  setGlobalSearchColumn: (columnId: string) => void;
  columnFilters: Record<string, ColumnFilter>;
  setColumnFilter: (
    columnId: string,
    value: string | number | boolean | null,
    matchMode?: string
  ) => void;
  filteredData: Array<Record<string, unknown>>;
  clearAllFilters: () => void;
  getFilterFields: (searchObj?: TableSearchFilter | TableSearchFilter[]) => FilterFieldsObject;
  transformFilterFields: (filterFields: Record<string, unknown>) => TableSearchFilter[];
}

// Constants
const NUMERIC_DATA_TYPES = [
  DataType.INTEGER,
  DataType.BIG_INTEGER,
  DataType.SHORT,
  DataType.FLOAT,
  DataType.BIG_DECIMAL,
  DataType.DOUBLE,
  DataType.LONG,
  DataType.BYTE,
  "number",
];

const DATE_DATA_TYPES = [DataType.DATE, DataType.TIME, DataType.TIMESTAMP, DataType.DATETIME];

const MATCH_MODES = {
  START: "start",
  START_IGNORE_CASE: "startignorecase",
  END: "end",
  END_IGNORE_CASE: "endignorecase",
  EXACT: "exact",
  EXACT_IGNORE_CASE: "exactignorecase",
  NOT_EQUALS: "notequals",
  NOT_EQUALS_IGNORE_CASE: "notequalsignorecase",
  NULL: "null",
  IS_NOT_NULL: "isnotnull",
  EMPTY: "empty",
  IS_NOT_EMPTY: "isnotempty",
  NULL_OR_EMPTY: "nullorempty",
  LESS_THAN: "lessthan",
  LESS_THAN_EQUAL: "lessthanequal",
  GREATER_THAN: "greaterthan",
  GREATER_THAN_EQUAL: "greaterthanequal",
  ANYWHERE: "anywhere",
  ANYWHERE_IGNORE_CASE: "anywhereignorecase",
} as const;

const EMPTY_MATCH_MODES = [
  MATCH_MODES.NULL,
  MATCH_MODES.EMPTY,
  MATCH_MODES.NULL_OR_EMPTY,
  MATCH_MODES.IS_NOT_NULL,
  MATCH_MODES.IS_NOT_EMPTY,
];

// Helper function to check if type is numeric
const isNumberType = (type: string): boolean => {
  return includes(NUMERIC_DATA_TYPES, type?.toLowerCase() as DataType);
};

// Get search value based on the type
const getSearchValue = (
  value: unknown,
  type?: string
): string | number | boolean | null | undefined => {
  if (!value && value !== 0 && value !== "") {
    return undefined;
  }

  const dataType = type?.toLowerCase();

  if (isNumberType(dataType ?? "")) {
    return toNumber(value);
  }

  if (includes(DATE_DATA_TYPES, dataType as DataType)) {
    // For now, return timestamp - can be enhanced with moment.js if needed
    return new Date(value as string | number | Date).valueOf();
  }

  return toLower(toString(value));
};

// Filter the data based on the search value and conditions - matches Angular implementation
const getFilteredData = (
  data: Array<Record<string, unknown>>,
  searchObj: Partial<TableSearchFilter>,
  visibleCols: string[] = []
): Array<Record<string, unknown>> => {
  const searchVal = getSearchValue(searchObj.value, searchObj.type);
  let currentVal: string | number | boolean | null | undefined | Array<unknown>;

  // Return whole data if search value is undefined and matchmode is not an empty matchmode type
  // or search value is null and datatype is number. Null can not be compared with numeric values
  if (
    (!searchVal && searchVal !== 0 && !includes(EMPTY_MATCH_MODES, searchObj.matchMode ?? "")) ||
    (isNumberType(searchObj.type ?? "") && isNull(searchObj.value))
  ) {
    return data;
  }

  return filter(data, obj => {
    let isExists: boolean;

    if (searchObj.field) {
      currentVal = getSearchValue(get(obj, searchObj.field), searchObj.type);
    } else {
      // If field is not there, search on all visible columns
      const valuesArray: unknown[] = [];

      // Use lodash's forEach and filter more efficiently
      forEach(obj, (val, key) => {
        if (includes(visibleCols, key)) {
          valuesArray.push(val);
        } else {
          // Handle nested key format (dot notation)
          const nestedColPaths = filter(visibleCols, col => startsWith(col, `${key}.`));
          forEach(nestedColPaths, colPath => {
            const value = get(obj, colPath);
            if (!includes(valuesArray, value)) {
              valuesArray.push(value);
            }
          });
        }
      });

      currentVal = toLower(valuesArray.join(" "));
    }

    // Check if values are valid for comparison operations upfront
    const hasValidValues = !isNil(currentVal) && !isNil(searchVal);
    const isCurrentString = isString(currentVal);
    const isSearchString = isString(searchVal);
    const areBothStrings = isCurrentString && isSearchString;

    switch (searchObj.matchMode) {
      case MATCH_MODES.START:
      case MATCH_MODES.START_IGNORE_CASE:
        isExists = areBothStrings ? startsWith(currentVal as string, searchVal as string) : false;
        break;

      case MATCH_MODES.END:
      case MATCH_MODES.END_IGNORE_CASE:
        isExists = areBothStrings ? endsWith(currentVal as string, searchVal as string) : false;
        break;

      case MATCH_MODES.EXACT:
      case MATCH_MODES.EXACT_IGNORE_CASE:
        isExists = isEqual(currentVal, searchVal);
        break;

      case MATCH_MODES.NOT_EQUALS:
      case MATCH_MODES.NOT_EQUALS_IGNORE_CASE:
        isExists = !isEqual(currentVal, searchVal);
        break;

      case MATCH_MODES.NULL:
        isExists = isNull(currentVal);
        break;

      case MATCH_MODES.IS_NOT_NULL:
        isExists = !isNull(currentVal);
        break;

      case MATCH_MODES.EMPTY:
        isExists = isEmpty(currentVal);
        break;

      case MATCH_MODES.IS_NOT_EMPTY:
        isExists = !isEmpty(currentVal);
        break;

      case MATCH_MODES.NULL_OR_EMPTY:
        isExists = isNull(currentVal) || isEmpty(currentVal);
        break;

      case MATCH_MODES.LESS_THAN:
        isExists = hasValidValues && currentVal! < searchVal!;
        break;

      case MATCH_MODES.LESS_THAN_EQUAL:
        isExists = hasValidValues && currentVal! <= searchVal!;
        break;

      case MATCH_MODES.GREATER_THAN:
        isExists = hasValidValues && currentVal! > searchVal!;
        break;

      case MATCH_MODES.GREATER_THAN_EQUAL:
        isExists = hasValidValues && currentVal! >= searchVal!;
        break;

      case MATCH_MODES.ANYWHERE:
      case MATCH_MODES.ANYWHERE_IGNORE_CASE:
      default:
        isExists = isNumberType(searchObj.type ?? "")
          ? isEqual(currentVal, searchVal)
          : isCurrentString && !isNil(searchVal)
            ? includes(currentVal as string, toString(searchVal))
            : false;
        break;
    }

    return isExists;
  });
};

// Set the filter fields as required by datasource
const setFilterFields = (
  filterFields: FilterFieldsObject,
  searchObj: Partial<TableSearchFilter>,
  visibleCols: string[] = [],
  columns: UseTableFilterProps["columns"] = []
) => {
  const field = searchObj && searchObj.field;

  if (field) {
    // Set the filter options when a field/column has been selected
    // Find the column to get its type
    const column = find(columns, col => {
      const c = col as {
        id?: string;
        accessorKey?: string;
        meta?: { type?: string; editinputtype?: string };
      };
      return c.accessorKey === field || c.id === field;
    }) as { meta?: { type?: string; editinputtype?: string } } | undefined;
    const columnType =
      searchObj.type ?? column?.meta?.type ?? column?.meta?.editinputtype ?? DataType.STRING;

    filterFields[field] = {
      value: searchObj.value,
      logicalOp: "AND",
      matchMode: searchObj.matchMode ?? MATCH_MODES.ANYWHERE_IGNORE_CASE,
      type: columnType,
    };
  } else {
    // Set the filter options when a field/column hasn't been selected
    forEach(visibleCols, field => {
      // Find the column to get its type
      const column = find(columns, col => {
        const c = col as { accessorKey?: string };
        return c.accessorKey === field;
      }) as { meta?: { type?: string; editinputtype?: string } } | undefined;
      const columnType = column?.meta?.type ?? column?.meta?.editinputtype ?? DataType.STRING;

      filterFields[field] = {
        value: searchObj.value,
        type: columnType,
        logicalOp: "OR",
        matchMode: searchObj.matchMode ?? MATCH_MODES.ANYWHERE_IGNORE_CASE,
      };
    });
  }
};

export const useTableFilter = ({
  filterMode,
  columns = [],
  dataset = [],
  initialSearchState,
}: UseTableFilterProps): UseTableFilterReturn => {
  // Initialize filter states based on persisted state
  const getInitialGlobalFilter = () => {
    if (!initialSearchState || filterMode !== "search") return "";
    // For search mode, we expect an array with one item
    if (isArray(initialSearchState) && initialSearchState.length > 0) {
      const value = initialSearchState[0].value;
      return !isNil(value) ? String(value) : "";
    }
    return "";
  };

  const getInitialGlobalSearchColumn = () => {
    if (!initialSearchState || filterMode !== "search") return "";
    // For search mode, we expect an array with one item
    if (isArray(initialSearchState) && initialSearchState.length > 0) {
      return initialSearchState[0].field || "";
    }
    return "";
  };

  const getInitialColumnFilters = () => {
    if (!initialSearchState || filterMode !== "multicolumn") return {};
    const filters: Record<string, ColumnFilter> = {};

    if (isArray(initialSearchState)) {
      forEach(initialSearchState, filter => {
        if (filter.field) {
          filters[filter.field] = {
            value: filter.value ?? "",
            matchMode: filter.matchMode ?? MATCH_MODES.ANYWHERE_IGNORE_CASE,
          };
        }
      });
    }

    return filters;
  };

  // Global filter state for 'search' mode
  const [globalFilter, setGlobalFilter] = useState<string>(getInitialGlobalFilter());

  // Selected column for global search
  const [globalSearchColumn, setGlobalSearchColumn] = useState<string>(
    getInitialGlobalSearchColumn()
  );

  // Column filters state for 'multicolumn' mode
  const [columnFilters, setColumnFilters] =
    useState<Record<string, ColumnFilter>>(getInitialColumnFilters());

  // Set individual column filter
  const setColumnFilter = useCallback(
    (
      columnId: string,
      value: string | number | boolean | null,
      matchMode: string = MATCH_MODES.ANYWHERE_IGNORE_CASE
    ) => {
      setColumnFilters(prev => ({
        ...prev,
        [columnId]: {
          value,
          matchMode,
        },
      }));
    },
    []
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setGlobalFilter("");
    setGlobalSearchColumn("");
    setColumnFilters({});
  }, []);

  // Get visible columns that can be searched
  const getTableVisibleCols = useCallback(() => {
    const excludedColumnIds = [
      "actions",
      "row-operations",
      "multiSelect",
      "radioSelect",
      "row-index",
    ];

    return map(
      filter(columns, col => {
        const column = col as { id?: string; accessorKey?: string; searchable?: boolean };
        return (
          column.searchable !== false &&
          !!column.accessorKey &&
          !includes(excludedColumnIds, column.id)
        );
      }),
      col => (col as { accessorKey?: string }).accessorKey as string
    );
  }, [columns]);

  // Get filter fields as required by datasource
  const getFilterFields = useCallback(
    (searchObj?: TableSearchFilter | TableSearchFilter[]): FilterFieldsObject => {
      const filterFields: FilterFieldsObject = {};
      const visibleCols = getTableVisibleCols();

      if (!searchObj) return filterFields;

      if (isArray(searchObj)) {
        forEach(searchObj, obj => {
          setFilterFields(filterFields, obj, visibleCols, columns);
        });
      } else {
        setFilterFields(filterFields, searchObj, visibleCols, columns);
      }

      return filterFields;
    },
    [getTableVisibleCols, columns]
  );

  // Transform filter fields from object to array format
  const transformFilterFields = useCallback(
    (filterFields: Record<string, unknown>): TableSearchFilter[] => {
      const result: TableSearchFilter[] = [];

      forEach(filterFields, (filter: unknown, field: string) => {
        const filterObj = filter as { value?: unknown; matchMode?: string; type?: string };
        if (
          filterObj &&
          (!isNil(filterObj.value) || includes(EMPTY_MATCH_MODES, filterObj.matchMode ?? ""))
        ) {
          result.push({
            field,
            value: filterObj.value as string | number | boolean | null,
            matchMode: filterObj.matchMode ?? MATCH_MODES.ANYWHERE_IGNORE_CASE,
            type: filterObj.type ?? DataType.STRING,
          });
        }
      });

      return result;
    },
    []
  );

  // Apply filtering logic based on filter mode
  const filteredData = useMemo(() => {
    if (!filterMode || !dataset) {
      return dataset;
    }

    let data = [...dataset];
    const visibleCols = getTableVisibleCols();

    if (filterMode === "search") {
      // Handle search mode filtering
      if (globalFilter || globalSearchColumn) {
        const searchObj = {
          field: globalSearchColumn || "",
          value: globalFilter,
          matchMode: MATCH_MODES.ANYWHERE_IGNORE_CASE,
          type: globalSearchColumn
            ? (() => {
                const col = find(columns, c => {
                  const column = c as {
                    id?: string;
                    accessorKey?: string;
                    meta?: { type?: string; editinputtype?: string };
                  };
                  return (
                    column.accessorKey === globalSearchColumn || column.id === globalSearchColumn
                  );
                }) as { meta?: { type?: string; editinputtype?: string } } | undefined;
                return col?.meta?.type ?? col?.meta?.editinputtype ?? DataType.STRING;
              })()
            : DataType.STRING,
        };
        data = getFilteredData(data, searchObj, visibleCols);
      }
    } else if (filterMode === "multicolumn") {
      // Handle multicolumn filtering
      const filterArray: Partial<TableSearchFilter>[] = [];

      forEach(columnFilters, (filterObj, columnId) => {
        if (!filterObj) return;

        // Special match modes that don't require a value
        if (isNil(filterObj.value) && !includes(EMPTY_MATCH_MODES, filterObj.matchMode)) return;

        // Find column to get type
        const column = find(columns, col => {
          const c = col as {
            id?: string;
            accessorKey?: string;
            meta?: { type?: string; editinputtype?: string };
          };
          return c.id === columnId || c.accessorKey === columnId;
        }) as
          | { accessorKey?: string; meta?: { type?: string; editinputtype?: string } }
          | undefined;

        if (column && column.accessorKey) {
          filterArray.push({
            field: column.accessorKey as string,
            value: filterObj.value,
            matchMode: filterObj.matchMode,
            type: column.meta?.type ?? column.meta?.editinputtype ?? DataType.STRING,
          });
        }
      });

      // Apply each filter sequentially
      data = filterArray.reduce(
        (filteredData, searchObj) => getFilteredData(filteredData, searchObj, visibleCols),
        data
      );
    }

    return data;
  }, [
    dataset,
    columns,
    filterMode,
    globalFilter,
    globalSearchColumn,
    columnFilters,
    getTableVisibleCols,
  ]);

  return {
    globalFilter,
    setGlobalFilter,
    globalSearchColumn,
    setGlobalSearchColumn,
    columnFilters,
    setColumnFilter,
    filteredData,
    clearAllFilters,
    getFilterFields,
    transformFilterFields,
  };
};
