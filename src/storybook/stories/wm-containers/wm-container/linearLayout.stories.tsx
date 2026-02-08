import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography, Stack } from "@mui/material";
import WmLinearLayout from "../../../../components/container/linear-layout";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const SampleBox = ({ label, color }: { label: string; color?: string }) => (
  <Box
    sx={{
      padding: 2,
      backgroundColor: color || "#e3f2fd",
      border: "2px solid #2196f3",
      borderRadius: 1,
      textAlign: "center",
      minWidth: "80px",
    }}
  >
    {label}
  </Box>
);

const meta = {
  title: "Containers/Container",
  component: WmLinearLayout,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WmLinearLayout>;

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
  args:{
    name:"docsLinearLayout",
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
      <Box sx={{mb: 3}}>
        <Typography variant="h6" fontWeight={600}>
          Linear Layout Showcase
        </Typography>
      </Box>

      {/* Row Layout */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Row Layout (Left / Top)
        </Typography>
        <WmLinearLayout
          name="rowLayout"
          direction="row"
          horizontalalign="left"
          verticalalign="top"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="Item 1" />
          <SampleBox label="Item 2" />
          <SampleBox label="Item 3" />
        </WmLinearLayout>
      </Box>

      {/* Row Centered */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Row Layout (Center / Center)
        </Typography>
        <WmLinearLayout
          name="rowCentered"
          direction="row"
          horizontalalign="center"
          verticalalign="center"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="Item 1" />
          <SampleBox label="Item 2" />
          <SampleBox label="Item 3" />
        </WmLinearLayout>
      </Box>

      {/* Row Reverse */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Row Reverse Layout (Right / Top)
        </Typography>
        <WmLinearLayout
          name="rowReverse"
          direction="row-reverse"
          horizontalalign="right"
          verticalalign="top"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="First" color="#ffebee" />
          <SampleBox label="Second" color="#fff3e0" />
          <SampleBox label="Third" color="#e8f5e9" />
        </WmLinearLayout>
      </Box>

      {/* Column Layout */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Column Layout (Left / Top)
        </Typography>
        <WmLinearLayout
          name="columnLayout"
          direction="column"
          horizontalalign="left"
          verticalalign="top"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="Item 1" />
          <SampleBox label="Item 2" />
          <SampleBox label="Item 3" />
        </WmLinearLayout>
      </Box>

      {/* Column Reverse */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Column Reverse Layout (Left / Bottom)
        </Typography>
        <WmLinearLayout
          name="columnReverse"
          direction="column-reverse"
          horizontalalign="left"
          verticalalign="bottom"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="First" color="#ffebee" />
          <SampleBox label="Second" color="#fff3e0" />
          <SampleBox label="Third" color="#e8f5e9" />
        </WmLinearLayout>
      </Box>

      {/* Column Centered */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          Column Layout (Center / Center)
        </Typography>
        <WmLinearLayout
          name="columnCentered"
          direction="column"
          horizontalalign="center"
          verticalalign="center"
          listener={mockListener}
          styles={{ minHeight: "150px", minWidth: "350px", border: "1px dashed #ccc", gap: "8px", padding: "8px" }}
        >
          <SampleBox label="Centered 1" />
          <SampleBox label="Centered 2" />
        </WmLinearLayout>
      </Box>
    </Box>
  ),
  args:{
    name:"showcaseLinearLayout",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
    const {
      spacing,
      direction,
      horizontalalign,
      verticalalign,
      listener,
      name,
    } = args;

    return (
      <WmLinearLayout
        name={name}
        direction={direction}
        horizontalalign={horizontalalign}
        verticalalign={verticalalign}
        listener={listener}
        styles={{
          minHeight: "150px",
          minWidth: "350px",
          border: "1px dashed #ccc",
          gap: `${spacing}px`, // ✅ dynamic gap
          padding: "8px",
        }}
      >
        <SampleBox label="Item 1" />
        <SampleBox label="Item 2" />
        <SampleBox label="Item 3" />
      </WmLinearLayout>
    )},
  args: {
    name: "standardLinearLayout",
    direction: "row",
    horizontalalign: "left",
    verticalalign: "top",
    listener: mockListener,
    spacing: 8
    // styles: { minHeight: "150px", border: "1px dashed #ccc", minWidth: "350px" },
    // children: (
    //   <>
    //     <SampleBox label="Item 1" />
    //     <SampleBox label="Item 2" />
    //     <SampleBox label="Item 3" />
    //   </>
    // ),
  },
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["row", "row-reverse", "column", "column-reverse"],
    },
    horizontalalign: {
      control: { type: "select" },
      options: ["left", "right", "center"],
    },
    verticalalign: {
      control: { type: "select" },
      options: ["top", "bottom", "center"],
    },
    spacing: { control: "number" },
    styles:{table: {disable:true}},
    children:{table: {disable:true}},
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
};