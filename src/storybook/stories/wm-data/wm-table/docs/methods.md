# Methods

Table widgets can be accessed in your JavaScript code using the pattern `Page.Widgets.widgetName` where `widgetName` is the name you gave to your table widget.

## Data Manipulation Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `addItem` | `(item: object)` | void | Adds a new item to the table dataset |
| `updateItem` | `(item: object, index: number)` | void | Updates an existing item in the table dataset |
| `deleteItem` | `(item: object)` | void | Removes an item from the table dataset |
| `deleteRow` | `(rowIndex: number)` | void | Deletes the row at the specified index |
| `clearSelection` | None | void | Clears all row selections |
| `selectItem` | `(item: object)` | void | Selects a specific item in the table |
| `deselectItem` | `(item: object)` | void | Deselects a specific item in the table |
| `selectAll` | None | void | Selects all items in the current page |
| `deselectAll` | None | void | Deselects all items |

## Navigation Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `goToPage` | `(pageNumber: number)` | void | Navigates to the specified page |
| `nextPage` | None | void | Navigates to the next page |
| `prevPage` | None | void | Navigates to the previous page |
| `firstPage` | None | void | Navigates to the first page |
| `lastPage` | None | void | Navigates to the last page |

## Data Retrieval Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getSelectedItems` | None | array | Returns an array of all selected items |
| `getSelectedItem` | None | object | Returns the currently selected item (for radioselect) |
| `getWidget` | `(fieldName: string, rowIndex: number)` | object | Returns the widget in the specified cell |
| `getTotalPages` | None | number | Returns the total number of pages |
| `getCurrentPage` | None | number | Returns the current page number |
| `exportData` | `(format: string)` | void | Exports data in the specified format |

## Display Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `refresh` | None | void | Refreshes the table data display |
| `redraw` | None | void | Completely redraws the table |
| `setFilter` | `(columnName: string, filterValue: string)` | void | Sets a filter on a specific column |
| `clearFilters` | None | void | Removes all filters |
| `expandRow` | `(rowIndex: number)` | void | Expands the row at the specified index |
| `collapseRow` | `(rowIndex: number)` | void | Collapses the row at the specified index |

### Common Method Use Cases

#### Manipulating Table Data
```javascript
// Add a new row
Page.Widgets.myTable.addItem({
  id: 101,
  name: "New Product",
  price: 29.99
});

// Update an existing row
Page.Widgets.myTable.updateItem({
  id: 101,
  name: "Updated Product",
  price: 39.99
}, 5); // Update row at index 5

// Delete a row
Page.Widgets.myTable.deleteItem(selectedItem);
```

#### Working with Selection
```javascript
// Get all selected items in a multi-select table
var selectedItems = Page.Widgets.myTable.getSelectedItems();
console.log("Selected items:", selectedItems);

// Get the selected item in a single-select table
var selectedItem = Page.Widgets.myTable.getSelectedItem();
console.log("Selected item:", selectedItem);

// Select specific items
Page.Widgets.myTable.selectItem(myDataVariable[3]);

// Clear all selections
Page.Widgets.myTable.clearSelection();
```

#### Navigation Controls
```javascript
// Go to a specific page
Page.Widgets.myTable.goToPage(3);

// Navigate through pages
Page.Widgets.myTable.nextPage();
Page.Widgets.myTable.prevPage();
Page.Widgets.myTable.firstPage();
Page.Widgets.myTable.lastPage();

// Get current page information
var currentPage = Page.Widgets.myTable.getCurrentPage();
var totalPages = Page.Widgets.myTable.getTotalPages();
console.log(`Page ${currentPage} of ${totalPages}`);
```

#### Filtering and Exporting
```javascript
// Apply a filter to a column
Page.Widgets.myTable.setFilter("price", ">50");

// Clear all filters
Page.Widgets.myTable.clearFilters();

// Export data
Page.Widgets.myTable.exportData("excel");
```