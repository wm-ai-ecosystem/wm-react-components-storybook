import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import MessageDefaultExport from "../../../../components/basic/message/index";
import { animationNames } from "../../constants/animationsConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import messageTokensData from "../../../../designTokens/components/message/message.json";

const meta: Meta<typeof MessageDefaultExport> = {
  title: "Basic/Message",
  component: MessageDefaultExport,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const Template = (args: any) => {
  // Message component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": dataAttr, ...componentArgs } = args;

  return (
    <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
      <MessageDefaultExport {...componentArgs} listener={mockListener} />
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
      style={style}
      token={token}
    />
  ),
  args:{
    name:"docsMessage",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } }, 
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>Message Showcase:</Typography>
          <Stack spacing={2}>
            <MessageDefaultExport
              name="success"
              caption="Success: Operation completed successfully!"
              type="success"
              hideclose={false}
              listener={mockListener}
            />
            <MessageDefaultExport
              name="error"
              caption="Error: Something went wrong with your request."
              type="error"
              hideclose={false}
              listener={mockListener}
            />
            <MessageDefaultExport
              name="warning"
              caption="Warning: Please review your input before proceeding."
              type="warning"
              hideclose={false}
              listener={mockListener}
            />
            <MessageDefaultExport
              name="info"
              caption="Info: Additional information is available in the documentation."
              type="info"
              hideclose={false}
              listener={mockListener}
            />
            <MessageDefaultExport
              name="loading"
              caption="Loading: Fetching data from the server..."
              type="loading"
              hideclose={true}
              listener={mockListener}
            />
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "allMessageTypes",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardMessage",
    listener: mockListener,
    caption: "Operation completed successfully!",
    type: "success",
    hideclose: false,
    "data-design-token-target": true,
  },
  argTypes: {
    caption: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["success", "error", "warning", "info", "loading"],
    },
    hideclose: { control: "boolean" },
    // animation: { control: "select", options: animationNames },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: messageTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "message",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
      // Map the "type" prop to CSS class names (what's in the DOM)
      // The parser will use selector lookup to find the variant key
      propToVariantMap: {
        propName: "type",  // Watch the "type" prop instead of className
        mapping: {
          success: "alert-success",   // type="success" → CSS class "alert-success" → variant key "filled-success"
          error: "alert-danger",      // type="error" → CSS class "alert-danger" → variant key "filled-danger"
          warning: "alert-warning",   // type="warning" → CSS class "alert-warning" → variant key "filled-warning"
          info: "alert-info",         // type="info" → CSS class "alert-info" → variant key "filled-info"
          loading: "alert-loading"    // type="loading" → CSS class "alert-loading" → variant key "filled-loading"
        }
      }
    },
    layout: 'fullscreen',
  },
};

// export const Animation: Story = {
//   tags: ['show-panel'],
//   render: Template,
//   args: {
//     name: "animatedMessage",
//     listener: mockListener,
//     caption: "This message has an animation applied",
//     type: "success",
//     hideclose: false,
//     animation: "tada",
//     "data-design-token-target": false,
//   },
//   argTypes: {
//     caption: { control: "text" },
//     type: {
//       control: { type: "select" },
//       options: ["success", "error", "warning", "info", "loading"],
//     },
//     hideclose: { control: "boolean" },
//     animation: { control: "select", options: animationNames },
//     "data-design-token-target": { table: { disable: true } },
//     name: { table: { disable: true } },
//     listener: { table: { disable: true } },
//   },
// };

