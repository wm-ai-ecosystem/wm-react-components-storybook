import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { Input } from "@base-ui-components/react/input";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmSliderProps, MarkerItem } from "./props";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";
import { convertDataToObject } from "@wavemaker/react-runtime/utils/transformedDataset-utils";

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
      datavalue,
      minvalue = 0,
      maxvalue = 100,
      step = 1,
      onChange,
      styles,
      listener,
      arialabel,
      showmarkers = false,
      markerlabeltext,
    } = props;

    // Always provide a number value to keep the input controlled
    const initialValue = datavalue !== undefined ? datavalue : (minvalue + maxvalue) / 2;
    const [value, setValue] = useState<number>(initialValue);
    const prevDatavalueRef = useRef<number>(initialValue);
    const sliderRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState(false);
    const [markerItems, setMarkerItems] = useState<MarkerItem[]>([]);

    useEffect(() => {
      const newValue = datavalue !== undefined ? datavalue : (minvalue + maxvalue) / 2;
      if (datavalue !== prevDatavalueRef.current) {
        setValue(newValue);
        prevDatavalueRef.current = newValue;
      }
    }, [datavalue, listener, minvalue, maxvalue]);

    useEffect(() => {
      if (props.datavalue !== undefined && props.datavalue !== value) {
        setValue(props.datavalue);
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

    const getMarkersItems = useCallback(() => {
      const sliderTrack = sliderRef.current;
      if (!sliderTrack) return;

      const trackWidth = sliderTrack.offsetWidth - 9 || 0;

      // Calculate tick count based on min/max/step values
      let tickCount = 0;
      if (props.minvalue !== undefined && props.maxvalue !== undefined) {
        tickCount = step > 0 ? Math.floor((props.maxvalue - props.minvalue) / step) + 1 : 0;
      } else {
        tickCount = step > 0 ? Math.floor(100 / step) + 1 : 0;
      }

      // Convert marker label text to object format
      const labels = convertDataToObject(markerlabeltext);
      const newMarkerItems: MarkerItem[] = [];

      for (let i = 0; i < tickCount; i++) {
        const left = (trackWidth / (tickCount - 1)) * i;
        const label =
          labels?.[i]?.dataValue ??
          (Array.isArray(labels)
            ? typeof labels[i] === "object" && labels[i]?.title
              ? labels[i].title
              : labels[i]
            : `${i}`);
        const position =
          Array.isArray(labels) && typeof labels[i] === "object" && labels[i]?.position
            ? labels[i].position
            : "up";

        newMarkerItems.push({ label, position, left });
      }

      setMarkerItems(newMarkerItems);
    }, [props.minvalue, props.maxvalue, step, markerlabeltext]);

    useEffect(() => {
      if (showmarkers) {
        getMarkersItems();
      }
    }, [props.minvalue, props.maxvalue, step, markerlabeltext, showmarkers]);

    return (
      <Box
        hidden={props.hidden}
        className={clsx(
          DEFAULT_CLASS,
          className,
          isTouched ? "ng-touched" : "ng-untouched",
          isDirty ? "ng-invalid" : "ng-valid"
        )}
        style={styles}
      >
        {!showmarkers && (minvalue || maxvalue) && (
          <>
            <Box component={"span"} className="app-slider-value fa-pull-left">
              {minvalue || minvalue == 0 ? minvalue : null}
            </Box>
            <Box component={"span"} className="app-slider-value fa-pull-right">
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
          aria-label={arialabel}
          aria-orientation="horizontal"
          role="slider"
          aria-valuenow={value}
          aria-valuemin={minvalue}
          aria-valuemax={maxvalue}
          tabIndex={tabindex}
          title={props.datavalue !== undefined ? String(value) : "undefined"}
          onBlur={handleBlur}
        />
        {/* Add readonly-wrapper only when readonly, disabled gets its own styling from the disabled prop */}
        {readonly && <Box className="readonly-wrapper" aria-readonly="true" />}
        {showmarkers && (
          <Box className="marker-container">
            {markerItems.map((marker, index) => (
              <span
                key={index}
                className="marker-wrapper"
                style={{ left: marker.left + "px" }}
                title={marker.label}
              >
                <span className={`marker-label ${marker.position}`} title={marker.label}>
                  {marker.label}
                </span>
                <span className="marker-dot" title={marker.label}></span>
              </span>
            ))}
          </Box>
        )}
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
      "hidden",
      "showmarkers",
      "markerlabeltext",
    ];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmSlider.displayName = "WmSlider";

export default withBaseWrapper(withFormController(WmSlider));
