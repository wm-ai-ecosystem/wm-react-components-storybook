# Overview

The **Progress Circle** component visually represents the completion status of a process or task using a circular progress indicator. It provides a clear visual cue of progress by displaying a proportional filled arc and corresponding percentage or value within a circular container.

### Markup

```javascript
<wm-progress-circle name="progress_circle" width="150px" height="150px" class="app-progress circle progress-circle-default" variant="filled:default"></wm-progress-circle>
```

### Examples

#### Properties

- This progress circle has configurable value, minimum, maximum, and display format, which can be set in the markup or dynamically via script.

```javascript
<wm-progress-circle datavalue="50" minvalue="0" maxvalue="100" displayformat="9%" name="progress_circle"></wm-progress-circle>
```

```javascript
// Set or update the current value of the progress circle
Page.Widgets.progress_circle.datavalue = "50";

// Define the minimum value for the progress range
Page.Widgets.progress_circle.minvalue = 0;

// Define the maximum value for the progress range
Page.Widgets.progress_circle.maxvalue = 100;

// Configure how the progress value is displayed (percentage format)
Page.Widgets.progress_circle.displayformat = "9%";
```

#### Events

- This is the markup for a progress circle with an on-mouseenter event, executed when the user hovers over the progress circle to display detailed progress information inside the circle.

```javascript
<wm-progress-circle on-mouseenter="progress_circleMouseenter($event, widget)" name="progress_circle"></wm-progress-circle>
```

```javascript
Page.progress_circleMouseenter = function ($event, widget) {
  // Set the main title to indicate the current step or progress value
  widget.title = "Step 3";

  // Set the subtitle to show the total steps or maximum value
  widget.subtitle = "/10";

  // Display the caption content inside the progress circle on hover
  widget.captionplacement = "inside";
};
```

- This is the markup for a progress circle with an on-mouseleave event, executed when the user moves the mouse away from the progress circle to hide the detailed progress information.

```javascript
<wm-progress-circle on-mouseleave="progress_circleMouseleave($event, widget)" name="progress_circle"></wm-progress-circle>
```

```javascript
Page.progress_circleMouseleave = function ($event, widget) {
  // Clear the title shown inside the progress circle
  widget.title = "";

  // Clear the subtitle shown inside the progress circle
  widget.subtitle = "";

  // Hide the caption when the progress circle is not hovered
  widget.captionplacement = "hidden";
};
```
