import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import RadiosetDefaultExport from "../../../../components/input/default/radioset/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";
// import layoutGrid from "@wavemaker/react-runtime/components/container/layout-grid";

import radiosetTokensData from "../../../../designTokens/components/radioset/radioset.json";


const meta: Meta<typeof RadiosetDefaultExport> = {
  title: "Input/RadioSet",
  component: RadiosetDefaultExport,
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
    <RadiosetDefaultExport {...args} listener={mockListener} />
  </Box>
);

const DesignTokenTemplate = (args: any) => {
  //component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
  return (
    <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
      <RadiosetDefaultExport {...componentArgs} listener={mockListener} />
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
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14253&p=f&t=rE8HvDMpyMdtByDG-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsRadioset",
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
      {/* Main Heading */}
      <Box sx={{mb: 3}}>
        <Typography variant="h6" fontWeight={600}>
          Radioset Showcase
        </Typography>
      </Box>

      <Stack spacing={4}>
        {/* Preselected value */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Preselected Value
          </Typography>
          <RadiosetDefaultExport
            name="preselectedRadioset"
            dataset={[
              { id: 1, label: "Small" },
              { id: 2, label: "Medium" },
              { id: 3, label: "Large" },
            ]}
            datafield="id"
            displayfield="label"
            datavalue={2}
            listener={mockListener}
          />
        </Box>

        {/* Order by */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Alphabetical Order (orderby = label)
          </Typography>
          <RadiosetDefaultExport
            name="orderedRadioset"
            dataset={[
              { id: 1, label: "Banana" },
              { id: 2, label: "Apple" },
              { id: 3, label: "Orange" },
              { id: 4, label: "Mango" },
            ]}
            datafield="id"
            displayfield="label"
            orderby="label"
            listener={mockListener}
          />
        </Box>

        {/* Group by */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Grouped Options (groupby)
          </Typography>
          <RadiosetDefaultExport
            name="groupedRadioset"
            dataset={[
              { id: 1, label: "Chrome", category: "Browsers" },
              { id: 2, label: "Firefox", category: "Browsers" },
              { id: 3, label: "VS Code", category: "Editors" },
              { id: 4, label: "WebStorm", category: "Editors" },
            ]}
            datafield="id"
            displayfield="label"
            groupby="category"
            listener={mockListener}
          />
        </Box>

        {/* Items per row */}
        {/* <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Items Per Row
          </Typography>
          <RadiosetDefaultExport
            name="itemsPerRowRadioset"
            dataset={[
              { id: 1, label: "HTML" },
              { id: 2, label: "CSS" },
              { id: 3, label: "JavaScript" },
              { id: 4, label: "React" },
              { id: 5, label: "Angular" },
              { id: 6, label: "Vue" },
            ]}
            datafield="id"
            displayfield="label"
            itemsperrow="xs-1 sm-2 md-3 lg-4"
            listener={mockListener}
          />
        </Box> */}
      </Stack>
    </Box>
  ),
  args: {
    name: "showcaseRadioset",
    listener:mockListener
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
    name: "standardRadioset",
    dataset: [
      { id: 1, name: "Economy", price: "$50" },
      { id: 2, name: "Business", price: "$100" },
      { id: 3, name: "First Class", price: "$200" },
      { id: 4, name: "Premium", price: "$300" },
    ],
    datafield: "id",
    displayfield: "name",
    listener: mockListener,
    datavalue: 2,
    disabled: false,
    readonly: false,
    "data-design-token-target":true
  },
  argTypes: {
    datafield: { control: "text" },
    dataset: { control: "object" },
    datavalue: { control: "text" },
    disabled: { control: "boolean" },
    displayfield: { control: "text" },
    displayValue: { control: "text" },
    groupby: { control: "text" },
    // itemsperrow: { control: "select", options: ["xs-1 sm-1 md-1 lg-1","xs-1 sm-2 md-2 lg-2","xs-1 sm-2 md-3 lg-3","xs-1 sm-2 md-3 lg-4","xs-1 sm-2 md-4 lg-6"] },
    orderby: { control: "text" },
    readonly: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: radiosetTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "radiobutton",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

// export const ObjectDataset: Story = {
//   tags: ['show-panel'],
//   render: Template,
//   args: {
//     name: "objectDataset",
//     dataset: [
//       { id: 1, name: "Economy", price: "$50" },
//       { id: 2, name: "Business", price: "$100" },
//       { id: 3, name: "First Class", price: "$200" },
//       { id: 4, name: "Premium", price: "$300" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     listener: mockListener,
//     datavalue: 2,
//   },
//   argTypes: {
//     datafield: { control: "text" },
//     dataset: { control: "object" },
//     datavalue: { control: "text" },
//     disabled: { control: "boolean" },
//     displayfield: { control: "text" },
//     displayValue: { control: "text" },
//     groupby: { control: "text" },
//     itemsperrow: { control: "select", options: ["xs-1 sm-1 md-1 lg-1","xs-1 sm-2 md-2 lg-2","xs-1 sm-2 md-3 lg-3","xs-1 sm-2 md-3 lg-4","xs-1 sm-2 md-4 lg-6"] },
//     orderby: { control: "text" },
//     readonly: { control: "boolean" },
//   },
// };
