# Overview

The HTML component is a basic UI element that allows you to render custom HTML content within your application. This versatile component gives you direct access to insert HTML markup, enabling rich text formatting, custom layouts, or any HTML-based content that may not be easily achievable with other predefined components.

### Markup

```javascript
<wm-html name="html">
  <pre>
    <code>
      {`
      function greet(name) {
        return "Hello, " + name;
      }
      `}
    </code>
  </pre>
</wm-html>
```

### Examples

#### Properties

- Basic HTML content rendering

```javascript
Page.Widgets.html.content =
  "<p>This is a <strong>formatted</strong> paragraph.</p>";
```

- Set custom dimensions

```javascript
Page.Widgets.html.width = "500px";
Page.Widgets.html.height = "300px";
```

#### Events

- Triggered when the mouse enters the HTML component.

```javascript
Page.htmlMouseenter = function ($event, widget) {
  console.log("Mouse entered");
};
```
