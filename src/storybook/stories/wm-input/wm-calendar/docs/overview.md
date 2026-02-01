# Overview

The **Calender component** is used to schedule and display events in a full-sized calendar inside a web application. It allows developers to display events using dataset data, where each event includes details such as title, start date, end date, and event type. It supports multiple views like Month, Week, and Day, making it easy for users to navigate and manage schedules.

### Markup

```javascript
<wm-calendar
  name="calendar2"
  calendartype="list"
  controls="navigation,today,year,month,week,day"
  view="month"
  dataset="bind:Variables.mdCalenderData.dataSet"
  eventtitle="title"
  eventclass="className"
></wm-calendar>
```

### Properties Usage

```javascript
// Show / Hide Calender component
Page.Widgets.myCalendar.show = false;

// Setting calendar data field mappings
Page.Widgets.calendar2.dataset = [];
Page.Widgets.myCalendar.title = "eventTitle";
Page.Widgets.myCalendar.start = "startDate";
Page.Widgets.myCalendar.end = "endDate";
Page.Widgets.myCalendar.allDay = "isAllDay";

// Changing calendar view (month | week | day)
Page.Widgets.myCalendar.view = "week";

// Setting selection mode (single | multiple)
Page.Widgets.myCalendar.selectionMode = "multiple";
```

### Callback Events

```javascript
//Will Add call back events
```

### Methods Usage



```javascript


//Shows the calendar view for the default or specified date.
Page.Widgets.calendar.datavalue = "01/01/2017";
Page.Widgets.calendar.gotoDate();
Page.Widgets.calendar.datavalue = {start:'01/01/2023', end:'10/01/2023'};
Page.Widgets.calendar.selectDate();

//To set the first day of the Month view (Default: 0 – Sunday)
Page.Widgets.wmcalendar.calendarOptions.calendar.firstDay = 0;
//To hide the All-Day slot in Agenda view
Page.Widgets.wmcalendar.calendarOptions.calendar.allDaySlot = false;

//To hide the All-Day slot in Agenda view
Page.Widgets.wmcalendar.calendarOptions.calendar.allDaySlot = false;

//To change the All-Day slot text in Agenda view
Page.Widgets.wmcalendar.calendarOptions.calendar.allDayText = "all-day";

//To set Calendar language and re-render widget

Page.Widgets.calendar2.applyCalendarOptions('option', 'locale', 'en');
Page.Widgets.calendar2.applyCalendarOptions('render');





```

### Sample Dataset

```json
[
  {
    "title": "Team Meeting",
    "start": "2026-02-02T10:00:00",
    "end": "2026-02-02T11:00:00",
    "description": "Weekly team sync meeting",
    "type": "Meeting"
  },
  {
    "title": "Project Deadline",
    "start": "2026-02-05T00:00:00",
    "end": "2026-02-05T23:59:00",
    "description": "Final submission of project",
    "type": "Deadline"
  },
  {
    "title": "Client Call",
    "start": "2026-02-07T15:30:00",
    "end": "2026-02-07T16:30:00",
    "description": "Discussion with client regarding requirements",
    "type": "Call"
  },
  {
    "title": "Workshop",
    "start": "2026-02-10T09:00:00",
    "end": "2026-02-10T13:00:00",
    "description": "Angular training workshop",
    "type": "Training"
  }
]
```
