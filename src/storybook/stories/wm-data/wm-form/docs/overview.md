# Overview

The **Form** component is used to collect and manage user input in a structured way. It can include fields such as text, email, date, dropdowns, checkboxes, and more, with built-in support for validation and data submission.

To create a form, you typically start with a dataset, which can come from APIs, Java services, or database services. You can also create a form without a ready dataset by using a model variable, allowing you to design and plan the form structure before connecting it to real data.

### Markup

```javascript
<wm-form errormessage="" captionposition="top" title="Form" enctype="application/x-www-form-urlencoded"
    itemsperrow="xs-2 sm-2 md-2 lg-2" method="post" dataset="bind:Variables.stvUserDetails.dataSet" captionalign="left"
    name="form">
    <wm-container direction="row" alignment="top-left" wrap="true" width="fill" columns="2" name="container2"
        class="app-container-default" variant="default">
        <wm-form-field readonly="false" name="firstName" displayname="First Name" key="firstName" type="string"
            show="true" widget="text" variant="standard"></wm-form-field>
        <wm-form-field readonly="false" name="lastName" displayname="Last Name" key="lastName" type="string" show="true"
            widget="text" variant="standard"></wm-form-field>
        <wm-form-field readonly="false" name="email" displayname="Email" key="email" type="string" show="true"
            widget="text" variant="standard" inputtype="email"></wm-form-field>
        <wm-form-field readonly="false" name="phone" displayname="Phone" key="phone" type="string" show="true"
            widget="text" variant="standard" inputtype="number"></wm-form-field>
        <wm-form-field readonly="false" name="gender" displayname="Gender" key="gender" type="string" show="true"
            widget="switch" variant="standard" dataset="Male, Female"></wm-form-field>
        <wm-form-field readonly="false" name="country" displayname="Country" key="country" type="string" show="true"
            widget="select" variant="standard"></wm-form-field>
        <wm-form-field readonly="false" name="city" displayname="City" key="city" type="string" show="true"
            widget="text" variant="standard"></wm-form-field>
        <wm-form-field readonly="false" name="subscribeNewsletter" displayname="Subscribe Newsletter"
            key="subscribeNewsletter" type="string" show="true" widget="toggle" variant="standard">
        </wm-form-field>
    </wm-container>
    <wm-form-action key="reset" class="form-reset btn-default btn-filled" iconclass="wi wi-refresh" display-name="Reset"
        type="reset"></wm-form-action>
    <wm-form-action key="save" class="form-save btn-primary btn-filled" iconclass="wi wi-save" display-name="Save"
        type="submit"></wm-form-action>
</wm-form>
```

### Examples

#### Properties 

- This form displays input fields, which can be configured directly in the markup or accessed and updated dynamically via script.

```javascript
<wm-form errormessage="" captionposition="top" title="Form" enctype="application/x-www-form-urlencoded"
    itemsperrow="xs-2 sm-2 md-2 lg-2" method="post" dataset="bind:Variables.stvUserDetails.dataSet" captionalign="left"
    name="form">
    <wm-container direction="row" alignment="top-left" wrap="true" width="fill" columns="2" name="container2"
        class="app-container-default" variant="default">
        <wm-form-field name="firstName" displayname="First Name" show="true" placeholder="Enter text" type="string"
            key="firstName" widget="text" inputtype="text" readonly="false" variant="standard"></wm-form-field>
    </wm-container>
</wm-form>
```

```javascript
// 1. Show the input field using its component name
Page.Widgets.form.formWidgets.firstName.show = true;

// 2. Show the input field using its mapped name (set in the Form's Advanced Settings → Fields tab)
Page.Widgets.form.formfields.firstName.show = true;
```

- This form assigns default values to its input fields, which can be set directly in the markup or updated dynamically via script. Before setting formdata, the Form must be bound to a dataset, and the JSON structure should match the dataset, either using the same dataset with values or a different dataset.

```javascript
<wm-form
  dataset="bind:Variables.stvUserDetails.dataSet"
  formdata="bind:Variables.stvDefaultUserDetails.dataSet"
  name="form"
></wm-form>
```

```javascript
// Set default values for all form fields dynamically
Page.Widgets.form.formdata = Page.Variables.stvDefaultUserDetails.dataSet;

// Access the current values of all form fields
// Page.Widgets.form.dataoutput;
```

#### Events 

- This is the markup for a form with an on-beforesubmit event, executed before the form is submitted.

```javascript
<wm-form on-beforesubmit="formBeforesubmit($event, widget, $data)" name="form"></wm-form>
```

```javascript
Page.formBeforesubmit = function ($event, widget, $data) {
  // $data contains the current values of all input fields inside the Form
  // This $data can be modified or validated before submitting

  // Example validation: If the password is too short, show an error notification and prevent the form submission
  if ($data.password.length < 6) {
    // Assumes that the Notification Action "notificationAction" is already created
    Page.Actions.notificationAction.invoke({
      "class": "error",
      "message": "Password too small",
      "position": "center center"
    });

    return false; // Stop the form submission
  }
};
```

#### Methods 

- This method resets all input fields in the Form to their initial values, restoring the default state of the form.

```javascript
// Reset all Form fields to their initial/default values
Page.Widgets.form.reset();
```

- This method can be used if form is to be submitted from outside of the form.

```javascript
//Submit the Form programmatically from outside the Form
Page.Widgets.form.submit();
```

- This method validates the Form and highlights any invalid or required fields for the user.

```javascript
// Validate the Form and highlight invalid or required fields
Page.Widgets.form.highlightInvalidFields();
```

- This method removes the success/error message on the form.

```javascript
// Remove all success or error messages from the form.
Page.Widgets.form.clearMessage();
```

#### Sample Form Dataset

- This is the markup for a Form component bound to a sample user dataset, containing input fields for capturing user details, with support for default values and programmatic updates via script.

```javascript
<wm-form dataset="bind:Variables.stvUserDetails.dataSet" name="form"></wm-form>
```

```javascript
// Sample dataset for the Form component, containing default values for user details
let userDetails = {
  "firstName": "",
  "lastName": "",
  "email": "",
  "phone": "",
  "gender": "",
  "country": "",
  "city": "",
  "subscribeNewsletter": false
}
```