# Props

## Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | undefined | A unique identifier for the textarea widget |
| value | string | "" | The default text to display in the textarea |
| placeholder | string | "" | Hint text displayed when the textarea is empty |

## Validation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| required | boolean | false | When true, the field must have a value before a form can be submitted |
| maximumCharacters | number | undefined | Defines the maximum number of characters allowed |
| helpText | string | undefined | Displays character count information when maximumCharacters is set |

## Behavior

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| autoFocus | boolean | false | When true, the textarea will automatically receive focus when the page loads |
| readOnly | boolean | false | When true, prevents the user from editing the content |
| show | boolean | true | Controls the visibility of the component |
| loadOnDemand | boolean | false | When true and show property is bound, widget initialization is deferred until visible |
| disabled | boolean | false | When true, the textarea becomes display-only and cannot be edited |
| updateValueOn | string | "default" | Determines when the value updates - "default" (on key up) or "blur" (when focus leaves) |
| updateDelay | number | 0 | The delay in milliseconds before updating the data value after user input |
| skipOnChangeEventFromScript | boolean | false | When true, the Change event won't trigger when the value is updated through scripts |

## Accessibility

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| hint | string | "" | Text shown as a tooltip when hovering over the widget |
| tabIndex | number | 0 | Specifies the tab order for keyboard navigation |
| shortcutKey | string | "" | Keyboard shortcut to focus the textarea |

## Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| width | string | "100%" | Width of the textarea, can be specified in px or % |
| height | string | "100px" | Height of the textarea, can be specified in px or % |

## Common Use Cases

#### Setting up a feedback form textarea
```javascript
// Configure a textarea for feedback with character limit
Page.Widgets.feedbackTextarea.placeholder = "Please provide your feedback here...";
Page.Widgets.feedbackTextarea.maximumCharacters = 500;
Page.Widgets.feedbackTextarea.helpText = "${charlength}/${maxchars} characters used";
```

#### Creating a read-only text display area
```javascript
// Set up a read-only textarea to display information
Page.Widgets.descriptionArea.value = productDescription;
Page.Widgets.descriptionArea.readOnly = true;
```