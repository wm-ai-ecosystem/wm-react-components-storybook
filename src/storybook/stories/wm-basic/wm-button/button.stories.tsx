import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import ButtonDefaultExport from "../../../../components/form/button/index";
import { iconClassNames } from "../../constants/iconClassConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
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
} satisfies Meta<typeof ButtonDefaultExport>;

export default meta;

type Story = StoryObj<typeof meta>;
const Template = (args: any) => {
  const { className, iconposition } = args;
  const renderkey = `${iconposition}-${className}`;

  return (
  <Box style={{ padding: 16 }}>
    <ButtonDefaultExport {...args} key={renderkey} listener={mockListener} />
  </Box>
)};

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
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14168&p=f&t=cTJyRebsmNAZyNLI-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsButton",
    listener:mockListener
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
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
                name="filledTertiary"
                caption="Tertiary"
                type="button"
                className="btn-filled btn-tertiary"
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
                name="outlinedTertiary"
                caption="Tertiary"
                type="button"
                className="btn-outlined btn-tertiary"
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Row 3: Text Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Text Variants
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
                name="textPrimary"
                caption="Primary"
                type="button"
                className="btn-text btn-primary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="textSecondary"
                caption="Secondary"
                type="button"
                className="btn-text btn-secondary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="textTertiary"
                caption="Tertiary"
                type="button"
                className="btn-text btn-tertiary"
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Row 3: Outlined Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Transparent Variants
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
                name="buttonTransparent"
                caption="Button"
                type="button"
                className="btn-transparent"
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Row 4: Size Variants */}
          {/* <Stack spacing={1.5}>
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
          </Stack> */}
        </Stack>
      </Box>
    );
  },
  args: {
    name: "buttonShowcase",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};

export const Filled: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "filledButton",
    caption: "Button",
    disabled: false,
    // type: "button",
    className: "btn-filled btn-primary",
    "data-design-token-target": "true",
    iconposition: "left",
  },
  argTypes: {
    caption: { control: "text" },
    disabled: { control: "boolean" },
    // type: {
    //   control: { type: "select" },
    //   options: ["button", "submit", "reset"],
    // },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconurl: {control: "text"},
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    className: {
  control: "select",
  options: [
    // Filled
    "btn-filled btn-primary",
    "btn-filled btn-secondary",
    "btn-filled btn-tertiary",
    "btn-filled btn-default",
      ]
    },
    "data-design-token-target": {table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
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
  render: Template,
  args: {
    name: "outlinedButton",
    caption: "Button",
    disabled: false,
    // type: "button",
    className: "btn-outlined btn-primary",
    "data-design-token-target": "true",
    iconposition: "left",
  },
  argTypes: {
    caption: { control: "text" },
    disabled: { control: "boolean" },
    // type: {
    //   control: { type: "select" },
    //   options: ["button", "submit", "reset"],
    // },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconurl: {control: "text"},
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    className: {
  control: "select",
  options: [
    // Outlined
    "btn-outlined btn-primary",
    "btn-outlined btn-secondary",
    "btn-outlined btn-tertiary",
    "btn-outlined btn-default",
      ]
    },
    "data-design-token-target": {table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
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
  render: Template,
  args: {
    name: "textButton",
    caption: "Button",
    disabled: false,
    // type: "button",
    className: "btn-text btn-primary",
    "data-design-token-target": "true",
    iconposition: "left",
  },
  argTypes: {
    caption: { control: "text" },
    disabled: { control: "boolean" },
    // type: {
    //   control: { type: "select" },
    //   options: ["button", "submit", "reset"],
    // },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconurl: {control: "text"},
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    className: {
  control: "select",
  options: [
    //text
    "btn-text btn-primary",
    "btn-text btn-secondary",
    "btn-text btn-tertiary",
    "btn-text btn-default",
      ]
    },
    "data-design-token-target": {table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
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
  render: Template,
  args: {
    name: "transparentButton",
    caption: "Button",
    disabled: false,
    // type: "button",
    className: "btn-transparent",
    "data-design-token-target": "true",
    iconposition: "left",
  },
  argTypes: {
    caption: { control: "text" },
    disabled: { control: "boolean" },
    // type: {
    //   control: { type: "select" },
    //   options: ["button", "submit", "reset"],
    // },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconurl: {control: "text"},
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    className: {
  control: "select",
  options: [
    // Special
    "btn-transparent",
      ]
    },
    "data-design-token-target": {table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
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

// export const Basic: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//     const { className } = args;

//     return (
//       <Box style={{ padding: 16 }} key={className}>
//         <ButtonDefaultExport
//           key={className}
//           className={className}
//           {...args}
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
//   args: {
//     name: "basicButton",
//     caption: "Click Me",
//     disabled: false,
//     type: "button",
//     className: "btn-filled btn-default"
//   },
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
//     iconurl: {control: "text"},
//     iconwidth: { control: "text" },
//     iconheight: { control: "text" },
//     iconmargin: { control: "text" },
//     badgevalue: { control: "text" },
//     iconclass:{ control:{ type:"select"}, options: iconClassNames },
//     className: {
//   control: "select",
//   options: [
//     // Filled
//     "btn-filled btn-primary",
//     "btn-filled btn-secondary",
//     "btn-filled btn-tertiary",
//     "btn-filled btn-default",

//     // Outlined
//     "btn-outlined btn-primary",
//     "btn-outlined btn-secondary",
//     "btn-outlined btn-tertiary",
//     "btn-outlined btn-default",

//     //text
//     "btn-text btn-primary",
//     "btn-text btn-secondary",
//     "btn-text btn-tertiary",
//     "btn-text btn-default",

//     // Special
//     "btn-transparent",

//     // Sizes (example with primary)
//     // "btn-filled btn-primary btn-sm",
//     // "btn-filled btn-primary btn-lg",
//     // "btn-filled btn-primary btn-xs",
//       ]
//     }
//   }
// };


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


// export const Filled: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//     const { className } = args;
//     const variant = className.split(' ')[1]?.replace('btn-', '') || 'primary';
//     const variantLabel = variant.charAt(0).toUpperCase() + variant.slice(1);

//     return (
//       <Box sx={{ p: 4 }}>
//         <Stack spacing={4}>
//           <Typography variant="h6" fontWeight={600}>
//             Filled Buttons - {variantLabel}
//           </Typography>

//           <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: 2 }}>
//             <ButtonDefaultExport
//               name={`filled${variantLabel}Basic`}
//               caption="Button"
//               type="button"
//               className={className}
//               listener={mockListener}
//               data-design-token-target="true"
//               disabled={false}
//             />
//             <ButtonDefaultExport
//               name={`filled${variantLabel}IconOnly`}
//               type="button"
//               className={className}
//               iconclass="fa fa-star"
//               iconposition="left"
//               iconwidth="16px"
//               iconheight="16px"
//               listener={mockListener}
//               data-design-token-target="true"
//               disabled={false}
//             />
//             <ButtonDefaultExport
//               name={`filled${variantLabel}IconText`}
//               caption="Icon Button"
//               type="button"
//               className={className}
//               iconclass="fa fa-star"
//               iconposition="left"
//               iconwidth="16px"
//               iconheight="16px"
//               iconmargin="0 8px 0 0"
//               listener={mockListener}
//               data-design-token-target="true"
//               disabled={false}
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },

//   args: {
//     name: "filledButton",
//     listener: mockListener,
//     className: "btn-filled btn-primary",
//   },

//   argTypes: {
//     className: {
//       control: { type: "select" },
//       options: [
//         "btn-filled btn-default",
//         "btn-filled btn-primary",
//         "btn-filled btn-secondary",
//         "btn-filled btn-tertiary",
//       ],
//       description: "Select button variant to modify design tokens",
//     },
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

// export const Outlined: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//     const { className } = args;
//     const variant = className.split(' ')[1]?.replace('btn-', '') || 'primary';
//     const variantLabel = variant.charAt(0).toUpperCase() + variant.slice(1);

//     return (
//       <Box sx={{ p: 4 }}>
//         <Stack spacing={4}>
//           <Typography variant="h6" fontWeight={600}>
//             Outlined Buttons - {variantLabel}
//           </Typography>

//           <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: 2 }}>
//             <ButtonDefaultExport
//               name={`outlined${variantLabel}Basic`}
//               caption="Button"
//               type="button"
//               className={className}
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//             <ButtonDefaultExport
//               name={`outlined${variantLabel}IconOnly`}
//               type="button"
//               className={className}
//               iconclass="fa fa-star"
//               iconposition="left"
//               iconwidth="16px"
//               iconheight="16px"
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//             <ButtonDefaultExport
//               name={`outlined${variantLabel}IconText`}
//               caption="Icon Button"
//               type="button"
//               className={className}
//               iconclass="fa fa-star"
//               iconposition="left"
//               iconwidth="16px"
//               iconheight="16px"
//               iconmargin="0 8px 0 0"
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },

//   args: {
//     name: "outlinedButton",
//     listener: mockListener,
//     className: "btn-outlined btn-primary",
//   },

//   argTypes: {
//     className: {
//       control: { type: "select" },
//       options: [
//         "btn-outlined btn-default",
//         "btn-outlined btn-primary",
//         "btn-outlined btn-secondary",
//         "btn-outlined btn-tertiary",
//       ],
//       description: "Select button variant to modify design tokens",
//     },
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

// export const Text: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//     const { className } = args;
//     const variant = className.split(' ')[1]?.replace('btn-', '') || 'primary';
//     const variantLabel = variant.charAt(0).toUpperCase() + variant.slice(1);

//     return (
//       <Box sx={{ p: 4 }}>
//         <Stack spacing={4}>
//           <Typography variant="h6" fontWeight={600}>
//             Text Buttons - {variantLabel}
//           </Typography>

//           <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: 2 }}>
//             <ButtonDefaultExport
//               name={`text${variantLabel}Basic`}
//               caption="Button"
//               type="button"
//               className={className}
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//             <ButtonDefaultExport
//               name={`text${variantLabel}IconOnly`}
//               type="button"
//               className={className}
//               iconclass="fa fa-star"
//               iconposition="left"
//               iconwidth="16px"
//               iconheight="16px"
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//             <ButtonDefaultExport
//               name={`text${variantLabel}IconText`}
//               caption="Icon Button"
//               type="button"
//               className={className}
//               iconclass="fa fa-star"
//               iconposition="left"
//               iconwidth="16px"
//               iconheight="16px"
//               iconmargin="0 8px 0 0"
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },

//   args: {
//     name: "textButton",
//     listener: mockListener,
//     className: "btn-text btn-primary",
//   },

//   argTypes: {
//     className: {
//       control: { type: "select" },
//       options: [
//         "btn-text btn-default",
//         "btn-text btn-primary",
//         "btn-text btn-secondary",
//         "btn-text btn-tertiary",
//       ],
//       description: "Select button variant to modify design tokens",
//     },
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

// export const Transparent: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//     const { className } = args;

//     return (
//       <Box sx={{ p: 4 }}>
//         <Stack spacing={4}>
//           <Typography variant="h6" fontWeight={600}>
//             Transparent Buttons
//           </Typography>

//           <Stack direction="row" spacing={2} alignItems="center" sx={{ gap: 2 }}>
//             <ButtonDefaultExport
//               name="transparentBasic"
//               caption="Button"
//               type="button"
//               className={className}
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//             <ButtonDefaultExport
//               name="transparentIconOnly"
//               type="button"
//               className={className}
//               iconclass="fa fa-star"
//               iconposition="left"
//               iconwidth="16px"
//               iconheight="16px"
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//             <ButtonDefaultExport
//               name="transparentIconText"
//               caption="Icon Button"
//               type="button"
//               className={className}
//               iconclass="fa fa-star"
//               iconposition="left"
//               iconwidth="16px"
//               iconheight="16px"
//               iconmargin="0 8px 0 0"
//               listener={mockListener}
//               data-design-token-target="true"
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },

//   args: {
//     name: "transparentButton",
//     listener: mockListener,
//     className: "btn-transparent",
//   },

//   argTypes: {
//     className: {
//       control: { type: "select" },
//       options: [
//         "btn-transparent",
//       ],
//       description: "Select button variant to modify design tokens",
//     },
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

