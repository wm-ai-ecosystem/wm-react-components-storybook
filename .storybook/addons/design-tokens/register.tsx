/**
 * ============================================================================
 * DESIGN TOKENS ADDON REGISTRATION
 * ============================================================================
 *
 * This file registers the Design Tokens addon with Storybook.
 * It creates a new tab in the addons panel that appears alongside
 * Controls, Actions, Interactions, etc.
 *
 * The panel is only visible for stories that have `designTokens.enabled: true`
 * in their parameters.
 */

import React from "react";
import { addons, types } from "storybook/manager-api";
import { DesignTokenPanel } from "./DesignTokenPanel";

// Unique addon identifier
const ADDON_ID = "design-tokens";
const PANEL_ID = `${ADDON_ID}/panel`;

/**
 * Register the addon with Storybook
 *
 * This adds a new panel to the Storybook UI that:
 * - Appears in the bottom panel alongside other tabs
 * - Is only visible in "story" view mode (not "docs")
 * - Renders the DesignTokenPanel component
 */
addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    // Panel type - shows in the bottom panel
    type: types.PANEL,

    // Tab title that appears in the panel
    title: "Design Tokens",

    // Only show in story view (not docs view)
    match: ({ viewMode }) => viewMode === "story",

    // Render the panel component
    // active: true when the tab is selected
    render: ({ active }) => <DesignTokenPanel active={!!active} />,
  });
});
