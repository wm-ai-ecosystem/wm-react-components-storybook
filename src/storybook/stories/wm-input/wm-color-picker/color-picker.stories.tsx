import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import ColorPickerDefaultExport from "../../../../components/input/color-picker/index";
import WmComposite from "../../../../components/input/composite";
import WmLabel from "../../../../components/basic/label";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import colorPickerTokensData from "../../../../designTokens/components/color-picker/color-picker.json";

const meta: Meta<typeof ColorPickerDefaultExport> = {
  title: "Input/ColorPicker",
  component: ColorPickerDefaultExport,
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
  <Box style={{ padding: 16, minHeight: "400px" }}>
    <ColorPickerDefaultExport {...args} listener={mockListener} />
  </Box>
);

const DesignTokenTemplate = (args: any) => {
    //component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;

    return (
      <Box className="wm-app" style={{ padding: 16 }} data-design-token-target={dataAttr}>
        <WmComposite captionposition="left" listener={mockListener} name="colorComposite">
          <WmLabel caption="Color" listener={mockListener} name="colorLabel" className="control-label"/>
          <ColorPickerDefaultExport {...componentArgs} listener={mockListener} />
        </WmComposite>
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
    />
  ),
  args:{
    name: "docsColorPicker",
    listener: mockListener
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
      <Box style={{ padding: 16, minHeight: "600px" }}>
        <Box sx={{mb: 3}}>
        <Typography variant="h6" fontWeight={600}>
          Supported Color Formats
        </Typography>
        </Box>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              HEX Format (6 digits): #FF5733
            </Typography>
            <ColorPickerDefaultExport
              name="hexFormat"
              datavalue="#FF5733"
              placeholder="HEX color"
              listener={mockListener}
              autoclose="always"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              RGB Format: rgb(52, 152, 219)
            </Typography>
            <ColorPickerDefaultExport
              name="rgbFormat"
              datavalue="rgb(52, 152, 219)"
              placeholder="RGB color"
              listener={mockListener}
              autoclose="always"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              RGBA Format: rgba(46, 204, 113, 0.7)
            </Typography>
            <ColorPickerDefaultExport
              name="rgbaFormat"
              datavalue="rgba(46, 204, 113, 0.7)"
              placeholder="RGBA color"
              listener={mockListener}
              autoclose="always"
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseColorPicker",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardColorPicker",
    listener: mockListener,
    placeholder: "Select a color",
    datavalue: "",
    autoclose: "always",
    "data-design-token-target": true
  },
  argTypes: {
    autoclose: {
      control: { type: "select" },
      options: ["always", "outsideClick", "disabled"],
    },
    datavalue: { control: "color" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    show: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } }  
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: colorPickerTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "color-picker",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

// export const AutocloseOutsideClick: Story = {
//   tags: ['show-panel'],
//   render: Template,
//   args: {
//     name: "autocloseOutside",
//     listener: mockListener,
//     placeholder: "Closes on outside click",
//     datavalue: "#2ECC71",
//     autoclose: "outsideClick",
//   },
//   argTypes: {
//     autoclose: {
//       control: { type: "select" },
//       options: ["always", "outsideClick", "disabled"],
//     },
//     datavalue: { control: "text" },
//     placeholder: { control: "text" },
//     name: { table: { disable: true } },
//     listener: { table: { disable: true } },
//   },
// };