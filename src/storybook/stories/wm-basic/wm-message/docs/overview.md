# Overview

The **Message** component helps to display a custom message on the page. Based on the message type - error, warning, success, info, loading- the message look and feel changes.

### Markup

```javascript
<wm-message name="message" type="success" class="app-message alert-success" variant="filled:success"></wm-message>
```


### Examples

#### Properties 

- This message has a configurable type and caption, which can be set in the markup or updated dynamically via script.

```javascript
<wm-message type="danger" class="app-message alert-danger" caption="Failed to process your request. Please try again." name="message" variant="filled:danger"></wm-message>
```

```javascript
// Configure the message to show an error state with a user-friendly caption
Page.Widgets.message.type = "error";
Page.Widgets.message.caption = "Failed to process your request. Please try again.";
```

#### Events 

- This is the markup for a message with an on-close event, executed when the user closes the message to perform follow-up actions such as resetting related inputs based on the message state.

```javascript
<wm-message on-close="messageClose($event, widget)" hideclose="false" name="message"></wm-message>
```

```javascript
 Page.messageClose = function ($event, widget) {
  // Check if the closed message is of type "success"
  if (widget.type === "success") {
    // Reset the feedback input field after the message is dismissed
    Page.Widgets.feedbackInput.datavalue = undefined;
  }
};
```

#### Methods 

- This method shows the message component programmatically.

```javascript
// Show the message component to the user
Page.Widgets.message.showMessage();
```

- This method hides the message component programmatically.

```javascript
// Hide the message component from the user
Page.Widgets.message.hideMessage();
```

<!-- - Hide the close option.

```javascript
Page.Widgets.message.hideclose = true;
``` -->