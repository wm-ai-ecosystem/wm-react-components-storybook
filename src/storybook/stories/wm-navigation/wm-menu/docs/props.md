# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `caption` | string | - | The caption is the text that the end user sees on your anchor. It can be bound to a variable or another component. |
        | `name` | string | - | A unique identifier for the menu component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
        | `shortcutkey` | string | - | The shortcut key property specifies a shortcut key to activate/focus an element. |
        | `arialabel` | string | - | Accessibility label for screen readers |
        | `hint` | string | - | Any text you enter for this property will be shown as a tooltip if the mouse hovers over this component for 1.5 seconds. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | "250px" | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `menulayout` | string | - | Vertical layout arranges the menu items vertically. Horizontal layout arranges the menu items horizontally. |
        | `menuposition` | string | - | Position of the menu list items - inline, down-right, down-left, up-left, up-right. |
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
        | `itemlabel` | string | - | Label for menu items. It can be bound to a variable or set to a field from the Dataset Value variable. |
        | `itemicon` | string | - | Class for the icon for menu items. Example- 'fa fa-ban' or 'glyphicon glyphicon-cloud' |
        | `itemlink` | string | - | Link for the items. It can be bound to a variable or set to a field from the Dataset Value variable. **Note**: Item link has priority over onSelect actions i.e. when the link is selected the onSelect actions won't get executed. |
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
        | `linktarget` | string | - | This defines the app behavior on click of the Item Link. - _blank Opens the linked document in a new window or tab; - _self Opens the linked document in the same frame as it was clicked (this is the default value); - _parent Opens the linked document in the parent frame; - _top Opens the linked document in the full body of the window. |
        | `autoopen` | string | "never" | Decides whether to auto open the menu on page load. 'Never': By default menu will be closed on page load. 'Always': Menu is always open on page load. 'Active Page': Menu will be opened if it has an item pointing to the current page. |
        | `autoclose` | string | "outsideClick" | This property defines whether behaviour of menu to auto close always or click on outside or disabled. |
        | `showonhover` | boolean | false | Enable this property to display sub-menu items when hovering over the primary menu item. |
        | `animateitems` | string | - | This property controls the animation of the menu items. It can be set to slide, fade, or scale. Note: This feature works only in the run mode. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconclass` | string | - | This bindable property defines the class of the icon that is applied to the button. |
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