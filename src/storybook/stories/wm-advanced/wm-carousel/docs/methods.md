# Methods

The Carousel component does not have any documented public methods. However, you can control the carousel's behavior through state management by updating the props.

## Example of State-Based Control

```javascript
// In a React component:
const [currentSlide, setCurrentSlide] = useState(0);
const [isPlaying, setIsPlaying] = useState(true);

// Navigate to a specific slide
const goToSlide = (index) => {
  setCurrentSlide(index);
};

// Toggle play/pause
const togglePlayPause = () => {
  setIsPlaying(!isPlaying);
  setCarouselProps({
    ownerState: {
      ...carouselProps.ownerState,
      isAnimating: !isPlaying
    }
  });
};

// Next slide
const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % totalSlides);
};

// Previous slide
const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
};
```