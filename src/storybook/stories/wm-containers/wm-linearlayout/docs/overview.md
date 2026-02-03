# Overview

The **Linear Layout** or **Container** component is a layout box used to group and organize content. It allows users to place UI components or include partial pages inside it. The container helps manage layout, styling, and structure for its child elements.

### Markup

```javascript
<wm-container
  direction="row"
  alignment="top-left"
  gap="4"
  width="fill"
  name="container"
  class="app-container-default"
  variant="default"
></wm-container>
```

### Examples

#### Properties

```Javascript
// show / hide container
Page.Widgets.container.show = "true";

// Add class to container
Page.Widgets.container.class = "bg-primary";

// Add partial
Page.Widgets.container.content = "partialContainer";
```

#### Events
```Javascript
//Only works when partial is mapped to content
Page.containerLoad = function (widget) {
    Page.Widgets.label.caption = "Partial Container Loaded Successfully";
};
```

#### Methods
