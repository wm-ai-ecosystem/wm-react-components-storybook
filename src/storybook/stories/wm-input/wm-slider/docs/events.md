# Callback Events

| Event | Description |
| --- | --- |
| Change | Triggered when the slider's value changes. This event fires when the user manually adjusts the slider or when the value is programmatically changed (unless skipChangeEventFromScript is enabled). |

## Example Usage

```javascript
Page.onMySliderChange = function(newValue) {
  // The newValue parameter contains the current slider value
  console.log("Slider value changed to:", newValue);
  
  // Update a label with the new value
  Page.Widgets.valueDisplay.caption = "Selected: " + newValue;
};
```