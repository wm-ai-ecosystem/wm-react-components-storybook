# Methods

The Datetime component can be accessed in script via `Page.Widgets.widgetName`, where `widgetName` is the name you assigned to the component.

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| getValue | None | Date/string | Returns the current value of the datetime component. |
| setValue | value (Date/string) | void | Sets the value of the datetime component. |
| reset | None | void | Resets the datetime component to its default value. |
| focus | None | void | Programmatically sets focus to the datetime component. |
| isValid | None | boolean | Returns true if the datetime value meets all validation criteria. |

## Common Method Use Cases

#### Getting and Setting Values
```javascript
// Get current value
let currentDateTime = Page.Widgets.myDatetime.getValue();

// Set to a specific date and time
Page.Widgets.myDatetime.setValue(new Date(2023, 5, 15, 14, 30)); // June 15, 2023, 2:30 PM
```

#### Validation and Focus Management
```javascript
// Check if the entered date is valid
if (Page.Widgets.myDatetime.isValid()) {
  // Proceed with form submission
} else {
  // Show validation message
  Page.Widgets.myDatetime.focus();
}
```

#### Reset to Default
```javascript
// Clear and reset to default value
Page.Widgets.myDatetime.reset();
```