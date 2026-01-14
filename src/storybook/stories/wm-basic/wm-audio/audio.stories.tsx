import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import AudioDefaultExport from "../../../../components/basic/audio/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import audioTokensData from "../../../../designTokens/components/audio/audio.json";

const meta: Meta<typeof AudioDefaultExport> = {
  title: "Basic/Audio",
  component: AudioDefaultExport,
  // argTypes: {
  //   mp3format: { control: "text" },
  //   controls: { control: "boolean" },
  //   autoplay: { control: "boolean" },
  //   loop: { control: "boolean" },
  //   muted: { control: "boolean" },
  //   audiopreload: {
  //     control: { type: "select" },
  //     options: ["auto", "metadata", "none"],
  //   },
  //   audiosupportmessage: { control: "text" },
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

// Sample audio URL (free sample from various sources)
const sampleAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const sampleAudioUrl2 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <AudioDefaultExport {...args} listener={mockListener} />
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
    name: "docsAudio",
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
                  Standard Audio
                </Typography>
                <AudioDefaultExport
                  name="standard"
                  mp3format={sampleAudioUrl}
                  controls={true}
                  listener={mockListener}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Autoplay (Muted)
                </Typography>
                <AudioDefaultExport
                  name="autoplayMuted"
                  mp3format={sampleAudioUrl}
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
                <AudioDefaultExport
                  name="loopEnabled"
                  mp3format={sampleAudioUrl}
                  controls={true}
                  loop={true}
                  listener={mockListener}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Autoplay + Loop (Muted)
                </Typography>
                <AudioDefaultExport
                  name="autoplayLoop"
                  mp3format={sampleAudioUrl}
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
    name: "showcaseAudio",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicAudio",
    listener: mockListener,
    mp3format: sampleAudioUrl,
    controls: true,
    autoplay: false,
    loop: false,
    muted: false,
  },
  argTypes: {
    mp3format: { control: "text" },
    controls: { control: "boolean" },
    autoplay: { control: "boolean" },
    loop: { control: "boolean" },
    muted: { control: "boolean" },
    audiopreload: {
      control: { type: "select" },
      options: ["auto", "metadata", "none"],
    },
    audiosupportmessage: { control: "text" },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardAudio",
    listener: mockListener,
    mp3format: sampleAudioUrl,
    controls: true,
    "data-design-token-target": "true",
  },
  argTypes: {
    mp3format: { control: "text" },
    controls: { control: "boolean" },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: audioTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "audio",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "audio1",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//   },
// };

// export const WithControls: Story = {
//   render: Template,
//   args: {
//     name: "audioWithControls",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//   },
// };

// export const WithoutControls: Story = {
//   render: Template,
//   args: {
//     name: "audioNoControls",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: false,
//     autoplay: false,
//   },
// };

// export const Autoplay: Story = {
//   render: Template,
//   args: {
//     name: "audioAutoplay",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     autoplay: true,
//     muted: true, // Muted for autoplay to work in browsers
//   },
// };

// export const LoopEnabled: Story = {
//   render: Template,
//   args: {
//     name: "audioLoop",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     loop: true,
//   },
// };

// export const MutedAudio: Story = {
//   render: Template,
//   args: {
//     name: "audioMuted",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     muted: true,
//   },
// };

// export const PreloadAuto: Story = {
//   render: Template,
//   args: {
//     name: "preloadAuto",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     audiopreload: "auto",
//   },
// };

// export const PreloadMetadata: Story = {
//   render: Template,
//   args: {
//     name: "preloadMetadata",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     audiopreload: "metadata",
//   },
// };

// export const PreloadNone: Story = {
//   render: Template,
//   args: {
//     name: "preloadNone",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     audiopreload: "none",
//   },
// };

// export const WithCustomMessage: Story = {
//   render: Template,
//   args: {
//     name: "audioCustomMessage",
//     listener: mockListener,
//     mp3format: "invalid-audio-url.mp3",
//     controls: true,
//     audiosupportmessage: "Your browser does not support HTML5 audio. Please upgrade your browser.",
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "audioWithHint",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     hint: "Sample audio file - hover to see this tooltip",
//     arialabel: "Audio player for sample music",
//   },
// };

// export const CustomStyling: Story = {
//   render: Template,
//   args: {
//     name: "audioCustomStyle",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     styles: {
//       padding: "20px",
//       backgroundColor: "#f5f5f5",
//       borderRadius: "8px",
//       border: "2px solid #2196f3",
//     },
//   },
// };

// export const MultipleAudioPlayers: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Multiple Audio Players</Typography>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Audio Track 1
//             </Typography>
//             <AudioDefaultExport
//               name="multiAudio1"
//               mp3format={sampleAudioUrl}
//               controls={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Audio Track 2
//             </Typography>
//             <AudioDefaultExport
//               name="multiAudio2"
//               mp3format={sampleAudioUrl2}
//               controls={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Audio Track 3 (Looped)
//             </Typography>
//             <AudioDefaultExport
//               name="multiAudio3"
//               mp3format={sampleAudioUrl}
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
//     name: "multipleAudio",
//     listener: mockListener,
//   },
// };

// export const AudioPlaylist: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Audio Playlist
//         </Typography>
//         <Stack spacing={2}>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="body1" fontWeight="500" mb={1}>
//               Track 1: SoundHelix Song 1
//             </Typography>
//             <AudioDefaultExport
//               name="playlist1"
//               mp3format={sampleAudioUrl}
//               controls={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="body1" fontWeight="500" mb={1}>
//               Track 2: SoundHelix Song 2
//             </Typography>
//             <AudioDefaultExport
//               name="playlist2"
//               mp3format={sampleAudioUrl2}
//               controls={true}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "audioPlaylist",
//     listener: mockListener,
//   },
// };

// export const BackgroundMusic: Story = {
//   render: Template,
//   args: {
//     name: "backgroundMusic",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     autoplay: true,
//     loop: true,
//     muted: true,
//     styles: {
//       position: "fixed",
//       bottom: "20px",
//       right: "20px",
//       backgroundColor: "rgba(0, 0, 0, 0.8)",
//       padding: "10px",
//       borderRadius: "8px",
//     },
//   },
// };

// export const AudioSettings: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="h6" mb={2}>
//               Autoplay & Loop Settings
//             </Typography>
//             <Stack spacing={2}>
//               <Box>
//                 <Typography variant="subtitle2" mb={1}>
//                   Standard Audio
//                 </Typography>
//                 <AudioDefaultExport
//                   name="standard"
//                   mp3format={sampleAudioUrl}
//                   controls={true}
//                   listener={mockListener}
//                 />
//               </Box>
//               <Box>
//                 <Typography variant="subtitle2" mb={1}>
//                   Autoplay (Muted)
//                 </Typography>
//                 <AudioDefaultExport
//                   name="autoplayMuted"
//                   mp3format={sampleAudioUrl}
//                   controls={true}
//                   autoplay={true}
//                   muted={true}
//                   listener={mockListener}
//                 />
//               </Box>
//               <Box>
//                 <Typography variant="subtitle2" mb={1}>
//                   Loop Enabled
//                 </Typography>
//                 <AudioDefaultExport
//                   name="loopEnabled"
//                   mp3format={sampleAudioUrl}
//                   controls={true}
//                   loop={true}
//                   listener={mockListener}
//                 />
//               </Box>
//               <Box>
//                 <Typography variant="subtitle2" mb={1}>
//                   Autoplay + Loop (Muted)
//                 </Typography>
//                 <AudioDefaultExport
//                   name="autoplayLoop"
//                   mp3format={sampleAudioUrl}
//                   controls={true}
//                   autoplay={true}
//                   loop={true}
//                   muted={true}
//                   listener={mockListener}
//                 />
//               </Box>
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "audioSettings",
//     listener: mockListener,
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
//               Preload: Auto (downloads entire audio)
//             </Typography>
//             <AudioDefaultExport
//               name="preloadAutoComp"
//               mp3format={sampleAudioUrl}
//               controls={true}
//               audiopreload="auto"
//               listener={mockListener}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Best for: Critical audio that will definitely be played
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Preload: Metadata (downloads only metadata)
//             </Typography>
//             <AudioDefaultExport
//               name="preloadMetaComp"
//               mp3format={sampleAudioUrl}
//               controls={true}
//               audiopreload="metadata"
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
//             <AudioDefaultExport
//               name="preloadNoneComp"
//               mp3format={sampleAudioUrl}
//               controls={true}
//               audiopreload="none"
//               listener={mockListener}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Best for: Saving bandwidth, optional audio
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

// export const MiniPlayer: Story = {
//   render: Template,
//   args: {
//     name: "miniPlayer",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     styles: {
//       width: "300px",
//       padding: "12px",
//       backgroundColor: "#1976d2",
//       borderRadius: "8px",
//       boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//     },
//   },
// };

// export const CardPlayer: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Box
//           p={3}
//           maxWidth="400px"
//           bgcolor="#ffffff"
//           border="1px solid #e0e0e0"
//           borderRadius={2}
//           boxShadow="0 2px 8px rgba(0,0,0,0.1)"
//         >
//           <Typography variant="h6" gutterBottom>
//             Now Playing
//           </Typography>
//           <Box
//             component="img"
//             src="https://via.placeholder.com/150"
//             alt="Album art"
//             sx={{ width: "100%", borderRadius: 1, mb: 2 }}
//           />
//           <Typography variant="body1" fontWeight="500">
//             SoundHelix Song
//           </Typography>
//           <Typography variant="body2" color="text.secondary" mb={2}>
//             Sample Artist
//           </Typography>
//           <AudioDefaultExport
//             name="cardPlayer"
//             mp3format={sampleAudioUrl}
//             controls={true}
//             listener={mockListener}
//           />
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
//     mp3format: sampleAudioUrl,
//     controls: true,
//     styles: {
//       width: "100%",
//       maxWidth: "600px",
//     },
//   },
// };
