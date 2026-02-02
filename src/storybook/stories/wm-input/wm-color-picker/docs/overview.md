# Overview

**Color Picker** component helps in selecting a color and translate to the hex value. The Color Picker Tool can be used to select a color on any image opened on your screen. By clicking a point on an image, you can change the active color to that which is located under the pointer.

### Markup

```javascript
<wm-colorpicker name="colorpicker"></wm-colorpicker>
```

### Examples

#### Properties

- Keeps the color picker popover open until the user presses Enter.

```javascript
Page.Widgets.colorpicker.autoclose = "disabled";
```

#### Events

- Triggered whenever the color picker value changes.

```javascript
Page.colorpickerChange = function ($event, widget, newVal, oldVal) {
    // Update the button's text color dynamically at runtime 
    Page.Widgets.buttonText.setProperty("color", newVal);
};
```
