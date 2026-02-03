import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import TextDefaultExport from "../../../../components/input/text/index";
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

const meta: Meta<typeof TextDefaultExport> = {
  title: "Input/Text",
  component: TextDefaultExport,
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
  const { type, maxchars, minvalue, maxvalue, step, autocomplete, autotrim, autocapitalize } = args;
  const renderkey = `${type}-${maxchars || ""}-${minvalue || ""}-${maxvalue || ""}-${step || ""}-${autocomplete ? "a" : "na"}-${autotrim ? "t" : "nt"}-${autocapitalize || "none"}`;

  return ( 
    <Box style={{ padding: 16 }}>
      <TextDefaultExport {...args} listener={mockListener} key={renderkey} />
    </Box>
  );
};

const DesignTokenTemplate = (args: any) => {
  //component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": dataAttr, ...componentArgs } = args;

  return (
    <Box className="wm-app" style={{ padding: 16 }} data-design-token-target={dataAttr}>
       <WmComposite captionposition="left" listener={mockListener} name="textComposite">
       <WmLabel caption="Text" listener={mockListener} name="textLabel" className="control-label"/>
      <TextDefaultExport {...componentArgs} listener={mockListener} />
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
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14259&p=f&t=TmoXZ4j5uVxcseDO-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsText",
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
  render: () => (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        {/* Main Heading */}
        <Typography variant="h6" fontWeight={600}>
          Text Input Showcase
        </Typography>

        {/* Text Type Examples */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Text Type Examples
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Email Input
              </Typography>
              <TextDefaultExport
                name="emailText"
                placeholder="Enter email address"
                type="email"
                listener={mockListener}
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Password Input
              </Typography>
              <TextDefaultExport
                name="passwordText"
                placeholder="Enter password"
                type="password"
                listener={mockListener}
              />
            </Box>
          </Stack>
        </Box>

        {/* RegExp Validation */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Regular Expression Validation
          </Typography>

          <Box>
            <Typography variant="caption" mb={1}>
              Alphanumeric Only
            </Typography>
            <TextDefaultExport
              name="regexpText"
              placeholder="Only letters and numbers"
              regexp="^[a-zA-Z0-9]+$"
              listener={mockListener}
            />
          </Box>
        </Box>

        {/* Display Format */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Display Format
          </Typography>

          <Box>
            <Typography variant="caption" mb={1}>
              SSN Format (XXX-XX-XXXX)
            </Typography>
            <TextDefaultExport
              name="displayFormatText"
              placeholder="Enter SSN"
              displayformat="999-99-9999"
              showdisplayformaton="keypress"
              maxchars={9}
              listener={mockListener}
            />
          </Box>
        </Box>

        {/* Max Characters */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Character Limit
          </Typography>

          <Box>
            <Typography variant="caption" mb={1}>
              Max 10 Characters
            </Typography>
            <TextDefaultExport
              name="maxCharsText"
              placeholder="Maximum 10 characters"
              maxchars={10}
              listener={mockListener}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "textShowcase",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};

// Basic Examples
export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardText",
    placeholder: "Enter text",
    listener: mockListener,
    disabled: false,
    readonly: false,
    type: "text",
    autocapitalize: "none",
    autotrim: true,
    autofocus: false,
    maxchars: 40,
    required: false,
    "data-design-token-target":true,
  },
  argTypes: {
    datavalue: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["text", "email", "number", "password", "tel", "url"]
    },
    // floatinglabel: { control: "boolean" },
    autocomplete: { control: "boolean" },
    autofocus: { control: "boolean" },
    autotrim: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    maxchars: { control: "number" },
    // minvalue: { control: "number" },
    // maxvalue: { control: "number" },
    step: { control: "number" },
    // displayformat: { control: "text" },
    // showdisplayformaton: {
    //   control: { type: "select" },
    //   options: ["keypress", "blur"]
    // },
    regexp: { control: "text" },
    autocapitalize: {
      control: { type: "select" },
      options: ["none", "sentence", "words"]
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