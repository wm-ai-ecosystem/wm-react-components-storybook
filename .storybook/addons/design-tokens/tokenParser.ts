/**
 * ============================================================================
 * DESIGN TOKENS JSON PARSER
 * ============================================================================
 *
 * This file parses design token JSON files from /src/designTokens/
 * and converts them into a format usable by the Design Tokens panel.
 *
 * JSON Structure (example from wm-button.json):
 * {
 *   "btn": {
 *     "meta": { selector, states... },
 *     "mapping": { background, color, font-size,... },
 *     "appearances": {
 *       "filled": {
 *         "variantGroups": {
 *           "status": {
 *             "primary": { background, color,... },
 *             "secondary": { background, color,... }
 *           }
 *         }
 *       },
 *       "outlined": {...},
 *       "text": {...}
 *     }
 *   }
 * }
 *
 * Output:
 * - Base tokens from btn.mapping (apply to all buttons)
 * - Variant tokens merged: base + appearance + variant
 *   Example: "filled-primary" = btn.mapping + btn.appearances.filled.mapping + btn.appearances.filled.variantGroups.status.primary
 */

import { TokenDefinition, TokenControlType, ComponentTokenConfig } from "./types";

/**
 * Determines the UI control type based on token attributes
 *
 * @param type - Token type from JSON
 * @param subtype - Token subtype from attributes.subtype in JSON
 * @returns The appropriate control type for the UI
 *
 * Examples:
 * - subtype="color" → "color" (color picker)
 * - subtype="font-size" → "text" (text input)
 * - subtype="text-transform" → "select" (dropdown with uppercase/lowercase/etc)
 * - subtype="opacity" → "number" (number input 0-1)
 */
function getControlType(type: string, subtype?: string): TokenControlType {
  if (subtype === "color") return "color";
  if (subtype === "font-size" || subtype === "space" || subtype === "radius" || subtype === "border-width") {
    return "text";
  }
  if (subtype === "text-transform" || subtype === "border-style" || subtype === "cursor") {
    return "select";
  }
  if (subtype === "opacity") return "number";
  return "text";
}

/**
 * Gets dropdown options for select controls
 *
 * @param subtype - Token subtype from JSON
 * @returns Array of option strings for the dropdown
 *
 * Example: subtype="text-transform" → ["none", "uppercase", "lowercase", "capitalize"]
 */
function getSelectOptions(subtype?: string): string[] | undefined {
  const optionsMap: Record<string, string[]> = {
    "text-transform": ["none", "uppercase", "lowercase", "capitalize"],
    "border-style": ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none"],
    "cursor": ["auto", "pointer", "default", "not-allowed", "help", "wait", "text", "move", "grab", "grabbing", "crosshair", "progress", "copy", "alias", "no-drop", "zoom-in", "zoom-out"],
  };
  return subtype ? optionsMap[subtype] : undefined;
}

/**
 * Generates CSS variable name from component key and token path
 *
 * @param componentKey - Component identifier (e.g., "btn")
 * @param path - Token path array (e.g., ["background"])
 * @returns CSS variable name (e.g., "--wm-btn-background")
 *
 * Examples:
 * - componentKey="btn", path=["background"] → "--wm-btn-background"
 * - componentKey="btn", path=["border", "color"] → "--wm-btn-border-color"
 * - componentKey="btn", path=["states", "hover", "state", "layer", "opacity"] → "--wm-btn-states-hover-state-layer-opacity"
 */
function getCSSVariableName(componentKey: string, path: string[]): string {
  const tokenPath = path.join("-");
  return `--wm-${componentKey}-${tokenPath}`;
}

/**
 * Removes HTML tags from description text
 *
 * @param description - Description text from JSON (may contain <br> tags)
 * @returns Clean text without HTML tags
 */
function cleanDescription(description?: string): string {
  if (!description) return "";
  return description
    .replace(/<br>/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();
}

/**
 * Resolves token reference values like {color.primary.@.value}
 *
 * The JSON uses references to shared color/space/font values.
 * This function maps those references to actual CSS values.
 *
 * @param value - Token value (may be a reference or literal)
 * @returns Resolved CSS value
 *
 * Examples:
 * - "{color.primary.@.value}" → "#1976d2"
 * - "{space.6.value}" → "24px"
 * - "solid" → "solid" (literal value, no change)
 */
function resolveTokenValue(value: string): string {
  // Color mappings (from @wavemaker/app-runtime-wm-build/wmapp/styles/foundation/foundation.css)
  const colorMap: Record<string, string> = {
    "{color.primary.@.value}": "#FF7250",
    "{color.secondary.@.value}": "#656DF9",
    "{color.success.@.value}": "#5AC588",
    "{color.error.@.value}": "#f44336",
    "{color.warning.@.value}": "#ffae00",
    "{color.info.@.value}": "#00c8ff",
    "{color.tertiary.@.value}": "#E0B313",
    "{color.surface.@.value}": "#FFFFFF",
    "{color.on-surface.@.value}": "#1D1B20",
    "{color.on-primary.@.value}": "#FFFFFF",
    "{color.on-secondary.@.value}": "#FFFFFF",
    "{color.on-tertiary.@.value}": "#FFFFFF",
    "{color.transparent.value}": "transparent",
    "{color.surface.container.highest.@.value}": "#dfe0e9",
    "{color.on-surface.variant.@.value}": "#4F556D",
  };

  // Space/size mappings
  const spaceMap: Record<string, string> = {
    "{space.0.value}": "0px",
    "{space.2.value}": "8px",
    "{space.3.value}": "12px",
    "{space.6.value}": "24px",
    "{space.10.value}": "40px",
    "{radius.sm.value}": "4px",
    "{icon.size.md.value}": "20px",
  };

  // Font mappings
  const fontMap: Record<string, string> = {
    "{label.large.font-size.value}": "14px",
    "{label.large.font-family.value}": "inherit",
    "{label.large.font-weight.value}": "500",
    "{label.large.line-height.value}": "1.5",
    "{label.large.letter-spacing.value}": "0",
  };

  // Opacity mappings
  const opacityMap: Record<string, string> = {
    "{opacity.hover.value}": "0.08",
    "{opacity.focus.value}": "0.12",
    "{opacity.active.value}": "0.12",
  };

  // Combine all mappings
  const allMappings = { ...colorMap, ...spaceMap, ...fontMap, ...opacityMap };

  // Handle values with multiple token references (e.g., "{space.0.value} {space.6.value}")
  // Replace each token reference with its resolved value
  let resolvedValue = value;
  for (const [token, replacement] of Object.entries(allMappings)) {
    resolvedValue = resolvedValue.replace(new RegExp(token.replace(/[{}]/g, '\\$&'), 'g'), replacement);
  }

  return resolvedValue;
}

/**
 * Recursively parses a nested token object from JSON
 *
 * This function walks through the JSON structure and extracts token definitions.
 * It looks for objects with a "value" property, which indicates an actual token.
 *
 * @param obj - Current object being parsed
 * @param componentKey - Component identifier (e.g., "btn")
 * @param parentPath - Current path in the token hierarchy
 * @param category - Category name for grouping tokens in the UI
 * @returns Array of TokenDefinition objects
 *
 * Example JSON:
 * {
 *   "background": {
 *     "value": "{color.primary.@.value}",
 *     "type": "color",
 *     "attributes": { "subtype": "color", "description": "..." }
 *   },
 *   "border": {
 *     "color": {
 *       "value": "{color.primary.@.value}",
 *       ...
 *     },
 *     "width": {
 *       "value": "1px",
 *       ...
 *     }
 *   }
 * }
 *
 * Produces:
 * [
 *   { name: "--wm-btn-background", label: "Background", value: "#1976d2", ... },
 *   { name: "--wm-btn-border-color", label: "Color", value: "#1976d2", ... },
 *   { name: "--wm-btn-border-width", label: "Width", value: "1px", ... }
 * ]
 */
function parseTokenObject(
  obj: any,
  componentKey: string,
  parentPath: string[] = [],
  category?: string
): TokenDefinition[] {
  const tokens: TokenDefinition[] = [];

  for (const [key, value] of Object.entries(obj)) {
    // Check if this is a token definition (has a "value" property)
    if (key === "value" && typeof value === "string") {
      const currentPath = [...parentPath];
      const cssVar = getCSSVariableName(componentKey, currentPath);
      const parentObj = obj as any;

      const token: TokenDefinition = {
        name: cssVar,
        label: currentPath[currentPath.length - 1]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        value: resolveTokenValue(value),
        type: parentObj.type || "text",
        controlType: getControlType(parentObj.type, parentObj.attributes?.subtype),
        description: cleanDescription(parentObj.attributes?.description),
        category,
        options: getSelectOptions(parentObj.attributes?.subtype),
      };

      tokens.push(token);
    } else if (typeof value === "object" && value !== null && key !== "attributes") {
      // Recursively parse nested objects
      const newPath = [...parentPath, key];
      const newCategory = category || (parentPath.length === 0 ? key : category);
      tokens.push(...parseTokenObject(value, componentKey, newPath, newCategory));
    }
  }

  return tokens;
}

/**
 * Main entry point: Parses the complete design token JSON file
 *
 * This function extracts:
 * 1. Base tokens from componentKey.mapping
 * 2. Variant tokens from componentKey.appearances.{appearance}.variantGroups.status.{variant}
 *
 * @param tokenData - Complete JSON object (e.g., contents of wm-button.json)
 * @param componentKey - Component identifier (e.g., "btn" from JSON root)
 * @returns ComponentTokenConfig with base tokens and all variants
 *
 * Example:
 * Input: parseDesignTokens(buttonTokensData, "btn")
 * Output: {
 *   componentName: "btn",
 *   selector: ".app-button,button,.btn",
 *   tokens: [base tokens from btn.mapping],
 *   variants: {
 *     "filled-primary": [tokens for btn-filled btn-primary],
 *     "filled-secondary": [tokens for btn-filled btn-secondary],
 *     "outlined-primary": [tokens for btn-outlined btn-primary],
 *     ...
 *   }
 * }
 */
export function parseDesignTokens(tokenData: any, componentKey: string): ComponentTokenConfig {
  const componentData = tokenData[componentKey];

  if (!componentData) {
    throw new Error(`Component "${componentKey}" not found in token data`);
  }

  // Parse base mapping tokens (applies to all variants)
  const baseTokens = parseTokenObject(componentData.mapping, componentKey);

  // Parse variant tokens from appearances
  // Structure: appearances.{appearance}.variantGroups.status.{variant}
  const variants: Record<string, TokenDefinition[]> = {};

  if (componentData.appearances) {
    for (const [appearanceKey, appearanceValue] of Object.entries(componentData.appearances)) {
      const appearanceData = appearanceValue as any;

      // Parse appearance-level mapping (applies to all variants of this appearance)
      const appearanceTokens = parseTokenObject(appearanceData.mapping || {}, componentKey);

      // Parse variantGroups (e.g., status: primary, secondary, tertiary)
      if (appearanceData.variantGroups) {
        for (const [, groupValue] of Object.entries(appearanceData.variantGroups)) {
          const groupData = groupValue as any;

          for (const [variantKey, variantValue] of Object.entries(groupData)) {
            // Parse variant-specific tokens
            const variantTokens = parseTokenObject(variantValue, componentKey);

            // Create variant key (e.g., "filled-primary", "outlined-secondary")
            const variantName = `${appearanceKey}-${variantKey}`;

            // Merge: base + appearance + variant tokens
            // Variant tokens override appearance tokens, which override base tokens
            variants[variantName] = [...appearanceTokens, ...variantTokens];
          }
        }
      }
    }
  }

  return {
    componentName: componentKey,
    selector: componentData.meta?.mapping?.selector?.web || `.${componentKey}`,
    tokens: baseTokens,
    variants,
  };
}

/**
 * Extracts appearance and variant from className string
 *
 * @param className - CSS class string (e.g., "btn-filled btn-primary")
 * @returns Object with appearance and variant
 *
 * Examples:
 * - "btn-filled btn-primary" → { appearance: "filled", variant: "primary" }
 * - "btn-outlined btn-secondary" → { appearance: "outlined", variant: "secondary" }
 * - "btn-text btn-tertiary" → { appearance: "text", variant: "tertiary" }
 */
export function parseClassName(className: string): { appearance: string; variant: string } {
  const classes = className.split(" ");
  let appearance = "filled"; // default
  let variant = "default"; // default

  // Look for appearance (filled, outlined, text, transparent)
  const appearanceMatch = classes.find((c) =>
    ["filled", "outlined", "text", "transparent"].some((a) => c.includes(a))
  );
  if (appearanceMatch) {
    appearance = appearanceMatch.replace("btn-", "");
  }

  // Look for variant (primary, secondary, tertiary, default)
  const variantMatch = classes.find((c) =>
    ["primary", "secondary", "tertiary", "default"].includes(c.replace("btn-", ""))
  );
  if (variantMatch) {
    variant = variantMatch.replace("btn-", "");
  }

  return { appearance, variant };
}

/**
 * Gets tokens for a specific className (merges base + variant tokens)
 *
 * This function:
 * 1. Parses the className to get appearance and variant
 * 2. Looks up variant-specific tokens
 * 3. Merges base tokens with variant tokens (variant overrides base)
 *
 * @param tokenConfig - Parsed token configuration
 * @param className - CSS class string (e.g., "btn-filled btn-primary")
 * @returns Merged array of tokens showing values for this specific variant
 *
 * Example:
 * className="btn-filled btn-primary"
 * → appearance="filled", variant="primary"
 * → variantKey="filled-primary"
 * → Returns base tokens + variant-specific overrides
 *   (e.g., background changes from default to primary blue)
 */
export function getTokensForClassName(
  tokenConfig: ComponentTokenConfig,
  className: string
): TokenDefinition[] {
  const { appearance, variant } = parseClassName(className);
  const variantKey = `${appearance}-${variant}`;

  // Get variant-specific tokens
  const variantTokens = tokenConfig.variants?.[variantKey] || [];

  // Create a map to merge tokens (variant overrides base)
  const tokenMap = new Map<string, TokenDefinition>();

  // Add base tokens first
  tokenConfig.tokens.forEach((token) => tokenMap.set(token.name, token));

  // Override with variant tokens
  variantTokens.forEach((token) => tokenMap.set(token.name, token));

  return Array.from(tokenMap.values());
}