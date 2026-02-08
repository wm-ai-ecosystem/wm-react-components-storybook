# Overview

The **Alert Dialog** is a modal dialog used to show important messages that require the user’s attention. It temporarily stops the user’s current activity to display critical information such as errors, warnings, confirmations, or important system messages.

### Markup

```javascript
<wm-alertdialog name="alertdialog" class="modal-dialog modal-xs" 
on-ok="Widgets.alertdialog.close()" variant="default:xs"></wm-alertdialog>
```

### Examples

#### Properties 

- Sets the message displayed inside the alert dialog.

```javascript
Page.Widgets.alertdialog.message = "I am an alert box!";
```

- Sets the type of alert to control the icon and visual emphasis.

```javascript
Page.Widgets.alertdialog.alerttype = "info";
Page.Widgets.alertdialog.iconclass = "wi wi-info-outline";
```

#### Events 

- Triggered on alert dialog open.

```javascript
Page.alertdialogOpened = function ($event, widget) {
    // Check the role of the currently logged-in user
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

- Triggered on click of OK for alert dialog.

```javascript
Page.alertdialogOk = function ($event, widget) {
    // Only proceed if the logged-in user is ADMIN
    if (App.Variables.loggedInUser.dataSet.role === "ADMIN") {
        // Invoke a service variable to perform the critical action (e.g., delete a record)
        Page.Variables.svDeleteRecord.invoke();
    } else {
        // Do nothing for non-admin users; alert simply closes
    }
};
```

#### Methods

- Opens the alert dialog.

```javascript
Page.Widgets.alertdialog.open();
```

- Closes the alert dialog.

```javascript
Page.Widgets.alertdialog.close();
```