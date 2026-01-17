import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Avatar, Chip, Button } from "@mui/material";
import WmList from "../../../../components/data/list";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

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
  // argTypes: {
  //   title: { control: "text" },
  //   subheading: { control: "text" },
  //   iconclass:{
  //     control:{
  //       type:"select"
  //     },
  //     options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
  //       "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-user"],
  //   },
  //   navigation: {
  //     control: "select",
  //     options: ["None", "Basic", "Pager", "Classic", "Advanced", "Inline", "On-Demand", "Scroll"]
  //   },
  //   direction: {
  //     control: "select",
  //     options: ["vertical", "horizontal"]
  //   },
  //   pagesize: { control: "number" },
  //   multiselect: { control: "boolean" },
  //   collapsible: { control: "boolean" },
  //   selectfirstitem: { control: "boolean" },
  //   showrecordcount: { control: "boolean" },
  //   enablereorder: { control: "boolean" },
  // },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmList>;

export default meta;
type Story = StoryObj<typeof meta>;

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
  parameters: {
    layout: 'fullscreen',
  },
  args:{
    name:"showcaseList",
    listener:mockListener
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
  }
};




export const Basic: Story = {
  tags: ['show-panel'],
  args: {
    name: "basicList",
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
    iconclass:{
      control:{
        type:"select"
      },
      options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart",
        "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-user"],
    },
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
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    return (
      <Box sx={{ p: 4, width: "100%" }}>
        <div data-design-token-target="true">
          <WmList {...args} />
        </div>
      </Box>
    );
  },
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
    iconclass:{control: false},
    navigation: {
      control: "select",
      options: ["None", "Basic", "Pager", "Classic", "Advanced", "Inline", "On-Demand", "Scroll"]
    },
    direction: {control: false},
    pagesize: { control: false },
    maxsize: { control: false },
    boundarylinks: { control: false },
    multiselect: { control: false },
    collapsible: { control: false },
    selectfirstitem: { control: false },
    showrecordcount: { control: false },
    enablereorder: { control: false },
    allowpagesizechange: { control: false },
    pagesizeoptions: { control: false },
    navigationalign: {control:false},
    dataset:{control: false}
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

// export const WithPagination: Story = {
//   tags: ['show-panel'],
//   args: {
//     name: "paginatedList",
//     title: "Users",
//     subheading: "Paginated user list",
//     iconclass: "",
//     dataset: usersData,
//     navigation: "Basic",
//     pagesize: 3,
//     showrecordcount: true,
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 2 }}>
//         <Stack direction="row" spacing={2} alignItems="center">
//           <Avatar src={item.avatar} />
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="subtitle1">{item.name}</Typography>
//             <Typography variant="body2" color="text.secondary">{item.email}</Typography>
//           </Box>
//           <Typography variant="caption" sx={{ bgcolor: "primary.light", px: 1, py: 0.5, borderRadius: 1 }}>
//             {item.role}
//           </Typography>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ReorderableList: Story = {
//   tags: ['show-panel'],
//   args: {
//     name: "reorderableList",
//     title: "Task Priority",
//     subheading: "Drag to reorder",
//     iconclass: "",
//     dataset: tasksData.slice(0, 4),
//     enablereorder: true,
//     listener: mockListener,
//     onReorder: (event, data, changedItem) => {
//       console.log("List reordered:", data, changedItem);
//     },
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 2, cursor: "grab", "&:active": { cursor: "grabbing" } }}>
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <Typography variant="h4" sx={{ opacity: 0.3 }}>☰</Typography>
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="subtitle1">{item.title}</Typography>
//             <Typography variant="body2" color="text.secondary">{item.status}</Typography>
//           </Box>
//           <Chip label={item.priority} size="small" color={item.priority === "High" ? "error" : "default"} />
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const ProductList: Story = {
//   args: {
//     name: "productList",
//     title: "Products",
//     subheading: "Available products",
//     iconclass: "wi wi-shopping-cart",
//     dataset: productsData,
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 2 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="h6">{item.name}</Typography>
//             <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
//               <Typography variant="body2" color="text.secondary">{item.category}</Typography>
//               <Chip
//                 label={item.inStock ? "In Stock" : "Out of Stock"}
//                 size="small"
//                 color={item.inStock ? "success" : "error"}
//                 variant="outlined"
//               />
//             </Stack>
//           </Box>
//           <Typography variant="h5" color="primary.main">${item.price}</Typography>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const MultiSelect: Story = {
//   args: {
//     name: "multiSelectList",
//     title: "Tasks",
//     subheading: "Select multiple tasks",
//     iconclass: "wi wi-check-square",
//     dataset: tasksData,
//     multiselect: true,
//     navigation: "None",
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={1}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Typography variant="subtitle1">{item.title}</Typography>
//             <Chip
//               label={item.priority}
//               size="small"
//               color={item.priority === "High" ? "error" : item.priority === "Medium" ? "warning" : "default"}
//             />
//           </Stack>
//           <Stack direction="row" spacing={2}>
//             <Typography variant="body2" color="text.secondary">Status: {item.status}</Typography>
//             <Typography variant="body2" color="text.secondary">Due: {item.dueDate}</Typography>
//           </Stack>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const GroupedList: Story = {
//   args: {
//     name: "groupedList",
//     title: "Grouped Users",
//     subheading: "Users grouped by role",
//     iconclass: "wi wi-folder",
//     dataset: usersData,
//     groupby: "role",
//     collapsible: true,
//     showcount: true,
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
//         <Avatar src={item.avatar} />
//         <Box>
//           <Typography variant="subtitle1">{item.name}</Typography>
//           <Typography variant="body2" color="text.secondary">{item.email}</Typography>
//         </Box>
//       </Box>
//     ),
//   },
// };

// export const HorizontalList: Story = {
//   args: {
//     name: "horizontalList",
//     title: "Product Gallery",
//     subheading: "Scroll horizontally",
//     iconclass: "wi wi-grid",
//     dataset: productsData.slice(0, 4),
//     direction: "horizontal",
//     itemsperrow: "4",
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box
//         sx={{
//           padding: 2,
//           minWidth: 200,
//           border: "1px solid #e0e0e0",
//           borderRadius: 1,
//           textAlign: "center"
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             height: 120,
//             bgcolor: "grey.200",
//             borderRadius: 1,
//             mb: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//         >
//           <Typography variant="h3" color="text.secondary">📦</Typography>
//         </Box>
//         <Typography variant="subtitle1" gutterBottom>{item.name}</Typography>
//         <Typography variant="h6" color="primary">${item.price}</Typography>
//         <Button size="small" variant="contained" sx={{ mt: 1 }} fullWidth>
//           Add to Cart
//         </Button>
//       </Box>
//     ),
//   },
// };

// export const OnDemandLoading: Story = {
//   args: {
//     name: "onDemandList",
//     title: "Users",
//     subheading: "Load more on demand",
//     iconclass: "wi wi-refresh",
//     dataset: usersData,
//     navigation: "On-Demand",
//     pagesize: 3,
//     ondemandmessage: "Load More Users",
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
//         <Avatar src={item.avatar} />
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="subtitle1">{item.name}</Typography>
//           <Typography variant="body2" color="text.secondary">{item.email}</Typography>
//         </Box>
//         <Chip label={item.role} size="small" />
//       </Box>
//     ),
//   },
// };

// export const CardLayout: Story = {
//   args: {
//     name: "cardList",
//     title: "User Cards",
//     subheading: "Grid layout with cards",
//     iconclass: "wi wi-grid",
//     dataset: usersData.slice(0, 6),
//     itemsperrow: "3",
//     navigation: "None",
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box
//         sx={{
//           padding: 2,
//           border: "1px solid #e0e0e0",
//           borderRadius: 2,
//           textAlign: "center",
//           "&:hover": {
//             boxShadow: 2,
//             transform: "translateY(-2px)",
//             transition: "all 0.3s"
//           }
//         }}
//       >
//         <Avatar
//           src={item.avatar}
//           sx={{ width: 80, height: 80, margin: "0 auto 16px" }}
//         />
//         <Typography variant="h6" gutterBottom>{item.name}</Typography>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           {item.email}
//         </Typography>
//         <Chip label={item.role} size="small" color="primary" sx={{ mt: 1 }} />
//       </Box>
//     ),
//   },
// };

// export const InteractiveList: Story = {
//   render: () => {
//     const [selectedItems, setSelectedItems] = useState<any[]>([]);
//     const [eventLog, setEventLog] = useState<string[]>([]);

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setEventLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     return (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={3}>
//           <WmList
//             name="interactiveList"
//             title="Interactive List"
//             subheading="Click items to see events"
//             iconclass="wi wi-pointer"
//             dataset={usersData.slice(0, 5)}
//             multiselect={true}
//             listener={mockListener}
//             onClick={(event, widget) => addLog("List item clicked")}
//             onDblclick={(event, widget) => addLog("List item double-clicked")}
//             onSelect={(widget, selectedItem) => {
//               addLog(`Item selected: ${selectedItem?.name || "None"}`);
//               setSelectedItems(widget.selectedItems || []);
//             }}
//             renderItem={(item: any) => (
//               <Box sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
//                 <Avatar src={item.avatar} />
//                 <Box sx={{ flex: 1 }}>
//                   <Typography variant="subtitle1">{item.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">{item.email}</Typography>
//                 </Box>
//               </Box>
//             )}
//           />

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Selected Items: {selectedItems.length}
//             </Typography>
//             {selectedItems.length > 0 && (
//               <Stack spacing={0.5}>
//                 {selectedItems.map((item: any, index: number) => (
//                   <Typography key={index} variant="body2">
//                     • {item.name}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>

//           {eventLog.length > 0 && (
//             <Box sx={{ padding: 2, backgroundColor: "#e3f2fd", borderRadius: 1 }}>
//               <Typography variant="subtitle2" gutterBottom>
//                 Event Log:
//               </Typography>
//               <Stack spacing={0.5}>
//                 {eventLog.map((log, index) => (
//                   <Typography key={index} variant="body2" sx={{ fontFamily: "monospace", fontSize: "11px" }}>
//                     {log}
//                   </Typography>
//                 ))}
//               </Stack>
//             </Box>
//           )}
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const CompactList: Story = {
//   args: {
//     name: "compactList",
//     title: "Recent Activity",
//     subheading: "Latest updates",
//     iconclass: "wi wi-bell",
//     dataset: tasksData,
//     navigation: "None",
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 1.5, borderBottom: "1px solid #e0e0e0" }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Typography variant="body2">{item.title}</Typography>
//           <Typography variant="caption" color="text.secondary">{item.status}</Typography>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const EmptyList: Story = {
//   args: {
//     name: "emptyList",
//     title: "No Data",
//     subheading: "This list is empty",
//     iconclass: "wi wi-inbox",
//     dataset: [],
//     nodatamessage: "No items found. Try adding some data.",
//     listener: mockListener,
//   },
// };

// export const AdvancedPagination: Story = {
//   args: {
//     name: "advancedList",
//     title: "Users with Advanced Pagination",
//     subheading: "Full pagination controls",
//     iconclass: "wi wi-users",
//     dataset: usersData,
//     navigation: "Advanced",
//     pagesize: 2,
//     maxsize: 5,
//     boundarylinks: true,
//     showrecordcount: true,
//     allowpagesizechange: true,
//     pagesizeoptions: "2,4,6,8",
//     navigationalign: "center",
//     listener: mockListener,
//     renderItem: (item: any) => (
//       <Box sx={{ padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
//         <Avatar src={item.avatar} />
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="subtitle1">{item.name}</Typography>
//           <Typography variant="body2" color="text.secondary">{item.email}</Typography>
//         </Box>
//         <Chip label={item.role} size="small" color="primary" />
//       </Box>
//     ),
//   },
// };
