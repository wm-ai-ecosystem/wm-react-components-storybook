# Properties

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
| `dataset` | array | - | Set this property to a variable to populate the list of values to display. |
    </div>
</details>
<details>
<summary>Behavior</summary>
<div>
| Property | Type | Default | Description |
| -------------- | --------- | ------- | -------------------------------------------------------- |
| `defaultpaneindex` | number | 0 | Specifies which tab opens by default. |
| `retain state` | - | none | Allows maintaining component state using URL, Local Storage or Session Storage. |
| `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
| `loadOnDemand` | boolean | - | Defers component initialization until it becomes visible. Improves load performance but prevents script interaction until initialization. |
| `transition` | string | "none" | Defines animation while switching tabs (none, slide, fade). |
| `enable header scroll` | boolean | true | This property enables scrolling of headers. |
| `auto tab activation` | boolean | true | This property controls tab activation behavior during keyboard navigation. |
</div>
</details>
<details>
  <summary>Graphics</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `icon position` | string | - | Optional property; Property to set the position of icon in the component. |
</div>
</details>

<details>
  <summary>Format</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `horizontal align` | string | - | This property specifies how the elements should be aligned horizontally. |
| `tab order` | string | - | The order of the Tabs can be changed using the arrow icons next to the tab names. |
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
