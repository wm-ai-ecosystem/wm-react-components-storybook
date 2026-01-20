import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import SliderDefaultExport from "../../../../components/input/slider/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof SliderDefaultExport> = {
  title: "Input/Slider",
  component: SliderDefaultExport,
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
    <SliderDefaultExport {...args} listener={mockListener} />
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
      externalLink={{
        href: "https://www.figma.com/design/F6S1sF5vM38mn6aLNnGGon/WaveMaker-UI-Kit--Community-?node-id=55141-14255&p=f&t=rE8HvDMpyMdtByDG-0",
        label: "",
      }}
    />
  ),
  args:{
    name:"docsSlider",
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
    <Stack spacing={4} padding={2}>
      {/* Slider Types Heading */}
      <Box sx={{mb: 3}}>
      <Typography variant="h6" fontWeight={600} mb={3}>
        Slider Showcase
      </Typography>
      </Box>

      {/* Range Examples */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>Range Sliders</Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>Standard Range (0-100)</Typography>
            <SliderDefaultExport
              name="standardRange"
              datavalue={50}
              minvalue={0}
              maxvalue={100}
              step={1}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>Negative Range (-50 to 50)</Typography>
            <SliderDefaultExport
              name="negativeRange"
              datavalue={0}
              minvalue={-50}
              maxvalue={50}
              step={5}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>Decimal Range (0 to 1)</Typography>
            <SliderDefaultExport
              name="decimalRange"
              datavalue={0.5}
              minvalue={0}
              maxvalue={1}
              step={0.1}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>

      {/* Step Examples */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>Step Sliders</Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>Step 1 (Fine Control)</Typography>
            <SliderDefaultExport
              name="step1Slider"
              datavalue={25}
              minvalue={0}
              maxvalue={100}
              step={1}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>Step 10 (Medium Control)</Typography>
            <SliderDefaultExport
              name="step10Slider"
              datavalue={50}
              minvalue={0}
              maxvalue={100}
              step={10}
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>Step 25 (Coarse Control)</Typography>
            <SliderDefaultExport
              name="step25Slider"
              datavalue={50}
              minvalue={0}
              maxvalue={100}
              step={25}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
  args:{
    name:"showcaseSlider",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
};

// Basic Examples
export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardSlider",
    datavalue: 50,
    minvalue: 0,
    maxvalue: 100,
    step: 1,
    listener: mockListener,
    disabled: false,
    readonly: false,
  },
  argTypes: {
    datavalue: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};