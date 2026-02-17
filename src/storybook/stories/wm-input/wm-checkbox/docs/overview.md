# Overview

A **Checkbox** component is a specific type of two-states button that can be either checked or unchecked. Checkboxes let a user select an option.

### Markup

```javascript
<wm-checkbox caption="Label" class="col-md-push-3 col-md-9" name="checkbox" variant="standard"></wm-checkbox>
```

### Examples

#### Properties

- This checkbox has a configurable data value, which can be set in the markup or dynamically via script.

```javascript
<wm-checkbox datavalue="true" name="checkbox"></wm-checkbox>
```

```javascript
// Set the checkbox value to true
Page.Widgets.checkbox.datavalue = true;
```

#### Events

- This is the markup for a checkbox with an on-change event, executed when a user changes the checkbox value to trigger actions or update other UI components.

```javascript
<wm-checkbox on-change="checkboxChange($event, widget, newVal, oldVal)" name="checkbox"></wm-checkbox>
```

```javascript
Page.checkboxChange = function ($event, widget, newVal, oldVal) {
  // Enable or disable the submit button based on the checkbox state
  Page.Widgets.submitBtn.disabled = !newVal;

  // You can add more actions here, such as updating datasets, calling service variables, or showing notifications
};
```