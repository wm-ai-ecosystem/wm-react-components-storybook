# Overview

The **Form** component is used to collect and manage user input in a structured way. It can include fields such as text, email, date, dropdowns, checkboxes, and more, with built-in support for validation and data submission.

To create a form, you typically start with a dataset, which can come from APIs, Java services, or database services. You can also create a form without a ready dataset by using a model variable, allowing you to design and plan the form structure before connecting it to real data.

### Markup

```javascript
<wm-form errormessage="" captionposition="floating" title="" enctype="application/x-www-form-urlencoded"
    itemsperrow="xs-1 sm-1 md-1 lg-1" method="post" dataset="bind:Variables.stvContactDetails.dataSet"
    captionalign="left" name="form">
    <wm-container direction="row" alignment="top-left" wrap="true" width="fill" columns="1" name="container2"
        class="app-container-default" variant="default">
        <wm-form-field readonly="false" name="name" displayname="Name" key="name" type="string" show="true"
            widget="text" variant="standard"></wm-form-field>
        <wm-form-field readonly="false" name="email" displayname="Email" key="email" type="string" show="true"
            widget="text" variant="standard"></wm-form-field>
        <wm-form-field readonly="false" name="mobile" displayname="Mobile" key="mobile" type="string" show="true"
            widget="number" textalign="right" variant="standard"></wm-form-field>
        <wm-form-field readonly="false" name="desc" displayname="Description" key="desc" type="string" show="true"
            widget="textarea" variant="standard"></wm-form-field>
    </wm-container>
    <wm-form-action key="reset" class="form-reset btn-default btn-filled" iconclass="wi wi-refresh" display-name="Reset"
        type="reset"></wm-form-action>
    <wm-form-action key="save" class="form-save btn-primary btn-filled" iconclass="wi wi-save" display-name="Save"
        type="submit"></wm-form-action>
</wm-form>
```

### Examples

#### Properties 

- Access individual form fields inside a form and programmatically show or hide them.

```javascript
// 1. Using the form input component name
Page.Widgets.form.formWidgets.name.show = true;

// 2. Using the mapped field name (defined in Form Advanced Settings → Fields tab)
Page.Widgets.form.formfields.name.show = true;
```

- Access form output.

```javascript
//This property returns an object containing the current values of all form fields.
Page.Widgets.form.dataoutput;
```

#### Events 

- Validate or modify data before submitting the form.

```javascript
Page.formBeforesubmit = function ($event, widget, $data) {
    function isValidData($data) {
            /*restrict password to be minimum of 6 characters*/
            if ($data.password) {
                if ($data.password.length < 6) {
                    return {
                        'error': "Password too small"
                    };
                }
            } else {
                return {
                    'error': "Password field required"
                };
            }
        }
        return isValidData($data)
};
```

#### Methods 

- Reset the form fields to their initial values.

```javascript
    Page.Widgets.form.reset();
```

- Submit the form programmatically.

```javascript
    Page.Widgets.form.submit();
```

- Validate the form and highlight any invalid or required fields.

```javascript
    Page.Widgets.form.highlightInvalidFields();
```