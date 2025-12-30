import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment-timezone";
import clsx from "clsx";
import withBaseDateTime from "@wavemaker/react-runtime/higherOrder/BaseDateTime";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";
import { WmTimeProps, ValidationResult } from "./props";
import {
  parseTimeFormat,
  parseTimeValue,
  formatDisplayTimeValue,
  validateTimeRange,
  validateTimeFormat,
  parseTimeObj,
  DEFAULT_TIMEPATTERN,
  DEFAULT_OUTPUT_FORMAT,
  DEFAULT_CLASS,
  TIME_PICKER_STYLES,
  updateListener,
  createWidgetEvent,
} from "./utils";

const WmTime = (props: WmTimeProps) => {
  // Destructure props with defaults
  const {
    name,
    required = false,
    placeholder = "Select time",
    hint,
    arialabel,
    tabindex = 0,
    shortcutkey,
    datavalue,
    timepattern = DEFAULT_TIMEPATTERN,
    hourstep = 1,
    minutestep = 1,
    outputformat = DEFAULT_OUTPUT_FORMAT,
    mintime,
    maxtime,
    autofocus = false,
    readonly = false,
    disabled = false,
    showdropdownon = "default",
    secondsstep = 1,
    dataentrymode = "default",
    className,
    invokeOnChange,
    setShowPicker,
    showPicker,
    listener,
    onChange,
    onClick,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onBeforeload,
    showampmbuttons = false,
  } = props;

  // State
  const [internalValue, setInternalValue] = useState<moment.Moment | null>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [isCurrentTime, setIsCurrentTime] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<ValidationResult>({ isValid: true });

  // Refs
  const onBeforeloadExecutedRef = useRef(false);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  // Computed values
  const isReadOnly = useMemo(
    () => readonly || (dataentrymode !== "undefined" && dataentrymode !== "default"),
    [readonly, dataentrymode]
  );

  const timeFormatOptions = useMemo(() => parseTimeFormat(timepattern), [timepattern]);
  const minTimeObj = useMemo(() => parseTimeObj(mintime), [mintime]);
  const maxTimeObj = useMemo(() => parseTimeObj(maxtime), [maxtime]);
  // Helper functions
  const isDropDownDisplayEnabledOnInput = useCallback(
    (dropdownvalue: string): boolean => dropdownvalue === "default",
    []
  );
  const handleTimeChange = useCallback(
    (newTime: Date | null, event: React.SyntheticEvent, shouldClosePicker = false) => {
      if (!newTime) {
        const oldValue = displayValue;
        setInternalValue(null);
        setDisplayValue("");
        setValidationResult({ isValid: true });

        invokeOnChange?.("", { $event: event, type: "change" });
        if (name && listener?.Widgets[name]) {
          listener.Widgets[name].displayValue = "";
        }
        updateListener(name, listener, props, "", null, "");
        if (onChange && name && listener?.Widgets[name]) {
          onChange(event, listener?.Widgets[name], "", oldValue);
        }

        if (shouldClosePicker) setShowPicker?.(false);
        return;
      }
      const validation = validateTimeRange(newTime, minTimeObj, maxTimeObj);
      setValidationResult(validation);
      if (validation.isValid) {
        setInternalValue(moment(newTime));
        const formattedValue = formatDisplayTimeValue(newTime, timepattern);
        setDisplayValue(formattedValue);
        invokeOnChange?.(newTime, { $event: event, type: "change" });
        if (name && listener?.Widgets[name]) {
          listener.Widgets[name].displayValue = formattedValue;
        }
        updateListener(
          name,
          listener,
          props,
          formattedValue,
          formatDisplayTimeValue(newTime, "timestamp"),
          formatDisplayTimeValue(newTime, outputformat)
        );
        if (onChange && name && listener?.Widgets[name]) {
          onChange(event, name && listener?.Widgets[name], formattedValue, displayValue);
        }
      }
      if (shouldClosePicker) setShowPicker?.(false);
    },
    [
      minTimeObj,
      maxTimeObj,
      timepattern,
      invokeOnChange,
      setShowPicker,
      name,
      listener,
      props,
      onChange,
      displayValue,
    ]
  );
  const handlePickerAccept = useCallback(
    (value: moment.Moment | null) => {
      if (value && value.isValid()) {
        const changeEvent = createWidgetEvent({
          type: "change",
          name,
          value: value,
          anchor: anchorRef.current,
          originalEvent: event,
        });
        handleTimeChange(value.toDate(), changeEvent, true);
      }
    },
    [handleTimeChange]
  );
  const handlePickerClose = useCallback(() => {
    setShowPicker?.(false);
  }, [setShowPicker]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const inputValue = event.target.value;

        if (!inputValue) {
          handleTimeChange(null, event, false);
          return;
        }
        const formatValidation = validateTimeFormat(inputValue, timepattern, required);
        if (!formatValidation.isValid) {
          setValidationResult(formatValidation);
          setDisplayValue(inputValue);
          return;
        }
        const parsedTime = parseTimeValue(inputValue, timepattern);
        if (parsedTime && parsedTime.isValid()) {
          const rangeValidation = validateTimeRange(parsedTime.toDate(), minTimeObj, maxTimeObj);
          setValidationResult(rangeValidation);

          if (rangeValidation.isValid) {
            handleTimeChange(parsedTime.toDate(), event, false);
          } else {
            setDisplayValue(inputValue);
          }
        } else {
          if (required) {
            setValidationResult({
              isValid: false,
              errorType: "format",
              message: `Invalid time format. Expected: ${timepattern}`,
            });
          }

          setDisplayValue(inputValue);
        }
      } catch (error) {
        console.error("Error in handleInputChange:", error);
        setValidationResult({
          isValid: false,
          errorType: "format",
          message: "Error processing input",
        });
      }
    },
    [handleTimeChange, timepattern, minTimeObj, maxTimeObj]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      try {
        if (disabled || readonly || isCurrentTime) return;

        // Ensure the input gets focus on click
        if (anchorRef.current && !anchorRef.current.contains(document.activeElement)) {
          anchorRef.current.focus();
        }

        if (isDropDownDisplayEnabledOnInput(showdropdownon)) {
          setShowPicker?.(true);
        }
        if (onClick && name) {
          onClick(event, listener?.Widgets[name]);
        }
      } catch (error) {
        console.error("Error in handleClick:", error);
      }
    },
    [
      disabled,
      readonly,
      isCurrentTime,
      showdropdownon,
      isDropDownDisplayEnabledOnInput,
      setShowPicker,
    ]
  );

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      try {
        if (shortcutkey && event.altKey && event.key.toLowerCase() === shortcutkey.toLowerCase()) {
          event.preventDefault();
          anchorRef.current?.focus();
          return;
        }
        if (isDropDownDisplayEnabledOnInput(showdropdownon)) {
          if (event.key === "Enter" || event.key === "ArrowDown") {
            event.preventDefault();
            setShowPicker?.(true);
          } else if (event.key === "Escape") {
            setShowPicker?.(false);
          }
        }
      } catch (error) {
        console.error("Error in handleInputKeyDown:", error);
      }
    },
    [shortcutkey, showdropdownon, isDropDownDisplayEnabledOnInput, setShowPicker]
  );
  const handleTimePickerChange = useCallback(
    (newValue: moment.Moment | null) => {
      if (newValue && newValue.isValid()) {
        const newDate = newValue.toDate();
        setInternalValue(moment(newDate));
        setDisplayValue(formatDisplayTimeValue(newDate, timepattern));
      } else {
        setInternalValue(null);
        setDisplayValue("");
      }
    },
    [timepattern]
  );

  // Data value effect
  useEffect(() => {
    if (datavalue === "CURRENT_TIME") {
      setIsCurrentTime(true);
      const now = moment();
      setInternalValue(now);
      setDisplayValue(formatDisplayTimeValue(now, timepattern));

      timeIntervalRef.current = setInterval(() => {
        const current = moment();
        setInternalValue(current);
        setDisplayValue(formatDisplayTimeValue(current, timepattern));
        updateListener(
          name,
          listener,
          props,
          formatDisplayTimeValue(current, timepattern),
          formatDisplayTimeValue(current, "timestamp"),
          formatDisplayTimeValue(current, outputformat)
        );
      }, 1000);
    } else {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
        timeIntervalRef.current = null;
      }
      setIsCurrentTime(false);
      if (datavalue) {
        let parsed;
        if (typeof datavalue === "string" && /^\d+$/.test(datavalue)) {
          parsed = moment(parseInt(datavalue, 10));
        } else if (typeof datavalue === "number") {
          parsed = moment(datavalue);
        } else if (datavalue instanceof Date) {
          parsed = moment(datavalue);
        } else {
          parsed = moment(datavalue, timepattern);
        }
        setInternalValue(parsed);
        setDisplayValue(formatDisplayTimeValue(parsed, timepattern));
        updateListener(
          name,
          listener,
          props,
          formatDisplayTimeValue(parsed, timepattern),
          formatDisplayTimeValue(parsed, "timestamp"),
          formatDisplayTimeValue(parsed, outputformat)
        );
      } else {
        setInternalValue(null);
        setDisplayValue("");
      }
    }

    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
        timeIntervalRef.current = null;
      }
    };
  }, [datavalue, timepattern]);

  // Shortcut key setup
  useEffect(() => {
    if (!shortcutkey) return;
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === shortcutkey.toLowerCase()) {
        event.preventDefault();
        anchorRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [shortcutkey]);

  useEffect(() => {
    if (
      onBeforeload &&
      name &&
      props.listener?.Widgets?.[name] &&
      !onBeforeloadExecutedRef.current
    ) {
      const beforeEvent = createWidgetEvent({
        type: "beforeload",
        name,
        value: displayValue,
        anchor: anchorRef.current,
      });
      onBeforeload(beforeEvent, props.listener?.Widgets?.[name]);
      onBeforeloadExecutedRef.current = true;
    }
  }, []);

  // Render the main TextField component
  const renderTextField = useCallback(
    () => (
      <TextField
        inputRef={anchorRef}
        autoFocus={autofocus && !disabled && !readonly && !isReadOnly}
        fullWidth
        name={name}
        required={required}
        disabled={disabled || readonly}
        aria-readonly={readonly || isCurrentTime}
        value={displayValue}
        onChange={handleInputChange}
        onClick={handleClick}
        onFocus={event => onFocus && name && onFocus(event, listener?.Widgets[name])}
        onBlur={event =>
          onBlur && name && listener?.Widgets?.[name]
            ? onBlur(event, listener.Widgets[name])
            : undefined
        }
        onMouseEnter={event =>
          onMouseEnter && name && listener?.Widgets?.[name]
            ? onMouseEnter(event, listener.Widgets[name])
            : undefined
        }
        onMouseLeave={event =>
          onMouseLeave && name && listener?.Widgets?.[name]
            ? onMouseLeave(event, listener.Widgets[name])
            : undefined
        }
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        error={!validationResult.isValid}
        helperText={validationResult.message || ""}
        slotProps={{
          htmlInput: {
            tabIndex: readonly || isReadOnly || isCurrentTime ? -1 : tabindex,
            readOnly: isReadOnly || readonly || isCurrentTime,
            className: "form-control app-textbox app-dateinput display-input",
            "aria-label": arialabel || placeholder,
            accessKey: shortcutkey,
            role: "timer",
            "aria-atomic": isCurrentTime ? "true" : "false",
            title: hint,
            onFocus:
              readonly || isReadOnly || isCurrentTime
                ? (e: React.FocusEvent<HTMLInputElement>) => e.target.blur()
                : undefined,
          },
        }}
        InputProps={{
          className: readonly || isReadOnly ? "readonly" : "",
          endAdornment: (
            <Box component="span" className="input-group-btn dropdown-toggle">
              <Button
                className="btn btn-default btn-date"
                variant="contained"
                disableRipple={false}
                onClick={() => setShowPicker?.(true)}
                aria-label="Select time"
                aria-haspopup="true"
                aria-expanded={showPicker ? "true" : "false"}
                tabIndex={readonly || isReadOnly || isCurrentTime ? -1 : tabindex}
                disableTouchRipple={true}
                disabled={disabled || readonly || isCurrentTime}
              >
                <span className="app-icon wm-sl-l sl-time" aria-hidden="true" />
              </Button>
            </Box>
          ),
        }}
      />
    ),
    [
      name,
      required,
      disabled,
      isCurrentTime,
      displayValue,
      handleInputChange,
      handleClick,
      handleInputKeyDown,
      placeholder,
      tabindex,
      arialabel,
      shortcutkey,
      isReadOnly,
      readonly,
      validationResult,
      setShowPicker,
      showPicker,
      hint,
    ]
  );

  const views: ("hours" | "minutes" | "seconds")[] = ["hours", "minutes"];
  if (timeFormatOptions.hasSeconds) views.push("seconds");

  return (
    <Box hidden={props.hidden} className={clsx(DEFAULT_CLASS, className)}>
      {renderTextField()}
      {showPicker && (
        <TimePicker
          disableIgnoringDatePartForTimeValidation
          open={showPicker}
          onClose={handlePickerClose}
          onAccept={handlePickerAccept}
          value={internalValue}
          onChange={handleTimePickerChange}
          timeSteps={{ minutes: minutestep, hours: hourstep, seconds: secondsstep }}
          minTime={minTimeObj ? moment(minTimeObj) : undefined}
          maxTime={maxTimeObj ? moment(maxTimeObj) : undefined}
          ampm={timeFormatOptions.is12Hour && showampmbuttons}
          views={views}
          skipDisabled
          ampmInClock={timeFormatOptions.is12Hour}
          format={timepattern}
          slotProps={{
            textField: { hidden: true },
            popper: {
              anchorEl: anchorRef.current,
              placement: "bottom-start",
              sx: TIME_PICKER_STYLES,
            },
            actionBar: { actions: ["accept"] },
          }}
        />
      )}
    </Box>
  );
};

WmTime.displayName = "WmTime";
export default withBaseDateTime(withFormController(WmTime));
