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
  argTypes: {
    shape: {
      control: { type: "select" },
      options: ["circle", "diamond", "square", "triangle", "random"],
    },
    tooltips: { control: "boolean" },
    showLegend: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
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
  parameters: {
    layout: 'fullscreen',
  },
};

export const Basic: Story = {
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
    onChartClick: (data: any, index: number, event: any) =>
      console.log("Bubble clicked:", data, index),
    tooltips: true,
    shape: "circle",
  },
};

export const Showcase: StoryObj = {
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
  }
};


// export const CircleShape: Story = {
//   render: Template,
//   args: {
//     data: mockData,
//     dataKeys: ["Product_A", "Product_B"],
//     chartColors: ["#8884d8", "#82ca9d"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: { label: { value: "Time Period", position: "insideBottom", offset: -10 } },
//     yAxisConfig: { label: { value: "Performance", angle: -90, position: "insideLeft" } },
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1", "Q2", "Q3", "Q4", "Q5"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "circle",
//   },
// };

// export const DiamondShape: Story = {
//   render: Template,
//   args: {
//     data: mockData,
//     dataKeys: ["Product_A", "Product_B"],
//     chartColors: ["#e74c3c", "#3498db"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: {},
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1", "Q2", "Q3", "Q4", "Q5"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "diamond",
//   },
// };

// export const SquareShape: Story = {
//   render: Template,
//   args: {
//     data: mockData,
//     dataKeys: ["Product_A", "Product_B"],
//     chartColors: ["#f39c12", "#2ecc71"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: {},
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1", "Q2", "Q3", "Q4", "Q5"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "square",
//   },
// };

// export const TriangleShape: Story = {
//   render: Template,
//   args: {
//     data: mockData,
//     dataKeys: ["Product_A", "Product_B"],
//     chartColors: ["#9b59b6", "#e67e22"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: {},
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1", "Q2", "Q3", "Q4", "Q5"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "triangle",
//   },
// };

// export const RandomShapes: Story = {
//   render: Template,
//   args: {
//     data: mockData,
//     dataKeys: ["Product_A", "Product_B"],
//     chartColors: ["#8884d8", "#82ca9d"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: {},
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1", "Q2", "Q3", "Q4", "Q5"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "random",
//   },
// };

// export const SingleSeries: Story = {
//   render: Template,
//   args: {
//     data: mockData,
//     dataKeys: ["Product_A"],
//     chartColors: ["#8884d8"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: false,
//     legendPosition: "top",
//     xAxisConfig: {},
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1", "Q2", "Q3", "Q4", "Q5"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "circle",
//   },
// };

// export const MultiSeries: Story = {
//   render: Template,
//   args: {
//     data: [
//       {
//         x: 0,
//         Series_A: 100,
//         Series_A_size: 400,
//         Series_B: 200,
//         Series_B_size: 600,
//         Series_C: 150,
//         Series_C_size: 500,
//       },
//       {
//         x: 1,
//         Series_A: 120,
//         Series_A_size: 500,
//         Series_B: 180,
//         Series_B_size: 400,
//         Series_C: 160,
//         Series_C_size: 450,
//       },
//       {
//         x: 2,
//         Series_A: 170,
//         Series_A_size: 450,
//         Series_B: 150,
//         Series_B_size: 550,
//         Series_C: 140,
//         Series_C_size: 400,
//       },
//       {
//         x: 3,
//         Series_A: 140,
//         Series_A_size: 350,
//         Series_B: 220,
//         Series_B_size: 650,
//         Series_C: 180,
//         Series_C_size: 550,
//       },
//     ],
//     dataKeys: ["Series_A", "Series_B", "Series_C"],
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: {},
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "circle",
//   },
// };

// export const InteractiveLegend: Story = {
//   render: () => {
//     const [selectedRegions, setSelectedRegions] = useState(["Product_A", "Product_B"]);
//     const [clickLog, setClickLog] = useState<string[]>([]);

//     const handleLegendClick = (region: string) => {
//       setSelectedRegions((prev) =>
//         prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
//       );
//       addLog(`Legend clicked: ${region}`);
//     };

//     const handleChartClick = (data: any, index: number) => {
//       addLog(`Bubble clicked: ${data.seriesName} at ${data.x}`);
//     };

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setClickLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Box style={{ width: "100%", height: "400px" }}>
//             <BubbleChart
//               data={mockData}
//               dataKeys={["Product_A", "Product_B"]}
//               selectedRegions={selectedRegions}
//               chartColors={["#8884d8", "#82ca9d"]}
//               margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//               showLegend={true}
//               legendPosition="top"
//               xAxisConfig={{}}
//               yAxisConfig={{}}
//               numberFormat="0,0"
//               xDataKeyArr={["Q1", "Q2", "Q3", "Q4", "Q5"]}
//               onChartClick={handleChartClick}
//               onLegendClick={handleLegendClick}
//               tooltips={true}
//               shape="circle"
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

// export const MarketAnalysis: Story = {
//   render: Template,
//   args: {
//     data: [
//       { x: 0, Tech: 150, Tech_size: 800, Finance: 120, Finance_size: 650 },
//       { x: 1, Tech: 180, Tech_size: 900, Finance: 140, Finance_size: 700 },
//       { x: 2, Tech: 200, Tech_size: 1000, Finance: 160, Finance_size: 750 },
//       { x: 3, Tech: 220, Tech_size: 1100, Finance: 180, Finance_size: 800 },
//       { x: 4, Tech: 250, Tech_size: 1200, Finance: 200, Finance_size: 850 },
//     ],
//     dataKeys: ["Tech", "Finance"],
//     chartColors: ["#3498db", "#2ecc71"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: true,
//     legendPosition: "bottom",
//     xAxisConfig: { label: { value: "Quarter", position: "insideBottom", offset: -10 } },
//     yAxisConfig: {
//       label: { value: "Market Share (%)", angle: -90, position: "insideLeft" },
//     },
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "circle",
//   },
// };

// export const CustomerSegmentation: Story = {
//   render: Template,
//   args: {
//     data: [
//       {
//         x: 0,
//         Premium: 300,
//         Premium_size: 500,
//         Standard: 200,
//         Standard_size: 800,
//         Basic: 100,
//         Basic_size: 1200,
//       },
//       {
//         x: 1,
//         Premium: 320,
//         Premium_size: 520,
//         Standard: 220,
//         Standard_size: 850,
//         Basic: 110,
//         Basic_size: 1250,
//       },
//       {
//         x: 2,
//         Premium: 350,
//         Premium_size: 550,
//         Standard: 240,
//         Standard_size: 900,
//         Basic: 120,
//         Basic_size: 1300,
//       },
//       {
//         x: 3,
//         Premium: 380,
//         Premium_size: 600,
//         Standard: 260,
//         Standard_size: 950,
//         Basic: 130,
//         Basic_size: 1350,
//       },
//     ],
//     dataKeys: ["Premium", "Standard", "Basic"],
//     chartColors: ["#e74c3c", "#f39c12", "#95a5a6"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: true,
//     legendPosition: "top",
//     xAxisConfig: {},
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Jan", "Feb", "Mar", "Apr"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "diamond",
//   },
// };

// export const WithoutLegend: Story = {
//   render: Template,
//   args: {
//     data: mockData,
//     dataKeys: ["Product_A", "Product_B"],
//     chartColors: ["#8884d8", "#82ca9d"],
//     margin: { top: 20, right: 30, left: 20, bottom: 20 },
//     showLegend: false,
//     legendPosition: "top",
//     xAxisConfig: {},
//     yAxisConfig: {},
//     numberFormat: "0,0",
//     xDataKeyArr: ["Q1", "Q2", "Q3", "Q4", "Q5"],
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     tooltips: true,
//     shape: "circle",
//   },
// };
