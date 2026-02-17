# Overview

The **Calendar** component is used to schedule and display events. It displays events from a dataset, where each event includes details such as title, start date, end date, and type. It supports multiple views like Month, Week, and Day for easy navigation and schedule management.

### Markup

```javascript
<wm-calendar name="calendar" variant="standard"></wm-calendar>
```

### Examples

#### Properties

- This is the markup for a calendar, which displays events in a list-based daily view, with configurable type and view that can also be set dynamically via script.

```javascript
<wm-calendar calendartype="list" view="day" name="calendar"></wm-calendar>
```

```javascript
// Configures the calendar type (e.g., list, basic, agenda)
Page.Widgets.calendar.calendartype = "list";

// Configures the current view of the calendar (e.g., day, week, month, year)
Page.Widgets.calendar.view = "day";
```

- To set the first day of the month view [Default: 0 (Sunday)]

```javascript
Page.Widgets.calendar.calendarOptions.calendar.firstDay = 0;
```

#### Events

- This is the markup for a calendar with an on-select event, executed when a user selects a date to capture the selection and perform related actions.

```javascript
<wm-calendar on-select="calendarSelect($start, $end, $view, $data)" name="calendar"></wm-calendar>
```

```javascript
Page.calendarSelect = function ($start, $end, $view, $data) {
  // Example: Used to capture selected dates and perform business actions such as opening a form, validating overlaps, or creating events.

  // Convert selected dates to readable format
  let startDate = moment($start).format("YYYY-MM-DD");
  let endDate = moment($end).format("YYYY-MM-DD");

  // Example 1: Open a dialog to create a new HR event
  Page.Widgets.createEventDialog.open();

  // Pass selected dates to the dialog fields; these should be written on dialog open event
  Page.Widgets.startDateInput.datavalue = startDate;
  Page.Widgets.endDateInput.datavalue = endDate;
};
```

#### Methods

- This method navigates the calendar to the next month.

```javascript
// Moves the calendar view from the current month to the following month.
Page.Widgets.calendar.gotoNextMonth();
```

- This method navigates the calendar to a specific month.

```javascript
// Sets the calendar to February (month index is 0-based, so 2 = March if 0 = January).
Page.Widgets.calendar.gotoMonth(2);
```

#### Sample Calendar Dataset

- This is the markup for a Calendar component bound to a sample dataset, using title as the event title, start as the event start date, and classname for styling. The dataset can be used to render events dynamically and supports multiple events, all-day events, and different views.

```javascript
<wm-calendar
  name="calendar"
  calendartype="basic"
  view="month"
  selectionmode="multiple"
  eventtitle="title"
  dataset="bind:Variables.stvCalendarEvents.dataSet"
  eventstart="start"
  eventclass="classname"
></wm-calendar>
```

```javascript
// Sample dataset for the Calendar component, where each object represents an event with a title, start and end dates, all-day flag, and CSS class for styling. 

let calendarEvents = [
  {
    "title": "Company Retreat",
    "start": "2026-02-05",
    "end": "2026-02-08",
    "allday": true,
    "classname": "event-primary"
  },
  {
    "title": "Employee Training Program",
    "start": "2026-02-12",
    "end": "2026-02-16",
    "allday": true,
    "classname": "event-success"
  },
  {
    "title": "Annual Leave",
    "start": "2026-02-20",
    "end": "2026-02-25",
    "allday": true,
    "classname": "event-info"
  }
]
```
