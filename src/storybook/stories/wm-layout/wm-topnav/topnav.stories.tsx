import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";

import TopNavDefaultExport from "../../../../components/layout/topnav/index";
import HeaderDefaultExport from "../../../../components/layout/header/index";
import WmNavbar from "../../../../components/navbar/index";
import WmNavItem from "../../../../components/navbar/nav-item";
import WmAnchor from "../../../../components/basic/anchor/index";
import WmMenu from "../../../../components/navigation/menu";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import topnavTokensData from "../../../../designTokens/components/page-top-nav/page-top-nav.json";

const meta: Meta<typeof TopNavDefaultExport> = {
  title: "Layout/TopNav",
  component: TopNavDefaultExport,
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
      token={token}
    />
  ),
  args:{
    name:"docsTopnav",
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
      <Box width="100%">
        {/* Showcase Heading */}
        <Box px={{ xs: 2, md: 3 }} py={2}>
          <Typography variant="h6" fontWeight={600} textAlign="left">
            TopNav Showcase
          </Typography>
        </Box>

        {/* Header + TopNav Example 1 */}
        <Box mb={4} width="100%">
          <Box px={{ xs: 2, md: 3 }} mb={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Header + Simple Navigation
            </Typography>
          </Box>

          {/* Header Component */}
          <HeaderDefaultExport name="showcase-header-1" listener={mockListener}>
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#ffffff"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src="https://docs.wavemaker.com/learn/img/WM_blue_logo.png"
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="body2" fontWeight={600}>
                  Company Name
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="small">
                  <i className="fa fa-bell" />
                </IconButton>
                <IconButton size="small">
                  <i className="fa fa-user" />
                </IconButton>
              </Stack>
            </Box>
          </HeaderDefaultExport>

          {/* TopNav Component */}
          <TopNavDefaultExport name="simpleNav" listener={mockListener} styles={{display:"flex", alignItems:"center", paddingLeft:"24px"}}>
            <WmNavbar name="simple-navbar" listener={mockListener}>
              <Box
                component="ul"
                className="nav navbar-nav"
                sx={{
                  display: 'flex',
                  gap: '36px',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  alignItems: 'center'
                }}
              >
                <WmNavItem name="nav-dashboard" listener={mockListener} className="active">
                  <WmAnchor
                    name="nav-dashboard-anchor"
                    caption="Dashboard"
                    iconclass="fa fa-dashboard"
                    hyperlink="#dashboard"
                    listener={mockListener}
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
                <WmNavItem name="nav-reports" listener={mockListener}>
                  <WmAnchor
                    name="nav-reports-anchor"
                    caption="Reports"
                    iconclass="fa fa-file-text"
                    hyperlink="#reports"
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
            </WmNavbar>
          </TopNavDefaultExport>

          <Box p={3} bgcolor="#fafafa">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Complete Layout Example
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This example shows a typical page structure with a Header component at the top (containing logo and user controls) and a TopNav component below it (containing main navigation links).
            </Typography>
          </Box>
        </Box>

        {/* Header + TopNav Example 2 */}
        <Box mb={4} width="100%">
          <Box px={{ xs: 2, md: 3 }} mb={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Header + Navigation with Dropdown
            </Typography>
          </Box>

          {/* Header Component with Search */}
          <HeaderDefaultExport name="showcase-header-2" listener={mockListener}>
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              gap={3}
              bgcolor="#ffffff"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src="https://docs.wavemaker.com/learn/img/WM_blue_logo.png"
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="body2" fontWeight={600}>
                  Dashboard
                </Typography>
              </Stack>

              <Box
                component="input"
                type="search"
                placeholder="Search…"
                style={{
                  flex: 1,
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "1px solid #e0e0e0",
                }}
              />

              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="small">
                  <Badge badgeContent={4} color="error">
                    <i className="fa fa-bell" />
                  </Badge>
                </IconButton>
                <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
              </Stack>
            </Box>
          </HeaderDefaultExport>

          {/* TopNav Component with Menu */}
          <TopNavDefaultExport name="dropdownNav" listener={mockListener} styles={{display:"flex", alignItems:"center", paddingLeft:"24px"}}>
            <WmNavbar name="dropdown-navbar" listener={mockListener}>
              <Box
                component="ul"
                className="nav navbar-nav"
                sx={{
                  display: 'flex',
                  gap: '36px',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  alignItems: 'center'
                }}
              >
                <WmNavItem name="nav-home" listener={mockListener} className="active">
                  <WmAnchor
                    name="nav-home-anchor"
                    caption="Home"
                    iconclass="fa fa-home"
                    hyperlink="#home"
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
                <WmNavItem name="nav-team" listener={mockListener}>
                  <WmAnchor
                    name="nav-team-anchor"
                    caption="Team"
                    iconclass="fa fa-users"
                    hyperlink="#team"
                    listener={mockListener}
                  />
                </WmNavItem>
              </Box>
            </WmNavbar>
          </TopNavDefaultExport>

          <Box p={3} bgcolor="#fafafa">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Navigation with Search & Notifications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This layout includes a search bar in the header and notifications, with a TopNav featuring dropdown menus. Click on "Projects" to see the dropdown menu in action.
            </Typography>
          </Box>
        </Box>

        {/* Simple Horizontal Navigation Example (Original - Without Header) */}
        <Box mb={4} width="100%">
          <Box px={{ xs: 2, md: 3 }} mb={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Simple Navigation
            </Typography>
          </Box>
          <TopNavDefaultExport name="simpleNav" listener={mockListener} styles={{display:"flex", alignItems:"center", paddingLeft:"24px"}}>
            <WmNavbar name="simple-navbar" listener={mockListener}>
              <Box
                component="ul"
                className="nav navbar-nav"
                sx={{
                  display: 'flex',
                  gap: '36px',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  alignItems: 'center'
                }}
              >
                <WmNavItem name="nav-dashboard" listener={mockListener} className="active">
                  <WmAnchor
                    name="nav-dashboard-anchor"
                    caption="Dashboard"
                    iconclass="fa fa-dashboard"
                    hyperlink="#dashboard"
                    listener={mockListener}
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
                <WmNavItem name="nav-reports" listener={mockListener}>
                  <WmAnchor
                    name="nav-reports-anchor"
                    caption="Reports"
                    iconclass="fa fa-file-text"
                    hyperlink="#reports"
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
            </WmNavbar>
          </TopNavDefaultExport>
          <Box p={3} bgcolor="#fafafa">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Simple Horizontal Navigation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Basic horizontal navigation bar with icon navigation items using WmNavbar, WmNavItem, and WmAnchor components.
            </Typography>
          </Box>
        </Box>

        {/* Navigation with Dropdown Menu Example */}
        <Box mb={4} width="100%">
          <Box px={{ xs: 2, md: 3 }} mb={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Navigation with Dropdown Menu
            </Typography>
          </Box>
          <TopNavDefaultExport name="dropdownNav" listener={mockListener} styles={{display:"flex", alignItems:"center", paddingLeft:"24px"}}>
            <WmNavbar name="dropdown-navbar" listener={mockListener}>
              <Box
                component="ul"
                className="nav navbar-nav"
                sx={{
                  display: 'flex',
                  gap: '36px',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  alignItems: 'center'
                }}
              >
                <WmNavItem name="nav-home" listener={mockListener} className="active">
                  <WmAnchor
                    name="nav-home-anchor"
                    caption="Home"
                    iconclass="fa fa-home"
                    hyperlink="#home"
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
                <WmNavItem name="nav-team" listener={mockListener}>
                  <WmAnchor
                    name="nav-team-anchor"
                    caption="Team"
                    iconclass="fa fa-users"
                    hyperlink="#team"
                    listener={mockListener}
                  />
                </WmNavItem>
              </Box>
            </WmNavbar>
          </TopNavDefaultExport>
          <Box p={3} bgcolor="#fafafa">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Navigation with Dropdown Menu
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Horizontal navigation with dropdown menu support using WmMenu component. Click on "Projects" to see the dropdown menu.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  args:{
    name:"showcaseTopnav",
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


export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    // Component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;

    // Menu datasets for dropdowns
    const projectsMenuItems = [
      { label: "Active Projects", icon: "fa fa-folder-open", link: "#active-projects" },
      { label: "Archived", icon: "fa fa-archive", link: "#archived" },
      { label: "Templates", icon: "fa fa-file", link: "#templates" },
    ];

    const helpMenuItems = [
      { label: "Documentation", icon: "fa fa-file-text", link: "#documentation" },
      { label: "Support", icon: "fa fa-life-ring", link: "#support" },
      { label: "Feedback", icon: "fa fa-comment", link: "#feedback" },
    ];

    return (
      <Box width="100%">
        {/* Header Component - Provides context for page structure */}
        <HeaderDefaultExport name="standard-header" listener={mockListener}>
          <Box
            px={3}
            py={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#ffffff"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                src="https://docs.wavemaker.com/learn/img/WM_blue_logo.png"
                sx={{ width: 40, height: 40 }}
              />
              <Typography variant="body2" fontWeight={600}>
                Wavemaker
              </Typography>
            </Stack>

            <Box
              component="input"
              type="search"
              placeholder="Search…"
              style={{
                minWidth: "200px",
                padding: "10px 16px",
                borderRadius: 6,
                border: "1px solid #e0e0e0",
                fontSize: "14px",
              }}
            />

            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton size="small">
                <Badge badgeContent={3} color="primary">
                  <i className="fa fa-bell" />
                </Badge>
              </IconButton>
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </Stack>
          </Box>
        </HeaderDefaultExport>

        {/* TopNav Component - Focus of Design Token Panel */}
        <Box data-design-token-target={dataAttr}>
          <TopNavDefaultExport {...componentArgs} listener={mockListener} styles={{display:"flex", alignItems:"center", paddingLeft:"24px"}}>
          <WmNavbar name="standard2-navbar" listener={mockListener}>
            <Box
              component="ul"
              className="nav navbar-nav"
              sx={{
                display: 'flex',
                gap: '36px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                alignItems: 'center'
              }}
            >
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

              {/* Team */}
              <WmNavItem name="nav-team" listener={mockListener}>
                <WmAnchor
                  name="nav-team-anchor"
                  caption="Team"
                  iconclass="fa fa-users"
                  hyperlink="#team"
                  listener={mockListener}
                />
              </WmNavItem>

              {/* Analytics */}
              {/* <WmNavItem name="nav-analytics" listener={mockListener}>
                <WmAnchor
                  name="nav-analytics-anchor"
                  caption="Analytics"
                  iconclass="fa fa-chart-bar"
                  hyperlink="#analytics"
                  listener={mockListener}
                />
              </WmNavItem> */}

              {/* Help - Menu Dropdown */}
              <WmNavItem name="nav-help" listener={mockListener} className="nav-navbar">
                <WmMenu
                  name="nav-help-menu"
                  caption="Help"
                  iconclass="fa fa-question-circle"
                  type="anchor"
                  dataset={helpMenuItems}
                  menuposition="down,right"
                  menulayout="vertical"
                  autoclose="outsideClick"
                  autoopen="never"
                  listener={mockListener}
                  isFromNav={true}
                />
              </WmNavItem>

              {/* Settings */}
              {/* <WmNavItem name="nav-settings" listener={mockListener}>
                <WmAnchor
                  name="nav-settings-anchor"
                  caption="Settings"
                  iconclass="fa fa-cog"
                  hyperlink="#settings"
                  listener={mockListener}
                />
              </WmNavItem> */}
            </Box>
          </WmNavbar>
        </TopNavDefaultExport>
        </Box>

        {/* Main Content Area */}
        <Box p={3} bgcolor="#fafafa" minHeight="500px">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Main Content Area
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This layout demonstrates the typical page structure: Header at the top with branding and utilities, followed by TopNav for main navigation. Use the Design Tokens panel to customize the TopNav appearance.
          </Typography>
          <Box p={2} bgcolor="white" borderRadius={1} boxShadow="0 1px 3px rgba(0,0,0,0.1)">
            <Typography variant="body2" gutterBottom>
              <strong>Layout Components:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              • <strong>Header:</strong> Contains logo, search, and user controls
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              • <strong>TopNav:</strong> Main navigation bar (highlighted with design tokens)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try hovering over navigation items to see the hover state. Click "Projects" or "Help" to see dropdown menus. Use the Design Tokens panel to customize the TopNav appearance.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  },
  args: {
    name: "standardTopNav",
    "data-design-token-target": true
  },
  argTypes: {
    "data-design-token-target": { table: {disable: true} },
    name:{table: {disable: true}},
    listener:{table: {disable: true}}
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: topnavTokensData,
      componentKey: "top",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};