# Overview

The **Login Dialog** is a modal popup used to authenticate users within the application. It displays login fields in a reusable, customizable interface and supports events such as onSuccess, onError, and onClose to handle login outcomes. This dialog can be triggered programmatically and dismissed by the user.

### Markup

```javascript
<wm-logindialog modal="false" caption="Login" iconclass="wi wi-sign-in" name="logindialog" class="modal-dialog modal-xs"
    variant="default:xs">
    <wm-form errormessage="" captionposition="top" name="form1">
        <wm-message scopedataset="loginMessage" class="app-login-dialog-message" name="message"></wm-message>
        <wm-composite name="composite1">
            <wm-label caption="Username" class="col-md-3 control-label" name="label1"></wm-label>
            <wm-container class="col-md-9" name="container1">
                <wm-text placeholder="Enter username" class="app-login-dialog-username" name="j_username"
                    updateon="default"></wm-text>
            </wm-container>
        </wm-composite>
        <wm-composite name="composite2">
            <wm-label caption="Password" class="col-md-3 control-label" name="label2"></wm-label>
            <wm-container class="col-md-9" name="container2">
                <wm-text type="password" placeholder="Enter password" class="app-login-dialog-password"
                    name="j_password" updateon="default"></wm-text>
            </wm-container>
        </wm-composite>
    </wm-form>
    <wm-dialogactions name="dialogactions1">
        <wm-button class="btn-primary btn-filled" caption="Sign in" data-role="loginbutton" name="button3">
        </wm-button>
    </wm-dialogactions>
</wm-logindialog>
```

### Examples

#### Properties 

- Sets the title displayed for the login dialog.

```javascript
// Set the title of the login dialog to indicate session expiration
Page.Widgets.logindialog.title = "Session Expired – Please Log In Again";
```

- Controls the animation used when the iframe dialog appears.

```javascript
Page.Widgets.dialog.animation = "fadeIn";
```

#### Events 

- Triggered on login dialog open.

```javascript
Page.logindialogOpened = function ($event, widget) {
    // Display a contextual message if the user was redirected due to session expiration
    Page.Widgets.message.caption = "Your session has expired. Please log in again to continue.";

    // Optionally, prefill the username from local storage or previous session
    Page.Widgets.j_username.datavalue = localStorage.getItem("lastLoggedInUser") || "";
};
```

- Triggered when login succeeds.

```javascript
Page.logindialogSuccess = function ($event, widget) {
    // Fetch logged-in user details after successful login
    App.Variables.svGetLoggedInUserDetails.invoke();

     // Close the login dialog after successful authentication
    Page.Widgets.logindialog.close();

     // Optional: You can add additional post-login logic here, 
    // such as navigating to a dashboard or showing a welcome message
};
```

#### Methods

- Opens the login dialog.

```javascript
Page.Widgets.logindialog.open();
```

- Closes the login dialog.

```javascript
Page.Widgets.logindialog.close();
```