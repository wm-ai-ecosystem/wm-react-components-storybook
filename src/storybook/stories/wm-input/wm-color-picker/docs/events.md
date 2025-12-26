# Callback Events

The color-picker component does not have any documented events. However, typical color picker components would typically support the following events:

| Event | Description |
|-------|-------------|
| `onChange` | Triggered when the selected color changes |
| `onOpen` | Triggered when the color picker dropdown/panel opens |
| `onClose` | Triggered when the color picker dropdown/panel closes |
| `onBlur` | Triggered when the color picker loses focus |
| `onFocus` | Triggered when the color picker receives focus |

### Example Event Usage

To handle color selection changes, you might use code similar to:

```javascript
Page.Widgets.myColorPicker.onChange = function(newValue, oldValue) {
    console.log("Color changed from " + oldValue + " to " + newValue);
    // Update dependent UI elements
    Page.Widgets.colorPreview.backgroundColor = newValue;
};
```