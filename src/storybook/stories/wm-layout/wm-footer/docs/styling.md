# Styling

The Footer component can be styled using custom CSS classes to match your application's design requirements.

## Basic Styling

You can apply custom styles to the Footer component using the following approaches:

1. **Apply CSS classes directly**: Add your custom CSS classes to the Footer component through the design panel.

2. **Target in stylesheets**: Use CSS selectors to target the Footer component in your application's stylesheets.

```css
/* Example styling for the footer */
.app-footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

.app-footer a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.app-footer a:hover {
  text-decoration: underline;
}
```

## Responsive Considerations

For responsive designs, consider adjusting the footer layout at different breakpoints:

```css
/* Responsive adjustments */
@media (max-width: 768px) {
  .app-footer {
    padding: 15px 10px;
  }
  
  .footer-links {
    display: flex;
    flex-direction: column;
  }
}
```