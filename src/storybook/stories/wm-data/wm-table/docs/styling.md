# Styling

The Table component can be styled using various CSS classes to customize its appearance. These classes can be applied directly to the widget or through CSS overrides in your application.

## Core Table Classes

| CSS Class | Description |
|-----------|-------------|
| `.app-grid` | Main container class for the table component |
| `.app-grid-header` | Styles the table header section |
| `.app-grid-content` | Styles the main content area of the table |
| `.app-grid-footer` | Styles the footer section containing pagination |

## Table Row Classes

| CSS Class | Description |
|-----------|-------------|
| `.app-grid-row` | Base class for all table rows |
| `.app-grid-row-odd` | Applied to odd-numbered rows (for zebra striping) |
| `.app-grid-row-even` | Applied to even-numbered rows (for zebra striping) |
| `.app-grid-row-selected` | Applied to selected rows |
| `.app-grid-row-hover` | Applied when hovering over rows |
| `.app-grid-row-expanded` | Applied to expanded rows |

## Table Cell Classes

| CSS Class | Description |
|-----------|-------------|
| `.app-grid-cell` | Base class for all table cells |
| `.app-grid-cell-header` | Applied to header cells |
| `.app-grid-cell-action` | Applied to action cells (containing buttons, etc.) |
| `.app-grid-cell-sortable` | Applied to sortable column cells |
| `.app-grid-cell-sorted` | Applied to cells in a sorted column |
| `.app-grid-cell-selected` | Applied to selected cells |

## Table Control Classes

| CSS Class | Description |
|-----------|-------------|
| `.app-table-title` | Styles the table title |
| `.app-table-subheading` | Styles the table subheading |
| `.app-grid-pagination` | Styles the pagination controls |
| `.app-grid-pageoptions` | Styles the page size options |
| `.app-grid-search` | Styles the search/filter input |
| `.app-grid-exportbtns` | Styles the export buttons container |
| `.app-grid-nodatamsg` | Styles the "no data" message |
| `.app-grid-loadingmsg` | Styles the loading message |

## Table Form Classes

| CSS Class | Description |
|-----------|-------------|
| `.app-grid-form-container` | Styles the form container for editing |
| `.app-grid-form-dialog` | Styles the dialog form for editing |
| `.app-grid-form-right` | Styles the right-aligned form for editing |
| `.app-grid-form-bottom` | Styles the bottom-aligned form for editing |

## Spacing Classes

| CSS Class | Description |
|-----------|-------------|
| `.app-grid-spacing-sm` | Applies small spacing to the table |
| `.app-grid-spacing-md` | Applies medium spacing to the table |
| `.app-grid-spacing-lg` | Applies large spacing to the table |

## Custom Row Styling

You can apply custom styling to specific rows by setting the `rowClass` property, which will be applied to the matching rows. For example:

```css
/* Custom row styling */
.my-custom-row {
  background-color: #f5f5f5;
  font-weight: bold;
}

/* Custom row styling for specific states */
.error-row {
  background-color: #ffebee;
  color: #d32f2f;
}

.success-row {
  background-color: #e8f5e9;
  color: #388e3c;
}
```

Then set the `rowClass` property conditionally in your JavaScript:

```javascript
// Apply different classes based on row data
Page.Widgets.myTable.rowClass = function(rowData) {
  if (rowData.status === 'error') {
    return 'error-row';
  } else if (rowData.status === 'success') {
    return 'success-row';
  }
  return '';
};
```

## Responsive Design

The table component includes responsive design classes that automatically adjust the display on different screen sizes:

| CSS Class | Description |
|-----------|-------------|
| `.app-grid-responsive` | Base class for responsive table behavior |
| `.app-grid-stacked-sm` | Stacks the table on small screens |
| `.app-grid-scroll-sm` | Makes the table horizontally scrollable on small screens |
| `.app-grid-collapse-sm` | Collapses certain columns on small screens |