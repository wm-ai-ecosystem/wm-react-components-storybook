import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import ProgressCircleDefaultExport from "../../../../components/basic/progress-circle/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import progressCircleTokensData from "../../../../designTokens/components/progress-circle/progress-circle.json";

const meta: Meta<typeof ProgressCircleDefaultExport> = {
  title: "Basic/ProgressCircle",
  component: ProgressCircleDefaultExport,
  // argTypes: {
  //   datavalue: { control: "number" },
  //   minvalue: { control: "number" },
  //   maxvalue: { control: "number" },
  //   type: {
  //     control: { type: "select" },
  //     options: ["default", "success", "info", "warning", "danger"],
  //   },
  //   captionplacement: {
  //     control: { type: "radio" },
  //     options: ["hidden", "inside"],
  //   },
  //   // displayformat: { control: "text" },
  //   title: { control: "text" },
  //   subtitle: { control: "text" },
  //   hint: { control: "text" },
  //   // arialabel: { control: "text" },
  //   // tabindex: { control: "number" },
  // },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
  onChange: () => {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <ProgressCircleDefaultExport {...args} listener={mockListener} />
  </Box>
);

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
    name:"docsProgressCircle",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>Progress Circle Showcase</Typography>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 3 }}>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Default (30%)
              </Typography>
              <ProgressCircleDefaultExport
                name="allDefault"
                datavalue={30}
                type="default"
                captionplacement="inside"
                listener={mockListener}
              />
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Success (75%)
              </Typography>
              <ProgressCircleDefaultExport
                name="allSuccess"
                datavalue={75}
                type="success"
                captionplacement="inside"
                listener={mockListener}
              />
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Info (50%)
              </Typography>
              <ProgressCircleDefaultExport
                name="allInfo"
                datavalue={50}
                type="info"
                captionplacement="inside"
                listener={mockListener}
              />
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Warning (60%)
              </Typography>
              <ProgressCircleDefaultExport
                name="allWarning"
                datavalue={60}
                type="warning"
                captionplacement="inside"
                listener={mockListener}
              />
            </Box>
            <Box textAlign="center">
              <Typography variant="caption" display="block" mb={1}>
                Danger (85%)
              </Typography>
              <ProgressCircleDefaultExport
                name="allDanger"
                datavalue={85}
                type="danger"
                captionplacement="inside"
                listener={mockListener}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "allTypes",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicprogressCircle",
    listener: mockListener,
    datavalue: 75,
    type: "default",
    minvalue: 0,
    maxvalue: 100,
    captionplacement: "inside",
    hint: "75% Complete",
    title: "",
    subtitle:""
  },
  argTypes: {
    datavalue: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    type: {
      control: { type: "select" },
      options: ["default", "success", "info", "warning", "danger"],
    },
    captionplacement: {
      control: { type: "radio" },
      options: ["hidden", "inside"],
    },
    // displayformat: { control: "text" },
    title: { control: "text" },
    subtitle: { control: "text" },
    hint: { control: "text" },
  },
};

export const DesignToken: Story = {
  tags: ['show-panel'],
  render: (args) => {
        // component can't spread data-design-token-target, so we apply it to a wrapper
        const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
    
        return (
          <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
            <ProgressCircleDefaultExport {...componentArgs} listener={mockListener} />
          </Box>
        );
      },
  args: {
    name: "designTokenProgressCircle",
    listener: mockListener,
    datavalue: 75,
    type: "default",
    minvalue: 0,
    maxvalue: 100,
    captionplacement: "inside",
    hint: "75% Complete",
    title: "",
    subtitle:"",
    "data-design-token-target": true,
  },
  argTypes: {
    datavalue: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    type: {
      control: { type: "select" },
      options: ["default", "success", "info", "warning", "danger"],
    },
    captionplacement: {
      control: { type: "radio" },
      options: ["hidden", "inside"],
    },
    // displayformat: { control: "text" },
    title: { control: "text" },
    subtitle: { control: "text" },
    hint: { control: "text" },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: progressCircleTokensData,
      componentKey: "progress-circle",
      extractCSSVariablesAtRuntime: true,
      propToVariantMap: {
        propName: "type",
        mapping: {
          default: "progress-circle-default",
          success: "progress-circle-success",
          info: "progress-circle-info",
          warning: "progress-circle-warning",
          danger: "progress-circle-danger"
        }
      }
    },
    layout: 'fullscreen',
  },
};

// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "progressCircle1",
//     listener: mockListener,
//     datavalue: 30,
//     type: "default",
//     minvalue: 0,
//     maxvalue: 100,
//     captionplacement: "inside",
//   },
// };

// export const Success: Story = {
//   render: Template,
//   args: {
//     name: "successCircle",
//     listener: mockListener,
//     datavalue: 75,
//     type: "success",
//     minvalue: 0,
//     maxvalue: 100,
//     captionplacement: "inside",
//   },
// };

// export const Info: Story = {
//   render: Template,
//   args: {
//     name: "infoCircle",
//     listener: mockListener,
//     datavalue: 50,
//     type: "info",
//     minvalue: 0,
//     maxvalue: 100,
//     captionplacement: "inside",
//   },
// };

// export const Warning: Story = {
//   render: Template,
//   args: {
//     name: "warningCircle",
//     listener: mockListener,
//     datavalue: 60,
//     type: "warning",
//     minvalue: 0,
//     maxvalue: 100,
//     captionplacement: "inside",
//   },
// };

// export const Danger: Story = {
//   render: Template,
//   args: {
//     name: "dangerCircle",
//     listener: mockListener,
//     datavalue: 85,
//     type: "danger",
//     minvalue: 0,
//     maxvalue: 100,
//     captionplacement: "inside",
//   },
// };

// export const ZeroPercent: Story = {
//   render: Template,
//   args: {
//     name: "zeroCircle",
//     listener: mockListener,
//     datavalue: 0,
//     type: "default",
//     captionplacement: "inside",
//   },
// };

// export const FiftyPercent: Story = {
//   render: Template,
//   args: {
//     name: "fiftyCircle",
//     listener: mockListener,
//     datavalue: 50,
//     type: "info",
//     captionplacement: "inside",
//   },
// };

// export const HundredPercent: Story = {
//   render: Template,
//   args: {
//     name: "hundredCircle",
//     listener: mockListener,
//     datavalue: 100,
//     type: "success",
//     captionplacement: "inside",
//   },
// };

// export const WithTitle: Story = {
//   render: Template,
//   args: {
//     name: "withTitle",
//     listener: mockListener,
//     datavalue: 65,
//     type: "info",
//     captionplacement: "inside",
//     title: "Loading",
//   },
// };

// export const WithTitleAndSubtitle: Story = {
//   render: Template,
//   args: {
//     name: "withTitleSubtitle",
//     listener: mockListener,
//     datavalue: 75,
//     type: "success",
//     captionplacement: "inside",
//     title: "Complete",
//     subtitle: "75%",
//   },
// };

// export const HiddenCaption: Story = {
//   render: Template,
//   args: {
//     name: "hiddenCaption",
//     listener: mockListener,
//     datavalue: 60,
//     type: "warning",
//     captionplacement: "hidden",
//   },
// };

// export const CustomDisplayFormat: Story = {
//   render: Template,
//   args: {
//     name: "customFormat",
//     listener: mockListener,
//     datavalue: 66.6667,
//     type: "info",
//     captionplacement: "inside",
//     displayformat: "9.99%",
//   },
// };

// export const SmallSize: Story = {
//   render: Template,
//   args: {
//     name: "smallCircle",
//     listener: mockListener,
//     datavalue: 70,
//     type: "success",
//     captionplacement: "inside",
//     styles: {
//       width: "80px",
//       height: "80px",
//     },
//   },
// };

// export const LargeSize: Story = {
//   render: Template,
//   args: {
//     name: "largeCircle",
//     listener: mockListener,
//     datavalue: 70,
//     type: "info",
//     captionplacement: "inside",
//     styles: {
//       width: "250px",
//       height: "250px",
//     },
//   },
// };

// export const DifferentSizes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Different Sizes:</Typography>
//           <Stack direction="row" spacing={3} alignItems="center" sx={{ flexWrap: "wrap", gap: 3 }}>
//             <Box textAlign="center">
//               <Typography variant="caption" display="block" mb={1}>
//                 Small (80px)
//               </Typography>
//               <ProgressCircleDefaultExport
//                 name="sizeSmall"
//                 datavalue={60}
//                 type="success"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ width: "80px", height: "80px" }}
//               />
//             </Box>
//             <Box textAlign="center">
//               <Typography variant="caption" display="block" mb={1}>
//                 Medium (150px)
//               </Typography>
//               <ProgressCircleDefaultExport
//                 name="sizeMedium"
//                 datavalue={60}
//                 type="info"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ width: "150px", height: "150px" }}
//               />
//             </Box>
//             <Box textAlign="center">
//               <Typography variant="caption" display="block" mb={1}>
//                 Large (250px)
//               </Typography>
//               <ProgressCircleDefaultExport
//                 name="sizeLarge"
//                 datavalue={60}
//                 type="warning"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ width: "250px", height: "250px" }}
//               />
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "differentSizes",
//     listener: mockListener,
//   },
// };

// export const AnimatedProgress: Story = {
//   render: () => {
//     const [progress, setProgress] = useState(0);
//     const [isRunning, setIsRunning] = useState(false);

//     useEffect(() => {
//       let interval: NodeJS.Timeout;
//       if (isRunning && progress < 100) {
//         interval = setInterval(() => {
//           setProgress((prev) => {
//             if (prev >= 100) {
//               setIsRunning(false);
//               return 100;
//             }
//             return prev + 1;
//           });
//         }, 50);
//       }
//       return () => clearInterval(interval);
//     }, [isRunning, progress]);

//     const handleStart = () => {
//       setProgress(0);
//       setIsRunning(true);
//     };

//     const handleReset = () => {
//       setProgress(0);
//       setIsRunning(false);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3} alignItems="center">
//           <Typography variant="subtitle1">Animated Progress Circle:</Typography>
//           <ProgressCircleDefaultExport
//             name="animatedCircle"
//             datavalue={progress}
//             type={progress === 100 ? "success" : "info"}
//             captionplacement="inside"
//             listener={mockListener}
//             styles={{ width: "200px", height: "200px" }}
//           />
//           <Stack direction="row" spacing={2}>
//             <Button variant="contained" onClick={handleStart} disabled={isRunning}>
//               Start
//             </Button>
//             <Button variant="outlined" onClick={handleReset}>
//               Reset
//             </Button>
//           </Stack>
//           <Typography variant="body2">
//             Status: {isRunning ? "Running..." : progress === 100 ? "Complete!" : "Ready"}
//           </Typography>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "animatedCircle",
//     listener: mockListener,
//   },
// };

// export const TaskProgress: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Task Progress Examples:</Typography>
//           <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 3 }}>
//             <Box textAlign="center">
//               <ProgressCircleDefaultExport
//                 name="task1"
//                 datavalue={25}
//                 type="danger"
//                 captionplacement="inside"
//                 title="Tasks"
//                 subtitle="Started"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 Just Started
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <ProgressCircleDefaultExport
//                 name="task2"
//                 datavalue={50}
//                 type="warning"
//                 captionplacement="inside"
//                 title="Tasks"
//                 subtitle="In Progress"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 Half Done
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <ProgressCircleDefaultExport
//                 name="task3"
//                 datavalue={75}
//                 type="info"
//                 captionplacement="inside"
//                 title="Tasks"
//                 subtitle="Almost There"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 Nearly Complete
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <ProgressCircleDefaultExport
//                 name="task4"
//                 datavalue={100}
//                 type="success"
//                 captionplacement="inside"
//                 title="Tasks"
//                 subtitle="Complete"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 Finished
//               </Typography>
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "taskProgress",
//     listener: mockListener,
//   },
// };

// export const Dashboard: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Dashboard Overview</Typography>
//           <Box
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//               gap: "24px",
//             }}
//           >
//             <Box textAlign="center" p={2} border="1px solid #e0e0e0" borderRadius="8px">
//               <Typography variant="subtitle2" mb={2}>
//                 CPU Usage
//               </Typography>
//               <ProgressCircleDefaultExport
//                 name="cpu"
//                 datavalue={45}
//                 type="info"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ width: "120px", height: "120px", margin: "0 auto" }}
//               />
//             </Box>
//             <Box textAlign="center" p={2} border="1px solid #e0e0e0" borderRadius="8px">
//               <Typography variant="subtitle2" mb={2}>
//                 Memory Usage
//               </Typography>
//               <ProgressCircleDefaultExport
//                 name="memory"
//                 datavalue={72}
//                 type="warning"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ width: "120px", height: "120px", margin: "0 auto" }}
//               />
//             </Box>
//             <Box textAlign="center" p={2} border="1px solid #e0e0e0" borderRadius="8px">
//               <Typography variant="subtitle2" mb={2}>
//                 Disk Usage
//               </Typography>
//               <ProgressCircleDefaultExport
//                 name="disk"
//                 datavalue={88}
//                 type="danger"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ width: "120px", height: "120px", margin: "0 auto" }}
//               />
//             </Box>
//             <Box textAlign="center" p={2} border="1px solid #e0e0e0" borderRadius="8px">
//               <Typography variant="subtitle2" mb={2}>
//                 Project Complete
//               </Typography>
//               <ProgressCircleDefaultExport
//                 name="project"
//                 datavalue={95}
//                 type="success"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ width: "120px", height: "120px", margin: "0 auto" }}
//               />
//             </Box>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "dashboard",
//     listener: mockListener,
//   },
// };

// export const CustomRange: Story = {
//   render: Template,
//   args: {
//     name: "customRange",
//     listener: mockListener,
//     datavalue: 150,
//     type: "success",
//     captionplacement: "inside",
//     minvalue: 0,
//     maxvalue: 200,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     datavalue: 70,
//     type: "success",
//     captionplacement: "inside",
//     hint: "Task completion is at 70%",
//     arialabel: "Task completion progress circle",
//   },
// };

// export const DownloadProgress: Story = {
//   render: () => {
//     const [downloadProgress, setDownloadProgress] = useState(0);
//     const [isDownloading, setIsDownloading] = useState(false);

//     const simulateDownload = () => {
//       setDownloadProgress(0);
//       setIsDownloading(true);

//       const interval = setInterval(() => {
//         setDownloadProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             setIsDownloading(false);
//             return 100;
//           }
//           return prev + Math.random() * 10;
//         });
//       }, 300);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3} alignItems="center">
//           <Typography variant="subtitle1">Download Progress:</Typography>
//           <ProgressCircleDefaultExport
//             name="download"
//             datavalue={downloadProgress}
//             type={downloadProgress === 100 ? "success" : "info"}
//             captionplacement="inside"
//             title={downloadProgress === 100 ? "Complete!" : "Downloading"}
//             listener={mockListener}
//             styles={{ width: "200px", height: "200px" }}
//           />
//           <Button variant="contained" onClick={simulateDownload} disabled={isDownloading}>
//             {isDownloading ? "Downloading..." : "Start Download"}
//           </Button>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "download",
//     listener: mockListener,
//   },
// };
