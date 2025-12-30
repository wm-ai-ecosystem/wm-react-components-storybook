# Props

## Content Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `""` | Main heading text displayed at the top of the card |
| `subheading` | string | `""` | Secondary text typically displayed below the title |
| `children` | React.ReactNode | `null` | Content to be rendered inside the card body |

## Visual Elements

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `iconclass` | string | `""` | CSS class name for displaying an icon (e.g., Font Awesome classes) |
| `iconurl` | string | `""` | URL to an icon image when using direct image instead of CSS classes |
| `picturesource` | string | `""` | URL to the main image to be displayed in the card |
| `picturetitle` | string | `""` | Alt text for the card's main image |
| `imageheight` | string | `"auto"` | Height specification for the card's image |

## Card Items Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `itemaction` | string | `""` | Action to be performed when a card item is clicked |
| `itemchildren` | string | `""` | Child elements for card items |
| `itemicon` | string | `""` | Icon for card items |
| `itemlabel` | string | `""` | Text label for card items |
| `itemlink` | string | `""` | URL link for card items |
| `cardItem` | any | `undefined` | Complex object representing a card item with all its properties |

## Appearance and Behavior

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | string | `""` | Configuration for action buttons displayed on the card |
| `animation` | string | `"none"` | Type of animation applied to the card (e.g., "fade", "slide") |
| `className` | string | `""` | Additional CSS class names to apply to the card |
| `height` | string \| number | `"auto"` | Height of the card, can be a CSS value or number |
| `width` | string \| number | `"auto"` | Width of the card, can be a CSS value or number |
| `isactive` | string | `"false"` | Indicates whether the card is in an active state |
| `autoclose` | string | `"false"` | Whether the card should automatically close under certain conditions |

## User-related Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | `""` | Identifier for the card, often used when displaying user information |
| `userrole` | string | `""` | Role of the user when card is used for user profiles |

## Positional Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isFirst` | boolean | `false` | Indicates if this card is the first in a collection |
| `isLast` | boolean | `false` | Indicates if this card is the last in a collection |

## Advanced/Integration Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `currentItemWidgets` | any | `undefined` | Reference to widgets associated with the current card item |
| `listener` | any | `undefined` | Listener object for advanced event handling |

## Common Use Cases

```javascript
// Basic card with title and content
Page.Widgets.myCard.title = "Product Overview";
Page.Widgets.myCard.subheading = "Deluxe Edition";

// Adding an icon using Font Awesome
Page.Widgets.myCard.iconclass = "fa fa-star";

// Setting up an image card
Page.Widgets.myCard.picturesource = "/resources/images/product.jpg";
Page.Widgets.myCard.picturetitle = "Product Image";
Page.Widgets.myCard.imageheight = "200px";

// Creating a user profile card
Page.Widgets.myCard.name = "John Doe";
Page.Widgets.myCard.userrole = "Administrator";
Page.Widgets.myCard.picturesource = "/resources/images/profile.jpg";
```