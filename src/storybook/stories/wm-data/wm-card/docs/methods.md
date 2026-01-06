# Methods

The Card component can be accessed and manipulated in scripts using the `Page.Widgets` object.

```javascript
// Access a card component
var myCard = Page.Widgets.myCard;
```

Because the Card component is primarily a container component with configurable properties, it doesn't expose many specialized methods beyond the standard widget methods. Most interactions with the Card component involve setting or getting its property values.

## Common Operations

```javascript
// Toggle visibility
Page.Widgets.myCard.show();
Page.Widgets.myCard.hide();

// Check if card is visible
var isVisible = Page.Widgets.myCard.isVisible;

// Get card's title
var cardTitle = Page.Widgets.myCard.title;

// Update card content programmatically
Page.Widgets.myCard.title = "New Title";
Page.Widgets.myCard.subheading = "Updated information";
Page.Widgets.myCard.picturesource = "/resources/images/new-image.jpg";

// Applying custom styling
Page.Widgets.myCard.$.addClass("highlighted");
Page.Widgets.myCard.$.removeClass("highlighted");

// Triggering a redraw if needed
Page.Widgets.myCard.redraw();
```

## Advanced Functionality

```javascript
// Set up card to display dynamic data
Page.onSuccess = function(variable, data) {
    if (variable === Page.Variables.ProductData) {
        var product = data[0];
        Page.Widgets.myCard.title = product.name;
        Page.Widgets.myCard.subheading = product.category;
        Page.Widgets.myCard.picturesource = product.imageUrl;
    }
};

// Create a card link programmatically
Page.Widgets.myCard.itemlink = "#/ProductDetails?id=" + productId;

// Apply animation effect
Page.Widgets.myCard.animation = "fadeIn";
// Refresh to apply the animation
Page.Widgets.myCard.redraw();
```