import { styled } from "@mui/material/styles";
import { DateCalendar, YearCalendar } from "@mui/x-date-pickers";

// Styled Components
export const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
  "& .MuiDayCalendar-slideTransition": {
    minHeight: "290px",
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
  "& .MuiPickersDay-root": {
    fontSize: "0.875rem",
    margin: 0,
  },
  "& .MuiDayCalendar-weekDayLabel": {
    fontSize: "0.875rem",
    width: "36px",
    height: "36px",
    margin: "0",
  },
  "& .MuiDayCalendar-weekNumber": {
    marginTop: "10px",
    textAlign: "center",
    width: "auto",
    padding: "0 24px",
  },
  "& .MuiDayCalendar-weekNumberLabel": {
    width: "32px",
    padding: "0",
  },
  "& .MuiTypography-caption": {
    padding: "0px 24px",
  },
  "& .MuiDayCalendar-header": {
    width: "100%",
  },
}));

export const StyledYearCalendar = styled(YearCalendar)(({ theme }) => ({
  "& .MuiYearCalendar-button.Mui-selected": {
    backgroundColor: "var(--wm-btn-secondary-background) !important",
    color: "var(--wm-btn-secondary-color)",
    fontWeight: "bold",
  },
  "& .MuiPickersYear-yearButton.Mui-selected:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
