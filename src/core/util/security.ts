import DOMPurify from "dompurify";
import startsWith from "lodash-es/startsWith";

/**
 * Security context types that can be trusted
 */
export enum SecurityContext {
  HTML = "HTML",
  STYLE = "STYLE",
  SCRIPT = "SCRIPT",
  URL = "URL",
  RESOURCE_URL = "RESOURCE_URL",
}

export type SafeHtml = string & { __safeHtml: never };
export type SafeStyle = string & { __safeStyle: never };
export type SafeScript = string & { __safeScript: never };
export type SafeUrl = string & { __safeUrl: never };
export type SafeResourceUrl = string & { __safeResourceUrl: never };

/**
 * Security service for sanitizing and trusting content
 */
export class SecurityService {
  private static instance: SecurityService;

  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  /**
   * Sanitize HTML content
   */
  public sanitizeHtml(content: string): SafeHtml {
    if (!content) return "" as SafeHtml;
    return DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
    }) as SafeHtml;
  }

  /**
   * Sanitize style content
   */
  public sanitizeStyle(content: string): SafeStyle {
    if (!content) return "" as SafeStyle;
    return DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: ["style"],
      ALLOWED_ATTR: ["type"],
    }) as SafeStyle;
  }

  /**
   * Sanitize script content
   */
  public sanitizeScript(content: string): SafeScript {
    if (!content) return "" as SafeScript;
    // Note: DOMPurify strips scripts by default for security
    // Only use this for trusted sources
    return content as SafeScript;
  }

  /**
   * Sanitize URL
   */
  public sanitizeUrl(content: string): SafeUrl {
    if (!content) return "" as SafeUrl;
    // Basic URL sanitization
    const url = content.trim().toLowerCase();
    if (url.startsWith("javascript:") || url.startsWith("data:") || url.startsWith("vbscript:")) {
      return "" as SafeUrl;
    }
    return content as SafeUrl;
  }

  /**
   * Sanitize Resource URL
   */
  public sanitizeResourceUrl(content: string): SafeResourceUrl {
    if (!content) return "" as SafeResourceUrl;
    // First sanitize as a regular URL, then cast to resource URL
    const sanitizedUrl = this.sanitizeUrl(content);
    return (sanitizedUrl ? String(sanitizedUrl) : "") as SafeResourceUrl;
  }

  /**
   * Trust content based on security context
   */
  public trustAs(content: string, context: SecurityContext): string {
    if (!content) return "";

    switch (context) {
      case SecurityContext.HTML:
        return this.sanitizeHtml(content);
      case SecurityContext.STYLE:
        return this.sanitizeStyle(content);
      case SecurityContext.SCRIPT:
        return this.sanitizeScript(content);
      case SecurityContext.URL:
        return this.sanitizeUrl(content);
      case SecurityContext.RESOURCE_URL:
        return this.sanitizeResourceUrl(content);
      default:
        return "";
    }
  }
}

// Create hooks for easy use in React components
import { useMemo } from "react";

export const useTrustAs = (content: string, context: SecurityContext) => {
  return useMemo(() => {
    return SecurityService.getInstance().trustAs(content, context);
  }, [content, context]);
};

export const useSafeHtml = (content: string) => {
  return useMemo(() => {
    return SecurityService.getInstance().sanitizeHtml(content);
  }, [content]);
};

export const useSafeStyle = (content: string) => {
  return useMemo(() => {
    return SecurityService.getInstance().sanitizeStyle(content);
  }, [content]);
};

export const useSafeUrl = (content: string) => {
  return useMemo(() => {
    return SecurityService.getInstance().sanitizeUrl(content);
  }, [content]);
};

export const useSafeResourceUrl = (content: string) => {
  return useMemo(() => {
    return SecurityService.getInstance().sanitizeResourceUrl(content);
  }, [content]);
};

export const isInsecureContentRequest = (url: string): boolean => {
  const REGEX_DATA_URL =
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i;

  const parser: HTMLAnchorElement = document.createElement("a");
  parser.href = url;

  // for relative urls IE returns the protocol as empty string
  if (parser.protocol === "") {
    return false;
  }

  // If the inputted source is a base64 url, do not throw insecure content error
  if (REGEX_DATA_URL.test(url)) {
    return false;
  }

  if (startsWith(location.href, "https://")) {
    return parser.protocol !== "https:" && parser.protocol !== "wss:";
  }

  return false;
};

// Export singleton instance
export const securityService = SecurityService.getInstance();
