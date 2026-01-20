import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";

import SwitchDefaultExport from "../../../../components/input/default/switch/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import switchTokensData from "../../../../designTokens/components/switch/switch.json";

const meta: Meta<typeof SwitchDefaultExport> = {
  title: "Input/Switch",
  component: SwitchDefaultExport,
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
    <SwitchDefaultExport {...args} listener={mockListener} />
  </Box>
);

const DesignTokenTemplate = (args: any) => {
  //component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
  return (
    <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
      <SwitchDefaultExport {...componentArgs} listener={mockListener} />
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
    />
  ),
  args:{
    name:"docsSwitch",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } }
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const dataset = [
      { id: 1, label: "Banana", value: "banana" },
      { id: 2, label: "Apple", value: "apple" },
      { id: 3, label: "Mango", value: "mango" },
      { id: 4, label: "Cherry", value: "cherry" }
    ];

    return (
      <Box style={{ padding: 16 }}>
        <Box sx={{mb:3}}>
          <Typography variant="h6" fontWeight={600}>
            Switch Showcase
          </Typography>
        </Box>
        <Stack spacing={4}>
          {/* Preselected Switch */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Preselected Switch
            </Typography>
            <SwitchDefaultExport
              name="preselectedSwitch"
              dataset={dataset}
              datafield="id"
              displayfield="label"
              datavalue={2} // Preselect Option B
              listener={mockListener}
            />
          </Box>

          {/* Ordered Switch */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Ordered Switch (A-Z)
            </Typography>
            <SwitchDefaultExport
              name="orderedSwitch"
              dataset={dataset}
              datafield="id"
              displayfield="label"
              orderby="label:asc" // Order by label ascending
              datavalue={2} // Preselect Apple after ordering
              listener={mockListener}
            />
          </Box>

          {/* Checked Icon Switch */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Checked Icon Switch
            </Typography>
            <SwitchDefaultExport
              name="multiSelectSwitch"
              dataset={dataset}
              datafield="id"
              displayfield="label"
              multiple={false}
              datavalue={1}
              listener={mockListener}
              checkediconclass="fa fa-check"
            />
          </Box>

          {/* Multi-Select Switch */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Multi-Select Switch
            </Typography>
            <SwitchDefaultExport
              name="multiSelectSwitch"
              dataset={dataset}
              datafield="id"
              displayfield="label"
              multiple={true}
              datavalue={[1, 3]}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args:{
    name:"showcaseSwitch",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } }
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardSwitch",
    dataset: ["yes", "no", "maybe"],
    datavalue: "yes",
    listener: mockListener,
    disabled: false,
    multiple: false,
    displaylabel: "Basic Switch",
    "data-design-token-target":true
  },
  argTypes: {
    dataset: { control: "object" },
    datafield: { control: "text" },
    datavalue: { control: "text" },
    displayfield: { control: "text" },
    displaylabel: { control: "text" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    checkediconclass: { control: "select", options:["fa fa-check", "fa fa-circle-check", "wi wi-check", "wi wi-check-box"] },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: switchTokensData,
      componentKey: "switch", 
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};

export const ObjectDataset: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "objectSwitch",
    dataset: [
      { id: 1, label: "Day", value: "day" },
      { id: 2, label: "Week", value: "week" },
      { id: 3, label: "Month", value: "month" },
    ],
    datafield: "id",
    displayfield: "label",
    datavalue: 1,
    listener: mockListener,
    disabled: false,
    multiple: false,
    displaylabel: "Object Dataset Switch",
  },
  argTypes: {
    dataset: { control: "object" },
    datafield: { control: "text" },
    datavalue: { control: "text" },
    displayExpression: { control: "text" },
    displayfield: { control: "text" },
    displaylabel: { control: "text" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    checkediconclass: { control: "select", options:["fa fa-check", "fa fa-circle-check", "wi wi-check", "wi wi-check-box"] },
    name  : { table: { disable: true } },
    listener: { table: { disable: true } }
  },
};
