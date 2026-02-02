# Callback Events

<details open>
  <summary>Basic Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `change` | This event handler is called each time your component's value changes. |
    </div>
</details>

<details>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onBeforeAdd` | This event gives handle to user whether to continue or abort to add current chip item 1. If the function does not return anything the chip item will be added 2. If the function returns false, then chip item will not be added 3. If the function returns anything other than false, chip item will be added. |
        | `onAdd` | This event gives a handle on the successful addition of the Chip item. |
        | `onBeforeRemove` | This event gives handle to user whether to continue or abort removing current chip item 1. If the function does not return anything the chip item will be removed 2. If the function returns false, then chip item will not be removed 3. If the function returns anything other than false, chip item will be removed. |
        | `onRemove` | This event gives handle to user on successful removal. |
        | `onChipClick` | This event handler is called each time the chip item is clicked. |
        | `onChipSelect` | This event handler is called each time the chip item is selected. |
        | `onBeforeServiceCall` | This event is triggered before sending the service call for fetching the search results. |
        | `onBeforeReorder` | This event gives handle to user whether to continue or abort reordering current chip item 1. If the function does not return anything the chip item will be reordered 2. If the function returns false, then chip item will not be reordered 3. If the function returns anything other than false, chip item will be reordered. |
        | `onReorder` | This event gives a handle on successful reordered. |
    </div>
</details>