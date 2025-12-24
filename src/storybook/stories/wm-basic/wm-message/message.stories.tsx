import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import MessageDefaultExport from "../../../../components/basic/message/index";
import { animationNames } from "../../constants/animationsConstants";

const meta: Meta<typeof MessageDefaultExport> = {
  title: "Basic/Message",
  component: MessageDefaultExport,
  argTypes: {
    caption: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["success", "error", "warning", "info", "loading"],
    },
    hideclose: { control: "boolean" },
    animation: { control: "select", options: animationNames },
  },
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

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <MessageDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicMessage",
    listener: mockListener,
    caption: "Operation completed successfully!",
    type: "success",
    hideclose: false,
  },
};

export const Animation: Story = {
  render: Template,
  args: {
    name: "animatedMessage",
    listener: mockListener,
    caption: "This message has an animation applied",
    type: "success",
    hideclose: false,
    animation: "fadeIn",
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <Typography variant="subtitle1">All Message Types:</Typography>
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
};

// export const Success: Story = {
//   render: Template,
//   args: {
//     name: "successMessage",
//     listener: mockListener,
//     caption: "Operation completed successfully!",
//     type: "success",
//     hideclose: false,
//   },
// };

// export const Error: Story = {
//   render: Template,
//   args: {
//     name: "errorMessage",
//     listener: mockListener,
//     caption: "An error occurred while processing your request.",
//     type: "error",
//     hideclose: false,
//   },
// };

// export const Warning: Story = {
//   render: Template,
//   args: {
//     name: "warningMessage",
//     listener: mockListener,
//     caption: "Warning: This action cannot be undone.",
//     type: "warning",
//     hideclose: false,
//   },
// };

// export const Info: Story = {
//   render: Template,
//   args: {
//     name: "infoMessage",
//     listener: mockListener,
//     caption: "Here is some useful information for you.",
//     type: "info",
//     hideclose: false,
//   },
// };

// export const Loading: Story = {
//   render: Template,
//   args: {
//     name: "loadingMessage",
//     listener: mockListener,
//     caption: "Loading data, please wait...",
//     type: "loading",
//     hideclose: true,
//   },
// };

// export const WithoutCloseButton: Story = {
//   render: Template,
//   args: {
//     name: "noCloseMessage",
//     listener: mockListener,
//     caption: "This message cannot be closed by the user.",
//     type: "info",
//     hideclose: true,
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "customMessage",
//     listener: mockListener,
//     caption: "Custom styled message",
//     type: "success",
//     hideclose: false,
//     styles: {
//       fontSize: "18px",
//       fontWeight: "600",
//       padding: "16px 20px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//     },
//   },
// };

// export const LongMessage: Story = {
//   render: Template,
//   args: {
//     name: "longMessage",
//     listener: mockListener,
//     caption:
//       "This is a longer message that contains more detailed information. It demonstrates how the message component handles longer text content and wraps appropriately within the container.",
//     type: "info",
//     hideclose: false,
//   },
// };

// export const FormValidationMessages: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Form Validation Examples:</Typography>
//           <Stack spacing={2}>
//             <Box>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 style={{
//                   padding: "8px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   width: "100%",
//                   marginBottom: "8px",
//                 }}
//               />
//               <MessageDefaultExport
//                 name="usernameError"
//                 caption="Username must be at least 5 characters long."
//                 type="error"
//                 hideclose={false}
//                 listener={mockListener}
//                 styles={{ fontSize: "14px" }}
//               />
//             </Box>
//             <Box>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 style={{
//                   padding: "8px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   width: "100%",
//                   marginBottom: "8px",
//                 }}
//               />
//               <MessageDefaultExport
//                 name="emailWarning"
//                 caption="Please use a valid company email address."
//                 type="warning"
//                 hideclose={false}
//                 listener={mockListener}
//                 styles={{ fontSize: "14px" }}
//               />
//             </Box>
//             <Box>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 style={{
//                   padding: "8px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   width: "100%",
//                   marginBottom: "8px",
//                 }}
//               />
//               <MessageDefaultExport
//                 name="passwordSuccess"
//                 caption="Password strength: Strong"
//                 type="success"
//                 hideclose={true}
//                 listener={mockListener}
//                 styles={{ fontSize: "14px" }}
//               />
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "formValidation",
//     listener: mockListener,
//   },
// };

// export const NotificationStack: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Notification Stack:</Typography>
//           <Box
//             style={{
//               position: "relative",
//               maxWidth: "400px",
//             }}
//           >
//             <Stack spacing={2}>
//               <MessageDefaultExport
//                 name="notification1"
//                 caption="File uploaded successfully"
//                 type="success"
//                 hideclose={false}
//                 listener={mockListener}
//               />
//               <MessageDefaultExport
//                 name="notification2"
//                 caption="Processing your request..."
//                 type="loading"
//                 hideclose={true}
//                 listener={mockListener}
//               />
//               <MessageDefaultExport
//                 name="notification3"
//                 caption="2 new messages received"
//                 type="info"
//                 hideclose={false}
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "notificationStack",
//     listener: mockListener,
//   },
// };

