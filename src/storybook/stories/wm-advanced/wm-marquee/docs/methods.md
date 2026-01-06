# Methods

The Marquee component can be controlled programmatically through the following methods. Access these methods using the widget reference (e.g., `Page.Widgets.myMarquee.methodName()`).

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| `start()` | None | void | Starts or resumes the marquee animation |
| `pause()` | None | void | Pauses the marquee animation |
| `reset()` | None | void | Resets the marquee to its initial position |
| `setSpeed(speed)` | speed: Number | void | Dynamically changes the scrolling speed |
| `setDirection(direction)` | direction: String | void | Changes the scrolling direction ('left' or 'right') |
| `getState()` | None | String | Returns the current state of the marquee ('running', 'paused', 'stopped') |
| `setContent(content)` | content: String/HTML | void | Dynamically updates the content inside the marquee |

## Common Method Use Cases

```javascript
// Pause and resume marquee on button clicks
Page.onPageButtonClick = function() {
  Page.Widgets.myMarquee.pause();
};

Page.onResumeButtonClick = function() {
  Page.Widgets.myMarquee.start();
};

// Dynamically update content based on API response
Page.onServiceSuccess = function(response) {
  let newContent = response.map(item => `<span class="alert-item">${item.message}</span>`).join(' • ');
  Page.Widgets.newsMarquee.setContent(newContent);
  Page.Widgets.newsMarquee.reset();
  Page.Widgets.newsMarquee.start();
};

// Change direction based on user language preference
if (Page.userPreferences.language === 'ar') {
  Page.Widgets.contentMarquee.setDirection('right');
} else {
  Page.Widgets.contentMarquee.setDirection('left');
}
```