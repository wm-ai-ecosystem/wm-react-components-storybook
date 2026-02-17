# Overview

The **Select** component lets users choose one or more options from a dropdown list. It’s a simple and space-efficient way to capture user selections from a predefined set of values.

### Markup

```javascript
<wm-select name="select" variant="standard"></wm-select>
```

### Examples

#### Properties

- This select allows setting a default selected value based on the bound datafield, which can be configured in the markup or dynamically via script.

```javascript
<wm-select datavalue="bind:Variables.stvCountryList.dataSet[1]" name="select"></wm-select>
```

```javascript
// Set the default selected value dynamically based on the dataset
Page.Widgets.select.datavalue = Page.Variables.stvCountryList.dataSet[1];
```

- This select allows multiple selections, enabling users to choose more than one option. The multiple selection mode can be configured in the markup or dynamically via script.

```javascript
<wm-select multiple="true" name="select"></wm-select>
```

```javascript
// Enable multiple selection dynamically
Page.Widgets.select.multiple = true;
```

#### Events

- This is the markup for a select with an on-change event, executed when a user updates the selected option(s) to trigger actions such as fetching dependent data or updating other UI components.

```javascript
<wm-select on-change="selectChange($event, widget, newVal, oldVal)" name="select"></wm-select>
```

```javascript
Page.selectChange = function ($event, widget, newVal, oldVal) {
  // Load states dynamically when a country is selected
  if (newVal && newVal.code) {
    Page.Variables.svGetStates.setInput("countryCode", newVal.code);
    Page.Variables.svGetStates.invoke();
  }

  // After the service variable (svGetStates) successfully retrieves data, the result can be bound to another UI component properties panel, such as populating a dependent Select dropdown
  // Page.Widgets.stateSelect.dataset = Page.Variables.svGetStates.dataSet;
};
```

- This is the markup for a select with an on-mouseenter event, executed when the user hovers over the component to display helper text or provide additional guidance.

```javascript
<wm-select on-mouseenter="selectMouseenter($event, widget)" name="select"></wm-select>
```

```javascript
Page.selectMouseenter = function ($event, widget) {
    // Show a helper message when the user hovers over the Select dropdown
    widget.hint = "Select a country to view available states";
};
```

#### Sample Select Dataset

- This is the markup for a Select component bound to a sample dataset of countries, using displayfield to show the label, datafield for the all fields, and supporting ordering of the options.

```javascript
<wm-select
  name="select"
  dataset="bind:Variables.stvCountryList.dataSet"
  datafield="All Fields"
  displayfield="name"
  datavalue="bind:Variables.stvCountryList.dataSet[1]"
  orderby="name:asc"
></wm-select>
```

```javascript
// Sample dataset for the Select component, containing a list of countries

let countryList = [
  {
    "name": "United States",
    "code": "US"
  },
  {
    "name": "United Kingdom",
    "code": "UK"
  },
  {
    "name": "Canada",
    "code": "CA"
  },
  {
    "name": "Australia",
    "code": "AU"
  },
]
```
