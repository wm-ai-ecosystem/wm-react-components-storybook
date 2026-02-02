# Overview

The **Spinner** component controls the user interaction while the browser is performing some work in the background. It gives a feedback if the page is processing or, frozen, or just not working. This component displays a loading icon with text.

### Markup

```javascript
<wm-spinner show="true" name="spinner"></wm-spinner>
```

### Examples

#### Properties 

- Set image as spinner icon.

```javascript
    Page.Widgets.spinner.type = "image";
Page.Widgets.spinner.image = "resources/images/imagelists/loader.gif";
Page.Widgets.spinner.imagewidth = "16px";
Page.Widgets.spinner.imageheight = "16px";
```