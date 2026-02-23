# Overview

The **Confirm Dialog** is a modal dialog used to get confirmation from the user before performing an action. It presents two options, typically OK and Cancel, allowing users to either proceed or stop the action. It is commonly used to confirm operations such as deleting records or submitting irreversible changes.

### Markup

```javascript
<wm-confirmdialog on-ok="Widgets.confirmdialog.close()" on-cancel="Widgets.confirmdialog.close()" name="confirmdialog" class="modal-dialog modal-xs" variant="default:xs"></wm-confirmdialog>
```

### Examples

#### Properties 

- This confirm dialog has a configurable message and animation properties that determine the text displayed inside the dialog and the animation used when it appears. Both properties can be set in the markup or dynamically via script.

```javascript
<wm-confirmdialog message="I am confirm box!" animation="bounceIn" name="confirmdialog"></wm-confirmdialog>
```

```javascript
// Set the message text to be displayed inside the confirm dialog dynamically
Page.Widgets.confirmdialog.message = "I am confirm box!";

// Set the animation effect for the confirm dialog when it appears dynamically
Page.Widgets.confirmdialog.animation = "bounceIn";
```

#### Events 

- This is the markup for a confirm dialog component with an on-opened event, executed when the confirm dialog is displayed.

```javascript
<wm-confirmdialog on-opened="confirmdialogOpened($event, widget)" name="confirmdialog"></wm-confirmdialog>
```

```javascript
Page.confirmdialogOpened = function ($event, widget) {
  // Example: Customize the confirm dialog message based on a service variable
  let isRegistrationEnabled = App.Variables.svGetWorkspaceSettings.dataSet.registrationEnabled;

  widget.message = isRegistrationEnabled
    ? "Are you sure you want to disable user registration for this workspace?"
    : "Are you sure you want to enable user registration for this workspace?";
};
```

- This is the markup for a confirm dialog with an on-ok event, executed when the OK button is clicked, where both a direct action to close the dialog and a handler function can be invoked together to perform additional logic.

```javascript
<wm-confirmdialog on-ok="Widgets.confirmdialog.close();confirmdialogOk($event, widget)" name="confirmdialog"></wm-confirmdialog>
```

```javascript
Page.confirmdialogOk = function ($event, widget) {
  // Example: Toggle the registration state based on the current value
  var isRegistrationEnabled = !App.Variables.svGetWorkspaceSettings.dataSet.registrationEnabled;

  // Set the updated registration flag as input for the update service
  Page.Variables.svUpdateWorkspaceSettings.setInput("registrationEnabled", isRegistrationEnabled);

  // Invoke the service to persist the updated workspace settings
  Page.Variables.svUpdateWorkspaceSettings.invoke();
};
```

#### Methods

- This method opens the confirm dialog programmatically.

```javascript
// Open the confirm dialog and display it to the user
Page.Widgets.confirmdialog.open();
```

- This method closes the confirm dialog programmatically.

```javascript
// Close the confirm dialog and hide it from the user
Page.Widgets.confirmdialog.close();
```