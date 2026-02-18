# Overview

The **Footer** component serves as a layout element typically positioned at the bottom of a web page or application interface. It provides a dedicated space for important secondary content such as copyright information, navigation links, contact details, and legal disclaimers. The Footer component maintains consistent positioning across different views of your application.

# Markup

```javascript
 <wm-footer content="footer" name="footer"></wm-footer>
```

### Examples

#### Properties

- This property is used to load or update the content (partial) displayed inside the footer. It can be set in the markup or dynamically through script to show different footer layouts.

```javascript
//The 'content' property specifies a partial page to render inside the footer.
Page.Widgets.footer.content="footer";
```

#### Events

- This is the markup for a footer with an on-load event, which is executed when the footer is initialized and rendered on the page.

```javascript
<wm-footer on-load="footerLoad($event, widget)" content="footer" name="footer"></wm-footer>
```

```javascript
Page.footerLoad = function ($event, widget) {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  // Update the copyright text inside the footer
  // Note: To access components (for example, Label) inside a footer (partial), the footer layout must be bound to a partial content
  Page.Widgets.footer.Widgets.copyright.caption =
    "© " + currentYear + " WaveMaker. All rights reserved.";

  // Alternate access:
  // App.activePage.Widgets.footer.Widgets.copyright.caption
};
```


