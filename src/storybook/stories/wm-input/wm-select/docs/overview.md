# Overview

The **Select** component lets users choose one or more options from a dropdown list. It’s a simple and space-efficient way to capture user selections from a predefined set of values.

### Markup

```javascript
<wm-select
  name="select"
  dataset="bind:Variables.stvCountryList.dataSet"
  datafield="All Fields"
  displayfield="name"
></wm-select>
```

### Examples

#### Properties

- Clears the selected value of the Select component, resetting it to an unselected state.

```javascript
Page.Widgets.select.datavalue = undefined;
```

- Enables multiple selection for the Select component, allowing users to choose more than one option from the dropdown.

```javascript
Page.Widgets.select.multiple = true;
```

#### Events

- Triggered whenever the select component selection is updated.

```javascript
Page.selectChange = function ($event, widget, newVal, oldVal) {
    // Example: Load states when a country is selected
    if (newVal) {
        Page.Variables.svGetStates.setInput("country", newVal);
        Page.Variables.svGetStates.invoke();
    }
};
```

- Triggered on hover to display the helper text the select component

```javascript
Page.selectMouseenter = function ($event, widget) {
    //Example: Show helper message when user hovers over the select dropdown
    Page.Widgets.select.hint = "Select a country to view available states";
};
```
