import { memo, useRef, useEffect, useState, useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import toNumber from "lodash-es/toNumber";
import debounce from "lodash-es/debounce";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";
import { WmTextProps } from "./props";
import { formatInput, removeDisplayFormat } from "./util";
import delay from "lodash/delay";

const DEFAULT_CLASS = "form-control app-textbox";

const WmText = memo(
  (props: WmTextProps) => {
    const {
      autocomplete = "true",
      autofocus,
      disabled,
      readonly,
      placeholder,
      type,
      maxchars,
      styles = {},
      className,
      shortcutkey,
      required = false,
      name,
      arialabel,
      datavalue = "",
      hint,
      listener,
      displayformat,
      showdisplayformaton = "keypress",
      updatedelay = "0",
      tabindex,
      regexp,
      updateon = "blur",
      autocapitalize,
      autotrim,
      onChange,
      onBlur,
      onFocus,
      onKeydown,
      onKeypress,
      onKeyup,
      onMouseEnter,
      id,
      error,
    } = props;

    // Use a single state for the raw input value
    const [rawValue, setRawValue] = useState<string>(datavalue);

    // Compute formatted display value based on raw value
    const displayValue = displayformat ? formatInput(rawValue, displayformat) : rawValue;

    const [showError, setShowError] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isAutofilled, setIsAutofilled] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const cursorPositionRef = useRef<number>(0);
    const displayError = error || (isDirty && showError);

    // Track if changes are coming from internal user input
    const isInternalChange = useRef(false);
    // Store previous value for onChange callbacks
    const prevValueRef = useRef<string | number | null>(datavalue);

    // Sync state with prop changes
    useEffect(() => {
      // Only update state from props if it's not from an internal change
      if (!isInternalChange.current && datavalue !== rawValue) {
        setRawValue(datavalue);
        prevValueRef.current = datavalue;
      } else if (datavalue !== rawValue) {
        setRawValue(datavalue);
      }
      // Reset the flag
      isInternalChange.current = false;

      // Reset autofill state when value is reset externally
      if (datavalue === "" || datavalue === null || datavalue === undefined) {
        setIsAutofilled(false);
      }
    }, [datavalue]);

    const validateInput = useCallback(
      (value: string): { isValid: boolean; message: string; type: string } => {
        if (displayformat) {
          value = removeDisplayFormat(value, displayformat);
        }
        if (!value.trim() && required) {
          return { isValid: false, type: "required", message: "This field is required" };
        }

        if (type === "email" && value && value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            return { isValid: false, type: "email", message: "Please enter a valid email address" };
          }
        }

        if (regexp && value && !new RegExp(regexp || ".*", "g").test(value)) {
          return { isValid: false, type: "regexp", message: "Invalid format" };
        }

        if (maxchars && value.length > maxchars) {
          return {
            isValid: false,
            type: "maxchars",
            message: `Maximum ${maxchars} characters allowed`,
          };
        }
        if (props.type === "number") {
          if (props.minvalue && toNumber(value) < props.minvalue) {
            return {
              isValid: false,
              type: "minvalue",
              message: `Minimum ${props.minvalue} characters allowed`,
            };
          }
          if (props.maxvalue && toNumber(value) > props.maxvalue) {
            return {
              isValid: false,
              type: "maxvalue",
              message: `Maximum ${props.maxvalue} characters allowed`,
            };
          }
        }

        return { isValid: true, message: "", type: "" };
      },
      [required, regexp, maxchars]
    );

    // Debounced update function for delayed updates
    const debouncedUpdateValue = useMemo(
      () =>
        debounce(
          (value: string) => {
            if (autotrim) {
              value = value.trim();
            }

            const validation = validateInput(value);
            setShowError(!validation.isValid);

            if (onChange || listener?.onChange) {
              isInternalChange.current = true;

              // Remove display format before processing the value
              const unformattedValue = displayformat
                ? removeDisplayFormat(value, displayformat)
                : value;

              const datavalue =
                props.type === "number" ? toNumber(unformattedValue) : unformattedValue;

              if (listener?.onChange) {
                listener.onChange(props.fieldName || name, {
                  datavalue,
                  value,
                  charlength: value.length,
                });
              }
              if (onChange) {
                const syntheticEvent = {
                  target: {
                    value: datavalue,
                    name,
                  },
                  currentTarget: ref.current,
                } as React.ChangeEvent<HTMLInputElement>;
                // onChange expects string | null, so convert number to string if needed
                const onChangeValue = typeof datavalue === "number" ? String(datavalue) : datavalue;
                const prevValue =
                  typeof prevValueRef.current === "number"
                    ? String(prevValueRef.current)
                    : prevValueRef.current;
                onChange(syntheticEvent, props, onChangeValue, prevValue);
              }
              prevValueRef.current = datavalue;
            }
          },
          parseInt(updatedelay) || 0,
          { leading: parseInt(updatedelay) === 0 }
        ),
      [onChange, name, validateInput, autotrim, displayformat]
    );

    // Shortcut key handler
    useEffect(() => {
      if (!shortcutkey) return;

      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.altKey && e.key.toLowerCase() === shortcutkey.toLowerCase()) {
          e.preventDefault();
          ref.current?.focus();
        }
      };

      window.addEventListener("keydown", handleGlobalKeyDown);
      return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [shortcutkey]);

    // Autofill detection using mui-auto-fill animation event
    useEffect(() => {
      const input = ref.current;

      function handleAnimationStart(e: AnimationEvent) {
        if (e.animationName === "mui-auto-fill") {
          setIsAutofilled(true);
        }
      }

      if (input) {
        input.addEventListener("animationstart", handleAnimationStart);
      }

      return () => {
        if (input) {
          input.removeEventListener("animationstart", handleAnimationStart);
        }
      };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      isInternalChange.current = true;

      const inputEl = e.target;
      let newValue = inputEl.value;
      cursorPositionRef.current = inputEl.selectionStart || 0;

      // Extract digits for validation if displayformat is present
      const digitsOnly = displayformat ? newValue.replace(/\D/g, "") : newValue;

      // Enforce maxchars constraint BEFORE setting state
      if (maxchars && digitsOnly.length > maxchars) {
        // Prevent input that exceeds maxchars
        return;
      }

      // Enforce displayformat digit limit
      if (displayformat) {
        const formatDigits = displayformat.replace(/[^9]/g, "");
        const maxDigits = formatDigits.length;

        if (digitsOnly.length > maxDigits) {
          // Prevent input that exceeds format digit limit
          return;
        }
      }

      // Enforce min/max value constraints for number type
      if (props.type === "number") {
        const numValue = toNumber(digitsOnly);

        if (props.maxvalue !== undefined && numValue > props.maxvalue) {
          // Prevent input that exceeds maxvalue
          return;
        }

        if (
          props.minvalue !== undefined &&
          numValue < props.minvalue &&
          digitsOnly.length >= String(props.minvalue).length
        ) {
          // Only prevent if the number length is complete and still below minvalue
          // This allows typing "1" when minvalue is 10
          const minLength = String(props.minvalue).length;
          if (digitsOnly.length >= minLength) {
            return;
          }
        }
      }

      setRawValue(newValue);

      // Handle cursor position for formatted input
      if (displayformat && showdisplayformaton === "keypress") {
        setTimeout(() => {
          if (ref.current) {
            const formatted = formatInput(newValue, displayformat);
            const digitsBefore = newValue
              .substring(0, cursorPositionRef.current)
              .replace(/\D/g, "").length;
            const newPos = formatted.split("").reduce((pos, char, index) => {
              if (pos !== -1) return pos;
              const digitsSoFar = formatted.substring(0, index).replace(/\D/g, "").length;
              return digitsSoFar >= digitsBefore ? index : -1;
            }, -1);

            if (newPos !== -1) {
              ref.current.setSelectionRange(newPos, newPos);
            }
          }
        }, 0);
      }

      const validation = validateInput(newValue);
      setShowError(!validation.isValid);

      // Set isDirty based on validation and whether user has typed
      if (updateon === "keypress") {
        if (!validation.isValid && (newValue.trim() || required)) {
          setIsDirty(true);
        } else if (validation.isValid && !required) {
          // Reset isDirty when field becomes valid (except for required fields which need blur)
          setIsDirty(false);
        }
      }
      if (updateon === "keypress" || isAutofilled) {
        debouncedUpdateValue(newValue);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (readonly || disabled) {
        return;
      }
      const validation = validateInput(rawValue);
      if (!validation.isValid && (required || validation.type === "regexp")) {
        setIsDirty(true);
      } else {
        setIsDirty(false);
      }
      setShowError(!validation.isValid);

      if (updateon === "blur") {
        debouncedUpdateValue(rawValue);
      }
      if (!validation.isValid && regexp != ".*") {
        setIsTouched(true);
        setIsDirty(true);
      }
      onBlur?.(e, listener?.Widgets[name]);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e, listener?.Widgets[name]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      delay(() => {
        onKeydown?.(e, listener?.Widgets[name]);
        if (e.key === "Enter") {
          debouncedUpdateValue(rawValue);
        }
      }, 0);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      delay(() => {
        onKeypress?.(e, listener?.Widgets[name]);
      }, 0);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      delay(() => {
        onKeyup?.(e, listener?.Widgets[name]);
      }, 0);
    };
    const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
      onMouseEnter?.(e, listener?.Widgets[name]);
      setIsTouched(true);
    };
    const events = {
      onChange: handleInputChange,
      ...(onFocus ? { onFocus: handleFocus } : {}),
      ...(onKeydown ? { onKeyDown: handleKeyDown } : {}),
      ...(onKeyup ? { onKeyUp: handleKeyUp } : {}),
      ...(onKeypress ? { onKeyPress: handleKeyPress } : {}),
      ...(props.onClick ? { onClick: props.onClick } : {}),
      ...(updateon === "blur" || onBlur ? { onBlur: handleBlur } : {}),
      ...(props.onMouseEnter ? { onMouseEnter: handleMouseEnter } : {}),
      ...(props.onMouseLeave ? { onMouseLeave: props.onMouseLeave } : {}),
    };

    return (
      <TextField
        {...events}
        title={hint || "Text Input"}
        name={name}
        id={id || name}
        variant="standard"
        autoComplete={autocomplete?.toString() === "true" ? "on" : "off"}
        autoFocus={autofocus}
        disabled={disabled}
        required={required}
        placeholder={placeholder ?? "Enter text"}
        value={displayValue}
        type={type}
        inputRef={ref}
        error={displayError}
        aria-readonly={readonly}
        className={clsx(
          "app-input-wrapper",
          isTouched ? "ng-touched" : "ng-untouched",
          displayError && "ng-invalid"
        )}
        slotProps={{
          htmlInput: {
            tabIndex: tabindex,
            readOnly: readonly,
            className: clsx(
              DEFAULT_CLASS,
              className,
              isTouched ? "ng-touched" : "ng-untouched",
              displayError && "ng-invalid"
            ),
            style: styles,
            "aria-label": arialabel,
            maxLength: maxchars,
            pattern: new RegExp(regexp || ".*", "g"),
            min: props.minvalue,
            max: props.maxvalue,
            step: props.step,
          },
        }}
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "inherit",
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            "&.Mui-error": {
              color: "#ee5f5b",
            },
          },
          width: "100%",
        }}
      />
    );
  },
  (prev, current) => {
    const keys: (keyof WmTextProps)[] = [
      "datavalue",
      "disabled",
      "required",
      "readonly",
      "placeholder",
      "maxchars",
      "tabindex",
      "shortcutkey",
      "autofocus",
      "arialabel",
      "error",
      "className",
    ];

    return keys.every(key => prev[key] === current[key]);
  }
);

WmText.displayName = "WmText";

export default withBaseWrapper(withFormController(WmText));
