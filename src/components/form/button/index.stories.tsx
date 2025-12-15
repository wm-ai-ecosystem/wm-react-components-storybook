import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import ButtonDefaultExport from "./index";

const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const meta = {
  title: "Components/Form/Button",
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
} satisfies Meta<typeof ButtonDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <ButtonDefaultExport {...args} listener={mockListener} />
  </Box>
);

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

export const Success: Story = {
  render: Template,
  args: {
    name: "successButton",
    caption: "Success",
    disabled: false,
    type: "button",
    styles: {
      backgroundColor: "#28a745",
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

export const Danger: Story = {
  render: Template,
  args: {
    name: "dangerButton",
    caption: "Delete",
    disabled: false,
    type: "button",
    styles: {
      backgroundColor: "#dc3545",
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

export const Warning: Story = {
  render: Template,
  args: {
    name: "warningButton",
    caption: "Warning",
    disabled: false,
    type: "button",
    styles: {
      backgroundColor: "#ffc107",
      color: "black",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    name: "disabledButton",
    caption: "Disabled Button",
    disabled: true,
    type: "button",
    styles: {
      backgroundColor: "#ccc",
      color: "#999",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "not-allowed",
      fontSize: "14px",
      fontWeight: "500",
    },
  },
};

export const WithIcon: Story = {
  render: Template,
  args: {
    name: "iconButton",
    caption: "Save",
    disabled: false,
    type: "button",
    iconclass: "fa fa-save",
    iconposition: "left",
    iconwidth: "16",
    iconheight: "16",
    iconmargin: "0 8px 0 0",
    styles: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
  },
};

export const WithIconRight: Story = {
  render: Template,
  args: {
    name: "iconRightButton",
    caption: "Next",
    disabled: false,
    type: "button",
    iconclass: "fa fa-arrow-right",
    iconposition: "right",
    iconwidth: "16",
    iconheight: "16",
    iconmargin: "0 0 0 8px",
    styles: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
  },
};

export const WithBadge: Story = {
  render: Template,
  args: {
    name: "badgeButton",
    caption: "Notifications",
    disabled: false,
    type: "button",
    badgevalue: "5",
    styles: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      position: "relative",
    },
  },
};

export const SubmitButton: Story = {
  render: Template,
  args: {
    name: "submitBtn",
    caption: "Submit Form",
    disabled: false,
    type: "submit",
    styles: {
      backgroundColor: "#28a745",
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

export const ResetButton: Story = {
  render: Template,
  args: {
    name: "resetBtn",
    caption: "Reset",
    disabled: false,
    type: "reset",
    styles: {
      backgroundColor: "#6c757d",
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

export const LargeButton: Story = {
  render: Template,
  args: {
    name: "largeBtn",
    caption: "Large Button",
    disabled: false,
    type: "button",
    styles: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "16px 32px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
    },
  },
};

export const SmallButton: Story = {
  render: Template,
  args: {
    name: "smallBtn",
    caption: "Small",
    disabled: false,
    type: "button",
    styles: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "4px 8px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "400",
    },
  },
};

export const OutlinedButton: Story = {
  render: Template,
  args: {
    name: "outlinedBtn",
    caption: "Outlined",
    disabled: false,
    type: "button",
    styles: {
      backgroundColor: "transparent",
      color: "#007bff",
      padding: "8px 16px",
      border: "2px solid #007bff",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
  },
};

export const RoundedButton: Story = {
  render: Template,
  args: {
    name: "roundedBtn",
    caption: "Rounded",
    disabled: false,
    type: "button",
    styles: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
  },
};

export const WithHTMLCaption: Story = {
  render: Template,
  args: {
    name: "htmlBtn",
    caption: "Click <strong>Here</strong>",
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

export const WithHint: Story = {
  render: Template,
  args: {
    name: "hintBtn",
    caption: "Help",
    disabled: false,
    type: "button",
    hint: "Click this button to get help",
    styles: {
      backgroundColor: "#17a2b8",
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

// Interactive story with click handler
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
