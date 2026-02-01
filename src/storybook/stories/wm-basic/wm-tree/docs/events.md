# Callback Events

<details open>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onExpand` | This event handler is called each time your component is expanded. |
        | `onCollapse` | This event handler is called each time your component is collapsed. |
        | `onSelect` | This event handler is called when the tab is selected. |
    </div>
</details>

### Use Cases

- Triggered when a tree node is selected.

```javascript
    Page.treeSelect = function ($event, widget, $item, $path) {
    console.log("Selected node", $item);
};
```

- Triggered when a tree node is expanded.

```javascript
    Page.treeExpand = function ($event, widget, $item, $path) {
    console.log("Expanded node", $item);
};
```

- Triggered when a tree node is collapsed.

```javascript
    Page.treeCollapse = function ($event, widget, $item, $path) {
    console.log("Collapsed node", $item);
};
```