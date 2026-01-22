import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import LabelDefaultExport, { WmLabel as RawWmLabel } from "../../../../components/basic/label/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import labelTokensData from "../../../../designTokens/components/label/label.json";

const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const meta = {
  title: "Basic/Label",
  component: LabelDefaultExport,
} satisfies Meta<typeof LabelDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <LabelDefaultExport {...args} listener={mockListener} />
  </Box>
);

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
    name: "docsLabel",
    listener: mockListener
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
    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Label Showcase
          </Typography>

          {/* Row 1: Text Color Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Text Color Variants
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 3,
              }}
            >
              {["text-primary", "text-secondary", "text-success", "text-danger", "text-warning", "text-info", "text-muted"].map((cls, index) => (
                <Stack key={index} spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    {cls}
                  </Typography>
                  <LabelDefaultExport
                    name={`textColor_${index}`}
                    caption="Sample Text"
                    type="p"
                    className={cls}
                    listener={mockListener}
                  />
                </Stack>
              ))}
            </Box>
          </Stack>

          {/* Row 2: Label Style Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Label Style Variants
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 3,
              }}
            >
              {["label-primary", "label-secondary", "label-success", "label-danger", "label-warning", "label-info"].map((cls, index) => (
                <Stack key={index} spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    {cls}
                  </Typography>
                  <LabelDefaultExport
                    name={`labelStyle_${index}`}
                    caption="Sample Label"
                    type="p"
                    className={cls}
                    listener={mockListener}
                  />
                </Stack>
              ))}
            </Box>
          </Stack>

          {/* Row 3: Typography / Heading Sizes */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Typography Sizes
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 3,
              }}
            >
              {["h1", "h2", "h3", "h4", "h5", "h6", "p"].map((cls, index) => (
                <Stack key={index} spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    {cls}
                  </Typography>
                  <LabelDefaultExport
                    name={`typography_${index}`}
                    caption={`Sample ${cls.toUpperCase()}`}
                    type={cls as any}
                    className={cls}
                    listener={mockListener}
                  />
                </Stack>
              ))}
            </Box>
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "labelShowcase",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } }, 
  },
};

export const Default: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "defaultLabel",
    listener: mockListener,
    caption: "Label",
    // type: "p",
    className:"p",
    hint:"This is a basic label",
    textalign: "left",
    "data-design-token-target": "true"
  }, 
  argTypes: {
    caption: { control: "text" },
    // type: {
    //   control: { type: "select" },
    //   options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
    // },
     className: {
      control: {
        type: "select",
      },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
    },
    textalign:{
      control:{
        type:'select',
      },
      options:['left','center','right']
    },
    "data-design-token-target": { table: { disable: true } },
    listener: { table: { disable: true } },
    name: { table: { disable: true } },
  }, 
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: labelTokensData,
      componentKey: "label",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};

export const Text: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "textLabel",
    listener: mockListener,
    caption: "Label",
    // type: "p",
    className:"text-primary",
    hint:"This is a basic label",
    textalign: "left",
    "data-design-token-target": "true"
  }, 
  argTypes: {
    caption: { control: "text" },
    // type: {
    //   control: { type: "select" },
    //   options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
    // },
     className: {
      control: {
        type: "select",
      },
      options: ["text-primary", "text-secondary", "text-success", "text-danger", "text-warning", "text-info","text-muted"],
    },
    textalign:{
      control:{
        type:'select',
      },
      options:['left','center','right']
    },
    "data-design-token-target": { table: { disable: true } },
    listener: { table: { disable: true } },
    name: { table: { disable: true } },
  }, 
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: labelTokensData,
      componentKey: "label",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};

export const Label: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "labelLabel",
    listener: mockListener,
    caption: "Label",
    // type: "p",
    className:"label-primary",
    hint:"This is a basic label",
    textalign: "left",
    "data-design-token-target": "true"
  }, 
  argTypes: {
    caption: { control: "text" },
    // type: {
    //   control: { type: "select" },
    //   options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
    // },
     className: {
      control: {
        type: "select",
      },
      options: ["label-primary", "label-secondary", "label-success", "label-danger", "label-warning", "label-info"],
    },
    textalign:{
      control:{
        type:'select',
      },
      options:['left','center','right']
    },
    "data-design-token-target": { table: { disable: true } },
    listener: { table: { disable: true } },
    name: { table: { disable: true } },
  }, 
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: labelTokensData,
      componentKey: "label",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};