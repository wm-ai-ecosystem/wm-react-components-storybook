import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import ButtonDefaultExport from "../../../../components/form/button/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

// Import design tokens from the centralized design tokens directory
// This JSON file contains all design token definitions for button component including:
// - Base styles (background, color, font, padding, etc.)
// - Appearances (filled, outlined, text, transparent)
// - Variants (primary, secondary, tertiary, default)
// - States (hover, focus, active, disabled)
import buttonTokensData from "../../../../designTokens/components/button/button.json";

const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const meta = {
  title: "Basic/Button",
  component: ButtonDefaultExport,
//   argTypes: {
//     caption: { control: "text" },
//     disabled: { control: "boolean" },
//     type: {
//       control: { type: "select" },
//       options: ["button", "submit", "reset"],
//     },
//     iconposition: {
//       control: { type: "select" },
//       options: ["left", "right"],
//     },
//     iconwidth: { control: "text" },
//     iconheight: { control: "text" },
//     iconmargin: { control: "text" },
//     badgevalue: { control: "text" },
//     shortcutkey: { control: "text" },
//     arialabel: { control: "text" },
//     iconclass:{
//       control:{
//         type:"select"
//       },
//       options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
//         "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-github"],
//     },
//     className: {
//   control: "select",
//   options: [
//     // Filled
//     "btn-filled btn-primary",
//     "btn-filled btn-secondary",
//     "btn-filled btn-success",
//     "btn-filled btn-danger",
//     "btn-filled btn-warning",
//     "btn-filled btn-info",
//     "btn-filled btn-default",

//     // Outlined
//     "btn-outlined btn-primary",
//     "btn-outlined btn-secondary",
//     "btn-outlined btn-success",
//     "btn-outlined btn-danger",
//     "btn-outlined btn-warning",
//     "btn-outlined btn-info",
//     "btn-outlined btn-default",

//     // Special
//     "btn-link",
//     "btn-transparent",
//     "no-border",

//     // Sizes (example with primary)
//     "btn-filled btn-primary btn-sm",
//     "btn-filled btn-primary btn-lg",
//     "btn-filled btn-primary btn-xs",
//   ],
// }
//   }
} satisfies Meta<typeof ButtonDefaultExport>;

export default meta;

type Story = StoryObj<typeof meta>;
const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <ButtonDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      // styling={styling}
      style={style}
      token={token}
    />
  ),
  args:{
    name:"docsButton",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Button Showcase
          </Typography>

          {/* Row 1: Common Buttons */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Common Variants
            </Typography>

            <Stack
              direction="row"
              spacing={4}
              sx={{ flexWrap: "wrap", alignItems: "center" }}
            >
              {/* Default Filled */}
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Default
                </Typography>
                <ButtonDefaultExport
                  name="filledDefault"
                  caption="Filled Button"
                  type="button"
                  className="btn-filled btn-default"
                  listener={mockListener}
                />
              </Stack>

              {/* Filled with Icon */}
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Icon
                </Typography>
                <ButtonDefaultExport
                  name="filledIcon"
                  caption="Icon Button"
                  type="button"
                  className="btn-filled btn-default"
                  iconclass="fa fa-anchor"
                  iconposition="left"
                  iconwidth="16px"
                  iconheight="16px"
                  iconmargin="0 8px 0 0"
                  listener={mockListener}
                />
              </Stack>

              {/* Filled with Badge */}
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Badge
                </Typography>
                <ButtonDefaultExport
                  name="filledBadge"
                  caption="Notifications"
                  type="button"
                  className="btn-filled btn-default"
                  iconclass="fa fa-bell"
                  iconposition="left"
                  iconwidth="16px"
                  iconheight="16px"
                  iconmargin="0 8px 0 0"
                  badgevalue="3"
                  listener={mockListener}
                />
              </Stack>
            </Stack>
          </Stack>

          {/* Row 2: Filled Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Filled Variants
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 3,
                maxWidth: 900,
              }}
            >
              <ButtonDefaultExport
                name="filledPrimary"
                caption="Primary"
                type="button"
                className="btn-filled btn-primary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledSecondary"
                caption="Secondary"
                type="button"
                className="btn-filled btn-secondary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledSuccess"
                caption="Success"
                type="button"
                className="btn-filled btn-success"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledDanger"
                caption="Danger"
                type="button"
                className="btn-filled btn-danger"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledWarning"
                caption="Warning"
                type="button"
                className="btn-filled btn-warning"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledInfo"
                caption="Info"
                type="button"
                className="btn-filled btn-info"
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Row 3: Outlined Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Outlined Variants
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 3,
                maxWidth: 900,
              }}
            >
              <ButtonDefaultExport
                name="outlinedPrimary"
                caption="Primary"
                type="button"
                className="btn-outlined btn-primary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedSecondary"
                caption="Secondary"
                type="button"
                className="btn-outlined btn-secondary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedSuccess"
                caption="Success"
                type="button"
                className="btn-outlined btn-success"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedDanger"
                caption="Danger"
                type="button"
                className="btn-outlined btn-danger"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedWarning"
                caption="Warning"
                type="button"
                className="btn-outlined btn-warning"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedInfo"
                caption="Info"
                type="button"
                className="btn-outlined btn-info"
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Row 4: Size Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Size Variants
            </Typography>

            <Stack direction="row" flexWrap="wrap" sx={{ gap: 3 }}>
              <ButtonDefaultExport
                name="sizeXs"
                caption="Extra Small"
                type="button"
                className="btn-filled btn-default btn-xs"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="sizeSm"
                caption="Small"
                type="button"
                className="btn-filled btn-default btn-sm"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="sizeLg"
                caption="Large"
                type="button"
                className="btn-filled btn-default btn-lg"
                listener={mockListener}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "buttonShowcase",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicButton",
    caption: "Click Me",
    disabled: false,
    type: "button",
    className: "btn-filled btn-default"
  },
  argTypes: {
    caption: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconurl: {control: "text"},
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    iconclass:{
      control:{
        type:"select"
      },
      options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
        "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-github"],
    },
    className: {
  control: "select",
  options: [
    // Filled
    "btn-filled btn-primary",
    "btn-filled btn-secondary",
    "btn-filled btn-success",
    "btn-filled btn-danger",
    "btn-filled btn-warning",
    "btn-filled btn-info",
    "btn-filled btn-default",

    // Outlined
    "btn-outlined btn-primary",
    "btn-outlined btn-secondary",
    "btn-outlined btn-success",
    "btn-outlined btn-danger",
    "btn-outlined btn-warning",
    "btn-outlined btn-info",
    "btn-outlined btn-default",

    // Special
    "btn-link",
    "btn-transparent",
    "no-border",

    // Sizes (example with primary)
    "btn-filled btn-primary btn-sm",
    "btn-filled btn-primary btn-lg",
    "btn-filled btn-primary btn-xs",
      ]
    }
  }
};


// export const DesignToken: Story = {
//   tags: ['show-panel'],
//   render: Template,
//   args: {
//     name: "designTokenButton",
//     caption: "Click Me",
//     disabled: false,
//     type: "button",
//     className: "btn-filled btn-primary",
//     iconclass:"fa fa-github",
//     iconposition:"left",
//     "data-design-token-target":"true"
//   },
//   argTypes: {
//     caption: { control: "text" },
//     disabled: { control: "boolean" },
//     iconposition: {
//       control: { type: "select" },
//       options: ["left", "right"],
//     },
//     badgevalue: { control: "text" },
//     iconclass:{
//       control:{
//         type:"select"
//       },
//       options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
//         "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-github"],
//     },
//     className: {
//   control: "select",
//   options: [
//     // Filled
//     "btn-filled btn-primary",
//     "btn-filled btn-secondary",
//     "btn-filled btn-success",
//     "btn-filled btn-danger",
//     "btn-filled btn-warning",
//     "btn-filled btn-info",
//     "btn-filled btn-default",

//     // Outlined
//     "btn-outlined btn-primary",
//     "btn-outlined btn-secondary",
//     "btn-outlined btn-success",
//     "btn-outlined btn-danger",
//     "btn-outlined btn-warning",
//     "btn-outlined btn-info",
//     "btn-outlined btn-default",

//     // Special
//     "btn-link",
//     "btn-transparent",
//     "no-border",

//     // Sizes (example with primary)
//     "btn-filled btn-primary btn-sm",
//     "btn-filled btn-primary btn-lg",
//     "btn-filled btn-primary btn-xs",
//       ]
//     },
//     "data-design-token-target": { control: false }
//   },
//   parameters: {
//     designTokens: {
//       enabled: true,
//       tokenData: buttonTokensData,  // Pass raw JSON data instead of pre-parsed config
//       componentKey: "btn",  // Component identifier for parsing
//       extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
//     },
//     layout: 'fullscreen',
//   },
// };


// ============================================================================
// DESIGN TOKEN STORY
// ============================================================================
// This story demonstrates the Design Token system for button component.
// It allows real-time customization of button styles through design tokens.
//
// Key Features:
// - Shows 3 button variations: Basic, With Icon, With Badge
// - Design Tokens tab appears in the panel below (alongside Controls, Actions, etc.)
// - Tokens are automatically loaded from /src/designTokens/wm-button.json
// - When className changes in Controls tab, Design Tokens update to show variant-specific values
// - Changes to tokens are applied in real-time to all buttons
// - Foundation CSS styles from @wavemaker/app-runtime-wm-build are respected
//
// How it works:
// 1. User selects className in Controls tab (e.g., "btn-filled btn-primary")
// 2. Design Tokens panel extracts CSS variables from foundation.css at runtime
// 3. Design Tokens panel parses the JSON with actual CSS values (not hardcoded)
// 4. Default values shown are from foundation.css (e.g., primary = actual theme color)
// 5. User modifies a token (e.g., change background to red)
// 6. CSS is dynamically generated and injected into the iframe
// 7. All buttons with that className update instantly
// ============================================================================


export const Filled: Story = {
  tags: ['show-panel'],
  render: (args) => {
    const { className } = args;
    const variant = className.split(' ')[1]?.replace('btn-', '') || 'primary';
    const variantLabel = variant.charAt(0).toUpperCase() + variant.slice(1);

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Filled Buttons - {variantLabel}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: 2 }}>
            <ButtonDefaultExport
              name={`filled${variantLabel}Basic`}
              caption="Button"
              type="button"
              className={className}
              listener={mockListener}
              data-design-token-target="true"
            />
            <ButtonDefaultExport
              name={`filled${variantLabel}IconOnly`}
              type="button"
              className={className}
              iconclass="fa fa-star"
              iconposition="left"
              iconwidth="16px"
              iconheight="16px"
              listener={mockListener}
              data-design-token-target="true"
            />
            <ButtonDefaultExport
              name={`filled${variantLabel}IconText`}
              caption="Icon Button"
              type="button"
              className={className}
              iconclass="fa fa-star"
              iconposition="left"
              iconwidth="16px"
              iconheight="16px"
              iconmargin="0 8px 0 0"
              listener={mockListener}
              data-design-token-target="true"
            />
          </Stack>
        </Stack>
      </Box>
    );
  },

  args: {
    name: "filledButton",
    listener: mockListener,
    className: "btn-filled btn-primary",
  },

  argTypes: {
    className: {
      control: { type: "select" },
      options: [
        "btn-filled btn-default",
        "btn-filled btn-primary",
        "btn-filled btn-secondary",
        "btn-filled btn-tertiary",
      ],
      description: "Select button variant to modify design tokens",
    },
  },

  parameters: {
    designTokens: {
      enabled: true,
      tokenData: buttonTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "btn",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

export const Outlined: Story = {
  tags: ['show-panel'],
  render: (args) => {
    const { className } = args;
    const variant = className.split(' ')[1]?.replace('btn-', '') || 'primary';
    const variantLabel = variant.charAt(0).toUpperCase() + variant.slice(1);

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Outlined Buttons - {variantLabel}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: 2 }}>
            <ButtonDefaultExport
              name={`outlined${variantLabel}Basic`}
              caption="Button"
              type="button"
              className={className}
              listener={mockListener}
              data-design-token-target="true"
            />
            <ButtonDefaultExport
              name={`outlined${variantLabel}IconOnly`}
              type="button"
              className={className}
              iconclass="fa fa-star"
              iconposition="left"
              iconwidth="16px"
              iconheight="16px"
              listener={mockListener}
              data-design-token-target="true"
            />
            <ButtonDefaultExport
              name={`outlined${variantLabel}IconText`}
              caption="Icon Button"
              type="button"
              className={className}
              iconclass="fa fa-star"
              iconposition="left"
              iconwidth="16px"
              iconheight="16px"
              iconmargin="0 8px 0 0"
              listener={mockListener}
              data-design-token-target="true"
            />
          </Stack>
        </Stack>
      </Box>
    );
  },

  args: {
    name: "outlinedButton",
    listener: mockListener,
    className: "btn-outlined btn-primary",
  },

  argTypes: {
    className: {
      control: { type: "select" },
      options: [
        "btn-outlined btn-default",
        "btn-outlined btn-primary",
        "btn-outlined btn-secondary",
        "btn-outlined btn-tertiary",
      ],
      description: "Select button variant to modify design tokens",
    },
  },

  parameters: {
    designTokens: {
      enabled: true,
      tokenData: buttonTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "btn",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

export const Text: Story = {
  tags: ['show-panel'],
  render: (args) => {
    const { className } = args;
    const variant = className.split(' ')[1]?.replace('btn-', '') || 'primary';
    const variantLabel = variant.charAt(0).toUpperCase() + variant.slice(1);

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Text Buttons - {variantLabel}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: 2 }}>
            <ButtonDefaultExport
              name={`text${variantLabel}Basic`}
              caption="Button"
              type="button"
              className={className}
              listener={mockListener}
              data-design-token-target="true"
            />
            <ButtonDefaultExport
              name={`text${variantLabel}IconOnly`}
              type="button"
              className={className}
              iconclass="fa fa-star"
              iconposition="left"
              iconwidth="16px"
              iconheight="16px"
              listener={mockListener}
              data-design-token-target="true"
            />
            <ButtonDefaultExport
              name={`text${variantLabel}IconText`}
              caption="Icon Button"
              type="button"
              className={className}
              iconclass="fa fa-star"
              iconposition="left"
              iconwidth="16px"
              iconheight="16px"
              iconmargin="0 8px 0 0"
              listener={mockListener}
              data-design-token-target="true"
            />
          </Stack>
        </Stack>
      </Box>
    );
  },

  args: {
    name: "textButton",
    listener: mockListener,
    className: "btn-text btn-primary",
  },

  argTypes: {
    className: {
      control: { type: "select" },
      options: [
        "btn-text btn-default",
        "btn-text btn-primary",
        "btn-text btn-secondary",
        "btn-text btn-tertiary",
      ],
      description: "Select button variant to modify design tokens",
    },
  },

  parameters: {
    designTokens: {
      enabled: true,
      tokenData: buttonTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "btn",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

export const Transparent: Story = {
  tags: ['show-panel'],
  render: (args) => {
    const { className } = args;

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Transparent Buttons
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: 2 }}>
            <ButtonDefaultExport
              name="transparentBasic"
              caption="Button"
              type="button"
              className={className}
              listener={mockListener}
              data-design-token-target="true"
            />
            <ButtonDefaultExport
              name="transparentIconOnly"
              type="button"
              className={className}
              iconclass="fa fa-star"
              iconposition="left"
              iconwidth="16px"
              iconheight="16px"
              listener={mockListener}
              data-design-token-target="true"
            />
            <ButtonDefaultExport
              name="transparentIconText"
              caption="Icon Button"
              type="button"
              className={className}
              iconclass="fa fa-star"
              iconposition="left"
              iconwidth="16px"
              iconheight="16px"
              iconmargin="0 8px 0 0"
              listener={mockListener}
              data-design-token-target="true"
            />
          </Stack>
        </Stack>
      </Box>
    );
  },

  args: {
    name: "transparentButton",
    listener: mockListener,
    className: "btn-transparent",
  },

  argTypes: {
    className: {
      control: { type: "select" },
      options: [
        "btn-transparent",
      ],
      description: "Select button variant to modify design tokens",
    },
  },

  parameters: {
    designTokens: {
      enabled: true,
      tokenData: buttonTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "btn",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};


// export const DesignToken: Story = {
//   render: (args) => {
//     // Extract className from args (Controls tab)
//     // This allows the Design Tokens panel to show variant-specific tokens
//     const { className } = args;

//     return (
//       <Box sx={{ p: 4 }}>
//         <Stack spacing={4}>
//           {/* Header Section */}
//           <Box>
//             <Typography variant="h6" fontWeight={600}>
//               Design Token Playground
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               This story demonstrates the Design Token system. Use the tabs below to interact:
//             </Typography>
//             <Box sx={{ mt: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//               <Typography variant="body2" component="ul" sx={{ pl: 2, mb: 0, "& li": { mb: 0.5 } }}>
//                 <li><strong>Controls Tab:</strong> Change the <code>className</code> to switch between button variants</li>
//                 <li><strong>Design Tokens Tab:</strong> View and modify design tokens for the selected variant</li>
//                 <li><strong>Real-time Updates:</strong> Token changes apply immediately to all buttons</li>
//               </Typography>
//             </Box>
//           </Box>

//           {/* Button Variations Section */}
//           <Stack spacing={3}>
//             {/* 1. Basic Button */}
//             <Box>
//               <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                 1. Basic Button
//               </Typography>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
//                 A simple button with text only. Styles are controlled by design tokens.
//               </Typography>
//               <ButtonDefaultExport
//                 name="designTokenButton"
//                 caption="Button"
//                 type="button"
//                 className={className}
//                 disabled={false}
//                 listener={mockListener}
//                 data-design-token-target="true"
//               />
//             </Box>

//             {/* 2. Button with Icon */}
//             <Box>
//               <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                 2. Button with Icon
//               </Typography>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
//                 Button with a star icon on the left. Icon size and spacing are controlled by tokens.
//               </Typography>
//               <ButtonDefaultExport
//                 name="designTokenButtonIcon"
//                 caption="Button with Icon"
//                 type="button"
//                 className={className}
//                 disabled={false}
//                 iconclass="fa fa-star"
//                 iconposition="left"
//                 iconwidth="16px"
//                 iconheight="16px"
//                 iconmargin="0 8px 0 0"
//                 listener={mockListener}
//                 data-design-token-target="true"
//               />
//             </Box>

//             {/* 3. Button with Badge */}
//             <Box>
//               <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                 3. Button with Badge
//               </Typography>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
//                 Button with a notification badge. Badge styles can be customized through tokens.
//               </Typography>
//               <ButtonDefaultExport
//                 name="designTokenButtonBadge"
//                 caption="Notifications"
//                 type="button"
//                 className={className}
//                 disabled={false}
//                 iconclass="fa fa-bell"
//                 iconposition="left"
//                 iconwidth="16px"
//                 iconheight="16px"
//                 iconmargin="0 8px 0 0"
//                 badgevalue="5"
//                 listener={mockListener}
//                 data-design-token-target="true"
//               />
//             </Box>

//             {/* 4. Disabled Button */}
//             <Box>
//               <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                 4. Disabled Button
//               </Typography>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
//                 Button in disabled state. Test disabled state tokens: color, background, opacity, cursor.
//               </Typography>
//               <ButtonDefaultExport
//                 name="designTokenButtonDisabled"
//                 caption="Disabled Button"
//                 type="button"
//                 className={className}
//                 disabled={true}
//                 listener={mockListener}
//                 data-design-token-target="true"
//               />
//             </Box>
//           </Stack>

//           {/* Instructions Section */}
//           <Box sx={{ p: 3, backgroundColor: "#e3f2fd", borderRadius: 1, borderLeft: "4px solid #1976d2" }}>
//             <Typography variant="subtitle2" gutterBottom fontWeight={600}>
//               How to Use Design Tokens:
//             </Typography>
//             <Typography variant="body2" component="ol" sx={{ pl: 2, mb: 0, "& li": { mb: 1 } }}>
//               <li>
//                 <strong>Step 1:</strong> Open the <strong>Controls</strong> tab below
//               </li>
//               <li>
//                 <strong>Step 2:</strong> Change the <strong>className</strong> dropdown (try "btn-filled btn-primary", "btn-outlined btn-secondary", etc.)
//               </li>
//               <li>
//                 <strong>Step 3:</strong> Open the <strong>Design Tokens</strong> tab below
//               </li>
//               <li>
//                 <strong>Step 4:</strong> You'll see all tokens for the selected variant with their default values from JSON
//               </li>
//               <li>
//                 <strong>Step 5:</strong> Modify any token (e.g., change background color, padding, border radius)
//               </li>
//               <li>
//                 <strong>Step 6:</strong> Watch the buttons update in real-time!
//               </li>
//               <li>
//                 <strong>Step 7:</strong> Click "Reset to Defaults" to restore original values from JSON
//               </li>
//             </Typography>
//           </Box>

//           {/* Token Categories Info */}
//           <Box>
//             <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//               Available Token Categories:
//             </Typography>
//             <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
//               <Box sx={{ p: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 1 }}>
//                 <Typography variant="caption" fontWeight={600} display="block">Colors</Typography>
//                 <Typography variant="caption" color="text.secondary">Background, Text, Border</Typography>
//               </Box>
//               <Box sx={{ p: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 1 }}>
//                 <Typography variant="caption" fontWeight={600} display="block">Typography</Typography>
//                 <Typography variant="caption" color="text.secondary">Font Size, Weight, Family</Typography>
//               </Box>
//               <Box sx={{ p: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 1 }}>
//                 <Typography variant="caption" fontWeight={600} display="block">Spacing</Typography>
//                 <Typography variant="caption" color="text.secondary">Padding, Gap, Height</Typography>
//               </Box>
//               <Box sx={{ p: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 1 }}>
//                 <Typography variant="caption" fontWeight={600} display="block">Border</Typography>
//                 <Typography variant="caption" color="text.secondary">Width, Style, Radius</Typography>
//               </Box>
//               <Box sx={{ p: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 1 }}>
//                 <Typography variant="caption" fontWeight={600} display="block">States</Typography>
//                 <Typography variant="caption" color="text.secondary">Hover, Focus, Active, Disabled</Typography>
//               </Box>
//               <Box sx={{ p: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: 1 }}>
//                 <Typography variant="caption" fontWeight={600} display="block">Effects</Typography>
//                 <Typography variant="caption" color="text.secondary">Shadow, Cursor, Opacity</Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },

//   // Default args - these appear in the Controls tab
//   args: {
//     name: "designTokenButton",
//     listener: mockListener,
//     className: "btn-filled btn-primary", // Default variant shown on load
//   },

//   // ArgTypes - control definitions for the Controls tab
//   argTypes: {
//     className: {
//       control: { type: "select" },
//       options: [
//         // Filled variants - solid background with brand colors
//         "btn-filled btn-default",
//         "btn-filled btn-primary",
//         "btn-filled btn-secondary",
//         "btn-filled btn-tertiary",

//         // Outlined variants - transparent background with colored border
//         "btn-outlined btn-default",
//         "btn-outlined btn-primary",
//         "btn-outlined btn-secondary",
//         "btn-outlined btn-tertiary",

//         // Text variants - no background, just text color
//         "btn-text btn-default",
//         "btn-text btn-primary",
//         "btn-text btn-secondary",
//         "btn-text btn-tertiary",

//         // Transparent variant - completely transparent
//         "btn-transparent",
//       ],
//       description: "Select button variant to see its design tokens. Changing this updates the Design Tokens tab.",
//     },
//   },

//   // Parameters - configure the Design Tokens panel
//   parameters: {
//     // Enable the Design Tokens tab for this story
//     designTokens: {
//       enabled: true,  // Show the Design Tokens tab in the panel
//       tokenConfig: buttonTokenConfig,  // Parsed token configuration from JSON
//       // Note: className is read from args dynamically, so Design Tokens update when className changes
//     },

//     // Optional: Customize the layout
//     layout: 'padded',
//   },
// };


// export const Primary: Story = {
//   render: Template,
//   args: {
//     name: "primaryButton",
//     caption: "Primary Button",
//     disabled: false,
//     type: "button",
//     styles: {
//       backgroundColor: "#007bff",
//       color: "white",
//       padding: "8px 16px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "500",
//     },
//   },
// };

// // Interactive story with click handler
// export const Interactive: Story = {
//   render: () => {
//     const [clickCount, setClickCount] = useState(0);
//     const [lastAction, setLastAction] = useState<string>("");

//     const handleClick = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
//       setClickCount(prev => prev + 1);
//       setLastAction("Clicked");
//     };

//     const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Double-clicked");
//     };

//     const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Mouse entered");
//     };

//     const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Mouse left");
//     };

//     const handleFocus = (e: React.FocusEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Focused");
//     };

//     const handleBlur = (e: React.FocusEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Blurred");
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <ButtonDefaultExport
//             name="interactiveBtn"
//             caption="Interactive Button"
//             disabled={false}
//             type="button"
//             listener={mockListener}
//             onClick={handleClick}
//             onDoubleClick={handleDoubleClick}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//             styles={{
//               backgroundColor: "#007bff",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2">Event Log:</Typography>
//             <Typography variant="body2">Click Count: {clickCount}</Typography>
//             <Typography variant="body2">Last Action: {lastAction || "None"}</Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactive",
//     listener: mockListener,
//   },
// };

// Story demonstrating multiple buttons
// export const ButtonGroup: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
//           <ButtonDefaultExport
//             name="cancelBtn"
//             caption="Cancel"
//             disabled={false}
//             type="button"
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#6c757d",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />
//           <ButtonDefaultExport
//             name="saveBtn"
//             caption="Save"
//             disabled={false}
//             type="button"
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#28a745",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />
//           <ButtonDefaultExport
//             name="deleteBtn"
//             caption="Delete"
//             disabled={false}
//             type="button"
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#dc3545",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "buttonGroup",
//     listener: mockListener,
//   },
// };
