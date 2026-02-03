# Overview

The **Number** component is a form input component used to capture and display numeric values.

### Markup

```javascript
<wm-number textalign="right" name="number"></wm-number>
```

### Examples

#### Properties

- Sets the minimum and maximum allowed values for the Number component.

```javascript
Page.Widgets.number.minvalue = 100;
Page.Widgets.number.maxvalue = 1000;
```

- Sets the default value of the number component and enables financial input mode. This formats the value with thousands separators and decimal precision.

```javascript
// Output displayed: 8,976.25
Page.Widgets.number.datavalue = 8976.25;
Page.Widgets.number.inputmode = "financial"
```

#### Events

- Triggered whenever the number component’s value changes.

```javascript
Page.numberChange = function ($event, widget, newVal, oldVal) {
  // Recalculate total amount when quantity changes
    if (newVal) {
        let price = Page.Widgets.numberPrice.datavalue || 0;
        let quantity = newVal;
        Page.Widgets.numberTotalAmount.datavalue = price * quantity;
    }
};
```

- Triggered every time the user releases a key while typing in the number field.

```javascript
Page.numberKeyup = function ($event, widget) {
  //Requires “Update value on Keypress” to be enabled in the component’s properties panel.
  if (widget.datavalue > 100000) {
        Page.Widgets.warningLabel.caption = "Amount exceeds approval limit";
        Page.Widget.warningLabel.show = true;
    } else {
        Page.Widgets.warningLabel.caption = "";
        Page.Widgets.warningLabel.show = false;
    }
};
```
