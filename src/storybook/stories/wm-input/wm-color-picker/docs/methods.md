# Methods

The color-picker component does not have any documented methods. However, typical color picker implementations would provide the following methods for script access via `Page.Widgets.widgetName`:

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| `getValue` | None | `string` | Returns the currently selected color |
| `setValue` | `color: string` | `void` | Sets the current color to the provided value |
| `open` | None | `void` | Opens the color picker dropdown/panel |
| `close` | None | `void` | Closes the color picker dropdown/panel |
| `reset` | None | `void` | Resets to the default color |
| `focus` | None | `void` | Sets focus to the color picker |
| `clear` | None | `void` | Clears the current selection |

### Common Method Usage

```javascript
// Get the current color value
var currentColor = Page.Widgets.myColorPicker.getValue();
console.log("Current color is: " + currentColor);

// Set a new color programmatically
Page.Widgets.myColorPicker.setValue("#3366FF");

// Open the color picker programmatically
Page.Widgets.myColorPicker.open();

// Reset to default color
Page.Widgets.myColorPicker.reset();
```