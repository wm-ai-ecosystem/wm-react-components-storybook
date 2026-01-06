# Props

## Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | "" | A unique identifier for the Currency widget. |
| placeholder | string | "" | Text to display when the input is empty. Useful for providing hints to users. |
| currency | string | "USD" | Determines which currency symbol should be displayed. Choose from available options. |
| value | number | null | The default value displayed in the widget. |

## Validation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| required | boolean | false | When set to true, the field must have a value before submission. |
| minimumValue | number | null | The minimum acceptable value for the input field. |
| maximumValue | number | null | The maximum acceptable value for the input field. |
| step | number | 1 | Interval for incrementing/decrementing the value using stepper controls. |

## Behavior

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| readOnly | boolean | false | When true, prevents users from changing the value. |
| show | boolean | true | Controls whether the component is visible. Can be bound to a variable. |
| loadOnDemand | boolean | false | When enabled and show property is bound, initialization of the widget is deferred until it becomes visible. Improves load time but limits script interaction until initialized. |
| disabled | boolean | false | When true, the widget becomes display-only and prevents value changes. |
| allowTrailingZeros | boolean | false | Specifies whether to keep trailing zeros after decimal point. |
| skipOnChangeEventFromScript | boolean | false | When enabled, the Change callback triggers only when the user updates the value through the UI, not when updated via scripts. |

## Accessibility

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| hint | string | "" | Text shown as a tooltip when hovering over the widget. Can be bound to variables. |
| tabIndex | number | 0 | Specifies the tab order for keyboard navigation. Range: 0-32767. Setting to -1 makes the element non-focusable. |
| shortcutKey | string | "" | Specifies a shortcut key to activate or focus the element. |

## Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| width | string | "100%" | The width of the widget, specified in px or %. |
| height | string | "auto" | The height of the widget, specified in px or %. |

## Common Use Cases

```javascript
// Set currency to Euro
Page.Widgets.myCurrency.currency = "EUR";

// Set minimum and maximum value range
Page.Widgets.myCurrency.minimumValue = 10;
Page.Widgets.myCurrency.maximumValue = 1000;

// Configure step increment
Page.Widgets.myCurrency.step = 5;

// Enable trailing zeros for precise display
Page.Widgets.myCurrency.allowTrailingZeros = true;
```