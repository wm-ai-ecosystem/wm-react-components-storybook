# Properties

<details open>
  <summary>Basic</summary>
  <div>
  | Property   | Type                  | Default    | Description                                   |
  | ---------- | --------------------- | ---------- | --------------------------------------------- |
| `name` | string | - | The name is a unique identifier for the container. Special characters and spaces are not allowed in component name. |
  </div>
</details>
<details>
<summary>Position</summary>
  <div>
  | Name       | Type                  | Default      | Description                                 |
  | ---------- | --------------------  | ------------ | ------------------------------------------- |
  | `position` | string   | "relative" | Position: sticky acts like relative until scrolling reaches the threshold, then it sticks to the top or left edge of its parent (if scrollable) or the nearest scrolling ancestor (closest parent enabling scroll). Z-index sets its stacking order. |
  | `zindex`   | string   | "1" | This property defines the z-index style attribute for the component. |
  </div>
</details>
<details>
<summary>Layout</summary>
  <div>
| Property   | Type | Default | Description |
| ---------- | ------------------------ | -------- | --------------------------------------------- |
| `direction` | string | - | Defines the direction in which child elements are arranged (row,column).|
| `wrap` | boolean | - | Allows child elements to wrap to next line if space is insufficient |
| `width` | string | fill | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%), hug (refers fit-content), fill (refers width 100%). |
| `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%), hug (refers fit-content), fill (refers width 100%). |
| `clipcontent` | "string" | "false" | Clips or hides content that overflows container boundaries |
| `alignment` | string | "top-left" | This property specifies how the elements should be aligned. |
| `gap` | string | - | This property specifies the spacing between items in a flex container |
| `padding` | string | - | Sets the padding in pixels for your component. The padding for an object is inside of its border.|
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
| `animation`    | string  |  -       | Controls the animation of the component. |
</div>
</details>
