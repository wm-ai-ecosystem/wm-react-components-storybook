// @ts-ignore
import DOMPurify from "dompurify";
import * as React from "react";
import {
  Formatter,
  SafeValue,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
  SecurityContext,
} from "./types";

export class TrustAsFormatter implements Formatter {
  public format(content: string, context: string | SecurityContext = "html"): string {
    if (content === null || content === undefined) {
      return "";
    }

    // Convert context to string if it's a SecurityContext enum
    let contextStr: string;
    switch (context) {
      case "html":
      case SecurityContext.HTML:
        contextStr = "html";
        break;
      case "style":
      case SecurityContext.STYLE:
        contextStr = "style";
        break;
      case "script":
      case SecurityContext.SCRIPT:
        contextStr = "script";
        break;
      case "url":
      case SecurityContext.URL:
        contextStr = "url";
        break;
      case "resource":
      case "resourceUrl":
      case SecurityContext.RESOURCE_URL:
        contextStr = "resource";
        break;
      default:
        contextStr = "html";
    }

    // Return trusted value directly based on context
    switch (contextStr) {
      case "html":
        return this.bypassSecurityTrustHtml(content);
      case "style":
        return this.bypassSecurityTrustStyle(content);
      case "script":
        return this.bypassSecurityTrustScript(content);
      case "url":
        return this.bypassSecurityTrustUrl(content);
      case "resource":
        return this.bypassSecurityTrustResourceUrl(content);
      default:
        return content;
    }
  }

  private bypassSecurityTrustHtml(value: string): string {
    return value;
  }

  private bypassSecurityTrustStyle(value: string): string {
    return value;
  }

  private bypassSecurityTrustScript(value: string): string {
    console.warn("Bypassing script security. Make sure you trust the content.");
    return value;
  }

  private bypassSecurityTrustUrl(value: string): string {
    // Basic URL validation
    try {
      new URL(value, typeof window !== "undefined" ? window.location.origin : "http://localhost");
      return value;
    } catch {
      console.warn("Invalid URL provided to trustAs formatter:", value);
      return "";
    }
  }

  private bypassSecurityTrustResourceUrl(value: string): string {
    // Basic URL validation for resource URLs
    try {
      new URL(value, typeof window !== "undefined" ? window.location.origin : "http://localhost");
      return value;
    } catch {
      console.warn("Invalid resource URL provided to trustAs formatter:", value);
      return "";
    }
  }

  // Helper method to check if a value is trusted
  public static isTrustedValue(value: any): value is SafeValue {
    return value && typeof value === "object" && "__trustAs" in value && "__trustedValue" in value;
  }

  // Helper method to extract trusted value
  public static getTrustedValue(value: any): string {
    if (this.isTrustedValue(value)) {
      return value.__trustedValue;
    }
    return value;
  }

  // Helper method to get trust type
  public static getTrustType(value: any): string | null {
    if (this.isTrustedValue(value)) {
      return value.__trustAs;
    }
    return null;
  }
}

export class SanitizeFormatter implements Formatter {
  public format(
    input: string | SafeValue,
    sanitizeType: "html" | "script" | "style" | "url" | "resourceUrl" = "html"
  ): string {
    if (!input) return input as string;

    // Check if input is already trusted - if so, return the trusted value
    if (TrustAsFormatter.isTrustedValue(input)) {
      return TrustAsFormatter.getTrustedValue(input);
    }

    switch (sanitizeType) {
      case "html":
        return this.sanitizeHtml(input as string);
      case "script":
        // Scripts should be completely removed for security
        return "";
      case "style":
        return this.sanitizeStyle(input as string);
      case "url":
      case "resourceUrl":
        return this.sanitizeUrl(input as string);
      default:
        return this.sanitizeHtml(input as string); // Default to HTML sanitization
    }
  }

  private sanitizeHtml(html: string): string {
    try {
      // Check if we're in a browser environment and DOMPurify is available
      if (typeof window !== "undefined" && DOMPurify && typeof DOMPurify.sanitize === "function") {
        // Use DOMPurify for robust HTML sanitization
        // Configure DOMPurify to allow common safe tags and attributes
        const cleanHtml = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            "p",
            "div",
            "span",
            "a",
            "strong",
            "em",
            "u",
            "b",
            "i",
            "ul",
            "ol",
            "li",
            "br",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "pre",
            "code",
            "table",
            "thead",
            "tbody",
            "tr",
            "td",
            "th",
            "img",
            "video",
            "audio",
            "source",
          ],
          ALLOWED_ATTR: [
            "href",
            "title",
            "alt",
            "src",
            "width",
            "height",
            "class",
            "id",
            "style",
            "target",
            "rel",
            "data-*",
          ],
          ALLOW_DATA_ATTR: true,
          ALLOWED_URI_REGEXP:
            /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        });

        return cleanHtml;
      } else {
        // Fallback to basic sanitization if DOMPurify is not available (e.g., in Node.js)
        return this.basicHtmlSanitization(html);
      }
    } catch (error) {
      console.error("HTML sanitization failed:", error);
      // Fallback to basic sanitization if DOMPurify fails
      return this.basicHtmlSanitization(html);
    }
  }

  private basicHtmlSanitization(html: string): string {
    // Fallback basic HTML sanitization
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "") // Remove event handlers
      .replace(/\s*javascript:\s*[^"'\s>]*/gi, "") // Remove javascript: URLs
      .replace(/<iframe\b[^>]*>/gi, "") // Remove iframes
      .replace(/<object\b[^>]*>/gi, "") // Remove objects
      .replace(/<embed\b[^>]*>/gi, ""); // Remove embeds
  }

  private sanitizeStyle(style: string): string {
    try {
      // Check if we're in a browser environment and DOMPurify is available
      if (typeof window !== "undefined" && DOMPurify && typeof DOMPurify.sanitize === "function") {
        // Use DOMPurify for CSS sanitization
        const cleanStyle = DOMPurify.sanitize(`<div style="${style}"></div>`, {
          ALLOWED_TAGS: ["div"],
          ALLOWED_ATTR: ["style"],
        });

        // Extract the style attribute value
        const match = cleanStyle.match(/style="([^"]*)"/);
        return match ? match[1] : "";
      } else {
        // Fallback to basic style sanitization
        return style
          .replace(/expression\s*\(/gi, "")
          .replace(/javascript:/gi, "")
          .replace(/url\s*\(\s*["']?\s*javascript:/gi, "");
      }
    } catch (error) {
      console.error("Style sanitization failed:", error);
      // Fallback to basic style sanitization
      return style
        .replace(/expression\s*\(/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/url\s*\(\s*["']?\s*javascript:/gi, "");
    }
  }

  private sanitizeUrl(url: string): string {
    try {
      // Check if we're in a browser environment and DOMPurify is available
      if (typeof window !== "undefined" && DOMPurify && typeof DOMPurify.sanitize === "function") {
        // Use DOMPurify for URL sanitization
        const cleanUrl = DOMPurify.sanitize(`<a href="${url}"></a>`, {
          ALLOWED_TAGS: ["a"],
          ALLOWED_ATTR: ["href"],
        });

        // Extract the href attribute value
        const match = cleanUrl.match(/href="([^"]*)"/);
        const sanitizedUrl = match ? match[1] : "";

        // Additional validation
        if (sanitizedUrl && this.isValidUrl(sanitizedUrl)) {
          return sanitizedUrl;
        }

        return "";
      } else {
        // Fallback to basic URL validation
        return this.basicUrlSanitization(url);
      }
    } catch (error) {
      console.error("URL sanitization failed:", error);
      // Fallback to basic URL validation
      return this.basicUrlSanitization(url);
    }
  }

  private basicUrlSanitization(url: string): string {
    // Allow only safe URL schemes
    const safeSchemes = /^(https?|ftp|mailto|tel):/i;
    const dataScheme = /^data:[^;]+;base64,/i;

    if (
      safeSchemes.test(url) ||
      dataScheme.test(url) ||
      url.startsWith("/") ||
      url.startsWith("./") ||
      url.startsWith("../")
    ) {
      return url;
    }

    // If URL doesn't match safe patterns, return empty string
    return "";
  }

  private isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(
        url,
        typeof window !== "undefined" ? window.location.origin : "http://localhost"
      );
      const allowedProtocols = ["http:", "https:", "mailto:", "tel:", "ftp:"];
      return allowedProtocols.includes(urlObj.protocol);
    } catch {
      // Check for relative URLs
      return url.startsWith("/") || url.startsWith("./") || url.startsWith("../");
    }
  }
}

// React utility component to safely render trusted content
export const TrustedContent = ({ value, fallback = "" }: { value: any; fallback?: string }) => {
  if (TrustAsFormatter.isTrustedValue(value)) {
    const trustType = TrustAsFormatter.getTrustType(value);
    const trustedValue = TrustAsFormatter.getTrustedValue(value);

    switch (trustType) {
      case "html":
        // For HTML content, use dangerouslySetInnerHTML
        return React.createElement("div", {
          dangerouslySetInnerHTML: { __html: trustedValue },
        });
      case "style":
        // For style content, return as style attribute
        return React.createElement("div", {
          style: trustedValue,
        });
      case "url":
      case "resource":
        // For URLs, return as href or src depending on usage
        return trustedValue;
      default:
        return trustedValue || fallback;
    }
  }

  // For non-trusted content, return as plain text or fallback
  return value || fallback;
};
