# Properties

<details open>
  <summary>Basic</summary>
  <div>
  | Property   | Type                  | Default    | Description                                   |
  | ---------- | --------------------- | ---------- | --------------------------------------------- |
  | `title`    | string                | "Title"    | Sets the main title of the panel.             |
  | `subheading` | string              | -          | This property defines the sub heading or title for the component.|
  | `name` | string | - | The name is a unique identifier for the container. Special characters and spaces are not allowed in component name. |
  | `badgevalue` | string | -          | Displays badge value on the panel header.      |
  | `badgetype`  | string | "Default"  | Defines badge style (success, warning, danger,info etc.) |
  </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
      | Property | Type | Default | Description |
      | ---------| ---- | ------- | ----------- |
      | `helptext` | string | -    | Provides accessibility help text for assistive technologies |
      | `hint`     | string | -    | Displays additional hint or tooltip text |
    </div>
</details>

<details>
<summary>Layout</summary>
  <div>
| Property  | Type | Default | Description |
| ---------- | ------------------------ | -------- | --------------------------------------------- |
| `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%), hug (refers fit-content), fill (refers width 100%). |
  </div>
</details>

<details>
  <summary>Content</summary>
  <div>
| Property  | Type | Default    | Description |
| --------- | ---- | ---------- | ------------|
| `content` | string | - | Defines content displayed inside the panel or chosse partial.<br> **Note:** In case of Page content, on switching from inline content the component content is lost and cannot be undone. onLoad callback will be triggered only when the content is a partial  |
  </div>
</details>

<details>
  <summary>Actions</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `actions` | array | - | This bindable property sets the actions for the component. To set the data and events see dropdown menu. |
| `itemlabel` | string | - | Label for anchor or menu tags generated dynamically. Available only when Menu Actions is bound to a variable. |
| `itemicon` | string | - | Class for the action. Example: fa fa-ban or glyphicon glyphicon-cloud. Available only when Menu Actions is bound to a variable. |
| `itemlink` | string | - | Link for the action item. Available only when Menu Actions is bound to a variable. |
| `action task` | string | - | Task triggered when user clicks the menu item.|
| `userrole` | string | - | Role for anchor or menu items generated dynamically. |
| `itemchildren` | array | - | When a menu component is required the sub action or item can be mentioned in the children. |
| `isActive` | boolean | - | Boolean field to determine if the item should be shown as selected. |
  </div>
</details>

<details>
  <summary>Behavior</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
| `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
| `collapsible` | boolean | false | Enables collapsing and expanding of the panel. |
| `enablefullscreen` | boolean | false | Enables panel full screen mode. |
| `closable` | boolean | false | This property allows user to access close action from header as well as enables close through ESC key press. |
| `expanded` | boolean | true | Sets default state of the panel (expanded or collapsed). |
| `animation`    | string  |  -       | Controls the animation of the component. |
  </div>
</details>
<details>
  <summary>Graphics</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `iconclass` | string | - | Sets icon class displayed near panel title. |
| `iconurl` | string | - | Loads custom icon using image URL. |
| `iconwidth` | string | - | Sets width of the icon. |
| `iconheight` | string | - | Sets height of the icon. |
| `iconmargin` | string | - | Sets margin around the icon. |
  </div>
</details>
