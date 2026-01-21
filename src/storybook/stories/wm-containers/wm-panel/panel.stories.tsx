import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import WmPanel, { WmPanelFooter } from "../../../../components/container/panel";
import { iconClassNames } from "../../constants/iconClassConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import panelTokensData from "../../../../designTokens/components/panel/panel.json";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

const meta = {
  title: "Containers/Panel",
  component: WmPanel,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      // styling={styling}
      style={style}
      token={token}
    />
  ),
  args:{
    name:"docsPanel",
    listener:mockListener
  },
  argTypes:{
    name:{table:{disable:true}},
    listener:{table:{disable:true}},
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={4}>
          {/* Main Heading */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Panel Showcase
            </Typography>
          </Box>

          {/* Basic Panel */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}}>
              Basic Panel
            </Typography>
            <WmPanel
              name="basicShowcasePanel"
              title="Welcome"
              className="panel panel-default"
              iconclass="fa fa-home"
              listener={mockListener}
            >
              <Box sx={{ padding: 2 }}>
                <Typography variant="body1">
                  This is a simple panel with a title and icon. It provides a clean container for organizing content.
                </Typography>
              </Box>
            </WmPanel>
          </Box>

          {/* Panel with Badge */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}}>
              Panel with Badge
            </Typography>
            <WmPanel
              name="badgeShowcasePanel"
              title="Notifications"
              className="panel panel-secondary"
              iconclass="fa fa-bell"
              badgevalue="12"
              badgetype="danger"
              listener={mockListener}
            >
              <Box sx={{ padding: 2 }}>
                <Stack spacing={1.5}>
                  <Typography variant="body2">
                    • New message from Sarah Thompson
                  </Typography>
                  <Typography variant="body2">
                    • Project deadline approaching in 2 days
                  </Typography>
                  <Typography variant="body2">
                    • System update completed successfully
                  </Typography>
                </Stack>
              </Box>
            </WmPanel>
          </Box>

          {/* Collapsible Panel */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}}>
              Collapsible Panel
            </Typography>
            <WmPanel
              name="collapsibleShowcasePanel"
              title="Advanced Settings"
              subheading="Configure application preferences"
              className="panel panel-tertiary"
              iconclass="fa fa-cog"
              collapsible={true}
              expanded={true}
              listener={mockListener}
            >
              <Box sx={{ padding: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight={500} gutterBottom>
                      Theme Preference
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Light Mode
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={500} gutterBottom>
                      Language
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      English (US)
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={500} gutterBottom>
                      Time Zone
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      UTC-05:00 (Eastern Time)
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </WmPanel>
          </Box>

          {/* Panel with Footer */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}}>
              Panel with Footer
            </Typography>
            <WmPanel
              name="footerShowcasePanel"
              title="Leave a Comment"
              subheading="Share your thoughts"
              className="panel panel-primary"
              iconclass="fa fa-comment"
              listener={mockListener}
            >
              <>
                <Box sx={{ padding: 2 }}>
                  <textarea
                    placeholder="Write your comment here..."
                    style={{
                      width: "100%",
                      minHeight: "80px",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </Box>
                <WmPanelFooter name="commentFooter">
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      500 characters remaining
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <button
                        style={{
                          padding: "8px 20px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        style={{
                          padding: "8px 20px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Submit
                      </button>
                    </Box>
                  </Box>
                </WmPanelFooter>
              </>
            </WmPanel>
          </Box>

          {/* Warning Panel */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}}>
              Warning Panel
            </Typography>
            <WmPanel
              name="warningShowcasePanel"
              title="Important Notice"
              className="panel panel-warning"
              iconclass="fa fa-exclamation-triangle"
              badgevalue="Action Required"
              badgetype="warning"
              closable={true}
              listener={mockListener}
            >
              <Box sx={{ padding: 2, backgroundColor: "#fff3cd" }}>
                <Typography variant="body1">
                  <strong>Warning:</strong> Your storage space is running low. Please free up some space or upgrade your plan to continue using all features without interruption.
                </Typography>
              </Box>
            </WmPanel>
          </Box>

          {/* Full Featured Panel */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }} style={{marginBottom: 12}}>
              Full Featured Panel
            </Typography>
            <WmPanel
              name="fullFeaturedShowcasePanel"
              title="Dashboard Statistics"
              subheading="Real-time analytics overview"
              className="panel panel-default"
              iconclass="fa fa-chart-line"
              badgevalue="Live"
              badgetype="success"
              collapsible={true}
              enablefullscreen={true}
              expanded={true}
              listener={mockListener}
            >
              <Box sx={{ padding: 2 }}>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 2,
                      backgroundColor: "#e3f2fd",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Users
                      </Typography>
                      <Typography variant="h5" fontWeight={600}>
                        2,847
                      </Typography>
                    </Box>
                    <Box sx={{ fontSize: "36px" }}>👥</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 2,
                      backgroundColor: "#e8f5e9",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Active Sessions
                      </Typography>
                      <Typography variant="h5" fontWeight={600}>
                        1,234
                      </Typography>
                    </Box>
                    <Box sx={{ fontSize: "36px" }}>📊</Box>
                  </Box>
                </Stack>
              </Box>
            </WmPanel>
          </Box>
        </Stack>
      </Box>
    );
  },
  args:{
    name:"showcasePanel",
    listener:mockListener
  },
  argTypes:{
    name:{table:{disable:true}},
    listener:{table:{disable:true}},
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
      //component can't spread data-design-token-target, so we apply it to a wrapper
      const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;

      return(
        <Box style={{ padding: 16, width: "100%" }} data-design-token-target={dataAttr}>
          <WmPanel
              {...componentArgs}
            >
              <>
                {/* Panel Body/Content */}
                <Box sx={{ padding: 2 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Full Name
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        John Doe
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Email Address
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        john.doe@example.com
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Role
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        Administrator
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Account Status
                      </Typography>
                      <Typography variant="body1" fontWeight={500} color="success.main">
                        Active
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Panel Footer */}
                <WmPanelFooter name="standardPanelFooter">
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: 2 hours ago
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <button
                        style={{
                          padding: "8px 20px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        style={{
                          padding: "8px 20px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Save Changes
                      </button>
                    </Box>
                  </Box>
                </WmPanelFooter>
              </>
            </WmPanel>
        </Box>
    );
  },
  args: {
    name: "basicPanel",
    title: "User Information",
    subheading: "View and manage user details",
    className: "panel panel-default",
    iconclass: "fa fa-user",
    badgevalue: "Active",
    badgetype: "success",
    collapsible: true,
    expanded: true,
    listener: mockListener,
    closable: false,
    enablefullscreen: false,
    "data-design-token-target":true
  },
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    className: {
      control: { type: "select" },
      options: [
        "panel panel-default",
        "panel panel-secondary",
        "panel panel-primary",
        "panel panel-tertiary",
      ],
    },
    badgetype: {
      control: { type: "select" },
      options: ["default", "success", "primary", "info", "warning", "danger"],
    },
    collapsible: { control: "boolean" },
    closable: { control: "boolean" },
    expanded: { control: "boolean" },
    enablefullscreen: { control: "boolean" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    "data-design-token-target": { table: { disable: true }},
    name:{ table: { disable: true }},
    listener:{ table: { disable: true }},
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: panelTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "panel",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

// export const Basic: Story = {
//   tags: ['show-panel'],
//   args: {
//     name: "basicPanel",
//     title: "User Information",
//     subheading: "View and manage user details",
//     className: "panel panel-default",
//     iconclass: "fa fa-user",
//     badgevalue: "Active",
//     badgetype: "success",
//     collapsible: true,
//     expanded: true,
//     listener: mockListener,
//     closable: false,
//     enablefullscreen: false,
//     children: (
//       <Box sx={{ padding: 3 }}>
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               Full Name
//             </Typography>
//             <Typography variant="body1" fontWeight={500}>
//               John Doe
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               Email Address
//             </Typography>
//             <Typography variant="body1" fontWeight={500}>
//               john.doe@example.com
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               Role
//             </Typography>
//             <Typography variant="body1" fontWeight={500}>
//               Administrator
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               Account Status
//             </Typography>
//             <Typography variant="body1" fontWeight={500} color="success.main">
//               Active
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
//   argTypes: {
//     title: { control: "text" },
//     subheading: { control: "text" },
//     className: {
//       control: { type: "select" },
//       options: [
//         "panel panel-default",
//         "panel panel-secondary",
//         "panel panel-primary",
//         "panel panel-tertiary",
//       ],
//     },
//     badgetype: {
//       control: { type: "select" },
//       options: ["default", "success", "primary", "info", "warning", "danger"],
//     },
//     collapsible: { control: "boolean" },
//     closable: { control: "boolean" },
//     expanded: { control: "boolean" },
//     enablefullscreen: { control: "boolean" },
//     iconclass:{ control:{ type:"select"}, options: iconClassNames },
//   }
// };
