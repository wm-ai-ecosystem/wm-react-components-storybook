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
    donutratio: { control: "number" },
    tooltips: { control: "boolean" },
    showLegend: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
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
  parameters: {
    layout: 'fullscreen',
  },
};

export const Basic: Story = {
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
};

export const Showcase: StoryObj = {
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
  }
};


// export const DefaultDonut: Story = {
//   render: Template,
//   args: {
//     type: "Donut",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     donutratio: 0.6,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const DonutWithCenterLabel: Story = {
//   render: Template,
//   args: {
//     type: "Donut",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     donutratio: 0.6,
//     centerlabel: "Total Sales",
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const InsideLabels: Story = {
//   render: Template,
//   args: {
//     type: "Pie",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "inside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "bottom",
//     showLegend: true,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const NoLabels: Story = {
//   render: Template,
//   args: {
//     type: "Pie",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "hide",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const KeyLabels: Story = {
//   render: Template,
//   args: {
//     type: "Donut",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "key",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     donutratio: 0.6,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const ValueLabels: Story = {
//   render: Template,
//   args: {
//     type: "Pie",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "value",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const KeyValueLabels: Story = {
//   render: Template,
//   args: {
//     type: "Pie",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "key-value",
//     tooltips: true,
//     legendPosition: "bottom",
//     showLegend: true,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const ThinDonut: Story = {
//   render: Template,
//   args: {
//     type: "Donut",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     donutratio: 0.8,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const ThickDonut: Story = {
//   render: Template,
//   args: {
//     type: "Donut",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     donutratio: 0.3,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const CustomColors: Story = {
//   render: Template,
//   args: {
//     type: "Pie",
//     data: mockData,
//     chartColors: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const InteractiveLegend: Story = {
//   render: () => {
//     const [selectedRegions, setSelectedRegions] = useState(
//       mockData.map((item) => item.name)
//     );
//     const [clickLog, setClickLog] = useState<string[]>([]);

//     const handleLegendClick = (region: string) => {
//       setSelectedRegions((prev) =>
//         prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
//       );
//       addLog(`Legend clicked: ${region}`);
//     };

//     const handleChartClick = (data: any) => {
//       addLog(`Chart clicked: ${data.name}`);
//     };

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setClickLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Box style={{ width: "100%", height: "400px" }}>
//             <PieDonutChart
//               type="Donut"
//               data={mockData}
//               selectedRegions={selectedRegions}
//               chartColors={["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"]}
//               margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//               showlabels="outside"
//               labeltype="percent"
//               tooltips={true}
//               legendPosition="right"
//               showLegend={true}
//               donutratio={0.6}
//               onChartClick={handleChartClick}
//               onLegendClick={handleLegendClick}
//               shouldShowLegend={true}
//               numberFormat="0,0"
//               xDataKeyArr={[]}
//               ynumberformat="0,0"
//             />
//           </Box>

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Event Log:
//             </Typography>
//             <Typography variant="body2" sx={{ mb: 1 }}>
//               Active Segments: {selectedRegions.join(", ")}
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

// export const MarketShare: Story = {
//   render: Template,
//   args: {
//     type: "Donut",
//     data: [
//       { name: "Apple", value: 28 },
//       { name: "Samsung", value: 22 },
//       { name: "Huawei", value: 15 },
//       { name: "Xiaomi", value: 12 },
//       { name: "Others", value: 23 },
//     ],
//     chartColors: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#95a5a6"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "bottom",
//     showLegend: true,
//     donutratio: 0.5,
//     centerlabel: "Market Share",
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const BudgetAllocation: Story = {
//   render: Template,
//   args: {
//     type: "Pie",
//     data: [
//       { name: "Marketing", value: 35000 },
//       { name: "Development", value: 50000 },
//       { name: "Operations", value: 25000 },
//       { name: "Sales", value: 40000 },
//       { name: "Support", value: 20000 },
//     ],
//     chartColors: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "key-value",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "$0,0",
//     xDataKeyArr: [],
//     ynumberformat: "$0,0",
//   },
// };

// export const RevenueByRegion: Story = {
//   render: Template,
//   args: {
//     type: "Donut",
//     data: [
//       { name: "North America", value: 450 },
//       { name: "Europe", value: 380 },
//       { name: "Asia Pacific", value: 550 },
//       { name: "Latin America", value: 180 },
//       { name: "Middle East", value: 140 },
//     ],
//     chartColors: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "inside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "bottom",
//     showLegend: true,
//     donutratio: 0.6,
//     centerlabel: "Global Revenue",
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const SimpleDistribution: Story = {
//   render: Template,
//   args: {
//     type: "Pie",
//     data: [
//       { name: "Desktop", value: 60 },
//       { name: "Mobile", value: 30 },
//       { name: "Tablet", value: 10 },
//     ],
//     chartColors: ["#3498db", "#2ecc71", "#e74c3c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "percent",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: true,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };

// export const WithoutLegend: Story = {
//   render: Template,
//   args: {
//     type: "Donut",
//     data: mockData,
//     chartColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c"],
//     margin: { top: 20, right: 20, left: 20, bottom: 20 },
//     showlabels: "outside",
//     labeltype: "key-value",
//     tooltips: true,
//     legendPosition: "right",
//     showLegend: false,
//     donutratio: 0.6,
//     onChartClick: (data: any, index: number, event: any) => console.log("Clicked:", data),
//     numberFormat: "0,0",
//     xDataKeyArr: [],
//     ynumberformat: "0,0",
//   },
// };
