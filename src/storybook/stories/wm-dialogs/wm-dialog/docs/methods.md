# Methods

Dialog components can be accessed in script through the Page.Widgets namespace.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| open | none | void | Opens the dialog and displays it to the user. |
| close | none | void | Closes the dialog, removing it from view. |

## Common Use Cases

```javascript
// Open dialog when button is clicked
Page.button3Click = function($event, widget) {
    Page.Widgets.designdialog1.open();
};

// Close dialog programmatically
Page.button1Click = function($event, widget) {
    Page.Widgets.designdialog1.close();
};

// Open dialog with confirmation on form submission
Page.submitFormClick = function($event, widget) {
    // Validate form
    if (isFormValid()) {
        // Process form data
        saveData();
        // Close dialog
        Page.Widgets.designdialog1.close();
    } else {
        // Show error message
    }
};
```