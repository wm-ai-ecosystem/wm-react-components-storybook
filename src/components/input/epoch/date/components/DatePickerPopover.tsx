import React, { useEffect } from "react";
import { Popover, Paper, Box, Button } from "@mui/material";
import moment from "moment-timezone";
import { StyledDateCalendar, StyledYearCalendar } from "../styled";
import { CalendarViewMode, DatePickerPopoverProps } from "../props";
import { useAppSelector } from "@wavemaker/react-runtime/store";

const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  adaptiveposition,
  showbuttonbar,
  todaybutton,
  clearbutton,
  todaybuttonlabel,
  clearbuttonlabel,
  isNavigationDisabled,
  restProps,
  getDateObj,
  viewmode,
  calendarViewMode,
  calendarDate,
  selectedDate,
  selectfromothermonth,
  showweeks,
  isDateDisabled,
  handleYearChange,
  handleMonthChange,
  handleCalendarChange,
  setCalendarViewMode,
  setCalendarDate,
  handleTodayClick,
  handleClearClick,
}) => {
  // Get current locale from moment
  const currentLocale = useAppSelector((state: any) => state.i18n.selectedLocale);

  // Set moment to use full month names globally for this component
  useEffect(() => {
    // Update the current locale with full month names for both months and monthsShort
    moment.updateLocale(currentLocale, {
      monthsShort: Array.from({ length: 12 }, (_, i) => moment().month(i).format("MMM")),
      months: Array.from({ length: 12 }, (_, i) => moment().month(i).format("MMMM")),
    });

    // Cleanup function to restore original locale
    return () => {
      moment.locale(currentLocale);
    };
  }, [currentLocale]);

  // Render Calendar View
  const renderCalendarView = () => {
    const minDateMoment = restProps.mindate ? moment(getDateObj(restProps.mindate)) : undefined;
    const maxDateMoment = restProps.maxdate ? moment(getDateObj(restProps.maxdate)) : undefined;

    const commonProps = {
      minDate: minDateMoment,
      maxDate: maxDateMoment,
      disabled: isNavigationDisabled,
    };

    switch (viewmode) {
      case "year":
        return (
          <StyledYearCalendar
            value={selectedDate || calendarDate}
            onChange={handleYearChange}
            {...commonProps}
          />
        );

      case "month":
        switch (calendarViewMode) {
          case "year":
            return (
              <StyledYearCalendar
                value={calendarDate}
                onChange={handleYearChange}
                {...commonProps}
              />
            );
          default:
            // Ensure we have a valid date for month view
            const monthViewDate = calendarDate.isValid() ? calendarDate : moment();
            return (
              <StyledDateCalendar
                value={monthViewDate}
                onChange={handleMonthChange}
                views={["month"]}
                view="month"
                openTo="month"
                referenceDate={monthViewDate}
                onViewChange={(newView: any) => {
                  if (!isNavigationDisabled && newView) {
                    setCalendarViewMode(newView as CalendarViewMode);
                  }
                }}
                dayOfWeekFormatter={(date: moment.Moment) => {
                  return date.locale(currentLocale).format("ddd");
                }}
                {...commonProps}
              />
            );
        }

      default: // 'day'
        switch (calendarViewMode) {
          case "year":
            return (
              <StyledYearCalendar
                value={calendarDate}
                onChange={handleYearChange}
                {...commonProps}
              />
            );
          case "month":
            return (
              <StyledDateCalendar
                value={calendarDate}
                onChange={handleMonthChange}
                views={["month"]}
                view="month"
                onViewChange={(newView: any) => {
                  if (!isNavigationDisabled && newView) {
                    setCalendarViewMode(newView as CalendarViewMode);
                  }
                }}
                dayOfWeekFormatter={(date: moment.Moment) => {
                  return date.locale(currentLocale).format("ddd");
                }}
                {...commonProps}
              />
            );
          default:
            return (
              <StyledDateCalendar
                value={calendarDate}
                onChange={handleCalendarChange}
                showDaysOutsideCurrentMonth={selectfromothermonth}
                displayWeekNumber={showweeks}
                views={["day", "year", "month"]}
                view={calendarViewMode}
                onViewChange={(newView: any) => {
                  if (!isNavigationDisabled && newView) {
                    setCalendarViewMode(newView as CalendarViewMode);
                  }
                }}
                onYearChange={(date: any) => {
                  if (!isNavigationDisabled && date) {
                    setCalendarDate(date);
                  }
                }}
                onMonthChange={(date: any) => {
                  if (!isNavigationDisabled && date) {
                    setCalendarDate(date);
                  }
                }}
                shouldDisableDate={isDateDisabled}
                dayOfWeekFormatter={(date: moment.Moment) => {
                  return date.locale(currentLocale).format("ddd");
                }}
                {...commonProps}
              />
            );
        }
    }
  };

  const todayButtonStyle: React.CSSProperties = {
    "--wm-btn-color": "var(--wm-color-primary)",
    "--wm-btn-state-layer-color": "var(--wm-color-primary)",
    background: "none",
    border: "none",
  } as React.CSSProperties;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: adaptiveposition ? "right" : "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: adaptiveposition ? "right" : "left",
      }}
      sx={{
        "& .MuiPopover-paper": {
          boxShadow: 3,
          borderRadius: 1,
        },
        "& .MuiDateCalendar-root": {
          width: showweeks ? "420px" : "370px",
        },
      }}
      className="app-date"
    >
      <Paper
        elevation={0}
        sx={{ width: "auto", pb: 2, background: "var(--wm-datepicker-background)" }}
      >
        {renderCalendarView()}

        {showbuttonbar && (todaybutton || clearbutton) && (
          <Box display="flex" justifyContent="space-between" px={2} mt={1}>
            {todaybutton && (
              <Button
                variant="text"
                onClick={handleTodayClick}
                className="btn  today-btn"
                disabled={
                  isNavigationDisabled &&
                  !moment().isSame(moment(getDateObj(restProps.mindate)), "day")
                }
                style={todayButtonStyle}
              >
                {todaybuttonlabel}
              </Button>
            )}
            {clearbutton && (
              <Button
                variant="text"
                onClick={handleClearClick}
                className="btn  clear-btn"
                style={todayButtonStyle}
              >
                {clearbuttonlabel}
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Popover>
  );
};

export default DatePickerPopover;
