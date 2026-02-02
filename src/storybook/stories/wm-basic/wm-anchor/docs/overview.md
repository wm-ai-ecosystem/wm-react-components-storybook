# Overview

The **Anchor** component serves as a clickable text link to navigate between screens or trigger actions. It provides a simple and intuitive way to create hyperlinks within your application.

### Markup

```javascript
<wm-anchor name="anchor" hyperlink="https://www.wavemaker.com/">
```

### Examples

#### Properties 

- Configure the anchor’s hyperlink and caption.

```javascript
Page.Widgets.anchor.hyperlink = "/https://www.wavemaker.com";
Page.Widgets.anchor.caption = "WaveMaker";
```

- Display a small badge value to indicate counts or alerts.

```javascript
Page.Widgets.anchor.badgevalue = "3";
```

- Enhance the anchor with an icon, and position it as needed.

```javascript
Page.Widgets.anchor.iconclass = "wi wi-user";
Page.Widgets.anchor.iconposition = "left";
```

#### Events 

- Triggered on anchor click to navigate to dashboard page within the application.

```javascript
    Page.anchorClick = function ($event, widget) {
    App.Actions.goToPage_Dashboard.invoke();
};
```

- Triggered on anchor click to update the caption text dynamically.

```javascript
    Page.anchorClick = function ($event, widget) {
    widget.caption = "Clicked";
};
```

- Triggered when the anchor receives keyboard focus (i.e via the Tab key)

```javascript
    Page.anchorFocus = function ($event, widget) {
        console.log("Anchor is focused");
};
```