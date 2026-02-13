import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import RichTextEditorDefaultExport from "../../../../components/basic/richtexteditor/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import richTextEditTokensData from "../../../../designTokens/components/richtext-editor/richtext-editor.json";

const meta: Meta<typeof RichTextEditorDefaultExport> = {
  title: "Basic/RichTextEditor",
  component: RichTextEditorDefaultExport,
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

const Template = (args: any) => {
   // component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
    return (
      <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
        <RichTextEditorDefaultExport {...componentArgs} listener={mockListener} />
      </Box>
    );
}

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
    name:"docsRichTextEditor",
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
    const editors = [
      {
        title: "Basic Editor",
        props: {
          name: "basicEditor",
          placeholder: "Start typing...",
          readonly: false,
          disabled: false,
          showpreview: false,
          height: "200px",
        },
      },
      {
        title: "Editor with Preview",
        props: {
          name: "previewEditor",
          datavalue: `<p>Edit the content above and see the rendered preview below.</p>`,
          readonly: false,
          disabled: false,
          showpreview: true,
          height: "250px",
        },
      },
      {
        title: "Read-Only Editor",
        props: {
          name: "readonlyEditor",
          datavalue: `
            <h3>Read-only Content</h3>
            <p>This content cannot be edited.</p>
            <p>Even multiple paragraphs and line breaks are preserved.</p>
          `,
          readonly: true,
          disabled: false,
          showpreview: true,
          height: "220px",
        },
      },
      {
        title: "Disabled Editor",
        props: {
          name: "disabledEditor",
          datavalue: `
            <p>This editor is disabled.</p>
            <p>User cannot type or modify content.</p>
          `,
          readonly: false,
          disabled: true,
          showpreview: true,
          height: "220px",
        },
      },
      {
        title: "Rich HTML Content",
        props: {
          name: "richContentEditor",
          datavalue: `
            <h2>Main Heading</h2>
            <h3>Subheading</h3>
            <p>This is a paragraph with <strong>bold</strong>, <em>italic</em>, and <u>underlined</u> text.</p>
            <ul>
              <li>Unordered list item 1</li>
              <li>Unordered list item 2</li>
              <li>Unordered list item 3</li>
            </ul>
            <ol>
              <li>Ordered list item 1</li>
              <li>Ordered list item 2</li>
            </ol>
            <p>Colored text: <span style="color: red;">red</span>, Highlight: <span style="background-color: yellow;">yellow</span></p>
          `,
          readonly: false,
          disabled: false,
          showpreview: true,
          height: "300px",
        },
      },
      {
        title: "Custom Size Editor",
        props: {
          name: "customSizeEditor",
          placeholder: "Custom width (600px) and height (300px)",
          width: "600px",
          height: "300px",
          readonly: false,
          disabled: false,
          showpreview: true,
        },
      },
    ];

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600} mb={3}>
          RichTextEditor Showcase
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 4,
          }}
        >
          {editors.map((editor, index) => (
            <Box key={index}>
              <Typography variant="subtitle2" mb={1}>
                {editor.title}
              </Typography>
              <RichTextEditorDefaultExport
                {...editor.props}
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
    name: "showcaseEditor",
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
    name: "standardRichTextEditor",
    listener: mockListener,
    placeholder: "Start typing...",
    readonly: false,
    disabled: false,
    showpreview: false,
     "data-design-token-target": true,
  },
  argTypes: {
    placeholder: { control: "text" },
    datavalue: { control: "text" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    showpreview: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
    "data-design-token-target": { table: { disable: true } },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    designTokens: {
      enabled: false,
      tokenData: richTextEditTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "note",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};