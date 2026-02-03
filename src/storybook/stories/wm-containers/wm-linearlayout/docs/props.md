# Properties

<details open>
  <summary>Basic</summary>

| Name       | Type                     | Default      | Description                                   |
| ---------- | ------------------------ | ------------ | --------------------------------------------- |
| `name`     | `string`                 | `-`          | Unique name used to identify the container    |
| `position` | `"relative" \| "sticky"` | `"relative"` | Defines positioning behavior of the container |

</details>

<details>
  <summary>Layout</summary>
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>direction</code></td>
      <td>"row" | "column"</td>
      <td>Defines the direction in which child elements are arranged</td>
    </tr>
    <tr>
      <td><code>wrap</code></td>
      <td>boolean</td>
      <td>Allows child elements to wrap to next line if space is insufficient</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>string</td>
      <td>Sets container width(px)</td>
    </tr>
    <tr>
      <td><code>height</code></td>
      <td>string</td>
      <td>Sets container height(px)</td>
    </tr>
    <tr>
      <td><code>clipContent</code></td>
      <td>boolean</td>
      <td>Clips or hides content that overflows container boundaries</td>
    </tr>
    <tr>
      <td><code>horizontalAlign</code></td>
      <td>"start" | "center" | "end" | "space-between" | "space-around"</td>
      <td>Aligns child elements horizontally</td>
    </tr>
    <tr>
      <td><code>verticalAlign</code></td>
      <td>"start" | "center" | "end" | "stretch"</td>
      <td>Aligns child elements vertically</td>
    </tr>
    <tr>
      <td><code>gap</code></td>
      <td>string</td>
      <td>Sets spacing between child elements(px)</td>
    </tr>
    <tr>
      <td><code>horizontalSpacing</code></td>
      <td>string</td>
      <td>Defines horizontal spacing between child elements(px)</td>
    </tr>
    <tr>
      <td><code>verticalSpacing</code></td>
      <td>string</td>
      <td>Defines vertical spacing between child elements(px)</td>
    </tr>
  </tbody>
</table>

</details>

<details>
  <summary>Content</summary>

| Property  | Type     | Description                                                                      |
| --------- | -------- | -------------------------------------------------------------------------------- |
| `partial` | `string` | Loads a partial page inside the container or bind the partial based on condition |

</details>

<details>
  <summary>Behavior</summary>

| Property       | Type      | Default | Description                                                      |
| -------------- | --------- | ------- | ---------------------------------------------------------------- |
| `show`         | `boolean` | `true`  | Controls visibility of the container                             |
| `loadOnDemand` | `boolean` | `false` | Loads container content only when visible to improve performance |

</details>
