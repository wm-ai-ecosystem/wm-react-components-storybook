# Methods

The Login component can be accessed in scripts via `Page.Widgets.loginComponent`. The following methods are typically available:

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `login()` | username, password | Promise | Programmatically attempts to log in with provided credentials |
| `logout()` | None | Promise | Logs out the current user |
| `resetForm()` | None | void | Clears all form fields and validation states |
| `validateForm()` | None | Boolean | Validates all form fields and returns validity status |
| `showPasswordResetForm()` | None | void | Displays the password reset interface |
| `enableCaptcha()` | None | void | Manually enables CAPTCHA verification |
| `getAuthenticationStatus()` | None | Object | Returns current authentication state |
| `setFieldError(fieldName, errorMsg)` | String, String | void | Manually sets an error for a specific field |
| `redirectToProvider(providerName)` | String | void | Redirects to specified OAuth/SAML provider |
| `cancelLogin()` | None | void | Cancels current login process and resets form |

## Common Method Use Cases

#### Programmatic Login
```javascript
// Perform programmatic login
Page.Widgets.loginComponent.login("username", "password")
    .then(function(response) {
        console.log("Login successful", response);
    })
    .catch(function(error) {
        console.error("Login failed", error);
    });
```

#### Validate Form Fields
```javascript
// Check form validity before submission
if (Page.Widgets.loginComponent.validateForm()) {
    // Form is valid, proceed with custom logic
    console.log("Form is valid");
} else {
    // Form has validation errors
    console.log("Please fix form errors");
}
```

#### Reset Form State
```javascript
// Clear form and validation states
Page.Widgets.loginComponent.resetForm();
```