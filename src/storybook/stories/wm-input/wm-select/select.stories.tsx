import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";

import SelectDefaultExport from "../../../../components/input/select/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof SelectDefaultExport> = {
  title: "Input/Select",
  component: SelectDefaultExport,
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
    <SelectDefaultExport {...args} listener={mockListener} />
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
    name:"docsSelect",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Showcase: Story = {
  render: () => {
    const dataset = [
      { id: 1, name: "JavaScript", category: "Frontend" },
      { id: 2, name: "TypeScript", category: "Frontend" },
      { id: 3, name: "React", category: "Frontend" },
      { id: 4, name: "Node.js", category: "Backend" },
      { id: 5, name: "Python", category: "Backend" },
      { id: 6, name: "Java", category: "Backend" },
      { id: 7, name: "SQL", category: "Database" },
      { id: 8, name: "MongoDB", category: "Database" },
    ];

    return (
      <Stack spacing={4}>
        <Box sx={{mb:3}}>
          <Typography variant="h6" fontWeight={600}>
            Select Showcase
          </Typography>
        </Box>

        {/* Single Select with OrderBy */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Single Select (Ordered by Name A-Z)
          </Typography>
          <SelectDefaultExport
            name="singleOrderBy"
            placeholder="Select a technology"
            dataset={dataset}
            datafield="id"
            displayfield="name"
            orderby="name:asc"
            listener={mockListener}
          />
        </Box>

        {/* Grouped Select */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Grouped Select by Category
          </Typography>
          <SelectDefaultExport
            name="groupedSelect"
            placeholder="Select a technology"
            dataset={dataset}
            datafield="id"
            displayfield="name"
            groupby="category"
            listener={mockListener}
          />
        </Box>

        {/* Multiple Selection */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Multi-Select
          </Typography>
          <SelectDefaultExport
            name="multiSelect"
            placeholder="Select multiple options with shift + click item"
            dataset={dataset}
            datafield="id"
            displayfield="name"
            multiple={true}
            listener={mockListener}
          />
        </Box>
      </Stack>
    );
  },
  args:{
    name:"showcaseSelect",
    listener:mockListener
  },
  argTypes:{
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  }
};

// Basic Examples
export const Standard: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "standardSelect",
    placeholder: "Select an option",
    dataset: "Option 1, Option 2, Option 3, Option 4",
    listener: mockListener,
    disabled: false,
    readonly: false,
  },
  argTypes: {
    autofocus: { control: "boolean" },
    datafield: { control: "text" },
    dataset: { control: "object" },
    datavalue: { control: "text" },
    displayExpression: { control: "text" },
    displayfield: { control: "text" },
    groupby: { control: "text" },
    multiple: { control: "boolean" },
    orderby: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};

export const ObjectDataset: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "objectDatasetSelect",
    placeholder: "Select a user",
    dataset: [
      { id: 1, name: "John Doe", role: "Admin" },
      { id: 2, name: "Jane Smith", role: "User" },
      { id: 3, name: "Bob Johnson", role: "Manager" },
      { id: 4, name: "Alice Brown", role: "User" },
    ],
    datafield: "id",
    displayfield: "name",
    listener: mockListener,
  },
  argTypes: {
    autofocus: { control: "boolean" },
    datafield: { control: "text" },
    dataset: { control: "object" },
    datavalue: { control: "text" },
    displayExpression: { control: "text" },
    displayfield: { control: "text" },
    groupby: { control: "text" },
    multiple: { control: "boolean" },
    orderby: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};


// Multiple Selection
// export const MultipleSelection: Story = {
//   render: Template,
//   args: {
//     name: "multipleSelect",
//     placeholder: "Select multiple options with shift + click item",
//     dataset: "JavaScript, Python, Java, C++, Ruby, Go, Rust",
//     multiple: true,
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//   },
// };

// // Grouped Data
// export const GroupedData: Story = {
//   render: Template,
//   args: {
//     name: "groupedSelect",
//     placeholder: "Select a programming language",
//     dataset: [
//       { name: "JavaScript", category: "Frontend" },
//       { name: "TypeScript", category: "Frontend" },
//       { name: "React", category: "Frontend" },
//       { name: "Node.js", category: "Backend" },
//       { name: "Python", category: "Backend" },
//       { name: "Java", category: "Backend" },
//       { name: "SQL", category: "Database" },
//       { name: "MongoDB", category: "Database" },
//     ],
//     datafield: "name",
//     displayfield: "name",
//     groupby: "category",
//     listener: mockListener,
//   },
// };

// // Sorted Data
// export const WithOrderBy: Story = {
//   render: Template,
//   args: {
//     name: "withOrderBySelect",
//     placeholder: "Select a city (A-Z)",
//     dataset: [
//       { id: 1, city: "New York" },
//       { id: 2, city: "Los Angeles" },
//       { id: 3, city: "Chicago" },
//       { id: 4, city: "Houston" },
//       { id: 5, city: "Phoenix" },
//       { id: 6, city: "Philadelphia" },
//     ],
//     datafield: "id",
//     displayfield: "city",
//     orderby: "city:asc",
//     listener: mockListener,
//   },
// };

// export const WithValue: Story = {
//   render: Template,
//   args: {
//     name: "withValueSelect",
//     placeholder: "Select a country",
//     dataset: "USA, Canada, Mexico, Brazil, Argentina",
//     datavalue: "Canada",
//     listener: mockListener,
//     disabled: false,
//     readonly: false,
//   },
// };


// export const MultipleWithValue: Story = {
//   render: Template,
//   args: {
//     name: "multipleWithValueSelect",
//     placeholder: "Select skills",
//     dataset: "HTML, CSS, JavaScript, React, Node.js, MongoDB, SQL",
//     multiple: true,
//     datavalue: ["JavaScript", "React", "Node.js"],
//     listener: mockListener,
//   },
// };

// export const ObjectDatasetWithValue: Story = {
//   render: Template,
//   args: {
//     name: "objectWithValueSelect",
//     placeholder: "Select a product",
//     dataset: [
//       { id: "p1", name: "Laptop", price: 999 },
//       { id: "p2", name: "Mouse", price: 29 },
//       { id: "p3", name: "Keyboard", price: 79 },
//       { id: "p4", name: "Monitor", price: 299 },
//     ],
//     datafield: "id",
//     displayfield: "name",
//     datavalue: "p1",
//     listener: mockListener,
//   },
// };


// export const GroupedMultiple: Story = {
//   render: Template,
//   args: {
//     name: "groupedMultipleSelect",
//     placeholder: "Select technologies",
//     dataset: [
//       { tech: "HTML", type: "Markup" },
//       { tech: "CSS", type: "Styling" },
//       { tech: "SASS", type: "Styling" },
//       { tech: "JavaScript", type: "Programming" },
//       { tech: "TypeScript", type: "Programming" },
//       { tech: "Python", type: "Programming" },
//     ],
//     datafield: "tech",
//     displayfield: "tech",
//     groupby: "type",
//     multiple: true,
//     listener: mockListener,
//   },
// };

// export const SortedDescending: Story = {
//   render: Template,
//   args: {
//     name: "sortedDescSelect",
//     placeholder: "Select a city (Z-A)",
//     dataset: [
//       { id: 1, city: "New York" },
//       { id: 2, city: "Los Angeles" },
//       { id: 3, city: "Chicago" },
//       { id: 4, city: "Houston" },
//       { id: 5, city: "Phoenix" },
//       { id: 6, city: "Philadelphia" },
//     ],
//     datafield: "id",
//     displayfield: "city",
//     orderby: "city:desc",
//     listener: mockListener,
//   },
// };

// // State Variations
// export const Disabled: Story = {
//   render: Template,
//   args: {
//     name: "disabledSelect",
//     placeholder: "Disabled select",
//     dataset: "Option 1, Option 2, Option 3",
//     datavalue: "Option 2",
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const Readonly: Story = {
//   render: Template,
//   args: {
//     name: "readonlySelect",
//     placeholder: "Readonly select",
//     dataset: "Option 1, Option 2, Option 3",
//     datavalue: "Option 2",
//     readonly: true,
//     listener: mockListener,
//   },
// };

// export const Required: Story = {
//   render: Template,
//   args: {
//     name: "requiredSelect",
//     placeholder: "Required field *",
//     dataset: "Option 1, Option 2, Option 3",
//     required: true,
//     listener: mockListener,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintSelect",
//     placeholder: "Hover for hint",
//     dataset: "Small, Medium, Large, Extra Large",
//     hint: "Select your preferred size",
//     listener: mockListener,
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaLabelSelect",
//     placeholder: "Select language",
//     dataset: "English, Spanish, French, German, Italian",
//     arialabel: "Language selection dropdown",
//     listener: mockListener,
//   },
// };

// export const Autofocus: Story = {
//   render: Template,
//   args: {
//     name: "autofocusSelect",
//     placeholder: "This select is auto-focused",
//     dataset: "Option 1, Option 2, Option 3, Option 4",
//     autofocus: true,
//     listener: mockListener,
//   },
// };

// // State Comparison
// export const StateComparison: Story = {
//   render: () => (
//     <Stack spacing={2} padding={2}>
//       <Box>
//         <Typography variant="caption" color="text.secondary">
//           Normal
//         </Typography>
//         <SelectDefaultExport
//           name="normalSelect"
//           placeholder="Select an option"
//           dataset="Option 1, Option 2, Option 3"
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary">
//           With Value
//         </Typography>
//         <SelectDefaultExport
//           name="valueSelect"
//           placeholder="Select an option"
//           dataset="Option 1, Option 2, Option 3"
//           datavalue="Option 2"
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary">
//           Disabled
//         </Typography>
//         <SelectDefaultExport
//           name="disabledStateSelect"
//           placeholder="Select an option"
//           dataset="Option 1, Option 2, Option 3"
//           datavalue="Option 2"
//           disabled={true}
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary">
//           Readonly
//         </Typography>
//         <SelectDefaultExport
//           name="readonlyStateSelect"
//           placeholder="Select an option"
//           dataset="Option 1, Option 2, Option 3"
//           datavalue="Option 2"
//           readonly={true}
//           listener={mockListener}
//         />
//       </Box>
//       <Box>
//         <Typography variant="caption" color="text.secondary">
//           Required
//         </Typography>
//         <SelectDefaultExport
//           name="requiredStateSelect"
//           placeholder="Required field *"
//           dataset="Option 1, Option 2, Option 3"
//           required={true}
//           listener={mockListener}
//         />
//       </Box>
//     </Stack>
//   ),
// };

// // Interactive Examples
// export const InteractiveSelect: Story = {
//   render: () => {
//     const [selectedValue, setSelectedValue] = useState("");

//     const customListener = {
//       appLocale: {
//         LABEL_ICON: "Icon",
//       },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setSelectedValue(data.displayValue);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Interactive Select
//         </Typography>
//         <SelectDefaultExport
//           name="interactiveSelect"
//           placeholder="Choose a framework"
//           dataset="React, Angular, Vue, Svelte, Solid"
//           listener={customListener}
//         />
//         <Typography mt={2} color="text.secondary">
//           Selected: <strong>{selectedValue || "None"}</strong>
//         </Typography>
//       </Box>
//     );
//   },
// };

// export const InteractiveMultipleSelect: Story = {
//   render: () => {
//     const [selectedValues, setSelectedValues] = useState<string[]>([]);

//     const customListener = {
//       appLocale: {
//         LABEL_ICON: "Icon",
//       },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setSelectedValues(data.displayValue || []);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Interactive Multiple Select
//         </Typography>
//         <SelectDefaultExport
//           name="interactiveMultipleSelect"
//           placeholder="Select your interests"
//           dataset="Sports, Music, Movies, Gaming, Reading, Travel, Cooking, Photography"
//           multiple={true}
//           listener={customListener}
//         />
//         <Typography mt={2} color="text.secondary">
//           Selected Count: <strong>{selectedValues.length}</strong>
//         </Typography>
//         {selectedValues.length > 0 && (
//           <Box mt={1}>
//             <Typography variant="body2" color="text.secondary">
//               Selections:
//             </Typography>
//             <ul style={{ marginTop: 4 }}>
//               {selectedValues.map((value, index) => (
//                 <li key={index}>
//                   <Typography variant="body2">{value}</Typography>
//                 </li>
//               ))}
//             </ul>
//           </Box>
//         )}
//       </Box>
//     );
//   },
// };

// export const DynamicDataset: Story = {
//   render: () => {
//     const [category, setCategory] = useState("fruits");
//     const [selectedValue, setSelectedValue] = useState("");

//     const datasets: Record<string, any> = {
//       fruits: "Apple, Banana, Orange, Mango, Grape",
//       vegetables: "Carrot, Broccoli, Spinach, Tomato, Cucumber",
//       drinks: "Water, Juice, Soda, Coffee, Tea",
//     };

//     const customListener = {
//       appLocale: {
//         LABEL_ICON: "Icon",
//       },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setSelectedValue(data.displayValue);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={2}>
//           Dynamic Dataset
//         </Typography>
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Select Category
//             </Typography>
//             <Stack direction="row" spacing={1} mb={2}>
//               <Button
//                 variant={category === "fruits" ? "contained" : "outlined"}
//                 size="small"
//                 onClick={() => {
//                   setCategory("fruits");
//                   setSelectedValue("");
//                 }}
//               >
//                 Fruits
//               </Button>
//               <Button
//                 variant={category === "vegetables" ? "contained" : "outlined"}
//                 size="small"
//                 onClick={() => {
//                   setCategory("vegetables");
//                   setSelectedValue("");
//                 }}
//               >
//                 Vegetables
//               </Button>
//               <Button
//                 variant={category === "drinks" ? "contained" : "outlined"}
//                 size="small"
//                 onClick={() => {
//                   setCategory("drinks");
//                   setSelectedValue("");
//                 }}
//               >
//                 Drinks
//               </Button>
//             </Stack>
//           </Box>
//           <SelectDefaultExport
//             name="dynamicSelect"
//             placeholder={`Select a ${category.slice(0, -1)}`}
//             dataset={datasets[category]}
//             listener={customListener}
//             key={category}
//           />
//           <Typography color="text.secondary">
//             Selected: <strong>{selectedValue || "None"}</strong>
//           </Typography>
//         </Stack>
//       </Box>
//     );
//   },
// };

// // Real-world Examples
// export const CountrySelector: Story = {
//   render: () => {
//     const [selectedCountry, setSelectedCountry] = useState("");

//     const customListener = {
//       appLocale: {
//         LABEL_ICON: "Icon",
//       },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setSelectedCountry(data.displayValue);
//       },
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 400 }}>
//         <Typography variant="h6" mb={2}>
//           Country Selector
//         </Typography>
//         <SelectDefaultExport
//           name="countrySelect"
//           placeholder="Select your country"
//           dataset={[
//             { code: "us", name: "United States", continent: "North America" },
//             { code: "ca", name: "Canada", continent: "North America" },
//             { code: "mx", name: "Mexico", continent: "North America" },
//             { code: "br", name: "Brazil", continent: "South America" },
//             { code: "ar", name: "Argentina", continent: "South America" },
//             { code: "uk", name: "United Kingdom", continent: "Europe" },
//             { code: "de", name: "Germany", continent: "Europe" },
//             { code: "fr", name: "France", continent: "Europe" },
//             { code: "jp", name: "Japan", continent: "Asia" },
//             { code: "cn", name: "China", continent: "Asia" },
//             { code: "in", name: "India", continent: "Asia" },
//           ]}
//           datafield="code"
//           displayfield="name"
//           groupby="continent"
//           listener={customListener}
//         />
//         {selectedCountry && (
//           <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="body2">
//               You selected: <strong>{selectedCountry}</strong>
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     );
//   },
// };

// export const ProductFilter: Story = {
//   render: () => {
//     const [category, setCategory] = useState("");
//     const [brand, setBrand] = useState("");
//     const [priceRange, setPriceRange] = useState("");

//     const categoryListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => setCategory(data.displayValue),
//     };

//     const brandListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => setBrand(data.displayValue),
//     };

//     const priceListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => setPriceRange(data.displayValue),
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 500 }}>
//         <Typography variant="h6" mb={2}>
//           Product Filter
//         </Typography>
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Category
//             </Typography>
//             <SelectDefaultExport
//               name="categoryFilter"
//               placeholder="All Categories"
//               dataset="Electronics, Clothing, Books, Home & Garden, Sports"
//               listener={categoryListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Brand
//             </Typography>
//             <SelectDefaultExport
//               name="brandFilter"
//               placeholder="All Brands"
//               dataset="Apple, Samsung, Sony, Nike, Adidas, Amazon, Dell, HP"
//               listener={brandListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Price Range
//             </Typography>
//             <SelectDefaultExport
//               name="priceFilter"
//               placeholder="Any Price"
//               dataset="Under $50, $50 - $100, $100 - $200, $200 - $500, Over $500"
//               listener={priceListener}
//             />
//           </Box>
//           <Box mt={2} p={2} bgcolor="#e3f2fd" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Active Filters:
//             </Typography>
//             <Typography variant="body2">
//               Category: {category || "All"}
//             </Typography>
//             <Typography variant="body2">Brand: {brand || "All"}</Typography>
//             <Typography variant="body2">
//               Price: {priceRange || "Any"}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const UserRegistrationForm: Story = {
//   render: () => {
//     const [formData, setFormData] = useState({
//       country: "",
//       gender: "",
//       interests: [] as string[],
//     });

//     const countryListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) =>
//         setFormData(prev => ({ ...prev, country: data.displayValue })),
//     };

//     const genderListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) =>
//         setFormData(prev => ({ ...prev, gender: data.displayValue })),
//     };

//     const interestsListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) =>
//         setFormData(prev => ({ ...prev, interests: data.displayValue || [] })),
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 500 }}>
//         <Typography variant="h6" mb={3}>
//           User Registration
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Country *
//             </Typography>
//             <SelectDefaultExport
//               name="countryReg"
//               placeholder="Select your country"
//               dataset="United States, Canada, United Kingdom, Germany, France, Japan, Australia"
//               required={true}
//               listener={countryListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Gender
//             </Typography>
//             <SelectDefaultExport
//               name="genderReg"
//               placeholder="Select your gender"
//               dataset="Male, Female, Non-binary, Prefer not to say"
//               listener={genderListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Interests (Multiple)
//             </Typography>
//             <SelectDefaultExport
//               name="interestsReg"
//               placeholder="Select your interests"
//               dataset="Technology, Sports, Music, Art, Travel, Food, Gaming, Reading"
//               multiple={true}
//               listener={interestsListener}
//             />
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2" mb={1}>
//               Form Data:
//             </Typography>
//             <Typography variant="body2">
//               Country: {formData.country || "Not selected"}
//             </Typography>
//             <Typography variant="body2">
//               Gender: {formData.gender || "Not selected"}
//             </Typography>
//             <Typography variant="body2">
//               Interests: {formData.interests.length > 0 ? formData.interests.join(", ") : "None"}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const DependentDropdowns: Story = {
//   render: () => {
//     const [country, setCountry] = useState("");
//     const [state, setState] = useState("");
//     const [city, setCity] = useState("");

//     const statesData: Record<string, string> = {
//       USA: "California, Texas, New York, Florida, Illinois",
//       Canada: "Ontario, Quebec, British Columbia, Alberta, Manitoba",
//       India: "Maharashtra, Karnataka, Delhi, Tamil Nadu, Gujarat",
//     };

//     const citiesData: Record<string, string> = {
//       California: "Los Angeles, San Francisco, San Diego, Sacramento",
//       Texas: "Houston, Dallas, Austin, San Antonio",
//       "New York": "New York City, Buffalo, Rochester, Albany",
//       Ontario: "Toronto, Ottawa, Mississauga, Hamilton",
//       Quebec: "Montreal, Quebec City, Laval, Gatineau",
//       Maharashtra: "Mumbai, Pune, Nagpur, Nashik",
//       Karnataka: "Bangalore, Mysore, Mangalore, Hubli",
//     };

//     const countryListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setCountry(data.displayValue);
//         setState("");
//         setCity("");
//       },
//     };

//     const stateListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setState(data.displayValue);
//         setCity("");
//       },
//     };

//     const cityListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setCity(data.displayValue);
//       },
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 400 }}>
//         <Typography variant="h6" mb={3}>
//           Dependent Dropdowns
//         </Typography>
//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               Country
//             </Typography>
//             <SelectDefaultExport
//               name="countryDependent"
//               placeholder="Select country"
//               dataset="USA, Canada, India"
//               listener={countryListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               State/Province
//             </Typography>
//             <SelectDefaultExport
//               name="stateDependent"
//               placeholder="Select state"
//               dataset={country ? statesData[country] : ""}
//               disabled={!country}
//               listener={stateListener}
//               key={`state-${country}`}
//             />
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary" mb={1}>
//               City
//             </Typography>
//             <SelectDefaultExport
//               name="cityDependent"
//               placeholder="Select city"
//               dataset={state ? citiesData[state] : ""}
//               disabled={!state}
//               listener={cityListener}
//               key={`city-${state}`}
//             />
//           </Box>
//           {city && (
//             <Box mt={2} p={2} bgcolor="#e8f5e9" borderRadius={1}>
//               <Typography variant="body2">
//                 <strong>Location:</strong> {city}, {state}, {country}
//               </Typography>
//             </Box>
//           )}
//         </Stack>
//       </Box>
//     );
//   },
// };

// export const LanguageSwitcher: Story = {
//   render: () => {
//     const [language, setLanguage] = useState("en");

//     const translations: Record<string, any> = {
//       en: { title: "Language Switcher", label: "Select Language", greeting: "Hello, World!" },
//       es: { title: "Cambiador de Idioma", label: "Seleccionar Idioma", greeting: "¡Hola, Mundo!" },
//       fr: { title: "Changeur de Langue", label: "Sélectionner la Langue", greeting: "Bonjour, le Monde!" },
//       de: { title: "Sprachwechsler", label: "Sprache Auswählen", greeting: "Hallo, Welt!" },
//     };

//     const customListener = {
//       appLocale: { LABEL_ICON: "Icon" },
//       Widgets: {},
//       onChange: (name: string, data: any) => {
//         setLanguage(data.datavalue);
//       },
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 400 }}>
//         <Typography variant="h6" mb={2}>
//           {translations[language].title}
//         </Typography>
//         <Typography variant="caption" color="text.secondary" mb={1}>
//           {translations[language].label}
//         </Typography>
//         <SelectDefaultExport
//           name="languageSwitcher"
//           placeholder="Choose language"
//           dataset={[
//             { code: "en", name: "English" },
//             { code: "es", name: "Español" },
//             { code: "fr", name: "Français" },
//             { code: "de", name: "Deutsch" },
//           ]}
//           datafield="code"
//           displayfield="name"
//           datavalue={language}
//           listener={customListener}
//         />
//         <Box mt={3} p={2} bgcolor="#f5f5f5" borderRadius={1}>
//           <Typography variant="h6">{translations[language].greeting}</Typography>
//         </Box>
//       </Box>
//     );
//   },
// };
