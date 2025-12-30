# Styling

The topnav component can be styled using CSS. Since there are no specific documented style classes, here are typical CSS classes that might be used for a navigation component:

- `.topnav-container` - The main container for the navigation bar
- `.topnav-brand` - Styles for the brand element (logo, title)
- `.topnav-links` - Container for navigation links
- `.topnav-link` - Individual navigation link
- `.topnav-link-active` - Style for the currently active navigation link
- `.topnav-mobile-toggle` - Mobile menu toggle button
- `.topnav-dropdown` - Dropdown menu container
- `.topnav-dropdown-item` - Items within dropdown menus

## Custom Styling Examples

```css
/* Change the navigation background color */
.topnav-container {
  background-color: #4a90e2;
}

/* Style the navigation links */
.topnav-link {
  color: white;
  font-weight: 500;
  padding: 10px 15px;
  transition: background-color 0.2s ease;
}

/* Style the active navigation link */
.topnav-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .topnav-links {
    display: none;
  }
  
  .topnav-mobile-toggle {
    display: block;
  }
}
```