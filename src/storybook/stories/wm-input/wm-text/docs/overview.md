# Overview

The **Text** component is a single-line input component that lets users enter text. It provides a simple, customizable interface for capturing standard text, passwords, emails, numbers, and other text-based input.

### Markup

```javascript
<wm-text name="text" class="form-control app-textbox" variant="standard"></wm-text>
```

### Examples

#### Properties

- Restricts the text input to only alphanumeric characters by setting a regular expression, which can be configured in the markup or dynamically via script.

```javascript
<wm-text regexp="^[A-Za-z0-9]+$" name="text"></wm-text>
```

```javascript
// Set the text input to accept only letters (A-Z, a-z) and numbers (0-9)
Page.Widgets.text.regexp = '/^[A-Za-z0-9]+$/';
```

- Restricts the maximum number of characters that can be entered in the text input, which can be configured in the markup or dynamically via script.

```javascript
<wm-text maxchars="30" name="text"></wm-text>
```

```javascript
// Set the maximum allowed characters for the text input dynamically
Page.Widgets.text.maxchars = 20;
```

#### Events

- This is the markup for a text with an on-change event, executed when a user updates the text value to trigger actions such as fetching related data or updating other UI components.

```javascript
<wm-text on-change="textChange($event, widget, newVal, oldVal)" name="text"></wm-text>
```

```javascript
Page.textChange = function ($event, widget, newVal, oldVal) {
  // Fetch city and state dynamically when a zip code is entered
  Page.Variables.svGetCityState.setInput("zipcode", newVal);
  Page.Variables.svGetCityState.invoke();

  // After the service variable (svGetCityState) successfully retrieves data, the result can be bound to other UI components, e.g., text fields for city/state
  // Page.Widgets.cityText.datavalue = Page.Variables.svGetCityState.dataSet.city;
  // Page.Widgets.stateText.datavalue = Page.Variables.svGetCityState.dataSet.state;
};
```


- This is the markup for a text with an on-keyup event, executed every time the user releases a key to trigger actions or update other UI components dynamically.

```javascript
<wm-text on-keyup="textKeyup($event, widget)" updateon="default" name="text"></wm-text>
```

```javascript
Page.textKeyup = function ($event, widget) {
  // Requires “Update value on keypress” (updateon='default') to be enabled in the component’s properties

  // $event.code gives the physical key pressed (e.g., "Enter", "KeyA", "Digit1")
  // $event.key gives the physical key pressed (e.g., "Enter", "a", "1")
  // You can use it to detect specific keys and perform actions
  if ($event.code === "Enter") {
    // Perform operations when Enter key is pressed
    console.log("Enter key pressed! Current value:", widget.datavalue);
  }

  // Enable or disable the submit button based on whether the text field has any input
  Page.Widgets.submitButton.show = widget.datavalue.length > 0;
};
```
