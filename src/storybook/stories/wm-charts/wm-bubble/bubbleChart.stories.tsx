import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import { BubbleChart } from "../../../../components/chart/components/bubbleChart";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockData = [
  { x: 0, Product_A: 100, Product_A_size: 400, Product_B: 200, Product_B_size: 600 },
  { x: 1, Product_A: 120, Product_A_size: 500, Product_B: 180, Product_B_size: 400 },
  { x: 2, Product_A: 170, Product_A_size: 450, Product_B: 150, Product_B_size: 550 },
  { x: 3, Product_A: 140, Product_A_size: 350, Product_B: 220, Product_B_size: 650 },
  { x: 4, Product_A: 190, Product_A_size: 550, Product_B: 210, Product_B_size: 500 },
];

const meta = {
  title: "Charts/Bubble Chart",
  component: BubbleChart,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BubbleChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [selectedRegions, setSelectedRegions] = useState(args.dataKeys);

  const handleLegendClick = (region: string) => {
    setSelectedRegions((prev: string[]) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  return (
    <Box style={{ width: "100%", height: "400px", padding: 16 }}>
      <BubbleChart
        {...args}
        selectedRegions={selectedRegions}
        onLegendClick={handleLegendClick}
      />
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
      styling={styling}
    />
  ),
  args: {
    data: mockData,
    dataKeys: [],
    selectedRegions: [],
    chartColors: [],
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
    showLegend: false,
    legendPosition: "top" as const,
    xAxisConfig: {},
    yAxisConfig: {},
    numberFormat: "",
    xDataKeyArr: [],
    // onChartClick: () => {},
    tooltips: false,
    shape: "circle" as const,
    // onLegendClick: () => {},
    // shouldShowLegend: false,
    // availableRegions: [],
  },
  argTypes: {
    data: { table: { disable: true } },
    dataKeys: { table: { disable: true } },
    selectedRegions: { table: { disable: true } },
    chartColors: { table: { disable: true } },
    margin: { table: { disable: true } },
    showLegend: { table: { disable: true } },
    legendPosition: { table: { disable: true } },
    xAxisConfig: { table: { disable: true } },
    yAxisConfig: { table: { disable: true } },
    numberFormat: { table: { disable: true } },
    xDataKeyArr: { table: { disable: true } },
    onChartClick: { table: { disable: true } },
    tooltips: { table: { disable: true } },
    shape: { table: { disable: true } },
    onLegendClick: { table: { disable: true } },
    // shouldShowLegend: { table: { disable: true } },
    // availableRegions: { table: { disable: true } },
    offsettop: { table: { disable: true } },
    offsetleft: { table: { disable: true } },
    offsetbottom  : { table: { disable: true } },
    offsetright: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const singleSeriesData = mockData;
    const multiSeriesData = [
      {
        x: 0,
        Series_A: 100,
        Series_A_size: 400,
        Series_B: 200,
        Series_B_size: 600,
        Series_C: 150,
        Series_C_size: 500,
      },
      {
        x: 1,
        Series_A: 120,
        Series_A_size: 500,
        Series_B: 180,
        Series_B_size: 400,
        Series_C: 160,
        Series_C_size: 450,
      },
      {
        x: 2,
        Series_A: 170,
        Series_A_size: 450,
        Series_B: 150,
        Series_B_size: 550,
        Series_C: 140,
        Series_C_size: 400,
      },
      {
        x: 3,
        Series_A: 140,
        Series_A_size: 350,
        Series_B: 220,
        Series_B_size: 650,
        Series_C: 180,
        Series_C_size: 550,
      },
    ];

    const shapes = ["diamond", "square", "triangle"] as const;

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{mb: 4}}>
          <Typography variant="h6" fontWeight={600} mb={4}>
            Bubble Chart Showcase
          </Typography>
        </Box>
        <Stack spacing={6}>
          
          {/* Single Series */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Single Series
            </Typography>
            <Box sx={{ height: 400 }}>
              <BubbleChart
                data={singleSeriesData}
                dataKeys={["Product_A"]}
                selectedRegions={["Product_A"]}
                chartColors={["#8884d8"]}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                showLegend={false}
                legendPosition="top"
                xDataKeyArr={["Q1", "Q2", "Q3", "Q4", "Q5"]}
                tooltips
                shape="circle"
                onLegendClick={() => {}}
                onChartClick={() => {}}
              />
            </Box>
          </Box>

          {/* Multi Series */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Multi Series
            </Typography>
            <Box sx={{ height: 400 }}>
              <BubbleChart
                data={multiSeriesData}
                dataKeys={["Series_A", "Series_B", "Series_C"]}
                selectedRegions={["Series_A", "Series_B", "Series_C"]}
                chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                showLegend
                legendPosition="top"
                xDataKeyArr={["Jan", "Feb", "Mar", "Apr"]}
                tooltips
                shape="circle"
                onLegendClick={() => {}}
                onChartClick={() => {}}
              />
            </Box>
          </Box>

          {/* Shapes Showcase */}
          {shapes.map((shape) => (
            <Box key={shape}>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Shape: {shape.charAt(0).toUpperCase() + shape.slice(1)}
              </Typography>
              <Box sx={{ height: 400 }}>
                <BubbleChart
                  data={singleSeriesData}
                  dataKeys={["Product_A", "Product_B"]}
                  selectedRegions={["Product_A", "Product_B"]}
                  chartColors={["#8884d8", "#82ca9d"]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  showLegend
                  legendPosition="top"
                  xDataKeyArr={["Q1", "Q2", "Q3", "Q4", "Q5"]}
                  tooltips
                  shape={shape}
                  onLegendClick={() => {}}
                  onChartClick={() => {}}
                />
              </Box>
            </Box>
          ))}

        </Stack>
      </Box>
    );
  },
  args: {
    data: mockData,
    dataKeys: [],
    selectedRegions: [],
    chartColors: [],
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
    showLegend: false,
    legendPosition: "top" as const,
    xAxisConfig: {},
    yAxisConfig: {},
    numberFormat: "",
    xDataKeyArr: [],
    // onChartClick: () => {},
    tooltips: false,
    shape: "circle" as const,
    // onLegendClick: () => {},
    // shouldShowLegend: false,
    // availableRegions: [],
  },
  argTypes: {
    data: { table: { disable: true } },
    dataKeys: { table: { disable: true } },
    selectedRegions: { table: { disable: true } },
    chartColors: { table: { disable: true } },
    margin: { table: { disable: true } },
    showLegend: { table: { disable: true } },
    legendPosition: { table: { disable: true } },
    xAxisConfig: { table: { disable: true } },
    yAxisConfig: { table: { disable: true } },
    numberFormat: { table: { disable: true } },
    xDataKeyArr: { table: { disable: true } },
    onChartClick: { table: { disable: true } },
    tooltips: { table: { disable: true } },
    shape: { table: { disable: true } },
    onLegendClick: { table: { disable: true } },
    // shouldShowLegend: { table: { disable: true } },
    // availableRegions: { table: { disable: true } },
    offsettop: { table: { disable: true } },
    offsetleft: { table: { disable: true } },
    offsetbottom  : { table: { disable: true } },
    offsetright: { table: { disable: true } },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    data: mockData,
    dataKeys: ["Product_A", "Product_B"],
    chartColors: ["#8884d8", "#82ca9d"],
    margin: { top: 20, right: 30, left: 20, bottom: 20 },
    showLegend: true,
    legendPosition: "top",
    xAxisConfig: { label: { value: "Time", position: "insideBottom", offset: -10 } },
    yAxisConfig: { label: { value: "Value", angle: -90, position: "insideLeft" } },
    numberFormat: "0,0",
    xDataKeyArr: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    // onChartClick: (data: any, index: number, event: any) =>
    //   console.log("Bubble clicked:", data, index),
    tooltips: true,
    shape: "circle",
  },
  argTypes: {
    shape: {
      control: { type: "select" },
      options: ["circle", "diamond", "square", "triangle", "random"],
    },
    tooltips: { control: "boolean" },
    showLegend: { control: "boolean" },
    selectedRegions: {table: {disable: true}},
    onChartClick: {table:{disable: true}},
    onLegendClick:{table: {disable: true}}
  },
};
