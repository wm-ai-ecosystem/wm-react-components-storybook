import { RegisterOptions } from "react-hook-form";
import { reduce, isString, isBoolean, isNumber, isRegExp, isArray, isDate } from "lodash-es";
import {
  RequiredValidator,
  MaxCharsValidator,
  MinValueValidator,
  MaxValueValidator,
  RegexpValidator,
  MinDateValidator,
  MaxDateValidator,
  MinTimeValidator,
  MaxTimeValidator,
  ExcludeDatesValidator,
  ExcludeDaysValidator,
  ValidatorConfig,
  FunctionValidator,
} from "./props";

const validationHandlers = {
  required: (config: RequiredValidator, rules: RegisterOptions) => {
    if (config.validator) {
      rules.required = config.errorMessage;
    }

    rules.validate = {
      ...rules.validate,
      noWhitespaces: (value: any) => {
        if (typeof value === "string" && value.length > 0 && value.trim() === "") {
          return config.errorMessage;
        }
        return true;
      },
    };
    return rules;
  },

  maxchars: (config: MaxCharsValidator, rules: RegisterOptions) => {
    rules.maxLength = {
      value: config.validator,
      message: config.errorMessage,
    };
    return rules;
  },

  minvalue: (config: MinValueValidator, rules: RegisterOptions) => {
    rules.min = {
      value: config.validator,
      message: config.errorMessage,
    };
    return rules;
  },

  maxvalue: (config: MaxValueValidator, rules: RegisterOptions) => {
    rules.max = {
      value: config.validator,
      message: config.errorMessage,
    };
    return rules;
  },

  regexp: (config: RegexpValidator, rules: RegisterOptions) => {
    let pattern: RegExp;

    try {
      pattern = isString(config.validator)
        ? new RegExp(config.validator.replace(/^\/|\/$/g, ""))
        : config.validator;
    } catch (e) {
      console.warn("Invalid regexp string:", config.validator);
      return rules;
    }

    rules.pattern = {
      value: pattern,
      message: config.errorMessage,
    };
    return rules;
  },

  mindate: (config: MinDateValidator, rules: RegisterOptions) => {
    rules.validate = {
      ...rules.validate,
      minDate: (value: string) => {
        if (!value) return true;
        const inputDate = new Date(value);
        const minDate = new Date(config.validator);
        if (isNaN(inputDate.getTime()) || isNaN(minDate.getTime())) {
          return "Invalid date format";
        }
        return inputDate >= minDate || config.errorMessage;
      },
    };
    return rules;
  },

  maxdate: (config: MaxDateValidator, rules: RegisterOptions) => {
    rules.validate = {
      ...rules.validate,
      maxDate: (value: string) => {
        if (!value) return true;
        const inputDate = new Date(value);
        const maxDate = new Date(config.validator);
        if (isNaN(inputDate.getTime()) || isNaN(maxDate.getTime())) {
          return "Invalid date format";
        }
        return inputDate <= maxDate || config.errorMessage;
      },
    };
    return rules;
  },

  mintime: (config: MinTimeValidator, rules: RegisterOptions) => {
    rules.validate = {
      ...rules.validate,
      minTime: (value: string) => {
        if (!value) return true;
        const parseTime = (time: string) => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours * 60 + minutes;
        };
        try {
          const inputMinutes = parseTime(value);
          const minMinutes = parseTime(config.validator);
          return inputMinutes >= minMinutes || config.errorMessage;
        } catch {
          return "Invalid time format";
        }
      },
    };
    return rules;
  },

  maxtime: (config: MaxTimeValidator, rules: RegisterOptions) => {
    rules.validate = {
      ...rules.validate,
      maxTime: (value: string) => {
        if (!value) return true;
        const parseTime = (time: string) => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours * 60 + minutes;
        };
        try {
          const inputMinutes = parseTime(value);
          const maxMinutes = parseTime(config.validator);
          return inputMinutes <= maxMinutes || config.errorMessage;
        } catch {
          return "Invalid time format";
        }
      },
    };
    return rules;
  },

  excludedates: (config: ExcludeDatesValidator, rules: RegisterOptions) => {
    rules.validate = {
      ...rules.validate,
      excludeDates: (value: string) => {
        if (!value) return true;
        const inputDate = new Date(value);
        if (isNaN(inputDate.getTime())) return "Invalid date format";

        const formatDate = (date: string | Date) => {
          const d = isDate(date) ? date : new Date(date);
          return d.toISOString().split("T")[0];
        };

        const inputDateStr = formatDate(value);
        const isExcluded = config.validator.some(
          excludedDate => formatDate(excludedDate) === inputDateStr
        );

        return !isExcluded || config.errorMessage;
      },
    };
    return rules;
  },

  excludedays: (config: ExcludeDaysValidator, rules: RegisterOptions) => {
    rules.validate = {
      ...rules.validate,
      excludeDays: (value: string) => {
        if (!value) return true;
        const inputDate = new Date(value);
        if (isNaN(inputDate.getTime())) return "Invalid date format";

        const dayOfWeek = inputDate.getDay();
        const isExcluded = config.validator.includes(dayOfWeek);

        return !isExcluded || config.errorMessage;
      },
    };
    return rules;
  },
};

// Type guard functions using lodash
const isValidatorConfig = (config: any): config is Exclude<ValidatorConfig, FunctionValidator> => {
  return (
    config &&
    typeof config === "object" &&
    !Array.isArray(config) &&
    typeof config !== "function" &&
    isString(config.type) &&
    isString(config.errorMessage) &&
    config.validator !== undefined
  );
};

const isFunctionValidator = (config: any): config is FunctionValidator => {
  return typeof config === "function";
};

const validateValidatorConfig = (config: Exclude<ValidatorConfig, FunctionValidator>): boolean => {
  const { type, validator } = config;
  switch (type) {
    case "required":
      return isBoolean(validator);
    case "maxchars":
    case "minvalue":
    case "maxvalue":
      return isNumber(validator);
    case "regexp":
      return (
        isRegExp(validator) ||
        (isString(validator) &&
          (() => {
            try {
              new RegExp(validator.replace(/^\/|\/$/g, ""));
              return true;
            } catch {
              return false;
            }
          })())
      );

    case "mindate":
    case "maxdate":
      return isString(validator) || isDate(validator);
    case "mintime":
    case "maxtime":
      return isString(validator) && /^\d{2}:\d{2}$/.test(validator);
    case "excludedates":
      return isArray(validator) && validator.every(v => isString(v) || isDate(v));
    case "excludedays":
      return isArray(validator) && validator.every(v => isNumber(v) && v >= 0 && v <= 6);
    default:
      return false;
  }
};

export const createValidationRules = (
  validators: ValidatorConfig[],
  form: any = {},
  fieldName?: string
): RegisterOptions => {
  const functionValidators = validators.filter(isFunctionValidator);
  const configValidators = validators.filter(isValidatorConfig);

  const unrecognized = validators.filter(v => !isFunctionValidator(v) && !isValidatorConfig(v));
  if (unrecognized.length > 0) {
    console.warn("Unrecognized validator configurations:", unrecognized);
  }

  const validConfigs = configValidators.filter(config => {
    if (!validateValidatorConfig(config)) {
      console.warn("Invalid validator values for type:", config.type, config);
      return false;
    }
    return true;
  });

  const rules = reduce(
    validConfigs,
    (acc: RegisterOptions, config) => {
      const handler = validationHandlers[config.type as keyof typeof validationHandlers];
      if (handler) return handler(config as any, acc);
      console.warn(`No handler found for validator type: ${config.type}`);
      return acc;
    },
    {} as RegisterOptions
  );

  if (functionValidators.length > 0) {
    const functionValidateRules = reduce(
      functionValidators,
      (acc: Record<string, any>, validator, index) => {
        acc[`customValidator${index}`] = async (value: any) => {
          try {
            if (!value) {
              return true;
            }
            const result = await validator({ value, fieldName }, form);
            if (typeof result === "string") return result;
            if (typeof result === "boolean") return result || "Validation failed";
            if (result?.errorMessage) return result.errorMessage;
            return true;
          } catch (error: any) {
            if (error?.errorMessage) return error.errorMessage;
            if (typeof error === "string") return error;
            console.warn("Function validator threw an error:", error);
            return "Validation error occurred";
          }
        };
        return acc;
      },
      {}
    );

    rules.validate = {
      ...rules.validate,
      ...functionValidateRules,
    };
  }

  return rules;
};
