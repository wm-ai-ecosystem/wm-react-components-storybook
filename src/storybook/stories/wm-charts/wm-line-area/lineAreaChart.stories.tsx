import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import { LineAreaChart } from "../../../../components/chart/components/lineAreaChart";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockData = [
  { x: "Jan", Sales: 4000, Revenue: 2400, Profit: 2400 },
  { x: "Feb", Sales: 3000, Revenue: 1398, Profit: 2210 },
  { x: "Mar", Sales: 2000, Revenue: 9800, Profit: 2290 },
  { x: "Apr", Sales: 2780, Revenue: 3908, Profit: 2000 },
  { x: "May", Sales: 1890, Revenue: 4800, Profit: 2181 },
  { x: "Jun", Sales: 2390, Revenue: 3800, Profit: 2500 },
];

const meta = {
  title: "Charts/Line Area Chart",
  component: LineAreaChart,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LineAreaChart>;

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
      <LineAreaChart
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
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: StoryObj = {
  render: () => {
    const singleSeriesData = mockData;
    const multiSeriesData = mockData;

    const chartTypes: Array<"Line" | "Area"> = ["Line", "Area"];
    const interpolations: Array<"linear" | "cardinal" | "step"> = ["linear", "cardinal", "step"];
    const areaViewTypes: Array<"none" | "expand" | "silhouette" | "wiggle"> = ["none", "expand", "silhouette", "wiggle"];

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{mb: 4}}>
          <Typography variant="h6" fontWeight={600} mb={4}>
            Line / Area Chart Showcase
          </Typography>
        </Box>
        <Stack spacing={6}>
          
          {/* Chart Type Showcase */}
          {chartTypes.map((type) => (
            <Box key={type}>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Chart Type: {type}
              </Typography>
              <Box sx={{ height: 400 }}>
                <LineAreaChart
                  type={type}
                  data={multiSeriesData}
                  dataKeys={["Sales", "Revenue", "Profit"]}
                  selectedRegions={["Sales", "Revenue", "Profit"]}
                  chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  showLegend
                  legendPosition="top"
                  xDataKeyArr={multiSeriesData.map((d) => d.x)}
                  interpolation="linear"
                  strokeWidth={2}
                  pointSize={4}
                  areaViewType={type === "Area" ? "none" : undefined}
                  onLegendClick={() => {}}
                  onChartClick={() => {}}
                  tooltips
                />
              </Box>
            </Box>
          ))}

          {/* Single Series */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Single Series
            </Typography>
            <Box sx={{ height: 400 }}>
              <LineAreaChart
                type="Line"
                data={singleSeriesData}
                dataKeys={["Sales"]}
                selectedRegions={["Sales"]}
                chartColors={["#8884d8"]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                showLegend={false}
                legendPosition="top"
                xDataKeyArr={singleSeriesData.map((d) => d.x)}
                interpolation="linear"
                strokeWidth={3}
                pointSize={5}
                onLegendClick={() => {}}
                onChartClick={() => {}}
                tooltips
              />
            </Box>
          </Box>

          {/* Smooth Line */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Smooth Line (Cardinal)
            </Typography>
            <Box sx={{ height: 400 }}>
              <LineAreaChart
                type="Line"
                data={multiSeriesData}
                dataKeys={["Sales", "Revenue", "Profit"]}
                selectedRegions={["Sales", "Revenue", "Profit"]}
                chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                showLegend
                legendPosition="top"
                xDataKeyArr={multiSeriesData.map((d) => d.x)}
                interpolation="cardinal"
                strokeWidth={2}
                pointSize={4}
                onLegendClick={() => {}}
                onChartClick={() => {}}
                tooltips
              />
            </Box>
          </Box>

          {/* Step Line */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Step Line
            </Typography>
            <Box sx={{ height: 400 }}>
              <LineAreaChart
                type="Line"
                data={multiSeriesData}
                dataKeys={["Sales", "Revenue", "Profit"]}
                selectedRegions={["Sales", "Revenue", "Profit"]}
                chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                showLegend
                legendPosition="top"
                xDataKeyArr={multiSeriesData.map((d) => d.x)}
                interpolation="step"
                strokeWidth={2}
                pointSize={4}
                onLegendClick={() => {}}
                onChartClick={() => {}}
                tooltips
              />
            </Box>
          </Box>

          {/* Stacked Area */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Stacked Area
            </Typography>
            <Box sx={{ height: 400 }}>
              <LineAreaChart
                type="Area"
                data={multiSeriesData}
                dataKeys={["Sales", "Revenue", "Profit"]}
                selectedRegions={["Sales", "Revenue", "Profit"]}
                chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                showLegend
                legendPosition="top"
                xDataKeyArr={multiSeriesData.map((d) => d.x)}
                interpolation="linear"
                strokeWidth={2}
                pointSize={4}
                stackId="stacked" // ✅ add this to enable stacking
                areaViewType="none" // keep normal area
                onLegendClick={() => {}}
                onChartClick={() => {}}
                tooltips
/>
            </Box>
          </Box>

        </Stack>
      </Box>
    );
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    type: "Line",
    data: mockData,
    dataKeys: ["Sales", "Revenue", "Profit"],
    chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    showLegend: true,
    legendPosition: "top",
    xAxisConfig: { dataKey: "x" },
    yAxisConfig: {},
    numberFormat: "0,0",
    xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    interpolation: "linear",
    strokeWidth: 2,
    pointSize: 4,
    onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
    tooltips: true,
    legendtype: "classic",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["Line", "Area"],
    },
    interpolation: {
      control: { type: "select" },
      options: ["linear", "cardinal", "step"],
    },
    areaViewType: {
      control: { type: "select" },
      options: ["none", "expand", "silhouette", "wiggle"],
    },
    tooltips: { control: "boolean" },
    showLegend: { control: "boolean" },
    strokeWidth: { control: "number" },
    pointSize: { control: "number" },
  },
};