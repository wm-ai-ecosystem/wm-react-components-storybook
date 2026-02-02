# Overview

The Icon component is a versatile UI element that allows you to display graphical icons within your application. Icons enhance user experience by providing visual cues and making interfaces more intuitive. Many components like Panel, Button etc. have a way to display an icon. You can choose the icons from the list of `wavicon`, `font-awesome` or custom library.

### Markup

```javascript
<wm-icon
  name="icon"
  iconclass="wi wi-save"
  class="fa-xs"
  variant="default:xs"
></wm-icon>
```

### Examples

#### Properties

- Setting a Font Awesome icon.

```javascript
Page.Widgets.icon.iconclass = "fa fa-star";
```

- Positioning icon to the right of text.

```javascript
Page.Widgets.icon.iconposition = "right";
```
