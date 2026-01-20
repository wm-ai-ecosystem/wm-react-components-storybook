import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import AlertDialogDefaultExport from "../../../../components/dialogs/alert-dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import { iconClassNames } from "../../constants/iconClassConstants";

// import modalDialogTokensData from "../../../../designTokens/components/modal-dialog/modal-dialog.json";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const meta = {
  title: "Dialogs/Alert Dialog",
  component: AlertDialogDefaultExport,
  // argTypes: {
  //   title: { control: "text" },
  //   text: { control: "text" },
  //   oktext: { control: "text" },
  //   alerttype: {
  //     control: { type: "select" },
  //     options: ["error", "warning", "info", "success"],
  //   },
  //   iconclass: { control: "select", options: ["fa fa-warning", "fa fa-check-circle"] },
  // },
} satisfies Meta<typeof AlertDialogDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box style={{ padding: 16 }}>
      <WmButton
        name="openAlertBtn"
        caption="Open Alert Dialog"
        onClick={() => setIsOpen(true)}
        listener={mockListener}
        styles={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
        }}
      />
      <AlertDialogDefaultExport
        {...args}
        isopen={isOpen}
        onClose={() => setIsOpen(false)}
        close={() => setIsOpen(false)}
        onOkClick={() => setIsOpen(false)}
        listener={mockListener}
      />
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
    name:"docsAlertDialog",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const [openAlerts, setOpenAlerts] = useState<{
      error: boolean;
      warning: boolean;
      success: boolean;
    }>({
      error: false,
      warning: false,
      success: false,
    });

    const handleOpen = (type: "error" | "warning" | "success") => {
      setOpenAlerts((prev) => ({ ...prev, [type]: true }));
    };

    const handleClose = (type: "error" | "warning" | "success") => {
      setOpenAlerts((prev) => ({ ...prev, [type]: false }));
    };

    return (
      <Box style={{ padding: 16 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
          <WmButton
            name="openErrorBtn"
            caption="Show Error"
            onClick={() => handleOpen("error")}
            listener={mockListener}
            styles={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
          <WmButton
            name="openWarningBtn"
            caption="Show Warning"
            onClick={() => handleOpen("warning")}
            listener={mockListener}
            styles={{
              backgroundColor: "#ffae00",
              color: "black",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
          <WmButton
            name="openSuccessBtn"
            caption="Show Success"
            onClick={() => handleOpen("success")}
            listener={mockListener}
            styles={{
              backgroundColor: "#5AC588",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
        </Stack>

        <AlertDialogDefaultExport
          name="errorAlert"
          title="Error"
          text="An error occurred!"
          oktext="OK"
          alerttype="error"
          iconclass="wi wi-error"
          isopen={openAlerts.error}
          onClose={() => handleClose("error")}
          close={() => handleClose("error")}
          onOkClick={() => handleClose("error")}
          listener={mockListener}
        />
        <AlertDialogDefaultExport
          name="warningAlert"
          title="Warning"
          text="Please be careful!"
          oktext="OK"
          alerttype="warning"
          iconclass="wi wi-warning"
          isopen={openAlerts.warning}
          onClose={() => handleClose("warning")}
          close={() => handleClose("warning")}
          onOkClick={() => handleClose("warning")}
          listener={mockListener}
        />
        <AlertDialogDefaultExport
          name="successAlert"
          title="Success"
          text="Operation completed successfully!"
          oktext="OK"
          alerttype="success"
          iconclass="wi wi-check-circle"
          isopen={openAlerts.success}
          onClose={() => handleClose("success")}
          close={() => handleClose("success")}
          onOkClick={() => handleClose("success")}
          listener={mockListener}
        />
      </Box>
    );
  },
  args:{
    name:"showcaseAlerts",
    listener:mockListener
  }
};


export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicAlert",
    title: "Alert",
    text: "I am Alert Box!",
    oktext: "OK",
    alerttype: "warning",
    iconclass: "fa fa-warning",
    listener: mockListener,
    sheetposition: undefined,
  },
  argTypes: {
    title: { control: "text" },
    text: { control: "text" },
    oktext: { control: "text" },
    alerttype: {
      control: { type: "select" },
      options: ["error", "warning", "info", "success"],
    },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    sheetposition:{control:{ type:"select"}, options: [undefined, 'top', 'bottom', 'left', 'right']},
  },
};

// export const Standard: Story = {
//   tags: ['show-panel'],
//   render: (args) => {
//       //component can't spread data-design-token-target, so we apply it to a wrapper
//       const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
//       const [isOpen, setIsOpen] = useState(false);
  
//       return (
//         <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
//           <Box style={{ padding: 16 }}>
//       <WmButton
//         name="openAlertBtn"
//         caption="Open Alert Dialog"
//         onClick={() => setIsOpen(true)}
//         listener={mockListener}
//         styles={{
//           backgroundColor: "#007bff",
//           color: "white",
//           padding: "8px 16px",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//           fontSize: "14px",
//           fontWeight: "500",
//         }}
//       />
//       <AlertDialogDefaultExport
//         {...args}
//         isopen={isOpen}
//         onClose={() => setIsOpen(false)}
//         close={() => setIsOpen(false)}
//         onOkClick={() => setIsOpen(false)}
//         listener={mockListener}
//       />
//     </Box>
//         </Box>
//       );
//     },
//   args: {
//     name: "standardAlert",
//     title: "Alert",
//     text: "I am Alert Box!",
//     oktext: "OK",
//     alerttype: "warning",
//     iconclass: "fa fa-warning",
//     listener: mockListener,
//     "data-design-token-target":"true"
//   },
//   argTypes: {
//     title: { control: "text" },
//     text: { control: "text" },
//     oktext: { control: "text" },
//     alerttype: {
//       control: { type: "select" },
//       options: ["error", "warning", "info", "success"],
//     },
//     iconclass: { control: "select", options: ["fa fa-warning", "fa fa-check-circle"] },
//     "data-design-token-target": { control: false }
//   },
//   parameters: {
//     designTokens: {
//       enabled: true,
//       tokenData: modalDialogTokensData,  // Pass raw JSON data instead of pre-parsed config
//       componentKey: "modal",  // Component identifier for parsing
//       extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
//     },
//     layout: 'fullscreen',
//   }, 
// };

// export const ErrorAlert: Story = {
//   render: Template,
//   args: {
//     name: "errorAlert",
//     title: "Error",
//     text: "An error has occurred. Please try again.",
//     oktext: "OK",
//     alerttype: "error",
//     iconclass: "wi wi-error",
//   },
// };

// export const WarningAlert: Story = {
//   render: Template,
//   args: {
//     name: "warningAlert",
//     title: "Warning",
//     text: "This action cannot be undone. Please proceed with caution.",
//     oktext: "OK",
//     alerttype: "warning",
//     iconclass: "wi wi-warning",
//   },
// };

// export const InfoAlert: Story = {
//   render: Template,
//   args: {
//     name: "infoAlert",
//     title: "Information",
//     text: "This is an informational message for your reference.",
//     oktext: "Got it",
//     alerttype: "info",
//     iconclass: "wi wi-info",
//   },
// };

// export const SuccessAlert: Story = {
//   render: Template,
//   args: {
//     name: "successAlert",
//     title: "Success",
//     text: "Your operation completed successfully!",
//     oktext: "Great",
//     alerttype: "success",
//     iconclass: "wi wi-check-circle",
//   },
// };

// export const CustomMessage: Story = {
//   render: Template,
//   args: {
//     name: "customAlert",
//     title: "Custom Alert",
//     message: "This is a custom message passed via the message prop.",
//     oktext: "Acknowledge",
//     alerttype: "info",
//     iconclass: "wi wi-bell",
//   },
// };

// export const LongMessage: Story = {
//   render: Template,
//   args: {
//     name: "longMessageAlert",
//     title: "Terms and Conditions",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//     oktext: "I Agree",
//     alerttype: "info",
//     iconclass: "wi wi-document",
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [alertCount, setAlertCount] = useState(0);
//     const [lastAction, setLastAction] = useState<string>("");

//     const handleOpen = () => {
//       setIsOpen(true);
//       setAlertCount((prev) => prev + 1);
//       setLastAction("Alert opened");
//     };

//     const handleClose = () => {
//       setIsOpen(false);
//       setLastAction("Alert closed");
//     };

//     const handleOkClick = () => {
//       setIsOpen(false);
//       setLastAction("OK button clicked");
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <WmButton
//             name="openInteractiveAlertBtn"
//             caption="Open Interactive Alert"
//             onClick={handleOpen}
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#007bff",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2">Event Log:</Typography>
//             <Typography variant="body2">Times Opened: {alertCount}</Typography>
//             <Typography variant="body2">Last Action: {lastAction || "None"}</Typography>
//           </Box>

//           <AlertDialogDefaultExport
//             name="interactiveAlert"
//             title="Interactive Alert"
//             text="This alert tracks user interactions. Click OK to close."
//             oktext="OK"
//             alerttype="info"
//             iconclass="wi wi-info"
//             isopen={isOpen}
//             onClose={handleClose}
//             close={handleClose}
//             onOkClick={handleOkClick}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
// };