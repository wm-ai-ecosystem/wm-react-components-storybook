import { useCallback, useMemo } from "react";
import moment from "moment-timezone";

// Constants
export const DATE_FORMAT_MAPPING: Record<string, string> = {
  EEEE: "dddd", // Full weekday name
  EEE: "ddd", // Short weekday name
  EE: "dd", // Two-letter weekday
  E: "d", // Single letter weekday
  MMMM: "MMMM", // Full month name
  MMM: "MMM", // Short month name
  MM: "MM", // Two digit month
  M: "M", // Single digit month
  dd: "DD", // Two digit day
  d: "D", // Single digit day
  yyyy: "YYYY", // Four digit year
  yy: "YY", // Two digit year
  y: "YYYY", // Year (default to 4 digits)
} as const;

// Utility Functions
export const createFormatTokenRegex = (): RegExp => {
  const tokens = Object.keys(DATE_FORMAT_MAPPING)
    .sort((a, b) => b.length - a.length)
    .map(token => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  return new RegExp(`(${tokens})`, "g");
};

export const convertToMomentFormat = (pattern: string): string => {
  if (pattern === "timestamp") return pattern;

  const regex = createFormatTokenRegex();
  return pattern.replace(regex, match => DATE_FORMAT_MAPPING[match] || match);
};

export const formatDate = (date: Date | string | null, pattern: string): string => {
  if (!date) return "";

  if (pattern === "timestamp") {
    return moment(date).valueOf().toString();
  }

  const momentDate = moment(date);
  if (!momentDate.isValid()) return "";

  const momentPattern = convertToMomentFormat(pattern);
  return momentDate.format(momentPattern);
};

export const parseExcludedDays = (excludedays: string): number[] => {
  if (!excludedays) return [];

  return excludedays
    .split(",")
    .map(day => parseInt(day.trim(), 10))
    .filter(day => !isNaN(day) && day >= 0 && day <= 6);
};

export const parseExcludedDates = (
  excludedates: string | string[],
  getDateObj: (date: any) => Date | null
): Date[] => {
  if (!excludedates) return [];

  const dates = Array.isArray(excludedates) ? excludedates : excludedates.split(",");
  return dates.map(date => getDateObj(date)).filter((date): date is Date => date !== null);
};

export const defaultGetDateObj = (date: any): Date | null => {
  if (!date) return null;
  if (date instanceof Date) return date;

  if (typeof date === "string") {
    const parsedDate = moment(date).toDate();
    return isNaN(parsedDate.getTime()) ? new Date(date) : parsedDate;
  }

  return null;
};

export const getWidthStyle = (width?: string | number) => {
  if (!width) return {};

  if (typeof width === "number") {
    return { width: `${width}px` };
  }

  if (typeof width === "string") {
    if (/[%px]|em|rem/.test(width) || !isNaN(Number(width))) {
      return { width: isNaN(Number(width)) ? width : `${width}px` };
    }
    return { width };
  }

  return {};
};
