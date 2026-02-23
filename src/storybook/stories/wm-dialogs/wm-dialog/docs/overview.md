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
    <wm-dialogactions name="dialogactions1">
        <wm-button class="btn-primary btn-filled" caption="Close" on-click="closeDialog()" name="button1">
        </wm-button>
    </wm-dialogactions>
</wm-dialog>
```

### Examples

#### Properties 

- This is the markup for a dialog that displays a combined string as the dialog title using dynamic data from other components, such as a selected item from a list, which can be set either in the markup or dynamically via script.

```javascript
<wm-dialog title="bind:Widgets.listArtifactsForSpace.selecteditem.title + &quot; - &quot; + &quot;Thumbnail Image&quot;" dialogtype="design-dialog" name="dialog"></wm-dialog>
```

```javascript
// Set the dialog title dynamically by combining selected item data with static text
Page.Widgets.dialog.title = Page.Widgets.listArtifactsForSpace.selecteditem.title + " - " + "Thumbnail Image";
```

#### Events 

- This is the markup for a dialog with an on-opened event, executed when the dialog is opened, either by invoking a direct action in the markup (such as calling a variable) or by handling the event through a handler function to perform additional logic when the dialog is displayed.

```javascript
<wm-dialog on-opened="Variables.svGetDomainDetails.invoke()" dialogtype="design-dialog" name="dialog"></wm-dialog>
```

```javascript
<wm-dialog on-opened="dialogOpened($event, widget)" dialogtype="design-dialog" name="dialog"></wm-dialog>
```

```javascript
Page.dialogOpened = function ($event, widget) {
  // Example: Dynamically set form validators inside the dialog
  // The dialog contains a form component with input fields, and validators are applied at runtime

  var VALIDATOR = App.getDependency('CONSTANTS').VALIDATOR;

  Page.Widgets.domainSettingsForm.formWidgets.domainUrl.setValidators([
    {
      type: VALIDATOR.REQUIRED,
      validator: true,
      errorMessage: "Please enter the domain url",
    },
    {
      type: VALIDATOR.REGEXP,
      validator: /^[A-Za-z](?:[A-Za-z0-9\-]*[A-Za-z0-9])?$/,
      errorMessage: "Use letters, numbers, or hyphens. Must start with a letter, no ending hyphen, no spaces",
    },
  ]);
};
```

#### Methods

- This method opens the dialog programmatically.

```javascript
// Open the dialog and display it to the user
Page.Widgets.dialog.open();
```

- This method closes the dialog programmatically.

```javascript
// Close the dialog and hide it from the user
Page.Widgets.dialog.close();
```