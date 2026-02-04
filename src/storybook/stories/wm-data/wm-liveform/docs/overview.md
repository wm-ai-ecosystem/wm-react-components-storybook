# Overview

The **Live Form** component is a dynamic data-entry form used to create, view, and update database records. It can be bound to database CRUD variables, allowing data to be saved, updated, or retrieved through auto-generated REST APIs. The form provides built-in support for validation, submission, and responsive layouts.

### Markup

```javascript
<wm-liveform errormessage="" title="User Info" iconclass="wi wi-edit" itemsperrow="xs-1 sm-1 md-1 lg-1"
    defaultmode="Edit" dataset="bind:Variables.HrdbUserData.dataSet" captionalign="left" captionposition="top"
    name="LiveForm">
    <wm-container direction="row" alignment="top-left" wrap="true" width="fill" columns="1" name="container1"
        class="app-container-default" variant="default">
        <wm-form-field name="username" displayname="Username" required="false" show="true" generator="assigned"
            primary-key="false" key="username" type="string" is-related="false" maxchars="20" pc-display="true"
            mobile-display="true" tablet-display="true" widget="text" variant="standard"></wm-form-field>
        <wm-form-field name="password" displayname="Password" required="false" show="true" generator="assigned"
            primary-key="false" key="password" type="string" is-related="false" maxchars="20" pc-display="true"
            mobile-display="true" tablet-display="true" widget="text" variant="standard"></wm-form-field>
        <wm-form-field name="role" displayname="Role" required="false" show="true" generator="assigned"
            primary-key="false" key="role" type="string" is-related="false" maxchars="20" pc-display="true"
            mobile-display="true" tablet-display="true" widget="text" variant="standard"></wm-form-field>
        <wm-form-field name="tenantId" displayname="Tenant Id" required="false" show="true" generator="assigned"
            primary-key="false" key="tenantId" type="integer" is-related="false" step="0" pc-display="true"
            mobile-display="true" tablet-display="true" widget="number" variant="standard"></wm-form-field>
    </wm-container>
    <wm-form-field name="userId" displayname="User Id" required="true" show="false" generator="identity"
        primary-key="true" key="userId" type="integer" is-related="false" step="0" pc-display="true"
        mobile-display="true" tablet-display="true" widget="number" variant="standard"></wm-form-field>
    <wm-form-action key="reset" class="form-reset btn-default" iconclass="wi wi-refresh" action="reset()"
        display-name="Reset" show="true" type="button" update-mode="true"></wm-form-action>
    <wm-form-action key="save" class="form-save btn-success" iconclass="wi wi-save" display-name="Save" show="true"
        type="submit" update-mode="true"></wm-form-action>
</wm-liveform>
```

### Examples

#### Properties 

- Access individual form fields inside a liveform and programmatically show or hide them.

```javascript
// 1. Using the form input component username
Page.Widgets.LiveForm.formWidgets.username.show = true;

// 2. Using the mapped field name (defined in Form Advanced Settings → Fields tab)
Page.Widgets.LiveForm.formfields.username.show = true;
```

- Access liveform output.

```javascript
//This property returns an object containing the current values of all form fields.
Page.Widgets.LiveForm.dataoutput;
```

#### Events 

- Validate or modify data before submitting the form.

```javascript
Page.LiveFormBeforeservicecall = function ($event, $operation, $data, options) {
    //$operation: Current operation being performed - INSERT or UPDATE or DELETE
    //$data has the data of the all components inside the live form. This data can be modified and validated before sending the request.
    function isValidData(data) {
        /*restrict password to be minimum of 6 characters*/
        if ($data.password) {
            if ($data.password.length < 6) {
                return false;
            }
        } else {
            return false;
        }
    }
    return isValidData($data)
};
```

#### Methods 

- Reset the liveform fields to their initial values.

```javascript
    Page.Widgets.LiveForm.reset();
```

- Updates the current record bound.

```javascript
    Page.Widgets.LiveForm.save();
```