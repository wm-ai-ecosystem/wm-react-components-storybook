import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { currencyConstants } from "@wavemaker/react-runtime/components/constants";
import { Box } from "@mui/material";
import { Input } from "@base-ui-components/react/input";
import { WmCurrencyProps } from "./props";
import {
  formatNumberWithCommas,
  handleStepValue,
  validateNumericValue,
  handleNumericInputChange,
  formatOnBlur,
  handleValidatedValueUpdate,
} from "@wavemaker/react-runtime/utils/format-util";
import * as lodash from "lodash-es";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

const WmCurrency: React.FC<WmCurrencyProps> = props => {
  const {
    currency = "USD",
    datavalue: initialDataValue = null,
    disabled = false,
    readonly = false,
    required = false,
    placeholder = "Enter value",
    arialabel = currency,
    name,
    tabindex = 0,
    shortcutkey,
    maxvalue,
    minvalue,
    step = 1,
    textAlign,
    hint,
    trailingzero = false,
    inputmode = "natural",
    decimalplaces = 0,
    updateon = "blur",
    updatedelay = "0",
    onChange,
    onBlur,
    onFocus,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onEnter,
    className,
    listener,
    styles,
  } = props;

  const [datavalue, setDatavalue] = useState<number | null>(initialDataValue);
  const [prevDatavalue, setPrevDatavalue] = useState<number | null>(initialDataValue);
  const [internalValue, setInternalValue] = useState<string>(
    initialDataValue !== null ? initialDataValue.toString() : ""
  );
  // Add state to preserve the original string input when trailingzero is true
  const [rawInputValue, setRawInputValue] = useState<string>(
    initialDataValue !== null ? initialDataValue.toString() : ""
  );
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState(false);

  const currencyCode = currency || currencyConstants.appDefaultCurrency;
  const currencySymbol = useMemo(() => {
    return (
      currencyConstants.CURRENCY_INFO[currencyCode as keyof typeof currencyConstants.CURRENCY_INFO]
        ?.symbol || "$"
    );
  }, [currencyCode]);

  const htmlInputMode = decimalplaces > 0 ? "decimal" : "numeric";

  const validateValue = useCallback(
    (value: string | number | null): { isValid: boolean; message: string } => {
      return validateNumericValue(value, required, minvalue, maxvalue);
    },
    [required, minvalue, maxvalue]
  );

  const debouncedUpdateValue = useCallback(
    lodash.debounce(
      (value: number | null) => {
        const validation = validateValue(value);
        setShowError(!validation.isValid);

        if (onChange || listener?.onChange) {
          handleValidatedValueUpdate(
            value,
            name,
            inputEl.current,
            onChange,
            listener,
            prevDatavalue,
            setPrevDatavalue,
            props
          );
        }
      },
      parseInt(updatedelay || "10"),
      { leading: parseInt(updatedelay) === 0 }
    ),
    [
      validateValue,
      setShowError,
      onChange,
      listener,
      name,
      inputEl,
      prevDatavalue,
      setPrevDatavalue,
      updatedelay,
      props,
    ]
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      onMouseEnter(event, props);
    },
    [onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      onMouseLeave(event, props);
    },
    [onMouseLeave]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      onClick(event, props);
    },
    [onClick]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleArrowPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, direction: "UP" | "DOWN") => {
      event.preventDefault();

      if (readonly || disabled || step === 0) {
        return;
      }

      const targetVal = (event.target as HTMLInputElement).value.replace(/,/g, "");
      let currentValue =
        targetVal && !isNaN(Number.parseFloat(targetVal))
          ? Number.parseFloat(targetVal)
          : datavalue;

      const newValue = handleStepValue(
        currentValue,
        direction,
        step,
        decimalplaces,
        minvalue,
        maxvalue
      );

      const cleanValue = newValue.toString();
      setInternalValue(cleanValue);
      setDatavalue(newValue);
      setRawInputValue(cleanValue);

      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue.toString(), name },
          currentTarget: inputEl.current,
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent, props, newValue, prevDatavalue);
      }

      const validation = validateValue(newValue);
      setShowError(!validation.isValid);

      if (updateon === "keypress") {
        debouncedUpdateValue(newValue);
      }
    },
    [
      readonly,
      disabled,
      step,
      datavalue,
      minvalue,
      maxvalue,
      decimalplaces,
      validateValue,
      onChange,
      name,
      props,
      prevDatavalue,
      debouncedUpdateValue,
    ]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp") {
        handleArrowPress(event, "UP");
      } else if (event.key === "ArrowDown") {
        handleArrowPress(event, "DOWN");
      } else if (event.key === "Enter" && onEnter) {
        onEnter(event);
      }
      if (onKeyDown) {
        onKeyDown(event);
      }
    },
    [handleArrowPress, onEnter, onKeyDown]
  );

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

    if (onChange) {
      const syntheticEvent = {
        target: { value: result.newVal?.toString() || "", name },
        currentTarget: inputEl.current,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent, props, result.newVal, prevDatavalue);
    }

    setInternalValue(result.inputValue);
    setDatavalue(result.newVal);

    const validation = validateValue(result.newVal);
    setShowError(!validation.isValid);

    if (updateon === "keypress") {
      debouncedUpdateValue(result.newVal);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Ensure proper formatting on blur
    const formattedValue = formatOnBlur(datavalue, rawInputValue, trailingzero, decimalplaces);
    if (formattedValue) {
      setInternalValue(formattedValue);
    }

    if (updateon === "blur") {
      debouncedUpdateValue(datavalue);
    }

    onBlur?.(e, listener?.Widgets?.[name]);
    if (updateon === "blur" && onChange) {
      const syntheticEvent = {
        target: { value: datavalue?.toString() || "", name },
        currentTarget: inputEl.current,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent, props, datavalue, prevDatavalue);
    } else if (updateon === "blur") {
      debouncedUpdateValue(datavalue);
    }
    const validation = validateValue(datavalue);
    setIsTouched(true);
    setIsDirty(!validation.isValid);
    setShowError(!validation.isValid);
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

  const events = {
    ...(onClick ? { onClick: handleClick } : {}),
    ...(onMouseEnter ? { onMouseEnter: handleMouseEnter } : {}),
    ...(onMouseLeave ? { onMouseLeave: handleMouseLeave } : {}),
    ...(onFocus ? { onFocus: handleFocus } : {}),
    ...(onBlur ? { onBlur: handleBlur } : {}),
    ...(onChange ? { onChange: handleInputChange } : {}),
    ...(onKeyDown ? { onKeyDown: handleKeyDown } : {}),
  };

  return (
    <Box
      component="div"
      className={`${currencyConstants.DEFAULT_CLS} ${className || ""} ${isTouched ? "ng-touched" : "ng-untouched"}  ${isDirty ? "ng-invalid" : ""}`}
      inputMode={inputmode}
    >
      <Box component="span" className="input-group-addon">
        {currencySymbol}
      </Box>
      <Input
        className={`form-control app-textbox app-currency-input app-input-wrapper ${isTouched ? "ng-touched" : "ng-untouched"} ${isDirty ? "ng-invalid" : ""}`}
        value={internalValue}
        name={name}
        inputMode={htmlInputMode}
        title={hint}
        type="text"
        {...events}
        step={step}
        min={minvalue}
        max={maxvalue}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        placeholder={placeholder}
        aria-label={arialabel}
        tabIndex={tabindex}
        accessKey={shortcutkey}
        style={styles}
        ref={inputEl}
      />
    </Box>
  );
};

export default withBaseWrapper(withFormController(React.memo(WmCurrency)));
