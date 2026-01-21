import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Typography,
} from "@mui/material";

import LeftNavDefaultExport from "../../../../components/layout/leftnav/index";
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

import leftnavTokensData from "../../../../designTokens/components/page-left-nav/page-left-nav.json";

const meta: Meta<typeof LeftNavDefaultExport> = {
  title: "Layout/LeftNav",
  component: LeftNavDefaultExport,
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
    name:"docsLeftNav",
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
    const projectsMenuItems = [
      { label: "Active Projects", icon: "fa fa-folder-open", link: "#active-projects" },
      { label: "Archived", icon: "fa fa-archive", link: "#archived" },
      { label: "Templates", icon: "fa fa-file", link: "#templates" },
    ];

    return (
      <Box>
        {/* Story Heading */}
        <Box px={{ xs: 2, md: 3 }} py={2}>
          <Typography variant="h6" fontWeight={600} textAlign="left">
            Left Nav Showcase
          </Typography>
        </Box>

        <Box display="flex" minHeight="400px">
          {/* Minimal Icon Nav */}
          <LeftNavDefaultExport name="minimalIconNav" listener={mockListener} columnwidth="2">
            <Box height="100%">
              <Box p={2} borderBottom="1px solid rgba(0,0,0,0.08)">
                <Typography variant="subtitle2" fontWeight={600}>
                  Nav
                </Typography>
              </Box>
              <Box component="nav" className="app-nav nav navbar-nav nav-vertical">
                <WmNavItem name="nav-home" listener={mockListener} className="active">
                  <WmAnchor
                    name="nav-home-anchor"
                    caption="Home"
                    iconclass="fa fa-home"
                    hyperlink="#home"
                    listener={mockListener}
                  />
                </WmNavItem>
                <WmNavItem name="nav-search" listener={mockListener}>
                  <WmAnchor
                    name="nav-search-anchor"
                    caption="Search"
                    iconclass="fa fa-search"
                    hyperlink="#search"
                    listener={mockListener}
                  />
                </WmNavItem>
                <WmNavItem name="nav-notifications" listener={mockListener}>
                  <WmAnchor
                    name="nav-notifications-anchor"
                    caption="Notifications"
                    iconclass="fa fa-bell"
                    hyperlink="#notifications"
                    listener={mockListener}
                  />
                </WmNavItem>
                <WmNavItem name="nav-messages" listener={mockListener}>
                  <WmAnchor
                    name="nav-messages-anchor"
                    caption="Messages"
                    iconclass="fa fa-envelope"
                    hyperlink="#messages"
                    listener={mockListener}
                  />
                </WmNavItem>
              </Box>
            </Box>
          </LeftNavDefaultExport>

          {/* Main Content for Minimal Icon Nav */}
          <Box flex={1} p={2} bgcolor="#f5f5f5">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Minimal Navigation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Simple navigation with icons and labels using WmNavItem and WmAnchor components.
            </Typography>
          </Box>
        </Box>

        {/* Spacer */}
        <Box height={32} />

        <Box display="flex" minHeight="400px">
          {/* Navigation with Dropdowns */}
          <LeftNavDefaultExport name="collapsibleMenu" listener={mockListener} columnwidth="4">
            <Box height="100%">
              <Box p={2} borderBottom="1px solid rgba(0,0,0,0.08)">
                <Typography variant="h6" fontWeight={600}>
                  Full Menu
                </Typography>
              </Box>
              <Box component="nav" className="app-nav nav navbar-nav nav-vertical">
                <WmNavItem name="nav-dashboard" listener={mockListener} className="active">
                  <WmAnchor
                    name="nav-dashboard-anchor"
                    caption="Dashboard"
                    iconclass="fa fa-dashboard"
                    hyperlink="#dashboard"
                    listener={mockListener}
                  />
                </WmNavItem>

                <WmNavItem name="nav-projects" listener={mockListener} className="nav-navbar">
                  <WmMenu
                    name="nav-projects-menu"
                    caption="Projects"
                    iconclass="fa fa-folder"
                    type="anchor"
                    dataset={projectsMenuItems}
                    menuposition="down,right"
                    menulayout="vertical"
                    autoclose="outsideClick"
                    autoopen="never"
                    listener={mockListener}
                    isFromNav={true}
                  />
                </WmNavItem>

                <WmNavItem name="nav-analytics" listener={mockListener}>
                  <WmAnchor
                    name="nav-analytics-anchor"
                    caption="Analytics"
                    iconclass="fa fa-chart-bar"
                    hyperlink="#analytics"
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
          </LeftNavDefaultExport>

          {/* Main Content for Collapsible Menu */}
          <Box flex={1} p={2} bgcolor="#f5f5f5">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Navigation with Dropdown Menus
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Full navigation menu with dropdown support using WmMenu component. Click on "Projects" to see the dropdown.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  args:{
    name:"showcaseHeader",
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
    const projectsMenuItems = [
      { label: "Active Projects", icon: "fa fa-folder-open", link: "#active-projects" },
      { label: "Archived", icon: "fa fa-archive", link: "#archived" },
      { label: "Templates", icon: "fa fa-file", link: "#templates" },
    ];

    const teamMenuItems = [
      { label: "Members", icon: "fa fa-users", link: "#members" },
      { label: "Roles & Permissions", icon: "fa fa-key", link: "#roles" },
    ];

    return (
      <Box style={{ padding: 16, display: "flex", minHeight: "500px" }} data-design-token-target={dataAttr}>
        <LeftNavDefaultExport {...componentArgs} listener={mockListener}>
          <Box height="100%">
            {/* Navigation Header */}
            <Box p={2} borderBottom="1px solid rgba(0,0,0,0.08)">
              <Typography variant="h6" fontWeight={600}>
                App Menu
              </Typography>
            </Box>

            {/* Navigation Items using nav and nav-item */}
            <Box component="nav" className="app-nav nav navbar-nav nav-vertical">
              {/* Dashboard - Active */}
              <WmNavItem name="nav-dashboard" listener={mockListener} className="active">
                <WmAnchor
                  name="nav-dashboard-anchor"
                  caption="Dashboard"
                  iconclass="fa fa-dashboard"
                  hyperlink="#dashboard"
                  listener={mockListener}
                />
              </WmNavItem>

              {/* Projects - Menu Dropdown */}
              <WmNavItem name="nav-projects" listener={mockListener} className="nav-navbar">
                <WmMenu
                  name="nav-projects-menu"
                  caption="Projects"
                  iconclass="fa fa-folder"
                  type="anchor"
                  dataset={projectsMenuItems}
                  menuposition="down,right"
                  menulayout="vertical"
                  autoclose="outsideClick"
                  autoopen="never"
                  listener={mockListener}
                  isFromNav={true}
                />
              </WmNavItem>

              {/* Team - Menu Dropdown */}
              <WmNavItem name="nav-team" listener={mockListener} className="nav-navbar">
                <WmMenu
                  name="nav-team-menu"
                  caption="Team"
                  iconclass="fa fa-users"
                  type="anchor"
                  dataset={teamMenuItems}
                  menuposition="down,right"
                  menulayout="vertical"
                  autoclose="outsideClick"
                  autoopen="never"
                  listener={mockListener}
                  isFromNav={true}
                />
              </WmNavItem>

              {/* Analytics */}
              <WmNavItem name="nav-analytics" listener={mockListener}>
                <WmAnchor
                  name="nav-analytics-anchor"
                  caption="Analytics"
                  iconclass="fa fa-chart-bar"
                  hyperlink="#analytics"
                  listener={mockListener}
                />
              </WmNavItem>

              {/* Calendar */}
              <WmNavItem name="nav-calendar" listener={mockListener}>
                <WmAnchor
                  name="nav-calendar-anchor"
                  caption="Calendar"
                  iconclass="fa fa-calendar"
                  hyperlink="#calendar"
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
            </Box>
          </Box>
        </LeftNavDefaultExport>

        <Box className={`col-sm-${contentColumns}`} p={3} bgcolor="#fafafa">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Main Content Area
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This is the main content area. Navigate using the left panel to see different sections.
          </Typography>
          <Box mt={3} p={2} bgcolor="white" borderRadius={1} boxShadow="0 1px 3px rgba(0,0,0,0.1)">
            <Typography variant="body2">
              Try hovering over navigation items to see the hover state design tokens in action.
              Click on "Projects" or "Team" to expand dropdown menus.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  args: {
    name: "standardLeftNav",
    columnwidth: "3",
    navheight: "full",
    "data-design-token-target":true
  },
  argTypes: {
    columnwidth: {
      control: "select",
      options: ["1", "2", "3", "4", "6"],
      description: "Column width for the left nav panel"
    },
    navheight: {
      control: "select",
      options: ["full", "auto"],
      description: "Height of the navigation panel"
    },
    // navtype: { control: "select", options:["pills", "tabs"] },
    "data-design-token-target": { table: {disable: true} },
    name:{table: {disable: true}},
    listener:{table: {disable: true}}
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: leftnavTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "aside-left",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};