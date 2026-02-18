# Overview

The **Header** component is a fundamental layout element designed to create a consistent top section across your application. It typically contains important navigational elements, branding, and key action items that need to be accessible throughout the user experience.


# Markup

```javascript
 <wm-header content="header" name="header"></wm-header>
```

### Examples

#### Properties

- This property is used to load or update the content (partial) displayed inside the header. It can be set in the markup or dynamically through script to show different footer layouts.

```javascript
//The 'content' property specifies a partial page to render inside the header.
Page.Widgets.header.content = "header";
```

- This header supports adding an additional CSS class to customize styling, which can be defined directly in the markup or applied dynamically using script.

```javascript
<wm-header class="secondary-header" name="header"></wm-header>
```

```javascript
// Apply an additional CSS class to the header for custom styles
Page.Widgets.header.class = "secondary-header";
```

#### Events

- This is the markup for a header with an on-load event, which is executed when the header is initialized and rendered on the page.

```javascript
<wm-header on-load="headerLoad($event, widget)" name="header"></wm-header>
```

```javascript
Page.headerLoad = function ($event, widget) {
  // Set the page title based on the active page name
  // Converts camelCase or PascalCase into a readable format
  Page.Widgets.labelPageTitle.caption = App.activePageName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // aB -> a B
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // ABc -> A Bc
    .trim();

  // Hide the skeleton loader container once the header is loaded
  // Page.Widgets.skeletonLoaderContainer.show = false;
};
```
