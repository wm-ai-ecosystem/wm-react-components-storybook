# Callback Events

| Event | Description |
|-------|-------------|
| **Value Events** ||
| Change | Triggered when the selected value changes. The event handler receives the new value and old value. |
| **Interaction Events** ||
| onClick | Triggered when a radio button option is clicked. |
| onMouseEnter | Triggered when the mouse pointer enters the component area. |
| onMouseLeave | Triggered when the mouse pointer leaves the component area. |
| onTap | Triggered when the component is tapped on a touch device. |

## Example Usage

```javascript
Page.Widgets.paymentMethodRadioset.onChange = function(newValue, oldValue) {
  // Show/hide additional fields based on payment method selection
  if (newValue === "creditCard") {
    Page.Widgets.cardDetailsContainer.show = true;
    Page.Widgets.bankDetailsContainer.show = false;
  } else if (newValue === "bankTransfer") {
    Page.Widgets.cardDetailsContainer.show = false;
    Page.Widgets.bankDetailsContainer.show = true;
  } else {
    Page.Widgets.cardDetailsContainer.show = false;
    Page.Widgets.bankDetailsContainer.show = false;
  }
};
```