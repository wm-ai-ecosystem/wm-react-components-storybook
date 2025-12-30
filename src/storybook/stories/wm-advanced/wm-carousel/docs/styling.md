# Styling

The Carousel component can be styled using CSS classes. While specific class names are not documented, you can target the component and its children using standard CSS selectors.

## Basic Styling

```css
/* Styling the carousel container */
.carousel-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Styling the carousel slides */
.carousel-slide {
  transition: transform 0.5s ease;
}

/* Styling navigation buttons */
.carousel-nav-button {
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Styling indicators */
.carousel-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  transition: background-color 0.3s ease;
}

.carousel-indicator.active {
  background-color: #333;
}
```

## Animation States

```css
/* Styling for animation state */
.carousel-container[data-animating="true"] .carousel-slide {
  transition: transform 0.5s ease;
}

.carousel-container[data-animating="false"] .carousel-slide {
  transition: none;
}
```

Note that the exact class names used by the component may vary based on implementation details or if a CSS-in-JS solution is being used. Refer to the actual implementation for specific class names.