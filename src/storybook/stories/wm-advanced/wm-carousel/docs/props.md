# Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| ownerState | Object | - | Contains the state values that affect the component's appearance and behavior |
| ownerState.height | string \| number | undefined | Defines the height of the carousel. Can be specified in any valid CSS unit (px, %, em, etc.) when passed as a string. |
| ownerState.width | string \| number | undefined | Defines the width of the carousel. Can be specified in any valid CSS unit (px, %, em, etc.) when passed as a string. |
| ownerState.isAnimating | boolean | false | Indicates whether the carousel is currently animating between slides. |

## Common Use Cases

```javascript
// Create a responsive carousel with specific dimensions
const carouselProps = {
  ownerState: {
    width: '100%',
    height: 400,
    isAnimating: false
  }
};

// Start carousel animation programmatically
const startAnimation = () => {
  setCarouselProps({
    ownerState: {
      ...carouselProps.ownerState,
      isAnimating: true
    }
  });
};

// Stop carousel animation
const stopAnimation = () => {
  setCarouselProps({
    ownerState: {
      ...carouselProps.ownerState,
      isAnimating: false
    }
  });
};
```