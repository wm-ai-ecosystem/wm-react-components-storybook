import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import TreeDefaultExport from "../../../../components/basic/tree/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof TreeDefaultExport> = {
  title: "Basic/Tree",
  component: TreeDefaultExport,
  // argTypes: {
  //   dataset: { control: "object" },
  //   datavalue: { control: "text" },
  //   treeicons: {
  //     control: { type: "select" },
  //     options: ["fa fa-minus", "fa fa-arrow-right", "fa fa-folder-tree", "fa fa-circle"],
  //   },
  //   levels: { control: "number" },
  //   nodelabel: { control: "text" },
  //   nodeicon: { control: "text" },
  //   nodechildren: { control: "text" },
  //   nodeid: { control: "text" },
  //   nodeclick: {
  //     control: { type: "select" },
  //     options: ["expand", "none"],
  //   },
  //   orderby: { control: "text" },
  //   horizontalalign: {
  //     control: { type: "select" },
  //     options: ["left", "center", "right"],
  //   },
  //   show: { control: "boolean" },
  //   // tabindex: { control: "number" },
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
  onChange: () => {},
};

// Sample tree data
// const simpleTreeData = [
//   {
//     label: "Node 1",
//     id: "node1",
//     icon:"",
//     children: [
//       { label: "Node 1.1", id: "node1_1" },
//       { label: "Node 1.2", id: "node1_2" },
//     ],
//   },
//   {
//     label: "Node 2",
//     id: "node2",
//     icon:"",
//     children: [
//       { label: "Node 2.1", id: "node2_1" },
//       { label: "Node 2.2", id: "node2_2" },
//     ],
//   },
//   {
//     label: "Node 3",
//     id: "node3",
//     icon:""
//   },
// ];

// const fileSystemData = [
//   {
//     label: "Documents",
//     icon: "fa fa-folder",
//     id: "docs",
//     children: [
//       {
//         label: "Work",
//         icon: "fa fa-folder",
//         id: "work",
//         children: [
//           { label: "Report.pdf", icon: "fa fa-file-pdf-o", id: "report" },
//           { label: "Presentation.pptx", icon: "fa fa-file-powerpoint-o", id: "ppt" },
//         ],
//       },
//       {
//         label: "Personal",
//         icon: "fa fa-folder",
//         id: "personal",
//         children: [
//           { label: "Resume.doc", icon: "fa fa-file-word-o", id: "resume" },
//           { label: "Photo.jpg", icon: "fa fa-file-image-o", id: "photo" },
//         ],
//       },
//     ],
//   },
//   {
//     label: "Downloads",
//     icon: "fa fa-folder",
//     id: "downloads",
//     children: [
//       { label: "Software.zip", icon: "fa fa-file-archive-o", id: "software" },
//       { label: "Music.mp3", icon: "fa fa-file-audio-o", id: "music" },
//     ],
//   },
// ];

const organizationData = [
  {
    label: "CEO",
    name: "John Smith",
    id: "ceo",
    children: [
      {
        label: "CTO",
        name: "Sarah Johnson",
        id: "cto",
        children: [
          { label: "Dev Team Lead", name: "Mike Chen", id: "devlead" },
          { label: "QA Team Lead", name: "Emma Wilson", id: "qalead" },
        ],
      },
      {
        label: "CFO",
        name: "David Brown",
        id: "cfo",
        children: [
          { label: "Accounting Manager", name: "Lisa Anderson", id: "accmgr" },
          { label: "Finance Analyst", name: "Tom Davis", id: "finanalyst" },
        ],
      },
    ],
  },
];

// const deepNestedData = [
//   {
//     label: "Level 1",
//     id: "l1",
//     children: [
//       {
//         label: "Level 2",
//         id: "l2",
//         children: [
//           {
//             label: "Level 3",
//             id: "l3",
//             children: [
//               {
//                 label: "Level 4",
//                 id: "l4",
//                 children: [
//                   { label: "Level 5", id: "l5" },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <TreeDefaultExport {...args} listener={mockListener} />
  </Box>
);

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
    name:"docsTree",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// export const Basic: Story = {
//   render: Template,
//   args: {
//     name: "basicTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "fa fa-circle",
//     nodeclick: "none",
//     horizontalalign: "left",
//     show: true,
//   },
// };

export const Showcase: Story = {
  render: Template,
  args: {
    name: "showcaseOrgChart",
    listener: mockListener,
    dataset: organizationData,
    treeicons: "fa fa-arrow-right",
    levels: 2,
    horizontalalign: "left",
    show: true,
  },
  argTypes: {
    dataset: { control: "object" },
    treeicons: {
      control: { type: "select" },
      options: ["fa fa-minus", "fa fa-arrow-right", "fa fa-folder-tree", "fa fa-circle"],
    },
    levels: { control: "number" },
    horizontalalign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    show: { control: "boolean" },
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "customPropsTree",
    listener: mockListener,
    dataset: [
      {
        title: "Node 1",
        customId: "custom1",
        subnodes: [
          { title: "Node 1.1", customId: "custom1_1" },
          { title: "Node 1.2", customId: "custom1_2" },
        ],
      },
      {
        title: "Node 2",
        customId: "custom2",
      },
    ],
    nodelabel: "title",
    nodeid: "customId",
    nodechildren: "subnodes",
    treeicons: "fa fa-folder-tree",
    horizontalalign: "left",
    show: true,
  },
  argTypes: {
    dataset: { control: "object" },
    datavalue: { control: "text" },
    treeicons: {
      control: { type: "select" },
      options: ["fa fa-minus", "fa fa-arrow-right", "fa fa-folder-tree", "fa fa-circle"],
    },
    levels: { control: "number" },
    nodelabel: { control: "text" },
    nodeicon: { control: "text" },
    nodechildren: { control: "text" },
    nodeid: { control: "text" },
    nodeclick: {
      control: { type: "select" },
      options: ["expand", "none"],
    },
    orderby: { control: "text" },
    horizontalalign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    show: { control: "boolean" },
  },
};


// export const FileSystemTree: Story = {
//   render: Template,
//   args: {
//     name: "fileSystemTree",
//     listener: mockListener,
//     dataset: fileSystemData,
//     treeicons: "fa fa-folder-tree",
//     levels: 1,
//     horizontalalign: "left",
//     show: true,
//   },
// };

// export const ExpandAllLevels: Story = {
//   render: Template,
//   args: {
//     name: "allLevelsTree",
//     listener: mockListener,
//     dataset: deepNestedData,
//     treeicons: "fa fa-minus",
//     levels: 10,
//     horizontalalign: "left",
//     show: true,
//   },
// };

// export const StringDataset: Story = {
//   render: Template,
//   args: {
//     name: "stringTree",
//     listener: mockListener,
//     dataset: "Node 1, Node 2, Node 3, Node 4",
//     treeicons: "plus-minus",
//   },
// };

// export const PlusMinusIcons: Story = {
//   render: Template,
//   args: {
//     name: "plusMinusTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "plus-minus",
//   },
// };

// export const ArrowIcons: Story = {
//   render: Template,
//   args: {
//     name: "arrowTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "arrows",
//   },
// };

// export const FolderIcons: Story = {
//   render: Template,
//   args: {
//     name: "folderTree",
//     listener: mockListener,
//     dataset: fileSystemData,
//     treeicons: "folder",
//   },
// };

// export const CheckboxTree: Story = {
//   render: Template,
//   args: {
//     name: "checkboxTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "plus-minus",
//     className: "Checkbox",
//   },
// };

// export const RadioTree: Story = {
//   render: Template,
//   args: {
//     name: "radioTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "plus-minus",
//     className: "Radio",
//   },
// };

// export const ExpandOneLevelDeep: Story = {
//   render: Template,
//   args: {
//     name: "level1Tree",
//     listener: mockListener,
//     dataset: deepNestedData,
//     treeicons: "plus-minus",
//     levels: 1,
//   },
// };

// export const ExpandTwoLevelsDeep: Story = {
//   render: Template,
//   args: {
//     name: "level2Tree",
//     listener: mockListener,
//     dataset: deepNestedData,
//     treeicons: "plus-minus",
//     levels: 2,
//   },
// };


// export const CollapsedByDefault: Story = {
//   render: Template,
//   args: {
//     name: "collapsedTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "plus-minus",
//     levels: 0,
//   },
// };

// export const NodeClickExpand: Story = {
//   render: Template,
//   args: {
//     name: "clickExpandTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "plus-minus",
//     nodeclick: "expand",
//   },
// };

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "plus-minus",
//     styles: {
//       border: "1px solid #e0e0e0",
//       borderRadius: "8px",
//       padding: "16px",
//       backgroundColor: "#f9f9f9",
//     },
//   },
// };

// export const CenterAligned: Story = {
//   render: Template,
//   args: {
//     name: "centerTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "plus-minus",
//     horizontalalign: "center",
//   },
// };

// export const RightAligned: Story = {
//   render: Template,
//   args: {
//     name: "rightTree",
//     listener: mockListener,
//     dataset: simpleTreeData,
//     treeicons: "plus-minus",
//     horizontalalign: "right",
//   },
// };

// export const WithEventHandlers: Story = {
//   render: () => {
//     const [eventLog, setEventLog] = useState<string[]>([]);

//     const addEvent = (eventName: string, data: any) => {
//       const message = `${eventName}: ${data.label || JSON.stringify(data)}`;
//       setEventLog((prev) => [message, ...prev].slice(0, 10));
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Tree with Event Handlers</Typography>
//           <TreeDefaultExport
//             name="eventTree"
//             dataset={simpleTreeData}
//             treeicons="plus-minus"
//             listener={mockListener}
//             onExpand={(event, widget, item, path) => addEvent("Expand", item)}
//             onCollapse={(event, widget, item, path) => addEvent("Collapse", item)}
//             onSelect={(event, widget, item, path) => addEvent("Select", item)}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Event Log:
//             </Typography>
//             {eventLog.length === 0 ? (
//               <Typography variant="body2" color="text.secondary">
//                 No events yet
//               </Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {eventLog.map((event, index) => (
//                   <Typography key={index} variant="body2" fontFamily="monospace">
//                     • {event}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "eventTree",
//     listener: mockListener,
//   },
// };

// export const CheckboxWithEvents: Story = {
//   render: () => {
//     const [checkedItems, setCheckedItems] = useState<string[]>([]);

//     const handleCheck = (event: any, widget: any, item: any, checked: boolean) => {
//       if (checked) {
//         setCheckedItems((prev) => [...prev, item.label]);
//       } else {
//         setCheckedItems((prev) => prev.filter((label) => label !== item.label));
//       }
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Checkbox Tree with Event Tracking</Typography>
//           <TreeDefaultExport
//             name="checkboxEventTree"
//             dataset={simpleTreeData}
//             treeicons="plus-minus"
//             className="Checkbox"
//             listener={mockListener}
//             onCheck={handleCheck}
//           />
//           <Box p={2} bgcolor="#e3f2fd" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Checked Items:
//             </Typography>
//             {checkedItems.length === 0 ? (
//               <Typography variant="body2">No items checked</Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {checkedItems.map((item, index) => (
//                   <Typography key={index} variant="body2">
//                     ✓ {item}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "checkboxEventTree",
//     listener: mockListener,
//   },
// };

// export const InteractiveSelection: Story = {
//   render: () => {
//     const [selectedNode, setSelectedNode] = useState<string>("");

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Node Selection</Typography>
//           <TreeDefaultExport
//             name="interactiveTree"
//             dataset={simpleTreeData}
//             treeicons="plus-minus"
//             listener={mockListener}
//             onSelect={(event, widget, item) => setSelectedNode(item.label)}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Selected Node:
//             </Typography>
//             <Typography variant="body1" fontWeight="500">
//               {selectedNode || "No node selected"}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveTree",
//     listener: mockListener,
//   },
// };

// export const DifferentIconStyles: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Plus-Minus Icons
//             </Typography>
//             <TreeDefaultExport
//               name="plusMinusStyle"
//               dataset={simpleTreeData}
//               treeicons="plus-minus"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Arrow Icons
//             </Typography>
//             <TreeDefaultExport
//               name="arrowStyle"
//               dataset={simpleTreeData}
//               treeicons="arrows"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Folder Icons
//             </Typography>
//             <TreeDefaultExport
//               name="folderStyle"
//               dataset={fileSystemData}
//               treeicons="folder"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "iconStylesTree",
//     listener: mockListener,
//   },
// };

// export const TreeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Tree Type Comparison
//         </Typography>
//         <Box
//           display="grid"
//           gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
//           gap={3}
//         >
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Standard Tree
//             </Typography>
//             <TreeDefaultExport
//               name="standardCompare"
//               dataset={simpleTreeData}
//               treeicons="plus-minus"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Checkbox Tree
//             </Typography>
//             <TreeDefaultExport
//               name="checkboxCompare"
//               dataset={simpleTreeData}
//               treeicons="plus-minus"
//               className="Checkbox"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Radio Tree
//             </Typography>
//             <TreeDefaultExport
//               name="radioCompare"
//               dataset={simpleTreeData}
//               treeicons="plus-minus"
//               className="Radio"
//               listener={mockListener}
//             />
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "treeComparison",
//     listener: mockListener,
//   },
// };

// export const LargeDataset: Story = {
//   render: Template,
//   args: {
//     name: "largeTree",
//     listener: mockListener,
//     dataset: Array.from({ length: 10 }, (_, i) => ({
//       label: `Category ${i + 1}`,
//       id: `cat${i + 1}`,
//       children: Array.from({ length: 5 }, (_, j) => ({
//         label: `Item ${i + 1}.${j + 1}`,
//         id: `item${i + 1}_${j + 1}`,
//         children: Array.from({ length: 3 }, (_, k) => ({
//           label: `Sub-item ${i + 1}.${j + 1}.${k + 1}`,
//           id: `subitem${i + 1}_${j + 1}_${k + 1}`,
//         })),
//       })),
//     })),
//     treeicons: "plus-minus",
//     levels: 0,
//   },
// };

// export const EmptyTree: Story = {
//   render: Template,
//   args: {
//     name: "emptyTree",
//     listener: mockListener,
//     dataset: [],
//     treeicons: "plus-minus",
//   },
// };

// export const SingleNode: Story = {
//   render: Template,
//   args: {
//     name: "singleNodeTree",
//     listener: mockListener,
//     dataset: [{ label: "Single Node", id: "single" }],
//     treeicons: "plus-minus",
//   },
// };

// export const FixedDimensions: Story = {
//   render: Template,
//   args: {
//     name: "fixedTree",
//     listener: mockListener,
//     dataset: deepNestedData,
//     treeicons: "plus-minus",
//     levels: 5,
//     width: "400px",
//     height: "300px",
//     styles: {
//       border: "1px solid #e0e0e0",
//       overflow: "auto",
//     },
//   },
// };

// export const ResponsiveTree: Story = {
//   render: Template,
//   args: {
//     name: "responsiveTree",
//     listener: mockListener,
//     dataset: fileSystemData,
//     treeicons: "folder",
//     levels: 1,
//     width: "100%",
//     styles: {
//       maxWidth: "600px",
//     },
//   },
// };

// export const CardWithTree: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Box
//           maxWidth="500px"
//           bgcolor="#ffffff"
//           border="1px solid #e0e0e0"
//           borderRadius={2}
//           boxShadow="0 2px 8px rgba(0,0,0,0.1)"
//         >
//           <Box p={2} bgcolor="#f5f5f5" borderBottom="1px solid #e0e0e0">
//             <Typography variant="h6">File Explorer</Typography>
//             <Typography variant="body2" color="text.secondary">
//               Browse your files and folders
//             </Typography>
//           </Box>
//           <Box p={2}>
//             <TreeDefaultExport
//               name="cardTree"
//               dataset={fileSystemData}
//               treeicons="folder"
//               levels={1}
//               listener={mockListener}
//             />
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "cardTree",
//     listener: mockListener,
//   },
// };

// export const SidebarNavigationTree: Story = {
//   render: () => {
//     const navigationData = [
//       {
//         label: "Dashboard",
//         icon: "fa fa-dashboard",
//         id: "dashboard",
//       },
//       {
//         label: "Products",
//         icon: "fa fa-shopping-cart",
//         id: "products",
//         children: [
//           { label: "All Products", icon: "fa fa-list", id: "allproducts" },
//           { label: "Categories", icon: "fa fa-folder", id: "categories" },
//           { label: "Inventory", icon: "fa fa-cube", id: "inventory" },
//         ],
//       },
//       {
//         label: "Orders",
//         icon: "fa fa-shopping-bag",
//         id: "orders",
//         children: [
//           { label: "Pending", icon: "fa fa-clock-o", id: "pending" },
//           { label: "Completed", icon: "fa fa-check", id: "completed" },
//           { label: "Cancelled", icon: "fa fa-times", id: "cancelled" },
//         ],
//       },
//       {
//         label: "Customers",
//         icon: "fa fa-users",
//         id: "customers",
//       },
//       {
//         label: "Settings",
//         icon: "fa fa-cog",
//         id: "settings",
//         children: [
//           { label: "Profile", icon: "fa fa-user", id: "profile" },
//           { label: "Preferences", icon: "fa fa-sliders", id: "preferences" },
//         ],
//       },
//     ];

//     return (
//       <Box style={{ padding: 16 }}>
//         <Box
//           width="280px"
//           bgcolor="#2c3e50"
//           color="#ffffff"
//           borderRadius={2}
//           overflow="hidden"
//         >
//           <Box p={2} bgcolor="#1a252f">
//             <Typography variant="h6" color="#ffffff">
//               Navigation
//             </Typography>
//           </Box>
//           <Box p={2}>
//             <TreeDefaultExport
//               name="sidebarTree"
//               dataset={navigationData}
//               treeicons="arrows"
//               levels={0}
//               listener={mockListener}
//               styles={{
//                 color: "#ffffff",
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "sidebarTree",
//     listener: mockListener,
//   },
// };

// export const MultipleTreesLayout: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Multiple Trees Layout
//         </Typography>
//         <Box
//           display="grid"
//           gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
//           gap={3}
//         >
//           <Box p={2} border="1px solid #e0e0e0" borderRadius={1}>
//             <Typography variant="subtitle2" mb={2}>
//               Projects
//             </Typography>
//             <TreeDefaultExport
//               name="projectsTree"
//               dataset={[
//                 {
//                   label: "Project A",
//                   id: "projA",
//                   children: [
//                     { label: "Task 1", id: "taskA1" },
//                     { label: "Task 2", id: "taskA2" },
//                   ],
//                 },
//                 { label: "Project B", id: "projB" },
//               ]}
//               treeicons="plus-minus"
//               listener={mockListener}
//             />
//           </Box>
//           <Box p={2} border="1px solid #e0e0e0" borderRadius={1}>
//             <Typography variant="subtitle2" mb={2}>
//               Files
//             </Typography>
//             <TreeDefaultExport
//               name="filesTree"
//               dataset={fileSystemData}
//               treeicons="folder"
//               listener={mockListener}
//             />
//           </Box>
//           <Box p={2} border="1px solid #e0e0e0" borderRadius={1}>
//             <Typography variant="subtitle2" mb={2}>
//               Teams
//             </Typography>
//             <TreeDefaultExport
//               name="teamsTree"
//               dataset={organizationData}
//               treeicons="arrows"
//               listener={mockListener}
//             />
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "multipleTreesLayout",
//     listener: mockListener,
//   },
// };
