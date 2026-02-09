# Overview

The **TopNav** component is a layout element designed to provide navigation at the top of a page or application. It typically contains navigation links, branding elements, and possibly user interface controls like search boxes or user profile menus. The topnav creates a consistent navigation experience across all pages in an application.


# Markup

```javascript
 <wm-top-nav content="topnav" name="topnav"></wm-top-nav>
```

### Examples

#### Properties

- Add addon class to topnav

```javascript
Page.Widgets.topnav.class="expand"
```

#### Events

- Hide skelton loader container on load of left nav

```javascript
Page.topnavLoad = function ($event, widget) {
  Page.Widgets.skeltonLoaderContainer.show = false;
};
```
