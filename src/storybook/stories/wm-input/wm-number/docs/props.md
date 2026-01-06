# Props

## Basic Configuration
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | - | A unique identifier for the Number widget |
| placeholder | string | - | Text displayed when the input field is empty |
| value | number | - | The default numeric value displayed in the widget |

## Validation
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| required | boolean | false | When true, the field cannot be left empty |
| regexp | string | - | Regular expression pattern to validate user input |
| minvalue | number | - | Minimum allowed input value |
| maxvalue | number | - | Maximum allowed input value |
| step | number | - | Increment/decrement interval when using stepper controls |

## Behavior
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| autofocus | boolean | false | When true, the input automatically receives focus when the page loads |
| readonly | boolean | false | When true, prevents the user from editing the input value |
| show | boolean | true | Controls the visibility of the component |
| loadOnDemand | boolean | false | When true and show property is bound, widget initialization is deferred until visible |
| disabled | boolean | false | When true, makes the widget non-interactive and display-only |
| allowTrailingZeros | boolean | false | When true, keeps trailing zeros after decimal point |
| updateValueOn | string | 'default' | Controls when data value updates: 'blur' (on blur event) or 'default' (on key up) |
| skipOnChangeEventFromScript | boolean | false | When true, Change callback only triggers on user input, not script updates |

## Accessibility
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| hint | string | - | Tooltip text shown when hovering over the widget |
| tabindex | number | 0 | Controls the tab order for keyboard navigation |
| shortcutkey | string | - | Keyboard shortcut to focus the widget |

## Configure Number Widget Example
```javascript
// Set minimum and maximum values
Page.Widgets.myNumberInput.minvalue = 1;
Page.Widgets.myNumberInput.maxvalue = 100;

// Configure step increment
Page.Widgets.myNumberInput.step = 5;

// Enable trailing zeros
Page.Widgets.myNumberInput.allowTrailingZeros = true;
```