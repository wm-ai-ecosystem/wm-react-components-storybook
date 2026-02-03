# Overview

The **Calendar** component is used to schedule and display events. It displays events from a dataset, where each event includes details such as title, start date, end date, and type. It supports multiple views like Month, Week, and Day for easy navigation and schedule management.

### Markup

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
### Examples

#### Properties

- Configures the calendar to display events in a list-based daily view.

```javascript
Page.Widgets.calendar.calendartype = "list";
Page.Widgets.calendar.view = "day";
```

- To set the first day of the month view [Default: 0 (Sunday)]

```javascript
Page.Widgets.calendar.calendarOptions.calendar.firstDay = 0;
```

#### Events

- Triggered when a user selects a date on the calendar.

```javascript
Page.calendarSelect = function ($start, $end, $view, $data) {
  //Example: Used to capture selected dates and perform business actions such as opening a form, validating overlaps, or creating events.

    // Convert selected dates to readable format
    let startDate = moment($start).format("YYYY-MM-DD");
    let endDate = moment($end).format("YYYY-MM-DD");

    // Example 1: Open a dialog to create a new HR event
    Page.Widgets.createEventDialog.open();

    // Pass selected dates to the dialog fields
    Page.Widgets.startDateInput.datavalue = startDate;
    Page.Widgets.endDateInput.datavalue = endDate;
};
```

#### Methods

- To view the next month in calendar component.

```javascript
Page.Widgets.calendar.gotoNextMonth();
```

- To view the February month in calendar component.

```javascript
Page.Widgets.calendar.gotoMonth(2);
```

<!-- #### Sample calendar dataset

```json
[
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
``` -->
