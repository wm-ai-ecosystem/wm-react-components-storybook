# Props

| Property | Type | Default | Description |
|---------|------|---------|-------------|
| **Basic** |
| name | string | "" | A unique identifier for the picture widget. |
| source | string | "" | Specifies the source for the picture. Can be a file path or URL. |
| placeholder | string | "" | Image to display when the source image is unavailable or loading. |
| **Appearance** |
| aspect | string | "none" | Controls how the image is sized within the widget. Options: "none" (default size), "h" (fit to width), "v" (fit to height), or both (fit to both). |
| shape | string | "" | Controls the shape of the picture. Options: "rounded", "circle", or "thumbnail". |
| width | string | "" | Width of the widget, can be specified in px or % (e.g., "50px", "75%"). |
| height | string | "" | Height of the widget, can be specified in px or % (e.g., "50px", "75%"). |
| **Behavior** |
| show | boolean | true | Determines whether the component is visible. This is a bindable property. |
| loadOnDemand | boolean | false | When set to true and the show property is bound to a variable, widget initialization is deferred until visible. |
| animation | string | "" | Controls the animation of the widget. Based on CSS classes, works only in run mode. |
| encodeUrl | boolean | false | When enabled, special characters in the URL are encoded at runtime to ensure proper image rendering. |
| **Accessibility** |
| hint | string | "" | Text displayed as tooltip when mouse hovers over the widget. |
| tabindex | number | 0 | Specifies the tab order. Value range: 0 to 32767. Set to -1 to make non-focusable. |

## Common Use Cases

```javascript
// Set a remote image URL
Page.Widgets.myPicture.source = "https://example.com/images/profile.jpg";

// Toggle picture visibility
Page.Widgets.myPicture.show = false; // Hide the picture
Page.Widgets.myPicture.show = true;  // Show the picture

// Change the shape
Page.Widgets.myPicture.shape = "circle"; // Make the picture circular
```