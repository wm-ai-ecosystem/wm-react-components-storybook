import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import ButtonDefaultExport from "../../../../components/form/button/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
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
  title: "Basic/Button",
  component: ButtonDefaultExport,
  argTypes: {
    caption: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    iconposition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    iconwidth: { control: "text" },
    iconheight: { control: "text" },
    iconmargin: { control: "text" },
    badgevalue: { control: "text" },
    shortcutkey: { control: "text" },
    arialabel: { control: "text" },
    iconclass:{
      control:{
        type:"select"
      },
      options:["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", 
        "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-balance-scale", "fa fa-bank", "fa fa-bar-chart", "fa fa-github"],
    },
    className: {
  control: "select",
  options: [
    // Filled
    "btn-filled btn-primary",
    "btn-filled btn-secondary",
    "btn-filled btn-success",
    "btn-filled btn-danger",
    "btn-filled btn-warning",
    "btn-filled btn-info",
    "btn-filled btn-default",

    // Outlined
    "btn-outlined btn-primary",
    "btn-outlined btn-secondary",
    "btn-outlined btn-success",
    "btn-outlined btn-danger",
    "btn-outlined btn-warning",
    "btn-outlined btn-info",
    "btn-outlined btn-default",

    // Special
    "btn-link",
    "btn-transparent",
    "no-border",

    // Sizes (example with primary)
    "btn-filled btn-primary btn-sm",
    "btn-filled btn-primary btn-lg",
    "btn-filled btn-primary btn-xs",
  ],
}
  }
} satisfies Meta<typeof ButtonDefaultExport>;

export default meta;

type Story = StoryObj<typeof meta>;
const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <ButtonDefaultExport {...args} listener={mockListener} />
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
    name: "basicButton",
    caption: "Click Me",
    disabled: false,
    type: "button",
    className: "btn-default btn-filled"
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Button Showcase
          </Typography>

          {/* Row 1: Common Buttons */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Common Variants
            </Typography>

            <Stack
              direction="row"
              spacing={4}
              sx={{ flexWrap: "wrap", alignItems: "center" }}
            >
              {/* Default Filled */}
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Default
                </Typography>
                <ButtonDefaultExport
                  name="filledDefault"
                  caption="Filled Button"
                  type="button"
                  className="btn-filled btn-default"
                  listener={mockListener}
                />
              </Stack>

              {/* Filled with Icon */}
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Icon
                </Typography>
                <ButtonDefaultExport
                  name="filledIcon"
                  caption="Icon Button"
                  type="button"
                  className="btn-filled btn-default"
                  iconclass="fa fa-anchor"
                  iconposition="left"
                  iconwidth="16px"
                  iconheight="16px"
                  iconmargin="0 8px 0 0"
                  listener={mockListener}
                />
              </Stack>

              {/* Filled with Badge */}
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Badge
                </Typography>
                <ButtonDefaultExport
                  name="filledBadge"
                  caption="Notifications"
                  type="button"
                  className="btn-filled btn-default"
                  iconclass="fa fa-bell"
                  iconposition="left"
                  iconwidth="16px"
                  iconheight="16px"
                  iconmargin="0 8px 0 0"
                  badgevalue="3"
                  listener={mockListener}
                />
              </Stack>
            </Stack>
          </Stack>

          {/* Row 2: Filled Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Filled Variants
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 3,
                maxWidth: 900,
              }}
            >
              <ButtonDefaultExport
                name="filledPrimary"
                caption="Primary"
                type="button"
                className="btn-filled btn-primary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledSecondary"
                caption="Secondary"
                type="button"
                className="btn-filled btn-secondary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledSuccess"
                caption="Success"
                type="button"
                className="btn-filled btn-success"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledDanger"
                caption="Danger"
                type="button"
                className="btn-filled btn-danger"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledWarning"
                caption="Warning"
                type="button"
                className="btn-filled btn-warning"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="filledInfo"
                caption="Info"
                type="button"
                className="btn-filled btn-info"
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Row 3: Outlined Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Outlined Variants
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 3,
                maxWidth: 900,
              }}
            >
              <ButtonDefaultExport
                name="outlinedPrimary"
                caption="Primary"
                type="button"
                className="btn-outlined btn-primary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedSecondary"
                caption="Secondary"
                type="button"
                className="btn-outlined btn-secondary"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedSuccess"
                caption="Success"
                type="button"
                className="btn-outlined btn-success"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedDanger"
                caption="Danger"
                type="button"
                className="btn-outlined btn-danger"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedWarning"
                caption="Warning"
                type="button"
                className="btn-outlined btn-warning"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="outlinedInfo"
                caption="Info"
                type="button"
                className="btn-outlined btn-info"
                listener={mockListener}
              />
            </Box>
          </Stack>

          {/* Row 4: Size Variants */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Size Variants
            </Typography>

            <Stack direction="row" flexWrap="wrap" sx={{ gap: 3 }}>
              <ButtonDefaultExport
                name="sizeXs"
                caption="Extra Small"
                type="button"
                className="btn-filled btn-default btn-xs"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="sizeSm"
                caption="Small"
                type="button"
                className="btn-filled btn-default btn-sm"
                listener={mockListener}
              />
              <ButtonDefaultExport
                name="sizeLg"
                caption="Large"
                type="button"
                className="btn-filled btn-default btn-lg"
                listener={mockListener}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "buttonShowcase",
    listener: mockListener,
  },
};


// export const Primary: Story = {
//   render: Template,
//   args: {
//     name: "primaryButton",
//     caption: "Primary Button",
//     disabled: false,
//     type: "button",
//     styles: {
//       backgroundColor: "#007bff",
//       color: "white",
//       padding: "8px 16px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "500",
//     },
//   },
// };

// // Interactive story with click handler
// export const Interactive: Story = {
//   render: () => {
//     const [clickCount, setClickCount] = useState(0);
//     const [lastAction, setLastAction] = useState<string>("");

//     const handleClick = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
//       setClickCount(prev => prev + 1);
//       setLastAction("Clicked");
//     };

//     const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Double-clicked");
//     };

//     const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Mouse entered");
//     };

//     const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Mouse left");
//     };

//     const handleFocus = (e: React.FocusEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Focused");
//     };

//     const handleBlur = (e: React.FocusEvent<HTMLButtonElement>, props: any) => {
//       setLastAction("Blurred");
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <ButtonDefaultExport
//             name="interactiveBtn"
//             caption="Interactive Button"
//             disabled={false}
//             type="button"
//             listener={mockListener}
//             onClick={handleClick}
//             onDoubleClick={handleDoubleClick}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//             styles={{
//               backgroundColor: "#007bff",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />

//           <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
//             <Typography variant="subtitle2">Event Log:</Typography>
//             <Typography variant="body2">Click Count: {clickCount}</Typography>
//             <Typography variant="body2">Last Action: {lastAction || "None"}</Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactive",
//     listener: mockListener,
//   },
// };

// Story demonstrating multiple buttons
// export const ButtonGroup: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
//           <ButtonDefaultExport
//             name="cancelBtn"
//             caption="Cancel"
//             disabled={false}
//             type="button"
//             listener={mockListener}
//             styles={{
//               backgroundColor: "#6c757d",
//               color: "white",
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//             }}
//           />
//           <ButtonDefaultExport
//             name="saveBtn"
//             caption="Save"
//             disabled={false}
//             type="button"
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
//           <ButtonDefaultExport
//             name="deleteBtn"
//             caption="Delete"
//             disabled={false}
//             type="button"
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
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "buttonGroup",
//     listener: mockListener,
//   },
// };
