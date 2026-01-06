# Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **Basic** |||||
| name | string | "" | A unique identifier for the radioset component. |
| **Data** |||||
| value | any | undefined | The default selected value for the radioset. |
| dataset | array | [] | An array of objects used to populate the radioset options. |
| useKeys | boolean | false | When true, uses the keys of the dataset objects as radioset options. |
| dataField | string | "" | Specifies which field in the dataset to use as the value for each option. |
| displayField | string | "" | Specifies which field in the dataset to display as the label for each option. |
| displayExpression | string | "" | JavaScript expression that defines custom formatting for option display text. |
| orderBy | string | "" | Controls the sorting order of options based on fields in ascending or descending order. |
| **Layout** |||||
| width | string | "100%" | The width of the component (px, em, or %). |
| height | string | "auto" | The height of the component (px, em, or %). |
| itemsPerRow | number | 0 | Determines the number of radio buttons to display in each row. |
| layout | string | "stacked" | Controls how options are displayed - 'inline' or 'stacked'. |
| **Behavior** |||||
| required | boolean | false | When true, requires a selection before form submission. |
| readOnly | boolean | false | When true, prevents the user from changing the selection. |
| show | boolean | true | Controls the visibility of the component. |
| loadOnDemand | boolean | false | When true and show property is bound, defers initialization until the widget becomes visible. |
| disabled | boolean | false | When true, disables user interaction with the component. |
| skipOnChangeEventFromScript | boolean | false | When true, the Change event won't trigger when the value is updated programmatically. |
| **Accessibility** |||||
| tabIndex | number | 0 | Controls the tab order for keyboard navigation. Set to -1 to make non-focusable. |

## Examples

#### Basic Configuration
```javascript
// Setting up a radioset with predefined options
Page.Widgets.genderRadioset.dataset = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];
Page.Widgets.genderRadioset.dataField = "value";
Page.Widgets.genderRadioset.displayField = "label";
```

#### Using Display Expression
```javascript
// Format display text using expression
Page.Widgets.employeeRadioset.displayExpression = "${firstName} ${lastName} (${department})";
```

#### Changing Layout Dynamically
```javascript
// Switch to horizontal layout with 3 items per row
Page.Widgets.categoryRadioset.layout = "inline";
Page.Widgets.categoryRadioset.itemsPerRow = 3;
```