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

- Triggered when a user selects a value from the Search component. You can use this event to fetch or filter data based on the selected value.

```javascript
Page.searchSelect = function ($event, widget, selectedValue) {
  // Invoke the service variable with the selected value
  Page.Variables.svGetArtifacts.setInput('name', selectedValue);
  Page.Variables.svGetArtifacts.invoke();

  // The resulting data can be bound to tables, cards, or lists to display filtered results
};
```

#### Methods

- Clears the entered/selected search text.

```javascript
Page.Widgets.search.clearSearch();
```
