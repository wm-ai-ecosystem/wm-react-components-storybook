import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import CompositeDefaultExport from "../../../../components/input/composite/index";

// Mock WmLabel component for demonstration
const WmLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="app-label control-label" style={{ display: "block", marginBottom: "4px" }}>
    {children}
    {required && <span style={{ color: "red", marginLeft: "4px" }}>*</span>}
  </label>
);

const meta: Meta<typeof CompositeDefaultExport> = {
  title: "Input/Composite",
  component: CompositeDefaultExport,
  argTypes: {
    captionposition: {
      control: { type: "select" },
      options: ["left", "right", "top", "floating"],
    },
    required: { control: "boolean" },
    className: { control: "text" },
    id: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <CompositeDefaultExport {...args} />
  </Box>
);

export const Default: Story = {
  render: Template,
  args: {
    captionposition: "left",
    children: (
      <>
        <WmLabel>Name</WmLabel>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const CaptionLeft: Story = {
  render: Template,
  args: {
    captionposition: "left",
    children: (
      <>
        <WmLabel>Email Address</WmLabel>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const CaptionRight: Story = {
  render: Template,
  args: {
    captionposition: "right",
    children: (
      <>
        <input
          type="text"
          className="form-control"
          placeholder="Enter value"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
        <WmLabel>Label on Right</WmLabel>
      </>
    ),
  },
};

export const CaptionTop: Story = {
  render: Template,
  args: {
    captionposition: "top",
    children: (
      <>
        <WmLabel>Username</WmLabel>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const CaptionFloating: Story = {
  render: Template,
  args: {
    captionposition: "floating",
    children: (
      <>
        <WmLabel>Phone Number</WmLabel>
        <input
          type="tel"
          className="form-control"
          placeholder="Enter phone number"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const RequiredField: Story = {
  render: Template,
  args: {
    captionposition: "left",
    required: true,
    children: (
      <>
        <WmLabel>Required Field</WmLabel>
        <input
          type="text"
          className="form-control"
          placeholder="This field is required"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const WithTextArea: Story = {
  render: Template,
  args: {
    captionposition: "top",
    children: (
      <>
        <WmLabel>Description</WmLabel>
        <textarea
          className="form-control"
          placeholder="Enter description"
          rows={4}
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const WithSelect: Story = {
  render: Template,
  args: {
    captionposition: "left",
    children: (
      <>
        <WmLabel>Country</WmLabel>
        <select
          className="form-control"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        >
          <option value="">Select country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </select>
      </>
    ),
  },
};

export const WithNumberInput: Story = {
  render: Template,
  args: {
    captionposition: "left",
    children: (
      <>
        <WmLabel>Age</WmLabel>
        <input
          type="number"
          className="form-control"
          placeholder="Enter age"
          min="0"
          max="120"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const WithDateInput: Story = {
  render: Template,
  args: {
    captionposition: "left",
    children: (
      <>
        <WmLabel>Birth Date</WmLabel>
        <input
          type="date"
          className="form-control"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const WithCheckbox: Story = {
  render: Template,
  args: {
    captionposition: "left",
    children: (
      <>
        <WmLabel>Accept Terms</WmLabel>
        <input type="checkbox" style={{ marginTop: "8px" }} />
      </>
    ),
  },
};

export const CustomStyles: Story = {
  render: Template,
  args: {
    captionposition: "left",
    styles: {
      backgroundColor: "#F5F5F5",
      padding: "16px",
      borderRadius: "8px",
      border: "2px solid #E0E0E0",
    },
    children: (
      <>
        <WmLabel>Styled Field</WmLabel>
        <input
          type="text"
          className="form-control"
          placeholder="Custom styled composite"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const CustomClassName: Story = {
  render: Template,
  args: {
    captionposition: "left",
    className: "custom-composite-class",
    children: (
      <>
        <WmLabel>Custom Class</WmLabel>
        <input
          type="text"
          className="form-control"
          placeholder="With custom class"
          style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
        />
      </>
    ),
  },
};

export const CaptionPositionComparison: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Typography variant="h6" mb={3}>
          Caption Position Comparison
        </Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle1" mb={2}>
              Left Position (Default)
            </Typography>
            <CompositeDefaultExport captionposition="left">
              <WmLabel>Label Left</WmLabel>
              <input
                type="text"
                className="form-control"
                placeholder="Enter value"
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
              />
            </CompositeDefaultExport>
          </Box>

          <Box>
            <Typography variant="subtitle1" mb={2}>
              Right Position
            </Typography>
            <CompositeDefaultExport captionposition="right">
              <input
                type="text"
                className="form-control"
                placeholder="Enter value"
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
              />
              <WmLabel>Label Right</WmLabel>
            </CompositeDefaultExport>
          </Box>

          <Box>
            <Typography variant="subtitle1" mb={2}>
              Top Position
            </Typography>
            <CompositeDefaultExport captionposition="top">
              <WmLabel>Label Top</WmLabel>
              <input
                type="text"
                className="form-control"
                placeholder="Enter value"
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
              />
            </CompositeDefaultExport>
          </Box>

          <Box>
            <Typography variant="subtitle1" mb={2}>
              Floating Position (Click input to see effect)
            </Typography>
            <CompositeDefaultExport captionposition="floating">
              <WmLabel>Floating Label</WmLabel>
              <input
                type="text"
                className="form-control"
                placeholder="Enter value"
                style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
              />
            </CompositeDefaultExport>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {},
};

export const FormExample: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          User Registration Form
        </Typography>
        <Stack spacing={3}>
          <CompositeDefaultExport captionposition="top" required={true}>
            <WmLabel>Full Name</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="top" required={true}>
            <WmLabel>Email</WmLabel>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email address"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="top" required={true}>
            <WmLabel>Password</WmLabel>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="top">
            <WmLabel>Phone Number</WmLabel>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter phone number"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="top">
            <WmLabel>Country</WmLabel>
            <select
              className="form-control"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            >
              <option value="">Select country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
            </select>
          </CompositeDefaultExport>
        </Stack>
      </Box>
    );
  },
  args: {},
};

export const FloatingLabelDemo: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Floating Label Examples
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Click on input fields to see the floating label effect. Labels move up when focused or when input has value.
        </Typography>
        <Stack spacing={3}>
          <CompositeDefaultExport captionposition="floating">
            <WmLabel>First Name</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="floating">
            <WmLabel>Last Name</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="floating">
            <WmLabel>Email Address</WmLabel>
            <input
              type="email"
              className="form-control"
              placeholder="your@email.com"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="floating">
            <WmLabel>Message</WmLabel>
            <textarea
              className="form-control"
              placeholder="Type your message here"
              rows={4}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>
        </Stack>
      </Box>
    );
  },
  args: {},
};

export const RequiredFieldsForm: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Required Fields Example
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Fields marked with * are required
        </Typography>
        <Stack spacing={3}>
          <CompositeDefaultExport captionposition="left" required={true}>
            <WmLabel>Username</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="Required field"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left" required={true}>
            <WmLabel>Email</WmLabel>
            <input
              type="email"
              className="form-control"
              placeholder="Required field"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left" required={false}>
            <WmLabel>Phone</WmLabel>
            <input
              type="tel"
              className="form-control"
              placeholder="Optional field"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left" required={true}>
            <WmLabel>Department</WmLabel>
            <select
              className="form-control"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            >
              <option value="">Select department</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="it">IT</option>
            </select>
          </CompositeDefaultExport>
        </Stack>
      </Box>
    );
  },
  args: {},
};

export const MultipleInputTypes: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Various Input Types
        </Typography>
        <Stack spacing={3}>
          <CompositeDefaultExport captionposition="left">
            <WmLabel>Text Input</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="Text input"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Email Input</WmLabel>
            <input
              type="email"
              className="form-control"
              placeholder="Email input"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Number Input</WmLabel>
            <input
              type="number"
              className="form-control"
              placeholder="Number input"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Date Input</WmLabel>
            <input
              type="date"
              className="form-control"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Time Input</WmLabel>
            <input
              type="time"
              className="form-control"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Color Input</WmLabel>
            <input
              type="color"
              className="form-control"
              style={{ padding: "4px", border: "1px solid #ddd", borderRadius: "4px", width: "100px" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Select Input</WmLabel>
            <select
              className="form-control"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Textarea</WmLabel>
            <textarea
              className="form-control"
              placeholder="Textarea input"
              rows={3}
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>
        </Stack>
      </Box>
    );
  },
  args: {},
};

export const LeftCaptionLayout: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 800 }}>
        <Typography variant="h6" mb={3}>
          Left Caption Layout (Traditional Form)
        </Typography>
        <Stack spacing={2}>
          <CompositeDefaultExport captionposition="left">
            <WmLabel>First Name</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="John"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Last Name</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="Doe"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="left">
            <WmLabel>Email</WmLabel>
            <input
              type="email"
              className="form-control"
              placeholder="john@example.com"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>
        </Stack>
      </Box>
    );
  },
  args: {},
};

export const TopCaptionLayout: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Top Caption Layout (Modern Form)
        </Typography>
        <Stack spacing={2}>
          <CompositeDefaultExport captionposition="top">
            <WmLabel>First Name</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="John"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="top">
            <WmLabel>Last Name</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="Doe"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="top">
            <WmLabel>Email</WmLabel>
            <input
              type="email"
              className="form-control"
              placeholder="john@example.com"
              style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
            />
          </CompositeDefaultExport>
        </Stack>
      </Box>
    );
  },
  args: {},
};

export const CompactForm: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, maxWidth: 400 }}>
        <Typography variant="h6" mb={3}>
          Compact Form Layout
        </Typography>
        <Stack spacing={2}>
          <CompositeDefaultExport captionposition="top" required={true}>
            <WmLabel>Login</WmLabel>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              style={{ padding: "6px 8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%", fontSize: "14px" }}
            />
          </CompositeDefaultExport>

          <CompositeDefaultExport captionposition="top" required={true}>
            <WmLabel>Password</WmLabel>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              style={{ padding: "6px 8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%", fontSize: "14px" }}
            />
          </CompositeDefaultExport>
        </Stack>
      </Box>
    );
  },
  args: {},
};
