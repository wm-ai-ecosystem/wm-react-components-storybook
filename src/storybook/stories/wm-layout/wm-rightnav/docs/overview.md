# Overview

The **RightNav** component is a specialized layout container designed for creating right-aligned navigation panels or sidebars in web applications. It provides a structured area on the right side of the interface that can contain navigation links, supplementary content, or contextual tools. This component is particularly useful for multi-level navigation systems, contextual help panels, or secondary action menus.


# Markup

```javascript
  <wm-right-panel columnwidth="2" content="rightnav" navtype="rail" navheight="full" name="rightnav">
    </wm-right-panel>
```

### Examples

#### Properties

- Add addon class to leftnav

```javascript
Page.Widgets.rightnav.class="expand"
```

#### Events

- Hide skelton loader container on load of left nav

```javascript
Page.rightnavLoad = function ($event, widget) {
  Page.Widgets.skeltonLoaderContainer.show = false;
};
```
