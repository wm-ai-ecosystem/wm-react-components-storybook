import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import SearchDefaultExport from "../../../../components/basic/search/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import searchTokensData from "../../../../designTokens/components/search/search.json";

const meta: Meta<typeof SearchDefaultExport> = {
  title: "Basic/Search",
  component: SearchDefaultExport,
  // argTypes: {
  //   type: {
  //     control: { type: "select" },
  //     options: ["search", "autocomplete"],
  //   },
  //   searchon: {
  //     control: { type: "select" },
  //     options: ["typing", "onsearchiconclick"],
  //   },
  //   matchmode: {
  //     control: { type: "select" },
  //     options: ["contains", "start", "end", "exact"],
  //   },
  //   searchkey:{
  //    control:{ type:"text" },
  //    table:{ disable:false, }
  //   },
  //   placeholder: { control: "text" },
  //   showclear: { control: "boolean" },
  //   showsearchicon: { control: "boolean" },
  //   showbackbutton: { control: "boolean" },
  //   // dropup: { control: "boolean" },
  //   readonly: { control: "boolean" },
  //   disabled: { control: "boolean" },
  //   autofocus: { control: "boolean" },
  //   // debouncetime: { control: "number" },
  //   // minchars: { control: "number" },
  //   // limit: { control: "number" },
  //   // tabindex: { control: "number" },
  //   datafield: { control: "text" },
  //   displayfield: { control: "text" },
  //   // hint: { control: "text" },
  //   // arialabel: { control: "text" },
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

// Sample dataset for search
const sampleDataset = [
  { id: 1, name: "Apple", category: "Fruit", color: "Red" },
  { id: 2, name: "Banana", category: "Fruit", color: "Yellow" },
  { id: 3, name: "Carrot", category: "Vegetable", color: "Orange" },
  { id: 4, name: "Date", category: "Fruit", color: "Brown" },
  { id: 5, name: "Eggplant", category: "Vegetable", color: "Purple" },
  { id: 6, name: "Fig", category: "Fruit", color: "Purple" },
  { id: 7, name: "Grape", category: "Fruit", color: "Green" },
  { id: 8, name: "Honeydew", category: "Fruit", color: "Green" },
  { id: 9, name: "Iceberg Lettuce", category: "Vegetable", color: "Green" },
  { id: 10, name: "Jackfruit", category: "Fruit", color: "Green" },
];

// const countriesDataset = [
//   { id: 1, name: "United States", code: "US", continent: "North America" },
//   { id: 2, name: "United Kingdom", code: "UK", continent: "Europe" },
//   { id: 3, name: "Canada", code: "CA", continent: "North America" },
//   { id: 4, name: "Australia", code: "AU", continent: "Oceania" },
//   { id: 5, name: "Germany", code: "DE", continent: "Europe" },
//   { id: 6, name: "France", code: "FR", continent: "Europe" },
//   { id: 7, name: "Japan", code: "JP", continent: "Asia" },
//   { id: 8, name: "India", code: "IN", continent: "Asia" },
//   { id: 9, name: "Brazil", code: "BR", continent: "South America" },
//   { id: 10, name: "Mexico", code: "MX", continent: "North America" },
// ];

const Template = (args: any) => (
  <Box style={{ padding: 16, minHeight: "300px" }}>
    <SearchDefaultExport {...args} listener={mockListener} />
  </Box>
);

export const Docs: Story = {
  render: () => (
    <ComponentDocumentation
      overview={overview}
      properties={props}
      events={events}
      methods={methods}
      // styling={styling}
      token={token}
    />
  ),
  args:{
    name:"docsSearch",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          {/* Heading */}
          <Typography variant="h6" fontWeight={600}>
            Search Showcase
          </Typography>

          {/* Search examples */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Search Type (Click Icon)
            </Typography>
            <SearchDefaultExport
              name="searchIcon"
              type="search"
              placeholder="Click search icon to search..."
              dataset={sampleDataset}
              datafield="name"
              displayfield="name"
              searchon="onsearchiconclick"
              showclear={false}
              showsearchicon={true}
              listener={mockListener}
            />
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Search Type (On Typing)
            </Typography>
            <SearchDefaultExport
              name="searchTyping"
              type="search"
              placeholder="Search as you type..."
              dataset={sampleDataset}
              datafield="name"
              displayfield="name"
              searchon="typing"
              showclear={false}
              showsearchicon={true}
              listener={mockListener}
            />
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Autocomplete Type
            </Typography>
            <SearchDefaultExport
              name="autocompleteType"
              type="autocomplete"
              placeholder="Type to autocomplete..."
              dataset={sampleDataset}
              datafield="name"
              displayfield="name"
              showclear={true}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseSearchTypes",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicSearch",
    listener: mockListener,
    type: "autocomplete",
    placeholder: "Search...",
    dataset: sampleDataset,
    datafield: "name",
    displayfield: "name",
    searchon: "onsearchiconclick",
    searchkey: "name",
    showclear: true,
    showsearchicon: true,
    showbackbutton:false,
    disabled: false,
    readonly: false,
    autofocus: false,
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["search", "autocomplete"],
    },
    searchon: {
      control: { type: "select" },
      options: ["typing", "onsearchiconclick"],
    },
    matchmode: {
      control: { type: "select" },
      options: ["contains", "start", "end", "exact"],
    },
    searchkey:{
     control:{ type:"text" },
     table:{ disable:false, }
    },
    placeholder: { control: "text" },
    showclear: { control: "boolean" },
    showsearchicon: { control: "boolean" },
    showbackbutton: { control: "boolean" },
    // dropup: { control: "boolean" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    autofocus: { control: "boolean" },
    // debouncetime: { control: "number" },
    // minchars: { control: "number" },
    // limit: { control: "number" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardSearch",
    listener: mockListener,
    type: "autocomplete",
    placeholder: "Search...",
    dataset: sampleDataset,
    datafield: "name",
    displayfield: "name",
    searchon: "onsearchiconclick",
    searchkey: "name",
    showclear: true,
    showsearchicon: true,
    showbackbutton:false,
    disabled: false,
    readonly: false,
    autofocus: false,
    "data-design-token-target":"true",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["search", "autocomplete"],
    },
    searchon: {
      control: { type: "select" },
      options: ["typing", "onsearchiconclick"],
    },
    matchmode: {
      control: { type: "select" },
      options: ["contains", "start", "end", "exact"],
    },
    searchkey:{
     control:{ type:"text" },
     table:{ disable:false, }
    },
    placeholder: { control: "text" },
    showclear: { control: "boolean" },
    showsearchicon: { control: "boolean" },
    showbackbutton: { control: "boolean" },
    // dropup: { control: "boolean" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    autofocus: { control: "boolean" },
    // debouncetime: { control: "number" },
    // minchars: { control: "number" },
    // limit: { control: "number" },
    datafield: { control: "text" },
    displayfield: { control: "text" },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: searchTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "search",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};

// export const SearchDefault: Story = {
//   render: Template,
//   args: {
//     name: "search1",
//     listener: mockListener,
//     type: "search",
//     placeholder: "Search...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     searchon: "onsearchiconclick",
//     showclear: true,
//     showsearchicon: true,
//   },
// };

// export const SearchOnTyping: Story = {
//   render: Template,
//   args: {
//     name: "searchTyping",
//     listener: mockListener,
//     type: "search",
//     placeholder: "Search as you type...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     searchon: "typing",
//     showclear: true,
//     showsearchicon: true,
//     debouncetime: 300,
//   },
// };

// export const AutocompleteDefault: Story = {
//   render: Template,
//   args: {
//     name: "autocomplete1",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Type to autocomplete...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     minchars: 1,
//   },
// };

// export const AutocompleteCountries: Story = {
//   render: Template,
//   args: {
//     name: "autocompleteCountries",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Search countries...",
//     dataset: countriesDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     minchars: 2,
//   },
// };

// export const WithClearButton: Story = {
//   render: Template,
//   args: {
//     name: "withClear",
//     listener: mockListener,
//     type: "search",
//     placeholder: "Search with clear button...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     showsearchicon: true,
//   },
// };

// export const WithoutSearchIcon: Story = {
//   render: Template,
//   args: {
//     name: "noSearchIcon",
//     listener: mockListener,
//     type: "search",
//     placeholder: "Search without icon...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     showsearchicon: false,
//     searchon: "typing",
//   },
// };

// export const WithBackButton: Story = {
//   render: Template,
//   args: {
//     name: "withBackButton",
//     listener: mockListener,
//     type: "search",
//     placeholder: "Search with back button...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     showsearchicon: true,
//     showbackbutton: true,
//   },
// };

// export const MinimumCharacters: Story = {
//   render: Template,
//   args: {
//     name: "minChars",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Type at least 3 characters...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     minchars: 3,
//   },
// };

// export const LimitedResults: Story = {
//   render: Template,
//   args: {
//     name: "limitedResults",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Limited to 5 results...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     limit: 5,
//   },
// };

// export const MatchModeStartsWith: Story = {
//   render: Template,
//   args: {
//     name: "matchStart",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Search starts with...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     matchmode: "start",
//   },
// };

// export const MatchModeEndsWith: Story = {
//   render: Template,
//   args: {
//     name: "matchEnd",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Search ends with...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     matchmode: "end",
//   },
// };

// export const MatchModeExact: Story = {
//   render: Template,
//   args: {
//     name: "matchExact",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Exact match only...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     matchmode: "exact",
//   },
// };

// export const DropupVariant: Story = {
//   render: (args: any) => (
//     <Box style={{ padding: 16, paddingTop: "400px", minHeight: "500px" }}>
//       <SearchDefaultExport {...args} listener={mockListener} />
//     </Box>
//   ),
//   args: {
//     name: "dropup",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Dropdown opens upward...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     dropup: true,
//   },
// };

// export const ReadonlySearch: Story = {
//   render: Template,
//   args: {
//     name: "readonly",
//     listener: mockListener,
//     type: "search",
//     placeholder: "Readonly search...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     readonly: true,
//     datavalue: "Apple",
//   },
// };

// export const DisabledSearch: Story = {
//   render: Template,
//   args: {
//     name: "disabled",
//     listener: mockListener,
//     type: "search",
//     placeholder: "Disabled search...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     disabled: true,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "withHint",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Hover for hint...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     hint: "Start typing to see suggestions",
//     arialabel: "Search for items",
//   },
// };

// export const CustomWidth: Story = {
//   render: Template,
//   args: {
//     name: "customWidth",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Custom width search...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     width: "400px",
//   },
// };

// export const GroupedSearch: Story = {
//   render: Template,
//   args: {
//     name: "grouped",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Search grouped items...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     groupby: "category",
//     showclear: true,
//   },
// };

// export const MatchModeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={4}>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Contains (Default) - Try "app"
//             </Typography>
//             <SearchDefaultExport
//               name="contains"
//               type="autocomplete"
//               placeholder="Search contains..."
//               dataset={sampleDataset}
//               datafield="name"
//               displayfield="name"
//               matchmode="contains"
//               showclear={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Starts With - Try "app"
//             </Typography>
//             <SearchDefaultExport
//               name="starts"
//               type="autocomplete"
//               placeholder="Search starts with..."
//               dataset={sampleDataset}
//               datafield="name"
//               displayfield="name"
//               matchmode="start"
//               showclear={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Ends With - Try "ple"
//             </Typography>
//             <SearchDefaultExport
//               name="ends"
//               type="autocomplete"
//               placeholder="Search ends with..."
//               dataset={sampleDataset}
//               datafield="name"
//               displayfield="name"
//               matchmode="end"
//               showclear={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={2}>
//               Exact Match - Try "Apple"
//             </Typography>
//             <SearchDefaultExport
//               name="exact"
//               type="autocomplete"
//               placeholder="Exact match only..."
//               dataset={sampleDataset}
//               datafield="name"
//               displayfield="name"
//               matchmode="exact"
//               showclear={true}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "matchComparison",
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [selectedItem, setSelectedItem] = useState<any>(null);

//     const customListener = {
//       ...mockListener,
//       onChange: (name: string, data: any) => {
//         setSelectedItem(data.datavalue);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Search Demo</Typography>
//           <SearchDefaultExport
//             name="interactive"
//             type="autocomplete"
//             placeholder="Search and select an item..."
//             dataset={sampleDataset}
//             datafield="name"
//             displayfield="name"
//             showclear={true}
//             listener={customListener}
//           />
//           {selectedItem && (
//             <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//               <Typography variant="subtitle2">Selected Item:</Typography>
//               <Typography variant="body2">
//                 <strong>Name:</strong> {selectedItem.name}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Category:</strong> {selectedItem.category}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Color:</strong> {selectedItem.color}
//               </Typography>
//             </Box>
//           )}
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "interactiveDemo",
//     listener: mockListener,
//   },
// };

// export const CustomStyling: Story = {
//   render: Template,
//   args: {
//     name: "customStyles",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Custom styled search...",
//     dataset: sampleDataset,
//     datafield: "name",
//     displayfield: "name",
//     showclear: true,
//     styles: {
//       border: "2px solid #2196f3",
//       borderRadius: "8px",
//       padding: "4px",
//     },
//   },
// };

// export const SimpleStringDataset: Story = {
//   render: Template,
//   args: {
//     name: "simpleStrings",
//     listener: mockListener,
//     type: "autocomplete",
//     placeholder: "Search simple strings...",
//     dataset: ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"],
//     datafield: "All Fields",
//     showclear: true,
//   },
// };
