# Overview

A **Button** indicates a possible user action. The button provides a styled clickable UI functionality with arbitrary content to indicate the different states.

### Markup

```javascript
<wm-button name="button" caption="Button" class="btn-filled btn-default" type="button" variant="filled:default"></wm-button>
```

### Examples


#### Properties

- Configure the button caption.

```javascript
// Set or update the button's caption dynamically
Page.Widgets.button.caption = "WaveMaker";
```

- Disable/enable button based on a condition.

```javascript
// Disable the button if the form is invalid, enable it if the form is valid
Page.Widgets.button.disabled = !Page.Widgets.formCreate.valid;
```

- This button displays an icon using an image, with customizable width, height, and margin that can be set in the markup or dynamically via script.

```javascript
<wm-button iconurl="resources/images/imagelists/default-image.png" iconwidth="20px" iconheight="20px" iconmargin="4px" name="button"></wm-button>
```

```javascript
// Configure the button's icon using an image URL and set its width, height, and margin dynamically
Page.Widgets.button.iconurl = "resources/images/download.png";
Page.Widgets.button.iconwidth = "20px";
Page.Widgets.button.iconheight = "20px";
Page.Widgets.button.iconmargin = "0px 8px 0px 0px";
```

#### Events

- This is the markup for a button with an on-click event. Executed when the Send button is clicked to process user input, invoke a backend service, update the chat response, and manage the loading state.

```javascript
<wm-button on-click="buttonClick($event, widget)" name="button"></wm-button>
```

```javascript
Page.buttonClick = function ($event, widget) {
  // Get the user-entered prompt/message
  const content = Page.Widgets.userInput.datavalue;

  // If the input is empty, stop further processing
  if (!content) return;

  // Show a loading spinner while the backend request is being processed
  Page.Widgets.containerAnswerSpinner.show = true;

  // Invoke the backend service variable with the user input
  Page.Variables.svPostHandleChat.invoke(
    {
      inputFields: {
        RequestBody: {
          message: content, // Send the user's prompt/message
        },
      },
    },
    function (data) {
      // Success callback:

      // Process and display the response from the backend
      // Parameters: response text, isUser (true for user input, false for backend response)
      Page.addMessageToChatBot(data.content, false);

      // Hide the loading spinner after processing
      Page.Widgets.containerAnswerSpinner.show = false;

      // Clear the input field for the next prompt
      Page.Widgets.inputMessage.datavalue = undefined;
    },
    function (error) {
      // Error callback:

      // Hide the spinner if the request fails
      Page.Widgets.containerAnswerSpinner.show = false;
    },
  );
};
```

- Executed when the Copy button is clicked to copy the displayed text to the clipboard and show a success notification.

```javascript
Page.buttonClick = function ($event, widget) {
  // Copy IP address text to the clipboard
  navigator.clipboard.writeText(Page.Widgets.labelIPAddressValue.caption);

  // Show a toaster notification to confirm success
  Page.Actions.toasterCopyClipboardSuccess.dataBinding.text =
    "IP Address copied to clipboard!";
  Page.Actions.toasterCopyClipboardSuccess.invoke();
};
```

- Executed when the Show/Hide Password button is clicked to toggle password visibility and update the icon.

```javascript
Page.buttonClick = function ($event, widget) {
  const passwordField = Page.Widgets.inputPassword;

  // Toggle password visibility
  if (passwordField.type === "password") {
    passwordField.type = "text"; // Show password
    widget.iconclass = "fa fa-eye"; // Update button icon
  } else {
    passwordField.type = "password"; // Hide password
    widget.iconclass = "fa fa-eye-slash"; // Update button icon
  }
};
```

- Executed when the Submit button is clicked to validate the form and submit or highlight invalid fields.

```javascript
Page.buttonClick = function ($event, widget) {
  // Check if the form is valid
  if (Page.Widgets.formCreate.valid) {
    // Submit the form (e.g., registration, feedback, or data entry)
    Page.Widgets.formCreate.submit();
  } else {
    // Highlight invalid or required fields to guide the user
    Page.Widgets.formCreate.highlightInvalidFields();
  }
};
```

- This is the markup for a button with an on-mouseenter event, executed on hover to show a tooltip or provide UI feedback.

```javascript
<wm-button on-mouseenter="buttonMouseenter($event, widget)" name="button"></wm-button>
```

```javascript
Page.buttonMouseenter = function ($event, widget) {
  // Display a tooltip to guide the user
  widget.hint = "Click to copy the text";
};
```

<!-- 
- Triggered on button click to invoke a variable for actions such as fetching or submitting data.

```javascript
Page.buttonClick = function ($event, widget) {
  // Call a service or variable to fetch or submit data
  Page.Variables.svGetUsersData.invoke();
};
```

- Triggered on button click to open dialog.

```javascript
Page.buttonClick = function ($event, widget) {
  // Open a dialog or modal window
  Page.Widgets.dialog.open();
};
``` -->