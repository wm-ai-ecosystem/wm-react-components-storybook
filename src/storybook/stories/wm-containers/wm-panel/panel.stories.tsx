import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import WmPanel, { WmPanelFooter } from "../../../../components/container/panel";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

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
    className: {
      control: { type: "select" },
      options: [
        "panel panel-default",
        "panel panel-success",
        "panel panel-primary",
        "panel panel-info",
        "panel panel-warning",
        "panel panel-danger",
      ],
    },
    badgetype: {
      control: { type: "select" },
      options: ["default", "success", "primary", "info", "warning", "danger"],
    },
    collapsible: { control: "boolean" },
    closable: { control: "boolean" },
    expanded: { control: "boolean" },
    enablefullscreen: { control: "boolean" },
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmPanel>;

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
    name: "basicPanel",
    title: "User Information",
    subheading: "View and manage user details",
    className: "panel panel-default",
    iconclass: "fa fa-user",
    badgevalue: "Active",
    badgetype: "success",
    collapsible: true,
    expanded: true,
    listener: mockListener,
    closable: false,
    enablefullscreen: false,
    children: (
      <Box sx={{ padding: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Full Name
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              John Doe
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Email Address
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              john.doe@example.com
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Role
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              Administrator
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Account Status
            </Typography>
            <Typography variant="body1" fontWeight={500} color="success.main">
              Active
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={4}>
          {/* Main Heading */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Panel Types
            </Typography>
          </Box>

          {/* Basic Panel */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Basic Panel
            </Typography>
            <WmPanel
              name="basicShowcasePanel"
              title="Welcome"
              className="panel panel-default"
              iconclass="fa fa-home"
              listener={mockListener}
            >
              <Box sx={{ padding: 2 }}>
                <Typography variant="body1">
                  This is a simple panel with a title and icon. It provides a clean container for organizing content.
                </Typography>
              </Box>
            </WmPanel>
          </Box>

          {/* Panel with Badge */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Panel with Badge
            </Typography>
            <WmPanel
              name="badgeShowcasePanel"
              title="Notifications"
              className="panel panel-info"
              iconclass="fa fa-bell"
              badgevalue="12"
              badgetype="danger"
              listener={mockListener}
            >
              <Box sx={{ padding: 2 }}>
                <Stack spacing={1.5}>
                  <Typography variant="body2">
                    • New message from Sarah Thompson
                  </Typography>
                  <Typography variant="body2">
                    • Project deadline approaching in 2 days
                  </Typography>
                  <Typography variant="body2">
                    • System update completed successfully
                  </Typography>
                </Stack>
              </Box>
            </WmPanel>
          </Box>

          {/* Collapsible Panel */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Collapsible Panel
            </Typography>
            <WmPanel
              name="collapsibleShowcasePanel"
              title="Advanced Settings"
              subheading="Configure application preferences"
              className="panel panel-success"
              iconclass="fa fa-cog"
              collapsible={true}
              expanded={true}
              listener={mockListener}
            >
              <Box sx={{ padding: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight={500} gutterBottom>
                      Theme Preference
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Light Mode
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={500} gutterBottom>
                      Language
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      English (US)
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={500} gutterBottom>
                      Time Zone
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      UTC-05:00 (Eastern Time)
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </WmPanel>
          </Box>

          {/* Panel with Footer */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Panel with Footer
            </Typography>
            <WmPanel
              name="footerShowcasePanel"
              title="Leave a Comment"
              subheading="Share your thoughts"
              className="panel panel-primary"
              iconclass="fa fa-comment"
              listener={mockListener}
            >
              <>
                <Box sx={{ padding: 2 }}>
                  <textarea
                    placeholder="Write your comment here..."
                    style={{
                      width: "100%",
                      minHeight: "80px",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </Box>
                <WmPanelFooter name="commentFooter">
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      500 characters remaining
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <button
                        style={{
                          padding: "8px 20px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        style={{
                          padding: "8px 20px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Submit
                      </button>
                    </Box>
                  </Box>
                </WmPanelFooter>
              </>
            </WmPanel>
          </Box>

          {/* Warning Panel */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Warning Panel
            </Typography>
            <WmPanel
              name="warningShowcasePanel"
              title="Important Notice"
              className="panel panel-warning"
              iconclass="fa fa-exclamation-triangle"
              badgevalue="Action Required"
              badgetype="warning"
              closable={true}
              listener={mockListener}
            >
              <Box sx={{ padding: 2, backgroundColor: "#fff3cd" }}>
                <Typography variant="body1">
                  <strong>Warning:</strong> Your storage space is running low. Please free up some space or upgrade your plan to continue using all features without interruption.
                </Typography>
              </Box>
            </WmPanel>
          </Box>

          {/* Full Featured Panel */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Full Featured Panel
            </Typography>
            <WmPanel
              name="fullFeaturedShowcasePanel"
              title="Dashboard Statistics"
              subheading="Real-time analytics overview"
              className="panel panel-success"
              iconclass="fa fa-chart-line"
              badgevalue="Live"
              badgetype="success"
              collapsible={true}
              enablefullscreen={true}
              expanded={true}
              listener={mockListener}
            >
              <Box sx={{ padding: 2 }}>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 2,
                      backgroundColor: "#e3f2fd",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Users
                      </Typography>
                      <Typography variant="h5" fontWeight={600}>
                        2,847
                      </Typography>
                    </Box>
                    <Box sx={{ fontSize: "36px" }}>👥</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 2,
                      backgroundColor: "#e8f5e9",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Active Sessions
                      </Typography>
                      <Typography variant="h5" fontWeight={600}>
                        1,234
                      </Typography>
                    </Box>
                    <Box sx={{ fontSize: "36px" }}>📊</Box>
                  </Box>
                </Stack>
              </Box>
            </WmPanel>
          </Box>
        </Stack>
      </Box>
    );
  },
  args:{
    name:"showcasePanel",
  }
};

// export const WithBadge: Story = {
//   args: {
//     name: "badgePanel",
//     title: "Notifications",
//     iconclass: "fa fa-bell",
//     badgevalue: "5",
//     badgetype: "danger",
//     listener: mockListener,
//     children: (
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="body1">You have 5 unread notifications.</Typography>
//       </Box>
//     ),
//   },
// };

// export const WithFooter: Story = {
//   args: {
//     name: "footerPanel",
//     title: "Create Post",
//     subheading: "Share your thoughts",
//     iconclass: "fa fa-edit",
//     listener: mockListener,
//     children: (
//       <>
//         <Box sx={{ padding: 2 }}>
//           <textarea
//             placeholder="What's on your mind?"
//             style={{
//               width: "100%",
//               minHeight: "100px",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//             }}
//           />
//         </Box>
//         <WmPanelFooter name="footer">
//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//             <button
//               style={{
//                 padding: "8px 16px",
//                 backgroundColor: "#6c757d",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               style={{
//                 padding: "8px 16px",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               Post
//             </button>
//           </Box>
//         </WmPanelFooter>
//       </>
//     ),
//   },
// };

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
