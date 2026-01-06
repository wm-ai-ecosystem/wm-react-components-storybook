# Methods

Time component methods can be accessed through the Page.Widgets namespace, using the format `Page.Widgets.widgetName.methodName()`.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| focus | none | void | Sets focus to the time component |
| getValue | none | string\|number | Returns the current value in the specified output format |
| setValue | value (string\|Date) | void | Sets the component's value programmatically |
| reset | none | void | Resets the time field to its initial value |
| isValid | none | boolean | Returns whether the current value is valid according to validation rules |
| enable | none | void | Enables the time component if it was disabled |
| disable | none | void | Disables the time component, making it non-editable |

## Common Method Use Cases

```javascript
// Get the current time value
var timeValue = Page.Widgets.timeWidget.getValue();

// Set a specific time programmatically
Page.Widgets.timeWidget.setValue("10:30 AM");

// Validate and process time value
if (Page.Widgets.timeWidget.isValid()) {
  // Process the time value
  var timeValue = Page.Widgets.timeWidget.getValue();
} else {
  // Handle invalid time entry
  App.Actions.appNotification.invoke({
    message: "Please enter a valid time",
    type: "error"
  });
}
```