# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | | A unique identifier for the search widget |
| type | enum: 'search', 'autocomplete' | 'search' | Controls whether to show a simple search input or an autocomplete dropdown |
| placeholder | string | | Text to display when the search input is empty |
| limit | number | | Limits the number of search results displayed in the autocomplete dropdown |
| showClear | boolean | false | When true, displays a clear button to reset the search input |

## Data Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dataset | array | | The data source to search through |
| searchKey | string | | The property in the dataset items to search on |
| labelValue | string | | The property to display in the search results |
| pictureSource | string | | Property containing image URL to display alongside search results |
| dataField | string | | Property to set as the dataValue when an item is selected |
| orderBy | string | | Field to sort the results by |
| matchMode | enum: 'startignorecase', 'start', 'endignorecase', 'end', 'anywhereignorecase', 'anywhere', 'exactignorecase', 'exact' | 'startignorecase' | Determines how search matching is performed |
| minChars | number | 1 | Minimum characters required before search is triggered |
| delayTime | number | 250 | Delay in milliseconds before search is executed after typing |

## Behavior

| Name | Type | Default | Description |
|------|------|---------|-------------|
| readOnly | boolean | false | When true, prevents user from changing the search value |
| show | boolean | true | Controls the visibility of the component |
| disabled | boolean | false | When true, the search becomes display-only |
| loadOnDemand | boolean | false | When bound to show property, defers initialization until widget becomes visible |

## Display

| Name | Type | Default | Description |
|------|------|---------|-------------|
| pictureWidth | string | '16px' | Width of pictures shown in search results |
| dataLoadingMessage | string | | Message displayed while search results are loading |
| dataCompleteMessage | string | | Message displayed when all results are loaded |

## Common Use Cases

```javascript
// Configure basic search
Page.Widgets.mySearch.type = "search";
Page.Widgets.mySearch.placeholder = "Search employees...";

// Setup autocomplete with employee dataset
Page.Widgets.employeeSearch.type = "autocomplete";
Page.Widgets.employeeSearch.dataset = Page.Variables.EmployeeData;
Page.Widgets.employeeSearch.searchKey = "name";
Page.Widgets.employeeSearch.labelValue = "name";
Page.Widgets.employeeSearch.limit = 5;

// Configure search behavior
Page.Widgets.productSearch.minChars = 3;
Page.Widgets.productSearch.delayTime = 500;
Page.Widgets.productSearch.matchMode = "anywhereignorecase";
```