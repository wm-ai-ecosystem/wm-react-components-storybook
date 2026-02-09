# Overview

The Footer component serves as a layout element typically positioned at the bottom of a web page or application interface. It provides a dedicated space for important secondary content such as copyright information, navigation links, contact details, and legal disclaimers. The Footer component maintains consistent positioning across different views of your application.

# Markup

```javascript
 <wm-footer content="footer" name="footer"></wm-footer>
```

### Examples

#### Properties

- Set height of footer 

```javascript
Page.Widgets.footer.height="20vh"
```

#### Events

- Change copyright text on load of footer

```javascript
Page.footerLoad = function ($event, widget) {
  const currentYear = new Date().getFullYear();
  Page.Widgets.lblCopyright.caption =
    "© " + currentYear + " ABC Corporation. All rights reserved.";
};
```


