# Props

## Basic Properties
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | "" | A unique identifier for the Time component |
| placeholder | string | "" | Text displayed when no value is set; helpful for providing input hints to users |
| value | string | "" | The default time value; can be set to current time |

## Display Format Properties
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| timePattern | string | "hh:mm a" | Defines how time is displayed (e.g., 'hh:mm:ss a', 'HH:mm') |
| hourStep | number | 1 | Number of hours to increase or decrease when using time picker controls |
| minuteStep | number | 1 | Number of minutes to increase or decrease when using time picker controls |

## Output Properties
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| outputFormat | string | "timestamp" | Format of output data value returned by the time widget; default returns timestamp integer |

## Validation Properties
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| required | boolean | false | When true, the field must have a value before form submission |

## Behavior Properties
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| showTimePickerOn | string | "inputButtonClick" | Controls when time picker displays: "inputButtonClick" (default) or "buttonClick" |
| autoFocus | boolean | false | When true, the component automatically receives focus when the screen loads |
| readOnly | boolean | false | When true, prevents the user from changing the component's value |
| show | boolean | true | Determines whether the component is visible |
| disabled | boolean | false | When true, the component becomes display-only and its value cannot be changed |
| skipOnChangeEventFromScript | boolean | false | When true, the onChange callback only triggers when user updates the value, not through scripts |

## Accessibility Properties
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| hint | string | "" | Text displayed as tooltip on hover |
| tabIndex | number | 0 | Specifies the tab order for the component; -1 makes it non-focusable |
| shortcutKey | string | "" | Keyboard shortcut to focus/activate the component |

## Common Use Cases

```javascript
// Set default value to current time
Page.Widgets.timeWidget.value = new Date().toLocaleTimeString();

// Set 15-minute intervals for the time picker
Page.Widgets.timeWidget.minuteStep = 15;

// Configure 24-hour format
Page.Widgets.timeWidget.timePattern = "HH:mm";

// Set output format to return formatted string instead of timestamp
Page.Widgets.timeWidget.outputFormat = "HH:mm";
```