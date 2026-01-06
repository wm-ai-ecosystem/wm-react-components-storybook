# Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **Dialog Control** | | | |
| isopen | boolean | false | Controls the visibility of the dialog. When `true`, the dialog is displayed. |
| name | string | "" | Unique identifier for the confirm dialog component. |
| onClose | function | - | Callback function triggered when the dialog is closed by any means. |
| **Content Configuration** | | | |
| title | string | "Confirm" | The title text displayed in the dialog header. |
| message | string \| React.ReactNode | - | The primary message content of the dialog. Can be a string or React node. |
| text | string \| React.ReactNode | - | Alternative to message, provides content for the dialog body. |
| iconclass | string | - | CSS class for an optional icon to display in the dialog. |
| **Button Configuration** | | | |
| oktext | string | "OK" | The text displayed on the confirmation button. |
| canceltext | string | "Cancel" | The text displayed on the cancellation button. |
| **Event Handlers** | | | |
| onOk | function | - | Callback function triggered when the confirmation button is clicked. |
| onCancel | function | - | Callback function triggered when the cancellation button is clicked. |

## Common Use Cases

```javascript
// Basic confirmation dialog
Page.Widgets.confirmDialog.isopen = true;
Page.Widgets.confirmDialog.title = "Delete Item";
Page.Widgets.confirmDialog.message = "Are you sure you want to delete this item? This action cannot be undone.";

// Customizing button text
Page.Widgets.confirmDialog.oktext = "Delete";
Page.Widgets.confirmDialog.canceltext = "Keep Item";

// Using with custom icon
Page.Widgets.confirmDialog.iconclass = "fa fa-exclamation-triangle text-warning";

// Using React nodes for rich content
Page.Widgets.confirmDialog.message = <div>
  <p>You're about to perform an irreversible action.</p>
  <ul>
    <li>All associated data will be removed</li>
    <li>This cannot be undone</li>
  </ul>
</div>;
```