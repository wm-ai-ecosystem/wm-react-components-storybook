import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";

import CarouselDefaultExport from "../../../../components/advanced/carousel/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof CarouselDefaultExport> = {
  title: "Advanced/Carousel",
  component: CarouselDefaultExport,
  argTypes: {
    animation: {
      control: { type: "select" },
      options: ["auto", "none"],
      description: "Animation type for carousel transitions"
    },
    animationinterval: {
      control: { type: "number", min: 1, max: 10, step: 0.5 },
      description: "Interval in seconds for auto-play (when animation is 'auto')"
    },
    controls: {
      control: { type: "select" },
      options: ["navs", "indicators", "both", "none"],
      description: "Type of navigation controls to display"
    },
    height: {
      control: "text",
      description: "Height of the carousel"
    },
    width: {
      control: "text",
      description: "Width of the carousel"
    },
    nodatamessage: {
      control: "text",
      description: "Message to display when there is no data"
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
  render: (args) => (
    <Box style={{ padding: 16,  height: "500px", width: "800px" }}>
      <CarouselDefaultExport {...args}>
        <Box sx={{ width: "100%", height: "100%", bgcolor: "#1976d2", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h3">Slide 1</Typography>
        </Box>
        <Box sx={{ width: "100%", height: "100%", bgcolor: "#2e7d32", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h3">Slide 2</Typography>
        </Box>
        <Box sx={{ width: "100%", height: "100%", bgcolor: "#ed6c02", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h3">Slide 3</Typography>
        </Box>
      </CarouselDefaultExport>
    </Box>
  ),
  args: {
    name: "basicCarousel",
    animation: "auto",
    animationinterval: 2,
    controls: "both",
    height: "400px",
    width: "100%",
  },
};

export const Showcase: Story = {
  render: () => {
    const showcaseItems = [
      {
        title: "Auto Slide (Animation: auto)",
        props: {
          animation: "auto",
          animationinterval: 2,
          controls: "both",
        },
      },
      {
        title: "Manual Slide (Animation: none)",
        props: {
          animation: "none",
          controls: "both",
        },
      },
      {
        title: "Controls: Navigation Only",
        props: {
          animation: "none",
          animationinterval: 3,
          controls: "navs",
        },
      },
      {
        title: "Controls: Indicators Only",
        props: {
          animation: "none",
          animationinterval: 3,
          controls: "indicators",
        },
      },
      {
        title: "Controls: Both",
        props: {
          animation: "none",
          animationinterval: 3,
          controls: "both",
        },
      },
      {
        title: "Controls: None",
        props: {
          animation: "auto",
          animationinterval: 3,
          controls: "none",
        },
      },
    ];

    const Slide = ({
      bg,
      label,
    }: {
      bg: string;
      label: string;
    }) => (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: bg,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">{label}</Typography>
      </Box>
    );

    return (
      <Box sx={{ width: "100%", p: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Carousel Showcase
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 4,
          }}
        >
          {showcaseItems.map((item, index) => (
            <Box key={index}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                mb={1}
              >
                {item.title}
              </Typography>

              <Box sx={{ height: "320px", width: "100%" }}>
                <CarouselDefaultExport
                  name={`carousel_showcase_${index}`}
                  height="300px"
                  width="100%"
                  {...item.props}
                >
                  <Slide bg="#1976d2" label="Slide 1" />
                  <Slide bg="#2e7d32" label="Slide 2" />
                  <Slide bg="#ed6c02" label="Slide 3" />
                </CarouselDefaultExport>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  },
};
