import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";

import LoginDefaultExport from "../../../../components/advanced/login/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof LoginDefaultExport> = {
  title: "Advanced/Login",
  component: LoginDefaultExport,
  argTypes: {
    show: { control: "boolean" },
    errormessage: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock listener object for the component
const mockListener = {
  appLocale: {
    LABEL_ICON: "Icon",
    MESSAGE_ERROR_TITLE: "Error",
    MESSAGE_LOGIN_FAILED: "Login failed. Please check your credentials.",
  },
  Widgets: {},
  onChange: () => {},
};

// Mock event source for login action
const mockEventSource = {
  invoke: (data: any, onSuccess: () => void, onError: (error?: any) => void) => {
    // Simulate API call
    setTimeout(() => {
      if (data.formData.username === "demo" && data.formData.password === "demo") {
        onSuccess();
      } else {
        onError({ message: "Invalid username or password" });
      }
    }, 1000);
  },
};

const Template = (args: any) => (
  <Box
    style={{
      padding: 16,
      minHeight: "500px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      height: "500px", width: "800px"
    }}
  >
    <LoginDefaultExport {...args} listener={mockListener}>
      {args.children}
    </LoginDefaultExport>
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
  args:{} as any,
  argTypes:{
    show: {table: {disable: true}},
    errormessage: {table: {disable: true}}
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardLogin",
    listener: mockListener,
    eventSource: mockEventSource,
    show: true,
    children: (
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" mb={3} textAlign="center" fontWeight="600">
            Hello, Welcome Back
          </Typography>
          <form role="form">
            <Stack spacing={2.5}>
              <TextField name="username" label="Email or Username" fullWidth required />
              <TextField name="password" label="Password" type="password" fullWidth required />
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <FormControlLabel control={<Checkbox size="small" />} label="Remember me" />
                <Link href="#" variant="body2" underline="hover">
                  Forgot password?
                </Link>
              </Box>
              <Button
                name="loginButton"
                variant="contained"
                size="large"
                fullWidth
                className="app-login-button"
              >
                Login
              </Button>
            </Stack>
          </form>
          <Typography variant="body2" textAlign="center" mt={2} color="text.secondary">
            Don't have an account?{" "}
            <Link href="#" underline="hover">
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    ),
  },
  argTypes:{
    name: {table: {disable: true}},
    listener: {table: {disable:true}},
    children: {table: {disable: true}},
    eventSource: {table: {disable: true}},
    show:{table:{disable:true}}
  }
};