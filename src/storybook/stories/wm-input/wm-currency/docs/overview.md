# Overview

**Currency** component is a special text component to input the currency type data. This component will change the display format based on the currency type.

### Markup

```javascript
<wm-currency textalign="right" name="currency" variant="standard"></wm-currency>
```

### Examples

#### Properties

- This currency allows configuring the currency format, which can be set in the markup or dynamically via script.

```javascript
<wm-currency currency="USD" name="currency"></wm-currency>
```

```javascript
// Set the currency to US Dollars
Page.Widgets.currency.currency = "USD";
```

- This currency sets a default value with financial input mode, formatting numbers with thousands separators and decimal precision, and can be configured in the markup or dynamically via script.

```javascript
<wm-currency inputmode="financial" datavalue="8976.25" name="currency"></wm-currency>
```

```javascript
// Output displayed: 8,976.25

// Set the default currency value
Page.Widgets.currency.datavalue = 8976.25;

// Enable financial formatting
Page.Widgets.currency.inputmode = "financial"
```

#### Events

- This is the markup for a currency with an on-change event, executed when a user updates the value to trigger calculations.

```javascript
<wm-currency on-change="currencyChange($event, widget, newVal, oldVal)" name="currency"></wm-currency>
```

```javascript
Page.currencyChange = function ($event, widget, newVal, oldVal) {
  // Recalculate tax (18%) and update the total amount dynamically
  const tax = newVal * 0.18;
  Page.Variables.totalAmount.dataSet.dataValue = newVal + tax;
};
```
