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
import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import leftnavTokensData from "../../../../designTokens/components/page-left-nav/page-left-nav.json";

const meta: Meta<typeof LeftNavDefaultExport> = {
  title: "Layout/LeftNav",
  component: LeftNavDefaultExport,
  // argTypes: {
  //   columnwidth: {
  //     control: "select",
  //     options: ["1", "2", "3", "4", "6"],
  //     description: "Column width for the left nav panel"
  //   },
  //   navheight: {
  //     control: "select",
  //     options: ["full", "auto"],
  //     description: "Height of the navigation panel"
  //   },
  //   navtype: { control: "select", options:["pills", "tabs"] },
  //   // show: { control: "boolean" },
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
    name:"docsLeftNav",
    listener:mockListener
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
  }
};

// export const Basic: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//     const contentColumns = 12 - parseInt(args.columnwidth || "3");
//     return (
//       <Box style={{ padding: 16, display: "flex", minHeight: "400px" }}>
//         <LeftNavDefaultExport {...args} listener={mockListener}>
//           <Box height="100%">
//             <Box p={2} borderBottom="1px solid rgba(0,0,0,0.08)">
//               <Typography variant="h6" fontWeight={600}>
//                 Navigation
//               </Typography>
//             </Box>
//             <Box component="nav" className="app-nav nav navbar-nav nav-vertical">
//               <WmNavItem name="nav-dashboard" listener={mockListener} className="active">
//                 <WmAnchor
//                   name="nav-dashboard-anchor"
//                   caption="Dashboard"
//                   iconclass="fa fa-dashboard"
//                   hyperlink="#dashboard"
//                   listener={mockListener}
//                 />
//               </WmNavItem>
//               <WmNavItem name="nav-profile" listener={mockListener}>
//                 <WmAnchor
//                   name="nav-profile-anchor"
//                   caption="Profile"
//                   iconclass="fa fa-user"
//                   hyperlink="#profile"
//                   listener={mockListener}
//                 />
//               </WmNavItem>
//               <WmNavItem name="nav-settings" listener={mockListener}>
//                 <WmAnchor
//                   name="nav-settings-anchor"
//                   caption="Settings"
//                   iconclass="fa fa-cog"
//                   hyperlink="#settings"
//                   listener={mockListener}
//                 />
//               </WmNavItem>
//             </Box>
//           </Box>
//         </LeftNavDefaultExport>
//         <Box className={`col-sm-${contentColumns}`} p={2} bgcolor="#f5f5f5">
//           <Typography variant="body2" color="text.secondary">
//             Main Content Area (Width: {contentColumns}/12 columns)
//           </Typography>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "basicLeftNav",
//     columnwidth: "3",
//     navheight: "full",
//   },
//   argTypes: {
//     columnwidth: {
//       control: "select",
//       options: ["1", "2", "3", "4", "6"],
//       description: "Column width for the left nav panel"
//     },
//     navheight: {
//       control: "select",
//       options: ["full", "auto"],
//       description: "Height of the navigation panel"
//     },
//     navtype: { control: "select", options:["pills", "tabs"] },
//   },
// };

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
    "data-design-token-target":"true"
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
    "data-design-token-target": { control: false }
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

// export const SimpleNavigation: Story = {
//   render: Template,
//   args: {
//     name: "simpleNav",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box p={2} bgcolor="#2c3e50" color="#ffffff" height="100%">
//         <Typography variant="h6" mb={3}>
//           Menu
//         </Typography>
//         <Stack spacing={2}>
//           <Link href="#" color="inherit" underline="hover">
//             Home
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Projects
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Team
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Calendar
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Reports
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const IconNavigation: Story = {
//   render: Template,
//   args: {
//     name: "iconNav",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#ffffff" height="100%" borderRight="1px solid #e0e0e0">
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <i className="fa fa-dashboard" />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <i className="fa fa-inbox" />
//               </ListItemIcon>
//               <ListItemText primary="Inbox" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <i className="fa fa-user" />
//               </ListItemIcon>
//               <ListItemText primary="Profile" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <i className="fa fa-cog" />
//               </ListItemIcon>
//               <ListItemText primary="Settings" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Box>
//     ),
//   },
// };

// export const CollapsibleMenu: Story = {
//   render: () => {
//     const [openItems, setOpenItems] = useState<string[]>([]);

//     const handleToggle = (item: string) => {
//       setOpenItems((prev) =>
//         prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
//       );
//     };

//     return (
//       <Box style={{ padding: 16, display: "flex", minHeight: "400px" }}>
//         <LeftNavDefaultExport name="collapsibleNav" listener={mockListener} columnwidth="3">
//           <Box bgcolor="#263238" color="#ffffff" height="100%">
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton onClick={() => handleToggle("dashboard")}>
//                   <ListItemIcon sx={{ color: "#ffffff" }}>
//                     <i className="fa fa-dashboard" />
//                   </ListItemIcon>
//                   <ListItemText primary="Dashboard" />
//                   <i
//                     className={`fa fa-chevron-${openItems.includes("dashboard") ? "down" : "right"}`}
//                   />
//                 </ListItemButton>
//               </ListItem>
//               <Collapse in={openItems.includes("dashboard")}>
//                 <List disablePadding>
//                   <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemText primary="Analytics" />
//                   </ListItemButton>
//                   <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemText primary="Reports" />
//                   </ListItemButton>
//                 </List>
//               </Collapse>

//               <ListItem disablePadding>
//                 <ListItemButton onClick={() => handleToggle("projects")}>
//                   <ListItemIcon sx={{ color: "#ffffff" }}>
//                     <i className="fa fa-folder" />
//                   </ListItemIcon>
//                   <ListItemText primary="Projects" />
//                   <i
//                     className={`fa fa-chevron-${openItems.includes("projects") ? "down" : "right"}`}
//                   />
//                 </ListItemButton>
//               </ListItem>
//               <Collapse in={openItems.includes("projects")}>
//                 <List disablePadding>
//                   <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemText primary="Active" />
//                   </ListItemButton>
//                   <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemText primary="Archived" />
//                   </ListItemButton>
//                   <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemText primary="Templates" />
//                   </ListItemButton>
//                 </List>
//               </Collapse>

//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon sx={{ color: "#ffffff" }}>
//                     <i className="fa fa-cog" />
//                   </ListItemIcon>
//                   <ListItemText primary="Settings" />
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </Box>
//         </LeftNavDefaultExport>
//         <Box flex={1} p={2} bgcolor="#f5f5f5">
//           <Typography variant="body2" color="text.secondary">
//             Main Content Area
//           </Typography>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "collapsibleNav",
//     listener: mockListener,
//   },
// };

// export const WideNavigation: Story = {
//   render: Template,
//   args: {
//     name: "wideNav",
//     listener: mockListener,
//     columnwidth: "4",
//     children: (
//       <Box p={3} bgcolor="#ffffff" height="100%" borderRight="1px solid #e0e0e0">
//         <Typography variant="h5" mb={3} fontWeight="600">
//           Navigation Panel
//         </Typography>
//         <Stack spacing={2}>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle1" fontWeight="500">
//               Dashboard
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               View your analytics
//             </Typography>
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle1" fontWeight="500">
//               Projects
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Manage your work
//             </Typography>
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle1" fontWeight="500">
//               Team
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Collaborate with others
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const NarrowNavigation: Story = {
//   render: Template,
//   args: {
//     name: "narrowNav",
//     listener: mockListener,
//     columnwidth: "1",
//     children: (
//       <Box bgcolor="#1976d2" color="#ffffff" height="100%" display="flex" flexDirection="column" alignItems="center" py={2}>
//         <Stack spacing={3}>
//           <IconButton sx={{ color: "#ffffff" }} title="Dashboard">
//             <i className="fa fa-dashboard" />
//           </IconButton>
//           <IconButton sx={{ color: "#ffffff" }} title="Projects">
//             <i className="fa fa-folder" />
//           </IconButton>
//           <IconButton sx={{ color: "#ffffff" }} title="Team">
//             <i className="fa fa-users" />
//           </IconButton>
//           <IconButton sx={{ color: "#ffffff" }} title="Calendar">
//             <i className="fa fa-calendar" />
//           </IconButton>
//           <IconButton sx={{ color: "#ffffff" }} title="Settings">
//             <i className="fa fa-cog" />
//           </IconButton>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const FullHeightNav: Story = {
//   render: Template,
//   args: {
//     name: "fullHeightNav",
//     listener: mockListener,
//     columnwidth: "3",
//     navheight: "full",
//     children: (
//       <Box bgcolor="#37474f" color="#ffffff" height="100%" display="flex" flexDirection="column">
//         <Box p={2} borderBottom="1px solid rgba(255,255,255,0.1)">
//           <Typography variant="h6">App Name</Typography>
//         </Box>
//         <Box flex={1} overflow="auto">
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-home" />
//                 </ListItemIcon>
//                 <ListItemText primary="Home" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-dashboard" />
//                 </ListItemIcon>
//                 <ListItemText primary="Dashboard" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-folder" />
//                 </ListItemIcon>
//                 <ListItemText primary="Projects" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-users" />
//                 </ListItemIcon>
//                 <ListItemText primary="Team" />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//         <Box p={2} borderTop="1px solid rgba(255,255,255,0.1)">
//           <Box display="flex" alignItems="center" gap={1}>
//             <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
//             <Typography variant="body2">John Doe</Typography>
//           </Box>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const DarkNavigation: Story = {
//   render: Template,
//   args: {
//     name: "darkNav",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#212121" color="#ffffff" height="100%">
//         <Box p={2}>
//           <Typography variant="h6" mb={3}>
//             Menu
//           </Typography>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-home" />
//                 </ListItemIcon>
//                 <ListItemText primary="Home" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-star" />
//                 </ListItemIcon>
//                 <ListItemText primary="Favorites" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-clock-o" />
//                 </ListItemIcon>
//                 <ListItemText primary="Recent" />
//               </ListItemButton>
//             </ListItem>
//             <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.1)" }} />
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-cog" />
//                 </ListItemIcon>
//                 <ListItemText primary="Settings" />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const LightNavigation: Story = {
//   render: Template,
//   args: {
//     name: "lightNav",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#fafafa" height="100%" borderRight="1px solid #e0e0e0">
//         <Box p={2}>
//           <Typography variant="h6" mb={3} color="primary">
//             Navigation
//           </Typography>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-home" style={{ color: "#1976d2" }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Home" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-shopping-cart" style={{ color: "#1976d2" }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Products" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-heart" style={{ color: "#1976d2" }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Wishlist" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-user" style={{ color: "#1976d2" }} />
//                 </ListItemIcon>
//                 <ListItemText primary="Account" />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const ColoredNavigation: Story = {
//   render: Template,
//   args: {
//     name: "coloredNav",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#9c27b0" color="#ffffff" height="100%">
//         <Box p={2}>
//           <Typography variant="h6" mb={3}>
//             Purple Nav
//           </Typography>
//           <Stack spacing={1.5}>
//             <Link href="#" color="inherit" underline="hover">
//               Dashboard
//             </Link>
//             <Link href="#" color="inherit" underline="hover">
//               Analytics
//             </Link>
//             <Link href="#" color="inherit" underline="hover">
//               Reports
//             </Link>
//             <Link href="#" color="inherit" underline="hover">
//               Settings
//             </Link>
//           </Stack>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const GradientNavigation: Story = {
//   render: Template,
//   args: {
//     name: "gradientNav",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box
//         sx={{
//           background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
//           color: "#ffffff",
//           height: "100%",
//         }}
//       >
//         <Box p={2}>
//           <Typography variant="h6" mb={3}>
//             Navigation
//           </Typography>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-dashboard" />
//                 </ListItemIcon>
//                 <ListItemText primary="Dashboard" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-chart-bar" />
//                 </ListItemIcon>
//                 <ListItemText primary="Analytics" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon sx={{ color: "#ffffff" }}>
//                   <i className="fa fa-file" />
//                 </ListItemIcon>
//                 <ListItemText primary="Reports" />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithBadges: Story = {
//   render: Template,
//   args: {
//     name: "navBadges",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#ffffff" height="100%" borderRight="1px solid #e0e0e0">
//         <Box p={2}>
//           <Typography variant="h6" mb={2}>
//             Menu
//           </Typography>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-inbox" />
//                 </ListItemIcon>
//                 <ListItemText primary="Inbox" />
//                 <Box
//                   sx={{
//                     bgcolor: "#f44336",
//                     color: "#ffffff",
//                     borderRadius: "12px",
//                     px: 1,
//                     py: 0.5,
//                     fontSize: "12px",
//                   }}
//                 >
//                   12
//                 </Box>
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-tasks" />
//                 </ListItemIcon>
//                 <ListItemText primary="Tasks" />
//                 <Box
//                   sx={{
//                     bgcolor: "#ff9800",
//                     color: "#ffffff",
//                     borderRadius: "12px",
//                     px: 1,
//                     py: 0.5,
//                     fontSize: "12px",
//                   }}
//                 >
//                   5
//                 </Box>
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-comment" />
//                 </ListItemIcon>
//                 <ListItemText primary="Messages" />
//                 <Box
//                   sx={{
//                     bgcolor: "#4caf50",
//                     color: "#ffffff",
//                     borderRadius: "12px",
//                     px: 1,
//                     py: 0.5,
//                     fontSize: "12px",
//                   }}
//                 >
//                   3
//                 </Box>
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithSections: Story = {
//   render: Template,
//   args: {
//     name: "navSections",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#ffffff" height="100%" borderRight="1px solid #e0e0e0">
//         <Box p={2}>
//           <Typography variant="caption" color="text.secondary" fontWeight="600" mb={1} display="block">
//             MAIN
//           </Typography>
//           <List dense>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-home" />
//                 </ListItemIcon>
//                 <ListItemText primary="Home" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-dashboard" />
//                 </ListItemIcon>
//                 <ListItemText primary="Dashboard" />
//               </ListItemButton>
//             </ListItem>
//           </List>

//           <Typography variant="caption" color="text.secondary" fontWeight="600" mb={1} mt={2} display="block">
//             WORKSPACE
//           </Typography>
//           <List dense>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-folder" />
//                 </ListItemIcon>
//                 <ListItemText primary="Projects" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-users" />
//                 </ListItemIcon>
//                 <ListItemText primary="Team" />
//               </ListItemButton>
//             </ListItem>
//           </List>

//           <Typography variant="caption" color="text.secondary" fontWeight="600" mb={1} mt={2} display="block">
//             SETTINGS
//           </Typography>
//           <List dense>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-cog" />
//                 </ListItemIcon>
//                 <ListItemText primary="Preferences" />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithUserProfile: Story = {
//   render: Template,
//   args: {
//     name: "navUserProfile",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#ffffff" height="100%" display="flex" flexDirection="column" borderRight="1px solid #e0e0e0">
//         <Box p={2} bgcolor="#1976d2" color="#ffffff">
//           <Box display="flex" alignItems="center" gap={2}>
//             <Avatar sx={{ width: 48, height: 48 }}>JD</Avatar>
//             <Box>
//               <Typography variant="subtitle1" fontWeight="600">
//                 John Doe
//               </Typography>
//               <Typography variant="caption">john@example.com</Typography>
//             </Box>
//           </Box>
//         </Box>
//         <Box flex={1}>
//           <List>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-dashboard" />
//                 </ListItemIcon>
//                 <ListItemText primary="Dashboard" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-user" />
//                 </ListItemIcon>
//                 <ListItemText primary="Profile" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-cog" />
//                 </ListItemIcon>
//                 <ListItemText primary="Settings" />
//               </ListItemButton>
//             </ListItem>
//             <Divider sx={{ my: 1 }} />
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <i className="fa fa-sign-out" />
//                 </ListItemIcon>
//                 <ListItemText primary="Logout" />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const MinimalIconNav: Story = {
//   render: Template,
//   args: {
//     name: "minimalIconNav",
//     listener: mockListener,
//     columnwidth: "1",
//     children: (
//       <Box bgcolor="#ffffff" height="100%" borderRight="1px solid #e0e0e0" py={2}>
//         <Stack spacing={2} alignItems="center">
//           <IconButton color="primary">
//             <i className="fa fa-home" />
//           </IconButton>
//           <IconButton>
//             <i className="fa fa-search" />
//           </IconButton>
//           <IconButton>
//             <i className="fa fa-bell" />
//           </IconButton>
//           <IconButton>
//             <i className="fa fa-envelope" />
//           </IconButton>
//           <Divider sx={{ width: "80%", my: 1 }} />
//           <IconButton>
//             <i className="fa fa-cog" />
//           </IconButton>
//           <Avatar sx={{ width: 32, height: 32, mt: 2 }}>U</Avatar>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ResponsiveNavigation: Story = {
//   render: Template,
//   args: {
//     name: "responsiveNav",
//     listener: mockListener,
//     columnwidth: "3",
//     children: (
//       <Box bgcolor="#ffffff" height="100%" borderRight="1px solid #e0e0e0">
//         <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">Menu</Typography>
//           <IconButton sx={{ display: { xs: "block", md: "none" } }}>
//             <i className="fa fa-times" />
//           </IconButton>
//         </Box>
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <i className="fa fa-home" />
//               </ListItemIcon>
//               <ListItemText primary="Home" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <i className="fa fa-shopping-cart" />
//               </ListItemIcon>
//               <ListItemText primary="Products" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <i className="fa fa-info-circle" />
//               </ListItemIcon>
//               <ListItemText primary="About" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <i className="fa fa-phone" />
//               </ListItemIcon>
//               <ListItemText primary="Contact" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Box>
//     ),
//   },
// };

// export const CustomStyledNav: Story = {
//   render: Template,
//   args: {
//     name: "customStyledNav",
//     listener: mockListener,
//     columnwidth: "3",
//     styles: {
//       backgroundColor: "#ff5722",
//       color: "#ffffff",
//       borderRadius: "0 8px 8px 0",
//     },
//     children: (
//       <Box p={2} height="100%">
//         <Typography variant="h6" mb={3}>
//           Custom Styled
//         </Typography>
//         <Stack spacing={2}>
//           <Link href="#" color="inherit" sx={{ fontWeight: 500 }}>
//             Dashboard
//           </Link>
//           <Link href="#" color="inherit" sx={{ fontWeight: 500 }}>
//             Analytics
//           </Link>
//           <Link href="#" color="inherit" sx={{ fontWeight: 500 }}>
//             Settings
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };
