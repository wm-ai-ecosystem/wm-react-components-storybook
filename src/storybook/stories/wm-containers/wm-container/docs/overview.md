# Overview

The  **Container** component is a layout box used to group and organize content. It allows users to place UI components or include partial pages inside it. The container helps manage layout, styling, and structure for its child elements.

### Markup

```javascript
<wm-container direction="row" alignment="top-left" gap="4" width="fill" name="container" 
  class="app-container-default"
  variant="default"
></wm-container>
```

### Examples

#### Properties

- Show or hide the component

```javascript
Page.Widgets.container.show = "true";
```
- Adding class name 

```javascript
Page.Widgets.container.class = "bg-primary";
```

#### Events

- On load of container 

```javascript
// Only works when content is mapped to partial
Page.containerLoad = function (widget) {
    Page.Widgets.label.caption = "Partial Container Loaded Successfully";
};
```