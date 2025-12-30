# Props

The Marquee component accepts the following properties to customize its behavior and appearance:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | Number | `50` | Controls the scrolling speed in pixels per second |
| `direction` | String | `'left'` | Sets the scroll direction (`'left'` or `'right'`) |
| `pauseOnHover` | Boolean | `true` | When true, pauses scrolling when the user hovers over the component |
| `loop` | Number | `0` | Number of times to loop the content (0 for infinite) |
| `delay` | Number | `0` | Initial delay before starting animation (in milliseconds) |
| `gradient` | Boolean | `false` | Enables gradient fade effect at the edges |
| `gradientWidth` | Number | `200` | Width of the gradient effect in pixels |
| `gradientColor` | String | `'#fff'` | Color of the gradient effect |

## Common Use Cases

```javascript
// Basic news ticker implementation
Page.Widgets.newsMarquee.speed = 30;
Page.Widgets.newsMarquee.direction = 'left';
Page.Widgets.newsMarquee.pauseOnHover = true;

// Right-to-left scrolling announcement with gradients
Page.Widgets.announcementMarquee.direction = 'right';
Page.Widgets.announcementMarquee.gradient = true;
Page.Widgets.announcementMarquee.gradientWidth = 150;
Page.Widgets.announcementMarquee.gradientColor = '#f5f5f5';

// Fast-scrolling limited loop
Page.Widgets.alertMarquee.speed = 100;
Page.Widgets.alertMarquee.loop = 3;
Page.Widgets.alertMarquee.delay = 1000;
```