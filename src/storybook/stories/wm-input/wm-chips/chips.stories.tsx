import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import ChipsDefaultExport from "../../../../components/input/chips/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import chipsTokensData from "../../../../designTokens/components/chips/chips.json";

const meta: Meta<typeof ChipsDefaultExport> = {
  title: "Input/Chips",
  component: ChipsDefaultExport,
  // argTypes: {
  //   type: {
  //     control: { type: "select" },
  //     options: ["search", "autocomplete"],
  //   },
  //   inputposition: {
  //     control: { type: "select" },
  //     options: ["first", "last"],
  //   },
  //   inputwidth: {
  //     control: { type: "select" },
  //     options: ["default", "full"],
  //   },
  //   matchmode: {
  //     control: { type: "select" },
  //     options: ["contains", "start", "end", "exact"],
  //   },
  //   allowonlyselect: { control: "boolean" },
  //   autofocus: { control: "boolean" },
  //   disabled: { control: "boolean" },
  //   readonly: { control: "boolean" },
  //   enablereorder: { control: "boolean" },
  //   showsearchicon: { control: "boolean" },
  //   maxsize: { control: "number" },
  //   // minchars: { control: "number" },
  //   debouncetime: { control: "number" },
  //   // tabindex: { control: "number" },
  //   limit: { control: "number" },
  //   placeholder: { control: "text" },
  //   // chipclass: { control: "text" },
  //   // className: { control: "text" },
  //   datafield: { control: "text" },
  //   displayfield: { control: "text" },
  //   // displayimagesrc: { control: "text" },
  //   // dateformat: { control: "text" },
  //   // groupby: { control: "text" },
  //   // orderby: { control: "text" },
  //   // searchkey: { control: "text" },
  //   match: { control: "text" },
  //   datacompletemsg: { control: "text" },
  //   // width: { control: "text" },
  //   // height: { control: "text" },
  //   // compareby: { control: "text" },
  // },
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

// Sample datasets
const simpleDataset = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

const fruitDataset = [
  { id: 1, name: "Apple", color: "Red" },
  { id: 2, name: "Banana", color: "Yellow" },
  { id: 3, name: "Cherry", color: "Red" },
  { id: 4, name: "Date", color: "Brown" },
  { id: 5, name: "Elderberry", color: "Purple" },
  { id: 6, name: "Fig", color: "Purple" },
  { id: 7, name: "Grape", color: "Green" },
  { id: 8, name: "Kiwi", color: "Brown" },
  { id: 9, name: "Lemon", color: "Yellow" },
  { id: 10, name: "Mango", color: "Orange" },
];

const skillsDataset = [
  { id: 1, skill: "JavaScript", category: "Programming" },
  { id: 2, skill: "React", category: "Framework" },
  { id: 3, skill: "TypeScript", category: "Programming" },
  { id: 4, skill: "Node.js", category: "Backend" },
  { id: 5, skill: "Python", category: "Programming" },
  { id: 6, skill: "Docker", category: "DevOps" },
  { id: 7, skill: "AWS", category: "Cloud" },
  { id: 8, skill: "Git", category: "Version Control" },
];

// const countriesDataset = [
//   { id: 1, name: "United States", code: "US" },
//   { id: 2, name: "United Kingdom", code: "UK" },
//   { id: 3, name: "Canada", code: "CA" },
//   { id: 4, name: "Australia", code: "AU" },
//   { id: 5, name: "Germany", code: "DE" },
//   { id: 6, name: "France", code: "FR" },
//   { id: 7, name: "Japan", code: "JP" },
//   { id: 8, name: "India", code: "IN" },
// ];

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <ChipsDefaultExport {...args} listener={mockListener} />
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
  args:{
    name:"docsChips",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => (
    <Box style={{ padding: 16 }}>
      <Box sx={{mb: 3}}>
      <Typography variant="h6" mb={3}>
        Chips Showcase
      </Typography>
      </Box>
      <Stack spacing={4}>
        {/* Autocomplete with one preselected value */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Autocomplete (Preselected)
          </Typography>
          <ChipsDefaultExport
            name="autocompleteChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            datavalue={["Apple"]}
            placeholder="Type to autocomplete..."
            type="autocomplete"
            inputposition="last"
            inputwidth="default"
            listener={mockListener}
          />
        </Box>

        {/* Search type */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Search
          </Typography>
          <ChipsDefaultExport
            name="searchChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            placeholder="Type to search..."
            type="search"
            inputposition="first"
            inputwidth="default"
            showsearchicon={true}
            listener={mockListener}
          />
        </Box>

        {/* Only allow select */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Allow Only Select
          </Typography>
          <ChipsDefaultExport
            name="onlySelectChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            allowonlyselect={true}
            placeholder="Select only from list..."
            type="autocomplete"
            inputposition="last"
            inputwidth="default"
            listener={mockListener}
          />
        </Box>

        {/* Reorderable chip */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Reorderable
          </Typography>
          <ChipsDefaultExport
            name="reorderChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            datavalue={["Apple", "Cherry"]}
            enablereorder={true}
            placeholder="Drag to reorder..."
            type="autocomplete"
            inputposition="last"
            inputwidth="default"
            listener={mockListener}
          />
        </Box>

        {/* Input position first */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Input Postion First
          </Typography>
          <ChipsDefaultExport
            name="autocompleteChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            datavalue={["Apple"]}
            placeholder="Type to autocomplete..."
            type="autocomplete"
            inputposition="first"
            inputwidth="default"
            listener={mockListener}
          />
        </Box>

        {/* Input position first */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Input Width Full
          </Typography>
          <ChipsDefaultExport
            name="autocompleteChip"
            dataset={fruitDataset}
            datafield="name"
            displayfield="name"
            datavalue={["Apple", "Cherry"]}
            placeholder="Type to autocomplete..."
            type="autocomplete"
            inputposition="first"
            inputwidth="full"
            listener={mockListener}
          />
        </Box>
      </Stack>
    </Box>
  ),
  args: {
    name: "showcaseChips",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicChips",
    listener: mockListener,
    dataset: fruitDataset,
    datafield: "name",
    displayfield: "name",
    placeholder: "Add a chip...",
    datavalue: ["Apple"],
    type: "autocomplete",
    inputposition:"first",
    inputwidth: "default",
    disabled: false,
    readonly: false,
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["search", "autocomplete"],
    },
    inputposition: {
      control: { type: "select" },
      options: ["first", "last"],
    },
    inputwidth: {
      control: { type: "select" },
      options: ["default", "full"],
    },
    matchmode: {
      control: { type: "select" },
      options: ["contains", "start", "end", "exact"],
    },
    allowonlyselect: { control: "boolean" },
    autofocus: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    enablereorder: { control: "boolean" },
    showsearchicon: { control: "boolean" },
    maxsize: { control: "number" },
    // minchars: { control: "number" },
    debouncetime: { control: "number" },
    // tabindex: { control: "number" },
    limit: { control: "number" },
    placeholder: { control: "text" },
    // chipclass: { control: "text" },
    // className: { control: "text" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    // displayimagesrc: { control: "text" },
    // dateformat: { control: "text" },
    // groupby: { control: "text" },
    // orderby: { control: "text" },
    // searchkey: { control: "text" },
    match: { control: "text" },
    datacompletemsg: { control: "text" },
    // width: { control: "text" },
    // height: { control: "text" },
    // compareby: { control: "text" },
  },
};

export const DesignToken: Story = {
  tags: ['show-panel'],
  render: (args) => {
      // Icon component can't spread data-design-token-target, so we apply it to a wrapper
      const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;
  
      return (
        <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
          <ChipsDefaultExport {...componentArgs} listener={mockListener} />
        </Box>
      );
    },
  args: {
    name: "designTokenChips",
    listener: mockListener,
    dataset: fruitDataset,
    datafield: "name",
    displayfield: "name",
    placeholder: "Add a chip...",
    datavalue: ["Apple"],
    type: "autocomplete",
    inputposition:"first",
    inputwidth: "default",
    disabled: false,
    readonly: false,
    "data-design-token-target":"true"
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["search", "autocomplete"],
    },
    inputposition: {
      control: { type: "select" },
      options: ["first", "last"],
    },
    inputwidth: {
      control: { type: "select" },
      options: ["default", "full"],
    },
    matchmode: {
      control: { type: "select" },
      options: ["contains", "start", "end", "exact"],
    },
    allowonlyselect: { control: "boolean" },
    autofocus: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    enablereorder: { control: "boolean" },
    showsearchicon: { control: "boolean" },
    maxsize: { control: "number" },
    // minchars: { control: "number" },
    debouncetime: { control: "number" },
    // tabindex: { control: "number" },
    limit: { control: "number" },
    placeholder: { control: "text" },
    // chipclass: { control: "text" },
    // className: { control: "text" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    // displayimagesrc: { control: "text" },
    // dateformat: { control: "text" },
    // groupby: { control: "text" },
    // orderby: { control: "text" },
    // searchkey: { control: "text" },
    match: { control: "text" },
    datacompletemsg: { control: "text" },
    // width: { control: "text" },
    // height: { control: "text" },
    // compareby: { control: "text" },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: chipsTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "chips",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  },
};


// export const AllowOnlySelect: Story = {
//   render: Template,
//   args: {
//     name: "onlySelectChips",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     allowonlyselect: true,
//     placeholder: "Only select from list...",
//     type: "autocomplete",
//   },
// };

// export const EnableReorder: Story = {
//   render: Template,
//   args: {
//     name: "reorderChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana", "Cherry", "Date"],
//     enablereorder: true,
//     placeholder: "Drag to reorder...",
//     type: "autocomplete",
//   },
// };


// export const WithInitialValues: Story = {
//   render: Template,
//   args: {
//     name: "chipsInitial",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana", "Cherry"],
//     placeholder: "Add more...",
//     type: "autocomplete",
//   },
// };

// export const SearchType: Story = {
//   render: Template,
//   args: {
//     name: "searchChips",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     placeholder: "Search fruits...",
//     type: "search",
//     showsearchicon: true,
//   },
// };


// export const MinimumCharacters: Story = {
//   render: Template,
//   args: {
//     name: "minCharsChips",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     minchars: 3,
//     placeholder: "Type at least 3 characters...",
//     type: "search",
//   },
// };

// export const WithGroupBy: Story = {
//   render: Template,
//   args: {
//     name: "groupByChips",
//     listener: mockListener,
//     dataset: skillsDataset,
//     datafield: "skill",
//     displayfield: "skill",
//     groupby: "category",
//     placeholder: "Search skills (grouped by category)...",
//     type: "autocomplete",
//   },
// };

// export const WithOrderBy: Story = {
//   render: Template,
//   args: {
//     name: "orderByChips",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     orderby: "name:asc",
//     placeholder: "Results sorted alphabetically...",
//     type: "autocomplete",
//   },
// };

// export const InputPositionLast: Story = {
//   render: Template,
//   args: {
//     name: "inputLastChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana"],
//     inputposition: "last",
//     placeholder: "Input on right...",
//     type: "autocomplete",
//   },
// };

// export const FullWidthInput: Story = {
//   render: Template,
//   args: {
//     name: "fullWidthChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     inputwidth: "full",
//     placeholder: "Full width input...",
//     type: "autocomplete",
//   },
// };

// export const WithSearchIcon: Story = {
//   render: Template,
//   args: {
//     name: "searchIconChips",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     showsearchicon: true,
//     placeholder: "Search with icon...",
//     type: "search",
//   },
// };

// export const WithLimit: Story = {
//   render: Template,
//   args: {
//     name: "limitChips",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     limit: 5,
//     placeholder: "Shows max 5 suggestions...",
//     type: "autocomplete",
//   },
// };

// export const WithMaxSize: Story = {
//   render: Template,
//   args: {
//     name: "maxSizeChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     maxsize: 5,
//     placeholder: "Max 5 chips allowed",
//     type: "autocomplete",
//   },
// };

// export const InputPositionFirst: Story = {
//   render: Template,
//   args: {
//     name: "inputFirstChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana"],
//     inputposition: "first",
//     placeholder: "Input on left...",
//     type: "autocomplete",
//   },
// };

// export const ReadonlyChips: Story = {
//   render: Template,
//   args: {
//     name: "readonlyChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana", "Cherry"],
//     readonly: true,
//     placeholder: "Readonly chips...",
//     type: "autocomplete",
//   },
// };

// export const DisabledChips: Story = {
//   render: Template,
//   args: {
//     name: "disabledChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana"],
//     disabled: true,
//     placeholder: "Disabled chips...",
//     type: "autocomplete",
//   },
// };

// export const AutocompleteType: Story = {
//   render: Template,
//   args: {
//     name: "autocompleteChips",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     placeholder: "Select fruits...",
//     type: "autocomplete",
//   },
// };


// export const CustomStyling: Story = {
//   render: Template,
//   args: {
//     name: "customStyleChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana"],
//     placeholder: "Custom styled...",
//     type: "autocomplete",
//     styles: {
//       padding: "16px",
//       backgroundColor: "#f5f5f5",
//       borderRadius: "8px",
//       border: "2px solid #2196f3",
//     },
//   },
// };

// export const TagsExample: Story = {
//   render: () => {
//     const tags = ["JavaScript", "React", "TypeScript", "Node.js", "CSS", "HTML"];
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Article Tags
//         </Typography>
//         <ChipsDefaultExport
//           name="articleTags"
//           dataset={tags}
//           datavalue={["JavaScript", "React"]}
//           placeholder="Add tags..."
//           type="autocomplete"
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
//   args: {
//     name: "tagsExample",
//     listener: mockListener,
//   },
// };

// export const EmailChips: Story = {
//   render: () => {
//     const emailContacts = [
//       "john@example.com",
//       "jane@example.com",
//       "bob@example.com",
//       "alice@example.com",
//       "charlie@example.com",
//     ];
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Email Recipients
//         </Typography>
//         <ChipsDefaultExport
//           name="emailChips"
//           dataset={emailContacts}
//           placeholder="Add email addresses..."
//           type="autocomplete"
//           inputwidth="full"
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
//   args: {
//     name: "emailChips",
//     listener: mockListener,
//   },
// };

// export const SkillsSelector: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Select Your Skills
//         </Typography>
//         <ChipsDefaultExport
//           name="skillsChips"
//           dataset={skillsDataset}
//           datafield="skill"
//           displayfield="skill"
//           placeholder="Search skills..."
//           type="autocomplete"
//           allowonlyselect={true}
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
//   args: {
//     name: "skillsSelector",
//     listener: mockListener,
//   },
// };

// export const CountriesSelector: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Select Countries
//         </Typography>
//         <ChipsDefaultExport
//           name="countriesChips"
//           dataset={countriesDataset}
//           datafield="name"
//           displayfield="name"
//           datavalue={[{ id: 1, name: "United States", code: "US" }]}
//           placeholder="Search countries..."
//           type="autocomplete"
//           maxsize={5}
//           listener={mockListener}
//         />
//         <Typography variant="caption" color="text.secondary" mt={1}>
//           Maximum 5 countries allowed
//         </Typography>
//       </Box>
//     );
//   },
//   args: {
//     name: "countriesSelector",
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedItems, setSelectedItems] = useState<string[]>(["React", "TypeScript"]);

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveChips: {},
//       },
//       onChange: (name: string, data: any) => {
//         if (data.datavalue) {
//           setSelectedItems(data.datavalue);
//         }
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Chips Demo</Typography>
//           <ChipsDefaultExport
//             name="interactiveChips"
//             dataset={skillsDataset}
//             datafield="skill"
//             displayfield="skill"
//             datavalue={selectedItems}
//             placeholder="Add skills..."
//             type="autocomplete"
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Selected Items:</Typography>
//             <Typography variant="body2">
//               {selectedItems.length > 0
//                 ? selectedItems.map((item: any) => item.skill || item).join(", ")
//                 : "None"}
//             </Typography>
//             <Typography variant="body2" mt={1}>
//               <strong>Count:</strong> {selectedItems.length}
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

// export const ReorderableChips: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Drag to Reorder Priority
//         </Typography>
//         <Typography variant="body2" color="text.secondary" mb={2}>
//           Click and drag chips to change their order
//         </Typography>
//         <ChipsDefaultExport
//           name="priorityChips"
//           dataset={["High", "Medium", "Low", "Critical", "Minor"]}
//           datavalue={["Critical", "High", "Medium", "Low"]}
//           enablereorder={true}
//           placeholder="Add priority..."
//           type="autocomplete"
//           listener={mockListener}
//         />
//       </Box>
//     );
//   },
//   args: {
//     name: "reorderableChips",
//     listener: mockListener,
//   },
// };

// export const InputPositionComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Input Position: First
//             </Typography>
//             <ChipsDefaultExport
//               name="positionFirst"
//               dataset={simpleDataset}
//               datavalue={["Apple", "Banana"]}
//               inputposition="first"
//               placeholder="Type here..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Input Position: Last (Default)
//             </Typography>
//             <ChipsDefaultExport
//               name="positionLast"
//               dataset={simpleDataset}
//               datavalue={["Apple", "Banana"]}
//               inputposition="last"
//               placeholder="Type here..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "inputPositionComparison",
//     listener: mockListener,
//   },
// };

// export const InputWidthComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Input Width: Default
//             </Typography>
//             <ChipsDefaultExport
//               name="widthDefault"
//               dataset={simpleDataset}
//               inputwidth="default"
//               placeholder="Default width..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Input Width: Full
//             </Typography>
//             <ChipsDefaultExport
//               name="widthFull"
//               dataset={simpleDataset}
//               inputwidth="full"
//               placeholder="Full width..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "inputWidthComparison",
//     listener: mockListener,
//   },
// };

// export const SearchVsAutocomplete: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Type: Autocomplete (Suggestions on typing)
//             </Typography>
//             <ChipsDefaultExport
//               name="typeAutocomplete"
//               dataset={fruitDataset}
//               datafield="name"
//               displayfield="name"
//               type="autocomplete"
//               placeholder="Start typing..."
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Type: Search (Click icon to search)
//             </Typography>
//             <ChipsDefaultExport
//               name="typeSearch"
//               dataset={fruitDataset}
//               datafield="name"
//               displayfield="name"
//               type="search"
//               showsearchicon={true}
//               placeholder="Type and click search..."
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "searchVsAutocomplete",
//     listener: mockListener,
//   },
// };

// export const FormExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Create New Article
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Title
//             </Typography>
//             <input
//               type="text"
//               placeholder="Enter article title..."
//               style={{
//                 width: "100%",
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//               }}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Tags
//             </Typography>
//             <ChipsDefaultExport
//               name="formTags"
//               dataset={["JavaScript", "React", "TypeScript", "Node.js", "CSS", "HTML", "API"]}
//               placeholder="Add tags..."
//               type="autocomplete"
//               maxsize={5}
//               listener={mockListener}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Add up to 5 tags
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Categories
//             </Typography>
//             <ChipsDefaultExport
//               name="formCategories"
//               dataset={["Tutorial", "Guide", "News", "Review", "Opinion"]}
//               allowonlyselect={true}
//               placeholder="Select categories..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//             <Typography variant="caption" color="text.secondary">
//               Select from predefined categories
//             </Typography>
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

// export const MultiDatasetExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Simple String Array
//             </Typography>
//             <ChipsDefaultExport
//               name="simpleArray"
//               dataset={simpleDataset}
//               placeholder="Add items..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Object Array with Display Field
//             </Typography>
//             <ChipsDefaultExport
//               name="objectArray"
//               dataset={fruitDataset}
//               datafield="name"
//               displayfield="name"
//               placeholder="Search fruits..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Object Array (Skills)
//             </Typography>
//             <ChipsDefaultExport
//               name="skillsArray"
//               dataset={skillsDataset}
//               datafield="skill"
//               displayfield="skill"
//               placeholder="Search skills..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "multiDataset",
//     listener: mockListener,
//   },
// };

// export const MaxSizeVariations: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Max Size: 3
//             </Typography>
//             <ChipsDefaultExport
//               name="max3"
//               dataset={simpleDataset}
//               maxsize={3}
//               placeholder="Max 3 items..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Max Size: 5
//             </Typography>
//             <ChipsDefaultExport
//               name="max5"
//               dataset={simpleDataset}
//               maxsize={5}
//               placeholder="Max 5 items..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               No Limit
//             </Typography>
//             <ChipsDefaultExport
//               name="noLimit"
//               dataset={simpleDataset}
//               placeholder="Unlimited items..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "maxSizeVariations",
//     listener: mockListener,
//   },
// };


// export const MatchModeContains: Story = {
//   render: Template,
//   args: {
//     name: "matchContains",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     matchmode: "contains",
//     placeholder: "Match anywhere (try 'an')...",
//     type: "autocomplete",
//   },
// };

// export const MatchModeStartsWith: Story = {
//   render: Template,
//   args: {
//     name: "matchStarts",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     matchmode: "start",
//     placeholder: "Match from start...",
//     type: "autocomplete",
//   },
// };

// export const MatchModeEndsWith: Story = {
//   render: Template,
//   args: {
//     name: "matchEnds",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     matchmode: "end",
//     placeholder: "Match at end...",
//     type: "autocomplete",
//   },
// };

// export const MatchModeExact: Story = {
//   render: Template,
//   args: {
//     name: "matchExact",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     matchmode: "exact",
//     placeholder: "Exact match only...",
//     type: "autocomplete",
//   },
// };

// export const CustomWidth: Story = {
//   render: Template,
//   args: {
//     name: "customWidthChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana"],
//     width: "500px",
//     placeholder: "Custom width (500px)...",
//     type: "autocomplete",
//   },
// };

// export const CustomHeight: Story = {
//   render: Template,
//   args: {
//     name: "customHeightChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana", "Cherry"],
//     height: "100px",
//     placeholder: "Custom height...",
//     type: "autocomplete",
//   },
// };

// export const CustomDataCompleteMessage: Story = {
//   render: Template,
//   args: {
//     name: "customMessageChips",
//     listener: mockListener,
//     dataset: fruitDataset,
//     datafield: "name",
//     displayfield: "name",
//     datacompletemsg: "All fruits loaded!",
//     placeholder: "Scroll to see custom message...",
//     type: "autocomplete",
//   },
// };

// export const WithClassName: Story = {
//   render: Template,
//   args: {
//     name: "classNameChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana"],
//     className: "custom-chips-class",
//     placeholder: "With custom className...",
//     type: "autocomplete",
//   },
// };

// export const WithChipClass: Story = {
//   render: Template,
//   args: {
//     name: "chipClassChips",
//     listener: mockListener,
//     dataset: simpleDataset,
//     datavalue: ["Apple", "Banana", "Cherry"],
//     chipclass: "custom-chip-style",
//     placeholder: "With custom chip class...",
//     type: "autocomplete",
//   },
// };

// export const MatchModeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Match Mode Comparison
//         </Typography>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Contains (Default) - Try typing "an"
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Matches: Banana, Mango, Orange
//             </Typography>
//             <ChipsDefaultExport
//               name="compareContains"
//               dataset={fruitDataset}
//               datafield="name"
//               displayfield="name"
//               matchmode="contains"
//               placeholder="Type 'an'..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Starts With - Try typing "Ap"
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Matches: Apple only
//             </Typography>
//             <ChipsDefaultExport
//               name="compareStarts"
//               dataset={fruitDataset}
//               datafield="name"
//               displayfield="name"
//               matchmode="start"
//               placeholder="Type 'Ap'..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Ends With - Try typing "ry"
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Matches: Cherry, Elderberry
//             </Typography>
//             <ChipsDefaultExport
//               name="compareEnds"
//               dataset={fruitDataset}
//               datafield="name"
//               displayfield="name"
//               matchmode="end"
//               placeholder="Type 'ry'..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Exact Match - Try typing "Apple"
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Matches: Only exact "Apple"
//             </Typography>
//             <ChipsDefaultExport
//               name="compareExact"
//               dataset={fruitDataset}
//               datafield="name"
//               displayfield="name"
//               matchmode="exact"
//               placeholder="Type 'Apple'..."
//               type="autocomplete"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "matchModeComparison",
//     listener: mockListener,
//   },
// };

// export const AllFeatures: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           All Features Combined
//         </Typography>
//         <ChipsDefaultExport
//           name="allFeatures"
//           dataset={skillsDataset}
//           datafield="skill"
//           displayfield="skill"
//           groupby="category"
//           orderby="skill:asc"
//           datavalue={[{ id: 1, skill: "JavaScript", category: "Programming" }]}
//           maxsize={8}
//           minchars={2}
//           limit={10}
//           matchmode="contains"
//           type="autocomplete"
//           enablereorder={true}
//           showsearchicon={false}
//           inputposition="last"
//           inputwidth="default"
//           placeholder="Type at least 2 characters..."
//           datacompletemsg="All skills shown"
//           debouncetime={300}
//           width="100%"
//           listener={mockListener}
//         />
//         <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
//           <Typography variant="caption" component="div" mb={1}>
//             <strong>Features enabled:</strong>
//           </Typography>
//           <Typography variant="caption" component="div">
//             • Grouped by category
//           </Typography>
//           <Typography variant="caption" component="div">
//             • Sorted alphabetically
//           </Typography>
//           <Typography variant="caption" component="div">
//             • Max 8 chips
//           </Typography>
//           <Typography variant="caption" component="div">
//             • Min 2 characters to search
//           </Typography>
//           <Typography variant="caption" component="div">
//             • Max 10 suggestions
//           </Typography>
//           <Typography variant="caption" component="div">
//             • Drag to reorder chips
//           </Typography>
//           <Typography variant="caption" component="div">
//             • 300ms debounce delay
//           </Typography>
//         </Box>
//       </Box>
//     );
//   },
//   args: {
//     name: "allFeatures",
//     listener: mockListener,
//   },
// };
