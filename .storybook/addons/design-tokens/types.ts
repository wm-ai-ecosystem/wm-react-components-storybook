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
 */
export interface ComponentTokenConfig {
  componentName: string;     // Component identifier (e.g., "btn", "input")
  selector: string;          // CSS selector from JSON (e.g., ".app-button,button,.btn")
  tokens: TokenDefinition[]; // Base tokens that apply to all variants
  variants?: {
    [key: string]: TokenDefinition[];  // Variant-specific token overrides
  };
}

/**
 * DesignTokenParameters - Story-level configuration
 * This is passed in the story's parameters.designTokens object
 *
 * Example usage in story:
 * parameters: {
 *   designTokens: {
 *     enabled: true,
 *     tokenConfig: buttonTokenConfig,  // Parsed from JSON
 *   }
 * }
 */
export interface DesignTokenParameters {
  enabled: boolean;                   // Whether to show Design Tokens tab
  tokenConfig?: ComponentTokenConfig; // Parsed token configuration
  tokenFilePath?: string;            // (Optional) Path to JSON file
  className?: string;                // (Optional) Fallback className if not in args
}
