import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography, Stack } from "@mui/material";
import WmPopover from "../../../../components/navigation/popover";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import { animationNames } from "../../constants/animationsConstants";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import popoverTokensData from "../../../../designTokens/components/popover/popover.json";



const meta = {
  title: "Navigation/Popover",
  component: WmPopover,
  // argTypes: {
  //   content: { control: "text" },
  //   title: { control: "text" },
  //   popoverwidth: { control: "text" },
  //   popoverheight: { control: "text" },
  //   popoverplacement: {
  //     control: { type: "select" },
  //     options: ["top", "bottom", "left", "right"],
  //   },
  //   popoverarrow: { control: "boolean" },
  //   interaction: {
  //     control: { type: "select" },
  //     options: ["click", "hover", "click and hover"],
  //   },
  //   contentsource: {
  //     control: { type: "select" },
  //     options: ["partial", "inline"],
  //   },
  //   autoclose: {
  //     control: { type: "select" },
  //     options: ["outsideClick", "always", "disabled"],
  //   },
  //   contentanimation: { control: "select", options: animationNames },
  // },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

// Rich UI component for partial content source
const UserProfileCard = () => (
  <Box sx={{ padding: 2, minWidth: "250px" }}>
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#1976d2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          JD
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            John Doe
          </Typography>
          <Typography variant="caption" color="text.secondary">
            john.doe@example.com
          </Typography>
        </Box>
      </Box>
      <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 1.5 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Role: Administrator
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last Login: 2 hours ago
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <button
          style={{
            flex: 1,
            padding: "6px 12px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          View Profile
        </button>
        <button
          style={{
            flex: 1,
            padding: "6px 12px",
            backgroundColor: "#f5f5f5",
            color: "#333",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          Logout
        </button>
      </Box>
    </Stack>
  </Box>
);

const NotificationCard = () => (
  <Box sx={{ padding: 2, minWidth: "280px", maxWidth: "320px" }}>
    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
      Recent Notifications
    </Typography>
    <Stack spacing={1.5} sx={{ mt: 1.5 }}>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "start" }}>
        <Box sx={{ fontSize: "18px" }}>📧</Box>
        <Box>
          <Typography variant="body2" fontWeight={500}>
            New message received
          </Typography>
          <Typography variant="caption" color="text.secondary">
            2 minutes ago
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "start" }}>
        <Box sx={{ fontSize: "18px" }}>🔔</Box>
        <Box>
          <Typography variant="body2" fontWeight={500}>
            System update completed
          </Typography>
          <Typography variant="caption" color="text.secondary">
            1 hour ago
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "start" }}>
        <Box sx={{ fontSize: "18px" }}>✅</Box>
        <Box>
          <Typography variant="body2" fontWeight={500}>
            Task approved
          </Typography>
          <Typography variant="caption" color="text.secondary">
            3 hours ago
          </Typography>
        </Box>
      </Box>
    </Stack>
    <Box sx={{ mt: 2, textAlign: "center" }}>
      <button
        style={{
          padding: "6px 16px",
          backgroundColor: "transparent",
          color: "#1976d2",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        View All
      </button>
    </Box>
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
    name:"docsPopover",
    listener:mockListener,
    popoverarrow: true,
    popoverheight: "auto",
    popoverwidth: "240px",
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const showcaseItems = [
      {
        title: "Interaction: Click",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Click Me", color: "#1976d2" },
        content: "Opens when you click the button",
      },
      {
        title: "Interaction: Hover",
        props: {
          interaction: "hover" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Hover Me", color: "#2e7d32" },
        content: "Opens when you hover over the button",
      },
      {
        title: "Placement: Top",
        props: {
          interaction: "click" as const,
          popoverplacement: "top" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Top Placement", color: "#1976d2" },
        content: "Popover appears at the top",
      },
      {
        title: "Placement: Bottom",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Bottom Placement", color: "#1976d2" },
        content: "Popover appears at the bottom",
      },
      {
        title: "Placement: Right",
        props: {
          interaction: "click" as const,
          popoverplacement: "right" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Right Placement", color: "#1976d2" },
        content: "Popover appears on the right side",
      },
      {
        title: "Placement: Left",
        props: {
          interaction: "click" as const,
          popoverplacement: "left" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Left Placement", color: "#1976d2" },
        content: "Popover appears on the left side",
      },
      {
        title: "Arrow: Enabled",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "With Arrow", color: "#1976d2" },
        content: "Popover with arrow indicator",
      },
      {
        title: "Arrow: Disabled",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: false,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Without Arrow", color: "#9c27b0" },
        content: "Popover without arrow indicator",
      },
      {
        title: "Autoclose: Outside Click",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Outside Click", color: "#1976d2" },
        content: "Closes when clicking outside the popover",
      },
      {
        title: "Autoclose: Always",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "always" as const,
        },
        buttonProps: { caption: "Always Close", color: "#d32f2f" },
        content: "Closes when clicking anywhere on page",
      },
      {
        title: "Autoclose: Disabled",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "disabled" as const,
        },
        buttonProps: { caption: "Never Close", color: "#616161" },
        content: "Must click trigger button again to close",
      },
      {
        title: "Rich Content: User Profile",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "User Profile", color: "#1976d2", icon: "fa fa-user" },
        isRichContent: true,
        richContent: <UserProfileCard />,
      },
      {
        title: "Rich Content: Notifications",
        props: {
          interaction: "click" as const,
          popoverplacement: "bottom" as const,
          popoverarrow: true,
          autoclose: "outsideClick" as const,
        },
        buttonProps: { caption: "Notifications", color: "#1976d2", icon: "fa fa-bell" },
        isRichContent: true,
        richContent: <NotificationCard />,
      },
    ];

    return (
      <Box sx={{ width: "100%", p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Popover Showcase
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 4,
          }}
        >
          {showcaseItems.map((item, index) => (
            <Box key={index}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                style={{ marginBottom: "6px" }}
              >
                {item.title}
              </Typography>
              <WmPopover
                name={`popover_showcase_${index}`}
                caption={item.buttonProps.caption}
                iconclass={item.buttonProps.icon}
                popoverwidth={item.isRichContent ? "auto" : "260px"}
                popoverheight="auto"
                listener={mockListener}
                styles={{
                  backgroundColor: item.buttonProps.color,
                  color: "#ffffff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "100%",
                  display: "inline-block",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                {...item.props}
              >
                {item.isRichContent ? (
                  item.richContent
                ) : (
                  <Box sx={{ p: 2.5 }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {item.content}
                    </Typography>
                  </Box>
                )}
              </WmPopover>
            </Box>
          ))}
        </Box>
      </Box>
    );
  },
  args: {
    name: "popoverShowcase",
    listener: mockListener,
    popoverarrow: true,
    popoverheight: "auto",
    popoverwidth: "260px",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  args: {
    name: "basicPopover",
    caption: "Click for Info",
    popoverwidth: "240px",
    popoverheight: "auto",
    popoverplacement: "bottom",
    popoverarrow: true,
    interaction: "click",
    contentsource: "inline",
    autoclose: "outsideClick",
    listener: mockListener,
  },
  render: (args) => (
    <WmPopover
      {...args}
      // styles={{
      //   backgroundColor: "#1976d2",
      //   color: "#ffffff",
      //   padding: "10px 20px",
      //   border: "none",
      //   borderRadius: "4px",
      //   cursor: "pointer",
      // }}
    >
      <Box sx={{ p: 2.5 }}>
        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
          This is popover content with inline source. You can add any content here.
        </Typography>
      </Box>
    </WmPopover>
  ),
  argTypes: {
    content: { control: "text" },
    title: { control: "text" },
    popoverwidth: { control: "text" },
    popoverheight: { control: "text" },
    popoverplacement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    popoverarrow: { control: "boolean" },
    interaction: {
      control: { type: "select" },
      options: ["click", "hover", "click and hover"],
    },
    contentsource: {
      control: { type: "select" },
      options: ["partial", "inline"],
    },
    autoclose: {
      control: { type: "select" },
      options: ["outsideClick", "always", "disabled"],
    },
    contentanimation: { control: "select", options: animationNames },
  },
};

// export const Animations: Story = {
//   tags: ['show-panel'],
//   args: {
//     name: "animationPopover",
//     caption: "Click for Info",
//     popoverwidth: "240px",
//     popoverheight: "auto",
//     popoverplacement: "bottom",
//     popoverarrow: true,
//     interaction: "click",
//     contentsource: "inline",
//     autoclose: "outsideClick",
//     listener: mockListener,
//     contentanimation: "fadeIn"
//   },
//   render: (args) => (
//     <WmPopover
//       {...args}
//       styles={{
//         backgroundColor: "#1976d2",
//         color: "#ffffff",
//         padding: "10px 20px",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//       }}
//     >
//       <Box sx={{ p: 2.5 }}>
//         <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
//           This is popover content with inline source. You can add any content here.
//         </Typography>
//       </Box>
//     </WmPopover>
//   ),
//   argTypes: {
//     content: { control: "text" },
//     title: { control: "text" },
//     popoverwidth: { control: "text" },
//     popoverheight: { control: "text" },
//     popoverplacement: {
//       control: { type: "select" },
//       options: ["top", "bottom", "left", "right"],
//     },
//     popoverarrow: { control: "boolean" },
//     interaction: {
//       control: { type: "select" },
//       options: ["click", "hover", "click and hover"],
//     },
//     contentsource: {
//       control: { type: "select" },
//       options: ["partial", "inline"],
//     },
//     autoclose: {
//       control: { type: "select" },
//       options: ["outsideClick", "always", "disabled"],
//     },
//     contentanimation: { control: "select", options: animationNames },
//   },
// };

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;

    return (
      // <div style={{ padding: 16 }} data-design-token-target={dataAttr}>
      //   <WmPopover
      //     {...componentArgs}
      //     styles={{
      //       backgroundColor: "#1976d2",
      //       color: "#fff",
      //       padding: "10px 16px",
      //       border: "none",
      //       borderRadius: "4px",
      //       cursor: "pointer",
      //     }}
      //   />
      // </div>
      <WmPopover
      {...componentArgs}
      data-design-token-target={dataAttr}
    >
      <Box sx={{ p: 2.5 }}>
        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
          This is popover content with inline source. You can add any content here.
        </Typography>
      </Box>
      </WmPopover>
    );
  },
  args: {
    name: "standardPopover",
    caption: "Popover",
    title: "Popover Header",
    popoverwidth: "280px",
    popoverheight: "auto",
    popoverplacement: "bottom",
    popoverarrow: true,
    interaction: "click",
    autoclose: "disabled",
    content: "Body content text",
    listener: mockListener,
    "data-design-token-target": "true"
  },
  argTypes: {
    caption: { control: false },
    title: { control: false },
    content: { control: false },
    popoverwidth: { control: false },
    popoverheight: { control: false },
    popoverplacement: { control: false },
    popoverarrow: { control: false },
    interaction: { control: false },
    autoclose: { control: false },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: popoverTokensData,
      componentKey: "popover",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};
