# Methods

Number widget can be accessed in your JavaScript code using:

```javascript
Page.Widgets.widgetName
```

The Number widget inherits standard methods for handling values and states:

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| getValue | - | number | Returns the current numeric value of the widget |
| setValue | value: number | void | Sets the numeric value of the widget |
| focus | - | void | Programmatically sets focus to the widget |
| blur | - | void | Removes focus from the widget |
| enable | - | void | Enables the widget if it was previously disabled |
| disable | - | void | Disables the widget, making it non-interactive |
| show | - | void | Makes the widget visible |
| hide | - | void | Hides the widget |

## Method Usage Examples
```javascript
// Get current value
var currentValue = Page.Widgets.myNumberInput.getValue();

// Set value programmatically
Page.Widgets.myNumberInput.setValue(42);

// Disable the widget
Page.Widgets.myNumberInput.disable();

// Enable the widget
Page.Widgets.myNumberInput.enable();
```