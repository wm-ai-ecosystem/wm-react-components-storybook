import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import { CumulativeLineChart } from "../../../../components/chart/components/cumulativeLineChart";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

/* ------------------------------------------------------------------ */
/* Mock Data */
/* ------------------------------------------------------------------ */
const mockDataSingle = [
  { x: "Q1", Region_A: 100, Region_B: 200 },
  { x: "Q2", Region_A: 120, Region_B: 180 },
  { x: "Q3", Region_A: 170, Region_B: 150 },
  { x: "Q4", Region_A: 140, Region_B: 220 },
  { x: "Q5", Region_A: 190, Region_B: 210 },
];

const mockDataMulti = [
  { x: "Jan", A: 50,  B: 100, C: 75  },
  { x: "Feb", A: 130, B: 240, C: 165 },
  { x: "Mar", A: 250, B: 400, C: 275 },
  { x: "Apr", A: 400, B: 600, C: 415 },
];

/* ------------------------------------------------------------------ */
/* Meta */
/* ------------------------------------------------------------------ */
const meta = {
  title: "Charts/Cumulative Line Chart",
  component: CumulativeLineChart,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CumulativeLineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/* Template for Interactive Stories */
/* ------------------------------------------------------------------ */
const Template = (args: any) => {
  const [selectedRegions, setSelectedRegions] = useState(
    args.selectedRegions ?? args.dataKeys
  );

  const handleLegendClick = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  return (
    <Box sx={{ width: "100%", height: 400, p: 2 }}>
      <CumulativeLineChart
        {...args}
        selectedRegions={selectedRegions}
        onLegendClick={handleLegendClick}
      />
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/* Docs Story */
/* ------------------------------------------------------------------ */
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
    data: mockDataSingle,
    dataKeys: [],
    selectedRegions: [],
    chartColors: [],
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
    showLegend: false,
    legendPosition: "top",
    xAxisConfig: { dataKey: "x" },
    yAxisConfig: {},
    numberFormat: "",
    xDataKeyArr: [],
    interpolation: "linear",
    strokeWidth: 2,
    pointSize: 4,
    onChartClick: () => {},
    tooltips: false,
    legendtype: "classic",
    onLegendClick: () => {},
    availableRegions: [],
  },
  argTypes: {
    legendPosition: { control: "select", options: ["top", "bottom"] },
    interpolation: { control: "select", options: ["linear", "cardinal", "step"] },
    tooltips: { control: "boolean" },
    showLegend: { control: "boolean" },
    strokeWidth: { control: { type: "number", min: 1, max: 5 } },
    pointSize: { control: { type: "number", min: 0, max: 10 } },
    // internal props to hide from controls
    selectedRegions: { table: { disable: true } },
    onChartClick: { table: { disable: true } },
    onLegendClick: { table: { disable: true } },
    availableRegions: { table: { disable: true } },
    dataKeys: { table: { disable: true } },
    chartColors: { table: { disable: true } },
    xAxisConfig: { table: { disable: true } },
    yAxisConfig: { table: { disable: true } },
    margin: { table: { disable: true } },
    xDataKeyArr: { table: { disable: true } },
    numberFormat: { table: { disable: true } },
    legendtype: { table: { disable: true } },
    offsettop: { table: { disable: true } },
    offsetleft: { table: { disable: true } },
    offsetbottom: { table: { disable: true } },
    offsetright: { table: { disable: true } },
  },
};

/* ------------------------------------------------------------------ */
/* Showcase Story */
/* ------------------------------------------------------------------ */
export const Showcase: Story = {
  render: () => {
    const interpolations: Array<"linear" | "cardinal" | "step"> = [
      "linear",
      "cardinal",
      "step",
    ];

    return (
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" fontWeight={600} mb={4}>
          Cumulative Line Chart Showcase
        </Typography>
        <Stack spacing={6}>
          {/* Single Series */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Single Series
            </Typography>
            <Box sx={{ height: 400 }}>
              <CumulativeLineChart
                data={mockDataSingle}
                dataKeys={["Region_A"]}
                selectedRegions={["Region_A"]}
                chartColors={["#8884d8"]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                showLegend={false}
                legendPosition="top"
                xDataKeyArr={mockDataSingle.map(d => d.x)}
                interpolation="linear"
                strokeWidth={2}
                pointSize={4}
                tooltips
              />
            </Box>
          </Box>

          {/* Multi Series */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Multi Series
            </Typography>
            <Box sx={{ height: 400 }}>
              <CumulativeLineChart
                data={mockDataMulti}
                dataKeys={["A", "B", "C"]}
                selectedRegions={["A", "B", "C"]}
                chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                showLegend
                legendPosition="top"
                xDataKeyArr={mockDataMulti.map(d => d.x)}
                interpolation="cardinal"
                strokeWidth={2}
                pointSize={4}
                tooltips
              />
            </Box>
          </Box>

          {/* Interpolation Types */}
          {interpolations.map(type => (
            <Box key={type}>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Interpolation: {type}
              </Typography>
              <Box sx={{ height: 400 }}>
                <CumulativeLineChart
                  data={mockDataMulti}
                  dataKeys={["A", "B", "C"]}
                  selectedRegions={["A", "B", "C"]}
                  chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  showLegend
                  legendPosition="top"
                  xDataKeyArr={mockDataMulti.map(d => d.x)}
                  interpolation={type}
                  strokeWidth={2}
                  pointSize={4}
                  tooltips
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  },
  args: {
    data: mockDataSingle,
    dataKeys: [],
    selectedRegions: [],
    chartColors: [],
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
    showLegend: false,
    legendPosition: "top",
    xAxisConfig: { dataKey: "x" },
    yAxisConfig: {},
    numberFormat: "",
    xDataKeyArr: [],
    interpolation: "linear",
    strokeWidth: 2,
    pointSize: 4,
    tooltips: false,
    legendtype: "classic",
  },
};

/* ------------------------------------------------------------------ */
/* Standard Story */
/* ------------------------------------------------------------------ */
export const Standard: Story = {
  tags: ["show-panel"],
  render: Template,
  args: {
    data: mockDataMulti,
    dataKeys: ["A", "B", "C"],
    selectedRegions: ["A", "B", "C"],
    chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    showLegend: true,
    legendPosition: "top",
    xAxisConfig: { dataKey: "x" },
    yAxisConfig: {},
    numberFormat: "0,0",
    xDataKeyArr: ["Jan", "Feb", "Mar", "Apr"],
    interpolation: "linear",
    strokeWidth: 2,
    pointSize: 4,
    tooltips: true,
    legendtype: "classic",
    onChartClick: (data: any) => console.log("Chart clicked:", data),
    onLegendClick: () => {},
    availableRegions: [],
  },
  argTypes: {
    legendPosition: { control: "select", options: ["top", "bottom"] },
    interpolation: { control: "select", options: ["linear", "cardinal", "step"] },
    tooltips: { control: "boolean" },
    showLegend: { control: "boolean" },
    strokeWidth: { control: "number" },
    pointSize: { control: "number" },
    selectedRegions: { table: { disable: true } },
    onChartClick: { table: { disable: true } },
    onLegendClick: { table: { disable: true } },
    availableRegions: { table: { disable: true } },
  },
};