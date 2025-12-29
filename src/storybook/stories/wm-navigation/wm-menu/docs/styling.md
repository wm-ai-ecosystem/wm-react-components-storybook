# Styling

The Menu component can be styled using CSS classes to customize its appearance and layout.

## CSS Classes

| Class | Description |
|-------|-------------|
| `.menu` | Base class for the menu container |
| `.menu-horizontal` | Creates a horizontally aligned menu |
| `.menu-vertical` | Creates a vertically aligned menu |
| `.menu-compact` | Reduces spacing between menu items |
| `.menu-expanded` | Increases spacing between menu items |

## Styling Examples

```css
/* Basic menu styling */
.menu {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 8px 0;
}

/* Horizontal menu with items in a row */
.menu-horizontal {
  display: flex;
  flex-direction: row;
}

/* Vertical menu with items stacked */
.menu-vertical {
  display: flex;
  flex-direction: column;
}

/* Styling for menu items */
menu-item {
  padding: 8px 16px;
  cursor: pointer;
}

menu-item:hover {
  background-color: #e9ecef;
}
```

## Responsive Styling

```css
/* Make menu responsive */
@media (max-width: 768px) {
  .menu-horizontal {
    flex-direction: column;
  }
  
  menu-item {
    width: 100%;
    text-align: center;
  }
}
```