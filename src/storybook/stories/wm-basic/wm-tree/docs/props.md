# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the tree component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `treeicons` | string | - | This property sets expand-collapse icons on the tree. One can choose from: - folder, - plus-minus, - circle-plus-minus, - chevron, - menu, - triangle (default selection) or - expand-collapse. |
        | `levels` | number | - | This property sets levels of the tree to be expanded by default. |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | Set this property (Value) to a variable to populate the list of values to display. |
        | `orderby` | string | - | Set the order of the content. (available only when the above dataset value is bound to a variable). |
        | `nodelabel` | string | - | Property of the object (bound to the value property above) for node label binding, default value is label. (available only when the above dataset value is bound to a variable). |
        | `nodeicon` | string | - | Property of the object (bound to the value property above) for node icon binding, default value is icon. (available only when the above dataset value is bound to a variable). |
        | `nodechildren` | string | - | Property of the object (bound to the value property above) for node children binding, the default value is children. The property where the nested object is present. (available only when the above dataset value is bound to a variable). |
        | `nodeid` | string | - | Property of the object (bound to the value property above) used to identify a node. The default value property can be set to a value of the node id for initial selection. (available only when the above dataset value is bound to a variable). |
        | `nodeaction` | string | - | This property sets the actions for the component. (available only when the above dataset value is bound to a variable) |
        | `nodeclick` | string | - | Set this property to expand the node when it is clicked options being Do Nothing or Expand Node. (available only when the above dataset value is bound to a variable) |
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | string | - | The default value to be set at runtime. Can be: - none, - FirstNode or SecondNode, - value for the Node Id property. When datavalue is FirstNode, the First Node of the tree will be selected. When datavalue is LastNode, the Last Node of the tree will be selected. When datavalue is bound to a condition (eg, datavalue="role === 'admin'"), The condition is evaluated for each node of the tree until the condition is satisfied. The first node which satisfies the given condition will be selected. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
    </div>
</details>

<details>
  <summary>Format</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `horizontalalign` | string | "left" | This property specifies how the elements should be aligned horizontally. |
    </div>
</details>


### Use Cases

- Set levels of the tree to be expanded by default.

```javascript
Page.Widgets.tree.levels = 3;
```

- Simple tree dataset.

```javascript
[
  {
    "id": 1,
    "label": "Item 1",
    "icon": "fa fa-align-left",
    "children": []
  },
  {
    "id": 2,
    "label": "Item 2",
    "icon": "glyphicon glyphicon-music",
    "children": [
      {
        "id": 2.1,
        "label": "Item 2.1",
        "icon": "glyphicon glyphicon-bookmark",
        "children": []
      }
    ]
  }
];
```