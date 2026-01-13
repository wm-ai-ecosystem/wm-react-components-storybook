import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import CheckboxDefaultExport from "../../../../components/input/default/checkbox/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import checkboxTokensData from "../../../../designTokens/components/checkbox/checkbox.json";

const meta: Meta<typeof CheckboxDefaultExport> = {
  title: "Input/Checkbox",
  component: CheckboxDefaultExport,
  // argTypes: {
  //   caption: { control: "text" },
  //   // checkedvalue: { control: "text" },
  //   // uncheckedvalue: { control: "text" },
  //   datavalue: { control: "boolean" },
  //   disabled: { control: "boolean" },
  //   readonly: { control: "boolean" },
  //   required: { control: "boolean" },
  //   // hint: { control: "text" },
  //   // arialabel: { control: "text" },
  //   // tabindex: { control: "number" },
  //   // shortcutkey: { control: "text" },
  //   type: {
  //     control: { type: "select" },
  //     options: ["checkbox", "toggle"],
  //   },
  //   // className: { control: "text" },
  //   // displayValue: { control: "text" },
  // }
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
  <Box style={{ padding: 16 }}>
    <CheckboxDefaultExport {...args} listener={mockListener} />
  </Box>
);

const DesignTokenTemplate = (args: any) => {
  // Remove data-design-token-target from args to avoid passing it to the component
  const { "data-design-token-target": _, ...componentProps } = args;

  return (
    <Box className="wm-app" style={{ padding: 16 }} data-design-token-target="true">
      <CheckboxDefaultExport {...componentProps} listener={mockListener} />
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
      styling={styling}
    />
  ),
  args:{
    name:"docsCheckbox",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 4, maxWidth: 400 }}>
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={600}>
            Checkbox Showcase
          </Typography>

          {/* Row 1: Standard Checkbox */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Standard Checkbox
            </Typography>
            <Stack spacing={1}>
              <CheckboxDefaultExport
                name="standardCheckbox"
                caption="Accept terms and conditions"
                datavalue={false}
                listener={mockListener}
              />
            </Stack>
          </Box>

          {/* Row 2: Toggle Switch */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Toggle Switch
            </Typography>
            <Stack spacing={1}>
              <CheckboxDefaultExport
                name="toggleSwitch"
                caption="Enable notifications"
                type="toggle"
                datavalue={true}
                listener={mockListener}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "checkboxShowcase",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicCheckbox",
    caption: "Accept terms and conditions",
    listener: mockListener,
    datavalue: false,
    disabled: false,
    readonly: false,
    type: "checkbox"
  },
  argTypes: {
    caption: { control: "text" },
    datavalue: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["checkbox", "toggle"],
    },
    // className: { control: "text" },
    // displayValue: { control: "text" },
  }
};

export const DesignToken: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "designTokenCheckbox",
    caption: "Accept terms and conditions",
    listener: mockListener,
    datavalue: true,
    disabled: false,
    readonly: false,
    type: "checkbox",
    "data-design-token-target": "true"
  },
  argTypes: {
    caption: { control: "text" },
    datavalue: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["checkbox", "toggle"],
    },
    "data-design-token-target": { control: false }
    // className: { control: "text" },
    // displayValue: { control: "text" },
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: checkboxTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "checkbox",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};

// export const WithCustomCaption: Story = {
//   render: Template,
//   args: {
//     name: "customCaption",
//     caption: "I accept the <strong>Privacy Policy</strong>",
//     listener: mockListener,
//     datavalue: true,
//     disabled: false,
//     readonly: false,
//   },
// };


// export const Checked: Story = {
//   render: Template,
//   args: {
//     name: "checkedCheckbox",
//     caption: "I agree to the terms",
//     datavalue: true,
//     listener: mockListener,
//   },
// };

// export const Unchecked: Story = {
//   render: Template,
//   args: {
//     name: "uncheckedCheckbox",
//     caption: "Subscribe to newsletter",
//     datavalue: false,
//     listener: mockListener,
//   },
// };

// export const LongCaption: Story = {
//   render: Template,
//   args: {
//     name: "longCaption",
//     caption: "I have read and agree to the Terms of Service, Privacy Policy, and Cookie Policy as outlined on this website",
//     listener: mockListener,
//   },
// };

// export const DisabledCheckbox: Story = {
//   render: Template,
//   args: {
//     name: "disabledCheckbox",
//     caption: "Disabled checkbox",
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const DisabledChecked: Story = {
//   render: Template,
//   args: {
//     name: "disabledChecked",
//     caption: "Disabled and checked",
//     disabled: true,
//     datavalue: true,
//     listener: mockListener,
//   },
// };

// export const ReadonlyCheckbox: Story = {
//   render: Template,
//   args: {
//     name: "readonlyCheckbox",
//     caption: "Readonly checkbox",
//     readonly: true,
//     datavalue: true,
//     listener: mockListener,
//   },
// };

// export const RequiredCheckbox: Story = {
//   render: Template,
//   args: {
//     name: "requiredCheckbox",
//     caption: "I agree (required)",
//     required: true,
//     listener: mockListener,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintCheckbox",
//     caption: "Hover for hint",
//     hint: "This is a helpful tooltip",
//     listener: mockListener,
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaCheckbox",
//     caption: "Accessible checkbox",
//     arialabel: "Agreement checkbox for terms and conditions",
//     listener: mockListener,
//   },
// };

// export const WithShortcutKey: Story = {
//   render: Template,
//   args: {
//     name: "shortcutCheckbox",
//     caption: "Press 'A' to toggle",
//     shortcutkey: "a",
//     listener: mockListener,
//   },
// };

// export const CustomTabIndex: Story = {
//   render: Template,
//   args: {
//     name: "tabIndexCheckbox",
//     caption: "Tab index: 5",
//     tabindex: 5,
//     listener: mockListener,
//   },
// };

// export const CustomCheckedValue: Story = {
//   render: Template,
//   args: {
//     name: "customChecked",
//     caption: "Yes/No checkbox",
//     checkedvalue: "yes",
//     uncheckedvalue: "no",
//     datavalue: "yes",
//     listener: mockListener,
//   },
// };

// export const NumericValues: Story = {
//   render: Template,
//   args: {
//     name: "numericCheckbox",
//     caption: "Numeric values (1/0)",
//     checkedvalue: 1,
//     uncheckedvalue: 0,
//     datavalue: 1,
//     listener: mockListener,
//   },
// };

// export const CustomStringValues: Story = {
//   render: Template,
//   args: {
//     name: "stringCheckbox",
//     caption: "Active/Inactive",
//     checkedvalue: "active",
//     uncheckedvalue: "inactive",
//     datavalue: "active",
//     listener: mockListener,
//   },
// };

// export const ToggleSwitch: Story = {
//   render: Template,
//   args: {
//     name: "toggleSwitch",
//     caption: "Enable notifications",
//     type: "toggle",
//     datavalue: false,
//     listener: mockListener,
//   },
// };

// export const ToggleSwitchChecked: Story = {
//   render: Template,
//   args: {
//     name: "toggleChecked",
//     caption: "Dark mode enabled",
//     type: "toggle",
//     datavalue: true,
//     listener: mockListener,
//   },
// };

// export const ToggleSwitchDisabled: Story = {
//   render: Template,
//   args: {
//     name: "toggleDisabled",
//     caption: "Disabled toggle",
//     type: "toggle",
//     disabled: true,
//     datavalue: true,
//     listener: mockListener,
//   },
// };

// export const CustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClassCheckbox",
//     caption: "With custom class",
//     className: "custom-checkbox-class",
//     listener: mockListener,
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledCheckbox",
//     caption: "Custom styled",
//     styles: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       color: "#2E7D32",
//     },
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [isChecked, setIsChecked] = useState(false);
//     const [toggleCount, setToggleCount] = useState(0);

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveCheckbox: {},
//       },
//       onChange: (name: string, data: any) => {
//         setIsChecked(data.datavalue);
//         setToggleCount(prev => prev + 1);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Checkbox Demo</Typography>
//           <CheckboxDefaultExport
//             name="interactiveCheckbox"
//             caption="Toggle me!"
//             datavalue={isChecked}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Status:</Typography>
//             <Typography variant="body2" color={isChecked ? "success.main" : "text.secondary"}>
//               {isChecked ? "✓ Checked" : "✗ Unchecked"}
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mt={1} display="block">
//               Toggled {toggleCount} times
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

// export const CheckboxList: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Select Options
//         </Typography>
//         <Stack spacing={1}>
//           <CheckboxDefaultExport
//             name="option1"
//             caption="Option 1"
//             listener={mockListener}
//           />
//           <CheckboxDefaultExport
//             name="option2"
//             caption="Option 2"
//             listener={mockListener}
//           />
//           <CheckboxDefaultExport
//             name="option3"
//             caption="Option 3"
//             listener={mockListener}
//           />
//           <CheckboxDefaultExport
//             name="option4"
//             caption="Option 4"
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "checkboxList",
//     listener: mockListener,
//   },
// };

// export const StateComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Checkbox States
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Normal State (Unchecked)
//             </Typography>
//             <CheckboxDefaultExport
//               name="normalUnchecked"
//               caption="Normal unchecked"
//               datavalue={false}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Normal State (Checked)
//             </Typography>
//             <CheckboxDefaultExport
//               name="normalChecked"
//               caption="Normal checked"
//               datavalue={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled (Unchecked)
//             </Typography>
//             <CheckboxDefaultExport
//               name="disabledUnchecked"
//               caption="Disabled unchecked"
//               disabled={true}
//               datavalue={false}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled (Checked)
//             </Typography>
//             <CheckboxDefaultExport
//               name="disabledCheckedState"
//               caption="Disabled checked"
//               disabled={true}
//               datavalue={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly (Checked)
//             </Typography>
//             <CheckboxDefaultExport
//               name="readonlyChecked"
//               caption="Readonly checked"
//               readonly={true}
//               datavalue={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required
//             </Typography>
//             <CheckboxDefaultExport
//               name="requiredState"
//               caption="Required checkbox"
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

// export const TypeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Checkbox vs Toggle Switch
//         </Typography>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Standard Checkbox
//             </Typography>
//             <Stack spacing={1}>
//               <CheckboxDefaultExport
//                 name="standardUnchecked"
//                 caption="Standard unchecked"
//                 datavalue={false}
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="standardChecked"
//                 caption="Standard checked"
//                 datavalue={true}
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Toggle Switch
//             </Typography>
//             <Stack spacing={1}>
//               <CheckboxDefaultExport
//                 name="toggleUnchecked"
//                 caption="Toggle unchecked"
//                 type="toggle"
//                 datavalue={false}
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="toggleCheckedComp"
//                 caption="Toggle checked"
//                 type="toggle"
//                 datavalue={true}
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "typeComparison",
//     listener: mockListener,
//   },
// };

// export const FormExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Registration Form
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Personal Information
//             </Typography>
//             <input
//               type="text"
//               placeholder="Full Name"
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//                 marginBottom: "12px",
//               }}
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//               }}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Preferences
//             </Typography>
//             <Stack spacing={1}>
//               <CheckboxDefaultExport
//                 name="newsletter"
//                 caption="Subscribe to newsletter"
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="notifications"
//                 caption="Enable email notifications"
//                 datavalue={true}
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Agreements
//             </Typography>
//             <Stack spacing={1}>
//               <CheckboxDefaultExport
//                 name="terms"
//                 caption="I accept the Terms and Conditions"
//                 required={true}
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="privacy"
//                 caption="I have read the Privacy Policy"
//                 required={true}
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "formExample",
//     listener: mockListener,
//   },
// };

// export const SettingsPanel: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Application Settings
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Display
//             </Typography>
//             <Stack spacing={1}>
//               <CheckboxDefaultExport
//                 name="darkMode"
//                 caption="Enable dark mode"
//                 type="toggle"
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="compactView"
//                 caption="Use compact view"
//                 type="toggle"
//                 datavalue={true}
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Notifications
//             </Typography>
//             <Stack spacing={1}>
//               <CheckboxDefaultExport
//                 name="pushNotifications"
//                 caption="Push notifications"
//                 type="toggle"
//                 datavalue={true}
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="emailAlerts"
//                 caption="Email alerts"
//                 type="toggle"
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="soundEffects"
//                 caption="Sound effects"
//                 type="toggle"
//                 datavalue={true}
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Privacy
//             </Typography>
//             <Stack spacing={1}>
//               <CheckboxDefaultExport
//                 name="profilePublic"
//                 caption="Make profile public"
//                 type="toggle"
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="trackingCookies"
//                 caption="Allow tracking cookies"
//                 type="toggle"
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "settingsPanel",
//     listener: mockListener,
//   },
// };

// export const ValueTypeExamples: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Different Value Types
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Boolean Values (true/false)
//             </Typography>
//             <CheckboxDefaultExport
//               name="booleanCheckbox"
//               caption="Boolean checkbox (default)"
//               checkedvalue={true}
//               uncheckedvalue={false}
//               datavalue={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               String Values (yes/no)
//             </Typography>
//             <CheckboxDefaultExport
//               name="stringCheckbox"
//               caption="String checkbox"
//               checkedvalue="yes"
//               uncheckedvalue="no"
//               datavalue="yes"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Numeric Values (1/0)
//             </Typography>
//             <CheckboxDefaultExport
//               name="numericCheckbox"
//               caption="Numeric checkbox"
//               checkedvalue={1}
//               uncheckedvalue={0}
//               datavalue={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Custom String Values (active/inactive)
//             </Typography>
//             <CheckboxDefaultExport
//               name="activeCheckbox"
//               caption="Status checkbox"
//               checkedvalue="active"
//               uncheckedvalue="inactive"
//               datavalue="active"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "valueTypeExamples",
//     listener: mockListener,
//   },
// };

// export const PermissionsExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           User Permissions
//         </Typography>
//         <Stack spacing={2}>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Read Permissions
//             </Typography>
//             <CheckboxDefaultExport
//               name="readUsers"
//               caption="Read users"
//               datavalue={true}
//               listener={mockListener}
//             />
//             <CheckboxDefaultExport
//               name="readFiles"
//               caption="Read files"
//               datavalue={true}
//               listener={mockListener}
//             />
//             <CheckboxDefaultExport
//               name="readSettings"
//               caption="Read settings"
//               listener={mockListener}
//             />
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Write Permissions
//             </Typography>
//             <CheckboxDefaultExport
//               name="writeUsers"
//               caption="Write users"
//               listener={mockListener}
//             />
//             <CheckboxDefaultExport
//               name="writeFiles"
//               caption="Write files"
//               datavalue={true}
//               listener={mockListener}
//             />
//             <CheckboxDefaultExport
//               name="writeSettings"
//               caption="Write settings"
//               listener={mockListener}
//             />
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Admin Permissions
//             </Typography>
//             <CheckboxDefaultExport
//               name="deleteUsers"
//               caption="Delete users"
//               listener={mockListener}
//             />
//             <CheckboxDefaultExport
//               name="manageRoles"
//               caption="Manage roles"
//               listener={mockListener}
//             />
//             <CheckboxDefaultExport
//               name="systemSettings"
//               caption="System settings"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "permissionsExample",
//     listener: mockListener,
//   },
// };

// export const SurveyExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Customer Feedback Survey
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Which features do you use regularly?
//             </Typography>
//             <Stack spacing={1}>
//               <CheckboxDefaultExport
//                 name="feature1"
//                 caption="Dashboard analytics"
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="feature2"
//                 caption="Report generation"
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="feature3"
//                 caption="Team collaboration"
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="feature4"
//                 caption="File storage"
//                 listener={mockListener}
//               />
//               <CheckboxDefaultExport
//                 name="feature5"
//                 caption="Mobile app"
//                 listener={mockListener}
//               />
//             </Stack>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Would you recommend us to others?
//             </Typography>
//             <CheckboxDefaultExport
//               name="recommend"
//               caption="Yes, I would recommend this product"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "surveyExample",
//     listener: mockListener,
//   },
// };

// export const CompactCheckboxes: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Compact List
//         </Typography>
//         <Stack spacing={0.5}>
//           <CheckboxDefaultExport name="compact1" caption="Item 1" listener={mockListener} />
//           <CheckboxDefaultExport name="compact2" caption="Item 2" listener={mockListener} />
//           <CheckboxDefaultExport name="compact3" caption="Item 3" listener={mockListener} />
//           <CheckboxDefaultExport name="compact4" caption="Item 4" listener={mockListener} />
//           <CheckboxDefaultExport name="compact5" caption="Item 5" listener={mockListener} />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "compactCheckboxes",
//     listener: mockListener,
//   },
// };
