# Callback Events

| Event | Description |
|---|---|
| **Value Events** | |
| change | Triggered when the checkbox state changes between checked and unchecked. Provides the new value. |
| **Focus Events** | |
| focus | Triggered when the checkbox receives focus. |
| blur | Triggered when focus leaves the checkbox. |
| **Interaction Events** | |
| click | Triggered when the user clicks or taps the checkbox. |
| mouseenter | Triggered when the mouse cursor enters the checkbox area. |
| mouseleave | Triggered when the mouse cursor leaves the checkbox area. |
| tap | Triggered when the user taps the checkbox on a touch device. |

## Example Event Usage

```javascript
Page.myCheckboxChange = function($event, widget) {
  // $event contains event information
  // widget.value contains the current state
  
  if (widget.value === true) {
    // Handle checked state
    App.Variables.termsAccepted.setValue(true);
  } else {
    // Handle unchecked state
    App.Variables.termsAccepted.setValue(false);
  }
};
```