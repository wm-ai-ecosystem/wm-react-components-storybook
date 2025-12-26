# Props

The composite input component accepts the following properties:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `captionposition` | string | "top" | Determines the position of the caption relative to the input field. Possible values include "top", "bottom", "left", and "right". |
| `required` | boolean | false | When set to true, indicates that the field must be filled before form submission. This typically displays a visual indicator (such as an asterisk) next to the field caption. |

## Common Use Cases

### Configuring Caption Position
```javascript
// Position the caption to the left of the input
Page.Widgets.myInput.captionposition = "left";

// Position the caption below the input
Page.Widgets.myInput.captionposition = "bottom";
```

### Setting Required Fields
```javascript
// Make the input field required
Page.Widgets.myInput.required = true;

// Conditionally set requirement based on form mode
if (formMode === "create") {
  Page.Widgets.nameInput.required = true;
  Page.Widgets.emailInput.required = true;
} else {
  Page.Widgets.nameInput.required = false;
}
```