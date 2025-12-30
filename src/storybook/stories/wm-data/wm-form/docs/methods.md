# Methods

Forms can be accessed and manipulated programmatically through the Page.Widgets API. For example, you can access a form named "userForm" with `Page.Widgets.userForm`.

*Note: The provided component data doesn't include explicit method definitions beyond the event handlers. However, forms typically provide the following common methods:*

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `reset()` | None | void | Resets all form fields to their initial values |
| `submit()` | None | void | Programmatically triggers form submission |
| `validate()` | None | boolean | Validates the form and returns whether it's valid |
| `setFieldValue(fieldName, value)` | fieldName: string, value: any | void | Sets the value of a specific form field |
| `getFieldValue(fieldName)` | fieldName: string | any | Gets the current value of a specific form field |
| `getFormData()` | None | object | Returns all form data as an object |
| `setFormData(data)` | data: object | void | Sets multiple form field values from an object |
| `clearFormData()` | None | void | Clears all form field values |
| `disableField(fieldName)` | fieldName: string | void | Disables a specific form field |
| `enableField(fieldName)` | fieldName: string | void | Enables a specific form field |
| `hideField(fieldName)` | fieldName: string | void | Hides a specific form field |
| `showField(fieldName)` | fieldName: string | void | Shows a previously hidden form field |

## Common Method Use Cases

```javascript
// Reset the form to initial values
Page.Widgets.myForm.reset();

// Programmatically set multiple field values
Page.Widgets.myForm.setFormData({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com"
});

// Validate the form without submitting
if (Page.Widgets.myForm.validate()) {
  // Form is valid, proceed with custom logic
} else {
  // Form has validation errors
}

// Programmatically submit the form
Page.Widgets.myForm.submit();
```