# Props

The topnav component currently does not have any documented properties. However, typical properties for a navigation component might include:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| brand | string | undefined | The text or logo to display as the brand identifier |
| fixed | boolean | false | Whether the navigation bar should be fixed at the top of the viewport |
| sticky | boolean | false | Whether the navigation should stick to the top when scrolling |
| theme | string | 'light' | The color theme of the navigation ('light' or 'dark') |
| transparent | boolean | false | Whether the background should be transparent |

## Common Use Cases

```javascript
// Set the navigation to be fixed at the top
Page.Widgets.myTopNav.fixed = true;

// Change the navigation theme to dark mode
Page.Widgets.myTopNav.theme = "dark";

// Add a custom brand name
Page.Widgets.myTopNav.brand = "My Application";
```