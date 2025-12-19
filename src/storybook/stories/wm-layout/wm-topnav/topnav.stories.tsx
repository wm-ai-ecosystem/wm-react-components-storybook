import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Stack,
  Typography,
  Link,
  Button,
  IconButton,
  Tabs,
  Tab,
  Breadcrumbs,
  Chip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import TopNavDefaultExport from "../../../../components/layout/topnav/index";

const meta: Meta<typeof TopNavDefaultExport> = {
  title: "Layout/TopNav",
  component: TopNavDefaultExport,
  argTypes: {
    show: { control: "boolean" },
    className: { control: "text" },
  },
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

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <TopNavDefaultExport {...args} listener={mockListener}>
      {args.children}
    </TopNavDefaultExport>
    <Box p={3} bgcolor="#f5f5f5" minHeight="300px" mt={2}>
      <Typography variant="body2" color="text.secondary">
        Page Content Area
      </Typography>
    </Box>
  </Box>
);

export const Default: Story = {
  render: Template,
  args: {
    name: "topnav1",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={3}>
          <Link href="#" underline="hover">
            Dashboard
          </Link>
          <Link href="#" underline="hover">
            Projects
          </Link>
          <Link href="#" underline="hover">
            Team
          </Link>
          <Link href="#" underline="hover">
            Reports
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const SimpleNavigation: Story = {
  render: Template,
  args: {
    name: "simpleNav",
    listener: mockListener,
    children: (
      <Box p={1.5} bgcolor="#f5f5f5" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link href="#" underline="none" color="text.primary">
            Home
          </Link>
          <Link href="#" underline="none" color="text.primary">
            About
          </Link>
          <Link href="#" underline="none" color="text.primary">
            Services
          </Link>
          <Link href="#" underline="none" color="text.primary">
            Contact
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const HorizontalTabs: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Box style={{ padding: 16 }}>
        <TopNavDefaultExport name="tabsNav" listener={mockListener}>
          <Box bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
            <Tabs value={value} onChange={handleChange} aria-label="navigation tabs">
              <Tab label="Overview" />
              <Tab label="Analytics" />
              <Tab label="Reports" />
              <Tab label="Settings" />
            </Tabs>
          </Box>
        </TopNavDefaultExport>
        <Box p={3} bgcolor="#f5f5f5" minHeight="300px" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Content for Tab {value + 1}
          </Typography>
        </Box>
      </Box>
    );
  },
  args: {
    name: "tabsNav",
    listener: mockListener,
  },
};

export const BreadcrumbNavigation: Story = {
  render: Template,
  args: {
    name: "breadcrumbNav",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="#" underline="hover" color="inherit">
            Home
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Projects
          </Link>
          <Link href="#" underline="hover" color="inherit">
            Web Application
          </Link>
          <Typography color="text.primary">Current Page</Typography>
        </Breadcrumbs>
      </Box>
    ),
  },
};

export const NavigationWithButtons: Story = {
  render: Template,
  args: {
    name: "navButtons",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={1}>
          <Button variant="text">Dashboard</Button>
          <Button variant="text">Projects</Button>
          <Button variant="text">Team</Button>
          <Button variant="text">Calendar</Button>
          <Button variant="contained" sx={{ ml: "auto" }}>
            New Item
          </Button>
        </Stack>
      </Box>
    ),
  },
};

export const DarkTopNav: Story = {
  render: Template,
  args: {
    name: "darkNav",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#2c3e50" color="#ffffff">
        <Stack direction="row" spacing={3}>
          <Link href="#" color="inherit" underline="hover">
            Dashboard
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Analytics
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Reports
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Settings
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const ColoredTopNav: Story = {
  render: Template,
  args: {
    name: "coloredNav",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#1976d2" color="#ffffff">
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6" fontWeight="600">
            Section
          </Typography>
          <Link href="#" color="inherit" underline="hover">
            Overview
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Details
          </Link>
          <Link href="#" color="inherit" underline="hover">
            History
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const NavigationWithIcons: Story = {
  render: Template,
  args: {
    name: "navIcons",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <i className="fa fa-home" />
            <Link href="#" underline="hover">
              Home
            </Link>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <i className="fa fa-dashboard" />
            <Link href="#" underline="hover">
              Dashboard
            </Link>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <i className="fa fa-folder" />
            <Link href="#" underline="hover">
              Projects
            </Link>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <i className="fa fa-cog" />
            <Link href="#" underline="hover">
              Settings
            </Link>
          </Stack>
        </Stack>
      </Box>
    ),
  },
};

export const NavigationWithBadges: Story = {
  render: Template,
  args: {
    name: "navBadges",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={3} alignItems="center">
          <Link href="#" underline="hover">
            Dashboard
          </Link>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Link href="#" underline="hover">
              Tasks
            </Link>
            <Chip label="12" size="small" color="error" />
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Link href="#" underline="hover">
              Messages
            </Link>
            <Chip label="3" size="small" color="primary" />
          </Stack>
          <Link href="#" underline="hover">
            Settings
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const TwoRowNavigation: Story = {
  render: Template,
  args: {
    name: "twoRowNav",
    listener: mockListener,
    children: (
      <Box bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Box p={1.5} borderBottom="1px solid #e0e0e0">
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Dashboard</Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small">
                Export
              </Button>
              <Button variant="contained" size="small">
                New Report
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box px={1.5}>
          <Stack direction="row" spacing={3}>
            <Link href="#" underline="none" sx={{ py: 1.5, borderBottom: "2px solid #1976d2" }}>
              Overview
            </Link>
            <Link href="#" underline="none" sx={{ py: 1.5 }} color="text.secondary">
              Analytics
            </Link>
            <Link href="#" underline="none" sx={{ py: 1.5 }} color="text.secondary">
              Reports
            </Link>
            <Link href="#" underline="none" sx={{ py: 1.5 }} color="text.secondary">
              Settings
            </Link>
          </Stack>
        </Box>
      </Box>
    ),
  },
};

export const NavigationWithSearch: Story = {
  render: Template,
  args: {
    name: "navSearch",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" spacing={3} flex={1}>
            <Link href="#" underline="hover">
              Dashboard
            </Link>
            <Link href="#" underline="hover">
              Projects
            </Link>
            <Link href="#" underline="hover">
              Team
            </Link>
          </Stack>
          <Box
            component="input"
            type="search"
            placeholder="Search..."
            sx={{
              padding: "6px 12px",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              width: "200px",
              "&:focus": {
                outline: "none",
                borderColor: "#1976d2",
              },
            }}
          />
        </Stack>
      </Box>
    ),
  },
};

export const NavigationWithDropdown: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box style={{ padding: 16 }}>
        <TopNavDefaultExport name="navDropdown" listener={mockListener}>
          <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
            <Stack direction="row" spacing={3} alignItems="center">
              <Link href="#" underline="hover">
                Home
              </Link>
              <Link href="#" underline="hover">
                About
              </Link>
              <Box
                onClick={handleClick}
                sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <Link component="span" underline="hover">
                  Products
                </Link>
                <i className="fa fa-chevron-down" style={{ fontSize: 12 }} />
              </Box>
              <Link href="#" underline="hover">
                Contact
              </Link>
            </Stack>
          </Box>
        </TopNavDefaultExport>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Product A</MenuItem>
          <MenuItem onClick={handleClose}>Product B</MenuItem>
          <MenuItem onClick={handleClose}>Product C</MenuItem>
        </Menu>
        <Box p={3} bgcolor="#f5f5f5" minHeight="300px" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Page Content Area
          </Typography>
        </Box>
      </Box>
    );
  },
  args: {
    name: "navDropdown",
    listener: mockListener,
  },
};

export const NavigationWithUser: Story = {
  render: Template,
  args: {
    name: "navUser",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={3}>
            <Link href="#" underline="hover">
              Dashboard
            </Link>
            <Link href="#" underline="hover">
              Projects
            </Link>
            <Link href="#" underline="hover">
              Team
            </Link>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton size="small">
              <i className="fa fa-bell" />
            </IconButton>
            <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
          </Stack>
        </Stack>
      </Box>
    ),
  },
};

export const CompactTopNav: Story = {
  render: Template,
  args: {
    name: "compactNav",
    listener: mockListener,
    children: (
      <Box p={1} bgcolor="#f5f5f5" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link href="#" variant="body2" underline="hover">
            Overview
          </Link>
          <Link href="#" variant="body2" underline="hover">
            Details
          </Link>
          <Link href="#" variant="body2" underline="hover">
            Settings
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const LargeTopNav: Story = {
  render: Template,
  args: {
    name: "largeNav",
    listener: mockListener,
    children: (
      <Box p={3} bgcolor="#ffffff" borderBottom="2px solid #e0e0e0">
        <Stack direction="row" spacing={4}>
          <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
            Dashboard
          </Link>
          <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
            Analytics
          </Link>
          <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
            Reports
          </Link>
          <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
            Team
          </Link>
          <Link href="#" underline="hover" sx={{ fontSize: "1.1rem" }}>
            Settings
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const CenteredNavigation: Story = {
  render: Template,
  args: {
    name: "centeredNav",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={3} justifyContent="center">
          <Link href="#" underline="hover">
            Home
          </Link>
          <Link href="#" underline="hover">
            Products
          </Link>
          <Link href="#" underline="hover">
            About
          </Link>
          <Link href="#" underline="hover">
            Contact
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const NavigationWithDividers: Story = {
  render: Template,
  args: {
    name: "navDividers",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={2} alignItems="center" divider={<Typography color="text.secondary">|</Typography>}>
          <Link href="#" underline="hover">
            Home
          </Link>
          <Link href="#" underline="hover">
            Dashboard
          </Link>
          <Link href="#" underline="hover">
            Projects
          </Link>
          <Link href="#" underline="hover">
            Settings
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const GradientTopNav: Story = {
  render: Template,
  args: {
    name: "gradientNav",
    listener: mockListener,
    children: (
      <Box
        p={2}
        sx={{
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
        }}
      >
        <Stack direction="row" spacing={3}>
          <Link href="#" color="inherit" underline="hover">
            Dashboard
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Analytics
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Reports
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Settings
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const NavigationWithChips: Story = {
  render: Template,
  args: {
    name: "navChips",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={1}>
          <Chip label="All" color="primary" clickable />
          <Chip label="Active" clickable />
          <Chip label="Completed" clickable />
          <Chip label="Archived" clickable />
        </Stack>
      </Box>
    ),
  },
};

export const StickyTopNav: Story = {
  render: Template,
  args: {
    name: "stickyNav",
    listener: mockListener,
    styles: {
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    children: (
      <Box p={2} bgcolor="#ffffff" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
        <Stack direction="row" spacing={3}>
          <Link href="#" underline="hover">
            Dashboard
          </Link>
          <Link href="#" underline="hover">
            Projects
          </Link>
          <Link href="#" underline="hover">
            Team
          </Link>
          <Link href="#" underline="hover">
            Reports
          </Link>
        </Stack>
      </Box>
    ),
  },
};

export const ResponsiveTopNav: Story = {
  render: Template,
  args: {
    name: "responsiveNav",
    listener: mockListener,
    children: (
      <Box p={2} bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
        <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" } }}>
            <Link href="#" underline="hover">
              Dashboard
            </Link>
            <Link href="#" underline="hover">
              Projects
            </Link>
            <Link href="#" underline="hover">
              Team
            </Link>
            <Link href="#" underline="hover">
              Settings
            </Link>
          </Stack>
          <IconButton sx={{ display: { xs: "block", md: "none" } }}>
            <i className="fa fa-bars" />
          </IconButton>
        </Stack>
      </Box>
    ),
  },
};

export const CustomStyledTopNav: Story = {
  render: Template,
  args: {
    name: "customStyledNav",
    listener: mockListener,
    styles: {
      backgroundColor: "#ff5722",
      color: "#ffffff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    children: (
      <Stack direction="row" spacing={3}>
        <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 600 }}>
          Dashboard
        </Link>
        <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 600 }}>
          Projects
        </Link>
        <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 600 }}>
          Settings
        </Link>
      </Stack>
    ),
  },
};
