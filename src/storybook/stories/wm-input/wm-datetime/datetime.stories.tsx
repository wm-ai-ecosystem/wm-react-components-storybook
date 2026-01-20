import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import DateTimeDefaultExport from "../../../../components/input/epoch/datetime/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof DateTimeDefaultExport> = {
  title: "Input/DateTime",
  component: DateTimeDefaultExport,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
  onChange: () => {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <DateTimeDefaultExport {...args} listener={mockListener} />
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
  args:{
    name:"docsDateTime",
    listener:mockListener
  },
  argTypes:{
    name:{ table: { disable: true } },
    listener:{ table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const now = new Date();
    const todayISO = now.toISOString();
    const nextWeekISO = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    return (
      <Box sx={{ p: 3 }}>
        <Box mb={3} id="datetime-showcase">
          <Typography variant="h6" mr={2} fontWeight={600}>
            DateTime Input Showcase
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Various examples of DateTime input configurations
          </Typography> */}
        </Box>

        <Stack spacing={4}>
          {/* Basic */}
          <Box id="basic">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Basic DateTime</Typography>
            <DateTimeDefaultExport
              name="basicDateTime"
              placeholder="Select Date Time"
              datavalue="CURRENT_DATE"
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>

          {/* Min/Max */}
          <Box id="minMax">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Min/Max DateTime</Typography>
            <DateTimeDefaultExport
              name="minMaxDateTime"
              placeholder="Select Date Time"
              mindate={todayISO}
              maxdate={nextWeekISO}
              datavalue={todayISO}
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>

          {/* 12-hour format */}
          <Box id="hourFormat">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>12-Hour Format</Typography>
            <DateTimeDefaultExport
              name="hourFormatDateTime"
              placeholder="MM/dd/yyyy h:mm a"
              datavalue={todayISO}
              listener={mockListener}
              datepattern="MM/dd/yyyy h:mm a"
              outputformat="MM/dd/yyyy h:mm a"
            />
          </Box>

          {/* Picker only */}
          <Box id="pickerOnly">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Picker Only Mode</Typography>
            <DateTimeDefaultExport
              name="pickerOnly"
              placeholder="Picker only"
              dataentrymode="picker"
              showcustompicker={true}
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>

          {/* Exclude Weekends */}
          <Box id="excludeWeekends">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Exclude Weekends</Typography>
            <DateTimeDefaultExport
              name="excludeWeekends"
              placeholder="Weekdays only"
              excludedays="0,6"
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>

          {/* Custom Steps */}
          <Box id="customSteps">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Custom Minute Step (15 min)</Typography>
            <DateTimeDefaultExport
              name="fifteenMinutes"
              placeholder="15-minute intervals"
              minutestep={15}
              listener={mockListener}
              datepattern="dd/MM/yyyy HH:mm"
              outputformat="dd/MM/yyyy HH:mm"
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    listener: mockListener,
    name: "showcaseDateTime"
  },
  argTypes:{
    name:{ table: { disable: true } },
    listener:{ table: { disable: true } }
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardDateTime",
    placeholder: "Select Date Time",
    listener: mockListener,
    outputformat: "dd/MM/yyyy HH:mm",
    datepattern: "dd/MM/yyyy HH:mm",
    disabled: false,
    readonly: false,
    required: false,
    selectfromothermonth: true,
    dataentrymode: "default",
    showdropdownon: "default",
    datavalue:"CURRENT_DATE"
  },
  argTypes: {
    placeholder: { control: "text" },
    // hint: { control: "text" },
    // tabindex: { control: "number" },
    // shortcutkey: { control: "text" },
    datavalue: { control: "text" },
    datepattern: { control: "select", options: ["MM/dd/yyyy h:mm a", "dd/MM/yyyy HH:mm", "MM/dd/yyyy h:mm:ss a"] },
    hourstep: { control: "number" },
    minutestep: { control: "number" },
    outputformat: { control: "text" },
    required: { control: "boolean" },
    mindate: { control: "text" },
    maxdate: { control: "text" },
    excludedays: { control: "text" },
    excludedates: { control: "text" },
    showweeks: { control: "boolean" },
    showbuttonbar: { control: "boolean" },
    autofocus: { control: "boolean" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    selectfromothermonth: { control: "boolean" },
    todaybutton: { control: "boolean" },
    clearbutton: { control: "boolean" },
    todaybuttonlabel: { control: "text" },
    clearbuttonlabel: { control: "text" },
    showcustompicker: { control: "boolean" },
    adaptiveposition: { control: "boolean" },
    showdropdownon: {
      control: { type: "select" },
      options: ["default", "button"],
    },
    dataentrymode: {
      control: { type: "select" },
      options: ["default", "picker"],
    },
    // width: { control: "text" },
    // arialabel: { control: "text" },
    // className: { control: "text" },
    // floatinglabel: { control: "text" },
    name:{ table: { disable: true } },
    listener:{ table: { disable: true } }
  },
};