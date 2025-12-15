import { keys, merge, isObject, isArray } from "lodash-es";

export type StorageType = "localStorage" | "sessionStorage" | "URL" | "none";
type WidgetType = "accordion" | "tabs" | "list" | "table";

interface StateConfig {
  name: string;
  type: WidgetType;
  storage: StorageType;
}

// Storage keys
const WM_STATE_KEY = "wm_state";
const WM_STATE_URL_PARAM = "wm_state";
// Default workspace name
const DEFAULT_WORKSPACE = "ws";

// Generate storage key for localStorage/sessionStorage (page-specific)
const getStorageKey = (): string => {
  if (typeof window === "undefined") return WM_STATE_KEY;
  return (
    window.location.pathname.replace(/\//g, "").replace("react-pages/", "") + "_" + WM_STATE_KEY
  );
};

// Get current page name from pathname
const getCurrentPageName = (): string => {
  if (typeof window === "undefined") return "";
  const segments = window.location.pathname.split("/").filter(Boolean);
  return segments[segments.length - 1] || "Main";
};

// Convert JSON to URL-friendly encoded format (no quotes needed)
const jsonToUri = (jsonObj: any): string => {
  // Custom stringify that doesn't use quotes
  const customStringify = (obj: any): string => {
    if (obj === null) return "null";
    if (obj === undefined) return "undefined";
    if (typeof obj === "string") return obj;
    if (typeof obj === "number" || typeof obj === "boolean") return String(obj);

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "!*";
      return "!" + obj.map(customStringify).join("_") + "*";
    }

    if (typeof obj === "object") {
      const pairs: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        pairs.push(key + "~" + customStringify(value));
      }
      if (pairs.length === 0) return "()";
      return "(" + pairs.join("_") + ")";
    }

    return String(obj);
  };

  return customStringify(jsonObj);
};

// Decode URL-encoded format back to object
const uriToJson = (encodedObj: string): any => {
  try {
    // First decode any URL encoding
    const decoded = decodeURIComponent(encodedObj);

    // Custom parser for our format
    const parse = (str: string, startIndex: number = 0): { value: any; endIndex: number } => {
      if (str[startIndex] === "(") {
        // Parse object
        const obj: any = {};
        let i = startIndex + 1;

        while (i < str.length && str[i] !== ")") {
          // Check for empty object
          if (str[i] === ")") break;

          // Parse key
          let key = "";
          while (i < str.length && str[i] !== "~") {
            key += str[i];
            i++;
          }
          i++; // skip '~'

          // Parse value
          const { value, endIndex } = parse(str, i);
          obj[key] = value;
          i = endIndex;

          if (str[i] === "_") {
            i++; // skip '_' separator
          }
        }

        return { value: obj, endIndex: i + 1 }; // skip ')'
      } else if (str[startIndex] === "!") {
        // Parse array
        const arr: any[] = [];
        let i = startIndex + 1;

        while (i < str.length && str[i] !== "*") {
          const { value, endIndex } = parse(str, i);
          arr.push(value);
          i = endIndex;

          if (str[i] === "_") {
            i++; // skip '_' separator
          }
        }

        return { value: arr, endIndex: i + 1 }; // skip '*'
      } else {
        // Parse primitive
        let value = "";
        let i = startIndex;

        while (i < str.length && str[i] !== "_" && str[i] !== ")" && str[i] !== "*") {
          value += str[i];
          i++;
        }

        // Convert to appropriate type
        if (value === "null") return { value: null, endIndex: i };
        if (value === "undefined") return { value: undefined, endIndex: i };
        if (value === "true") return { value: true, endIndex: i };
        if (value === "false") return { value: false, endIndex: i };

        // Check if it's a number
        const num = Number(value);
        if (!isNaN(num) && value !== "") {
          return { value: num, endIndex: i };
        }

        return { value, endIndex: i };
      }
    };

    const { value } = parse(decoded);
    return value;
  } catch (e) {
    console.warn("Failed to parse state from URL:", e);
    return {};
  }
};

// Get all widget states from storage
const getAllStates = (storage: StorageType): Record<string, any> => {
  switch (storage) {
    case "localStorage":
      const localData = localStorage.getItem(getStorageKey());
      try {
        return localData ? JSON.parse(localData) : {};
      } catch {
        return {};
      }
    case "sessionStorage":
      const sessionData = sessionStorage.getItem(getStorageKey());
      try {
        return sessionData ? JSON.parse(sessionData) : {};
      } catch {
        return {};
      }
    case "URL":
      // Get the raw URL parameter value
      const searchParams = window.location.search;
      const match = searchParams.match(new RegExp(`[?&]${WM_STATE_URL_PARAM}=([^&]+)`));
      if (!match || !match[1]) return {};

      // Use Angular's decoding approach
      return uriToJson(match[1]);
    default:
      return {};
  }
};

// Set all widget states to storage
const setAllStates = (storage: StorageType, states: Record<string, any>) => {
  switch (storage) {
    case "localStorage":
      localStorage.setItem(getStorageKey(), JSON.stringify(states));
      break;
    case "sessionStorage":
      sessionStorage.setItem(getStorageKey(), JSON.stringify(states));
      break;
    case "URL":
      const url = new URL(window.location.href);
      const urlParams = new URLSearchParams(url.search);

      if (keys(states).length > 0) {
        // Use Angular's encoding approach
        const encodedState = jsonToUri(states);

        // Remove existing wm_state param
        urlParams.delete(WM_STATE_URL_PARAM);

        // Build URL manually to avoid double encoding
        let newSearch = urlParams.toString();
        if (newSearch) {
          newSearch += "&";
        }
        newSearch += `${WM_STATE_URL_PARAM}=${encodedState}`;
        url.search = newSearch ? "?" + newSearch : "";
      } else {
        urlParams.delete(WM_STATE_URL_PARAM);
        url.search = urlParams.toString();
      }

      window.history.replaceState({ path: url.toString() }, "", url.toString());
      break;
  }
};

export const getWidgetState = (config: StateConfig) => {
  const { name, type, storage } = config;
  const allStates = getAllStates(storage);

  // For URL storage, use flat structure (Angular style)
  // For localStorage/sessionStorage, use page-specific structure
  if (storage === "URL") {
    const widgetData = allStates[DEFAULT_WORKSPACE]?.[name];
    return widgetData || null;
  } else {
    const currentPageName = getCurrentPageName();
    const widgetData = allStates[currentPageName]?.[DEFAULT_WORKSPACE]?.[name];
    return widgetData || null;
  }
};

export const setWidgetState = (config: StateConfig, value: any) => {
  const { name, type, storage } = config;

  if (storage === "none") {
    return;
  }

  const allStates = getAllStates(storage);

  // For URL storage, use flat structure (Angular style)
  if (storage === "URL") {
    // Ensure the workspace exists
    if (!allStates[DEFAULT_WORKSPACE]) {
      allStates[DEFAULT_WORKSPACE] = {};
    }

    // Update the specific widget state
    if (isObject(value) && !isArray(value) && allStates[DEFAULT_WORKSPACE][name]) {
      const existingValue = allStates[DEFAULT_WORKSPACE][name];
      if (isObject(existingValue) && !isArray(existingValue)) {
        merge(existingValue, value);
      } else {
        allStates[DEFAULT_WORKSPACE][name] = value;
      }
    } else {
      allStates[DEFAULT_WORKSPACE][name] = value;
    }
  } else {
    // For localStorage/sessionStorage, use page-specific structure
    const currentPageName = getCurrentPageName();

    // Ensure the hierarchy exists: Page -> workspace -> widget
    if (!allStates[currentPageName]) {
      allStates[currentPageName] = {};
    }
    if (!allStates[currentPageName][DEFAULT_WORKSPACE]) {
      allStates[currentPageName][DEFAULT_WORKSPACE] = {};
    }

    // Update the specific widget state
    if (isObject(value) && !isArray(value) && allStates[currentPageName][DEFAULT_WORKSPACE][name]) {
      const existingValue = allStates[currentPageName][DEFAULT_WORKSPACE][name];
      if (isObject(existingValue) && !isArray(existingValue)) {
        merge(existingValue, value);
      } else {
        allStates[currentPageName][DEFAULT_WORKSPACE][name] = value;
      }
    } else {
      allStates[currentPageName][DEFAULT_WORKSPACE][name] = value;
    }
  }

  // Save the updated state hierarchy
  setAllStates(storage, allStates);
};

export const clearWidgetState = (config: StateConfig) => {
  const { name, type, storage } = config;

  if (storage === "none") {
    return;
  }

  const allStates = getAllStates(storage);

  // For URL storage, use flat structure
  if (storage === "URL") {
    if (allStates[DEFAULT_WORKSPACE]) {
      delete allStates[DEFAULT_WORKSPACE][name];

      // Clean up empty workspace
      if (keys(allStates[DEFAULT_WORKSPACE]).length === 0) {
        delete allStates[DEFAULT_WORKSPACE];
      }
    }
  } else {
    // For localStorage/sessionStorage, use page-specific structure
    const currentPageName = getCurrentPageName();

    if (allStates[currentPageName]?.[DEFAULT_WORKSPACE]) {
      delete allStates[currentPageName][DEFAULT_WORKSPACE][name];

      // Clean up empty objects
      if (keys(allStates[currentPageName][DEFAULT_WORKSPACE]).length === 0) {
        delete allStates[currentPageName][DEFAULT_WORKSPACE];
      }
      if (keys(allStates[currentPageName]).length === 0) {
        delete allStates[currentPageName];
      }
    }
  }

  // Save the updated state hierarchy
  setAllStates(storage, allStates);
};
