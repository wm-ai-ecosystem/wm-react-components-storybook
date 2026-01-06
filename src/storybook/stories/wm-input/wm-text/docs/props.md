# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | "" | Unique identifier for the Text component |
| type | string | "text" | Specifies input type: 'text', 'password', 'email', 'number', 'tel', 'url', 'color', 'date', 'datetime-local', 'time', 'month', 'week' |
| placeholder | string | "" | Text displayed when the input is empty |
| value | string/number | "" | Default value displayed in the component |

## Validation

| Name | Type | Default | Description |
|------|------|---------|-------------|
| required | boolean | false | Makes the input field mandatory |
| regexp | string | "" | Regular expression pattern for input validation |
| maxchars | number | null | Maximum number of characters allowed |
| minvalue | number/date | null | Minimum value for number/date inputs |
| maxvalue | number/date | null | Maximum value for number/date inputs |
| step | number | null | Increment/decrement step for number inputs |

## Behavior

| Name | Type | Default | Description |
|------|------|---------|-------------|
| autofocus | boolean | false | Automatically focuses the input when page loads |
| readonly | boolean | false | Prevents user from modifying the value |
| show | boolean | true | Controls visibility of the component |
| loadondemand | boolean | false | Defers initialization until component becomes visible |
| disabled | boolean | false | Makes the input non-editable |
| autocomplete | boolean | false | Enables auto-completion functionality |
| displayformat | string | "" | Mask format for structured input (e.g., '(999) 999-9999' for phone) |
| showdisplayformaton | string | "always" | When to show display format: 'always' or 'onkeypress' |
| updatevalueon | string | "default" | When to update data value: 'blur' or 'default' (keyup) |
| updatedelay | number | 0 | Delay in milliseconds before updating data value |
| skipOnChangeEventFromScript | boolean | false | When enabled, Change event won't trigger for programmatic updates |

## Accessibility

| Name | Type | Default | Description |
|------|------|---------|-------------|
| hint | string | "" | Tooltip text shown on hover |
| tabindex | number | 0 | Controls tab navigation order (-1 to remove from tab sequence) |
| shortcutkey | string | "" | Keyboard shortcut to focus the component |

## Layout

| Name | Type | Default | Description |
|------|------|---------|-------------|
| width | string | "" | Width of the component (in px or %) |
| height | string | "" | Height of the component (in px or %) |

## Common Use Cases

#### Basic Text Input
```javascript
// Set placeholder text
Page.Widgets.myTextInput.placeholder = "Enter your name";

// Set initial value
Page.Widgets.myTextInput.value = "John Doe";
```

#### Input Validation
```javascript
// Make field required
Page.Widgets.emailInput.required = true;

// Set email validation pattern
Page.Widgets.emailInput.regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

// Limit character count
Page.Widgets.commentInput.maxchars = 100;
```

#### Formatted Input
```javascript
// Phone number mask
Page.Widgets.phoneInput.displayformat = "(999) 999-9999";
Page.Widgets.phoneInput.showdisplayformaton = "onkeypress";
```