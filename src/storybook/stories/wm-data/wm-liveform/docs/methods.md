# Methods

The live-form component can be accessed in scripts through the Page.Widgets namespace. For example: `Page.Widgets.myLiveForm`

According to the provided data, there are no specific methods documented for the live-form component. However, standard form methods that may be available through the platform typically include:

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `reset()` | None | void | Resets all form fields to their default values. |
| `submit()` | None | Promise | Programmatically submits the form. |
| `validate()` | None | boolean | Validates all form fields and returns true if valid. |
| `setMode(mode)` | mode: string | void | Changes the current mode of the form ("create", "edit", "view"). |
| `getData()` | None | Object | Returns the current form data as an object. |
| `setData(data)` | data: Object | void | Sets form field values from the provided data object. |

## Common Method Use Cases

```javascript
// Submit the form programmatically
Page.Widgets.customerForm.submit().then(function(response) {
    console.log("Form submitted successfully", response);
}).catch(function(error) {
    console.error("Form submission error", error);
});

// Switch the form to view mode
Page.Widgets.customerForm.setMode("view");

// Reset the form
Page.Widgets.customerForm.reset();

// Validate the form
if (Page.Widgets.customerForm.validate()) {
    // Form is valid, proceed with submission
    Page.Widgets.customerForm.submit();
}
```

Please refer to the platform documentation for the specific methods that are supported for the live-form component in your implementation context.