# Overview

The **Datetime** component allows users to select both date and time in a single input. It combines the functionality of a date picker and a time picker

### Markup

```javascript
  <wm-datetime name="datetime" mindate="CURRENT_DATE"></wm-datetime>
```

### Examples

#### Properties

- Sets the maximum selectable date in the datetime component.

```javascript
Page.Widgets.datetime.maxdate = new Date();
```

- Show AM/PM selection buttons in the datetime component.

```javascript
Page.Widgets.datetime.showampmbuttons = true;
```

#### Events

- Configures the Datetime component before it is rendered by setting constraints such as disabling past dates, excluding specific weekdays and hiding AM / PM buttons.

```javascript
Page.datetimeBeforeload = function ($event, widget) {
    widget.mindate = new Date();
    widget.excludedays = "0, 6";
    widget.showampmbuttons = false;
};
```