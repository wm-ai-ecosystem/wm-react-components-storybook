import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import TextField from "@mui/material/TextField";
import * as lodash from "lodash-es";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";
import {
  validateNumericValue,
  handleNumericInputChange,
  formatOnBlur,
} from "@wavemaker/react-runtime/utils/format-util";
import { WmNumberProps } from "./props";

const DEFAULT_CLASS = "form-control app-textbox app-number-input";

const WmNumber = memo(
  (props: WmNumberProps) => {
    const {
      required = false,
      regexp = ".*",
      disabled,
      name,
      hint,
      arialabel,
      tabindex,
      shortcutkey,
      autofocus,
      datavalue: initialDataValue = null,
      styles = {},
      className,
      placeholder,
      updatedelay = "0",
      listener,
      updateon = "blur",
      step,
      minvalue,
      maxvalue,
      readonly,
      inputmode = "natural",
      trailingzero = false,
      decimalplaces = 0,
      onChange,
      onClick,
      onKeydown,
      onKeyup,
      onKeypress,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      id,
      error,
    } = props;

    const [showError, setShowError] = useState<boolean>(false);
    const [datavalue, setDatavalue] = useState<number | null>(initialDataValue);
    const [prevDatavalue, setPrevDatavalue] = useState<number | null>(initialDataValue);
    const [internalValue, setInternalValue] = useState<string>(
      initialDataValue !== null ? initialDataValue.toString() : ""
    );
    // Add state to preserve the original string input when trailingzero is true
    const [rawInputValue, setRawInputValue] = useState<string>(
      initialDataValue !== null ? initialDataValue.toString() : ""
    );
    const [isDirty, setIsDirty] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const inputEl = useRef<HTMLInputElement>(null);

    const displayError = error || (isDirty && showError);

    const validateNumber = useCallback(
      (value: number | null): { isValid: boolean; message: string } => {
        return validateNumericValue(value, required, minvalue, maxvalue, regexp);
      },
      [required, regexp, minvalue, maxvalue]
    );

    const debouncedUpdateValue = useCallback(
      lodash.debounce(
        (value: number | null) => {
          const validation = validateNumber(value);
          setShowError(!validation.isValid);
          if (prevDatavalue === value) {
            return;
          }

          if (onChange || listener?.onChange) {
            const syntheticEvent = {
              target: {
                value: value === null ? "" : value.toString(),
                name,
              },
              currentTarget: inputEl.current,
            } as React.ChangeEvent<HTMLInputElement>;
            listener?.onChange?.(
              props.fieldName || name,
              {
                datavalue: value == null ? "" : value,
                value: value == null ? "" : value,
                displayValue: value == null ? "" : value.toString(),
              },
              value,
              prevDatavalue
            );
            if (onChange) {
              onChange(syntheticEvent, props, value, prevDatavalue);
            }
          }
        },
        parseInt(updatedelay || "10"),
        { leading: parseInt(updatedelay) === 0 }
      ),
      [onChange, name, prevDatavalue, updatedelay, validateNumber]
    );

    useEffect(() => {
      if (!shortcutkey) return;

      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.altKey && e.key.toLowerCase() === shortcutkey.toLowerCase()) {
          e.preventDefault();
          inputEl.current?.focus();
        }
      };

      window.addEventListener("keydown", handleGlobalKeyDown);
      return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [shortcutkey]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const result = handleNumericInputChange(
        event.target.value,
        inputmode,
        decimalplaces,
        setRawInputValue
      );

      if (result.newVal === null && event.target.value !== "") {
        return; // Invalid input, don't update
      }

      setInternalValue(result.inputValue);
      setDatavalue(result.newVal);

      const validation = validateNumber(result.newVal);
      setShowError(!validation.isValid);

      if (updateon === "keypress") {
        debouncedUpdateValue(result.newVal);
        onChange?.(event, listener?.Widgets?.[name], result.newVal, prevDatavalue);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const formattedValue = formatOnBlur(datavalue, rawInputValue, trailingzero, decimalplaces);
      if (formattedValue) {
        setInternalValue(formattedValue);
      }

      if (updateon === "blur") {
        debouncedUpdateValue(datavalue);
      }

      onBlur?.(e, listener?.Widgets?.[name]);
      const validation = validateNumber(datavalue);
      if (!validation.isValid && (required || maxvalue || minvalue)) {
        setIsDirty(true);
      } else {
        setIsDirty(false);
      }
      if (!validation.isValid && regexp != ".*") {
        setIsTouched(true);
        setIsDirty(true);
        setShowError(true);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        debouncedUpdateValue(datavalue);
      }
      onKeydown?.(e, listener?.Widgets?.[name]);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyup?.(e, listener?.Widgets?.[name]);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e, listener?.Widgets?.[name]);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      onClick?.(e, listener?.Widgets?.[name]);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
      setIsTouched(true);
      onMouseEnter?.(e, listener?.Widgets?.[name]);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
      setIsTouched(false);
      onMouseLeave?.(e, listener?.Widgets?.[name]);
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeypress?.(e, listener?.Widgets?.[name]);
    };

    useEffect(() => {
      if (initialDataValue !== datavalue) {
        setDatavalue(initialDataValue);
        const cleanValue = initialDataValue !== null ? initialDataValue.toString() : "";
        setInternalValue(cleanValue);
        setRawInputValue(cleanValue);
        setPrevDatavalue(datavalue);
      }
    }, [initialDataValue]);

    useEffect(() => {
      if (inputEl.current) {
        const focus = () => {
          inputEl.current?.focus();
        };
        if (listener?.Widgets[name]) {
          listener.Widgets[name].focus = focus;
        }
      }
    }, []);

    const events = {
      onChange: handleInputChange,
      ...(onMouseEnter ? { onMouseEnter: handleMouseEnter } : {}),
      ...(onMouseLeave ? { onMouseLeave: handleMouseLeave } : {}),
      ...(onClick ? { onClick: handleClick } : {}),
      ...(onFocus ? { onFocus: handleFocus } : {}),
      ...(onKeydown ? { onKeyDown: handleKeyDown } : {}),
      ...(onKeyup ? { onKeyUp: handleKeyUp } : {}),
      ...(onKeypress ? { onKeyPress: handleKeyPress } : {}),
      ...(updateon === "blur" || onBlur ? { onBlur: handleBlur } : {}),
    };
    return (
      <TextField
        {...events}
        hidden={props.hidden}
        title={hint || "Number Input"}
        name={name}
        inputRef={inputEl}
        variant="standard"
        autoFocus={autofocus}
        disabled={disabled}
        placeholder={placeholder ?? "Enter number"}
        type="text"
        id={id || name}
        value={internalValue}
        error={displayError}
        className={clsx(
          "app-input-wrapper",
          isTouched ? "ng-touched" : "ng-untouched",
          displayError ? "ng-invalid" : "ng-valid"
        )}
        slotProps={{
          htmlInput: {
            step: step,
            min: minvalue,
            max: maxvalue,
            readOnly: readonly,
            required: required,
            className: clsx(
              DEFAULT_CLASS,
              className,
              isTouched ? "ng-touched" : "ng-untouched",
              displayError ? "ng-invalid" : "ng-valid"
            ),
            style: styles,
            "aria-label": arialabel,
            pattern: regexp,
            tabIndex: tabindex,
          },
        }}
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "inherit",
          },
          "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
            textAlign: "right",
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            "&.Mui-error": {
              color: "#ee5f5b",
            },
          },
          width: "100%",
          ...styles,
        }}
      />
    );
  },
  (prev, current) => {
    const keys: (keyof WmNumberProps)[] = [
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
      "inputmode",
      "trailingzero",
      "decimalplaces",
      "minvalue",
      "maxvalue",
      "className",
      "hidden",
      "show",
    ];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmNumber.displayName = "WmNumber";

export default withBaseWrapper(withFormController(WmNumber));
