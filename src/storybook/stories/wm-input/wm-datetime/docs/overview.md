# Overview

The **Datetime** component allows users to select both date and time in a single input. It combines the functionality of a date picker and a time picker

### Markup

```javascript
<wm-datetime name="datetime" variant="standard"></wm-datetime>
```

### Examples

#### Properties

- This datetime sets the maximum selectable date, which can be configured in the markup or dynamically via script.

```javascript
<wm-datetime maxdate="CURRENT_DATE" name="datetime"></wm-datetime>
```

```javascript
//Set the maximum date to the current datetime.
Page.Widgets.datetime.maxdate = new Date();
```

- This datetime uses a specific date and time format including AM/PM (yyyy-MM-dd hh:mm:ss a), which can be configured in the markup or dynamically via script.

```javascript
<wm-datetime datepattern="yyyy-MM-dd hh:mm:ss a" name="datetime"></wm-datetime>
```

```javascript
// Set the date and time format dynamically, including AM/PM
Page.Widgets.datetime.datepattern = "yyyy-MM-dd hh:mm:ss a";
```

#### Events

- This is the markup for a datetime with an on-beforeload event, executed before the picker is rendered to configure constraints and behavior.

```javascript
<wm-datetime on-beforeload="datetimeBeforeload($event, widget)" name="datetime"></wm-datetime>
```

```javascript
Page.datetimeBeforeload = function ($event, widget) {
  // Disable selection of past dates by setting the minimum date to today
  widget.mindate = new Date();

  // Disable selection of weekends (0 = Sunday, 6 = Saturday)
  widget.excludedays = "0, 6";

  // Hide AM/PM selection buttons
  widget.showampmbuttons = false;
};
```