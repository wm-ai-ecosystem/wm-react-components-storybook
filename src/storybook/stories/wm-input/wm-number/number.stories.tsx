import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import NumberDefaultExport from "../../../../components/input/number/index";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

const meta: Meta<typeof NumberDefaultExport> = {
  title: "Input/Number",
  component: NumberDefaultExport,
  argTypes: {
    placeholder: { control: "text" },
    // hint: { control: "text" },
    // arialabel: { control: "text" },
    // tabindex: { control: "number" },
    // shortcutkey: { control: "text" },
    datavalue: { control: "number" },
    step: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    decimalplaces: { control: "number" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    autofocus: { control: "boolean" },
    trailingzero: { control: "boolean" },
    regexp: { control: "text" },
    inputmode: {
      control: { type: "select" },
      options: ["natural", "financial"],
    },
    // updateon: {
    //   control: { type: "select" },
    //   options: ["blur", "keypress"],
    // },
    // updatedelay: { control: "text" },
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
    <NumberDefaultExport {...args} listener={mockListener} />
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
    name: "basicNumber",
    placeholder: "Enter number",
    listener: mockListener,
    disabled: false,
    readonly: false,
    inputmode: "natural",
  },
};

export const Showcase: Story = {
  render: () => {
    return (
      <Box style={{ padding: 16 }}>
        <Box sx={{mb: 3}}>
          <Typography variant="h6" fontWeight={600} mb={3}>
            Number Showcase
          </Typography>
        </Box>
        <Stack spacing={4}>
          {/* RegExp Validation */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              RegExp Validation (3-digit numbers only)
            </Typography>
            <NumberDefaultExport
              name="regexpExample"
              placeholder="Enter 3-digit number"
              regexp="[0-9]{3}"
              listener={mockListener}
            />
          </Box>

          {/* Min-Max Value */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Min-Max Values (0-100)
            </Typography>
            <NumberDefaultExport
              name="minMax"
              placeholder="Enter number (0-100)"
              minvalue={0}
              maxvalue={100}
              listener={mockListener}
              inputmode="natural"
            />
          </Box>

          {/* Decimal Values */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Decimal Values (2 decimal places)
            </Typography>
            <NumberDefaultExport
              name="decimalExample"
              placeholder="Enter decimal number"
              decimalplaces={2}
              datavalue={12.34}
              listener={mockListener}
            />
          </Box>

          {/* Step Values */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Step Values (Step: 5)
            </Typography>
            <NumberDefaultExport
              name="stepExample"
              placeholder="Increment by 5"
              step={5}
              listener={mockListener}
            />
          </Box>

          {/* Financial Input Mode */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Financial Input Mode (Positive/Negative)
            </Typography>
            <NumberDefaultExport
              name="financialExample"
              placeholder="Enter amount"
              inputmode="financial"
              decimalplaces={2}
              trailingzero={true}
              listener={mockListener}
            />
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseNumber"
  },
};

// export const WithRegexp: Story = {
//   render: Template,
//   args: {
//     name: "withRegexp",
//     placeholder: "Even 3 digit number",
//     regexp: "[0-9]{3}",
//     listener: mockListener,
//   },
// };

// export const WithMinMaxValue: Story = {
//   render: Template,
//   args: {
//     name: "minMaxValue",
//     placeholder: "Enter Number",
//     minvalue: 0,
//     maxvalue: 100,
//     listener: mockListener,
//     inputmode: "natural",
//   },
// };

// export const WithDecimalPlaces: Story = {
//   render: Template,
//   args: {
//     name: "decimalPlaces",
//     placeholder: "2 decimal places",
//     decimalplaces: 2,
//     datavalue: 123.45,
//     listener: mockListener,
//   },
// };

// export const WithStep: Story = {
//   render: Template,
//   args: {
//     name: "withStep",
//     placeholder: "Step: 5",
//     step: 5,
//     listener: mockListener,
//   },
// };

// export const CustomPlaceholder: Story = {
//   render: Template,
//   args: {
//     name: "customPlaceholder",
//     placeholder: "Type a number",
//     listener: mockListener,
//   },
// };

// export const NaturalInputMode: Story = {
//   render: Template,
//   args: {
//     name: "naturalMode",
//     placeholder: "Natural numbers only (positive)",
//     inputmode: "natural",
//     listener: mockListener,
//   },
// };

// export const FinancialInputMode: Story = {
//   render: Template,
//   args: {
//     name: "financialMode",
//     placeholder: "Financial (positive/negative)",
//     inputmode: "financial",
//     listener: mockListener,
//   },
// };

// export const TwoDecimalPlaces: Story = {
//   render: Template,
//   args: {
//     name: "twoDecimals",
//     placeholder: "Price",
//     decimalplaces: 2,
//     datavalue: 99.99,
//     listener: mockListener,
//   },
// };

// export const FourDecimalPlaces: Story = {
//   render: Template,
//   args: {
//     name: "fourDecimals",
//     placeholder: "Precise measurement",
//     decimalplaces: 4,
//     datavalue: 3.1416,
//     listener: mockListener,
//   },
// };

// export const WithTrailingZero: Story = {
//   render: Template,
//   args: {
//     name: "trailingZero",
//     placeholder: "Shows trailing zeros",
//     decimalplaces: 2,
//     trailingzero: true,
//     datavalue: 10.5,
//     listener: mockListener,
//   },
// };

// export const WithoutTrailingZero: Story = {
//   render: Template,
//   args: {
//     name: "noTrailingZero",
//     placeholder: "No trailing zeros",
//     decimalplaces: 2,
//     trailingzero: false,
//     datavalue: 10.5,
//     listener: mockListener,
//   },
// };

// export const StepPointOne: Story = {
//   render: Template,
//   args: {
//     name: "stepPointOne",
//     placeholder: "Step: 0.1",
//     step: 0.1,
//     decimalplaces: 1,
//     listener: mockListener,
//   },
// };

// export const StepPointFive: Story = {
//   render: Template,
//   args: {
//     name: "stepPointFive",
//     placeholder: "Step: 0.5",
//     step: 0.5,
//     decimalplaces: 1,
//     listener: mockListener,
//   },
// };

// export const StepTen: Story = {
//   render: Template,
//   args: {
//     name: "stepTen",
//     placeholder: "Step: 10",
//     step: 10,
//     listener: mockListener,
//   },
// };

// export const WithMinValue: Story = {
//   render: Template,
//   args: {
//     name: "minValue",
//     placeholder: "Min: 0",
//     minvalue: 0,
//     listener: mockListener,
//   },
// };

// export const WithMaxValue: Story = {
//   render: Template,
//   args: {
//     name: "maxValue",
//     placeholder: "Max: 100",
//     maxvalue: 100,
//     listener: mockListener,
//   },
// };

// export const WithRange: Story = {
//   render: Template,
//   args: {
//     name: "range",
//     placeholder: "Range: 0-100",
//     minvalue: 0,
//     maxvalue: 100,
//     datavalue: 50,
//     listener: mockListener,
//   },
// };

// export const AgeRange: Story = {
//   render: Template,
//   args: {
//     name: "ageRange",
//     placeholder: "Age (0-120)",
//     minvalue: 0,
//     maxvalue: 120,
//     listener: mockListener,
//   },
// };

// export const PercentageRange: Story = {
//   render: Template,
//   args: {
//     name: "percentage",
//     placeholder: "Percentage (0-100)",
//     minvalue: 0,
//     maxvalue: 100,
//     step: 1,
//     listener: mockListener,
//   },
// };

// export const RatingRange: Story = {
//   render: Template,
//   args: {
//     name: "rating",
//     placeholder: "Rating (1-5)",
//     minvalue: 1,
//     maxvalue: 5,
//     step: 0.5,
//     decimalplaces: 1,
//     listener: mockListener,
//   },
// };

// export const DisabledNumber: Story = {
//   render: Template,
//   args: {
//     name: "disabledNumber",
//     placeholder: "Disabled",
//     datavalue: 100,
//     disabled: true,
//     listener: mockListener,
//   },
// };

// export const ReadonlyNumber: Story = {
//   render: Template,
//   args: {
//     name: "readonlyNumber",
//     placeholder: "Readonly",
//     datavalue: 100,
//     readonly: true,
//     listener: mockListener,
//   },
// };

// export const RequiredNumber: Story = {
//   render: Template,
//   args: {
//     name: "requiredNumber",
//     placeholder: "Required field",
//     required: true,
//     listener: mockListener,
//   },
// };

// export const UpdateOnBlur: Story = {
//   render: Template,
//   args: {
//     name: "updateBlur",
//     placeholder: "Updates on blur",
//     updateon: "blur",
//     listener: mockListener,
//   },
// };

// export const UpdateOnKeypress: Story = {
//   render: Template,
//   args: {
//     name: "updateKeypress",
//     placeholder: "Updates on keypress",
//     updateon: "keypress",
//     listener: mockListener,
//   },
// };

// export const WithUpdateDelay: Story = {
//   render: Template,
//   args: {
//     name: "updateDelay",
//     placeholder: "500ms update delay",
//     updateon: "keypress",
//     updatedelay: "500",
//     listener: mockListener,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintNumber",
//     placeholder: "Hover for hint",
//     hint: "Enter a whole number",
//     listener: mockListener,
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaNumber",
//     placeholder: "Enter quantity",
//     arialabel: "Product quantity input",
//     listener: mockListener,
//   },
// };

// export const WithShortcutKey: Story = {
//   render: Template,
//   args: {
//     name: "shortcutNumber",
//     placeholder: "Press Alt+N to focus",
//     shortcutkey: "n",
//     listener: mockListener,
//   },
// };

// export const WithCustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClass",
//     placeholder: "Custom class",
//     className: "custom-number-class",
//     listener: mockListener,
//   },
// };

// export const WithCustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledNumber",
//     placeholder: "Custom styled",
//     styles: {
//       backgroundColor: "#f0f8ff",
//       borderColor: "#1976d2",
//     },
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [value, setValue] = useState<number | null>(0);

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveNumber: {},
//       },
//       onChange: (name: string, data: any) => {
//         setValue(data.datavalue || null);
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Number Demo</Typography>
//           <NumberDefaultExport
//             name="interactiveNumber"
//             placeholder="Enter a number"
//             datavalue={value}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Current Value:</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {value !== null ? value : "No value"}
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mt={1} display="block">
//               Type: {typeof value}
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

// export const InputModeComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Input Mode Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Natural Mode (Positive Only)
//             </Typography>
//             <NumberDefaultExport
//               name="naturalComp"
//               placeholder="Natural numbers"
//               inputmode="natural"
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Financial Mode (Positive/Negative)
//             </Typography>
//             <NumberDefaultExport
//               name="financialComp"
//               placeholder="Financial numbers"
//               inputmode="financial"
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "inputModeComparison",
//     listener: mockListener,
//   },
// };

// export const DecimalPlacesComparison: Story = {
//   render: () => {
//     const value = 123.456789;
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Decimal Places Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               No Decimals (Integer)
//             </Typography>
//             <NumberDefaultExport
//               name="noDecimals"
//               placeholder="Integer"
//               decimalplaces={0}
//               datavalue={value}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               1 Decimal Place
//             </Typography>
//             <NumberDefaultExport
//               name="oneDecimal"
//               placeholder="1 decimal"
//               decimalplaces={1}
//               datavalue={value}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               2 Decimal Places
//             </Typography>
//             <NumberDefaultExport
//               name="twoDecimals"
//               placeholder="2 decimals"
//               decimalplaces={2}
//               datavalue={value}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               4 Decimal Places
//             </Typography>
//             <NumberDefaultExport
//               name="fourDecimals"
//               placeholder="4 decimals"
//               decimalplaces={4}
//               datavalue={value}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "decimalComparison",
//     listener: mockListener,
//   },
// };

// export const TrailingZeroComparison: Story = {
//   render: () => {
//     const value = 10.5;
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Trailing Zero Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               With Trailing Zeros
//             </Typography>
//             <NumberDefaultExport
//               name="withTrailing"
//               placeholder="Shows trailing zeros"
//               decimalplaces={2}
//               trailingzero={true}
//               datavalue={value}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Without Trailing Zeros
//             </Typography>
//             <NumberDefaultExport
//               name="withoutTrailing"
//               placeholder="No trailing zeros"
//               decimalplaces={2}
//               trailingzero={false}
//               datavalue={value}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "trailingZeroComparison",
//     listener: mockListener,
//   },
// };

// export const StepComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Step Value Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Step: 1 (Default)
//             </Typography>
//             <NumberDefaultExport
//               name="step1"
//               placeholder="Increment by 1"
//               step={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Step: 5
//             </Typography>
//             <NumberDefaultExport
//               name="step5"
//               placeholder="Increment by 5"
//               step={5}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Step: 0.5
//             </Typography>
//             <NumberDefaultExport
//               name="stepHalf"
//               placeholder="Increment by 0.5"
//               step={0.5}
//               decimalplaces={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Step: 10
//             </Typography>
//             <NumberDefaultExport
//               name="step10"
//               placeholder="Increment by 10"
//               step={10}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "stepComparison",
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
//             <NumberDefaultExport
//               name="normalState"
//               placeholder="Normal"
//               datavalue={100}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <NumberDefaultExport
//               name="disabledState"
//               placeholder="Disabled"
//               datavalue={100}
//               disabled={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <NumberDefaultExport
//               name="readonlyState"
//               placeholder="Readonly"
//               datavalue={100}
//               readonly={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required State
//             </Typography>
//             <NumberDefaultExport
//               name="requiredState"
//               placeholder="Required"
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
//           Product Order Form
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Product Name
//             </Typography>
//             <input
//               type="text"
//               placeholder="Enter product name"
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//               }}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Quantity *
//             </Typography>
//             <NumberDefaultExport
//               name="quantity"
//               placeholder="Enter quantity"
//               required={true}
//               minvalue={1}
//               maxvalue={999}
//               step={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Price per Unit *
//             </Typography>
//             <NumberDefaultExport
//               name="price"
//               placeholder="Enter price"
//               required={true}
//               minvalue={0.01}
//               decimalplaces={2}
//               trailingzero={true}
//               step={0.01}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Discount (%)
//             </Typography>
//             <NumberDefaultExport
//               name="discount"
//               placeholder="Enter discount"
//               minvalue={0}
//               maxvalue={100}
//               step={5}
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

// export const FinancialFormExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Financial Transaction
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Account Number
//             </Typography>
//             <input
//               type="text"
//               placeholder="Enter account number"
//               style={{
//                 padding: "8px 12px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "100%",
//               }}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Transaction Amount *
//             </Typography>
//             <NumberDefaultExport
//               name="transactionAmount"
//               placeholder="Enter amount"
//               required={true}
//               inputmode="financial"
//               decimalplaces={2}
//               trailingzero={true}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Service Fee
//             </Typography>
//             <NumberDefaultExport
//               name="serviceFee"
//               placeholder="Service fee"
//               inputmode="natural"
//               decimalplaces={2}
//               trailingzero={true}
//               datavalue={2.5}
//               readonly={true}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "financialExample",
//     listener: mockListener,
//   },
// };

// export const MeasurementExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Product Dimensions
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Length (cm)
//             </Typography>
//             <NumberDefaultExport
//               name="length"
//               placeholder="Length"
//               minvalue={0}
//               decimalplaces={2}
//               step={0.1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Width (cm)
//             </Typography>
//             <NumberDefaultExport
//               name="width"
//               placeholder="Width"
//               minvalue={0}
//               decimalplaces={2}
//               step={0.1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Height (cm)
//             </Typography>
//             <NumberDefaultExport
//               name="height"
//               placeholder="Height"
//               minvalue={0}
//               decimalplaces={2}
//               step={0.1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Weight (kg)
//             </Typography>
//             <NumberDefaultExport
//               name="weight"
//               placeholder="Weight"
//               minvalue={0}
//               maxvalue={1000}
//               decimalplaces={3}
//               step={0.001}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "measurementExample",
//     listener: mockListener,
//   },
// };

// export const RatingExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Product Review
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Overall Rating (1-5) *
//             </Typography>
//             <NumberDefaultExport
//               name="overallRating"
//               placeholder="Rate from 1 to 5"
//               required={true}
//               minvalue={1}
//               maxvalue={5}
//               step={0.5}
//               decimalplaces={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Quality Rating (1-10)
//             </Typography>
//             <NumberDefaultExport
//               name="qualityRating"
//               placeholder="Rate quality"
//               minvalue={1}
//               maxvalue={10}
//               step={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Value for Money (%)
//             </Typography>
//             <NumberDefaultExport
//               name="valueRating"
//               placeholder="Percentage"
//               minvalue={0}
//               maxvalue={100}
//               step={10}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "ratingExample",
//     listener: mockListener,
//   },
// };

// export const CalculatorExample: Story = {
//   render: () => {
//     const [num1, setNum1] = useState<number>(0);
//     const [num2, setNum2] = useState<number>(0);
//     const result = num1 + num2;

//     const listener1 = {
//       ...mockListener,
//       Widgets: { num1: {} },
//       onChange: (name: string, data: any) => setNum1(data.datavalue || 0),
//     };

//     const listener2 = {
//       ...mockListener,
//       Widgets: { num2: {} },
//       onChange: (name: string, data: any) => setNum2(data.datavalue || 0),
//     };

//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Simple Calculator
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Number 1
//             </Typography>
//             <NumberDefaultExport
//               name="num1"
//               placeholder="Enter first number"
//               datavalue={num1}
//               decimalplaces={2}
//               listener={listener1}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Number 2
//             </Typography>
//             <NumberDefaultExport
//               name="num2"
//               placeholder="Enter second number"
//               datavalue={num2}
//               decimalplaces={2}
//               listener={listener2}
//             />
//           </Box>
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Result (Sum):</Typography>
//             <Typography variant="h5" color="primary">
//               {result.toFixed(2)}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "calculatorExample",
//     listener: mockListener,
//   },
// };
