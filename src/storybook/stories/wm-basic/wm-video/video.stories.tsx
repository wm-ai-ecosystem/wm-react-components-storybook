import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import VideoDefaultExport from "../../../../components/basic/video/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import videoTokensData from "../../../../designTokens/components/video/video.json";

const meta: Meta<typeof VideoDefaultExport> = {
  title: "Basic/Video",
  component: VideoDefaultExport,
  // argTypes: {
  //   mp4format: { control: "text" },
  //   webmformat: { control: "text" },
  //   oggformat: { control: "text" },
  //   controls: { control: "boolean" },
  //   autoplay: { control: "boolean" },
  //   loop: { control: "boolean" },
  //   muted: { control: "boolean" },
  //   poster: { control: "text" },
  //   videopreload: {
  //     control: { type: "select" },
  //     options: ["auto", "metadata", "none"],
  //   },
  //   subtitlesource: { control: "text" },
  //   subtitlelang: { control: "text" },
  //   videosupportmessage: { control: "text" },
  //   // hint: { control: "text" },
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
};

// Sample video URLs (using free sample videos)
const sampleMp4Video = "https://videos.pexels.com/video-files/5155396/5155396-uhd_2560_1440_30fps.mp4";
const sampleMp4Video2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const samplePoster = "https://via.placeholder.com/640x360/333/fff?text=Video+Poster";

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <VideoDefaultExport {...args} listener={mockListener} />
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
    name:"docsVideo",
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
        <Stack spacing={4}>
          <Box>
            <Stack mb={3}>
              <Typography variant="h6" mb={2}>
                Autoplay & Loop Settings
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Standard Video
                </Typography>
                <VideoDefaultExport
                  name="standard"
                  mp4format={sampleMp4Video}
                  controls={true}
                  listener={mockListener}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Autoplay (Muted)
                </Typography>
                <VideoDefaultExport
                  name="autoplayMuted"
                  mp4format={sampleMp4Video}
                  controls={true}
                  autoplay={true}
                  muted={true}
                  listener={mockListener}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Loop Enabled
                </Typography>
                <VideoDefaultExport
                  name="loopEnabled"
                  mp4format={sampleMp4Video}
                  controls={true}
                  loop={true}
                  listener={mockListener}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Autoplay + Loop (Muted)
                </Typography>
                <VideoDefaultExport
                  name="autoplayLoop"
                  mp4format={sampleMp4Video}
                  controls={true}
                  autoplay={true}
                  loop={true}
                  muted={true}
                  listener={mockListener}
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseVideo",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicVideo",
    listener: mockListener,
    mp4format: sampleMp4Video,
    controls: true,
    autoplay: false,
    loop:false,
    videopreload: "none",
    showcontrols: true,
    muted: false,
  },
  argTypes: {
    mp4format: { control: "text" },
    webmformat: { control: "text" },
    oggformat: { control: "text" },
    controls: { control: "boolean" },
    autoplay: { control: "boolean" },
    loop: { control: "boolean" },
    muted: { control: "boolean" },
    poster: { control: "text" },
    videopreload: {
      control: { type: "select" },
      options: ["auto", "metadata", "none"],
    },
    subtitlesource: { control: "text" },
    subtitlelang: { control: "text" },
    videosupportmessage: { control: "text" },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardVideo",
    listener: mockListener,
    mp4format: sampleMp4Video,
    controls: true,
    autoplay: false,
    loop:false,
    videopreload: "none",
    showcontrols: true,
    muted: false,
    "data-design-token-target":"true"
  },
  argTypes: {
    mp4format: { control: "text" },
    webmformat: { control: "text" },
    oggformat: { control: "text" },
    controls: { control: "boolean" },
    autoplay: { control: "boolean" },
    loop: { control: "boolean" },
    muted: { control: "boolean" },
    poster: { control: "text" },
    videopreload: {
      control: { type: "select" },
      options: ["auto", "metadata", "none"],
    },
    subtitlesource: { control: "text" },
    subtitlelang: { control: "text" },
    videosupportmessage: { control: "text" },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: videoTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "video",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};

// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "video1",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//   },
// };

// export const WithControls: Story = {
//   render: Template,
//   args: {
//     name: "videoWithControls",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//   },
// };

// export const WithoutControls: Story = {
//   render: Template,
//   args: {
//     name: "videoNoControls",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: false,
//   },
// };

// export const Autoplay: Story = {
//   render: Template,
//   args: {
//     name: "videoAutoplay",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     autoplay: true,
//     muted: true, // Muted for autoplay to work in browsers
//   },
// };

// export const LoopEnabled: Story = {
//   render: Template,
//   args: {
//     name: "videoLoop",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     loop: true,
//   },
// };

// export const MutedVideo: Story = {
//   render: Template,
//   args: {
//     name: "videoMuted",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     muted: true,
//   },
// };

// export const WithPoster: Story = {
//   render: Template,
//   args: {
//     name: "videoPoster",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     poster: samplePoster,
//   },
// };

// export const PreloadAuto: Story = {
//   render: Template,
//   args: {
//     name: "preloadAuto",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     videopreload: "auto",
//   },
// };

// export const PreloadMetadata: Story = {
//   render: Template,
//   args: {
//     name: "preloadMetadata",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     videopreload: "metadata",
//   },
// };

// export const PreloadNone: Story = {
//   render: Template,
//   args: {
//     name: "preloadNone",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     videopreload: "none",
//   },
// };

// export const WithCustomMessage: Story = {
//   render: Template,
//   args: {
//     name: "videoCustomMessage",
//     listener: mockListener,
//     mp4format: "invalid-video-url.mp4",
//     controls: true,
//     videosupportmessage: "Your browser does not support HTML5 video. Please upgrade your browser.",
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "videoWithHint",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     hint: "Sample video - hover to see this tooltip",
//     arialabel: "Video player for sample content",
//   },
// };

// export const CustomStyling: Story = {
//   render: Template,
//   args: {
//     name: "videoCustomStyle",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     styles: {
//       padding: "20px",
//       backgroundColor: "#f5f5f5",
//       borderRadius: "8px",
//       border: "2px solid #2196f3",
//     },
//   },
// };

// export const MultipleVideoPlayers: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Multiple Video Players</Typography>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Video 1 - Big Buck Bunny
//             </Typography>
//             <VideoDefaultExport
//               name="multiVideo1"
//               mp4format={sampleMp4Video}
//               controls={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Video 2 - Elephants Dream
//             </Typography>
//             <VideoDefaultExport
//               name="multiVideo2"
//               mp4format={sampleMp4Video2}
//               controls={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Video 3 - Looped
//             </Typography>
//             <VideoDefaultExport
//               name="multiVideo3"
//               mp4format={sampleMp4Video}
//               controls={true}
//               loop={true}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "multipleVideo",
//     listener: mockListener,
//   },
// };

// export const VideoPlaylist: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Video Playlist
//         </Typography>
//         <Stack spacing={2}>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="body1" fontWeight="500" mb={1}>
//               Video 1: Big Buck Bunny
//             </Typography>
//             <VideoDefaultExport
//               name="playlist1"
//               mp4format={sampleMp4Video}
//               controls={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="body1" fontWeight="500" mb={1}>
//               Video 2: Elephants Dream
//             </Typography>
//             <VideoDefaultExport
//               name="playlist2"
//               mp4format={sampleMp4Video2}
//               controls={true}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "videoPlaylist",
//     listener: mockListener,
//   },
// };

// export const BackgroundVideo: Story = {
//   render: Template,
//   args: {
//     name: "backgroundVideo",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: false,
//     autoplay: true,
//     loop: true,
//     muted: true,
//     styles: {
//       position: "relative",
//       width: "100%",
//       height: "400px",
//     },
//   },
// };

// export const PreloadComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Preload Strategies Comparison
//         </Typography>
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Preload: Auto (downloads entire video)
//             </Typography>
//             <VideoDefaultExport
//               name="preloadAutoComp"
//               mp4format={sampleMp4Video}
//               controls={true}
//               videopreload="auto"
//               listener={mockListener}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Best for: Critical videos that will definitely be played
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Preload: Metadata (downloads only metadata)
//             </Typography>
//             <VideoDefaultExport
//               name="preloadMetaComp"
//               mp4format={sampleMp4Video}
//               controls={true}
//               videopreload="metadata"
//               listener={mockListener}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Best for: Balance between performance and UX
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Preload: None (no preloading)
//             </Typography>
//             <VideoDefaultExport
//               name="preloadNoneComp"
//               mp4format={sampleMp4Video}
//               controls={true}
//               videopreload="none"
//               listener={mockListener}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Best for: Saving bandwidth, optional videos
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "preloadComparison",
//     listener: mockListener,
//   },
// };

// export const AspectRatio16x9: Story = {
//   render: Template,
//   args: {
//     name: "aspect16x9",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     styles: {
//       maxWidth: "640px",
//     },
//   },
// };

// export const AspectRatio4x3: Story = {
//   render: Template,
//   args: {
//     name: "aspect4x3",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     styles: {
//       maxWidth: "640px",
//       aspectRatio: "4/3",
//     },
//   },
// };

// export const CardPlayer: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Box
//           p={3}
//           maxWidth="600px"
//           bgcolor="#ffffff"
//           border="1px solid #e0e0e0"
//           borderRadius={2}
//           boxShadow="0 2px 8px rgba(0,0,0,0.1)"
//         >
//           <Typography variant="h6" gutterBottom>
//             Now Playing
//           </Typography>
//           <VideoDefaultExport
//             name="cardPlayer"
//             mp4format={sampleMp4Video}
//             controls={true}
//             poster={samplePoster}
//             listener={mockListener}
//           />
//           <Box mt={2}>
//             <Typography variant="body1" fontWeight="500">
//               Big Buck Bunny
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Sample Video Content
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "cardPlayer",
//     listener: mockListener,
//   },
// };

// export const ResponsivePlayer: Story = {
//   render: Template,
//   args: {
//     name: "responsivePlayer",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     styles: {
//       width: "100%",
//       maxWidth: "800px",
//     },
//   },
// };

// export const VideoGallery: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Video Gallery
//         </Typography>
//         <Box
//           display="grid"
//           gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
//           gap={3}
//         >
//           <Box>
//             <VideoDefaultExport
//               name="gallery1"
//               mp4format={sampleMp4Video}
//               controls={true}
//               poster={samplePoster}
//               listener={mockListener}
//             />
//             <Typography variant="subtitle2" mt={1}>
//               Big Buck Bunny
//             </Typography>
//           </Box>
//           <Box>
//             <VideoDefaultExport
//               name="gallery2"
//               mp4format={sampleMp4Video2}
//               controls={true}
//               poster={samplePoster}
//               listener={mockListener}
//             />
//             <Typography variant="subtitle2" mt={1}>
//               Elephants Dream
//             </Typography>
//           </Box>
//           <Box>
//             <VideoDefaultExport
//               name="gallery3"
//               mp4format={sampleMp4Video}
//               controls={true}
//               poster={samplePoster}
//               listener={mockListener}
//             />
//             <Typography variant="subtitle2" mt={1}>
//               Sample Video 3
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "videoGallery",
//     listener: mockListener,
//   },
// };

// export const InteractivePlayer: Story = {
//   render: () => {
//     const [isPlaying, setIsPlaying] = useState(false);

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Video Player</Typography>
//           <VideoDefaultExport
//             name="interactive"
//             mp4format={sampleMp4Video}
//             controls={true}
//             listener={mockListener}
//           />
//           <Stack direction="row" spacing={2}>
//             <Button variant="contained" onClick={() => setIsPlaying(!isPlaying)}>
//               {isPlaying ? "Pause" : "Play"}
//             </Button>
//             <Button variant="outlined">
//               Stop
//             </Button>
//             <Button variant="outlined">
//               Restart
//             </Button>
//           </Stack>
//           <Typography variant="body2" color="text.secondary">
//             Use the controls above or the video player controls
//           </Typography>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactivePlayer",
//     listener: mockListener,
//   },
// };

// export const TabbedVideos: Story = {
//   render: () => {
//     const [activeTab, setActiveTab] = useState(0);

//     const videos = [
//       { label: "Video 1", url: sampleMp4Video, title: "Big Buck Bunny" },
//       { label: "Video 2", url: sampleMp4Video2, title: "Elephants Dream" },
//       { label: "Video 3", url: sampleMp4Video, title: "Sample Video" },
//     ];

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Tabbed Video Player
//         </Typography>
//         <Box mb={2} display="flex" gap={1}>
//           {videos.map((video, index) => (
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
//               {video.label}
//             </Box>
//           ))}
//         </Box>
//         <Box border="1px solid #e0e0e0" borderRadius="0 4px 4px 4px" p={2}>
//           <Typography variant="subtitle1" mb={2}>
//             {videos[activeTab].title}
//           </Typography>
//           <VideoDefaultExport
//             name={`tabVideo${activeTab}`}
//             mp4format={videos[activeTab].url}
//             controls={true}
//             listener={mockListener}
//           />
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "tabbedVideos",
//     listener: mockListener,
//   },
// };

// export const ModalVideo: Story = {
//   render: () => {
//     const [open, setOpen] = useState(false);

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Modal Video Player
//         </Typography>
//         <Box
//           component="button"
//           onClick={() => setOpen(true)}
//           sx={{
//             padding: "10px 20px",
//             backgroundColor: "#2196f3",
//             color: "#ffffff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "16px",
//           }}
//         >
//           Open Video Modal
//         </Box>
//         {open && (
//           <Box
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.8)",
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
//                 <Typography variant="h6">Video Player</Typography>
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
//               <Box p={2}>
//                 <VideoDefaultExport
//                   name="modalVideo"
//                   mp4format={sampleMp4Video}
//                   controls={true}
//                   autoplay={true}
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
//     name: "modalVideo",
//     listener: mockListener,
//   },
// };

// export const CompactPlayer: Story = {
//   render: Template,
//   args: {
//     name: "compactPlayer",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     styles: {
//       maxWidth: "400px",
//       borderRadius: "8px",
//       overflow: "hidden",
//       boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//     },
//   },
// };

// export const TheaterMode: Story = {
//   render: Template,
//   args: {
//     name: "theaterMode",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     styles: {
//       width: "100%",
//       backgroundColor: "#000",
//       borderRadius: "0",
//     },
//   },
// };

// export const WithSubtitles: Story = {
//   render: Template,
//   args: {
//     name: "withSubtitles",
//     listener: mockListener,
//     mp4format: sampleMp4Video,
//     controls: true,
//     subtitlesource: "https://example.com/subtitles.vtt",
//     subtitlelang: "en",
//     hint: "Video with English subtitles",
//   },
// };
