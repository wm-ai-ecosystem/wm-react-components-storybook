# Overview

**Color Picker** component helps in selecting a color and translate to the hex value. The Color Picker Tool can be used to select a color on any image opened on your screen. By clicking a point on an image, you can change the active color to that which is located under the pointer.

### Markup

```javascript
<wm-colorpicker name="colorpicker" variant="standard"></wm-colorpicker>
```

### Examples

#### Properties

- This colorpicker keeps the popover open until the user presses Enter, which can be configured in the markup or dynamically via script.

```javascript
<wm-colorpicker autoclose="disabled" name="colorpicker"></wm-colorpicker>
```

```javascript
// Set the autoclose behavior dynamically for colorpicker
Page.Widgets.colorpicker.autoclose = "disabled";
```

#### Events

- This is the markup for a colorpicker with an on-change event, executed when a user changes the color to trigger actions or update other UI components.

```javascript
<wm-colorpicker on-change="colorpickerChange($event, widget, newVal, oldVal)" name="colorpicker"></wm-colorpicker>
```

```javascript
Page.colorpickerChange = function ($event, widget, newVal, oldVal) {
    // Update the button's text color dynamically based on the selected color 
    Page.Widgets.buttonText.setProperty("color", newVal);
};
```
