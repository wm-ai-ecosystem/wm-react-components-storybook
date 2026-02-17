# Overview

The **HTML** component is a basic UI element that allows you to render custom HTML content within your application. This versatile component gives you direct access to insert HTML markup, enabling rich text formatting, custom layouts, or any HTML-based content that may not be easily achievable with other predefined components.

### Markup

```javascript
<wm-html name="html"></wm-html>
```

### Examples

#### Properties

- This is the markup for an HTML component that renders formatted HTML content, which can also be set dynamically via script.

```javascript
<wm-html name="html">
  <p>
    This is a <strong>formatted</strong> paragraph.
  </p>
</wm-html>
```

```javascript
// Set the HTML's content dynamically with formatted HTML text
Page.Widgets.html.content = "<p>This is a <strong>formatted</strong> paragraph.</p>";
```

<!-- - Set custom dimensions

```javascript
Page.Widgets.html.width = "500px";
Page.Widgets.html.height = "300px";
``` -->


<!-- ```javascript
<wm-html name="html">
  <blockquote
    style="
    font-style: italic;
    border-left: 4px solid #ccc;
    padding-left: 12px;
    color: #555;
    margin: 16px 0;
"
  >
    This quote emphasizes the value of **building applications that are both
    visually appealing and highly functional**, a principle at the core of
    developing fast, scalable apps with
    <a
      href="https://www.wavemaker.com/"
      target="_blank"
      style="text-decoration: underline; color: #0073e6;"
    >
      WaveMaker
    </a>
    .
  </blockquote>
</wm-html>
``` -->
