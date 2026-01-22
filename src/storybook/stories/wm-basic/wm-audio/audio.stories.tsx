import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import AudioDefaultExport from "../../../../components/basic/audio/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import audioTokensData from "../../../../designTokens/components/audio/audio.json";

const meta: Meta<typeof AudioDefaultExport> = {
  title: "Basic/Audio",
  component: AudioDefaultExport,
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

const Template = (args: any) => {
  const { autoplay, loop, muted, audiopreload } = args;
  const renderKey = `${autoplay}-${loop}-${muted}-${audiopreload}`;
  
  return(
  <Box style={{ padding: 16 }}>
    <AudioDefaultExport {...args} listener={mockListener} key={renderKey} />
  </Box>
)};

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      // styling={styling}
      token={token}
    />
  ),
  args:{
    name: "docsAudio",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } }, 
    listener: { table: { disable: true } },
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
                  autoplay={false}
                  muted={false}
                  lopp={false}
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
                  loop={false}
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
                  autoplay={false}
                  muted={true}
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
  argTypes:{
    name: { table: { disable: true } }, 
    listener: { table: { disable: true } },
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
    autoplay: false,
    loop: false,
    muted: false,
    "data-design-token-target": "true",
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
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: audioTokensData,
      componentKey: "audio",
      extractCSSVariablesAtRuntime: true,
    },
    layout: 'fullscreen',
  },
};

// export const Basic: Story = {
//   tags: ['show-panel'],
//   render: Template,
//   args: {
//     name: "basicAudio",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     autoplay: false,
//     loop: false,
//     muted: false,
//   },
//   argTypes: {
//     mp3format: { control: "text" },
//     controls: { control: "boolean" },
//     autoplay: { control: "boolean" },
//     loop: { control: "boolean" },
//     muted: { control: "boolean" },
//     audiopreload: {
//       control: { type: "select" },
//       options: ["auto", "metadata", "none"],
//     },
//     audiosupportmessage: { control: "text" },
//   },
// };

// export const Standard1: Story = {
//   tags: ['show-panel'],
//   render: Template,
//   args: {
//     name: "standardAudio",
//     listener: mockListener,
//     mp3format: sampleAudioUrl,
//     controls: true,
//     "data-design-token-target": "true",
//   },
//   argTypes: {
//     mp3format: { control: "text" },
//     controls: { control: "boolean" },
//   },
//   parameters: {
//     designTokens: {
//       enabled: true,
//       tokenData: audioTokensData,  // Pass raw JSON data instead of pre-parsed config
//       componentKey: "audio",  // Component identifier for parsing
//       extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
//     },
//     layout: 'fullscreen',
//   },
// };