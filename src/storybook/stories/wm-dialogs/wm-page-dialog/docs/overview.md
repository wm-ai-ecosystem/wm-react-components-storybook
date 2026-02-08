# Overview

The **Page Dialog** is a modal popup that displays the content of a page within a dialog window. The content property allows you to set any partial page or custom content to be shown. Users can interact with the dialog and dismiss it when finished, making it ideal for showing complex or reusable page content without navigating away from the current page.

### Markup

```javascript
<wm-pagedialog name="pagedialog" content="partialArtifacts" on-ok="Widgets.pagedialog.close()"></wm-pagedialog>
```

### Examples

#### Properties 

- Sets the title displayed for the page dialog.

```javascript
// Set the title of the login dialog to indicate session expiration
Page.Widgets.pagedialog.title = "Artifacts";
```

- Controls whether the page dialog shows the action buttons and controls its appearance behavior.

```javascript
// Disable the default action buttons (like OK/Cancel) in the page dialog
Page.Widgets.dialog.showactions = false;
```

#### Events 

- Triggered when the page dialog content is loaded.

```javascript
Page.pagedialogLoad = function (widget) {
  // Dynamically set the dialog content based on the selected item
  widget.content =
    Page.Widgets.pageSelectionList.selecteditem.name === "Artifacts"
      ? "partialArtifacts" // Load partial page for Artifacts
      : "partialHero"; // Load partial page for Hero

   // Set the dialog title dynamically to reflect the loaded content
  widget.title =
    widget.content === "partialArtifacts" ? "Artifact Details" : "Hero Details";
};
```

#### Methods

- Opens the page dialog.

```javascript
Page.Widgets.pagedialog.open();
```

- Closes the page dialog.

```javascript
Page.Widgets.pagedialog.close();
```