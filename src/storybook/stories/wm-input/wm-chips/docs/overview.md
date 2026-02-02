# Overview

**Chips** are small UI blocks used to represent complex entities like contacts, tags, or rules in a compact way. They can include text, icons, or predefined values. Chips are commonly used in social and communication apps, allowing users to select and manage items—like recipients—through tokenized, auto-completing text fields. This approach is more intuitive, visually appealing, and easier to interact with than traditional list-based interfaces.

### Markup

```javascript
<wm-chips
  name="chips"
  class="app-chips filled default"
  variant="filled:default"
  dataset="bind:Variables.stvCountryList.dataSet"
  datafield="code"
  displayfield="name"
  searchkey="name"
></wm-chips>;
```

### Examples

#### Properties

- Sets the chips’s default values using the bound datafield.

```javascript
Page.Widgets.chips.datavalue = ['US', 'AU'];
```

- Disable when no options are available.

```javascript
Page.Widgets.chips.disabled =
  Page.Variables.stvCountryList.dataSet.length === 0;
```

#### Events

- Triggered whenever a new chip is added. Allows you to perform actions based on the newly added item.

```javascript
Page.chipsAdd = function ($event, widget, $item) {
    // Example: Add the new chip to the selectedCountries variable.
    Page.Variables.selectedCountries.dataSet.push($item);
};
```

- Triggered whenever a chip is removed. Allows you to perform actions based on the removed item.

```javascript
Page.chipsRemove = function ($event, widget, $item) {
    //Example: When a chip is removed, call the service variable to delete it
    Page.Variables.svDeleteCountry.setInput("code", $item);
    Page.Variables.svDeleteCountry.invoke();
};
```
