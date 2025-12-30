# Callback Events

| Event | Description |
|-------|-------------|
| `onClose` | Triggered when the dialog is closed, either by clicking the close button, pressing ESC (if closable is true), or programmatically. The event may include the originating React.SyntheticEvent that caused the close action. |
| `onOk` | Triggered when the user clicks the OK/primary action button in the dialog. The event includes the originating React.SyntheticEvent. |

## Example Usage

```javascript
// Handle dialog close event
Page.onIframeDialogClose = function(event) {
  console.log("Dialog was closed");
  // Perform cleanup or state updates
};

// Handle OK button click
Page.onIframeDialogOk = function(event) {
  console.log("OK button clicked");
  // Process form data or trigger next action
  
  // Optionally close the dialog programmatically
  Page.Widgets.iframeDialog.open = false;
};
```