import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import IconDefaultExport from "../../../../components/basic/icon/index";

const meta: Meta<typeof IconDefaultExport> = {
  title: "Basic/Icon",
  component: IconDefaultExport,
  argTypes: {
    caption: { control: "text" },
    iconclass: { control: "text" },
    iconurl: { control: "text" },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconsize: { control: "text" },
    // arialabel: { control: "text" },
    // prefabName: { control: "text" },
    // hint: { control: "text" },
  },
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

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <IconDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicIcon",
    listener: mockListener,
    iconclass: "wm-sl-l sl-star",
    iconsize: "24px",
  },
};

export const WithCaption: Story = {
  render: Template,
  args: {
    name: "iconWithCaption",
    listener: mockListener,
    caption: "User Profile",
    iconclass: "wm-sl-l sl-user",
    iconsize: "24px",
    iconposition: "left",
  },
};

export const WithImageUrl: Story = {
  render: Template,
  args: {
    name: "imageIcon",
    listener: mockListener,
    caption: "Custom Image",
    iconurl: "https://picsum.photos/200",
    iconsize: "32px",
    iconposition: "left",
    styles: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  },
};

// export const CaptionRight: Story = {
//   render: Template,
//   args: {
//     name: "captionRight",
//     listener: mockListener,
//     caption: "Settings",
//     iconclass: "wm-sl-l sl-settings",
//     iconsize: "24px",
//     iconposition: "right",
//     styles: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//   },
// };

// export const LargeIcon: Story = {
//   render: Template,
//   args: {
//     name: "largeIcon",
//     listener: mockListener,
//     caption: "Large Star",
//     iconclass: "wm-sl-l sl-star",
//     iconsize: "48px",
//     iconposition: "left",
//     styles: {
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//     },
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     caption: "Help",
//     iconclass: "wm-sl-l sl-help-circle",
//     iconsize: "24px",
//     hint: "Click for help information",
//     arialabel: "Help icon",
//     styles: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "customStyles",
//     listener: mockListener,
//     caption: "Styled Icon",
//     iconclass: "wm-sl-l sl-heart",
//     iconsize: "32px",
//     styles: {
//       display: "flex",
//       alignItems: "center",
//       color: "#e74c3c",
//       gap: "8px",
//       fontWeight: "600",
//     },
//   },
// };

// export const IconGroup: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Common Icons:</Typography>
//           <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 2 }}>
//             <IconDefaultExport
//               name="home"
//               caption="Home"
//               iconclass="wm-sl-l sl-home"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//             <IconDefaultExport
//               name="user"
//               caption="User"
//               iconclass="wm-sl-l sl-user"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//             <IconDefaultExport
//               name="settings"
//               caption="Settings"
//               iconclass="wm-sl-l sl-settings"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//             <IconDefaultExport
//               name="mail"
//               caption="Mail"
//               iconclass="wm-sl-l sl-envelope"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//             <IconDefaultExport
//               name="bell"
//               caption="Notifications"
//               iconclass="wm-sl-l sl-bell"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "iconGroup",
//     listener: mockListener,
//   },
// };

// export const DifferentSizes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="subtitle1">Icon Sizes:</Typography>
//           <Stack direction="row" spacing={3} alignItems="center">
//             <IconDefaultExport
//               name="small"
//               caption="Small"
//               iconclass="wm-sl-l sl-star"
//               iconsize="16px"
//               listener={mockListener}
//               styles={{ display: "flex", alignItems: "center", gap: "4px" }}
//             />
//             <IconDefaultExport
//               name="medium"
//               caption="Medium"
//               iconclass="wm-sl-l sl-star"
//               iconsize="24px"
//               listener={mockListener}
//               styles={{ display: "flex", alignItems: "center", gap: "6px" }}
//             />
//             <IconDefaultExport
//               name="large"
//               caption="Large"
//               iconclass="wm-sl-l sl-star"
//               iconsize="32px"
//               listener={mockListener}
//               styles={{ display: "flex", alignItems: "center", gap: "8px" }}
//             />
//             <IconDefaultExport
//               name="xlarge"
//               caption="X-Large"
//               iconclass="wm-sl-l sl-star"
//               iconsize="48px"
//               listener={mockListener}
//               styles={{ display: "flex", alignItems: "center", gap: "10px" }}
//             />
//           </Stack>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "differentSizes",
//     listener: mockListener,
//   },
// };
