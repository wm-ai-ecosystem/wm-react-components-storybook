# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `title` | string | "Form" | Set the title of the component. |
        | `subheading` | string | - | Set the sub heading of the component. |
        | `name` | string | - | A unique identifier for the form component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Advanced Settings</summary>
    <div>
        <details open>
          <summary>Form</summary>
            <div>
              | Property | Type | Default | Description |
              | --- | --- | --- | --- |
              | **Validation** |  |  |  |
              | `validationtype` | string | "default" | This property defines the type of validation applied on the form. **Default**: Shows validation messages below each field that fails validation, **HTML**: Uses browser (HTML) validations and displays the message for the first invalid field when it loses focus, **No Validations**: Skips all form validations. |
              | **Behavior** |  |  |  |
              | `method` | string | "post" | Specifies the HTTP request method used by the form, such as POST or PUT. |
              | `action` | string | - | This property specifies where to send the form-data when a form is submitted. |
              | `enctype` | string | "application/x-www-form-urlencoded" | The encoding type property specifies how the form-data should be encoded when submitting it to the server. |
              | `target` | string | - | blank: Opens the linked document in a new window or tab self: Opens the linked document in the same frame as it was clicked (this is default) parent: Opens the linked document in the parent frame top: Opens the linked document in the full body of the window. |
              | `autocomplete` | boolean | true | Enabling this property turns on auto-completion in the editor. As the user types into the pull-down select editor, the choices change dynamically. |
              | **Caption** |  |  |  |
              | `captionalign` | string | - | Caption for your component can be left, center or right aligned. |
              | `captionposition` | string | "top" | This property determines where your caption appears with respect to the edit field. It is up to you to insure that there is sufficient height or width for the caption to fit in the selected position. |
              | `captionwidth` | width | "xs-12 sm-4 md-4 lg-4" | Accepts integer(x) between 1-12 and adds class col-xs-(x) for mobile, col-sm-(x) for Tablet Potrait, col-md-(x) for Laptop Tablet Landscape, col-lg-(x) for Large screen to suit fluid grid system. **Note**: This property is displayed only when the caption position is set to left or right. |
              | **Message** |  |  |  |
              | `messagelayout` | string | "inline" | Select the value to decide the appreance of the success/error message after CRUD operation. If no message is required for any operation, clear the respective message |
              | `errormessage` | string | - | This message will be displayed, if there is an error during the CRUD operation. |
              | `postmessage` | string | "Data posted successfully" | This message will be displayed, when data is posted by form(Applicable only for service variable). |
            </div>
        </details>
        <details>
          <summary>Fields</summary>
            <div>
              - You can control platform-specific display, choosing which fields or columns are visible on desktop and mobile to keep the layout clean and responsive.
            - Specifies the component used to represent each data field and the component type (such as Text, Number, Select, etc.) can be chosen. Additional properties like conditional classes and other field-specific settings can also be configured.
            - Create custom columns by clicking on the **'+'** icon. **Note**: If a custom column is not selected on the left panel, it will be deleted when the Form Designer is saved.
              ![Form Fields](/wm-assets/components/form/advanceSettingsFields.png)
            </div>
        </details>
        <details>
          <summary>Actions</summary>
            <div>
              - Action Items can be added to a form, with default actions such as **Save**, **Reset**. Each action can be configured as a Button or an Anchor, and supports properties like title, icon, visibility (show/hide), and event handling etc.
            - Create custom actions by clicking on the **'+'** icon. **Note**: If a custom action is not selected on the left panel, it will be deleted when the Form Designer is saved.
              ![Form Actions Basic](/wm-assets/components/form/advanceSettingsActionsBasic.png)
            </div>
        </details>
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | object | - | (Value) Data can come from various sources like database, web service or another component and can be accessed through binding to Live or Service Variables. |
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `formdata` | object | - | This property can be set to value or bound to another widget like Data Table, List or Live Filter or service variable. These define the values to be displayed when the Form is first loaded |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconclass` | string | - | Defines the class of the icon that is applied to the component. |
    </div>
</details>