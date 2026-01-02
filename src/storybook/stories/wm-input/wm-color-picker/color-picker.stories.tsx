import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import ColorPickerDefaultExport from "../../../../components/input/color-picker/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof ColorPickerDefaultExport> = {
  title: "Input/ColorPicker",
  component: ColorPickerDefaultExport,
  argTypes: {
    autoclose: {
      control: { type: "select" },
      options: ["always", "outsideClick", "disabled"],
    },
    datavalue: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    // required: { control: "boolean" },
    show: { control: "boolean" },
    // tabindex: { control: "number" },
    // className: { control: "text" },
    // shortcutkey: { control: "text" },
    // arialabel: { control: "text" },
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
  onChange: () => {},
};

const Template = (args: any) => (
  <Box style={{ padding: 16, minHeight: "400px" }}>
    <ColorPickerDefaultExport {...args} listener={mockListener} />
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
    name: "basicColorPicker",
    listener: mockListener,
    placeholder: "Select a color",
    datavalue: "",
    autoclose: "always",
  },
};

export const AutocloseOutsideClick: Story = {
  render: Template,
  args: {
    name: "autocloseOutside",
    listener: mockListener,
    placeholder: "Closes on outside click",
    datavalue: "#2ECC71",
    autoclose: "outsideClick",
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16, minHeight: "600px" }}>
        <Box sx={{mb: 3}}>
        <Typography variant="h6" fontWeight={600}>
          Supported Color Formats
        </Typography>
        </Box>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              HEX Format (6 digits): #FF5733
            </Typography>
            <ColorPickerDefaultExport
              name="hexFormat"
              datavalue="#FF5733"
              placeholder="HEX color"
              listener={mockListener}
              autoclose="always"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              RGB Format: rgb(52, 152, 219)
            </Typography>
            <ColorPickerDefaultExport
              name="rgbFormat"
              datavalue="rgb(52, 152, 219)"
              placeholder="RGB color"
              listener={mockListener}
              autoclose="always"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              RGBA Format: rgba(46, 204, 113, 0.7)
            </Typography>
            <ColorPickerDefaultExport
              name="rgbaFormat"
              datavalue="rgba(46, 204, 113, 0.7)"
              placeholder="RGBA color"
              listener={mockListener}
              autoclose="always"
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseColorPicker",
    listener: mockListener,
  },
};

// export const WithHexColor: Story = {
//   render: Template,
//   args: {
//     name: "hexColorPicker",
//     listener: mockListener,
//     placeholder: "Select a color",
//     datavalue: "#FF5733",
//     autoclose: "always",
//   },
// };

// export const WithRGBColor: Story = {
//   render: Template,
//   args: {
//     name: "rgbColorPicker",
//     listener: mockListener,
//     placeholder: "Select a color",
//     datavalue: "rgb(255, 87, 51)",
//     autoclose: "always",
//   },
// };

// export const WithRGBAColor: Story = {
//   render: Template,
//   args: {
//     name: "rgbaColorPicker",
//     listener: mockListener,
//     placeholder: "Select a color",
//     datavalue: "rgba(255, 87, 51, 0.5)",
//     autoclose: "always",
//   },
// };

// export const AutocloseAlways: Story = {
//   render: Template,
//   args: {
//     name: "autocloseAlways",
//     listener: mockListener,
//     placeholder: "Closes on color select",
//     datavalue: "#3498DB",
//     autoclose: "always",
//   },
// };

// export const AutocloseDisabled: Story = {
//   render: Template,
//   args: {
//     name: "autocloseDisabled",
//     listener: mockListener,
//     placeholder: "Manual close only",
//     datavalue: "#9B59B6",
//     autoclose: "disabled",
//   },
// };

// export const WithNamedColor: Story = {
//   render: Template,
//   args: {
//     name: "namedColorPicker",
//     listener: mockListener,
//     placeholder: "Select a color",
//     datavalue: "red",
//   },
// };

// export const ReadonlyColorPicker: Story = {
//   render: Template,
//   args: {
//     name: "readonlyPicker",
//     listener: mockListener,
//     placeholder: "Readonly color picker",
//     datavalue: "#E74C3C",
//     readonly: true,
//   },
// };

// export const DisabledColorPicker: Story = {
//   render: Template,
//   args: {
//     name: "disabledPicker",
//     listener: mockListener,
//     placeholder: "Disabled color picker",
//     datavalue: "#F39C12",
//     disabled: true,
//   },
// };

// export const RequiredColorPicker: Story = {
//   render: Template,
//   args: {
//     name: "requiredPicker",
//     listener: mockListener,
//     placeholder: "Required color picker",
//     datavalue: "",
//     required: true,
//   },
// };

// export const CustomPlaceholder: Story = {
//   render: Template,
//   args: {
//     name: "customPlaceholder",
//     listener: mockListener,
//     placeholder: "Choose your brand color...",
//     datavalue: "",
//   },
// };

// export const WithShortcutKey: Story = {
//   render: Template,
//   args: {
//     name: "shortcutPicker",
//     listener: mockListener,
//     placeholder: "Press 'C' to focus",
//     datavalue: "#1ABC9C",
//     shortcutkey: "c",
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaPicker",
//     listener: mockListener,
//     placeholder: "Accessible color picker",
//     datavalue: "#34495E",
//     arialabel: "Select background color",
//   },
// };

// export const CustomTabIndex: Story = {
//   render: Template,
//   args: {
//     name: "tabIndexPicker",
//     listener: mockListener,
//     placeholder: "Tab index: 5",
//     datavalue: "#16A085",
//     tabindex: 5,
//   },
// };

// export const CustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "classNamePicker",
//     listener: mockListener,
//     placeholder: "With custom class",
//     datavalue: "#27AE60",
//     className: "custom-color-picker",
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledPicker",
//     listener: mockListener,
//     placeholder: "Custom styled",
//     datavalue: "#2980B9",
//     styles: {
//       border: "2px solid #3498DB",
//       borderRadius: "8px",
//       padding: "4px",
//       backgroundColor: "#ECF0F1",
//     },
//   },
// };

// export const PredefinedColors: Story = {
//   render: () => {
//     const colors = [
//       { name: "Red", value: "#FF0000" },
//       { name: "Green", value: "#00FF00" },
//       { name: "Blue", value: "#0000FF" },
//       { name: "Yellow", value: "#FFFF00" },
//       { name: "Purple", value: "#800080" },
//       { name: "Orange", value: "#FFA500" },
//     ];

//     return (
//       <Box style={{ padding: 16, minHeight: "400px" }}>
//         <Typography variant="h6" mb={3}>
//           Predefined Color Options
//         </Typography>
//         <Stack spacing={3}>
//           {colors.map((color, index) => (
//             <Box key={index}>
//               <Typography variant="subtitle2" mb={1}>
//                 {color.name}
//               </Typography>
//               <ColorPickerDefaultExport
//                 name={`predefined${index}`}
//                 datavalue={color.value}
//                 placeholder={`${color.name} color`}
//                 listener={mockListener}
//               />
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "predefinedColors",
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedColor, setSelectedColor] = useState("#3498DB");
//     const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactivePicker: {},
//         bgPicker: {},
//       },
//       onChange: (name: string, data: any) => {
//         if (name === "interactivePicker") {
//           setSelectedColor(data.datavalue || "#3498DB");
//         } else if (name === "bgPicker") {
//           setBackgroundColor(data.datavalue || "#FFFFFF");
//         }
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Color Picker Demo</Typography>

//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Text Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="interactivePicker"
//               datavalue={selectedColor}
//               placeholder="Select text color..."
//               listener={customListener}
//             />
//           </Box>

//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Background Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="bgPicker"
//               datavalue={backgroundColor}
//               placeholder="Select background color..."
//               listener={customListener}
//             />
//           </Box>

//           <Box
//             p={3}
//             borderRadius={2}
//             style={{
//               backgroundColor: backgroundColor,
//               color: selectedColor,
//               border: "1px solid #ddd",
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Preview Text
//             </Typography>
//             <Typography variant="body1">
//               This text demonstrates the selected colors. Text color: {selectedColor} | Background: {backgroundColor}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveDemo",
//     listener: mockListener,
//   },
// };

// export const AutocloseComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, minHeight: "600px" }}>
//         <Typography variant="h6" mb={3}>
//           Autoclose Behavior Comparison
//         </Typography>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Always - Closes immediately after selecting a color
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Best for: Quick color selection without fine-tuning
//             </Typography>
//             <ColorPickerDefaultExport
//               name="alwaysClose"
//               datavalue="#E74C3C"
//               placeholder="Autoclose: Always"
//               autoclose="always"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Outside Click - Closes when clicking outside the picker
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Best for: Standard behavior with flexibility
//             </Typography>
//             <ColorPickerDefaultExport
//               name="outsideClose"
//               datavalue="#3498DB"
//               placeholder="Autoclose: Outside Click"
//               autoclose="outsideClick"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled - Stays open until manually closed (Esc or Enter)
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Best for: Precise color adjustments with multiple changes
//             </Typography>
//             <ColorPickerDefaultExport
//               name="disabledClose"
//               datavalue="#2ECC71"
//               placeholder="Autoclose: Disabled"
//               autoclose="disabled"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "autocloseComparison",
//     listener: mockListener,
//   },
// };

// export const ThemeColors: Story = {
//   render: () => {
//     const themeColors = [
//       { name: "Primary", value: "#1976D2" },
//       { name: "Secondary", value: "#DC004E" },
//       { name: "Success", value: "#2E7D32" },
//       { name: "Warning", value: "#ED6C02" },
//       { name: "Error", value: "#D32F2F" },
//       { name: "Info", value: "#0288D1" },
//     ];

//     return (
//       <Box style={{ padding: 16, minHeight: "600px" }}>
//         <Typography variant="h6" mb={3}>
//           Theme Colors Configuration
//         </Typography>
//         <Stack spacing={2}>
//           {themeColors.map((color, index) => (
//             <Box key={index} display="flex" alignItems="center" gap={2}>
//               <Box width={120}>
//                 <Typography variant="body2">{color.name}</Typography>
//               </Box>
//               <Box flex={1}>
//                 <ColorPickerDefaultExport
//                   name={`theme${index}`}
//                   datavalue={color.value}
//                   placeholder={`${color.name} color`}
//                   listener={mockListener}
//                 />
//               </Box>
//               <Box
//                 width={40}
//                 height={40}
//                 borderRadius={1}
//                 style={{ backgroundColor: color.value }}
//                 border="1px solid #ddd"
//               />
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "themeColors",
//     listener: mockListener,
//   },
// };

// export const BrandingExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, minHeight: "500px" }}>
//         <Typography variant="h6" mb={3}>
//           Brand Color Configuration
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Primary Brand Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="brandPrimary"
//               datavalue="#6366F1"
//               placeholder="Select primary color..."
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Secondary Brand Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="brandSecondary"
//               datavalue="#8B5CF6"
//               placeholder="Select secondary color..."
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Accent Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="brandAccent"
//               datavalue="#EC4899"
//               placeholder="Select accent color..."
//               listener={mockListener}
//             />
//           </Box>
//           <Box p={3} bgcolor="#F3F4F6" borderRadius={2}>
//             <Typography variant="caption" display="block" mb={2}>
//               Preview:
//             </Typography>
//             <Stack direction="row" spacing={2}>
//               <Box width={80} height={80} bgcolor="#6366F1" borderRadius={1} />
//               <Box width={80} height={80} bgcolor="#8B5CF6" borderRadius={1} />
//               <Box width={80} height={80} bgcolor="#EC4899" borderRadius={1} />
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "brandingExample",
//     listener: mockListener,
//   },
// };

// export const UICustomization: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, minHeight: "600px" }}>
//         <Typography variant="h6" mb={3}>
//           UI Customization Panel
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Header Background
//             </Typography>
//             <ColorPickerDefaultExport
//               name="headerBg"
//               datavalue="#1F2937"
//               placeholder="Header color..."
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Sidebar Background
//             </Typography>
//             <ColorPickerDefaultExport
//               name="sidebarBg"
//               datavalue="#111827"
//               placeholder="Sidebar color..."
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Link Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="linkColor"
//               datavalue="#3B82F6"
//               placeholder="Link color..."
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Button Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="buttonColor"
//               datavalue="#10B981"
//               placeholder="Button color..."
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "uiCustomization",
//     listener: mockListener,
//   },
// };

// export const GradientBuilder: Story = {
//   render: () => {
//     const [color1, setColor1] = useState("#FF6B6B");
//     const [color2, setColor2] = useState("#4ECDC4");

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         gradient1: {},
//         gradient2: {},
//       },
//       onChange: (name: string, data: any) => {
//         if (name === "gradient1") {
//           setColor1(data.datavalue || "#FF6B6B");
//         } else if (name === "gradient2") {
//           setColor2(data.datavalue || "#4ECDC4");
//         }
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Gradient Builder
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Gradient Start Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="gradient1"
//               datavalue={color1}
//               placeholder="Start color..."
//               listener={customListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Gradient End Color
//             </Typography>
//             <ColorPickerDefaultExport
//               name="gradient2"
//               datavalue={color2}
//               placeholder="End color..."
//               listener={customListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Preview:
//             </Typography>
//             <Box
//               height={150}
//               borderRadius={2}
//               style={{
//                 background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
//                 border: "1px solid #ddd",
//               }}
//             />
//             <Typography variant="caption" color="text.secondary" mt={1}>
//               Gradient: {color1} to {color2}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "gradientBuilder",
//     listener: mockListener,
//   },
// };

// export const StateComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, minHeight: "500px" }}>
//         <Typography variant="h6" mb={3}>
//           Color Picker States
//         </Typography>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Normal State
//             </Typography>
//             <ColorPickerDefaultExport
//               name="normalState"
//               datavalue="#3498DB"
//               placeholder="Normal color picker"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <ColorPickerDefaultExport
//               name="readonlyState"
//               datavalue="#2ECC71"
//               placeholder="Readonly color picker"
//               readonly={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <ColorPickerDefaultExport
//               name="disabledState"
//               datavalue="#E74C3C"
//               placeholder="Disabled color picker"
//               disabled={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required Field (Empty)
//             </Typography>
//             <ColorPickerDefaultExport
//               name="requiredState"
//               datavalue=""
//               placeholder="Required color picker"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "stateComparison",
//     listener: mockListener,
//   },
// };

// export const TransparencyExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, minHeight: "500px" }}>
//         <Typography variant="h6" mb={3}>
//           Colors with Transparency (Alpha Channel)
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               100% Opacity (alpha: 1.0)
//             </Typography>
//             <ColorPickerDefaultExport
//               name="alpha100"
//               datavalue="rgba(231, 76, 60, 1)"
//               placeholder="Fully opaque"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               75% Opacity (alpha: 0.75)
//             </Typography>
//             <ColorPickerDefaultExport
//               name="alpha75"
//               datavalue="rgba(52, 152, 219, 0.75)"
//               placeholder="75% transparent"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               50% Opacity (alpha: 0.5)
//             </Typography>
//             <ColorPickerDefaultExport
//               name="alpha50"
//               datavalue="rgba(46, 204, 113, 0.5)"
//               placeholder="50% transparent"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               25% Opacity (alpha: 0.25)
//             </Typography>
//             <ColorPickerDefaultExport
//               name="alpha25"
//               datavalue="rgba(155, 89, 182, 0.25)"
//               placeholder="25% transparent"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "transparencyExample",
//     listener: mockListener,
//   },
// };
