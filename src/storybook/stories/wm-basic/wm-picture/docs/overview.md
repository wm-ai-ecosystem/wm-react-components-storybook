# Overview

The **Picture** component is a fundamental UI component that allows displaying images in your application. It provides a simple way to incorporate static images or dynamically loaded images from URLs or resources. 

### Markup

```javascript
<wm-picture picturesource="resources/images/logos/wavemaker_logo.png" name="picture" resizemode="cover" class="img-rounded" variant="default:rounded"></wm-picture>
```

### Examples

#### Properties 

- Set the image source dynamically for the picture component.

```javascript
Page.Widgets.picture.picturesource = "./resources/images/logos/wavemaker_logo.png";
```

- Apply animation to the picture component.

```javascript
Page.Widgets.picture.animation = "bounceIn";
```

#### Events 

- Triggered on picture click to navigate to a dashboard page in the app.

```javascript
    Page.pictureClick = function ($event, widget) {
    App.Actions.goToPage_Dashboard.invoke();
};
```

