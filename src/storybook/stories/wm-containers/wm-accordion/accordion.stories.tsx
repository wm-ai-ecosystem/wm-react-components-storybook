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
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import accordionTokensData from "../../../../designTokens/components/accordion/accordion.json";

const mockListener = {
  appLocale: {},
  Widgets: {},
  onChange: () => {},
};

const meta = {
  title: "Containers/Accordion",
  component: WmAccordion,
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
      // styling={styling}
      style={style}
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=58866-17100&p=f&t=TmoXZ4j5uVxcseDO-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsAccordion",
    listener:mockListener
  },
  argTypes:{
    name:{table:{disable:true}},
    listener:{table:{disable:true}},
  },
  parameters: {
    layout: 'fullscreen',
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
              className="app-accordion panel panel-secondary"
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
              className="app-accordion panel panel-tertiary"
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
  },
  argTypes:{
    name:{table:{disable:true}},
    listener:{table:{disable:true}},
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    //component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
    
    return(
      <Box style={{ padding: 16, width: "100%" }} data-design-token-target={dataAttr}>
        <WmAccordion {...args}>
          <WmAccordionPane
            name="pane1"
            title="Section 1"
            iconclass="fa fa-file"
            listener={mockListener}
            subheading="Standard Accordion"
            {...componentArgs}
          >
          <Box sx={{ p: 2 }}>
            <Typography>Content for section 1</Typography>
          </Box>
          </WmAccordionPane>

          <WmAccordionPane
            name="pane2"
            title="Section 2"
            iconclass="fa fa-file"
            listener={mockListener}
            subheading="Standard Accordion"
            {...componentArgs}
          >
          <Box sx={{ p: 2 }}>
            <Typography>Content for section 2</Typography>
          </Box>
          </WmAccordionPane>

        </WmAccordion>
      </Box>
  )},
  args: {
    name: "StandardAccordion",
    type: "static",
    closeothers: true,
    defaultpaneindex: 0,
    listener: mockListener,
    className: "app-accordion panel panel-default",
    "data-design-token-target":true
  },
  argTypes: {
    closeothers: { control: "boolean" },
    className: {
      control: { type: "select" },
      options: [
        "app-accordion panel panel-default",
        "app-accordion panel panel-secondary",
        "app-accordion panel panel-primary",
        "app-accordion panel panel-tertiary",
      ],
    },
    defaultpaneindex: { control: "number" },
    type: { control: { type: "select", options: ["static", "dynamic"] } },
    dataset:{ control: "object" },
    "data-design-token-target": { table: { disable: true } },
    name:{ table: { disable: true } },
    listener:{ table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: accordionTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "accordion",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};

export const DynamicAccordion: Story = {
  tags: ['show-panel'],
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
  argTypes: {
    closeothers: { control: "boolean" },
    defaultpaneindex: { control: "number" },
    type: { control: { type: "select", options: ["static", "dynamic"] } },
    dataset: { control: "object" },
    className: {
      control: { type: "select" },
      options: [
        "app-accordion panel panel-default",
        "app-accordion panel panel-secondary",
        "app-accordion panel panel-primary",
        "app-accordion panel panel-tertiary",
      ],
    },
    name:{ table: { disable: true } },
    listener:{ table: { disable: true } },
  }
};


// export const Basic: Story = {
//   tags: ['show-panel'],
//   render: (args) => (
//     <WmAccordion {...args}>
//       <WmAccordionPane
//         name="pane1"
//         title="Section 1"
//         iconclass="fa fa-file"
//         listener={mockListener}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography>Content for section 1</Typography>
//         </Box>
//       </WmAccordionPane>

//       <WmAccordionPane
//         name="pane2"
//         title="Section 2"
//         iconclass="fa fa-folder"
//         listener={mockListener}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography>Content for section 2</Typography>
//         </Box>
//       </WmAccordionPane>

//       <WmAccordionPane
//         name="pane3"
//         title="Section 3"
//         iconclass="fa fa-cog"
//         listener={mockListener}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography>Content for section 3</Typography>
//         </Box>
//       </WmAccordionPane>
//     </WmAccordion>
//   ),
//   args: {
//     name: "basicAccordion",
//     type: "static",
//     closeothers: true,
//     defaultpaneindex: 0,
//     listener: mockListener,
//     className: "app-accordion panel panel-default"
//   },
//   argTypes: {
//     closeothers: { control: "boolean" },
//     defaultpaneindex: { control: "number" },
//     type: { control: { type: "select", options: ["static", "dynamic"] } },
//     dataset: { control: "object" },
//     className: {
//       control: { type: "select" },
//       options: [
//         "app-accordion panel panel-default",
//         "app-accordion panel panel-secondary",
//         "app-accordion panel panel-primary",
//         "app-accordion panel panel-tertiary",
//       ],
//     }
//   }
// };
