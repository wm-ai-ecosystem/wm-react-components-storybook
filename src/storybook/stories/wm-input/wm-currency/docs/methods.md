# Methods

The Currency widget can be accessed programmatically in scripts using `Page.Widgets.widgetName`, where `widgetName` is the name you've assigned to your widget.

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| getValue | None | number | Returns the current value of the currency widget. |
| setValue | value: number | void | Sets the value of the currency widget. |
| focus | None | void | Programmatically sets focus to the widget. |
| blur | None | void | Programmatically removes focus from the widget. |
| isValid | None | boolean | Returns true if the widget's value passes all validation rules. |
| reset | None | void | Resets the widget to its default value. |

## Common Method Use Cases

```javascript
// Get current value
var amount = Page.Widgets.myCurrency.getValue();

// Set a new value
Page.Widgets.myCurrency.setValue(150.75);

// Check if the value is valid
if (Page.Widgets.myCurrency.isValid()) {
    // Proceed with form submission
} else {
    // Show validation error
}

// Reset to default value
Page.Widgets.myCurrency.reset();

// Programmatically focus the currency input
Page.Widgets.myCurrency.focus();
```