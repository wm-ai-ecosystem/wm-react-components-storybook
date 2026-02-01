# Callback Events

<details open>
  <summary>Basic Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onChange` | This event handler is called each time your component's value changes. |
        | `onFocus` | This event handler is called each time your component is focused. |
        | `onBlur` | This event handler is called each time your focus leaves your component. |
    </div>
</details>

<details>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onSubmit` | This event handler is called whenever a submit event is triggered. |
        | `onSelect` | This event handler is called when the search item is selected |
        | `onBeforeServiceCall` | This event is triggered before sending the service call for fetching the search results. inputData can be modified in the event. |
        | `onDatasetReady` | Triggered when a dataset has been fully loaded and is ready for use in a component |
        | `onClear` | This event is called when user clears the search text entered. |
    </div>
</details>

### Use Cases

- Triggered when the search component dataset is fully loaded.

```javascript
    Page.searchDatasetready = function (widget, data) {
    // Filter only active employees
    return data.filter(emp => emp.status === true);
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