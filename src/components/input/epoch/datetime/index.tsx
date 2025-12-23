import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment-timezone";

import clsx from "clsx";
import withBaseDateTime from "@wavemaker/react-runtime/higherOrder/BaseDateTime";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";
import { WmDateTimeProps } from "./props";
import {
  ensureTime,
  mapToMomentPattern,
  getTimezone,
  parseDateWithCurrent,
  parseExcludedDays,
  parseExcludedDates,
  formatDate,
  parseDateValue,
  validateDate,
  shouldDisableDate,
  getTimeViews,
  updateListener,
} from "./utils";
import { datePickerSx, timePickerSx, buttonStyles } from "./styled";
import { useAppSelector } from "@wavemaker/react-runtime/store";

const DEFAULT_CLS = "app-datetime input-group";

export const WmDateTime: React.FC<WmDateTimeProps> = props => {
  const {
    name,
    placeholder = "Select Date Time",
    hint,
    tabindex = 0,
    shortcutkey,
    datavalue,
    datepattern: datepatternProp,
    hourstep = 1,
    minutestep = 15,
    outputformat = "timestamp",
    required = false,
    mindate,
    maxdate,
    excludedays,
    excludedates,
    showweeks = false,
    autofocus = false,
    readonly = false,
    disabled = false,
    selectfromothermonth = true,
    todaybutton = true,
    clearbutton = true,
    adaptiveposition = true,
    showdropdownon = "default",
    dataentrymode = "default",
    width,
    arialabel,
    className,
    isValidDate,
    formatValidation,
    updatePrevDatavalue,
    updateBoundVariable,
    onChange,
    onClick,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onBeforeload,
    listener,
    floatinglabel,
    styles,
    showampmbuttons = false,
  } = props;

  const defaultDateTimeFormat =
    useAppSelector((state: any) => `${state.i18n.dateFormat} ${state.i18n.timeFormat}`) ||
    "MMM d, y h:mm:ss a";

  const datepattern = useMemo(
    () => datepatternProp ?? defaultDateTimeFormat,
    [datepatternProp, defaultDateTimeFormat]
  );

  // State management
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [isTimeOpen, setIsTimeOpen] = useState<boolean>(false);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [isCurrentDate, setIsCurrentDate] = useState<boolean>(false);
  const [localDateValue, setLocalDateValue] = useState<Date | null>(null);
  const [invalidFormat, setInvalidFormat] = useState<boolean>(false);
  const [dateNotInRange, setDateNotInRange] = useState<boolean>(false);
  const [tempDateValue, setTempDateValue] = useState<Date | null>(null);
  const [datePickerView, setDatePickerView] = useState<"year" | "month" | "day">("day");
  const [isCurrentMonth, setIsCurrentMonth] = useState<boolean>(true);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const onBeforeloadExecutedRef = useRef(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  // Computed values
  const isReadOnly = useMemo(
    () =>
      readonly || isCurrentDate || (dataentrymode !== "undefined" && dataentrymode !== "default"),
    [readonly, dataentrymode, isCurrentDate]
  );

  const shouldOpenOnInput = useMemo(() => {
    return showdropdownon === "default" && dataentrymode !== "picker";
  }, [showdropdownon, dataentrymode]);

  // Parse min/max dates with CURRENT_DATE support
  const minDateObj = useMemo(() => {
    return parseDateWithCurrent(mindate, "min");
  }, [mindate]);

  const maxDateObj = useMemo(() => {
    return parseDateWithCurrent(maxdate, "max");
  }, [maxdate]);

  const excludedDaysArray = useMemo(() => {
    return parseExcludedDays(excludedays);
  }, [excludedays]);

  const excludedDatesArray = useMemo(() => {
    return parseExcludedDates(excludedates);
  }, [excludedates]);

  // Format date utility
  const formatDateWithPattern = useCallback(
    (date: Date | null, pattern: string = datepattern): string => {
      return formatDate(date, pattern, getTimezone());
    },
    [datepattern]
  );

  // Validate date
  const validateDateWithProps = useCallback(
    (date: Date | null): boolean => {
      if (!date) return true;

      const validation = validateDate(
        date,
        minDateObj,
        maxDateObj,
        excludedDaysArray,
        excludedDatesArray
      );
      setDateNotInRange(validation.isOutOfRange);
      return validation.isValid;
    },
    [minDateObj, maxDateObj, excludedDaysArray, excludedDatesArray]
  );

  // Handle final date change
  const handleFinalDateChange = useCallback(
    (date: Date | null, event?: React.SyntheticEvent) => {
      if (!date) {
        setLocalDateValue(null);
        setDisplayValue("");
        setInvalidFormat(false);
        setDateNotInRange(false);
        if (updatePrevDatavalue) {
          updatePrevDatavalue(null);
        }
        if (updateBoundVariable) {
          updateBoundVariable(null);
        }
        updateListener(name, listener, "", "", props, onChange, displayValue, "");
        return;
      }
      const dateString = formatDateWithPattern(date);
      if (required && formatValidation && !formatValidation(date, dateString)) {
        setInvalidFormat(true);
        return;
      }
      if (!validateDateWithProps(date)) {
        return;
      }

      const oldValue = displayValue;
      setLocalDateValue(date);
      setDisplayValue(dateString);
      setInvalidFormat(false);

      const outputValue =
        outputformat === "timestamp"
          ? date.getTime().toString()
          : formatDateWithPattern(date, outputformat);

      if (updatePrevDatavalue) {
        updatePrevDatavalue(date);
      }
      if (updateBoundVariable) {
        updateBoundVariable(date);
      }
      updateListener(
        name,
        listener,
        dateString,
        outputValue,
        props,
        onChange,
        oldValue,
        formatDateWithPattern(date, "timestamp")
      );
    },
    [
      formatDateWithPattern,
      formatValidation,
      validateDateWithProps,
      updatePrevDatavalue,
      updateBoundVariable,
      outputformat,
      displayValue,
      name,
      listener,
      onChange,
      props,
    ]
  );

  // Handle date selection - now updates immediately
  const handleDateSelection = useCallback(
    (date: Date | null) => {
      if (!date) {
        handleFinalDateChange(null);
        setIsDateOpen(false);
        setIsTimeOpen(false);
        setTempDateValue(null);
        return;
      }
      // Validate date format
      const dateString = formatDateWithPattern(date);
      if (formatValidation && required && !formatValidation(date, dateString)) {
        setInvalidFormat(true);
        return;
      }
      // Validate min/max date and excluded dates/days
      if (!validateDateWithProps(date)) {
        return;
      }
      // If we have an existing time component, preserve it
      let finalDate = date;
      if (localDateValue) {
        const existingMoment = moment(localDateValue);
        finalDate = moment(date)
          .hour(existingMoment.hour())
          .minute(existingMoment.minute())
          .second(existingMoment.second())
          .toDate();
      }
      // Update immediately with the new date (preserving existing time if any)
      if (datePickerView === "day") {
        const dateWithTime = ensureTime(finalDate);
        setTempDateValue(dateWithTime);
        setLocalDateValue(dateWithTime);
        setDisplayValue(formatDateWithPattern(dateWithTime));
        setTimeout(() => {
          setIsDateOpen(false);
          setIsTimeOpen(true);
        }, 0);
      } else {
        setTempDateValue(finalDate);
      }
    },
    [formatDateWithPattern, formatValidation, validateDateWithProps, localDateValue, datePickerView]
  );

  // Handle date picker accept (when user completes date selection)
  const handleDateAccept = useCallback(() => {
    if (tempDateValue) {
      setIsDateOpen(false);
      setIsTimeOpen(true);
    }
    setIsCurrentMonth(true);
  }, [tempDateValue]);

  // Handle date picker close
  const handleDateClose = useCallback(() => {
    setIsDateOpen(false);
    setIsTimeOpen(false);
    setDatePickerView("day");
    setIsCurrentMonth(true);
  }, []);

  const handleVeiwChange = useCallback((view: any) => {
    setDatePickerView(view);
  }, []);

  // Handle time selection
  const handleTimeSelection = useCallback(
    (time: Date | null) => {
      if (!time || !tempDateValue) return;
      const combinedDateTime = moment(tempDateValue)
        .hour(moment(time).hour())
        .minute(moment(time).minute())
        .second(moment(time).second())
        .toDate();
      setLocalDateValue(combinedDateTime);
      setDisplayValue(formatDateWithPattern(combinedDateTime));
      setTempDateValue(combinedDateTime);
    },
    [tempDateValue, formatDateWithPattern]
  );

  // Handle time picker accept (OK button or outside click)
  const handleTimeAccept = useCallback(() => {
    setIsTimeOpen(false);
    setTempDateValue(null);
  }, [tempDateValue, handleFinalDateChange]);

  // Handle time picker cancel
  const handleTimeCancel = useCallback(() => {
    setIsTimeOpen(false);
    setTempDateValue(null);
    setDisplayValue(localDateValue ? formatDateWithPattern(localDateValue) : "");
  }, [localDateValue, formatDateWithPattern]);

  // Handle time picker close (outside click)
  const handleTimeClose = useCallback(() => {
    if (tempDateValue) {
      handleFinalDateChange(tempDateValue);
    }
    setIsTimeOpen(false);
    setTempDateValue(null);
  }, [tempDateValue, handleFinalDateChange]);

  // Handle input change
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (dataentrymode === "picker") return;
      const value = event.target.value;
      setDisplayValue(value);
      if (!value) {
        handleFinalDateChange(null, event);
        return;
      }
      try {
        const momentPattern = mapToMomentPattern(datepattern);
        const parsedDate = moment(value, momentPattern, true);
        if (parsedDate.isValid()) {
          const dateObj = parsedDate.toDate();
          if (isValidDate && isValidDate(dateObj)) {
            handleFinalDateChange(dateObj, event);
          } else {
            handleFinalDateChange(dateObj, event);
          }
        } else {
          if (required) {
            setInvalidFormat(true);
          }
        }
      } catch (error) {
        if (required) {
          setInvalidFormat(true);
        }
      }
    },
    [datepattern, handleFinalDateChange, isValidDate, dataentrymode, required]
  );

  // Handle input click
  const handleInputClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (readonly) return;
      if (onClick && name) {
        onClick(event, listener?.Widgets?.[name]);
      }
      if (shouldOpenOnInput && !readonly && !disabled && !isCurrentDate) {
        setIsDateOpen(true);
        setIsTimeOpen(false);
        setTempDateValue(null);
      }
    },
    [shouldOpenOnInput, readonly, disabled, isCurrentDate, onClick, name, listener]
  );

  // Toggle date picker
  const toggleDatePicker = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || readonly || isCurrentDate) return;
      setIsDateOpen(prev => !prev);
      setIsTimeOpen(false);
      setTempDateValue(null);
    },
    [disabled, readonly, isCurrentDate]
  );

  // Toggle time picker
  const toggleTimePicker = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || readonly || isCurrentDate) return;
      let dateForTimeSelection = localDateValue;
      dateForTimeSelection = ensureTime(dateForTimeSelection) || new Date();
      setTempDateValue(dateForTimeSelection);
      setIsTimeOpen(prev => !prev);
      setIsDateOpen(false);
    },
    [disabled, readonly, isCurrentDate, localDateValue]
  );

  // Key down handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (props.handleKeyDown) {
        props.handleKeyDown(event);
      }
      if (shortcutkey && event.altKey && event.key.toLowerCase() === shortcutkey.toLowerCase()) {
        event.preventDefault();
        inputRef.current?.focus();
        return;
      }

      switch (event.key) {
        case "Enter":
        case "ArrowDown":
          if (shouldOpenOnInput) {
            event.preventDefault();
            setIsDateOpen(true);
          }
          break;
        case "Escape":
          if (isTimeOpen) {
            handleTimeCancel();
          } else {
            setIsDateOpen(false);
            setIsTimeOpen(false);
          }
          break;
      }
    },
    [props, isTimeOpen, handleTimeCancel, shouldOpenOnInput, shortcutkey]
  );

  // shouldDisableDate function for DatePicker
  const shouldDisableDateCallback = useCallback(
    (date: moment.Moment | null) => {
      return shouldDisableDate(date, excludedDaysArray, excludedDatesArray);
    },
    [excludedDaysArray, excludedDatesArray]
  );

  // Handle today click
  const handleToday = useCallback(() => {
    const today = moment().toDate();
    handleFinalDateChange(today);
    setIsTimeOpen(true);
  }, [handleFinalDateChange]);

  // Handle clear click
  const handleClear = useCallback(() => {
    handleFinalDateChange(null);
  }, [handleFinalDateChange]);

  // Call onBeforeload callback on component mount
  useEffect(() => {
    if (onBeforeload && name && listener?.Widgets?.[name] && !onBeforeloadExecutedRef.current) {
      const syntheticEvent = {} as React.SyntheticEvent;
      onBeforeload(syntheticEvent, listener.Widgets[name]);
      onBeforeloadExecutedRef.current = true;
    }
  }, [onBeforeload, name, listener]);

  const syncDataValueToState = useCallback(() => {
    if (datavalue === "CURRENT_DATE") {
      const currentTime = moment().tz(getTimezone()).toDate();
      const display_time = formatDateWithPattern(currentTime);
      setLocalDateValue(currentTime);
      setDisplayValue(display_time);
      setIsCurrentDate(true);
      updateListener(
        name,
        listener,
        display_time,
        formatDateWithPattern(currentTime, outputformat),
        props,
        undefined,
        "",
        formatDateWithPattern(currentTime, "timestamp")
      );
    } else {
      setIsCurrentDate(false);
      const parsedDate = parseDateValue(datavalue, datepattern);
      if (!parsedDate && datavalue) {
        if (typeof datavalue === "string" || typeof datavalue === "number") {
          setDisplayValue(String(datavalue));
        }
        setLocalDateValue(null);
      } else {
        if (datavalue == undefined) {
          setLocalDateValue(null);
          setDisplayValue("");
          return;
        }
        setLocalDateValue(parsedDate);
        const formattedValue = formatDateWithPattern(parsedDate);
        setDisplayValue(formattedValue);
        updateListener(
          name,
          listener,
          formattedValue,
          formatDateWithPattern(parsedDate, outputformat),
          props,
          undefined,
          "",
          formatDateWithPattern(parsedDate, "timestamp")
        );
      }
    }
  }, [datavalue, datepattern, formatDateWithPattern]);

  useEffect(() => {
    if (datavalue === "CURRENT_DATE") {
      syncDataValueToState();
      const interval = setInterval(syncDataValueToState, 1000);
      return () => clearInterval(interval);
    } else {
      syncDataValueToState();
    }
  }, [datavalue, syncDataValueToState]);

  // Auto focus
  useEffect(() => {
    if (autofocus && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(timer);
    }
  }, [autofocus]);

  const timeViews = getTimeViews(datepattern);

  return (
    <Box
      style={styles}
      ref={anchorRef}
      className={clsx(DEFAULT_CLS, className?.replace("form-control", ""))}
      title={hint}
      hidden={props.hidden}
    >
      <TextField
        disabled={disabled || readonly}
        aria-readonly={readonly}
        inputRef={inputRef}
        aria-label={arialabel}
        name={name}
        tabIndex={readonly || disabled || isCurrentDate ? -1 : tabindex}
        type="text"
        value={displayValue}
        label={floatinglabel}
        onClick={handleInputClick}
        onFocus={event => {
          // Prevent focus if readonly, disabled, or current date
          if (readonly || disabled || isCurrentDate) {
            event.target.blur();
            return;
          }
          // Call custom onFocus callback if conditions are met
          if (onFocus && name) {
            onFocus(event, listener?.Widgets[name]);
          }
        }}
        onBlur={event => {
          if (readonly) return;
          onBlur && name && onBlur(event, listener?.Widgets[name]);
        }}
        onChange={handleInputChange}
        onMouseEnter={event =>
          onMouseEnter && name && onMouseEnter(event, listener?.Widgets?.[name])
        }
        onMouseLeave={event =>
          onMouseLeave && name && onMouseLeave(event, listener?.Widgets?.[name])
        }
        autoFocus={autofocus}
        required={required}
        error={invalidFormat || dateNotInRange}
        helperText={
          invalidFormat ? "Invalid date format" : dateNotInRange ? "Date not in valid range" : ""
        }
        InputProps={{
          readOnly: isReadOnly,
          placeholder: floatinglabel ? undefined : placeholder,
        }}
        InputLabelProps={{
          shrink: floatinglabel ? undefined : false,
          sx: floatinglabel
            ? {
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                  transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
                },
                "&:not(.MuiInputLabel-shrink)": {
                  transform: "translate(14px, 16px) scale(1)",
                  transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
                },
                backgroundColor: "white",
              }
            : undefined,
        }}
        inputProps={{
          accessKey: shortcutkey,
          "aria-invalid": invalidFormat || dateNotInRange,
          className: "form-control app-textbox display-input",
          style: { boxSizing: "inherit" },
          ...(disabled ? { disabled: true } : {}),
          ...(readonly ? { readOnly: true } : {}),
        }}
        onKeyDown={handleKeyDown}
        fullWidth
        variant="outlined"
        size="small"
      />
      <Box component="span" className="input-group-btn">
        <Button
          className="btn-date"
          tabIndex={tabindex}
          aria-hidden={true}
          disableRipple={true}
          aria-label={
            displayValue ? `Change Date ${displayValue}` : "Choose date by pressing enter"
          }
          aria-haspopup="true"
          aria-expanded={isDateOpen}
          onClick={toggleDatePicker}
          variant="outlined"
          disabled={readonly || disabled}
        >
          <Box component="i" className="app-icon wm-sl-l sl-calendar" aria-hidden="true" />
        </Button>
        <Button
          className="btn-time"
          tabIndex={tabindex}
          aria-hidden={true}
          disableRipple={true}
          aria-label="Select time"
          aria-haspopup="true"
          aria-expanded={isTimeOpen}
          onClick={toggleTimePicker}
          variant="outlined"
          disabled={readonly || disabled}
        >
          <Box component="i" className="app-icon wm-sl-l sl-time" aria-hidden="true" />
        </Button>
      </Box>
      {isDateOpen && !isCurrentDate && (
        <DatePicker
          open={isDateOpen}
          onClose={handleDateClose}
          onAccept={handleDateAccept}
          value={localDateValue && isCurrentMonth ? moment(localDateValue) : null}
          onViewChange={(view: any) => {
            handleVeiwChange(view);
          }}
          onChange={(newValue: any) => {
            if (!newValue) return;
            setLocalDateValue(newValue.toDate());
            if (datePickerView === "day") {
              handleDateSelection(newValue.toDate());
            }
          }}
          onMonthChange={(newDate: moment.Moment) => {
            if (!localDateValue) return;
            const isSameMonth = newDate.month() === moment(localDateValue).month();
            setIsCurrentMonth(isSameMonth);
          }}
          minDate={minDateObj ? moment(minDateObj) : undefined}
          maxDate={maxDateObj ? moment(maxDateObj) : undefined}
          shouldDisableDate={shouldDisableDateCallback}
          showDaysOutsideCurrentMonth={selectfromothermonth}
          slotProps={{
            textField: {
              style: { display: "none" },
            },
            popper: {
              anchorEl: anchorRef.current,
              placement: adaptiveposition ? "bottom-end" : "bottom-start",
              sx: datePickerSx(showweeks),
            },
            calendarHeader: {
              format: "MMMM YYYY",
            },
            actionBar: {
              actions: (() => {
                const actions: ("clear" | "today" | "accept")[] = [];
                if (todaybutton) actions.push("today");
                if (clearbutton) actions.push("clear");
                return actions;
              })(),
              onClick: (event: React.SyntheticEvent) => {
                const target = event.target as HTMLElement;
                const action =
                  target.getAttribute("data-action") || target.textContent?.toLowerCase();
                if (action === "today") handleToday();
                if (action === "clear") handleClear();
              },
              sx: buttonStyles,
            },
          }}
          views={["year", "month", "day"]}
          displayWeekNumber={showweeks}
        />
      )}

      {isTimeOpen && !isCurrentDate && (
        <TimePicker
          open={isTimeOpen}
          onClose={handleTimeClose}
          onAccept={handleTimeAccept}
          value={tempDateValue ? moment(tempDateValue) : moment()}
          onChange={newValue => {
            newValue && handleTimeSelection(newValue.toDate());
          }}
          ampm={showampmbuttons && (datepattern.includes("a") || datepattern.includes("A"))}
          slotProps={{
            textField: {
              style: { display: "none" },
            },
            popper: {
              anchorEl: anchorRef.current,
              placement: adaptiveposition ? "bottom-start" : "bottom-start",
              sx: timePickerSx(),
            },
            actionBar: {
              actions: ["accept"],
            },
          }}
          minutesStep={minutestep}
          timeSteps={{ hours: hourstep, minutes: minutestep, seconds: 1 }}
          views={timeViews}
        />
      )}
    </Box>
  );
};

WmDateTime.displayName = "WmDateTime";
export default withBaseDateTime(withFormController(WmDateTime));
