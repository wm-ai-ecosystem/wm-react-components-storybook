# Props

## Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | "" | A unique identifier for the Select widget. |
| placeholder | string | "" | Text displayed when no value is selected. |
| value | any | undefined | The default value to display for the widget. |
| multiple | boolean | false | When enabled, allows selection of multiple items. |

## Data Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| dataset | object | undefined | Variable containing the list of values to display. |
| datafield | string | "" | Specifies which field from the dataset should be used as the actual value. |
| displayfield | string | "" | Specifies which field from the dataset should be shown to the user. |
| displayexpression | string | "" | JavaScript expression to format how options are displayed. |
| orderby | string | "" | Configures sorting of options based on fields in ascending or descending order. |

## Behavior Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| autofocus | boolean | false | When true, the component automatically receives focus when the page loads. |
| readonly | boolean | false | When true, prevents the user from changing the selection. |
| show | boolean | true | Controls the visibility of the component. Can be bound to a variable. |
| loadondemand | boolean | false | Defers initialization until the widget becomes visible (only when show property is bound). |
| disabled | boolean | false | When true, makes the component non-interactive. |
| skipeventfromscript | boolean | false | When true, Change events won't trigger when value is updated programmatically. |

## Validation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| required | boolean | false | When true, the field must have a value before form submission. |

## Accessibility

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| hint | string | "" | Text shown as tooltip when hovering over the component. |
| tabindex | number | 0 | Controls the tab order for keyboard navigation. Use -1 to make non-focusable. |
| shortcutkey | string | "" | Keyboard shortcut to focus/activate the component. |

## Common Use Cases

#### Basic Select with Static Options
```javascript
// Bind Select to array of objects
Page.Widgets.mySelect.dataset = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" }
];
Page.Widgets.mySelect.datafield = "value";
Page.Widgets.mySelect.displayfield = "label";
```

#### Multiple Selection
```javascript
// Enable multiple selection
Page.Widgets.mySelect.multiple = true;

// Get selected values
var selectedValues = Page.Widgets.mySelect.datavalue;
```

#### Custom Display Expression
```javascript
// Format display with firstname and lastname
Page.Widgets.mySelect.displayexpression = "${firstname} ${lastname}";
```