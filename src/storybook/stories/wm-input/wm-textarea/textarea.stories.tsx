import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button, Chip } from "@mui/material";

import TextareaDefaultExport from "../../../../components/input/textarea/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof TextareaDefaultExport> = {
  title: "Input/Textarea",
  component: TextareaDefaultExport,
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
  const { maxchars, limitdisplaytext, autocapitalize, autofocus } = args;
  const renderkey = `${autocapitalize}-${autofocus}`;
  return (
    <Box style={{ padding: 16 }}>
      <TextareaDefaultExport {...args} listener={mockListener} key={renderkey} />
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
      styling={styling}
    />
  ),
  args:{
    name:"docsTextArea",
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
        {/* Heading */}
        <Typography variant="h6" fontWeight={600}>
          Textarea Showcase
        </Typography>

        {/* RegExp Example */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Regular Expression Validation
          </Typography>

          <TextareaDefaultExport
            name="regexpTextarea"
            placeholder="Only letters, numbers and spaces allowed"
            regexp="^[a-zA-Z0-9\\s]*$"
            listener={mockListener}
          />
        </Box>

        {/* Limit Display Text Types */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Character Limit Display Types
          </Typography>

          <Stack spacing={3}>
            {/* Default format */}
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Default Format
              </Typography>
              <TextareaDefaultExport
                name="limitDefault"
                placeholder="Max 100 characters"
                maxchars={100}
                limitdisplaytext="undefined / 100"
                listener={mockListener}
              />
            </Box>

            {/* Descriptive format */}
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Descriptive Text
              </Typography>
              <TextareaDefaultExport
                name="limitDescriptive"
                placeholder="Max 150 characters"
                maxchars={150}
                limitdisplaytext="Characters used: undefined out of 150"
                listener={mockListener}
              />
            </Box>

            {/* Remaining characters format */}
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Remaining Characters Style
              </Typography>
              <TextareaDefaultExport
                name="limitRemaining"
                placeholder="Max 200 characters"
                maxchars={200}
                limitdisplaytext="Remaining characters: undefined / 200"
                listener={mockListener}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "textareaShowcase",
    listener: mockListener,
  },
  argTypes:{
    name: { table: { disable: true } }, 
    listener: { table: { disable: true } },
  }
};

// Basic Examples
export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardTextarea",
    placeholder: "Enter your text here...",
    listener: mockListener,
    disabled: false,
    readonly: false,
    autofocus: false,
    autocapitalize: false,
    // required: false,
  },
  argTypes: {
    datavalue: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    // required: { control: "boolean" },
    disabled: { control: "boolean" },
    maxchars: { control: "number" },
    autofocus: { control: "boolean" },
    limitdisplaytext: { control: "text" },
    regexp: { control: "text" },
    // updatedelay: { control: "text" },
    // updateon: {
    //   control: { type: "select" },
    //   options: ["keypress", "blur"]
    // },
    autocapitalize: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};