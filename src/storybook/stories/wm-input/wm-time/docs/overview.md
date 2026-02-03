# Overview

The **Time** component allows users to select and manage time values using an intuitive time picker with customizable formats.

### Markup

```javascript
  <wm-time name="time" datavalue="CURRENT_TIME"></wm-time>
```

### Examples

#### Properties

- Show AM/PM selection buttons in the datetime component.

```javascript
Page.Widgets.datetime.showampmbuttons = true;
```

#### Events

- Triggered when the user changes the time.

```javascript
Page.timeChange = function ($event, widget, newVal, oldVal) {
    if (newVal) {
        // Example: Update appointment time in the backend
        Page.Variables.svUpdateAppointmentTime.setInput("appointmentId", Page.Widgets.appointmentId.datavalue);
        Page.Variables.svUpdateAppointmentTime.setInput("time", newVal);
        Page.Variables.svUpdateAppointmentTime.invoke();

         // Invoke a pre-configured toaster action after the service variable successfully submits the appointment
        Page.Actions.successToaster.invoke();
    }
};
```

- Triggered when the time input gains focus.

```javascript
Page.timeChange = function ($event, widget, newVal, oldVal) {
    // Example: Highlight the time input or show tooltip
    Page.Widgets.labelMsg.caption = "Select a suitable time for your appointment";
    Page.Widgets.labelMsg.show = true;
};
```