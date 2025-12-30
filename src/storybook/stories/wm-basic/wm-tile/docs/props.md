# Props

## Basic Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | "" | A unique identifier for the tile component |
| show | boolean | true | Determines whether the tile is visible. Can be bound to variables for conditional display |
| loadOnDemand | boolean | false | When enabled and the show property is bound, defers initialization until the tile becomes visible |

## Layout Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| width | string | "" | Width of the tile, can be specified in px or % (e.g., "50px", "75%") |
| height | string | "" | Height of the tile, can be specified in px or % (e.g., "50px", "75%") |
| horizontalAlign | string | "left" | Sets the horizontal text alignment within the tile |

## Behavior Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| animation | string | "none" | Controls the animation effect applied to the tile. Works only at runtime |

## Configure Tile Layout Example

```javascript
// Set tile dimensions
Page.Widgets.myTile.width = "250px";
Page.Widgets.myTile.height = "200px";

// Change horizontal alignment
Page.Widgets.myTile.horizontalAlign = "center";
```