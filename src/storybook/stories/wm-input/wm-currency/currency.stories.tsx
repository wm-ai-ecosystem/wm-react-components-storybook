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
// import styling from "./docs/styling.md?raw";
import token from "./docs/token.md?raw";

import currencyTokensData from "../../../../designTokens/components/currency/currency.json";

// Get all currency codes for the select control
const currencyCodes = Object.keys(CURRENCY_INFO);

const meta: Meta<typeof CurrencyDefaultExport> = {
  title: "Input/Currency",
  component: CurrencyDefaultExport,
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

const DesignTokenTemplate = (args: any) => {
  //component can't spread data-design-token-target, so we apply it to a wrapper
  const { "data-design-token-target": dataAttr, ...componentArgs } = args;

  return (
    <Box className="wm-app" style={{ padding: 16 }} data-design-token-target={dataAttr}>
      <CurrencyDefaultExport {...componentArgs} listener={mockListener} />
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
      // styling={styling}
      token={token}
    />
  ),
  args:{
    name:"docsCurrency",
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
  argTypes: {
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
  },
};

export const Standard: Story = {
  tags: ['show-panel'],
  render: DesignTokenTemplate,
  args: {
    name: "standardCurrency",
    listener: mockListener,
    currency: "USD",
    placeholder: "Enter amount",
    inputmode: "natural",
    datavalue: null,
    disabled : false,
    readonly: false,
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
    // required: { control: "boolean" },
    placeholder: { control: "text" },
    maxvalue: { control: "number" },
    minvalue: { control: "number" },
    // step: { control: "number" },
    // textAlign: { control: "text" },
    trailingzero: { control: "boolean" },
    inputmode: {
      control: { type: "select" },
      options: ["natural", "positive", "negative"],
    },
    decimalplaces: { control: "number" },
    // autofocus: { control: "boolean" },
    name: { table: { disable: true } },
    listener: { table: { disable: true } },
    "data-design-token-target": { table: { disable: true } }
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
