import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import NumberDefaultExport from "../../../../components/input/number/index";
import WmComposite from "../../../../components/input/composite";
import WmLabel from "../../../../components/basic/label";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import formTokensData from "../../../../designTokens/components/form-controls/form-controls.json";

const meta: Meta<typeof NumberDefaultExport> = {
  title: "Input/Number",
  component: NumberDefaultExport,
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

const Template = (args: any) => {
  const {minvalue, maxvalue, decimalplaces, trailingzero, step, inputmode} = args;
  const renderkey = `${minvalue}-${maxvalue}-${decimalplaces}-${trailingzero}-${step}-${inputmode}`;
  return (
    <Box style={{ padding: 16 }}>
      <NumberDefaultExport {...args} listener={mockListener} key={renderkey} />
    </Box>
  );
};

const DesignTokenTemplate = (args: any) => {
  //component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": dataAttr, ...componentArgs } = args;

  return (
    <Box className="wm-app" style={{ padding: 16 }} data-design-token-target={dataAttr}>
       <WmComposite captionposition="left" listener={mockListener} name="numberComposite">
        <WmLabel caption="Number" listener={mockListener} name="numberLabel" className="control-label"/>
        <NumberDefaultExport {...componentArgs} listener={mockListener} />
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
    name:"docsNumber",
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
      <Box style={{ padding: 16 }}>
        <Box sx={{mb: 3}}>
          <Typography variant="h6" fontWeight={600} mb={3}>
            Number Showcase
          </Typography>
        </Box>
        <Stack spacing={4}>
          {/* RegExp Validation */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              RegExp Validation (3-digit numbers only)
            </Typography>
            <NumberDefaultExport
              name="regexpExample"
              placeholder="Enter 3-digit number"
              regexp="[0-9]{3}"
              listener={mockListener}
            />
          </Box>

          {/* Min-Max Value */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Min-Max Values (0-100)
            </Typography>
            <NumberDefaultExport
              name="minMax"
              placeholder="Enter number (0-100)"
              minvalue={0}
              maxvalue={100}
              listener={mockListener}
              inputmode="natural"
            />
          </Box>

          {/* Decimal Values */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Decimal Values (2 decimal places)
            </Typography>
            <NumberDefaultExport
              name="decimalExample"
              placeholder="Enter decimal number"
              decimalplaces={2}
              datavalue={12.34}
              listener={mockListener}
            />
          </Box>

          {/* Step Values */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Step Values (Step: 5)
            </Typography>
            <NumberDefaultExport
              name="stepExample"
              placeholder="Increment by 5"
              step={5}
              listener={mockListener}
            />
          </Box>

          {/* Financial Input Mode */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Financial Input Mode (Positive/Negative)
            </Typography>
            <NumberDefaultExport
              name="financialExample"
              placeholder="Enter amount"
              inputmode="financial"
              decimalplaces={2}
              trailingzero={true}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseNumber",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardNumber",
    placeholder: "Enter number",
    listener: mockListener,
    disabled: false,
    readonly: false,
    inputmode: "natural",
    "data-design-token-target":true,
    required: false,
  },
  argTypes: {
    placeholder: { control: "text" },
    datavalue: { control: "number" },
    step: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    decimalplaces: { control: "number" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    autofocus: { control: "boolean" },
    trailingzero: { control: "boolean" },
    required: { control: "boolean" },
    regexp: { control: "text" },
    inputmode: {
      control: { type: "select" },
      options: ["natural", "financial"],
    },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: formTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "form",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};