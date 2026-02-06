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

- Configure carousel controls.

```javascript
// Sets the type of navigation controls displayed on the carousel.
Page.Widgets.carousel.controls = "indicators";
```

- Control slide animation timing.

```javascript
// Sets the time interval (in seconds) between automatic slide transitions.
Page.Widgets.carousel.animation = "auto";
Page.Widgets.carousel.animationinterval = 5;
```

#### Events 

- Triggered when the active carousel slide changes.

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