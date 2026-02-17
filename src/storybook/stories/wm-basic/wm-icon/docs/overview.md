# Overview

The **Icon** component is a versatile UI element that allows you to display graphical icons within your application. Icons enhance user experience by providing visual cues and making interfaces more intuitive. Many components like Panel, Button etc. have a way to display an icon. You can choose the icons from the list of `wavicon`, `font-awesome` or custom library.

### Markup

```javascript
<wm-icon name="icon" class="fa-xs" variant="default:xs"></wm-icon>
```

### Examples

#### Properties

- This is the markup for an icon, which displays an icon with configurable class and position, and these properties can also be set dynamically via script.

```javascript
<wm-icon iconclass="fa fa-star" iconposition="right" name="icon" class="fa-xs"></wm-icon>
```

```javascript
// Dynamically update the icon to a Font Awesome star
Page.Widgets.icon.iconclass = "fa fa-star";

// Change the icon position to the right of text
Page.Widgets.icon.iconposition = "right";
```
