import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Avatar, Chip, Button } from "@mui/material";
import WmList from "../../../../components/data/list";

import { iconClassNames } from "../../constants/iconClassConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import listTokensData from "../../../../designTokens/components/list/list.json";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

// Sample datasets
const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", avatar: "/personIcon.svg" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", avatar: "/personIcon.svg" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager", avatar: "/personIcon.svg" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "User", avatar: "/personIcon.svg" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "Developer", avatar: "/personIcon.svg" },
  { id: 6, name: "Diana Prince", email: "diana@example.com", role: "Admin", avatar: "/personIcon.svg" },
  { id: 7, name: "Ethan Hunt", email: "ethan@example.com", role: "User", avatar: "/personIcon.svg" },
  { id: 8, name: "Fiona Gallagher", email: "fiona@example.com", role: "Manager", avatar: "/personIcon.svg" },
];

const productsData = [
  { id: 1, name: "Laptop Pro", price: 1299, category: "Electronics", inStock: true },
  { id: 2, name: "Wireless Mouse", price: 29, category: "Accessories", inStock: true },
  { id: 3, name: "Keyboard", price: 79, category: "Accessories", inStock: false },
  // { id: 4, name: "Monitor 27\"", price: 399, category: "Electronics", inStock: true },
  // { id: 5, name: "USB-C Hub", price: 49, category: "Accessories", inStock: true },
  // { id: 6, name: "Webcam HD", price: 89, category: "Electronics", inStock: true },
];

const tasksData = [
  { id: 1, title: "Complete project report", status: "In Progress", priority: "High", dueDate: "2025-01-15" },
  { id: 2, title: "Review pull requests", status: "Pending", priority: "Medium", dueDate: "2025-01-10" },
  { id: 3, title: "Update documentation", status: "Completed", priority: "Low", dueDate: "2025-01-05" },
  { id: 4, title: "Fix critical bug", status: "In Progress", priority: "High", dueDate: "2025-01-08" },
  { id: 5, title: "Team meeting preparation", status: "Pending", priority: "Medium", dueDate: "2025-01-12" },
];

const meta = {
  title: "Data/List",
  component: WmList,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmList>;

export default meta;
type Story = StoryObj<typeof meta>;

const DesignTokenTemplate = (args: any) => {
    //component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;
  
    return (
      <Box style={{ padding: 16, width:"100%" }} data-design-token-target={dataAttr}>
        <WmList {...componentArgs} listener={mockListener} />
      </Box>
    );
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
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14249&p=f&t=TmoXZ4j5uVxcseDO-0",
        label: "",
      }}
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args:{
    name:"showcaseList",
    listener:mockListener
  },
  argTypes:{
    name:{table:{disable:true}},
    listener:{table:{disable:true}}
  }
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 4, width: "100%" }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        List Examples
      </Typography>
      <Stack spacing={8} sx={{ mt: 4, width: "100%" }}>

        {/* 1. Vertical Product List */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Vertical Product List
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Clean vertical layout with full-width cards
          </Typography>
          <WmList
            name="verticalProductList"
            title="Products"
            subheading="Available products"
            iconclass="wi wi-shopping-cart"
            dataset={productsData}
            listener={mockListener}
            direction="vertical"
            renderItem={(item: any) => (
              <Box
                sx={{
                  width: "100%", // Full available width
                  padding: 2,
                  mb: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  boxShadow: 1,
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                  <Box sx={{ flex: 1, minWidth: 200 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, flexWrap: "wrap" }}>
                      <Typography variant="body2" color="text.secondary">{item.category}</Typography>
                      <Chip
                        label={item.inStock ? "In Stock" : "Out of Stock"}
                        size="small"
                        color={item.inStock ? "success" : "error"}
                        variant="outlined"
                      />
                    </Stack>
                  </Box>
                  <Typography variant="h5" color="primary.main" sx={{ mt: { xs: 1, sm: 0 } }}>
                    ${item.price}
                  </Typography>
                </Stack>
              </Box>
            )}
          />
        </Box>

        {/* 2. Horizontal Product List */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Horizontal Product List
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Scrollable horizontal cards
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Stack direction="row" spacing={2} sx={{ flexWrap: "nowrap", width: "max-content" }}>
              {productsData.slice(0, 4).map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    minWidth: 220,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    textAlign: "center",
                    padding: 2,
                    "&:hover": { boxShadow: 3, transform: "translateY(-2px)", transition: "all 0.3s" }
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      bgcolor: "grey.200",
                      borderRadius: 1,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Typography variant="h3" color="text.secondary">📦</Typography>
                  </Box>
                  <Typography variant="subtitle1" gutterBottom>{item.name}</Typography>
                  <Typography variant="h6" color="primary">${item.price}</Typography>
                  <Button size="small" variant="contained" sx={{ mt: 1 }} fullWidth>
                    Add to Cart
                  </Button>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* 3. Load-On-Demand List */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Load-On-Demand List
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Pagination example using "On-Demand"
          </Typography>
          <WmList
            name="onDemandList"
            title="Users"
            subheading="Load more on demand"
            iconclass="wi wi-refresh"
            dataset={usersData}
            navigation="On-Demand"
            pagesize={3}
            ondemandmessage="Load More Users"
            listener={mockListener}
            renderItem={(item: any) => (
              <Box
                sx={{
                  width: "100%",
                  padding: 2,
                  mb: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  "&:hover": { boxShadow: 2 }
                }}
              >
                <Avatar src={item.avatar} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.email}</Typography>
                </Box>
                <Chip label={item.role} size="small" />
              </Box>
            )}
          />
        </Box>

        {/* 4. Advanced Pagination List */}
        {/* <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Advanced Pagination
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Full pagination controls
          </Typography>
          <WmList
            name="advancedPaginationList"
            title="Users with Advanced Pagination"
            subheading="Full pagination controls"
            iconclass="wi wi-users"
            dataset={usersData}
            navigation="Advanced"
            pagesize={2}
            maxsize={5}
            boundarylinks
            showrecordcount
            allowpagesizechange
            pagesizeoptions="2,4,6,8"
            navigationalign="center"
            listener={mockListener}
            renderItem={(item: any) => (
              <Box
                sx={{
                  width: "100%",
                  padding: 2,
                  mb: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  "&:hover": { boxShadow: 2 }
                }}
              >
                <Avatar src={item.avatar} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.email}</Typography>
                </Box>
                <Chip label={item.role} size="small" color="primary" />
              </Box>
            )}
          />
        </Box> */}

        {/* 5. Reorderable Task List */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Reorderable Task List
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Drag-and-drop reordering
          </Typography>
          <WmList
            name="reorderableTaskList"
            title="Task Priority"
            subheading="Drag to reorder"
            dataset={tasksData.slice(0, 4)}
            enablereorder
            listener={mockListener}
            onReorder={(event, data, changedItem) => console.log("List reordered:", data, changedItem)}
            renderItem={(item: any) => (
              <Box
                sx={{
                  width: "100%",
                  padding: 2,
                  cursor: "grab",
                  "&:active": { cursor: "grabbing" },
                  mb: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h4" sx={{ opacity: 0.3 }}>☰</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.status}</Typography>
                  </Box>
                  <Chip label={item.priority} size="small" color={item.priority === "High" ? "error" : "default"} />
                </Stack>
              </Box>
            )}
          />
        </Box>

        {/* 6. MultiSelect Task List */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={500}>
            MultiSelect Task List
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Select multiple tasks
          </Typography>
          <WmList
            name="multiSelectTaskList"
            title="Tasks"
            subheading="Select multiple tasks"
            iconclass="wi wi-check-square"
            dataset={tasksData}
            multiselect
            navigation="None"
            listener={mockListener}
            renderItem={(item: any) => (
              <Box
                sx={{
                  width: "100%",
                  padding: 2,
                  mb: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { boxShadow: 2 },
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Typography variant="body2" color="text.secondary">Status: {item.status}</Typography>
                    <Typography variant="body2" color="text.secondary">Due: {item.dueDate}</Typography>
                  </Stack>
                </Box>
                <Chip
                  label={item.priority}
                  size="small"
                  color={item.priority === "High" ? "error" : item.priority === "Medium" ? "warning" : "default"}
                />
              </Box>
            )}
          />
        </Box>

      </Stack>
    </Box>
  ),
  args:{
    name:"showcaseList",
    listener:mockListener
  },
  argTypes:{
    name:{table:{disable:true}},
    listener:{table:{disable:true}}
  }
};


export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardList",
    title: "User List",
    subheading: "All registered users",
    iconclass: "fa fa-user",
    dataset: usersData,
    navigation: "Advanced",
    pagesize: 3,
    maxsize: 5,
    boundarylinks: true,
    direction: "vertical",
    multiselect: false,
    showrecordcount: true,
    collapsible: false,
    selectfirstitem: false,
    enablereorder: false,
    allowpagesizechange: true,
    pagesizeoptions: "3,5,8",
    navigationalign: "left",
    listener: mockListener,
    "data-design-token-target": true,
    renderItem: (item: any) => (
      <Box sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={item.avatar} alt={item.name} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">{item.email}</Typography>
        </Box>
        <Chip label={item.role} size="small" color="primary" />
      </Box>
    ),
  },
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    navigation: {
      control: "select",
      options: ["None", "Basic", "Pager", "Classic", "Advanced", "Inline", "On-Demand", "Scroll"]
    },
    direction: {
      control: "select",
      options: ["vertical", "horizontal"]
    },
    pagesize: { control: "number" },
    maxsize: { control: "number" },
    boundarylinks: { control: "boolean" },
    multiselect: { control: "boolean" },
    collapsible: { control: "boolean" },
    selectfirstitem: { control: "boolean" },
    showrecordcount: { control: "boolean" },
    enablereorder: { control: "boolean" },
    allowpagesizechange: { control: "boolean" },
    pagesizeoptions: { control: "text" },
    navigationalign: {
      control: "select",
      options: ["left", "center", "right"]
    },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    renderItem: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: listTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "list",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

// export const Basic: Story = {
//   tags: ['show-panel'],
//   args: {
//     name: "basicList",
//     title: "User List",
//     subheading: "All registered users",
//     iconclass: "fa fa-user",
//     dataset: usersData,
//     navigation: "Advanced",
//     pagesize: 3,
//     maxsize: 5,
//     boundarylinks: true,
//     direction: "vertical",
//     multiselect: false,
//     showrecordcount: true,
//     collapsible: false,
//     selectfirstitem: false,
//     enablereorder: false,
//     allowpagesizechange: true,
//     pagesizeoptions: "3,5,8",
//     navigationalign: "left",
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
//         <Avatar src={item.avatar} alt={item.name} />
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h6">{item.name}</Typography>
//           <Typography variant="body2" color="text.secondary">{item.email}</Typography>
//         </Box>
//         <Chip label={item.role} size="small" color="primary" />
//       </Box>
//     ),
//   },
//   argTypes: {
//     title: { control: "text" },
//     subheading: { control: "text" },
//     iconclass:{ control:{ type:"select"}, options: iconClassNames },
//     navigation: {
//       control: "select",
//       options: ["None", "Basic", "Pager", "Classic", "Advanced", "Inline", "On-Demand", "Scroll"]
//     },
//     direction: {
//       control: "select",
//       options: ["vertical", "horizontal"]
//     },
//     pagesize: { control: "number" },
//     maxsize: { control: "number" },
//     boundarylinks: { control: "boolean" },
//     multiselect: { control: "boolean" },
//     collapsible: { control: "boolean" },
//     selectfirstitem: { control: "boolean" },
//     showrecordcount: { control: "boolean" },
//     enablereorder: { control: "boolean" },
//     allowpagesizechange: { control: "boolean" },
//     pagesizeoptions: { control: "text" },
//     navigationalign: {
//       control: "select",
//       options: ["left", "center", "right"]
//     },
//   }
// };