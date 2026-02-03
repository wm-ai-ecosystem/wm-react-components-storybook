# Properties

<details open>
<summary>Basic</summary>
| Name        | Type                  | Description                                                                |
| ----------- | --------------------- | -------------------------------------------------------------------------- |
| `name`      | string                | Unique identifier for the wizard                                           |
| `className` | string                | Additional CSS class names for styling                                     |
| `show`      | boolean               | Controls visibility of the wizard                                          |
| `type`      | "static"<br>"dynamic" | Defines whether wizard steps are manually created or generated dynamically |
| `title`     | string                | Main title displayed for the wizard                                        |
| `subtitle`  | string                | Subtitle displayed below the main title                                    |
| `width`     | string<br>number      | Sets wizard container width                                                |
| `height`    | string<br>number      | Sets wizard container height                                               |

</details>

<details>
<summary>Step Config</summary>
| Name               | Type                       | Description                                 |
| ------------------ | -------------------------- | ------------------------------------------- |
| `stepstyle`        | "auto"<br>"justified"      | Controls step width distribution            |
| `defaultstep`      | string                     | Specifies step name to open by default      |
| `defaultstepindex` | number                     | Specifies step index to open by default     |
| `stepClass`        | string                     | Additional CSS class applied to steps       |
| `orientation`      | "horizontal"<br>"vertical" | Controls step layout direction              |
| `alternativeLabel` | boolean                    | Displays labels below step icons            |
| `nonLinear`        | boolean                    | Allows navigating steps in any order        |
| `connector`        | ReactNode                  | Custom connector between steps              |
| `headernavigation` | boolean                    | Enables navigation by clicking step headers |



</details>

<details>
<summary>Navigation Button</summary>

| Name               | Type                          | Description                              |
| ------------------ | ----------------------------- | ---------------------------------------- |
| `cancelable`       | boolean                       | Shows or hides cancel button             |
| `enablenext`       | boolean                       | Enables or disables next button globally |
| `nextbtnlabel`     | string                        | Text displayed on next button            |
| `previousbtnlabel` | string                        | Text displayed on previous button        |
| `donebtnlabel`     | string                        | Text displayed on done button            |
| `cancelbtnlabel`   | string                        | Text displayed on cancel button          |
| `actionsalignment` | "left"<br>"center"<br>"right" | Alignment of action buttons              |
| `disablenext`      | boolean                       | Disables next button for current step    |
| `disabledone`      | boolean                       | Disables done button                     |
| `disableprevious`  | boolean                       | Disables previous button                 |
| `enableskip`       | boolean                       | Shows or hides skip option               |


</details>


<details>
<summary>Dynamic Wizard Config</summary>
| Name               | Type     | Description                                |
| ------------------ | -------- | ------------------------------------------ |
| `dataset`          | any[]    | Data source used for dynamic wizard steps  |
| `fieldDefs`        | any[]    | Field definitions for dynamic wizard       |
| `nodatamessage`    | string   | Message shown when dataset is empty        |
| `render`           | function | Custom renderer for dynamic wizard content |
| `dynamicStepIndex` | number   | Active step index in dynamic wizard        |
| `isdynamic`        | boolean  | Indicates wizard is in dynamic mode        |

</details>

<details>
<summary>Content</summary>
| Name            | Type      | Description                              |
| --------------- | --------- | ---------------------------------------- |
| `iconclass`     | string    | CSS class applied to step icons          |
| `doneiconclass` | string    | CSS class applied to completed step icon |
| `message`       | object    | Message displayed inside wizard          |
| `content`       | ReactNode | Content rendered inside wizard           |
| `haveForm`      | boolean   | Indicates wizard contains form elements  |

</details>