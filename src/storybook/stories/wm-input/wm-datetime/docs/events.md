# Callback Events

| Event | Description |
|-------|-------------|
| Change | Triggered when the component's value changes. |
| Focus | Triggered when the component receives focus. |
| Blur | Triggered when focus leaves the component. |

## Gesture Events

| Event | Description |
|-------|-------------|
| Click | Triggered when the component is clicked. |
| MouseEnter | Triggered when the mouse cursor enters the component area. |
| MouseLeave | Triggered when the mouse cursor leaves the component area. |
| Tap | Triggered when the component is tapped (touch screens). |

## Example Event Handlers

```javascript
Page.myDatetimeChange = function($event, widget) {
  // Convert the datetime value to a format suitable for your application
  let selectedDateTime = widget.value;
  console.log('Selected date and time:', selectedDateTime);
  
  // Additional logic based on the selected date/time
  if (selectedDateTime) {
    // Do something with the selected datetime
  }
};
```