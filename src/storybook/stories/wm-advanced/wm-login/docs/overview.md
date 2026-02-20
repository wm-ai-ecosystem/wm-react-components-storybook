# Overview

**Login** component can be used to display a pre-built Login section with a sign in button, username, and password fields. It also provides the option to remember the password.

### Markup

```javascript
<wm-login name="login">
    <wm-form name="form">
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

- This login has a configurable errormessage property that determines the message displayed when login fails, which can be set in the markup or dynamically via script.

```javascript
<wm-login errormessage="Login failed. Please try again" name="login"></wm-login>
```

```javascript
// Set the error message for the login component dynamically
Page.Widgets.login.errormessage = "Login failed. Please try again";
```

#### Events 

- This is the markup for a login with an on-error event, executed when login fails.

```javascript
<wm-login on-error="loginError($event, widget)" name="login"></wm-login>
```

```javascript
Page.loginError = function ($event, widget) {
  //You can display the error message returned by the API or a custom message.

  // Display a static error message
  widget.loginMessage.caption = "Login failed. Please try again";
};
```

- This is the markup for a login with an on-success event, executed when login succeeds.

```javascript
<wm-login on-success="loginSuccess($event, widget)" name="login"></wm-login>
```

```javascript
Page.loginSuccess = function ($event, widget) {
  // Example: Fetch details of the logged-in user
  App.Variables.svGetLoggedInUserDetails.invoke();

  // Optional: Perform additional actions after successful login, e.g., navigate to the home page
  App.Actions.goToPage_Home.invoke();
};
```