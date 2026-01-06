# Props

The HTML component accepts the following properties to customize its behavior and appearance:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `horizontalalign` | `"left" \| "center" \| "right"` | `"left"` | Controls the horizontal alignment of the HTML content within the component. |
| `height` | `string` | `"auto"` | Specifies the height of the component. Accepts CSS units (px, %, em, etc.). |
| `width` | `string` | `"100%"` | Specifies the width of the component. Accepts CSS units (px, %, em, etc.). |
| `show` | `boolean` | `true` | Controls the visibility of the component. When `false`, the component is hidden. |
| `styles` | `React.CSSProperties` | `{}` | Allows applying custom CSS properties directly to the component. |
| `hint` | `string` | `""` | Provides a tooltip or contextual hint that appears on hover, useful for providing additional information. |

## Common Use Cases

```javascript
// Basic HTML content rendering
Page.Widgets.myHtml.content = "<p>This is a <strong>formatted</strong> paragraph.</p>";

// Center-align HTML content
Page.Widgets.myHtml.horizontalalign = "center";

// Set custom dimensions
Page.Widgets.myHtml.width = "500px";
Page.Widgets.myHtml.height = "300px";

// Hide HTML component conditionally
Page.Widgets.myHtml.show = userHasPermission;

// Apply custom styling
Page.Widgets.myHtml.styles = {
  backgroundColor: "#f5f5f5",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};
```