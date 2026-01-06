# Props

| Property | Type | Default | Description |
|---------|------|---------|-------------|
| **Basic** |
| caption | string | "" | The text message to be displayed to the user |
| name | string | "" | Unique identifier for the message widget. Special characters and spaces are not allowed |
| type | enum | "info" | Specifies the message type which determines styling and icon. Options: "error", "info", "loading", "success", "warning" |
| **Layout** |
| width | string | "100%" | Width of the message widget. Can be specified in px or % |
| height | string | "auto" | Height of the message widget. Can be specified in px or % |
| **Behavior** |
| show | boolean | true | Controls the visibility of the widget. Can be bound to a variable |
| loadOnDemand | boolean | false | When enabled and show property is bound, widget initialization is deferred until visible |
| hideClose | boolean | false | When true, hides the close button option |
| animation | string | "none" | Controls the animation style of the message widget |

## Common Use Cases

```javascript
// Set message type programmatically
Page.Widgets.message1.type = "error";

// Update message text
Page.Widgets.message1.caption = "Operation failed. Please try again.";

// Show a success message after operation completes
Page.Widgets.message1.type = "success";
Page.Widgets.message1.caption = "Data saved successfully";
Page.Widgets.message1.showMessage();
```