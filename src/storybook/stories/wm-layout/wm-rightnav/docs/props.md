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
  <summary>Accessibility</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `arialabel` | string | - | Accessibility label for screen readers. |
      | `hint` | string | - | Any text or html you enter for this property will be shown as a tooltip if the mouse hovers over this component for 1.5 seconds. |
    </div>
</details>
<details>
<summary>Layout</summary>
  <div>
    | Property   | Type | Default | Description |
    | ---------- | ------------------------ | -------- | --------------------------------------------- |
    | Navigation Type | string | "drawer" | Defines the navigation display style. "drawer" shows a collapsible side menu, while "rail" shows a compact navigation bar with icons. |
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
  <summary>Format</summary>
  <div>
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `columnwidth` | number | - | Accepts integer(x) between 1-12 and adds class col-md-(x), to suit bootstrap fluid grid system |
</div>
</details>