# Overview

The **Card** component is a flexible UI element for displaying content like titles, images, icons, and action buttons in a structured layout. It is responsive and adapts to different screen sizes. Cards are typically placed inside a List component, where they can be bound to a dataset from databases, queries, or web services. Each card can display dynamic data and support interactive actions through buttons, making it ideal for displaying products, user profiles, or summarized information.

### Markup

```javascript
<wm-card name="card" class="app-card card-default" variant="default">
    <wm-card-content fontsize="0.8" fontunit="em" name="card_content">
        <wm-container direction="row" alignment="top-left" gap="4" width="280px" class="app-container-default"
            variant="default" height="260px" name="Blank" padding="12px"></wm-container>
    </wm-card-content>
</wm-card>
```

### Examples

#### Properties 

- This card displays a title (text) in its header, which can be set directly in the markup or updated dynamically via script.

```javascript
<wm-card title="Card" name="card"></wm-card>
```

```javascript
// Set or update the Card's title dynamically
Page.Widgets.card.title = "Card";
```

- This card displays an image, where the image source and its title can be set directly in the markup or updated dynamically via script.

```javascript
<wm-card picturesource="resources/images/imagelists/default-image.png" picturetitle="Card Image" name="card"></wm-card>
```

```javascript
// Set or update the Card image source and image title dynamically
Page.Widgets.card.picturesource = "resources/images/imagelists/default-image.png";
Page.Widgets.card.picturetitle = "Card Image";
```

#### Events 

- This is the markup for a standalone Card component with an on-click event, executed whenever the user clicks on the Card (when it is not placed inside a List Component).

```javascript
<wm-card on-click="cardClick($event, widget)" name="card"></wm-card>
```

```javascript
Page.cardClick = function ($event, widget) {
  // Verify that the click was triggered by a direct user interaction
  if ($event.type === "click") {
    // Toggle the visibility of a related details panel for this Card
    Page.Widgets.cardDetailsPanel.show = !Page.Widgets.cardDetailsPanel.show;

    // Optionally invoke a service to load or refresh data related to this Card
    Page.Variables.svGetDashboardMetrics.invoke();
  }
};
```

- This is the markup for a card component placed inside a List with an on-click event, executed whenever a user clicks a Card rendered from the List’s dataset. (This is the standard structure of Cards when dragged onto the design canvas.)

```javascript
<wm-list listclass="list-group" template="true" template-name="Blank Card" itemsperrow="auto" class="list-card"
    statehandler="URL" name="stvProductsList" dataset="bind:Variables.stvProductsList.dataSet" navigation="Basic"
    variant="standard">
    <wm-listtemplate layout="media" name="listtemplate">
        <wm-card name="card" class="app-card card-default" variant="default"
            on-click="cardClick($event, widget, item, currentItemWidgets)">
            <wm-card-content fontsize="0.8" fontunit="em" name="card_content">
                <wm-container direction="row" alignment="top-left" gap="4" width="280px" class="app-container-default"
                    variant="default" height="260px" name="Blank" padding="12px"></wm-container>
            </wm-card-content>
        </wm-card>
    </wm-listtemplate>
</wm-list>
```

```javascript
Page.cardClick = function ($event, widget, item, currentItemWidgets) {
  // Access the data object associated with the clicked Card (current list item) store its productId in an app-level variable
  App.Variables.reportConfig.dataSet.productId = item.productId;

  // Optionally, pass the selected productId as a page parameter during navigation.
  // Refer to the WaveMaker documentation for details on passing page parameters to a page or a partial.
  App.Actions.goToPage_ProductsDetails.invoke();


  // currentItemWidgets contains all components inside this Card within the List
  // Examples: labels, buttons, containers, etc.
  // Note: currentItem and currentItemWidgets cannot be accessed globally in the script
  // They are provided as parameters for events of components inside a List template
  // The current item's data is available as the `item` argument
  
  // Example: Update a label's caption inside the clicked Card
  // currentItemWidgets.label.caption = "Updated Caption";
};
```