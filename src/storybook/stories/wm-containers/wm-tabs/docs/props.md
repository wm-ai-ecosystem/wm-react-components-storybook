# Properties

<details open>
  <summary>Basic Configuration</summary>

| Name               | Type                        | Description                                                              |
| ------------------ | --------------------------- | ------------------------------------------------------------------------ |
| `name`             | string                      | Unique identifier for the tabs component                                 |
| `type`             | `"static"` <br> `"dynamic"` | Defines whether tab panes are manually created or generated from dataset |
| `dataset`          | any[]                       | Data source used when tabs are dynamic                                   |
| `defaultpaneindex` | number                      | Specifies which tab opens by default                                     |
| `selectedindex`    | number                      | Programmatically controls currently selected tab                         |

</details>


<details>
  <summary>Layout Configuration</summary>

| Name           | Type                                                 | Description                                   |
| -------------- | ---------------------------------------------------- | --------------------------------------------- |
| `tabsposition` | `"top"` <br> `"bottom"` <br> `"left"` <br> `"right"` | Defines position of tab headers               |
| `justified`    | boolean                                              | Makes all tabs equal width inside container   |
| `iconposition` | `"top"` <br> `"start"` <br> `"end"` <br> `"bottom"`  | Controls position of icons inside tab headers |


</details>



<details>
  <summary>Behavior Configuration</summary>

| Name                | Type                                                                | Description                                            |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| `statehandler`      | `"none"` <br> `"URL"` <br> `"localStorage"` <br> `"sessionStorage"` | Maintains selected tab state across refresh/navigation |
| `autotabactivation` | boolean                                                             | Automatically activates tab when clicked               |
| `transition`        | `"none"` <br> `"slide"` <br> `"fade"`                               | Defines animation while switching tabs                 |
| `nodatamessage`     | string                                                              | Message shown when dynamic tabs dataset is empty       |

</details>


<details>
  <summary>Dynamic Tabs Specific Props</summary>

| Name     | Type                                          | Description                                      |
| -------- | --------------------------------------------- | ------------------------------------------------ |
| `render` | `($item, $index, dataset) => React.ReactNode` | Custom renderer function for dynamic tab content |

</details>
