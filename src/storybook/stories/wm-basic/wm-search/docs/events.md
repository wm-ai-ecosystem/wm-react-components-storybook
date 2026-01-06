# Callback Events

| Event | Description |
|-------|-------------|
| onChange | Triggered when the search value changes |
| onFocus | Triggered when the search input receives focus |
| onBlur | Triggered when focus leaves the search input |
| onSubmit | Triggered when a search is submitted (e.g., pressing Enter) |
| onSelect | Triggered when an item is selected from the search results |
| onBeforeServiceCall | Triggered before sending the service call for fetching search results. The inputData can be modified in this event handler |

## Example Event Usage

```javascript
// Handle item selection
Page.onSearchItemSelect = function(event) {
    // Access the selected item
    const selectedItem = event.data.item;
    console.log("Selected item:", selectedItem);
    
    // Perform actions with the selected item
    Page.Variables.selectedEmployeeData.setValue(selectedItem);
};

// Customize search request before it's sent
Page.onBeforeSearchServiceCall = function(event) {
    // Add additional filters to search
    event.inputData.additionalFilters = {
        department: Page.Variables.departmentFilter.dataValue
    };
};
```