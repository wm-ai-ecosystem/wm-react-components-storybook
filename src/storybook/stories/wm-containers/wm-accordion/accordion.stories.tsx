import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import WmAccordion from "../../../../components/container/accordion";
import WmAccordionPane from "../../../../components/container/accordion/accordion-pane";

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
  title: "Containers/Accordion",
  component: WmAccordion,
  argTypes: {
    closeothers: { control: "boolean" },
    defaultpaneindex: { control: "number" },
    type: { control: { type: "select", options: ["static", "dynamic"] } },
    dataset: { control: "object" },
    className: {
      control: { type: "select" },
      options: [
        "app-accordion panel panel-default",
        "app-accordion panel panel-success",
        "app-accordion panel panel-primary",
        "app-accordion panel panel-info",
        "app-accordion panel panel-warning",
        "app-accordion panel panel-danger",
      ],
    }
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmAccordion>;

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
  render: (args) => (
    <WmAccordion {...args}>
      <WmAccordionPane
        name="pane1"
        title="Section 1"
        iconclass="fa fa-file"
        listener={mockListener}
      >
        <Box sx={{ p: 2 }}>
          <Typography>Content for section 1</Typography>
        </Box>
      </WmAccordionPane>

      <WmAccordionPane
        name="pane2"
        title="Section 2"
        iconclass="fa fa-folder"
        listener={mockListener}
      >
        <Box sx={{ p: 2 }}>
          <Typography>Content for section 2</Typography>
        </Box>
      </WmAccordionPane>

      <WmAccordionPane
        name="pane3"
        title="Section 3"
        iconclass="fa fa-cog"
        listener={mockListener}
      >
        <Box sx={{ p: 2 }}>
          <Typography>Content for section 3</Typography>
        </Box>
      </WmAccordionPane>
    </WmAccordion>
  ),
  args: {
    name: "basicAccordion",
    type: "static",
    closeothers: true,
    defaultpaneindex: 0,
    listener: mockListener,
    className: "app-accordion panel panel-default"
  },
};

export const DynamicAccordion: Story = {
  args: {
    name: "dynamicAccordion",
    type: "dynamic",
    closeothers: true,
    defaultpaneindex: 0,
    listener: mockListener,
    className:"app-accordion panel panel-primary",
    dataset: [
      {
        id: 1,
        name: "pane1",
        title: "Getting Started",
        subheading: "Quick introduction",
        iconclass: "fa fa-rocket",
        badgevalue: "New",
        badgetype: "success",
        content: "Learn the basics of using our platform with step-by-step guides and tutorials.",
      },
      {
        id: 2,
        name: "pane2",
        title: "Documentation",
        iconclass: "fa fa-book",
        badgevalue: "12",
        badgetype: "primary",
        content: "Comprehensive documentation covering all features, APIs, and best practices.",
      },
      {
        id: 3,
        name: "pane3",
        title: "Examples",
        subheading: "Code samples",
        iconclass: "fa fa-code",
        content: "Browse through practical examples and code samples to get started quickly.",
      },
      // {
      //   id: 4,
      //   name: "pane4",
      //   title: "Support",
      //   iconclass: "fa fa-life-ring",
      //   badgevalue: "24/7",
      //   badgetype: "info",
      //   content: "Get help from our support team or community forums. We're here to help you succeed.",
      // },
      // {
      //   id: 5,
      //   name: "pane5",
      //   title: "Updates",
      //   subheading: "What's new",
      //   iconclass: "fa fa-bell",
      //   badgevalue: "3",
      //   badgetype: "warning",
      //   content: "Stay up to date with the latest features, improvements, and bug fixes.",
      // },
    ],
    render: (itemProps: any) => {
      return (
        <WmAccordionPane
          name={itemProps.name}
          title={itemProps.title}
          subheading={itemProps.subheading}
          iconclass={itemProps.iconclass}
          badgevalue={itemProps.badgevalue}
          badgetype={itemProps.badgetype}
          active={itemProps.active}
          toggle={itemProps.toggle}
          onExpand={itemProps.expand}
          onCollapse={itemProps.collapse}
          listener={mockListener}
        >
          {itemProps.active && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="body1">{itemProps.content}</Typography>
            </Box>
          )}
        </WmAccordionPane>
      );
    },
  },
};


export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={6}>

          {/* Main Heading */}
          <Box sx={{mb: 3}}>
            <Typography variant="h6" fontWeight={600}>
                  Accordion Showcase
            </Typography>
          </Box>

          {/* Basic Accordion */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{marginBottom: 12}}>
              Basic Accordion
            </Typography>
            <WmAccordion
              name="basicShowcase"
              type="static"
              closeothers={true}
              defaultpaneindex={0}
              listener={mockListener}
              className="app-accordion panel panel-default"
            >
              <WmAccordionPane
                name="pane1"
                title="Section 1"
                iconclass="fa fa-info-circle"
                listener={mockListener}
              >
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1">
                    This is a simple accordion pane with basic text content.
                  </Typography>
                </Box>
              </WmAccordionPane>
              <WmAccordionPane
                name="pane2"
                title="Section 2"
                iconclass="fa fa-file"
                listener={mockListener}
              >
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1">
                    Content for section 2. Each pane can contain different information.
                  </Typography>
                </Box>
              </WmAccordionPane>
              {/* <WmAccordionPane
                name="pane3"
                title="Section 3"
                iconclass="fa fa-folder"
                listener={mockListener}
              >
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1">
                    Content for section 3. Click headers to expand/collapse panes.
                  </Typography>
                </Box>
              </WmAccordionPane> */}
            </WmAccordion>
          </Box>

          {/* Accordion with Badges & Icons */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{marginBottom: 12}}>
              Accordion with Badges & Icons
            </Typography>
            <WmAccordion
              name="badgesShowcase"
              type="static"
              closeothers={true}
              defaultpaneindex={0}
              listener={mockListener}
              className="app-accordion panel panel-primary"
            >
              <WmAccordionPane
                name="inbox"
                title="Inbox"
                subheading="Notification center"
                iconclass="fa fa-envelope"
                badgevalue="12"
                badgetype="primary"
                listener={mockListener}
              >
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    You have 12 unread messages.
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <i className="fa fa-envelope" style={{ color: "#1976d2" }} />
                      <Typography variant="body2">8 new messages</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <i className="fa fa-user" style={{ color: "#2e7d32" }} />
                      <Typography variant="body2">4 from team members</Typography>
                    </Box>
                  </Stack>
                </Box>
              </WmAccordionPane>
              <WmAccordionPane
                name="alerts"
                title="Alerts"
                iconclass="fa fa-bell"
                badgevalue="3"
                badgetype="danger"
                listener={mockListener}
              >
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1">
                    3 important alerts require your attention.
                  </Typography>
                </Box>
              </WmAccordionPane>
              {/* <WmAccordionPane
                name="tasks"
                title="Tasks"
                iconclass="fa fa-check-square"
                badgevalue="5"
                badgetype="warning"
                listener={mockListener}
              >
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1">
                    5 tasks are pending completion.
                  </Typography>
                </Box>
              </WmAccordionPane> */}
            </WmAccordion>
          </Box>

          {/* Accordion with Rich Content */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{marginBottom: 12}}>
              Accordion with Rich Content
            </Typography>
            <WmAccordion
              name="richShowcase"
              type="static"
              closeothers={true}
              defaultpaneindex={0}
              listener={mockListener}
              className="app-accordion panel panel-default"
            >
              <WmAccordionPane
                name="features"
                title="Feature List"
                subheading="Multiple content types"
                iconclass="fa fa-list-alt"
                listener={mockListener}
              >
                <Box sx={{ padding: 2 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Real-time Collaboration
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Work together with your team in real-time with live updates.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Advanced Analytics
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Get detailed insights with customizable dashboards.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        padding: 2,
                        bgcolor: "#f5f5f5",
                        borderRadius: 1,
                        borderLeft: "4px solid #1976d2",
                      }}
                    >
                      <Typography variant="body2" fontStyle="italic">
                        "This accordion component supports complex layouts including nested boxes and styled elements."
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </WmAccordionPane>
            </WmAccordion>
          </Box>

          {/* Accordion with Interactive Elements */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2} style={{marginBottom: 12}}>
              Accordion with Interactive Elements
            </Typography>
            <WmAccordion
              name="interactiveShowcase"
              type="static"
              closeothers={true}
              defaultpaneindex={0}
              listener={mockListener}
              className="app-accordion panel panel-primary"
            >
              <WmAccordionPane
                name="form"
                title="Contact Form"
                subheading="Fill in your details"
                iconclass="fa fa-edit"
                badgevalue="New"
                badgetype="success"
                listener={mockListener}
              >
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    You can include interactive elements inside accordion panes:
                  </Typography>
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Name:
                      </Typography>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Email:
                      </Typography>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <button
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#1976d2",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Submit
                      </button>
                      <button
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#f5f5f5",
                          color: "#333",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </Box>
                  </Stack>
                </Box>
              </WmAccordionPane>
            </WmAccordion>
          </Box>

        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseAccordion",
    listener: mockListener,
  }
};

// export const DynamicWithBadges: Story = {
//   args: {
//     name: "dynamicBadgesAccordion",
//     type: "dynamic",
//     closeothers: true,
//     defaultpaneindex: 0,
//     listener: mockListener,
//     dataset: [
//       {
//         id: 1,
//         title: "Notifications",
//         content: "You have 15 new notifications to review.",
//         iconclass: "wi wi-bell",
//         badgevalue: "15",
//         badgetype: "primary",
//       },
//       {
//         id: 2,
//         title: "Messages",
//         content: "8 unread messages in your inbox.",
//         iconclass: "wi wi-envelope",
//         badgevalue: "8",
//         badgetype: "success",
//       },
//       {
//         id: 3,
//         title: "Alerts",
//         content: "2 critical alerts require immediate attention.",
//         iconclass: "wi wi-exclamation-triangle",
//         badgevalue: "2",
//         badgetype: "danger",
//       },
//       {
//         id: 4,
//         title: "Updates",
//         content: "3 software updates are available.",
//         iconclass: "wi wi-download",
//         badgevalue: "3",
//         badgetype: "warning",
//       },
//     ],
//   },
// };

// export const DynamicWithSubheadings: Story = {
//   args: {
//     name: "dynamicSubheadingsAccordion",
//     type: "dynamic",
//     closeothers: true,
//     defaultpaneindex: 0,
//     listener: mockListener,
//     dataset: [
//       {
//         id: 1,
//         title: "Dashboard",
//         subheading: "Overview of your account",
//         content: "View key metrics, recent activity, and quick actions all in one place.",
//         iconclass: "wi wi-dashboard",
//       },
//       {
//         id: 2,
//         title: "Reports",
//         subheading: "Detailed analytics",
//         content: "Generate and download comprehensive reports with customizable date ranges.",
//         iconclass: "wi wi-bar-chart",
//       },
//       {
//         id: 3,
//         title: "Settings",
//         subheading: "Configure your preferences",
//         content: "Manage account settings, notifications, and privacy options.",
//         iconclass: "wi wi-cog",
//       },
//       {
//         id: 4,
//         title: "Integrations",
//         subheading: "Connect external services",
//         content: "Set up integrations with third-party tools and services.",
//         iconclass: "wi wi-plug",
//       },
//     ],
//   },
// };

// export const DynamicFAQ: Story = {
//   args: {
//     name: "dynamicFaqAccordion",
//     type: "dynamic",
//     closeothers: true,
//     defaultpaneindex: -1,
//     listener: mockListener,
//     dataset: [
//       {
//         id: 1,
//         title: "What is your refund policy?",
//         content:
//           "We offer a 30-day money-back guarantee for all purchases. If you're not satisfied, contact our support team for a full refund within 30 days of purchase.",
//         iconclass: "wi wi-question-circle",
//       },
//       {
//         id: 2,
//         title: "How do I reset my password?",
//         content:
//           "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link expires in 24 hours.",
//         iconclass: "wi wi-question-circle",
//       },
//       {
//         id: 3,
//         title: "Can I upgrade my plan later?",
//         content:
//           "Yes! You can upgrade your plan at any time from your account settings. The price difference will be prorated based on your current billing cycle.",
//         iconclass: "wi wi-question-circle",
//       },
//       {
//         id: 4,
//         title: "Is my data secure?",
//         content:
//           "Absolutely. We use industry-standard encryption (AES-256) for data at rest and TLS 1.3 for data in transit. All data centers are SOC 2 Type II certified.",
//         iconclass: "wi wi-question-circle",
//       },
//       {
//         id: 5,
//         title: "Do you offer customer support?",
//         content:
//           "Yes, we provide 24/7 customer support via email, live chat, and phone. Premium plan customers get priority support with dedicated account managers.",
//         iconclass: "wi wi-question-circle",
//       },
//     ],
//   },
// };

// export const DynamicProductFeatures: Story = {
//   args: {
//     name: "dynamicFeaturesAccordion",
//     type: "dynamic",
//     closeothers: false,
//     defaultpaneindex: 0,
//     listener: mockListener,
//     dataset: [
//       {
//         id: 1,
//         title: "Cloud Storage",
//         subheading: "Secure and scalable",
//         content:
//           "Store unlimited files with automatic backups, version control, and 99.9% uptime guarantee. Access your files from anywhere.",
//         iconclass: "wi wi-cloud",
//         badgevalue: "100GB",
//         badgetype: "info",
//       },
//       {
//         id: 2,
//         title: "Real-time Collaboration",
//         subheading: "Work together seamlessly",
//         content:
//           "Edit documents simultaneously with your team, see changes in real-time, and communicate via integrated chat.",
//         iconclass: "wi wi-users",
//         badgevalue: "New",
//         badgetype: "success",
//       },
//       {
//         id: 3,
//         title: "Advanced Security",
//         subheading: "Enterprise-grade protection",
//         content:
//           "End-to-end encryption, two-factor authentication, SSO support, and compliance with GDPR, HIPAA, and SOC 2.",
//         iconclass: "wi wi-shield",
//       },
//       {
//         id: 4,
//         title: "API Integration",
//         subheading: "Connect with your tools",
//         content:
//           "RESTful API with comprehensive documentation, webhooks, and SDKs for popular programming languages.",
//         iconclass: "wi wi-code",
//       },
//       {
//         id: 5,
//         title: "Analytics & Reporting",
//         subheading: "Data-driven insights",
//         content:
//           "Customizable dashboards, automated reports, and export options for CSV, PDF, and Excel formats.",
//         iconclass: "wi wi-bar-chart",
//       },
//     ],
//   },
// };

// export const DynamicLargeDataset: Story = {
//   args: {
//     name: "dynamicLargeAccordion",
//     type: "dynamic",
//     closeothers: true,
//     defaultpaneindex: 0,
//     listener: mockListener,
//     dataset: Array.from({ length: 10 }, (_, i) => ({
//       id: i + 1,
//       title: `Section ${i + 1}`,
//       subheading: `Description for section ${i + 1}`,
//       content: `This is the content for section ${i + 1}. Each section can contain different information based on your dataset.`,
//       iconclass: i % 2 === 0 ? "wi wi-file" : "wi wi-folder",
//       ...(i < 3 && {
//         badgevalue: String(Math.floor(Math.random() * 20) + 1),
//         badgetype: ["primary", "success", "warning", "danger"][i % 4] as any,
//       }),
//     })),
//   },
// };

// export const DynamicWithComplexContent: Story = {
//   args: {
//     name: "dynamicComplexAccordion",
//     listener: mockListener,
//   },
//   render: () => {
//     const complexDataset = [
//       {
//         id: 1,
//         title: "User Profile",
//         subheading: "Personal information",
//         iconclass: "wi wi-user",
//         content: (
//           <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//               <Box>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Name
//                 </Typography>
//                 <Typography variant="body1">John Doe</Typography>
//               </Box>
//               <Box>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Email
//                 </Typography>
//                 <Typography variant="body1">john.doe@example.com</Typography>
//               </Box>
//               <Box>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Member Since
//                 </Typography>
//                 <Typography variant="body1">January 2024</Typography>
//               </Box>
//             </Stack>
//           </Box>
//         ),
//       },
//       {
//         id: 2,
//         title: "Recent Activity",
//         subheading: "Last 7 days",
//         iconclass: "wi wi-clock",
//         badgevalue: "12",
//         badgetype: "primary",
//         content: (
//           <Box sx={{ padding: 2 }}>
//             <Stack spacing={1}>
//               <Box sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #eee" }}>
//                 <Typography variant="body2">Logged in</Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   2 hours ago
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #eee" }}>
//                 <Typography variant="body2">Updated profile</Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Yesterday
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #eee" }}>
//                 <Typography variant="body2">Changed password</Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   3 days ago
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//         ),
//       },
//       {
//         id: 3,
//         title: "Statistics",
//         subheading: "Overview",
//         iconclass: "wi wi-bar-chart",
//         content: (
//           <Box sx={{ padding: 2 }}>
//             <Stack direction="row" spacing={3}>
//               <Box sx={{ flex: 1, textAlign: "center", p: 2, bgcolor: "#e3f2fd", borderRadius: 1 }}>
//                 <Typography variant="h4" color="primary">
//                   156
//                 </Typography>
//                 <Typography variant="caption">Posts</Typography>
//               </Box>
//               <Box sx={{ flex: 1, textAlign: "center", p: 2, bgcolor: "#e8f5e9", borderRadius: 1 }}>
//                 <Typography variant="h4" color="success.main">
//                   2.4k
//                 </Typography>
//                 <Typography variant="caption">Followers</Typography>
//               </Box>
//               <Box sx={{ flex: 1, textAlign: "center", p: 2, bgcolor: "#fff3e0", borderRadius: 1 }}>
//                 <Typography variant="h4" color="warning.main">
//                   89
//                 </Typography>
//                 <Typography variant="caption">Following</Typography>
//               </Box>
//             </Stack>
//           </Box>
//         ),
//       },
//     ];

//     return (
//       <Box sx={{ padding: 2 }}>
//         <WmAccordion
//           name="dynamicComplexAccordion"
//           type="dynamic"
//           closeothers={true}
//           defaultpaneindex={0}
//           dataset={complexDataset}
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
// };

// export const StaticVsDynamicComparison: Story = {
//   args: {
//     name: "comparisonAccordion",
//     listener: mockListener,
//   },
//   render: () => {
//     const sharedDataset = [
//       {
//         id: 1,
//         title: "Feature One",
//         content: "This demonstrates the same content rendered dynamically.",
//         iconclass: "wi wi-star",
//       },
//       {
//         id: 2,
//         title: "Feature Two",
//         content: "Dynamic rendering uses the dataset prop.",
//         iconclass: "wi wi-heart",
//       },
//       {
//         id: 3,
//         title: "Feature Three",
//         content: "Much easier to maintain with large datasets.",
//         iconclass: "wi wi-check",
//       },
//     ];

//     return (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="h6" gutterBottom>
//               Static Accordion
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mb={2}>
//               Uses static children components
//             </Typography>
//             <WmAccordion
//               name="staticCompAccordion"
//               type="static"
//               closeothers={true}
//               defaultpaneindex={0}
//               listener={mockListener}
//             >
//               <WmAccordionPane
//                 name="pane1"
//                 title="Feature One"
//                 iconclass="wi wi-star"
//                 listener={mockListener}
//                 {...mockPaneProps}
//               >
//                 <Box sx={{ padding: 2 }}>
//                   <Typography variant="body1">
//                     This demonstrates the same content rendered statically.
//                   </Typography>
//                 </Box>
//               </WmAccordionPane>
//               <WmAccordionPane
//                 name="pane2"
//                 title="Feature Two"
//                 iconclass="wi wi-heart"
//                 listener={mockListener}
//                 {...mockPaneProps}
//               >
//                 <Box sx={{ padding: 2 }}>
//                   <Typography variant="body1">Static rendering uses children components.</Typography>
//                 </Box>
//               </WmAccordionPane>
//               <WmAccordionPane
//                 name="pane3"
//                 title="Feature Three"
//                 iconclass="wi wi-check"
//                 listener={mockListener}
//                 {...mockPaneProps}
//               >
//                 <Box sx={{ padding: 2 }}>
//                   <Typography variant="body1">Requires more code for large datasets.</Typography>
//                 </Box>
//               </WmAccordionPane>
//             </WmAccordion>
//           </Box>

//           <Box>
//             <Typography variant="h6" gutterBottom>
//               Dynamic Accordion
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mb={2}>
//               Uses dataset prop to generate panes
//             </Typography>
//             <WmAccordion
//               name="dynamicCompAccordion"
//               type="dynamic"
//               closeothers={true}
//               defaultpaneindex={0}
//               dataset={sharedDataset}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const MultipleOpen: Story = {
//   args: {
//     name: "multipleOpenAccordion",
//     type: "static",
//     closeothers: false,
//     defaultpaneindex: 0,
//     listener: mockListener,
//     children: (
//       <>
//         <WmAccordionPane
//           name="pane1"
//           title="Features"
//           iconclass="wi wi-star"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1">
//               • Feature 1: Advanced analytics
//               <br />
//               • Feature 2: Real-time updates
//               <br />
//               • Feature 3: Cloud integration
//             </Typography>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="pane2"
//           title="Benefits"
//           iconclass="wi wi-check-circle"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1">
//               Multiple panes can be open at the same time when closeothers is false.
//             </Typography>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="pane3"
//           title="Pricing"
//           iconclass="wi wi-dollar"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1">
//               Contact us for pricing details and custom plans.
//             </Typography>
//           </Box>
//         </WmAccordionPane>
//       </>
//     ),
//   },
// };

// export const FAQ: Story = {
//   args: {
//     name: "faqAccordion",
//     type: "static",
//     closeothers: true,
//     defaultpaneindex: -1,
//     listener: mockListener,
//     children: (
//       <>
//         <WmAccordionPane
//           name="faq1"
//           title="What is this product?"
//           iconclass="wi wi-question-circle"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1">
//               This is a comprehensive solution designed to help businesses streamline their
//               operations and improve efficiency.
//             </Typography>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="faq2"
//           title="How do I get started?"
//           iconclass="wi wi-question-circle"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1">
//               Getting started is easy! Simply sign up for an account, complete the onboarding
//               process, and you'll be ready to use all features.
//             </Typography>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="faq3"
//           title="What payment methods do you accept?"
//           iconclass="wi wi-question-circle"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1">
//               We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
//             </Typography>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="faq4"
//           title="Is there a free trial?"
//           iconclass="wi wi-question-circle"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1">
//               Yes! We offer a 14-day free trial with full access to all features. No credit card
//               required.
//             </Typography>
//           </Box>
//         </WmAccordionPane>
//       </>
//     ),
//   },
// };

// export const ProductFeatures: Story = {
//   args: {
//     name: "featuresAccordion",
//     type: "static",
//     closeothers: false,
//     defaultpaneindex: 0,
//     listener: mockListener,
//     children: (
//       <>
//         <WmAccordionPane
//           name="feature1"
//           title="Analytics Dashboard"
//           subheading="Visualize your data"
//           iconclass="wi wi-bar-chart"
//           badgevalue="New"
//           badgetype="success"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1" gutterBottom>
//               Our advanced analytics dashboard provides real-time insights into your business
//               metrics:
//             </Typography>
//             <ul>
//               <li>Customizable charts and graphs</li>
//               <li>Export data to CSV/PDF</li>
//               <li>Automated reporting</li>
//               <li>Multi-user collaboration</li>
//             </ul>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="feature2"
//           title="Team Collaboration"
//           subheading="Work together seamlessly"
//           iconclass="wi wi-users"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1" gutterBottom>
//               Collaborate with your team in real-time:
//             </Typography>
//             <ul>
//               <li>Shared workspaces</li>
//               <li>Real-time chat</li>
//               <li>File sharing</li>
//               <li>Task assignments</li>
//             </ul>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="feature3"
//           title="Security & Privacy"
//           subheading="Your data is protected"
//           iconclass="wi wi-shield"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="body1" gutterBottom>
//               Enterprise-grade security features:
//             </Typography>
//             <ul>
//               <li>End-to-end encryption</li>
//               <li>Two-factor authentication</li>
//               <li>Regular security audits</li>
//               <li>GDPR compliant</li>
//             </ul>
//           </Box>
//         </WmAccordionPane>
//       </>
//     ),
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [eventLog, setEventLog] = useState<string[]>([]);

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setEventLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     const handleExpand = (event: Event, props: any) => {
//       addLog(`Expanded: ${props.title}`);
//     };

//     const handleCollapse = (event: Event, props: any) => {
//       addLog(`Collapsed: ${props.title}`);
//     };

//     return (
//       <Box sx={{ padding: 2 }}>
//         <Stack spacing={3}>
//           <WmAccordion
//             name="interactiveAccordion"
//             type="static"
//             closeothers={true}
//             defaultpaneindex={0}
//             listener={mockListener}
//           >
//             <WmAccordionPane
//               name="pane1"
//               title="Section 1"
//               iconclass="wi wi-file"
//               onExpand={handleExpand}
//               onCollapse={handleCollapse}
//               listener={mockListener}
//             >
//               <Box sx={{ padding: 2 }}>
//                 <Typography variant="body1">Content for section 1</Typography>
//               </Box>
//             </WmAccordionPane>
//             <WmAccordionPane
//               name="pane2"
//               title="Section 2"
//               iconclass="wi wi-folder"
//               onExpand={handleExpand}
//               onCollapse={handleCollapse}
//               listener={mockListener}
//             >
//               <Box sx={{ padding: 2 }}>
//                 <Typography variant="body1">Content for section 2</Typography>
//               </Box>
//             </WmAccordionPane>
//             <WmAccordionPane
//               name="pane3"
//               title="Section 3"
//               iconclass="wi wi-cog"
//               onExpand={handleExpand}
//               onCollapse={handleCollapse}
//               listener={mockListener}
//             >
//               <Box sx={{ padding: 2 }}>
//                 <Typography variant="body1">Content for section 3</Typography>
//               </Box>
//             </WmAccordionPane>
//           </WmAccordion>

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Event Log:
//             </Typography>
//             {eventLog.length === 0 ? (
//               <Typography variant="body2">Expand/collapse panes to see events</Typography>
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

// export const SettingsPanel: Story = {
//   args: {
//     name: "settingsAccordion",
//     type: "static",
//     closeothers: true,
//     defaultpaneindex: 0,
//     listener: mockListener,
//     children: (
//       <>
//         <WmAccordionPane
//           name="general"
//           title="General Settings"
//           subheading="Basic configuration"
//           iconclass="wi wi-cog"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Stack spacing={2}>
//               <Box>
//                 <Typography variant="body2">Language</Typography>
//                 <select style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
//                   <option>English</option>
//                   <option>Spanish</option>
//                   <option>French</option>
//                 </select>
//               </Box>
//               <Box>
//                 <Typography variant="body2">Time Zone</Typography>
//                 <select style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
//                   <option>UTC-5 (EST)</option>
//                   <option>UTC-8 (PST)</option>
//                   <option>UTC+0 (GMT)</option>
//                 </select>
//               </Box>
//             </Stack>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="notifications"
//           title="Notifications"
//           subheading="Manage alerts"
//           iconclass="wi wi-bell"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Stack spacing={1}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <input type="checkbox" defaultChecked />
//                 <Typography variant="body2" sx={{ ml: 1 }}>
//                   Email notifications
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <input type="checkbox" defaultChecked />
//                 <Typography variant="body2" sx={{ ml: 1 }}>
//                   Push notifications
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <input type="checkbox" />
//                 <Typography variant="body2" sx={{ ml: 1 }}>
//                   SMS notifications
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//         </WmAccordionPane>
//         <WmAccordionPane
//           name="privacy"
//           title="Privacy & Security"
//           subheading="Control your data"
//           iconclass="wi wi-lock"
//           listener={mockListener}
//         >
//           <Box sx={{ padding: 2 }}>
//             <Stack spacing={1}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <input type="checkbox" defaultChecked />
//                 <Typography variant="body2" sx={{ ml: 1 }}>
//                   Two-factor authentication
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <input type="checkbox" />
//                 <Typography variant="body2" sx={{ ml: 1 }}>
//                   Share analytics data
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//         </WmAccordionPane>
//       </>
//     ),
//   },
// };
