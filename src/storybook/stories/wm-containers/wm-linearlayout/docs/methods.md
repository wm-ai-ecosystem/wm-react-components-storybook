# Methods

The Linear Layout component does not expose any specific methods beyond property access. You can access and modify the component's properties using the Page.Widgets notation:

```javascript
// Access the component
var linearLayout = Page.Widgets.myLinearLayout;

// Change direction dynamically
linearLayout.direction = "column";

// Update spacing
linearLayout.spacing = 20;
```

The component will automatically re-render when properties are changed at runtime.