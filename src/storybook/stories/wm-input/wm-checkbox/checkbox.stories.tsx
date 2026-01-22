import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import CheckboxDefaultExport from "../../../../components/input/default/checkbox/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import checkboxTokensData from "../../../../designTokens/components/checkbox/checkbox.json";

const meta: Meta<typeof CheckboxDefaultExport> = {
  title: "Input/Checkbox",
  component: CheckboxDefaultExport,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
  onChange: () => {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <CheckboxDefaultExport {...args} listener={mockListener} />
  </Box>
);

const DesignTokenTemplate = (args: any) => {
  // Remove data-design-token-target from args to avoid passing it to the component
  const { "data-design-token-target": _, ...componentProps } = args;

  return (
    <Box className="wm-app" style={{ padding: 16 }} data-design-token-target="true">
      <CheckboxDefaultExport {...componentProps} listener={mockListener} />
    </Box>
  );
};

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      // styling={styling}
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14173&p=f&t=rE8HvDMpyMdtByDG-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsCheckbox",
    listener:mockListener
  },
  argTypes:{
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
      <Box sx={{ p: 4, maxWidth: 400 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Checkbox Showcase
          </Typography>

          {/* Row 1: Standard Checkbox */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Standard Checkbox
            </Typography>
            <Stack spacing={1}>
              <CheckboxDefaultExport
                name="standardCheckbox"
                caption="Accept terms and conditions"
                datavalue={true}
                listener={mockListener}
              />
            </Stack>
          </Box>

          {/* Row 2: Toggle Switch */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Toggle Switch
            </Typography>
            <Stack spacing={1}>
              <CheckboxDefaultExport
                name="toggleSwitch"
                caption="Enable notifications"
                type="toggle"
                datavalue={true}
                listener={mockListener}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "checkboxShowcase",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardCheckbox",
    caption: "Accept terms and conditions",
    listener: mockListener,
    datavalue: true,
    disabled: false,
    readonly: false,
    type: "checkbox",
    "data-design-token-target": true
  },
  argTypes: {
    caption: { control: "text" },
    datavalue: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    // required: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["checkbox", "toggle"],
    },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: checkboxTokensData,
      componentKey: "checkbox",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};

// export const Toggle: Story = {
//   tags: ['show-panel'],
//   render: DesignTokenTemplate,
//   args: {
//     name: "standardToggle",
//     caption: "Enable notifications",
//     listener: mockListener,
//     datavalue: true,
//     disabled: false,
//     readonly: false,
//     type: "toggle",
//     "data-design-token-target": true
//   },
//   argTypes: {
//     caption: { control: "text" },
//     datavalue: { control: "boolean" },
//     disabled: { control: "boolean" },
//     readonly: { control: "boolean" },
//     required: { control: "boolean" },
//     "data-design-token-target": { table: { disable: true } },
//     name: { table: { disable: true } },
//     listener: { table: { disable: true } },
//   },
//   parameters: {
//     designTokens: {
//       enabled: true,
//       tokenData: checkboxTokensData,
//       componentKey: "checkbox",
//       extractCSSVariablesAtRuntime: true,
//     },
//     layout: 'fullscreen',
//   },
// };