# Callback Events

| Event | Description |
|-------|-------------|
| **Touch Events** |
| onTap | Triggered when the user taps on the label. Useful for interactive labels. |
| onDoubleTap | Triggered when the user double taps on the label. |
| onLongTap | Triggered when the user performs a long press on the label. |

## Event Usage Examples

```javascript
// Open a URL when label is tapped
Page.onTapMyLabel = function(widget, $event) {
    window.open("https://www.example.com", "_blank");
};

// Toggle visibility of another component on double tap
Page.onDoubleTapMyLabel = function(widget, $event) {
    Page.Widgets.otherComponent.show = !Page.Widgets.otherComponent.show;
};

// Display additional information on long tap
Page.onLongTapMyLabel = function(widget, $event) {
    // Show additional details or context menu
    App.Actions.showDetailDialog.invoke();
};
```