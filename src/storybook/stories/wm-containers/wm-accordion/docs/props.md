# Properties

<details open>
<summary>Basic</summary>
<div>
| Property | Type | Default | Description |
|------  |------|---------|-------------|
| `name` | string | - | The name is a unique identifier for the accordion. Special characters and spaces are not allowed in component name. |
| `type` | string | "static" | Defines whether panes are manually created or generated from dataset |
| `add accordion pane` | - | - | This action allows one to add multiple panes to the Accordion.|

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
        | `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
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
| Property       | Type      | Default | Description                                              |
| -------------- | --------- | ------- | -------------------------------------------------------- |
| `defaultpaneindex` | number | 0 | Specifies which pane opens by default |
|`retain state`| - | url |This property will allow users to maintain component states using state handling on the URL, Local Storage or Session Storage.|
| `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
| `loadOnDemand` | boolean | - | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
| `closeothers` | boolean | true | Allows only one pane open at a time |
</div>
</details>
