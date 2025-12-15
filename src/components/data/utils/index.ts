import { isEmpty, forEach, some, intersection, includes, split } from "lodash-es";
import { MatchMode } from "../types";
import { isDefined } from "@/core/util";

const Live_Operations = {
  INSERT: "insert",
  UPDATE: "update",
  DELETE: "delete",
  READ: "read",
};

export const LIVE_CONSTANTS = {
  EMPTY_KEY: "EMPTY_NULL_FILTER",
  EMPTY_VALUE: "No Value",
  LABEL_KEY: "key",
  LABEL_VALUE: "value",
  NULL_EMPTY: ["null", "empty"],
  NULL: "null",
  EMPTY: "empty",
};

export function findOperationType(formdata: any, primaryKeys?: string[]) {
  let operation;
  let isPrimary = false;
  if (primaryKeys && !isEmpty(formdata)) {
    /*If only one column is primary key*/
    if (primaryKeys.length === 1) {
      if (formdata[primaryKeys[0]]) {
        operation = Live_Operations.UPDATE;
      }
      /*If only no column is primary key*/
    } else if (primaryKeys.length === 0) {
      forEach(formdata, value => {
        if (value) {
          isPrimary = true;
        }
      });
      if (isPrimary) {
        operation = Live_Operations.UPDATE;
      }
      /*If multiple columns are primary key*/
    } else {
      // @ts-ignore
      isPrimary = some(primaryKeys, (primaryKey: any) => {
        if (formdata[primaryKey]) {
          return true;
        }
      });
      if (isPrimary) {
        operation = Live_Operations.UPDATE;
      }
    }
  }
  return operation || Live_Operations.INSERT;
}

function isDefinedAndNotEmpty(val: string) {
  return isDefined(val) && val !== "" && val !== null;
}

/**
 * @ngdoc function
 * @name wm.widgets.live.getRangeFieldValue
 * @methodOf wm.widgets.live.LiveWidgetUtils
 * @function
 *
 * @description
 * Function to get the field value for range
 *
 * @param {string} minValue min value selected
 * @param {string} maxValue max value selected
 */
export function getRangeFieldValue(minValue: string, maxValue: string) {
  let fieldValue;
  if (isDefinedAndNotEmpty(minValue) && isDefinedAndNotEmpty(maxValue)) {
    fieldValue = [minValue, maxValue];
  } else if (isDefinedAndNotEmpty(minValue)) {
    fieldValue = minValue;
  } else if (isDefinedAndNotEmpty(maxValue)) {
    fieldValue = maxValue;
  }
  return fieldValue;
}
/**
 * @ngdoc function
 * @name wm.widgets.live.getRangeMatchMode
 * @methodOf wm.widgets.live.LiveWidgetUtils
 * @function
 *
 * @description
 * Function to get the match mode for range
 *
 * @param {string} minValue min value selected
 * @param {string} maxValue max value selected
 */
export function getRangeMatchMode(minValue: string, maxValue: string) {
  let matchMode;
  // If two values exists, then it is between. Otherwise, greater or lesser
  if (isDefinedAndNotEmpty(minValue) && isDefinedAndNotEmpty(maxValue)) {
    matchMode = MatchMode.BETWEEN;
  } else if (isDefinedAndNotEmpty(minValue)) {
    matchMode = MatchMode.GREATER;
  } else if (isDefinedAndNotEmpty(maxValue)) {
    matchMode = MatchMode.LESSER;
  }
  return matchMode;
}

/**
 * @ngdoc function
 * @name wm.widgets.live.getEnableEmptyFilter
 * @methodOf wm.widgets.live.LiveWidgetUtils
 * @function
 *
 * @description
 * This function checks if enable filter options is set on live filter
 *
 * @param {object} enableemptyfilter empty filter options
 */
export function getEnableEmptyFilter(enableemptyfilter: string) {
  return (
    enableemptyfilter &&
    intersection(enableemptyfilter.split(","), LIVE_CONSTANTS.NULL_EMPTY).length > 0
  );
}
/**
 * @ngdoc function
 * @name wm.widgets.live.getEmptyMatchMode
 * @methodOf wm.widgets.live.LiveWidgetUtils
 * @function
 *
 * @description
 * Function to get the match mode based on the filter selected
 *
 * @param {object} enableemptyfilter empty filter options
 */
export function getEmptyMatchMode(enableemptyfilter: string) {
  let matchMode;
  const emptyFilterOptions = split(enableemptyfilter, ",");
  if (intersection(emptyFilterOptions, LIVE_CONSTANTS.NULL_EMPTY).length === 2) {
    matchMode = MatchMode.NULLOREMPTY;
  } else if (includes(emptyFilterOptions, LIVE_CONSTANTS.NULL)) {
    matchMode = MatchMode.NULL;
  } else if (includes(emptyFilterOptions, LIVE_CONSTANTS.EMPTY)) {
    matchMode = MatchMode.EMPTY;
  }
  return matchMode;
}

const typesMap = {
  number: [
    "number",
    "integer",
    "big_integer",
    "short",
    "float",
    "big_decimal",
    "double",
    "long",
    "byte",
  ],
  string: ["string", "text"],
  character: ["character"],
  date: ["date", "time", "timestamp", "datetime"],
};

const modes = {
  number: [
    "exact",
    "notequals",
    "lessthan",
    "lessthanequal",
    "greaterthan",
    "greaterthanequal",
    "null",
    "isnotnull",
  ],
  string: [
    "anywhereignorecase",
    "anywhere",
    "startignorecase",
    "start",
    "endignorecase",
    "end",
    "exactignorecase",
    "exact",
    "notequalsignorecase",
    "notequals",
    "null",
    "isnotnull",
    "empty",
    "isnotempty",
    "nullorempty",
  ],
  character: [
    "exactignorecase",
    "exact",
    "notequalsignorecase",
    "notequals",
    "null",
    "isnotnull",
    "empty",
    "isnotempty",
    "nullorempty",
  ],
  date: [
    "exact",
    "lessthan",
    "lessthanequal",
    "greaterthan",
    "greaterthanequal",
    "null",
    "notequals",
    "isnotnull",
  ],
};

const matchModeTypesMap = {
  boolean: ["exact", "null", "isnotnull"],
  clob: [],
  blob: [],
};

export const getMatchModeTypesMap = (multiMode?: string) => {
  if (multiMode) {
    modes.number.push("in", "notin", "between");
    modes.date.push("between");
    modes.string.push("in", "notin");
    modes.character.push("in", "notin");
  }

  forEach(typesMap, (types: string[], primType: string) => {
    forEach(types, (type: string) => {
      (matchModeTypesMap as Record<string, string[]>)[type] = modes[primType as keyof typeof modes];
    });
  });
  // this is used in filter criteria when the user types the column name manually and where we dont know the type of the column
  (matchModeTypesMap as Record<string, string[]>)["default"] = [
    ...modes["number"],
    ...modes["string"],
    ...modes["character"],
    ...modes["date"],
  ];
  return matchModeTypesMap;
};

export const getMatchModeMsgs = (appLocale: any) => {
  return {
    start: appLocale.LABEL_STARTS_WITH,
    startignorecase: appLocale.LABEL_STARTS_WITH_IGNORECASE,
    end: appLocale.LABEL_ENDS_WITH,
    endignorecase: appLocale.LABEL_ENDS_WITH_IGNORECASE,
    anywhere: appLocale.LABEL_CONTAINS,
    anywhereignorecase: appLocale.LABEL_CONTAINS_IGNORECASE,
    exact: appLocale.LABEL_IS_EQUAL_TO,
    exactignorecase: appLocale.LABEL_IS_EQUAL_TO_IGNORECASE,
    notequals: appLocale.LABEL_IS_NOT_EQUAL_TO,
    notequalsignorecase: appLocale.LABEL_IS_NOT_EQUAL_TO_IGNORECASE,
    lessthan: appLocale.LABEL_LESS_THAN,
    lessthanequal: appLocale.LABEL_LESS_THAN_OR_EQUALS_TO,
    greaterthan: appLocale.LABEL_GREATER_THAN,
    greaterthanequal: appLocale.LABEL_GREATER_THAN_OR_EQUALS_TO,
    null: appLocale.LABEL_IS_NULL,
    isnotnull: appLocale.LABEL_IS_NOT_NULL,
    empty: appLocale.LABEL_IS_EMPTY,
    isnotempty: appLocale.LABEL_IS_NOT_EMPTY,
    nullorempty: appLocale.LABEL_IS_NULL_OR_EMPTY,
    in: appLocale.LABEL_IN,
    notin: appLocale.LABEL_NOT_IN,
    between: appLocale.LABEL_BETWEEN,
  };
};

export const unsupportedStatePersistenceTypes = ["On-Demand", "Scroll"];
