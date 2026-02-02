# Overview

The **Progress Bar** component visually represents the completion status of a task or process. It displays progress as a horizontal bar that fills from left to right as the task advances, providing users with a clear indication of how much of the task has been completed.

### Markup

```javascript
<wm-progress-bar datavalue="30" name="progress_bar" class="app-progress progress-bar-default" variant="filled:default"></wm-progress-bar>
```


### Examples

#### Properties 

- Set the progress bar’s current value dynamically.

```javascript
Page.Widgets.progress_bar.datavalue = "50";
```

- Update minimum and maximum values for progress bar.

```javascript
Page.Widgets.progress_bar.minvalue = 0;
Page.Widgets.progress_bar.maxvalue = 100;
```

#### Events 

- Triggered on hover to display the caption inside the progress bar.

```javascript
    Page.progress_barMouseenter = function ($response, widget) {
        widget.captionplacement = "inside";
};
```

- Triggered when the cursor leaves to hide the caption for the progress bar.

```javascript
    Page.progress_barMouseleave = function ($response, widget) {
        widget.captionplacement = "hidden";
};
```

