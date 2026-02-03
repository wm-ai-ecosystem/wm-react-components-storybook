# Properties

<details open>
<summary>Basic Properties</summary>

| Name | Type | Description |
|------|------|-------------|
| name | string | A unique identifier for the tile component |
| show | boolean | Determines whether the tile is visible. Can be bound to variables for conditional display |
| loadOnDemand | boolean | When enabled and the show property is bound, defers initialization until the tile becomes visible |

</details>



<details>
<summary>Layout Properties</summary>

| Name | Type | Description |
|------|------|-------------|
| width | string | Width of the tile, can be specified in px or % |
| height | string | Height of the tile, can be specified in px or % |
| horizontalAlign | string <br> "left" <br> "center" <br> "right" | Sets the horizontal text alignment within the tile |

</details>



<details>
<summary>Behavior Properties</summary>

| Name | Type | Description |
|------|------|-------------|
| animation | string <br> "none" <br> "fade" <br> "slide" <br> "bounce" | Controls the animation effect applied to the tile. Works only at runtime |

</details>
