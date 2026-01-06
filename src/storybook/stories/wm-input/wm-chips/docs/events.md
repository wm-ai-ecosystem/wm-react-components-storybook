# Callback Events

| Event | Description |
| --- | --- |
| **Value Events** |
| Change | Triggered when the selected chips values change. |
| **Interaction Events** |
| OnChipClick | Triggered when a chip is clicked. |
| OnChipSelect | Triggered when a chip is selected. |
| **Modification Events** |
| OnBeforeAdd | Triggered before adding a new chip. Return false to prevent addition. |
| OnAdd | Triggered after a chip is successfully added. |
| OnBeforeRemove | Triggered before removing a chip. Return false to prevent removal. |
| OnRemove | Triggered after a chip is successfully removed. |
| OnBeforeReorder | Triggered before reordering a chip. Return false to prevent reordering. |
| OnReorder | Triggered after a chip is successfully reordered. Provides newIndex and oldIndex data. |
| **Service Events** |
| OnBeforeServiceCall | Triggered before sending the service call for fetching search results. |

## Example: Using the OnAdd event

```javascript
Page.myChipsOnAdd = function($event, widget, $data) {
  console.log("Added new chip:", $data);
  // Perform additional actions when a chip is added
};
```

## Example: Using the OnBeforeAdd event to validate

```javascript
Page.myChipsOnBeforeAdd = function($event, widget, $data) {
  // Example: Prevent adding items with empty names
  if (!$data.name || $data.name.trim() === "") {
    console.log("Cannot add empty item");
    return false;
  }
  
  // Example: Prevent duplicates
  let currentValues = widget.dataValue || [];
  for (let i = 0; i < currentValues.length; i++) {
    if (currentValues[i].name === $data.name) {
      console.log("Duplicate item");
      return false;
    }
  }
  
  // Allow addition
  return true;
};
```