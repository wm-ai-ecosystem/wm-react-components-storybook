# Methods

The Menu component does not have any documented methods. Interactions with the Menu component are typically handled through standard DOM manipulation or framework-specific directives.

## Accessing the Component

```javascript
// Example of accessing the menu component in a script
const menuElement = document.querySelector('menu');

// Alternatively in a framework context
Page.Widgets.mainMenu
```

## Common DOM Operations

```javascript
// Toggle a menu's visibility
Page.Widgets.mainMenu.show = !Page.Widgets.mainMenu.show;

// Add a new item dynamically
const newItem = document.createElement('menu-item');
newItem.textContent = 'New Option';
Page.Widgets.mainMenu.appendChild(newItem);
```