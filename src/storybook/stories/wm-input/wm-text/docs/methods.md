# Methods

The Text component can be accessed in scripts using the Page.Widgets namespace:

```javascript
Page.Widgets.myTextInput
```

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| focus | none | void | Sets focus to the input field |
| blur | none | void | Removes focus from the input field |
| clear | none | void | Clears the input value |
| reset | none | void | Resets the input to its default value |
| setValidationMessage | message: string, key: string | void | Sets a custom validation message |

## Common Use Cases

#### Focus Management
```javascript
// Focus on the input field
Page.Widgets.emailInput.focus();

// Remove focus and trigger blur event
Page.Widgets.emailInput.blur();
```

#### Value Manipulation
```javascript
// Clear the input
Page.Widgets.searchInput.clear();

// Reset to default value
Page.Widgets.userInput.reset();
```

#### Custom Validation
```javascript
// Set custom validation message
Page.Widgets.passwordInput.setValidationMessage("Password must include special characters", "password-format");
```