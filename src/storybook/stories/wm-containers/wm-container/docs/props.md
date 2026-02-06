# Properties

<details open>
  <summary>Basic</summary>
  <div>
  | Property   | Type                  | Default    | Description                                   |
  | ---------- | --------------------- | ---------- | --------------------------------------------- |
  | `name`     | string                | -          | Unique name used to identify the container    |
  </div>
</details>

<details>
<summary>Position</summary>
  <div>
  | Name       | Type                     | Default      | Description                                 |
  | ---------- | ------------------------ | ------------ | ------------------------------------------- |
  | `position` | string   | "relative" | Defines positioning behavior of the container |
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
| `clip content` | boolean | - | Clips or hides content that overflows container boundaries |
| `alignment` | string | "flex-start" | Defines how child elements are positioned by combining flexbox align-items and justify-content behaviors |
| `gap` | string | - | Sets spacing between child elements(px) |
| `padding horizontal` | string | - | Defines horizontal spacing between child elements(px) |
| `padding vertical` | string | - | Defines vertical spacing between child elements(px) |
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
  <summary>Behavior</summary>
<div>
| Property       | Type    | Default | Description                                                      |
| -------------- | ------- | ------- | ---------------------------------------------------------------- |
| `show`         | boolean | true    | Controls visibility of the container                             |
| `loadOnDemand` | boolean | -       | Loads container content only when visible to improve performance |
| `animation`    | string  | -       | Controls the animation of the component. |
</div>
</details>
