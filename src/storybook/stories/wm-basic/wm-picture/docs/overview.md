# Overview

The **Picture** component is a fundamental UI component that allows displaying images in your application. It provides a simple way to incorporate static images or dynamically loaded images from URLs or resources.

### Markup

```javascript
<wm-picture name="picture" resizemode="cover" class="img-rounded" variant="default:rounded"></wm-picture>
```

### Examples

#### Properties

- This picture has a configurable image source and animation, which can be set in the markup or dynamically via script.

```javascript
<wm-picture picturesource="resources/images/logos/wavemaker_logo.png" animation="bounceIn" name="picture"></wm-picture>
```

```javascript
// Set or update the picture component's image source dynamically
Page.Widgets.picture.picturesource = "./resources/images/logos/wavemaker_logo.png";

// Set or update the animation effect for the picture component dynamically
Page.Widgets.picture.animation = "bounceIn";
```

#### Events

- This is the markup for a picture with an on-click event, executed on click to navigate to the Dashboard page either via a direct action call in the markup or a handler function.

```javascript
<wm-picture on-click="Actions.goToPage_Dashboard.invoke()" name="picture"></wm-picture>
```

```javascript
<wm-picture on-click="pictureClick($event, widget)" name="picture"></wm-picture>
```

```javascript
Page.pictureClick = function ($event, widget) {
  // Navigate to the Dashboard page when the picture is clicked
  App.Actions.goToPage_Dashboard.invoke();
};
```
