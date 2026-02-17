# Overview

The **Number** component is a form input component used to capture and display numeric values.

### Markup

```javascript
<wm-number textalign="right" name="number" variant="standard"></wm-number>
```

### Examples

#### Properties

- This number restricts user input by defining minimum and maximum allowed values, which can be configured in the markup or updated dynamically via script.

```javascript
<wm-number minvalue="0" maxvalue="100" name="number"></wm-number>
```

```javascript
// Set the minimum value allowed for the Number component
Page.Widgets.number.minvalue = 0;

// Set the maximum value allowed for the Number component
Page.Widgets.number.maxvalue = 100;
```

- This number sets a default value with financial input mode, formatting numbers with thousands separators and decimal precision, and can be configured in the markup or dynamically via script.

```javascript
<wm-number datavalue="8976.25" inputmode="financial" name="number"></wm-number>
```

```javascript
// Output displayed: 8,976.25

// Set the default number value
Page.Widgets.number.datavalue = 8976.25;

// Enable financial formatting
Page.Widgets.number.inputmode = "financial"
```

#### Events

- This is the markup for a number with an on-change event, executed when the user updates the value to trigger calculations.

```javascript
<wm-number on-change="numberChange($event, widget, newVal, oldVal)" name="number"></wm-number>
```

```javascript
Page.numberChange = function ($event, widget, newVal, oldVal) {
  // Recalculate the total amount when the quantity value changes

  if (newVal) {
    // Read the current price value
    let price = Page.Widgets.numberPrice.datavalue || 0;

    // Use the updated number value as quantity
    let quantity = newVal;

    // Update the total amount dynamically
    Page.Widgets.numberTotalAmount.datavalue = price * quantity;
  }
};
```

- This is the markup for a number with an on-keyup event, executed every time the user releases a key while typing to perform real-time validation or feedback.

```javascript
<wm-number on-keyup="numberKeyup($event, widget)" updateon="default" name="number"></wm-number>
```

```javascript
Page.numberKeyup = function ($event, widget) {
  // Requires “Update value on keypress” (updateon='default') to be enabled in the component’s properties

  // Validate the entered value in real time and show a warning if it exceeds the limit
  if (widget.datavalue > 100000) {
        Page.Widgets.warningLabel.caption = "Amount exceeds approval limit";
        Page.Widget.warningLabel.show = true;
    } else {
        Page.Widgets.warningLabel.caption = "";
        Page.Widgets.warningLabel.show = false;
    }

  // $event.code gives the physical key pressed (e.g., "Enter", "KeyA", "Digit1")
  // $event.key gives the physical key pressed (e.g., "Enter", "a", "1")
  // You can use it to detect specific keys and perform actions
  if ($event.code === "Enter") {
    // Perform operations when Enter key is pressed
    console.log("Enter key pressed! Current value:", widget.datavalue);
  }
};
```
