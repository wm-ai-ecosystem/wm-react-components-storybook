import React, { HtmlHTMLAttributes, useCallback, useEffect, useMemo, useRef, memo } from "react";
import { Input } from "@base-ui-components/react/input";
import Box from "@mui/material/Box";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmCheckboxProps } from "./props";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

const DEFAULT_CLS = "app-checkbox checkbox";

export const WmCheckbox = memo(
  (props: WmCheckboxProps) => {
    const {
      caption = "&nbsp;",
      checkedvalue = true,
      uncheckedvalue = false,
      datavalue = null, // Changed default to null
      disabled = false,
      hint,
      arialabel,
      name,
      readonly = false,
      required = false,
      shortcutkey,
      show = true,
      tabindex = 0,
      type,
      onChange,
      onBlur,
      className,
      listener,
      onClick,
      onFocus,
      displayValue,
      ...rest
    } = props;

    const checkboxRef = useRef<HTMLInputElement>(null);
    const prevRefValue = useRef<boolean | null>(null);

    // Keep track of the actual value (not just boolean state)
    const [actualValue, setActualValue] = React.useState(() => {
      // Initialize with null/undefined when datavalue is null/undefined
      if (datavalue === null || datavalue === undefined) return null;
      return datavalue === checkedvalue ? checkedvalue : uncheckedvalue;
    });

    // Determine if checkbox should be visually checked
    const isChecked = useMemo(() => {
      // Only check if actualValue explicitly matches checkedvalue
      return actualValue === checkedvalue;
    }, [actualValue, checkedvalue]);

    // Update actual value when datavalue prop changes
    useEffect(() => {
      if (prevRefValue.current === datavalue) return;
      if (datavalue === null || datavalue === undefined) {
        setActualValue(null);
      } else {
        const isEqual = datavalue === checkedvalue || String(datavalue) === String(checkedvalue);
        const newValue = isEqual ? checkedvalue : uncheckedvalue;
        setActualValue(newValue);
        prevRefValue.current = datavalue;
      }
    }, [datavalue]);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        // Determine the new actual value based on checkbox state
        const newValue = event.target.checked ? checkedvalue : uncheckedvalue;

        // Update our internal state with the actual value
        setActualValue(newValue);
        prevRefValue.current = newValue;

        if (listener?.onChange) {
          listener.onChange(props.fieldName || name, {
            datavalue: newValue, // Pass the actual value, not boolean
          });
        }

        if (listener?.Widgets[name]) {
          // Store the actual value, not just boolean
          listener.Widgets[name].displayValue = newValue;
        }

        if (onChange) {
          // Pass the actual value in the onChange callback
          onChange(event, listener?.Widgets[name], newValue, actualValue ?? uncheckedvalue);
        }
      },
      [checkedvalue, uncheckedvalue, onChange, listener, name, actualValue]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(event, listener?.Widgets[name]);
      },
      [onBlur]
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(event, listener?.Widgets[name]);
      },
      [onFocus]
    );

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (disabled || readonly) {
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        checkboxRef.current?.click();
      }
    }, []);

    const handleClick = (event: any) => {
      // Determine the new actual value based on checkbox state
      if (disabled || readonly) {
        return;
      }
      const newValue = event.target.checked ? checkedvalue : uncheckedvalue;

      if (listener?.Widgets[name]) {
        // Store the actual value, not just boolean
        listener.Widgets[name].displayValue = newValue;
      }

      if (listener?.onClick) {
        listener.onClick(name, {
          ...props,
          datavalue: newValue, // Pass the actual value
        });
      }

      if (onClick) {
        // Pass the actual value in the onClick callback
        onClick(event, listener?.Widgets[name], newValue, actualValue);
      }
    };

    const checkboxClasses = [
      DEFAULT_CLS,
      type === "toggle" ? "app-toggle" : "",
      !isChecked ? "unchecked" : "",
      disabled || readonly ? "disabled" : "",
      required && caption ? "required" : "",
      className || "",
    ]
      .filter(Boolean)
      .join(" ");

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      if (props.onMouseEnter) {
        props.onMouseEnter(
          event,
          props,
          displayValue,
          actualValue as string | number | null | undefined
        );
      }
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      if (props.onMouseLeave) {
        props.onMouseLeave(
          event,
          props,
          displayValue,
          actualValue as string | number | null | undefined
        );
      }
    };

    const events = {
      ...(props.onMouseEnter ? { onMouseEnter: handleMouseEnter } : {}),
      ...(props.onMouseLeave ? { onMouseLeave: handleMouseLeave } : {}),
      ...(props.onClick ? { onClick: handleClick } : {}),
      ...(props.onFocus ? { onFocus: handleFocus } : {}),
    };

    return (
      <div
        hidden={props.hidden ?? false}
        className={checkboxClasses}
        style={{ height: "100%" }}
        {...((name ? { name } : {}) as HtmlHTMLAttributes<HTMLDivElement>)}
        {...((caption ? { caption } : {}) as HtmlHTMLAttributes<HTMLDivElement>)}
        {...(type === "toggle" ? { type: "toggle" } : {})}
        disabled={disabled}
      >
        <Box
          component="label"
          className={`wm-checkbox-label ${!isChecked ? "unchecked" : ""} ${disabled || readonly ? "disabled" : ""} ${required && caption ? "required" : ""}`}
          onKeyDown={handleKeyDown}
          style={props.styles}
        >
          <Input
            {...events}
            type="checkbox"
            ref={checkboxRef}
            aria-readonly={readonly}
            checked={isChecked} // Use the computed isChecked value
            {...(!readonly && !disabled ? { onChange: handleChange, onClick: handleClick } : {})}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            name={name}
            aria-label={arialabel}
            accessKey={shortcutkey}
            tabIndex={tabindex}
            title={hint}
            className={`${disabled || readonly ? "disabled" : ""}`}
          />
          <Box component="span" className="caption" dangerouslySetInnerHTML={{ __html: caption }} />
          <Box
            component="img"
            alt="Checkbox Image"
            aria-hidden="true"
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            className="switch"
            width="auto"
            height="auto"
          />
        </Box>
        {/* Hidden input now contains the actual value */}
        <Input
          type="hidden"
          className="ng-hide model-holder"
          aria-hidden="true"
          tabIndex={-1}
          disabled={disabled}
          value={actualValue === null || actualValue === undefined ? "false" : String(actualValue)} // Handle null/undefined values
        />
      </div>
    );
  },
  (prev: WmCheckboxProps, next: WmCheckboxProps) => {
    const keys: (keyof WmCheckboxProps)[] = [
      "datavalue",
      "checkedvalue",
      "uncheckedvalue",
      "disabled",
      "readonly",
      "required",
      "shortcutkey",
      "show",
      "tabindex",
      "type",
      "className",
      "hidden",
    ];
    return keys.every(key => prev[key] === next[key]);
  }
);

WmCheckbox.displayName = "WmCheckbox";

export default withBaseWrapper(withFormController(WmCheckbox));
