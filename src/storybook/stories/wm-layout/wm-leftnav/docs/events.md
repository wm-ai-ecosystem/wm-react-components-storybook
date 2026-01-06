# Callback Events

The LeftNav component provides the following events that you can handle in your application:

| Event | Description |
|-------|-------------|
| `onNavHeightChange` | Triggered when the navigation panel height changes between full and collapsed states. The event handler receives a boolean parameter `isFull` indicating whether the navigation is at full height (`true`) or collapsed (`false`). |

## Example Usage

```javascript
// Handle navigation height changes
Page.onNavHeightChange = function(isFull) {
    if (isFull) {
        // Logic for when navigation is at full height
        console.log("Navigation panel is expanded");
        // Perhaps adjust other UI elements accordingly
    } else {
        // Logic for when navigation is collapsed
        console.log("Navigation panel is collapsed");
        // Perhaps make more space for main content
    }
};
```