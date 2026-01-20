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
import styling from "./docs/styling.md?raw";
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
  // argTypes: {
  //   title: { control: "text" },
  //   iconclass: { control: "select", options: ["fa fa-circle-check", "fa fa-trash", "fa fa-save", "fa fa-file", "fa-fa-user"] },
  //   logintext: { control: "text" },
  //   canceltext: { control: "text" },
  //   errormessage: { control: "text" },
  // },
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
const LoginForm = () => (
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
          Cancel
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
          Login
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
        <LoginForm />
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
  parameters: {
    layout: 'fullscreen',
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicLogin",
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
    // sheetposition:{control:{ type:"select"}, options: [undefined, 'top', 'bottom', 'left', 'right']},
  },
};

// export const CustomTitle: Story = {
//   render: Template,
//   args: {
//     name: "customTitleLogin",
//     title: "Sign In to Continue",
//     iconclass: "wi wi-lock",
//     logintext: "Sign In",
//     canceltext: "Cancel",
//     eventsource: createMockEventSource(true, 1000),
//   },
// };

// export const AdminLogin: Story = {
//   render: Template,
//   args: {
//     name: "adminLogin",
//     title: "Admin Portal",
//     iconclass: "wi wi-shield",
//     logintext: "Access",
//     canceltext: "Back",
//     eventsource: createMockEventSource(true, 1000),
//   },
// };

// export const WithCustomError: Story = {
//   render: Template,
//   args: {
//     name: "customErrorLogin",
//     title: "Login",
//     iconclass: "wi wi-user",
//     logintext: "Login",
//     canceltext: "Cancel",
//     errormessage: "Authentication failed. Please check your credentials and try again.",
//     eventsource: createMockEventSource(false, 1000),
//   },
// };

// export const SuccessfulLogin: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [loginStatus, setLoginStatus] = useState<string>("");

//     const handleSuccess = () => {
//       setLoginStatus("Login successful!");
//       setIsOpen(false);
//     };

//     const handleError = () => {
//       setLoginStatus("Login failed!");
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <WmButton
//             name="openSuccessLoginBtn"
//             caption="Open Login (Will Succeed)"
//             onClick={() => {
//               setIsOpen(true);
//               setLoginStatus("");
//             }}
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#28a745",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />

//           {loginStatus && (
//             <Box
//               sx={{
//                 padding: 2,
//                 backgroundColor: loginStatus.includes("successful") ? "#d4edda" : "#f8d7da",
//                 color: loginStatus.includes("successful") ? "#155724" : "#721c24",
//                 borderRadius: 1,
//               }}
//             >
//               <Typography variant="body2">{loginStatus}</Typography>
//             </Box>
//           )}

//           <LoginDialogDefaultExport
//             name="successLogin"
//             title="Login"
//             iconclass="wi wi-user"
//             logintext="Login"
//             canceltext="Cancel"
//             isopen={isOpen}
//             onClose={() => setIsOpen(false)}
//             close={() => setIsOpen(false)}
//             onSuccess={handleSuccess}
//             onError={handleError}
//             eventsource={createMockEventSource(true, 1500)}
//             listener={mockListener}
//             appLocale={mockListener.appLocale}
//           >
//             <LoginForm />
//           </LoginDialogDefaultExport>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const FailedLogin: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [loginStatus, setLoginStatus] = useState<string>("");

//     const handleSuccess = () => {
//       setLoginStatus("Login successful!");
//       setIsOpen(false);
//     };

//     const handleError = () => {
//       setLoginStatus("Login failed! Invalid credentials.");
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <WmButton
//             name="openFailLoginBtn"
//             caption="Open Login (Will Fail)"
//             onClick={() => {
//               setIsOpen(true);
//               setLoginStatus("");
//             }}
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#dc3545",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />

//           {loginStatus && (
//             <Box
//               sx={{
//                 padding: 2,
//                 backgroundColor: loginStatus.includes("successful") ? "#d4edda" : "#f8d7da",
//                 color: loginStatus.includes("successful") ? "#155724" : "#721c24",
//                 borderRadius: 1,
//               }}
//             >
//               <Typography variant="body2">{loginStatus}</Typography>
//             </Box>
//           )}

//           <LoginDialogDefaultExport
//             name="failLogin"
//             title="Login"
//             iconclass="wi wi-user"
//             logintext="Login"
//             canceltext="Cancel"
//             errormessage="Invalid username or password"
//             isopen={isOpen}
//             onClose={() => setIsOpen(false)}
//             close={() => setIsOpen(false)}
//             onSuccess={handleSuccess}
//             onError={handleError}
//             eventsource={createMockEventSource(false, 1500)}
//             listener={mockListener}
//             appLocale={mockListener.appLocale}
//           >
//             <LoginForm />
//           </LoginDialogDefaultExport>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const Interactive: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [eventLog, setEventLog] = useState<string[]>([]);
//     const [shouldSucceed, setShouldSucceed] = useState(true);

//     const addLog = (message: string) => {
//       const timestamp = new Date().toLocaleTimeString();
//       setEventLog((prev) => [...prev.slice(-4), `[${timestamp}] ${message}`]);
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Stack direction="row" spacing={2}>
//             <WmButton
//               name="openSuccessBtn"
//               caption="Open (Success Mode)"
//               onClick={() => {
//                 setIsOpen(true);
//                 setShouldSucceed(true);
//                 addLog("Login dialog opened (Success Mode)");
//               }}
//               listener={mockListener}
//               styles={{
//                 backgroundColor: "#28a745",
//                 color: "white",
//                 padding: "8px 16px",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 fontWeight: "500",
//               }}
//             />
//             <WmButton
//               name="openFailBtn"
//               caption="Open (Fail Mode)"
//               onClick={() => {
//                 setIsOpen(true);
//                 setShouldSucceed(false);
//                 addLog("Login dialog opened (Fail Mode)");
//               }}
//               listener={mockListener}
//               styles={{
//                 backgroundColor: "#dc3545",
//                 color: "white",
//                 padding: "8px 16px",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 fontWeight: "500",
//               }}
//             />
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

//           <LoginDialogDefaultExport
//             name="interactiveLogin"
//             title="Interactive Login"
//             iconclass="wi wi-user"
//             logintext="Login"
//             canceltext="Cancel"
//             isopen={isOpen}
//             onClose={() => {
//               setIsOpen(false);
//               addLog("Dialog closed");
//             }}
//             close={() => {
//               setIsOpen(false);
//               addLog("Dialog closed via close button");
//             }}
//             onSuccess={() => {
//               addLog("Login successful!");
//               setIsOpen(false);
//             }}
//             onError={() => {
//               addLog("Login failed!");
//             }}
//             onSubmit={() => {
//               addLog("Login form submitted");
//             }}
//             eventsource={createMockEventSource(shouldSucceed, 1000)}
//             listener={mockListener}
//             appLocale={mockListener.appLocale}
//           >
//             <LoginForm />
//           </LoginDialogDefaultExport>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const WithRememberMe: Story = {
//   render: Template,
//   args: {
//     name: "rememberMeLogin",
//     title: "Login",
//     iconclass: "wi wi-user",
//     logintext: "Login",
//     canceltext: "Cancel",
//     eventsource: createMockEventSource(true, 1000),
//     children: (
//       <form style={{ padding: "20px" }}>
//         <Stack spacing={2}>
//           <Box>
//             <label
//               htmlFor="username_rm"
//               style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
//             >
//               Username:
//             </label>
//             <input
//               id="username_rm"
//               name="j_username"
//               type="text"
//               required
//               style={{
//                 width: "100%",
//                 padding: "8px 12px",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 fontSize: "14px",
//               }}
//               placeholder="Enter your username"
//             />
//           </Box>
//           <Box>
//             <label
//               htmlFor="password_rm"
//               style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}
//             >
//               Password:
//             </label>
//             <input
//               id="password_rm"
//               name="j_password"
//               type="password"
//               required
//               style={{
//                 width: "100%",
//                 padding: "8px 12px",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 fontSize: "14px",
//               }}
//               placeholder="Enter your password"
//             />
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <input type="checkbox" id="remember" name="remember" />
//             <label htmlFor="remember" style={{ fontSize: "14px" }}>
//               Remember me
//             </label>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <a
//               href="#"
//               style={{ fontSize: "14px", color: "#007bff", textDecoration: "none" }}
//               onClick={(e) => e.preventDefault()}
//             >
//               Forgot password?
//             </a>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <button
//                 type="button"
//                 data-role="cancelbutton"
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#6c757d",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 data-role="loginbutton"
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                 }}
//               >
//                 Login
//               </button>
//             </Box>
//           </Box>
//         </Stack>
//       </form>
//     ),
//   },
// };
