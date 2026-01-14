import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Typography,
} from "@mui/material";

import TopNavDefaultExport from "../../../../components/layout/topnav/index";
import WmNavbar from "../../../../components/navbar/index";
import WmNavItem from "../../../../components/navbar/nav-item";
import WmAnchor from "../../../../components/basic/anchor/index";
import WmMenu from "../../../../components/navigation/menu";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import topnavTokensData from "../../../../designTokens/components/page-top-nav/page-top-nav.json";

const meta: Meta<typeof TopNavDefaultExport> = {
  title: "Layout/TopNav",
  component: TopNavDefaultExport,
  // argTypes: {
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
      styling={styling}
    />
  ),
  args:{
    name:"docsTopnav",
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
      <Box width="100%">
        {/* Showcase Heading */}
        <Box px={{ xs: 2, md: 3 }} py={2}>
          <Typography variant="h6" fontWeight={600} textAlign="left">
            TopNav Showcase
          </Typography>
        </Box>

        {/* Simple Horizontal Navigation Example */}
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
  parameters: {
    layout: 'fullscreen',
  },
};


// export const Basic: Story = {
//   tags: ['show-panel'],
//   render: (args) => (
//     <Box width="100%">
//       <TopNavDefaultExport {...args} listener={mockListener}>
//         <WmNavbar name="basic-navbar" listener={mockListener}>
//           <Box
//             component="ul"
//             className="nav navbar-nav"
//             sx={{
//               display: 'flex',
//               gap: '36px',
//               listStyle: 'none',
//               margin: 0,
//               padding: 0,
//               alignItems: 'center'
//             }}
//           >
//             <WmNavItem name="nav-dashboard" listener={mockListener} className="active">
//               <WmAnchor
//                 name="nav-dashboard-anchor"
//                 caption="Dashboard"
//                 iconclass="fa fa-dashboard"
//                 hyperlink="#dashboard"
//                 listener={mockListener}
//               />
//             </WmNavItem>
//             <WmNavItem name="nav-projects" listener={mockListener}>
//               <WmAnchor
//                 name="nav-projects-anchor"
//                 caption="Projects"
//                 iconclass="fa fa-folder"
//                 hyperlink="#projects"
//                 listener={mockListener}
//               />
//             </WmNavItem>
//             <WmNavItem name="nav-team" listener={mockListener}>
//               <WmAnchor
//                 name="nav-team-anchor"
//                 caption="Team"
//                 iconclass="fa fa-users"
//                 hyperlink="#team"
//                 listener={mockListener}
//               />
//             </WmNavItem>
//             <WmNavItem name="nav-reports" listener={mockListener}>
//               <WmAnchor
//                 name="nav-reports-anchor"
//                 caption="Reports"
//                 iconclass="fa fa-file-text"
//                 hyperlink="#reports"
//                 listener={mockListener}
//               />
//             </WmNavItem>
//           </Box>
//         </WmNavbar>
//       </TopNavDefaultExport>
//       <Box p={3} bgcolor="#fafafa" minHeight="400px">
//         <Typography variant="h6" fontWeight={600} gutterBottom>
//           Page Content Area
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           This is the main content area below the top navigation bar.
//         </Typography>
//       </Box>
//     </Box>
//   ),
//   args: {
//     name: "basicTopNav",
//   },
// };


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
      <Box width="100%" data-design-token-target={dataAttr}>
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
        <Box p={3} bgcolor="#fafafa" minHeight="500px">
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Main Content Area
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This is the main content area. Use the top navigation to navigate between different sections.
          </Typography>
          {/* <Box p={2} bgcolor="white" borderRadius={1} boxShadow="0 1px 3px rgba(0,0,0,0.1)">
            <Typography variant="body2" gutterBottom>
              <strong>Design Token Integration:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try hovering over navigation items to see the hover state design tokens in action.
              Click on "Projects" or "Help" to expand dropdown menus. Use the Design Tokens panel to customize
              the navigation bar's appearance, including background color, height, border, and shadow.
            </Typography>
          </Box> */}
        </Box>
      </Box>
    );
  },
  args: {
    name: "standardTopNav",
    "data-design-token-target": "true"
  },
  argTypes: {
    "data-design-token-target": { control: false }
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

// export const SimpleNavigation: Story = {
//   render: Template,
//   args: {
//     name: "simpleNav",
//     listener: mockListener,
//     children: (
//       <Box p={1.5} bgcolor="#f5f5f5" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={2} justifyContent="center">
//           <Link href="#" underline="none" color="text.primary">
//             Home
//           </Link>
//           <Link href="#" underline="none" color="text.primary">
//             About
//           </Link>
//           <Link href="#" underline="none" color="text.primary">
//             Services
//           </Link>
//           <Link href="#" underline="none" color="text.primary">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const HorizontalTabs: Story = {
//   tags: ['show-panel'],
//   render: () => {
//     const [value, setValue] = useState(0);

//     const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
//       setValue(newValue);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <TopNavDefaultExport name="tabsNav" listener={mockListener}>
//           <Box bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//             <Tabs value={value} onChange={handleChange} aria-label="navigation tabs">
//               <Tab label="Overview" />
//               <Tab label="Analytics" />
//               <Tab label="Reports" />
//               <Tab label="Settings" />
//             </Tabs>
//           </Box>
//         </TopNavDefaultExport>
//         <Box p={3} bgcolor="#f5f5f5" minHeight="300px" mt={2}>
//           <Typography variant="body2" color="text.secondary">
//             Content for Tab {value + 1}
//           </Typography>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "tabsNav",
//     listener: mockListener,
//   },
// };

// export const BreadcrumbNavigation: Story = {
//   tags: ['show-panel'],
//   render: (args) => (
//     <Box style={{ padding: 16 }}>
//       <TopNavDefaultExport {...args} listener={mockListener}>
//         {args.children}
//       </TopNavDefaultExport>
//       <Box p={3} bgcolor="#f5f5f5" minHeight="300px" mt={2}>
//         <Typography variant="body2" color="text.secondary">
//           Page Content Area
//         </Typography>
//       </Box>
//     </Box>
//   ),
//   args: {
//     name: "breadcrumbNav",
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Breadcrumbs aria-label="breadcrumb">
//           <Link href="#" underline="hover" color="inherit">
//             Home
//           </Link>
//           <Link href="#" underline="hover" color="inherit">
//             Projects
//           </Link>
//           <Link href="#" underline="hover" color="inherit">
//             Web Application
//           </Link>
//           <Typography color="text.primary">Current Page</Typography>
//         </Breadcrumbs>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithButtons: Story = {
//   render: Template,
//   args: {
//     name: "navButtons",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={1}>
//           <Button variant="text">Dashboard</Button>
//           <Button variant="text">Projects</Button>
//           <Button variant="text">Team</Button>
//           <Button variant="text">Calendar</Button>
//           <Button variant="contained" sx={{ ml: "auto" }}>
//             New Item
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const DarkTopNav: Story = {
//   render: Template,
//   args: {
//     name: "darkNav",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#2c3e50" color="#ffffff">
//         <Stack direction="row" spacing={3}>
//           <Link href="#" color="inherit" underline="hover">
//             Dashboard
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Analytics
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Reports
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Settings
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ColoredTopNav: Story = {
//   render: Template,
//   args: {
//     name: "coloredNav",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#1976d2" color="#ffffff">
//         <Stack direction="row" spacing={3} alignItems="center">
//           <Typography variant="h6" fontWeight="600">
//             Section
//           </Typography>
//           <Link href="#" color="inherit" underline="hover">
//             Overview
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Details
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             History
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithIcons: Story = {
//   render: Template,
//   args: {
//     name: "navIcons",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={3} alignItems="center">
//           <Stack direction="row" spacing={1} alignItems="center">
//             <i className="fa fa-home" />
//             <Link href="#" underline="hover">
//               Home
//             </Link>
//           </Stack>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <i className="fa fa-dashboard" />
//             <Link href="#" underline="hover">
//               Dashboard
//             </Link>
//           </Stack>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <i className="fa fa-folder" />
//             <Link href="#" underline="hover">
//               Projects
//             </Link>
//           </Stack>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <i className="fa fa-cog" />
//             <Link href="#" underline="hover">
//               Settings
//             </Link>
//           </Stack>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithBadges: Story = {
//   render: Template,
//   args: {
//     name: "navBadges",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={3} alignItems="center">
//           <Link href="#" underline="hover">
//             Dashboard
//           </Link>
//           <Stack direction="row" spacing={0.5} alignItems="center">
//             <Link href="#" underline="hover">
//               Tasks
//             </Link>
//             <Chip label="12" size="small" color="error" />
//           </Stack>
//           <Stack direction="row" spacing={0.5} alignItems="center">
//             <Link href="#" underline="hover">
//               Messages
//             </Link>
//             <Chip label="3" size="small" color="primary" />
//           </Stack>
//           <Link href="#" underline="hover">
//             Settings
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const TwoRowNavigation: Story = {
//   render: Template,
//   args: {
//     name: "twoRowNav",
//     listener: mockListener,
//     children: (
//       <Box bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Box p={1.5} borderBottom="1px solid #e0e0e0">
//           <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
//             <Typography variant="h6">Dashboard</Typography>
//             <Stack direction="row" spacing={1}>
//               <Button variant="outlined" size="small">
//                 Export
//               </Button>
//               <Button variant="contained" size="small">
//                 New Report
//               </Button>
//             </Stack>
//           </Stack>
//         </Box>
//         <Box px={1.5}>
//           <Stack direction="row" spacing={3}>
//             <Link href="#" underline="none" sx={{ py: 1.5, borderBottom: "2px solid #1976d2" }}>
//               Overview
//             </Link>
//             <Link href="#" underline="none" sx={{ py: 1.5 }} color="text.secondary">
//               Analytics
//             </Link>
//             <Link href="#" underline="none" sx={{ py: 1.5 }} color="text.secondary">
//               Reports
//             </Link>
//             <Link href="#" underline="none" sx={{ py: 1.5 }} color="text.secondary">
//               Settings
//             </Link>
//           </Stack>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithSearch: Story = {
//   render: Template,
//   args: {
//     name: "navSearch",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={3} alignItems="center">
//           <Stack direction="row" spacing={3} flex={1}>
//             <Link href="#" underline="hover">
//               Dashboard
//             </Link>
//             <Link href="#" underline="hover">
//               Projects
//             </Link>
//             <Link href="#" underline="hover">
//               Team
//             </Link>
//           </Stack>
//           <Box
//             component="input"
//             type="search"
//             placeholder="Search..."
//             sx={{
//               padding: "6px 12px",
//               border: "1px solid #e0e0e0",
//               borderRadius: "4px",
//               width: "200px",
//               "&:focus": {
//                 outline: "none",
//                 borderColor: "#1976d2",
//               },
//             }}
//           />
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithDropdown: Story = {
//   render: () => {
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//       setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//       setAnchorEl(null);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <TopNavDefaultExport name="navDropdown" listener={mockListener}>
//           <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//             <Stack direction="row" spacing={3} alignItems="center">
//               <Link href="#" underline="hover">
//                 Home
//               </Link>
//               <Link href="#" underline="hover">
//                 About
//               </Link>
//               <Box
//                 onClick={handleClick}
//                 sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 0.5 }}
//               >
//                 <Link component="span" underline="hover">
//                   Products
//                 </Link>
//                 <i className="fa fa-chevron-down" style={{ fontSize: 12 }} />
//               </Box>
//               <Link href="#" underline="hover">
//                 Contact
//               </Link>
//             </Stack>
//           </Box>
//         </TopNavDefaultExport>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//           <MenuItem onClick={handleClose}>Product A</MenuItem>
//           <MenuItem onClick={handleClose}>Product B</MenuItem>
//           <MenuItem onClick={handleClose}>Product C</MenuItem>
//         </Menu>
//         <Box p={3} bgcolor="#f5f5f5" minHeight="300px" mt={2}>
//           <Typography variant="body2" color="text.secondary">
//             Page Content Area
//           </Typography>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "navDropdown",
//     listener: mockListener,
//   },
// };

// export const NavigationWithUser: Story = {
//   render: Template,
//   args: {
//     name: "navUser",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
//           <Stack direction="row" spacing={3}>
//             <Link href="#" underline="hover">
//               Dashboard
//             </Link>
//             <Link href="#" underline="hover">
//               Projects
//             </Link>
//             <Link href="#" underline="hover">
//               Team
//             </Link>
//           </Stack>
//           <Stack direction="row" spacing={2} alignItems="center">
//             <IconButton size="small">
//               <i className="fa fa-bell" />
//             </IconButton>
//             <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
//           </Stack>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const CompactTopNav: Story = {
//   render: Template,
//   args: {
//     name: "compactNav",
//     listener: mockListener,
//     children: (
//       <Box p={1} bgcolor="#f5f5f5" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={2} justifyContent="center">
//           <Link href="#" variant="body2" underline="hover">
//             Overview
//           </Link>
//           <Link href="#" variant="body2" underline="hover">
//             Details
//           </Link>
//           <Link href="#" variant="body2" underline="hover">
//             Settings
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const LargeTopNav: Story = {
//   render: Template,
//   args: {
//     name: "largeNav",
//     listener: mockListener,
//     children: (
//       <Box p={3} bgcolor="#ffffff" borderBottom="2px solid #e0e0e0">
//         <Stack direction="row" spacing={4}>
//           <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
//             Dashboard
//           </Link>
//           <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
//             Analytics
//           </Link>
//           <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
//             Reports
//           </Link>
//           <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
//             Team
//           </Link>
//           <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
//             Settings
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const CenteredNavigation: Story = {
//   render: Template,
//   args: {
//     name: "centeredNav",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={3} justifyContent="center">
//           <Link href="#" underline="hover">
//             Home
//           </Link>
//           <Link href="#" underline="hover">
//             Products
//           </Link>
//           <Link href="#" underline="hover">
//             About
//           </Link>
//           <Link href="#" underline="hover">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithDividers: Story = {
//   render: Template,
//   args: {
//     name: "navDividers",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={2} alignItems="center" divider={<Typography color="text.secondary">|</Typography>}>
//           <Link href="#" underline="hover">
//             Home
//           </Link>
//           <Link href="#" underline="hover">
//             Dashboard
//           </Link>
//           <Link href="#" underline="hover">
//             Projects
//           </Link>
//           <Link href="#" underline="hover">
//             Settings
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const GradientTopNav: Story = {
//   render: Template,
//   args: {
//     name: "gradientNav",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         sx={{
//           background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
//           color: "#ffffff",
//         }}
//       >
//         <Stack direction="row" spacing={3}>
//           <Link href="#" color="inherit" underline="hover">
//             Dashboard
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Analytics
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Reports
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Settings
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const NavigationWithChips: Story = {
//   render: Template,
//   args: {
//     name: "navChips",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={1}>
//           <Chip label="All" color="primary" clickable />
//           <Chip label="Active" clickable />
//           <Chip label="Completed" clickable />
//           <Chip label="Archived" clickable />
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const StickyTopNav: Story = {
//   render: Template,
//   args: {
//     name: "stickyNav",
//     listener: mockListener,
//     styles: {
//       position: "sticky",
//       top: 0,
//       zIndex: 100,
//     },
//     children: (
//       <Box p={2} bgcolor="#ffffff" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
//         <Stack direction="row" spacing={3}>
//           <Link href="#" underline="hover">
//             Dashboard
//           </Link>
//           <Link href="#" underline="hover">
//             Projects
//           </Link>
//           <Link href="#" underline="hover">
//             Team
//           </Link>
//           <Link href="#" underline="hover">
//             Reports
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ResponsiveTopNav: Story = {
//   render: Template,
//   args: {
//     name: "responsiveNav",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
//           <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" } }}>
//             <Link href="#" underline="hover">
//               Dashboard
//             </Link>
//             <Link href="#" underline="hover">
//               Projects
//             </Link>
//             <Link href="#" underline="hover">
//               Team
//             </Link>
//             <Link href="#" underline="hover">
//               Settings
//             </Link>
//           </Stack>
//           <IconButton sx={{ display: { xs: "block", md: "none" } }}>
//             <i className="fa fa-bars" />
//           </IconButton>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const CustomStyledTopNav: Story = {
//   render: Template,
//   args: {
//     name: "customStyledNav",
//     listener: mockListener,
//     styles: {
//       backgroundColor: "#ff5722",
//       color: "#ffffff",
//       padding: "16px",
//       borderRadius: "8px",
//       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//     },
//     children: (
//       <Stack direction="row" spacing={3}>
//         <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 600 }}>
//           Dashboard
//         </Link>
//         <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 600 }}>
//           Projects
//         </Link>
//         <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 600 }}>
//           Settings
//         </Link>
//       </Stack>
//     ),
//   },
// };
