# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | undefined | Unique identifier for the progress circle widget |
| title | string | undefined | Main title displayed with the progress circle |
| subtitle | string | undefined | Secondary text displayed below the title |
| hint | string | undefined | Text shown as a tooltip when hovering over the widget |
| show | boolean | true | Determines the visibility of the component; can be bound to a variable |

## Progress Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | number | 0 | The current progress value to display |
| minimumValue | number | 0 | The minimum value for the progress scale |
| maximumValue | number | 100 | The maximum value for the progress scale |
| displayFormat | string | '9' | Format for displaying the progress value (e.g., '9', '9.9', '9.99', '9%') |
| captionPlacement | string | 'inside' | Position of the progress value label ('inside' or 'hidden') |
| type | string | 'default' | Visual style of the progress circle ('default', 'success', 'info', 'warning', 'danger') |

## Layout

| Name | Type | Default | Description |
|------|------|---------|-------------|
| width | string | '100%' | Width of the widget, specified in px or % |
| height | string | '100%' | Height of the widget, specified in px or % |

## Common Use Cases

```javascript
// Set current progress value
Page.Widgets.progressCircle1.value = 75;

// Update progress circle type based on value
if (Page.Widgets.progressCircle1.value > 80) {
  Page.Widgets.progressCircle1.type = 'success';
} else if (Page.Widgets.progressCircle1.value > 50) {
  Page.Widgets.progressCircle1.type = 'info';
} else if (Page.Widgets.progressCircle1.value > 30) {
  Page.Widgets.progressCircle1.type = 'warning';
} else {
  Page.Widgets.progressCircle1.type = 'danger';
}
```