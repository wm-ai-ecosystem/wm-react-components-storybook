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
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import headerTokensData from "../../../../designTokens/components/page-header/page-header.json";


const meta: Meta<typeof HeaderDefaultExport> = {
  title: "Layout/Header",
  component: HeaderDefaultExport,
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
  args:{} as any,
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
  argTypes:{
    name: {table:{disable:true}},
    listener:{table:{disable:true}},
    children:{table:{disable:true}}
  }
};

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
    "data-design-token-target":true
  },
  argTypes:{
    name: {table: {disable: true}},
    listener:{table:{disable: true}},
    children:{table:{disable: true}},
    "data-design-token-target": { table: {disable: true} }
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