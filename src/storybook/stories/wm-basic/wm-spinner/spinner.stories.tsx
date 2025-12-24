import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import SpinnerDefaultExport from "../../../../components/basic/spinner/index";
import { animationNames } from "../../constants/animationsConstants";

const meta: Meta<typeof SpinnerDefaultExport> = {
  title: "Basic/Spinner",
  component: SpinnerDefaultExport,
  argTypes: {
    caption: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["icon", "image", "default"],
    },
    show: { control: "boolean" },
    iconclass:{
      control:{
        type:"select"
      },
      options:["fa fa-spinner fa-spin", "fa fa-cog fa-spin", "fa fa-refresh fa-spin",],
    },
    iconsize: { control: "text" },
    image: { control: "text" },
    imagewidth: { control: "text" },
    imageheight: { control: "text" },
    animation: {
      control: { type: "select" },
      options: animationNames,
    },
    // hint: { control: "text" },
    // arialabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
  Variables: {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <SpinnerDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicSpinner",
    caption: "Loading...",
    listener: mockListener,
    show: true,
    type: "default",
  },
};

export const IconSpinner: Story = {
  render: Template,
  args: {
    name: "iconSpinner",
    listener: mockListener,
    show: true,
    type: "icon",
    iconsize: "22px",
    iconclass: "fa fa-circle-o-notch fa-spin",
  },
};

export const ImageSpinner: Story = {
  render: Template,
  args: {
    name: "ImageSpinner",
    caption: "",
    listener: mockListener,
    show: true,
    type: "image",
    image:"https://media2.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.gif?cid=6c09b952r7hflymkr24fukor7o0567zf293elcewo9s3tia2&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s",
    imagewidth: "50px",
    imageheight: "50px",
  },
};

// export const WithCaption: Story = {
//   render: Template,
//   args: {
//     name: "withCaption",
//     listener: mockListener,
//     show: true,
//     type: "icon",
//     caption: "Loading, please wait...",
//     iconclass: "fa fa-spinner fa-spin",
//   },
// };

// export const LargeIcon: Story = {
//   render: Template,
//   args: {
//     name: "largeIcon",
//     listener: mockListener,
//     show: true,
//     type: "icon",
//     caption: "Processing...",
//     iconclass: "fa fa-cog fa-spin",
//     iconsize: "48px",
//   },
// };

// export const SmallIcon: Story = {
//   render: Template,
//   args: {
//     name: "smallIcon",
//     listener: mockListener,
//     show: true,
//     type: "icon",
//     caption: "Loading",
//     iconclass: "fa fa-spinner fa-spin",
//     iconsize: "16px",
//   },
// };

// export const ImageSpinner: Story = {
//   render: Template,
//   args: {
//     name: "imageSpinner",
//     listener: mockListener,
//     show: true,
//     type: "image",
//     image: "https://via.placeholder.com/50/0000FF/FFFFFF?text=Loading",
//     imagewidth: "50px",
//     imageheight: "50px",
//     caption: "Loading data...",
//   },
// };

// export const DifferentIcons: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Different Spinner Icons:</Typography>
//           <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap", gap: 3 }}>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="spinner1"
//                 show={true}
//                 type="icon"
//                 iconclass="fa fa-spinner fa-spin"
//                 iconsize="32px"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 fa-spinner
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="spinner2"
//                 show={true}
//                 type="icon"
//                 iconclass="fa fa-circle-o-notch fa-spin"
//                 iconsize="32px"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 fa-circle-o-notch
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="spinner3"
//                 show={true}
//                 type="icon"
//                 iconclass="fa fa-cog fa-spin"
//                 iconsize="32px"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 fa-cog
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="spinner4"
//                 show={true}
//                 type="icon"
//                 iconclass="fa fa-refresh fa-spin"
//                 iconsize="32px"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 fa-refresh
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="spinner5"
//                 show={true}
//                 type="default"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 Material UI
//               </Typography>
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "differentIcons",
//     listener: mockListener,
//   },
// };

// export const DifferentSizes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Different Sizes:</Typography>
//           <Stack direction="row" spacing={4} alignItems="center" sx={{ flexWrap: "wrap", gap: 3 }}>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="small"
//                 show={true}
//                 type="icon"
//                 iconclass="fa fa-spinner fa-spin"
//                 iconsize="16px"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 Small (16px)
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="medium"
//                 show={true}
//                 type="icon"
//                 iconclass="fa fa-spinner fa-spin"
//                 iconsize="24px"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 Medium (24px)
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="large"
//                 show={true}
//                 type="icon"
//                 iconclass="fa fa-spinner fa-spin"
//                 iconsize="32px"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 Large (32px)
//               </Typography>
//             </Box>
//             <Box textAlign="center">
//               <SpinnerDefaultExport
//                 name="xlarge"
//                 show={true}
//                 type="icon"
//                 iconclass="fa fa-spinner fa-spin"
//                 iconsize="48px"
//                 listener={mockListener}
//               />
//               <Typography variant="caption" display="block" mt={1}>
//                 X-Large (48px)
//               </Typography>
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

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "customStyles",
//     listener: mockListener,
//     show: true,
//     type: "icon",
//     caption: "Custom Styled Spinner",
//     iconclass: "fa fa-spinner fa-spin",
//     iconsize: "32px",
//     styles: {
//       padding: "20px",
//       backgroundColor: "#f0f0f0",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//   },
// };

// export const LoadingStates: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Loading States:</Typography>
//           <Stack spacing={2}>
//             <Box display="flex" alignItems="center" gap={2}>
//               <SpinnerDefaultExport
//                 name="loading1"
//                 show={true}
//                 type="icon"
//                 caption="Initializing..."
//                 iconclass="fa fa-spinner fa-spin"
//                 listener={mockListener}
//               />
//             </Box>
//             <Box display="flex" alignItems="center" gap={2}>
//               <SpinnerDefaultExport
//                 name="loading2"
//                 show={true}
//                 type="icon"
//                 caption="Fetching data..."
//                 iconclass="fa fa-circle-o-notch fa-spin"
//                 listener={mockListener}
//               />
//             </Box>
//             <Box display="flex" alignItems="center" gap={2}>
//               <SpinnerDefaultExport
//                 name="loading3"
//                 show={true}
//                 type="icon"
//                 caption="Processing request..."
//                 iconclass="fa fa-cog fa-spin"
//                 listener={mockListener}
//               />
//             </Box>
//             <Box display="flex" alignItems="center" gap={2}>
//               <SpinnerDefaultExport
//                 name="loading4"
//                 show={true}
//                 type="icon"
//                 caption="Uploading files..."
//                 iconclass="fa fa-refresh fa-spin"
//                 listener={mockListener}
//               />
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "loadingStates",
//     listener: mockListener,
//   },
// };

// export const InteractiveToggle: Story = {
//   render: () => {
//     const [isLoading, setIsLoading] = useState(false);

//     const handleToggle = () => {
//       setIsLoading(!isLoading);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Interactive Spinner:</Typography>
//           <Button variant="contained" onClick={handleToggle}>
//             {isLoading ? "Hide Spinner" : "Show Spinner"}
//           </Button>
//           <SpinnerDefaultExport
//             name="interactive"
//             show={isLoading}
//             type="icon"
//             caption="Processing your request..."
//             iconclass="fa fa-spinner fa-spin"
//             iconsize="32px"
//             listener={mockListener}
//           />
//           {!isLoading && (
//             <Typography variant="body2" color="text.secondary">
//               Click the button to show the spinner
//             </Typography>
//           )}
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveToggle",
//     listener: mockListener,
//   },
// };

// export const SimulatedLoading: Story = {
//   render: () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [progress, setProgress] = useState(0);

//     const handleStart = () => {
//       setIsLoading(true);
//       setProgress(0);

//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             setIsLoading(false);
//             return 100;
//           }
//           return prev + 10;
//         });
//       }, 500);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Simulated Loading Process:</Typography>
//           <Button variant="contained" onClick={handleStart} disabled={isLoading}>
//             {isLoading ? "Loading..." : "Start Loading"}
//           </Button>
//           <SpinnerDefaultExport
//             name="simulated"
//             show={isLoading}
//             type="icon"
//             caption={`Loading... ${progress}%`}
//             iconclass="fa fa-spinner fa-spin"
//             iconsize="32px"
//             listener={mockListener}
//           />
//           {progress === 100 && !isLoading && (
//             <Typography variant="body1" color="success.main">
//               ✓ Loading Complete!
//             </Typography>
//           )}
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "simulatedLoading",
//     listener: mockListener,
//   },
// };

// export const OverlaySpinner: Story = {
//   render: () => {
//     const [showOverlay, setShowOverlay] = useState(false);

//     return (
//       <Box style={{ padding: 16, position: "relative", minHeight: "300px" }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Overlay Spinner:</Typography>
//           <Button variant="contained" onClick={() => setShowOverlay(!showOverlay)}>
//             {showOverlay ? "Hide Overlay" : "Show Overlay"}
//           </Button>
//           <Box p={3} border="1px solid #ddd" borderRadius={1}>
//             <Typography variant="body1">Content Area</Typography>
//             <Typography variant="body2" color="text.secondary">
//               This is the main content that gets covered by the spinner overlay.
//             </Typography>
//           </Box>
//           {showOverlay && (
//             <Box
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: "rgba(255, 255, 255, 0.9)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 zIndex: 1000,
//               }}
//             >
//               <SpinnerDefaultExport
//                 name="overlay"
//                 show={true}
//                 type="icon"
//                 caption="Loading overlay content..."
//                 iconclass="fa fa-spinner fa-spin"
//                 iconsize="48px"
//                 listener={mockListener}
//               />
//             </Box>
//           )}
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "overlaySpinner",
//     listener: mockListener,
//   },
// };

// export const InlineSpinners: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Inline Spinners:</Typography>
//           <Typography variant="body1">
//             Processing{" "}
//             <SpinnerDefaultExport
//               name="inline1"
//               show={true}
//               type="icon"
//               iconclass="fa fa-spinner fa-spin"
//               iconsize="16px"
//               listener={mockListener}
//               styles={{ display: "inline-flex", verticalAlign: "middle" }}
//             />{" "}
//             your request...
//           </Typography>
//           <Typography variant="body1">
//             Saving changes{" "}
//             <SpinnerDefaultExport
//               name="inline2"
//               show={true}
//               type="icon"
//               iconclass="fa fa-circle-o-notch fa-spin"
//               iconsize="14px"
//               listener={mockListener}
//               styles={{ display: "inline-flex", verticalAlign: "middle" }}
//             />
//           </Typography>
//           <Typography variant="body1">
//             Loading data{" "}
//             <SpinnerDefaultExport
//               name="inline3"
//               show={true}
//               type="default"
//               listener={mockListener}
//               styles={{ display: "inline-flex", verticalAlign: "middle" }}
//             />
//           </Typography>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "inlineSpinners",
//     listener: mockListener,
//   },
// };

// export const ButtonSpinners: Story = {
//   render: () => {
//     const [loading, setLoading] = useState<string | null>(null);

//     const handleClick = (buttonId: string) => {
//       setLoading(buttonId);
//       setTimeout(() => setLoading(null), 2000);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Button Spinners:</Typography>
//           <Stack direction="row" spacing={2}>
//             <Button
//               variant="contained"
//               onClick={() => handleClick("button1")}
//               disabled={loading === "button1"}
//               startIcon={
//                 loading === "button1" ? (
//                   <SpinnerDefaultExport
//                     name="btnSpinner1"
//                     show={true}
//                     type="icon"
//                     iconclass="fa fa-spinner fa-spin"
//                     iconsize="16px"
//                     listener={mockListener}
//                   />
//                 ) : undefined
//               }
//             >
//               {loading === "button1" ? "Saving..." : "Save"}
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={() => handleClick("button2")}
//               disabled={loading === "button2"}
//               startIcon={
//                 loading === "button2" ? (
//                   <SpinnerDefaultExport
//                     name="btnSpinner2"
//                     show={true}
//                     type="icon"
//                     iconclass="fa fa-circle-o-notch fa-spin"
//                     iconsize="16px"
//                     listener={mockListener}
//                   />
//                 ) : undefined
//               }
//             >
//               {loading === "button2" ? "Loading..." : "Load"}
//             </Button>
//             <Button
//               variant="text"
//               onClick={() => handleClick("button3")}
//               disabled={loading === "button3"}
//               startIcon={
//                 loading === "button3" ? (
//                   <SpinnerDefaultExport
//                     name="btnSpinner3"
//                     show={true}
//                     type="icon"
//                     iconclass="fa fa-refresh fa-spin"
//                     iconsize="16px"
//                     listener={mockListener}
//                   />
//                 ) : undefined
//               }
//             >
//               {loading === "button3" ? "Refreshing..." : "Refresh"}
//             </Button>
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "buttonSpinners",
//     listener: mockListener,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     show: true,
//     type: "icon",
//     caption: "Loading...",
//     iconclass: "fa fa-spinner fa-spin",
//     hint: "Please wait while we process your request",
//     arialabel: "Loading spinner",
//   },
// };

// export const HiddenSpinner: Story = {
//   render: Template,
//   args: {
//     name: "hidden",
//     listener: mockListener,
//     show: false,
//     type: "icon",
//     caption: "This spinner is hidden",
//     iconclass: "fa fa-spinner fa-spin",
//   },
// };
