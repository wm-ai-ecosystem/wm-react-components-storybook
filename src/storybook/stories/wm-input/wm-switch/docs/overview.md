# Overview

**Switch** component can help switching between 3 or more different options by pressing a single key.

### Markup

```javascript
<wm-switch
  name="switch"
  dataset="bind:Variables.stvViewOptions.dataSet"
  datafield="id"
  displayfield="value"
  multiple="true"
  checkediconclass="wi wi-check"
  iconclass=""
></wm-switch>
```

### Examples

#### Properties

- Enables multiple selections on the Switch component.

```javascript
Page.Widgets.switch.multiple = true;
```

- Sets the icon for the selected (checked) state of the Switch component.

```javascript
Page.Widgets.switch.checkediconclass = "fa fa-check";
```

#### Events

- Triggered whenever the switch component selection is updated.

```javascript
Page.switchChange = function ($event, widget, newVal, oldVal) {
    // newVal can be "daily", "weekly", or "monthly"
    Page.Variables.setReportFrequency.setInput("frequency", newVal);
    Page.Variables.setReportFrequency.invoke();

    // Optional: Show a toast confirming the selected frequency
    Page.Actions.reportFrequencyToaster.invoke();
};
```
