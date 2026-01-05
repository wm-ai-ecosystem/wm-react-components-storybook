import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import AnchorDefaultExport from "../../../../components/basic/anchor/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

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
        "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-github"],
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

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicAnchor",
    listener: mockListener,
    caption: "Click Me",
    hyperlink: "https://www.wavemaker.com",
    target: "_blank",
    className:"link-default"
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Anchor Showcase
          </Typography>

          {/* Row 1: Basic / Icon / Badge */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Common Variants
            </Typography>

            <Stack
              direction="row"
              spacing={4}
              sx={{ flexWrap: "wrap", alignItems: "center" }}
            >
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Basic
                </Typography>
                <AnchorDefaultExport
                  name="basic"
                  caption="Click Me"
                  hyperlink="https://www.wavemaker.com"
                  target="_blank"
                  listener={mockListener}
                  className="link-primary"
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  With Icon
                </Typography>
                <AnchorDefaultExport
                  name="withIcon"
                  caption="Github Url"
                  hyperlink="https://www.wavemaker.com"
                  target="_blank"
                  listener={mockListener}
                  className="link-info"
                  iconclass="fa fa-github"
                  iconposition="left"
                  iconwidth="16px"
                  iconheight="16px"
                  iconmargin="0 8px 0 0"
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  With Badge
                </Typography>
                <AnchorDefaultExport
                  name="withBadge"
                  caption="Notifications"
                  hyperlink="https://www.wavemaker.com"
                  target="_blank"
                  listener={mockListener}
                  className="link-warning"
                  iconclass="fa fa-bell"
                  iconposition="left"
                  iconwidth="16px"
                  iconheight="16px"
                  iconmargin="0 8px 0 0"
                  badgevalue="5"
                />
              </Stack>
            </Stack>
          </Stack>

          {/* Row 2: Variants Grid */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Style Variants
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 3,
                maxWidth: 900,
              }}
            >
              <AnchorDefaultExport
                name="primary"
                caption="Primary Link"
                hyperlink="https://www.wavemaker.com"
                target="_blank"
                listener={mockListener}
                className="link-primary"
              />
              <AnchorDefaultExport
                name="secondary"
                caption="Secondary Link"
                hyperlink="https://www.wavemaker.com"
                target="_blank"
                listener={mockListener}
                className="link-secondary"
              />
              <AnchorDefaultExport
                name="danger"
                caption="Danger Link"
                hyperlink="https://www.wavemaker.com"
                target="_blank"
                listener={mockListener}
                className="link-danger"
              />
              <AnchorDefaultExport
                name="muted"
                caption="Muted Link"
                hyperlink="https://www.wavemaker.com"
                target="_blank"
                listener={mockListener}
                className="link-muted"
              />
              <AnchorDefaultExport
                name="warning"
                caption="Warning Link"
                hyperlink="https://www.wavemaker.com"
                target="_blank"
                listener={mockListener}
                className="link-warning"
              />
              <AnchorDefaultExport
                name="info"
                caption="Info Link"
                hyperlink="https://www.wavemaker.com"
                target="_blank"
                listener={mockListener}
                className="link-info"
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseAnchors",
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