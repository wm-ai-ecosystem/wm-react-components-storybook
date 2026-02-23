# Methods

<details open>
  <summary>Methods</summary>
    <div>
        | Method | Parameters | Return Type | Description |
        |--------|------------|------------|-------------|
        | `selectItem` | any | void | This method selects an item in the list either by its index or item object. Passing 0 selects the first item. |
        | `deselectItem` | any | void | This method deselects an item in the list either by its index or item object. Passing 0 deselects the first item. |
        | `clear` | None | void | This method clear the list items. |
        | `getWidgets` | componentName: string, [index: number] | array | This method retrieves one or more component instances placed inside a List template by their name. If an index is provided, it returns the component instance for that specific List item; otherwise, it returns all matching components across the List. |
        | `getIndex` | listItemObject: ListItem | number: index | This method returns the zero-based index of a specific List item object within the List, allowing you to determine its position programmatically. |
        | `getItem` | index: number | object | This method retrieves the List item object at the specified zero-based index, allowing programmatic access to its data and properties. |
    </div>
</details>


