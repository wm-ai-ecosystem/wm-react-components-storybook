# Callback Events

<details open>
  <summary>Basic Events</summary>
    <div>
        | Event | Description |
        |-------|-------------|
        | `onClose` | This event handler is called whenever a close event is triggered (when user clicks the close button). |
    </div>
</details>

### Use Cases

- Triggered on message close.

```javascript
    Page.messageClose = function ($event, widget) {
    if(widget.type === "success") {
        //Reset the feedback form input after user closes the message
        Page.Widgets.feedbackInput.value = undefined;
        console.log("Feedback message closed, form input cleared.");
    }
};
```