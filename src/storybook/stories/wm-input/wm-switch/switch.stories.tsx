import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";

import SwitchDefaultExport from "../../../../components/input/default/switch/index";

const meta: Meta<typeof SwitchDefaultExport> = {
  title: "Input/Switch",
  component: SwitchDefaultExport,
  argTypes: {
    dataset: { control: "object" },
    datafield: { control: "text" },
    datavalue: { control: "text" },
    // displayExpression: { control: "text" },
    displayfield: { control: "text" },
    displaylabel: { control: "text" },
    // displayimagesrc: { control: "text" },
    // orderby: { control: "text" },
    // groupby: { control: "text" },
    // compareby: { control: "text" },
    // usekeys: { control: "boolean" },
    // allowempty: { control: "boolean" },
    // acceptsArray: { control: "boolean" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    // required: { control: "boolean" },
    // hint: { control: "text" },
    // iconclass: { control: "text" },
    checkediconclass: { control: "select", options:["fa fa-check", "fa fa-circle-check"] },
    // tabindex: { control: "number" },
    // arialabel: { control: "text" },
    // className: { control: "text" },
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
  <Box style={{ padding: 16 }}>
    <SwitchDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Basic: Story = {
  render: Template,
  args: {
    name: "basicSwitch",
    dataset: ["yes", "no", "maybe"],
    datavalue: "yes",
    listener: mockListener,
    disabled: false,
    multiple: false,
    displaylabel: "Basic Switch",
  },
};

export const ObjectDataset: Story = {
  render: Template,
  args: {
    name: "objectSwitch",
    dataset: [
      { id: 1, label: "Day", value: "day" },
      { id: 2, label: "Week", value: "week" },
      { id: 3, label: "Month", value: "month" },
    ],
    datafield: "id",
    displayfield: "label",
    datavalue: 1,
    listener: mockListener,
    disabled: false,
    multiple: false,
    displaylabel: "Object Dataset Switch",
  },
};

export const MultipleWithPreselection: Story = {
  render: Template,
  args: {
    name: "multiplePreselected",
    dataset: [
      { key: "email", label: "Email Notifications", value: "email" },
      { key: "sms", label: "SMS Alerts", value: "sms" },
      { key: "push", label: "Push Notifications", value: "push" },
      { key: "phone", label: "Phone Calls", value: "phone" },
    ],
    datafield: "key",
    displayfield: "label",
    datavalue: ["email", "push"],
    multiple: true,
    listener: mockListener,
    disabled: false,
    displaylabel: "Multiple Selection with Preselected Values",
  },
};

// export const MultipleWithObjectDatavalue: Story = {
//   render: Template,
//   args: {
//     name: "multipleObjectDatavalue",
//     dataset: [
//       { id: 1, name: "Frontend", category: "dev" },
//       { id: 2, name: "Backend", category: "dev" },
//       { id: 3, name: "Design", category: "creative" },
//       { id: 4, name: "Marketing", category: "business" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     datavalue: [1, 3],
//     multiple: true,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//   },
// };

// export const TwoOptions: Story = {
//   render: Template,
//   args: {
//     name: "twoOptionSwitch",
//     dataset: "On, Off",
//     datavalue: "On",
//     listener: mockListener,
//   },
// };

// export const ThreeOptions: Story = {
//   render: Template,
//   args: {
//     name: "threeOptionSwitch",
//     dataset: "Small, Medium, Large",
//     datavalue: "Medium",
//     listener: mockListener,
//   },
// };

// export const FourOptions: Story = {
//   render: Template,
//   args: {
//     name: "fourOptionSwitch",
//     dataset: "XS, S, M, L",
//     datavalue: "M",
//     listener: mockListener,
//   },
// };

// export const YesNoSwitch: Story = {
//   render: Template,
//   args: {
//     name: "yesNoSwitch",
//     dataset: "Yes, No",
//     datavalue: "Yes",
//     listener: mockListener,
//   },
// };

// export const EnableDisableSwitch: Story = {
//   render: Template,
//   args: {
//     name: "enableDisableSwitch",
//     dataset: "Enable, Disable",
//     datavalue: "Enable",
//     listener: mockListener,
//   },
// };

// export const ActiveInactiveSwitch: Story = {
//   render: Template,
//   args: {
//     name: "activeInactiveSwitch",
//     dataset: "Active, Inactive",
//     datavalue: "Active",
//     listener: mockListener,
//   },
// };

// export const ViewModeSwitch: Story = {
//   render: Template,
//   args: {
//     name: "viewModeSwitch",
//     dataset: [
//       { id: 1, name: "List", mode: "list" },
//       { id: 2, name: "Grid", mode: "grid" },
//       { id: 3, name: "Table", mode: "table" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     datavalue: 1,
//     listener: mockListener,
//   },
// };

// export const PrioritySwitch: Story = {
//   render: Template,
//   args: {
//     name: "prioritySwitch",
//     dataset: [
//       { id: 1, label: "Low", priority: 1 },
//       { id: 2, label: "Medium", priority: 2 },
//       { id: 3, label: "High", priority: 3 },
//       { id: 4, label: "Critical", priority: 4 },
//     ],
//     datafield: "id",
//     displayfield: "label",
//     datavalue: 2,
//     listener: mockListener,
//   },
// };

// export const WithPreselectedValue: Story = {
//   render: Template,
//   args: {
//     name: "preselectedSwitch",
//     dataset: "Option 1, Option 2, Option 3",
//     datavalue: "Option 2",
//     listener: mockListener,
//   },
// };

// export const DisabledSwitch: Story = {
//   render: Template,
//   args: {
//     name: "disabledSwitch",
//     dataset: "Yes, No, Maybe",
//     datavalue: "Yes",
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const RequiredSwitch: Story = {
//   render: Template,
//   args: {
//     name: "requiredSwitch",
//     dataset: "Accept, Decline",
//     required: true,
//     listener: mockListener,
//   },
// };

// export const MultipleSelection: Story = {
//   render: Template,
//   args: {
//     name: "multipleSwitch",
//     dataset: "Option A, Option B, Option C, Option D",
//     multiple: true,
//     listener: mockListener,
//   },
// };


// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintSwitch",
//     dataset: "Start, Stop, Pause",
//     datavalue: "Start",
//     hint: "Choose an action",
//     listener: mockListener,
//   },
// };

// export const WithCustomTabIndex: Story = {
//   render: Template,
//   args: {
//     name: "tabIndexSwitch",
//     dataset: "First, Second, Third",
//     datavalue: "First",
//     tabindex: 5,
//     listener: mockListener,
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaSwitch",
//     dataset: "Public, Private",
//     datavalue: "Public",
//     arialabel: "Privacy setting toggle",
//     listener: mockListener,
//   },
// };

// export const WithCustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClassSwitch",
//     dataset: "Light, Dark",
//     datavalue: "Light",
//     className: "custom-switch-class",
//     listener: mockListener,
//   },
// };

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledSwitch",
//     dataset: "Red, Green, Blue",
//     datavalue: "Green",
//     styles: {
//       border: "2px solid #1976d2",
//       borderRadius: "8px",
//       padding: "4px",
//     },
//     listener: mockListener,
//   },
// };

// export const WithOrderBy: Story = {
//   render: Template,
//   args: {
//     name: "orderedSwitch",
//     dataset: [
//       { id: 1, name: "Zebra", order: 3 },
//       { id: 2, name: "Apple", order: 1 },
//       { id: 3, name: "Mango", order: 2 },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     orderby: "name:asc",
//     datavalue: 2,
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedValue, setSelectedValue] = useState<any>("day");

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveSwitch: {},
//       },
//       onChange: (name: string, data: any) => {
//         setSelectedValue(data.datavalue);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Switch Demo</Typography>
//           <SwitchDefaultExport
//             name="interactiveSwitch"
//             dataset={[
//               { id: "day", label: "Daily", value: "day" },
//               { id: "week", label: "Weekly", value: "week" },
//               { id: "month", label: "Monthly", value: "month" },
//               { id: "year", label: "Yearly", value: "year" },
//             ]}
//             datafield="id"
//             displayfield="label"
//             datavalue={selectedValue}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Selected Value:</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {selectedValue || "None"}
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

// export const MultipleInteractiveDemo: Story = {
//   render: () => {
//     const [selectedValues, setSelectedValues] = useState<any[]>(["email"]);

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         multipleInteractive: {},
//       },
//       onChange: (name: string, data: any) => {
//         setSelectedValues(data.datavalue || []);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Multiple Selection Demo</Typography>
//           <SwitchDefaultExport
//             name="multipleInteractive"
//             dataset={[
//               { key: "email", label: "Email", value: "email", selected: true },
//               { key: "sms", label: "SMS", value: "sms", selected: false },
//               { key: "push", label: "Push", value: "push", selected: false },
//               { key: "phone", label: "Phone", value: "phone", selected: false },
//             ]}
//             datafield="key"
//             displayfield="label"
//             multiple={true}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Selected Values:</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {selectedValues.length > 0 ? JSON.stringify(selectedValues) : "None"}
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mt={1} display="block">
//               Total selected: {selectedValues.length}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "multipleInteractive",
//     listener: mockListener,
//   },
// };

// export const StateComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           State Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Normal State
//             </Typography>
//             <SwitchDefaultExport
//               name="normalState"
//               dataset="Yes, No, Maybe"
//               datavalue="Yes"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <SwitchDefaultExport
//               name="disabledState"
//               dataset="Yes, No, Maybe"
//               datavalue="No"
//               disabled={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required State
//             </Typography>
//             <SwitchDefaultExport
//               name="requiredState"
//               dataset="Accept, Decline"
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

// export const SizeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Different Number of Options
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               2 Options
//             </Typography>
//             <SwitchDefaultExport
//               name="twoOptions"
//               dataset="On, Off"
//               datavalue="On"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               3 Options
//             </Typography>
//             <SwitchDefaultExport
//               name="threeOptions"
//               dataset="Low, Medium, High"
//               datavalue="Medium"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               4 Options
//             </Typography>
//             <SwitchDefaultExport
//               name="fourOptions"
//               dataset="North, South, East, West"
//               datavalue="North"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               5 Options
//             </Typography>
//             <SwitchDefaultExport
//               name="fiveOptions"
//               dataset="XS, S, M, L, XL"
//               datavalue="M"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "sizeComparison",
//     listener: mockListener,
//   },
// };

// export const FormExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           User Profile Settings
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Account Status
//             </Typography>
//             <SwitchDefaultExport
//               name="accountStatus"
//               dataset="Active, Inactive"
//               datavalue="Active"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Profile Visibility
//             </Typography>
//             <SwitchDefaultExport
//               name="visibility"
//               dataset="Public, Private, Friends Only"
//               datavalue="Public"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Theme
//             </Typography>
//             <SwitchDefaultExport
//               name="theme"
//               dataset="Light, Dark, Auto"
//               datavalue="Light"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Language
//             </Typography>
//             <SwitchDefaultExport
//               name="language"
//               dataset="English, Spanish, French, German"
//               datavalue="English"
//               listener={mockListener}
//             />
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

// export const DashboardExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Analytics Dashboard
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Time Range
//             </Typography>
//             <SwitchDefaultExport
//               name="timeRange"
//               dataset="Today, Week, Month, Quarter, Year"
//               datavalue="Week"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               View Mode
//             </Typography>
//             <SwitchDefaultExport
//               name="viewMode"
//               dataset="Chart, Table, Both"
//               datavalue="Chart"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Chart Type
//             </Typography>
//             <SwitchDefaultExport
//               name="chartType"
//               dataset="Line, Bar, Pie, Area"
//               datavalue="Line"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "dashboardExample",
//     listener: mockListener,
//   },
// };

// export const FilterExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Product Filters
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Sort By
//             </Typography>
//             <SwitchDefaultExport
//               name="sortBy"
//               dataset="Newest, Price Low to High, Price High to Low, Rating"
//               datavalue="Newest"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Availability
//             </Typography>
//             <SwitchDefaultExport
//               name="availability"
//               dataset="All, In Stock, Out of Stock"
//               datavalue="All"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Category
//             </Typography>
//             <SwitchDefaultExport
//               name="category"
//               dataset="Electronics, Clothing, Books, Home, Sports"
//               datavalue="Electronics"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "filterExample",
//     listener: mockListener,
//   },
// };

// export const NotificationPreferences: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Notification Preferences
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Notification Method (Multiple Selection)
//             </Typography>
//             <SwitchDefaultExport
//               name="notificationMethod"
//               dataset={[
//                 { key: "email", label: "Email", value: "email", selected: true },
//                 { key: "sms", label: "SMS", value: "sms", selected: false },
//                 { key: "push", label: "Push", value: "push", selected: true },
//                 { key: "desktop", label: "Desktop", value: "desktop", selected: false },
//               ]}
//               datafield="key"
//               displayfield="label"
//               multiple={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Frequency
//             </Typography>
//             <SwitchDefaultExport
//               name="frequency"
//               dataset="Immediately, Hourly, Daily, Weekly"
//               datavalue="Daily"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Do Not Disturb
//             </Typography>
//             <SwitchDefaultExport
//               name="doNotDisturb"
//               dataset="On, Off"
//               datavalue="Off"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "notificationPreferences",
//     listener: mockListener,
//   },
// };

// export const PaymentMethodExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Select Payment Method
//         </Typography>
//         <SwitchDefaultExport
//           name="paymentMethod"
//           dataset="Credit Card, Debit Card, PayPal, Bank Transfer"
//           datavalue="Credit Card"
//           required={true}
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
//   args: {
//     name: "paymentExample",
//     listener: mockListener,
//   },
// };

// export const DeliveryMethodExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Delivery Options
//         </Typography>
//         <Stack spacing={2}>
//           <SwitchDefaultExport
//             name="deliverySpeed"
//             dataset="Standard (5-7 days), Express (2-3 days), Overnight"
//             datavalue="Standard (5-7 days)"
//             required={true}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "deliveryExample",
//     listener: mockListener,
//   },
// };

// export const ToggleFeatures: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Feature Toggles
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Dark Mode
//             </Typography>
//             <SwitchDefaultExport
//               name="darkMode"
//               dataset="On, Off"
//               datavalue="Off"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Auto Save
//             </Typography>
//             <SwitchDefaultExport
//               name="autoSave"
//               dataset="Enabled, Disabled"
//               datavalue="Enabled"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Two Factor Authentication
//             </Typography>
//             <SwitchDefaultExport
//               name="twoFactor"
//               dataset="Active, Inactive"
//               datavalue="Active"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Email Notifications
//             </Typography>
//             <SwitchDefaultExport
//               name="emailNotif"
//               dataset="Yes, No"
//               datavalue="Yes"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "toggleFeatures",
//     listener: mockListener,
//   },
// };
