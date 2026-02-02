# Overview

The **Search** component provides advanced search capabilities to quickly find and select items from datasets. It supports autocomplete and standard search modes, allowing users to filter and display results dynamically as they type. The component can be bound to datasets from Databases or Web Services, giving full flexibility and control over search behavior and result handling.

### Markup

```javascript
<wm-search
  name="search"
  type="search"
  dataset="bind:Variables.svGetEmployeesList.dataSet"
  searchkey="name"
  displaylabel="name"
  datafield="All Fields"
  searchon="typing"
  searchiconclass="wm-sl-l sl-search"
></wm-search>
```

### Examples

#### Properties

- Configure basic search.

```javascript
Page.Widgets.search.type = "search";
Page.Widgets.search.placeholder = "Search employees...";
```

- Configure search behavior.

```javascript
Page.Widgets.search.minchars = 3;
Page.Widgets.search.debouncetime = 500;
```

#### Events

- Triggered when the search component dataset is fully loaded.

```javascript
Page.searchDatasetready = function (widget, data) {
  // Filter only active employees
  return data.filter((emp) => emp.status === true);
};
```

- Triggered when a user selects a value from the search component.

```javascript
Page.searchSelect = function ($event, widget, selectedValue) {
  //Allows to perform actions based on the selected item.
  console.log("Selected Value", selectedValue);
};
```

- Triggered on change whenever the value of the search is updated.

```javascript
Page.searchChange = function ($event, widget, newVal, oldVal) {
  console.log("Old Value:", oldVal);
  console.log("New Value:", newVal);
};
```

#### Methods

- Clears the entered/selected search text.

```javascript
Page.Widgets.search.clearSearch();
```
