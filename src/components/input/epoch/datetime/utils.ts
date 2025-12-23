import moment from "moment-timezone";
import { TimeView } from "@mui/x-date-pickers";

// Utility to ensure a date has a time component (otherwise use current time)
export function ensureTime(date: Date | null): Date | null {
  if (!date) return null;
  const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0;
  if (hasTime) return date;
  const now = new Date();
  const withTime = new Date(date);
  withTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
  return withTime;
}

// Utility to map custom date patterns to moment.js patterns
export function mapToMomentPattern(pattern: string): string {
  return pattern
    .replace(/\byyyy\b/g, "YYYY")
    .replace(/\bEEEE\b/g, "dddd")
    .replace(/\bEEE\b/g, "ddd")
    .replace(/\bMMMM\b/g, "MMMM")
    .replace(/\bMMM\b/g, "MMM")
    .replace(/\byy\b/g, "YY")
    .replace(/\bdd\b/g, "DD")
    .replace(/\bd\b/g, "D")
    .replace(/\bMM\b/g, "MM")
    .replace(/\bM\b/g, "M")
    .replace(/\bHH\b/g, "HH")
    .replace(/\bH\b/g, "H")
    .replace(/\bhh\b/g, "hh")
    .replace(/\bh\b/g, "h")
    .replace(/\bmm\b/g, "mm")
    .replace(/\bm\b/g, "m")
    .replace(/\bss\b/g, "ss")
    .replace(/\ba\b/g, "A")
    .replace(/\bZ\b/g, "ZZ");
}

// Get timezone utility
export function getTimezone(): string {
  return moment.tz.guess();
}

// Width style helper
export function getWidthStyle(width?: string | number) {
  if (!width) return "";
  if (typeof width === "number") return `${width}px`;
  // Check if string contains only numeric characters
  if (typeof width === "string" && /^\d+$/.test(width)) {
    return `${width}px`;
  }
  return width;
}

// Parse min/max dates with CURRENT_DATE support
export function parseDateWithCurrent(
  dateValue: string | Date | null | undefined,
  mode: "min" | "max"
): Date | null {
  if (!dateValue) return null;
  if (dateValue === "CURRENT_DATE") {
    return mode === "min" ? moment().startOf("day").toDate() : moment().endOf("day").toDate();
  }
  try {
    return typeof dateValue === "string" ? moment(dateValue).toDate() : dateValue;
  } catch (error) {
    console.warn(`Error parsing ${mode}date:`, error);
    return null;
  }
}

// Parse excluded days array
export function parseExcludedDays(excludedays: string | null | undefined): number[] {
  if (!excludedays) return [];
  return excludedays.split(",").map(day => parseInt(day.trim(), 10));
}

// Parse excluded dates array
export function parseExcludedDates(
  excludedates: string | string[] | Date[] | null | undefined
): Date[] {
  if (!excludedates) return [];
  if (typeof excludedates === "string") {
    return excludedates.split(",").map(date => moment(date.trim()).toDate());
  }
  if (Array.isArray(excludedates)) {
    return excludedates.map(date => {
      if (typeof date === "string") {
        return moment(date).toDate();
      }
      return moment(date).toDate();
    });
  }
  return [];
}

// Format date utility
export function formatDate(date: Date | null, pattern: string, timezone?: string): string {
  if (!date) return "";
  if (pattern === "timestamp") {
    return date.getTime().toString();
  }
  if (pattern === "UTC") {
    return date.toISOString();
  }
  try {
    const momentPattern = mapToMomentPattern(pattern)
      .replaceAll("y", "Y")
      .replaceAll("d", "D")
      .replaceAll("a", "A");
    const tz = timezone || getTimezone();
    return moment(date).tz(tz).format(momentPattern);
  } catch (error) {
    console.warn("Date formatting error:", error);
    const tz = timezone || getTimezone();
    return moment(date).tz(tz).format(mapToMomentPattern(pattern));
  }
}

// Parse date value utility
export function parseDateValue(datavalue: any, datepattern: string): Date | null {
  if (!datavalue) return null;

  if (datavalue instanceof Date) {
    return datavalue;
  } else if (typeof datavalue === "string" || typeof datavalue === "number") {
    // Convert to string for consistent processing
    const valueStr = String(datavalue);

    if (/^\d+$/.test(valueStr)) {
      // Timestamp - handle both seconds and milliseconds
      const numValue = Number(valueStr);
      let m;

      // If timestamp is in seconds (less than 13 digits), convert to milliseconds
      if (valueStr.length <= 10) {
        m = moment(numValue * 1000);
      } else {
        m = moment(numValue);
      }

      return m.isValid() ? m.toDate() : null;
    } else if (datepattern === "UTC") {
      // UTC ISO string
      const m = moment.utc(valueStr);
      return m.isValid() ? m.toDate() : null;
    } else if (datepattern && datepattern !== "timestamp") {
      // Custom pattern - use the specific pattern for parsing
      const momentPattern = mapToMomentPattern(datepattern);
      let m = moment(valueStr, momentPattern, true); // strict parsing
      if (!m.isValid()) {
        // Try lenient parsing as fallback
        m = moment(valueStr);
      }
      return m && m.isValid() ? m.toDate() : null;
    } else {
      // Fallback
      const m = moment(valueStr);
      return m.isValid() ? m.toDate() : null;
    }
  }
  return null;
}

// Validate date utility
export function validateDate(
  date: Date | null,
  minDateObj: Date | null,
  maxDateObj: Date | null,
  excludedDaysArray: number[],
  excludedDatesArray: Date[]
): { isValid: boolean; isOutOfRange: boolean } {
  if (!date) return { isValid: true, isOutOfRange: false };

  // Check min/max date
  if (
    minDateObj &&
    moment(date).startOf("day").valueOf() < moment(minDateObj).startOf("day").valueOf()
  ) {
    return { isValid: false, isOutOfRange: true };
  }
  if (
    maxDateObj &&
    moment(date).startOf("day").valueOf() > moment(maxDateObj).startOf("day").valueOf()
  ) {
    return { isValid: false, isOutOfRange: true };
  }

  // Check excluded days
  const day = date.getDay();
  if (excludedDaysArray.includes(day)) {
    return { isValid: false, isOutOfRange: true };
  }

  // Check excluded dates
  const formattedDate = moment(date).startOf("day").valueOf();
  if (
    excludedDatesArray.some(
      excludedDate => moment(excludedDate).startOf("day").valueOf() === formattedDate
    )
  ) {
    return { isValid: false, isOutOfRange: true };
  }

  return { isValid: true, isOutOfRange: false };
}

// Should disable date function for DatePicker
export function shouldDisableDate(
  date: moment.Moment | null,
  excludedDaysArray: number[],
  excludedDatesArray: Date[]
): boolean {
  if (!date) return false;

  // Check excluded days
  const day = date.day();
  if (excludedDaysArray.includes(day)) return true;

  // Check excluded dates
  const dateTime = date.valueOf();
  return excludedDatesArray.some(
    excludedDate =>
      moment(excludedDate).startOf("day").valueOf() === moment(dateTime).startOf("day").valueOf()
  );
}

// Get time views based on date pattern
export function getTimeViews(datepattern: string): TimeView[] {
  const timeViews: TimeView[] = ["hours", "minutes"];
  if (datepattern.includes("s")) {
    timeViews.push("seconds");
  }
  return timeViews;
}
export function updateListener(
  name: string | undefined,
  listener: any,
  dateString: string,
  outputValue: string,
  props: any,
  onChange?: (event: React.SyntheticEvent, widget: any, newValue: any, oldValue: any) => void,
  oldValue?: string,
  timestampValue?: string
): void {
  // Update listener widget display value
  if (name && listener?.Widgets?.[name]) {
    listener.Widgets[name].displayValue = dateString;
  }

  if (onChange && name && listener?.Widgets?.[name]) {
    onChange(
      {} as React.SyntheticEvent,
      listener.Widgets[name],
      outputValue,
      listener.Widgets[name].datavalue
    );
  }
  // Update listener onChange
  if (listener?.onChange && !props.fieldName) {
    listener.onChange(name || "", {
      ...props,
      datavalue: outputValue,
      timestamp: timestampValue,
    });
  }
}
