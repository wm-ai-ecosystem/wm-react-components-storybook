/**
 * ============================================================================
 * DESIGN TOKENS JSON PARSER - GENERIC FOR ALL COMPONENTS
 * ============================================================================
 *
 * This file parses design token JSON files from /src/designTokens/
 * and converts them into a format usable by the Design Tokens panel.
 *
 * Supports multiple JSON structures:
 *
 * Structure 1 - With variantGroups (e.g., wm-button.json):
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
 *       }
 *     }
 *   }
 * }
 *
 * Structure 2 - Appearances in meta (e.g., pagination.json):
 * {
 *   "pagination": {
 *     "meta": {
 *       "mapping": { selector... },
 *       "appearances": {
 *         "basic": { mapping: {...} },
 *         "pager": { mapping: {...} }
 *       }
 *     },
 *     "mapping": { background, color,... }
 *   }
 * }
 *
 * Structure 3 - No appearances (e.g., tabs.json):
 * {
 *   "tabs": {
 *     "meta": { selector, states... },
 *     "mapping": { background, nav: { border: {...} }, item: { heading: {...} } }
 *   }
 * }
 *
 * Output:
 * - Base tokens from mapping (apply to all variants)
 * - Variant tokens merged: base + appearance + variant (if applicable)
 *   Example: "filled-primary" = btn.mapping + btn.appearances.filled.mapping + btn.appearances.filled.variantGroups.status.primary
 */

import { TokenDefinition, TokenControlType, ComponentTokenConfig } from "./types";
import { resolveTokenReference } from "./cssVariableExtractor";

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
 * Resolves token reference values using runtime CSS variable extraction
 *
 * This is the PREFERRED method for resolving token values. It extracts
 * CSS variable values from the foundation.css at runtime, ensuring values
 * are always in sync with the actual stylesheet.
 *
 * @param value - Token value (may contain references)
 * @param cssVariableMap - Map of token references to CSS values from cssVariableExtractor
 * @returns Resolved CSS value from runtime extraction
 *
 * @example
 * ```typescript
 * const cssVars = extractCSSVariables(iframe);
 * const tokenMap = buildTokenReferenceMap(cssVars);
 * resolveTokenValueRuntime("{color.primary.@.value}", tokenMap);
 * // Returns: "rgb(255, 114, 80)" (from foundation.css)
 * ```
 */
export function resolveTokenValueRuntime(
  value: string,
  cssVariableMap: Map<string, string>
): string {
  if (!value || cssVariableMap.size === 0) {
    return value;
  }

  return resolveTokenReference(value, cssVariableMap);
}

/**
 * Resolves token reference values like {color.primary.@.value} using HARDCODED values
 *
 * ⚠️ DEPRECATED: This function uses hardcoded values and should only be used as a fallback
 * when runtime CSS variable extraction is not available.
 *
 * The JSON uses references to shared color/space/font values.
 * This function maps those references to hardcoded CSS values.
 *
 * @param value - Token value (may be a reference or literal)
 * @returns Resolved CSS value
 *
 * Examples:
 * - "{color.primary.@.value}" → "#FF7250"
 * - "{space.6.value}" → "24px"
 * - "solid" → "solid" (literal value, no change)
 *
 * @deprecated Use resolveTokenValueRuntime() instead for runtime CSS extraction
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

  // Opacity mappings (matching foundation.css values)
  const opacityMap: Record<string, string> = {
    "{opacity.hover.value}": "8%",   // foundation.css: --wm-opacity-hover: 8%
    "{opacity.focus.value}": "12%",  // foundation.css: --wm-opacity-focus: 12%
    "{opacity.active.value}": "16%", // foundation.css: --wm-opacity-active: 16%
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
 * @param cssVariableMap - Optional map for runtime CSS variable resolution
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
  category?: string,
  cssVariableMap?: Map<string, string>
): TokenDefinition[] {
  const tokens: TokenDefinition[] = [];

  for (const [key, value] of Object.entries(obj)) {
    // Check if this is a token definition (has a "value" property)
    if (key === "value" && typeof value === "string") {
      const currentPath = [...parentPath];
      const cssVar = getCSSVariableName(componentKey, currentPath);
      const parentObj = obj as any;

      // Use runtime resolution if cssVariableMap is provided, otherwise fallback to hardcoded
      let resolvedValue: string;
      if (cssVariableMap && cssVariableMap.size > 0) {
        resolvedValue = resolveTokenValueRuntime(value, cssVariableMap);
      } else {
        resolvedValue = resolveTokenValue(value);
        // Log warning if using fallback
        if (value.includes("{")) {
          // console.warn(`[Token Parser] Using fallback hardcoded value for: ${value}`);
        }
      }

      const token: TokenDefinition = {
        name: cssVar,
        label: currentPath[currentPath.length - 1]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        value: resolvedValue,
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
      tokens.push(...parseTokenObject(value, componentKey, newPath, newCategory, cssVariableMap));
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
 * @param cssVariableMap - Optional map for runtime CSS variable resolution
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
export function parseDesignTokens(
  tokenData: any,
  componentKey: string,
  cssVariableMap?: Map<string, string>
): ComponentTokenConfig {
  const componentData = tokenData[componentKey];

  if (!componentData) {
    throw new Error(`Component "${componentKey}" not found in token data`);
  }

  // Log whether using runtime or fallback resolution
  if (cssVariableMap && cssVariableMap.size > 0) {
    // console.log(`[Token Parser] Using runtime CSS variable extraction (${cssVariableMap.size} tokens)`);
  } else {
    // console.warn(`[Token Parser] Using fallback hardcoded values (runtime extraction not available)`);
  }

  // Parse base mapping tokens (applies to all variants)
  const baseTokens = parseTokenObject(componentData.mapping, componentKey, [], undefined, cssVariableMap);

  // Parse variant tokens from appearances
  // Structure can be in two locations:
  // 1. componentData.appearances (e.g., wm-button.json)
  // 2. componentData.meta.appearances (e.g., pagination.json)
  const variants: Record<string, TokenDefinition[]> = {};

  // Check for appearances in both locations
  const appearancesSource = componentData.appearances || componentData.meta?.appearances;

  if (appearancesSource) {
    for (const [appearanceKey, appearanceValue] of Object.entries(appearancesSource)) {
      const appearanceData = appearanceValue as any;

      // Parse appearance-level mapping (applies to all variants of this appearance)
      const appearanceTokens = parseTokenObject(appearanceData.mapping || {}, componentKey, [], undefined, cssVariableMap);

      // Parse variantGroups (e.g., status: primary, secondary, tertiary)
      // Some components have variantGroups, others just have appearance-level tokens
      if (appearanceData.variantGroups) {
        for (const [, groupValue] of Object.entries(appearanceData.variantGroups)) {
          const groupData = groupValue as any;

          for (const [variantKey, variantValue] of Object.entries(groupData)) {
            // Parse variant-specific tokens
            const variantTokens = parseTokenObject(variantValue, componentKey, [], undefined, cssVariableMap);

            // Create variant key (e.g., "filled-primary", "outlined-secondary")
            const variantName = `${appearanceKey}-${variantKey}`;

            // Merge: base + appearance + variant tokens
            // Variant tokens override appearance tokens, which override base tokens
            variants[variantName] = [...appearanceTokens, ...variantTokens];
          }
        }
      } else if (appearanceTokens.length > 0) {
        // No variantGroups, but appearance has its own tokens
        // Create a variant using just the appearance key (e.g., "basic", "pager", "advanced")
        variants[appearanceKey] = appearanceTokens;
      }
    }
  }

  return {
    componentName: componentKey,
    selector: componentData.meta?.mapping?.selector?.web || `.app-${componentKey}`,
    tokens: baseTokens,
    variants,
    childSelectors: componentData.meta?.mapping?.childSelectors,
  };
}

/**
 * Extracts the variant key from className string by matching against available variants
 *
 * This function is FULLY GENERIC and works with ANY component by matching the className
 * against the actual variant keys defined in the tokenConfig.
 *
 * @param className - CSS class string from the component (e.g., "btn-filled btn-primary", "alert-success")
 * @param tokenConfig - Parsed token configuration with available variants
 * @param tokenData - Optional raw JSON data to look up variant selectors
 * @param componentKey - Optional component identifier for JSON lookup
 * @returns The matching variant key, or null if no match found
 *
 * Examples:
 * - Button: "btn-filled btn-primary" → matches variant key "filled-primary"
 * - Label: "text-primary" → matches variant key "text-primary"
 * - Label: "label-danger" → matches variant key "label-danger"
 * - Label: "h1" → matches variant key "default-h1"
 * - Message: "alert-success" → matches variant key "filled-success" (via selector lookup)
 * - Pagination: "basic" → matches variant key "basic"
 * - Tabs: any class → returns null (no variants)
 *
 * Algorithm:
 * 1. Try exact match: className === variantKey
 * 2. Try selector-based lookup: match CSS class against variant selectors in JSON
 * 3. Try direct lookup: className maps to a variant key
 * 4. Try multi-class pattern: "btn-filled btn-primary" → "filled-primary"
 * 5. Try single-class pattern: "text-primary" → "text-primary"
 * 6. Try size variant pattern: "h1" → "default-h1"
 */
export function parseClassName(
  className: string,
  tokenConfig: ComponentTokenConfig,
  tokenData?: any,
  componentKey?: string
): string | null {
  if (!className || !tokenConfig.variants) {
    return null;
  }

  const variantKeys = Object.keys(tokenConfig.variants);

  if (variantKeys.length === 0) {
    return null;
  }

  // Normalize className: trim and convert to lowercase for comparison
  const normalizedClassName = className.trim().toLowerCase();
  const classes = normalizedClassName.split(/\s+/);

  // Strategy 1: Try exact match
  // Example: "basic" matches "basic", "text-primary" matches "text-primary"
  if (variantKeys.includes(normalizedClassName)) {
    return normalizedClassName;
  }

  // Strategy 2: Dynamic selector-based lookup for ALL components
  // Automatically reads variant selectors from JSON and matches against className
  // Works for any component (message, progressbar, accordion, etc.) without hardcoding
  // JSON structure: componentData.meta.appearances.{appearance}.variantGroups.{group}.{variant}.selector.web
  if (tokenData && componentKey) {
    const componentData = tokenData[componentKey];
    if (!componentData) {
      return null;
    }

    // Selectors are in meta.appearances (not appearances which has the token values)
    const appearancesSource = componentData.meta?.appearances;

    if (appearancesSource) {
      // Iterate through all appearances (e.g., "filled", "outlined", "default")
      for (const [appearanceKey, appearanceValue] of Object.entries(appearancesSource)) {
        const appearanceData = appearanceValue as any;

        // Check if this appearance has variant groups
        if (appearanceData.variantGroups) {
          // Iterate through all variant groups (e.g., "status", "size")
          for (const groupData of Object.values(appearanceData.variantGroups)) {
            // Iterate through all variants in the group (e.g., "success", "danger", "warning")
            for (const [variantKey, variantValue] of Object.entries(groupData as any)) {
              const variantData = variantValue as any;

              // Check if the variant has a selector definition
              if (variantData.selector?.web) {
                const selectorWeb = variantData.selector.web;

                // Clean selector by removing leading dot and converting to lowercase
                // ".alert-success" → "alert-success"
                const cleanedSelector = selectorWeb.replace(/^\./, '').toLowerCase().trim();

                // Check if the className matches this selector
                if (classes.includes(cleanedSelector) || normalizedClassName === cleanedSelector) {
                  // Found a match! Return the variant key in format "appearance-variant"
                  // e.g., "filled-success", "default-primary", etc.
                  const fullVariantKey = `${appearanceKey}-${variantKey}`;

                  // Verify this variant key exists in the parsed config
                  if (variantKeys.includes(fullVariantKey)) {
                    return fullVariantKey;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Strategy 3: Try matching single classes directly
  // Example: "text-primary" in classes matches variant key "text-primary"
  for (const cls of classes) {
    if (variantKeys.includes(cls)) {
      return cls;
    }
  }

  // Strategy 4: Try matching multi-class patterns to hyphenated variant keys
  // Example: ["btn-filled", "btn-primary"] → "filled-primary"
  // Extract base names by removing common prefixes (btn-, text-, label-, etc.)
  const baseNames = classes.map(cls => {
    // Remove common component prefixes
    return cls.replace(/^(btn-|text-|label-|app-)/, '');
  }).filter(name => name.length > 0);

  // Try all possible combinations of base names with hyphens
  if (baseNames.length >= 2) {
    // Try appearance-variant pattern: "filled-primary"
    const combined = baseNames.join('-');
    if (variantKeys.includes(combined)) {
      return combined;
    }

    // Try first-last pattern: "filled" + "primary" = "filled-primary"
    const firstLast = `${baseNames[0]}-${baseNames[baseNames.length - 1]}`;
    if (variantKeys.includes(firstLast)) {
      return firstLast;
    }
  }

  // Strategy 5: Try matching size variants with "default-" prefix
  // Example: "h1" → "default-h1", "h2" → "default-h2"
  // This handles label size variants (h1, h2, h3, h4, h5, h6, p)
  for (const cls of classes) {
    const withDefaultPrefix = `default-${cls}`;
    if (variantKeys.includes(withDefaultPrefix)) {
      return withDefaultPrefix;
    }
  }

  // Strategy 6: Partial matching - check if any class contains a variant key part
  // Example: "text-primary" contains "text" and "primary"
  for (const variantKey of variantKeys) {
    const variantParts = variantKey.split('-');

    // Check if all parts of the variant key appear in the className
    const allPartsPresent = variantParts.every(part =>
      classes.some(cls => cls.includes(part))
    );

    if (allPartsPresent) {
      return variantKey;
    }
  }

  // Strategy 7: Try matching without prefixes more aggressively
  // Example: "btn-filled btn-primary" with baseNames ["filled", "primary"]
  for (const variantKey of variantKeys) {
    const variantParts = variantKey.split('-');

    // Check if baseNames match variant parts in order
    if (baseNames.length === variantParts.length) {
      const matches = baseNames.every((name, i) => name === variantParts[i]);
      if (matches) {
        return variantKey;
      }
    }
  }

  // No match found
  return null;
}

/**
 * Gets tokens for a specific className (merges base + variant tokens)
 *
 * This function:
 * 1. Parses the className to get the variant key
 * 2. Looks up variant-specific tokens
 * 3. Merges base tokens with variant tokens (variant overrides base)
 *
 * @param tokenConfig - Parsed token configuration
 * @param className - CSS class string (e.g., "btn-filled btn-primary", "text-primary", "h1", "alert-success")
 * @param tokenData - Optional raw JSON data for selector-based variant matching
 * @param componentKey - Optional component identifier for selector-based variant matching
 * @returns Merged array of tokens showing values for this specific variant
 *
 * Examples:
 * - Button: "btn-filled btn-primary" → variantKey="filled-primary" → base + filled-primary tokens
 * - Label: "text-primary" → variantKey="text-primary" → base + text-primary tokens
 * - Label: "h1" → variantKey="default-h1" → base + default-h1 tokens
 * - Message: "alert-success" → variantKey="filled-success" → base + filled-success tokens
 * - Pagination: "basic" → variantKey="basic" → base + basic tokens
 * - Tabs: any class → variantKey=null → base tokens only
 */
export function getTokensForClassName(
  tokenConfig: ComponentTokenConfig,
  className: string,
  tokenData?: any,
  componentKey?: string
): TokenDefinition[] {
  // Use the generic parseClassName function to get the variant key
  const variantKey = parseClassName(className, tokenConfig, tokenData, componentKey);

  // Get variant-specific tokens (if a variant key was found)
  const variantTokens = variantKey ? (tokenConfig.variants?.[variantKey] || []) : [];

  // Create a map to merge tokens (variant overrides base)
  const tokenMap = new Map<string, TokenDefinition>();

  // Add base tokens first
  tokenConfig.tokens.forEach((token) => tokenMap.set(token.name, token));

  // Override with variant tokens (if any)
  variantTokens.forEach((token) => tokenMap.set(token.name, token));

  return Array.from(tokenMap.values());
}