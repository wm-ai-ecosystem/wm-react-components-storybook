import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import { BreadCrumb } from "../../../../components/navigation/breadcrumb/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

// Import design tokens from the centralized design tokens directory
import breadcrumbTokensData from "../../../../designTokens/components/breadcrumb/breadcrumb.json";

const mockListener = {
  appLocale: {
    LABEL_BREADCRUMB: "Breadcrumb",
  },
  Widgets: {},
};

const DesignTokenTemplate = (args: any) => {
  // Component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": _, ...componentArgs } = args as any;

  return (
    <Box className="wm-app" style={{ padding: 16 }} data-design-token-target="true">
      <BreadCrumb {...componentArgs} />
    </Box>
  );
};

// Mock navigation nodes for different scenarios
const basicNavNodes = [
  { id: "1", label: "Home", link: "/", icon: "fa fa-home" },
  { id: "2", label: "Products", link: "/products" },
  { id: "3", label: "Electronics", link: "/products/electronics" },
];

const shortNavNodes = [
  { id: "1", label: "Home", link: "/", icon: "fa fa-home" },
  { id: "2", label: "Products", link: "/products" },
];

const longNavNodes = [
  { id: "1", label: "Home", link: "/", icon: "fa fa-home" },
  { id: "2", label: "Company", link: "/company" },
  { id: "3", label: "About Us", link: "/company/about" },
  { id: "4", label: "Team", link: "/company/about/team" },
  { id: "5", label: "Engineering", link: "/company/about/team/engineering" },
  { id: "6", label: "Frontend", link: "/company/about/team/engineering/frontend" },
];

const meta = {
  title: "Navigation/Breadcrumb",
  component: BreadCrumb,
} satisfies Meta<typeof BreadCrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
    //   styling={styling}
      style={style}
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=58796-991&p=f",
        label: "",
      }}
    />
  ),
  args: {
    name: "docsBreadcrumb",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    onBeforenavigate: {table: {disable: true}},
    navNodes: {table: {disable: true}}
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Breadcrumb Showcase
          </Typography>

          {/* Classic Breadcrumb */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Classic Breadcrumb (3 levels)
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Traditional breadcrumb with forward slash separator
            </Typography> */}
            <Box>
              <BreadCrumb
                name="classicShowcase"
                className="classic"
                navNodes={basicNavNodes}
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Attribute-based Breadcrumb */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Attribute-based Breadcrumb (3 levels)
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Breadcrumb with chevron icon separator
            </Typography> */}
            <Box>
              <BreadCrumb
                name="attributeBasedShowcase"
                className="attribute-based"
                navNodes={basicNavNodes}
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Path-based Breadcrumb */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Path-based Breadcrumb (3 levels)
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Modern breadcrumb with background highlighting for active item
            </Typography> */}
            <Box>
              <BreadCrumb
                name="pathBasedShowcase"
                className="path-based"
                navNodes={basicNavNodes}
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Different Depths */}
          <Stack spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Different Navigation Depths
            </Typography>

            <Stack spacing={3}>
              {/* 2 levels */}
              <Box sx={{ flex: "1 1 45%", minWidth: "400px" }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                  2 Levels
                </Typography>
                <Box>
                  <BreadCrumb
                    name="shortNav"
                    className="classic"
                    navNodes={shortNavNodes}
                    listener={mockListener}
                  />
                </Box>
              </Box>

              {/* 6 levels */}
              <Box sx={{ flex: "1 1 45%", minWidth: "400px", marginLeft: "0" }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                  6 Levels (Deep Navigation)
                </Typography>
                <Box>
                  <BreadCrumb
                    name="longNav"
                    className="classic"
                    navNodes={longNavNodes}
                    listener={mockListener}
                  />
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "breadcrumbShowcase",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    onBeforenavigate: {table: {disable: true}},
    navNodes: {table: {disable: true}}
  },
};

export const Classic: Story = {
  tags: ["show-panel"],
  render: DesignTokenTemplate,
  args: {
    name: "classicBreadcrumb",
    className: "classic",
    navNodes: basicNavNodes,
    listener: mockListener,
    "data-design-token-target": true,
  },
  argTypes: {
    className: {
      control: "select",
      options: ["classic"],
      description: "Classic breadcrumb style with forward slash separator",
      table: {disable : true}
    },
    navNodes: {
      control: "object",
      description: "Array of navigation nodes with label, link, and optional icon",
    },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    onBeforenavigate: {table: {disable: true}},
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: breadcrumbTokensData,
      componentKey: "breadcrumb",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const AttributeBased: Story = {
  tags: ["show-panel"],
  render: DesignTokenTemplate,
  args: {
    name: "attributeBasedBreadcrumb",
    className: "attribute-based",
    navNodes: basicNavNodes,
    listener: mockListener,
    "data-design-token-target": true,
  },
  argTypes: {
    className: {
      control: "select",
      options: ["attribute-based"],
      description: "Attribute-based breadcrumb style with chevron icon separator",
      table: {disable : true}
    },
    navNodes: {
      control: "object",
      description: "Array of navigation nodes with label, link, and optional icon",
    },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    onBeforenavigate: {table: {disable: true}},
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: breadcrumbTokensData,
      componentKey: "breadcrumb",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};

export const PathBased: Story = {
  tags: ["show-panel"],
  render: DesignTokenTemplate,
  args: {
    name: "pathBasedBreadcrumb",
    className: "path-based",
    navNodes: basicNavNodes,
    listener: mockListener,
    "data-design-token-target": true,
  },
  argTypes: {
    className: {
      control: "select",
      options: ["path-based"],
      description: "Path-based breadcrumb style with background highlighting",
      table: {disable : true}
    },
    navNodes: {
      control: "object",
      description: "Array of navigation nodes with label, link, and optional icon",
    },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    onBeforenavigate: {table: {disable: true}},
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: breadcrumbTokensData,
      componentKey: "breadcrumb",
      extractCSSVariablesAtRuntime: true,
    },
    layout: "fullscreen",
  },
};
