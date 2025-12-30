# Styling

The Dialog component can be styled using CSS classes to customize its appearance.

## Dialog Container
- `.app-dialog` - Targets the entire dialog container
- `.modal-dialog` - Applied when the dialog is set to modal mode
- `.app-dialog-heading` - Targets the dialog header section
- `.app-dialog-body` - Targets the main content area of the dialog
- `.app-dialog-footer` - Targets the bottom section of the dialog where action buttons are typically placed

## Dialog Buttons
- `.app-button-cancel` - Styles the cancel button in the dialog
- `.app-button-save` - Styles the save/confirm button in the dialog

## Animation Classes
- `.animation-{type}` - Where {type} is the animation style specified in the animation property

## Custom Dialog Styling Example

```css
/* Customize dialog appearance */
.app-dialog.MyCustomDialog {
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Style dialog header */
.app-dialog.MyCustomDialog .app-dialog-heading {
    background-color: #4CAF50;
    color: white;
    padding: 15px;
}

/* Style dialog buttons */
.app-dialog.MyCustomDialog .app-button-save {
    background-color: #4CAF50;
    color: white;
}

.app-dialog.MyCustomDialog .app-button-cancel {
    background-color: #f44336;
    color: white;
}
```