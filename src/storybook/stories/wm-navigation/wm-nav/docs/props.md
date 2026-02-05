# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the nav component. Special characters and spaces are not allowed. |
        | `type` | string | "pills" | Defines the display style, choose between navbar, pills (default) or tabs. |
        | `Add Component` | - | - | This action button allows you to add components within the Nav. The available options are Anchor, Menu, Popover, or Button. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `layout` | string | - | This property controls how contained components are displayed within this component container. It can be stacked or justified |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | (Value) Set this property to a variable to populate the list of values to display. |
        | `orderby` | string | - | Set the order of the content. (available only when the above dataset value is bound to a variable). |
    </div>
</details>

<details>
  <summary>Actions</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `itemlabel` | string | - | Label for anchor or menu items generated dynamically. |
        | `itemhint` | string | - | Hint for anchor or menu items generated dynamically. |
        | `itemicon` | string | - | Class for the icon for menu items. Example- 'fa fa-ban' or 'glyphicon glyphicon-cloud' |
        | `itemlink` | string | - | Link for the anchor component. It can be bound to a variable or set to a field from the Dataset Value variable. **Note**: Item link has priority over onSelect actions i.e. when the link is selected the onSelect actions won't get executed. |
        | `itemaction` | string | - | Task for nav items. This is the action that will be triggered when the user clicks on the Nav Item. It can be a script like: Variables.v1.invoke() Execution order on click of Node: 1. If provided onSelect will be executed first. 2. If provided Action will be executed next. 3. If provided Action link will be executed last. |
        | `userrole` | string | - | Role for menu items generated dynamically. You can assign a property to 'userrole' which contains comma separated user roles. Each item will be evaluated with given 'userrole' for that item to that of the logged in user roles, from security. If any of the user roles bound to 'userrole' property matches then that menu item will be shown else will be hidden. |
        | `itembadge` | string | - | Badge value to be displayed. Choose from the options available based upon the structure of the Dataset Value. |
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
        | `linktarget` | string | - | This defines the app behavior on click of the Item Link. - _blank Opens the linked document in a new window or tab; - _self Opens the linked document in the same frame as it was clicked (this is the default value); - _parent Opens the linked document in the parent frame; - _top Opens the linked document in the full body of the window. |
        | `autoopen` | string | "never" | Decides whether to auto open the menu on page load. 'Never': By default menu will be closed on page load. 'Always': Menu is always open on page load. 'Active Page': Menu will be opened if it has an item pointing to the current page. |
        | `autoclose` | string | "outsideClick" | This property defines whether behaviour of menu to auto close always or click on outside or disabled. |
        | `showonhover` | boolean | false | Enable this property to display sub-menu items when hovering over the primary menu item. |
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

<details>
  <summary>Design System Properties</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `layout` | string | - | This property controls how contained components are displayed within this component container. |
    </div>
</details>