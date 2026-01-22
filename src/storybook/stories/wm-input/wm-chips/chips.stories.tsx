import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import ChipsDefaultExport from "../../../../components/input/chips/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

import chipsTokensData from "../../../../designTokens/components/chips/chips.json";

const meta: Meta<typeof ChipsDefaultExport> = {
  title: "Input/Chips",
  component: ChipsDefaultExport,
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

// Sample datasets
const simpleDataset = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

const fruitDataset = [
  { id: 1, name: "Apple", color: "Red" },
  { id: 2, name: "Banana", color: "Yellow" },
  { id: 3, name: "Cherry", color: "Red" },
  { id: 4, name: "Date", color: "Brown" },
  { id: 5, name: "Elderberry", color: "Purple" },
  { id: 6, name: "Fig", color: "Purple" },
  { id: 7, name: "Grape", color: "Green" },
  { id: 8, name: "Kiwi", color: "Brown" },
  { id: 9, name: "Lemon", color: "Yellow" },
  { id: 10, name: "Mango", color: "Orange" },
];

const skillsDataset = [
  { id: 1, skill: "JavaScript", category: "Programming" },
  { id: 2, skill: "React", category: "Framework" },
  { id: 3, skill: "TypeScript", category: "Programming" },
  { id: 4, skill: "Node.js", category: "Backend" },
  { id: 5, skill: "Python", category: "Programming" },
  { id: 6, skill: "Docker", category: "DevOps" },
  { id: 7, skill: "AWS", category: "Cloud" },
  { id: 8, skill: "Git", category: "Version Control" },
];

// const countriesDataset = [
//   { id: 1, name: "United States", code: "US" },
//   { id: 2, name: "United Kingdom", code: "UK" },
//   { id: 3, name: "Canada", code: "CA" },
//   { id: 4, name: "Australia", code: "AU" },
//   { id: 5, name: "Germany", code: "DE" },
//   { id: 6, name: "France", code: "FR" },
//   { id: 7, name: "Japan", code: "JP" },
//   { id: 8, name: "India", code: "IN" },
// ];

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <ChipsDefaultExport {...args} listener={mockListener} />
  </Box>
);

const DesignTokenTemplate = (args: any) => {
    // component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
    return (
      <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
        <ChipsDefaultExport {...componentArgs} listener={mockListener} />
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
      style={style}
      token={token}
    />
  ),
  args:{
    name:"docsChips",
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
    <Box style={{ padding: 16 }}>
      <Box sx={{mb: 3}}>
      <Typography variant="h6" mb={3}>
        Chips Showcase
      </Typography>
      </Box>
      <Stack spacing={4}>
        {/* Autocomplete with one preselected value */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Autocomplete (Preselected)
          </Typography>
          <ChipsDefaultExport
            name="autocompleteChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            datavalue={["Apple"]}
            placeholder="Type to autocomplete..."
            type="autocomplete"
            inputposition="last"
            inputwidth="default"
            listener={mockListener}
          />
        </Box>

        {/* Search type */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Search
          </Typography>
          <ChipsDefaultExport
            name="searchChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            placeholder="Type to search..."
            type="search"
            inputposition="first"
            inputwidth="default"
            showsearchicon={true}
            listener={mockListener}
          />
        </Box>

        {/* Only allow select */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Allow Only Select
          </Typography>
          <ChipsDefaultExport
            name="onlySelectChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            allowonlyselect={true}
            placeholder="Select only from list..."
            type="autocomplete"
            inputposition="last"
            inputwidth="default"
            listener={mockListener}
          />
        </Box>

        {/* Reorderable chip */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Reorderable
          </Typography>
          <ChipsDefaultExport
            name="reorderChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            datavalue={["Apple", "Cherry"]}
            enablereorder={true}
            placeholder="Drag to reorder..."
            type="autocomplete"
            inputposition="last"
            inputwidth="default"
            listener={mockListener}
          />
        </Box>

        {/* Input position first */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Input Postion First
          </Typography>
          <ChipsDefaultExport
            name="autocompleteChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            datavalue={["Apple"]}
            placeholder="Type to autocomplete..."
            type="autocomplete"
            inputposition="first"
            inputwidth="default"
            listener={mockListener}
          />
        </Box>

        {/* Input position first */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Input Width Full
          </Typography>
          <ChipsDefaultExport
            name="autocompleteChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            datavalue={["Apple", "Cherry"]}
            placeholder="Type to autocomplete..."
            type="autocomplete"
            inputposition="first"
            inputwidth="full"
            listener={mockListener}
          />
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "showcaseChips",
    listener: mockListener,
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
};

export const Filled: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "filledChips",
    listener: mockListener,
    dataset: fruitDataset,
    datafield: "name",
    displayfield: "name",
    placeholder: "Add a chip...",
    datavalue: ["Apple"],
    type: "autocomplete",
    inputposition:"first",
    inputwidth: "default",
    disabled: false,
    readonly: false,
    "data-design-token-target":true,
    className:"primary"
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["search", "autocomplete"],
    },
    inputposition: {
      control: { type: "select" },
      options: ["first", "last"],
    },
    inputwidth: {
      control: { type: "select" },
      options: ["default", "full"],
    },
    // matchmode: {
    //   control: { type: "select" },
    //   options: ["contains", "start", "end", "exact"],
    // },
    // allowonlyselect: { control: "boolean" },
    // autofocus: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    enablereorder: { control: "boolean" },
    // showsearchicon: { control: "boolean" },
    // maxsize: { control: "number" },
    // minchars: { control: "number" },
    // debouncetime: { control: "number" },
    // tabindex: { control: "number" },
    // limit: { control: "number" },
    placeholder: { control: "text" },
    // chipclass: { control: "text" },
    // className: { control: "text" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    // displayimagesrc: { control: "text" },
    // dateformat: { control: "text" },
    // groupby: { control: "text" },
    // orderby: { control: "text" },
    // searchkey: { control: "text" },
    // match: { control: "text" },
    datacompletemsg: { control: "text" },
    // width: { control: "text" },
    // height: { control: "text" },
    // compareby: { control: "text" },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    className:{control:"select", options:["primary", "secondary", "tertiary", "default"]}
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: chipsTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "chips",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

export const Elevated: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "elevatedChips",
    listener: mockListener,
    dataset: fruitDataset,
    datafield: "name",
    displayfield: "name",
    placeholder: "Add a chip...",
    datavalue: ["Apple"],
    type: "autocomplete",
    inputposition:"first",
    inputwidth: "default",
    disabled: false,
    readonly: false,
    "data-design-token-target":true,
    className:"elevated"
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["search", "autocomplete"],
    },
    inputposition: {
      control: { type: "select" },
      options: ["first", "last"],
    },
    inputwidth: {
      control: { type: "select" },
      options: ["default", "full"],
    },
    // matchmode: {
    //   control: { type: "select" },
    //   options: ["contains", "start", "end", "exact"],
    // },
    // allowonlyselect: { control: "boolean" },
    // autofocus: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    enablereorder: { control: "boolean" },
    showsearchicon: { control: "boolean" },
    // maxsize: { control: "number" },
    // minchars: { control: "number" },
    // debouncetime: { control: "number" },
    // tabindex: { control: "number" },
    // limit: { control: "number" },
    placeholder: { control: "text" },
    // chipclass: { control: "text" },
    // className: { control: "text" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    // displayimagesrc: { control: "text" },
    // dateformat: { control: "text" },
    // groupby: { control: "text" },
    // orderby: { control: "text" },
    // searchkey: { control: "text" },
    // match: { control: "text" },
    datacompletemsg: { control: "text" },
    // width: { control: "text" },
    // height: { control: "text" },
    // compareby: { control: "text" },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    className:{control:"select", options:["elevated"]}
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: chipsTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "chips",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};
