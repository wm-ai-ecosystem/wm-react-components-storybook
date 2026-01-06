import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Chip } from "@mui/material";

import MarqueeDefaultExport from "../../../../components/advanced/marquee/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof MarqueeDefaultExport> = {
  title: "Advanced/Marquee",
  component: MarqueeDefaultExport,
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["left", "right", "up", "down"]
    },
    scrollamount: { control: "number" },
    scrolldelay: { control: "number" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => (
  <Box style={{ padding: 16, border: "1px solid #ddd", borderRadius: 4, height: '60px', width: '600px' }}>
    <MarqueeDefaultExport {...args} > <h2>This is a basic marquee moving left </h2>
          </MarqueeDefaultExport>
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
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Basic Examples
export const Basic: Story = {
  render: Template,
  args: {
    name: "basicMarquee",
    direction: "left",
    children: "This is a basic marquee scrolling",
    scrollamount: 6,
    scrolldelay: 85,
  },
};

export const Showcase: Story = {
  render: () => (
    <Box style={{ padding: 16 }}>
      <Typography variant="h6" mb={2}>
        Multiple Marquees Showcase
      </Typography>
      <Stack spacing={2}>
        <Box bgcolor="#e3f2fd" p={1} borderRadius={1}>
          <MarqueeDefaultExport name="multi1" direction="left" scrollamount={5}>
            📢 First marquee scrolling left
          </MarqueeDefaultExport>
        </Box>
        <Box bgcolor="#f3e5f5" p={1} borderRadius={1}>
          <MarqueeDefaultExport name="multi2" direction="right" scrollamount={6}>
            📢 Second marquee scrolling right
          </MarqueeDefaultExport>
        </Box>
        <Box bgcolor="#e8f5e9" p={1} borderRadius={1}>
          <MarqueeDefaultExport name="multi3" direction="left" scrollamount={8}>
            📢 Third marquee scrolling left (faster)
          </MarqueeDefaultExport>
        </Box>

        <Box style={{ padding: 16, border: "1px solid #ddd", borderRadius: 4, height: 200 }}>
          <MarqueeDefaultExport name="downMarquee" direction="down" scrollamount={8}>
            <Box>
              <Typography>↓ Scrolling from top to bottom</Typography>
              <Typography mt={1}>Line 2</Typography>
              <Typography mt={1}>Line 3</Typography>
            </Box>
          </MarqueeDefaultExport>
        </Box>

        <Box style={{ padding: 16, border: "1px solid #ddd", borderRadius: 4, height: 200 }}>
          <MarqueeDefaultExport name="upMarquee" direction="up" scrollamount={8}>
            <Box>
              <Typography>↑ Scrolling from bottom to top</Typography>
              <Typography mt={1}>Line 2</Typography>
              <Typography mt={1}>Line 3</Typography>
            </Box>
          </MarqueeDefaultExport>
        </Box>

      </Stack>
    </Box>
  ),
};
