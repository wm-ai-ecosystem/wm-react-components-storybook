import get from "lodash-es/get";
import { store } from "@wavemaker/react-runtime/store";
import { isArray, isObject, isString } from "lodash-es";

export const VALIDATOR = {
  REQUIRED: "required",
  MAXCHARS: "maxchars",
  MINVALUE: "minvalue",
  MAXVALUE: "maxvalue",
  REGEXP: "regexp",
  MINDATE: "mindate",
  MAXDATE: "maxdate",
  MINTIME: "mintime",
  MAXTIME: "maxtime",
  EXCLUDEDATES: "excludedates",
  EXCLUDEDAYS: "excludedays",
};
export const MATCH_MODES = {
  STARTS_WITH_IGNORE_CASE: "startignorecase",
  STARTS_WITH: "start",
  ENDS_WITH_IGNORE_CASE: "endignorecase",
  ENDS_WITH: "end",
  CONTAINS: "anywhere",
  CONTAINS_IGNORE_CASE: "anywhereignorecase",
  IS_EQUAL_WITH_IGNORE_CASE: "exactignorecase",
  IS_EQUAL: "exact",
};
export const MONTHNAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const checkPublicAccess = (page?: string) => {
  const pageName = page || window.location.pathname?.split("/").at(-1);
  return (
    store.getState().info.appConfig?.pages?.find((page: any) => page.name === pageName)
      ?.permission === "PermitAll"
  );
};

export const setSessionStorageItem = (key: string, value: string) => {
  const id = store.getState().info.appConfig.appProperties.displayName;
  let item: any = window.sessionStorage.getItem(id);

  if (item) {
    item = JSON.parse(item);
  } else {
    item = {};
  }
  item[key] = value;

  window.sessionStorage.setItem(id, JSON.stringify(item));
};

export const getSessionStorageItem = (key: string) => {
  const id = store.getState().info.appConfig.appProperties.displayName;
  let item: any = window && window.sessionStorage && window.sessionStorage.getItem(id);

  if (item) {
    item = JSON.parse(item);
    return item[key];
  }
};

export const formatMessage = (fragment: any, expression: string) => {
  return get(fragment, `appLocale.${expression}`, expression);
};

// Reload the app
export function reload() {
  window.location.reload();
}

export const toNumber = (value: any) => {
  if (value === null || value === undefined) {
    return null;
  }
  return Number(value);
};

export const _get = get;

const _deepCopy = (o1: any, ...o2: any) => {
  o2.forEach((o: any) => {
    if (o) {
      Object.keys(o).forEach(k => {
        const v = o[k];
        if (v && !isString(v) && !isArray(v) && typeof v === "object") {
          o1[k] = _deepCopy(o1[k] || {}, o[k]);
        } else {
          o1[k] = _deepCopy(v);
        }
      });
    }
  });
  return o1;
};

export const deepCopy = (...objects: any) => _deepCopy({}, ...objects);

export const getValidJSON = (content: any) => {
  if (!content) {
    return undefined;
  }
  try {
    const parsedIntValue = parseInt(content, 10);
    return isObject(content) || !isNaN(parsedIntValue) ? content : JSON.parse(content);
  } catch (e) {
    return undefined;
  }
};

export const isDefined = (v: unknown): boolean => typeof v !== "undefined";

export const replace = (template: string, map: Record<string, any>, parseError?: boolean) => {
  let regEx = /\$\{([^\}]+)\}/g;
  if (!template) {
    return;
  }
  if (parseError) {
    regEx = /\{([^\}]+)\}/g;
  }

  return template.replace(regEx, function (match, key) {
    return get(map, key);
  });
};

// Get current month function
export function getCurrentMonth() {
  const currentDate = new Date();
  return MONTHNAMES[currentDate.getMonth()];
}
