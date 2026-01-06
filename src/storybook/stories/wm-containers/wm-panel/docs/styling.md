# Styling

The Panel component can be styled using custom CSS classes applied through the `className` property.

## Common Panel Styling

- Apply custom styles to the panel using the `className` property
- Use conditional classes to change styling based on data or state
- Style different parts of the panel (header, body, footer) independently

## Panel Style Classes

The following classes affect different parts of the panel:

| Class | Description |
|-------|-------------|
| .panel | Main container class for the panel |
| .panel-heading | Targets the panel header area |
| .panel-title | Targets the panel title text |
| .panel-subheading | Targets the panel subheading text |
| .panel-body | Targets the content area of the panel |
| .panel-actions | Targets the action buttons area |
| .panel-help | Targets the help icon |
| .panel-icon | Targets the icon in the panel header |
| .panel-fullscreen | Applied when panel is in full-screen mode |
| .panel-collapsed | Applied when panel is collapsed |

## Style Customization Example

To apply custom styles to a panel, set the `className` property to a custom class name, then define that class in your styles:

```javascript
// In your component configuration
Page.Widgets.myPanel.className = "custom-panel";

// When using conditional styling
Page.Widgets.myPanel.className = Page.Variables.isImportant.dataValue ? 
  "important-panel" : "standard-panel";
```

## Style Variations

The Panel component supports different visual styles that can be applied through classes:

- **Default panel**: Standard styling
- **Info panel**: Blue highlighting for informational content
- **Success panel**: Green highlighting for success messages
- **Warning panel**: Yellow/orange highlighting for warnings
- **Danger panel**: Red highlighting for critical information

Apply these variations by adding the appropriate class to the panel's `className` property.