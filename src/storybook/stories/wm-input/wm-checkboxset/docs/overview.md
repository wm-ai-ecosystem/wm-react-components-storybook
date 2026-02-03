# Overview

**CheckboxSet** allows you to group a set of checkboxes under a common heading. You need to bind to a dataset to display a checkbox for each value.

### Markup

```javascript
<wm-checkboxset
  height="auto"
  name="checkboxset"
  dataset="bind:Variables.stvCountryList.dataSet"
  datafield="code"
  displayfield="name"
  orderby="name:asc"
></wm-checkboxset>;
```

### Examples

#### Properties

- Sets the checkboxset’s default values using the bound datafield.

```javascript
Page.Widgets.checkboxset.datavalue = ['US', 'AU'];
```

- Disable when no options are available.

```javascript
Page.Widgets.checkboxset.disabled =
  Page.Variables.stvCountryList.dataSet.length === 0;
```

#### Events

- Triggered whenever the checkboxset selection is updated.

```javascript
Page.checkboxsetChange = function ($event, widget, newVal, oldVal) {
    // Enable the Save button only if at least one option is selected
    Page.Widgets.saveBtn.disabled = !newVal || newVal.length === 0;
};
```

<!-- #### Sample checkboxset dataset

```json
[
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
``` -->
