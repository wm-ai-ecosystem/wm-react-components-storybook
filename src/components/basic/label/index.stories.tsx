import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import LabelDefaultExport, { WmLabel as RawWmLabel } from "./index";

const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const meta = {
  title: "Components/Basic/Label",
  component: LabelDefaultExport,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
    },
    required: { control: "boolean" },
    trustAs: { control: "boolean" },
    caption: { control: "text" },
  },
} satisfies Meta<typeof LabelDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <LabelDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Default: Story = {
  render: Template,
  args: {
    name: "label1",
    listener: mockListener,
    caption: "Label",
    required: false,
    trustAs: false,
    type: "p",
  },
};

export const Required: Story = {
  render: Template,
  args: {
    name: "requiredLabel",
    listener: mockListener,
    caption: "Full Name",
    required: true,
    type: "p",
  },
};

export const Heading: Story = {
  render: Template,
  args: {
    name: "headingLabel",
    listener: mockListener,
    caption: "Section Heading",
    type: "h2",
  },
};

export const WithLinks: Story = {
  render: Template,
  args: {
    name: "labelWithLinks",
    listener: mockListener,
    caption: "Visit [Example](https://example.com) or [Docs](https://example.com/docs)",
    trustAs: false,
  },
};

export const TrustAsHTML: Story = {
  render: Template,
  args: {
    name: "htmlLabel",
    listener: mockListener,
    caption: "<strong>Bold label</strong> with <em>HTML</em>",
    trustAs: true,
  },
};

// Demonstrate using the raw, unwrapped component (if someone wants to test the inner component directly)
export const RawComponent: Story = {
  render: (args) => (
    <Box style={{ padding: 16 }}>
      <RawWmLabel {...args} listener={mockListener} />
    </Box>
  ),
  args: {
    name: "rawLabel",
    listener: mockListener,
    caption: "Raw Test component Label",
    type: "p",
  },
};
