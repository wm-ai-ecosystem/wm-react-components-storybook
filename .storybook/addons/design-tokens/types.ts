/**
 * ============================================================================
 * DESIGN TOKENS TYPE DEFINITIONS
 * ============================================================================
 *
 * This file defines TypeScript types for the Design Token system.
 * These types ensure type safety across the entire design token workflow.
 *
 * The system supports design tokens for ANY component (button, input, etc.)
 * by following a standard JSON structure in /src/designTokens/
 */

/**
 * TokenType - Categorizes tokens by their purpose
 * Used for grouping tokens in the UI
 */
export type TokenType = "color" | "font" | "space" | "radius" | "text";

/**
 * TokenControlType - Determines what UI control to show in the panel
 * - color: Shows color picker + text input
 * - text: Shows text input for dimensions (e.g., "16px", "1rem")
 * - select: Shows dropdown with predefined options (e.g., text-transform: uppercase/lowercase)
 * - number: Shows number input for opacity values (0-1)
 */
export type TokenControlType = "color" | "text" | "select" | "number";

/**
 * TokenDefinition - Represents a single design token
 * This is the core data structure for each token shown in the Design Tokens panel
 *
 * Example:
 * {
 *   name: "--wm-btn-background",
 *   label: "Background",
 *   value: "#1976d2",
 *   type: "color",
 *   controlType: "color",
 *   description: "Sets the background color of buttons",
 *   category: "Colors",
 *   options: undefined  // Only used for select controls
 * }
 */
export interface TokenDefinition {
  name: string;              // CSS variable name (e.g., "--wm-btn-background")
  label: string;             // Human-readable label (e.g., "Background")
  value: string;             // Current value (e.g., "#1976d2", "16px", "solid")
  type: TokenType;           // Category for organization
  controlType: TokenControlType;  // What UI control to render
  description?: string;      // Help text from JSON
  category?: string;         // Section name (e.g., "Colors", "Typography")
  options?: string[];        // Dropdown options for select controls
}

/**
 * ComponentTokenConfig - Complete token configuration for a component
 * This is the parsed representation of the JSON file
 *
 * Structure:
 * - componentName: "btn" (from JSON root key)
 * - selector: ".app-button,button,.btn" (from meta.mapping.selector.web)
 * - tokens: [base tokens from mapping] (applies to all variants)
 * - variants: {
 *     "filled-primary": [tokens specific to btn-filled btn-primary],
 *     "outlined-secondary": [tokens specific to btn-outlined btn-secondary],
 *     ...
 *   }
 * - childSelectors: Optional component-specific child element selectors
 */
export interface ComponentTokenConfig {
  componentName: string;     // Component identifier (e.g., "btn", "input")
  selector: string;          // CSS selector from JSON (e.g., ".app-button,button,.btn")
  tokens: TokenDefinition[]; // Base tokens that apply to all variants
  variants?: {
    [key: string]: TokenDefinition[];  // Variant-specific token overrides
  };
  childSelectors?: {
    text?: string;           // Text content selector (e.g., ".btn-caption")
    icon?: string;           // Icon element selector (e.g., ".app-icon, i")
    badge?: string;          // Badge element selector (e.g., ".badge")
    [key: string]: string | undefined;  // Allow additional child selectors
  };
}

/**
 * DesignTokenParameters - Story-level configuration
 * This is passed in the story's parameters.designTokens object
 *
 * =============================================================================
 * STANDARD COMPONENTS (with className prop)
 * =============================================================================
 * Components: button, anchor, label, checkbox, radio, etc.
 * These components accept a className prop and can spread data-design-token-target
 *
 * Example usage:
 * parameters: {
 *   designTokens: {
 *     enabled: true,
 *     tokenData: buttonTokensData,
 *     componentKey: "btn",
 *     extractCSSVariablesAtRuntime: true
 *   }
 * }
 *
 * =============================================================================
 * COMPONENTS WITH TYPE PROP (no direct className prop)
 * =============================================================================
 * Components: message, progress-bar, progress-circle, accordion, etc.
 * These components use a "type" or similar prop and render with specific CSS classes
 *
 * Supported components (fully dynamic, no code changes needed):
 * - Message: type="success" → CSS class "alert-success" → variant "filled-success"
 * - Progress Bar: type="success" → CSS class "progress-bar-success" → variant "filled-success"
 * - Accordion: type="primary" → CSS class "panel-primary" → variant "default-primary"
 *
 * Example usage:
 * export const DesignToken: Story = {
 *   render: (args) => {
 *     const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
 *     return (
 *       <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
 *         <MessageComponent {...componentArgs} />
 *       </Box>
 *     );
 *   },
 *   args: {
 *     type: "success",
 *     "data-design-token-target": true,
 *   },
 *   parameters: {
 *     designTokens: {
 *       enabled: true,
 *       tokenData: messageTokensData,
 *       componentKey: "message",
 *       extractCSSVariablesAtRuntime: true,
 *       propToVariantMap: {
 *         propName: "type",
 *         mapping: {
 *           success: "alert-success",    // Prop value → CSS class name
 *           error: "alert-danger",
 *           warning: "alert-warning"
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * How it works:
 * 1. User changes type="warning" in Controls
 * 2. propToVariantMap maps to CSS class "alert-warning"
 * 3. Parser reads JSON: meta.appearances.filled.variantGroups.status.warning.selector.web = ".alert-warning"
 * 4. Parser finds variant key "filled-warning"
 * 5. Tokens load for "filled-warning" variant
 * 6. CSS generates: [data-design-token-target="true"] .app-message.alert-warning
 * 7. Tokens update in real-time!
 *
 * =============================================================================
 * ADDING NEW COMPONENTS
 * =============================================================================
 * NO CODE CHANGES NEEDED! Just configure your story as shown above.
 * The system automatically reads variant selectors from your JSON file.
 *
 * Requirements:
 * 1. Your JSON must have: componentData.meta.appearances.{appearance}.variantGroups.{group}.{variant}.selector.web
 * 2. Wrap your component in a Box with data-design-token-target attribute
 * 3. Configure propToVariantMap to map prop values to CSS class names
 */
export interface DesignTokenParameters {
  enabled: boolean;                   // Whether to show Design Tokens tab
  tokenConfig?: ComponentTokenConfig; // (Deprecated) Pre-parsed token configuration
  tokenData?: any;                    // Raw JSON data from design tokens file (preferred)
  componentKey?: string;              // Component identifier for parsing (e.g., "btn")
  tokenFilePath?: string;            // (Optional) Path to JSON file
  className?: string;                // (Optional) Fallback className if not in args
  extractCSSVariablesAtRuntime?: boolean;  // Enable runtime CSS variable extraction from foundation.css
  propToVariantMap?: {               // (Optional) Map a prop value to variant key for components without className prop
    propName: string;                // Name of the prop to watch (e.g., "type", "variant", "appearance")
    mapping: Record<string, string>; // Maps prop values to variant keys (e.g., { success: "filled-success" })
  };
}
