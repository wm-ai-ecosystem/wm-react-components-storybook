# Methods

The topnav component can be accessed in scripts via `Page.Widgets.widgetName`, where `widgetName` is the name given to the component in the page designer.

The topnav component currently does not have any documented methods. However, typical methods for a navigation component might include:

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| toggleMenu | none | void | Toggles the visibility of the mobile menu |
| setActiveItem | itemId (string) | void | Sets a specific navigation item as active |
| addNavigationItem | item (object) | void | Programmatically adds a new navigation item |
| removeNavigationItem | itemId (string) | void | Removes a navigation item by ID |

## Common Method Use Cases

```javascript
// Toggle the mobile menu
Page.Widgets.myTopNav.toggleMenu();

// Set the 'home' navigation item as active
Page.Widgets.myTopNav.setActiveItem('home');

// Add a new navigation item programmatically
Page.Widgets.myTopNav.addNavigationItem({
  id: 'reports',
  label: 'Reports',
  url: '/reports',
  icon: 'chart-bar'
});
```