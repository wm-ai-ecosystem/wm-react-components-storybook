# Properties

<details open>
  <summary>Basic</summary>
  <div>
  | Property   | Type                  | Default    | Description                                   |
  | ---------- | --------------------- | ---------- | --------------------------------------------- |
  | `title`    | string                | "Title"    | Sets the main title of the panel              |
  | `subheading` | string              | "subheading" | Sets the main title of the panel            |
  | `name`     | string                | -          | Unique name used to identify the container    |
  | `badgevalue` | string              | -          | Displays badge value on the panel header      |
  | `badgetype`     | string           | "Default"  | Defines badge style (success, warning, danger,info etc.) |
  </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
      | Property | Type | Default | Description |
      | ---------| ---- | ------- | ----------- |
      | `helpText` | string | -    | Provides accessibility help text for assistive technologies |
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
| `content` | string | "inline" | Defines content displayed inside the panel or chosse partial.<br> **Note:** In case of Page content, on switching from inline content the component content is lost and cannot be undone. onLoad callback will be triggered only when the content is a partial  |
  </div>
</details>

<details>
  <summary>Actions</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `menu actions` | array / string | - | This bindable property sets the actions for the component. To set the data and events see dropdown menu. |
| `action label` | string | - | Label for anchor or menu tags generated dynamically. Available only when Menu Actions is bound to a variable. |
| `action icon` | string | - | Class for the action. Example: fa fa-ban or glyphicon glyphicon-cloud. Available only when Menu Actions is bound to a variable. |
| `action link` | string | - | Link for the action item. Available only when Menu Actions is bound to a variable. |
| `action task` | string / function | - | Task triggered when user clicks the menu item.|
| `user role` | string | - | Comma separated user roles used to control visibility of menu items. Item is shown only when role matches logged in user roles. |
| `sub actions` | array | - | Defines child menu items using children. Available only when Menu Actions is bound to a variable. |
| `isActive` | string | - | Boolean field to determine if the item should be shown as selected. |
  </div>
</details>

<details>
  <summary>Behavior</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `show`         | boolean | true    | Controls visibility of the container                             |
| `loadOnDemand` | boolean | -       | Loads container content only when visible to improve performance |
| `collapsible` | boolean | false | Enables collapsing and expanding of the panel. |
| `enable full screen` | boolean | false | Enables panel full screen mode. |
| `default close` | boolean | false | This property allows user to access close action from header as well as enables close through ESC key press. |
| `expanded` | boolean | true | Sets default state of the panel (expanded or collapsed). |
| `animation` | string | - | Controls animation using CSS classes. Works only in run mode. |
  </div>
</details>
<details>
  <summary>Graphics</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `title icon class` | string | - | Sets icon class displayed near panel title. |
| `icon url` | string | - | Loads custom icon using image URL. |
| `icon width` | string | - | Sets width of the icon. |
| `icon height` | string | - | Sets height of the icon. |
| `icon margin` | string | - | Sets margin around the icon. |
  </div>
</details>
