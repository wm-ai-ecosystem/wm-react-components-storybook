import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import AnchorDefaultExport from "../../../components/basic/anchor/index";

const meta = {
  title: "Basic/Anchor",
  component: AnchorDefaultExport,
  argTypes: {
    caption: { control: "text" },
    hyperlink: { control: "text" },
    target: {
      control: { type: "select" },
      options: ["_self", "_blank", "_parent", "_top"],
    },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right", "top"],
    },
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    shortcutkey: { control: "text" },
    arialabel: { control: "text" },
    encodeurl: { control: "boolean" },
  },
} satisfies Meta<typeof AnchorDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <AnchorDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Default: Story = {
  render: Template,
  args: {
    name: "anchor1",
    listener: mockListener,
    caption: "Click me",
    hyperlink: "https://example.com",
    target: "_self",
  },
};

export const ExternalLink: Story = {
  render: Template,
  args: {
    name: "externalLink",
    listener: mockListener,
    caption: "Visit Example.com",
    hyperlink: "https://example.com",
    target: "_blank",
    styles: {
      color: "#0066cc",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
};

export const UnderlinedLink: Story = {
  render: Template,
  args: {
    name: "underlinedLink",
    listener: mockListener,
    caption: "Underlined Link",
    hyperlink: "https://example.com",
    target: "_blank",
    styles: {
      color: "#0066cc",
      textDecoration: "underline",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
    },
  },
};

export const WithHint: Story = {
  render: Template,
  args: {
    name: "withHint",
    listener: mockListener,
    caption: "Help Documentation",
    hyperlink: "https://docs.example.com",
    target: "_blank",
    hint: "Opens help documentation in a new tab",
    styles: {
      color: "#0066cc",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
};

export const ButtonStyleLink: Story = {
  render: Template,
  args: {
    name: "buttonStyleLink",
    listener: mockListener,
    caption: "Action Button",
    hyperlink: "www.example.com",
    target: "_blank",
    styles: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "10px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
      display: "inline-block",
    },
  },
};

export const LinkGroup: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Navigation Links:</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
            <AnchorDefaultExport
              name="home"
              caption="Home"
              hyperlink="/"
              target="_self"
              listener={mockListener}
              styles={{
                color: "#0066cc",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            />
            <AnchorDefaultExport
              name="about"
              caption="About"
              hyperlink="/about"
              target="_self"
              listener={mockListener}
              styles={{
                color: "#0066cc",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            />
            <AnchorDefaultExport
              name="services"
              caption="Services"
              hyperlink="/services"
              target="_self"
              listener={mockListener}
              styles={{
                color: "#0066cc",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            />
            <AnchorDefaultExport
              name="contact"
              caption="Contact"
              hyperlink="/contact"
              target="_self"
              listener={mockListener}
              styles={{
                color: "#0066cc",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            />
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "linkGroup",
    listener: mockListener,
  },
};

