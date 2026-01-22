import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import { PieDonutChart } from "../../../../components/chart/components/pieDonutChart";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 200 },
  { name: "Product D", value: 278 },
  { name: "Product E", value: 189 },
];

const meta = {
  title: "Charts/Pie Donut Chart",
  component: PieDonutChart,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PieDonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [selectedRegions, setSelectedRegions] = useState(
    args.data.map((item: any) => item.name)
  );

  const handleLegendClick = (region: string) => {
    setSelectedRegions((prev: string[]) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  return (
    <Box style={{ width: "100%", height: "400px", padding: 16 }}>
      <PieDonutChart
        {...args}
        selectedRegions={selectedRegions}
        onLegendClick={handleLegendClick}
        shouldShowLegend={args.showLegend}
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
    type: "Pie" as const,
    data: mockData,
    dataKeys: [],
    selectedRegions: [],
    chartColors: [],
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
    showlabels: "hide" as const,
    labeltype: "key" as const,
    tooltips: false,
    legendPosition: "right" as const,
    showLegend: false,
    onLegendClick: () => {},
    onChartClick: () => {},
    shouldShowLegend: false,
    availableRegions: [],
    xDataKeyArr: [],
    ynumberformat: "",
    legendtype: "classic" as const,
    numberFormat: "",
  },
  argTypes: {
    type: { table: { disable: true } },
    data: { table: { disable: true } },
    dataKeys: { table: { disable: true } },
    selectedRegions: { table: { disable: true } },
    chartColors: { table: { disable: true } },
    margin: { table: { disable: true } },
    showlabels: { table: { disable: true } },
    labeltype: { table: { disable: true } },
    tooltips: { table: { disable: true } },
    legendPosition: { table: { disable: true } },
    showLegend: { table: { disable: true } },
    onLegendClick: { table: { disable: true } },
    onChartClick: { table: { disable: true } },
    shouldShowLegend: { table: { disable: true } },
    availableRegions: { table: { disable: true } },
    xDataKeyArr: { table: { disable: true } },
    ynumberformat: { table: { disable: true } },
    legendtype: { table: { disable: true } },
    numberFormat: { table: { disable: true } },
    donutratio: { table: { disable: true } },
    offsettop: { table: { disable: true } },
    offsetbottom: { table: { disable: true } },
    offsetleft: { table: { disable: true } },
    offsetright: { table: { disable: true } },
    centerlabel: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const defaultData = mockData;
    const budgetData = [
      { name: "Marketing", value: 35000 },
      { name: "Development", value: 50000 },
      { name: "Operations", value: 25000 },
      { name: "Sales", value: 40000 },
      { name: "Support", value: 20000 },
    ];

    const thinDonutRatio = 0.8;
    const thickDonutRatio = 0.3;

    const chartTypes: Array<"Pie" | "Donut"> = ["Donut"];
    const labelPositions: Array<"outside" | "inside" | "hide"> = ["outside", "inside", "hide"];

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{mb: 4}}>
          <Typography variant="h6" fontWeight={600} mb={4}>
            Pie / Donut Chart Showcase
          </Typography>
        </Box>
        <Stack spacing={6}>

          {/* Chart Type */}
          {chartTypes.map((type) => (
            <Box key={type}>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Chart Type: {type}
              </Typography>
              <Box sx={{ height: 400 }}>
                <PieDonutChart
                  type={type}
                  data={defaultData}
                  selectedRegions={defaultData.map((d) => d.name)}
                  chartColors={["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"]}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  showlabels="outside"
                  labeltype="percent"
                  tooltips
                  legendPosition="right"
                  showLegend
                  donutratio={type === "Donut" ? 0.6 : undefined}
                  onLegendClick={() => {}}
                  onChartClick={() => {}}
                  shouldShowLegend
                />
              </Box>
            </Box>
          ))}

          {/* Label Positions */}
          {labelPositions.map((position) => (
            <Box key={position}>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Label Position: {position}
              </Typography>
              <Box sx={{ height: 400 }}>
                <PieDonutChart
                  type="Pie"
                  data={defaultData}
                  selectedRegions={defaultData.map((d) => d.name)}
                  chartColors={["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"]}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  showlabels={position}
                  labeltype="percent"
                  tooltips
                  legendPosition="right"
                  showLegend
                  onLegendClick={() => {}}
                  onChartClick={() => {}}
                  shouldShowLegend
                />
              </Box>
            </Box>
          ))}

          {/* Thin Donut */}
          {/* <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Thin Donut
            </Typography>
            <Box sx={{ height: 400 }}>
              <PieDonutChart
                type="Donut"
                data={defaultData}
                selectedRegions={defaultData.map((d) => d.name)}
                chartColors={["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"]}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                showlabels="outside"
                labeltype="percent"
                tooltips
                legendPosition="right"
                showLegend
                donutratio={thinDonutRatio}
                onLegendClick={() => {}}
                onChartClick={() => {}}
                shouldShowLegend
              />
            </Box>
          </Box> */}

          {/* Thick Donut */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Thick Donut
            </Typography>
            <Box sx={{ height: 400 }}>
              <PieDonutChart
                type="Donut"
                data={defaultData}
                selectedRegions={defaultData.map((d) => d.name)}
                chartColors={["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"]}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                showlabels="outside"
                labeltype="percent"
                tooltips
                legendPosition="right"
                showLegend
                donutratio={thickDonutRatio}
                onLegendClick={() => {}}
                onChartClick={() => {}}
                shouldShowLegend
              />
            </Box>
          </Box>

          {/* Budget Allocation Example */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Budget Allocation
            </Typography>
            <Box sx={{ height: 400 }}>
              <PieDonutChart
                type="Pie"
                data={budgetData}
                selectedRegions={budgetData.map((d) => d.name)}
                chartColors={["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                showlabels="outside"
                labeltype="key-value"
                tooltips
                legendPosition="right"
                showLegend
                onLegendClick={() => {}}
                onChartClick={() => {}}
                shouldShowLegend
              />
            </Box>
          </Box>

        </Stack>
      </Box>
    );
  },
  args: {
    type: "Pie" as const,
    data: mockData,
    dataKeys: [],
    selectedRegions: [],
    chartColors: [],
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
    showlabels: "hide" as const,
    labeltype: "key" as const,
    tooltips: false,
    legendPosition: "right" as const,
    showLegend: false,
    onLegendClick: () => {},
    onChartClick: () => {},
    shouldShowLegend: false,
    availableRegions: [],
    xDataKeyArr: [],
    ynumberformat: "",
    legendtype: "classic" as const,
    numberFormat: "",
  },
  argTypes: {
    type: { table: { disable: true } },
    data: { table: { disable: true } },
    dataKeys: { table: { disable: true } },
    selectedRegions: { table: { disable: true } },
    chartColors: { table: { disable: true } },
    margin: { table: { disable: true } },
    showlabels: { table: { disable: true } },
    labeltype: { table: { disable: true } },
    tooltips: { table: { disable: true } },
    legendPosition: { table: { disable: true } },
    showLegend: { table: { disable: true } },
    onLegendClick: { table: { disable: true } },
    onChartClick: { table: { disable: true } },
    shouldShowLegend: { table: { disable: true } },
    availableRegions: { table: { disable: true } },
    xDataKeyArr: { table: { disable: true } },
    ynumberformat: { table: { disable: true } },
    legendtype: { table: { disable: true } },
    numberFormat: { table: { disable: true } },
    donutratio: { table: { disable: true } },
    offsettop: { table: { disable: true } },
    offsetbottom: { table: { disable: true } },
    offsetleft: { table: { disable: true } },
    offsetright: { table: { disable: true } },
    centerlabel: { table: { disable: true } },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    type: "Pie",
    data: mockData,
    chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
    margin: { top: 20, right: 20, left: 20, bottom: 20 },
    showlabels: "outside",
    labeltype: "percent",
    tooltips: true,
    legendPosition: "right",
    showLegend: true,
    onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
    numberFormat: "0,0",
    xDataKeyArr: [],
    ynumberformat: "0,0",
    legendtype: "classic",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["Pie", "Donut"],
    },
    showlabels: {
      control: { type: "select" },
      options: ["outside", "inside", "hide"],
    },
    labeltype: {
      control: { type: "select" },
      options: ["key", "value", "percent", "key-value"],
    },
    donutratio: { control: "select", options:["small", "medium", "large"] },
    tooltips: { control: "boolean" },
    showLegend: { control: "boolean" },
    onChartClick: {table: {disable : true}},
    dataKeys: {table: {disable:true}},
    selectedRegions: {table: {disable: true}},
    availableRegions: {table: {disable: true}},
    shouldShowLegend: {table: {disable: true}},
    onLegendClick: {table: {disable:true}},
    centerlabel:{table: {disable: true}}
  }
};