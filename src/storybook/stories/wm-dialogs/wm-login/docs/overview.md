# Overview

The **Login Dialog** is a modal popup used to authenticate users within the application. It displays login fields in a reusable, customizable interface and supports events such as onSuccess, onError, and onClose to handle login outcomes. This dialog can be triggered programmatically and dismissed by the user.

### Markup

```javascript
<wm-logindialog modal="false" caption="Login" iconclass="wi wi-sign-in" name="logindialog" class="modal-dialog modal-xs"
    variant="default:xs">
    <wm-form errormessage="" captionposition="top" name="form">
        <wm-message scopedataset="loginMessage" class="app-login-dialog-message" name="message"></wm-message>
        <wm-composite name="composite4">
            <wm-label caption="Username" class="col-md-3 control-label" name="labelUserName"></wm-label>
            <wm-container class="col-md-9" name="container3">
                <wm-text placeholder="Enter username" class="app-login-dialog-username" name="j_username"
                    updateon="default"></wm-text>
            </wm-container>
        </wm-composite>
        <wm-composite name="composite5">
            <wm-label caption="Password" class="col-md-3 control-label" name="labelPassword"></wm-label>
            <wm-container class="col-md-9" name="container4">
                <wm-text type="password" placeholder="Enter password" class="app-login-dialog-password"
                    name="j_password" updateon="default"></wm-text>
            </wm-container>
        </wm-composite>
    </wm-form>
    <wm-dialogactions name="dialogactions">
        <wm-button class="btn-primary btn-filled" caption="Sign in" data-role="loginbutton" name="buttonLogin">
        </wm-button>
    </wm-dialogactions>
</wm-logindialog>
```

### Examples

#### Properties 

- This login dialog has a configurable title property that controls the text shown in the dialog header. The title can be set in the markup or updated dynamically via script.

```javascript
<wm-logindialog title="Session Expired – Please Log In Again" name="logindialog"></wm-logindialog>
```

```javascript
// Set the title of the login dialog to indicate session expiration
Page.Widgets.logindialog.title = "Session Expired – Please Log In Again";
```

#### Events 

- This is the markup for a login dialog with an on-opened event, executed when the login dialog is displayed.

```javascript
<wm-logindialog on-opened="logindialogOpened($event, widget)" name="logindialog"></wm-logindialog>
```

```javascript
Page.logindialogOpened = function ($event, widget) {
  // Example: Show a message explaining why the login dialog was opened
  Page.Widgets.message.caption = "Your session has expired. Please log in again to continue.";

  // Example: Pre-fill the username field using data from a previous session
  Page.Widgets.j_username.datavalue = localStorage.getItem("lastLoggedInUser") || "";
};
```

- This is the markup for a login dialog with an on-success event, executed when the user logs in successfully.

```javascript
<wm-logindialog on-success="logindialogSuccess($event, widget)" name="logindialog"></wm-logindialog>
```

```javascript
Page.logindialogSuccess = function ($event, widget) {
  // Example: Invoke a service or variable to fetch details of the logged-in user
  App.Variables.svGetLoggedInUserDetails.invoke();

  // Close the login dialog after successful authentication
  Page.Widgets.logindialog.close();

  // Additional post-login logic can be added here
  // For example: navigate to a dashboard or display a welcome message
};
```

#### Methods

- This method opens the login dialog programmatically.

```javascript
// Open the login dialog and display it to the user
Page.Widgets.logindialog.open();
```

- This method closes the login dialog programmatically.

```javascript
// Close the login dialog and hide it from the user
Page.Widgets.logindialog.close();
```