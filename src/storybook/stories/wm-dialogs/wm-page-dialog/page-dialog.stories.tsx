import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import PageDialogDefaultExport from "../../../../components/dialogs/page-dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";

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
  title: "Dialogs/Page Dialog",
  component: PageDialogDefaultExport,
} satisfies Meta<typeof PageDialogDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box style={{ padding: 16 }}>
      <WmButton
        name="openPageDialogBtn"
        caption="Open Page Dialog"
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
      <PageDialogDefaultExport
        {...args}
        isopen={isOpen}
        onClose={() => setIsOpen(false)}
        close={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
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
    name:"docsPageDialog",
    listener:mockListener
  },
  argTypes:{
    name: {table: {disable: true}},
    listener:{table: {disable: true}},
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardPageDialog",
    title: "Page Content",
    iconclass: "fa fa-file",
    oktext: "OK",
    showactions: true,
    closable: true,
    content: "Main",
    listener: mockListener,
    // sheetposition:undefined,
  },
  argTypes: {
    title: { control: "text" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    oktext: { control: "text" },
    showactions: { control: "boolean" },
    closable: { control: "boolean" },
    content: { control: "text" },
    name: {table: {disable: true}},
    listener:{table: {disable: true}},
    // sheetposition:{control:{ type:"select"}, options: ['top', 'bottom', 'left', 'right']},
  }
};