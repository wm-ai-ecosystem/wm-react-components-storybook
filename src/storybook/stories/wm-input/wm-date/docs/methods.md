# Methods

The Date component can be accessed in scripts using `Page.Widgets.widgetName`, where `widgetName` is the name you assigned to the component.

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| getValue | - | Date | Returns the currently selected date value |
| setValue | value (Date/String) | - | Sets the date value programmatically |
| focus | - | - | Sets focus to the date input |
| blur | - | - | Removes focus from the date input |
| isValid | - | Boolean | Returns whether the current value satisfies validation rules |
| show | - | - | Makes the date component visible |
| hide | - | - | Hides the date component |
| enable | - | - | Enables user interaction with the date component |
| disable | - | - | Disables user interaction with the date component |

## Common Method Use Cases

```javascript
// Programmatically set date to tomorrow
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
Page.Widgets.myDate.setValue(tomorrow);

// Get the current value
let selectedDate = Page.Widgets.myDate.getValue();
console.log("Selected date:", selectedDate);

// Validate and respond
if (Page.Widgets.myDate.isValid()) {
  // Proceed with form submission
  Page.Variables.submitFormService.invoke();
} else {
  App.notify("Please select a valid date");
}
```