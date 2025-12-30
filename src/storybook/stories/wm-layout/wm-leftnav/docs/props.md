# Props

The LeftNav component accepts the following properties to customize its behavior and appearance:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `columnwidth` | string | "" | Specifies the width of the navigation panel. Can be set in pixels (e.g., "250px"), percentage (e.g., "20%"), or other valid CSS width values. |
| `navheight` | string | "" | Defines the height of the navigation panel. Can be specified in pixels (e.g., "500px"), percentage (e.g., "100%"), or other valid CSS height values. |

## Common Use Cases

```javascript
// Set a fixed width for the navigation panel
Page.Widgets.leftNav.columnwidth = "300px";

// Make the navigation panel take up 25% of the container width
Page.Widgets.leftNav.columnwidth = "25%";

// Set the navigation panel to full height
Page.Widgets.leftNav.navheight = "100%";

// Set a specific height for the navigation panel
Page.Widgets.leftNav.navheight = "calc(100vh - 60px)";
```