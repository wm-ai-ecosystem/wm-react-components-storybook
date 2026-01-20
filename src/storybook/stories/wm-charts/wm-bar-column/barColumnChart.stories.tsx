import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import { BarColumnChart } from "../../../../components/chart/components/barColumnChart";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";
import { table } from "console";

const mockData = [
  { x: "Jan", Sales: 4000, Revenue: 2400, Profit: 2400 },
  { x: "Feb", Sales: 3000, Revenue: 1398, Profit: 2210 },
  { x: "Mar", Sales: 2000, Revenue: 9800, Profit: 2290 },
  { x: "Apr", Sales: 2780, Revenue: 3908, Profit: 2000 },
  { x: "May", Sales: 1890, Revenue: 4800, Profit: 2181 },
  { x: "Jun", Sales: 2390, Revenue: 3800, Profit: 2500 },
];

const meta = {
  title: "Charts/Bar Column Chart",
  component: BarColumnChart,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BarColumnChart>;

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
      <BarColumnChart
        {...args}
        selectedRegions={selectedRegions}
        onLegendClick={handleLegendClick}
        shouldShowLegend={args.showlegend}
      />
    </Box>
  );
};

const mockDataMonthly = [
  { x: "Jan", Sales: 4000, Revenue: 2400, Profit: 2400 },
  { x: "Feb", Sales: 3000, Revenue: 1398, Profit: 2210 },
  { x: "Mar", Sales: 2000, Revenue: 9800, Profit: 2290 },
  { x: "Apr", Sales: 2780, Revenue: 3908, Profit: 2000 },
  { x: "May", Sales: 1890, Revenue: 4800, Profit: 2181 },
  { x: "Jun", Sales: 2390, Revenue: 3800, Profit: 2500 },
];

const mockDataProducts = [
  { x: "Product A", Q1: 4000, Q2: 3000, Q3: 5000, Q4: 4500 },
  { x: "Product B", Q1: 3000, Q2: 4000, Q3: 3500, Q4: 4000 },
  { x: "Product C", Q1: 2000, Q2: 2500, Q3: 3000, Q4: 3500 },
  { x: "Product D", Q1: 2780, Q2: 3200, Q3: 2900, Q4: 3100 },
];

const mockDataRegions = [
  { x: "North", Direct: 5000, Online: 3000, Partner: 2000 },
  { x: "South", Direct: 4500, Online: 3500, Partner: 2200 },
  { x: "East", Direct: 4000, Online: 4000, Partner: 2500 },
  { x: "West", Direct: 5500, Online: 3200, Partner: 1800 },
];

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
  render: () => (
    <Box sx={{ width: "100%"}}>
      <Box sx={{mb: 4}}>
       <Typography variant="h6" fontWeight={600} mb={4}>
          Bar Column Chart Showcase
        </Typography>
      </Box>
      <Stack spacing={6}>

        {/* Stacked Column */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>Stacked Column</Typography>
          <Box sx={{ height: 400 }}>
            <BarColumnChart
              type="Column"
              data={mockDataMonthly}
              dataKeys={["Sales", "Revenue", "Profit"]}
              chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSpacing="medium"
              showValues={false}
              legendPosition="top"
              xDataKeyArr={mockDataMonthly.map(d => d.x)}
              viewtype="Stacked"
              tooltips
              showlegend
              // Pass static selectedRegions to avoid undefined
              selectedRegions={["Sales", "Revenue", "Profit"]}
              onLegendClick={() => {}}
            />
          </Box>
        </Box>

        {/* Stacked Bar */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>Stacked Bar</Typography>
          <Box sx={{ height: 400 }}>
            <BarColumnChart
              type="Bar"
              data={mockDataMonthly}
              dataKeys={["Sales", "Revenue", "Profit"]}
              chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSpacing="medium"
              showValues={false}
              legendPosition="top"
              xDataKeyArr={mockDataMonthly.map(d => d.x)}
              viewtype="Stacked"
              tooltips
              showlegend
              selectedRegions={["Sales", "Revenue", "Profit"]}
              onLegendClick={() => {}}
            />
          </Box>
        </Box>

        {/* Single Series */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>Single Series</Typography>
          <Box sx={{ height: 400 }}>
            <BarColumnChart
              type="Column"
              data={mockDataMonthly}
              dataKeys={["Sales"]}
              chartColors={["#8884d8"]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSpacing="large"
              showValues
              legendPosition="top"
              xDataKeyArr={mockDataMonthly.map(d => d.x)}
              viewtype="Grouped"
              tooltips
              showlegend={false}
              selectedRegions={["Sales"]}
              onLegendClick={() => {}}
            />
          </Box>
        </Box>

        {/* Product Comparison */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>Product Comparison</Typography>
          <Box sx={{ height: 400 }}>
            <BarColumnChart
              type="Column"
              data={mockDataProducts}
              dataKeys={["Q1", "Q2", "Q3", "Q4"]}
              chartColors={["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"]}
              margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              barSpacing="small"
              showValues={false}
              legendPosition="top"
              xDataKeyArr={mockDataProducts.map(d => d.x)}
              viewtype="Grouped"
              tooltips
              showlegend
              selectedRegions={["Q1", "Q2", "Q3", "Q4"]}
              onLegendClick={() => {}}
            />
          </Box>
        </Box>

        {/* Revenue Breakdown */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>Revenue Breakdown</Typography>
          <Box sx={{ height: 400 }}>
            <BarColumnChart
              type="Column"
              data={mockDataRegions}
              dataKeys={["Direct", "Online", "Partner"]}
              chartColors={["#2ecc71", "#3498db", "#e67e22"]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSpacing="medium"
              showValues
              legendPosition="bottom"
              xDataKeyArr={mockDataRegions.map(d => d.x)}
              viewtype="Stacked"
              tooltips
              showlegend
              selectedRegions={["Direct", "Online", "Partner"]}
              onLegendClick={() => {}}
            />
          </Box>
        </Box>

      </Stack>
    </Box>
  ),
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    type: "Bar",
    data: mockData,
    dataKeys: ["Sales", "Revenue", "Profit"],
    chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    barSpacing: "medium",
    showValues: false,
    legendPosition: "top",
    xAxisConfig: {},
    yAxisConfig: {},
    numberFormat: "0,0",
    xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
    tooltips: true,
    showlegend: true,
    viewtype: "Grouped",
    legendtype: "classic",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["Bar", "Column"],
    },
    viewtype: {
      control: { type: "select" },
      options: ["Grouped", "Stacked"],
    },
    showValues: { control: "boolean" },
    tooltips: { control: "boolean" },
    showlegend: { control: "boolean" },
    barSpacing: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};