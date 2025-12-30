# Methods

The Search widget can be accessed in script via `Page.Widgets.widgetName`. However, this component doesn't have any specific public methods documented for direct invocation.

For interacting with the Search component, you would typically:

1. Set properties programmatically
2. Bind to events
3. Access the current state through bound variables

## Example Script Access

```javascript
// Clear the search
Page.Widgets.employeeSearch.datavalue = "";

// Disable search during certain operations
Page.Widgets.employeeSearch.disabled = true;

// Access current search value
const searchQuery = Page.Widgets.employeeSearch.query;
console.log("Current search:", searchQuery);

// Access selected result
const selectedValue = Page.Widgets.employeeSearch.datavalue;
console.log("Selected value:", selectedValue);
```