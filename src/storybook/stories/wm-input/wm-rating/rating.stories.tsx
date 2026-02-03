import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import RatingDefaultExport from "../../../../components/input/rating/index";
import WmComposite from "../../../../components/input/composite";
import WmLabel from "../../../../components/basic/label";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import ratingTokensData from "../../../../designTokens/components/rating/rating.json";

const meta: Meta<typeof RatingDefaultExport> = {
  title: "Input/Rating",
  component: RatingDefaultExport,
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
    <RatingDefaultExport {...args} listener={mockListener} />
  </Box>
);

const DesignTokensTemplate = (args: any) => {
  //component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
  return (
    <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
      <WmComposite captionposition="left" listener={mockListener} name="ratingComposite">
        <WmLabel caption="Rating" listener={mockListener} name="ratingLabel" className="control-label"/>
        <RatingDefaultExport {...componentArgs} listener={mockListener} />
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
    />
  ),
  args:{
    name:"docsRating",
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
      <Typography variant="h6" fontWeight={600} mb={4}>
        Rating Showcase
      </Typography>
      </Box>

      <Stack spacing={6}>
        {/* Icon Types */}
        <Box>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Default Star</Typography>
              <RatingDefaultExport
                name="starIcon"
                maxvalue={5}
                datavalue={3}
                listener={mockListener}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Red Heart</Typography>
              <RatingDefaultExport
                name="heartIcon"
                maxvalue={5}
                iconcolor="#FF0000"
                activeiconclass="fa fa-heart"
                inactiveiconclass="fa fa-heart"
                datavalue={4}
                listener={mockListener}
              />
            </Box>
          </Stack>
        </Box>

        {/* Custom Dataset with Captions */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>Custom Dataset with Captions</Typography>
          <RatingDefaultExport
            name="customDataset"
            dataset={[
              { index: 1, label: "Poor", value: 1 },
              { index: 2, label: "Fair", value: 2 },
              { index: 3, label: "Good", value: 3 },
              { index: 4, label: "Very Good", value: 4 },
              { index: 5, label: "Excellent", value: 5 },
            ]}
            showcaptions={true}
            datavalue={3}
            datafield="value"
            displayfield="label"
            listener={mockListener}
          />
        </Box>

        {/* Icon Size Variations */}
        {/* <Box>
          <Typography variant="h6" mb={2}>Icon Size Variations with Captions</Typography>
          <Stack direction="row" spacing={4}>
            <Box>
              <Typography variant="body2" mb={1}>Small</Typography>
              <RatingDefaultExport
                name="smallIcon"
                iconsize="16px"
                caption="Rate this"
                showcaptions={true}
                datavalue={3}
                listener={mockListener}
              />
            </Box>
            <Box>
              <Typography variant="body2" mb={1}>Medium</Typography>
              <RatingDefaultExport
                name="mediumIcon"
                iconsize="24px"
                caption="Rate this"
                showcaptions={true}
                datavalue={4}
                listener={mockListener}
              />
            </Box>
            <Box>
              <Typography variant="body2" mb={1}>Large</Typography>
              <RatingDefaultExport
                name="largeIcon"
                iconsize="36px"
                caption="Rate this"
                showcaptions={true}
                datavalue={5}
                listener={mockListener}
              />
            </Box>
          </Stack>
        </Box> */}
      </Stack>
    </Box>
  ),
  args:{
    name:"showcaseRating",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
}

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokensTemplate,
  args: {
    name: "standardRating",
    listener: mockListener,
    disabled: false,
    readonly: false,
    required: false,
    datavalue:2,
    "data-design-token-target":true,
  },
  argTypes: {
    maxvalue: { control: "number" },
    caption: { control: "text" },
    readonly: { control: "boolean" },
    showcaptions: { control: "boolean" },
    // iconcolor: { control: "color" },
    // iconsize: { control: "text" },
    activeiconclass: { control: "select", options:["fa fa-star", "fa fa-heart"] },
    inactiveiconclass: { control: "select", options:["fa fa-star", "fa fa-heart"] },
    datavalue: { control: "number" },
    dataset: { control: "object" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    disabled: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: ratingTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "rating",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};