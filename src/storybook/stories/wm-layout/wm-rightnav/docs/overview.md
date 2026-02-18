# Overview

The **RightNav** component is a specialized layout container designed for creating right-aligned navigation panels or sidebars in web applications. It provides a structured area on the right side of the interface that can contain navigation links, supplementary content, or contextual tools. This component is particularly useful for multi-level navigation systems, contextual help panels, or secondary action menus.


# Markup

```javascript
<wm-right-panel columnwidth="2" content="rightnav" navtype="rail" navheight="full" name="rightpanel">
```

### Examples

#### Properties

- This setting controls the right-panel width in a 12-column grid layout and can be configured either in the markup or dynamically using script.

```javascript
// Configure right-panel column width dynamically
Page.Widgets.rightpanel.columnwidth = "2";
```

- This property is used to load or update the content (partial) displayed inside the right-panel. It can be set in the markup or dynamically through script to show different right-panel layouts.

```javascript
//The 'content' property specifies a partial page to render inside the right-panel.
Page.Widgets.rightpanel.content = "rightnav";
```

#### Events

- This is the markup for a right-panel component with an on-load event, which is executed when the right-panel is initialized and rendered on the page.

```javascript
<wm-right-panel on-load="rightpanelLoad($event, widget)" name="rightpanel">
```

```javascript
Page.rightpanelLoad = function ($event, widget) {
  // Hide the skeleton loader container once the RightPanel is fully loaded
  // This ensures a smooth user experience by displaying content only after initialization
  Page.Widgets.skeletonLoaderContainer.show = false;
};
```
