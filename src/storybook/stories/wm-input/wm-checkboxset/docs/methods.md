# Methods

The CheckboxSet component can be accessed in scripts through the Page.Widgets namespace using its widget name.

For example: `Page.Widgets.myCheckboxSet`

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| getValue | None | Array | Returns the currently selected value(s) in the checkbox set. |
| setValue | value: Array | None | Sets the selected value(s) for the checkbox set. |
| enable | None | None | Enables the component, making it interactive. |
| disable | None | None | Disables the component, making it non-interactive. |
| show | None | None | Makes the component visible. |
| hide | None | None | Hides the component. |

## Example Usage
```javascript
// Get current selected values
const selectedValues = Page.Widgets.myCheckboxSet.getValue();
console.log("Selected values:", selectedValues);

// Select specific values
Page.Widgets.myCheckboxSet.setValue(["value1", "value3"]);

// Disable the checkbox set
Page.Widgets.myCheckboxSet.disable();

// Re-enable the checkbox set
Page.Widgets.myCheckboxSet.enable();
```