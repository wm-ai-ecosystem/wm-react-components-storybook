# Properties

<details open>
  <summary>Basic</summary>
| Name               | Type                    | Default    | Description                                                          |
| ------------------ | ----------------------- | ---------- | -------------------------------------------------------------------- |
| `type`             | `"static" \| "dynamic"` | `"static"` | Defines whether panes are manually created or generated from dataset |
| `closeothers`      | `boolean`               | `true`     | Allows only one pane open at a time                                  |
| `defaultpaneindex` | `number`                | `0`        | Specifies which pane opens by default                                |
| `dataset`          | `array`                 | `-`        | Data source used when accordion type is dynamic                      |

</details>

<details>
  <summary>Layout</summary>
    <div>
       | Property | Type     | Default | Description                             |
| -------- | -------- | ------- | --------------------------------------- |
| `width`  | `string` | `-`     | Sets accordion width (px, %, em, etc.)  |
| `height` | `string` | `-`     | Sets accordion height (px, %, em, etc.) |
|
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
       | Property       | Type      | Default | Description                                              |
| -------------- | --------- | ------- | -------------------------------------------------------- |
| `show`         | `boolean` | `true`  | Controls visibility of accordion                         |
| `loadOnDemand` | `boolean` | `false` | Loads accordion only when visible to improve performance |
| `statehandler` | `string`  | `-`     | Maintains accordion state using URL or page state        |
|
    </div>
</details>
