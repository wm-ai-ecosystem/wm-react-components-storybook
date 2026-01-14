import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Stack,
  Typography,
  Link,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";

import HeaderDefaultExport from "../../../../components/layout/header/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import headerTokensData from "../../../../designTokens/components/page-header/page-header.json";


const meta: Meta<typeof HeaderDefaultExport> = {
  title: "Layout/Header",
  component: HeaderDefaultExport,
  // argTypes: {
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
    name:"docsHeader"
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: (args: any) => (
    <>
      {/* Page intro — OUTSIDE header component */}
      <Box px={{ xs: 2, md: 3 }} py={3} sx={{ width: "100%", display: "block",}}>
        <Typography variant="h6" fontWeight={600} textAlign="left">
          Header Showcase
        </Typography>
      </Box>

      <HeaderDefaultExport {...args} listener={mockListener}>
        {args.children}
      </HeaderDefaultExport>
    </>
  ),

  args: {
    name: "headerShowcase",
    listener: mockListener,

    children: (
      <Stack spacing={4} px={{ xs: 2, md: 3 }} py={3} bgcolor="#fafafa">

        {/* Simple Navigation */}
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Simple Header
          </Typography>

          <Box
            bgcolor="#ffffff"
            borderBottom="1px solid"
            borderColor="divider"
            position="relative"
            zIndex={1}
          >
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src="https://docs.wavemaker.com/learn/img/WM_blue_logo.png"
                  sx={{ width: 32, height: 32 }}
                />
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                  AppName
                </Typography>
              </Stack>

              <Stack direction="row" spacing={3}>
                <Link underline="hover">Home</Link>
                <Link underline="hover">Features</Link>
                <Link underline="hover">Contact</Link>
              </Stack>
            </Box>
          </Box>
        </Stack>

        {/* Header with Search */}
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Header with Search
          </Typography>

          <Box
            bgcolor="#ffffff"
            borderBottom="1px solid"
            borderColor="divider"
            position="relative"
            zIndex={1}
          >
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src="https://docs.wavemaker.com/learn/img/WM_blue_logo.png"
                  sx={{ width: 32, height: 32 }}
                />
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                  Company
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

              <Stack direction="row" spacing={2}>
                <Link underline="hover">Docs</Link>
                <Link underline="hover">Login</Link>
              </Stack>
            </Box>
          </Box>
        </Stack>

        {/* Header with Notifications */}
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Header with Notifications
          </Typography>

          <Box
            bgcolor="#ffffff"
            borderBottom="1px solid"
            borderColor="divider"
            position="relative"
            zIndex={1}
          >
            <Box
              px={3}
              py={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src="https://docs.wavemaker.com/learn/img/WM_blue_logo.png"
                  sx={{ width: 32, height: 32 }}
                />
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                  Dashboard
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="small">
                  <Badge badgeContent={4} color="error">
                    <i className="fa fa-bell" />
                  </Badge>
                </IconButton>

                <IconButton size="small">
                  <Badge badgeContent={7} color="primary">
                    <i className="fa fa-envelope" />
                  </Badge>
                </IconButton>

                <Avatar sx={{ width: 32, height: 32 }}>
                  JD
                </Avatar>
              </Stack>
            </Box>
          </Box>
        </Stack>

      </Stack>
    ),
  },
};


// export const Basic: Story = {
//   tags: ['show-panel'],
//   render: (args: any) => (
//     <HeaderDefaultExport {...args} listener={mockListener}>
//       {args.children}
//     </HeaderDefaultExport>
//   ),
//   args: {
//     name: "basicHeader",
//     listener: mockListener,
//     children: (
//       <Box
//         px={3}
//         py={2}
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         bgcolor="#ffffff"
//       >
//         <Stack direction="row" spacing={1.5} alignItems="center">
//           <Avatar
//             src="https://docs.wavemaker.com/learn/img/WM_blue_logo.png"
//             sx={{ width: 40, height: 40 }}
//           />
//           <Typography variant="body2" fontWeight={600} color="text.secondary">
//             Wavemaker
//           </Typography>
//         </Stack>

//         <Box
//           component="input"
//           type="search"
//           placeholder="Search…"
//           style={{
//             minWidth: "200px",
//             padding: "10px 16px",
//             borderRadius: 6,
//             border: "1px solid #e0e0e0",
//             fontSize: "14px",
//           }}
//         />
//       </Box>
//     ),
//   },
// };

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    //component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
    
    return (
      <Box style={{ padding: 16, width: "100%" }} data-design-token-target={dataAttr}>
        <HeaderDefaultExport {...componentArgs} listener={mockListener}>
          {componentArgs.children}
        </HeaderDefaultExport>
      </Box>
    );
  },
  args: {
    name: "StandardHeader",
    listener: mockListener,
    children: (
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
      </Box>
    ),
    "data-design-token-target":"true"
  },
  argTypes:{
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: headerTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "header",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

// export const SimpleHeader: Story = {
//   render: Template,
//   args: {
//     name: "simpleHeader",
//     listener: mockListener,
//     children: (
//       <Box p={2} bgcolor="#f5f5f5" textAlign="center">
//         <Typography variant="h5" fontWeight="600">
//           Brand Name
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const NavigationHeader: Story = {
//   render: Template,
//   args: {
//     name: "navHeader",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#2c3e50"
//         color="#ffffff"
//       >
//         <Typography variant="h6" fontWeight="600">
//           Logo
//         </Typography>
//         <Stack direction="row" spacing={3}>
//           <Link href="#" color="inherit" underline="hover">
//             Home
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Products
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Services
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             About
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const HeaderWithActions: Story = {
//   render: Template,
//   args: {
//     name: "headerActions",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#ffffff"
//         boxShadow="0 2px 4px rgba(0,0,0,0.1)"
//       >
//         <Typography variant="h6">Dashboard</Typography>
//         <Stack direction="row" spacing={2}>
//           <Button variant="outlined" size="small">
//             Settings
//           </Button>
//           <Button variant="contained" size="small">
//             Profile
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const HeaderWithSearch: Story = {
//   render: Template,
//   args: {
//     name: "headerSearch",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#ffffff"
//         borderBottom="1px solid #e0e0e0"
//       >
//         <Typography variant="h6" fontWeight="600">
//           Brand
//         </Typography>
//         <Box
//           component="input"
//           type="search"
//           placeholder="Search..."
//           sx={{
//             padding: "8px 16px",
//             border: "1px solid #e0e0e0",
//             borderRadius: "20px",
//             width: "300px",
//             "&:focus": {
//               outline: "none",
//               borderColor: "#1976d2",
//             },
//           }}
//         />
//         <Stack direction="row" spacing={2}>
//           <Link href="#" underline="hover">
//             Login
//           </Link>
//           <Link href="#" underline="hover">
//             Sign Up
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const HeaderWithIcons: Story = {
//   render: Template,
//   args: {
//     name: "headerIcons",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#1976d2"
//         color="#ffffff"
//       >
//         <Typography variant="h6" fontWeight="600">
//           App Name
//         </Typography>
//         <Stack direction="row" spacing={1}>
//           <IconButton sx={{ color: "#ffffff" }}>
//             <Badge badgeContent={3} color="error">
//               <i className="fa fa-bell" />
//             </Badge>
//           </IconButton>
//           <IconButton sx={{ color: "#ffffff" }}>
//             <Badge badgeContent={5} color="error">
//               <i className="fa fa-envelope" />
//             </Badge>
//           </IconButton>
//           <IconButton sx={{ color: "#ffffff" }}>
//             <i className="fa fa-cog" />
//           </IconButton>
//           <Avatar sx={{ width: 32, height: 32, bgcolor: "#1565c0" }}>U</Avatar>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const HeaderWithUserMenu: Story = {
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
//         <HeaderDefaultExport name="headerUserMenu" listener={mockListener}>
//           <Box
//             p={2}
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             bgcolor="#ffffff"
//             boxShadow="0 1px 3px rgba(0,0,0,0.1)"
//           >
//             <Typography variant="h6">Application</Typography>
//             <Stack direction="row" spacing={3} alignItems="center">
//               <Link href="#" underline="hover">
//                 Dashboard
//               </Link>
//               <Link href="#" underline="hover">
//                 Reports
//               </Link>
//               <Link href="#" underline="hover">
//                 Analytics
//               </Link>
//               <Box
//                 sx={{ cursor: "pointer" }}
//                 onClick={handleClick}
//                 display="flex"
//                 alignItems="center"
//                 gap={1}
//               >
//                 <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
//                 <i className="fa fa-chevron-down" style={{ fontSize: 12 }} />
//               </Box>
//             </Stack>
//           </Box>
//         </HeaderDefaultExport>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//           <MenuItem onClick={handleClose}>Profile</MenuItem>
//           <MenuItem onClick={handleClose}>Settings</MenuItem>
//           <Divider />
//           <MenuItem onClick={handleClose}>Logout</MenuItem>
//         </Menu>
//       </Box>
//     );
//   },
//   args: {
//     name: "headerUserMenu",
//     listener: mockListener,
//   },
// };

// export const StickyHeader: Story = {
//   render: Template,
//   args: {
//     name: "stickyHeader",
//     listener: mockListener,
//     styles: {
//       position: "sticky",
//       top: 0,
//       zIndex: 1000,
//     },
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#ffffff"
//         boxShadow="0 2px 8px rgba(0,0,0,0.1)"
//       >
//         <Typography variant="h6">Sticky Header</Typography>
//         <Stack direction="row" spacing={2}>
//           <Link href="#" underline="hover">
//             Features
//           </Link>
//           <Link href="#" underline="hover">
//             Pricing
//           </Link>
//           <Link href="#" underline="hover">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const FixedHeader: Story = {
//   render: Template,
//   args: {
//     name: "fixedHeader",
//     listener: mockListener,
//     styles: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000,
//     },
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#263238"
//         color="#ffffff"
//       >
//         <Typography variant="h6">Fixed Header</Typography>
//         <Stack direction="row" spacing={2}>
//           <Link href="#" color="inherit">
//             Home
//           </Link>
//           <Link href="#" color="inherit">
//             Services
//           </Link>
//           <Link href="#" color="inherit">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ColoredHeader: Story = {
//   render: Template,
//   args: {
//     name: "coloredHeader",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2.5}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#9c27b0"
//         color="#ffffff"
//       >
//         <Typography variant="h5" fontWeight="600">
//           Purple Brand
//         </Typography>
//         <Stack direction="row" spacing={3}>
//           <Link href="#" color="inherit" underline="hover">
//             Home
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             About
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const GradientHeader: Story = {
//   render: Template,
//   args: {
//     name: "gradientHeader",
//     listener: mockListener,
//     children: (
//       <Box
//         p={3}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           color: "#ffffff",
//         }}
//       >
//         <Typography variant="h5" fontWeight="700">
//           Gradient Brand
//         </Typography>
//         <Stack direction="row" spacing={3}>
//           <Link href="#" color="inherit" sx={{ fontWeight: 500 }}>
//             Products
//           </Link>
//           <Link href="#" color="inherit" sx={{ fontWeight: 500 }}>
//             Solutions
//           </Link>
//           <Link href="#" color="inherit" sx={{ fontWeight: 500 }}>
//             Pricing
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const HeaderWithLogo: Story = {
//   render: Template,
//   args: {
//     name: "headerLogo",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#ffffff"
//         borderBottom="2px solid #f0f0f0"
//       >
//         <Box display="flex" alignItems="center" gap={2}>
//           <Box
//             component="img"
//             src="https://via.placeholder.com/40x40/1976d2/ffffff?text=L"
//             alt="Logo"
//             sx={{ width: 40, height: 40, borderRadius: 1 }}
//           />
//           <Typography variant="h6" fontWeight="600">
//             Company Name
//           </Typography>
//         </Box>
//         <Stack direction="row" spacing={2}>
//           <Button variant="text">Home</Button>
//           <Button variant="text">Products</Button>
//           <Button variant="text">Services</Button>
//           <Button variant="contained">Get Started</Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const CompactHeader: Story = {
//   render: Template,
//   args: {
//     name: "compactHeader",
//     listener: mockListener,
//     children: (
//       <Box
//         p={1.5}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#f5f5f5"
//         borderBottom="1px solid #e0e0e0"
//       >
//         <Typography variant="body1" fontWeight="600">
//           Compact App
//         </Typography>
//         <Stack direction="row" spacing={2}>
//           <Link href="#" variant="body2">
//             Home
//           </Link>
//           <Link href="#" variant="body2">
//             About
//           </Link>
//           <Link href="#" variant="body2">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const LargeHeader: Story = {
//   render: Template,
//   args: {
//     name: "largeHeader",
//     listener: mockListener,
//     children: (
//       <Box p={4} bgcolor="#ffffff" boxShadow="0 2px 8px rgba(0,0,0,0.08)">
//         <Stack spacing={2}>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Typography variant="h4" fontWeight="700">
//               Large Header
//             </Typography>
//             <Stack direction="row" spacing={2}>
//               <IconButton>
//                 <i className="fa fa-search" />
//               </IconButton>
//               <IconButton>
//                 <Badge badgeContent={2} color="error">
//                   <i className="fa fa-bell" />
//                 </Badge>
//               </IconButton>
//               <Avatar>U</Avatar>
//             </Stack>
//           </Box>
//           <Stack direction="row" spacing={4}>
//             <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
//               Dashboard
//             </Link>
//             <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
//               Projects
//             </Link>
//             <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
//               Team
//             </Link>
//             <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
//               Calendar
//             </Link>
//             <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
//               Reports
//             </Link>
//           </Stack>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const TwoRowHeader: Story = {
//   render: Template,
//   args: {
//     name: "twoRowHeader",
//     listener: mockListener,
//     children: (
//       <Box bgcolor="#ffffff" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
//         <Box
//           p={1.5}
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           bgcolor="#f5f5f5"
//           borderBottom="1px solid #e0e0e0"
//         >
//           <Typography variant="body2" color="text.secondary">
//             Welcome to our platform!
//           </Typography>
//           <Stack direction="row" spacing={2}>
//             <Link href="#" variant="body2">
//               Support
//             </Link>
//             <Link href="#" variant="body2">
//               Login
//             </Link>
//           </Stack>
//         </Box>
//         <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6" fontWeight="600">
//             Brand Name
//           </Typography>
//           <Stack direction="row" spacing={3}>
//             <Link href="#" underline="hover">
//               Home
//             </Link>
//             <Link href="#" underline="hover">
//               Products
//             </Link>
//             <Link href="#" underline="hover">
//               Services
//             </Link>
//             <Link href="#" underline="hover">
//               Contact
//             </Link>
//           </Stack>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const HeaderWithBreadcrumbs: Story = {
//   render: Template,
//   args: {
//     name: "headerBreadcrumbs",
//     listener: mockListener,
//     children: (
//       <Box bgcolor="#ffffff" borderBottom="1px solid #e0e0e0">
//         <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">Application</Typography>
//           <Avatar>JD</Avatar>
//         </Box>
//         <Box px={2} pb={2}>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Link href="#" underline="hover" variant="body2">
//               Home
//             </Link>
//             <Typography variant="body2" color="text.secondary">
//               /
//             </Typography>
//             <Link href="#" underline="hover" variant="body2">
//               Projects
//             </Link>
//             <Typography variant="body2" color="text.secondary">
//               /
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Current Project
//             </Typography>
//           </Stack>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const MinimalistHeader: Story = {
//   render: Template,
//   args: {
//     name: "minimalistHeader",
//     listener: mockListener,
//     children: (
//       <Box p={2} display="flex" justifyContent="center" borderBottom="1px solid #e0e0e0">
//         <Stack direction="row" spacing={4} alignItems="center">
//           <Typography variant="h6" fontWeight="600">
//             Brand
//           </Typography>
//           <Link href="#" underline="none" color="text.primary">
//             Work
//           </Link>
//           <Link href="#" underline="none" color="text.primary">
//             About
//           </Link>
//           <Link href="#" underline="none" color="text.primary">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const DarkHeader: Story = {
//   render: Template,
//   args: {
//     name: "darkHeader",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#212121"
//         color="#ffffff"
//       >
//         <Typography variant="h6" fontWeight="600">
//           Dark Theme
//         </Typography>
//         <Stack direction="row" spacing={3}>
//           <Link href="#" color="inherit" underline="hover">
//             Features
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             Pricing
//           </Link>
//           <Link href="#" color="inherit" underline="hover">
//             About
//           </Link>
//           <Button variant="contained" color="primary" size="small">
//             Sign Up
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const LightHeader: Story = {
//   render: Template,
//   args: {
//     name: "lightHeader",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#fafafa"
//         borderBottom="1px solid #e0e0e0"
//       >
//         <Typography variant="h6" color="primary" fontWeight="600">
//           Light Theme
//         </Typography>
//         <Stack direction="row" spacing={3}>
//           <Link href="#" underline="hover">
//             Home
//           </Link>
//           <Link href="#" underline="hover">
//             Blog
//           </Link>
//           <Link href="#" underline="hover">
//             Shop
//           </Link>
//           <Button variant="outlined" size="small">
//             Login
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const HeaderWithTabs: Story = {
//   render: () => {
//     const [activeTab, setActiveTab] = useState(0);

//     return (
//       <Box style={{ padding: 16 }}>
//         <HeaderDefaultExport name="headerTabs" listener={mockListener}>
//           <Box bgcolor="#ffffff" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
//             <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6" fontWeight="600">
//                 Application
//               </Typography>
//               <Avatar>JD</Avatar>
//             </Box>
//             <Box px={2} display="flex" gap={1} borderTop="1px solid #e0e0e0">
//               {["Dashboard", "Projects", "Team", "Settings"].map((tab, index) => (
//                 <Box
//                   key={index}
//                   component="button"
//                   onClick={() => setActiveTab(index)}
//                   sx={{
//                     padding: "12px 20px",
//                     backgroundColor: "transparent",
//                     color: activeTab === index ? "#1976d2" : "#666",
//                     border: "none",
//                     borderBottom: activeTab === index ? "3px solid #1976d2" : "3px solid transparent",
//                     cursor: "pointer",
//                     fontWeight: activeTab === index ? 600 : 400,
//                     transition: "all 0.2s",
//                     "&:hover": {
//                       color: "#1976d2",
//                     },
//                   }}
//                 >
//                   {tab}
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </HeaderDefaultExport>
//       </Box>
//     );
//   },
//   args: {
//     name: "headerTabs",
//     listener: mockListener,
//   },
// };

// export const ResponsiveHeader: Story = {
//   render: Template,
//   args: {
//     name: "responsiveHeader",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#ffffff"
//         boxShadow="0 1px 3px rgba(0,0,0,0.1)"
//       >
//         <Typography variant="h6" fontWeight="600">
//           Responsive App
//         </Typography>
//         <Box sx={{ display: { xs: "block", md: "none" } }}>
//           <IconButton>
//             <i className="fa fa-bars" />
//           </IconButton>
//         </Box>
//         <Stack
//           direction="row"
//           spacing={3}
//           sx={{ display: { xs: "none", md: "flex" } }}
//         >
//           <Link href="#" underline="hover">
//             Home
//           </Link>
//           <Link href="#" underline="hover">
//             Products
//           </Link>
//           <Link href="#" underline="hover">
//             Services
//           </Link>
//           <Link href="#" underline="hover">
//             Contact
//           </Link>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const HeaderWithNotifications: Story = {
//   render: Template,
//   args: {
//     name: "headerNotifications",
//     listener: mockListener,
//     children: (
//       <Box
//         p={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bgcolor="#ffffff"
//         boxShadow="0 2px 4px rgba(0,0,0,0.08)"
//       >
//         <Typography variant="h6" fontWeight="600">
//           Dashboard
//         </Typography>
//         <Stack direction="row" spacing={2} alignItems="center">
//           <Box
//             component="input"
//             type="search"
//             placeholder="Search..."
//             sx={{
//               padding: "6px 12px",
//               border: "1px solid #e0e0e0",
//               borderRadius: "4px",
//               "&:focus": { outline: "none", borderColor: "#1976d2" },
//             }}
//           />
//           <IconButton>
//             <Badge badgeContent={12} color="error">
//               <i className="fa fa-bell" />
//             </Badge>
//           </IconButton>
//           <IconButton>
//             <Badge badgeContent={3} color="primary">
//               <i className="fa fa-envelope" />
//             </Badge>
//           </IconButton>
//           <IconButton>
//             <Badge badgeContent={5} color="warning">
//               <i className="fa fa-comment" />
//             </Badge>
//           </IconButton>
//           <Avatar sx={{ bgcolor: "#1976d2" }}>AB</Avatar>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const CustomStyledHeader: Story = {
//   render: Template,
//   args: {
//     name: "customStyledHeader",
//     listener: mockListener,
//     styles: {
//       backgroundColor: "#ff5722",
//       color: "#ffffff",
//       padding: "16px 24px",
//       borderRadius: "0 0 8px 8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//     },
//     children: (
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6" fontWeight="700">
//           Custom Styled Header
//         </Typography>
//         <Stack direction="row" spacing={2}>
//           <Button variant="outlined" sx={{ color: "#ffffff", borderColor: "#ffffff" }}>
//             Login
//           </Button>
//           <Button variant="contained" sx={{ bgcolor: "#ffffff", color: "#ff5722" }}>
//             Sign Up
//           </Button>
//         </Stack>
//       </Box>
//     ),
//   },
// };
