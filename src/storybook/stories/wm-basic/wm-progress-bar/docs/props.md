# Props

## General

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | - | Unique identifier for the progress bar widget |
| type | string | "default" | Visual style of the progress bar. Options: default, default-striped, success, success-striped, info, info-striped, warning, warning-striped, danger, danger-striped |

## Accessibility

| Name | Type | Default | Description |
|------|------|---------|-------------|
| hint | string | - | Text displayed as tooltip when hovering over the widget |
| tabindex | number | 0 | Controls tab order for keyboard navigation. -1 makes the element non-focusable |

## Layout

| Name | Type | Default | Description |
|------|------|---------|-------------|
| width | string | - | Width of the widget specified in px or % |
| height | string | - | Height of the widget specified in px or % |

## Data

| Name | Type | Default | Description |
|------|------|---------|-------------|
| datavalue | number | - | The current progress value |
| minvalue | number | 0 | Minimum value for the progress bar |
| maxvalue | number | 100 | Maximum value for the progress bar |
| displayformat | string | - | Format for displaying the progress value (e.g., 9, 9.9, 9.99%) |

## Behavior

| Name | Type | Default | Description |
|------|------|---------|-------------|
| pollinterval | number | - | Time interval in milliseconds to poll the service |
| show | boolean | true | Determines if the component is visible |
| loadondemand | boolean | false | Defers initialization until widget becomes visible (only when show property is bound to a variable) |
| captionplacement | string | "inside" | Placement of progress bar value. Options: inside, hidden |
| showtooltip | boolean | false | Determines whether to display a tooltip over the progress bar |
| tooltipposition | string | "up" | Position of the tooltip. Options: up, down, left, right |

## Configure Progress Bar Behavior

```javascript
// Set progress value
Page.Widgets.myProgressBar.datavalue = 65;

// Change progress bar type
Page.Widgets.myProgressBar.type = "success-striped";

// Change tooltip position
Page.Widgets.myProgressBar.tooltipposition = "right";

// Update minimum and maximum values
Page.Widgets.myProgressBar.minvalue = 10;
Page.Widgets.myProgressBar.maxvalue = 200;
```