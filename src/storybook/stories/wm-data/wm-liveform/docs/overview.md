# Overview

The **Live Form** component is a dynamic data-entry form used to create, view, and update database records. It can be bound to database CRUD variables, allowing data to be saved, updated, or retrieved through auto-generated REST APIs. The form provides built-in support for validation, submission, and responsive layouts.

### Markup

```javascript
<wm-liveform errormessage="" title="Employee Info" iconclass="wi wi-edit" itemsperrow="xs-3 sm-3 md-3 lg-3"
    defaultmode="Edit" dataset="bind:Variables.HrdbEmployeeData.dataSet" captionalign="left" captionposition="floating"
    name="liveform">
    <wm-container direction="row" alignment="top-left" wrap="true" width="fill" columns="3" name="container3"
        class="app-container-default" variant="default">
        <wm-form-field name="username" displayname="Username" required="false" show="true" generator="assigned"
            primary-key="false" key="username" type="string" is-related="false" maxchars="255" pc-display="true"
            mobile-display="true" tablet-display="true" widget="text" variant="standard"></wm-form-field>
        <wm-form-field name="department" displayname="Department" required="false" show="true" generator="assigned"
            primary-key="false" key="department" type="list" is-related="true" pc-display="true" mobile-display="true"
            tablet-display="true" widget="select" variant="standard"></wm-form-field>
        <wm-form-field name="role" displayname="Role" required="false" show="true" generator="assigned"
            primary-key="false" key="role" type="string" is-related="false" maxchars="255" pc-display="true"
            mobile-display="true" tablet-display="true" widget="text" variant="standard"></wm-form-field>
    </wm-container>
    <wm-form-action key="reset" class="form-reset btn-default" iconclass="wi wi-refresh" action="reset()"
        display-name="Reset" show="true" type="button" update-mode="true"></wm-form-action>
    <wm-form-action key="save" class="form-save btn-success" iconclass="wi wi-save" display-name="Save" show="true"
        type="submit" update-mode="true"></wm-form-action>
</wm-liveform>
```

### Examples

#### Properties 

- This live form displays input fields, which can be configured directly in the markup or accessed and updated dynamically via script.

```javascript
<wm-liveform errormessage="" title="Employee Info" iconclass="wi wi-edit" itemsperrow="xs-3 sm-3 md-3 lg-3"
    defaultmode="Edit" dataset="bind:Variables.HrdbEmployeeData.dataSet" captionalign="left" captionposition="floating"
    name="liveform">
    <wm-container direction="row" alignment="top-left" wrap="true" width="fill" columns="3" name="container3"
        class="app-container-default" variant="default">
        <wm-form-field name="username" displayname="Username" show="true" primary-key="false" generator="assigned"
            placeholder="Enter text" required="false" type="string" key="username" widget="text" maxchars="255"
            inputtype="text" variant="standard"></wm-form-field>
    </wm-container>
</wm-liveform>
```

```javascript
// 1. Show the input field using its component name
Page.Widgets.liveform.formWidgets.username.show = true;

// 2. Show the input field using its mapped name (set in the live form's Advanced Settings → Fields tab)
Page.Widgets.liveform.formfields.username.show = true;
```

- This live form assigns default values to its input fields, which can be set directly in the markup or updated dynamically via script. Before setting formdata, the live form must be bound to a database variable dataset, and the JSON structure should match the dataset, either using the same dataset with values or a different dataset.

```javascript
<wm-liveform
  dataset="bind:Variables.HrdbEmployeeData.dataSet"
  formdata="bind:Variables.HrdbEmployeeData.firstRecord"
  name="liveform"
></wm-liveform>
```

```javascript
// Set default values for all live form fields dynamically
Page.Widgets.liveform.formdata = Page.Variables.HrdbEmployeeData.firstRecord;

// Access the current values of all live form fields
// Page.Widgets.liveform.dataoutput;
```

#### Events 

- This is the markup for a live form with an on-beforeservicecall event, executed before any service operation (INSERT, UPDATE, or DELETE) is performed.

```javascript
<wm-liveform on-beforeservicecall="liveformBeforeservicecall($event, $operation, $data, options)" name="liveform"></wm-liveform>
```

```javascript
Page.liveformBeforeservicecall = function ($event, $operation, $data, options) {
  // $operation contains the current service operation: INSERT, UPDATE, or DELETE
  // $data contains the current values of all components inside the Live-Form
  // This $data can be modified or validated before sending the request

  // Example validation: Ensure password is at least 6 characters long
  function isValidData(data) {
    if ($data.password) {
      if ($data.password.length < 6) {
        return false; // Invalid data, stop the service call
      }
    } else {
      return false; // Invalid if password is missing
    }
    return true; // Data is valid
  }

  return isValidData($data);
};
```

#### Methods 

- This method resets all input fields in the live form to their initial values, restoring the default state of the live form.

```javascript
// Reset all live form fields to their initial/default values
Page.Widgets.liveform.reset();
```

- This method updates the current record bound to the live form, sending the modified data to the underlying database.

```javascript
// Save the changes made in the live form to update the current record
Page.Widgets.liveform.save();
```

- This method adds a new record to the dataset bound to the live form, initializing the form fields for the new entry. 

```javascript
// Add a new record to the dataset bound to the live form and initialize the form fields
Page.Widgets.liveform.new();
```

- This method cancels the current edit operation in the live form, discarding any unsaved changes.

```javascript
// Cancel the current live form edit, discarding any unsaved changes
Page.Widgets.liveform.cancel();
```

- This method deletes the current record bound to the live form, removing it from the underlying database.

```javascript
// Delete the currently bound record in the live form
Page.Widgets.liveform.delete();
```