# Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| **Basic** |
| name | string | | A unique identifier for the chips component. |
| placeholder | string | | Text to display when no values are entered. |
| **Accessibility** |
| tabindex | number | 0 | Sets the tab order for keyboard navigation. -1 makes the element non-focusable. |
| **Layout** |
| width | string | | Width of the component (px, %, em, pt). |
| height | string | | Height of the component (px, %, em, pt). |
| inputWidth | string | "Default" | Width of the input box. Options: "Default" (170px) or "Full" (100% width). |
| inputPosition | string | "Last" | Position of input box: "First" (beginning of list) or "Last" (end of list). |
| **Dataset** |
| dataValue | array | | Dataset to populate the list of values. |
| searchKey | string | | Field from dataset used for searching/filtering. |
| pictureSource | string | | Field from dataset used to display images in search results. |
| dataField | string | | Determines the value returned when an item is selected. If "All Fields", returns the entire object. |
| displayField | string | | Field to display in the dropdown list. |
| displayExpression | string | | JavaScript expression for custom formatted display values. |
| orderBy | string | | Fields and direction for ordering the display of items. |
| **Behavior** |
| autofocus | boolean | false | When true, component gets focus automatically when page loads. |
| readonly | boolean | false | When true, prevents changing the data value. |
| maxSize | number | 0 | Maximum number of items that can be selected (0 means unlimited). |
| allowOnlySelect | boolean | false | When true, restricts adding values not in the dataset. |
| enableReorder | boolean | false | When true, allows reordering of chips via drag and drop. |
| show | boolean | true | Controls component visibility. |
| disabled | boolean | false | When true, prevents user interaction and makes component display-only. |
| minChars | number | 1 | Minimum characters required before search is triggered. |
| skipOnChangeEventFromScript | boolean | false | When true, Change event only triggers from UI interactions, not script updates. |
| selectionMode | string | "multiple" | "single" or "multiple" - determines how many chips can be selected. |
| **Graphics** |
| leftIconClass | string | | Icon class to display on the left side of each chip. |
| rightIconClass | string | | Icon class to display on the right side of each chip. |
| leftBadge | string | | Text badge to display on the left side of each chip. |
| rightBadge | string | | Text badge to display on the right side of each chip. |
| selectedIconClass | string | | Icon to display on selected chips (overrides leftIconClass when selected). |

## Example: Setting up a basic chips component

```javascript
// In Page script
Page.onPageReady = function() {
  // Programmatically set the dataValue
  Page.Widgets.myChips.dataValue = [
    {id: 1, name: "JavaScript", category: "Programming"},
    {id: 2, name: "React Native", category: "Mobile"}, 
    {id: 3, name: "TypeScript", category: "Programming"}
  ];
}
```

## Example: Restricting selections and setting maximum

```javascript
// Allow only values from the dataset
Page.Widgets.myChips.allowOnlySelect = true;

// Set maximum of 3 selections
Page.Widgets.myChips.maxSize = 3;
```