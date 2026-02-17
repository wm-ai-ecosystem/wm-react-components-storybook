# Overview

The **Search** component provides advanced search capabilities to quickly find and select items from datasets. It supports autocomplete and standard search modes, allowing users to filter and display results dynamically as they type. The component can be bound to datasets from Databases or Web Services, giving full flexibility and control over search behavior and result handling.

### Markup

```javascript
<wm-search name="search" variant="standard"></wm-search>
```

### Examples

#### Properties

- This Search component uses an autocomplete type with a placeholder, which can be configured in the markup or dynamically via script.

```javascript
<wm-search type="autocomplete" placeholder="Search employees..." name="search"></wm-search>
```

```javascript
// Set the Search component's type and placeholder text dynamically
Page.Widgets.search.type = "autocomplete";
Page.Widgets.search.placeholder = "Search employees...";
```

- This Search component has configurable behavior such as minimum characters to trigger a search and debounce time, which can be set in the markup or dynamically via script.

```javascript
<wm-search minchars="3" debouncetime="200" name="search"></wm-search>
```

```javascript
// Configure the Search component to trigger after a minimum of 3 characters and set a debounce time of 200ms
Page.Widgets.search.minchars = 3;
Page.Widgets.search.debouncetime = 200;
```

#### Events

- This is the markup for a Search component with an on-datasetready event, executed when the dataset is fully loaded to filter and display only relevant entries (e.g., active employees).

```javascript
<wm-search on-datasetready="searchDatasetready(widget, data)" name="search"></wm-search>
```

```javascript
Page.searchDatasetready = function (widget, data) {
  // Filter dataset to include only active employees
  return data.filter((emp) => emp.active === true);
};
```

- This is the markup for a Search component with an on-select event, executed when a user selects a value to fetch or filter data and update relevant components.

```javascript
<wm-search on-select="searchSelect($event, widget, selectedValue)" name="search"></wm-search>
```

```javascript
Page.searchSelect = function ($event, widget, selectedValue) {
  // Invoke the service variable to fetch details for the selected employee
  Page.Variables.svGetEmpDetails.invoke(
    {
      inputFields: {
        // Pass the selected employee ID as input to the service
        empId: selectedValue,
      },
    },
    function (data) {
      // On successful response, bind the returned employee data to the table
      Page.Widgets.tableEmpDetails.dataset = data;
    },
    function (error) {
      // Handle errors by showing a user-friendly notification
      Page.Actions.toasterError.dataBinding.text = error;
      Page.Actions.toasterError.invoke();
    },
  );
};
```

#### Methods

- Clears the entered/selected search text.

```javascript
// Clear the current search input and reset any selected value in the Search component
Page.Widgets.search.clearSearch();
```

#### Sample Search Dataset

- This is the markup for a Search component bound to a sample employee dataset, using the name as the search key and display label, with support for ordering, grouping, and filtering of results.

```javascript
<wm-search
  name="search"
  variant="standard"
  dataset="bind:Variables.svGetEmployeesList.dataSet"
  searchkey="name"
  displaylabel="name"
  datafield="id"
  orderby="id:desc"
  groupby="department"
></wm-search>
```

```javascript
// Sample dataset for the Search component, containing employee details
let employeesList = [
  {
    "id": 1,
    "name": "John Doe",
    "department": "Finance",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "active": true
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "department": "Marketing",
    "email": "jane.smith@example.com",
    "phone": "987-654-3210",
    "active": false
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "department": "IT",
    "email": "alice.johnson@example.com",
    "phone": "555-666-7777",
    "active": true
  }
];
```

<!-- 
```javascript
// Alternate way to invoke a service variable programmatically when an event occurs (e.g., on-select of a search item).
// This approach is generic and can be used for any event, not just on-select.

Page.searchSelect = function ($event, widget, selectedValue) {
  // Set the input value for the service variable
  Page.Variables.svGetEmpDetails.setInput("empId", selectedValue);

  // Invoke the service variable without inline callbacks
  Page.Variables.svGetEmpDetails.invoke();
};

// Success and error handling can now be managed via variable-level events such as:
//   - On Before Update
//   - On Success
//   - On Error
// This approach separates the logic from the invocation and is recommended for cleaner code.
// Refer to WaveMaker documentation for more details.

// After the service variable is invoked successfully, bind its returned data to the any data components like table, list etc.
Page.Widgets.tableEmpDetails.dataset = Page.Variables.svGetEmpDetails.dataSet;
``` -->
