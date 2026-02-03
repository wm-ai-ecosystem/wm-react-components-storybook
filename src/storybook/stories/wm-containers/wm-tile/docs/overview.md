# Overview

The **Tile** to highlight key metrics, summaries, or quick navigation items. Tiles provide built-in styling and layout structure that helps present content in a visually organized and easy-to-scan format.

### Markup

```javascript
<wm-tile class="bg-default" name="tile1" variant="default:default">
  <wm-container
    height="100%"
    direction="row"
    width="fill"
    alignment="top-left"
    padding="8"
    name="container1"
    class="app-container-default"
    variant="default"
  >
    <wm-container
      direction="row"
      alignment="top-center"
      padding="8px"
      width="25%"
      height="fill"
      name="container2"
      class="app-container-default"
      variant="default"
    >
      <wm-icon
        name="tileIcon"
        iconclass="wi wi-bar-chart fa-3x"
        class="fa-xs"
        variant="default:xs"
      ></wm-icon>
    </wm-container>
    <wm-container
      direction="column"
      alignment="top-center"
      padding="8px"
      width="75%"
      height="fill"
      name="container3"
      class="app-container-default"
      variant="default"
    >
      <wm-label
        name="tileTitle"
        caption="title"
        class="p"
        fontunit="em"
        variant="default:p"
      ></wm-label>
      <wm-label
        name="tileStatLabel"
        caption="00"
        fontunit="em"
        class="h1 p"
        variant="default:p"
      ></wm-label>
    </wm-container>
  </wm-container>
</wm-tile>
```

### Examples

#### Properties

```javascript
// Update tile size
Page.Widgets.myTile.width = "300px";
Page.Widgets.myTile.height = "200px";

// Update alignment
Page.Widgets.myTile.horizontalAlign = "center";

// Update tile content dynamically
Page.Widgets.labelTitle.caption = "Active Users";
Page.Widgets.labelValue.caption = "1,240";
```

#### Events

```javascript
// Navigate to detailed report when tile is clicked
Page.myTileClick = function ($event, widget) {
  App.Actions.goToPage_DetailedReport.invoke();
};

// Highlight tile on mouse hover
Page.myTileMouseenter = function ($event, widget) {
  widget.class = "tile tile-highlight";
};

// Remove highlight when mouse leaves
Page.myTileMouseleave = function ($event, widget) {
  widget.class = "tile-default";
};
```

#### Methods

```javascript
// Show tile
Page.Widgets.myTile.show = true;

```
