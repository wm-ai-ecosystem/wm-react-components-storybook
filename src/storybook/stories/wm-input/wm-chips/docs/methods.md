# Methods

The Chips component can be accessed programmatically through `Page.Widgets.widgetName`, where `widgetName` is the name you assigned to the component.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| addItem | item (object) | void | Adds a new chip item to the current selection. |
| removeItem | item (object) | void | Removes a specified chip item from the selection. |
| clear | none | void | Clears all selected chips. |
| reset | none | void | Resets to the default value. |
| focus | none | void | Sets focus to the chips input element. |

## Example: Adding items programmatically

```javascript
// Add a new skill to the chips
Page.addSkill = function() {
  let newSkill = {
    id: 99,
    name: "React Native", 
    category: "Mobile"
  };
  Page.Widgets.skillsChips.addItem(newSkill);
};

// Clear all selected items
Page.clearSkills = function() {
  Page.Widgets.skillsChips.clear();
};
```