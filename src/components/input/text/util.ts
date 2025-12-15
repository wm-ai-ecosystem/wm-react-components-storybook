export const formatInput = (value: string, format: string): string => {
  if (!format || !value) return value;
  value = value.toString();
  const digitsOnly = value.replace(/\D/g, "");

  const formatDigits = format.replace(/[^9]/g, "");
  const maxDigits = formatDigits.length;

  if (format === "999-99-9999") {
    if (digitsOnly.length === 0) return "";
    let result = digitsOnly.substring(0, Math.min(3, digitsOnly.length));
    if (digitsOnly.length > 3) {
      result += "-" + digitsOnly.substring(3, Math.min(5, digitsOnly.length));
    }
    if (digitsOnly.length > 5) {
      result += "-" + digitsOnly.substring(5, Math.min(9, digitsOnly.length));
    }
    return result;
  }

  if (format === "(999) 999-9999") {
    if (digitsOnly.length === 0) return "";
    let result = "(" + digitsOnly.substring(0, Math.min(3, digitsOnly.length));
    if (digitsOnly.length > 3) {
      result += ") " + digitsOnly.substring(3, Math.min(6, digitsOnly.length));
    }
    if (digitsOnly.length > 6) {
      result += "-" + digitsOnly.substring(6, Math.min(10, digitsOnly.length));
    }
    return result;
  }

  if (format === "(999) 999-9999 ext. 999") {
    if (digitsOnly.length === 0) return "";
    let result = "(" + digitsOnly.substring(0, Math.min(3, digitsOnly.length));
    if (digitsOnly.length > 3) {
      result += ") " + digitsOnly.substring(3, Math.min(6, digitsOnly.length));
    }
    if (digitsOnly.length > 6) {
      result += "-" + digitsOnly.substring(6, Math.min(10, digitsOnly.length));
    }
    if (digitsOnly.length > 10) {
      result += " ext. " + digitsOnly.substring(10);
    }
    return result;
  }

  if (format === "(9?9?9?) 9?9?9?-9?9?9?9?9?9?") {
    let result = "";
    let areaCode = "";
    let prefix = "";
    let number = "";

    if (digitsOnly.length > 0) {
      areaCode = "(" + digitsOnly.substring(0, Math.min(3, digitsOnly.length));
      if (digitsOnly.length < 3) {
        return areaCode;
      }
      areaCode += ") ";
    }

    if (digitsOnly.length > 3) {
      prefix = digitsOnly.substring(3, Math.min(6, digitsOnly.length));
      if (digitsOnly.length < 6) {
        return areaCode + prefix;
      }
      prefix += "-";
    }

    if (digitsOnly.length > 6) {
      number = digitsOnly.substring(6);
    }

    result = areaCode + prefix + number;
    return result;
  }

  if (format === "9999 9999 9999 9999") {
    // Credit card format
    let result = "";
    for (let i = 0; i < digitsOnly.length && i < 16; i += 4) {
      if (i > 0) result += " ";
      result += digitsOnly.substring(i, Math.min(i + 4, digitsOnly.length));
    }
    return result;
  }

  if (format === "AA-9999") {
    // Alpha-numeric format
    let result = "";
    const alphaOnly = value.match(/[A-Za-z]*/g)?.join("") || "";
    if (alphaOnly.length > 0) {
      result = alphaOnly.substring(0, Math.min(2, alphaOnly.length)).toUpperCase();
    }
    if (digitsOnly.length > 0 && result.length > 0) {
      result += "-";
    }
    if (digitsOnly.length > 0) {
      result += digitsOnly.substring(0, Math.min(4, digitsOnly.length));
    }
    return result;
  }

  if (format === "(***: AAA-999)") {
    // Special format with asterisks
    let result = "(";
    result += "***";
    result += ": ";

    const alphaOnly = value.match(/[A-Za-z]*/g)?.join("") || "";
    if (alphaOnly.length > 0) {
      result += alphaOnly.substring(0, Math.min(3, alphaOnly.length)).toUpperCase();
    }

    if (digitsOnly.length > 0) {
      result += "-";
      result += digitsOnly.substring(0, Math.min(3, digitsOnly.length));
    }

    result += ")";
    return result;
  }

  // Generic formatter for other patterns
  if (format.includes("9")) {
    let result = "";
    let digitIndex = 0;
    const formatDigits = format.replace(/[^9]/g, "");
    const maxDigits = formatDigits.length;

    // Limit digitsOnly to maxDigits from format
    const limitedDigits = digitsOnly.substring(0, maxDigits);

    for (let i = 0; i < format.length && digitIndex < limitedDigits.length; i++) {
      if (format[i] === "9") {
        result += limitedDigits[digitIndex++] || "";
      } else {
        // Only add separator if there are more digits to come
        if (digitIndex < limitedDigits.length) {
          result += format[i];
        }
      }
    }

    return result;
  }

  // Fallback: return original value
  return value;
};

/**
 * Removes display format characters from the value
 * Keeps only alphanumeric characters based on the format type
 */
export const removeDisplayFormat = (value: string, format?: string): string => {
  if (!format || !value) return value;
  value = value.toString();

  // For alphanumeric formats (like AA-9999), keep both letters and numbers
  if (format.includes("A")) {
    return value.replace(/[^A-Za-z0-9]/g, "");
  }

  // For numeric-only formats, keep only digits
  if (format.includes("9")) {
    return value.replace(/\D/g, "");
  }

  // Default: return the value as-is
  return value;
};

export function autoCapitalize(
  value: string,
  type: "characters" | "words" | "sentences" | "none"
): string {
  if (!value) return value;

  switch (type) {
    case "characters":
      return value.toUpperCase();
    case "words":
      return value
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    case "sentences":
      return value.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
    default:
      return value;
  }
}
