# Overview

The **Date** component allows users to select a date using an interactive date picker.

### Markup

```javascript
<wm-date name="date" variant="standard"></wm-date>
```

### Examples

#### Properties

- This date uses a specific date format (yyyy, MMM dd) and displays it as a placeholder, which can be configured in the markup or dynamically via script.

```javascript
<wm-date datepattern="yyyy, MMM dd" showdateformatasplaceholder="true" name="date"></wm-date>
```

```javascript
// Set the date format dynamically
Page.Widgets.date.datepattern = "yyyy, MMM dd";

// Show the date format as placeholder text
Page.Widgets.date.showdateformatasplaceholder = true;
```

#### Events

- This is the markup for a date with an on-beforeload event, executed before the date picker is rendered to configure its behavior.

```javascript
<wm-date on-beforeload="dateBeforeload($event, widget)" name="date"></wm-date>
```

```javascript
Page.dateBeforeload = function ($event, widget) {
    // Disable selection of weekends (0 = Sunday, 6 = Saturday)
    widget.excludedays = "0, 6";
};
```

- This is the markup for a date with an on-blur event, executed when the user leaves the date input to trigger validation or other actions.

```javascript
<wm-date on-blur="dateBlur($event, widget)" name="date"></wm-date>
```

```javascript
Page.dateBlur = function ($event, widget) {
  // Validate the entered date to ensure it is not in the future
  const dobValue = widget.datavalue;
  const currentDate = new Date();

  if (dobValue) {
    const dob = new Date(dobValue); // Convert the input to a Date object

    if (dob.getTime() > currentDate.getTime()) {
      // Show error message if the date is invalid
      Page.Widgets.labelErrorMsg.caption =
        "Date of birth cannot be in the future";
      Page.Widgets.labelErrorMsg.show = true;

      // Reset the invalid value
      widget.datavalue = undefined;
    } else {
      // Hide the error message if the date is valid
      Page.Widgets.labelErrorMsg.show = false;
    }
  }
}
```
