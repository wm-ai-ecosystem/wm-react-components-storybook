# Overview

**Login** component can be used to display a pre-built Login section with a sign in button, username, and password fields. It also provides the option to remember the password.

### Markup

```javascript
<wm-login name="login">
    <wm-form name="form1">
        <wm-composite name="composite1">
            <wm-label class="col-md-12 control-label p" caption="Username" name="label1" variant="default:p"></wm-label>
            <wm-container class="col-md-12 app-container-default" name="container1" variant="default">
                <wm-text placeholder="Enter username" name="j_username" class="app-login-username" updateon="default"
                    required="true" variant="standard"></wm-text>
            </wm-container>
        </wm-composite>
        <wm-composite name="composite2">
            <wm-label class="col-md-12 control-label p" caption="Password" name="label2" variant="default:p"></wm-label>
            <wm-container class="col-md-12 app-container-default" name="container2" variant="default">
                <wm-text type="password" name="j_password" placeholder="Enter password" class="app-login-password"
                    updateon="default" required="true" variant="standard">
                </wm-text>
            </wm-container>
        </wm-composite>
        <wm-button type="submit" caption="Sign in" width="100%" class="btn-filled btn-default" name="button1"
            variant="filled:default"></wm-button>
        <wm-composite name="composite3">
            <wm-checkbox class="app-login-rememberme" scopedatavalue="user.rememberMe" caption="Remember Me"
                name="j_rememberme" variant="standard"></wm-checkbox>
        </wm-composite>
    </wm-form>
</wm-login>
```

### Examples

#### Properties 

- Sets a static error message on the Login component.

```javascript
Page.Widgets.login.errormessage = "Login failed. Please try again";
```

#### Events 

- Triggered when login fails.

```javascript
Page.loginError = function ($event, widget) {
    //You can display the error message returned by the API or a custom message.

    // Display a static error message
    widget.loginMessage.caption = "Login failed. Please try again";
};
```

- Triggered when login succeeds.

```javascript
Page.loginSuccess = function ($event, widget) {
    // Fetch logged-in user details after successful login
    App.Variables.svGetLoggedInUserDetails.invoke();

    // Optional: Redirect to another page or perform additional actions
    App.Actions.goToPage_Home.invoke();
};
```