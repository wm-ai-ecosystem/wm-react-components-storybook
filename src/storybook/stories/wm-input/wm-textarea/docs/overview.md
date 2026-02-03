# Overview

The **Textarea** component is a multi-line text input control that allows users to enter and edit larger amounts of text. It provides ample space for collecting comments, feedback, descriptions, or any other form of extended text input.

### Markup

```javascript
<wm-textarea name="textarea"></wm-textarea>
```

### Examples

#### Properties

- Sets the maximum number of characters the user can enter and shows a message indicating how many characters have been filled out of the allowed limit.

```javascript
Page.Widgets.textarea.maxchars = 300;
Page.Widgets.textarea.limitdisplaytext = "0 characters filled out of 300";
```

#### Events

- Triggered when the Textarea loses focus.

```javascript
Page.textareaBlur = function ($event, widget) {
    // Validate the input length
    if (widget.datavalue && widget.datavalue.length < 10) {
        Page.Widgets.errorLabel.caption = "Feedback must be at least 10 characters.";
        Page.Widgets.errorLabel.show = true;
    } else {
        Page.Widgets.errorLabel.show = false;
    }
};
```
