import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { Input } from "@base-ui-components/react/input";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmSliderProps } from "./props";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

const DEFAULT_CLASS = "app-slider slider";

const WmSlider = memo(
  (props: WmSliderProps) => {
    const {
      class: className,
      disabled = false,
      hint,
      name,
      shortcutkey,
      readonly = false,
      tabindex = 0,
      datavalue = 0,
      minvalue = 0,
      maxvalue = 100,
      step = 1,
      onChange,
      styles,
      listener,
      height,
      width,
      arialabel,
    } = props;

    const [value, setValue] = useState<number>(datavalue);
    const prevDatavalueRef = useRef<number>(datavalue);
    const sliderRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
      if (datavalue !== prevDatavalueRef.current) {
        setValue(datavalue);
        prevDatavalueRef.current = datavalue;
      }
    }, [datavalue, listener]);

    useEffect(() => {
      if (props.datavalue !== value) {
        setValue(props.datavalue || 0);
      }
    }, [props.datavalue]);

    // Fix keyboard event handler type - use regular KeyboardEvent instead of React.KeyboardEvent
    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.altKey && shortcutkey && event.key.toLowerCase() === shortcutkey.toLowerCase()) {
          event.preventDefault();
          sliderRef.current?.focus();
        }
      },
      [shortcutkey]
    );

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(event.target.value);
        setValue(newVal);

        if (listener?.Widgets[name]) {
          listener.Widgets[name].displayValue = newVal;
        }
        if (onChange) {
          onChange(
            event as React.ChangeEvent<any>,
            listener?.Widgets[name as string],
            newVal,
            prevDatavalueRef.current
          );
        }
        if (listener?.onChange) {
          listener.onChange(name, {
            ...props,
            datavalue: newVal,
          });
        }
        prevDatavalueRef.current = newVal;
      },
      [onChange, listener, name]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsTouched(true);
      },
      [listener, name, props, value]
    );

    useEffect(() => {
      // Only disable keyboard shortcuts when disabled OR readonly
      if (!disabled && !readonly) {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
      }
    }, [disabled, readonly, handleKeyDown]);

    useEffect(() => {
      if (disabled || readonly) return;

      const element = sliderRef.current;
      if (!element) return;

      const closestParent = element.closest("[wmList]");
      if (closestParent) {
        const handleParentKeyDown = (event: Event) => {
          const keyEvent = event as KeyboardEvent;
          if ([37, 38, 39, 40].includes(keyEvent.keyCode)) {
            keyEvent.stopPropagation();
          }
        };

        closestParent.addEventListener("keydown", handleParentKeyDown);
        return () => closestParent.removeEventListener("keydown", handleParentKeyDown);
      }
    }, [sliderRef, disabled, readonly]);

    return (
      <Box
        className={clsx(
          DEFAULT_CLASS,
          className,
          isTouched ? "ng-touched" : "ng-untouched",
          isDirty ? "ng-invalid" : "ng-valid"
        )}
        sx={{ ...styles, height: height, width: width }}
      >
        {(minvalue || maxvalue) && (
          <>
            <Box component={"span"} className="app-slider-value pull-left">
              {minvalue || minvalue == 0 ? minvalue : null}
            </Box>
            <Box component={"span"} className="app-slider-value pull-right">
              {maxvalue || maxvalue == 0 ? maxvalue : null}
            </Box>
          </>
        )}
        <Input
          type="range"
          ref={sliderRef}
          className={`range-input ng-dirty ${isTouched ? "ng-touched" : "ng-untouched"} ${isDirty ? "ng-invalid" : "ng-valid"}`}
          step={step}
          value={value}
          onChange={handleInputChange}
          min={minvalue}
          max={maxvalue}
          disabled={disabled} // Only disabled when explicitly disabled, not when readonly
          aria-label={name || "slider"}
          aria-orientation="horizontal"
          role="slider"
          aria-valuenow={value}
          aria-valuemin={minvalue}
          aria-valuemax={maxvalue}
          tabIndex={tabindex}
          title={hint}
          onBlur={handleBlur}
        />
        {/* Add readonly-wrapper only when readonly, disabled gets its own styling from the disabled prop */}
        {readonly && <Box className="readonly-wrapper" aria-readonly="true" />}
      </Box>
    );
  },
  (prev, current) => {
    // Enhanced memo comparison
    const keys: (keyof WmSliderProps)[] = [
      "datavalue",
      "disabled",
      "readonly",
      "minvalue",
      "maxvalue",
      "step",
      "class",
      "styles",
    ];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmSlider.displayName = "WmSlider";

export default withBaseWrapper(withFormController(WmSlider));
