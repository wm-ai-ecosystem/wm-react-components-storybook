# Overview

**CheckboxSet** allows you to group a set of checkboxes under a common heading. You need to bind to a dataset to display a checkbox for each value.

### Markup

```javascript
<wm-checkboxset height="auto" name="checkboxset" variant="standard"></wm-checkboxset>
```

### Examples

#### Properties

- This checkboxset allows multiple selections with a default datavalue, which depends on the datafield bound from the CheckboxSet's dataset and can be configured in the markup or dynamically via script.

```javascript
<wm-checkboxset datavalue="US, AU" name="checkboxset"></wm-checkboxset>
```

```javascript
// Set the default selected values dynamically
Page.Widgets.checkboxset.datavalue = ['US', 'AU'];
```

- This is the markup for a checkboxset, which conditionally displays based on a dataset or expression. The visibility can be set directly in the markup or dynamically via script.


```javascript
<wm-checkboxset show="bind:Variables.stvCountryList.dataSet.length &gt; 0" deferload="true" name="checkboxset"></wm-checkboxset>
```

```javascript
// Show only if the dataset has one or more items
Page.Widgets.checkboxset.show = Page.Variables.stvCountryList.dataSet.length > 0;
```

#### Events

- This is the markup for a CheckboxSet with an on-change event, executed when a user updates the selection to trigger actions or update other UI components.

```javascript
<wm-checkboxset on-change="checkboxsetChange($event, widget, newVal, oldVal)" name="checkboxset"></wm-checkboxset>
```

```javascript
Page.checkboxsetChange = function ($event, widget, newVal, oldVal) {
  // Enable the Save button only if at least one option is selected
  Page.Widgets.saveBtn.disabled = !newVal || newVal.length === 0;
};
```

#### Sample CheckboxSet Dataset

- This is the markup for a CheckboxSet component bound to a sample dataset of countries, using displayfield to show the label, datafield for the value, and supporting ordering of the options.

```javascript
<wm-checkboxset
  height="auto"
  name="checkboxset"
  dataset="bind:Variables.stvCountryList.dataSet"
  datafield="code"
  displayfield="name"
  orderby="name:asc"
></wm-checkboxset>
```

```javascript
// Sample dataset for the CheckboxSet component, containing a list of countries

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
