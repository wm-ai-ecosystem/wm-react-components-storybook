# Overview

The **Time** component allows users to select and manage time values using an intuitive time picker with customizable formats.

### Markup

```javascript
<wm-time name="time" variant="standard"></wm-time>
```

### Examples

#### Properties

- This time uses a specific time format (hh:mm:ss), which can be configured in the markup or dynamically via script.

```javascript
<wm-time timepattern="hh:mm:ss" name="time"></wm-time>
```

```javascript
// Set the time format pattern dynamically
Page.Widgets.datetime.timepattern = "hh:mm:ss";
```

#### Events

- This is the markup for a time with an on-change event, executed when a user updates the time to trigger actions such as updating backend data.

```javascript
<wm-time on-change="timeChange($event, widget, newVal, oldVal)" name="time"></wm-time>
```

```javascript
Page.timeChange = function ($event, widget, newVal, oldVal) {
  if (newVal) {
    // Update the appointment time in the backend using a service variable
    Page.Variables.svUpdateAppointmentTime.setInput("appointmentId", Page.Widgets.appointmentId.datavalue,);
    Page.Variables.svUpdateAppointmentTime.setInput("time", newVal);
    Page.Variables.svUpdateAppointmentTime.invoke();

    // Trigger a toaster notification after successful update of service variable svUpdateAppointmentTime
    // App.Actions.successToaster.invoke();
  }
};
```

- This is the markup for a time with an on-focus event, executed when the user focuses on the input to trigger UI actions such as showing hints or highlighting the field.

```javascript
<wm-time on-focus="timeFocus($event, widget)" name="time"></wm-time>
```

```javascript
Page.timeFocus = function ($event, widget) {
  // Show a helper message or highlight the time input when focused
  Page.Widgets.labelMsg.caption = "Select a suitable time for your appointment";
  Page.Widgets.labelMsg.show = true;
};
```