import parseInt from "lodash-es/parseInt";
import CURRENCY_INFO, { Currency } from "../constants/currency-constant";
import appstore from "../appstore";
import { Formatter } from "./types";

export class NumberToStringFormatter implements Formatter {
  public format(input: number, fractionSize: number): string {
    const i18nService = appstore.I18nService.get();
    const selectedLocale = i18nService.getSelectedLocale();
    let formatCurrency = new Intl.NumberFormat(selectedLocale, {
      minimumFractionDigits: fractionSize,
      maximumFractionDigits: fractionSize,
    });
    return isNaN(input) ? "" : formatCurrency.format(input);
  }
}

export class CurrencyFormatter implements Formatter {
  public format(data: number, currencySymbol: string, fracSize: number) {
    const _currencySymbol =
      (((CURRENCY_INFO as any)[currencySymbol] || {}) as Currency).symbol || currencySymbol || "";
    let _val = new NumberToStringFormatter().format(data || 0, fracSize);
    const isNegativeNumber = _val.startsWith("-");
    if (isNegativeNumber) {
      _val = _val.replace("-", "");
    }
    return _val ? (isNegativeNumber ? "-" + _currencySymbol + _val : _currencySymbol + _val) : "";
  }
}

export class StringToNumberFormatter implements Formatter {
  public format(input: string) {
    return parseInt(input);
  }
}

export class ToNumberFormatter implements Formatter {
  public format(data: any, fracSize?: string | number): string {
    if (isNaN(+data)) {
      return "";
    }

    let fractionFormat = fracSize;

    // Handle fraction size format conversion
    if (fracSize && !String(fracSize).match(/^(\d+)?\.((\d+)(-(\d+))?)?$/)) {
      fractionFormat = "1." + fracSize + "-" + fracSize;
    }

    try {
      // Parse fraction format if it's a string like "1.2-4"
      let minimumFractionDigits = 0;
      let maximumFractionDigits = 3;

      if (typeof fractionFormat === "string" && fractionFormat.includes(".")) {
        const parts = fractionFormat.split(".");
        if (parts[1]) {
          const fractionParts = parts[1].split("-");
          minimumFractionDigits = parseInt(fractionParts[0]) || 0;
          maximumFractionDigits = parseInt(fractionParts[1]) || minimumFractionDigits;
        }
      } else if (typeof fractionFormat === "number") {
        minimumFractionDigits = maximumFractionDigits = fractionFormat;
      }

      const i18nService = appstore.I18nService.get();
      const selectedLocale = i18nService.getSelectedLocale();

      return new Intl.NumberFormat(selectedLocale, {
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(+data);
    } catch (error) {
      // Fallback to simple number formatting
      const num = +data;
      if (typeof fracSize === "number") {
        return num.toFixed(fracSize);
      }
      return num.toString();
    }
  }
}

export class TrailingZeroDecimalFormatter implements Formatter {
  public format(
    value: number,
    selectedLocale?: string,
    numberFilter?: string,
    localeFilter?: any,
    trailingZero?: boolean,
    decimalValue?: string,
    skipTrailingZeroCheck?: boolean,
    formattedLocale?: any
  ): string {
    const finalNumberFilter =
      trailingZero && !skipTrailingZeroCheck ? `1.${decimalValue?.length || 0}-16` : numberFilter;

    const locale = formattedLocale ? formattedLocale["number"] : undefined;
    const finalLocale = localeFilter || locale || selectedLocale || "en";

    try {
      // Parse the number filter format
      let minimumFractionDigits = 0;
      let maximumFractionDigits = 3;

      if (
        finalNumberFilter &&
        typeof finalNumberFilter === "string" &&
        finalNumberFilter.includes(".")
      ) {
        const parts = finalNumberFilter.split(".");
        if (parts[1]) {
          const fractionParts = parts[1].split("-");
          minimumFractionDigits = parseInt(fractionParts[0]) || 0;
          maximumFractionDigits = parseInt(fractionParts[1]) || minimumFractionDigits;
        }
      }

      return new Intl.NumberFormat(finalLocale, {
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(value);
    } catch (error) {
      // Fallback formatting
      return value.toString();
    }
  }
}
