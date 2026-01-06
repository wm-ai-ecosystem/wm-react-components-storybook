# Props

The color-picker component does not have any documented props. However, typical color picker implementations would include the following properties:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `"#000000"` | The currently selected color value |
| `defaultValue` | `string` | `"#000000"` | The default color when the picker is first rendered |
| `format` | `string` | `"hex"` | The color format to use (hex, rgb, hsl) |
| `disabled` | `boolean` | `false` | Whether the color picker is disabled |
| `showAlpha` | `boolean` | `false` | Whether to show alpha channel adjustment |
| `palette` | `array` | `[]` | Custom color palette options to display |
| `showHistory` | `boolean` | `true` | Whether to show recently selected colors |

## Basic Usage
```javascript
// Set a default color
Page.Widgets.myColorPicker.value = "#FF5733";

// Disable the color picker
Page.Widgets.myColorPicker.disabled = true;

// Enable alpha channel selection
Page.Widgets.myColorPicker.showAlpha = true;
```

## Configure Color Format
```javascript
// Change color format to RGB
Page.Widgets.myColorPicker.format = "rgb";

// Change color format to HSL
Page.Widgets.myColorPicker.format = "hsl";
```