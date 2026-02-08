# Properties

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
