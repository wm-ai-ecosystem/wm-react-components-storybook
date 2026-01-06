# Props

| Property | Type | Default | Description |
|---|---|---|---|
| **Basic Configuration** | | | |
| name | string | "" | A unique identifier for the checkbox. Special characters and spaces are not allowed. |
| caption | string | "" | The text displayed next to the checkbox. |
| value | boolean | false | The initial checked state of the checkbox. |
| checkedValue | string \| boolean | true | The value returned when the checkbox is checked. Default is boolean true. |
| uncheckedValue | string \| boolean | false | The value returned when the checkbox is unchecked. Default is boolean false. |
| **Validation** | | | |
| required | boolean | false | When true, the field cannot be left empty when contained in a form. |
| **Behavior** | | | |
| show | boolean | true | Controls visibility of the component. Can be bound to a variable. |
| disabled | boolean | false | When true, prevents user interaction and makes the checkbox read-only. |
| skipOnChangeEventFromScript | boolean | false | When enabled, the Change callback will only trigger when the user updates the value from the UI, not when updated through scripts. |
| **Accessibility** | | | |
| hint | string | "" | Text shown as a tooltip when hovering over the component. |
| tabIndex | number | 0 | Controls the tab order for keyboard navigation. -1 makes the component unfocusable. |
| shortcutKey | string | "" | Keyboard key that acts as a shortcut to toggle the checkbox. |

## Common Use Cases

#### Setting Default Values
```javascript
// Set initial state to checked
Page.Widgets.myCheckbox.value = true;

// Set custom values for checked/unchecked states
Page.Widgets.termsCheckbox.checkedValue = "accepted";
Page.Widgets.termsCheckbox.uncheckedValue = "declined";
```

#### Handling Validation
```javascript
// Make checkbox required
Page.Widgets.termsCheckbox.required = true;

// Check if valid before proceeding
if (Page.Widgets.termsCheckbox.validate()) {
  // Proceed with form submission
}
```