import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import WmMenu from "../../../../components/navigation/menu";


const meta = {
  title: "Navigation/Menu",
  component: WmMenu,
  argTypes: {
    caption: { control: "text" },
    height: { control: "text" },
    width: { control: "text" },
    iconposition: { control: "text" },
    iconclass: { control: "text" },
    disableMenuContext: { control: "boolean" },
    menuposition: { control: "text" },
    menualign: { control: "text" },
    showonhover: { control: "boolean" },
    autoclose: { control: "boolean" },
    autoopen: { control: "boolean" } 
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof WmMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { label: "Home", icon: "fa-thin fa-link" },
  { label: "Profile", icon: "wi wi-person" },
  { label: "Settings", icon: "wi wi-settings" },
  { label: "Logout", icon: "wi wi-power-settings-new" },
];

export const Default: Story = {
  args: {
    caption: "Menu",
    width: "200px",
    height: "auto",
    iconposition: "left",
    iconclass: "wm-icon wm-icon-menu",
    disableMenuContext: false,
    menuposition: "down,right",
    menualign: "left",
    showonhover: false,
    autoclose: "true",
    autoopen: "false",
    dataset: menuItems
  }
};
