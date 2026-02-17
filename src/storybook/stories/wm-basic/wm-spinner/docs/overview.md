# Overview

The **Spinner** component controls the user interaction while the browser is performing some work in the background. It gives a feedback if the page is processing or, frozen, or just not working. This component displays a loading icon with text.

### Markup

```javascript
<wm-spinner show="true" name="spinner" variant="standard"></wm-spinner>
```

### Examples

#### Properties 

- This Spinner displays a loading indicator using an image, where the spinner type, image source, and dimensions can be configured in the markup or updated dynamically via script.

```javascript
<wm-spinner type="image" image="resources/images/imagelists/spinner-small.gif" imagewidth="16px" imageheight="16px" name="spinner"></wm-spinner>
```

```javascript
// Set the spinner to use an image instead of the default loader
Page.Widgets.spinner.type = "image";

// Specify the image to be used as the spinner icon
Page.Widgets.spinner.image = "resources/images/imagelists/spinner-small.gif";

// Define the width of the spinner image
Page.Widgets.spinner.imagewidth = "16px";

// Define the height of the spinner image
Page.Widgets.spinner.imageheight = "16px";
```