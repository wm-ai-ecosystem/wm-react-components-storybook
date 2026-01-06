# Callback Events

| Event | Description |
|-------|-------------|
| Change | Triggered when the component's value changes |
| Focus | Triggered when the component receives focus |
| Blur | Triggered when focus leaves the component |

## Touch Events

| Event | Description |
|-------|-------------|
| Tap | Triggered when the component is tapped |

## Mouse Events

| Event | Description |
|-------|-------------|
| Click | Triggered when the component is clicked |
| MouseEnter | Triggered when the mouse pointer enters the component |
| MouseLeave | Triggered when the mouse pointer leaves the component |

## Example Usage

```javascript
Page.Widgets.myDate.onFocus = function(widget, event) {
  // Code to execute when date input receives focus
  console.log("Date input focused");
};

Page.Widgets.myDate.onChange = function(widget, newValue, oldValue) {
  // React to value changes
  console.log("Date changed from", oldValue, "to", newValue);
  
  // Perform validation or other operations based on selected date
  if (newValue < new Date()) {
    App.notify("Please select a future date");
  }
};
```