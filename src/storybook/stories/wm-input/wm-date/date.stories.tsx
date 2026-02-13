import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import DateDefaultExport from "../../../../components/input/epoch/date/index";
import WmComposite from "../../../../components/input/composite";
import WmLabel from "../../../../components/basic/label";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";
import dateTokensData from "../../../../designTokens/components/date/date.json";
const meta: Meta<typeof DateDefaultExport> = {
  title: "Input/Date",
  component: DateDefaultExport,
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
    <DateDefaultExport {...args} listener={mockListener} />
  </Box>
);

const DesignTokenTemplate = (args: any) => {
  //component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": dataAttr, ...componentArgs } = args;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
    <Box className="wm-app" style={{ padding: 16 }} data-design-token-target={dataAttr}>
       <WmComposite captionposition="left" listener={mockListener} name="dateComposite">
        <WmLabel caption="Date" listener={mockListener} name="dateLabel" className="control-label"/>
        <DateDefaultExport {...componentArgs} listener={mockListener} />
      </WmComposite>
    </Box>
    </LocalizationProvider>
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
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14175&p=f&t=rE8HvDMpyMdtByDG-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsDate",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const today = new Date().toISOString().split("T")[0];

    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ p: 3 }}>
        {/* Heading with anchor */}
        <Box mb={3} id="date-showcase">
          <Typography variant="h6" mr={2} fontWeight={600}>
            Date Input Showcase
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Various examples of date input configurations
          </Typography> */}
        </Box>

        <Stack spacing={4}>
          {/* Min/Max Dates */}
          <Box id="minMaxDates">
            <Typography variant="subtitle2" color="text.secondary">
              Min/Max Dates
            </Typography>
            <DateDefaultExport
              name="minMaxDates"
              placeholder="Select Date"
              mindate="CURRENT_DATE"
              maxdate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]}
              datepattern="yyyy-MM-dd"
              listener={mockListener}
            />
          </Box>

          {/* Exclude Days (No Mondays) */}
          <Box id="excludeDays">
            <Typography variant="subtitle2" color="text.secondary">
              Exclude Mondays
            </Typography>
            <DateDefaultExport
              name="excludeDays"
              placeholder="No Mondays"
              excludedays="1"
              datepattern="yyyy-MM-dd"
              listener={mockListener}
            />
          </Box>

          {/* Show Week Numbers */}
          <Box id="showWeekNumbers">
            <Typography variant="subtitle2" color="text.secondary">
              Show Week Numbers
            </Typography>
            <DateDefaultExport
              name="showWeeks"
              placeholder="With week numbers"
              showweeks={true}
              datepattern="yyyy-MM-dd"
              listener={mockListener}
            />
          </Box>

          {/* Picker Only Mode */}
          <Box id="pickerOnly">
            <Typography variant="subtitle2" color="text.secondary">
              Picker Only Mode
            </Typography>
            <DateDefaultExport
              name="pickerOnly"
              placeholder="Picker only (no typing)"
              dataentrymode="picker"
              showcustompicker={true}
              datepattern="yyyy-MM-dd"
              listener={mockListener}
            />
          </Box>

          {/* Date Pattern Examples */}
          <Box id="datePatternExamples">
            <Typography variant="subtitle2" color="text.secondary">
              Date Pattern Examples
            </Typography>
            <Stack spacing={2}>
              <DateDefaultExport
                name="usDatePattern"
                placeholder="MM/dd/yyyy"
                datepattern="MM/dd/yyyy"
                datavalue={today}
                listener={mockListener}
              />
              <DateDefaultExport
                name="longDatePattern"
                placeholder="MMMM d, yyyy"
                datepattern="MMMM d, yyyy"
                datavalue={today}
                listener={mockListener}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
      </LocalizationProvider>
    );
  },
  args: {
    listener: mockListener,
    name: "showCaseDate"
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardDate",
    placeholder: "Select Date",
    listener: mockListener,
    disabled: false,
    readonly: false,
    required: false,
    datepattern: "yyyy-MM-dd",
    outputformat: "yyyy-MM-dd",
    selectfromothermonth: true,
    dataentrymode: "default",
    showdropdownon: "default",
    datavalue:"CURRENT_DATE",
    "data-design-token-target":true
  },
  argTypes: {
    placeholder: { control: "text" },
    // hint: { control: "text" },
    // className: { control: "text" },
    // tabindex: { control: "number" },
    // shortcutkey: { control: "text" },
    datavalue: { control: "text" },
    datepattern: { control: "select", options: ["yyyy-MM-dd", "MM/dd/yyyy", "dd/MM/yyyy", "dd.MM.yyyy", "MMMM d, yyyy", "M/d/yy"] },
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
    showdropdownon: {
      control: { type: "select" },
      options: ["default", "button"],
    },
    adaptiveposition: { control: "boolean" },
    selectfromothermonth: { control: "boolean" },
    todaybutton: { control: "boolean" },
    clearbutton: { control: "boolean" },
    todaybuttonlabel: { control: "text" },
    clearbuttonlabel: { control: "text" },
    showcustompicker: { control: "boolean" },
    showdateformatasplaceholder: { control: "boolean" },
    viewmode: {
      control: { type: "select" },
      options: ["day", "month", "year"],
    },
    dataentrymode: {
      control: { type: "select" },
      options: ["default", "picker"],
    },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } }
    // width: { control: "text" },
    // arialabel: { control: "text" },
  },
  parameters: {
    designTokens: {
      enabled: false,
      tokenData: dateTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "datepicker",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};