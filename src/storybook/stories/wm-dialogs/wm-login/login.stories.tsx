import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import LoginDialogDefaultExport from "../../../../components/dialogs/login-dialog/index";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";

import { iconClassNames } from "../../constants/iconClassConstants";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
// import styling from "./docs/styling.md?raw";
import style from "./docs/style.md?raw";
import token from "./docs/token.md?raw";

const mockListener = {
  appLocale: {
    LABEL_USERNAME: "Username",
    LABEL_PASSWORD: "Password",
    MESSAGE_ERROR_LOGIN: "Login failed",
  },
  Widgets: {},
};

const meta = {
  title: "Dialogs/Login Dialog",
  component: LoginDialogDefaultExport,
} satisfies Meta<typeof LoginDialogDefaultExport>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock event source for login
const createMockEventSource = (shouldSucceed = true, delay = 1000) => ({
  invoke: (
    params: { formData?: any },
    onSuccess: () => void,
    onError: (error?: any) => void
  ) => {
    setTimeout(() => {
      if (shouldSucceed) {
        console.log("Login successful with data:", params.formData);
        onSuccess();
      } else {
        console.log("Login failed with data:", params.formData);
        onError({ message: "Invalid credentials" });
      }
    }, delay);
  },
});

// Simple login form component
const LoginForm = (args: any) => (
  <form style={{ padding: "20px" }}>
    <Stack spacing={2}>
      <Box>
        <label
          htmlFor="j_username"
          style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
        >
          Username:
        </label>
        <input
          id="j_username"
          name="j_username"
          type="text"
          required
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          }}
          placeholder="Enter your username"
        />
      </Box>
      <Box>
        <label
          htmlFor="j_password"
          style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
        >
          Password:
        </label>
        <input
          id="j_password"
          name="j_password"
          type="password"
          required
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          }}
          placeholder="Enter your password"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, pt: 1 }}>
        <button
          type="button"
          data-role="cancelbutton"
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {args.canceltext}
        </button>
        <button
          type="submit"
          data-role="loginbutton"
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {args.logintext}
        </button>
      </Box>
    </Stack>
  </form>
);

const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box style={{ padding: 16 }}>
      <WmButton
        name="openLoginBtn"
        caption="Open Login Dialog"
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
      <LoginDialogDefaultExport
        {...args}
        isopen={isOpen}
        onClose={() => setIsOpen(false)}
        close={() => setIsOpen(false)}
        listener={mockListener}
        appLocale={mockListener.appLocale}
      >
        <LoginForm {...args} />
      </LoginDialogDefaultExport>
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
    name:"docsLoginForm",
    listener:mockListener
  },
  argTypes:{
    name: {table: {disable: true}},
    listener:{table: {disable: true}},
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
    title: "Login",
    iconclass: "wi wi-sign-in",
    logintext: "Login",
    canceltext: "Cancel",
    eventsource: createMockEventSource(true, 1000),
    listener: mockListener,
    // sheetposition:undefined
  },
  argTypes: {
    title: { control: "text" },
    iconclass:{ control:{ type:"select"}, options: iconClassNames },
    logintext: { control: "text" },
    canceltext: { control: "text" },
    errormessage: { control: "text" },
    name: {table: {disable: true}},
    listener:{table: {disable: true}},
    eventsource:{table: {disable:true}},
    // sheetposition:{control:{ type:"select"}, options: ['top', 'bottom', 'left', 'right']},
  },
};