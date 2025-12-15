// Export all types
export * from "./types";

// Export all formatters
export * from "./date-formatters";
export * from "./number-formatters";
export * from "./string-formatters";
export * from "./security-formatters";

// Import all formatter classes for registry
import { DateToStringFormatter, TimeFromNowFormatter } from "./date-formatters";
import {
  NumberToStringFormatter,
  CurrencyFormatter,
  StringToNumberFormatter,
  ToNumberFormatter,
  TrailingZeroDecimalFormatter,
} from "./number-formatters";
import { PrependFormatter, AppendFormatter, TemplateReplaceFormatter } from "./string-formatters";
import { TrustAsFormatter, SanitizeFormatter } from "./security-formatters";
import { Formatter } from "./types";

// Formatter creation helper
export const createFormatter = (name: string, formatter: Formatter) => {
  return {
    name,
    formatter,
    format: (...args: any[]) => formatter.format(...args),
  };
};

// Create formatter instances and registry
const formatters = new Map<string, Formatter>([
  // Date formatters
  ["toDate", createFormatter("toDate", new DateToStringFormatter())],
  ["timeFromNow", createFormatter("timeFromNow", new TimeFromNowFormatter())],

  // Number formatters
  ["numberToString", createFormatter("numberToString", new NumberToStringFormatter())],
  ["toCurrency", createFormatter("toCurrency", new CurrencyFormatter())],
  ["stringToNumber", createFormatter("stringToNumber", new StringToNumberFormatter())],
  ["toNumber", createFormatter("toNumber", new ToNumberFormatter())],
  [
    "trailingZeroDecimal",
    createFormatter("trailingZeroDecimal", new TrailingZeroDecimalFormatter()),
  ],

  // String formatters
  ["prefix", createFormatter("prefix", new PrependFormatter())],
  ["suffix", createFormatter("suffix", new AppendFormatter())],
  ["templateReplace", createFormatter("templateReplace", new TemplateReplaceFormatter())],

  // Security formatters
  ["trustAs", createFormatter("trustAs", new TrustAsFormatter())],
  ["sanitize", createFormatter("sanitize", new SanitizeFormatter())],
]);

// Export the formatters registry
export default formatters;

// Export utility functions
export const getFormatter = (name: string): Formatter | undefined => {
  return formatters.get(name);
};

export const hasFormatter = (name: string): boolean => {
  return formatters.has(name);
};

export const registerFormatter = (name: string, formatter: Formatter): void => {
  formatters.set(name, createFormatter(name, formatter));
};

export const unregisterFormatter = (name: string): boolean => {
  return formatters.delete(name);
};

export const getAllFormatterNames = (): string[] => {
  return Array.from(formatters.keys());
};

export const formatValue = (value: any, formatterName: string, ...args: any[]): any => {
  const formatter = getFormatter(formatterName);
  if (formatter) {
    return formatter.format(value, ...args);
  }
  console.warn(`Formatter "${formatterName}" not found`);
  return value;
};
