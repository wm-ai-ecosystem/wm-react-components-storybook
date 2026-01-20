import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import FileUploadDefaultExport from "../../../../components/input/fileupload/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import fileuploadTokensData from "../../../../designTokens/components/fileupload/fileupload.json";

const meta: Meta<typeof FileUploadDefaultExport> = {
  title: "Input/FileUpload",
  component: FileUploadDefaultExport,
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => (
  <Box style={{ padding: 16, minHeight: "300px" }}>
    <FileUploadDefaultExport {...args} />
  </Box>
);

const DesignTokenTemplate = (args: any) => {
    //component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
    return (
      <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
        <FileUploadDefaultExport {...componentArgs} />
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
      token={token}
    />
  ),
  args:{
    name:"docsFileupload",
  },
  argTypes:{
    name: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Box sx={{mb: 3}}>
        <Typography variant="h6" fontWeight={600} mb={4}>File Upload Showcase</Typography>
        </Box>
        <Stack spacing={4}>
          {/* Images */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Images Only</Typography>
            <FileUploadDefaultExport
              name="imagesOnly"
              caption="Select Images"
              multiple={false}
              extensions="jpg,jpeg,png,gif,svg"
              fileuploadmessage="Drop image files here"
            />
          </Box>

          {/* Documents */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Documents Only</Typography>
            <FileUploadDefaultExport
              name="documentsOnly"
              caption="Select Documents"
              multiple={false}
              extensions="pdf,doc,docx,txt"
              fileuploadmessage="Drop document files here"
            />
          </Box>

          {/* Videos */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Videos Only</Typography>
            <FileUploadDefaultExport
              name="videosOnly"
              caption="Select Videos"
              multiple={false}
              extensions="mp4,avi,mov,wmv"
              fileuploadmessage="Drop video files here"
            />
          </Box>

          {/* Audio */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Audio Only</Typography>
            <FileUploadDefaultExport
              name="audioOnly"
              caption="Select Audio"
              multiple={false}
              extensions="mp3,wav,ogg,m4a"
              fileuploadmessage="Drop audio files here"
            />
          </Box>

          {/* Progress Bar Upload */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Upload with Progress Bar</Typography>
            <FileUploadDefaultExport
              name="progressUpload"
              caption="Upload Files"
              multiple={false}
              fileuploadmessage="Drop files here to see progress"
              showprogressbar={true}
              showprogressbarpercentage={true}
            />
          </Box>

          {/* Multi-select */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Multi-Select Files (All Types)</Typography>
            <FileUploadDefaultExport
              name="multiSelect"
              caption="Select Files"
              multiple={true}
              fileuploadmessage="Drop any type of file here"
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args:{
    name: "showcaseFileUpload"
  },
  argTypes:{
    name: { table: { disable: true } },
  }
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "basicUpload",
    caption: "Select File",
    multiple: true,
    disabled: false,
    readonly: false,
    required: false,
    showprogressbar: false,
    showprogressbarpercentage: false,
    "data-design-token-target":true
  },
  argTypes: {
    caption: { control: "text" },
    multiple: { control: "boolean" },
    fileuploadmessage: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    contenttype: { control: "text" },
    extensions: {
      control: { type: "select" },
      options: ["", "jpg,jpeg,png,gif", "pdf,doc,docx,txt", "mp4,avi,mov", "xls,xlsx,csv"],
    },
    maxfilesize: { control: "text" },
    iconclass: { control: "select", options:["fa fa-upload", "wm-sl-l sl-cloud-upload"] },
    // cleariconclass: { control: "text" },
    // cleariconhint: { control: "text" },
    // deleteiconhint: { control: "text" },
    displayname: { control: "text" },
    hint: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    // filelistheight: { control: "number" },
    showprogressbar: { control: "boolean" },
    showprogressbarpercentage: { control: "boolean" },
    uploadpath: { control: "text" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: fileuploadTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "file-upload",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};