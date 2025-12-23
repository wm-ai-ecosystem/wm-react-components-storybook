export const getDecimalCount = (
  format: string,
  DECIMAL_COUNT_MAP: Record<string, number>
): number => {
  return DECIMAL_COUNT_MAP[format] || 0;
};

export const isPercentageValue = (value: string): boolean => {
  return value.includes("%");
};

export const findValueOf = (datum: any, key: string): any => {
  return datum[key] !== undefined ? datum[key] : datum;
};

export const parseNumber = (val: string): number => {
  return Number.parseFloat(val) || NaN;
};

export const formatFinancialValue = (value: string, decimalplaces: number): string => {
  const numericValue = value.replace(/[^\d]/g, "");
  if (!numericValue) return "";
  const num = Number.parseInt(numericValue, 10) / Math.pow(10, decimalplaces);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalplaces,
    maximumFractionDigits: decimalplaces,
  }).format(num);
};

export const formatNumberWithCommas = (
  value: string | number,
  trailingzero?: boolean,
  decimalplaces?: number
): string => {
  if (!value && value !== 0) return "";

  if (trailingzero && typeof value === "string") {
    // When trailingzero is true, preserve the original string format
    const num = Number(value.replace(/,/g, ""));
    if (isNaN(num)) return "";

    // If the string has decimal places, preserve them with commas in integer part
    if (value.includes(".")) {
      const [intPart, decPart] = value.split(".");
      const intWithCommas = new Intl.NumberFormat("en-US").format(Number(intPart));
      return `${intWithCommas}.${decPart}`;
    } else {
      return new Intl.NumberFormat("en-US").format(num);
    }
  }

  const num = typeof value === "string" ? Number(value.toString().replace(/,/g, "")) : value;
  if (isNaN(num)) return "";

  if (trailingzero && decimalplaces !== undefined && decimalplaces > 0) {
    // Show trailing zeros with specified decimal places
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalplaces,
      maximumFractionDigits: decimalplaces,
    }).format(num);
  } else {
    return new Intl.NumberFormat("en-US").format(num);
  }
};

export const getValueInRange = (value: number, minvalue: number, maxvalue: number): number => {
  if (!isNaN(minvalue as number) && value < minvalue) {
    return minvalue;
  }
  if (!isNaN(maxvalue as number) && value > maxvalue) {
    return maxvalue;
  }
  return value;
};

// Helper function to round value based on step decimal places
export const roundToStep = (value: number, step: number, decimalplaces: number): number => {
  if (step === 0) return value;

  const stepDecimals = step.toString().includes(".")
    ? step.toString().split(".")[1]?.length || 0
    : 0;
  const factor = Math.pow(10, Math.max(stepDecimals, decimalplaces));
  return Math.round(value * factor) / factor;
};

// Handle step value calculation for increment/decrement operations
export const handleStepValue = (
  currentValue: number | null | undefined,
  direction: "UP" | "DOWN",
  step: number,
  decimalplaces: number,
  minvalue?: number,
  maxvalue?: number
): number => {
  if (step === 0) {
    return currentValue || 0;
  }

  // Calculate new value based on step
  let newValue: number;
  if (currentValue === null || currentValue === undefined || isNaN(currentValue)) {
    newValue = getValueInRange(minvalue || 0, minvalue || 0, maxvalue || 0);
  } else {
    const stepAmount = direction === "UP" ? step : -step;
    newValue = getValueInRange(currentValue + stepAmount, minvalue || 0, maxvalue || 0);
  }

  // Round to appropriate decimal places
  return roundToStep(newValue, step, decimalplaces);
};

// Common validation function for both currency and number widgets
export const validateNumericValue = (
  value: string | number | null,
  required: boolean,
  minvalue?: number,
  maxvalue?: number,
  regexp?: string
): { isValid: boolean; message: string } => {
  if ((value === undefined || value === null) && required) {
    return { isValid: false, message: "This field is required" };
  }

  const numValue = typeof value === "string" ? parseNumber(value) : value;

  if ((numValue === undefined || numValue === null) && required) {
    return { isValid: false, message: "This field is required" };
  }

  if (numValue === undefined || numValue === null) {
    return { isValid: !required, message: required ? "This field is required" : "" };
  }

  // Regex validation (mainly for number widget)
  if (regexp && !RegExp(regexp).test(numValue.toString())) {
    return { isValid: false, message: "Invalid number format" };
  }

  if (minvalue !== undefined && numValue < minvalue) {
    return { isValid: false, message: `Value must be at least ${minvalue}` };
  }

  if (maxvalue !== undefined && numValue > maxvalue) {
    return { isValid: false, message: `Value must not exceed ${maxvalue}` };
  }

  return { isValid: true, message: "" };
};

// Common input change handler for both widgets
export const handleNumericInputChange = (
  inputValue: string,
  inputmode: string,
  decimalplaces: number,
  setRawInputValue: (value: string) => void
): { inputValue: string; newVal: number | null } => {
  let processedInputValue = inputValue;
  let newVal: number | null;

  if (inputmode === "financial") {
    const digitsOnly = inputValue.replace(/[^\d]/g, "");

    if (digitsOnly === "") {
      processedInputValue = "";
      newVal = null;
      setRawInputValue("");
    } else {
      const divisor = Math.pow(10, decimalplaces);
      newVal = parseInt(digitsOnly) / divisor;

      if (decimalplaces > 0) {
        processedInputValue = newVal.toFixed(decimalplaces);
      } else {
        processedInputValue = newVal.toString();
      }
      setRawInputValue(processedInputValue);
    }
  } else {
    // Basic validation for decimal input
    if (decimalplaces > 0) {
      // Allow digits, one dot, and basic decimal formatting
      const cleanValue = inputValue.replace(/[^\d.-]/g, "");
      const dotCount = (cleanValue.match(/\./g) || []).length;

      // Prevent multiple dots
      if (dotCount > 1) {
        return { inputValue, newVal: null };
      }

      // Prevent decimal places beyond the limit
      const [intPart, decPart = ""] = cleanValue.split(".");
      if (decPart && decPart.length > decimalplaces) {
        return { inputValue, newVal: null };
      }

      processedInputValue = cleanValue;
    }

    // Remove commas for processing but keep original input for display
    const cleanValue = processedInputValue.replace(/,/g, "");

    if (cleanValue === "" || cleanValue === "-") {
      newVal = null;
      setRawInputValue(cleanValue);
    } else {
      // Convert to number for validation and calculations
      newVal = Number(cleanValue);

      if (isNaN(newVal)) {
        return { inputValue, newVal: null };
      }

      // Store raw input value to preserve trailing zeros
      setRawInputValue(cleanValue);
    }

    // Don't format during typing - keep original input
    processedInputValue = inputValue;
  }

  return { inputValue: processedInputValue, newVal };
};

// Common blur formatting function
export const formatOnBlur = (
  datavalue: number | null,
  rawInputValue: string,
  trailingzero: boolean,
  decimalplaces: number
): string => {
  if (datavalue !== null) {
    if (trailingzero) {
      // Use the raw input value to preserve trailing zeros
      return formatNumberWithCommas(rawInputValue, trailingzero, decimalplaces);
    } else {
      return formatNumberWithCommas(datavalue);
    }
  }
  return "";
};

// Common validated value update function
export const handleValidatedValueUpdate = (
  value: number | null,
  name: string | undefined,
  inputElCurrent: HTMLInputElement | null,
  onChangeProp:
    | ((
        event: React.ChangeEvent<HTMLInputElement>,
        widget?: any,
        newValue?: number | null,
        oldValue?: number | null
      ) => void)
    | undefined,
  listenerProp:
    | {
        onChange?: (
          name: string | undefined,
          widgetData: { datavalue: string; [key: string]: any }
        ) => void;
        Widgets?: Record<string, any>;
      }
    | undefined,
  prevDatavalueState: number | null,
  setPrevDatavalueState: React.Dispatch<React.SetStateAction<number | null>>,
  widgetProps?: any
) => {
  const stringifiedValue = value === null ? "" : value.toString();
  const widgetInfo = name && listenerProp?.Widgets ? listenerProp.Widgets[name] : undefined;

  if (onChangeProp) {
    const syntheticEvent = {
      target: { value: stringifiedValue, name },
      currentTarget: inputElCurrent,
    } as React.ChangeEvent<HTMLInputElement>;
    onChangeProp(syntheticEvent, widgetInfo || widgetProps, value, prevDatavalueState);
  }

  if (listenerProp?.onChange) {
    listenerProp.onChange(name, {
      ...(widgetInfo || {}),
      datavalue: stringifiedValue,
    });
  }
  setPrevDatavalueState(value);
};
