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
// import styling from "./docs/styling.md?raw";
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
    name: "standardAlert",
    title: "Alert",
    text: "I am Alert Box!",
    oktext: "OK",
    alerttype: "warning",
    iconclass: "fa fa-warning",
    listener: mockListener,
    // sheetposition: undefined,
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
    sheetposition:{control:{ type:"select"}, options: ['top', 'bottom', 'left', 'right']},
    name: {table: {disable: true}},
    listener: {table: {disable: true}},
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