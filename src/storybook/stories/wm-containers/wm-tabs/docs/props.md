# Properties

<details open>
<summary>Tabs</summary>
<div>
<details open>
<summary>Basic</summary>
<div>
| Property | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | - | The name is a unique identifier for the tabs component. Special characters and spaces are not allowed in component name. |
| `type` | string | "static" | Defines whether tab panes are manually created or generated from dataset. |
| `add tab pane` | - | - | This action allows adding multiple panes (only show when type is static). |
</div>
</details>
<details>
  <summary>Layout</summary>
    <div>
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
| `tabsposition` | string | "top" | Defines the position of tab headers (top, bottom, left, right). |
    </div>
</details>
<details>
  <summary>Dataset</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `dataset` | array | - | Set this property to a variable to populate the list of values to display.|
    </div>
</details>
<details>
<summary>Behavior</summary>
<div>
| Property | Type | Default | Description |
| -------------- | --------- | ------- | -------------------------------------------------------- |
| `defaultpaneindex` | number | 0 | Specifies which pane opens by default |
| `statehandler` | string | "URL" | This (Retain State) property will allow users to maintain component states using state handling on the URL, Local Storage or Session Storage.|
| `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
| `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
| `transition` | string | null | Defines animation while switching tabs (none, slide, fade). |
| `vertical` | boolean | true | This property enables scrolling of headers. |
| `autotabactivation | boolean | true | This property controls tab activation behavior during keyboard navigation. |
</div>
</details>
<details>
  <summary>Graphics</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `iconposition` | string | - | Optional property; Property to set the position of icon in the component. |
</div>
</details>
<details>
  <summary>Format</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `horizontalalign` | string | - | This property specifies how the elements should be aligned horizontally. |
| `taborder` | string | - | The order of the Tabs can be changed using the arrow icons next to the tab names. |
</div>
</details>
<details>
  <summary>Message</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `no data message` | string | "No data found" | This message will be displayed when there is no data to display. |
  </div>
</details>
</div>
</details>


<details>
<summary>Tabpane</summary>
<div>
<details open>
<summary>Basic</summary>
<div>
| Property | Type | Default | Description |
|------  |------|---------|-------------|
| `title` | string | "Title" | Set the title of the component. |
| `name` | string | - | The name is a unique identifier for the accordion. Special characters and spaces are not allowed in component name. |
| `badgevalue` | string | - | Value to be displayed in the badge span for anchor and button. |
| `badgetype` | string | "default" | The property controls the color of the badge. This values are default, primary, success, info, warning, danger. |
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
  <summary>Content</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `content` | string | - | In case the source is selected as - inline enter the HTML code for the same. - Partial source, choose from the available list of partial pages.|
    </div>
</details>
<details>
<summary>Behavior</summary>
<div>
| Property       | Type      | Default | Description                                              |
| -------------- | --------- | ------- | -------------------------------------------------------- |
| `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
| `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
| `disabled` | boolean | false | If the disabled property is true (checked) the value of the editor cannot change. The component becomes display-only. |
</div>
</details>
<details>
  <summary>Graphics</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `iconclass` | string | - | This property defines the class of the icon that is applied to the pane. |
  </div>
</details>
</div>
</details>