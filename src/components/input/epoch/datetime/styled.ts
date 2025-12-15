export const datePickerSx = (showweeks: boolean) => ({
  "& .MuiPaper-root": {
    background: "var(--wm-datepicker-background)",
    padding: "var(--wm-datepicker-padding)",
    borderRadius: "var(--wm-datepicker-border-radius)",
  },
  "& .MuiDateCalendar-root": {
    width: showweeks ? "420px" : "370px",
  },
  "& .MuiDayCalendar-header": {
    justifyContent: "space-evenly",
  },
  "& .MuiDayCalendar-weekNumber": {
    marginTop: "10px",
    textAlign: "center",
  },
  "& .MuiDayCalendar-slideTransition": {
    minHeight: "260px",
  },
  "& .MuiDayCalendar-weekNumberLabel": {
    width: "32px !important",
    padding: "0px 0px !important",
  },
  "& .MuiTypography-caption": {
    padding: "0px 24px",
  },
  "& .MuiYearCalendar-root": {
    width: "auto",
  },
  "& .MuiPickersDay-root.Mui-selected": {
    backgroundColor: "var(--wm-btn-secondary-background) !important",
    color: "var(--wm-btn-secondary-color)",
    fontWeight: "bold",
  },
  "& .MuiMonthCalendar-button.Mui-selected": {
    backgroundColor: "var(--wm-btn-secondary-background) !important",
    color: "var(--wm-btn-secondary-color)",
    fontWeight: "bold",
  },
  "& .MuiPickersDay-root.Mui-selected:hover": {
    backgroundColor: "var(--wm-btn-secondary-background)",
    color: "var(--wm-btn-secondary-color)",
  },
  "& .MuiYearCalendar-button.Mui-selected": {
    backgroundColor: "var(--wm-btn-secondary-background) !important",
    color: "var(--wm-btn-secondary-color)",
    fontWeight: "bold",
  },
  "& .MuiPickersDay-today": {
    backgroundColor: "transparent !important",
  },
});

export const timePickerSx = () => ({
  "& .css-1y6l765-MuiPickersLayout-root": {
    display: "inline-block",
  },
  "& .MuiPaper-root": {
    background: "var(--wm-timepicker-background)",
    padding: "var(--wm-timepicker-padding)",
    borderRadius: "var(--wm-timepicker-border-radius)",
  },
  "& .Mui-selected": {
    backgroundColor: "var(--wm-btn-secondary-background) !important",
    color: "var(--wm-btn-secondary-color) !important",
  },
  "& .Mui-selected:hover": {
    backgroundColor: "var(--wm-btn-secondary-background) !important",
    color: "var(--wm-btn-secondary-color) !important",
  },
});

export const buttonStyles = () => ({
  "& .MuiButton-root": {
    "--wm-btn-color": "var(--wm-color-primary)",
    "--wm-btn-state-layer-color": "var(--wm-color-primary)",
    background: "none",
    border: "none",
  },
});
