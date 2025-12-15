import { getEvaluatedData, getObjValueByKey } from "@wavemaker/react-runtime/utils/widgets";

import {
  cloneDeep,
  filter as lodashFilter,
  forEach,
  get,
  groupBy as lodashGroupBy,
  includes,
  isArray,
  isEqual,
  memoize,
  isNull,
  isObject,
  isString,
  isUndefined,
  keys as lodashKeys,
  orderBy as _orderBy,
  sortBy as lodashSortBy,
  split,
  toLower,
  trim,
  uniqBy,
  uniqWith,
  values as lodashValues,
  isDate,
} from "lodash-es";

import * as momentLib from "moment";
import { useMemo } from "react";

const ALLFIELDS = "All Fields";
const moment = momentLib.default || (window as any)["moment"];

const isDefined = (val: any): boolean => val !== undefined && val !== null;

const getFormattedDate = (date: Date, format: string): string => {
  return moment(date).format(format);
};

const isEqualWithFields = (objA: any, objB: any, fieldsStr: string): boolean => {
  if (!fieldsStr || !isString(fieldsStr)) {
    return isEqual(objA, objB); // Fallback to deep comparison if no fields specified
  }
  const fields = fieldsStr.split(",").map(f => f.trim());
  if (!objA || !objB) {
    return objA === objB; // Handle null/undefined cases
  }
  for (const field of fields) {
    if (!isEqual(get(objA, field), get(objB, field))) {
      return false;
    }
  }
  return true;
};

const GROUP_BY_OPTIONS = {
  ALPHABET: "alphabet",
  WORD: "word",
  OTHERS: "Others",
};
const TIME_ROLLUP_OPTIONS = {
  HOUR: "hour",
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

// Adjusted for moment.js (YYYY for year, DD for day)
const ROLLUP_PATTERNS = {
  DAY: "YYYY-MM-DD",
  WEEK: "wo [Week], YYYY", // Example: 42nd Week, 2023 (moment's week format)
  MONTH: "MMM, YYYY",
  YEAR: "YYYY",
  HOUR: "hh:mm A",
};
interface DataObjectWithChildren {
  [key: string]: any; // Allow dynamic property access
  children?: DataSetItem[];
}

export class DataSetItem {
  key: any;
  label: any;
  value: any;
  dataObject?: DataObjectWithChildren;
  index?: number;
  imgSrc?: string;
  selected?: boolean;
  children?: DataSetItem[];
  match?: string;
  dateformat?: string;
}

const _internalTransformDataset = (
  dataset: any,
  datafield: any,
  displayfield: any,
  displaylabel: any,
  displayexpression: any,
  orderby: any,
  groupby: any,
  dataPath: any,
  itemchildren?: any
) => {
  return datasetItems(
    dataset,
    datafield,
    displayfield,
    displaylabel,
    displayexpression,
    orderby,
    groupby,
    dataPath,
    itemchildren
  );
};

// Custom resolver for memoize to handle multiple arguments correctly
const resolver = (...args: any[]) => {
  return args
    .map(arg => {
      if (typeof arg === "function") {
        return arg.toString();
      }
      return JSON.stringify(arg);
    })
    .join("|");
};

export const transformDataset = memoize(_internalTransformDataset, resolver);

/**
 * function to get the ordered dataset based on the given orderby
 */
export const getOrderedDataset = (dataSet: any, orderBy: string, innerItem?: string): any[] => {
  if (!orderBy) {
    return cloneDeep(dataSet);
  }

  const items = orderBy.split(",");
  const fields: string[] = [];
  const directions: Array<"asc" | "desc"> = [];
  items.forEach(obj => {
    const item = obj.split(":");
    fields.push(innerItem ? `${innerItem}.${item[0]}` : item[0]);
    directions.push(item[1] as "asc" | "desc");
  });
  return _orderBy(dataSet, fields, directions);
};

/**
 * Returns an array of object, each object contain the DataSetItem whose key, value, label are extracted from object keys.
 */
export const transformDataWithKeys = (dataSet: any): DataSetItem[] => {
  const data: DataSetItem[] = [];
  if (isObject(dataSet[0]) || (isObject(dataSet) && !isArray(dataSet))) {
    const objectKeys = Object.keys(dataSet[0] || dataSet);
    forEach(objectKeys, (objKey, index) => {
      data.push({
        key: objKey,
        label: objKey,
        value: objKey,
        index: (index || 0) + 1, // Ensure index is number
      });
    });
  }
  return data;
};

export const extractDataAsArray = (data: any): any[] => {
  if (isUndefined(data) || isNull(data) || (isString(data) && trim(data) === "")) {
    return [];
  }
  if (isString(data)) {
    data = split(data, ",").map(str => trim(str));
  }
  if (!isArray(data)) {
    data = [data];
  }
  return data;
};

export const convertDataToObject = (dataResult: any): any => {
  if (isString(dataResult)) {
    dataResult = split(dataResult, ",").map(str => trim(str));
  }
  return dataResult;
};

const isSearchWidget = (widgetType?: string): boolean => {
  return widgetType === "wm-search"; // Assuming 'wm-search' is a string identifier
};

// This function originally used $parseEvent from @wm/core for dynamic expression evaluation.
// In React, it's highly recommended to pass functions directly as props instead of string expressions.
// This adapted version provides a placeholder for simple property access and logs a warning for complex cases.
const setGroupbyKey = (
  scope: any,
  context: any,
  dataSetItem: DataSetItem,
  innerItem?: string
): void => {
  if (scope && isSearchWidget(scope.widgetType)) {
    if (scope.groupby) {
      if (includes(scope.groupby, "(") || includes(scope.groupby, "[")) {
        // Complex expression detected. Direct evaluation of arbitrary strings is unsafe and not React-idiomatic.
        // Consider refactoring to pass a pre-compiled function for groupby logic.
        console.warn(
          `Complex groupby expression "${scope.groupby}" detected for search widget. ` +
            `This may not work as expected. Refactor to use a function prop.`
        );
        // Attempting simple property access as a fallback if context and item are available
        if (dataSetItem.dataObject && context) {
          try {
            // This is a very basic attempt and might not cover all original $parseEvent cases.
            // For example, if scope.groupby was 'item.name.toUpperCase()', this won't work.
            const value = get(dataSetItem.dataObject, scope.groupby);
            dataSetItem.key = value;
          } catch (e) {
            console.error(
              "Failed to evaluate groupby expression (simple access):",
              scope.groupby,
              e
            );
            dataSetItem.key = GROUP_BY_OPTIONS.OTHERS;
          }
        } else {
          dataSetItem.key = GROUP_BY_OPTIONS.OTHERS; // Fallback
        }
      } else {
        // Simple field name, try to get it from dataObject
        dataSetItem.key = get(dataSetItem.dataObject, scope.groupby);
      }
    } else {
      // if groupby is not defined, set the key as datafield value
      dataSetItem.key = dataSetItem.value;
    }
  } else if (dataSetItem.dataObject && scope && scope.groupby) {
    // For non-search widgets, if groupby is present
    dataSetItem.key = get(dataSetItem.dataObject, scope.groupby);
  }
};

function resolveDataPath(dataSet: any, dataPath: string): any[] {
  if (!Array.isArray(dataSet)) {
    dataSet = [dataSet];
  }

  if (!dataPath) return dataSet;

  // Remove leading dot if present and filter out empty segments
  const cleanPath = dataPath.startsWith(".") ? dataPath.substring(1) : dataPath;
  const pathSegments = cleanPath.split(".").filter(segment => segment.length > 0);

  if (pathSegments.length === 0) return dataSet;

  const flatten = (data: any[], path: string[]): any[] => {
    if (path.length === 0) return data;

    const nextKey = path[0];
    const remainingPath = path.slice(1);

    let result: any[] = [];

    for (const item of data) {
      if (!item || typeof item !== "object") continue;

      const value = item[nextKey];

      if (Array.isArray(value)) {
        const next = flatten(value, remainingPath);
        result = result.concat(next);
      } else if ((typeof value === "object" || typeof value === "string") && value !== null) {
        const next = flatten([value], remainingPath);
        result = result.concat(next);
      }
      // else: primitive types or undefined → skip
    }

    return result;
  };

  return flatten(dataSet, pathSegments);
}

export const transformFormData = (
  context: any,
  dataSet: any,
  myDataField: string,
  displayOptions?: any,
  startIndex?: number,
  scope?: any,
  dataPath?: string
): Array<DataSetItem> => {
  if (dataPath) {
    dataSet = resolveDataPath(dataSet, dataPath || "");
  }
  const data: Array<DataSetItem> = [];
  if (isString(dataSet)) {
    dataSet = dataSet.split(",").map(str => str.trim());
    dataSet.forEach((option, index) => {
      const dataSetItem = {
        key: option,
        value: option,
        label: isDefined(option) && option !== null ? option.toString() : "",
        index: startIndex + index,
      };
      setGroupbyKey(scope, context, dataSetItem, "value");
      data.push(dataSetItem);
    });
  } else if (isArray(dataSet) && !isObject(dataSet[0])) {
    // array of primitive values only
    dataSet.forEach((option, index) => {
      const dataSetItem = {
        key: option,
        value: option,
        label: isDefined(option) && option !== null ? option.toString() : "",
        index: startIndex + index,
      };
      setGroupbyKey(scope, context, dataSetItem, "value");
      data.push(dataSetItem);
    });
  } else if (!(dataSet instanceof Array) && isObject(dataSet)) {
    const i = 0;
    forEach(dataSet, (value, key) => {
      // @ts-ignore
      const dataSetItem = {
        key: trim(key),
        value: key,
        label: isDefined(value) && value !== null ? value.toString() : "",
        index: startIndex,
        dataObject: dataSet,
      };
      setGroupbyKey(scope, context, dataSetItem, "value");
      data.push(dataSetItem);
    });
  } else {
    if (!myDataField) {
      // consider the datafield as 'ALLFIELDS' when datafield is not given.
      myDataField = ALLFIELDS;
    }
    dataSet.forEach((option, index) => {
      const key =
        myDataField === ALLFIELDS ? startIndex + index : getObjValueByKey(option, myDataField);
      // Omit all the items whose datafield (key) is null or undefined.
      if (!isUndefined(key) && !isNull(key)) {
        const label = getEvaluatedData(
          option,
          {
            field: displayOptions.displayField,
            expression: displayOptions.displayExpr,
            bindExpression: displayOptions.bindDisplayExpr,
          },
          option
        );
        const dataSetItem = {
          key: key,
          label: isDefined(label) && label !== null ? label.toString() : "",
          value: myDataField === ALLFIELDS ? option : key,
          dataObject: option, // represents the object when datafield is ALLFIELDS. This is used as innerItem while grouping the datasetItems.
          index: startIndex + index,
        };
        if (displayOptions.displayImgSrc || displayOptions.bindDisplayImgSrc) {
          (dataSetItem as any).imgSrc = getEvaluatedData(
            option,
            {
              expression: displayOptions.displayImgSrc,
              bindExpression: displayOptions.bindDisplayImgSrc,
            },
            context
          );
        }
        setGroupbyKey(scope, context, dataSetItem, "dataObject");

        data.push(dataSetItem);
      }
    });
  }
  return data;
};

const getUniqObjsByDataField = (
  data: Array<DataSetItem>,
  dataField: string,
  displayField: string,
  allowEmptyFields?: boolean
): Array<DataSetItem> => {
  if (!allowEmptyFields) {
    data = lodashFilter(data, item => isDefined(item.key) && item.key !== "");
  }
  return uniqWith(data, (obj1, obj2) => {
    const val1 = get(obj1.dataObject, dataField);
    const val2 = get(obj2.dataObject, dataField);
    const dVal1 = get(obj1.dataObject, displayField);
    const dVal2 = get(obj2.dataObject, displayField);
    return isEqual(val1, val2) && isEqual(dVal1, dVal2);
  });
};

export const setItemByCompare = (
  datasetItems: Array<DataSetItem>,
  compareWithDataObj: Object,
  compareByField: string
): DataSetItem | undefined => {
  return datasetItems.find(item => {
    if (item.dataObject) {
      return isEqualWithFields(compareWithDataObj, item.dataObject, compareByField);
    }
    return false;
  });
};

const getSortedGroupedData = (groupedLiData: Object, groupBy: string, orderby: string): any[] => {
  const data = lodashValues(groupedLiData).map((val: any) => {
    if (orderby) {
      val.data = getOrderedDataset(val.data, orderby, "dataObject");
    }
    return val;
  });
  return lodashSortBy(data, `data[0].dataObject.${groupBy}`);
};

export const datasetItems = (
  dataset: any,
  datafield: string,
  displayfield: string,
  displaylabel: string,
  displayexpression: string,
  orderby: string,
  groupby?: string,
  dataPath?: string,
  itemchildren?: any
) => {
  if (!dataset) return [];
  let items = transformFormData(
    null,
    dataset,
    datafield,
    {
      displayField: displayfield || displaylabel,
      displayExpr: displayexpression,
    },
    0,
    null,
    dataPath
  );
  if (orderby) {
    const orderFields = orderby.split(",");
    items.sort((a, b) => {
      for (const orderField of orderFields) {
        const [field, order] = orderField.split(":");
        const aVal = String(a.dataObject[field] || a.label || "");
        const bVal = String(b.dataObject[field] || b.label || "");
        const comparison = order === "desc" ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        if (comparison !== 0) return comparison;
      }
      return 0;
    });
  }

  for (const item of items) {
    let children;
    if (typeof itemchildren === "function") {
      children = itemchildren(item?.dataObject) ?? itemchildren(item);

      if (Array.isArray(children)) {
        const sortedChildren = datasetItems(
          children,
          datafield,
          displayfield,
          displaylabel,
          displayexpression,
          orderby,
          groupby
        );
        if (itemchildren(item?.dataObject)) {
          item.dataObject.children = sortedChildren;
        } else if (itemchildren(item)) {
          item.children = sortedChildren;
        }
      }
    } else {
      children = item?.dataObject?.[itemchildren] ?? item?.[itemchildren];
      if (Array.isArray(children)) {
        const sortedChildren = datasetItems(
          children,
          datafield,
          displayfield,
          displaylabel,
          displayexpression,
          orderby,
          groupby
        );
        if (item?.dataObject?.[itemchildren]) {
          item.dataObject.children = sortedChildren;
        } else if (item?.[itemchildren]) {
          item.children = sortedChildren;
        }
      }
    }
  }
  if (groupby) {
    items = groupData(null, items, groupby, "word", "", "");
  }
  return items;
};

export const groupData = (
  compRef: any, // In React, this would likely be component props or state
  data: Array<Object | DataSetItem>,
  groupby: string,
  match: string,
  orderby: string,
  dateformat?: string,
  innerItem: string = "dataObject",
  AppDefaults?: any
): any[] => {
  if (!groupby || !data || !data.length) {
    return [];
  }
  const groupedData = getGroupedData(
    data,
    groupby,
    match,
    orderby,
    dateformat,
    innerItem,
    AppDefaults
  );
  return getSortedGroupedData(groupedData, groupby, orderby);
};

const getGroupedData = (
  fieldDefs: Array<Object | DataSetItem>,
  groupby: string,
  match: string,
  orderby: string,
  dateFormat?: string,
  innerItem?: string,
  AppDefaults?: any
): Object => {
  const mappedData = fieldDefs.map(item => {
    const groupByKey = groupDataByField(
      groupby,
      match,
      innerItem,
      dateFormat,
      /*datePipe,*/ AppDefaults,
      item
    );
    return { groupByKey, data: item };
  });

  const groupedData = lodashGroupBy(mappedData, "groupByKey");

  // Format for final structure {key: groupName, data: [items]}
  const result = {};
  forEach(groupedData, (value, key) => {
    result[key] = { key: key, data: value.map(v => v.data) };
  });
  return result;
};

const filterDateReact = (
  value: string | number | Date,
  format: string,
  defaultFormat: string
): string => {
  if (!isDefined(value) || value === "") {
    return "";
  }
  const mDate = moment(value);
  if (mDate.isValid()) {
    return mDate.format(format || defaultFormat);
  }
  return String(value); // Return original if not a valid date
};

const getTimeRolledUpString = (
  concatStr: string | number | Date,
  rollUp: string,
  dateformat?: string,
  AppDefaults?: any
): string => {
  if (!isDefined(concatStr) || concatStr === "") {
    return GROUP_BY_OPTIONS.OTHERS;
  }

  const mDate = moment(concatStr);
  if (!mDate.isValid()) {
    return GROUP_BY_OPTIONS.OTHERS;
  }

  const appDateFormat =
    AppDefaults && AppDefaults.dateFormat ? AppDefaults.dateFormat : "yyyy-MM-dd";

  const calendarDayFormats = {
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    sameDay: "[Today]",
    sameElse: appDateFormat.replace(/y/g, "Y").replace(/d/g, "D"), // Adjust to moment format tokens
  };

  if (rollUp === TIME_ROLLUP_OPTIONS.DAY) {
    return mDate.calendar(null, calendarDayFormats);
  }
  if (rollUp === TIME_ROLLUP_OPTIONS.WEEK) {
    // Example: 'Week 1, 2023' or use specific format from ROLLUP_PATTERNS
    return mDate.format(ROLLUP_PATTERNS.WEEK || "wo [Week], YYYY");
  }
  if (rollUp === TIME_ROLLUP_OPTIONS.MONTH) {
    return mDate.format(ROLLUP_PATTERNS.MONTH || "MMM, YYYY");
  }
  if (rollUp === TIME_ROLLUP_OPTIONS.YEAR) {
    return mDate.format(ROLLUP_PATTERNS.YEAR || "YYYY");
  }
  if (rollUp === TIME_ROLLUP_OPTIONS.HOUR) {
    // Check if it's today to show 'Today, 09:00 AM', else 'YYYY-MM-DD, 09:00 AM'
    const baseFormat = ROLLUP_PATTERNS.HOUR || "hh:mm A";
    if (mDate.isSame(moment(), "day")) {
      return `[Today], ${mDate.format(baseFormat)}`;
    }
    return mDate.format(`${ROLLUP_PATTERNS.DAY}, ${baseFormat}`);
  }

  // Default if no rollup matched, or for custom date formats if applicable
  if (dateformat) {
    return filterDateReact(mDate.toDate(), dateformat, appDateFormat);
  }

  return mDate.format(appDateFormat.replace(/y/g, "Y").replace(/d/g, "D"));
};

const groupDataByField = (
  groupby: string,
  match: string,
  innerItem?: string,
  dateFormat?: string,
  AppDefaults?: any,
  liData?: Object
): string => {
  let concatStr = get(innerItem ? (liData as any)[innerItem] : liData, groupby);

  if (
    isUndefined(concatStr) ||
    isNull(concatStr) ||
    (isString(concatStr) && concatStr.toString().trim() === "")
  ) {
    return GROUP_BY_OPTIONS.OTHERS;
  }

  if (match === GROUP_BY_OPTIONS.ALPHABET) {
    return String(concatStr).substr(0, 1).toUpperCase();
  }
  if (match === GROUP_BY_OPTIONS.WORD) {
    return String(concatStr);
  }

  if (includes(lodashValues(TIME_ROLLUP_OPTIONS), match)) {
    return getTimeRolledUpString(String(concatStr), match, dateFormat, AppDefaults);
  }

  return String(concatStr);
};

/**
 * Utility functions for list group operations
 */

/**
 * Toggle all list items in all groups
 * @param containerRef - Reference to the container element
 * @returns void
 */
export const toggleAllHeaders = (containerRef: HTMLElement): void => {
  const groups = containerRef.querySelectorAll(".item-group");

  groups.forEach(group => {
    const listItems = group.querySelectorAll(".group-list-item");
    const icon = group.querySelector("li.list-group-header .app-icon");

    listItems.forEach(item => {
      // Toggle visibility
      const currentDisplay = window.getComputedStyle(item).display;
      (item as HTMLElement).style.display = currentDisplay === "none" ? "block" : "none";
    });

    if (icon) {
      if (icon.classList.contains("wi-chevron-down")) {
        icon.classList.remove("wi-chevron-down");
        icon.classList.add("wi-chevron-up");
      } else {
        icon.classList.remove("wi-chevron-up");
        icon.classList.add("wi-chevron-down");
      }
    }
  });
};

/**
 * Handle click on a group header
 * @param event - Click event
 * @returns void
 */
export const handleHeaderClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  const selectedGroup = target.closest(".item-group");

  if (!selectedGroup) return;

  const selectedAppIcon = selectedGroup.querySelector("li.list-group-header .app-icon");
  const listItems = selectedGroup.querySelectorAll(".group-list-item");

  if (selectedAppIcon) {
    if (selectedAppIcon.classList.contains("wi-chevron-down")) {
      selectedAppIcon.classList.remove("wi-chevron-down");
      selectedAppIcon.classList.add("wi-chevron-up");
    } else {
      selectedAppIcon.classList.remove("wi-chevron-up");
      selectedAppIcon.classList.add("wi-chevron-down");
    }
  }

  listItems.forEach(item => {
    const currentDisplay = window.getComputedStyle(item).display;
    (item as HTMLElement).style.display = currentDisplay === "none" ? "block" : "none";
  });
};

interface DragAndDropOptions {
  containment?: HTMLElement;
  delay?: number;
  opacity?: number;
  helper?: "clone";
  zIndex?: number;
  tolerance?: string;
}

/**
 * Configure drag and drop functionality
 * Note: This is a basic implementation. For production use, consider using modern libraries like react-beautiful-dnd
 * @param element - Element to make sortable
 * @param options - Sortable options
 * @param onDragStart - Callback when drag starts
 * @param onUpdate - Callback when sorting ends and DOM position changes
 * @param onSort - Optional callback during sorting
 */
export const configureDnD = (
  element: HTMLElement,
  options: DragAndDropOptions = {},
  onDragStart: (event: DragEvent) => void,
  onUpdate: (event: DragEvent) => void,
  onSort?: (event: DragEvent) => void
): void => {
  const defaultOptions: DragAndDropOptions = {
    containment: element,
    delay: 100,
    opacity: 0.8,
    helper: "clone",
    zIndex: 1050,
    tolerance: "pointer",
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Add drag and drop event listeners
  element.addEventListener("dragstart", onDragStart);
  element.addEventListener("dragend", onUpdate);
  if (onSort) {
    element.addEventListener("drag", onSort);
  }

  // Make children draggable
  const draggableItems = element.children;
  Array.from(draggableItems).forEach(item => {
    (item as HTMLElement).draggable = true;
    (item as HTMLElement).style.userSelect = "none";
    if (finalOptions.opacity) {
      (item as HTMLElement).style.opacity = "1";
    }
  });
};
