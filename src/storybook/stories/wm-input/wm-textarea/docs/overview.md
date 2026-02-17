# Overview

The **Textarea** component is a multi-line text input control that allows users to enter and edit larger amounts of text. It provides ample space for collecting comments, feedback, descriptions, or any other form of extended text input.

### Markup

```javascript
<wm-textarea name="textarea" variant="standard"></wm-textarea>
```

### Examples

#### Properties

- This textarea sets a maximum character limit and displays a dynamic message showing how many characters have been filled out of the allowed maximum. Both the limit and the message can be configured in the markup or dynamically via script.

```javascript
<wm-textarea maxchars="300" limitdisplaytext="bind:Widgets.textarea.charlength + &quot; characters filled out of &quot; + Widgets.textarea.maxchars" name="textarea"></wm-textarea>
```

```javascript
// Set the maximum number of characters allowed
Page.Widgets.textarea.maxchars = 300;

// Initialize the character limit display message
Page.Widgets.textarea.limitdisplaytext = "0 characters filled out of 300";
```

#### Events

- This is the markup for a textarea with an on-blur event, executed when the user moves focus away from the field to trigger validation or update other UI components dynamically.

```javascript
<wm-textarea on-blur="textareaBlur($event, widget)" updateon="blur" name="textarea"></wm-textarea>
```

```javascript
Page.textareaBlur = function ($event, widget) {
  // Validate the input length when the user leaves the textarea
  if (widget.datavalue && widget.datavalue.length < 10) {
    // Show an error message if the input is less than the minimum required characters
    Page.Widgets.errorLabel.caption = "Feedback must be at least 10 characters.";
    Page.Widgets.errorLabel.show = true;
  } else {
    // Hide the error message if validation passes
    Page.Widgets.errorLabel.show = false;
  }
};
```
