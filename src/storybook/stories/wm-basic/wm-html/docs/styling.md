# Styling

The HTML component can be styled using the `styles` prop, which accepts a React.CSSProperties object. This allows you to apply inline styles directly to the component container.

For more comprehensive styling, you can include CSS class definitions in your HTML content and reference them from your application's stylesheets.

## Example of Using the Styles Prop

```javascript
Page.Widgets.myHtml.styles = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  padding: "20px",
  maxHeight: "400px",
  overflowY: "auto"
};
```

## Styling HTML Content

When including HTML content within the component, you can use classes that are defined in your application's CSS:

```javascript
Page.Widgets.myHtml.content = `
  <div class="custom-html-container">
    <h2 class="section-title">Important Information</h2>
    <ul class="info-list">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
`;
```

Then in your CSS file:

```css
.custom-html-container {
  font-family: Arial, sans-serif;
}

.section-title {
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
}

.info-list {
  list-style-type: square;
  padding-left: 20px;
}
```

Note that the HTML component essentially acts as a container, and the styling within it follows standard HTML and CSS rules.