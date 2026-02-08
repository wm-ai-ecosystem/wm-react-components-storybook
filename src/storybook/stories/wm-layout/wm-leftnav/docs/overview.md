# Overview

The **LeftNav** component is a layout element designed to provide a vertical navigation panel on the left side of the application. It offers flexible width and height configuration to accommodate various application layouts and navigation requirements. This component serves as a container for navigation links and other controls to help users navigate through different sections of the application.



# Markup

```javascript
 <wm-left-panel columnwidth="2" content="leftnav" navtype="rail" navheight="full" name="leftnav"></wm-left-panel>
```

### Examples

#### Properties

- Add addon class to leftnav

```javascript
Page.Widgets.leftnav.class="expand"
```

#### Events

- Hide skelton loader container on load of left nav

```javascript
Page.leftnavLoad = function ($event, widget) {
  Page.Widgets.skeltonLoaderContainer.show = false;
};
```
