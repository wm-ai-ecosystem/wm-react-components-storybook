# Overview

The HTML component is a basic UI element that allows you to render custom HTML content within your application. This versatile component gives you direct access to insert HTML markup, enabling rich text formatting, custom layouts, or any HTML-based content that may not be easily achievable with other predefined components.

### Markup

```javascript
<wm-html name="html">
  <pre>
    <code>{`function greet(name) {
            return "Hello, " + name;
            }`
        }
    </code>
  </pre>
</wm-html>;

```

### Use Cases

- Embed custom HTML content such as formatted text, tables, or code snippets.
- Create interactive banners or notices with custom layouts, links, and styles.