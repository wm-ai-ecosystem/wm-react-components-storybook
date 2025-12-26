# Styling

The composite input component can be styled using CSS classes. The component typically uses a structured hierarchy of elements that can be targeted for styling.

## Common CSS Classes

- `.input-wrapper` - The outer container of the input component
- `.input-caption` - The caption element
- `.input-caption-required` - Applied to required field captions
- `.input-caption-top`, `.input-caption-left`, `.input-caption-right`, `.input-caption-bottom` - Applied based on caption position
- `.input-field` - The actual input element
- `.input-field-required` - Applied to required input fields

## Example Custom Styling

```css
/* Custom styling for required fields */
.input-caption-required {
  color: #d9534f;
  font-weight: bold;
}

/* Custom styling for different caption positions */
.input-caption-left {
  padding-right: 10px;
  text-align: right;
}

.input-caption-right {
  padding-left: 10px;
  text-align: left;
}
```

Note that the actual CSS class names may vary based on the specific implementation of this component. Inspect the rendered DOM to identify the exact class names used in your implementation.