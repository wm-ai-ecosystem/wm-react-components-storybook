# Callback Events

The Login component typically provides the following callback events for integration and customization:

| Event | Description |
|-------|-------------|
| `onBeforeSubmit` | Triggered before login form submission, allows for pre-submission validation or data modification |
| `onSubmit` | Triggered when the login form is submitted |
| `onLoginSuccess` | Triggered when authentication is successful |
| `onLoginFailure` | Triggered when authentication fails |
| `onValidationError` | Triggered when form validation fails |
| `onForgotPassword` | Triggered when the forgot password link is clicked |
| `onRegister` | Triggered when the registration link is clicked |
| `onRememberMeChange` | Triggered when the remember me checkbox state changes |
| `onCaptchaComplete` | Triggered when CAPTCHA verification is completed |
| `onSessionTimeout` | Triggered when an existing session times out |

## Event Usage Example

```javascript
// Handle login success event
Page.Widgets.loginComponent.onLoginSuccess = function(response) {
    // Store authentication token
    localStorage.setItem('auth_token', response.token);
    // Redirect to user-specific page
    navigateTo(response.userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard');
};

// Handle login failure event
Page.Widgets.loginComponent.onLoginFailure = function(error) {
    // Display custom error notification
    App.notify({
        message: "Login failed: " + error.message,
        type: "error"
    });
    // Log the error
    console.error("Authentication failed:", error);
};
```