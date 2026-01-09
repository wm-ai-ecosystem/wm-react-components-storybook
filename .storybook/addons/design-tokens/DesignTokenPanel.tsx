/**
 * ============================================================================
 * DESIGN TOKEN PANEL - Main UI Component
 * ============================================================================
 * 
 * This React component renders the "Design Tokens" tab in the Storybook panel.
 * It provides interactive controls for modifying design tokens in real-time.
 * 
 * Key Responsibilities:
 * 1. Read story parameters (tokenConfig, className from args)
 * 2. Display tokens grouped by category with appropriate UI controls
 * 3. Listen to token value changes and apply them to the iframe
 * 4. Generate CSS dynamically from token values
 * 5. Inject generated CSS into the Storybook preview iframe
 * 
 * Integration with Foundation CSS:
 * - Respects existing @wavemaker/app-runtime-wm-build/wmapp/styles/foundation/foundation.css
 * - Uses CSS variables that can override foundation styles
 * - Applies !important to ensure token styles take precedence
 */

import React, { useState, useEffect } from "react";
import { useStorybookApi } from "storybook/manager-api";
import { styled } from "storybook/theming";
import { DesignTokenParameters, TokenDefinition, ComponentTokenConfig } from "./types";
import { getTokensForClassName, parseDesignTokens } from "./tokenParser";
import { extractCSSVariables, buildTokenReferenceMap, clearCache } from "./cssVariableExtractor";

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const PanelContent = styled.div`
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: 100%;
  overflow-y: auto;
  background-color: #f8f8f8;
`;

const TokenSection = styled.div`
  margin-bottom: 20px;
  background-color: white;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1c1b1f;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
`;

const TokenGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TokenLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
`;

const TokenName = styled.span`
  font-family: monospace;
  font-size: 11px;
  color: #666;
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
`;

const TokenDescription = styled.p`
  font-size: 11px;
  color: #757575;
  margin: 4px 0 8px 0;
  line-height: 1.5;
`;

const TokenInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-family: monospace;
  transition: border-color 0.2s;
  background-color: #ffffff;
  color: #1c1b1f;

  &:focus {
    outline: none;
    border-color: #1ea7fd;
    box-shadow: 0 0 0 2px rgba(30, 167, 253, 0.1);
  }

  &[type="color"] {
    height: 40px;
    cursor: pointer;
    padding: 4px;
  }

  &[type="number"] {
    appearance: textfield;
  }

  &::placeholder {
    color: #999;
  }
`;

const TokenSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-family: inherit;
  background-color: #ffffff;
  color: #1c1b1f;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1ea7fd;
    box-shadow: 0 0 0 2px rgba(30, 167, 253, 0.1);
  }

  option {
    background-color: #ffffff;
    color: #1c1b1f;
  }
`;

const ColorInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ColorInput = styled(TokenInput)`
  flex: 0 0 60px;
`;

const ColorTextInput = styled(TokenInput)`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
`;

const ResetButton = styled.button`
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #d0d0d0;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e8e8e8;
    border-color: #b0b0b0;
  }

  &:active {
    background-color: #ddd;
  }
`;

const InfoBox = styled.div`
  background-color: #e3f2fd;
  border-left: 4px solid #1976d2;
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const InfoText = styled.p`
  font-size: 12px;
  color: #1565c0;
  margin: 0;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #757575;
`;

// ============================================================================
// COMPONENT
// ============================================================================

interface DesignTokenPanelProps {
  active: boolean;
}

export const DesignTokenPanel: React.FC<DesignTokenPanelProps> = ({ active }) => {
  // Get Storybook API to access story data
  const api = useStorybookApi();

  // Component state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [parameters, setParameters] = useState<DesignTokenParameters>({ enabled: false });
  const [currentClassName, setCurrentClassName] = useState<string>("");
  const [tokens, setTokens] = useState<Record<string, string>>({});
  const [defaultTokens, setDefaultTokens] = useState<Record<string, string>>({});
  const [cssVariableMap, setCssVariableMap] = useState<Map<string, string>>(new Map());

  // Track previous className to detect actual changes (not re-renders)
  const prevClassNameRef = React.useRef<string>("");
  // Track if we've done initial token application
  const hasAppliedInitialTokensRef = React.useRef<boolean>(false);
  // Track the className when the panel was last active to detect changes while panel was inactive
  const classNameWhenActiveRef = React.useRef<string>("");
  // Track if tokens need refresh (used to trigger re-parse when className changes while active)
  const needsRefreshRef = React.useRef<boolean>(false);

  /**
   * Effect: Monitor story changes and args updates
   *
   * This effect:
   * 1. Gets the current story ID
   * 2. Reads story parameters (designTokens configuration)
   * 3. Reads args.className from Controls tab
   * 4. Updates state when either changes
   *
   * Uses polling to detect className changes since argsUpdated event is unreliable
   */
  useEffect(() => {
    if (!api) return;

    const updateStoryData = () => {
      const storyId = api.getUrlState().storyId;
      if (!storyId) {
        return;
      }

      const storyData = api.getData(storyId);
      if (!storyData) {
        return;
      }

      const designTokenParams = storyData?.parameters?.designTokens as DesignTokenParameters;
      setParameters(designTokenParams || { enabled: false });

      // Get className from story data args
      const argsClassName = (storyData as any)?.args?.className as string;
      const className = argsClassName || designTokenParams?.className || "";

      // Only update if className actually changed
      if (className !== currentClassName) {
        setCurrentClassName(className);
      }

      // Mark as loaded
      setIsLoading(false);
    };

    // Set loading to true when story changes
    const handleStoryChanged = () => {
      setIsLoading(true);
      // Reset state
      hasAppliedInitialTokensRef.current = false;
      prevClassNameRef.current = "";
      needsRefreshRef.current = false;
      classNameWhenActiveRef.current = "";

      // Clear previous design tokens state
      setTokens({});
      setDefaultTokens({});
      setCssVariableMap(new Map());
      setCurrentClassName("");
      setParameters({ enabled: false });

      // Remove any injected style tags from previous story
      const iframe = document.querySelector("#storybook-preview-iframe") as HTMLIFrameElement;
      if (iframe?.contentDocument) {
        // Remove all design token style tags
        const styleTags = iframe.contentDocument.querySelectorAll('style[id^="design-tokens-"]');
        styleTags.forEach(tag => tag.remove());
      }

      // Clear cache
      clearCache();

      // Update data after a brief delay to ensure iframe is ready
      setTimeout(updateStoryData, 100);
    };

    // Initial load
    setTimeout(updateStoryData, 50);

    // Listen to story changes
    const unsubscribeStoryChanged = api.on("storyChanged", handleStoryChanged);

    // Poll for className changes when panel is active (since argsUpdated is unreliable)
    let pollInterval: NodeJS.Timeout | null = null;
    if (active) {
      pollInterval = setInterval(() => {
        updateStoryData();
      }, 300); // Poll every 300ms when panel is active
    }

    return () => {
      unsubscribeStoryChanged();
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [api, active, currentClassName]);

  /**
   * Effect: Extract CSS variables from iframe when runtime extraction is enabled
   *
   * This effect:
   * 1. Checks if runtime extraction is enabled in parameters
   * 2. Waits for iframe to be ready
   * 3. Extracts all CSS variables from iframe's :root element
   * 4. Builds token reference map for resolving {token.path} references
   * 5. Updates cssVariableMap state
   *
   * The extraction happens once when the story loads and whenever the story changes.
   * IMPORTANT: Only runs when panel is active to avoid blocking UI on initial load
   */
  useEffect(() => {
    // Only run if runtime extraction is enabled AND panel is active
    if (!parameters.enabled || !parameters.extractCSSVariablesAtRuntime || !active) {
      return;
    }

    // Clear cache when story changes
    clearCache();

    // Extract CSS variables with retry logic (optimized for better performance)
    const extractWithRetry = (attempt = 1, maxAttempts = 6) => {
      const iframe = document.querySelector("#storybook-preview-iframe") as HTMLIFrameElement;

      if (!iframe || !iframe.contentDocument || !iframe.contentWindow) {
        if (attempt < maxAttempts) {
          // console.log(`[Design Tokens] Iframe not ready for CSS extraction, retrying... (attempt ${attempt}/${maxAttempts})`);
          // Reduced retry delay for better responsiveness
          setTimeout(() => extractWithRetry(attempt + 1, maxAttempts), 100);
        } else {
          // console.error('[Design Tokens] Failed to extract CSS variables: iframe not ready after max attempts');
        }
        return;
      }

      try {
        // Extract CSS variables from iframe
        const extractedVars = extractCSSVariables(iframe);

        if (extractedVars.size === 0) {
          if (attempt < maxAttempts) {
            // console.log(`[Design Tokens] No CSS variables extracted yet, retrying... (attempt ${attempt}/${maxAttempts})`);
            // Reduced retry delay
            setTimeout(() => extractWithRetry(attempt + 1, maxAttempts), 100);
          } else {
            // console.warn('[Design Tokens] No CSS variables extracted after max attempts');
          }
          return;
        }

        // Build token reference map
        const referenceMap = buildTokenReferenceMap(extractedVars);

        // Update state
        setCssVariableMap(referenceMap);

        // console.log(`[Design Tokens] ✓ CSS extraction successful (attempt ${attempt})`);
        // console.log(`  → Extracted ${extractedVars.size} CSS variables`);
        // console.log(`  → Built ${referenceMap.size} token reference mappings`);
      } catch (error) {
        // console.error('[Design Tokens] Error during CSS extraction:', error);
      }
    };

    // Start extraction with retry logic
    extractWithRetry();
  }, [parameters, active]);

  /**
   * Effect: Initialize tokens when parameters or className change
   *
   * This effect:
   * 1. Reads tokenData + componentKey (new approach) OR tokenConfig (old approach) from parameters
   * 2. If using new approach, parses tokens at runtime with CSS variables
   * 3. If className is provided, gets variant-specific tokens
   * 4. Creates initial token values object
   * 5. Stores tokens in state (but doesn't apply them yet - only applies when panel becomes active)
   * 6. Uses runtime-resolved values if cssVariableMap is available
   *
   * IMPORTANT: Only resets user changes when className actually changes,
   * not on every re-render!
   */
  useEffect(() => {
    if (!parameters.enabled) return;

    // Determine which approach to use: new (tokenData + componentKey) or old (tokenConfig)
    let tokenConfig: ComponentTokenConfig | undefined;

    if (parameters.tokenData && parameters.componentKey) {
      // NEW APPROACH: Parse tokens at runtime with extracted CSS variables
      // This ensures values are always in sync with foundation.css
      if (parameters.extractCSSVariablesAtRuntime && cssVariableMap.size > 0) {
        // console.log(`[Design Tokens] Parsing tokens at runtime with ${cssVariableMap.size} CSS variables`);
        tokenConfig = parseDesignTokens(parameters.tokenData, parameters.componentKey, cssVariableMap);
      } else if (parameters.extractCSSVariablesAtRuntime) {
        // CSS variables not extracted yet, wait for them
        // console.log(`[Design Tokens] Waiting for CSS variables to be extracted...`);
        return;
      } else {
        // Runtime extraction not enabled, parse with fallback values
        // console.warn(`[Design Tokens] Runtime extraction disabled, using fallback values`);
        tokenConfig = parseDesignTokens(parameters.tokenData, parameters.componentKey);
      }
    } else if (parameters.tokenConfig) {
      // OLD APPROACH: Use pre-parsed tokenConfig (deprecated but supported for backward compatibility)
      // console.warn(`[Design Tokens] Using deprecated pre-parsed tokenConfig. Consider passing tokenData + componentKey instead.`);
      tokenConfig = parameters.tokenConfig;
    } else {
      // console.error(`[Design Tokens] No token configuration found. Provide either (tokenData + componentKey) or tokenConfig.`);
      return;
    }

    if (tokenConfig) {
      let tokensToUse = tokenConfig.tokens;

      // Get variant-specific tokens if className is provided
      // This merges base tokens with variant overrides
      if (currentClassName && tokenConfig.variants) {
        tokensToUse = getTokensForClassName(tokenConfig, currentClassName);
      }

      // Convert token array to key-value pairs
      // Token values are already resolved (either at runtime or with fallback)
      const initialTokens: Record<string, string> = {};
      tokensToUse.forEach((token: TokenDefinition) => {
        initialTokens[token.name] = token.value;
      });

      // Only reset tokens if className actually changed (not just a re-render)
      const classNameChanged = prevClassNameRef.current !== currentClassName;
      const isFirstLoad = !hasAppliedInitialTokensRef.current;

      if (classNameChanged || isFirstLoad) {
        if (isFirstLoad) {
          hasAppliedInitialTokensRef.current = true;
          // Initialize the classNameWhenActive ref on first load if panel is active
          if (active) {
            classNameWhenActiveRef.current = currentClassName;
          }
        }

        prevClassNameRef.current = currentClassName;

        setDefaultTokens(initialTokens);
        setTokens(initialTokens);

        // IMPORTANT: Apply tokens if panel is active, otherwise mark for refresh
        if (active) {
          // Panel is active, apply tokens immediately
          classNameWhenActiveRef.current = currentClassName;
          needsRefreshRef.current = false;
          // Reduced delay for better responsiveness
          setTimeout(() => {
            applyTokens(initialTokens);
          }, 50);
        } else {
          // Panel is not active, mark that refresh is needed when it becomes active
          needsRefreshRef.current = true;
        }
      } else if (Object.keys(initialTokens).length > 0) {
        // Just update defaults, tokens state will be preserved
        setDefaultTokens(initialTokens);
      }
    }
  }, [parameters, currentClassName, cssVariableMap, active]);

  /**
   * Effect: Re-apply tokens when panel becomes active
   *
   * This ensures tokens are applied when user clicks the Design Tokens tab,
   * even if they navigated to the story earlier and the iframe is already loaded.
   *
   * IMPORTANT: If className changed while panel was inactive, tokens have already been
   * updated by the previous effect, we just need to apply them.
   */
  const prevActiveRef = React.useRef(active);
  useEffect(() => {
    const becameActive = !prevActiveRef.current && active;
    prevActiveRef.current = active;

    if (becameActive && parameters.enabled) {
      // Check if refresh was needed (className changed while panel was inactive)
      if (needsRefreshRef.current) {
        classNameWhenActiveRef.current = currentClassName;
        needsRefreshRef.current = false;

        // Apply tokens with reduced delay for better responsiveness
        setTimeout(() => {
          applyTokens(tokens);
        }, 100);
      } else if (Object.keys(tokens).length > 0) {
        // No className change, just apply existing tokens
        classNameWhenActiveRef.current = currentClassName;

        // Apply tokens with reduced delay
        setTimeout(() => {
          applyTokens(tokens);
        }, 100);
      }
    }
  }, [active, parameters, tokens, currentClassName]);

  /**
   * Applies tokens to the Storybook preview iframe
   *
   * This function:
   * 1. Sets CSS variables on the iframe's root element
   * 2. Generates CSS rules dynamically from token values
   * 3. Injects/updates a <style> tag in the iframe's <head>
   *
   * The generated CSS overrides foundation.css styles using !important
   * and higher specificity selectors. Changes are scoped to elements with
   * data-design-token-target="true" attribute.
   */
  const applyTokens = (tokenValues: Record<string, string>) => {
    const iframe = document.querySelector("#storybook-preview-iframe") as HTMLIFrameElement;

    // Helper function to apply tokens once iframe and buttons are ready
    // Optimized with reduced retries and delays for better performance
    const applyTokensToIframe = (attempt = 1, maxAttempts = 4) => {
      if (!iframe || !iframe.contentDocument) {
        // Iframe not ready yet, retry with reduced delay
        if (attempt < maxAttempts) {
          // console.log(`[Design Tokens] Iframe not ready, retrying... (attempt ${attempt}/${maxAttempts})`);
          // Reduced delay for better responsiveness
          setTimeout(() => applyTokensToIframe(attempt + 1, maxAttempts), 100);
        } else {
          // console.error('[Design Tokens] Failed to apply tokens: iframe not ready after max attempts');
        }
        return;
      }

      // Get token config first - need it to determine component selector
      let tokenConfig: ComponentTokenConfig | undefined;

      if (parameters.tokenData && parameters.componentKey) {
        // NEW APPROACH: Parse tokens at runtime
        if (parameters.extractCSSVariablesAtRuntime && cssVariableMap.size > 0) {
          tokenConfig = parseDesignTokens(parameters.tokenData, parameters.componentKey, cssVariableMap);
        } else {
          tokenConfig = parseDesignTokens(parameters.tokenData, parameters.componentKey);
        }
      } else if (parameters.tokenConfig) {
        // OLD APPROACH: Use pre-parsed tokenConfig
        tokenConfig = parameters.tokenConfig;
      }

      if (!tokenConfig) {
        // console.error('[Design Tokens] No token configuration available for applying tokens');
        return;
      }

      // Check if target elements are rendered (generic for any component)
      // Use the component's selector with data-design-token-target attribute
      const targetSelector = `[data-design-token-target="true"]`;
      const targetElements = iframe.contentDocument.querySelectorAll(targetSelector);

      if (targetElements.length === 0 && attempt < maxAttempts) {
        // Target elements not rendered yet, retry with reduced delay
        // console.log(`[Design Tokens] Target elements (${tokenConfig.componentName}) not rendered yet, retrying... (attempt ${attempt}/${maxAttempts})`);
        // Reduced delay for better responsiveness
        setTimeout(() => applyTokensToIframe(attempt + 1, maxAttempts), 100);
        return;
      }

      // Iframe and target elements are ready, apply tokens
      if (tokenConfig) {
        const { componentName, selector } = tokenConfig;
        const styleId = `design-tokens-${componentName}`;

        // Remove existing style tag if present
        let styleTag = iframe.contentDocument.getElementById(styleId) as HTMLStyleElement;
        if (styleTag) {
          styleTag.remove();
        }

        // Create new style tag with generated CSS
        styleTag = iframe.contentDocument.createElement("style");
        styleTag.id = styleId;

        // Generate CSS rules from tokens
        const cssRules = generateCSSRules(tokenValues, selector || `.${componentName}`, currentClassName, componentName, tokenConfig);
        styleTag.textContent = cssRules;

        iframe.contentDocument.head.appendChild(styleTag);

        // Tokens applied successfully

        // Verify styles applied (debugging - commented out)
        // if (targetElements.length > 0) {
        //   const element = targetElements[0];
        //   const computed = iframe.contentWindow?.getComputedStyle(element);
        //   console.log(`  → Element background: ${computed?.backgroundColor}`);
        //   console.log(`  → Element color: ${computed?.color}`);
        //   console.log(`  → Element font-size: ${computed?.fontSize}`);
        // }
      }
    };

    // Start applying tokens with retry logic
    applyTokensToIframe();
  };

  /**
   * Generates CSS rules from token values
   *
   * This function creates CSS like:
   * ```css
   * .selector[data-design-token-target="true"].variant-class {
   *   background-color: var(--wm-component-background) !important;
   *   color: var(--wm-component-color) !important;
   *   ...
   * }
   * ```
   *
   * The [data-design-token-target="true"] attribute ensures that styles
   * only apply to components in the DesignToken story, not globally.
   * This prevents token changes from affecting all instances of the component.
   *
   * It also generates rules for :hover, :focus, :active, :disabled states
   */
  const generateCSSRules = (
    tokenValues: Record<string, string>,
    selector: string,
    className: string,
    componentName: string,
    config: ComponentTokenConfig
  ): string => {
    // Build selector with data attribute to scope to DesignToken story only
    // Example: ".app-button[data-design-token-target="true"].btn-filled.btn-primary"
    // This ensures token changes ONLY affect components in the DesignToken story
    const dataAttr = '[data-design-token-target="true"]';

    // Use the component's selector from meta.mapping.selector.web
    // For button: ".app-button,button,.btn"
    // For anchor: ".app-anchor,a"
    // We'll use the first selector for high specificity
    const baseSelector = selector.split(',')[0].trim();

    // Add className selectors for variant specificity
    const classSelectors = className ? `.${className.split(' ').join('.')}` : '';
    const fullSelector = `${baseSelector}${dataAttr}${classSelectors}`;

    // Helper function to build dynamic CSS variable names
    const getVarName = (property: string) => `--wm-${componentName}-${property}`;

    let css = `
/* Design Token Generated Styles - Auto-generated by Design Tokens Panel */
/* Ultra-high specificity selector to override MUI inline styles and foundation.css */
${fullSelector} {
`;

    // Map CSS variables to CSS properties
    // Use actual token values instead of CSS variables for better scoping
    Object.entries(tokenValues).forEach(([varName, value]) => {
      // Extract property name from CSS variable name (--wm-btn-background -> background)
      const parts = varName.split('-');
      if (parts.length >= 4) {
        // Remove --wm-{component} prefix (first 4 parts: '', '', 'wm', 'btn')
        const property = parts.slice(4).join('-');

        // Skip ONLY interactive state tokens (hover, focus, active, disabled)
        // These have 'states-' followed by the state name
        // Do NOT skip base tokens like 'state-layer-color'
        if (property.startsWith('states-hover-') ||
            property.startsWith('states-focus-') ||
            property.startsWith('states-active-') ||
            property.startsWith('states-disabled-')) {
          return;
        }

        // Map property names to CSS properties
        const cssProperty = mapToCSSProperty(property);
        if (cssProperty) {
          // Use the actual value directly instead of CSS variable reference
          css += `  ${cssProperty}: ${value} !important;\n`;
        }
      }
    });

    css += `}\n\n`;

    // Add rules for text content (targets the span.btn-caption)
    // Ensure all child elements have z-index above state layer overlays
    css += `${fullSelector} > * {\n`;
    css += `  position: relative !important;\n`;
    css += `  z-index: 1 !important;\n`;
    css += `}\n\n`;

    // Add main component styling
    let mainSelectors = `${fullSelector}`;

    // Add text child selector if defined (e.g., .btn-caption for buttons)
    if (config.childSelectors?.text) {
      const textSelectors = config.childSelectors.text.split(',').map(s => `${fullSelector} ${s.trim()}`).join(',\n');
      mainSelectors += `,\n${textSelectors}`;
    }

    css += `${mainSelectors} {\n`;
    if (tokenValues[getVarName('color')]) {
      css += `  color: ${tokenValues[getVarName('color')]} !important;\n`;
    }
    if (tokenValues[getVarName('font-size')]) {
      css += `  font-size: ${tokenValues[getVarName('font-size')]} !important;\n`;
    }
    if (tokenValues[getVarName('font-family')]) {
      css += `  font-family: ${tokenValues[getVarName('font-family')]} !important;\n`;
    }
    if (tokenValues[getVarName('font-weight')]) {
      css += `  font-weight: ${tokenValues[getVarName('font-weight')]} !important;\n`;
    }
    if (tokenValues[getVarName('line-height')]) {
      css += `  line-height: ${tokenValues[getVarName('line-height')]} !important;\n`;
    }
    if (tokenValues[getVarName('letter-spacing')]) {
      css += `  letter-spacing: ${tokenValues[getVarName('letter-spacing')]} !important;\n`;
    }
    if (tokenValues[getVarName('text-transform')]) {
      css += `  text-transform: ${tokenValues[getVarName('text-transform')]} !important;\n`;
    }
    css += `}\n\n`;

    // Add rules for icons
    // Use childSelectors.icon if defined, otherwise default to common icon selectors
    const hasIconSize = tokenValues[getVarName('icon-size')];
    const hasIconColor = tokenValues[getVarName('color')];

    if (hasIconSize || hasIconColor) {
      // Default icon selectors for button component
      const defaultIconSelectors = '.app-icon,i[class*="fa-"],i[class*="wi-"],i[class*="icon-"]';
      const iconSelectorList = config.childSelectors?.icon || defaultIconSelectors;
      const iconSelectors = iconSelectorList.split(',').map(s => `${fullSelector} ${s.trim()}`).join(',\n');

      css += `${iconSelectors} {\n`;
      if (hasIconColor) {
        css += `  color: ${tokenValues[getVarName('color')]} !important;\n`;
      }
      if (hasIconSize) {
        css += `  font-size: ${tokenValues[getVarName('icon-size')]} !important;\n`;
        css += `  width: ${tokenValues[getVarName('icon-size')]} !important;\n`;
        css += `  height: ${tokenValues[getVarName('icon-size')]} !important;\n`;
        css += `  min-width: ${tokenValues[getVarName('icon-size')]} !important;\n`;
        css += `  min-height: ${tokenValues[getVarName('icon-size')]} !important;\n`;
        css += `  line-height: 1 !important;\n`;
        css += `  display: inline-flex !important;\n`;
        css += `  align-items: center !important;\n`;
        css += `  justify-content: center !important;\n`;
      }
      css += `  position: relative !important;\n`;
      css += `  z-index: 1 !important;\n`;
      css += `}\n\n`;
    }

    // Add rules for images
    // Use childSelectors.image if defined, otherwise default to common image selectors
    const hasImageSize = tokenValues[getVarName('image-size')];
    const hasImageRadius = tokenValues[getVarName('image-radius')];

    if (hasImageSize || hasImageRadius) {
      // Default image selectors that work across components
      const defaultImageSelectors = 'img,.image,[class*="-image"],[class*="image-"]';
      const imageSelectorList = config.childSelectors?.image || defaultImageSelectors;
      const imageSelectors = imageSelectorList.split(',').map(s => `${fullSelector} ${s.trim()}`).join(',\n');

      css += `${imageSelectors} {\n`;
      if (hasImageSize) {
        css += `  width: ${tokenValues[getVarName('image-size')]} !important;\n`;
        css += `  height: ${tokenValues[getVarName('image-size')]} !important;\n`;
        css += `  min-width: ${tokenValues[getVarName('image-size')]} !important;\n`;
        css += `  min-height: ${tokenValues[getVarName('image-size')]} !important;\n`;
      }
      if (hasImageRadius) {
        css += `  border-radius: ${tokenValues[getVarName('image-radius')]} !important;\n`;
      }
      css += `  object-fit: cover !important;\n`;
      css += `}\n\n`;
    }

    // Add rules for badges (if badge child selector is defined)
    if (config.childSelectors?.badge && tokenValues[getVarName('color')]) {
      const badgeSelectors = config.childSelectors.badge.split(',').map(s => `${fullSelector} ${s.trim()}`).join(',\n');
      css += `${badgeSelectors} {\n`;
      css += `  background-color: ${tokenValues[getVarName('color')]} !important;\n`;
      css += `  color: ${tokenValues[getVarName('background')]} !important;\n`;
      css += `  position: relative !important;\n`;
      css += `  z-index: 1 !important;\n`;
      css += `  font-size: 0.75em !important;\n`;
      css += `}\n\n`;
    }

    // Ensure button has position:relative for state layer overlays
    if (tokenValues[getVarName('state-layer-color')]) {
      css += `${fullSelector} {\n`;
      css += `  position: relative !important;\n`;
      css += `  overflow: hidden !important;\n`;
      css += `}\n\n`;
    }

    // Add hover state with state layer effect
    // State layers create a semi-transparent overlay for interactive feedback
    css += `${fullSelector}:hover:not(:disabled) {\n`;
    Object.entries(tokenValues).forEach(([varName, value]) => {
      if (varName.includes('-states-hover-')) {
        const parts = varName.split('-');
        const property = parts.slice(4).join('-').replace('states-hover-', '');
        const cssProperty = mapToCSSProperty(property);
        if (cssProperty) {
          css += `  ${cssProperty}: ${value} !important;\n`;
        }
      }
    });
    css += `}\n\n`;

    // Create state layer overlay for hover using ::before pseudo-element
    if (tokenValues[getVarName('state-layer-color')] && tokenValues[getVarName('states-hover-state-layer-opacity')]) {
      css += `${fullSelector}:hover:not(:disabled)::before {\n`;
      css += `  content: '' !important;\n`;
      css += `  position: absolute !important;\n`;
      css += `  top: 0 !important;\n`;
      css += `  left: 0 !important;\n`;
      css += `  right: 0 !important;\n`;
      css += `  bottom: 0 !important;\n`;
      css += `  background-color: ${tokenValues[getVarName('state-layer-color')]} !important;\n`;
      css += `  opacity: ${tokenValues[getVarName('states-hover-state-layer-opacity')]} !important;\n`;
      css += `  pointer-events: none !important;\n`;
      css += `  border-radius: inherit !important;\n`;
      css += `}\n\n`;
    }

    // Add focus state with state layer effect
    css += `${fullSelector}:focus:not(:disabled) {\n`;
    Object.entries(tokenValues).forEach(([varName, value]) => {
      if (varName.includes('-states-focus-')) {
        const parts = varName.split('-');
        const property = parts.slice(4).join('-').replace('states-focus-', '');
        const cssProperty = mapToCSSProperty(property);
        if (cssProperty) {
          css += `  ${cssProperty}: ${value} !important;\n`;
        }
      }
    });
    css += `  outline: 2px solid currentColor;\n`;
    css += `  outline-offset: 2px;\n`;
    css += `}\n\n`;

    // Create state layer overlay for focus
    if (tokenValues[getVarName('state-layer-color')] && tokenValues[getVarName('states-focus-state-layer-opacity')]) {
      css += `${fullSelector}:focus:not(:disabled)::before {\n`;
      css += `  content: '' !important;\n`;
      css += `  position: absolute !important;\n`;
      css += `  top: 0 !important;\n`;
      css += `  left: 0 !important;\n`;
      css += `  right: 0 !important;\n`;
      css += `  bottom: 0 !important;\n`;
      css += `  background-color: ${tokenValues[getVarName('state-layer-color')]} !important;\n`;
      css += `  opacity: ${tokenValues[getVarName('states-focus-state-layer-opacity')]} !important;\n`;
      css += `  pointer-events: none !important;\n`;
      css += `  border-radius: inherit !important;\n`;
      css += `}\n\n`;
    }

    // Add active state with state layer effect
    css += `${fullSelector}:active:not(:disabled) {\n`;
    Object.entries(tokenValues).forEach(([varName, value]) => {
      if (varName.includes('-states-active-')) {
        const parts = varName.split('-');
        const property = parts.slice(4).join('-').replace('states-active-', '');
        const cssProperty = mapToCSSProperty(property);
        if (cssProperty) {
          css += `  ${cssProperty}: ${value} !important;\n`;
        }
      }
    });
    css += `}\n\n`;

    // Create state layer overlay for active (pressed down)
    if (tokenValues[getVarName('state-layer-color')] && tokenValues[getVarName('states-active-state-layer-opacity')]) {
      css += `${fullSelector}:active:not(:disabled)::before {\n`;
      css += `  content: '' !important;\n`;
      css += `  position: absolute !important;\n`;
      css += `  top: 0 !important;\n`;
      css += `  left: 0 !important;\n`;
      css += `  right: 0 !important;\n`;
      css += `  bottom: 0 !important;\n`;
      css += `  background-color: ${tokenValues[getVarName('state-layer-color')]} !important;\n`;
      css += `  opacity: ${tokenValues[getVarName('states-active-state-layer-opacity')]} !important;\n`;
      css += `  pointer-events: none !important;\n`;
      css += `  border-radius: inherit !important;\n`;
      css += `}\n\n`;
    }

    // Add disabled state
    css += `${fullSelector}:disabled {\n`;
    Object.entries(tokenValues).forEach(([varName, value]) => {
      if (varName.includes('-states-disabled-')) {
        const parts = varName.split('-');
        const property = parts.slice(4).join('-').replace('states-disabled-', '');
        const cssProperty = mapToCSSProperty(property);
        if (cssProperty) {
          css += `  ${cssProperty}: ${value} !important;\n`;
        }
      }
    });
    // Use disabled-specific values if available, otherwise use defaults
    if (tokenValues[getVarName('states-disabled-opacity')]) {
      css += `  opacity: ${tokenValues[getVarName('states-disabled-opacity')]} !important;\n`;
    } else {
      css += `  opacity: 0.38 !important;\n`;
    }
    if (tokenValues[getVarName('states-disabled-cursor')]) {
      css += `  cursor: ${tokenValues[getVarName('states-disabled-cursor')]} !important;\n`;
    } else {
      css += `  cursor: not-allowed !important;\n`;
    }
    css += `}\n`;

    return css;
  };

  /**
   * Maps token property names to CSS property names
   * 
   * Example: "background" → "background-color"
   */
  const mapToCSSProperty = (property: string): string | null => {
    // Normalize property - remove @ suffix if present (e.g., "shadow-@" -> "shadow")
    const normalizedProperty = property.replace('-@', '').replace('@', '');

    const mapping: Record<string, string> = {
      'background': 'background-color',
      'background-color': 'background-color',  // Support explicit background-color (used by label component)
      'color': 'color',
      'border-color': 'border-color',
      'border-width': 'border-width',
      'border-style': 'border-style',
      'border-radius': 'border-radius',
      'radius': 'border-radius',
      'padding': 'padding',
      'margin': 'margin',  // Support margin (used by label component)
      'font-family': 'font-family',
      'font-size': 'font-size',
      'font-weight': 'font-weight',
      'line-height': 'line-height',
      'letter-spacing': 'letter-spacing',
      'text-transform': 'text-transform',
      'gap': 'gap',
      'cursor': 'cursor',
      'opacity': 'opacity',
      'min-width': 'min-width',
      'height': 'height',
      'shadow': 'box-shadow',
      'icon-size': 'font-size',
      // State layer properties are used for interactive states, not base styles
      // They're handled in the :hover, :focus, :active pseudo-class rules
    };

    // Skip state-layer-* properties in base styles (they're decorative overlay properties)
    if (normalizedProperty.startsWith('state-layer-')) {
      return null;
    }

    // Return mapped property, or if not in mapping, check if it's already a valid CSS property
    // This allows properties like "background-color", "text-align", etc. to work even if not explicitly mapped
    const mappedProperty = mapping[normalizedProperty];
    if (mappedProperty) {
      return mappedProperty;
    }

    // Common CSS properties that should pass through as-is
    const validCSSProperties = [
      'text-align', 'text-decoration', 'display', 'position', 'overflow',
      'width', 'max-width', 'min-height', 'max-height',
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
      'flex', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items',
      'grid', 'grid-template-columns', 'grid-template-rows', 'grid-gap',
      'transform', 'transition', 'animation',
      'z-index', 'visibility', 'box-sizing',
    ];

    if (validCSSProperties.includes(normalizedProperty)) {
      return normalizedProperty;
    }

    // If not in mapping and not a common CSS property, return null
    return null;
  };

  /**
   * Handles token value changes from UI controls
   * Updates both state and applies to iframe
   */
  const handleTokenChange = (tokenName: string, value: string) => {
    // const propertyName = tokenName.split('-').slice(4).join('-');
    // console.log(`%c[Design Tokens] Changed: ${propertyName}`, 'color: #2196F3', `→ ${value}`);
    const newTokens = { ...tokens, [tokenName]: value };
    setTokens(newTokens);
    applyTokens(newTokens);
  };

  /**
   * Resets all tokens to their default values from JSON
   */
  const handleReset = () => {
    setTokens(defaultTokens);
    applyTokens(defaultTokens);
  };

  // ========== RENDER LOGIC ==========

  // Show loading state while story data is being fetched
  if (isLoading) {
    return (
      <PanelContent>
        <EmptyState>
          <h3>Loading Design Tokens...</h3>
          <p>Please wait while we load the design token configuration.</p>
        </EmptyState>
      </PanelContent>
    );
  }

  // Show empty state if tokens are not configured for this story
  if (!parameters.enabled) {
    return (
      <PanelContent>
        <EmptyState>
          <h3>Design Tokens Not Available</h3>
          <p>This story does not have design tokens configured.</p>
          <p style={{ fontSize: "12px", marginTop: "12px", color: "#999" }}>
            Add the <code>designTokens</code> parameter to enable this feature.
          </p>
        </EmptyState>
      </PanelContent>
    );
  }

  // Determine which approach to use for rendering
  let tokenConfig: ComponentTokenConfig | undefined;

  if (parameters.tokenData && parameters.componentKey) {
    // NEW APPROACH: Parse tokens at runtime (same logic as in the effect)
    if (parameters.extractCSSVariablesAtRuntime && cssVariableMap.size > 0) {
      tokenConfig = parseDesignTokens(parameters.tokenData, parameters.componentKey, cssVariableMap);
    } else if (parameters.extractCSSVariablesAtRuntime) {
      // CSS variables not extracted yet, show loading
      return (
        <PanelContent>
          <EmptyState>
            <p>Extracting CSS variables from foundation.css...</p>
          </EmptyState>
        </PanelContent>
      );
    } else {
      tokenConfig = parseDesignTokens(parameters.tokenData, parameters.componentKey);
    }
  } else if (parameters.tokenConfig) {
    // OLD APPROACH: Use pre-parsed tokenConfig
    tokenConfig = parameters.tokenConfig;
  }

  if (!tokenConfig) {
    return (
      <PanelContent>
        <EmptyState>
          <p>No token configuration found.</p>
          <p style={{ fontSize: "12px", marginTop: "12px", color: "#999" }}>
            Provide either <code>tokenData + componentKey</code> or <code>tokenConfig</code> in parameters.
          </p>
        </EmptyState>
      </PanelContent>
    );
  }

  let tokensToDisplay = tokenConfig.tokens;

  // Get variant-specific tokens if className is provided
  if (currentClassName && tokenConfig.variants) {
    tokensToDisplay = getTokensForClassName(tokenConfig, currentClassName);
  }

  // Group tokens by category
  const groupedTokens: Record<string, TokenDefinition[]> = {};
  tokensToDisplay.forEach((token: TokenDefinition) => {
    const category = token.category || "General";
    if (!groupedTokens[category]) {
      groupedTokens[category] = [];
    }
    groupedTokens[category].push(token);
  });


  /**
   * Renders the appropriate input control based on token type
   */
  const renderTokenInput = (token: TokenDefinition) => {
    // Use ?? instead of || to allow empty strings and other falsy values
    // This lets users clear fields or enter "0", "0px", etc.
    const value = tokens[token.name] ?? token.value ?? "";

    // Color picker + text input
    if (token.controlType === "color") {
      // Convert any color format to hex for the color picker
      // The color picker input requires a valid hex value
      let colorValue = value;

      try {
        // Handle transparent color
        if (value.toLowerCase() === 'transparent') {
          colorValue = '#ffffff'; // Use white as fallback for transparent
        }
        // If it's an RGB value, convert to hex
        else if (value && value.startsWith('rgb')) {
          const rgbMatch = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
            const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
            const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
            colorValue = `#${r}${g}${b}`;
          }
        }
        // If it's already a hex color with #
        else if (value && value.startsWith('#')) {
          // Validate hex format (3 or 6 digits)
          const hexMatch = value.match(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/);
          if (hexMatch) {
            colorValue = value;
          } else {
            colorValue = '#000000';
          }
        }
        // If it's a hex without # prefix
        else if (value && /^([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)) {
          colorValue = `#${value}`;
        }
        // Empty or invalid value
        else {
          colorValue = '#000000';
        }
      } catch (err) {
        colorValue = '#000000'; // Fallback
      }

      return (
        <ColorInputWrapper>
          <ColorInput
            type="color"
            value={colorValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newColor = e.target.value;
              // console.log(`[Color Picker] ${token.label} picker changed to: ${newColor}`);
              handleTokenChange(token.name, newColor);
            }}
          />
          <ColorTextInput
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;
              // console.log(`[Color Input] ${token.label} text changed to: ${newValue}`);
              handleTokenChange(token.name, newValue);
            }}
            placeholder="#000000"
          />
        </ColorInputWrapper>
      );
    }

    // Dropdown for predefined options
    if (token.controlType === "select" && token.options) {
      // Ensure the current value is in the options list, otherwise use the first option
      const validValue = token.options.includes(value) ? value : token.options[0];

      return (
        <TokenSelect
          value={validValue}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleTokenChange(token.name, e.target.value)
          }
        >
          {token.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TokenSelect>
      );
    }

    // Number input for opacity
    if (token.controlType === "number") {
      // Convert percentage strings to decimals for the number input
      // foundation.css uses "8%" but number input needs 0.08
      let displayValue = value;
      if (typeof value === 'string' && value.endsWith('%')) {
        // Convert "8%" to "0.08"
        const percentValue = parseFloat(value.replace('%', ''));
        displayValue = (percentValue / 100).toString();
      }

      return (
        <TokenInput
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={displayValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // Convert decimal back to percentage when saving
            // User enters 0.08, we save as "8%"
            const decimalValue = parseFloat(e.target.value);
            const percentValue = `${(decimalValue * 100)}%`;
            handleTokenChange(token.name, percentValue);
          }}
        />
      );
    }

    // Default text input for dimensions, etc.
    return (
      <TokenInput
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleTokenChange(token.name, e.target.value)
        }
      />
    );
  };

  return (
    <PanelContent>
      <InfoBox>
        <InfoText>
          <strong>{tokenConfig.componentName.toUpperCase()} Design Tokens</strong>
          {currentClassName && (
            <>
              {" "}
              - Applied variant: <code>{currentClassName}</code>
            </>
          )}
          <br />
          Modify any token below to see real-time changes in the component above.
          Change the className in the Controls tab to switch variants.
        </InfoText>
      </InfoBox>

      {Object.entries(groupedTokens).map(([category, categoryTokens]) => (
        <TokenSection key={category}>
          <SectionTitle>{category}</SectionTitle>
          {categoryTokens.map((token) => (
            <TokenGroup key={token.name}>
              <TokenLabel htmlFor={token.name}>
                <span>{token.label}</span>
                <TokenName>{token.name}</TokenName>
              </TokenLabel>
              {token.description && <TokenDescription>{token.description}</TokenDescription>}
              {renderTokenInput(token)}
            </TokenGroup>
          ))}
        </TokenSection>
      ))}

      <ButtonGroup>
        <ResetButton onClick={handleReset}>Reset to Defaults</ResetButton>
      </ButtonGroup>
    </PanelContent>
  );
};
