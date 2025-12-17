import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography, Button } from "@mui/material";

import TextDefaultExport from "../../../../components/input/text/index";

const meta: Meta<typeof TextDefaultExport> = {
  title: "Input/Text",
  component: TextDefaultExport,
  argTypes: {
    datavalue: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["text", "email", "number", "password", "tel", "url"]
    },
    floatinglabel: { control: "boolean" },
    autocomplete: { control: "text" },
    autofocus: { control: "boolean" },
    autotrim: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    maxchars: { control: "number" },
    minvalue: { control: "number" },
    maxvalue: { control: "number" },
    step: { control: "number" },
    displayformat: { control: "text" },
    showdisplayformaton: {
      control: { type: "select" },
      options: ["keypress", "blur"]
    },
    updateon: {
      control: { type: "select" },
      options: ["keypress", "blur"]
    },
    updatedelay: { control: "text" },
    regexp: { control: "text" },
    arialabel: { control: "text" },
    tabindex: { control: "number" },
    shortcutkey: { control: "text" },
    autocapitalize: {
      control: { type: "select" },
      options: ["none", "sentence", "words"]
    },
    hint: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    className: { control: "text" },
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
    <TextDefaultExport {...args} listener={mockListener} />
  </Box>
);

// Basic Examples
export const Default: Story = {
  render: Template,
  args: {
    name: "defaultText",
    placeholder: "Enter text",
    listener: mockListener,
  },
};

export const WithValue: Story = {
  render: Template,
  args: {
    name: "withValueText",
    placeholder: "Enter text",
    datavalue: "Hello World",
    listener: mockListener,
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    name: "placeholderText",
    placeholder: "Type your message here...",
    listener: mockListener,
  },
};

// Type Variations
export const TextType: Story = {
  render: Template,
  args: {
    name: "textType",
    placeholder: "Enter text",
    type: "text",
    listener: mockListener,
  },
};

export const EmailType: Story = {
  render: Template,
  args: {
    name: "emailType",
    placeholder: "Enter email address",
    type: "email",
    listener: mockListener,
  },
};

export const NumberType: Story = {
  render: Template,
  args: {
    name: "numberType",
    placeholder: "Enter number",
    type: "number",
    listener: mockListener,
  },
};

export const PasswordType: Story = {
  render: Template,
  args: {
    name: "passwordType",
    placeholder: "Enter password",
    type: "password",
    listener: mockListener,
  },
};

export const TelType: Story = {
  render: Template,
  args: {
    name: "telType",
    placeholder: "Enter phone number",
    type: "tel",
    listener: mockListener,
  },
};

export const UrlType: Story = {
  render: Template,
  args: {
    name: "urlType",
    placeholder: "Enter URL",
    type: "url",
    listener: mockListener,
  },
};

// Display Format Examples
export const SSNFormat: Story = {
  render: Template,
  args: {
    name: "ssnFormat",
    placeholder: "Enter SSN",
    displayformat: "999-99-9999",
    showdisplayformaton: "keypress",
    maxchars: 9,
    listener: mockListener,
  },
};

export const PhoneFormat: Story = {
  render: Template,
  args: {
    name: "phoneFormat",
    placeholder: "Enter phone number",
    displayformat: "(999) 999-9999",
    showdisplayformaton: "keypress",
    maxchars: 10,
    listener: mockListener,
  },
};

export const PhoneWithExtension: Story = {
  render: Template,
  args: {
    name: "phoneExtFormat",
    placeholder: "Enter phone with extension",
    displayformat: "(999) 999-9999 ext. 999",
    showdisplayformaton: "keypress",
    listener: mockListener,
  },
};

export const CreditCardFormat: Story = {
  render: Template,
  args: {
    name: "creditCardFormat",
    placeholder: "Enter credit card number",
    displayformat: "9999 9999 9999 9999",
    showdisplayformaton: "keypress",
    maxchars: 16,
    listener: mockListener,
  },
};

export const CustomAlphanumericFormat: Story = {
  render: Template,
  args: {
    name: "alphanumericFormat",
    placeholder: "Enter code (e.g., AB-1234)",
    displayformat: "AA-9999",
    showdisplayformaton: "keypress",
    listener: mockListener,
  },
};

// Display Format on Blur
export const SSNFormatOnBlur: Story = {
  render: Template,
  args: {
    name: "ssnBlurFormat",
    placeholder: "Enter SSN (formats on blur)",
    displayformat: "999-99-9999",
    showdisplayformaton: "blur",
    maxchars: 9,
    listener: mockListener,
  },
};

export const PhoneFormatOnBlur: Story = {
  render: Template,
  args: {
    name: "phoneBlurFormat",
    placeholder: "Enter phone (formats on blur)",
    displayformat: "(999) 999-9999",
    showdisplayformaton: "blur",
    maxchars: 10,
    listener: mockListener,
  },
};

// Validation Examples
export const Required: Story = {
  render: Template,
  args: {
    name: "requiredText",
    placeholder: "This field is required *",
    required: true,
    listener: mockListener,
  },
};

export const MaxChars: Story = {
  render: Template,
  args: {
    name: "maxCharsText",
    placeholder: "Maximum 20 characters",
    maxchars: 20,
    listener: mockListener,
  },
};

export const MinMaxValue: Story = {
  render: Template,
  args: {
    name: "minMaxValue",
    placeholder: "Enter number (10-100)",
    type: "number",
    minvalue: 10,
    maxvalue: 100,
    listener: mockListener,
  },
};

export const WithStep: Story = {
  render: Template,
  args: {
    name: "stepValue",
    placeholder: "Enter number (step: 5)",
    type: "number",
    step: 5,
    listener: mockListener,
  },
};

export const RegExpPattern: Story = {
  render: Template,
  args: {
    name: "regexpText",
    placeholder: "Enter alphanumeric only",
    regexp: "^[a-zA-Z0-9]+$",
    listener: mockListener,
  },
};

export const EmailValidation: Story = {
  render: Template,
  args: {
    name: "emailValidation",
    placeholder: "Enter valid email",
    type: "email",
    required: true,
    listener: mockListener,
  },
};

// State Variations
export const Disabled: Story = {
  render: Template,
  args: {
    name: "disabledText",
    placeholder: "Disabled input",
    datavalue: "This is disabled",
    disabled: true,
    listener: mockListener,
  },
};

export const Readonly: Story = {
  render: Template,
  args: {
    name: "readonlyText",
    placeholder: "Readonly input",
    datavalue: "This is readonly",
    readonly: true,
    listener: mockListener,
  },
};

export const WithHint: Story = {
  render: Template,
  args: {
    name: "hintText",
    placeholder: "Hover for hint",
    hint: "This is a helpful hint text",
    listener: mockListener,
  },
};

export const Autofocus: Story = {
  render: Template,
  args: {
    name: "autofocusText",
    placeholder: "This field is auto-focused",
    autofocus: true,
    listener: mockListener,
  },
};

// Update Behavior
export const UpdateOnKeypress: Story = {
  render: Template,
  args: {
    name: "updateKeypress",
    placeholder: "Updates on every keypress",
    updateon: "keypress",
    listener: mockListener,
  },
};

export const UpdateOnBlur: Story = {
  render: Template,
  args: {
    name: "updateBlur",
    placeholder: "Updates when you leave the field",
    updateon: "blur",
    listener: mockListener,
  },
};

export const UpdateWithDelay: Story = {
  render: Template,
  args: {
    name: "updateDelay",
    placeholder: "Updates after 1 second delay",
    updateon: "keypress",
    updatedelay: "1000",
    listener: mockListener,
  },
};

export const Autotrim: Story = {
  render: Template,
  args: {
    name: "autotrimText",
    placeholder: "Trailing spaces will be trimmed",
    autotrim: true,
    updateon: "blur",
    listener: mockListener,
  },
};

// Autocapitalize
export const AutocapitalizeWords: Story = {
  render: Template,
  args: {
    name: "autocapWords",
    placeholder: "First Letter Of Each Word Capitalized",
    autocapitalize: "words",
    listener: mockListener,
  },
};

export const AutocapitalizeSentence: Story = {
  render: Template,
  args: {
    name: "autocapSentence",
    placeholder: "First letter of sentence capitalized",
    autocapitalize: "sentence",
    listener: mockListener,
  },
};

export const AutocapitalizeNone: Story = {
  render: Template,
  args: {
    name: "autocapNone",
    placeholder: "No auto-capitalization",
    autocapitalize: "none",
    listener: mockListener,
  },
};

// State Comparison
export const StateComparison: Story = {
  render: () => (
    <Stack spacing={2} padding={2}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Normal
        </Typography>
        <TextDefaultExport
          name="normalState"
          placeholder="Normal input"
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          With Value
        </Typography>
        <TextDefaultExport
          name="valueState"
          placeholder="With value"
          datavalue="Sample text"
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Disabled
        </Typography>
        <TextDefaultExport
          name="disabledState"
          placeholder="Disabled"
          datavalue="Disabled text"
          disabled={true}
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Readonly
        </Typography>
        <TextDefaultExport
          name="readonlyState"
          placeholder="Readonly"
          datavalue="Readonly text"
          readonly={true}
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Required
        </Typography>
        <TextDefaultExport
          name="requiredState"
          placeholder="Required field *"
          required={true}
          listener={mockListener}
        />
      </Box>
    </Stack>
  ),
};

// Interactive Examples
export const InteractiveText: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [charCount, setCharCount] = useState(0);

    const customListener = {
      appLocale: {
        LABEL_ICON: "Icon",
      },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setValue(data.datavalue);
        setCharCount(data.charlength);
      },
    };

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Interactive Text Input
        </Typography>
        <TextDefaultExport
          name="interactiveText"
          placeholder="Type something..."
          updateon="keypress"
          listener={customListener}
        />
        <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
          <Typography variant="body2" color="text.secondary">
            Value: <strong>{value || "(empty)"}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Character Count: <strong>{charCount}</strong>
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const CharacterCounter: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const maxChars = 50;

    const customListener = {
      appLocale: {
        LABEL_ICON: "Icon",
      },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setValue(data.datavalue);
      },
    };

    const remaining = maxChars - value.length;
    const percentUsed = (value.length / maxChars) * 100;

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Character Counter
        </Typography>
        <TextDefaultExport
          name="charCounter"
          placeholder="Type your message..."
          maxchars={maxChars}
          updateon="keypress"
          listener={customListener}
        />
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Characters: {value.length} / {maxChars}
            </Typography>
            <Typography
              variant="body2"
              color={remaining < 10 ? "error" : "text.secondary"}
            >
              {remaining} remaining
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 8,
              bgcolor: "#e0e0e0",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${percentUsed}%`,
                height: "100%",
                bgcolor: percentUsed > 90 ? "#f44336" : percentUsed > 70 ? "#ff9800" : "#4caf50",
                transition: "all 0.3s ease",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const FormattedInputComparison: Story = {
  render: () => (
    <Stack spacing={3} padding={2} maxWidth={600}>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          SSN Format (999-99-9999)
        </Typography>
        <TextDefaultExport
          name="ssnComp"
          placeholder="Enter SSN"
          displayformat="999-99-9999"
          showdisplayformaton="keypress"
          maxchars={9}
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Phone Format ((999) 999-9999)
        </Typography>
        <TextDefaultExport
          name="phoneComp"
          placeholder="Enter phone"
          displayformat="(999) 999-9999"
          showdisplayformaton="keypress"
          maxchars={10}
          listener={mockListener}
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Credit Card Format (9999 9999 9999 9999)
        </Typography>
        <TextDefaultExport
          name="ccComp"
          placeholder="Enter credit card"
          displayformat="9999 9999 9999 9999"
          showdisplayformaton="keypress"
          maxchars={16}
          listener={mockListener}
        />
      </Box>
    </Stack>
  ),
};

// Real-world Examples
export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    const createListener = (field: string) => ({
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setFormData(prev => ({ ...prev, [field]: data.datavalue }));
      },
    });

    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={3}>
          Contact Form
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Full Name *
            </Typography>
            <TextDefaultExport
              name="contactName"
              placeholder="Enter your full name"
              required={true}
              autocapitalize="words"
              updateon="blur"
              listener={createListener("name")}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Email Address *
            </Typography>
            <TextDefaultExport
              name="contactEmail"
              placeholder="your.email@example.com"
              type="email"
              required={true}
              updateon="blur"
              listener={createListener("email")}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Phone Number
            </Typography>
            <TextDefaultExport
              name="contactPhone"
              placeholder="(555) 123-4567"
              displayformat="(999) 999-9999"
              showdisplayformaton="keypress"
              maxchars={10}
              updateon="blur"
              listener={createListener("phone")}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Message *
            </Typography>
            <TextDefaultExport
              name="contactMessage"
              placeholder="Type your message here..."
              required={true}
              maxchars={200}
              updateon="blur"
              listener={createListener("message")}
            />
          </Box>
          <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="subtitle2" mb={1}>
              Form Data:
            </Typography>
            <Typography variant="body2">Name: {formData.name || "(empty)"}</Typography>
            <Typography variant="body2">Email: {formData.email || "(empty)"}</Typography>
            <Typography variant="body2">Phone: {formData.phone || "(empty)"}</Typography>
            <Typography variant="body2">Message: {formData.message || "(empty)"}</Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
};

export const SearchBar: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setSearchTerm(data.datavalue);
        setSearching(true);
        setTimeout(() => setSearching(false), 1000);
      },
    };

    return (
      <Box style={{ padding: 16, maxWidth: 600 }}>
        <Typography variant="h6" mb={2}>
          Search Bar with Debounce
        </Typography>
        <TextDefaultExport
          name="searchBar"
          placeholder="Search products, categories, or brands..."
          updateon="keypress"
          updatedelay="500"
          listener={customListener}
        />
        <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
          <Typography variant="body2" color="text.secondary">
            Search Term: <strong>{searchTerm || "(empty)"}</strong>
          </Typography>
          <Typography variant="body2" color={searching ? "primary" : "text.secondary"}>
            Status: {searching ? "Searching..." : "Idle"}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const PaymentForm: Story = {
  render: () => {
    const [paymentData, setPaymentData] = useState({
      cardNumber: "",
      cvv: "",
      ssn: "",
    });

    const createListener = (field: string) => ({
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setPaymentData(prev => ({ ...prev, [field]: data.datavalue }));
      },
    });

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={3}>
          Payment Information
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Card Number *
            </Typography>
            <TextDefaultExport
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              displayformat="9999 9999 9999 9999"
              showdisplayformaton="keypress"
              maxchars={16}
              required={true}
              listener={createListener("cardNumber")}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              CVV *
            </Typography>
            <TextDefaultExport
              name="cvv"
              placeholder="123"
              type="password"
              maxchars={3}
              required={true}
              listener={createListener("cvv")}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              SSN (Last 4 digits) *
            </Typography>
            <TextDefaultExport
              name="ssn"
              placeholder="000-00-0000"
              displayformat="999-99-9999"
              showdisplayformaton="keypress"
              maxchars={9}
              required={true}
              listener={createListener("ssn")}
            />
          </Box>
          <Box mt={2} p={2} bgcolor="#e3f2fd" borderRadius={1}>
            <Typography variant="caption" color="primary" display="block" mb={1}>
              🔒 Secure Payment Information
            </Typography>
            <Typography variant="body2" fontSize="0.8rem">
              Card: {paymentData.cardNumber || "Not entered"}
            </Typography>
            <Typography variant="body2" fontSize="0.8rem">
              CVV: {paymentData.cvv ? "***" : "Not entered"}
            </Typography>
            <Typography variant="body2" fontSize="0.8rem">
              SSN: {paymentData.ssn || "Not entered"}
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
};

export const UsernameValidator: Story = {
  render: () => {
    const [username, setUsername] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const customListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        const value = data.datavalue;
        setUsername(value);

        // Username rules: 3-20 characters, alphanumeric and underscore only
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        setIsValid(usernameRegex.test(value));
      },
    };

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Username Validator
        </Typography>
        <TextDefaultExport
          name="usernameValidator"
          placeholder="Enter username"
          regexp="^[a-zA-Z0-9_]{3,20}$"
          maxchars={20}
          updateon="keypress"
          updatedelay="300"
          listener={customListener}
        />
        <Box mt={2}>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Rules:
          </Typography>
          <Typography variant="body2" fontSize="0.85rem" color="text.secondary">
            • 3-20 characters
          </Typography>
          <Typography variant="body2" fontSize="0.85rem" color="text.secondary">
            • Letters, numbers, and underscore only
          </Typography>
          <Typography variant="body2" fontSize="0.85rem" color="text.secondary">
            • No spaces or special characters
          </Typography>
        </Box>
        {username && (
          <Box mt={2} p={2} bgcolor={isValid ? "#e8f5e9" : "#ffebee"} borderRadius={1}>
            <Typography variant="body2" color={isValid ? "success.main" : "error.main"}>
              {isValid ? "✓ Username is valid!" : "✗ Username is invalid"}
            </Typography>
          </Box>
        )}
      </Box>
    );
  },
};

export const PriceInput: Story = {
  render: () => {
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const priceListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setPrice(parseFloat(data.datavalue) || 0);
      },
    };

    const quantityListener = {
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setQuantity(parseInt(data.datavalue) || 1);
      },
    };

    const total = (price * quantity).toFixed(2);

    return (
      <Box style={{ padding: 16, maxWidth: 400 }}>
        <Typography variant="h6" mb={3}>
          Price Calculator
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Price per Item ($)
            </Typography>
            <TextDefaultExport
              name="priceInput"
              placeholder="0.00"
              type="number"
              step={0.01}
              minvalue={0}
              updateon="keypress"
              listener={priceListener}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Quantity
            </Typography>
            <TextDefaultExport
              name="quantityInput"
              placeholder="1"
              type="number"
              step={1}
              minvalue={1}
              maxvalue={999}
              updateon="keypress"
              listener={quantityListener}
            />
          </Box>
          <Box mt={2} p={3} bgcolor="#1976d2" borderRadius={1}>
            <Typography variant="h4" color="white" textAlign="center">
              ${total}
            </Typography>
            <Typography variant="body2" color="white" textAlign="center" mt={1}>
              Total Amount
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
};

export const AddressForm: Story = {
  render: () => {
    const [address, setAddress] = useState({
      street: "",
      city: "",
      state: "",
      zip: "",
    });

    const createListener = (field: string) => ({
      appLocale: { LABEL_ICON: "Icon" },
      Widgets: {},
      onChange: (name: string, data: any) => {
        setAddress(prev => ({ ...prev, [field]: data.datavalue }));
      },
    });

    return (
      <Box style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h6" mb={3}>
          Shipping Address
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Street Address *
            </Typography>
            <TextDefaultExport
              name="street"
              placeholder="123 Main Street"
              required={true}
              autocapitalize="words"
              listener={createListener("street")}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" mb={1}>
              City *
            </Typography>
            <TextDefaultExport
              name="city"
              placeholder="New York"
              required={true}
              autocapitalize="words"
              listener={createListener("city")}
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <Typography variant="caption" color="text.secondary" mb={1}>
                State *
              </Typography>
              <TextDefaultExport
                name="state"
                placeholder="NY"
                maxchars={2}
                required={true}
                listener={createListener("state")}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="caption" color="text.secondary" mb={1}>
                ZIP Code *
              </Typography>
              <TextDefaultExport
                name="zip"
                placeholder="10001"
                maxchars={5}
                regexp="^[0-9]{5}$"
                required={true}
                listener={createListener("zip")}
              />
            </Box>
          </Stack>
          <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="subtitle2" mb={1}>
              Shipping Address:
            </Typography>
            <Typography variant="body2">
              {address.street || "Street not entered"}
            </Typography>
            <Typography variant="body2">
              {address.city && address.state && address.zip
                ? `${address.city}, ${address.state} ${address.zip}`
                : "City, State, ZIP not entered"}
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  },
};
