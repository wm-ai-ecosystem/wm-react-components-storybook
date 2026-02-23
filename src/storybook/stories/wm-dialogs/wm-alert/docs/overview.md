# Overview

The **Alert Dialog** is a modal dialog used to show important messages that require the user’s attention. It temporarily stops the user’s current activity to display critical information such as errors, warnings, confirmations, or important system messages.

### Markup

```javascript
<wm-alertdialog on-ok="Widgets.alertdialog.close()" name="alertdialog" class="modal-dialog modal-xs" variant="default:xs"></wm-alertdialog>
```

### Examples

#### Properties 

- This alert dialog has a configurable message property that determines the text displayed inside the dialog. The message can be set in the markup or dynamically via script.

```javascript
<wm-alertdialog message="I am an alert box!" name="alertdialog"></wm-alertdialog>
```

```javascript
// Set the message text to be displayed inside the alert dialog dynamically
Page.Widgets.alertdialog.message = "I am an alert box!";
```

- This alert dialog has a configurable alerttype property that determines the type of alert, controlling its icon and visual emphasis. Both the type and icon can be set in the markup or dynamically via script.

```javascript
<wm-alertdialog alerttype="error" iconclass="wi wi-error-triangle" name="alertdialog"></wm-alertdialog>
```

```javascript
// Set the alert type dynamically to control the icon and visual style
Page.Widgets.alertdialog.alerttype = "error";

// Set a icon class dynamically
Page.Widgets.alertdialog.iconclass = "wi wi-error-triangle";
```

#### Events 

- This is the markup for an alert dialog with an on-opened event, executed when the alert dialog is displayed.

```javascript
<wm-alertdialog on-opened="alertdialogOpened($event, widget)" name="alertdialog"></wm-alertdialog>
```

```javascript
Page.alertdialogOpened = function ($event, widget) {
  // Example: Customize the alert based on the role of the logged-in user
  if (App.Variables.loggedInUser.dataSet.role !== "ADMIN") {
    // Non-admin users see an error alert with no action allowed
    widget.message = "You do not have sufficient privileges to perform this action.";
    widget.alerttype = "error";
    widget.oktext = "OK";
    widget.iconclass = "wi wi-error";
  } else {
    // Admin users see a warning alert asking for confirmation
    widget.message = "This action will permanently remove the record. Do you want to continue?";
    widget.alerttype = "warning";
    widget.oktext = "Proceed";
    widget.iconclass = "wi wi-warning";
  }
};
```

- This is the markup for an alert dialog with an on-ok event, executed when the OK button is clicked, either via a direct action call in the markup to close the dialog or handler function.

```javascript
<wm-alertdialog on-ok="Widgets.alertdialog.close()" name="alertdialog"></wm-alertdialog>
```

```javascript
<wm-alertdialog on-ok="alertdialogOk($event, widget)" name="alertdialog"></wm-alertdialog>
```

```javascript
Page.alertdialogOk = function ($event, widget) {
  // Example: Only allow ADMIN users to perform a critical action
  if (App.Variables.loggedInUser.dataSet.role === "ADMIN") {
    // Invoke a service variable to perform the action (e.g., delete a record)
    Page.Variables.svDeleteRecord.invoke();
  } else {
    // For non-admin users, no action is performed; the alert simply closes
    Page.Widgets.alertdialog.close()
  }
};
```

#### Methods

- This method opens the alert dialog programmatically.

```javascript
// Open the alert dialog and display it to the user
Page.Widgets.alertdialog.open();
```

- This method closes the alert dialog programmatically.

```javascript
// Close the alert dialog and hide it from the user
Page.Widgets.alertdialog.close();
```