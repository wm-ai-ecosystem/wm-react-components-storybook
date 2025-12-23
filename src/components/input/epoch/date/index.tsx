import React, { useState, useRef, useEffect, useCallback, useMemo, forwardRef } from "react";
import moment from "moment-timezone";
import { TextField, Button, Box } from "@mui/material";
import clsx from "clsx";
import withBaseDateTime from "@wavemaker/react-runtime/higherOrder/BaseDateTime";
import { WmDateProps } from "./props";
import {
  convertToMomentFormat,
  formatDate,
  parseExcludedDays,
  parseExcludedDates,
  defaultGetDateObj,
  getWidthStyle,
} from "./utils";
import DatePickerPopover from "./components/DatePickerPopover";
import { useAppSelector } from "@wavemaker/react-runtime/store";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

// Types
type CalendarViewMode = "day" | "month" | "year";

// Custom Hooks
const useDateValidation = (
  excludedDays: number[],
  excludedDates: Date[],
  mindate?: string,
  maxdate?: string,
  getDateObj?: (date: any) => Date | null
) => {
  return useCallback(
    (date: moment.Moment): boolean => {
      if (!date?.isValid()) return true;

      // Check excluded days
      if (excludedDays.includes(date.day())) return true;

      // Check excluded dates
      const dateFormatted = date.format("YYYY-MM-DD");
      const isExcluded = excludedDates.some(
        excludedDate => excludedDate && moment(excludedDate).format("YYYY-MM-DD") === dateFormatted
      );
      if (isExcluded) return true;

      // Check date range
      const minDateObj = mindate ? moment(getDateObj?.(mindate)) : null;
      const maxDateObj = maxdate ? moment(getDateObj?.(maxdate)) : null;

      if (minDateObj?.isValid() && date.isBefore(minDateObj, "day")) return true;
      if (maxDateObj?.isValid() && date.isAfter(maxDateObj, "day")) return true;

      return false;
    },
    [excludedDays, excludedDates, mindate, maxdate, getDateObj]
  );
};

// Main Component
const WmDate = forwardRef<HTMLInputElement, WmDateProps>((props, ref) => {
  // Merge props with defaults
  const {
    name,
    hint,
    shortcutkey,
    datavalue,
    width,
    arialabel,
    invokeOnChange,
    handleKeyDown,
    getDateObj = defaultGetDateObj,
    updatePrevDatavalue,
    updateBoundVariable,
    onChange,
    onClick,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onBeforeload,
    placeholder = "Select Date",
    tabindex = 0,
    datepattern: datepatternProp,
    outputformat = "yyyy-MM-dd",
    required = false,
    excludedays = "",
    excludedates = "",
    showweeks = false,
    showbuttonbar = true,
    autofocus = false,
    readonly = false,
    disabled = false,
    showdropdownon = "default",
    adaptiveposition = true,
    selectfromothermonth = true,
    todaybutton = true,
    clearbutton = true,
    todaybuttonlabel = "Today",
    clearbuttonlabel = "Clear",
    showcustompicker = false,
    showdateformatasplaceholder = false,
    viewmode = "day",
    dataentrymode = "default",
    listener,
    className,
    styles,
    ...restProps
  } = { ...props };

  const defaultDateFormat = useAppSelector((state: any) => state.i18n.dateFormat) || "MMM d, y";

  const datepattern = useMemo(
    () => datepatternProp ?? defaultDateFormat,
    [datepatternProp, defaultDateFormat]
  );

  const currentLocale = useAppSelector((state: any) => state.i18n.selectedLocale);
  // State
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [invalidDateTimeFormat, setInvalidDateTimeFormat] = useState(false);
  const [dateNotInRange, setDateNotInRange] = useState(false);
  const [calendarViewMode, setCalendarViewMode] = useState<CalendarViewMode>(
    viewmode as CalendarViewMode
  );
  const [calendarDate, setCalendarDate] = useState<moment.Moment>(moment());
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  // Refs
  const datepickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onBeforeloadExecutedRef = useRef(false);

  // Memoized values
  const excludedDaysToDisable = useMemo(() => parseExcludedDays(excludedays), [excludedays]);
  const excludedDatesToDisable = useMemo(
    () => parseExcludedDates(excludedates, getDateObj),
    [excludedates, getDateObj]
  );
  const dateValue = useMemo(() => getDateObj(datavalue), [datavalue, getDateObj]);
  const isDateDisabled = useDateValidation(
    excludedDaysToDisable,
    excludedDatesToDisable,
    restProps.mindate as string,
    restProps.maxdate as string,
    getDateObj
  );

  const isNavigationDisabled = useMemo(() => {
    if (!restProps.mindate || !restProps.maxdate) return false;

    const minMoment = moment(getDateObj(restProps.mindate));
    const maxMoment = moment(getDateObj(restProps.maxdate));

    return minMoment.isValid() && maxMoment.isValid() && minMoment.isSame(maxMoment, "day");
  }, [restProps.mindate, restProps.maxdate, getDateObj]);

  const shouldOpenOnInput =
    showdropdownon === "default" || (dataentrymode === "picker" && showdropdownon !== "button");

  // Computed values
  const getDisplayValue = useCallback(() => {
    if (!dateValue) return "";
    try {
      // Use moment with current locale for proper localization
      const momentDate = moment(dateValue).locale(currentLocale);
      const momentPattern = convertToMomentFormat(datepattern);
      return momentDate.format(momentPattern);
    } catch {
      return "";
    }
  }, [dateValue, datepattern, currentLocale]);

  const getPlaceholderText = useCallback(() => {
    return showdateformatasplaceholder ? datepattern.toUpperCase() : placeholder;
  }, [showdateformatasplaceholder, datepattern, placeholder]);

  // Effects
  useEffect(() => {
    const displayValue = getDisplayValue();
    setInputValue(displayValue);

    if (dateValue) {
      const momentDateValue = moment(dateValue);
      setSelectedDate(momentDateValue);
      setCalendarDate(momentDateValue);
      if (listener?.onChange && !props.fieldName) {
        listener.onChange(name, {
          displayValue: displayValue,
          datavalue: formatDate(momentDateValue.toDate(), outputformat),
          timestamp: formatDate(momentDateValue.toDate(), "timestamp"),
        });
      }
    } else {
      setSelectedDate(null);
      setCalendarDate(moment());
    }
  }, [dateValue, getDisplayValue, datavalue]);

  useEffect(() => {
    if (autofocus && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(timer);
    }
  }, [autofocus]);

  useEffect(() => {
    setCalendarViewMode(viewmode as CalendarViewMode);
  }, [viewmode]);

  // Update input value when locale changes
  useEffect(() => {
    if (dateValue) {
      const newDisplayValue = getDisplayValue();
      setInputValue(newDisplayValue);

      // Update listener widget display value if it exists
      if (name && listener?.Widgets[name]) {
        listener.Widgets[name].displayValue = newDisplayValue;
      }
    }
  }, [currentLocale, getDisplayValue, dateValue, name]);

  // Call onBeforeload callback on component mount
  useEffect(() => {
    if (
      onBeforeload &&
      name &&
      props.listener?.Widgets?.[name] &&
      !onBeforeloadExecutedRef.current
    ) {
      const syntheticEvent = {} as React.SyntheticEvent;
      onBeforeload(syntheticEvent, props.listener?.Widgets?.[name]);
      onBeforeloadExecutedRef.current = true;
    }
  }, [onBeforeload, name, props.listener]);

  // Event Handlers
  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || readonly) return;

      setAnchorEl(event.currentTarget);
      setShowPicker(true);

      const targetDate = selectedDate?.isValid()
        ? selectedDate
        : dateValue
          ? moment(dateValue)
          : moment();

      setCalendarDate(targetDate);
      if (dateValue && !selectedDate) {
        setSelectedDate(moment(dateValue));
      }

      setCalendarViewMode(viewmode === "month" ? "month" : (viewmode as CalendarViewMode));
    },
    [disabled, readonly, selectedDate, dateValue, viewmode]
  );
  const clearDateValue = (
    invokeOnChange?: (value: string) => void,
    updatePrevDatavalue?: (value: string) => void,
    updateBoundVariable?: (value: string) => void,
    setInputValue?: (value: string) => void,
    setSelectedDate?: (date: moment.Moment | null) => void,
    setInvalidDateTimeFormat?: (value: boolean) => void,
    setDateNotInRange?: (value: boolean) => void
  ) => {
    invokeOnChange?.("");
    updatePrevDatavalue?.("");
    updateBoundVariable?.("");
    setInputValue?.("");
    setSelectedDate?.(null);
    setInvalidDateTimeFormat?.(false);
    setDateNotInRange?.(false);
  };

  const handleDateSelection = (date: moment.Moment, shouldClose: boolean = false) => {
    setDateNotInRange(false);
    setInvalidDateTimeFormat(false);
    setSelectedDate(date.clone());
    updateDateValue(date);
    setCalendarDate(date);
    if (shouldClose) {
      handleClose();
    }
  };

  const handleValidationError = (
    errorType: "dateNotInRange" | "invalidFormat",
    isRequired: boolean = false
  ) => {
    if (errorType === "dateNotInRange") {
      setDateNotInRange(true);
    } else if (errorType === "invalidFormat" && isRequired) {
      setInvalidDateTimeFormat(true);
    }
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setShowPicker(false);

    setTimeout(() => {
      if (inputRef.current && !disabled && !readonly) {
        inputRef.current.focus();
      }
    }, 0);
  }, [disabled, readonly]);

  const updateDateValue = useCallback(
    (date: moment.Moment) => {
      const outputValue = formatDate(date.toDate(), outputformat);
      // Use locale-aware formatting for display value
      const displayValue = moment(date.toDate())
        .locale(currentLocale)
        .format(convertToMomentFormat(datepattern));

      invokeOnChange?.(outputValue);
      updatePrevDatavalue?.(outputValue);
      updateBoundVariable?.(outputValue);
      setInputValue(displayValue);
      const oldValue = inputValue;

      if (name && listener?.Widgets[name]) {
        listener.Widgets[name].displayValue = displayValue;
      }
      if (listener?.onChange) {
        listener.onChange(props.fieldName || name, {
          ...props,
          datavalue: outputValue,
          timestamp: formatDate(date.toDate(), "timestamp"),
        });
      }
      if (onChange && name && listener?.Widgets[name]) {
        onChange(
          {} as React.SyntheticEvent,
          name && listener?.Widgets[name],
          outputValue,
          oldValue
        );
      }
    },
    [
      outputformat,
      datepattern,
      currentLocale,
      invokeOnChange,
      updatePrevDatavalue,
      updateBoundVariable,
      inputValue,
    ]
  );

  const handleCalendarChange = useCallback(
    (date: moment.Moment | null) => {
      if (!date?.isValid()) return;
      setCalendarDate(date);
      const isMonthOrYearView = viewmode === "month" || viewmode === "year";
      if (!isMonthOrYearView && isDateDisabled(date)) {
        handleValidationError("dateNotInRange");
        return;
      }
      handleDateSelection(date, true);
    },
    [viewmode, isDateDisabled, handleDateSelection]
  );

  const handleMonthChange = useCallback(
    (value: moment.Moment | null) => {
      if (!value?.isValid()) return;

      if (viewmode === "month") {
        handleCalendarChange(value);
      } else {
        const newDate = calendarDate.clone().month(value.month()).year(value.year());
        setCalendarDate(newDate);
        setCalendarViewMode("day");
      }
    },
    [viewmode, calendarDate, handleCalendarChange]
  );

  const handleYearChange = useCallback(
    (value: moment.Moment | null) => {
      if (!value?.isValid()) return;

      if (viewmode === "year") {
        handleCalendarChange(value);
      } else if (viewmode === "month") {
        const newDate = calendarDate.clone().year(value.year());
        setCalendarDate(newDate);
        setCalendarViewMode("month");
      } else {
        const newDate = calendarDate.clone().year(value.year());
        setCalendarDate(newDate);
        setCalendarViewMode("month");
      }
    },
    [viewmode, calendarDate, handleCalendarChange]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (dataentrymode === "picker") return;

      const value = event.target.value;
      setInputValue(value);

      if (!value) {
        clearDateValue(
          invokeOnChange,
          updatePrevDatavalue,
          updateBoundVariable,
          undefined,
          setSelectedDate,
          setInvalidDateTimeFormat,
          setDateNotInRange
        );
        return;
      }

      const parsedDate =
        datepattern === "timestamp"
          ? moment(parseInt(value, 10))
          : moment(value, convertToMomentFormat(datepattern), true);

      if (!parsedDate.isValid()) {
        handleValidationError("invalidFormat", props.required);
        return;
      }

      if (isDateDisabled(parsedDate)) {
        handleValidationError("dateNotInRange");
        return;
      }

      handleDateSelection(parsedDate, false);
    },
    [
      dataentrymode,
      datepattern,
      isDateDisabled,
      invokeOnChange,
      updatePrevDatavalue,
      updateBoundVariable,
      inputValue,
    ]
  );

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedKeys = [
        "Tab",
        "Escape",
        "Enter",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ];

      if (dataentrymode === "picker" && !allowedKeys.includes(event.key)) {
        event.preventDefault();
        return;
      }

      handleKeyDown?.(event);

      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (!inputValue) {
            clearDateValue(
              invokeOnChange,
              updatePrevDatavalue,
              updateBoundVariable,
              undefined,
              setSelectedDate,
              undefined,
              undefined
            );
            return;
          }

          const parsedDate = moment(inputValue, datepattern, true);
          if (parsedDate.isValid()) {
            handleCalendarChange(parsedDate);
          } else {
            handleValidationError("invalidFormat", props.required);
          }
          break;
        case "Escape":
          handleClose();
          break;
        case "Tab":
          if (showPicker) handleClose();
          break;
      }
    },
    [
      dataentrymode,
      datepattern,
      inputValue,
      showPicker,
      handleKeyDown,
      handleCalendarChange,
      handleClose,
      invokeOnChange,
      updatePrevDatavalue,
      updateBoundVariable,
    ]
  );

  const handleTodayClick = useCallback(() => {
    handleCalendarChange(moment());
  }, [handleCalendarChange]);

  const handleClearClick = useCallback(() => {
    clearDateValue(
      invokeOnChange,
      updatePrevDatavalue,
      updateBoundVariable,
      setInputValue,
      setSelectedDate,
      undefined,
      undefined
    );
    handleClose();
  }, [invokeOnChange, updatePrevDatavalue, updateBoundVariable, handleClose]);

  const handleIconButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !readonly) {
        handleOpen(event);
      }
    },
    [disabled, readonly, handleOpen]
  );

  const handleInputClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (onClick && name) {
        onClick(event, listener?.Widgets[name]);
      }

      if (shouldOpenOnInput && !readonly && !disabled) {
        handleIconButtonClick(event as any);
      }
    },
    [shouldOpenOnInput, readonly, disabled, handleIconButtonClick]
  );

  // Render
  return (
    <Box
      className={`ng-pristine ng-valid app-date input-group ng-touched ${className}`}
      ref={datepickerRef}
      style={{ ...getWidthStyle(width), ...styles }}
      title={hint}
      hidden={props.hidden}
      {...(readonly && { readOnly: true })}
      {...(disabled && { disabled: true })}
    >
      <TextField
        inputRef={inputRef}
        fullWidth
        placeholder={getPlaceholderText()}
        disabled={disabled || readonly}
        aria-readonly={readonly}
        error={invalidDateTimeFormat || dateNotInRange}
        helperText={
          invalidDateTimeFormat
            ? "Invalid date format"
            : dateNotInRange
              ? "Date not in valid range"
              : ""
        }
        slotProps={{
          htmlInput: {
            "aria-label": arialabel || `Date input ${getPlaceholderText()}`,
            tabIndex: tabindex,
            accessKey: shortcutkey,
            "aria-invalid": invalidDateTimeFormat || dateNotInRange,
            readOnly: readonly || dataentrymode === "picker",
            required: required,
            autoFocus: autofocus,
            name: name,
            className: `form-control app-textbox app-dateinput display-input`,
            style: {
              cursor: dataentrymode === "picker" ? "pointer" : "text",
              ...getWidthStyle(width),
            },
            onMouseEnter: event =>
              onMouseEnter && name && onMouseEnter(event, listener?.Widgets[name]),
            onMouseLeave: event =>
              onMouseLeave && name && onMouseLeave(event, listener?.Widgets[name]),
          },
        }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onClick={handleInputClick}
        onFocus={event => onFocus && name && onFocus(event, listener?.Widgets[name])}
        onBlur={event => onBlur && name && onBlur(event, listener?.Widgets[name])}
        style={getWidthStyle(width)}
      />

      <Box component="span" className="input-group-btn">
        <Button
          type="button"
          className={`btn btn-default btn-time`}
          tabIndex={tabindex}
          disabled={disabled || readonly}
          aria-label={inputValue ? `Change Date ${inputValue}` : "Choose date by pressing enter"}
          aria-haspopup="true"
          aria-expanded={showPicker}
          onClick={handleIconButtonClick}
        >
          <Box component="i" aria-hidden="true" className="app-icon wm-sl-l sl-calendar" />
        </Button>
      </Box>

      {showPicker && (
        <DatePickerPopover
          open={showPicker}
          anchorEl={anchorEl}
          onClose={handleClose}
          adaptiveposition={adaptiveposition}
          showbuttonbar={showbuttonbar}
          todaybutton={todaybutton}
          clearbutton={clearbutton}
          todaybuttonlabel={todaybuttonlabel}
          clearbuttonlabel={clearbuttonlabel}
          isNavigationDisabled={isNavigationDisabled}
          restProps={restProps}
          getDateObj={getDateObj}
          viewmode={viewmode}
          calendarViewMode={calendarViewMode}
          calendarDate={calendarDate}
          selectedDate={selectedDate}
          selectfromothermonth={selectfromothermonth}
          showweeks={showweeks}
          isDateDisabled={isDateDisabled}
          handleYearChange={handleYearChange}
          handleMonthChange={handleMonthChange}
          handleCalendarChange={handleCalendarChange}
          setCalendarViewMode={setCalendarViewMode}
          setCalendarDate={setCalendarDate}
          handleTodayClick={handleTodayClick}
          handleClearClick={handleClearClick}
        />
      )}
    </Box>
  );
});

WmDate.displayName = "WmDate";

export default withBaseDateTime(withFormController(WmDate));
