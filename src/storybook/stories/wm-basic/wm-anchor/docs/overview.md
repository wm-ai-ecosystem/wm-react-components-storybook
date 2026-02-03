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
    // Navigate to the Dashboard page when anchor is clicked
    App.Actions.goToPage_Dashboard.invoke();
};
```

- Triggered on anchor click to toggle panel content.

```javascript
    Page.anchorClick = function ($event, widget) {
    // Toggle visibility
    Page.Widgets.projectDetailsPanel.show = !Page.Widgets.projectDetailsPanel.show;

    // Update anchor text dynamically
    widget.caption = Page.Widgets.projectDetailsPanel.show ? "Hide Details" : "Show Details";
};
```