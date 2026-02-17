# Overview

**Chips** are small UI blocks used to represent complex entities like contacts, tags, or rules in a compact way. They can include text, icons, or predefined values. Chips are commonly used in social and communication apps, allowing users to select and manage items like recipients through tokenized, auto completing text fields. This approach is more intuitive, visually appealing, and easier to interact with than traditional list-based interfaces.

### Markup

```javascript
<wm-chips name="chips" class="app-chips filled default" variant="filled:default"></wm-chips>
```

### Examples

#### Properties

- This chips allows multiple selections with a default datavalue, which depends on the datafield bound from the Chips' dataset and can be configured in the markup or dynamically via script.

```javascript
<wm-chips datavalue="US, AU" name="chips"></wm-chips>
```

```javascript
Page.Widgets.chips.datavalue = ['US', 'AU'];
```

- This chips conditionally enables reordering based on the dataset length, and can be configured in the markup or dynamically via script.

```javascript
<wm-chips enablereorder="bind:Variables.stvCountryList.dataSet.length &gt; 1" name="chips"></wm-chips>
```

```javascript
// Enable reorder only if there are more than one item
Page.Widgets.chips.enablereorder = Page.Variables.stvCountryList.dataSet.length > 1;
```

#### Events

- This is the markup for a chips with an on-add event, executed when a user adds a new chip to trigger actions or update existing modal variable dataset.

```javascript
<wm-chips on-add="chipsAdd($event, widget, $item)" name="chips"></wm-chips>
```

```javascript
Page.chipsAdd = function ($event, widget, $item) {
  // Add the newly added chip item to the selectedCountries dataset
  Page.Variables.selectedCountries.dataSet.push($item);
};
```

- This is the markup for a chips with an on-remove event, executed when a user removes a chip to trigger actions or invoke the service variable.

```javascript
<wm-chips on-remove="chipsRemove($event, widget, $item)" name="chips"></wm-chips>
```

```javascript
Page.chipsRemove = function ($event, widget, $item) {
  // Call a service variable to delete the removed chip item
  Page.Variables.svDeleteCountry.setInput("code", $item);
  Page.Variables.svDeleteCountry.invoke();

  // Additional actions can be added here, such as updating local datasets or showing notifications
};
```

#### Sample CheckboxSet Dataset

- This is the markup for a Chips component bound to a sample dataset of countries, using displayfield to show the label, datafield for the value, and searchkey to enable searching and selecting options dynamically.


```javascript
<wm-chips
  name="chips"
  class="app-chips filled default"
  variant="filled:default"
  dataset="bind:Variables.stvCountryList.dataSet"
  datafield="code"
  displayfield="name"
  searchkey="name"
></wm-chips>
```

```javascript
// Sample dataset for the chips component, containing a list of countries

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