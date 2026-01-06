# Methods

Select component methods can be accessed using `Page.Widgets.widgetName` syntax in your JavaScript code.

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| focus | None | void | Programmatically sets focus to the Select component. |
| getSelectedValues | None | Array | Returns array of currently selected values (useful for multiple selection mode). |
| getDisplayValue | None | String | Returns the currently displayed text in the Select. |
| reset | None | void | Resets the component to its default value. |

## Common Method Use Cases

#### Programmatically Setting Focus
```javascript
// Set focus to the Select component
Page.Widgets.mySelect.focus();
```

#### Getting Selected Values
```javascript
// Get the currently selected value(s)
var selectedValues = Page.Widgets.mySelect.getSelectedValues();
console.log("Selected values:", selectedValues);
```

#### Handling Display and Data Values
```javascript
// Get the text displayed to user
var displayText = Page.Widgets.mySelect.getDisplayValue();

// Get the underlying data value
var dataValue = Page.Widgets.mySelect.datavalue;
```