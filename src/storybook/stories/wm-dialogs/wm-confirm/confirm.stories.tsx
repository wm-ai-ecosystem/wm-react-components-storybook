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
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import { iconClassNames } from "../../constants/iconClassConstants";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const meta = {
  title: "Dialogs/Confirm Dialog",
  component: ConfirmDialogDefaultExport,
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
      // styling={styling}
      style={style}
      token={token}
    />
  ),
  args:{
    name:"docsConfirmDialog",
    listener:mockListener
  },
  argTypes:{
    name: {table: {disable: true}},
    listener: {table: {disable: true}},
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
  },
  argTypes:{
    name: {table: {disable: true}},
    listener: {table: {disable: true}},
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardConfirm",
    title: "Confirm",
    message: "I am confirm box!",
    oktext: "OK",
    canceltext: "CANCEL",
    iconclass: "fa fa-circle-check",
    listener: mockListener,
    // sheetposition: undefined,
  },
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    oktext: { control: "text" },
    canceltext: { control: "text" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    sheetposition:{control:{ type:"select"}, options: ['top', 'bottom', 'left', 'right']},
    name: {table: {disable: true}},
    listener: {table: {disable: true}},
  },
};