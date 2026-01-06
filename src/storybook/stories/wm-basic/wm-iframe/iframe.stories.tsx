import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import IframeDefaultExport from "../../../../components/basic/iframe/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof IframeDefaultExport> = {
  title: "Basic/Iframe",
  component: IframeDefaultExport,
  argTypes: {
    iframesrc: { control: "text" },
    // encodeurl: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
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
};

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <IframeDefaultExport {...args} listener={mockListener} />
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
  parameters: {
    layout: 'fullscreen',
  },
};

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicIframe",
    listener: mockListener,
    iframesrc: "https://docs.wavemaker.com/learn/",
    width: "600px",
    height: "400px",
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={3} style={{marginBottom: "20px"}}>
          Social Media Embeds
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={3}
        >
          <Box>
            <Typography variant="subtitle2" mb={1}>
              YouTube
            </Typography>
            <IframeDefaultExport
              name="youtube"
              iframesrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
              width="100%"
              height="200px"
              listener={mockListener}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              Google Maps
            </Typography>
            <IframeDefaultExport
              name="maps"
              iframesrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878459418!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="200px"
              listener={mockListener}
            />
          </Box>
        </Box>
      </Box>
    );
  },
  args: {
    name: "showcaseIframe",
    listener: mockListener,
  },
};

// export const ModalWithIframe: Story = {
//   render: () => {
//     const [open, setOpen] = React.useState(false);

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Modal with Iframe
//         </Typography>
//         <Box
//           component="button"
//           onClick={() => setOpen(true)}
//           sx={{
//             padding: "10px 20px",
//             backgroundColor: "var(--wm-color-secondary) !important",
//             color: "#ffffff !important",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "16px",
//             margin: "8px 0"
//           }}
//         >
//           Open Iframe Modal
//         </Box>
//         {open && (
//           <Box
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.7)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               zIndex: 1000,
//             }}
//             onClick={() => setOpen(false)}
//           >
//             <Box
//               sx={{
//                 width: "90%",
//                 maxWidth: "900px",
//                 height: "80%",
//                 backgroundColor: "#ffffff",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//                 position: "relative",
//               }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Box
//                 sx={{
//                   padding: "16px",
//                   backgroundColor: "#f5f5f5",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography variant="h6">Embedded Content</Typography>
//                 <Box
//                   component="button"
//                   onClick={() => setOpen(false)}
//                   sx={{
//                     padding: "4px 12px",
//                     backgroundColor: "transparent",
//                     border: "1px solid #ccc",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Close
//                 </Box>
//               </Box>
//               <Box sx={{ height: "calc(100% - 64px)" }}>
//                 <IframeDefaultExport
//                   name="modalIframe"
//                   iframesrc="https://docs.wavemaker.com/learn/"
//                   width="100%"
//                   height="100%"
//                   listener={mockListener}
//                 />
//               </Box>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     );
//   },
//   args: {
//     name: "modalWithIframe",
//     listener: mockListener,
//   },
// };

// export const GoogleMaps: Story = {
//   render: Template,
//   args: {
//     name: "googleMaps",
//     listener: mockListener,
//     iframesrc:
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878459418!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
//     width: "800px",
//     height: "450px",
//     arialabel: "Google Maps showing Empire State Building location",
//   },
// };

// export const YouTubeVideo: Story = {
//   render: Template,
//   args: {
//     name: "youtubeVideo",
//     listener: mockListener,
//     iframesrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     width: "560px",
//     height: "315px",
//     arialabel: "YouTube video player",
//   },
// };

// export const SmallSize: Story = {
//   render: Template,
//   args: {
//     name: "smallIframe",
//     listener: mockListener,
//     iframesrc: "https://www.example.com",
//     width: "300px",
//     height: "200px",
//   },
// };

// export const LargeSize: Story = {
//   render: Template,
//   args: {
//     name: "largeIframe",
//     listener: mockListener,
//     iframesrc: "https://www.example.com",
//     width: "1000px",
//     height: "600px",
//   },
// };

// export const FullWidth: Story = {
//   render: Template,
//   args: {
//     name: "fullWidth",
//     listener: mockListener,
//     iframesrc: "https://www.example.com",
//     width: "100%",
//     height: "500px",
//   },
// };

// export const WithEncoding: Story = {
//   render: Template,
//   args: {
//     name: "withEncoding",
//     listener: mockListener,
//     iframesrc: "https://example.com/page?param=value with spaces",
//     encodeurl: true,
//     width: "600px",
//     height: "400px",
//   },
// };

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "customStyles",
//     listener: mockListener,
//     iframesrc: "https://www.example.com",
//     width: "600px",
//     height: "400px",
//     styles: {
//       border: "4px solid #2196f3",
//       borderRadius: "8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//     },
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     iframesrc: "https://www.example.com",
//     width: "600px",
//     height: "400px",
//     hint: "This is an embedded iframe - hover to see this tooltip",
//     arialabel: "Example website embedded in iframe",
//   },
// };

// export const ResponsiveIframe: Story = {
//   render: Template,
//   args: {
//     name: "responsive",
//     listener: mockListener,
//     iframesrc: "https://www.example.com",
//     width: "100%",
//     height: "400px",
//     styles: {
//       maxWidth: "800px",
//     },
//   },
// };

// export const MultipleIframes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Typography variant="h6">Multiple Embedded Iframes</Typography>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Iframe 1 - Example.com
//             </Typography>
//             <IframeDefaultExport
//               name="multi1"
//               iframesrc="https://www.example.com"
//               width="100%"
//               height="300px"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Iframe 2 - Another Site
//             </Typography>
//             <IframeDefaultExport
//               name="multi2"
//               iframesrc="https://www.wikipedia.org"
//               width="100%"
//               height="300px"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "multipleIframes",
//     listener: mockListener,
//   },
// };

// export const EmbeddedDashboard: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Embedded Dashboard
//         </Typography>
//         <Box
//           p={3}
//           bgcolor="#f5f5f5"
//           borderRadius={2}
//           border="1px solid #e0e0e0"
//         >
//           <Typography variant="body1" mb={2}>
//             External Dashboard Content
//           </Typography>
//           <IframeDefaultExport
//             name="dashboard"
//             iframesrc="https://www.example.com"
//             width="100%"
//             height="500px"
//             listener={mockListener}
//           />
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "embeddedDashboard",
//     listener: mockListener,
//   },
// };

// export const GridLayout: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Grid Layout with Multiple Iframes
//         </Typography>
//         <Box
//           display="grid"
//           gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
//           gap={3}
//         >
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Content 1
//             </Typography>
//             <IframeDefaultExport
//               name="grid1"
//               iframesrc="https://www.example.com"
//               width="100%"
//               height="250px"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Content 2
//             </Typography>
//             <IframeDefaultExport
//               name="grid2"
//               iframesrc="https://www.wikipedia.org"
//               width="100%"
//               height="250px"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Content 3
//             </Typography>
//             <IframeDefaultExport
//               name="grid3"
//               iframesrc="https://www.example.org"
//               width="100%"
//               height="250px"
//               listener={mockListener}
//             />
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "gridLayout",
//     listener: mockListener,
//   },
// };

// export const AspectRatio16x9: Story = {
//   render: Template,
//   args: {
//     name: "aspect16x9",
//     listener: mockListener,
//     iframesrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     width: "640px",
//     height: "360px",
//     arialabel: "16:9 aspect ratio iframe",
//   },
// };

// export const AspectRatio4x3: Story = {
//   render: Template,
//   args: {
//     name: "aspect4x3",
//     listener: mockListener,
//     iframesrc: "https://www.example.com",
//     width: "640px",
//     height: "480px",
//     arialabel: "4:3 aspect ratio iframe",
//   },
// };

// export const CardWithIframe: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Box
//           maxWidth="600px"
//           bgcolor="#ffffff"
//           border="1px solid #e0e0e0"
//           borderRadius={2}
//           overflow="hidden"
//           boxShadow="0 2px 8px rgba(0,0,0,0.1)"
//         >
//           <Box p={2} bgcolor="#f5f5f5">
//             <Typography variant="h6">Embedded Content</Typography>
//             <Typography variant="body2" color="text.secondary">
//               External website embedded in a card
//             </Typography>
//           </Box>
//           <Box p={2}>
//             <IframeDefaultExport
//               name="cardIframe"
//               iframesrc="https://www.example.com"
//               width="100%"
//               height="400px"
//               listener={mockListener}
//             />
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" textAlign="center">
//             <Typography variant="caption" color="text.secondary">
//               Content provided by external source
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "cardWithIframe",
//     listener: mockListener,
//   },
// };

// export const TabsWithIframes: Story = {
//   render: () => {
//     const [activeTab, setActiveTab] = React.useState(0);

//     const tabs = [
//       { label: "Tab 1", url: "https://www.example.com" },
//       { label: "Tab 2", url: "https://www.wikipedia.org" },
//       { label: "Tab 3", url: "https://www.example.org" },
//     ];

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Tabs with Embedded Content
//         </Typography>
//         <Box mb={2} display="flex" gap={1}>
//           {tabs.map((tab, index) => (
//             <Box
//               key={index}
//               component="button"
//               onClick={() => setActiveTab(index)}
//               sx={{
//                 padding: "8px 16px",
//                 backgroundColor: activeTab === index ? "#2196f3" : "#f5f5f5",
//                 color: activeTab === index ? "#ffffff" : "#000000",
//                 border: "none",
//                 borderRadius: "4px 4px 0 0",
//                 cursor: "pointer",
//                 fontWeight: activeTab === index ? "bold" : "normal",
//               }}
//             >
//               {tab.label}
//             </Box>
//           ))}
//         </Box>
//         <Box border="1px solid #e0e0e0" borderRadius="0 4px 4px 4px">
//           <IframeDefaultExport
//             name={`tabIframe${activeTab}`}
//             iframesrc={tabs[activeTab].url}
//             width="100%"
//             height="400px"
//             listener={mockListener}
//           />
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "tabsWithIframes",
//     listener: mockListener,
//   },
// };


// export const DifferentSizes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Different Iframe Sizes
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Small (300x200)
//             </Typography>
//             <IframeDefaultExport
//               name="small"
//               iframesrc="https://www.example.com"
//               width="300px"
//               height="200px"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Medium (600x400)
//             </Typography>
//             <IframeDefaultExport
//               name="medium"
//               iframesrc="https://www.example.com"
//               width="600px"
//               height="400px"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Large (900x600)
//             </Typography>
//             <IframeDefaultExport
//               name="large"
//               iframesrc="https://www.example.com"
//               width="900px"
//               height="600px"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "differentSizes",
//     listener: mockListener,
//   },
// };
