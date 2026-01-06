/**
 * ============================================================================
 * DESIGN TOKENS ADDON PRESET
 * ============================================================================
 *
 * This file defines how the Design Tokens addon should be loaded by Storybook.
 * It tells Storybook to load the register.tsx file, which in turn registers
 * the addon panel.
 *
 * This file is referenced in .storybook/main.ts:
 * addons: [
 *   ...
 *   "./addons/design-tokens/preset"
 * ]
 */

import path from "path";

/**
 * Manager entries - files to load in the Storybook manager
 *
 * The manager is the Storybook UI itself (not the preview iframe).
 * This function tells Storybook to load our register.tsx file,
 * which will register the Design Tokens panel.
 *
 * @param entry - Existing manager entries
 * @returns Updated manager entries array
 */
export function managerEntries(entry: string[] = []) {
  return [...entry, path.resolve(__dirname, "./register")];
}
