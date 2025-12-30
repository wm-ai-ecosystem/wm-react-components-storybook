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
  parameters: {
    layout: "padded",
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

export const Basic: Story = {
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
};

// export const AreaChart: Story = {
//   render: Template,
//   args: {
//     type: "Area",
//     data: mockData,
//     dataKeys: ["Sales", "Revenue", "Profit"],
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     interpolation: "linear",
//     strokeWidth: 2,
//     pointSize: 4,
//     areaViewType: "none",
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const SmoothLine: Story = {
//   render: Template,
//   args: {
//     type: "Line",
//     data: mockData,
//     dataKeys: ["Sales", "Revenue", "Profit"],
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     interpolation: "cardinal",
//     strokeWidth: 2,
//     pointSize: 4,
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const StepLine: Story = {
//   render: Template,
//   args: {
//     type: "Line",
//     data: mockData,
//     dataKeys: ["Sales", "Revenue", "Profit"],
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     interpolation: "step",
//     strokeWidth: 2,
//     pointSize: 4,
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const StackedArea: Story = {
//   render: Template,
//   args: {
//     type: "Area",
//     data: mockData,
//     dataKeys: ["Sales", "Revenue", "Profit"],
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     interpolation: "linear",
//     strokeWidth: 2,
//     pointSize: 4,
//     areaViewType: "none",
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const ThickLine: Story = {
//   render: Template,
//   args: {
//     type: "Line",
//     data: mockData,
//     dataKeys: ["Sales", "Revenue", "Profit"],
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     interpolation: "linear",
//     strokeWidth: 4,
//     pointSize: 6,
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const LargePoints: Story = {
//   render: Template,
//   args: {
//     type: "Line",
//     data: mockData,
//     dataKeys: ["Sales", "Revenue", "Profit"],
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     interpolation: "linear",
//     strokeWidth: 2,
//     pointSize: 8,
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const SingleSeries: Story = {
//   render: Template,
//   args: {
//     type: "Line",
//     data: mockData,
//     dataKeys: ["Sales"],
//     chartColors: ["#8884d8"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: false,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     interpolation: "linear",
//     strokeWidth: 3,
//     pointSize: 5,
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const CustomColors: Story = {
//   render: Template,
//   args: {
//     type: "Line",
//     data: mockData,
//     dataKeys: ["Sales", "Revenue", "Profit"],
//     chartColors: ["#e74c3c", "#3498db", "#2ecc71"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "bottom",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     interpolation: "cardinal",
//     strokeWidth: 2,
//     pointSize: 4,
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const InteractiveLegend: Story = {
//   render: () => {
//     const [selectedRegions, setSelectedRegions] = useState(["Sales", "Revenue", "Profit"]);
//     const [clickLog, setClickLog] = useState<string[]>([]);

//     const handleLegendClick = (region: string) => {
//       setSelectedRegions((prev) =>
//         prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
//       );
//       addLog(`Legend clicked: ${region}`);
//     };

//     const handleChartClick = (data: any) => {
//       addLog(`Chart clicked: ${data.activeLabel || "unknown"}`);
//     };

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setClickLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Box style={{ width: "100%", height: "400px" }}>
//             <LineAreaChart
//               type="Line"
//               data={mockData}
//               dataKeys={["Sales", "Revenue", "Profit"]}
//               selectedRegions={selectedRegions}
//               chartColors={["#8884d8", "#82ca9d", "#ffc658"]}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               showLegend={true}
//               legendPosition="top"
//               xAxisConfig={{ dataKey: "x" }}
//               yAxisConfig={{}}
//               numberFormat="0,0"
//               xDataKeyArr={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
//               interpolation="linear"
//               strokeWidth={2}
//               pointSize={4}
//               onChartClick={handleChartClick}
//               onLegendClick={handleLegendClick}
//               tooltips={true}
//             />
//           </Box>

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Event Log:
//             </Typography>
//             <Typography variant="body2" sx={{ mb: 1 }}>
//               Active Series: {selectedRegions.join(", ")}
//             </Typography>
//             {clickLog.length === 0 ? (
//               <Typography variant="body2">Click chart or legend to see events</Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {clickLog.map((log, index) => (
//                   <Typography key={index} variant="body2" sx={{ fontFamily: "monospace" }}>
//                     {log}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const StockPrices: Story = {
//   render: Template,
//   args: {
//     type: "Line",
//     data: [
//       { x: "9:00", AAPL: 150, GOOGL: 2800, MSFT: 300 },
//       { x: "10:00", AAPL: 152, GOOGL: 2820, MSFT: 302 },
//       { x: "11:00", AAPL: 148, GOOGL: 2790, MSFT: 298 },
//       { x: "12:00", AAPL: 151, GOOGL: 2810, MSFT: 301 },
//       { x: "13:00", AAPL: 153, GOOGL: 2830, MSFT: 304 },
//       { x: "14:00", AAPL: 155, GOOGL: 2850, MSFT: 306 },
//     ],
//     dataKeys: ["AAPL", "GOOGL", "MSFT"],
//     chartColors: ["#3498db", "#e74c3c", "#2ecc71"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
//     interpolation: "cardinal",
//     strokeWidth: 2,
//     pointSize: 4,
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const WebsiteTraffic: Story = {
//   render: Template,
//   args: {
//     type: "Area",
//     data: [
//       { x: "Mon", Visitors: 1200, PageViews: 3500, Conversions: 250 },
//       { x: "Tue", Visitors: 1800, PageViews: 4200, Conversions: 320 },
//       { x: "Wed", Visitors: 1500, PageViews: 3800, Conversions: 280 },
//       { x: "Thu", Visitors: 2200, PageViews: 5100, Conversions: 400 },
//       { x: "Fri", Visitors: 2500, PageViews: 5800, Conversions: 450 },
//       { x: "Sat", Visitors: 1800, PageViews: 4000, Conversions: 300 },
//       { x: "Sun", Visitors: 1400, PageViews: 3200, Conversions: 240 },
//     ],
//     dataKeys: ["Visitors", "PageViews", "Conversions"],
//     chartColors: ["#3498db", "#9b59b6", "#2ecc71"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     interpolation: "cardinal",
//     strokeWidth: 2,
//     pointSize: 4,
//     areaViewType: "none",
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const TemperatureTrend: Story = {
//   render: Template,
//   args: {
//     type: "Line",
//     data: [
//       { x: "00:00", Temp: 20 },
//       { x: "04:00", Temp: 18 },
//       { x: "08:00", Temp: 22 },
//       { x: "12:00", Temp: 28 },
//       { x: "16:00", Temp: 30 },
//       { x: "20:00", Temp: 25 },
//       { x: "23:59", Temp: 21 },
//     ],
//     dataKeys: ["Temp"],
//     chartColors: ["#e74c3c"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: false,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: { label: { value: "Temperature (°C)", angle: -90, position: "insideLeft" } },
//     numberFormat: "0",
//     xDataKeyArr: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
//     interpolation: "cardinal",
//     strokeWidth: 3,
//     pointSize: 5,
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };

// export const SalesComparison: Story = {
//   render: Template,
//   args: {
//     type: "Area",
//     data: [
//       { x: "Q1", "2023": 4000, "2024": 5000, "2025": 6000 },
//       { x: "Q2", "2023": 4500, "2024": 5500, "2025": 6500 },
//       { x: "Q3", "2023": 5000, "2024": 6000, "2025": 7000 },
//       { x: "Q4", "2023": 5500, "2024": 6500, "2025": 7500 },
//     ],
//     dataKeys: ["2023", "2024", "2025"],
//     chartColors: ["#95a5a6", "#3498db", "#2ecc71"],
//     margin: { top: 20, right: 30, left: 20, bottom: 5 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { dataKey: "x" },
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1", "Q2", "Q3", "Q4"],
//     interpolation: "linear",
//     strokeWidth: 2,
//     pointSize: 5,
//     areaViewType: "none",
//     onChartClick: (data: any, event: any) => console.log("Chart clicked:", data),
//     tooltips: true,
//   },
// };
