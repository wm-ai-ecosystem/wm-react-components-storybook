# Styling

The Marquee component does not expose any design tokens.

<!-- # Styling

The Marquee component can be styled using the following CSS classes:

| CSS Class | Description |
|-----------|-------------|
| `.marquee-container` | The outer container of the marquee component |
| `.marquee-content` | The inner container that holds the scrolling content |
| `.marquee-item` | Individual items inside the marquee (if content is structured) |
| `.marquee-gradient-left` | The left-side gradient overlay when gradient is enabled |
| `.marquee-gradient-right` | The right-side gradient overlay when gradient is enabled |
| `.marquee-paused` | Applied when the marquee is in a paused state |

## Custom Styling Examples

```css
/* Customize the base container */
.marquee-container {
  border-radius: 8px;
  background-color: #f0f4f8;
  padding: 12px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Style the content */
.marquee-content {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
}

/* Add spacing between individual items */
.marquee-item {
  margin-right: 32px;
  padding: 0 8px;
  position: relative;
}

/* Add separators between items */
.marquee-item:not(:last-child)::after {
  content: '•';
  position: absolute;
  right: -18px;
  color: #7f8c8d;
}

/* Style gradients */
.marquee-gradient-left,
.marquee-gradient-right {
  background: linear-gradient(90deg, #f0f4f8 0%, rgba(240,244,248,0) 100%);
  width: 100px;
}

/* Highlight important announcements */
.marquee-item.important {
  background-color: #ffeaa7;
  color: #d35400;
  font-weight: 700;
  border-radius: 4px;
  padding: 2px 10px;
}
```

You can target specific marquee instances by combining the widget ID with these classes, such as `#myMarquee .marquee-container`. -->