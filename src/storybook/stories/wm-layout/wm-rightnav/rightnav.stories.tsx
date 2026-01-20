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
import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import rightnavTokensData from "../../../../designTokens/components/page-right-nav/page-right-nav.json";

const meta: Meta<typeof RightNavDefaultExport> = {
  title: "Layout/RightNav",
  component: RightNavDefaultExport,
  // argTypes: {
  //   columnwidth: {
  //     control: "select",
  //     options: ["1", "2", "3", "4", "6"],
  //     description: "Column width for the right nav panel"
  //   },
  //   show: { control: "boolean" },
  //   className: { control: "text" },
  // },
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
  }
};


// export const Basic: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//     const contentColumns = 12 - parseInt(args.columnwidth || "3");
//     return (
//       <Box style={{ padding: 16, display: "flex", minHeight: "400px" }}>
//         <Box className={`col-sm-${contentColumns}`} p={2} bgcolor="#f5f5f5">
//           <Typography variant="body2" color="text.secondary">
//             Main Content Area (Width: {contentColumns}/12 columns)
//           </Typography>
//         </Box>
//         <RightNavDefaultExport {...args} listener={mockListener}>
//           <Box height="100%">
//             <Box p={2} borderBottom="1px solid rgba(0,0,0,0.08)">
//               <Typography variant="h6" fontWeight={600}>
//                 Sidebar
//               </Typography>
//             </Box>
//             <Box component="nav" className="app-nav nav navbar-nav nav-vertical">
//               <WmNavItem name="nav-quick-actions" listener={mockListener} className="active">
//                 <WmAnchor
//                   name="nav-quick-actions-anchor"
//                   caption="Quick Actions"
//                   iconclass="fa fa-bolt"
//                   hyperlink="#quick-actions"
//                   listener={mockListener}
//                 />
//               </WmNavItem>
//               <WmNavItem name="nav-resources" listener={mockListener}>
//                 <WmAnchor
//                   name="nav-resources-anchor"
//                   caption="Resources"
//                   iconclass="fa fa-book"
//                   hyperlink="#resources"
//                   listener={mockListener}
//                 />
//               </WmNavItem>
//               <WmNavItem name="nav-help" listener={mockListener}>
//                 <WmAnchor
//                   name="nav-help-anchor"
//                   caption="Help"
//                   iconclass="fa fa-question-circle"
//                   hyperlink="#help"
//                   listener={mockListener}
//                 />
//               </WmNavItem>
//             </Box>
//           </Box>
//         </RightNavDefaultExport>
//       </Box>
//     );
//   },
//   args: {
//     name: "basicRightNav",
//     columnwidth: "3",
//   },
//   argTypes: {
//     columnwidth: {
//       control: "select",
//       options: ["1", "2", "3", "4", "6"],
//       description: "Column width for the right nav panel"
//     },
//     show: { control: "boolean" },
//     className: { control: "text" },
//   },
// };

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
    "data-design-token-target":"true"
  },
  argTypes: {
    columnwidth: {
      control: "select",
      options: ["1", "2", "3", "4", "6"],
      description: "Column width for the right nav panel"
    },
    "data-design-token-target": { control: false }
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

// export const ActivityFeed: Story = {
//   render: Template,
//   args: {
//     name: "activityFeed",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0">
//         <Typography variant="h6" mb={2}>
//           Recent Activity
//         </Typography>
//         <List>
//           <ListItem alignItems="flex-start">
//             <ListItemAvatar>
//               <Avatar>JD</Avatar>
//             </ListItemAvatar>
//             <ListItemText
//               primary="John Doe"
//               secondary={
//                 <>
//                   <Typography component="span" variant="body2" color="text.primary">
//                     Completed task
//                   </Typography>
//                   {" — 2 minutes ago"}
//                 </>
//               }
//             />
//           </ListItem>
//           <Divider variant="inset" component="li" />
//           <ListItem alignItems="flex-start">
//             <ListItemAvatar>
//               <Avatar>SA</Avatar>
//             </ListItemAvatar>
//             <ListItemText
//               primary="Sarah Anderson"
//               secondary={
//                 <>
//                   <Typography component="span" variant="body2" color="text.primary">
//                     Added new comment
//                   </Typography>
//                   {" — 15 minutes ago"}
//                 </>
//               }
//             />
//           </ListItem>
//           <Divider variant="inset" component="li" />
//           <ListItem alignItems="flex-start">
//             <ListItemAvatar>
//               <Avatar>MC</Avatar>
//             </ListItemAvatar>
//             <ListItemText
//               primary="Mike Chen"
//               secondary={
//                 <>
//                   <Typography component="span" variant="body2" color="text.primary">
//                     Updated project
//                   </Typography>
//                   {" — 1 hour ago"}
//                 </>
//               }
//             />
//           </ListItem>
//         </List>
//       </Box>
//     ),
//   },
// };

// export const UserInfoPanel: Story = {
//   render: Template,
//   args: {
//     name: "userInfo",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0">
//         <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
//           <Avatar sx={{ width: 80, height: 80, mb: 2 }}>JD</Avatar>
//           <Typography variant="h6">John Doe</Typography>
//           <Typography variant="body2" color="text.secondary">
//             john.doe@example.com
//           </Typography>
//         </Box>
//         <Divider sx={{ mb: 2 }} />
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="caption" color="text.secondary">
//               ROLE
//             </Typography>
//             <Typography variant="body1">Administrator</Typography>
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary">
//               DEPARTMENT
//             </Typography>
//             <Typography variant="body1">Engineering</Typography>
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary">
//               LOCATION
//             </Typography>
//             <Typography variant="body1">San Francisco, CA</Typography>
//           </Box>
//         </Stack>
//         <Button variant="outlined" fullWidth sx={{ mt: 3 }}>
//           View Profile
//         </Button>
//       </Box>
//     ),
//   },
// };

// export const WidgetPanel: Story = {
//   render: Template,
//   args: {
//     name: "widgetPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#f9f9f9" height="100%">
//         <Stack spacing={2}>
//           <Card>
//             <CardContent>
//               <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                 Tasks Completed
//               </Typography>
//               <Typography variant="h4">24/30</Typography>
//               <LinearProgress variant="determinate" value={80} sx={{ mt: 1 }} />
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent>
//               <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                 Active Projects
//               </Typography>
//               <Typography variant="h4">8</Typography>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent>
//               <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                 Team Members
//               </Typography>
//               <Typography variant="h4">12</Typography>
//             </CardContent>
//           </Card>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const NotificationPanel: Story = {
//   render: Template,
//   args: {
//     name: "notificationPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0">
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h6">Notifications</Typography>
//           <IconButton size="small">
//             <i className="fa fa-cog" />
//           </IconButton>
//         </Box>
//         <Stack spacing={2}>
//           <Box p={2} bgcolor="#e3f2fd" borderRadius={1}>
//             <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//               <i className="fa fa-info-circle" style={{ color: "#1976d2" }} />
//               <Typography variant="subtitle2">System Update</Typography>
//             </Stack>
//             <Typography variant="body2" color="text.secondary">
//               New features available in version 2.0
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               2 hours ago
//             </Typography>
//           </Box>
//           <Box p={2} bgcolor="#fff3e0" borderRadius={1}>
//             <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//               <i className="fa fa-exclamation-triangle" style={{ color: "#f57c00" }} />
//               <Typography variant="subtitle2">Action Required</Typography>
//             </Stack>
//             <Typography variant="body2" color="text.secondary">
//               Please review pending approvals
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               5 hours ago
//             </Typography>
//           </Box>
//           <Box p={2} bgcolor="#e8f5e9" borderRadius={1}>
//             <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//               <i className="fa fa-check-circle" style={{ color: "#4caf50" }} />
//               <Typography variant="subtitle2">Success</Typography>
//             </Stack>
//             <Typography variant="body2" color="text.secondary">
//               Your report has been generated
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               1 day ago
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const QuickLinksPanel: Story = {
//   render: Template,
//   args: {
//     name: "quickLinks",
//     listener: mockListener,
//     columnwidth: "2",
//     children: (
//       <Box p={2} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0">
//         <Typography variant="h6" mb={2}>
//           Quick Links
//         </Typography>
//         <Stack spacing={1.5}>
//           <Box p={1.5} bgcolor="#f5f5f5" borderRadius={1}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <i className="fa fa-file" />
//               <Link href="#" underline="hover">
//                 Documentation
//               </Link>
//             </Stack>
//           </Box>
//           <Box p={1.5} bgcolor="#f5f5f5" borderRadius={1}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <i className="fa fa-question-circle" />
//               <Link href="#" underline="hover">
//                 Help Center
//               </Link>
//             </Stack>
//           </Box>
//           <Box p={1.5} bgcolor="#f5f5f5" borderRadius={1}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <i className="fa fa-download" />
//               <Link href="#" underline="hover">
//                 Downloads
//               </Link>
//             </Stack>
//           </Box>
//           <Box p={1.5} bgcolor="#f5f5f5" borderRadius={1}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <i className="fa fa-cog" />
//               <Link href="#" underline="hover">
//                 Settings
//               </Link>
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const TagsPanel: Story = {
//   render: Template,
//   args: {
//     name: "tagsPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0">
//         <Typography variant="h6" mb={2}>
//           Popular Tags
//         </Typography>
//         <Box display="flex" flexWrap="wrap" gap={1}>
//           <Chip label="React" size="small" color="primary" />
//           <Chip label="JavaScript" size="small" color="primary" />
//           <Chip label="TypeScript" size="small" color="primary" />
//           <Chip label="Node.js" size="small" />
//           <Chip label="CSS" size="small" />
//           <Chip label="HTML" size="small" />
//           <Chip label="API" size="small" />
//           <Chip label="Database" size="small" />
//           <Chip label="Testing" size="small" />
//           <Chip label="DevOps" size="small" />
//         </Box>
//         <Divider sx={{ my: 3 }} />
//         <Typography variant="h6" mb={2}>
//           Recent Tags
//         </Typography>
//         <Stack spacing={1}>
//           <Chip label="Authentication" size="small" variant="outlined" />
//           <Chip label="Performance" size="small" variant="outlined" />
//           <Chip label="Security" size="small" variant="outlined" />
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const WidePanel: Story = {
//   render: Template,
//   args: {
//     name: "widePanel",
//     listener: mockListener,
//     columnwidth: "4",
//     children: (
//       <Box p={3} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0">
//         <Typography variant="h5" mb={3} fontWeight="600">
//           Details Panel
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" fontWeight="500" mb={1}>
//               Project Overview
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               This is a comprehensive overview of the current project status, milestones, and
//               upcoming deliverables. The team has made significant progress this quarter.
//             </Typography>
//           </Box>
//           <Divider />
//           <Box>
//             <Typography variant="subtitle1" fontWeight="500" mb={1}>
//               Key Metrics
//             </Typography>
//             <Stack spacing={2}>
//               <Box>
//                 <Box display="flex" justifyContent="space-between" mb={0.5}>
//                   <Typography variant="body2">Completion</Typography>
//                   <Typography variant="body2">75%</Typography>
//                 </Box>
//                 <LinearProgress variant="determinate" value={75} />
//               </Box>
//               <Box>
//                 <Box display="flex" justifyContent="space-between" mb={0.5}>
//                   <Typography variant="body2">Quality Score</Typography>
//                   <Typography variant="body2">92%</Typography>
//                 </Box>
//                 <LinearProgress variant="determinate" value={92} color="success" />
//               </Box>
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const NarrowPanel: Story = {
//   render: Template,
//   args: {
//     name: "narrowPanel",
//     listener: mockListener,
//     columnwidth: "1",
//     children: (
//       <Box py={2} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0" display="flex" flexDirection="column" alignItems="center">
//         <Stack spacing={2}>
//           <IconButton color="primary" title="Home">
//             <i className="fa fa-home" />
//           </IconButton>
//           <IconButton title="Search">
//             <i className="fa fa-search" />
//           </IconButton>
//           <IconButton title="Notifications">
//             <i className="fa fa-bell" />
//           </IconButton>
//           <IconButton title="Settings">
//             <i className="fa fa-cog" />
//           </IconButton>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const DarkPanel: Story = {
//   render: Template,
//   args: {
//     name: "darkPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#212121" color="#ffffff" height="100%">
//         <Typography variant="h6" mb={3}>
//           Dark Sidebar
//         </Typography>
//         <Stack spacing={2}>
//           <Link href="#" color="inherit" underline="hover">
//             Dashboard
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Analytics
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Reports
//           </Link>
//           <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />
//           <Link href="#" color="inherit" underline="hover">
//             Settings
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ColoredPanel: Story = {
//   render: Template,
//   args: {
//     name: "coloredPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#1976d2" color="#ffffff" height="100%">
//         <Typography variant="h6" mb={3}>
//           Blue Sidebar
//         </Typography>
//         <Stack spacing={2}>
//           <Button variant="contained" color="inherit" fullWidth sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
//             Primary Action
//           </Button>
//           <Button variant="outlined" color="inherit" fullWidth>
//             Secondary Action
//           </Button>
//           <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", my: 2 }} />
//           <Typography variant="body2">
//             Additional information and quick access tools are available here.
//           </Typography>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const GradientPanel: Story = {
//   render: Template,
//   args: {
//     name: "gradientPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box
//         p={2}
//         sx={{
//           background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
//           color: "#ffffff",
//           height: "100%",
//         }}
//       >
//         <Typography variant="h6" mb={3}>
//           Gradient Sidebar
//         </Typography>
//         <Stack spacing={2}>
//           <Box p={2} bgcolor="rgba(255,255,255,0.1)" borderRadius={1}>
//             <Typography variant="subtitle2" mb={0.5}>
//               Total Users
//             </Typography>
//             <Typography variant="h5">1,234</Typography>
//           </Box>
//           <Box p={2} bgcolor="rgba(255,255,255,0.1)" borderRadius={1}>
//             <Typography variant="subtitle2" mb={0.5}>
//               Active Now
//             </Typography>
//             <Typography variant="h5">89</Typography>
//           </Box>
//           <Box p={2} bgcolor="rgba(255,255,255,0.1)" borderRadius={1}>
//             <Typography variant="subtitle2" mb={0.5}>
//               New Today
//             </Typography>
//             <Typography variant="h5">12</Typography>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ChatPanel: Story = {
//   render: Template,
//   args: {
//     name: "chatPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#ffffff" height="100%" display="flex" flexDirection="column" borderLeft="1px solid #e0e0e0">
//         <Box p={2} bgcolor="#f5f5f5" borderBottom="1px solid #e0e0e0">
//           <Typography variant="h6">Team Chat</Typography>
//         </Box>
//         <Box flex={1} p={2} overflow="auto">
//           <Stack spacing={2}>
//             <Box display="flex" gap={1}>
//               <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
//               <Box>
//                 <Typography variant="caption" fontWeight="600">
//                   John Doe
//                 </Typography>
//                 <Box p={1} bgcolor="#e3f2fd" borderRadius={1}>
//                   <Typography variant="body2">Hey team, how's the progress?</Typography>
//                 </Box>
//                 <Typography variant="caption" color="text.secondary">
//                   2:30 PM
//                 </Typography>
//               </Box>
//             </Box>
//             <Box display="flex" gap={1} justifyContent="flex-end">
//               <Box>
//                 <Typography variant="caption" fontWeight="600" textAlign="right" display="block">
//                   You
//                 </Typography>
//                 <Box p={1} bgcolor="#1976d2" color="#ffffff" borderRadius={1}>
//                   <Typography variant="body2">Going great! Almost done.</Typography>
//                 </Box>
//                 <Typography variant="caption" color="text.secondary" display="block" textAlign="right">
//                   2:32 PM
//                 </Typography>
//               </Box>
//               <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//             </Box>
//           </Stack>
//         </Box>
//         <Box p={2} borderTop="1px solid #e0e0e0">
//           <Box
//             component="input"
//             type="text"
//             placeholder="Type a message..."
//             sx={{
//               width: "100%",
//               padding: "8px 12px",
//               border: "1px solid #e0e0e0",
//               borderRadius: "4px",
//               "&:focus": {
//                 outline: "none",
//                 borderColor: "#1976d2",
//               },
//             }}
//           />
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const CalendarPanel: Story = {
//   render: Template,
//   args: {
//     name: "calendarPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0">
//         <Typography variant="h6" mb={2}>
//           Upcoming Events
//         </Typography>
//         <Stack spacing={2}>
//           <Box p={2} borderLeft="4px solid #1976d2" bgcolor="#f5f5f5">
//             <Typography variant="subtitle2">Team Meeting</Typography>
//             <Typography variant="body2" color="text.secondary">
//               Today at 3:00 PM
//             </Typography>
//           </Box>
//           <Box p={2} borderLeft="4px solid #4caf50" bgcolor="#f5f5f5">
//             <Typography variant="subtitle2">Project Deadline</Typography>
//             <Typography variant="body2" color="text.secondary">
//               Tomorrow at 5:00 PM
//             </Typography>
//           </Box>
//           <Box p={2} borderLeft="4px solid #ff9800" bgcolor="#f5f5f5">
//             <Typography variant="subtitle2">Client Call</Typography>
//             <Typography variant="body2" color="text.secondary">
//               Friday at 10:00 AM
//             </Typography>
//           </Box>
//           <Box p={2} borderLeft="4px solid #9c27b0" bgcolor="#f5f5f5">
//             <Typography variant="subtitle2">Workshop</Typography>
//             <Typography variant="body2" color="text.secondary">
//               Next Monday at 2:00 PM
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const SettingsPanel: Story = {
//   render: Template,
//   args: {
//     name: "settingsPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#ffffff" height="100%" borderLeft="1px solid #e0e0e0">
//         <Typography variant="h6" mb={3}>
//           Settings
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Appearance
//             </Typography>
//             <Stack direction="row" spacing={1}>
//               <Button variant="outlined" size="small">
//                 Light
//               </Button>
//               <Button variant="contained" size="small">
//                 Dark
//               </Button>
//               <Button variant="outlined" size="small">
//                 Auto
//               </Button>
//             </Stack>
//           </Box>
//           <Divider />
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Notifications
//             </Typography>
//             <Stack spacing={1}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="body2">Email</Typography>
//                 <Box
//                   component="input"
//                   type="checkbox"
//                   defaultChecked
//                   sx={{ cursor: "pointer" }}
//                 />
//               </Box>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="body2">Push</Typography>
//                 <Box
//                   component="input"
//                   type="checkbox"
//                   defaultChecked
//                   sx={{ cursor: "pointer" }}
//                 />
//               </Box>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="body2">SMS</Typography>
//                 <Box
//                   component="input"
//                   type="checkbox"
//                   sx={{ cursor: "pointer" }}
//                 />
//               </Box>
//             </Stack>
//           </Box>
//           <Divider />
//           <Button variant="outlined" fullWidth>
//             Advanced Settings
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const CustomStyledPanel: Story = {
//   render: Template,
//   args: {
//     name: "customStyledPanel",
//     listener: mockListener,
//     columnwidth: "3",
//     styles: {
//       backgroundColor: "#ff5722",
//       color: "#ffffff",
//       padding: "16px",
//       borderRadius: "8px 0 0 8px",
//     },
//     children: (
//       <Box height="100%">
//         <Typography variant="h6" mb={3}>
//           Custom Styled
//         </Typography>
//         <Stack spacing={2}>
//           <Typography variant="body2">
//             This panel has custom styling applied via the styles prop.
//           </Typography>
//           <Button variant="contained" sx={{ bgcolor: "#ffffff", color: "#ff5722" }}>
//             Action Button
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };
