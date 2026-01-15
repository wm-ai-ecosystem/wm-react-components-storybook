import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import ConfirmDialogDefaultExport from "../../../../components/dialogs/confirm-dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";

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

const meta = {
  title: "Dialogs/Confirm Dialog",
  component: ConfirmDialogDefaultExport,
  // argTypes: {
  //   title: { control: "text" },
  //   message: { control: "text" },
  //   oktext: { control: "text" },
  //   canceltext: { control: "text" },
  //   iconclass: { control: "select", options: ["fa fa-circle-check", "fa fa-trash", "fa fa-save"] },
  // },
} satisfies Meta<typeof ConfirmDialogDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
const [isOpen, setIsOpen] = useState(false);

  return (
    <Box style={{ padding: 16 }}>
      <WmButton
        name="openConfirmBtn"
        caption="Open Confirm Dialog"
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
      <ConfirmDialogDefaultExport
        {...args}
        isopen={isOpen}
        onClose={() => setIsOpen(false)}
        close={() => setIsOpen(false)}
        onOkClick={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
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
      styling={styling}
    />
  ),
  args:{
    name:"docsConfirmDialog",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const [openDialogs, setOpenDialogs] = useState<{
      delete: boolean;
      save: boolean;
      logout: boolean;
    }>({
      delete: false,
      save: false,
      logout: false,
    });

    const handleOpen = (type: "delete" | "save" | "logout") => {
      setOpenDialogs((prev) => ({ ...prev, [type]: true }));
    };

    const handleClose = (type: "delete" | "save" | "logout") => {
      setOpenDialogs((prev) => ({ ...prev, [type]: false }));
    };

    return (
      <Box style={{ padding: 16 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
          <WmButton
            name="openDeleteBtn"
            caption="Delete Item"
            onClick={() => handleOpen("delete")}
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
            name="openSaveBtn"
            caption="Save Changes"
            onClick={() => handleOpen("save")}
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
          <WmButton
            name="openLogoutBtn"
            caption="Logout"
            onClick={() => handleOpen("logout")}
            listener={mockListener}
            styles={{
              backgroundColor: "#00c8ff",
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

        <ConfirmDialogDefaultExport
          name="deleteConfirm"
          title="Delete Item"
          message="Are you sure you want to delete this item?"
          oktext="Delete"
          canceltext="Cancel"
          iconclass="wi wi-trash"
          isopen={openDialogs.delete}
          onClose={() => handleClose("delete")}
          close={() => handleClose("delete")}
          onOk={() => handleClose("delete")}
          onCancel={() => handleClose("delete")}
          listener={mockListener}
        />
        <ConfirmDialogDefaultExport
          name="saveConfirm"
          title="Save Changes"
          message="Do you want to save your changes?"
          oktext="Save"
          canceltext="Discard"
          iconclass="wi wi-save"
          isopen={openDialogs.save}
          onClose={() => handleClose("save")}
          close={() => handleClose("save")}
          onOk={() => handleClose("save")}
          onCancel={() => handleClose("save")}
          listener={mockListener}
        />
        <ConfirmDialogDefaultExport
          name="logoutConfirm"
          title="Logout"
          message="Are you sure you want to logout?"
          oktext="Yes"
          canceltext="No"
          iconclass="wi wi-sign-out"
          isopen={openDialogs.logout}
          onClose={() => handleClose("logout")}
          close={() => handleClose("logout")}
          onOk={() => handleClose("logout")}
          onCancel={() => handleClose("logout")}
          listener={mockListener}
        />
      </Box>
    );
  },
  args:{
    name:"showcaseConfirmDialog",
    listener:mockListener
  }
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicConfirm",
    title: "Confirm",
    message: "I am confirm box!",
    oktext: "OK",
    canceltext: "CANCEL",
    iconclass: "fa fa-circle-check",
    listener: mockListener,
  },
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    oktext: { control: "text" },
    canceltext: { control: "text" },
    iconclass: { control: "select", options: ["fa fa-circle-check", "fa fa-trash", "fa fa-save"] },
  },
};

// export const DeleteConfirmation: Story = {
//   render: Template,
//   args: {
//     name: "deleteConfirm",
//     title: "Delete Confirmation",
//     message: "Are you sure you want to delete this item? This action cannot be undone.",
//     oktext: "Delete",
//     canceltext: "Cancel",
//     iconclass: "fa fa-trash",
//     listener: mockListener,
//   },
// };

// export const SaveChanges: Story = {
//   render: Template,
//   args: {
//     name: "saveConfirm",
//     title: "Save Changes",
//     message: "You have unsaved changes. Do you want to save them before leaving?",
//     oktext: "Save",
//     canceltext: "Discard",
//     iconclass: "fa fa-save",
//     listener: mockListener,
//   },
// };

// export const LogoutConfirmation: Story = {
//   render: Template,
//   args: {
//     name: "logoutConfirm",
//     title: "Logout",
//     message: "Are you sure you want to logout?",
//     oktext: "Yes, Logout",
//     canceltext: "Cancel",
//     iconclass: "wi wi-sign-out",
//   },
// };

// export const SubmitForm: Story = {
//   render: Template,
//   args: {
//     name: "submitConfirm",
//     title: "Submit Form",
//     message: "Please review your information before submitting. Continue?",
//     oktext: "Submit",
//     canceltext: "Review",
//     iconclass: "wi wi-paper-plane",
//   },
// };

// export const CustomButtons: Story = {
//   render: Template,
//   args: {
//     name: "customConfirm",
//     title: "Custom Actions",
//     message: "This confirm dialog has custom button labels.",
//     oktext: "Proceed",
//     canceltext: "Go Back",
//     iconclass: "wi wi-question-circle",
//   },
// };

// export const LongMessage: Story = {
//   render: Template,
//   args: {
//     name: "longMessageConfirm",
//     title: "Terms and Conditions",
//     message:
//       "By clicking Accept, you agree to our Terms of Service and Privacy Policy. This includes allowing us to collect and process your data as described in our privacy policy. You can withdraw your consent at any time by contacting our support team. Please read the full terms and conditions before accepting.",
//     oktext: "Accept",
//     canceltext: "Decline",
//     iconclass: "wi wi-document",
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [actionCount, setActionCount] = useState(0);
//     const [lastAction, setLastAction] = useState<string>("");

//     const handleOpen = () => {
//       setIsOpen(true);
//       setActionCount((prev) => prev + 1);
//       setLastAction("Dialog opened");
//     };

//     const handleOk = () => {
//       setIsOpen(false);
//       setLastAction("OK clicked");
//     };

//     const handleCancel = () => {
//       setIsOpen(false);
//       setLastAction("Cancel clicked");
//     };

//     const handleClose = () => {
//       setIsOpen(false);
//       setLastAction("Dialog closed (X button)");
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <WmButton
//             name="openInteractiveConfirmBtn"
//             caption="Open Interactive Confirm"
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
//             <Typography variant="body2">Times Opened: {actionCount}</Typography>
//             <Typography variant="body2">Last Action: {lastAction || "None"}</Typography>
//           </Box>

//           <ConfirmDialogDefaultExport
//             name="interactiveConfirm"
//             title="Interactive Confirm"
//             message="Choose an action to see the event tracking in action."
//             oktext="OK"
//             canceltext="Cancel"
//             iconclass="wi wi-info"
//             isopen={isOpen}
//             onClose={handleClose}
//             close={handleClose}
//             onOk={handleOk}
//             onCancel={handleCancel}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
// };
