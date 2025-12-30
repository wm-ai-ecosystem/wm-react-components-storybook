# Props

| Property | Type | Default | Description |
|---------|------|---------|-------------|
| **Basic Configuration** |
| name | string | "spinner1" | A unique identifier for the spinner component |
| caption | string | "Loading..." | The text displayed alongside the loading indicator |
| show | boolean | true | Controls the visibility of the spinner component. Can be bound to variables or expressions |
| **Visual Configuration** |
| type | string ("icon" or "image") | "icon" | Determines whether to use an icon or image as the loading indicator |
| iconClass | string | "wm-icon wm-icon-spinner" | CSS class for the icon (when type is "icon") |
| iconSize | string | "2em" | Size of the icon, specified with units (em or px) |
| animation | string | "spin" | Animation style applied to the spinner |
| **Behavior** |
| trackVariable | array | [] | Array of variables to track. Spinner will be shown until all tracked variables complete loading |
| loadOnDemand | boolean | false | When enabled and show property is bound, the widget initialization is deferred until it becomes visible |

## Common Use Cases

```javascript
// Show spinner during API call
Page.Widgets.spinner1.show = true;
Page.Variables.customerData.invoke();
  .then(function() {
    Page.Widgets.spinner1.show = false;
  });

// Track a specific variable
// Configure spinner in Properties panel:
// trackVariable = ["customerData"]
// This automatically shows spinner while variable loads
```