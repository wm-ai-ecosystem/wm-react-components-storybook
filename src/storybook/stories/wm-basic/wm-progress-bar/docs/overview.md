# Overview

The **Progress Bar** component visually represents the completion status of a task or process. It displays progress as a horizontal bar that fills from left to right as the task advances, providing users with a clear indication of how much of the task has been completed.

### Markup

```javascript
<wm-progress-bar name="progress_bar" class="app-progress progress-bar-default" variant="filled:default"></wm-progress-bar>
```

### Examples

#### Properties

- This progress bar has configurable value, minimum, and maximum, which can be set in the markup or dynamically via script.

```javascript
<wm-progress-bar datavalue="30" minvalue="0" maxvalue="100" name="progress_bar"></wm-progress-bar>
```

```javascript
// Set or update the progress bar's current value dynamically
Page.Widgets.progress_bar.datavalue = "30";

// Set or update the minimum value for the progress bar
Page.Widgets.progress_bar.minvalue = 0;

// Set or update the maximum value for the progress bar
Page.Widgets.progress_bar.maxvalue = 100;
```

#### Events

- This is the markup for a progress bar with an on-mouseenter event, executed when the user hovers over the progress bar to display the caption inside.

```javascript
<wm-progress-bar on-mouseenter="progress_barMouseenter($response, widget)" name="progress_bar"></wm-progress-bar>
```

```javascript
Page.progress_barMouseenter = function ($response, widget) {
  // Move the caption to display inside the progress bar when hovered
  widget.captionplacement = "inside";
};
```

- This is the markup for a progress bar with an on-mouseleave event, executed when the user moves the cursor away to hide the caption.

```javascript
<wm-progress-bar on-mouseleave="progress_barMouseleave($response, widget)" name="progress_bar"></wm-progress-bar>
```

```javascript
Page.progress_barMouseleave = function ($response, widget) {
  // Hide the caption when the cursor leaves the progress bar
  widget.captionplacement = "hidden";
};
```
