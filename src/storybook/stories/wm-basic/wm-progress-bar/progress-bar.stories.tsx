import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import ProgressBarDefaultExport from "../../../../components/basic/progress-bar/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import progressBarTokensData from "../../../../designTokens/components/progress-bar/progress-bar.json";

const meta: Meta<typeof ProgressBarDefaultExport> = {
  title: "Basic/ProgressBar",
  component: ProgressBarDefaultExport,
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const Template = (args: any) => {
  const {captionplacement} = args;

  return(
  <Box style={{ padding: 16, width: '100%', maxWidth: 200 }}>
    <Box style={{ width: '100%' }}>
      <ProgressBarDefaultExport {...args} listener={mockListener} key={captionplacement} />
    </Box>
  </Box>
  )
};

// const DesignTokenTemplate = (args: any) => {
//   const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;

//   return (
//     <Box style={{ padding: 16, width: '100%', maxWidth: 200 }} data-design-token-target={dataAttr}>
//       <Box style={{ width: '100%' }}>
//         <ProgressBarDefaultExport {...componentArgs} listener={mockListener} />
//       </Box>
//     </Box>
//   );
// };

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
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14252&p=f&t=rE8HvDMpyMdtByDG-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsProgressBar",
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
    const progressBars = [
      { name: "allDefault", label: "Default (30%)", value: 30, type: "default" },
      { name: "allDefaultStriped", label: "Default Striped (40%)", value: 40, type: "default-striped" },
      { name: "allSuccess", label: "Success (75%)", value: 75, type: "success" },
      { name: "allSuccessStriped", label: "Success Striped (70%)", value: 70, type: "success-striped" },
      { name: "allInfo", label: "Info (50%)", value: 50, type: "info" },
      { name: "allInfoStriped", label: "Info Striped (55%)", value: 55, type: "info-striped" },
      { name: "allWarning", label: "Warning (60%)", value: 60, type: "warning" },
      { name: "allWarningStriped", label: "Warning Striped (65%)", value: 65, type: "warning-striped" },
      { name: "allDanger", label: "Danger (85%)", value: 85, type: "danger" },
      { name: "allDangerStriped", label: "Danger Striped (90%)", value: 90, type: "danger-striped" },
    ];

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>Progress Bar Showcase</Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 3,
            }}
          >
            {progressBars.map((bar, index) => (
              <Box key={index}>
                <Typography variant="caption" display="block" mb={1}>
                  {bar.label}
                </Typography>
                <ProgressBarDefaultExport
                  name={bar.name}
                  datavalue={bar.value}
                  type={bar.type}
                  listener={mockListener}
                />
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcase",
    listener: mockListener,
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  }
};

export const Filled: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "filledProgressBar",
    listener: mockListener,
    datavalue: 30,
    type: "default",
    minvalue: 0,
    maxvalue: 100,
    captionplacement: "inside",
    "data-design-token-target": true,
  },
  argTypes: {
    datavalue: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    type: {
      control: { type: "select" },
      options: [
        "default",
        // "default-striped",
        "success",
        // "success-striped",
        "info",
        // "info-striped",
        "warning",
        // "warning-striped",
        "danger",
        // "danger-striped",
      ],
    },
    captionplacement: {
      control: { type: "radio" },
      options: ["hidden", "inside"],
    },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: progressBarTokensData,
      componentKey: "progress-bar",
      extractCSSVariablesAtRuntime: true,
      propToVariantMap: {
        propName: "type",
        mapping: {
          default: "progress-bar-default",
          success: "progress-bar-success",
          info: "progress-bar-info",
          warning: "progress-bar-warning",
          danger: "progress-bar-danger",
          // "default-striped": "progress-bar-striped progress-bar-default",
          // "success-striped": "progress-bar-striped progress-bar-success",
          // "info-striped": "progress-bar-striped progress-bar-info",
          // "warning-striped": "progress-bar-striped progress-bar-warning",
          // "danger-striped": "progress-bar-striped progress-bar-danger",
        }
      }
    },
    layout: 'fullscreen',
  },
};

export const Striped: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "stripedProgressBar",
    listener: mockListener,
    datavalue: 50,
    type: "default-striped",
    minvalue: 0,
    maxvalue: 100,
    captionplacement: "inside",
    "data-design-token-target": true,
  },
  argTypes: {
    datavalue: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    type: {
      control: { type: "select" },
      options: [
        // "default",
        "default-striped",
        // "success",
        "success-striped",
        // "info",
        "info-striped",
        // "warning",
        "warning-striped",
        // "danger",
        "danger-striped",
      ],
    },
    captionplacement: {
      control: { type: "radio" },
      options: ["hidden", "inside"],
    },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: progressBarTokensData,
      componentKey: "progress-bar",
      extractCSSVariablesAtRuntime: true,
      propToVariantMap: {
        propName: "type",
        mapping: {
          // default: "progress-bar-default",
          // success: "progress-bar-success",
          // info: "progress-bar-info",
          // warning: "progress-bar-warning",
          // danger: "progress-bar-danger",
          "default-striped": "progress-bar-striped progress-bar-default",
          "success-striped": "progress-bar-striped progress-bar-success",
          "info-striped": "progress-bar-striped progress-bar-info",
          "warning-striped": "progress-bar-striped progress-bar-warning",
          "danger-striped": "progress-bar-striped progress-bar-danger",
        }
      }
    },
    layout: 'fullscreen',
  },
};