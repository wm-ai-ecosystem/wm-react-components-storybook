# Methods

The checkbox component can be accessed programmatically through the Page.Widgets namespace, like `Page.Widgets.myCheckbox`.

| Method | Parameters | Return Type | Description |
|---|---|---|---|
| getValue | None | boolean\|string | Returns the current value of the checkbox (either checkedValue or uncheckedValue). |
| setValue | value: boolean | void | Sets the checkbox state to checked or unchecked. |
| toggle | None | void | Toggles the current state of the checkbox. |
| validate | None | boolean | Validates the checkbox against its required property. Returns true if valid. |
| focus | None | void | Programmatically sets focus to the checkbox. |

## Common Use Cases

```javascript
// Get the current value
var isTermsAccepted = Page.Widgets.termsCheckbox.getValue();

// Set the checkbox value programmatically
Page.Widgets.termsCheckbox.setValue(true);

// Toggle the current state
Page.Widgets.termsCheckbox.toggle();

// Validate the checkbox
if (!Page.Widgets.termsCheckbox.validate()) {
  App.Actions.notifyUserAction.invoke({
    message: "Please accept the terms and conditions"
  });
}
```