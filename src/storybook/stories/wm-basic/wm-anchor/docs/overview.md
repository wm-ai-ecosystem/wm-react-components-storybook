# Overview

The **Anchor** component serves as a clickable text link to navigate between screens or trigger actions. It provides a simple and intuitive way to create hyperlinks within your application.

### Markup

```javascript
<wm-anchor name="anchor" variant="standard"></wm-anchor>
```

### Examples

#### Properties 

- This anchor has a configurable hyperlink and caption, which can be set in the markup or dynamically via script.

```javascript
<wm-anchor hyperlink="https://www.wavemaker.com" target="_blank" caption="WaveMaker" name="anchor"></wm-anchor>
```

```javascript
// Set the anchor's hyperlink URL and display text dynamically
Page.Widgets.anchor.hyperlink = "https://www.wavemaker.com";
Page.Widgets.anchor.caption = "WaveMaker";
```

- This anchor displays a badge value to indicate counts or alerts, which can be set in the markup or dynamically via script.

```javascript
<wm-anchor badgevalue="5" name="anchor"></wm-anchor>
```

```javascript
// Set the anchor's badge value to display a count or notification
Page.Widgets.anchor.badgevalue = "5";
```

#### Events 

- This is the markup for an anchor with an on-click event, executed on click to navigate to the Dashboard page, either via a direct action call in the markup or a handler function.

```javascript
<wm-anchor on-click="Actions.goToPage_Dashboard.invoke()" name="anchor"></wm-anchor>
```

```javascript
<wm-anchor on-click="anchorClick($event, widget)" name="anchor"></wm-anchor>
```

```javascript
Page.anchorClick = function ($event, widget) {
  // Invoke the action to navigate to the Dashboard page
  App.Actions.goToPage_Dashboard.invoke();
};
```

- Executed when the anchor is clicked to toggle the panel visibility and update the caption dynamically.

```javascript
Page.anchorClick = function ($event, widget) {
  // Toggle the visibility of the project details panel
  Page.Widgets.projectDetailsPanel.show = !Page.Widgets.projectDetailsPanel.show;

  // Update the anchor caption based on the panel's current state
  widget.caption = Page.Widgets.projectDetailsPanel.show ? "Hide Details" : "Show Details";
};
```

<!-- 
- Enhance the anchor with an icon, and position it as needed.

```javascript
<wm-anchor iconclass="wi wi-user" iconposition="left" name="anchor" badgevalue="5"></wm-anchor>
```

```javascript
Page.Widgets.anchor.iconclass = "wi wi-user";
Page.Widgets.anchor.iconposition = "left";
``` -->