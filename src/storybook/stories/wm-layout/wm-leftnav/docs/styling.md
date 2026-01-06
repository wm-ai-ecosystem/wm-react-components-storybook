# Styling

The LeftNav component can be customized using CSS classes. While the component does not expose specific style properties through its API, you can target it and its children through standard CSS selectors.

## Common Styling Patterns

```css
/* Style the main left navigation container */
.app-leftnav {
    background-color: #f5f5f5;
    border-right: 1px solid #e0e0e0;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

/* Style navigation items within the left nav */
.app-leftnav .nav-item {
    padding: 10px 15px;
    border-bottom: 1px solid #e0e0e0;
}

/* Style for hover states */
.app-leftnav .nav-item:hover {
    background-color: #e9ecef;
    cursor: pointer;
}

/* Style for active/selected navigation item */
.app-leftnav .nav-item.active {
    background-color: #007bff;
    color: white;
}
```

## Responsive Considerations

For responsive designs, consider using media queries to adjust the LeftNav component based on screen size:

```css
@media (max-width: 768px) {
    .app-leftnav {
        position: absolute;
        z-index: 1000;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    .app-leftnav.open {
        transform: translateX(0);
    }
}
```