import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import AlertDialogDefaultExport from "../../../../components/dialogs/alert-dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const meta = {
  title: "Dialogs/Alert Dialog",
  component: AlertDialogDefaultExport,
  argTypes: {
    title: { control: "text" },
    text: { control: "text" },
    oktext: { control: "text" },
    alerttype: {
      control: { type: "select" },
      options: ["error", "warning", "info", "success"],
    },
    iconclass: { control: "text" },
  },
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

export const Default: Story = {
  render: Template,
  args: {
    name: "defaultAlert",
    title: "Alert",
    text: "I am Alert Box!",
    oktext: "OK",
    alerttype: "error",
    iconclass: "wi wi-warning",
  },
};

export const ErrorAlert: Story = {
  render: Template,
  args: {
    name: "errorAlert",
    title: "Error",
    text: "An error has occurred. Please try again.",
    oktext: "OK",
    alerttype: "error",
    iconclass: "wi wi-error",
  },
};

export const WarningAlert: Story = {
  render: Template,
  args: {
    name: "warningAlert",
    title: "Warning",
    text: "This action cannot be undone. Please proceed with caution.",
    oktext: "OK",
    alerttype: "warning",
    iconclass: "wi wi-warning",
  },
};

export const InfoAlert: Story = {
  render: Template,
  args: {
    name: "infoAlert",
    title: "Information",
    text: "This is an informational message for your reference.",
    oktext: "Got it",
    alerttype: "info",
    iconclass: "wi wi-info",
  },
};

export const SuccessAlert: Story = {
  render: Template,
  args: {
    name: "successAlert",
    title: "Success",
    text: "Your operation completed successfully!",
    oktext: "Great",
    alerttype: "success",
    iconclass: "wi wi-check-circle",
  },
};

export const CustomMessage: Story = {
  render: Template,
  args: {
    name: "customAlert",
    title: "Custom Alert",
    message: "This is a custom message passed via the message prop.",
    oktext: "Acknowledge",
    alerttype: "info",
    iconclass: "wi wi-bell",
  },
};

export const LongMessage: Story = {
  render: Template,
  args: {
    name: "longMessageAlert",
    title: "Terms and Conditions",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    oktext: "I Agree",
    alerttype: "info",
    iconclass: "wi wi-document",
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [alertCount, setAlertCount] = useState(0);
    const [lastAction, setLastAction] = useState<string>("");

    const handleOpen = () => {
      setIsOpen(true);
      setAlertCount((prev) => prev + 1);
      setLastAction("Alert opened");
    };

    const handleClose = () => {
      setIsOpen(false);
      setLastAction("Alert closed");
    };

    const handleOkClick = () => {
      setIsOpen(false);
      setLastAction("OK button clicked");
    };

    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <WmButton
            name="openInteractiveAlertBtn"
            caption="Open Interactive Alert"
            onClick={handleOpen}
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

          <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
            <Typography variant="subtitle2">Event Log:</Typography>
            <Typography variant="body2">Times Opened: {alertCount}</Typography>
            <Typography variant="body2">Last Action: {lastAction || "None"}</Typography>
          </Box>

          <AlertDialogDefaultExport
            name="interactiveAlert"
            title="Interactive Alert"
            text="This alert tracks user interactions. Click OK to close."
            oktext="OK"
            alerttype="info"
            iconclass="wi wi-info"
            isopen={isOpen}
            onClose={handleClose}
            close={handleClose}
            onOkClick={handleOkClick}
            listener={mockListener}
          />
        </Stack>
      </Box>
    );
  },
};

export const MultipleAlerts: Story = {
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
              backgroundColor: "#dc3545",
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
              backgroundColor: "#ffc107",
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
              backgroundColor: "#28a745",
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
};
