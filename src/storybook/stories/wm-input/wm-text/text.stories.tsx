import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import TextDefaultExport from "../../../../components/input/text/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof TextDefaultExport> = {
  title: "Input/Text",
  component: TextDefaultExport,
  argTypes: {
    datavalue: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["text", "email", "number", "password", "tel", "url"]
    },
    // floatinglabel: { control: "boolean" },
    // autocomplete: { control: "text" },
    autofocus: { control: "boolean" },
    autotrim: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    maxchars: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    step: { control: "number" },
    displayformat: { control: "text" },
    showdisplayformaton: {
      control: { type: "select" },
      options: ["keypress", "blur"]
    },
    // updateon: {
    //   control: { type: "select" },
    //   options: ["keypress", "blur"]
    // },
    // updatedelay: { control: "text" },
    regexp: { control: "text" },
    // arialabel: { control: "text" },
    // tabindex: { control: "number" },
    // shortcutkey: { control: "text" },
    autocapitalize: {
      control: { type: "select" },
      options: ["none", "sentence", "words"]
    },
    // hint: { control: "text" },
    // width: { control: "text" },
    // height: { control: "text" },
    // className: { control: "text" },
  },
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
    <TextDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      styling={styling}
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Basic Examples
export const Basic: Story = {
  render: Template,
  args: {
    name: "basicText",
    placeholder: "Enter text",
    listener: mockListener,
    disabled: false,
    readonly: false,
    type: "text",
    autocapitalize: "none",
    autotrim: true,
    autofocus: false,
    required: false,
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        {/* Main Heading */}
        <Typography variant="h6" fontWeight={600}>
          Text Input Types
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
              Max 20 Characters
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
};


// export const RegExp: Story = {
//   render: Template,
//   args: {
//     name: "regexpText",
//     placeholder: "Enter alphanumeric only",
//     regexp: "^[a-zA-Z0-9]+$",
//     listener: mockListener,
//     autocapitalize: "none",
//     autotrim: true,
//     autofocus: false,
//     required: false,
//   },
// };

// // Type Variations
// export const TextType: Story = {
//   render: Template,
//   args: {
//     name: "textType",
//     placeholder: "Select type and see behavior",
//     type: "text",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     autocapitalize: "none",
//     autotrim: true,
//     autofocus: false,
//     required: false,
//   },
// };

// // Display Format Examples
// export const displayFormat: Story = {
//   render: Template,
//   args: {
//     name: "displayFormatText",
//     placeholder: "Enter SSN",
//     displayformat: "999-99-9999",
//     showdisplayformaton: "keypress",
//     maxchars: 9,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     type: "text",
//     autocapitalize: "none",
//     autotrim: true,
//     autofocus: false,
//     required: false,
//   },
// };

// export const Autocapitalize: Story = {
//   render: Template,
//   args: {
//     name: "autocapText",
//     placeholder: "First Letter Of Each Word Capitalized",
//     autocapitalize: "words",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//     type: "text",
//     autotrim: true,
//     autofocus: false,
//     required: false,
//   },
// };

// export const MaxChars: Story = {
//   render: Template,
//   args: {
//     name: "maxCharsText",
//     placeholder: "Maximum 20 characters",
//     maxchars: 20,
//     listener: mockListener,
//     autocapitalize: "none",
//     autotrim: true,
//     autofocus: false,
//     required: false,
//   },
// };

// export const EmailType: Story = {
//   render: Template,
//   args: {
//     name: "emailType",
//     placeholder: "Enter email address",
//     type: "email",
//     listener: mockListener,
//   },
// };

// export const NumberType: Story = {
//   render: Template,
//   args: {
//     name: "numberType",
//     placeholder: "Enter number",
//     type: "number",
//     listener: mockListener,
//   },
// };

// export const PasswordType: Story = {
//   render: Template,
//   args: {
//     name: "passwordType",
//     placeholder: "Enter password",
//     type: "password",
//     listener: mockListener,
//   },
// };

// export const TelType: Story = {
//   render: Template,
//   args: {
//     name: "telType",
//     placeholder: "Enter phone number",
//     type: "tel",
//     listener: mockListener,
//   },
// };

// export const UrlType: Story = {
//   render: Template,
//   args: {
//     name: "urlType",
//     placeholder: "Enter URL",
//     type: "url",
//     listener: mockListener,
//   },
// };
