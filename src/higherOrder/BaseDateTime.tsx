import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import moment from "moment-timezone";

// Type definitions
interface CustomValidator {
  validate(control: FormControl): ValidationErrors | null;
}

interface ValidationErrors {
  [key: string]: boolean | string;
}

interface FormControl {
  setValue: (value: any) => void;
  value: any;
  markAsTouched: () => void;
  execute?: (operation: string) => boolean;
  twoWayBinding?: boolean;
  owner?: string;
  registerOnChange: (fn: () => void) => void;
  registerOnTouched: (fn: () => void) => void;
  unregisterOnChange: (fn: () => void) => void;
  unregisterOnTouched: (fn: () => void) => void;
}

interface FormControlRegistry {
  get: (name: string) => FormControl;
}

interface DateTimeContext {
  [key: string]: any;
}

interface ViewParent {
  [key: string]: any;
  containerWidget?: {
    _isCustom: boolean;
  };
  App?: {
    [key: string]: any;
  };
}

interface CustomProps {
  formControlName?: string;
  name?: string;
  required?: boolean;
  datavalue?: any;
  outputformat?: string;
  mindate?: string | Date;
  maxdate?: string | Date;
  excludedays?: number[];
  excludedates?: string[] | Date[];
  dataentrymode?: "date" | "time" | "datetime";
  datepattern?: string;
  timepattern?: string;
  showweeks?: boolean;
  selectfromothermonth?: boolean;
  todaybutton?: boolean;
  clearbutton?: boolean;
  todaybuttonlabel?: string;
  clearbuttonlabel?: string;
  showcustompicker?: boolean;
  adaptiveposition?: boolean;
  widgetSubType?: string;
  context?: DateTimeContext;
  viewParent?: ViewParent;
  invokeEventCallback?: (eventName: string, payload: any) => void;
  formControlRegistry?: FormControlRegistry;
}

type WmDateTimeProps = BaseProps & CustomProps;

// Constants
const ARROW_KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
} as const;

const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const CUSTOM_WIDGET_PREFIX = "wm-custom-";

// Utility functions
const hasProperty = (obj: any, key: string): boolean =>
  obj && Object.prototype.hasOwnProperty.call(obj, key);

const setProperty = (obj: any, key: string, value: any): void => {
  if (obj && obj[key] !== value) {
    obj[key] = value;
  }
};

const isValidValue = (val: any): boolean => {
  switch (typeof val) {
    case "object":
      return Boolean(val && (Array.isArray(val) ? val.length : Object.keys(val).length));
    case "number":
      return val === 0 || Boolean(val);
    default:
      return !(val === undefined || val === null || val === "");
  }
};

const validateRequired =
  (required: boolean) =>
  (control: FormControl): ValidationErrors | null => {
    if (!required) return null;

    return isValidValue(control.value) ? null : { required: true };
  };

const withBaseDateTime = <P extends WmDateTimeProps>(WrappedComponent: React.ComponentType<P>) => {
  const WithBaseDateTime = (props: BaseProps) => {
    const {
      formControlName,
      name,
      required = false,
      datavalue,
      outputformat = DEFAULT_DATE_FORMAT,
      mindate,
      maxdate,
      excludedays,
      excludedates,
      dataentrymode,
      datepattern,
      timepattern,
      showweeks,
      selectfromothermonth,
      todaybutton,
      clearbutton,
      todaybuttonlabel,
      clearbuttonlabel,
      showcustompicker,
      adaptiveposition,
      widgetSubType,
      context,
      viewParent,
      invokeEventCallback,
      formControlRegistry,
      ref,
      ...restProps
    } = props;

    // State management
    const [controlValue, setControlValue] = useState(datavalue);
    const [prevValue, setPrevValue] = useState(datavalue);
    const [showPicker, setShowPicker] = useState(false);

    // Refs
    const datepickerRef = useRef<any>(null);
    const isDestroyed = useRef<boolean>(false);
    const formControl = useRef<FormControl | null>(null);
    const mobileInputRef = useRef<HTMLInputElement>(null);

    // Helper functions
    const getBindingPath = useCallback(
      (bindPath: string): string => bindPath.replace(/\[\$i\]/g, "[0]"),
      []
    );

    const updateBoundVariable = useCallback(
      (value: any): void => {
        if (!formControlName || !context) return;

        const currentFormControl = formControl.current;
        if (
          currentFormControl?.execute?.("IS_API_AWARE") ||
          (currentFormControl && !currentFormControl.twoWayBinding)
        ) {
          return;
        }

        const bindPath = getBindingPath(formControlName);
        const pathParts = bindPath.split(".");

        // Navigate to the parent object
        let currentPath = context;
        for (let i = 0; i < pathParts.length - 1; i++) {
          currentPath = currentPath[pathParts[i]];
          if (!currentPath) return;
        }

        const propertyName = pathParts[pathParts.length - 1];

        // Set value based on different contexts
        if (hasProperty(currentPath, propertyName)) {
          setProperty(currentPath, propertyName, value);
        } else if (viewParent?.containerWidget?._isCustom && hasProperty(viewParent, bindPath)) {
          setProperty(viewParent, bindPath, value);
        } else if (currentFormControl?.owner === "Page" && hasProperty(viewParent, bindPath)) {
          setProperty(viewParent, bindPath, value);
        } else if (currentFormControl?.owner === "App" && hasProperty(viewParent?.App, bindPath)) {
          setProperty(viewParent.App, bindPath, value);
        }
      },
      [formControlName, context, viewParent, getBindingPath]
    );

    const invokeOnChange = useCallback(
      (value: any, event?: React.SyntheticEvent): void => {
        if (event && value !== prevValue) {
          updateBoundVariable(value);
          invokeEventCallback?.("change", {
            $event: event,
            newVal: value,
            oldVal: prevValue,
          });
        }
        setPrevValue(value);
      },
      [prevValue, updateBoundVariable, invokeEventCallback]
    );

    const updatePrevDatavalue = useCallback((value: any): void => {
      setPrevValue(value);
    }, []);

    const getFormattedDate = useCallback(
      (date: Date, pattern?: string, timezone?: string): string => {
        if (!date) return "";

        const selectedTimezone = timezone || moment.tz.guess();
        const selectedPattern = pattern || outputformat;

        return moment(date).tz(selectedTimezone).format(selectedPattern);
      },
      [outputformat]
    );

    const isValidDate = useCallback(
      (date: any): boolean => date instanceof Date && !isNaN(date.getTime()),
      []
    );

    const validateDateRange = useCallback(
      (date: Date): boolean => {
        if (!date) return true;

        const minDateObj = mindate ? moment(mindate).toDate() : null;
        const maxDateObj = maxdate ? moment(maxdate).toDate() : null;

        if (minDateObj && date < minDateObj) {
          invokeOnChange(datavalue);
          return false;
        }

        if (maxDateObj && date > maxDateObj) {
          invokeOnChange(datavalue);
          return false;
        }

        return true;
      },
      [mindate, maxdate, datavalue, invokeOnChange]
    );

    const validateDateFormat = useCallback(
      (newVal: Date, inputVal: string): boolean => {
        const pattern = datepattern || timepattern;
        if (!pattern) return true;

        const formattedDate = getFormattedDate(newVal, pattern);
        const trimmedInput = inputVal.trim();

        if (trimmedInput && formattedDate !== trimmedInput) {
          invokeOnChange(datavalue);
          return false;
        }

        return true;
      },
      [datepattern, timepattern, getFormattedDate, datavalue, invokeOnChange]
    );

    const getDateObject = useCallback((date: any): Date | undefined => {
      if (!date) return undefined;
      if (date == "CURRENT_DATE") {
        return new Date();
      }
      return typeof date === "string" ? moment(date).toDate() : date;
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent): void => {
      const arrowKeys = Object.values(ARROW_KEYS);
      if (arrowKeys.includes(event.keyCode)) {
        event.stopPropagation();
      }
    }, []);

    // Custom validator
    const customValidator: CustomValidator = useMemo(
      () => ({
        validate: (control: FormControl) => validateRequired(required)(control),
      }),
      [required]
    );

    // Effects
    useEffect(() => {
      if (widgetSubType?.startsWith(CUSTOM_WIDGET_PREFIX)) return;

      setControlValue(datavalue);
      invokeOnChange(datavalue);
      updatePrevDatavalue(datavalue);
    }, [datavalue, widgetSubType, invokeOnChange, updatePrevDatavalue]);

    // Enhanced props for wrapped component
    const enhancedProps = useMemo(
      () =>
        ({
          ...props,
          ref,
          datavalue: controlValue,
          formControlName,
          getFormattedDate,
          invokeOnChange,
          datepickerRef,
          customValidator,
          todaybutton,
          clearbutton,
          todaybuttonlabel,
          clearbuttonlabel,
          showPicker,
          setShowPicker,
          mobileInputRef,
          handleKeyDown,
          getDateObj: getDateObject,
          isValidDate,
          minDateMaxDateValidationOnInput: validateDateRange,
          formatValidation: validateDateFormat,
          updatePrevDatavalue,
          updateBoundVariable,
        }) as unknown as Partial<P>,
      [
        restProps,
        controlValue,
        name,
        formControlName,
        getFormattedDate,
        invokeOnChange,
        customValidator,
        todaybutton,
        clearbutton,
        todaybuttonlabel,
        clearbuttonlabel,
        showPicker,
        handleKeyDown,
        getDateObject,
        isValidDate,
        validateDateRange,
        validateDateFormat,
        updatePrevDatavalue,
        updateBoundVariable,
      ]
    );

    return <WrappedComponent {...(enhancedProps as P)} />;
  };

  WithBaseDateTime.displayName = `WithBaseDateTime(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return withBaseWrapper(WithBaseDateTime);
};

export default withBaseDateTime;
