import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Typography,
} from "@mui/material";

import RightNavDefaultExport from "../../../../components/layout/rightnav/index";
import WmNavItem from "../../../../components/navbar/nav-item";
import WmAnchor from "../../../../components/basic/anchor/index";
import WmMenu from "../../../../components/navigation/menu";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import rightnavTokensData from "../../../../designTokens/components/page-right-nav/page-right-nav.json";

const meta: Meta<typeof RightNavDefaultExport> = {
  title: "Layout/RightNav",
  component: RightNavDefaultExport,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

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
    name:"docsRightNav",
    listener:mockListener
  },
  argTypes:{
    name:{table: {disable: true}},
    listener:{table: {disable: true}}
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const helpMenuItems = [
      { label: "Contact Support", icon: "fa fa-life-ring", link: "#support" },
      { label: "Community Forum", icon: "fa fa-comments", link: "#forum" },
    ];

    return (
      <Box>
        {/* Story Heading */}
        <Box px={{ xs: 2, md: 3 }} py={2}>
          <Typography variant="h6" fontWeight={600} textAlign="left">
            Right Nav Showcase
          </Typography>
        </Box>

        <Box display="flex" minHeight="400px">
          {/* Main Content for Minimal Icon Nav */}
          <Box flex={1} p={2} bgcolor="#f5f5f5">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions Panel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Simple right navigation with icons and labels using WmNavItem and WmAnchor components.
            </Typography>
          </Box>

          {/* Minimal Icon Nav */}
          <RightNavDefaultExport name="minimalIconNav" listener={mockListener} columnwidth="2">
            <Box height="100%">
              <Box p={2} borderBottom="1px solid rgba(0,0,0,0.08)">
                <Typography variant="subtitle2" fontWeight={600}>
                  Actions
                </Typography>
              </Box>
              <Box component="nav" className="app-nav nav navbar-nav nav-vertical">
                <WmNavItem name="nav-notifications" listener={mockListener} className="active">
                  <WmAnchor
                    name="nav-notifications-anchor"
                    caption="Notifications"
                    iconclass="fa fa-bell"
                    hyperlink="#notifications"
                    listener={mockListener}
                  />
                </WmNavItem>
                <WmNavItem name="nav-bookmarks" listener={mockListener}>
                  <WmAnchor
                    name="nav-bookmarks-anchor"
                    caption="Bookmarks"
                    iconclass="fa fa-bookmark"
                    hyperlink="#bookmarks"
                    listener={mockListener}
                  />
                </WmNavItem>
                <WmNavItem name="nav-share" listener={mockListener}>
                  <WmAnchor
                    name="nav-share-anchor"
                    caption="Share"
                    iconclass="fa fa-share-alt"
                    hyperlink="#share"
                    listener={mockListener}
                  />
                </WmNavItem>
                <WmNavItem name="nav-settings" listener={mockListener}>
                  <WmAnchor
                    name="nav-settings-anchor"
                    caption="Settings"
                    iconclass="fa fa-cog"
                    hyperlink="#settings"
                    listener={mockListener}
                  />
                </WmNavItem>
              </Box>
            </Box>
          </RightNavDefaultExport>
        </Box>

        {/* Spacer */}
        <Box height={32} />

        <Box display="flex" minHeight="400px">
          {/* Main Content for User Info Panel */}
          <Box flex={1} p={2} bgcolor="#f5f5f5">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Navigation with Dropdown Menus
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Full navigation menu with dropdown support using WmMenu component. Click on "Help" to see the dropdown.
            </Typography>
          </Box>

          {/* User Info Panel */}
          <RightNavDefaultExport name="userInfoPanel" listener={mockListener} columnwidth="4">
            <Box height="100%">
              <Box p={2} borderBottom="1px solid rgba(0,0,0,0.08)">
                <Typography variant="h6" fontWeight={600}>
                  Resources
                </Typography>
              </Box>
              <Box component="nav" className="app-nav nav navbar-nav nav-vertical">
                <WmNavItem name="nav-notifications" listener={mockListener} className="active">
                  <WmAnchor
                    name="nav-notifications-anchor"
                    caption="Notifications"
                    iconclass="fa fa-bell"
                    hyperlink="#notifications"
                    listener={mockListener}
                  />
                </WmNavItem>

                <WmNavItem name="nav-help" listener={mockListener} className="nav-navbar">
                  <WmMenu
                    name="nav-help-menu"
                    caption="Help"
                    iconclass="fa fa-question-circle"
                    type="anchor"
                    dataset={helpMenuItems}
                    menuposition="down,left"
                    menulayout="vertical"
                    autoclose="outsideClick"
                    autoopen="never"
                    listener={mockListener}
                    isFromNav={true}
                  />
                </WmNavItem>

                <WmNavItem name="nav-bookmarks" listener={mockListener}>
                  <WmAnchor
                    name="nav-bookmarks-anchor"
                    caption="Bookmarks"
                    iconclass="fa fa-bookmark"
                    hyperlink="#bookmarks"
                    listener={mockListener}
                  />
                </WmNavItem>

                <WmNavItem name="nav-profile" listener={mockListener}>
                  <WmAnchor
                    name="nav-profile-anchor"
                    caption="Profile"
                    iconclass="fa fa-user"
                    hyperlink="#profile"
                    listener={mockListener}
                  />
                </WmNavItem>
              </Box>
            </Box>
          </RightNavDefaultExport>
        </Box>
      </Box>
    );
  },
  args:{
    name:"showcaseRightnav",
    listener:mockListener
  },
  argTypes:{
    name:{table: {disable: true}},
    listener:{table: {disable: true}} 
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    const contentColumns = 12 - parseInt(args.columnwidth || "3");

    //component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;

    // Menu datasets for dropdowns
    const resourcesMenuItems = [
      { label: "Documentation", icon: "fa fa-file-text", link: "#documentation" },
      { label: "Video Tutorials", icon: "fa fa-video-camera", link: "#tutorials" },
      { label: "API Reference", icon: "fa fa-code", link: "#api" },
    ];

    const helpMenuItems = [
      { label: "Contact Support", icon: "fa fa-life-ring", link: "#support" },
      { label: "Community Forum", icon: "fa fa-comments", link: "#forum" },
    ];

    return (
      <Box style={{ padding: 16, display: "flex", minHeight: "500px" }} data-design-token-target={dataAttr}>
        <Box className={`col-sm-${contentColumns}`} p={3} bgcolor="#fafafa">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Main Content Area
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This is the main content area. Use the right panel to access quick actions, resources, and help.
          </Typography>
          <Box mt={3} p={2} bgcolor="white" borderRadius={1} boxShadow="0 1px 3px rgba(0,0,0,0.1)">
            <Typography variant="body2">
              Try hovering over navigation items to see the hover state design tokens in action.
              Click on "Resources" or "Help" to expand dropdown menus.
            </Typography>
          </Box>
        </Box>

        <RightNavDefaultExport {...componentArgs} listener={mockListener}>
          <Box height="100%">
            {/* Navigation Header */}
            <Box p={2} borderBottom="1px solid rgba(0,0,0,0.08)">
              <Typography variant="h6" fontWeight={600}>
                Quick Access
              </Typography>
            </Box>

            {/* Navigation Items using nav and nav-item */}
            <Box component="nav" className="app-nav nav navbar-nav nav-vertical">
              {/* Notifications - Active */}
              <WmNavItem name="nav-notifications" listener={mockListener} className="active">
                <WmAnchor
                  name="nav-notifications-anchor"
                  caption="Notifications"
                  iconclass="fa fa-bell"
                  hyperlink="#notifications"
                  listener={mockListener}
                />
              </WmNavItem>

              {/* Resources - Menu Dropdown */}
              <WmNavItem name="nav-resources" listener={mockListener} className="nav-navbar">
                <WmMenu
                  name="nav-resources-menu"
                  caption="Resources"
                  iconclass="fa fa-book"
                  type="anchor"
                  dataset={resourcesMenuItems}
                  menuposition="down,left"
                  menulayout="vertical"
                  autoclose="outsideClick"
                  autoopen="never"
                  listener={mockListener}
                  isFromNav={true}
                />
              </WmNavItem>

              {/* Bookmarks */}
              <WmNavItem name="nav-bookmarks" listener={mockListener}>
                <WmAnchor
                  name="nav-bookmarks-anchor"
                  caption="Bookmarks"
                  iconclass="fa fa-bookmark"
                  hyperlink="#bookmarks"
                  listener={mockListener}
                />
              </WmNavItem>

              {/* Help - Menu Dropdown */}
              <WmNavItem name="nav-help" listener={mockListener} className="nav-navbar">
                <WmMenu
                  name="nav-help-menu"
                  caption="Help"
                  iconclass="fa fa-question-circle"
                  type="anchor"
                  dataset={helpMenuItems}
                  menuposition="down,left"
                  menulayout="vertical"
                  autoclose="outsideClick"
                  autoopen="never"
                  listener={mockListener}
                  isFromNav={true}
                />
              </WmNavItem>

              {/* Share */}
              <WmNavItem name="nav-share" listener={mockListener}>
                <WmAnchor
                  name="nav-share-anchor"
                  caption="Share"
                  iconclass="fa fa-share-alt"
                  hyperlink="#share"
                  listener={mockListener}
                />
              </WmNavItem>

              {/* Settings */}
              <WmNavItem name="nav-settings" listener={mockListener}>
                <WmAnchor
                  name="nav-settings-anchor"
                  caption="Settings"
                  iconclass="fa fa-cog"
                  hyperlink="#settings"
                  listener={mockListener}
                />
              </WmNavItem>

              {/* Profile */}
              <WmNavItem name="nav-profile" listener={mockListener}>
                <WmAnchor
                  name="nav-profile-anchor"
                  caption="Profile"
                  iconclass="fa fa-user"
                  hyperlink="#profile"
                  listener={mockListener}
                />
              </WmNavItem>
            </Box>
          </Box>
        </RightNavDefaultExport>
      </Box>
    );
  },
  args: {
    name: "standardRightNav",
    columnwidth: "3",
    "data-design-token-target":true
  },
  argTypes: {
    columnwidth: {
      control: "select",
      options: ["1", "2", "3", "4", "6"],
      description: "Column width for the right nav panel"
    },
    "data-design-token-target": { table: {disable : true} },
    name:{table: {disable: true}},
    listener:{table: {disable: true}}
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: rightnavTokensData,
      componentKey: "aside-right",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};