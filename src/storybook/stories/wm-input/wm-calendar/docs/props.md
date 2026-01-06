# Props

## Basic Configuration

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | | A unique identifier for the Calendar component |
| show | boolean | true | Determines whether the component is visible |
| loadOnDemand | boolean | false | When set and show property is bound, widget initialization is deferred until visible |
| type | string | "basic" | Sets the type of calendar widget: "agenda" or "basic" |
| view | string | "month" | Sets the default view: "month", "week", or "day" |
| selectionMode | string | "none" | Controls date selection: "none", "single", or "multiple" |

## Data Configuration

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dataset | array | | Array of event objects to display on the calendar |
| title | string | | Field name in dataset for event titles |
| start | string | | Field name in dataset for event start dates (required) |
| end | string | | Field name in dataset for event end dates |
| allDay | string | | Field name in dataset for all-day event flag |
| className | string | | Field name in dataset for CSS class to apply to events |

## Layout

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| width | string | | Width of the calendar (in px, %, pt, or em) |
| height | string | | Height of the calendar (in px, %, pt, or em) |

## Common Calendar Configuration Use Cases

```javascript
// Setting calendar data fields
Page.Widgets.myCalendar.title = "eventTitle";
Page.Widgets.myCalendar.start = "startDate";
Page.Widgets.myCalendar.end = "endDate";
Page.Widgets.myCalendar.allDay = "isAllDay";

// Changing calendar view
Page.Widgets.myCalendar.view = "week";

// Setting selection mode
Page.Widgets.myCalendar.selectionMode = "multiple";
```