# Properties



<details open>
<summary>Wizard</summary>
<div>
<details open>
<summary>Basic</summary>
<div>
| Property | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | - | The name is a unique identifier for your component. Each page element and component must be uniquely identified. WaveMaker automatically renames any non-unique element. Special characters and spaces are not allowed in component name. |
| `type` | string | "static" | Determines if Wizard steps are static or data-driven. |
| `add step` | - | - | This action allows adding multiple step (only show when type is static). |
</div>
</details>
<details>
  <summary>Caption for steps</summary>
    <div>
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `next` | string | "Next" | This property defines the caption for Next step. |
| `previous` | string | "Previous" | This property defines the caption for Previous step|
| `done` | string | "Done" | This property defines the caption for Done action |
| `cancel` | string | "Cancel" | This property defines the caption for Cancel action. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
| `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
| `stepstyle` | string | "justified" | This property sets style on to the step title whether auto or justified(Ie..step titles will be occupying full space). |
| `action alignment` | string | "right" | This property sets placement of actions, if placement is left the next, done, prev buttons will be placed left and skip will be placed right and vice versa. |
| `defaultstep` | string | "none" | This property allows users to set default step on load of wizard. |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `dataset` | array | - | Data source used when wizard type is dynamic. |
    </div>
</details>
<details>
<summary>Behavior</summary>
<div>
| Property | Type | Default | Description |
| -------------- | --------- | ------- | -------------------------------------------------------- |
| `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
| `loadOnDemand` | boolean | - | Defers component initialization until it becomes visible. Improves load performance but prevents script interaction until initialization. |
| `cancelable` | boolean | true | Set this property to allow wizard cancel. |
| `enablenext` | boolean | false | Set this property to enable next button irrespective of form validation in the current step. |
</div>
</details>
<details>
  <summary>Format</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `horizontal align` | string | - | This property specifies how the elements should be aligned horizontally. |
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
<summary>Wizard step</summary>
<div>
<details>
<summary>Basic</summary>
<div>
| Property | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Step Title" | Set the title of the component. |
| `subtitle` | string | "static" | Set the subtitle of the component |
| `name` | string | - | The name is a unique identifier for your component. Each page element and component must be uniquely identified. WaveMaker automatically renames any non-unique element. Special characters and spaces are not allowed in component name. |
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
  <summary>Behavior</summary>
<div>
| Property       | Type    | Default | Description                                                      |
| -------------- | ------- | ------- | ---------------------------------------------------------------- |
| `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
| `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
| `enableskip`    | string  | - | Set this property to enable skip option on current step. |
</div>
</details>
</div>
</details>