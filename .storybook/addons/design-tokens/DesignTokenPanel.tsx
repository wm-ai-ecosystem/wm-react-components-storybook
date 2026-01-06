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
import { DesignTokenParameters, TokenDefinition } from "./types";
import { getTokensForClassName } from "./tokenParser";

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

  // Track previous className to detect actual changes (not re-renders)
  const prevClassNameRef = React.useRef<string>("");
  // Track if we've done initial token application
  const hasAppliedInitialTokensRef = React.useRef<boolean>(false);

  /**
   * Effect: Monitor story changes and args updates
   * 
   * This effect:
   * 1. Gets the current story ID
   * 2. Reads story parameters (designTokens configuration)
   * 3. Reads args.className from Controls tab
   * 4. Updates state when either changes
   * 
   * Events listened:
   * - storyChanged: When user switches to a different story
   * - argsUpdated: When user changes className in Controls tab
   */
  useEffect(() => {
    if (!api) return;

    const updateStoryData = () => {
      const storyId = api.getUrlState().storyId;
      if (storyId) {
        const storyData = api.getData(storyId);
        const designTokenParams = storyData?.parameters?.designTokens as DesignTokenParameters;
        setParameters(designTokenParams || { enabled: false });

        // Get className from args (Controls tab) if available, otherwise from parameters
        const argsClassName = (storyData as any)?.args?.className as string;
        const className = argsClassName || designTokenParams?.className || "";
        setCurrentClassName(className);

        // Mark as loaded after first data fetch
        setIsLoading(false);
      }
    };

    updateStoryData();

    // Listen to story and args changes
    const unsubscribeStoryChanged = api.on("storyChanged", updateStoryData);
    const unsubscribeArgsUpdated = api.on("argsUpdated", updateStoryData);

    return () => {
      unsubscribeStoryChanged();
      unsubscribeArgsUpdated();
    };
  }, [api]);

  /**
   * Effect: Initialize tokens when parameters or className change
   *
   * This effect:
   * 1. Reads tokenConfig from parameters
   * 2. If className is provided, gets variant-specific tokens
   * 3. Creates initial token values object
   * 4. Applies tokens to the iframe (sets CSS variables and injects CSS)
   *
   * IMPORTANT: Only resets user changes when className actually changes,
   * not on every re-render!
   */
  useEffect(() => {
    if (parameters.enabled && parameters.tokenConfig) {
      const { tokenConfig } = parameters;
      let tokensToUse = tokenConfig.tokens;

      // Get variant-specific tokens if className is provided
      // This merges base tokens with variant overrides
      if (currentClassName && tokenConfig.variants) {
        tokensToUse = getTokensForClassName(tokenConfig, currentClassName);
      }

      // Convert token array to key-value pairs
      const initialTokens: Record<string, string> = {};
      tokensToUse.forEach((token: TokenDefinition) => {
        initialTokens[token.name] = token.value;
      });

      // Only reset tokens if className actually changed (not just a re-render)
      const classNameChanged = prevClassNameRef.current !== currentClassName;
      const isFirstLoad = !hasAppliedInitialTokensRef.current;

      if (classNameChanged || isFirstLoad) {
        if (isFirstLoad) {
          console.log(`[Design Tokens] First load - applying initial tokens`);
          hasAppliedInitialTokensRef.current = true;
        } else {
          console.log(`[Design Tokens] ClassName changed: ${prevClassNameRef.current} → ${currentClassName}`);
        }

        console.log(`[Design Tokens] Resetting tokens to defaults for variant: ${currentClassName}`);
        console.log(`[Design Tokens] Token count: ${Object.keys(initialTokens).length}`);

        prevClassNameRef.current = currentClassName;

        setDefaultTokens(initialTokens);
        setTokens(initialTokens);
        applyTokens(initialTokens);
      } else if (Object.keys(initialTokens).length > 0) {
        // Just update defaults, tokens state will be preserved
        setDefaultTokens(initialTokens);
      }
    }
  }, [parameters, currentClassName]);

  /**
   * Effect: Re-apply tokens when panel becomes active
   *
   * This ensures tokens are applied when user clicks the Design Tokens tab,
   * even if they navigated to the story earlier and the iframe is already loaded.
   */
  const prevActiveRef = React.useRef(active);
  useEffect(() => {
    const becameActive = !prevActiveRef.current && active;
    prevActiveRef.current = active;

    if (becameActive && Object.keys(tokens).length > 0) {
      console.log(`[Design Tokens] Panel became active - re-applying tokens`);
      // Small delay to ensure panel is fully rendered
      setTimeout(() => applyTokens(tokens), 50);
    }
  }, [active]);

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
    const applyTokensToIframe = (attempt = 1, maxAttempts = 10) => {
      if (!iframe || !iframe.contentDocument) {
        // Iframe not ready yet, retry
        if (attempt < maxAttempts) {
          console.log(`[Design Tokens] Iframe not ready, retrying... (attempt ${attempt}/${maxAttempts})`);
          setTimeout(() => applyTokensToIframe(attempt + 1, maxAttempts), 100);
        } else {
          console.error('[Design Tokens] Failed to apply tokens: iframe not ready after max attempts');
        }
        return;
      }

      // Check if buttons are rendered
      const targetButtons = iframe.contentDocument.querySelectorAll('button[data-design-token-target="true"]');
      if (targetButtons.length === 0 && attempt < maxAttempts) {
        // Buttons not rendered yet, retry
        console.log(`[Design Tokens] Buttons not rendered yet, retrying... (attempt ${attempt}/${maxAttempts})`);
        setTimeout(() => applyTokensToIframe(attempt + 1, maxAttempts), 100);
        return;
      }

      // Iframe and buttons are ready, apply tokens
      if (parameters.tokenConfig) {
        const { componentName, selector } = parameters.tokenConfig;
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
        const cssRules = generateCSSRules(tokenValues, selector || `.${componentName}`, currentClassName);
        styleTag.textContent = cssRules;

        iframe.contentDocument.head.appendChild(styleTag);

        // Console logging - cleaner output
        console.log(`%c[Design Tokens] ✓ Tokens Applied (attempt ${attempt})`, 'color: #4CAF50; font-weight: bold');
        console.log(`  → Variant: ${currentClassName}`);
        console.log(`  → Token count: ${Object.keys(tokenValues).length}`);
        console.log(`  → Generated CSS length: ${cssRules.length} chars`);
        console.log(`  → Found ${targetButtons.length} target buttons`);

        // Verify styles applied
        if (targetButtons.length > 0) {
          const button = targetButtons[0];
          const computed = iframe.contentWindow?.getComputedStyle(button);
          const textElement = button.querySelector('.btn-caption');
          const textComputed = textElement ? iframe.contentWindow?.getComputedStyle(textElement) : null;

          console.log(`  → Button background: ${computed?.backgroundColor}`);
          console.log(`  → Button color: ${computed?.color}`);
          console.log(`  → Button font-size: ${computed?.fontSize}`);
          if (textComputed) {
            console.log(`  → Text color: ${textComputed?.color}`);
            console.log(`  → Text font-size: ${textComputed?.fontSize}`);
          }
        }
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
   * button[data-design-token-target="true"].btn-filled.btn-primary {
   *   background-color: var(--wm-btn-background) !important;
   *   color: var(--wm-btn-color) !important;
   *   ...
   * }
   * ```
   *
   * The [data-design-token-target="true"] attribute ensures that styles
   * only apply to buttons in the DesignToken story, not to buttons in other stories.
   * This prevents token changes from affecting all buttons globally.
   *
   * It also generates rules for :hover, :focus, :active, :disabled states
   */
  const generateCSSRules = (
    tokenValues: Record<string, string>,
    _selector: string,
    className: string
  ): string => {
    // Build selector with data attribute to scope to DesignToken story only
    // Example: "button[data-design-token-target="true"].btn-filled.btn-primary"
    // This ensures token changes ONLY affect buttons in the DesignToken story
    const dataAttr = '[data-design-token-target="true"]';

    // Generate ULTRA-HIGH specificity selector to override MUI and foundation.css
    // Stack multiple classes to increase specificity: (0, 8+, 1)
    const classSelectors = className ? `.${className.split(' ').join('.')}` : '';
    const fullSelector = `button.MuiButton-root.MuiButtonBase-root.btn.app-button${dataAttr}${classSelectors}`;

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
    // This ensures color and font properties apply to text inside the button
    // Also sets z-index to ensure text appears above state layer overlays
    css += `${fullSelector} .btn-caption,\n`;
    css += `${fullSelector} > * {\n`;
    css += `  position: relative !important;\n`;
    css += `  z-index: 1 !important;\n`;
    css += `}\n\n`;

    css += `${fullSelector},\n`;
    css += `${fullSelector} .btn-caption {\n`;
    if (tokenValues['--wm-btn-color']) {
      css += `  color: ${tokenValues['--wm-btn-color']} !important;\n`;
    }
    if (tokenValues['--wm-btn-font-size']) {
      css += `  font-size: ${tokenValues['--wm-btn-font-size']} !important;\n`;
    }
    if (tokenValues['--wm-btn-font-family']) {
      css += `  font-family: ${tokenValues['--wm-btn-font-family']} !important;\n`;
    }
    if (tokenValues['--wm-btn-font-weight']) {
      css += `  font-weight: ${tokenValues['--wm-btn-font-weight']} !important;\n`;
    }
    if (tokenValues['--wm-btn-line-height']) {
      css += `  line-height: ${tokenValues['--wm-btn-line-height']} !important;\n`;
    }
    if (tokenValues['--wm-btn-letter-spacing']) {
      css += `  letter-spacing: ${tokenValues['--wm-btn-letter-spacing']} !important;\n`;
    }
    if (tokenValues['--wm-btn-text-transform']) {
      css += `  text-transform: ${tokenValues['--wm-btn-text-transform']} !important;\n`;
    }
    css += `}\n\n`;

    // Add rules for icons (targets .app-icon and i elements)
    // Icons inherit color from button text color and can have custom size
    css += `${fullSelector} .app-icon,\n`;
    css += `${fullSelector} i {\n`;
    if (tokenValues['--wm-btn-color']) {
      css += `  color: ${tokenValues['--wm-btn-color']} !important;\n`;
    }
    if (tokenValues['--wm-btn-icon-size']) {
      css += `  font-size: ${tokenValues['--wm-btn-icon-size']} !important;\n`;
      css += `  width: ${tokenValues['--wm-btn-icon-size']} !important;\n`;
      css += `  height: ${tokenValues['--wm-btn-icon-size']} !important;\n`;
    }
    css += `  position: relative !important;\n`;
    css += `  z-index: 1 !important;\n`;
    css += `}\n\n`;

    // Add rules for badges (targets .badge elements)
    if (tokenValues['--wm-btn-color']) {
      css += `${fullSelector} .badge {\n`;
      css += `  background-color: ${tokenValues['--wm-btn-color']} !important;\n`;
      css += `  color: ${tokenValues['--wm-btn-background']} !important;\n`;
      css += `  position: relative !important;\n`;
      css += `  z-index: 1 !important;\n`;
      css += `  font-size: 0.75em !important;\n`;
      css += `}\n\n`;
    }

    // Ensure button has position:relative for state layer overlays
    if (tokenValues['--wm-btn-state-layer-color']) {
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
    if (tokenValues['--wm-btn-state-layer-color'] && tokenValues['--wm-btn-states-hover-state-layer-opacity']) {
      css += `${fullSelector}:hover:not(:disabled)::before {\n`;
      css += `  content: '' !important;\n`;
      css += `  position: absolute !important;\n`;
      css += `  top: 0 !important;\n`;
      css += `  left: 0 !important;\n`;
      css += `  right: 0 !important;\n`;
      css += `  bottom: 0 !important;\n`;
      css += `  background-color: ${tokenValues['--wm-btn-state-layer-color']} !important;\n`;
      css += `  opacity: ${tokenValues['--wm-btn-states-hover-state-layer-opacity']} !important;\n`;
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
    if (tokenValues['--wm-btn-state-layer-color'] && tokenValues['--wm-btn-states-focus-state-layer-opacity']) {
      css += `${fullSelector}:focus:not(:disabled)::before {\n`;
      css += `  content: '' !important;\n`;
      css += `  position: absolute !important;\n`;
      css += `  top: 0 !important;\n`;
      css += `  left: 0 !important;\n`;
      css += `  right: 0 !important;\n`;
      css += `  bottom: 0 !important;\n`;
      css += `  background-color: ${tokenValues['--wm-btn-state-layer-color']} !important;\n`;
      css += `  opacity: ${tokenValues['--wm-btn-states-focus-state-layer-opacity']} !important;\n`;
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
    if (tokenValues['--wm-btn-state-layer-color'] && tokenValues['--wm-btn-states-active-state-layer-opacity']) {
      css += `${fullSelector}:active:not(:disabled)::before {\n`;
      css += `  content: '' !important;\n`;
      css += `  position: absolute !important;\n`;
      css += `  top: 0 !important;\n`;
      css += `  left: 0 !important;\n`;
      css += `  right: 0 !important;\n`;
      css += `  bottom: 0 !important;\n`;
      css += `  background-color: ${tokenValues['--wm-btn-state-layer-color']} !important;\n`;
      css += `  opacity: ${tokenValues['--wm-btn-states-active-state-layer-opacity']} !important;\n`;
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
    if (tokenValues['--wm-btn-states-disabled-opacity']) {
      css += `  opacity: ${tokenValues['--wm-btn-states-disabled-opacity']} !important;\n`;
    } else {
      css += `  opacity: 0.38 !important;\n`;
    }
    if (tokenValues['--wm-btn-states-disabled-cursor']) {
      css += `  cursor: ${tokenValues['--wm-btn-states-disabled-cursor']} !important;\n`;
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
      'color': 'color',
      'border-color': 'border-color',
      'border-width': 'border-width',
      'border-style': 'border-style',
      'border-radius': 'border-radius',
      'radius': 'border-radius',
      'padding': 'padding',
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

    return mapping[normalizedProperty] || null;
  };

  /**
   * Handles token value changes from UI controls
   * Updates both state and applies to iframe
   */
  const handleTokenChange = (tokenName: string, value: string) => {
    const propertyName = tokenName.split('-').slice(4).join('-');
    console.log(`%c[Design Tokens] Changed: ${propertyName}`, 'color: #2196F3', `→ ${value}`);
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

  // Show loading state while fetching story data
  if (isLoading) {
    return (
      <PanelContent>
        <EmptyState>
          <p>Loading design tokens...</p>
        </EmptyState>
      </PanelContent>
    );
  }

  // Show empty state only if panel is inactive or tokens are truly not configured
  if (!active || !parameters.enabled) {
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

  if (!parameters.tokenConfig) {
    return (
      <PanelContent>
        <EmptyState>
          <p>No token configuration found.</p>
        </EmptyState>
      </PanelContent>
    );
  }

  const { tokenConfig } = parameters;
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
              console.log(`[Color Picker] ${token.label} picker changed to: ${newColor}`);
              handleTokenChange(token.name, newColor);
            }}
          />
          <ColorTextInput
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;
              console.log(`[Color Input] ${token.label} text changed to: ${newValue}`);
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
      return (
        <TokenInput
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTokenChange(token.name, e.target.value)
          }
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
