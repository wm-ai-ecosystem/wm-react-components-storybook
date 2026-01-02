import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import RadiosetDefaultExport from "../../../../components/input/default/radioset/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";
import layoutGrid from "@wavemaker/react-runtime/components/container/layout-grid";


const meta: Meta<typeof RadiosetDefaultExport> = {
  title: "Input/RadioSet",
  component: RadiosetDefaultExport,
  argTypes: {
    // collapsible: { control: "boolean" },
    // compareby: { control: "object" },
    datafield: { control: "text" },
    dataset: { control: "object" },
    datavalue: { control: "text" },
    disabled: { control: "boolean" },
    displayfield: { control: "text" },
    displayValue: { control: "text" },
    groupby: { control: "text" },
    // itemclass: { control: "text" },
    itemsperrow: { control: "select", options: ["xs-1 sm-1 md-1 lg-1","xs-1 sm-2 md-2 lg-2","xs-1 sm-2 md-3 lg-3","xs-1 sm-2 md-3 lg-4","xs-1 sm-2 md-4 lg-6"] },
    // listclass: { control: "text" },
    // match: { control: "text" },
    orderby: { control: "text" },
    readonly: { control: "boolean" },
    // required: { control: "boolean" },
    // showcount: { control: "boolean" },
    // usekeys: { control: "boolean" },
    // tabindex: { control: "number" },
    // width: { control: "text" },
    // height: { control: "text" },
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
    <RadiosetDefaultExport {...args} listener={mockListener} />
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
    name: "basicRadioset",
    dataset: "Option 1, Option 2, Option 3",
    listener: mockListener,
    disabled: false,
    readonly: false,
  },
};

export const ObjectDataset: Story = {
  render: Template,
  args: {
    name: "objectDataset",
    dataset: [
      { id: 1, name: "Economy", price: "$50" },
      { id: 2, name: "Business", price: "$100" },
      { id: 3, name: "First Class", price: "$200" },
      { id: 4, name: "Premium", price: "$300" },
    ],
    datafield: "id",
    displayfield: "name",
    listener: mockListener,
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      {/* Main Heading */}
      <Box sx={{mb: 3}}>
        <Typography variant="h6" fontWeight={600}>
          Radioset Types
        </Typography>
      </Box>

      <Stack spacing={4}>
        {/* Preselected value */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Preselected Value
          </Typography>
          <RadiosetDefaultExport
            name="preselectedRadioset"
            dataset={[
              { id: 1, label: "Small" },
              { id: 2, label: "Medium" },
              { id: 3, label: "Large" },
            ]}
            datafield="id"
            displayfield="label"
            datavalue={2}
            listener={mockListener}
          />
        </Box>

        {/* Order by */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Alphabetical Order (orderby = label)
          </Typography>
          <RadiosetDefaultExport
            name="orderedRadioset"
            dataset={[
              { id: 1, label: "Banana" },
              { id: 2, label: "Apple" },
              { id: 3, label: "Orange" },
              { id: 4, label: "Mango" },
            ]}
            datafield="id"
            displayfield="label"
            orderby="label"
            listener={mockListener}
          />
        </Box>

        {/* Group by */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Grouped Options (groupby)
          </Typography>
          <RadiosetDefaultExport
            name="groupedRadioset"
            dataset={[
              { id: 1, label: "Chrome", category: "Browsers" },
              { id: 2, label: "Firefox", category: "Browsers" },
              { id: 3, label: "VS Code", category: "Editors" },
              { id: 4, label: "WebStorm", category: "Editors" },
            ]}
            datafield="id"
            displayfield="label"
            groupby="category"
            listener={mockListener}
          />
        </Box>

        {/* Items per row */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Items Per Row
          </Typography>
          <RadiosetDefaultExport
            name="itemsPerRowRadioset"
            dataset={[
              { id: 1, label: "HTML" },
              { id: 2, label: "CSS" },
              { id: 3, label: "JavaScript" },
              { id: 4, label: "React" },
              { id: 5, label: "Angular" },
              { id: 6, label: "Vue" },
            ]}
            datafield="id"
            displayfield="label"
            itemsperrow="xs-1 sm-2 md-3 lg-4"
            listener={mockListener}
          />
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "showcaseRadioset",
  },
};


// export const ItemsPerRowTwo: Story = {
//   render: Template,
//   args: {
//     name: "twoPerRow",
//     dataset: "Option 1, Option 2, Option 3, Option 4, Option 5, Option 6",
//     itemsperrow: "xs-2 sm-2 md-2 lg-2",
//     listener: mockListener,
//   },
// };

// export const StringDataset: Story = {
//   render: Template,
//   args: {
//     name: "stringDataset",
//     dataset: "Red, Green, Blue, Yellow, Orange",
//     listener: mockListener,
//   },
// };

// export const ObjectDatasetWithPreselection: Story = {
//   render: Template,
//   args: {
//     name: "objectPreselected",
//     dataset: [
//       { id: 1, name: "Daily", interval: "1 day" },
//       { id: 2, name: "Weekly", interval: "7 days" },
//       { id: 3, name: "Monthly", interval: "30 days" },
//       { id: 4, name: "Yearly", interval: "365 days" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     datavalue: 2,
//     listener: mockListener,
//   },
// };

// export const GroupedData: Story = {
//   render: Template,
//   args: {
//     name: "groupedRadioset",
//     dataset: [
//       { id: 1, name: "React", category: "Frontend" },
//       { id: 2, name: "Angular", category: "Frontend" },
//       { id: 3, name: "Vue", category: "Frontend" },
//       { id: 4, name: "Node.js", category: "Backend" },
//       { id: 5, name: "Django", category: "Backend" },
//       { id: 6, name: "Spring Boot", category: "Backend" },
//       { id: 7, name: "MySQL", category: "Database" },
//       { id: 8, name: "PostgreSQL", category: "Database" },
//       { id: 9, name: "MongoDB", category: "Database" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     groupby: "category",
//     listener: mockListener,
//   },
// };

// export const WithOrderBy: Story = {
//   render: Template,
//   args: {
//     name: "orderedRadioset",
//     dataset: [
//       { id: 1, name: "Zebra", priority: 3 },
//       { id: 2, name: "Apple", priority: 1 },
//       { id: 3, name: "Dog", priority: 5 },
//       { id: 4, name: "Banana", priority: 2 },
//       { id: 5, name: "Cat", priority: 4 },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     orderby: "name:asc",
//     listener: mockListener,
//   },
// };

// export const WithSelectedValue: Story = {
//   render: Template,
//   args: {
//     name: "selectedRadioset",
//     dataset: "Small, Medium, Large, Extra Large",
//     datavalue: "Medium",
//     listener: mockListener,
//   },
// };

// export const ItemsPerRowThree: Story = {
//   render: Template,
//   args: {
//     name: "threePerRow",
//     dataset: "Item A, Item B, Item C, Item D, Item E, Item F",
//     itemsperrow: "xs-3 sm-3 md-3 lg-3",
//     listener: mockListener,
//   },
// };

// export const ItemsPerRowFour: Story = {
//   render: Template,
//   args: {
//     name: "fourPerRow",
//     dataset: "Choice 1, Choice 2, Choice 3, Choice 4, Choice 5, Choice 6, Choice 7, Choice 8",
//     itemsperrow: "xs-4 sm-4 md-4 lg-4",
//     listener: mockListener,
//   },
// };

// export const GroupedWithCount: Story = {
//   render: Template,
//   args: {
//     name: "groupedWithCount",
//     dataset: [
//       { id: 1, name: "Visa", type: "Credit Card" },
//       { id: 2, name: "Mastercard", type: "Credit Card" },
//       { id: 3, name: "American Express", type: "Credit Card" },
//       { id: 4, name: "PayPal", type: "Digital Wallet" },
//       { id: 5, name: "Apple Pay", type: "Digital Wallet" },
//       { id: 6, name: "Bank Transfer", type: "Direct Payment" },
//       { id: 7, name: "Cash", type: "Direct Payment" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     groupby: "type",
//     showcount: true,
//     listener: mockListener,
//   },
// };

// export const CollapsibleGroups: Story = {
//   render: Template,
//   args: {
//     name: "collapsibleGroups",
//     dataset: [
//       { id: 1, name: "Sedan", category: "Compact" },
//       { id: 2, name: "Hatchback", category: "Compact" },
//       { id: 3, name: "SUV", category: "Large" },
//       { id: 4, name: "Minivan", category: "Large" },
//       { id: 5, name: "Pickup Truck", category: "Large" },
//       { id: 6, name: "Convertible", category: "Luxury" },
//       { id: 7, name: "Sports Car", category: "Luxury" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     groupby: "category",
//     collapsible: true,
//     showcount: true,
//     listener: mockListener,
//   },
// };

// export const GroupedWithPreselection: Story = {
//   render: Template,
//   args: {
//     name: "groupedPreselected",
//     dataset: [
//       { id: 1, name: "Breakfast", meal: "Morning" },
//       { id: 2, name: "Brunch", meal: "Morning" },
//       { id: 3, name: "Lunch", meal: "Afternoon" },
//       { id: 4, name: "Afternoon Tea", meal: "Afternoon" },
//       { id: 5, name: "Dinner", meal: "Evening" },
//       { id: 6, name: "Supper", meal: "Evening" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     groupby: "meal",
//     collapsible: true,
//     showcount: true,
//     datavalue: 3,
//     listener: mockListener,
//   },
// };

// export const DisabledRadioset: Story = {
//   render: Template,
//   args: {
//     name: "disabledRadioset",
//     dataset: "Option A, Option B, Option C, Option D",
//     datavalue: "Option B",
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const ReadonlyRadioset: Story = {
//   render: Template,
//   args: {
//     name: "readonlyRadioset",
//     dataset: "Male, Female, Other, Prefer not to say",
//     datavalue: "Male",
//     readonly: true,
//     listener: mockListener,
//   },
// };

// export const RequiredRadioset: Story = {
//   render: Template,
//   args: {
//     name: "requiredRadioset",
//     dataset: "Yes, No",
//     required: true,
//     listener: mockListener,
//   },
// };

// export const WithUseKeys: Story = {
//   render: Template,
//   args: {
//     name: "useKeysRadioset",
//     dataset: [
//       { key: "opt1", name: "Option One", value: "value1" },
//       { key: "opt2", name: "Option Two", value: "value2" },
//       { key: "opt3", name: "Option Three", value: "value3" },
//     ],
//     datafield: "key",
//     displayfield: "name",
//     usekeys: true,
//     datavalue: "opt1",
//     listener: mockListener,
//   },
// };

// export const CustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClass",
//     dataset: "Option 1, Option 2, Option 3",
//     className: "custom-radioset-class",
//     listener: mockListener,
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledRadioset",
//     dataset: "Red, Green, Blue",
//     styles: {
//       backgroundColor: "#fff3e0",
//       padding: "16px",
//       borderRadius: "8px",
//       border: "2px solid #ff9800",
//     },
//     listener: mockListener,
//   },
// };

// export const CustomWidth: Story = {
//   render: Template,
//   args: {
//     name: "customWidth",
//     dataset: "Small, Medium, Large",
//     width: "300px",
//     listener: mockListener,
//   },
// };

// export const CustomHeight: Story = {
//   render: Template,
//   args: {
//     name: "customHeight",
//     dataset: "Option A, Option B, Option C, Option D, Option E, Option F",
//     height: "200px",
//     styles: {
//       overflowY: "auto",
//     },
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedValue, setSelectedValue] = useState<any>(null);

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveRadioset: {},
//       },
//       onChange: (name: string, data: any) => {
//         setSelectedValue(data.datavalue);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Radioset Demo</Typography>
//           <RadiosetDefaultExport
//             name="interactiveRadioset"
//             dataset={[
//               { id: 1, name: "Option One", description: "First option" },
//               { id: 2, name: "Option Two", description: "Second option" },
//               { id: 3, name: "Option Three", description: "Third option" },
//               { id: 4, name: "Option Four", description: "Fourth option" },
//             ]}
//             datafield="id"
//             displayfield="name"
//             datavalue={selectedValue}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Selected Value:</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {selectedValue !== null ? selectedValue : "None selected"}
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

// export const ItemsPerRowComparison: Story = {
//   render: () => {
//     const dataset = "Item 1, Item 2, Item 3, Item 4, Item 5, Item 6, Item 7, Item 8";
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Items Per Row Comparison
//         </Typography>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               1 Item Per Row (Default)
//             </Typography>
//             <RadiosetDefaultExport
//               name="onePerRow"
//               dataset={dataset}
//               itemsperrow="xs-1 sm-1 md-1 lg-1"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               2 Items Per Row
//             </Typography>
//             <RadiosetDefaultExport
//               name="twoPerRowComp"
//               dataset={dataset}
//               itemsperrow="xs-2 sm-2 md-2 lg-2"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               4 Items Per Row
//             </Typography>
//             <RadiosetDefaultExport
//               name="fourPerRowComp"
//               dataset={dataset}
//               itemsperrow="xs-4 sm-4 md-4 lg-4"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "itemsPerRowComparison",
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
//             <RadiosetDefaultExport
//               name="normalState"
//               dataset="Option A, Option B, Option C"
//               datavalue="Option A"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <RadiosetDefaultExport
//               name="disabledState"
//               dataset="Option A, Option B, Option C"
//               datavalue="Option B"
//               disabled={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <RadiosetDefaultExport
//               name="readonlyState"
//               dataset="Option A, Option B, Option C"
//               datavalue="Option C"
//               readonly={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required State
//             </Typography>
//             <RadiosetDefaultExport
//               name="requiredState"
//               dataset="Option A, Option B, Option C"
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

// export const FormExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Order Form
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Customer Information
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
//               placeholder="Email"
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
//               Select Size *
//             </Typography>
//             <RadiosetDefaultExport
//               name="size"
//               dataset="Small, Medium, Large, Extra Large"
//               required={true}
//               itemsperrow="xs-2 sm-2 md-4 lg-4"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Select Color *
//             </Typography>
//             <RadiosetDefaultExport
//               name="color"
//               dataset="Black, White, Red, Blue, Green"
//               required={true}
//               itemsperrow="xs-2 sm-3 md-5 lg-5"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Shipping Method *
//             </Typography>
//             <RadiosetDefaultExport
//               name="shipping"
//               dataset={[
//                 { id: 1, name: "Standard (5-7 days)", price: "Free" },
//                 { id: 2, name: "Express (2-3 days)", price: "$10" },
//                 { id: 3, name: "Overnight (1 day)", price: "$25" },
//               ]}
//               datafield="id"
//               displayfield="name"
//               required={true}
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

// export const PaymentMethodExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Select Payment Method
//         </Typography>
//         <RadiosetDefaultExport
//           name="paymentMethod"
//           dataset={[
//             { id: 1, name: "Credit Card", type: "Card Payment", icon: "💳" },
//             { id: 2, name: "Debit Card", type: "Card Payment", icon: "💳" },
//             { id: 3, name: "PayPal", type: "Digital Wallet", icon: "🅿️" },
//             { id: 4, name: "Apple Pay", type: "Digital Wallet", icon: "🍎" },
//             { id: 5, name: "Google Pay", type: "Digital Wallet", icon: "🔵" },
//             { id: 6, name: "Bank Transfer", type: "Direct Payment", icon: "🏦" },
//             { id: 7, name: "Cash on Delivery", type: "Direct Payment", icon: "💵" },
//           ]}
//           datafield="id"
//           displayfield="name"
//           groupby="type"
//           collapsible={true}
//           showcount={true}
//           datavalue={1}
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

// export const SubscriptionPlanExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Choose Your Plan
//         </Typography>
//         <RadiosetDefaultExport
//           name="subscriptionPlan"
//           dataset={[
//             { id: 1, name: "Free - $0/month", features: "Basic features" },
//             { id: 2, name: "Starter - $9/month", features: "More features" },
//             { id: 3, name: "Professional - $29/month", features: "All features" },
//             { id: 4, name: "Enterprise - $99/month", features: "Everything + Support" },
//           ]}
//           datafield="id"
//           displayfield="name"
//           datavalue={2}
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
//   args: {
//     name: "subscriptionExample",
//     listener: mockListener,
//   },
// };

// export const SurveyExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Customer Feedback Survey
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               How satisfied are you with our service? *
//             </Typography>
//             <RadiosetDefaultExport
//               name="satisfaction"
//               dataset="Very Satisfied, Satisfied, Neutral, Dissatisfied, Very Dissatisfied"
//               required={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               How likely are you to recommend us? (0-10) *
//             </Typography>
//             <RadiosetDefaultExport
//               name="nps"
//               dataset="0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
//               required={true}
//               itemsperrow="xs-6 sm-6 md-11 lg-11"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Which feature do you use most? *
//             </Typography>
//             <RadiosetDefaultExport
//               name="mostUsedFeature"
//               dataset={[
//                 { id: 1, name: "Dashboard", category: "Core Features" },
//                 { id: 2, name: "Reports", category: "Core Features" },
//                 { id: 3, name: "Analytics", category: "Core Features" },
//                 { id: 4, name: "Team Collaboration", category: "Collaboration" },
//                 { id: 5, name: "File Sharing", category: "Collaboration" },
//                 { id: 6, name: "API Integration", category: "Advanced" },
//                 { id: 7, name: "Custom Workflows", category: "Advanced" },
//               ]}
//               datafield="id"
//               displayfield="name"
//               groupby="category"
//               collapsible={true}
//               showcount={true}
//               required={true}
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

// export const QuizExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Quick Quiz
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Question 1: What is the capital of France? *
//             </Typography>
//             <RadiosetDefaultExport
//               name="question1"
//               dataset="London, Paris, Berlin, Madrid"
//               required={true}
//               itemsperrow="xs-2 sm-2 md-4 lg-4"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Question 2: Which programming language is primarily used for web development? *
//             </Typography>
//             <RadiosetDefaultExport
//               name="question2"
//               dataset="Python, JavaScript, Java, C++"
//               required={true}
//               itemsperrow="xs-2 sm-2 md-4 lg-4"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Question 3: What year was the first iPhone released? *
//             </Typography>
//             <RadiosetDefaultExport
//               name="question3"
//               dataset="2005, 2006, 2007, 2008"
//               required={true}
//               itemsperrow="xs-2 sm-2 md-4 lg-4"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "quizExample",
//     listener: mockListener,
//   },
// };

// export const SettingsExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Application Settings
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Theme
//             </Typography>
//             <RadiosetDefaultExport
//               name="theme"
//               dataset="Light, Dark, Auto (System Default)"
//               datavalue="Light"
//               itemsperrow="xs-1 sm-3 md-3 lg-3"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Language
//             </Typography>
//             <RadiosetDefaultExport
//               name="language"
//               dataset={[
//                 { id: "en", name: "English", region: "Global" },
//                 { id: "es", name: "Spanish", region: "Global" },
//                 { id: "fr", name: "French", region: "Europe" },
//                 { id: "de", name: "German", region: "Europe" },
//                 { id: "zh", name: "Chinese", region: "Asia" },
//                 { id: "ja", name: "Japanese", region: "Asia" },
//               ]}
//               datafield="id"
//               displayfield="name"
//               groupby="region"
//               collapsible={true}
//               datavalue="en"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={2}>
//               Font Size
//             </Typography>
//             <RadiosetDefaultExport
//               name="fontSize"
//               dataset="Small, Medium, Large, Extra Large"
//               datavalue="Medium"
//               itemsperrow="xs-2 sm-4 md-4 lg-4"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "settingsExample",
//     listener: mockListener,
//   },
// };
