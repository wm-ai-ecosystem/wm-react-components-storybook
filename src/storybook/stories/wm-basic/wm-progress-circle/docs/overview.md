# Overview

The **Progress Circle** component visually represents the completion status of a process or task using a circular progress indicator. It provides a clear visual cue of progress by displaying a proportional filled arc and corresponding percentage or value within a circular container.

### Markup

```javascript
<wm-progress-circle
  name="progress_circle"
  width="150px"
  height="150px"
  class="app-progress circle progress-circle-default"
  variant="filled:default"
></wm-progress-circle>
```

### Examples

#### Properties

- Set the progress circle’s current value dynamically.

```javascript
Page.Widgets.progress_circle.datavalue = "50";
```

- Update minimum and maximum values for progress circle.

```javascript
Page.Widgets.progress_circle.minvalue = 0;
Page.Widgets.progress_circle.maxvalue = 100;
```

#### Events

- Triggered when the mouse pointer hovers over the progress circle.

```javascript
Page.progress_circleMouseenter = function ($event, widget) {
    // Show detailed progress inside the circle
    widget.title = "Step 3";           // Current step or completed value
    widget.subtitle = "/10";      // Total steps or max value
    widget.captionplacement = "inside"; // Display the caption inside the circle
};
```

- Triggered when the mouse pointer leaves the progress circle.

```javascript
Page.progress_circleMouseleave = function ($event, widget) {
    // Hide detailed progress when not hovering
    widget.title = "";
    widget.subtitle = "";
    widget.captionplacement = "hidden"; // Hide the caption
};
```
