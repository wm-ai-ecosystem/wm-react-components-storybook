# Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **direction** | "row" \| "row-reverse" \| "column" \| "column-reverse" | "row" | Determines the direction in which child elements are laid out. "row" arranges elements horizontally from left to right, "row-reverse" horizontally from right to left, "column" vertically from top to bottom, and "column-reverse" vertically from bottom to top. |
| **horizontalalign** | "left" \| "right" \| "center" | "left" | Controls the horizontal alignment of child elements within the container. |
| **verticalalign** | "top" \| "bottom" \| "center" | "top" | Controls the vertical alignment of child elements within the container. |
| **spacing** | string \| number | 0 | Defines the space between child elements. Can be specified as a numeric value (in pixels) or as a string with units (e.g., "10px", "1rem"). |

### Common Use Cases

#### Creating a Horizontal Layout
```javascript
// Create a row layout with centered items and 10px spacing
Page.Widgets.linearLayout1.direction = "row";
Page.Widgets.linearLayout1.horizontalalign = "center";
Page.Widgets.linearLayout1.spacing = 10;
```

#### Creating a Vertical Layout
```javascript
// Create a column layout with right-aligned items and 1rem spacing
Page.Widgets.linearLayout1.direction = "column";
Page.Widgets.linearLayout1.horizontalalign = "right";
Page.Widgets.linearLayout1.spacing = "1rem";
```

#### Reversing Element Order
```javascript
// Reverse the order of elements in a row
Page.Widgets.linearLayout1.direction = "row-reverse";

// Reverse the order of elements in a column
Page.Widgets.linearLayout1.direction = "column-reverse";
```

#### Centering Content Both Ways
```javascript
// Center content both horizontally and vertically
Page.Widgets.linearLayout1.horizontalalign = "center";
Page.Widgets.linearLayout1.verticalalign = "center";
```