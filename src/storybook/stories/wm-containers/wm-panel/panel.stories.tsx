import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import WmPanel, { WmPanelFooter } from "../../../../components/container/panel";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

const meta = {
  title: "Containers/Panel",
  component: WmPanel,
  argTypes: {
    title: { control: "text" },
    subheading: { control: "text" },
    collapsible: { control: "boolean" },
    closable: { control: "boolean" },
    expanded: { control: "boolean" },
    enablefullscreen: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof WmPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    name: "basicPanel",
    title: "Basic Panel",
    subheading: "Click to expand or collapse",
    iconclass: "fa fa-chevron-down",
    collapsible: true,
    expanded: true,
    listener: mockListener,
    closable: false,
    enablefullscreen: false,
    children: (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1">
          This panel can be collapsed and expanded. Click the expand/collapse icon in the header.
        </Typography>
      </Box>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    name: "badgePanel",
    title: "Notifications",
    iconclass: "fa fa-bell",
    badgevalue: "5",
    badgetype: "danger",
    listener: mockListener,
    children: (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1">You have 5 unread notifications.</Typography>
      </Box>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    name: "footerPanel",
    title: "Create Post",
    subheading: "Share your thoughts",
    iconclass: "fa fa-edit",
    listener: mockListener,
    children: (
      <>
        <Box sx={{ padding: 2 }}>
          <textarea
            placeholder="What's on your mind?"
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </Box>
        <WmPanelFooter name="footer">
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Post
            </button>
          </Box>
        </WmPanelFooter>
      </>
    ),
  },
};

// export const Default: Story = {
//   args: {
//     name: "defaultPanel",
//     title: "Default Panel",
//     iconclass: "wi wi-file",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="body1">
//           This is a basic panel with a title and content area.
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const WithSubheading: Story = {
//   args: {
//     name: "subheadingPanel",
//     title: "User Profile",
//     subheading: "View and edit your profile information",
//     iconclass: "wi wi-user",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="body1">
//           Name: John Doe
//           <br />
//           Email: john@example.com
//           <br />
//           Role: Administrator
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const Collapsible: Story = {
//   args: {
//     name: "collapsiblePanel",
//     title: "Collapsible Panel",
//     subheading: "Click to expand or collapse",
//     iconclass: "wi wi-chevron-down",
//     collapsible: true,
//     expanded: true,
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="body1">
//           This panel can be collapsed and expanded. Click the expand/collapse icon in the header.
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const Closable: Story = {
//   args: {
//     name: "closablePanel",
//     title: "Closable Panel",
//     subheading: "This panel can be closed",
//     iconclass: "wi wi-info",
//     closable: true,
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="body1">
//           Click the X button in the header to close this panel.
//         </Typography>
//       </Box>
//     ),
//   },
// };

// export const Fullscreen: Story = {
//   args: {
//     name: "fullscreenPanel",
//     title: "Video Player",
//     subheading: "Watch in fullscreen mode",
//     iconclass: "wi wi-play-circle",
//     enablefullscreen: true,
//     listener: mockListener,
//     children: (
//       <Box
//         sx={{
//           padding: 2,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "300px",
//           backgroundColor: "#000",
//           color: "#fff",
//         }}
//       >
//         <Typography variant="h4">Click fullscreen icon to expand</Typography>
//       </Box>
//     ),
//   },
// };

// export const WithHelpText: Story = {
//   args: {
//     name: "helpPanel",
//     title: "Settings",
//     iconclass: "wi wi-cog",
//     helptext:
//       "<h3>Help Information</h3><p>This panel contains important settings for your application. Use the help icon to toggle this help text.</p>",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="body2">Enable notifications</Typography>
//             <input type="checkbox" />
//           </Box>
//           <Box>
//             <Typography variant="body2">Auto-save</Typography>
//             <input type="checkbox" defaultChecked />
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const Dashboard: Story = {
//   args: {
//     name: "dashboardPanel",
//     title: "Sales Dashboard",
//     subheading: "Overview of your sales performance",
//     iconclass: "wi wi-bar-chart",
//     badgevalue: "Live",
//     badgetype: "success",
//     collapsible: true,
//     enablefullscreen: true,
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={2}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: 2,
//               backgroundColor: "#e3f2fd",
//               borderRadius: 1,
//             }}
//           >
//             <Box>
//               <Typography variant="body2" color="textSecondary">
//                 Total Revenue
//               </Typography>
//               <Typography variant="h4">$124,563</Typography>
//             </Box>
//             <Box sx={{ fontSize: "48px", color: "#2196f3" }}>💰</Box>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: 2,
//               backgroundColor: "#e8f5e9",
//               borderRadius: 1,
//             }}
//           >
//             <Box>
//               <Typography variant="body2" color="textSecondary">
//                 New Customers
//               </Typography>
//               <Typography variant="h4">1,234</Typography>
//             </Box>
//             <Box sx={{ fontSize: "48px", color: "#4caf50" }}>👥</Box>
//           </Box>
//         </Stack>
//       </Box>
//     ),
//   },
// };

// export const FormPanel: Story = {
//   args: {
//     name: "formPanel",
//     title: "User Registration",
//     subheading: "Create a new account",
//     iconclass: "wi wi-user-plus",
//     listener: mockListener,
//     children: (
//       <>
//         <Box sx={{ padding: 2 }}>
//           <Stack spacing={2}>
//             <Box>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Full Name *
//               </Typography>
//               <input
//                 type="text"
//                 style={{
//                   width: "100%",
//                   padding: "8px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                 }}
//                 placeholder="Enter your full name"
//               />
//             </Box>
//             <Box>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Email *
//               </Typography>
//               <input
//                 type="email"
//                 style={{
//                   width: "100%",
//                   padding: "8px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                 }}
//                 placeholder="Enter your email"
//               />
//             </Box>
//             <Box>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Password *
//               </Typography>
//               <input
//                 type="password"
//                 style={{
//                   width: "100%",
//                   padding: "8px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                 }}
//                 placeholder="Create a password"
//               />
//             </Box>
//           </Stack>
//         </Box>
//         <WmPanelFooter name="formFooter">
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="body2" color="textSecondary">
//               * Required fields
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <button
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#6c757d",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Register
//               </button>
//             </Box>
//           </Box>
//         </WmPanelFooter>
//       </>
//     ),
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [eventLog, setEventLog] = useState<string[]>([]);
//     const [isPanelOpen, setIsPanelOpen] = useState(true);

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setEventLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     return (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={3}>
//           {isPanelOpen && (
//             <WmPanel
//               name="interactivePanel"
//               title="Interactive Panel"
//               subheading="Try the panel controls"
//               iconclass="wi wi-cog"
//               collapsible={true}
//               closable={true}
//               enablefullscreen={true}
//               expanded={true}
//               onExpand={() => addLog("Panel expanded")}
//               onCollapse={() => addLog("Panel collapsed")}
//               onClose={() => {
//                 addLog("Panel closed");
//                 setIsPanelOpen(false);
//               }}
//               onFullscreen={() => addLog("Entered fullscreen")}
//               onExitfullscreen={() => addLog("Exited fullscreen")}
//               listener={mockListener}
//             >
//               <Box sx={{ padding: 2 }}>
//                 <Typography variant="body1">
//                   Use the controls in the panel header to expand, collapse, or close the panel.
//                 </Typography>
//               </Box>
//             </WmPanel>
//           )}

//           {!isPanelOpen && (
//             <Box sx={{ padding: 2, textAlign: "center" }}>
//               <button
//                 onClick={() => setIsPanelOpen(true)}
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Show Panel Again
//               </button>
//             </Box>
//           )}

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Event Log:
//             </Typography>
//             {eventLog.length === 0 ? (
//               <Typography variant="body2">Interact with the panel to see events</Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {eventLog.map((log, index) => (
//                   <Typography key={index} variant="body2" sx={{ fontFamily: "monospace" }}>
//                     {log}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const AlertPanel: Story = {
//   args: {
//     name: "alertPanel",
//     title: "System Alert",
//     iconclass: "wi wi-exclamation-triangle",
//     badgevalue: "Important",
//     badgetype: "warning",
//     closable: true,
//     listener: mockListener,
//     styles: {
//       borderLeft: "4px solid #ffc107",
//     },
//     children: (
//       <Box sx={{ padding: 2, backgroundColor: "#fff3cd" }}>
//         <Typography variant="body1">
//           <strong>Warning:</strong> Your subscription will expire in 7 days. Please renew to
//           continue using all features.
//         </Typography>
//       </Box>
//     ),
//   },
// };
