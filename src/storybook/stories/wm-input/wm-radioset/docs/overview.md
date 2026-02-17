# Overview

**Radioset** allows you to group a set of radio buttons under a common heading. You need to bind to a dataset to display a radio button for each value.

### Markup

```javascript
<wm-radioset name="radioset" height="auto" variant="standard"></wm-radioset>
```

### Examples

#### Properties

- This radioset allows a single default selection based on the datafield bound from the RadioSet’s dataset, which can be configured in the markup or dynamically via script.

```javascript
<wm-radioset datavalue="economy" name="radioset"></wm-radioset>
```

```javascript
// Set the default selected value dynamically
Page.Widgets.radioset.datavalue = "economy";
```

- This radioset enables or disables user interaction based on a bound variable, allowing it to be editable or non-editable depending on the application state. The disabled state can be configured in the markup or dynamically via script.

```javascript
<wm-radioset disabled="bind:!Variables.stvIsRadioSetEditable.dataSet.dataValue" name="radioset"></wm-radioset>
```

```javascript
// Disable the radioset when editing is not allowed or no options are available
Page.Widgets.radioset.disabled = !Page.Variables.stvIsRadioSetEditable.dataSet.dataValue;
```

#### Events

- This is the markup for a radioset with an on-change event, executed when a user updates the selected option to trigger conditional actions or update other UI components.

```javascript
<wm-radioset on-change="radiosetChange($event, widget, newVal, oldVal)" name="radioset"></wm-radioset>
```

```javascript
Page.radiosetChange = function ($event, widget, newVal, oldVal) {
  if (newVal === "business" || newVal === "firstClass") {
    // Show additional UI for premium travel classes
    Page.Widgets.panelPerks.show = true;
  } else {
    // Hide premium perks for non-premium selections
    Page.Widgets.panelPerks.show = false;
  }
};
```

#### Sample Radioset Dataset

- This is the markup for a RadioSet component bound to a sample dataset of travel class options, using displayfield to show the label, datafield for the value and allowing multiple items per row.

```javascript
<wm-radioset
  height="auto"
  name="radioset"
  dataset="bind:Variables.stvTravelClassOptions.dataSet"
  datafield="name"
  displayfield="value"
  itemsperrow="xs-1 sm-1 md-3 lg-3"
></wm-radioset>
```

```javascript
// Sample dataset for the RadioSet component, containing travel class options

let travalClassOptions = [
  {
    "name": "economy",
    "value": "Economy",
    "price": "$50"
  },
  {
    "name": "business",
    "value": "Business",
    "price": "$100"
  },
  {
    "name": "firstClass",
    "value": "First Class",
    "price": "$200"
  }
]
```
