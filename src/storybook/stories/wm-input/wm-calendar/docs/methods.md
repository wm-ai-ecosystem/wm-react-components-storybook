# Methods

Calendar methods can be accessed through script using the widget reference: `Page.Widgets.calendarName`.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| selectDate() | none | void | Highlights the date(s) set in datavalue property |
| gotoDate() | none | void | Shows the calendar view at the date specified in datavalue |
| gotoMonth(month) | month (integer, 1-12) | void | Renders the calendar for the specified month |
| gotoNextMonth() | none | void | Renders the next month view |
| gotoPrevMonth() | none | void | Renders the previous month view |
| gotoNextYear() | none | void | Renders the calendar for the next year |
| gotoPrevYear() | none | void | Renders the calendar for the previous year |
| rerenderEvents() | none | void | Rerenders all events from the dataset |
| applyCalendarOptions(option, name, value) | option (string), name (string), value (any) | void | Sets calendar options, including locale |

## Common Method Examples

```javascript
// Select a specific date
Page.Widgets.calendar.datavalue = '01/06/2023';
Page.Widgets.calendar.selectDate();

// Select a date range
Page.Widgets.calendar.datavalue = {start:'01/01/2023', end:'10/01/2023'};
Page.Widgets.calendar.selectDate();

// Navigate to a specific date
Page.Widgets.calendar.datavalue = '01/01/2023';
Page.Widgets.calendar.gotoDate();

// Change calendar language to Spanish
Page.Widgets.calendar.applyCalendarOptions('option', 'locale', 'es');
Page.Widgets.calendar.applyCalendarOptions('render');
```