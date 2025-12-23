import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import LabelDefaultExport, { WmLabel as RawWmLabel } from "../../../../components/basic/label/index";

import { ComponentDocumentation } from "../../../components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
  },
  Widgets: {},
};

const meta = {
  title: "Basic/Label",
  component: LabelDefaultExport,
  args:{
    caption:"",
  },
  argTypes: {
    caption: { control: "text" },
    required: { control: "boolean" },
    // trustAs: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
    },
     className: {
      control: {
        type: "select",
      },
      options: ["text-primary", "text-secondary", "text-success", "text-danger", "text-warning", "text-info","text-muted","h1", "h2", "h3", "h4", "h5", "h6"],
    },
    // textalign:{
    //   control:{
    //     type:'select',
    //   },
    //   options:['left','center','right']
    // }
  },
} satisfies Meta<typeof LabelDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <LabelDefaultExport {...args} listener={mockListener} />
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
    name: "basicLabel",
    listener: mockListener,
    caption: "Label",
    required: false,
    type: "p",
    className:"text-primary",
    hint:"This is a basic label"
  },  
};

// export const Default: Story = {
//   render: Template,
//   args: {
//     name: "label1",
//     listener: mockListener,
//     caption: "Label",
//     required: false,
//     trustAs: false,
//     type: "p",
//   },
// };

// export const Required: Story = {
//   render: Template,
//   args: {
//     name: "requiredLabel",
//     listener: mockListener,
//     caption: "Full Name",
//     required: true,
//     type: "p",
//   },
// };

// export const Heading: Story = {
//   render: Template,
//   args: {
//     name: "headingLabel",
//     listener: mockListener,
//     caption: "Section Heading",
//     type: "h2",
//   },
// };

// export const WithLinks: Story = {
//   render: Template,
//   args: {
//     name: "labelWithLinks",
//     listener: mockListener,
//     caption: "Visit [Example](https://example.com) or [Docs](https://example.com/docs)",
//     trustAs: false,
//   },
// };

// export const TrustAsHTML: Story = {
//   render: Template,
//   args: {
//     name: "htmlLabel",
//     listener: mockListener,
//     caption: "<strong>Bold label</strong> with <em>HTML</em>",
//     trustAs: true,
//   },
// };

// // Demonstrate using the raw, unwrapped component (if someone wants to test the inner component directly)
// export const RawComponent: Story = {
//   render: (args) => (
//     <Box style={{ padding: 16 }}>
//       <RawWmLabel {...args} listener={mockListener} />
//     </Box>
//   ),
//   args: {
//     name: "rawLabel",
//     listener: mockListener,
//     caption: "Raw Test component Label",
//     type: "p",
//   },
// };
