# Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **Basic Configuration** |
| caption | string | "" | Text that appears alongside the icon. This property is bindable. |
| iconclass | string | "" | Specifies the CSS class of the icon (e.g., "fa fa-user" for a Font Awesome user icon). |
| iconurl | string | "" | URL to an image to be used as an icon instead of an icon font. |
| iconposition | "left" \| "right" | "left" | Determines the position of the icon relative to the caption. |
| iconsize | string | "" | Defines the size of the icon. Value should include units (e.g., "2em" or "24px"). |
| **Accessibility** |
| arialabel | string | "" | Provides an accessible label for the icon for screen readers. |
| **Advanced** |
| prefabName | string | "" | Identifier used when the icon is part of a prefab. |

## Common Use Cases

```javascript
// Setting a Font Awesome icon
Page.Widgets.myIcon.iconclass = "fa fa-star";

// Changing icon size
Page.Widgets.myIcon.iconsize = "3x";

// Positioning icon to the right of text
Page.Widgets.myIcon.iconposition = "right";
```