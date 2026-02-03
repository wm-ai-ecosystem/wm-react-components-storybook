# Overview

The **Message** component helps to display a custom message on the page. Based on the message type - error, warning, success, info, loading- the message look and feel changes.

### Markup

```javascript
<wm-message type="success" class="app-message alert-success" caption="Your profile has been updated successfully" name="message" variant="filled:success"></wm-message>
```


### Examples

#### Properties 

- Set message type programmatically.

```javascript
Page.Widgets.message.type = "error";
```

- Hide the close option.

```javascript
Page.Widgets.message.hideclose = true;
```

#### Events 

- Triggered on message close.

```javascript
    Page.messageClose = function ($event, widget) {
    if(widget.type === "success") {
        //Reset the feedback form input after user closes the message
        Page.Widgets.feedbackInput.value = undefined;
    }
};
```

#### Methods 

- Display a message.

```javascript
    Page.Widgets.message.showMessage();
```

- Hide the currently displayed message.

```javascript
    Page.Widgets.message.hideMessage();
```