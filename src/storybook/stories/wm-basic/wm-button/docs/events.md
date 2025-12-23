# Callback Events

| Event | Description |
|-------|-------------|
| **Touch Events** |
| On Tap | Triggered when the button is tapped once |
| On Double Tap | Triggered when the button is tapped twice in quick succession |
| On Long Tap | Triggered when the button is pressed and held for a longer duration |
| **Focus Events** |
| On focus | Triggered when the button receives focus |
| On blur | Triggered when the button loses focus |
| **Keyboard Events** |
| On key down | Triggered when a key is pressed while the button has focus |
| On key press | Triggered when a key is pressed and character is generated |
| On key up | Triggered when a key is released while the button has focus |

## Example Usage

```javascript
Page.onReady = function() {
  // Handle tap event
  Page.Widgets.submitButton.onTap = function(event) {
    // Form submission logic here
    submitForm();
  };
  
  // Handle long tap event
  Page.Widgets.optionsButton.onLongTap = function(event) {
    // Show additional options menu
    showOptionsMenu();
  };
};
```