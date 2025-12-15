import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as lodash from "lodash-es";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmTextareaProps } from "./props";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";
import delay from "lodash/delay";

const DEFAULT_CLASS = "form-control app-textarea";

const WmTextarea = memo(
  (props: WmTextareaProps) => {
    const {
      name,
      readonly,
      required,
      disabled,
      maxchars,
      tabindex,
      placeholder,
      shortcutkey,
      autofocus,
      arialabel,
      limitdisplaytext = "",
      datavalue = "",
      listener,
      onChange,
      onBlur,
      onFocus,
      onKeydown,
      onKeypress,
      onKeyup,
      className,
      styles = {},
      updatedelay = "0",
      updateon = "blur",
      regexp = ".*",
      id,
    } = props;

    // Track internal vs external updates
    const valueRef = useRef(datavalue);
    const isInternalUpdate = useRef(false);
    const [displayValue, setDisplayValue] = useState(datavalue);
    const [error, setError] = useState({ show: false, message: "" });
    const [isDirty, setIsDirty] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Memoize validation function
    const validateInput = useCallback(
      (inputValue: string) => {
        if (!inputValue.trim() && required) {
          return { isValid: false, message: "This field is required" };
        }
        if (regexp && inputValue && !new RegExp(regexp).test(inputValue)) {
          return { isValid: false, message: "Invalid format" };
        }
        if (maxchars && inputValue.length > maxchars) {
          return { isValid: false, message: `Maximum ${maxchars} characters allowed` };
        }
        return { isValid: true, message: "" };
      },
      [required, regexp, maxchars]
    );

    const updateValue = useCallback(
      (newValue: string, validation: { isValid: boolean; message: string }) => {
        isInternalUpdate.current = true;

        if (listener?.onChange) {
          listener.onChange(props.fieldName || name, {
            datavalue: newValue,
            value: newValue,
            charlength: newValue?.length,
          });
        }

        if (onChange) {
          const syntheticEvent = {
            target: { value: newValue, name },
            currentTarget: textareaRef.current,
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(syntheticEvent, props, newValue, valueRef.current);
        }

        // We need this setTimeout to ensure external updates don't override
        // our internal update immediately
        setTimeout(() => {
          isInternalUpdate.current = false;
        }, 0);
      },
      [onChange, listener?.onChange]
    );

    // Debounced update with stable reference
    const debouncedUpdate = useCallback(
      lodash.debounce(
        (newValue: string) => {
          const validation = validateInput(newValue);
          setError({ show: !validation.isValid, message: validation.message });
          updateValue(newValue, validation);
        },
        parseInt(updatedelay || "10"),
        { leading: parseInt(updatedelay) === 0 }
      ),
      [updatedelay, validateInput, updateValue]
    );

    const debouncedCharLengthUpdate = useCallback(
      lodash.debounce((charLength: number) => {
        if (listener?.onChange) {
          listener.onChange(props.fieldName || name, {
            charlength: charLength,
          });
        }
      }, 10),
      []
    );

    // Handle external value changes without overriding user input
    useEffect(() => {
      // Only update if this is an external change (not triggered by our own code)
      if (datavalue !== valueRef.current && !isInternalUpdate.current) {
        valueRef.current = datavalue;
        setDisplayValue(datavalue);

        if (isDirty) {
          const validation = validateInput(datavalue);
          setError({ show: !validation.isValid, message: validation.message });
        }
      }
    }, [datavalue, isDirty, validateInput]);

    // Setup keyboard shortcut
    useEffect(() => {
      if (!shortcutkey) return;

      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.altKey && e.key.toLowerCase() === shortcutkey.toLowerCase()) {
          e.preventDefault();
          textareaRef.current?.focus();
        }
      };

      window.addEventListener("keydown", handleGlobalKeyDown);
      return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [shortcutkey]);

    const handleUpdateCharLength = useCallback(
      (charLength: number) => {
        // Only update char length when limitdisplaytext is not empty
        if (listener?.onChange && limitdisplaytext !== "") {
          debouncedCharLengthUpdate(charLength);
        }
      },
      [limitdisplaytext, debouncedCharLengthUpdate]
    );

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      // Update ref immediately on change
      valueRef.current = newValue;
      setDisplayValue(newValue);
      isInternalUpdate.current = true;

      // Always update char length regardless of updateon mode
      handleUpdateCharLength(newValue.length);

      if (updateon === "keypress") {
        debouncedUpdate(newValue);
      }

      if (onKeypress) {
        onKeypress(event, listener?.Widgets?.[name]);
      }

      // Reset the flag after a small delay
      setTimeout(() => {
        isInternalUpdate.current = false;
      }, 0);
    }, []);

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLTextAreaElement>) => {
        if (readonly || disabled) {
          return;
        }
        // setIsDirty(true);
        // Important: Update the flag before calling debouncedUpdate
        isInternalUpdate.current = true;

        const currentValue = valueRef.current;

        if (updateon === "blur") {
          // For immediate validation feedback
          const validation = validateInput(currentValue);
          setError({ show: !validation.isValid, message: validation.message });

          // Call the debounced update
          debouncedUpdate(currentValue);
        }
        const validation = validateInput(currentValue);
        if (!validation.isValid && required) {
          setIsDirty(true);
        } else {
          setIsDirty(false);
        }

        if (onBlur) {
          onBlur(event, listener?.Widgets?.[name]);
        }

        // Reset the flag after a small delay
        setTimeout(() => {
          isInternalUpdate.current = false;
        }, 0);
      },
      [updateon, debouncedUpdate, onBlur, listener, name, validateInput, handleUpdateCharLength]
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onFocus) {
          onFocus(event, listener?.Widgets?.[name]);
        }
      },
      [onFocus, listener, name]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
          // Set flag before update
          isInternalUpdate.current = true;
          debouncedUpdate(valueRef.current);
        }

        if (onKeydown) {
          delay(() => {
            onKeydown(event, listener?.Widgets?.[name]);
          }, 0);
        }
      },
      [debouncedUpdate, onKeydown, listener, name]
    );

    const handleKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (onKeyup) {
          delay(() => {
            onKeyup(event, listener?.Widgets?.[name]);
          }, 0);
        }
      },
      [onKeyup, listener, name]
    );

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      setIsTouched(true);
      if (props.onMouseEnter) {
        props.onMouseEnter(event, props, displayValue, valueRef.current);
      }
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      setIsTouched(false);
      if (props.onMouseLeave) {
        props.onMouseLeave(event, props, displayValue, valueRef.current);
      }
    };
    const events = {
      onChange: handleInputChange,
      ...(onFocus ? { onFocus: handleFocus } : {}),
      ...(onKeydown ? { onKeyDown: handleKeyDown } : {}),
      ...(onKeyup ? { onKeyUp: handleKeyUp } : {}),
      ...(updateon === "blur" || onBlur ? { onBlur: handleBlur } : {}),
      ...(props.onMouseEnter ? { onMouseEnter: handleMouseEnter } : {}),
      ...(props.onMouseLeave ? { onMouseLeave: handleMouseLeave } : {}),
      ...(props.onClick ? { onClick: props.onClick } : {}),
    };

    return (
      <>
        <TextField
          multiline
          variant="standard"
          name={name}
          title={props.hint}
          id={id || name}
          placeholder={placeholder || "Place your text here"}
          value={displayValue}
          required={required}
          disabled={disabled}
          error={isDirty && error.show}
          className={clsx(
            "app-input-wrapper",
            isTouched ? "ng-touched" : "ng-untouched",
            isDirty && "ng-invalid"
          )}
          aria-readonly={readonly}
          slotProps={{
            htmlInput: {
              type: "textarea",
              maxLength: maxchars,
              readOnly: readonly,
              tabIndex: tabindex,
              accessKey: shortcutkey,
              "aria-label": arialabel,
              autoFocus: autofocus,
              ref: textareaRef,
              onKeyDown: handleKeyDown,
              onKeyUp: handleKeyUp,
              className: clsx(
                DEFAULT_CLASS,
                className,
                isTouched ? "ng-touched" : "ng-untouched",
                isDirty && "ng-invalid"
              ),
              pattern: regexp,
              style: {
                height: "none",
                resize: "both",
                overflow: "auto",
                ...styles,
              },
            },
          }}
          sx={{
            width: "100%",
          }}
          {...events}
        />
        {maxchars && (
          <Box className="textarea-count">
            {limitdisplaytext.replaceAll("undefined", `${displayValue?.length || 0}`)}
          </Box>
        )}
      </>
    );
  },
  (prev, current) => {
    const keys: (keyof WmTextareaProps)[] = [
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
      "limitdisplaytext",
    ];

    return keys.every(key => prev[key] === current[key]);
  }
);

WmTextarea.displayName = "WmTextarea";

export default withBaseWrapper(withFormController(WmTextarea));
