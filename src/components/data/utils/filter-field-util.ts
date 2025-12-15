import { forEach, isFunction, isObject, debounce } from "lodash-es";
import {
  getDistinctFieldProperties,
  getDistinctValues,
  isSearchWidgetType,
} from "@/components/data/utils/field-data-utils";
import { getEnableEmptyFilter } from "@/components/data/utils";

export const LIVE_CONSTANTS = {
  EMPTY_KEY: "EMPTY_NULL_FILTER",
  EMPTY_VALUE: "No Value",
  LABEL_KEY: "key",
  LABEL_VALUE: "value",
  NULL_EMPTY: ["null", "empty"],
  NULL: "null",
  EMPTY: "empty",
};

export const stringStartsWith = (
  str: string,
  startsWith: string,
  ignoreCase?: boolean
): boolean => {
  if (!str) {
    return false;
  }

  const regEx = new RegExp("^" + startsWith, ignoreCase ? "i" : "");

  return regEx.test(str);
};

export function interpolateBindExpressions(context: any, filterexpressions: any, callbackFn: any) {
  const debouncedFn = debounce(() => {
    if (isFunction(callbackFn)) {
      callbackFn(filterexpressions);
    }
  }, 300);

  // Call initially for expressions without bound variables
  debouncedFn();

  const filterExpressions = filterexpressions
    ? isObject(filterexpressions)
      ? filterexpressions
      : JSON.parse(filterexpressions)
    : {};

  // Just setup the bindings - no subscription needed
  processFilterExpBindNode(context, filterExpressions);
  // The filterExpressions object will be mutated directly by the watchers
  // No need for subscription since changes happen in-place
}

export const processFilterExpBindNode = (context: any, filterExpressions: any, variable?: any) => {
  const traverseFilterExpressions = (expressions: any) => {
    if (expressions.rules) {
      forEach(expressions.rules, (filExpObj, i) => {
        if (filExpObj.rules) {
          traverseFilterExpressions(filExpObj);
        }
      });
    }
  };
  traverseFilterExpressions(filterExpressions);

  // Return the mutated filterExpressions or nothing
  return filterExpressions;
};

export function getDistinctValuesForField(dataSource: any, formField: any, options: any) {
  if (!dataSource || !formField || formField.isDataSetBound) {
    return;
  }
  if (isSearchWidgetType(formField[options.widget])) {
    const dataoptions = getDistinctFieldProperties(dataSource, formField);
    formField.dataoptions = dataoptions;
    formField.setFieldDataSet(formField, Object.assign(options || {}, dataoptions));
  } else {
    interpolateBindExpressions(
      formField.viewParent,
      formField.filterexpressions,
      (filterexpressions: any) => {
        formField.filterexpressions = filterexpressions;
        getDistinctValues(dataSource, formField, options.widget).then((res: any) => {
          formField.setFieldDataSet(res.data, {
            aliasColumn: res.aliasColumn,
            widget: options.widget,
            isEnableEmptyFilter: getEnableEmptyFilter(options.enableemptyfilter),
            EMPTY_VALUE: options.EMPTY_VALUE,
          });
        });
      }
    );
  }
}
