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

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useStorybookApi } from "storybook/manager-api";
import { addons } from "storybook/preview-api";
import { styled } from "storybook/theming";
import { DesignTokenParameters, TokenDefinition, ComponentTokenConfig } from "./types";
import { getTokensForClassName, parseDesignTokens, detectAvailableStates, extractLabelFromCSSVariable } from "./tokenParser";
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
  overflow-x: visible;
  background-color: #f8f8f8;
  container-type: inline-size;
  container-name: panel-content;
  position: relative;
`;

const TokenSection = styled.div`
  margin-bottom: 20px;
  background-color: white;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: visible;
  position: relative;
  z-index: 1;
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
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  /* Bottom panel: grid layout with multiple columns */
  @container (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    align-items: center;
  }

  @container (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const TokenLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  gap: 8px;
  margin-bottom: 0;
  position: relative;
  min-width: 120px;
  flex: 1;
  text-align: left;

  /* Bottom panel: reset flex and remove min-width */
  @container (min-width: 800px) {
    flex: 0 1 auto;
    min-width: 0;
  }

  /* Show help icon on label hover */
  &:hover [data-help-icon] {
    opacity: 1;
    visibility: visible;
  }

  /* Wrap long text */
  & > span {
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
  }
`;

// Removed TokenName - CSS variable names now shown only in tooltips

// Removed FontFamilyValue - no longer displaying font-family values inline

// Removed StateBadge - no longer showing state badges next to labels

const HelpIconWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
`;

const HelpIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #000;
  color: white;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background-color: #1565c0;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.3);
  }
`;

const HelpTooltip = styled.div<{ show: boolean; top?: number; left?: number; isAbove?: boolean }>`
  position: fixed;
  top: ${props => props.top !== undefined ? `${props.top}px` : 'auto'};
  left: ${props => props.left !== undefined ? `${props.left}px` : 'auto'};
  transform: ${props => props.isAbove ? 'translate(-50%, -100%)' : 'translate(-50%, 0)'};
  background-color: #ffffff;
  color: #000000;
  padding: 0;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.7;
  max-width: 450px;
  min-width: 280px;
  width: max-content;
  max-height: 400px;
  white-space: normal;
  z-index: 2147483647;
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.25s ease-in-out, visibility 0.25s ease-in-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  overflow: auto;

  &::after {
    content: '';
    position: absolute;
    ${props => props.isAbove ? `
      top: 100%;
      border: 7px solid transparent;
      border-top-color: #ffffff;
    ` : `
      bottom: 100%;
      border: 7px solid transparent;
      border-bottom-color: #ffffff;
    `}
    left: 50%;
    transform: translateX(-50%);
    z-index: 2147483647;
  }

  /* Handle edge cases where tooltip goes off screen */
  @media (max-width: 600px) {
    max-width: 300px;
    min-width: 200px;
  }
`;

const TooltipVariableName = styled.div`
  background-color: #f5f5f5;
  color: #000000;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
  word-break: break-all;
`;

const TooltipVariableLabel = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  opacity: 0.7;
  margin-right: 6px;
`;

const TooltipVariableValue = styled.span`
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
`;

const TooltipDescription = styled.div`
  padding: 14px 18px;
  color: #000000;

  & br {
    display: block;
    content: "";
    margin-top: 8px;
  }

  & code {
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: monospace;
    font-size: 11px;
    color: #000000;
  }
`;


const TokenInput = styled.input`
  width: 100%;
  max-width: 150px;
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-family: monospace;
  transition: border-color 0.2s;
  background-color: #ffffff;
  color: #1c1b1f;

  /* Bottom panel: remove max-width */
  @container (min-width: 800px) {
    max-width: none;
  }

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
  max-width: 150px;
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-family: inherit;
  background-color: #ffffff;
  color: #1c1b1f;
  cursor: pointer;
  transition: border-color 0.2s;

  /* Bottom panel: remove max-width */
  @container (min-width: 800px) {
    max-width: none;
  }

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

const TokenInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 150px;
  flex-shrink: 0;

  /* Bottom panel: auto width and left align */
  @container (min-width: 800px) {
    width: auto;
    justify-content: flex-start;
    flex-shrink: 1;
  }
`;

const ColorInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const ColorInput = styled(TokenInput)`
  width: 60px;
  min-width: 60px;
  max-width: 60px;
  flex-shrink: 0;
`;

const ColorTextInput = styled(TokenInput)`
  flex: 1 1 auto;
  min-width: 0;
  max-width: 90px;

  /* Bottom panel: remove max-width */
  @container (min-width: 800px) {
    max-width: none;
  }
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

const StateDropdownContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  /* Bottom panel: grid layout */
  @container (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @container (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StateDropdownLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  margin-bottom: 0;
  min-width: 120px;
  flex: 1;
  text-align: left;

  /* Bottom panel: reset flex and remove min-width */
  @container (min-width: 800px) {
    flex: 0 1 auto;
    min-width: 0;
  }
`;

const StateDropdown = styled.select`
  width: 150px;
  max-width: 150px;
  flex-shrink: 0;
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-family: inherit;
  background-color: #ffffff;
  color: #1c1b1f;
  cursor: pointer;
  transition: border-color 0.2s;
  pointer-events: none; /* Disabled */
  opacity: 0.6; /* Disabled */

  /* Bottom panel: full width */
  @container (min-width: 800px) {
    width: 100%;
    max-width: none;
    flex-shrink: 1;
  }

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
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number; isAbove: boolean } | null>(null);

  // State dropdown management
  const [selectedState, setSelectedState] = useState<string>("default");
  const [availableStates, setAvailableStates] = useState<string[]>(["default"]);

  // Track previous className to detect actual changes (not re-renders)
  const prevClassNameRef = useRef<string>("");
  // Track if we've done initial token application
  const hasAppliedInitialTokensRef = useRef<boolean>(false);
  // Track the className when the panel was last active to detect changes while panel was inactive
  const classNameWhenActiveRef = useRef<string>("");
  // Track if tokens need refresh (used to trigger re-parse when className changes while active)
  const needsRefreshRef = useRef<boolean>(false);
  // Track latest tokens for async portal handling
  const latestTokensRef = useRef<Record<string, string>>({});
  // Observers for dynamically mounted portals
  const iframeObserverRef = useRef<MutationObserver | null>(null);
  const managerObserverRef = useRef<MutationObserver | null>(null);

  // Storybook channel for manager -> preview communication (official mechanism)
  const channelRef = useRef<ReturnType<typeof addons.getChannel> | null>(null);
  useEffect(() => {
    try {
      channelRef.current = addons.getChannel();
    } catch (e) {
      channelRef.current = null;
    }
  }, []);

  const emitTokensToPreview = (tokenValues: Record<string, string>) => {
    try {
      const storyId = api?.getUrlState?.().storyId;
      channelRef.current?.emit("wm/designTokens/apply", { tokenValues, storyId });
    } catch (e) {
      // ignore
    }
  };

  /**
   * Effect: Monitor story changes and args updates
   *
   * This effect:
   * 1. Gets the current story ID
   * 2. Reads story parameters (designTokens configuration)
   * 3. Reads args.className from Controls tab OR mapped prop (e.g., args.type)
   * 4. Updates state when either changes
   *
   * Uses polling to detect className/prop changes since argsUpdated event is unreliable
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

      // Get className from story data args OR from mapped prop
      let className = "";

      // Check if we should use prop-to-variant mapping
      if (designTokenParams?.propToVariantMap) {
        const { propName, mapping } = designTokenParams.propToVariantMap;
        const propValue = (storyData as any)?.args?.[propName];

        // Map prop value to variant key
        if (propValue && mapping[propValue]) {
          className = mapping[propValue];
        }
      } else {
        // Traditional className-based approach
        const argsClassName = (storyData as any)?.args?.className as string;
        className = argsClassName || designTokenParams?.className || "";
      }

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

      // Reset state dropdown to "default"
      setSelectedState("default");
      setAvailableStates(["default"]);

      // Reset CSS variable values from previous story
      const iframe = document.querySelector("#storybook-preview-iframe") as HTMLIFrameElement;
      if (iframe?.contentDocument) {
        // Remove inline CSS variable overrides from all elements with data-design-token-target AND their children
        const targetElements = iframe.contentDocument.querySelectorAll('[data-design-token-target="true"]');

        targetElements.forEach((element: Element) => {
          const htmlElement = element as HTMLElement;

          // Remove variables from target element (including global state variables)
          const inlineStyles = htmlElement.style;
          const propertiesToRemove: string[] = [];
          for (let i = 0; i < inlineStyles.length; i++) {
            const propertyName = inlineStyles[i];
            if (propertyName.startsWith('--wm-')) {
              propertiesToRemove.push(propertyName);
            }
          }
          propertiesToRemove.forEach(prop => htmlElement.style.removeProperty(prop));

          // Remove variables from all descendant elements
          const childElements = htmlElement.querySelectorAll('*');
          childElements.forEach((child: Element) => {
            const childHtmlElement = child as HTMLElement;
            const childInlineStyles = childHtmlElement.style;
            const childPropertiesToRemove: string[] = [];
            for (let i = 0; i < childInlineStyles.length; i++) {
              const propertyName = childInlineStyles[i];
              if (propertyName.startsWith('--wm-')) {
                childPropertiesToRemove.push(propertyName);
              }
            }
            childPropertiesToRemove.forEach(prop => childHtmlElement.style.removeProperty(prop));
          });
        });
      }

      // Clear cache
      clearCache();

        // Disconnect any existing observers to avoid them re-applying stale tokens
        try {
          if (iframeObserverRef.current) {
            iframeObserverRef.current.disconnect();
            iframeObserverRef.current = null;
          }
          if (managerObserverRef.current) {
            managerObserverRef.current.disconnect();
            managerObserverRef.current = null;
          }
        } catch (e) {
          // ignore
        }

        // Remove injected state CSS rules from previous story (iframe + manager document)
        try {
          if (iframe?.contentDocument) {
            const prevStyle = iframe.contentDocument.querySelector('#design-token-component-states');
            if (prevStyle) prevStyle.remove();
          }
          const prevManagerStyle = document.querySelector('#design-token-component-states');
          if (prevManagerStyle) prevManagerStyle.remove();
        } catch (e) {
          // ignore
        }

        // Clear latest tokens snapshot used by observers
        latestTokensRef.current = {};

        // Close any open tooltip to avoid stale UI persisting across stories
        setActiveTooltip(null);
        setTooltipPosition(null);

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

        // Build token reference map (async to load form-controls.json)
        buildTokenReferenceMap(extractedVars).then((referenceMap) => {
          // Update state
          setCssVariableMap(referenceMap);

          // console.log(`[Design Tokens] ✓ Token reference map built with ${referenceMap.size} entries`);
        }).catch((error) => {
          // console.error('[Design Tokens] Error building token reference map:', error);
          // Fallback: use extractedVars directly if augmentation fails
          setCssVariableMap(extractedVars);
        });
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
      // Detect available states from JSON structure
      if (parameters.tokenData && parameters.componentKey) {
        const detectedStates = detectAvailableStates(parameters.tokenData, parameters.componentKey);
        // Only update if states have changed to avoid unnecessary re-renders
        if (JSON.stringify(detectedStates) !== JSON.stringify(availableStates)) {
          setAvailableStates(detectedStates);
          // Reset to default state if current state is not in the new list
          if (!detectedStates.includes(selectedState)) {
            setSelectedState("default");
          }
        }
      }

      let tokensToUse = tokenConfig.tokens;

      // Get variant-specific tokens if className is provided
      // This merges base tokens with variant overrides
      if (currentClassName && tokenConfig.variants) {
        tokensToUse = getTokensForClassName(
          tokenConfig,
          currentClassName,
          parameters.tokenData,
          parameters.componentKey
        );
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

        // Reset state dropdown to "default" when className changes
        if (classNameChanged && selectedState !== "default") {
          setSelectedState("default");
        }

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
  const prevActiveRef = useRef(active);
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
   * Effect: Close tooltip when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (activeTooltip && !target.closest('[data-help-icon]')) {
        // console.log('[Help Icon] Closing tooltip due to outside click');
        setActiveTooltip(null);
      }
    };

    if (activeTooltip) {
      // console.log('[Help Icon] Adding click outside listener for:', activeTooltip);
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [activeTooltip]);

  /**
   * Applies tokens to the Storybook preview iframe
   *
   * This function directly updates CSS variable values at the :root level
   * instead of generating override CSS rules. This allows the natural CSS
   * cascade to work without !important declarations.
   *
   * Changes are applied by setting CSS custom properties on the documentElement:
   * iframe.contentDocument.documentElement.style.setProperty('--wm-var', 'value')
   */
  const applyTokens = (tokenValues: Record<string, string>) => {
    // Keep a snapshot for observers
    latestTokensRef.current = tokenValues;

    // Also emit to preview via Storybook's channel so preview can apply tokens to :root.
    // This covers portals (dialogs) and environments where manager can't reliably access iframe DOM.
    emitTokensToPreview(tokenValues);

    const iframe = document.querySelector("#storybook-preview-iframe") as HTMLIFrameElement;

    // Helper to get the latest token values (observers will read from this)
    const getLatestTokenValues = () => latestTokensRef.current || {};

    // Helper function to apply tokens once iframe is ready
    const applyTokensToIframe = (attempt = 1, maxAttempts = 4) => {
      if (!iframe || !iframe.contentDocument) {
        // Iframe not ready yet, retry with reduced delay
        if (attempt < maxAttempts) {
          setTimeout(() => applyTokensToIframe(attempt + 1, maxAttempts), 100);
        } else {
          // console.error('[Design Tokens] Failed to apply tokens: iframe not ready after max attempts');
        }
        return;
      }

      // Helper function to check if an element is a component element
      // This function identifies all WaveMaker component elements by their CSS classes
      const isComponentElement = (element: Element): boolean => {
        const classList = Array.from(element.classList);
        return classList.some(c =>
          // ===== VARIANT PATTERNS (must check first for specificity) =====
          c.startsWith('alert-') ||                // message: alert-success, alert-danger, alert-warning, alert-info, alert-loading
          c.startsWith('progress-bar-') ||         // progress-bar: progress-bar-success, progress-bar-danger, etc.
          c.startsWith('progress-circle-') ||      // progress-circle: progress-circle-success, etc.
          c.startsWith('panel-') ||                // accordion/panel: panel-primary, panel-secondary, panel-default, etc.
          c.startsWith('text-') ||                 // label: text-primary, text-secondary, text-danger, etc.
          c.startsWith('toast-') ||                // toast: toast-success, toast-error, toast-warning, toast-info
          c.startsWith('btn-') ||                  // button: btn-filled, btn-outlined, btn-text, btn-primary, etc.
          c.startsWith('card-') ||                 // card: card-default, card-elevated, card-filled
          c.startsWith('modal-') ||                // modal: modal-lg, modal-sm, modal-xl, modal-xs, modal-full-screen
          c.startsWith('label-') ||                // badge/label: label-primary, label-success, etc.
          c.startsWith('nav-') ||                  // nav: nav-item, nav-link, etc.

          // ===== BASIC COMPONENTS =====
          c === 'app-button' ||                    // button base class
          c === 'app-anchor' ||                    // anchor/link base class
          c === 'app-label' ||                     // label base class
          c === 'btn' ||                           // button alternate class
          c === 'app-icon' ||                      // icon base class
          c === 'app-picture' ||                   // picture/image base class
          c === 'app-badge' ||                     // badge base class

          // ===== FORM CONTROLS =====
          c === 'app-checkbox' ||                  // checkbox base class
          c === 'app-radioset' ||                  // radioset base class
          c === 'app-radio' ||                     // radio base class
          c === 'app-switch' ||                    // switch/toggle base class
          c === 'app-toggle' ||                    // toggle base class
          c === 'app-textbox' ||                   // text input base class
          c === 'app-textarea' ||                  // textarea base class
          c === 'app-select' ||                    // select/dropdown base class
          c === 'app-checkboxset' ||               // checkboxset base class
          c === 'app-date' ||                      // date picker base class
          c === 'app-datetime' ||                  // datetime picker base class
          c === 'app-time' ||                      // time picker base class
          c === 'app-number' ||                    // number input base class
          c === 'app-currency' ||                  // currency input base class
          c === 'app-colorpicker' ||               // color picker base class
          c === 'app-ratings' ||                   // rating/star rating base class
          c === 'app-fileupload' ||                // file upload base class
          c === 'app-chips' ||                     // chips/tags base class
          c === 'app-chip' ||                      // individual chip class
          c === 'app-search' ||                    // search input base class
          c === 'app-slider' ||                    // slider base class

          // ===== LAYOUT COMPONENTS =====
          c === 'app-accordion' ||                 // accordion base class
          c === 'app-panel' ||                     // panel base class
          c === 'app-tabs' ||                      // tabs base class
          c === 'app-container' ||                 // container base class
          c === 'app-grid-layout' ||               // grid layout base class
          c === 'app-list' ||                      // list base class
          c === 'app-livelist' ||                  // live list base class
          c === 'app-tile' ||                      // tile base class
          c === 'panel' ||                         // panel alternate class

          // ===== DATA/FEEDBACK COMPONENTS =====
          c === 'app-message' ||                   // message/alert base class
          c === 'app-progress' ||                  // progress bar base class
          c === 'app-spinner' ||                   // spinner/loader base class
          c === 'app-wizard' ||                    // wizard base class
          c === 'toast' ||                         // toast notification class
          c === 'toast-container' ||               // toast container class

          // ===== NAVIGATION COMPONENTS =====
          c === 'app-nav' ||                       // nav base class
          c === 'app-navbar' ||                    // navbar base class
          c === 'app-breadcrumb' ||                // breadcrumb base class
          c === 'app-menu' ||                      // menu base class
          c === 'app-top-nav' ||                   // top navigation base class
          c === 'app-left-panel' ||                // left panel/sidebar base class
          c === 'app-right-panel' ||               // right panel/sidebar base class
          c === 'app-datanavigator' ||             // data navigator/pagination base class
          c === 'pagination' ||                    // pagination alternate class
          c === 'pager' ||                         // pager alternate class

          // ===== CONTENT/DISPLAY COMPONENTS =====
          c === 'app-card' ||                      // card base class
          c === 'app-carousel' ||                  // carousel base class
          c === 'app-dialog' ||                    // dialog/modal base class
          c === 'app-popover' ||                   // popover base class
          c === 'modal-dialog' ||                  // modal dialog class
          c === 'app-page-content' ||              // page content base class
          c === 'app-header' ||                    // header base class
          c === 'app-footer' ||                    // footer base class

          // ===== MEDIA COMPONENTS =====
          c === 'app-audio' ||                     // audio player base class
          c === 'app-video' ||                     // video player base class
          c === 'app-iframe' ||                    // iframe base class

          // ===== RICH TEXT EDITOR (Complex component) =====
          c === 'app-richtexteditor' ||            // richtext editor base class
          c === 'note-editor' ||                   // richtext editor summernote class
          c === 'note-frame' ||                    // richtext editor summernote frame
          c === 'note-editable' ||                 // richtext editor editable area

          // ===== DATA TABLE/GRID =====
          c === 'app-datagrid' ||                  // data grid base class
          c === 'app-grid' ||                      // grid base class
          c === 'app-livegrid' ||                  // live grid base class
          c === 'app-calendar' ||                  // calendar base class

          // ===== BUTTON GROUP =====
          c === 'app-button-group' ||              // button group base class
          c === 'button-group' ||                  // button group alternate class

          // ===== MISC UTILITY CLASSES (for comprehensive coverage) =====
          c === 'app-form' ||                      // form base class
          c === 'app-composite-widget' ||          // composite widget base class
          c === 'app-prefab' ||                    // prefab component base class
          c === 'app-partial' ||                   // partial content base class
          c === 'app-template' ||                  // template base class
          c === 'app-view'                         // view base class
        );
      };

      // Helper function to apply CSS variables with retry for child elements
      const applyToElementAndChildren = (targetElements: NodeListOf<Element>, retryAttempt = 1, maxRetries = 3) => {
        let appliedCount = 0;
        let childElementsCount = 0;
        let componentElementsCount = 0;
        const componentClasses: string[] = [];
        const currentTokenValues = getLatestTokenValues();

        targetElements.forEach((element: Element) => {
          const htmlElement = element as HTMLElement;

          // Check if the target element itself is a component element (Button, Anchor, Label)
          const targetIsComponent = isComponentElement(htmlElement);
          if (targetIsComponent) {
            componentElementsCount++;
            componentClasses.push(Array.from(htmlElement.classList).join(' '));
          }

          // 1. Set CSS variables on the target element itself
          // - For direct prop components (Button, Anchor, Label): target IS the component
          // - For wrapper patterns (Message, Progress-bar): target is the wrapper Box
          Object.entries(currentTokenValues).forEach(([varName, value]) => {
            if (varName.startsWith('--wm-')) {
              htmlElement.style.setProperty(varName, value);
              appliedCount++;

              // SPECIAL HANDLING FOR STATE TOKENS (hover, focus, active)
              // Button/component hover states reference global opacity variables like --wm-opacity-hover
              // Example: .btn:hover::before { --wm-btn-state-layer-opacity: var(--wm-opacity-hover); }
              // So we need to set BOTH the component variable AND the global opacity variable
              if (varName.includes('-states-hover-state-layer-opacity')) {
                htmlElement.style.setProperty('--wm-opacity-hover', value);
                appliedCount++;
              } else if (varName.includes('-states-focus-state-layer-opacity')) {
                htmlElement.style.setProperty('--wm-opacity-focus', value);
                appliedCount++;
              } else if (varName.includes('-states-active-state-layer-opacity')) {
                htmlElement.style.setProperty('--wm-opacity-active', value);
                appliedCount++;
              }

            }
          });

          // 2. Set CSS variables on all descendant elements within the target
          // - For direct prop components: applies to child elements like icons, text, etc.
          // - For wrapper patterns: applies to the actual component and its children
          const childElements = htmlElement.querySelectorAll('*');
          childElements.forEach((child: Element) => {
            const childHtmlElement = child as HTMLElement;

            // Track component classes for logging
            if (isComponentElement(child)) {
              componentElementsCount++;
              componentClasses.push(Array.from(child.classList).join(' '));
            }

            Object.entries(currentTokenValues).forEach(([varName, value]) => {
              if (varName.startsWith('--wm-')) {
                childHtmlElement.style.setProperty(varName, value);
                appliedCount++;

                // SPECIAL HANDLING FOR STATE TOKENS (hover, focus, active)
                // Set global opacity variables so hover/focus/active states work correctly
                if (varName.includes('-states-hover-state-layer-opacity')) {
                  childHtmlElement.style.setProperty('--wm-opacity-hover', value);
                  appliedCount++;
                } else if (varName.includes('-states-focus-state-layer-opacity')) {
                  childHtmlElement.style.setProperty('--wm-opacity-focus', value);
                  appliedCount++;
                } else if (varName.includes('-states-active-state-layer-opacity')) {
                  childHtmlElement.style.setProperty('--wm-opacity-active', value);
                  appliedCount++;
                }
              }
            });
          });

          childElementsCount += childElements.length;
        });

        // console.log(`%c[Design Tokens] ✓ Applied ${appliedCount} CSS variables (attempt ${retryAttempt})`, 'color: #4CAF50; font-weight: bold', `to ${targetElements.length} target + ${childElementsCount} children (${componentElementsCount} component elements)`);

        // if (componentClasses.length > 0) {
        //   console.log('[Design Tokens] Found component elements:', componentClasses.slice(0, 5)); // Show first 5
        // } else {
        //   console.warn('[Design Tokens] No component elements found (looking for: alert-*, btn-*, app-*, etc.)');
        // }

        // Retry if we haven't found the main component elements yet
        // This handles React components that haven't fully rendered yet (wrapper pattern only)
        if (componentElementsCount === 0 && retryAttempt < maxRetries) {
          // console.log(`[Design Tokens] No component elements found, retrying in 150ms... (attempt ${retryAttempt + 1}/${maxRetries})`);
          setTimeout(() => {
            const updatedTargetElements = iframe.contentDocument!.querySelectorAll('[data-design-token-target="true"]');
            applyToElementAndChildren(updatedTargetElements, retryAttempt + 1, maxRetries);
          }, 150);
        }
      };

      // Find target element(s) with data-design-token-target="true"
      const targetElements = iframe.contentDocument.querySelectorAll('[data-design-token-target="true"]');

      if (targetElements.length === 0) {
        // console.warn('[Design Tokens] No elements found with data-design-token-target="true"');
        return;
      }

      // console.log('%c[Design Tokens] Applying tokens...', 'color: #4CAF50; font-weight: bold; font-size: 14px');
      // console.log('[Design Tokens] Total tokens received:', Object.keys(tokenValues).length);
      // console.log('[Design Tokens] Target elements found:', targetElements.length);
      // console.log('[Design Tokens] Sample token names:', Object.keys(tokenValues).slice(0, 5));

      // Apply tokens with retry logic for child elements
      applyToElementAndChildren(targetElements);

      // ===== Portal handling for dialogs/popovers/menus (may render outside target wrapper) =====
      const portalSelectors = [
        '.MuiModal-root',
        '.MuiDialog-root',
        '.MuiDialog-container',
        '.MuiDialog-paper',
        // '.MuiPopover-root',
        // '.MuiMenu-root',
        // '.MuiTooltip-popper',
        // '.MuiAutocomplete-popper',
        // '.MuiPopper-root',
        // WM / app-specific
        '.app-dialog',
        // '.app-popover',
        // Bootstrap/generic
        '.modal',
        '[role=presentation]',
        // ARIA generics
        '[role=dialog]',
      ].join(',');

      const applyPortalsInDoc = (rootDoc: Document) => {
        const portalNodes = rootDoc.querySelectorAll(portalSelectors);
        if (portalNodes.length > 0) {
          applyToElementAndChildren(portalNodes);
        }
      };

      // Apply immediately to portals in the preview iframe (if already mounted)
      applyPortalsInDoc(iframe.contentDocument);
      // Retry on next frame to catch just-mounted portals after a click
      requestAnimationFrame(() => {
        if (iframe.contentDocument) {
          applyPortalsInDoc(iframe.contentDocument);
        }
      });

      // Fallback: some implementations may mount portals in the manager (top) document
      applyPortalsInDoc(document);
      requestAnimationFrame(() => {
        applyPortalsInDoc(document);
      });

      // Install observers once to catch late-mounted portals dynamically
      const installObservers = () => {
        if (!iframeObserverRef.current && iframe.contentDocument?.body) {
          const obs = new MutationObserver(() => {
            // Re-apply tokens to any portal nodes that just appeared using the latest tokens
            try {
              applyPortalsInDoc(iframe.contentDocument!);
            } catch (e) {
              // ignore
            }
          });
          obs.observe(iframe.contentDocument.body, { childList: true, subtree: true });
          iframeObserverRef.current = obs;
        }
        if (!managerObserverRef.current && document?.body) {
          const obs = new MutationObserver(() => {
            try {
              applyPortalsInDoc(document);
            } catch (e) {
              // ignore
            }
          });
          obs.observe(document.body, { childList: true, subtree: true });
          managerObserverRef.current = obs;
        }
      };

      installObservers();

      // DYNAMIC STATE TOKEN HANDLING: Inject CSS rules for pseudo-class states
      // Many components use the same CSS variables in different pseudo-class selectors
      // We need to inject CSS rules because inline styles can't handle pseudo-classes
      // Examples:
      // - --wm-anchor-states-hover-color → --wm-anchor-color in .app-anchor:hover
      // - --wm-btn-states-hover-background → --wm-btn-background in .app-button:hover
      const currentTokenValuesForStates = getLatestTokenValues();
      const stateTokens = Object.entries(currentTokenValuesForStates).filter(([varName]) =>
        varName.includes('-states-hover-') ||
        varName.includes('-states-focus-') ||
        varName.includes('-states-active-')
      );

      if (stateTokens.length > 0) {
        // Remove existing state style tag if it exists
        const existingStyleTag = iframe.contentDocument.querySelector('#design-token-component-states');
        if (existingStyleTag) {
          existingStyleTag.remove();
        }

        // Group state tokens by component and state
        // Structure: { componentName: { hover: [...], focus: [...], active: [...] } }
        const componentStateRules: Record<string, Record<string, string[]>> = {};

        stateTokens.forEach(([varName, value]) => {
          // Skip state-layer-opacity tokens (handled separately by global opacity variables)
          if (varName.includes('-state-layer-opacity')) {
            return;
          }

          // Extract component name from variable name
          // --wm-anchor-states-hover-color → anchor
          // --wm-btn-states-hover-background → btn
          const match = varName.match(/--wm-([^-]+)-states-(hover|focus|active)-(.*)/);
          if (!match) return;

          const [, componentName, state, propertyPath] = match;
          const baseVarName = `--wm-${componentName}-${propertyPath}`;

          // Initialize component entry if needed
          if (!componentStateRules[componentName]) {
            componentStateRules[componentName] = {
              hover: [],
              focus: [],
              active: []
            };
          }

          // Add CSS rule
          componentStateRules[componentName][state].push(`${baseVarName}: ${value} !important;`);
        });

        // Generate CSS rules for each component
        let cssRules = '';
        Object.entries(componentStateRules).forEach(([componentName, stateRules]) => {
          // Map component names to CSS class patterns
          const componentClassMap: Record<string, string> = {
            'anchor': '.app-anchor',
            'btn': '.app-button, .btn, button',
            'label': '.app-label',
            'checkbox': '.app-checkbox',
            'radioset': '.app-radioset',
            'switch': '.app-switch',
            'toggle': '.app-toggle',
            'message': '.app-message',
            'badge': '.app-badge',
            'card': '.app-card',
            'panel': '.app-panel',
            'nav': '.app-nav',
            'tabs': '.app-tabs',
            'pagination': '.app-pagination',
            'breadcrumb': '.app-breadcrumb',
            'search': '.app-search',
            'rating': '.app-rating',
            'chips': '.app-chips',
            'tile': '.app-tile',
            'wizard': '.app-wizard',
            'carousel': '.app-carousel',
            'picture': '.app-picture',
            'icon': '.app-icon',
            'video': '.app-video',
            'audio': '.app-audio',
            'iframe': '.app-iframe',
            'list': '.app-list',
            'container': '.app-container',
            'popover': '.app-popover',
            'toast': '.app-toast'
          };

          const componentClass = componentClassMap[componentName] || `.app-${componentName}`;

          // Generate CSS for each state
          Object.entries(stateRules).forEach(([state, rules]) => {
            if (rules.length > 0) {
              cssRules += `
[data-design-token-target="true"] ${componentClass}:${state},
[data-design-token-target="true"]${componentClass}:${state} {
  ${rules.join('\n  ')}
}
`;
            }
          });
        });

        // Inject the CSS rules
        if (cssRules) {
          const styleTag = iframe.contentDocument.createElement('style');
          styleTag.id = 'design-token-component-states';
          styleTag.textContent = cssRules;
          iframe.contentDocument.head.appendChild(styleTag);
          // console.log('[Design Tokens] Injected state CSS rules for components:', Object.keys(componentStateRules).join(', '));
        }
      }

      // Verification code commented out - for debugging only
      // const firstElement = targetElements[0] as HTMLElement;
      // const labelColorVar = '--wm-label-color';
      // if (tokenValues[labelColorVar]) {
      //   const inlineValue = firstElement.style.getPropertyValue(labelColorVar);
      //   const computedValue = iframe.contentWindow?.getComputedStyle(firstElement).getPropertyValue(labelColorVar).trim();
      //   const actualColor = iframe.contentWindow?.getComputedStyle(firstElement).color;
      //   console.log('%c[Design Tokens] Verification:', 'color: #9C27B0; font-weight: bold');
      //   console.log(`  CSS Variable (${labelColorVar}):`);
      //   console.log(`    Inline value: "${inlineValue}"`);
      //   console.log(`    Computed value: "${computedValue}"`);
      //   console.log(`    Expected value: "${tokenValues[labelColorVar]}"`);
      //   console.log(`  Actual element color: "${actualColor}"`);
      //   if (computedValue === tokenValues[labelColorVar]) {
      //     console.log('%c  ✓ CSS variable set correctly!', 'color: #4CAF50');
      //   } else {
      //     console.error('%c  ✗ CSS variable mismatch!', 'color: #F44336');
      //   }
      // }
    };

    // Start applying tokens with retry logic
    applyTokensToIframe();
  };

  /**
   * Handles token value changes from UI controls
   * Updates both state and applies to iframe
   */
  const handleTokenChange = (tokenName: string, value: string) => {
    // const propertyName = tokenName.split('-').slice(3).join('-');
    // console.log(`%c[Design Tokens] Token changed: ${propertyName}`, 'color: #2196F3; font-weight: bold', `\n  Variable: ${tokenName}\n  New value: ${value}`);
    const newTokens = { ...tokens, [tokenName]: value };
    // console.log('[Design Tokens] Updated tokens object:', newTokens);
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

  // Cleanup observers on unmount to avoid leaks
  useEffect(() => {
    return () => {
      if (iframeObserverRef.current) {
        iframeObserverRef.current.disconnect();
        iframeObserverRef.current = null;
      }
      if (managerObserverRef.current) {
        managerObserverRef.current.disconnect();
        managerObserverRef.current = null;
      }
    };
  }, []);

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
          {/* <p style={{ fontSize: "12px", marginTop: "12px", color: "#999" }}>
            Add the <code>designTokens</code> parameter to enable this feature.
          </p> */}
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
    tokensToDisplay = getTokensForClassName(
      tokenConfig,
      currentClassName,
      parameters.tokenData,
      parameters.componentKey
    );
  }

  /**
   * DYNAMIC STATE FILTERING SYSTEM
   *
   * Filters tokens based on the selected state from the dropdown.
   * Works with ANY state (hover, focus, active, disabled, checked, selected, expanded, etc.)
   *
   * KEY BEHAVIOR:
   * - "default": Shows base tokens only (no state-specific tokens)
   * - Any other state: Shows base tokens (except those with state-specific versions) + state-specific tokens
   *
   * PREVENTS DUPLICATES:
   * - If base "color" exists AND "hover.color" exists, only show "hover.color" in hover state
   * - If base "background" exists AND "checked.background" exists, only show "checked.background" in checked state
   *
   * SPECIAL RULES:
   * - Hover/focus/active: hide main background (uses state-layer overlay instead)
   * - Other states (checked, disabled, etc.): show their state-specific background
   *
   * EXAMPLES:
   * - Default: background, color, font-size
   * - Hover (button): font-size, state.layer.opacity (NO background, NO duplicate color)
   * - Checked (checkbox): checked.background, checked.border.color, font-size (NO base versions)
   * - Disabled: disabled.background, disabled.color, font-size (NO base versions)
   */
  const filterTokensByState = (tokens: TokenDefinition[], state: string): TokenDefinition[] => {
    const componentKey = tokenConfig.componentName;

    // Helper: Get property name from token (e.g., "--wm-btn-background" -> "background")
    const getPropertyName = (tokenName: string): string => {
      const prefix = `--wm-${componentKey}-`;
      if (tokenName.startsWith(prefix)) {
        let propName = tokenName.substring(prefix.length);
        // Remove "states-{state}-" prefix if present
        propName = propName.replace(/^states-\w+-/, '');
        return propName;
      }
      return tokenName;
    };

    // Helper: Check if there's a state-specific version of this base token
    const hasStateSpecificVersion = (tokenName: string, targetState: string): boolean => {
      // Only check for base tokens
      if (tokenName.includes('-states-')) return false;

      const propertyName = getPropertyName(tokenName);
      const stateSpecificName = `--wm-${componentKey}-states-${targetState}-${propertyName}`;

      // Check if any token in the list matches this state-specific name
      return tokens.some(t => t.name === stateSpecificName);
    };

    // Helper: Extract state name from token (e.g., "--wm-btn-states-hover-color" -> "hover")
    const getTokenState = (tokenName: string): string | null => {
      const match = tokenName.match(/-states-(\w+)-/);
      return match ? match[1] : null;
    };

    // Helper: Check if this state uses overlay (hover, focus, active should hide main background)
    const isOverlayState = (stateName: string): boolean => {
      return ['hover', 'focus', 'active'].includes(stateName);
    };

    return tokens.filter((token) => {
      const tokenName = token.name;

      // Classify token types
      const isBase = !tokenName.includes('-states-');
      const isStateLayerBase = tokenName.includes('-state-layer-') && !tokenName.includes('-states-');
      const isMainBackground = tokenName === `--wm-${componentKey}-background`;

      // Get the state this token belongs to (null for base tokens)
      const tokenState = getTokenState(tokenName);

      if (state === 'default') {
        // Default: show base + state-layer base, hide all state-specific tokens
        return (isBase || isStateLayerBase) && tokenState === null;
      }

      // For any other state (hover, focus, active, disabled, checked, selected, expanded, etc.)

      // Show state-specific tokens that match the selected state
      if (tokenState === state) {
        return true;
      }

      // For base tokens: apply duplicate prevention logic
      if (isBase || isStateLayerBase) {
        // Special rule for overlay states (hover, focus, active): always hide main background
        if (isMainBackground && isOverlayState(state)) {
          return false;
        }

        // General rule: hide base if state-specific version exists (prevents duplicates)
        if (hasStateSpecificVersion(tokenName, state)) {
          return false;
        }

        // Show base token (no state-specific version exists)
        return true;
      }

      // Hide tokens from other states
      return false;
    });
  };

  // Apply state filtering
  tokensToDisplay = filterTokensByState(tokensToDisplay, selectedState);

  // Update labels based on selected state (remove state name prefix for cleaner labels)
  tokensToDisplay = tokensToDisplay.map((token) => ({
    ...token,
    label: extractLabelFromCSSVariable(token.name, tokenConfig.componentName, selectedState)
  }));

  /**
   * SMART CATEGORIZATION SYSTEM
   *
   * This function intelligently categorizes 1000+ CSS variables across ALL 50+ component JSON files
   * by detecting PROPERTY TYPE rather than component part.
   *
   * KEY PRINCIPLE: Properties are grouped by WHAT THEY CONTROL, not WHERE THEY'RE USED
   *
   * Examples of cross-component categorization:
   * - --wm-btn-font-size, --wm-accordion-heading-font-size, --wm-checkbox-caption-font-size
   *   → ALL go to Typography (Font Properties) category
   *
   * - --wm-btn-padding, --wm-accordion-heading-padding, --wm-message-container-padding
   *   → ALL go to Spacing & Dimensions category
   *
   * - --wm-btn-background, --wm-accordion-heading-background, --wm-nav-item-background
   *   → ALL go to Colors category
   *
   * This approach works seamlessly for ANY component part:
   * - container, heading, caption, description, content, actions
   * - nav, item, submenu, indicator, caret
   * - group, list, overlay
   * - step, connector, icon, badge
   *
   * The system supports 14 categories covering all design token patterns.
   */
  const getCategoryKey = (token: TokenDefinition): string => {
    const type = token.type?.toLowerCase() || '';

    // Categorize based on token type
    if (type === 'color') {
      return 'color';
    } else if (type === 'font') {
      return 'font';
    } else if (type === 'space') {
      return 'space';
    } else {
      return 'others';
    }
  };

  // Group tokens by category (considering subtype and state)
  const groupedTokens: Record<string, TokenDefinition[]> = {};
  tokensToDisplay.forEach((token: TokenDefinition) => {
    const categoryKey = getCategoryKey(token);
    if (!groupedTokens[categoryKey]) {
      groupedTokens[categoryKey] = [];
    }
    groupedTokens[categoryKey].push(token);
  });

  // Map category keys to friendly display names
  const categoryNames: Record<string, string> = {
    'color': 'Color',
    'font': 'Text',
    'space': 'Size',
    'others': 'Style'
  };

  // Define custom sort order for categories
  const categoryOrder = [
    'color',
    'font',
    'space',
    'others'
  ];

  // Helper function to determine state priority for sorting within categories
  const getStatePriority = (tokenName: string): number => {
    // Base properties first
    if (!tokenName.includes('-states-')) return 0;

    // Then hover, focus, active, disabled
    if (tokenName.includes('-states-hover-')) return 1;
    if (tokenName.includes('-states-focus-')) return 2;
    if (tokenName.includes('-states-active-')) return 3;
    if (tokenName.includes('-states-disabled-')) return 4;
    return 5; // Other states
  };

  // Helper function to get property type priority for sorting within categories
  const getPropertyTypePriority = (tokenName: string): number => {
    // For state-layer category: color before opacity
    if (tokenName.includes('-state-layer-color')) return 0;
    if (tokenName.includes('-state-layer-opacity')) return 1;

    // For colors category: background before color
    if (tokenName.includes('-background')) return 0;
    if (tokenName.endsWith('-color') || tokenName.includes('-color-')) return 1;

    // For typography: size, family, weight, line-height, letter-spacing
    if (tokenName.includes('-font-size')) return 0;
    if (tokenName.includes('-font-family')) return 1;
    if (tokenName.includes('-font-weight')) return 2;
    if (tokenName.includes('-line-height')) return 3;
    if (tokenName.includes('-letter-spacing')) return 4;

    // For borders: width, style, radius, color, collapse, spacing
    if (tokenName.includes('-border-width')) return 0;
    if (tokenName.includes('-border-style')) return 1;
    if (tokenName.includes('-border-radius') || (tokenName.includes('-radius') && !tokenName.includes('-image-'))) return 2;
    if (tokenName.includes('-border-color')) return 3;
    if (tokenName.includes('-border-collapse')) return 4;
    if (tokenName.includes('-border-spacing')) return 5;

    // For icons: size, color, width, height, radius
    if (tokenName.includes('-icon-size') || tokenName.includes('-image-size')) return 0;
    if (tokenName.includes('-icon-color')) return 1;
    if (tokenName.includes('-icon-width')) return 2;
    if (tokenName.includes('-icon-height')) return 3;
    if (tokenName.includes('-image-radius')) return 4;

    // For overlay: background, color, opacity
    if (tokenName.includes('-overlay-background')) return 0;
    if (tokenName.includes('-overlay-color')) return 1;
    if (tokenName.includes('-overlay-opacity')) return 2;

    // For layout: display, position, coordinates, alignment, overflow, z-index, transform, transition
    if (tokenName.includes('-display')) return 0;
    if (tokenName.includes('-position') && !tokenName.includes('-left') && !tokenName.includes('-right') && !tokenName.includes('-top') && !tokenName.includes('-bottom')) return 1;
    if (tokenName.includes('-position-top')) return 2;
    if (tokenName.includes('-position-right')) return 3;
    if (tokenName.includes('-position-bottom')) return 4;
    if (tokenName.includes('-position-left')) return 5;
    if (tokenName.includes('-align-')) return 6;
    if (tokenName.includes('-justify-')) return 7;
    if (tokenName.includes('-overflow')) return 8;
    if (tokenName.includes('-z-index')) return 9;
    if (tokenName.includes('-transform')) return 10;
    if (tokenName.includes('-transition') || tokenName.includes('-animation')) return 11;

    return 20; // Default
  };

  // Sort categories based on defined order
  const sortedGroupedTokens = Object.keys(groupedTokens)
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);

      // If both are in the order array, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only one is in the order array, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      // Otherwise sort alphabetically
      return a.localeCompare(b);
    })
    .reduce((acc, key) => {
      // Sort tokens within each category by property type priority, then state priority
      acc[key] = groupedTokens[key].sort((a, b) => {
        // First sort by property type (e.g., background before color, font-size before font-family)
        const propertyPriorityA = getPropertyTypePriority(a.name);
        const propertyPriorityB = getPropertyTypePriority(b.name);

        if (propertyPriorityA !== propertyPriorityB) {
          return propertyPriorityA - propertyPriorityB;
        }

        // Then sort by state (base, hover, focus, active, disabled)
        const statePriorityA = getStatePriority(a.name);
        const statePriorityB = getStatePriority(b.name);

        if (statePriorityA !== statePriorityB) {
          return statePriorityA - statePriorityB;
        }

        // If same priority, maintain alphabetical order
        return a.name.localeCompare(b.name);
      });
      return acc;
    }, {} as Record<string, TokenDefinition[]>);


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

  // Helper function to get current prop value for display
  const getCurrentPropInfo = () => {
    if (parameters.propToVariantMap && api) {
      const storyId = api.getUrlState().storyId;
      if (storyId) {
        const storyData = api.getData(storyId);
        const propValue = (storyData as any)?.args?.[parameters.propToVariantMap.propName];
        return {
          propName: parameters.propToVariantMap.propName,
          propValue: propValue,
          variantKey: currentClassName
        };
      }
    }
    return null;
  };

  const propInfo = getCurrentPropInfo();

  // Toggle help tooltip visibility with smart position calculation
  const toggleTooltip = (tokenName: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTooltip(prev => {
      const newValue = prev === tokenName ? null : tokenName;

      if (newValue) {
        // Calculate position based on button location with smart positioning
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        // Estimate tooltip dimensions (will be adjusted by CSS if needed)
        const tooltipHeight = 180; // Increased for better safety margin
        const tooltipWidth = 350; // Approximate width
        const margin = 10; // Margin from viewport edges

        // Get viewport dimensions
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Calculate available space
        const spaceAbove = rect.top;
        const spaceBelow = viewportHeight - rect.bottom;

        let tooltipTop: number;
        let tooltipLeft: number;
        let isAbove: boolean;

        // Decide if tooltip should be above or below
        if (spaceAbove >= tooltipHeight + margin) {
          // Enough space above - position above
          tooltipTop = rect.top - 8;
          isAbove = true;
        } else if (spaceBelow >= tooltipHeight + margin) {
          // Not enough space above but space below - position below
          tooltipTop = rect.bottom + 8;
          isAbove = false;
        } else {
          // Not enough space in either direction - choose the larger space
          if (spaceAbove > spaceBelow) {
            tooltipTop = rect.top - 8;
            isAbove = true;
          } else {
            tooltipTop = rect.bottom + 8;
            isAbove = false;
          }
        }

        // Calculate horizontal position - try to center on button
        tooltipLeft = rect.left + (rect.width / 2);

        // Ensure tooltip doesn't go off-screen horizontally
        const halfWidth = tooltipWidth / 2;
        const minLeft = halfWidth + margin;
        const maxLeft = viewportWidth - halfWidth - margin;

        if (tooltipLeft < minLeft) {
          tooltipLeft = minLeft;
        } else if (tooltipLeft > maxLeft) {
          tooltipLeft = maxLeft;
        }

        // console.log(`[Tooltip] Positioning for ${tokenName}:`, {
        //   buttonRect: { top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right },
        //   space: { above: spaceAbove, below: spaceBelow },
        //   position: { top: tooltipTop, left: tooltipLeft, isAbove },
        //   viewport: { width: viewportWidth, height: viewportHeight }
        // });

        setTooltipPosition({
          top: tooltipTop,
          left: tooltipLeft,
          isAbove
        });
      } else {
        setTooltipPosition(null);
      }

      return newValue;
    });
  };

  return (
    <PanelContent>
      {/* <InfoBox>
        <InfoText>
          <strong>{tokenConfig.componentName.toUpperCase()} Design Tokens</strong>
          {propInfo ? (
            <>
              {" "}
              - <code>{propInfo.propName}="{propInfo.propValue}"</code> (variant: <code>{propInfo.variantKey}</code>)
            </>
          ) : currentClassName ? (
            <>
              {" "}
              - Applied variant: <code>{currentClassName}</code>
            </>
          ) : null}
          <br />
          Modify any token below to see real-time changes in the component above.
        </InfoText>
      </InfoBox> */}

      {/* State Dropdown - Only shown if component has multiple states */}
      {availableStates.length > 1 && (
        <StateDropdownContainer>
          <StateDropdownLabel htmlFor="state-dropdown">
            State
          </StateDropdownLabel>
          <StateDropdown
            id="state-dropdown"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {availableStates.map((state) => (
              <option key={state} value={state}>
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </option>
            ))}
          </StateDropdown>
        </StateDropdownContainer>
      )}

      {Object.entries(sortedGroupedTokens).map(([typeKey, categoryTokens]) => (
        <TokenSection key={typeKey}>
          <SectionTitle>{categoryNames[typeKey] || typeKey}</SectionTitle>
          {categoryTokens.map((token) => {
            return (
              <TokenGroup key={token.name}>
                <TokenLabel htmlFor={token.name}>
                  <span>{token.label}</span>
                  <HelpIconWrapper data-help-icon>
                    <HelpIcon
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleTooltip(token.name, e);
                      }}
                      title="Click to show CSS variable and description"
                      data-token-name={token.name}
                      data-token-description={token.description || ''}
                    >
                      ?
                    </HelpIcon>
                  </HelpIconWrapper>
                </TokenLabel>
                <TokenInputContainer>
                  {renderTokenInput(token)}
                </TokenInputContainer>
              </TokenGroup>
            );
          })}
        </TokenSection>
      ))}

      <ButtonGroup>
        <ResetButton onClick={handleReset}>Reset to Defaults</ResetButton>
      </ButtonGroup>

      {/* Render tooltip using portal to escape panel overflow constraints */}
      {activeTooltip && tooltipPosition && createPortal(
        <HelpTooltip
          show={true}
          top={tooltipPosition.top}
          left={tooltipPosition.left}
          isAbove={tooltipPosition.isAbove}
        >
          <TooltipVariableName>
            <TooltipVariableLabel>Variable name:</TooltipVariableLabel>
            <TooltipVariableValue>{activeTooltip}</TooltipVariableValue>
          </TooltipVariableName>
          {(() => {
            // Find the token to get its description
            const allTokens = Object.values(sortedGroupedTokens).flat();
            const token = allTokens.find(t => t.name === activeTooltip);
            return token?.description ? (
              <TooltipDescription dangerouslySetInnerHTML={{ __html: token.description }} />
            ) : null;
          })()}
        </HelpTooltip>,
        document.body
      )}
    </PanelContent>
  );
};
