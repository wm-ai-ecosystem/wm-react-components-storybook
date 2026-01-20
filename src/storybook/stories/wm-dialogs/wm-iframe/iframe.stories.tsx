import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import IframeDialogDefaultExport from "../../../../components/dialogs/iframe-dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";

import { iconClassNames } from "../../constants/iconClassConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

const mockListener = {
  appLocale: {},
  Widgets: {},
};

const meta = {
  title: "Dialogs/Iframe Dialog",
  component: IframeDialogDefaultExport,
  // argTypes: {
  //   title: { control: "text" },
  //   url: { control: "text" },
  //   iconclass: { control: "select", options: ["fa fa-circle-check", "fa fa-trash", "fa fa-save", "fa fa-file", "fa-fa-user"] },
  //   oktext: { control: "text" },
  //   showheader: { control: "boolean" },
  //   showactions: { control: "boolean" },
  //   closable: { control: "boolean" },
  //   encodeurl: { control: "boolean" },
  //   width: { control: "text" },
  //   height: { control: "text" },
  //   headinglevel: {control: "select", options:["h1", "h2", "h4"]},
  //   iconurl: { control: "text" },
  //   iconwidth: { control: "text" },
  //   iconheight: { control: "text" },
  //   iconmargin: { control: "text" }
  // },
} satisfies Meta<typeof IframeDialogDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box style={{ padding: 16 }}>
      <WmButton
        name="openIframeBtn"
        caption="Open Iframe Dialog"
        onClick={() => setIsOpen(true)}
        listener={mockListener}
        styles={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
        }}
      />
      <IframeDialogDefaultExport
        {...args}
        isopen={isOpen}
        onClose={() => setIsOpen(false)}
        close={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        listener={mockListener}
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
      // styling={styling}
      style={style}
      token={token}
    />
  ),
  args:{
    name:"docsIframeDialog",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const [openDialogs, setOpenDialogs] = useState<{
      docs: boolean;
      video: boolean;
      map: boolean;
    }>({
      docs: false,
      video: false,
      map: false,
    });

    const handleOpen = (type: "docs" | "video" | "map") => {
      setOpenDialogs((prev) => ({ ...prev, [type]: true }));
    };

    const handleClose = (type: "docs" | "video" | "map") => {
      setOpenDialogs((prev) => ({ ...prev, [type]: false }));
    };

    return (
      <Box style={{ padding: 16 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
          <WmButton
            name="openDocsBtn"
            caption="Open Docs"
            onClick={() => handleOpen("docs")}
            listener={mockListener}
            styles={{
              backgroundColor: "#00c8ff",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
          <WmButton
            name="openVideoBtn"
            caption="Open Video"
            onClick={() => handleOpen("video")}
            listener={mockListener}
            styles={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
          <WmButton
            name="openMapBtn"
            caption="Open Map"
            onClick={() => handleOpen("map")}
            listener={mockListener}
            styles={{
              backgroundColor: "#5AC588",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
        </Stack>

        <IframeDialogDefaultExport
          name="docsDialog"
          title="Documentation"
          url="https://docs.wavemaker.com"
          iconclass="wi wi-book"
          oktext="Close"
          showheader={true}
          showactions={true}
          closable={true}
          isopen={openDialogs.docs}
          onClose={() => handleClose("docs")}
          close={() => handleClose("docs")}
          onOk={() => handleClose("docs")}
          listener={mockListener}
          headinglevel="h4"
        />
        <IframeDialogDefaultExport
          name="videoDialog"
          title="Video Player"
          url="https://www.youtube.com/embed/dQw4w9WgXcQ"
          iconclass="wi wi-play-circle"
          oktext="Close"
          showheader={true}
          showactions={true}
          closable={true}
          isopen={openDialogs.video}
          onClose={() => handleClose("video")}
          close={() => handleClose("video")}
          onOk={() => handleClose("video")}
          listener={mockListener}
          headinglevel="h4"
        />
        <IframeDialogDefaultExport
          name="mapDialog"
          title="Location Map"
          url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1287387330084!2d-74.00601668459455!3d40.71277597933026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e5e98bb%3A0xf0b5d9df9e1e8e8e!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          iconclass="wi wi-map-marker"
          oktext="Got it"
          showheader={true}
          showactions={true}
          closable={true}
          isopen={openDialogs.map}
          onClose={() => handleClose("map")}
          close={() => handleClose("map")}
          onOk={() => handleClose("map")}
          listener={mockListener}
          headinglevel="h4"
        />
      </Box>
    );
  },
  args:{
    name: "showcaseIframeDialog",
    listener:mockListener
  }
};


export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicIframe",
    title: "External Content",
    url: "https://www.wavemaker.com",
    iconclass: "wi wi-globe",
    oktext: "OK",
    showheader: true,
    showactions: true,
    closable: true,
    listener: mockListener,
    headinglevel:"h4",
    sheetposition:undefined,
  },
  argTypes: {
    title: { control: "text" },
    url: { control: "text" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    oktext: { control: "text" },
    showheader: { control: "boolean" },
    showactions: { control: "boolean" },
    closable: { control: "boolean" },
    // encodeurl: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
    headinglevel: {control: "select", options:["h1", "h2", "h4"]},
    iconurl: { control: "text" },
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    sheetposition:{control:{ type:"select"}, options: [undefined, 'top', 'bottom', 'left', 'right']},
  },
};

// export const Documentation: Story = {
//   render: Template,
//   args: {
//     name: "docsIframe",
//     title: "Documentation",
//     url: "https://docs.wavemaker.com",
//     iconclass: "wi wi-book",
//     oktext: "Close",
//     showheader: true,
//     showactions: true,
//     closable: true,
//     width: "900px",
//     height: "700px",
//   },
// };

// export const VideoPlayer: Story = {
//   render: Template,
//   args: {
//     name: "videoIframe",
//     title: "Video Player",
//     url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     iconclass: "wi wi-play-circle",
//     oktext: "Close",
//     showheader: true,
//     showactions: true,
//     closable: true,
//     width: "800px",
//     height: "500px",
//   },
// };

// export const GoogleMaps: Story = {
//   render: Template,
//   args: {
//     name: "mapsIframe",
//     title: "Location Map",
//     url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1287387330084!2d-74.00601668459455!3d40.71277597933026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e5e98bb%3A0xf0b5d9df9e1e8e8e!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
//     iconclass: "wi wi-map-marker",
//     oktext: "Got it",
//     showheader: true,
//     showactions: true,
//     closable: true,
//     width: "800px",
//     height: "600px",
//   },
// };

// export const WithoutHeader: Story = {
//   render: Template,
//   args: {
//     name: "noHeaderIframe",
//     title: "No Header",
//     url: "https://www.example.com",
//     showheader: false,
//     showactions: true,
//     closable: true,
//     width: "800px",
//     height: "600px",
//   },
// };

// export const WithoutActions: Story = {
//   render: Template,
//   args: {
//     name: "noActionsIframe",
//     title: "No Actions",
//     url: "https://www.example.com",
//     iconclass: "wi wi-globe",
//     showheader: true,
//     showactions: false,
//     closable: true,
//     width: "800px",
//     height: "600px",
//   },
// };

// export const MinimalDialog: Story = {
//   render: Template,
//   args: {
//     name: "minimalIframe",
//     title: "Minimal",
//     url: "https://www.example.com",
//     showheader: false,
//     showactions: false,
//     closable: false,
//     width: "800px",
//     height: "600px",
//   },
// };

// export const SmallSize: Story = {
//   render: Template,
//   args: {
//     name: "smallIframe",
//     title: "Small Dialog",
//     url: "https://www.example.com",
//     iconclass: "wi wi-window-minimize",
//     oktext: "Close",
//     showheader: true,
//     showactions: true,
//     closable: true,
//     width: "400px",
//     height: "300px",
//   },
// };

// export const LargeSize: Story = {
//   render: Template,
//   args: {
//     name: "largeIframe",
//     title: "Large Dialog",
//     url: "https://www.example.com",
//     iconclass: "wi wi-window-maximize",
//     oktext: "Close",
//     showheader: true,
//     showactions: true,
//     closable: true,
//     width: "1200px",
//     height: "800px",
//   },
// };

// export const CustomIcon: Story = {
//   render: Template,
//   args: {
//     name: "customIconIframe",
//     title: "Custom Icon Dialog",
//     url: "https://www.example.com",
//     iconclass: "wi wi-star",
//     oktext: "Done",
//     showheader: true,
//     showactions: true,
//     closable: true,
//     width: "800px",
//     height: "600px",
//   },
// };

// export const EncodedURL: Story = {
//   render: Template,
//   args: {
//     name: "encodedUrlIframe",
//     title: "Encoded URL",
//     url: "https://www.example.com?param1=value1&param2=value2",
//     iconclass: "wi wi-link",
//     oktext: "Close",
//     showheader: true,
//     showactions: true,
//     closable: true,
//     encodeurl: true,
//     width: "800px",
//     height: "600px",
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [eventLog, setEventLog] = useState<string[]>([]);
//     const [currentUrl, setCurrentUrl] = useState("https://www.example.com");

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setEventLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     const urls = [
//       { label: "Example", url: "https://www.example.com" },
//       { label: "Wikipedia", url: "https://en.wikipedia.org" },
//       { label: "GitHub", url: "https://github.com" },
//     ];

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
//             {urls.map((item) => (
//               <WmButton
//                 key={item.label}
//                 name={`open${item.label}Btn`}
//                 caption={`Open ${item.label}`}
//                 onClick={() => {
//                   setCurrentUrl(item.url);
//                   setIsOpen(true);
//                   addLog(`Opening ${item.label}`);
//                 }}
//                 listener={mockListener}
//                 styles={{
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   fontWeight: "500",
//                 }}
//               />
//             ))}
//           </Stack>

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2" gutterBottom>
//               Event Log:
//             </Typography>
//             {eventLog.length === 0 ? (
//               <Typography variant="body2">No events yet</Typography>
//             ) : (
//               <Stack spacing={0.5}>
//                 {eventLog.map((log, index) => (
//                   <Typography key={index} variant="body2" sx={{ fontFamily: "monospace" }}>
//                     {log}
//                   </Typography>
//                 ))}
//               </Stack>
//             )}
//           </Box>

//           <IframeDialogDefaultExport
//             name="interactiveIframe"
//             title="Interactive Iframe Dialog"
//             url={currentUrl}
//             iconclass="wi wi-globe"
//             oktext="Close"
//             showheader={true}
//             showactions={true}
//             closable={true}
//             width="800px"
//             height="600px"
//             isopen={isOpen}
//             onClose={() => {
//               setIsOpen(false);
//               addLog("Dialog closed");
//             }}
//             close={() => {
//               setIsOpen(false);
//               addLog("Dialog closed via close button");
//             }}
//             onOk={() => {
//               setIsOpen(false);
//               addLog("OK button clicked");
//             }}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const DynamicContent: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [iframeUrl, setIframeUrl] = useState("https://www.example.com");
//     const [inputUrl, setInputUrl] = useState("https://www.example.com");

//     const handleLoadUrl = () => {
//       setIframeUrl(inputUrl);
//       setIsOpen(true);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="body2" sx={{ mb: 1 }}>
//               Enter URL to load in iframe:
//             </Typography>
//             <Stack direction="row" spacing={2}>
//               <input
//                 type="url"
//                 value={inputUrl}
//                 onChange={(e) => setInputUrl(e.target.value)}
//                 placeholder="https://www.example.com"
//                 style={{
//                   flex: 1,
//                   padding: "8px 12px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   fontSize: "14px",
//                 }}
//               />
//               <WmButton
//                 name="loadUrlBtn"
//                 caption="Load URL"
//                 onClick={handleLoadUrl}
//                 listener={mockListener}
//                 styles={{
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   fontWeight: "500",
//                   whiteSpace: "nowrap",
//                 }}
//               />
//             </Stack>
//           </Box>

//           <IframeDialogDefaultExport
//             name="dynamicIframe"
//             title="Dynamic Content"
//             url={iframeUrl}
//             iconclass="wi wi-external-link"
//             oktext="Close"
//             showheader={true}
//             showactions={true}
//             closable={true}
//             width="800px"
//             height="600px"
//             isopen={isOpen}
//             onClose={() => setIsOpen(false)}
//             close={() => setIsOpen(false)}
//             onOk={() => setIsOpen(false)}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
// };
