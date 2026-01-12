import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import ProgressBarDefaultExport from "../../../../components/basic/progress-bar/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import progressBarTokensData from "../../../../designTokens/components/progress-bar/progress-bar.json";

const meta: Meta<typeof ProgressBarDefaultExport> = {
  title: "Basic/ProgressBar",
  component: ProgressBarDefaultExport,
  // argTypes: {
  //   datavalue: { control: "number" },
  //   minvalue: { control: "number" },
  //   maxvalue: { control: "number" },
  //   type: {
  //     control: { type: "select" },
  //     options: [
  //       "default",
  //       "default-striped",
  //       "success",
  //       "success-striped",
  //       "info",
  //       "info-striped",
  //       "warning",
  //       "warning-striped",
  //       "danger",
  //       "danger-striped",
  //     ],
  //   },
  //   captionplacement: {
  //     control: { type: "radio" },
  //     options: ["hidden", "inside"],
  //   },
  //   // displayformat: { control: "text" },
  //   // hint: { control: "text" },
  //   // arialabel: { control: "text" },
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
};

const Template = (args: any) => (
  <Box style={{ padding: 16, width: '100%', maxWidth: 200 }}>
    <Box style={{ width: '100%' }}>
      <ProgressBarDefaultExport {...args} listener={mockListener} />
    </Box>
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
    name:"docsProgressBar",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const progressBars = [
      { name: "allDefault", label: "Default (30%)", value: 30, type: "default" },
      { name: "allDefaultStriped", label: "Default Striped (40%)", value: 40, type: "default-striped" },
      { name: "allSuccess", label: "Success (75%)", value: 75, type: "success" },
      { name: "allSuccessStriped", label: "Success Striped (70%)", value: 70, type: "success-striped" },
      { name: "allInfo", label: "Info (50%)", value: 50, type: "info" },
      { name: "allInfoStriped", label: "Info Striped (55%)", value: 55, type: "info-striped" },
      { name: "allWarning", label: "Warning (60%)", value: 60, type: "warning" },
      { name: "allWarningStriped", label: "Warning Striped (65%)", value: 65, type: "warning-striped" },
      { name: "allDanger", label: "Danger (85%)", value: 85, type: "danger" },
      { name: "allDangerStriped", label: "Danger Striped (90%)", value: 90, type: "danger-striped" },
    ];

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>Progress Bar Showcase</Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 3,
            }}
          >
            {progressBars.map((bar, index) => (
              <Box key={index}>
                <Typography variant="caption" display="block" mb={1}>
                  {bar.label}
                </Typography>
                <ProgressBarDefaultExport
                  name={bar.name}
                  datavalue={bar.value}
                  type={bar.type}
                  listener={mockListener}
                />
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcase",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicProgressBar",
    listener: mockListener,
    datavalue: 30,
    type: "default",
    minvalue: 0,
    maxvalue: 100,
    captionplacement: "inside",
  },
  argTypes: {
    datavalue: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    type: {
      control: { type: "select" },
      options: [
        "default",
        "default-striped",
        "success",
        "success-striped",
        "info",
        "info-striped",
        "warning",
        "warning-striped",
        "danger",
        "danger-striped",
      ],
    },
    captionplacement: {
      control: { type: "radio" },
      options: ["hidden", "inside"],
    },
  },
};

// DesignToken story commented out until progress-bar support is fully implemented
export const DesignToken: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "designTokenProgressBar",
    listener: mockListener,
    datavalue: 30,
    type: "default",
    minvalue: 0,
    maxvalue: 100,
    captionplacement: "inside",
    "data-design-token-target": true,
  },
  argTypes: {
    datavalue: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    type: {
      control: { type: "select" },
      options: [
        "default",
        "success",
        "info",
        "warning",
        "danger",
      ],
    },
    captionplacement: {
      control: { type: "radio" },
      options: ["hidden", "inside"],
    },
     "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: progressBarTokensData,
      componentKey: "progress-bar",
      extractCSSVariablesAtRuntime: true,
      propToVariantMap: {
        propName: "type",
        mapping: {
          default: "progress-bar-default",
          success: "progress-bar-success",
          info: "progress-bar-info",
          warning: "progress-bar-warning",
          danger: "progress-bar-danger"
        }
      }
    },
    layout: 'fullscreen',
  },
};


// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "progressBar1",
//     listener: mockListener,
//     datavalue: 30,
//     type: "default",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const Success: Story = {
//   render: Template,
//   args: {
//     name: "successProgress",
//     listener: mockListener,
//     datavalue: 75,
//     type: "success",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const Info: Story = {
//   render: Template,
//   args: {
//     name: "infoProgress",
//     listener: mockListener,
//     datavalue: 50,
//     type: "info",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const Warning: Story = {
//   render: Template,
//   args: {
//     name: "warningProgress",
//     listener: mockListener,
//     datavalue: 60,
//     type: "warning",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const Danger: Story = {
//   render: Template,
//   args: {
//     name: "dangerProgress",
//     listener: mockListener,
//     datavalue: 85,
//     type: "danger",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const DefaultStriped: Story = {
//   render: Template,
//   args: {
//     name: "defaultStriped",
//     listener: mockListener,
//     datavalue: 40,
//     type: "default-striped",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const SuccessStriped: Story = {
//   render: Template,
//   args: {
//     name: "successStriped",
//     listener: mockListener,
//     datavalue: 70,
//     type: "success-striped",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const InfoStriped: Story = {
//   render: Template,
//   args: {
//     name: "infoStriped",
//     listener: mockListener,
//     datavalue: 55,
//     type: "info-striped",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const WarningStriped: Story = {
//   render: Template,
//   args: {
//     name: "warningStriped",
//     listener: mockListener,
//     datavalue: 65,
//     type: "warning-striped",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const DangerStriped: Story = {
//   render: Template,
//   args: {
//     name: "dangerStriped",
//     listener: mockListener,
//     datavalue: 90,
//     type: "danger-striped",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const WithInsideCaption: Story = {
//   render: Template,
//   args: {
//     name: "insideCaption",
//     listener: mockListener,
//     datavalue: 45,
//     type: "info",
//     captionplacement: "inside",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const ZeroPercent: Story = {
//   render: Template,
//   args: {
//     name: "zeroProgress",
//     listener: mockListener,
//     datavalue: 0,
//     type: "default",
//     captionplacement: "inside",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const FiftyPercent: Story = {
//   render: Template,
//   args: {
//     name: "fiftyProgress",
//     listener: mockListener,
//     datavalue: 50,
//     type: "info",
//     captionplacement: "inside",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const HundredPercent: Story = {
//   render: Template,
//   args: {
//     name: "hundredProgress",
//     listener: mockListener,
//     datavalue: 100,
//     type: "success",
//     captionplacement: "inside",
//     minvalue: 0,
//     maxvalue: 100,
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

// export const CustomDisplayFormat: Story = {
//   render: Template,
//   args: {
//     name: "customFormat",
//     listener: mockListener,
//     datavalue: 66.6667,
//     type: "info",
//     captionplacement: "inside",
//     displayformat: "9.99%",
//     minvalue: 0,
//     maxvalue: 100,
//   },
// };

// export const DifferentSizes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Different Sizes:</Typography>
//           <Stack spacing={2}>
//             <Box>
//               <Typography variant="caption" display="block" mb={1}>
//                 Small (Height: 10px)
//               </Typography>
//               <ProgressBarDefaultExport
//                 name="smallSize"
//                 datavalue={60}
//                 type="success"
//                 listener={mockListener}
//                 styles={{ height: "10px" }}
//               />
//             </Box>
//             <Box>
//               <Typography variant="caption" display="block" mb={1}>
//                 Medium (Height: 20px)
//               </Typography>
//               <ProgressBarDefaultExport
//                 name="mediumSize"
//                 datavalue={60}
//                 type="info"
//                 listener={mockListener}
//                 styles={{ height: "20px" }}
//               />
//             </Box>
//             <Box>
//               <Typography variant="caption" display="block" mb={1}>
//                 Large (Height: 30px)
//               </Typography>
//               <ProgressBarDefaultExport
//                 name="largeSize"
//                 datavalue={60}
//                 type="warning"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ height: "30px" }}
//               />
//             </Box>
//             <Box>
//               <Typography variant="caption" display="block" mb={1}>
//                 Extra Large (Height: 40px)
//               </Typography>
//               <ProgressBarDefaultExport
//                 name="xlargeSize"
//                 datavalue={60}
//                 type="danger"
//                 captionplacement="inside"
//                 listener={mockListener}
//                 styles={{ height: "40px", fontSize: "18px" }}
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
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Animated Progress Bar:</Typography>
//           <ProgressBarDefaultExport
//             name="animatedProgress"
//             datavalue={progress}
//             type="success-striped"
//             captionplacement="inside"
//             listener={mockListener}
//           />
//           <Stack direction="row" spacing={2}>
//             <Button variant="contained" onClick={handleStart} disabled={isRunning}>
//               Start
//             </Button>
//             <Button variant="outlined" onClick={handleReset}>
//               Reset
//             </Button>
//           </Stack>
//           <Typography variant="body2">Progress: {progress}%</Typography>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "animatedProgress",
//     listener: mockListener,
//   },
// };

// export const FileUploadSimulation: Story = {
//   render: () => {
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [isUploading, setIsUploading] = useState(false);

//     const simulateUpload = () => {
//       setUploadProgress(0);
//       setIsUploading(true);

//       const interval = setInterval(() => {
//         setUploadProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             setIsUploading(false);
//             return 100;
//           }
//           return prev + Math.random() * 10;
//         });
//       }, 200);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">File Upload Progress:</Typography>
//           <Box>
//             <Typography variant="body2" mb={1}>
//               {isUploading ? "Uploading..." : uploadProgress === 100 ? "Upload Complete!" : "Ready to upload"}
//             </Typography>
//             <ProgressBarDefaultExport
//               name="uploadProgress"
//               datavalue={uploadProgress}
//               type={uploadProgress === 100 ? "success" : "info-striped"}
//               captionplacement="inside"
//               listener={mockListener}
//             />
//           </Box>
//           <Button variant="contained" onClick={simulateUpload} disabled={isUploading}>
//             {isUploading ? "Uploading..." : "Start Upload"}
//           </Button>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "fileUpload",
//     listener: mockListener,
//   },
// };

// export const ProgressStages: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Progress Stages:</Typography>
//           <Stack spacing={2}>
//             <Box>
//               <Typography variant="body2" mb={1}>
//                 Starting (0-20%) - Danger
//               </Typography>
//               <ProgressBarDefaultExport
//                 name="stage1"
//                 datavalue={15}
//                 type="danger"
//                 captionplacement="inside"
//                 listener={mockListener}
//               />
//             </Box>
//             <Box>
//               <Typography variant="body2" mb={1}>
//                 In Progress (20-50%) - Warning
//               </Typography>
//               <ProgressBarDefaultExport
//                 name="stage2"
//                 datavalue={35}
//                 type="warning"
//                 captionplacement="inside"
//                 listener={mockListener}
//               />
//             </Box>
//             <Box>
//               <Typography variant="body2" mb={1}>
//                 Almost There (50-80%) - Info
//               </Typography>
//               <ProgressBarDefaultExport
//                 name="stage3"
//                 datavalue={65}
//                 type="info"
//                 captionplacement="inside"
//                 listener={mockListener}
//               />
//             </Box>
//             <Box>
//               <Typography variant="body2" mb={1}>
//                 Nearly Complete (80-100%) - Success
//               </Typography>
//               <ProgressBarDefaultExport
//                 name="stage4"
//                 datavalue={95}
//                 type="success"
//                 captionplacement="inside"
//                 listener={mockListener}
//               />
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "progressStages",
//     listener: mockListener,
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
//     hint: "Task is 70% complete",
//     arialabel: "Task completion progress",
//   },
// };
