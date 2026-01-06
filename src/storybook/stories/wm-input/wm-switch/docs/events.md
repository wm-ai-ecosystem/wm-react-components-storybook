# Callback Events

| Event | Description |
| --- | --- |
| **Value Events** |
| Change | Triggered when the selected option in the switch changes. Note: Can be configured to only trigger on user interactions with the skipOnChangeEventFromScript property |
| **Interaction Events** |
| onClick | Triggered when the switch widget is clicked |
| onMouseenter | Triggered when the pointer moves onto the switch widget |
| onMouseleave | Triggered when the pointer leaves the switch widget |
| onTap | Triggered when the switch widget is tapped (mobile-specific) |

## Example Usage

```javascript
// Handling switch value changes
Page.mySwitch_change = function($event, widget) {
    // Access the current value
    console.log("New value selected:", widget.value);
    
    // Perform conditional actions based on selection
    if (widget.value === "high") {
        // Handle high priority selection
    }
};
```