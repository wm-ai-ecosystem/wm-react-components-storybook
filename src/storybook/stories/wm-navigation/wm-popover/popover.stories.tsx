import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import WmPopover from "../../../../components/navigation/popover";
import WmButton from "../../../../components/form/button";
import WmLabel from "../../../../components/basic/label"

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";



const meta = {
  title: "Navigation/Popover",
  component: WmPopover,
  argTypes: {
    content: { control: "text" },
    title: { control: "text" },
    popoverwidth: { control: "text" },
    popoverheight: { control: "text" },
    popoverplacement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    popoverarrow: { control: "boolean" },
    interaction: {
      control: { type: "select" },
      options: ["click", "hover", "click and hover"],
    },
    contentsource: {
      control: { type: "select" },
      options: ["partial", "inline"],
    },
    autoclose: {
      control: { type: "select" },
      options: ["outsideClick", "always", "disabled"],
    },
    contentanimation: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof WmPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

const PopoverContent = () => (
  <div style={{ padding: "10px" }}>
    <WmLabel
      name="popoverContent"
      caption="This is popover content. Click outside to close."
    />
  </div>
);  
const style = {
  buttonStyle: {
    backgroundColor: "#1976d2",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonTextStyle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
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
  parameters: {
    layout: 'fullscreen',
  },
};

export const Basic: Story = {
  args: {
    name: "basicPopover",
    title: "Popover Title",
    content: "This is the popover content.",
    popoverwidth: "240px",
    popoverheight: "120px",
    popoverplacement: "bottom",
    popoverarrow: true,
    interaction: "click",
    contentsource: "inline",
    autoclose: "outsideClick",
    listener: mockListener,
  },
  render: (args) => (
    <WmPopover {...args}>
      <WmButton
        name="popoverTrigger"
        caption="Popover Inline Content"
        styles={{
          root: style.buttonStyle,
          text: style.buttonTextStyle,
        }}
      />
      <PopoverContent />
    </WmPopover>
  ),
};
