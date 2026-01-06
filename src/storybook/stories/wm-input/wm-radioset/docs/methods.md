# Methods

Radioset component methods can be accessed using the pattern `Page.Widgets.widgetName.methodName()`.

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| setValue | value: any | void | Sets the selected value programmatically. |
| getValue | none | any | Returns the currently selected value. |
| reset | none | void | Resets the radioset to its default value. |
| setDisabled | disabled: boolean | void | Enables or disables the radioset. |
| setReadOnly | readOnly: boolean | void | Sets the component to read-only mode. |
| setDataset | dataset: array | void | Dynamically updates the options in the radioset. |

## Examples

#### Setting Value Programmatically
```javascript
// Select a specific option
Page.Widgets.countryRadioset.setValue("USA");
```

#### Dynamic Dataset Update
```javascript
// Update the radioset options based on API response
Page.Variables.countriesVariable.invoke().
  then(function(data) {
    Page.Widgets.countryRadioset.setDataset(data);
  });
```

#### Toggle Disabled State
```javascript
// Disable radioset when a condition is met
if (Page.Widgets.premiumCheckbox.datavalue) {
  Page.Widgets.planRadioset.setDisabled(false);
} else {
  Page.Widgets.planRadioset.setDisabled(true);
}
```