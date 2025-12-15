// Base formatter interface
export interface Formatter {
  format: (input: any, ...params: any) => any;
}

// Trust marker interfaces to match Angular's DomSanitizer behavior
export interface SafeValue {
  __trustAs: string;
  __trustedValue: string;
}

export interface SafeHtml extends SafeValue {
  __trustAs: "html";
}

export interface SafeStyle extends SafeValue {
  __trustAs: "style";
}

export interface SafeScript extends SafeValue {
  __trustAs: "script";
}

export interface SafeUrl extends SafeValue {
  __trustAs: "url";
}

export interface SafeResourceUrl extends SafeValue {
  __trustAs: "resource";
}

// Security Context enum to match Angular's SecurityContext
export enum SecurityContext {
  NONE = 0,
  HTML = 1,
  STYLE = 2,
  SCRIPT = 3,
  URL = 4,
  RESOURCE_URL = 5,
}

// Date formatter interface
export interface DateFormatter {
  format: (input: Date | string | number | null | undefined, format: string) => string;
}
