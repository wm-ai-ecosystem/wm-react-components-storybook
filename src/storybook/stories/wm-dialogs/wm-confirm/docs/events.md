# Callback Events

| Event | Description |
| --- | --- |
| onClose(event?: React.SyntheticEvent) | Triggered whenever the dialog is closed, regardless of which action caused the closure. This could be clicking the close icon, pressing ESC key, or clicking outside the dialog (if allowed). |
| onOk(event?: React.SyntheticEvent) | Triggered when the user clicks the confirmation button (the button with text defined by the `oktext` prop). This is typically used to proceed with the action that required confirmation. |
| onCancel(event?: React.SyntheticEvent) | Triggered when the user clicks the cancellation button (the button with text defined by the `canceltext` prop). This is typically used to abort the action that required confirmation. |

## Example Usage

```javascript
// Handle confirmation
Page.Widgets.confirmDialog.onOk = function(event) {
    // Proceed with the action (e.g., delete item)
    deleteRecord(itemId);
};

// Handle cancellation
Page.Widgets.confirmDialog.onCancel = function(event) {
    // Optional: log cancellation or perform alternative action
    console.log("User cancelled the operation");
};

// Handle any dialog closure
Page.Widgets.confirmDialog.onClose = function(event) {
    // Reset state or perform cleanup
    resetFormState();
};
```