# Overview

A **Checkbox** component is a specific type of two-states button that can be either checked or unchecked. Checkboxes let a user select an option.

### Markup

```javascript
  <wm-checkbox
    caption="Label"
    class="col-md-push-3 col-md-9"
    name="checkbox"
></wm-checkbox>
```

### Examples

#### Properties

- Sets the checkbox’s data value to true.

```javascript
Page.Widgets.checkbox.datavalue = true;
```

#### Events

- Triggered when the checkbox value changes.

```javascript
Page.checkboxChange = function ($event, widget, newVal, oldVal) {
     // Perform actions based on the checkbox state
    Page.Widgets.submitBtn.disabled = !newVal;
};
```