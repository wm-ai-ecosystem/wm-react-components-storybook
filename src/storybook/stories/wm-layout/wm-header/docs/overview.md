# Overview

The **Header** component is a fundamental layout element designed to create a consistent top section across your application. It typically contains important navigational elements, branding, and key action items that need to be accessible throughout the user experience.


# Markup

```javascript
 <wm-header content="header" name="header"></wm-header>
```

### Examples

#### Properties

- Add addon class to header

```javascript
Page.Widgets.footer.class="secondary-header"
```

#### Events

- Hide skelton loader container on load of header

```javascript
Page.headerLoad = function ($event, widget) {
  Page.Widgets.skeltonLoaderContainer.show = false;
};
```
