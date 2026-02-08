import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import DialogDefaultExport from "../../../../components/dialogs/dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import { WmDialogFooter } from "@wavemaker/react-runtime/components/dialogs/dialog-actions";
import WmText from "../../../../components/input/text";

import { iconClassNames } from "../../constants/iconClassConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const meta = {
  title: "Dialogs/Dialog",
  component: DialogDefaultExport,
} satisfies Meta<typeof DialogDefaultExport>;

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
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14176&p=f&t=TmoXZ4j5uVxcseDO-0",
        label: "",
      }}
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    name: "docsDialog",
    listener: mockListener,
  },
  argTypes:{
    name: {table: {disable: true}},
    listener: {table: {disable: true}},
  }
};

export const Showcase: Story = {
  tags: ["show-panel"],
  render: () => {
    const [openReadOnly, setOpenReadOnly] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    return (
      <Box p={4} maxWidth={900}>
        {/* Heading */}
        <Typography variant="h6" fontWeight={600} style={{marginBottom: "24px"}}>
          Design Dialog Showcase
        </Typography>

        <Typography variant="body1" color="text.secondary" style={{marginBottom: "16px"}}>
          Examples of design dialogs using Box and Stack. One dialog is read-only
          and the other contains an editable form.
        </Typography>

        {/* ================= TRIGGERS ================= */}
        <Stack direction="row" spacing={4} mb={4} gap="24px">
          <WmButton
          name="openDialogBtn"
          caption="Open Read-Only Dialog"
          onClick={() => setOpenReadOnly(true)}
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

          <WmButton
          name="openDialogFormBtn"
          caption="Open Update Form Dialog"
          onClick={() => setOpenForm(true)}
          listener={mockListener}
          styles={{
            backgroundColor: "#FF7250",
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

        {/* ================= READ ONLY DIALOG ================= */}
        <DialogDefaultExport
          name="readOnlyDialog"
          title="User Information"
          dialogtype="design-dialog"
          showheader
          closable
          modal
          isopen={openReadOnly}
          close={() => setOpenReadOnly(false)}
          onClose={() => setOpenReadOnly(false)}
          listener={mockListener}
        >
          <Box p={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Basic Information
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={4}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">
                    Ethan Clark
                  </Typography>
                </Box>

                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body1">
                    Frontend Engineer
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={4}>
                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1">
                    UI Engineering
                  </Typography>
                </Box>

                <Box flex={1}>
                  <Typography variant="caption" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1">
                    Active
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <WmDialogFooter name="readOnlyFooter" listener={mockListener}>
            <WmButton
              name="closeBtn"
              caption="Close"
              className="btn-primary"
              listener={mockListener}
              onClick={() => setOpenReadOnly(false)}
            />
          </WmDialogFooter>
        </DialogDefaultExport>

        {/* ================= FORM DIALOG ================= */}
        <DialogDefaultExport
          name="updateFormDialog"
          title="Update User Details"
          dialogtype="design-dialog"
          showheader
          closable
          modal
          isopen={openForm}
          close={() => setOpenForm(false)}
          onClose={() => setOpenForm(false)}
          listener={mockListener}
        >
          <Box p={3}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Update Details
            </Typography>

            <Stack spacing={2}>
              <WmText
                name="email"
                caption="Email"
                placeholder="Enter email"
                datavalue=""
                listener={mockListener}
              />

              <WmText
                name="phone"
                caption="Phone"
                placeholder="Enter phone number"
                datavalue=""
                listener={mockListener}
              />
            </Stack>
          </Box>

          <WmDialogFooter name="formFooter" listener={mockListener}>
            <WmButton
              name="cancelBtn"
              caption="Cancel"
              className="btn-default"
              listener={mockListener}
              onClick={() => setOpenForm(false)}
            />
            <WmButton
              name="saveBtn"
              caption="Save Changes"
              className="btn-primary"
              listener={mockListener}
              onClick={() => setOpenForm(false)}
            />
          </WmDialogFooter>
        </DialogDefaultExport>
      </Box>
    );
  },
  args:{
    name: "showcaseDesignDialog",
    listener:mockListener
  },
  argTypes:{
    name: {table: {disable: true}},
    listener: {table: {disable: true}},
  }
};


export const Standard: Story = {
  tags: ['show-panel'],
  render: (args: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box style={{ padding: 16 }}>
        <WmButton
          name="openDialogBtn"
          caption="Open Dialog"
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
        <DialogDefaultExport
          {...args}
          isopen={isOpen}
          onClose={() => setIsOpen(false)}
          close={() => setIsOpen(false)}
          listener={mockListener}
        >
          <Box sx={{ padding: 3 }}>
            <Typography variant="body1">
              This dialog includes a header, body and footer with action buttons.
            </Typography>
          </Box>
          <WmDialogFooter name="basicDialogFooter" listener={mockListener}>
            <WmButton
              name="cancelBtn"
              caption="Cancel"
              onClick={() => setIsOpen(false)}
              listener={mockListener}
              className="btn-default"
            />
            <WmButton
              name="saveBtn"
              caption="Save"
              onClick={() => setIsOpen(false)}
              listener={mockListener}
              className="btn-primary"
            />
          </WmDialogFooter>
        </DialogDefaultExport>
      </Box>
    );
  },
  args: {
    name: "standardDialog",
    title: "Standard Dialog",
    // dialogtype: "design-dialog",
    showheader: true,
    closable: true,
    modal: true,
    iconclass: "fa fa-file",
    listener: mockListener,
    // sheet: false,
    // sheetposition: undefined,
  },
  argTypes: {
    title: { control: "text" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    // dialogtype: {
    //   control: { type: "select" },
    //   options: ["design-dialog", "custom"],
    // },
    showheader: { control: "boolean" },
    closable: { control: "boolean" },
    modal: { control: "boolean" },
    // className: { control: "text" },
    // sheet:{ control: "boolean" },
    sheetposition:{control:{ type:"select"}, options: ['top', 'bottom', 'left', 'right']},
    name: {table: {disable: true}},
    listener: {table: {disable: true}},
  },
};