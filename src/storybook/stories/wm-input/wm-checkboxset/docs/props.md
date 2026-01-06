# Props

## Basic Configuration
| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | - | A unique identifier for the component. Special characters and spaces are not allowed. |
| show | boolean | true | Determines whether the component is visible. This is a bindable property. |
| disabled | boolean | false | When true, the component becomes display-only and user input is not accepted. |
| readOnly | boolean | false | When enabled, prevents users from changing the data value of the component. |

## Accessibility
| Name | Type | Default | Description |
|------|------|---------|-------------|
| tabIndex | number | 0 | Specifies the tab order for component access using the tab key. Values range from 0 to 32767. Set to -1 to make the element non-focusable. |

## Layout
| Name | Type | Default | Description |
|------|------|---------|-------------|
| width | string | - | Width of the component. Can be specified in em, pt, px or % (e.g., 50px, 75%). |
| height | string | - | Height of the component. Can be specified in em, pt, px or % (e.g., 50px, 75%). |
| layout | string | - | Controls how contained widgets are displayed within this container. |
| itemsPerRow | number | 1 | Determines the number of items displayed in each row, affecting horizontal/vertical layout. |

## Dataset
| Name | Type | Default | Description |
|------|------|---------|-------------|
| dataset | array | - | Array of objects to populate the checkbox options. |
| useKeys | boolean | false | When true, uses the keys of the dataset object as checkbox options. |
| dataField | string | - | Specifies the property in dataset items to use as the checkbox value. |
| displayField | string | - | Specifies the property in dataset items to display as checkbox label. |
| displayExpression | string | - | JavaScript expression to format what is shown for each checkbox option. |
| groupBy | string | - | Field name used to group items in the dataset. |
| groupAs | string | - | How groups should be categorized and displayed. |
| orderBy | string | - | Fields to order the display of items (format: "field1 asc, field2 desc"). |

## Behavior
| Name | Type | Default | Description |
|------|------|---------|-------------|
| defaultValue | any | - | Default selected value(s) for the checkboxes. |
| collapsible | boolean | false | Enables control for expanding and collapsing groups. |
| showCount | boolean | false | When true, displays the number of items within each group. |
| loadOnDemand | boolean | false | When true and the show property is bound, defers initialization until the component becomes visible. |
| skipChangeEventFromScript | boolean | false | When enabled, Change events only trigger when the user updates the value from the UI, not from scripts. |

## Configure Checkbox Layout
```javascript
// Set to display 2 checkboxes per row
Page.Widgets.myCheckboxSet.itemsPerRow = 2;

// Configure to use vertical layout with one item per row
Page.Widgets.myCheckboxSet.itemsPerRow = 1;
```

## Configure Grouping
```javascript
// Group checkboxes by the "category" field
Page.Widgets.myCheckboxSet.groupBy = "category";

// Show count of items in each group
Page.Widgets.myCheckboxSet.showCount = true;

// Make groups collapsible
Page.Widgets.myCheckboxSet.collapsible = true;
```