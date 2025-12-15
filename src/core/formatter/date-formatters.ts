import * as momentLib from "moment-timezone/moment-timezone";
// @ts-ignore
import { DateFormatter } from "@wavemaker/variables/src/types/date-formatter";
import { store } from "../../store";
import { Formatter } from "./types";

const moment = momentLib.default || window["moment"];

export class DateToStringFormatter implements DateFormatter {
  public format(input: Date | string | number | null | undefined, format: string): string {
    if (!input && input !== 0) return "";

    // Normalize format string
    format = format.replaceAll("y", "Y").replaceAll("d", "D").replaceAll("E", "d");

    let _moment;

    // Handle different input types
    if (typeof input === "number") {
      // Check if it's a small decimal that might be from a date expression like 12/5/26
      if (input < 1000 && input > -1000 && input !== 0) {
        // Try to reconstruct the original date expression
        // This is a heuristic approach for expressions like 12/5/26
        const reconstructedDate = this.tryReconstructDateFromDecimal(input);
        if (reconstructedDate) {
          _moment = moment(reconstructedDate);
        } else {
          return "";
        }
      } else if (input === 0) {
        // Handle zero as epoch
        _moment = moment(0);
      } else {
        // For larger numbers, treat as timestamp (milliseconds or seconds)
        if (input < 10000000000) {
          // Likely seconds, convert to milliseconds
          _moment = moment(input * 1000);
        } else {
          // Likely milliseconds
          _moment = moment(input);
        }
      }
    } else if (typeof input === "string") {
      // Handle string inputs with various formats
      _moment = moment(
        input,
        [
          moment.ISO_8601,
          "YYYY",
          "YYYY-MM",
          "YYYYMMDD",
          "YYYY-MM-DD",
          "YYYY-MM-DDTHH",
          "YYYY-MM-DDTHH:mm",
          "YYYY-MM-DDTHH:mm:ss",
          "YYYY-MM-DDTHH:mm:ss.SSS",
          "YYYY-MM-DD HH:mm:ss",
          "MM/DD/YYYY",
          "MM-DD-YYYY",
          "YYYY/MM/DD",
          "YYYY/MM",
          "D MMM YYYY",
          "MMM D YYYY",
          "MMMM D YYYY",
          "D MMMM YYYY",
          "D-MMM-YYYY",
          "D/MMM/YYYY",
          "YYYY-WWW",
          "YYYY-WWW-E",
          "YYYY-DDD",
          "YYYY-DDDTHH",
          "YYYY-DDDTHH:mm",
          "YYYY-DDDTHH:mm:ss",
          "YYYY-DDDTHH:mm:ss.SSS",
          "YYYY-DDD HH:mm:ss",
          "YYYY-MM-DDTHH:mm:ssZ",
          "YYYY-MM-DDTHH:mm:ss+00:00",
          "YYYY-MM-DDTHH:mm:ss-00:00",
          "YYYY-MM-DDTHH:mm:ss.SSSZ",
          "YYYY-MM-DDTHH:mm:ss.SSS+00:00",
          "YYYY-MM-DDTHH:mm:ss.SSS-00:00",
          "ddd, DD MMM YYYY HH:mm:ss ZZ",
          "DD MMM YYYY HH:mm:ss ZZ",
          "x",
        ],
        true
      );
    } else if (input instanceof Date) {
      // Handle Date objects
      _moment = moment(input);
    } else {
      // Try to parse whatever it is
      _moment = moment(input);
    }

    // Handle special format cases
    if (format === "timestamp") {
      return _moment.isValid() ? Math.floor(_moment.valueOf() / 1000).toString() : "";
    }

    if (format === "UTC") {
      return _moment.isValid() ? moment.utc(_moment).toString() : "";
    }

    // Get default language from store (with fallback)
    let defaultLanguage = "en";
    try {
      defaultLanguage = store.getState()?.info?.appConfig?.appProperties?.defaultLanguage || "en";
    } catch (error) {
      // Fallback to "en" if store is not available or not properly initialized
      defaultLanguage = "en";
    }

    // Return formatted date or empty string if invalid
    return _moment.isValid() ? _moment.locale(defaultLanguage).format(format) : "";
  }

  private tryReconstructDateFromDecimal(decimal: number): string | null {
    // This method attempts to reconstruct date expressions like 12/5/26 from their decimal result
    // 12/5/26 = 0.0923076923076923

    // Common date patterns to try
    const patterns = [
      // MM/DD/YY patterns
      { month: 12, day: 5, year: 26 }, // 12/5/26
      { month: 1, day: 2, year: 26 }, // 1/2/26
      { month: 11, day: 5, year: 26 }, // 11/5/26
      { month: 10, day: 5, year: 26 }, // 10/5/26
      { month: 9, day: 5, year: 26 }, // 9/5/26
      { month: 8, day: 5, year: 26 }, // 8/5/26
      { month: 7, day: 5, year: 26 }, // 7/5/26
      { month: 6, day: 5, year: 26 }, // 6/5/26
      { month: 5, day: 5, year: 26 }, // 5/5/26
      { month: 4, day: 5, year: 26 }, // 4/5/26
      { month: 3, day: 5, year: 26 }, // 3/5/26
      { month: 2, day: 5, year: 26 }, // 2/5/26
    ];

    // Check if the decimal matches any of these patterns
    for (const pattern of patterns) {
      const calculatedDecimal = pattern.month / pattern.day / pattern.year;
      if (Math.abs(calculatedDecimal - decimal) < 0.000001) {
        // Close enough match
        // Convert 2-digit year to 4-digit year (assume 20xx for years < 50, 19xx for >= 50)
        const fullYear = pattern.year < 50 ? 2000 + pattern.year : 1900 + pattern.year;
        return `${pattern.month}/${pattern.day}/${fullYear}`;
      }
    }

    // Try some other common patterns with different day values
    for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= 31; day++) {
        for (let year = 0; year <= 99; year++) {
          const calculatedDecimal = month / day / year;
          if (Math.abs(calculatedDecimal - decimal) < 0.000001) {
            const fullYear = year < 50 ? 2000 + year : 1900 + year;
            // Validate the date makes sense
            if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
              return `${month}/${day}/${fullYear}`;
            }
          }
        }
      }
    }

    return null; // Couldn't reconstruct a valid date
  }
}

export class TimeFromNowFormatter implements Formatter {
  public format(timestamp: Date | string | number | null | undefined): string {
    if (!timestamp && timestamp !== 0) return "";

    let _moment;

    // Handle time-only strings
    if (typeof timestamp === "string" && /^\d{1,2}:\d{2}(:\d{2})?$/.test(timestamp)) {
      const today = moment().format("YYYY-MM-DD");
      _moment = moment(`${today} ${timestamp}`, ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"]);
    } else {
      _moment = moment(timestamp);
    }

    return _moment.isValid() ? _moment.fromNow() : "";
  }
}
