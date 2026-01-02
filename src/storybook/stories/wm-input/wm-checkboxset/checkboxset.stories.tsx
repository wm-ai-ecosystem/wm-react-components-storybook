import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import CheckboxsetDefaultExport from "../../../../components/input/default/checkboxset/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";


const meta: Meta<typeof CheckboxsetDefaultExport> = {
  title: "Input/CheckboxSet",
  component: CheckboxsetDefaultExport,
  argTypes: {
    layout: {
      control: { type: "select" },
      options: ["inline", "stacked"],
    },
    itemsperrow: { control: "select", options: ["xs-1 sm-1 md-1 lg-1","xs-1 sm-2 md-2 lg-2","xs-1 sm-2 md-3 lg-3","xs-1 sm-2 md-3 lg-4","xs-1 sm-2 md-4 lg-6"] },
    // itemclass: { control: "text" },
    // listclass: { control: "text" },
    // showcount: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    // required: { control: "boolean" },
    dataset: { control: "object" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    datavalue: { control: "object" },
    // usekeys: { control: "boolean" },
    groupby: { control: "text" },
    // match: { control: "text" },
    orderby: { control: "text" },
    label: { control: "text" },
    // collapsible: { control: "boolean" },
    // collapsed: { control: "boolean" },
    // tabIndex: { control: "number" },
    // className: { control: "text" },
    // compareby: { control: "object" },
    // height: { control: "text" },
    // width: { control: "text" },
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
    <CheckboxsetDefaultExport {...args} listener={mockListener} />
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
    name: "basicCheckboxset",
    dataset: "Option 1, Option 2, Option 3",
    listener: mockListener,
    disabled: false,
    readonly: false,
    layout: "inline"
  },
};

export const ObjectDataset: Story = {
  render: Template,
  args: {
    name: "objectDataset",
    label: "",
    dataset: [
      { id: 1, name: "United States", code: "US" },
      { id: 2, name: "United Kingdom", code: "UK" },
      { id: 3, name: "Canada", code: "CA" },
      { id: 4, name: "Australia", code: "AU" },
      { id: 5, name: "Germany", code: "DE" },
    ],
    datafield: "id",
    displayfield: "name",
    listener: mockListener,
    layout:"inline"
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      {/* Main Heading */}
      <Box sx={{mb: 3}}>
      <Typography variant="h6" fontWeight={600}>
        Checkboxset Types
      </Typography>
      </Box>

      <Stack spacing={4}>
        {/* Inline layout */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Inline Layout
          </Typography>
          <CheckboxsetDefaultExport
            name="inlineLayoutShowcase"
            layout="inline"
            dataset={[
              { id: 1, label: "Option A" },
              { id: 2, label: "Option B" },
              { id: 3, label: "Option C" },
            ]}
            datafield="id"
            displayfield="label"
            listener={mockListener}
          />
        </Box>

        {/* Stacked layout */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Stacked Layout
          </Typography>
          <CheckboxsetDefaultExport
            name="stackedLayoutShowcase"
            layout="stacked"
            dataset={[
              { id: 1, label: "Option A" },
              { id: 2, label: "Option B" },
              { id: 3, label: "Option C" },
            ]}
            datafield="id"
            displayfield="label"
            listener={mockListener}
          />
        </Box>

        {/* Preselected values */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Preselected Values
          </Typography>
          <CheckboxsetDefaultExport
            name="preselectedValuesShowcase"
            dataset={[
              { id: "email", label: "Email Notifications" },
              { id: "push", label: "Push Notifications" },
              { id: "sms", label: "SMS Alerts" },
            ]}
            datafield="id"
            displayfield="label"
            datavalue={["email", "push"]}
            listener={mockListener}
          />
        </Box>

        {/* Alphabetical order */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Alphabetical Order (orderby = label)
          </Typography>
          <CheckboxsetDefaultExport
            name="alphabetOrderShowcase"
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

        {/* Grouped dataset */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Grouped Options (groupby)
          </Typography>
          <CheckboxsetDefaultExport
            name="groupedShowcase"
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
          <CheckboxsetDefaultExport
            name="itemsPerRowShowcase"
            layout="inline"
            itemsperrow="xs-1 sm-2 md-3 lg-4"
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
            listener={mockListener}
          />
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "showcaseCheckboxset",
  },
};



// export const WithPreselectedValues: Story = {
//   render: Template,
//   args: {
//     name: "preselected",
//     label: "Notification Settings",
//     dataset: "Email, SMS, Push Notifications, Phone Call",
//     datavalue: ["Email", "Push Notifications"],
//     listener: mockListener,
//   },
// };

// export const ItemsPerRow: Story = {
//   render: Template,
//   args: {
//     name: "itemsPerRow",
//     label: "Items per row: 2",
//     dataset: "Item 1, Item 2, Item 3, Item 4, Item 5, Item 6",
//     itemsperrow: "2",
//     listener: mockListener,
//   },
// };

// export const ObjectDatasetWithPreselection: Story = {
//   render: Template,
//   args: {
//     name: "objectPreselected",
//     label: "Select Technologies",
//     dataset: [
//       { id: 1, name: "React", category: "Frontend" },
//       { id: 2, name: "Angular", category: "Frontend" },
//       { id: 3, name: "Vue", category: "Frontend" },
//       { id: 4, name: "Node.js", category: "Backend" },
//       { id: 5, name: "Python", category: "Backend" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     datavalue: [1, 4],
//     listener: mockListener,
//   },
// };

// export const GroupedData: Story = {
//   render: Template,
//   args: {
//     name: "groupedCheckboxset",
//     label: "Select Technologies (Grouped)",
//     dataset: [
//       { id: 1, name: "React", category: "Frontend" },
//       { id: 2, name: "Angular", category: "Frontend" },
//       { id: 3, name: "Vue", category: "Frontend" },
//       { id: 4, name: "Node.js", category: "Backend" },
//       { id: 5, name: "Python", category: "Backend" },
//       { id: 6, name: "Java", category: "Backend" },
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
//     name: "orderedCheckboxset",
//     label: "Ordered by Name (Descending)",
//     dataset: [
//       { id: 1, name: "Zebra", category: "Animal" },
//       { id: 2, name: "Apple", category: "Fruit" },
//       { id: 3, name: "Dog", category: "Animal" },
//       { id: 4, name: "Banana", category: "Fruit" },
//       { id: 5, name: "Cat", category: "Animal" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     orderby: "name:desc",
//     listener: mockListener,
//   },
// };

// export const WithLabel: Story = {
//   render: Template,
//   args: {
//     name: "labeledCheckboxset",
//     label: "Select your preferences",
//     dataset: "Email, SMS, Push Notifications, Phone Call",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//   },
// };

// export const WithUseKeys: Story = {
//   render: Template,
//   args: {
//     name: "useKeysCheckboxset",
//     label: "Using Keys Instead of Values",
//     dataset: [
//       { id: "key1", name: "Option One", value: "val1" },
//       { id: "key2", name: "Option Two", value: "val2" },
//       { id: "key3", name: "Option Three", value: "val3" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     usekeys: true,
//     datavalue: ["key1"],
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedValues, setSelectedValues] = useState<any[]>([]);

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveCheckboxset: {},
//       },
//       onChange: (name: string, data: any) => {
//         setSelectedValues(data.datavalue || []);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Checkboxset Demo</Typography>
//           <CheckboxsetDefaultExport
//             name="interactiveCheckboxset"
//             label="Select your favorite fruits"
//             dataset={[
//               { id: 1, name: "Apple", color: "Red" },
//               { id: 2, name: "Banana", color: "Yellow" },
//               { id: 3, name: "Orange", color: "Orange" },
//               { id: 4, name: "Grape", color: "Purple" },
//               { id: 5, name: "Strawberry", color: "Red" },
//             ]}
//             datafield="id"
//             displayfield="name"
//             datavalue={selectedValues}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Selected Values:</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {selectedValues.length > 0 ? JSON.stringify(selectedValues) : "None selected"}
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
//     name: "interactiveDemo",
//     listener: mockListener,
//   },
// };

// export const InlineLayout: Story = {
//   render: Template,
//   args: {
//     name: "inlineCheckboxset",
//     label: "Choose options (Inline)",
//     dataset: "Option A, Option B, Option C, Option D",
//     layout: "inline",
//     listener: mockListener,
//   },
// };

// export const StackedLayout: Story = {
//   render: Template,
//   args: {
//     name: "stackedCheckboxset",
//     label: "Choose options (Stacked)",
//     dataset: "Option A, Option B, Option C, Option D",
//     layout: "stacked",
//     listener: mockListener,
//   },
// };

// export const ThreeItemsPerRow: Story = {
//   render: Template,
//   args: {
//     name: "threeItemsPerRow",
//     label: "Items per row: 3",
//     dataset: "Item 1, Item 2, Item 3, Item 4, Item 5, Item 6",
//     itemsperrow: "3",
//     listener: mockListener,
//   },
// };

// export const FourItemsPerRow: Story = {
//   render: Template,
//   args: {
//     name: "fourItemsPerRow",
//     label: "Items per row: 4",
//     dataset: "Item 1, Item 2, Item 3, Item 4, Item 5, Item 6, Item 7, Item 8",
//     itemsperrow: "4",
//     listener: mockListener,
//   },
// };


// export const GroupedWithCount: Story = {
//   render: Template,
//   args: {
//     name: "groupedWithCount",
//     label: "Select Skills (with count)",
//     dataset: [
//       { id: 1, name: "JavaScript", type: "Language" },
//       { id: 2, name: "TypeScript", type: "Language" },
//       { id: 3, name: "Python", type: "Language" },
//       { id: 4, name: "React", type: "Framework" },
//       { id: 5, name: "Angular", type: "Framework" },
//       { id: 6, name: "Docker", type: "Tool" },
//       { id: 7, name: "Kubernetes", type: "Tool" },
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
//     label: "Select Products (Collapsible Groups)",
//     dataset: [
//       { id: 1, name: "Laptop", category: "Electronics" },
//       { id: 2, name: "Mouse", category: "Electronics" },
//       { id: 3, name: "Keyboard", category: "Electronics" },
//       { id: 4, name: "Desk", category: "Furniture" },
//       { id: 5, name: "Chair", category: "Furniture" },
//       { id: 6, name: "Lamp", category: "Furniture" },
//       { id: 7, name: "Notebook", category: "Stationery" },
//       { id: 8, name: "Pen", category: "Stationery" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     groupby: "category",
//     collapsible: true,
//     showcount: true,
//     listener: mockListener,
//   },
// };

// export const CollapsedByDefault: Story = {
//   render: Template,
//   args: {
//     name: "collapsedDefault",
//     label: "Collapsed Groups by Default",
//     dataset: [
//       { id: 1, name: "Apple", type: "Fruit" },
//       { id: 2, name: "Banana", type: "Fruit" },
//       { id: 3, name: "Orange", type: "Fruit" },
//       { id: 4, name: "Carrot", type: "Vegetable" },
//       { id: 5, name: "Broccoli", type: "Vegetable" },
//       { id: 6, name: "Spinach", type: "Vegetable" },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     groupby: "type",
//     collapsible: true,
//     collapsed: true,
//     showcount: true,
//     listener: mockListener,
//   },
// };

// export const DisabledCheckboxset: Story = {
//   render: Template,
//   args: {
//     name: "disabledCheckboxset",
//     label: "Disabled Checkboxset",
//     dataset: "Option 1, Option 2, Option 3, Option 4",
//     datavalue: ["Option 1", "Option 3"],
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const ReadonlyCheckboxset: Story = {
//   render: Template,
//   args: {
//     name: "readonlyCheckboxset",
//     label: "Readonly Checkboxset",
//     dataset: "Feature A, Feature B, Feature C, Feature D",
//     datavalue: ["Feature A", "Feature C"],
//     readonly: true,
//     listener: mockListener,
//   },
// };

// export const RequiredCheckboxset: Story = {
//   render: Template,
//   args: {
//     name: "requiredCheckboxset",
//     label: "Required Checkboxset",
//     dataset: "I agree to terms, I accept privacy policy, I consent to data processing",
//     required: true,
//     listener: mockListener,
//   },
// };

// export const CustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClass",
//     label: "With Custom Class",
//     dataset: "Red, Green, Blue, Yellow",
//     className: "custom-checkboxset-class",
//     listener: mockListener,
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledCheckboxset",
//     label: "Custom Styled Checkboxset",
//     dataset: "Option A, Option B, Option C",
//     styles: {
//       backgroundColor: "#f0f8ff",
//       padding: "16px",
//       borderRadius: "8px",
//       border: "2px solid #1976d2",
//     },
//     listener: mockListener,
//   },
// };

// export const LayoutComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Layout Comparison
//         </Typography>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Stacked Layout
//             </Typography>
//             <CheckboxsetDefaultExport
//               name="stackedCompare"
//               dataset="Option 1, Option 2, Option 3, Option 4"
//               layout="stacked"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Inline Layout
//             </Typography>
//             <CheckboxsetDefaultExport
//               name="inlineCompare"
//               dataset="Option 1, Option 2, Option 3, Option 4"
//               layout="inline"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "layoutComparison",
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
//               2 Items Per Row
//             </Typography>
//             <CheckboxsetDefaultExport
//               name="twoPerRow"
//               dataset={dataset}
//               itemsperrow="2"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               3 Items Per Row
//             </Typography>
//             <CheckboxsetDefaultExport
//               name="threePerRow"
//               dataset={dataset}
//               itemsperrow="3"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               4 Items Per Row
//             </Typography>
//             <CheckboxsetDefaultExport
//               name="fourPerRow"
//               dataset={dataset}
//               itemsperrow="4"
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
//             <CheckboxsetDefaultExport
//               name="normalState"
//               dataset="Option A, Option B, Option C"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <CheckboxsetDefaultExport
//               name="disabledState"
//               dataset="Option A, Option B, Option C"
//               datavalue={["Option A"]}
//               disabled={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <CheckboxsetDefaultExport
//               name="readonlyState"
//               dataset="Option A, Option B, Option C"
//               datavalue={["Option B"]}
//               readonly={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required State
//             </Typography>
//             <CheckboxsetDefaultExport
//               name="requiredState"
//               label="Required Selection"
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
//           Registration Form
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
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
//           <CheckboxsetDefaultExport
//             name="interests"
//             label="Select your interests"
//             dataset="Sports, Music, Reading, Travel, Gaming, Cooking"
//             itemsperrow="2"
//             listener={mockListener}
//           />
//           <CheckboxsetDefaultExport
//             name="notifications"
//             label="Notification Preferences"
//             dataset="Email, SMS, Push Notifications"
//             listener={mockListener}
//           />
//           <CheckboxsetDefaultExport
//             name="agreements"
//             label="Agreements"
//             dataset="I accept the Terms and Conditions, I agree to Privacy Policy"
//             required={true}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "formExample",
//     listener: mockListener,
//   },
// };

// export const SkillsSelectionExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Skills Assessment
//         </Typography>
//         <CheckboxsetDefaultExport
//           name="technicalSkills"
//           label="Select your technical skills"
//           dataset={[
//             { id: 1, name: "JavaScript", level: "Programming" },
//             { id: 2, name: "TypeScript", level: "Programming" },
//             { id: 3, name: "Python", level: "Programming" },
//             { id: 4, name: "Java", level: "Programming" },
//             { id: 5, name: "React", level: "Framework" },
//             { id: 6, name: "Angular", level: "Framework" },
//             { id: 7, name: "Vue.js", level: "Framework" },
//             { id: 8, name: "Node.js", level: "Runtime" },
//             { id: 9, name: "Docker", level: "DevOps" },
//             { id: 10, name: "Kubernetes", level: "DevOps" },
//             { id: 11, name: "AWS", level: "Cloud" },
//             { id: 12, name: "Azure", level: "Cloud" },
//           ]}
//           datafield="id"
//           displayfield="name"
//           groupby="level"
//           collapsible={true}
//           showcount={true}
//           itemsperrow="2"
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
//   args: {
//     name: "skillsExample",
//     listener: mockListener,
//   },
// };

// export const ProductSelectionExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           E-commerce Product Filter
//         </Typography>
//         <Stack spacing={3}>
//           <CheckboxsetDefaultExport
//             name="categories"
//             label="Categories"
//             dataset={[
//               { id: 1, name: "Electronics", count: 45 },
//               { id: 2, name: "Clothing", count: 123 },
//               { id: 3, name: "Home & Garden", count: 67 },
//               { id: 4, name: "Sports", count: 34 },
//               { id: 5, name: "Books", count: 89 },
//             ]}
//             datafield="id"
//             displayfield="name"
//             listener={mockListener}
//           />
//           <CheckboxsetDefaultExport
//             name="brands"
//             label="Brands"
//             dataset="Nike, Adidas, Apple, Samsung, Sony, LG"
//             itemsperrow="2"
//             listener={mockListener}
//           />
//           <CheckboxsetDefaultExport
//             name="priceRanges"
//             label="Price Range"
//             dataset="Under $50, $50 - $100, $100 - $200, $200 - $500, Over $500"
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "productExample",
//     listener: mockListener,
//   },
// };

// export const PermissionsExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           User Role Permissions
//         </Typography>
//         <CheckboxsetDefaultExport
//           name="permissions"
//           label="Assign Permissions"
//           dataset={[
//             { id: 1, name: "View Dashboard", category: "Dashboard" },
//             { id: 2, name: "View Analytics", category: "Dashboard" },
//             { id: 3, name: "Create Users", category: "User Management" },
//             { id: 4, name: "Edit Users", category: "User Management" },
//             { id: 5, name: "Delete Users", category: "User Management" },
//             { id: 6, name: "View Reports", category: "Reporting" },
//             { id: 7, name: "Generate Reports", category: "Reporting" },
//             { id: 8, name: "Export Data", category: "Reporting" },
//             { id: 9, name: "Manage Settings", category: "Administration" },
//             { id: 10, name: "System Configuration", category: "Administration" },
//           ]}
//           datafield="id"
//           displayfield="name"
//           groupby="category"
//           collapsible={true}
//           showcount={true}
//           datavalue={[1, 3, 6]}
//           listener={mockListener}
//         />
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
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Customer Satisfaction Survey
//         </Typography>
//         <Stack spacing={3}>
//           <CheckboxsetDefaultExport
//             name="usedFeatures"
//             label="Which features have you used?"
//             dataset={[
//               { id: 1, name: "Dashboard", type: "Core" },
//               { id: 2, name: "Reports", type: "Core" },
//               { id: 3, name: "Analytics", type: "Advanced" },
//               { id: 4, name: "Integrations", type: "Advanced" },
//               { id: 5, name: "Mobile App", type: "Mobile" },
//               { id: 6, name: "API Access", type: "Developer" },
//             ]}
//             datafield="id"
//             displayfield="name"
//             groupby="type"
//             collapsible={true}
//             listener={mockListener}
//           />
//           <CheckboxsetDefaultExport
//             name="improvements"
//             label="What would you like to see improved?"
//             dataset="Performance, User Interface, Documentation, Customer Support, Mobile Experience, New Features"
//             itemsperrow="2"
//             listener={mockListener}
//           />
//           <CheckboxsetDefaultExport
//             name="recommend"
//             label="Would you recommend us?"
//             dataset="Yes, I would recommend, Maybe, No"
//             required={true}
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "surveyExample",
//     listener: mockListener,
//   },
// };

// export const PreferencesExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 700 }}>
//         <Typography variant="h6" mb={3}>
//           Application Preferences
//         </Typography>
//         <Stack spacing={3}>
//           <CheckboxsetDefaultExport
//             name="displaySettings"
//             label="Display Settings"
//             dataset="Show tooltips, Enable animations, Compact view, High contrast mode"
//             datavalue={["Show tooltips", "Enable animations"]}
//             listener={mockListener}
//           />
//           <CheckboxsetDefaultExport
//             name="notificationSettings"
//             label="Notification Settings"
//             dataset="Email notifications, Push notifications, SMS alerts, Desktop notifications"
//             datavalue={["Email notifications", "Push notifications"]}
//             itemsperrow="2"
//             listener={mockListener}
//           />
//           <CheckboxsetDefaultExport
//             name="privacySettings"
//             label="Privacy Settings"
//             dataset="Make profile public, Allow search engines, Show online status, Display email address"
//             listener={mockListener}
//           />
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "preferencesExample",
//     listener: mockListener,
//   },
// };
