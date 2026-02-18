# Overview

The **TopNav** component is a layout element designed to provide navigation at the top of a page or application. It typically contains navigation links, branding elements, and possibly user interface controls like search boxes or user profile menus. The topnav creates a consistent navigation experience across all pages in an application.


# Markup

```javascript
<wm-top-nav content="topnav" name="topnav"></wm-top-nav>
```

### Examples

#### Properties

- This property is used to load or update the content (partial) displayed inside the topnav. It can be set in the markup or dynamically through script to show different topnav layouts.

```javascript
//The 'content' property specifies a partial page to render inside the topnav.
Page.Widgets.topnav.content = "topnav";
```

- This topnav supports adding an additional CSS class to customize styling, which can be defined directly in the markup or applied dynamically using script.

```javascript
<wm-top-nav class="secondary-topnav" name="topnav"></wm-top-nav>
```

```javascript
// Apply an additional CSS class to the topnav for custom styles
Page.Widgets.topnav.class = "secondary-topnav";
```

#### Events

- This is the markup for a topnav with an on-load event, which is executed when the topnav is initialized and rendered on the page.

```javascript
<wm-top-nav on-load="topnavLoad($event, widget)" name="topnav"></wm-top-nav>
```

```javascript
Page.topnavLoad = function ($event, widget) {
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
