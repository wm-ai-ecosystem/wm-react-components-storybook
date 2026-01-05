import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography, Stack } from "@mui/material";
import WmLinearLayout from "../../../../components/container/linear-layout";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const SampleBox = ({ label, color }: { label: string; color?: string }) => (
  <Box
    sx={{
      padding: 2,
      backgroundColor: color || "#e3f2fd",
      border: "2px solid #2196f3",
      borderRadius: 1,
      textAlign: "center",
      minWidth: "80px",
    }}
  >
    {label}
  </Box>
);

const meta = {
  title: "Containers/Linear Layout",
  component: WmLinearLayout,
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["row", "row-reverse", "column", "column-reverse"],
    },
    horizontalalign: {
      control: { type: "select" },
      options: ["left", "right", "center"],
    },
    verticalalign: {
      control: { type: "select" },
      options: ["top", "bottom", "center"],
    },
    spacing: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof WmLinearLayout>;

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
};

export const Basic: Story = {
  args: {
    name: "basicLinearLayout",
    direction: "row",
    horizontalalign: "left",
    verticalalign: "top",
    listener: mockListener,
    styles: { minHeight: "150px", border: "1px dashed #ccc", minWidth: "350px" },
    children: (
      <>
        <SampleBox label="Item 1" />
        <SampleBox label="Item 2" />
        <SampleBox label="Item 3" />
      </>
    ),
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Box sx={{mb: 3}}>
        <Typography variant="h6" fontWeight={600}>
          Linear Layout Types
        </Typography>
      </Box>

      {/* Row Layout */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Row Layout (Left / Top)
        </Typography>
        <WmLinearLayout
          name="rowLayout"
          direction="row"
          horizontalalign="left"
          verticalalign="top"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="Item 1" />
          <SampleBox label="Item 2" />
          <SampleBox label="Item 3" />
        </WmLinearLayout>
      </Box>

      {/* Row Centered */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Row Layout (Center / Center)
        </Typography>
        <WmLinearLayout
          name="rowCentered"
          direction="row"
          horizontalalign="center"
          verticalalign="center"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="Item 1" />
          <SampleBox label="Item 2" />
          <SampleBox label="Item 3" />
        </WmLinearLayout>
      </Box>

      {/* Row Reverse */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Row Reverse Layout (Right / Top)
        </Typography>
        <WmLinearLayout
          name="rowReverse"
          direction="row-reverse"
          horizontalalign="right"
          verticalalign="top"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="First" color="#ffebee" />
          <SampleBox label="Second" color="#fff3e0" />
          <SampleBox label="Third" color="#e8f5e9" />
        </WmLinearLayout>
      </Box>

      {/* Column Layout */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Column Layout (Left / Top)
        </Typography>
        <WmLinearLayout
          name="columnLayout"
          direction="column"
          horizontalalign="left"
          verticalalign="top"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="Item 1" />
          <SampleBox label="Item 2" />
          <SampleBox label="Item 3" />
        </WmLinearLayout>
      </Box>

      {/* Column Reverse */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Column Reverse Layout (Left / Bottom)
        </Typography>
        <WmLinearLayout
          name="columnReverse"
          direction="column-reverse"
          horizontalalign="left"
          verticalalign="bottom"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="First" color="#ffebee" />
          <SampleBox label="Second" color="#fff3e0" />
          <SampleBox label="Third" color="#e8f5e9" />
        </WmLinearLayout>
      </Box>

      {/* Column Centered */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Column Layout (Center / Center)
        </Typography>
        <WmLinearLayout
          name="columnCentered"
          direction="column"
          horizontalalign="center"
          verticalalign="center"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="Centered 1" />
          <SampleBox label="Centered 2" />
        </WmLinearLayout>
      </Box>
    </Box>
  ),
};


// export const RowLayout: Story = {
//   args: {
//     name: "rowLayout",
//     direction: "row",
//     horizontalalign: "left",
//     verticalalign: "top",
//     listener: mockListener,
//     children: (
//       <>
//         <SampleBox label="Item 1" />
//         <SampleBox label="Item 2" />
//         <SampleBox label="Item 3" />
//       </>
//     ),
//   },
// };

// export const ColumnLayout: Story = {
//   args: {
//     name: "columnLayout",
//     direction: "column",
//     horizontalalign: "left",
//     verticalalign: "top",
//     listener: mockListener,
//     children: (
//       <>
//         <SampleBox label="Item 1" />
//         <SampleBox label="Item 2" />
//         <SampleBox label="Item 3" />
//       </>
//     ),
//   },
// };

// export const CenteredRow: Story = {
//   args: {
//     name: "centeredRow",
//     direction: "row",
//     horizontalalign: "center",
//     verticalalign: "center",
//     listener: mockListener,
//     styles: { minHeight: "200px", border: "1px dashed #ccc" },
//     children: (
//       <>
//         <SampleBox label="Centered 1" />
//         <SampleBox label="Centered 2" />
//         <SampleBox label="Centered 3" />
//       </>
//     ),
//   },
// };

// export const RightAligned: Story = {
//   args: {
//     name: "rightAligned",
//     direction: "row",
//     horizontalalign: "right",
//     verticalalign: "center",
//     listener: mockListener,
//     styles: { minHeight: "150px", border: "1px dashed #ccc" },
//     children: (
//       <>
//         <SampleBox label="Right 1" />
//         <SampleBox label="Right 2" />
//       </>
//     ),
//   },
// };

// export const RowReverse: Story = {
//   args: {
//     name: "rowReverse",
//     direction: "row-reverse",
//     horizontalalign: "left",
//     verticalalign: "top",
//     listener: mockListener,
//     children: (
//       <>
//         <SampleBox label="First" color="#ffebee" />
//         <SampleBox label="Second" color="#fff3e0" />
//         <SampleBox label="Third" color="#e8f5e9" />
//       </>
//     ),
//   },
// };

// export const ColumnReverse: Story = {
//   args: {
//     name: "columnReverse",
//     direction: "column-reverse",
//     horizontalalign: "left",
//     verticalalign: "top",
//     listener: mockListener,
//     children: (
//       <>
//         <SampleBox label="First" color="#ffebee" />
//         <SampleBox label="Second" color="#fff3e0" />
//         <SampleBox label="Third" color="#e8f5e9" />
//       </>
//     ),
//   },
// };

// export const VerticalCentered: Story = {
//   args: {
//     name: "verticalCentered",
//     direction: "column",
//     horizontalalign: "center",
//     verticalalign: "center",
//     listener: mockListener,
//     styles: { minHeight: "300px", border: "1px dashed #ccc" },
//     children: (
//       <>
//         <SampleBox label="Centered Item 1" />
//         <SampleBox label="Centered Item 2" />
//       </>
//     ),
//   },
// };

// export const ButtonGroup: Story = {
//   args: {
//     name: "buttonGroup",
//     direction: "row",
//     horizontalalign: "right",
//     verticalalign: "center",
//     listener: mockListener,
//     styles: { padding: "16px", backgroundColor: "#f5f5f5" },
//     children: (
//       <>
//         <button
//           style={{
//             padding: "8px 16px",
//             marginRight: "8px",
//             backgroundColor: "#6c757d",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Save
//         </button>
//       </>
//     ),
//   },
// };

// export const NavigationBar: Story = {
//   args: {
//     name: "navigationBar",
//     direction: "row",
//     horizontalalign: "left",
//     verticalalign: "center",
//     listener: mockListener,
//     styles: {
//       padding: "12px 24px",
//       backgroundColor: "#2196f3",
//       color: "white",
//       minHeight: "60px",
//     },
//     children: (
//       <>
//         <Box sx={{ fontWeight: "bold", fontSize: "20px", marginRight: "auto" }}>Brand Logo</Box>
//         <Box sx={{ marginLeft: "20px", cursor: "pointer" }}>Home</Box>
//         <Box sx={{ marginLeft: "20px", cursor: "pointer" }}>About</Box>
//         <Box sx={{ marginLeft: "20px", cursor: "pointer" }}>Contact</Box>
//       </>
//     ),
//   },
// };

// export const Dashboard: Story = {
//   args: {
//     name: "dashboard",
//     direction: "row",
//     horizontalalign: "left",
//     verticalalign: "top",
//     listener: mockListener,
//     styles: { padding: "16px", gap: "16px" },
//     children: (
//       <>
//         <Box
//           sx={{
//             flex: 1,
//             padding: 3,
//             backgroundColor: "#ffebee",
//             borderRadius: 2,
//             textAlign: "center",
//           }}
//         >
//           <h3>Users</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold" }}>1,234</p>
//         </Box>
//         <Box
//           sx={{
//             flex: 1,
//             padding: 3,
//             backgroundColor: "#e8f5e9",
//             borderRadius: 2,
//             textAlign: "center",
//           }}
//         >
//           <h3>Revenue</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold" }}>$12,345</p>
//         </Box>
//         <Box
//           sx={{
//             flex: 1,
//             padding: 3,
//             backgroundColor: "#e3f2fd",
//             borderRadius: 2,
//             textAlign: "center",
//           }}
//         >
//           <h3>Orders</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold" }}>456</p>
//         </Box>
//       </>
//     ),
//   },
// };

// export const Sidebar: Story = {
//   args: {
//     name: "sidebar",
//     direction: "column",
//     horizontalalign: "left",
//     verticalalign: "top",
//     listener: mockListener,
//     styles: {
//       width: "200px",
//       minHeight: "400px",
//       padding: "16px",
//       backgroundColor: "#37474f",
//       color: "white",
//     },
//     children: (
//       <>
//         <Box sx={{ padding: "12px 0", borderBottom: "1px solid #546e7a", cursor: "pointer" }}>
//           Dashboard
//         </Box>
//         <Box sx={{ padding: "12px 0", borderBottom: "1px solid #546e7a", cursor: "pointer" }}>
//           Users
//         </Box>
//         <Box sx={{ padding: "12px 0", borderBottom: "1px solid #546e7a", cursor: "pointer" }}>
//           Settings
//         </Box>
//         <Box sx={{ padding: "12px 0", borderBottom: "1px solid #546e7a", cursor: "pointer" }}>
//           Reports
//         </Box>
//         <Box sx={{ padding: "12px 0", cursor: "pointer" }}>Logout</Box>
//       </>
//     ),
//   },
// };
