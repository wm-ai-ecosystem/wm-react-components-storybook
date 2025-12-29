# Methods

The Panel component exposes several methods that can be accessed via JavaScript using the pattern `Page.Widgets.{widgetName}.{methodName}()`.

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| close | none | void | Closes the panel if it's closable |
| expand | none | void | Expands the panel if it's collapsible |
| collapse | none | void | Collapses the panel if it's collapsible |
| toggle | none | void | Toggles the panel between expanded and collapsed states |
| toggleFullScreen | none | void | Toggles the panel between normal and full-screen states |
| toggleHelp | none | void | Shows or hides the help text popup |

### Method Usage Examples

```javascript
// Close a panel programmatically
Page.Widgets.employeePanel.close();

// Expand a panel that is currently collapsed
Page.Widgets.productPanel.expand();

// Collapse a panel that is currently expanded
Page.Widgets.orderPanel.collapse();

// Toggle a panel's expanded state
Page.Widgets.customerPanel.toggle();

// Enter or exit full-screen mode
Page.Widgets.reportPanel.toggleFullScreen();

// Show/hide help text
Page.Widgets.settingsPanel.toggleHelp();
```

### Complete Panel Interaction Example

```javascript
// Function to control multiple panels
Page.managePanels = function() {
  // Close one panel
  Page.Widgets.salesPanel.close();
  
  // Expand another panel
  Page.Widgets.engineeringPanel.expand();
  
  // Toggle a third panel's state
  Page.Widgets.marketingPanel.toggle();
  
  // Enter full screen for a fourth panel
  Page.Widgets.financePanel.toggleFullScreen();
};
```