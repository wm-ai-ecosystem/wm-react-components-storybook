import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import TimeDefaultExport from "../../../../components/input/epoch/time/index";
import WmComposite from "../../../../components/input/composite";
import WmLabel from "../../../../components/basic/label";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import timeTokensData from "../../../../designTokens/components/time/time.json";

const meta: Meta<typeof TimeDefaultExport> = {
  title: "Input/Time",
  component: TimeDefaultExport,
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
    <TimeDefaultExport {...args} listener={mockListener} />
  </Box>
);


const DesignTokenTemplate = (args: any) => {
    //component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args;

    return (
      <Box className="wm-app" style={{ padding: 16,}} data-design-token-target={dataAttr}>
        <WmComposite captionposition="left" listener={mockListener} name="timeComposite">
          <WmLabel caption="Time" listener={mockListener} name="timeLabel" className="control-label"/>
          <TimeDefaultExport {...componentArgs} listener={mockListener} />
        </WmComposite>
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
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14260&p=f&t=rE8HvDMpyMdtByDG-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsTime",
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
  render: () => (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        {/* Title */}
        <Typography variant="h6" fontWeight={600}>
          Time Input Showcase
        </Typography>

        {/* Time Format */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Time Formats
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                12-Hour Format (h:mm a)
              </Typography>
              <TimeDefaultExport
                name="format12"
                timepattern="h:mm a"
                datavalue="CURRENT_TIME"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                24-Hour Format (HH:mm)
              </Typography>
              <TimeDefaultExport
                name="format24"
                timepattern="HH:mm"
                datavalue="CURRENT_TIME"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                12-Hour with Seconds (h:mm:ss a)
              </Typography>
              <TimeDefaultExport
                name="format12Seconds"
                timepattern="h:mm:ss a"
                datavalue="CURRENT_TIME"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            {/* <Box>
              <Typography variant="body2" mb={1}>
                24-Hour with Seconds (HH:mm:ss)
              </Typography>
              <TimeDefaultExport
                name="format24Seconds"
                timepattern="HH:mm:ss"
                datavalue="CURRENT_TIME"
                listener={mockListener}
              />
            </Box> */}
          </Stack>
        </Box>

        {/* Time Range */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Time Range
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                Business Hours (9:00 AM – 5:00 PM)
              </Typography>
              <TimeDefaultExport
                name="businessRange"
                mintime="09:00:00"
                maxtime="17:00:00"
                timepattern="h:mm a"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            {/* <Box>
              <Typography variant="body2" mb={1}>
                Morning Shift (6:00 AM – 12:00 PM)
              </Typography>
              <TimeDefaultExport
                name="morningRange"
                mintime="06:00:00"
                maxtime="12:00:00"
                timepattern="h:mm a"
                listener={mockListener}
              />
            </Box> */}
          </Stack>
        </Box>

        {/* Hour Step */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Hour Step
          </Typography>

          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              2-Hour Interval
            </Typography>
            <TimeDefaultExport
              name="hourStep"
              hourstep={2}
              timepattern="HH:mm"
              listener={mockListener}
              dataentrymode="default"
            />
          </Box>
        </Box>

        {/* Minute Step */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Minute Step
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1}>
                5-Minute Interval
              </Typography>
              <TimeDefaultExport
                name="minuteStep5"
                minutestep={5}
                timepattern="HH:mm"
                listener={mockListener}
                dataentrymode="default"
              />
            </Box>

            {/* <Box>
              <Typography variant="body2" mb={1}>
                15-Minute Interval
              </Typography>
              <TimeDefaultExport
                name="minuteStep15"
                minutestep={15}
                timepattern="HH:mm"
                listener={mockListener}
              />
            </Box> */}
          </Stack>
        </Box>

        {/* Second Step */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Second Step
          </Typography>

          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              10-Second Interval
            </Typography>
            <TimeDefaultExport
              name="secondStep"
              secondsstep={10}
              timepattern="HH:mm:ss"
              listener={mockListener}
              dataentrymode="default"
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "timeShowcase",
    listener: mockListener,
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
    name: "standardTime",
    placeholder: "Select time",
    listener: mockListener,
    disabled: false,
    readonly: false,
    required: false,
    timepattern: "h:mm a",
    dataentrymode: "default",
    showdropdownon: "default",
    datavalue: "CURRENT_TIME",
    "data-design-token-target":true
  },
  argTypes: {
    placeholder: { control: "text" },
    datavalue: { control: "text" },
    timepattern: { control: "select", options: ["h:mm a", "HH:mm", "h:mm:ss a", "HH:mm:ss"] },
    hourstep: { control: "number" },
    minutestep: { control: "number" },
    secondsstep: { control: "number" },
    outputformat: { control: "text" },
    mintime: { control: "text" },
    maxtime: { control: "text" },
    required: { control: "boolean" },
    autofocus: { control: "boolean" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    showdropdownon: {
      control: { type: "select" },
      options: ["default", "button"],
    },
    dataentrymode: {
      control: { type: "select" },
      options: ["default", "picker"],
    },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } }  
  },
  parameters: {
    designTokens: {
      enabled: false,
      tokenData: timeTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "timepicker",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};