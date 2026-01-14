import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";

import CurrencyDefaultExport from "../../../../components/input/currency/index";
import { CURRENCY_INFO } from "../../../../core/constants/currency-constant";

import { ComponentDocumentation } from "../../../../../.storybook/components/DocumentRenderer";
import overview from "./docs/overview.md?raw";
import props from "./docs/props.md?raw";
import events from "./docs/events.md?raw";
import methods from "./docs/methods.md?raw";
import styling from "./docs/styling.md?raw";

import currencyTokensData from "../../../../designTokens/components/currency/currency.json";

// Get all currency codes for the select control
const currencyCodes = Object.keys(CURRENCY_INFO);

const meta: Meta<typeof CurrencyDefaultExport> = {
  title: "Input/Currency",
  component: CurrencyDefaultExport,
  // argTypes: {
  //   currency: {
  //     control: { type: "select" },
  //     options: currencyCodes,
  //     description: "Currency code (ISO 4217)",
  //   },
  //   datavalue: { control: "number" },
  //   disabled: { control: "boolean" },
  //   readonly: { control: "boolean" },
  //   required: { control: "boolean" },
  //   placeholder: { control: "text" },
  //   // arialabel: { control: "text" },
  //   // tabindex: { control: "number" },
  //   // shortcutkey: { control: "text" },
  //   maxvalue: { control: "number" },
  //   minvalue: { control: "number" },
  //   step: { control: "number" },
  //   // textAlign: { control: "text" },
  //   // hint: { control: "text" },
  //   trailingzero: { control: "boolean" },
  //   inputmode: {
  //     control: { type: "select" },
  //     options: ["natural", "positive", "negative"],
  //   },
  //   decimalplaces: { control: "number" },
  //   // updateon: {
  //   //   control: { type: "select" },
  //   //   options: ["blur", "keypress"],
  //   // },
  //   // updatedelay: { control: "text" },
  //   // className: { control: "text" },
  //   autofocus: { control: "boolean" },
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

const Template = (args: any) => (
  <Box style={{ padding: 16 }}>
    <CurrencyDefaultExport {...args} listener={mockListener} />
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
    name:"docsCurrency",
    listener:mockListener
  },
  parameters: {
    layout: 'fullscreen',
  },
};


export const Showcase: Story = {
  render: () => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
    const [amount, setAmount] = useState<number>(1000);

    const currencyInfo = CURRENCY_INFO[selectedCurrency];

    const customListener = {
      ...mockListener,
      Widgets: {
        currencySelector: {},
      },
      onChange: (_name: string, data: any) => {
        if (data.datavalue !== undefined) {
          setAmount(data.datavalue);
        }
      },
    };

    return (
      <Box style={{ padding: 16 }}>
        <Stack spacing={3}>
          <Typography variant="h6">Currency Showcase</Typography>

          <Box>
            <Typography variant="subtitle2" mb={1}>
              Select Currency
            </Typography>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              {currencyCodes.map((code) => (
                <option key={code} value={code}>
                  {code} - {CURRENCY_INFO[code].name} ({CURRENCY_INFO[code].symbol})
                </option>
              ))}
            </select>
          </Box>

          <Box>
            <Typography variant="subtitle2" mb={1}>
              Amount
            </Typography>
            <CurrencyDefaultExport
              name="currencySelector"
              currency={selectedCurrency}
              datavalue={amount}
              placeholder={`Enter ${selectedCurrency} amount`}
              decimalplaces={currencyInfo.decimal_digits}
              listener={customListener}
            />
          </Box>

          <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="body2" color="text.secondary">
              <strong>Currency:</strong> {currencyInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Symbol:</strong> {currencyInfo.symbol} ({currencyInfo.symbol_native})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Decimal Places:</strong> {currencyInfo.decimal_digits}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              <strong>Current Value:</strong> {currencyInfo.symbol}
              {amount?.toFixed(currencyInfo.decimal_digits) || "0"}
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
  args: {
    name: "showcaseCurrency",
    listener: mockListener,
  },
};

export const Basic: Story = {
  tags: ['show-panel'],
  render: Template,
  args: {
    name: "basicCurrency",
    listener: mockListener,
    currency: "USD",
    placeholder: "Enter amount",
    inputmode: "natural",
    datavalue: null,
    disabled : false,
    readonly: false,
    required: false,
    decimalplaces: 2,
    trailingzero: false,
  },
  argTypes: {
    currency: {
      control: { type: "select" },
      options: currencyCodes,
      description: "Currency code (ISO 4217)",
    },
    datavalue: { control: "number" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    placeholder: { control: "text" },
    maxvalue: { control: "number" },
    minvalue: { control: "number" },
    step: { control: "number" },
    // textAlign: { control: "text" },
    trailingzero: { control: "boolean" },
    inputmode: {
      control: { type: "select" },
      options: ["natural", "positive", "negative"],
    },
    decimalplaces: { control: "number" },
    autofocus: { control: "boolean" },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: (args) => {
      //component can't spread data-design-token-target, so we apply it to a wrapper
      const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;

      return (
        <Box className="wm-app" style={{ padding: 16 }} data-design-token-target={dataAttr}>
          <CurrencyDefaultExport {...componentArgs} listener={mockListener} />
        </Box>
      );
    },
  args: {
    name: "standardCurrency",
    listener: mockListener,
    currency: "USD",
    placeholder: "Enter amount",
    inputmode: "natural",
    datavalue: null,
    disabled : false,
    readonly: false,
    required: false,
    decimalplaces: 2,
    trailingzero: false,
    "data-design-token-target": true
  },
  argTypes: {
    currency: {
      control: { type: "select" },
      options: currencyCodes,
      description: "Currency code (ISO 4217)",
    },
    datavalue: { control: "number" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    placeholder: { control: "text" },
    maxvalue: { control: "number" },
    minvalue: { control: "number" },
    step: { control: "number" },
    // textAlign: { control: "text" },
    trailingzero: { control: "boolean" },
    inputmode: {
      control: { type: "select" },
      options: ["natural", "positive", "negative"],
    },
    decimalplaces: { control: "number" },
    autofocus: { control: "boolean" },
    "data-design-token-target": { control: false }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: currencyTokensData,  // Pass raw JSON data instead of pre-parsed config
      componentKey: "currency",  // Component identifier for parsing
      extractCSSVariablesAtRuntime: true,  // Enable runtime CSS variable extraction
    },
    layout: 'fullscreen',
  }, 
};

// export const WithDecimalPlaces: Story = {
//   render: Template,
//   args: {
//     name: "decimalCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Enter amount",
//     datavalue: 1234.567,
//     decimalplaces: 2,
//   },
// };

// export const NoDecimalPlaces: Story = {
//   render: Template,
//   args: {
//     name: "noDecimalCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Enter whole amount",
//     datavalue: 1234,
//     decimalplaces: 0,
//   },
// };

// export const ThreeDecimalPlaces: Story = {
//   render: Template,
//   args: {
//     name: "threeDecimalCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Enter amount",
//     datavalue: 1234.567,
//     decimalplaces: 3,
//   },
// };

// export const WithTrailingZero: Story = {
//   render: Template,
//   args: {
//     name: "trailingZero",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Enter amount",
//     datavalue: 100.5,
//     decimalplaces: 2,
//     trailingzero: true,
//   },
// };

// export const WithoutTrailingZero: Story = {
//   render: Template,
//   args: {
//     name: "noTrailingZero",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Enter amount",
//     datavalue: 100.5,
//     decimalplaces: 2,
//     trailingzero: false,
//   },
// };

// export const WithMinMaxValue: Story = {
//   render: Template,
//   args: {
//     name: "minMaxCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Min: 10, Max: 1000",
//     datavalue: 100,
//     minvalue: 10,
//     maxvalue: 1000,
//     decimalplaces: 2,
//   },
// };

// export const WithStep: Story = {
//   render: Template,
//   args: {
//     name: "stepCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Use arrow keys (Step: 10)",
//     datavalue: 100,
//     step: 10,
//     decimalplaces: 2,
//   },
// };

// export const StepPointFive: Story = {
//   render: Template,
//   args: {
//     name: "stepHalfCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Use arrow keys (Step: 0.5)",
//     datavalue: 10.5,
//     step: 0.5,
//     decimalplaces: 2,
//   },
// };

// export const ReadonlyCurrency: Story = {
//   render: Template,
//   args: {
//     name: "readonlyCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Readonly amount",
//     datavalue: 2500.75,
//     readonly: true,
//     decimalplaces: 2,
//   },
// };

// export const DisabledCurrency: Story = {
//   render: Template,
//   args: {
//     name: "disabledCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Disabled amount",
//     datavalue: 1500.25,
//     disabled: true,
//     decimalplaces: 2,
//   },
// };

// export const RequiredCurrency: Story = {
//   render: Template,
//   args: {
//     name: "requiredCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Required field",
//     datavalue: null,
//     required: true,
//     decimalplaces: 2,
//   },
// };

// export const UpdateOnBlur: Story = {
//   render: Template,
//   args: {
//     name: "updateBlurCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Updates on blur",
//     datavalue: 100,
//     updateon: "blur",
//     decimalplaces: 2,
//   },
// };

// export const UpdateOnKeypress: Story = {
//   render: Template,
//   args: {
//     name: "updateKeyCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Updates on keypress",
//     datavalue: 100,
//     updateon: "keypress",
//     decimalplaces: 2,
//   },
// };

// export const UpdateWithDelay: Story = {
//   render: Template,
//   args: {
//     name: "updateDelayCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "500ms update delay",
//     datavalue: 100,
//     updateon: "keypress",
//     updatedelay: "500",
//     decimalplaces: 2,
//   },
// };

// export const PositiveInputMode: Story = {
//   render: Template,
//   args: {
//     name: "positiveCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Positive numbers only",
//     datavalue: 100,
//     inputmode: "positive",
//     decimalplaces: 2,
//   },
// };

// export const NegativeInputMode: Story = {
//   render: Template,
//   args: {
//     name: "negativeCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Negative numbers allowed",
//     datavalue: -100,
//     inputmode: "negative",
//     decimalplaces: 2,
//   },
// };

// export const NaturalInputMode: Story = {
//   render: Template,
//   args: {
//     name: "naturalCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Natural numbers (no decimal)",
//     datavalue: 100,
//     inputmode: "natural",
//     decimalplaces: 0,
//   },
// };

// export const WithHint: Story = {
//   render: Template,
//   args: {
//     name: "hintCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Hover to see hint",
//     datavalue: 250.5,
//     hint: "Enter the transaction amount",
//     decimalplaces: 2,
//   },
// };

// export const WithShortcutKey: Story = {
//   render: Template,
//   args: {
//     name: "shortcutCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Press 'A' to focus",
//     datavalue: 100,
//     shortcutkey: "a",
//     decimalplaces: 2,
//   },
// };

// export const CustomTabIndex: Story = {
//   render: Template,
//   args: {
//     name: "tabIndexCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Tab index: 5",
//     datavalue: 100,
//     tabindex: 5,
//     decimalplaces: 2,
//   },
// };

// export const WithAriaLabel: Story = {
//   render: Template,
//   args: {
//     name: "ariaCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Accessible currency input",
//     datavalue: 100,
//     arialabel: "Transaction amount in USD",
//     decimalplaces: 2,
//   },
// };

// export const CustomClassName: Story = {
//   render: Template,
//   args: {
//     name: "customClassCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "With custom class",
//     datavalue: 100,
//     className: "custom-currency-class",
//     decimalplaces: 2,
//   },
// };

// export const CustomStyles: Story = {
//   render: Template,
//   args: {
//     name: "styledCurrency",
//     listener: mockListener,
//     currency: "USD",
//     placeholder: "Custom styled",
//     datavalue: 100,
//     decimalplaces: 2,
//     styles: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       color: "#2E7D32",
//     },
//   },
// };

// export const MultipleCurrencies: Story = {
//   render: () => {
//     const currencies = [
//       { code: "USD", value: 1000 },
//       { code: "EUR", value: 850 },
//       { code: "GBP", value: 725 },
//       { code: "JPY", value: 110000 },
//       { code: "INR", value: 75000 },
//       { code: "AUD", value: 1350 },
//     ];

//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Multiple Currency Examples
//         </Typography>
//         <Stack spacing={3}>
//           {currencies.map((currency, index) => {
//             const currencyInfo = CURRENCY_INFO[currency.code];
//             return (
//               <Box key={index}>
//                 <Typography variant="subtitle2" mb={1}>
//                   {currencyInfo.name} ({currencyInfo.symbol})
//                 </Typography>
//                 <CurrencyDefaultExport
//                   name={`currency${index}`}
//                   currency={currency.code}
//                   datavalue={currency.value}
//                   placeholder={`Enter ${currency.code} amount`}
//                   decimalplaces={currencyInfo.decimal_digits}
//                   listener={mockListener}
//                 />
//               </Box>
//             );
//           })}
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "multipleCurrencies",
//     listener: mockListener,
//   },
// };

// export const InteractiveDemo: Story = {
//   render: () => {
//     const [amount, setAmount] = useState<number>(1000);

//     const customListener = {
//       ...mockListener,
//       Widgets: {
//         interactiveCurrency: {},
//       },
//       onChange: (_name: string, data: any) => {
//         if (data.datavalue !== undefined) {
//           setAmount(data.datavalue);
//         }
//       },
//     };

//     return (
//       <Box style={{ padding: 16 }}>
//         <Stack spacing={3}>
//           <Typography variant="h6">Interactive Currency Demo</Typography>
//           <CurrencyDefaultExport
//             name="interactiveCurrency"
//             currency="USD"
//             datavalue={amount}
//             placeholder="Enter amount"
//             decimalplaces={2}
//             step={10}
//             listener={customListener}
//           />
//           <Box p={2} bgcolor="#f5f5f5" borderRadius={1}>
//             <Typography variant="subtitle2">Current Value:</Typography>
//             <Typography variant="h4" color="primary">
//               ${amount?.toFixed(2) || "0.00"}
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

// export const DecimalPlacesComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Decimal Places Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               No Decimal Places (Whole Numbers)
//             </Typography>
//             <CurrencyDefaultExport
//               name="decimal0"
//               currency="USD"
//               datavalue={1234}
//               placeholder="Whole numbers only"
//               decimalplaces={0}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               1 Decimal Place
//             </Typography>
//             <CurrencyDefaultExport
//               name="decimal1"
//               currency="USD"
//               datavalue={1234.5}
//               placeholder="One decimal place"
//               decimalplaces={1}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               2 Decimal Places (Standard)
//             </Typography>
//             <CurrencyDefaultExport
//               name="decimal2"
//               currency="USD"
//               datavalue={1234.56}
//               placeholder="Two decimal places"
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               3 Decimal Places
//             </Typography>
//             <CurrencyDefaultExport
//               name="decimal3"
//               currency="USD"
//               datavalue={1234.567}
//               placeholder="Three decimal places"
//               decimalplaces={3}
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
//               Natural Mode (Default)
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Allows both positive and negative numbers
//             </Typography>
//             <CurrencyDefaultExport
//               name="naturalMode"
//               currency="USD"
//               datavalue={100}
//               placeholder="Natural mode"
//               inputmode="natural"
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Positive Mode
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Only positive numbers allowed
//             </Typography>
//             <CurrencyDefaultExport
//               name="positiveMode"
//               currency="USD"
//               datavalue={100}
//               placeholder="Positive only"
//               inputmode="positive"
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Negative Mode
//             </Typography>
//             <Typography variant="caption" color="text.secondary" mb={1} display="block">
//               Allows negative numbers
//             </Typography>
//             <CurrencyDefaultExport
//               name="negativeMode"
//               currency="USD"
//               datavalue={-100}
//               placeholder="Negative allowed"
//               inputmode="negative"
//               decimalplaces={2}
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

// export const StepValueExamples: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Step Value Examples (Use Arrow Keys)
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Step: 1 (Default)
//             </Typography>
//             <CurrencyDefaultExport
//               name="step1"
//               currency="USD"
//               datavalue={100}
//               placeholder="Increment by 1"
//               step={1}
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Step: 10
//             </Typography>
//             <CurrencyDefaultExport
//               name="step10"
//               currency="USD"
//               datavalue={100}
//               placeholder="Increment by 10"
//               step={10}
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Step: 0.25 (Quarter)
//             </Typography>
//             <CurrencyDefaultExport
//               name="stepQuarter"
//               currency="USD"
//               datavalue={10}
//               placeholder="Increment by 0.25"
//               step={0.25}
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Step: 100
//             </Typography>
//             <CurrencyDefaultExport
//               name="step100"
//               currency="USD"
//               datavalue={1000}
//               placeholder="Increment by 100"
//               step={100}
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "stepExamples",
//     listener: mockListener,
//   },
// };

// export const FormExample: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16, maxWidth: 600 }}>
//         <Typography variant="h6" mb={3}>
//           Invoice Form
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Item Price *
//             </Typography>
//             <CurrencyDefaultExport
//               name="itemPrice"
//               currency="USD"
//               datavalue={null}
//               placeholder="Enter item price"
//               required={true}
//               decimalplaces={2}
//               minvalue={0}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Shipping Cost
//             </Typography>
//             <CurrencyDefaultExport
//               name="shippingCost"
//               currency="USD"
//               datavalue={15.99}
//               placeholder="Enter shipping cost"
//               decimalplaces={2}
//               minvalue={0}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Discount Amount
//             </Typography>
//             <CurrencyDefaultExport
//               name="discount"
//               currency="USD"
//               datavalue={0}
//               placeholder="Enter discount"
//               decimalplaces={2}
//               minvalue={0}
//               maxvalue={1000}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Tax Amount (Readonly)
//             </Typography>
//             <CurrencyDefaultExport
//               name="tax"
//               currency="USD"
//               datavalue={45.5}
//               placeholder="Calculated tax"
//               readonly={true}
//               decimalplaces={2}
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

// export const StateComparison: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Currency State Comparison
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Normal State
//             </Typography>
//             <CurrencyDefaultExport
//               name="normalState"
//               currency="USD"
//               datavalue={100}
//               placeholder="Normal currency input"
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Readonly State
//             </Typography>
//             <CurrencyDefaultExport
//               name="readonlyState"
//               currency="USD"
//               datavalue={200}
//               placeholder="Readonly currency"
//               readonly={true}
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Disabled State
//             </Typography>
//             <CurrencyDefaultExport
//               name="disabledState"
//               currency="USD"
//               datavalue={300}
//               placeholder="Disabled currency"
//               disabled={true}
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle1" mb={1}>
//               Required Field (Empty)
//             </Typography>
//             <CurrencyDefaultExport
//               name="requiredState"
//               currency="USD"
//               datavalue={null}
//               placeholder="Required field"
//               required={true}
//               decimalplaces={2}
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

// export const LargeAmounts: Story = {
//   render: () => {
//     return (
//       <Box style={{ padding: 16 }}>
//         <Typography variant="h6" mb={3}>
//           Large Amount Formatting
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Thousands
//             </Typography>
//             <CurrencyDefaultExport
//               name="thousands"
//               currency="USD"
//               datavalue={12345.67}
//               placeholder="Thousands"
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Millions
//             </Typography>
//             <CurrencyDefaultExport
//               name="millions"
//               currency="USD"
//               datavalue={1234567.89}
//               placeholder="Millions"
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//           <Box>
//             <Typography variant="subtitle2" mb={1}>
//               Billions
//             </Typography>
//             <CurrencyDefaultExport
//               name="billions"
//               currency="USD"
//               datavalue={9876543210.12}
//               placeholder="Billions"
//               decimalplaces={2}
//               listener={mockListener}
//             />
//           </Box>
//         </Stack>
//       </Box>
//     );
//   },
//   args: {
//     name: "largeAmounts",
//     listener: mockListener,
//   },
// };
