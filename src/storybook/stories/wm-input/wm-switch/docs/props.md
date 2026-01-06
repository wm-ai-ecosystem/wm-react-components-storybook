# Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| **Basic** |
| name | string | - | A unique identifier for the Switch widget |
| value | string | "yes" | The default selected option to display initially |
| **Dataset** |
| dataset | array/object | ["yes", "no", "maybe"] | The list of values/options to display in the switch |
| datafield | string | - | Specifies which field from the dataset should be used as the value |
| displayfield | string | - | Specifies which field from the dataset should be shown as display text |
| orderby | string | - | Determines the ordering of options based on fields in ascending or descending order |
| **Validation** |
| required | boolean | false | When true, the widget must have a value selected for form submission |
| **Behavior** |
| show | boolean | true | Controls the visibility of the component |
| loadOnDemand | boolean | false | When enabled and the 'show' property is bound to a variable, widget initialization is deferred until it becomes visible |
| disabled | boolean | false | When true, prevents user interaction with the switch |
| skipOnChangeEventFromScript | boolean | false | When enabled, the Change event triggers only when user interacts with the widget, not when value is changed programmatically |
| **Accessibility** |
| hint | string | - | Tooltip text displayed when hovering over the widget |
| tabindex | number | 0 | Controls the tab order for keyboard navigation. Set to -1 to make it non-focusable |
| **Layout** |
| width | string | - | The width of the widget, can be specified in pixels or percentage |
| height | string | - | The height of the widget, can be specified in pixels or percentage |

## Common Use Cases

```javascript
// Setting custom options for the switch
Page.Widgets.mySwitch.dataset = ["Red", "Green", "Blue"];

// Working with object datasets
Page.Widgets.mySwitch.dataset = [
  {id: 1, name: "Low"},
  {id: 2, name: "Medium"},
  {id: 3, name: "High"}
];
Page.Widgets.mySwitch.datafield = "id";
Page.Widgets.mySwitch.displayfield = "name";

// Setting a default value
Page.Widgets.mySwitch.value = "Green";

// Programmatically enabling/disabling the switch
Page.Widgets.mySwitch.disabled = true;
```