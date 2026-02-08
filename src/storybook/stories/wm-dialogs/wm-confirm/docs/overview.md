# Overview

The **Confirm Dialog** is a modal dialog used to get confirmation from the user before performing an action. It presents two options, typically OK and Cancel, allowing users to either proceed or stop the action. It is commonly used to confirm operations such as deleting records or submitting irreversible changes.

### Markup

```javascript
<wm-confirmdialog name="confirmdialog" on-ok="Widgets.confirmdialog.close()" on-cancel="Widgets.confirmdialog.close()"
class="modal-dialog modal-xs" variant="default:xs"></wm-confirmdialog>
```

### Examples

#### Properties 

- Sets the message displayed inside the confirm dialog.

```javascript
Page.Widgets.confirmdialog.message = "I am confirm box!";
```

- Controls the animation used when the confirm dialog appears.

```javascript
Page.Widgets.confirmdialog.animation = "bounceIn";
```

#### Events 

- Triggered on confirm dialog open.

```javascript
Page.confirmdialogOpened = function ($event, widget) {
    // Read the current registration setting from the service variable
    let isRegistrationEnabled =
        App.Variables.svGetWorkspaceSettings.dataSet.registrationEnabled;

    // Update the confirm dialog message based on the current state
    widget.message = isRegistrationEnabled
        ? "Are you sure you want to disable user registration for this workspace?"
        : "Are you sure you want to enable user registration for this workspace?";
};
```

- Triggered on click of OK for confirm dialog.

```javascript
Page.confirmdialogOk = function ($event, widget) {
    // Determine the new registration state by toggling the current value
    var isRegistrationEnabled =
        !App.Variables.svGetWorkspaceSettings.dataSet.registrationEnabled;

    // Set the updated registration flag as input for the update service
    Page.Variables.svUpdateWorkspaceSettings.setInput("registrationEnabled", isRegistrationEnabled);

    // Invoke the service to persist the updated workspace settings
    Page.Variables.svUpdateWorkspaceSettings.invoke();
};
```

#### Methods

- Opens the confirm dialog.

```javascript
Page.Widgets.confirmdialog.open();
```

- Closes the confirm dialog.

```javascript
Page.Widgets.confirmdialog.close();
```