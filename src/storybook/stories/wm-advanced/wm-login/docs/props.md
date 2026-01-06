# Props

Although the Login component doesn't have directly defined props in the provided data, it typically supports the following configuration options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `authMethod` | String | "local" | Authentication method to use (local, oauth, saml, etc.) |
| `redirectUrl` | String | "/dashboard" | URL to redirect after successful login |
| `rememberMe` | Boolean | true | Enable/disable remember me functionality |
| `usernameLabel` | String | "Username" | Label for the username field |
| `passwordLabel` | String | "Password" | Label for the password field |
| `submitLabel` | String | "Sign In" | Label for the submit button |
| `forgotPasswordUrl` | String | "/forgot-password" | URL for forgot password link |
| `registrationUrl` | String | "/register" | URL for new user registration |
| `maxAttempts` | Number | 5 | Maximum login attempts before lockout |
| `captchaEnabled` | Boolean | false | Enable CAPTCHA after failed attempts |

## Common Use Cases

#### Basic Login Configuration
```javascript
// Configure basic login settings
Page.Widgets.loginComponent.authMethod = "local";
Page.Widgets.loginComponent.redirectUrl = "/welcome";
Page.Widgets.loginComponent.rememberMe = true;
```

#### Custom Field Labels
```javascript
// Set custom form labels
Page.Widgets.loginComponent.usernameLabel = "Email Address";
Page.Widgets.loginComponent.passwordLabel = "Password";
Page.Widgets.loginComponent.submitLabel = "Log In";
```

#### OAuth Integration
```javascript
// Configure OAuth provider
Page.Widgets.loginComponent.authMethod = "oauth";
Page.Widgets.loginComponent.oauthProvider = "google";
Page.Widgets.loginComponent.clientId = "your-client-id";
Page.Widgets.loginComponent.scope = "email profile";
```