# Overview

The **Page Dialog** is a modal popup that displays the content of a page within a dialog window. The content property allows you to set any partial page or custom content to be shown. Users can interact with the dialog and dismiss it when finished, making it ideal for showing complex or reusable page content without navigating away from the current page.

### Markup

```javascript
<wm-pagedialog on-ok="Widgets.pagedialog.close()" name="pagedialog"></wm-pagedialog>
```

### Examples

#### Properties 

- This page dialog has a configurable title property that determines the text displayed in the dialog header. The title can be set directly in the markup or updated dynamically via script.

```javascript
<wm-pagedialog title="Artifacts" name="pagedialog"></wm-pagedialog>
```

```javascript
// Set the title of the page dialog dynamically
Page.Widgets.pagedialog.title = "Artifacts";
```

- This page dialog has a configurable showactions property that determines whether the action buttons are displayed. The property can be set directly in the markup or updated dynamically via script.

```javascript
<wm-pagedialog showactions="false" name="pagedialog"></wm-pagedialog>
```

```javascript
// Disable the default action buttons in the page dialog dynamically
Page.Widgets.dialog.showactions = false;
```

#### Events 

- This is the markup for a page dialog with an on-load event, executed when the dialog content is loaded.

```javascript
<wm-pagedialog on-load="pagedialogLoad(widget)" name="pagedialog"></wm-pagedialog>
```

```javascript
Page.pagedialogLoad = function (widget) {
  // Dynamically set the dialog content based on the selected item
  widget.content = Page.Widgets.pageSelectionList.selecteditem.name === "Artifacts"
      ? "partialArtifacts" // Load partial page for Artifacts
      : "partialHero"; // Load partial page for Hero

  // Optionally, set the dialog title dynamically to reflect the loaded content
  widget.title = widget.content === "partialArtifacts" ? "Artifact Details" : "Hero Details";
};
```

#### Methods

- This method opens the page dialog programmatically.

```javascript
// Open the page dialog and display it to the user
Page.Widgets.pagedialog.open();
```

- This method closes the page dialog programmatically.

```javascript
// Close the page dialog and hide it from the user
Page.Widgets.pagedialog.close();
```