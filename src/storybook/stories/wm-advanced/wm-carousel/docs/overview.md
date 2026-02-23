# Overview

The **Carousel** component is a responsive slider component used to display content such as images, videos, iframes, or custom layouts in a rotating view. It supports both Dynamic and Static modes: in Dynamic mode, slides are generated from a dataset or list, with each item rendered using a Carousel Template; in Static mode, slides are defined individually using Carousel Content, typically with images, and additional slides can be added as needed.

### Markup

```javascript
<wm-carousel height="480" name="carousel" class="app-carousel carousel" variant="standard">
    <wm-carousel-content name="carousel_content1">
        <wm-picture width="100%" name="picture1" class="img-rounded" variant="default:rounded"></wm-picture>
    </wm-carousel-content>
    <wm-carousel-content name="carousel_content2">
        <wm-picture width="100%" name="picture2" class="img-rounded" variant="default:rounded"></wm-picture>
    </wm-carousel-content>
    <wm-carousel-content name="carousel_content3">
        <wm-picture width="100%" name="picture3" class="img-rounded" variant="default:rounded"></wm-picture>
    </wm-carousel-content>
</wm-carousel>
```

### Examples

#### Properties 

- This carousel has a configurable controls property that determines the type of navigation controls displayed (navs, indicators, both or none), which can be set in the markup or dynamically via script.

```javascript
<wm-carousel controls="both" name="carousel"></wm-carousel>
```

```javascript
// Set the type of navigation controls for the carousel dynamically
Page.Widgets.carousel.controls = "both";
```

- This carousel has configurable animation and animationinterval properties to control slide transitions, which can be set in the markup or dynamically via script.

```javascript
<wm-carousel animation="auto" animationinterval="5" name="carousel"></wm-carousel>
```

```javascript
// Set the carousel to advance slides automatically
Page.Widgets.carousel.animation = "auto";

// Set the time interval (in seconds) between automatic slide transitions
Page.Widgets.carousel.animationinterval = 5;
```

#### Events 

- This is the markup for a carousel with an on-change event, executed when the active slide changes.

```javascript
<wm-carousel on-change="carouselChange(widget, newIndex, oldIndex)" name="carousel"></wm-carousel>
```

```javascript
Page.carouselChange = function (widget, newIndex, oldIndex) {
  /*
   * Triggered when the active slide in the carousel changes.
   *
   * newIndex  : Index of the newly active slide
   * oldIndex  : Index of the previously active slide
   *
   * For dynamic carousels:
   * widget.currentslide  -> Data object of the active slide
   * widget.previousslide -> Data object of the previous slide
   */

  // Example use case: E-commerce promotional banner carousel

  // Track which promotional banner is currently viewed
  const activeBanner = widget.currentslide;

  // Log analytics for banner impression
  Page.Variables.svTrackBannerView.setInput("bannerId", activeBanner.id);
  Page.Variables.svTrackBannerView.invoke();

  // Update related UI content based on the active slide
  Page.Widgets.promoTitle.caption = activeBanner.title;
  Page.Widgets.promoDescription.caption = activeBanner.description;
};
```