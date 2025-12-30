# Callback Events

| Event | Description |
|-------|-------------|
| onClose | Triggered when the dialog is closed by any means (button click, ESC key, or programmatic close) |
| onOpen | Triggered when the dialog is opened |

## Event Usage Examples

```javascript
// Handle dialog open event
Page.designDialog1Open = function($event, widget) {
    console.log('Dialog opened');
    // Perform initialization tasks when dialog opens
};

// Handle dialog close event
Page.designDialog1Close = function($event, widget) {
    console.log('Dialog closed');
    // Perform cleanup or follow-up actions
};
```