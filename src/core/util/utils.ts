import { getRouterInstance } from "@wavemaker/react-runtime/store/middleware/navigationMiddleware";
import { hyperLinkMofify } from "@/core/constants";
import { usePathname } from "next/navigation";

const REGEX = {
  SNAKE_CASE: /[A-Z]/g,
  ANDROID: /Android/i,
  IPHONE: /iPhone/i,
  IPOD: /iPod/i,
  IPAD: /iPad/i,
  MAC: /Mac/i,
  ANDROID_TABLET: /android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i,
  MOBILE: /Mobile/i,
  WINDOWS: /Windows Phone/i,
  SUPPORTED_IMAGE_FORMAT: /\.(bmp|gif|jpe|jpg|jpeg|tif|tiff|pbm|png|ico)$/i,
  SUPPORTED_FILE_FORMAT:
    /\.(txt|js|css|html|script|properties|json|java|xml|smd|xmi|sql|log|wsdl|vm|ftl|jrxml|yml|yaml|md|less|jsp)$/i,
  SUPPORTED_AUDIO_FORMAT: /\.(mp3|ogg|webm|wma|3gp|wav|m4a)$/i,
  SUPPORTED_VIDEO_FORMAT: /\.(mp4|ogg|webm|wmv|mpeg|mpg|avi|mov)$/i,
  PAGE_RESOURCE_PATH: /^\/pages\/.*\.(js|css|html|json)$/,
  MIN_PAGE_RESOURCE_PATH: /.*(page.min.html)$/,
  VALID_EMAIL: /^[a-zA-Z][\w.+]+@[a-zA-Z_]+?\.[a-zA-Z.]{1,4}[a-zA-Z]$/,
  VALID_WEB_URL: /^(http[s]?:\/\/)(www\.){0,1}[a-zA-Z0-9=:?\/\.\-]+(\.[a-zA-Z]{2,5}[\.]{0,1})?/,
  VALID_WEBSOCKET_URL: /^(ws[s]?:\/\/)(www\.){0,1}[a-zA-Z0-9=:?\/\.\-]+(\.[a-zA-Z]{2,5}[\.]{0,1})?/,
  VALID_RELATIVE_URL: /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/,
  REPLACE_PATTERN: /\$\{([^\}]+)\}/g,
  ZIP_FILE: /\.zip$/i,
  EXE_FILE: /\.exe$/i,
  NO_QUOTES_ALLOWED: /^[^'|"]*$/,
  NO_DOUBLE_QUOTES_ALLOWED: /^[^"]*$/,
  VALID_HTML: /<[a-z][\s\S]*>/i,
  VALID_PASSWORD: /^[0-9a-zA-Z-_.@&*!#$%]+$/,
  SPECIAL_CHARACTERS: /[^A-Z0-9a-z_]+/i,
  APP_SERVER_URL_FORMAT:
    /^(http[s]?:\/\/)(www\.){0,1}[a-zA-Z0-9\.\-]+([:]?[0-9]{2,5}|\.[a-zA-Z]{2,5}[\.]{0,1})\/+[^?#&=]+$/,
  JSON_DATE_FORMAT: /\d{4}-[0-1]\d-[0-3]\d(T[0-2]\d:[0-5]\d:[0-5]\d.\d{1,3}Z$)?/,
  DATA_URL:
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i,
  ISO_DATE_FORMAT: /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(\.\d+)?([+-]\d{2}:?\d{2}|Z)$/,
};

/**
 * this method checks if a given string starts with the given string
 */
const stringStartsWith = (str: string, startsWith: string, ignoreCase?: any): boolean => {
  if (!str) {
    return false;
  }

  const regEx = new RegExp("^" + startsWith, ignoreCase ? "i" : "");

  return regEx.test(str);
};

export const isInsecureContentRequest = (url: string): boolean => {
  const parser: HTMLAnchorElement = document.createElement("a");
  parser.href = url;

  // for relative urls IE returns the protocol as empty string
  if (parser.protocol === "") {
    return false;
  }

  // If the inputted source is a base64 url, do not throw insecure content error
  if (REGEX.DATA_URL.test(url)) {
    return false;
  }

  if (stringStartsWith(location.href, "https://")) {
    return parser.protocol !== "https:" && parser.protocol !== "wss:";
  }

  return false;
};

export const Utils = {
  isInsecureContentRequest,
};

export const isJQueryError = (error: any) => {
  if (!error.stack) return false;

  const UnSupportedFunctionality = ["jQuery", "$"];

  // Get the first line of stack that points to your code
  if (error.message && UnSupportedFunctionality.some(func => error.message.includes(func))) {
    return true;
  }
  const stackLines = error.stack.split("\n");
  for (let line of stackLines) {
    // Skip internal/node_modules lines, look for your code
    if (!line.includes("node_modules") && !line.includes("internal")) {
      // Check if this line contains jQuery access
      if (line.toLowerCase().includes("jquery") || line.toLowerCase().includes("$")) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Extracts query parameters from a URL using URLSearchParams
 * @param link - URL string (e.g., "#/page?param1=value1&param2=value2")
 * @returns Object with query parameters (automatically URL-decoded)
 */
export const getUrlParams = (link: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const index = link.indexOf("?");

  if (index !== -1) {
    const queryString = link.substring(index + 1);
    const searchParams = new URLSearchParams(queryString);

    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  return params;
};

/**
 * Extracts route name from a link
 * @param link - URL string (e.g., "#/page?param=value")
 * @returns Route name (e.g., "/page")
 */
export const getRouteNameFromLink = (link: string): string => {
  link = link.replace("#/", "/");
  const index = link.indexOf("?");
  if (index !== -1) {
    link = link.substring(0, index);
  }
  return link;
};

/**
 * Opens a link in browser window
 * @param link - URL to open
 * @param target - Target attribute (_blank, _self, etc.)
 */
export const openLink = (link: string, target: string = "_self") => {
  window.open(link, target);
};

/**
 * Triggers navigation action for menu item
 * Mimics Angular WaveMaker behavior:
 * 1. Executes item.action if present
 * 2. Then navigates to item.link if present
 */
export const triggerItemAction = (item: any) => {
  const router = getRouterInstance();
  const originalLink = item?.link;
  const linkTarget = item?.target;

  if (!originalLink || originalLink === "#" || originalLink === "javascript:void(0)") {
    return; // No navigation needed
  }

  // Check if it's an internal navigation link (starts with # but not external)
  if (originalLink.startsWith("#") && (!linkTarget || linkTarget === "_self")) {
    // Internal navigation - handle both "#/page" and "#page" formats
    const queryParams = getUrlParams(originalLink);
    let routeName = getRouteNameFromLink(originalLink);

    routeName = hyperLinkMofify(routeName);

    if (Object.keys(queryParams).length > 0) {
      // Filter out undefined/null/empty values like Angular router does
      const queryString = Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      if (queryString) {
        router?.push(`${routeName}?${queryString}`);
      } else {
        router?.push(routeName);
      }
    } else {
      router?.push(routeName);
    }
  } else {
    // External link or link with different target
    // For external links, use as-is (don't apply hyperLinkMofify)
    openLink(originalLink, linkTarget);
  }
};

export const getCurrentPath = () => {
  const path = usePathname();
  return path;
};

export const getItemLink = (item: any, props: any): string | undefined => {
  const linkProperty = props.itemlink || "link";
  return item[linkProperty];
};

export function hasOwnObjectProperty(obj: any, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
