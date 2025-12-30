import moment from "moment-timezone";
import { ValidationResult, TimeFormatOptions } from "./props";

export function parseTimeFormat(timepattern: string = "hh:mm a"): TimeFormatOptions {
  const hasSeconds = timepattern.toLowerCase().includes("s");
  const is12Hour = timepattern.includes("h");
  return {
    format: timepattern,
    hasSeconds,
    is12Hour,
  };
}

export function getSupportedTimeFormats(): string[] {
  return [
    "HH:mm:ss",
    "HH:mm",
    "H:mm:ss",
    "H:mm",
    "hh:mm:ss a",
    "hh:mm a",
    "h:mm:ss a",
    "h:mm a",
    "HH:mm:ss.SSS",
  ];
}

export function parseTimeValue(value: any, timepattern: string): moment.Moment | null {
  if (!value) return null;
  try {
    if (value === "CURRENT_TIME") {
      return moment();
    }
    if (typeof value === "number") {
      return moment(value);
    }
    if (value instanceof Date) {
      return moment(value);
    }
    if (typeof value === "string") {
      let parsed = moment(value, timepattern, true);
      if (parsed.isValid()) return parsed;
      const formats = getSupportedTimeFormats();
      for (const format of formats) {
        parsed = moment(value, format, true);
        if (parsed.isValid()) return parsed;
      }
      parsed = moment(value);
      if (parsed.isValid()) return parsed;
    }
    return null;
  } catch (error) {
    console.warn("Error parsing time value:", error);
    return null;
  }
}

export function formatDisplayTimeValue(
  value: Date | moment.Moment | null,
  pattern: string
): string {
  if (!value) return "";
  try {
    const momentObj = moment.isMoment(value) ? value : moment(value);
    if (pattern === "timestamp") {
      return momentObj.valueOf().toString();
    }
    return momentObj.isValid() ? momentObj.format(pattern) : "";
  } catch (error) {
    console.warn("Error formatting display value:", error);
    return "";
  }
}

export function validateTimeRange(
  timeValue: Date | moment.Moment | null,
  minTime?: Date | string | null,
  maxTime?: Date | string | null
): ValidationResult {
  if (!timeValue) return { isValid: true };
  try {
    const timeToCheck = moment.isMoment(timeValue) ? timeValue : moment(timeValue);
    if (!timeToCheck.isValid()) {
      return { isValid: false, errorType: "format", message: "Invalid time format" };
    }
    const timeToCheckMinutes = timeToCheck.hours() * 60 + timeToCheck.minutes();
    if (minTime) {
      const minMoment =
        typeof minTime === "string"
          ? moment(minTime, ["HH:mm", "H:mm", "hh:mm a", "h:mm a"], true)
          : moment(minTime);
      if (minMoment.isValid()) {
        const minMinutes = minMoment.hours() * 60 + minMoment.minutes();
        if (timeToCheckMinutes < minMinutes) {
          return {
            isValid: false,
            errorType: "mintime",
            message: `Time must be later than ${minMoment.format("HH:mm")}`,
          };
        }
      }
    }
    if (maxTime) {
      const maxMoment =
        typeof maxTime === "string"
          ? moment(maxTime, ["HH:mm", "H:mm", "hh:mm a", "h:mm a"], true)
          : moment(maxTime);
      if (maxMoment.isValid()) {
        const maxMinutes = maxMoment.hours() * 60 + maxMoment.minutes();
        if (timeToCheckMinutes > maxMinutes) {
          return {
            isValid: false,
            errorType: "maxtime",
            message: `Time must be earlier than ${maxMoment.format("HH:mm")}`,
          };
        }
      }
    }
    return { isValid: true };
  } catch (error) {
    console.warn("Error validating time range:", error);
    return { isValid: false, errorType: "format", message: "Validation error" };
  }
}

export function validateTimeFormat(
  inputValue: string,
  pattern: string,
  required: boolean
): ValidationResult {
  if (!inputValue.trim()) return { isValid: true };
  try {
    const parsed = moment(inputValue, pattern, true);
    if (!parsed.isValid() && required) {
      return {
        isValid: false,
        errorType: "format",
        message: `Invalid time format. Expected: ${pattern}`,
      };
    }
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      errorType: "format",
      message: "Invalid time format",
    };
  }
}

export function parseTimeObj(timeValue: string | Date | null | undefined): Date | null {
  if (!timeValue) return null;
  try {
    return typeof timeValue === "string"
      ? moment(timeValue, getSupportedTimeFormats(), true).toDate()
      : timeValue instanceof Date
        ? timeValue
        : null;
  } catch (error) {
    console.warn("Error parsing time object:", error);
    return null;
  }
}

// Constants
export const DEFAULT_CLASS = "input-group app-timeinput";
export const DEFAULT_TIMEPATTERN = "h:mm:ss a";
export const DEFAULT_OUTPUT_FORMAT = "HH:mm:ss";

// Styling constants
export const READONLY_STYLES = {
  cursor: "not-allowed",
};

export const TIME_PICKER_STYLES = {
  "& .MuiPaper-root": {
    background: "var(--wm-timepicker-background)",
    padding: "var(--wm-timepicker-padding)",
    borderRadius: "var(--wm-timepicker-border-radius)",
    width: "auto",
    boxShadow: "none",
  },
  "& .Mui-selected": {
    backgroundColor: "var(--wm-btn-secondary-background) !important",
    color: "var(--wm-btn-secondary-color) !important",
  },
  "& .Mui-selected:hover": {
    backgroundColor: "var(--wm-btn-secondary-background) !important",
    color: "var(--wm-btn-secondary-color) !important",
  },
};

export function updateListener(
  name: string | undefined,
  listener: any,
  props: any,
  displayValue: string,
  timestamp: string | null | undefined,
  datavalue: string | null | undefined
): void {
  // Update listener widget display value

  if (listener?.onChange && !props.fieldName) {
    listener.onChange(name || "", {
      ...props,
      displayValue: displayValue,
      timestamp: timestamp,
      datavalue: datavalue,
    });
  }
}

export function createWidgetEvent(args: {
  type: string;
  name?: string;
  value?: any;
  anchor?: HTMLElement | null;
  originalEvent?: React.SyntheticEvent | Event | undefined;
}): React.SyntheticEvent {
  const { type, name, value, anchor, originalEvent } = args;
  const base: any =
    originalEvent && typeof originalEvent === "object" ? { ...(originalEvent as any) } : {};
  const evt: any = base;

  if (!evt.type) {
    evt.type = type;
  }

  if (!evt.target && anchor) {
    evt.target = anchor;
  }
  if (!evt.currentTarget && anchor) {
    evt.currentTarget = anchor;
  }

  if (name !== undefined) evt.name = name;
  if (value !== undefined) evt.value = value;

  if (originalEvent) {
    evt.originalEvent = originalEvent;
  }

  return evt as React.SyntheticEvent;
}
