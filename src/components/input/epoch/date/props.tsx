import React from "react";
import BaseProps from "@/higherOrder/props";
export interface WmDateProps extends BaseProps {
  placeholder?: string;
  hint?: string;
  tabindex?: number;
  shortcutkey?: string;
  datavalue?: string | Date;
  datepattern?: string;
  outputformat?: string;
  required?: boolean;
  mindate?: string | Date;
  maxdate?: string | Date;
  excludedays?: string;
  excludedates?: string;
  showweeks?: boolean;
  showbuttonbar?: boolean;
  autofocus?: boolean;
  readonly?: boolean;
  show?: boolean;
  disabled?: boolean;
  showdropdownon?: string;
  showindevices?: string;
  adaptiveposition?: boolean;
  selectfromothermonth?: boolean;
  todaybutton?: boolean;
  clearbutton?: boolean;
  todaybuttonlabel?: string;
  clearbuttonlabel?: string;
  showcustompicker?: boolean;
  showdateformatasplaceholder?: boolean;
  viewmode?: string;
  dataentrymode?: string;
  width?: string | number;
  arialabel?: string;
  onDateChange?: (date: Date | null) => void;
  getFormattedDate?: (date: Date | null, pattern?: string) => string;
  invokeOnChange?: (value: any, event?: React.SyntheticEvent) => void;
  datepickerRef?: React.RefObject<any>;
  customValidator?: any;
  updatePrevDatavalue?: (value: any) => void;
  updateBoundVariable?: (value: any) => void;
  handleKeyDown?: (event: React.KeyboardEvent) => void;
  getDateObj?: (date: any) => Date | null;
  isValidDate?: (date: any) => boolean;
  minDateMaxDateValidationOnInput?: (date: Date, displayValue?: string) => boolean;
  formatValidation?: (newVal: Date, inputVal: string) => boolean;
}

//DatePickerPopover props

export type CalendarViewMode = "day" | "month" | "year";

export interface DatePickerPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  adaptiveposition: boolean;
  showbuttonbar: boolean;
  todaybutton: boolean;
  clearbutton: boolean;
  todaybuttonlabel: string;
  clearbuttonlabel: string;
  isNavigationDisabled: boolean;
  restProps: any;
  getDateObj: (date: any) => Date | null;
  viewmode: string;
  calendarViewMode: CalendarViewMode;
  calendarDate: moment.Moment;
  selectedDate: moment.Moment | null;
  selectfromothermonth: boolean;
  showweeks: boolean;
  isDateDisabled: (date: moment.Moment) => boolean;
  handleYearChange: (value: moment.Moment | null) => void;
  handleMonthChange: (value: moment.Moment | null) => void;
  handleCalendarChange: (date: moment.Moment | null) => void;
  setCalendarViewMode: (mode: CalendarViewMode) => void;
  setCalendarDate: (date: moment.Moment) => void;
  handleTodayClick: () => void;
  handleClearClick: () => void;
}
