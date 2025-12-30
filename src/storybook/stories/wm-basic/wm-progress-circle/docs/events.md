# Callback Events

## Progress Events

| Event | Description |
|-------|-------------|
| onStart | Triggered when the progress begins its animation or update process |
| onComplete | Triggered when the progress reaches completion or its maximum value |
| onBeforeUpdate | Triggered just before the progress value is updated |

## Interaction Events

| Event | Description |
|-------|-------------|
| onClick | Triggered when the user clicks/taps on the progress circle |
| onDoubleTap | Triggered when the user double-taps on the progress circle |
| onLongTap | Triggered when the user performs a long tap on the progress circle |
| onMouseEnter | Triggered when the mouse pointer enters the widget area |
| onMouseLeave | Triggered when the mouse pointer leaves the widget area |

## Example Usage

```javascript
// Show notification when progress is complete
Page.onProgressComplete = function() {
  App.notify('Process completed successfully!', 'success');
};

// Track progress updates for analytics
Page.onBeforeUpdate = function() {
  console.log('Progress updating to: ' + Page.Widgets.progressCircle1.value);
};
```