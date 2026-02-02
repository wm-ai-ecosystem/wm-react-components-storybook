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

- Triggered before the progress circle is rendered to track or log the current progress value.

```javascript
Page.progress_circleBeforerender = function ($event, widget) {
  console.log("Progress updating to: " + Page.Widgets.progressCircle.datavalue);
};
```
