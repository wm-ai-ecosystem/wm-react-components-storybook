# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the breadcrumb component. Special characters and spaces are not allowed. |
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
        | `dataset` | array | - | (Value) Set this property to a variable to populate the list of values to display. |
    </div>
</details>

<details>
  <summary>Actions</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `itemid` | string | - | Id should be the mapped to the page name so that the breadcrumb path is generated when the page is loaded. |
        | `itemlabel` | string | - | Label for anchor or menu items generated dynamically. |
        | `itemicon` | string | - | Class for the icon in anchor or menu items generated dynamically. Example- 'fa fa-ban' or 'glyphicon glyphicon-cloud' |
        | `itemlink` | string | - | Link for the items generated dynamically. |
        | `itemaction` | string | - | Action Task for anchor or menu items generated dynamically. |
        | `userrole` | string | - | Role for anchor or menu items generated dynamically. |
        | `subactions` | string | - | When a menu component is required the sub items can be mentioned in the children. |
        | `isactive` | boolean | - | Boolean field to determine if the item should be shown as selected |
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
  <summary>Format</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `horizontalalign` | string | - | This property specifies how the elements should be aligned horizontally. |
    </div>
</details>