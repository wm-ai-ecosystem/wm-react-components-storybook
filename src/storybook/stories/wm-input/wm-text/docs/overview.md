# Overview

The **Text** component is a single-line input component that lets users enter text. It provides a simple, customizable interface for capturing standard text, passwords, emails, numbers, and other text-based input.

### Markup

```javascript
<wm-text name="text"></wm-text>
```

### Examples

#### Properties

- Allows only alphanumeric input by setting a regular expression.

```javascript
Page.Widgets.text.regexp = '/^[A-Za-z0-9]+$/';
```

- Sets the maximum number of characters the user can enter in the text field.

```javascript
Page.Widgets.text.maxchars = 20;
```

#### Events

- Triggered whenever the text component’s value changes.

```javascript
Page.textChange = function ($event, widget, newVal, oldVal) {
    // If user enters a zip code, auto-fill city/state
    Page.Variables.getCityState.setInput("zipcode", newVal);
    Page.Variables.getCityState.invoke();
};
```


- Triggered every time the user releases a key while typing in the text field.

```javascript
Page.textKeyup = function ($event, widget) {
    //Requires “Update value on Keypress” to be enabled in the component’s properties panel.

    // Enable/disable actions based on input
    const value = widget.datavalue || "";
    Page.Widgets.submitButton.show = value.length > 0;
};
```
