# Overview

**Radioset** allows you to group a set of radio buttons under a common heading. You need to bind to a dataset to display a radio button for each value.

### Markup

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

### Examples

#### Properties

- Sets the radioset’s default values using the bound datafield.

```javascript
Page.Widgets.radioset.datavalue = "economy";
```

- Hide when no options are available.

```javascript
Page.Widgets.radioset.show =
  Page.Variables.stvTravelClassOptions.dataSet.length === 0;
```

#### Events

- Triggered whenever the radioset selection is updated.

```javascript
Page.radiosetChange = function ($event, widget, newVal, oldVal) {
    if (newVal === "business" || newVal === "firstClass") {
        // Show the perks panel for premium classes
        Page.Widgets.panelPerks.show = true;
    } else {
        // Hide the perks panel for Economy
        Page.Widgets.panelPerks.show = false;
    }
};
```

<!-- #### Sample radioset dataset

```json
[
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
``` -->
