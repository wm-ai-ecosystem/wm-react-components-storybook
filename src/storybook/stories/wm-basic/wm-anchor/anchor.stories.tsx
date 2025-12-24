import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import AnchorDefaultExport from "../../../../components/basic/anchor/index";

const meta = {
  title: "Basic/Anchor",
  component: AnchorDefaultExport,
   args:{
    name:"",
    caption:"",
    hyperlink:"",
    className:"",
    iconclass:""
  },
  argTypes: {
    caption: { control: "text" },
    hyperlink: { control: "text" },
    target: {
      control: { type: "select" },
      options: ["_self", "_blank", "_parent", "_top"],
    },
    className: {
      control: {
        type: "select",
      },
      options: ["link-primary", "link-secondary", "link-success", "link-danger", "link-warning", "link-info","link-muted","link-default"],
    },
    iconclass:{
      control:{
        type:"select"
      },
      options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
        "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart",],
    },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right", "top"],
    },
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    // shortcutkey: { control: "text" },
    // arialabel: { control: "text" },
    // encodeurl: { control: "boolean" },
  },
} satisfies Meta<typeof AnchorDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "",
  },
  Widgets: {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <AnchorDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicAnchor",
    listener: mockListener,
    caption: "Click Me",
    hyperlink: "https://www.wavemaker.com",
    target: "_blank",
    className:"link-muted"
  },
};

export const WithIcon: Story = {
  render: Template,
  args: {
    name: "anchorWithIcon",
    listener: mockListener,
    caption: "Anchor with icon",
    hyperlink: "https://www.wavemaker.com",
    target: "_blank",
    className:"link-primary",
    iconclass: "fa fa-anchor",
    iconposition: "left",
    iconwidth: "16px",
    iconheight: "16px",
    iconmargin: "0 8px 0 0"
  },
};  

export const WithBadge: Story = {
  render: Template,
  args: {
    name: "anchorWithBadge",
    listener: mockListener,
    caption: "Anchor with icon",
    hyperlink: "https://www.wavemaker.com",
    target: "_blank",
    className:"link-primary",
    iconclass: "fa fa-anchor",
    iconposition: "left",
    iconwidth: "16px",
    iconheight: "16px",
    iconmargin: "0 8px 0 0",
    badgevalue: "5",
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Navigation Links:</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
            <AnchorDefaultExport
              name="home"
              caption="Home"
              hyperlink="https://www.wavemaker.com"
              target="_blank"
              listener={mockListener}
              className="link-primary"
            />
            <AnchorDefaultExport
              name="about"
              caption="About"
              hyperlink="https://www.wavemaker.com"
              target="_blank"
              listener={mockListener}
              className="link-primary"
            />
            <AnchorDefaultExport
              name="services"
              caption="Services"
              hyperlink="https://www.wavemaker.com"
              target="_blank"
              listener={mockListener}
              className="link-primary"
            />
            <AnchorDefaultExport
              name="contact"
              caption="Contact"
              hyperlink="https://www.wavemaker.com"
              target="_blank"
              listener={mockListener}
              className="link-primary"
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

// export const UnderlinedLink: Story = {
//   render: Template,
//   args: {
//     name: "underlinedLink",
//     listener: mockListener,
//     caption: "Underlined Link",
//     hyperlink: "https://example.com",
//     target: "_blank",
//     styles: {
//       color: "#0066cc",
//       textDecoration: "underline",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: "600",
//     },
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     caption: "Help Documentation",
//     hyperlink: "https://docs.example.com",
//     target: "_blank",
//     hint: "Opens help documentation in a new tab",
//     styles: {
//       color: "#0066cc",
//       textDecoration: "underline",
//       cursor: "pointer",
//     },
//   },
// };

// export const ButtonStyleLink: Story = {
//   render: Template,
//   args: {
//     name: "buttonStyleLink",
//     listener: mockListener,
//     caption: "Action Button",
//     hyperlink: "www.example.com",
//     target: "_blank",
//     styles: {
//       backgroundColor: "#28a745",
//       color: "white",
//       padding: "10px 16px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       textDecoration: "none",
//       fontSize: "14px",
//       fontWeight: "500",
//       display: "inline-block",
//     },
//   },
// };