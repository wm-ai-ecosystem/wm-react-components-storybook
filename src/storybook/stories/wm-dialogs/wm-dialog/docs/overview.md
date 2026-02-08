# Overview

The **Design Dialog** is a flexible dialog component that appears on top of the application to display or collect additional information from the user. It provides a predefined structure with configurable content and action buttons, and supports both editable and read-only fields. The dialog can be customized to suit different use cases, ranging from simple information display to structured user input.

### Markup

```javascript
<wm-dialog dialogtype="design-dialog" modal="true" title="Information" iconclass="wi wi-file-text" name="dialog"
    class="modal-dialog modal-xs" variant="default:xs">
    <wm-container direction="row" alignment="top-left" width="fill" gap="16" wrap="true" columngap="250"
        name="container1">
        <wm-label padding="unset 0.5em" caption="Name" name="label1"></wm-label>
        <wm-label padding="unset 0.5em" caption="Eric" name="label2"></wm-label>
        <wm-label padding="unset 0.5em" caption="Title" name="label3"></wm-label>
        <wm-label padding="unset 0.5em" caption="Engineer" name="label4"></wm-label>
    </wm-container>
    <wm-dialogactions name="dialogactions">
        <wm-button class="btn-primary btn-filled" caption="Close" on-click="closeDialog()" name="button3">
        </wm-button>
    </wm-dialogactions>
</wm-dialog>
```

### Examples

#### Properties 

- Sets the title displayed for the dialog.

```javascript
Page.Widgets.dialog.title = "S3 Bucket Configuration";
```

- Controls the animation used when the dialog appears.

```javascript
Page.Widgets.dialog.animation = "pulse";
```

#### Events 

- Triggered on dialog open.

```javascript
Page.dialogOpened = function ($event, widget) {
    // Setting form validators on dialog open. 
    // The dialog contains a form component with input fields, and validators are applied dynamically at runtime.
    
    Page.Widgets.domainSettingsForm.formWidgets.domainUrl.setValidators([{
        type: VALIDATOR.REQUIRED,
        validator: true,
        errorMessage: "Please enter the domain url"
    },
    {
        type: VALIDATOR.REGEXP,
        validator: /^[A-Za-z](?:[A-Za-z0-9\-]*[A-Za-z0-9])?$/,
        errorMessage: "Use letters, numbers, or hyphens. Must start with a letter, no ending hyphen, no spaces"
    }
    ]);
};
```

#### Methods

- Opens the confirm dialog.

```javascript
Page.Widgets.dialog.open();
```

- Closes the confirm dialog.

```javascript
Page.Widgets.dialog.close();
```