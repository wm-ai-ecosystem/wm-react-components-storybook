import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import ButtonDefaultExport from "../../../../components/form/button/index";

import { ComponentDocumentation } from "../../../components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const meta = {
  title: "Basic/Button",
  component: ButtonDefaultExport,
  argTypes: {
    caption: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    shortcutkey: { control: "text" },
    arialabel: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonDefaultExport>;

export default meta;

type Story = StoryObj<typeof meta>;
const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <ButtonDefaultExport {...args} listener={mockListener} />
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
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default: Story = {
  render: Template,
  args: {
    name: "defaultButton",
    caption: "Click Me",
    disabled: false,
    type: "button",
  },
};

export const Primary: Story = {
  render: Template,
  args: {
    name: "primaryButton",
    caption: "Primary Button",
    disabled: false,
    type: "button",
    styles: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
  },
};

// // Interactive story with click handler
export const Interactive: Story = {
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    const [lastAction, setLastAction] = useState<string>("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
      setClickCount(prev => prev + 1);
      setLastAction("Clicked");
    };

    const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
      setLastAction("Double-clicked");
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
      setLastAction("Mouse entered");
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
      setLastAction("Mouse left");
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>, props: any) => {
      setLastAction("Focused");
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>, props: any) => {
      setLastAction("Blurred");
    };

    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <ButtonDefaultExport
            name="interactiveBtn"
            caption="Interactive Button"
            disabled={false}
            type="button"
            listener={mockListener}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            <Typography variant="body2">Click Count: {clickCount}</Typography>
            <Typography variant="body2">Last Action: {lastAction || "None"}</Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "interactive",
    listener: mockListener,
  },
};

// Story demonstrating multiple buttons
export const ButtonGroup: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
          <ButtonDefaultExport
            name="cancelBtn"
            caption="Cancel"
            disabled={false}
            type="button"
            listener={mockListener}
            styles={{
              backgroundColor: "#6c757d",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
          <ButtonDefaultExport
            name="saveBtn"
            caption="Save"
            disabled={false}
            type="button"
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
          <ButtonDefaultExport
            name="deleteBtn"
            caption="Delete"
            disabled={false}
            type="button"
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
        </Stack>
      </Box>
    );
  },
  args: {
    name: "buttonGroup",
    listener: mockListener,
  },
};
