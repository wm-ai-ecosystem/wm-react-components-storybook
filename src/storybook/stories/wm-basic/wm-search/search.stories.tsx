import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import SearchDefaultExport from "../../../../components/basic/search/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import searchTokensData from "../../../../designTokens/components/search/search.json";

const meta: Meta<typeof SearchDefaultExport> = {
  title: "Basic/Search",
  component: SearchDefaultExport,
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

// Sample dataset for search
const sampleDataset = [
  { id: 1, name: "Apple", category: "Fruit", color: "Red" },
  { id: 2, name: "Banana", category: "Fruit", color: "Yellow" },
  { id: 3, name: "Carrot", category: "Vegetable", color: "Orange" },
  { id: 4, name: "Date", category: "Fruit", color: "Brown" },
  { id: 5, name: "Eggplant", category: "Vegetable", color: "Purple" },
  { id: 6, name: "Fig", category: "Fruit", color: "Purple" },
  { id: 7, name: "Grape", category: "Fruit", color: "Green" },
  { id: 8, name: "Honeydew", category: "Fruit", color: "Green" },
  { id: 9, name: "Iceberg Lettuce", category: "Vegetable", color: "Green" },
  { id: 10, name: "Jackfruit", category: "Fruit", color: "Green" },
];

// const countriesDataset = [
//   { id: 1, name: "United States", code: "US", continent: "North America" },
//   { id: 2, name: "United Kingdom", code: "UK", continent: "Europe" },
//   { id: 3, name: "Canada", code: "CA", continent: "North America" },
//   { id: 4, name: "Australia", code: "AU", continent: "Oceania" },
//   { id: 5, name: "Germany", code: "DE", continent: "Europe" },
//   { id: 6, name: "France", code: "FR", continent: "Europe" },
//   { id: 7, name: "Japan", code: "JP", continent: "Asia" },
//   { id: 8, name: "India", code: "IN", continent: "Asia" },
//   { id: 9, name: "Brazil", code: "BR", continent: "South America" },
//   { id: 10, name: "Mexico", code: "MX", continent: "North America" },
// ];

const Template = (args: any) => (
  <Box style={{ padding: 16, minHeight: "300px" }}>
    <SearchDefaultExport {...args} listener={mockListener} />
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
      token={token}
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14254&p=f&t=rE8HvDMpyMdtByDG-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsSearch",
    listener:mockListener
  },
  argTypes: {
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
          {/* Heading */}
          <Typography variant="h6" fontWeight={600}>
            Search Showcase
          </Typography>

          {/* Search examples */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Search Type (Click Icon)
            </Typography>
            <SearchDefaultExport
              name="searchIcon"
              type="search"
              placeholder="Click search icon to search..."
              dataset={sampleDataset}
              datafield="name"
              displayfield="name"
              searchon="onsearchiconclick"
              showclear={false}
              showsearchicon={true}
              listener={mockListener}
            />
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Search Type (On Typing)
            </Typography>
            <SearchDefaultExport
              name="searchTyping"
              type="search"
              placeholder="Search as you type..."
              dataset={sampleDataset}
              datafield="name"
              displayfield="name"
              searchon="typing"
              showclear={false}
              showsearchicon={true}
              listener={mockListener}
            />
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Autocomplete Type
            </Typography>
            <SearchDefaultExport
              name="autocompleteType"
              type="autocomplete"
              placeholder="Type to autocomplete..."
              dataset={sampleDataset}
              datafield="name"
              displayfield="name"
              showclear={true}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseSearchTypes",
    listener: mockListener,
  },
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardSearch",
    listener: mockListener,
    type: "search",
    placeholder: "Search...",
    dataset: sampleDataset,
    datafield: "name",
    displayfield: "name",
    searchon: "onsearchiconclick",
    searchkey: "name",
    // showclear: false,
    showsearchicon: true,
    showbackbutton:false,
    disabled: false,
    readonly: false,
    autofocus: false,
    "data-design-token-target":true,
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["search", "autocomplete"],
    },
    searchon: {
      control: { type: "select" },
      options: ["typing", "onsearchiconclick"],
    },
    matchmode: {
      control: { type: "select" },
      options: ["contains", "start", "end", "exact"],
    },
    searchkey:{
     control:{ type:"text" },
     table:{ disable:false, }
    },
    placeholder: { control: "text" },
    // showclear: { control: "boolean" },
    showsearchicon: { control: "boolean" },
    showbackbutton: { control: "boolean" },
    // dropup: { control: "boolean" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    autofocus: { control: "boolean" },
    // debouncetime: { control: "number" },
    // minchars: { control: "number" },
    // limit: { control: "number" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: searchTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "search",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};