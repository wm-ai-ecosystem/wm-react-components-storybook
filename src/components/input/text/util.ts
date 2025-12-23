/**
 * Format placeholders:
 * - 9: Any digit (0-9)
 * - A: Any letter (A-Z, a-z) - will be uppercased
 * - a: Any letter (A-Z, a-z) - will be lowercased
 * - X: Any alphanumeric character (preserves case)
 * - ?: Makes the preceding placeholder optional
 * - All other characters (including *, -, (, ), etc.) are treated as literal separators/static text
 *
 * Examples:
 *   999-99-9999         → SSN format
 *   (999) 999-9999      → US phone
 *   AA-9999             → License plate (letters uppercased)
 *   XXX-XXX             → Any 6 alphanumeric chars with dash
 *   (***: AAA-999)      → Literal asterisks with letters and digits
 */

interface FormatToken {
  type: "digit" | "letter-upper" | "letter-lower" | "alphanumeric" | "literal";
  char: string;
  optional: boolean;
}

/**
 * Parse format string into tokens for processing
 */
const parseFormatTokens = (format: string): FormatToken[] => {
  const tokens: FormatToken[] = [];
  let i = 0;

  while (i < format.length) {
    const char = format[i];
    const nextChar = format[i + 1];
    const isOptional = nextChar === "?";

    if (char === "9") {
      tokens.push({ type: "digit", char, optional: isOptional });
      i += isOptional ? 2 : 1;
    } else if (char === "A") {
      tokens.push({ type: "letter-upper", char, optional: isOptional });
      i += isOptional ? 2 : 1;
    } else if (char === "a") {
      tokens.push({ type: "letter-lower", char, optional: isOptional });
      i += isOptional ? 2 : 1;
    } else if (char === "X") {
      // X = alphanumeric placeholder (use X instead of * to avoid conflicts with literal asterisks)
      tokens.push({ type: "alphanumeric", char, optional: isOptional });
      i += isOptional ? 2 : 1;
    } else if (char === "?") {
      // Standalone ? without preceding placeholder - treat as literal
      tokens.push({ type: "literal", char, optional: false });
      i++;
    } else {
      // All other characters are literals (including *, -, (, ), spaces, etc.)
      tokens.push({ type: "literal", char, optional: false });
      i++;
    }
  }

  return tokens;
};

/**
 * Extract input characters that can be used for formatting
 * Returns an array of characters with their types
 */
const extractInputChars = (
  value: string
): Array<{ char: string; isDigit: boolean; isLetter: boolean }> => {
  const chars: Array<{ char: string; isDigit: boolean; isLetter: boolean }> = [];

  for (const char of value) {
    const isDigit = /\d/.test(char);
    const isLetter = /[A-Za-z]/.test(char);

    if (isDigit || isLetter) {
      chars.push({ char, isDigit, isLetter });
    }
  }

  return chars;
};

/**
 * Count the maximum number of input characters the format can accept
 */
const getMaxInputLength = (tokens: FormatToken[]): number => {
  return tokens.filter(
    t =>
      t.type === "digit" ||
      t.type === "letter-upper" ||
      t.type === "letter-lower" ||
      t.type === "alphanumeric"
  ).length;
};

/**
 * Universal format input function that handles any display format pattern
 */
export const formatInput = (value: string, format: string): string => {
  if (!format || value === null || value === undefined) return value ?? "";
  if (value === "") return "";

  value = value.toString();

  const tokens = parseFormatTokens(format);
  const inputChars = extractInputChars(value);

  if (inputChars.length === 0) return "";

  let result = "";
  let inputIndex = 0;
  let pendingLiterals = "";

  for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
    const token = tokens[tokenIndex];

    // No more input characters - stop processing
    if (inputIndex >= inputChars.length) {
      break;
    }

    if (token.type === "literal") {
      // Collect literals but don't add them yet
      pendingLiterals += token.char;
      continue;
    }

    // Find a matching input character for this token
    let matched = false;
    const inputChar = inputChars[inputIndex];

    if (token.type === "digit" && inputChar?.isDigit) {
      // Flush pending literals before adding the matched character
      result += pendingLiterals + inputChar.char;
      pendingLiterals = "";
      inputIndex++;
      matched = true;
    } else if (token.type === "letter-upper" && inputChar?.isLetter) {
      result += pendingLiterals + inputChar.char.toUpperCase();
      pendingLiterals = "";
      inputIndex++;
      matched = true;
    } else if (token.type === "letter-lower" && inputChar?.isLetter) {
      result += pendingLiterals + inputChar.char.toLowerCase();
      pendingLiterals = "";
      inputIndex++;
      matched = true;
    } else if (token.type === "alphanumeric" && (inputChar?.isDigit || inputChar?.isLetter)) {
      result += pendingLiterals + inputChar.char;
      pendingLiterals = "";
      inputIndex++;
      matched = true;
    }

    // If no match and token is not optional, try to skip input chars to find match
    if (!matched && !token.optional) {
      // Look ahead in input to find a matching character
      let foundMatch = false;
      for (let lookAhead = inputIndex; lookAhead < inputChars.length; lookAhead++) {
        const lookAheadChar = inputChars[lookAhead];

        if (token.type === "digit" && lookAheadChar.isDigit) {
          result += pendingLiterals + lookAheadChar.char;
          pendingLiterals = "";
          inputIndex = lookAhead + 1;
          foundMatch = true;
          break;
        } else if (token.type === "letter-upper" && lookAheadChar.isLetter) {
          result += pendingLiterals + lookAheadChar.char.toUpperCase();
          pendingLiterals = "";
          inputIndex = lookAhead + 1;
          foundMatch = true;
          break;
        } else if (token.type === "letter-lower" && lookAheadChar.isLetter) {
          result += pendingLiterals + lookAheadChar.char.toLowerCase();
          pendingLiterals = "";
          inputIndex = lookAhead + 1;
          foundMatch = true;
          break;
        } else if (token.type === "alphanumeric") {
          result += pendingLiterals + lookAheadChar.char;
          pendingLiterals = "";
          inputIndex = lookAhead + 1;
          foundMatch = true;
          break;
        }
      }

      // If still no match found, stop processing
      if (!foundMatch) {
        break;
      }
    }
  }

  return result;
};

/**
 * Removes display format characters from the value
 * Intelligently extracts only the meaningful input characters based on format type
 */
export const removeDisplayFormat = (value: string, format?: string): string => {
  if (!format || !value) return value;
  value = value.toString();

  const tokens = parseFormatTokens(format);

  // Determine what character types the format accepts
  const acceptsDigits = tokens.some(t => t.type === "digit" || t.type === "alphanumeric");
  const acceptsLetters = tokens.some(
    t => t.type === "letter-upper" || t.type === "letter-lower" || t.type === "alphanumeric"
  );

  if (acceptsDigits && acceptsLetters) {
    // Mixed format: keep both letters and numbers
    return value.replace(/[^A-Za-z0-9]/g, "");
  } else if (acceptsLetters) {
    // Letters only format
    return value.replace(/[^A-Za-z]/g, "");
  } else if (acceptsDigits) {
    // Digits only format
    return value.replace(/\D/g, "");
  }

  // Default: return the value as-is (no placeholders in format)
  return value;
};

/**
 * Get the maximum number of input characters allowed by the format
 */
export const getFormatMaxLength = (format: string): number => {
  if (!format) return Infinity;
  const tokens = parseFormatTokens(format);
  return getMaxInputLength(tokens);
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

/**
 * Applies autocapitalize logic to a character being inserted in real-time
 * @param newValue - The complete new value after character insertion
 * @param previousValue - The value before character insertion
 * @param cursorPosition - The cursor position after insertion
 * @param mode - The autocapitalize mode: "words", "sentence", "characters", or "none"
 * @returns Object with capitalized value and whether capitalization was applied
 */
export function applyAutoCapitalize(
  newValue: string,
  previousValue: string,
  cursorPosition: number,
  mode: "none" | "sentences" | "words" | "characters"
): { value: string; wasCapitalized: boolean } {
  // Only process if a character was inserted (not deleted)
  if (mode === "none" || newValue.length <= previousValue.length) {
    return { value: newValue, wasCapitalized: false };
  }

  const insertedChar = newValue[cursorPosition - 1];
  let shouldCapitalize = false;

  // Only capitalize alphabetic characters
  if (!/[a-zA-Z]/.test(insertedChar)) {
    return { value: newValue, wasCapitalized: false };
  }

  if (mode === "characters") {
    // Capitalize every character
    shouldCapitalize = true;
  } else if (mode === "words") {
    // Capitalize first letter of each word (after space or at start)
    shouldCapitalize = cursorPosition === 1 || newValue[cursorPosition - 2] === " ";
  } else if (mode === "sentences") {
    // Capitalize first letter after sentence-ending punctuation (. ! ?)
    if (cursorPosition === 1) {
      shouldCapitalize = true;
    } else {
      // Check if we're at the start of a sentence
      const textBefore = newValue.substring(0, cursorPosition - 1);
      // Match sentence-ending punctuation followed by optional spaces
      const sentenceEndPattern = /[.!?]\s*$/;
      shouldCapitalize = sentenceEndPattern.test(textBefore);
    }
  }

  if (shouldCapitalize && insertedChar === insertedChar.toLowerCase()) {
    // Replace the lowercase character with uppercase
    const capitalizedValue =
      newValue.substring(0, cursorPosition - 1) +
      insertedChar.toUpperCase() +
      newValue.substring(cursorPosition);
    return { value: capitalizedValue, wasCapitalized: true };
  }

  return { value: newValue, wasCapitalized: false };
}
