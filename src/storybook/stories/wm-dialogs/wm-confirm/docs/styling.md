# Styling

The confirm-dialog component uses standard dialog styling conventions but can be customized to match your application's design requirements.

## Custom Styling

You can target the confirm-dialog component and its internal elements with CSS:

```css
/* Style the dialog container */
.confirm-dialog {
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* Style the dialog header */
.confirm-dialog .modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
}

/* Style the confirmation button */
.confirm-dialog .btn-primary {
  background-color: #dc3545;
  border-color: #dc3545;
}

/* Style the cancel button */
.confirm-dialog .btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}
```

## Icon Styling

When using the `iconclass` property, you can apply any Font Awesome or custom icon classes to enhance the visual appearance of your dialog:

```javascript
// Warning icon
Page.Widgets.myConfirmDialog.iconclass = "fa fa-exclamation-circle text-warning fa-2x";

// Danger/delete icon
Page.Widgets.myConfirmDialog.iconclass = "fa fa-trash text-danger fa-2x";

// Info icon
Page.Widgets.myConfirmDialog.iconclass = "fa fa-info-circle text-info fa-2x";
```

The `iconclass` property allows you to leverage your icon library of choice and apply additional styling directly through class names.