# Styling

The Linear Layout component can be styled using CSS classes and custom styling. While there are no component-specific style properties defined in the component metadata, you can apply styling through standard CSS.

## CSS Classes

You can add custom CSS classes to the Linear Layout component and target its elements for styling:

```css
/* Example styling for a linear layout */
.my-linear-layout {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
}

/* Styling specific to row direction */
.row-layout {
  width: 100%;
  overflow-x: auto;
}

/* Styling specific to column direction */
.column-layout {
  height: 100%;
  overflow-y: auto;
}
```

## Responsive Considerations

For responsive layouts, you may want to change the direction based on screen size:

```javascript
// Example of making layout responsive based on screen width
function adjustLayout() {
  if (window.innerWidth < 768) {
    Page.Widgets.myLinearLayout.direction = "column";
  } else {
    Page.Widgets.myLinearLayout.direction = "row";
  }
}

// Call on page load and window resize
window.addEventListener('resize', adjustLayout);
adjustLayout();
```

## Nesting Linear Layouts

You can create complex layouts by nesting multiple Linear Layout components, each with different directions and alignment properties.