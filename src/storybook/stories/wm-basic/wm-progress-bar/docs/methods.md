# Methods

The Progress Bar widget can be accessed in scripts using `Page.Widgets.widgetName`, where widgetName is the name assigned to the widget.

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| show | - | - | Shows the progress bar widget |
| hide | - | - | Hides the progress bar widget |
| getProperty | propertyName (string) | any | Returns the value of the specified property |
| setProperty | propertyName (string), value (any) | - | Sets the value of the specified property |

## Common Method Use Cases

```javascript
// Show/hide the progress bar
Page.Widgets.myProgressBar.show();
Page.Widgets.myProgressBar.hide();

// Get current progress value
var currentValue = Page.Widgets.myProgressBar.getProperty('datavalue');

// Update the progress bar value
Page.Widgets.myProgressBar.setProperty('datavalue', 75);

// Change the display format dynamically
Page.Widgets.myProgressBar.setProperty('displayformat', '9.99%');
```