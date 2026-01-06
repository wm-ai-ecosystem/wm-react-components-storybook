# Methods

The Textarea widget can be accessed programmatically through the Page.Widgets object. The typical pattern for accessing a textarea widget is:

```javascript
Page.Widgets.myTextarea
```

Replace "myTextarea" with the actual name of your textarea widget.

## Available Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| getValue | none | string | Returns the current text value of the textarea |
| setValue | value: string | void | Sets the text content of the textarea |
| focus | none | void | Sets focus to the textarea |
| blur | none | void | Removes focus from the textarea |
| isValid | none | boolean | Returns whether the textarea's value passes all validations |
| setValidationMessage | message: string | void | Sets a custom validation error message |
| clearValidationMessage | none | void | Clears any validation error messages |

## Common Method Use Cases

#### Programmatically updating textarea content
```javascript
// Set the textarea content
Page.Widgets.descriptionTextarea.setValue("This is the product description that includes detailed specifications and usage instructions.");

// Get the current textarea content
var comments = Page.Widgets.commentsTextarea.getValue();
```

#### Validating and handling form submission
```javascript
// Check if the textarea is valid before form submission
if (Page.Widgets.feedbackTextarea.isValid()) {
    // Process the form
    submitFeedback(Page.Widgets.feedbackTextarea.getValue());
} else {
    // Show a validation message
    Page.Widgets.feedbackTextarea.setValidationMessage("Please provide valid feedback");
}
```