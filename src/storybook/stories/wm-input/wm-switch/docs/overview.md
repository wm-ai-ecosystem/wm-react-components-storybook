# Overview

**Switch** component can help switching between 3 or more different options by pressing a single key.

### Markup

```javascript
<wm-switch name="switch" datavalue="yes" variant="standard"></wm-switch>
```

### Examples

#### Properties

- This switch allows multiple selections, which can be configured in the markup or dynamically via script.

```javascript
<wm-switch multiple="true" name="switch"></wm-switch>
```

```javascript
// Enable multiple selections dynamically
Page.Widgets.switch.multiple = true;
```

- This switch allows configuring the icon displayed when an option is selected (checked). The icon can be set in the markup or dynamically via script.

```javascript
<wm-switch checkediconclass="wi wi-check" name="switch"></wm-switch>
```

```javascript
// Set the icon dynamically for the selected (checked) state
Page.Widgets.switch.checkediconclass = "wi wi-check";
```

#### Events

- This is the markup for a switch with an on-change event, executed when a user updates the selected option(s) to trigger actions such as updating variables or performing related UI updates.

```javascript
<wm-switch on-change="switchChange($event, widget, newVal, oldVal)" name="switch"></wm-switch>
```

```javascript
Page.switchChange = function ($event, widget, newVal, oldVal) {
  // Update the report frequency based on the selected switch value (e.g., "daily", "weekly", "monthly")
  Page.Variables.svSetReportFrequency.setInput("frequency", newVal);
  Page.Variables.svSetReportFrequency.invoke();

   // Optional: Invoke a pre-configured toaster to confirm the selected frequency
  Page.Actions.reportFrequencyToaster.invoke();

  // Additional actions can be added here, such as updating other UI components
};
```

#### Sample Select Dataset

- This is the markup for a Switch component bound to a sample dataset of view options, using displayfield to show the value, datafield for the id, and checkediconclass to indicate the selected state. The default selection is set via datavalue.

```javascript
<wm-switch
  name="switch"
  dataset="bind:Variables.stvViewOptions.dataSet"
  datafield="id"
  displayfield="value"
  checkediconclass="wi wi-check"
  datavalue="daily"
></wm-switch>
```

```javascript
// Sample dataset for the switch component, containing a list of view options

let viewOptions = [
  {
    "id": "daily",
    "value": "Daily"
  },
  {
    "id": "weekly",
    "value": "Weekly"
  },
  {
    "id": "monthly",
    "value": "Monthly"
  }
];
```