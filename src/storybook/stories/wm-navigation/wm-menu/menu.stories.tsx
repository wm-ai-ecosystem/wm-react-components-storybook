import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography, Stack } from "@mui/material";
import WmMenu from "../../../../components/navigation/menu";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";


const meta = {
  title: "Navigation/Menu",
  component: WmMenu,
  argTypes: {
    caption: { control: "text" },
    height: { control: "text" },
    width: { control: "text" },
    iconposition: { control: "select", options: ["left", "center", "right"] },
    iconclass: { control: "text" },
    disableMenuContext: { control: "boolean" },
    menulayout: { control: "select", options: ["vertical", "horizontal"] },
    menuposition: { control: "select", options: ["down,left", "down,right", "up,left", "up,right"] },
    menualign: { control: "select", options: ["left", "center", "right"] },
    showonhover: { control: "boolean" },
    // autoclose: { control: "boolean" },
    autoclose: {
      control: { type: "select" },
      options: ["always", "outsideClick", "disabled"],
    },
    // autoopen: { control: "boolean" } 
    autoopen: {
      control: { type: "select" },
      options: ["never", "always", "activePage"],
    }
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmMenu>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { label: "Home", icon: "fa-thin fa-link" },
  { label: "Profile", icon: "fa fa-user" },
  { label: "Settings", icon: "fa fa-settings" },
  { label: "Logout", icon: "wi wi-power-settings-new" },
];

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
    name:"basicMenu",
    caption: "Menu",
    width: "200px",
    height: "auto",
    iconposition: "left",
    iconclass: "",
    disableMenuContext: false,
    menuposition: "down,right",
    menualign: "left",
    menulayout: "vertical",
    showonhover: false,
    autoclose: "outsideClick",
    autoopen: "never",
    dataset: menuItems,
    listener: mockListener,
  }
};

export const Showcase: Story = {
  render: () => {
    const showcaseItems = [
      {
        title: "Menu Position: down,right",
        props: { menuposition: "down,right" },
      },
      {
        title: "Menu Position: up,left",
        props: { menuposition: "up,left" },
      },
      {
        title: "Menu Layout: vertical",
        props: { menulayout: "vertical" },
      },
      {
        title: "Menu Layout: horizontal",
        props: { menulayout: "horizontal" },
      },
      {
        title: "Show on Hover: Enabled",
        props: { showonhover: true },
      },
      {
        title: "Show on Hover: Disabled",
        props: { showonhover: false },
      },
      {
        title: "AutoOpen: never, AutoClose: outsideClick",
        props: { autoopen: "never", autoclose: "outsideClick" },
      },
      {
        title: "AutoOpen: always, AutoClose: disabled",
        props: { autoopen: "always", autoclose: "disabled" },
      },
    ];

    return (
      <Box sx={{ width: "100%", p: 4 }}>
        <Box sx={{mb: 3}}>
          <Typography variant="h6" fontWeight={600}>
            Menu Showcase
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
          }}
        >
          {showcaseItems.map(({ title, props }, index) => (
            <Box key={index}>
              <Typography variant="subtitle2" color="text.secondary" style={{marginBottom: "6px"}}>
                {title}
              </Typography>
              <WmMenu
                name={`menu_showcase_${index}`}
                caption="Menu"
                width="200px"
                iconposition="left"
                iconclass="fa fa-bars"
                menualign="left"
                dataset={menuItems}
                listener={mockListener}
                {...props}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  },
  args: {
    name: "menuShowcase",
    listener: mockListener,
  },
};


