# Overview

The **Iframe Dialog** is a dialog component that displays content from an external URL within your application. It allows you to embed web pages, documentation, or other web resources in a popup window, while keeping users within your app. Only secure URLs can be used for security reasons.

### Markup

```javascript
<wm-iframedialog name="iframedialog" on-ok="Widgets.iframedialog.close()" class="modal-dialog modal-xs"
variant="default:xs"></wm-iframedialog>
```

### Examples

#### Properties 

- Sets the title displayed for the iframe dialog.

```javascript
Page.Widgets.iframedialog.title = "External Content";
```

- Controls the animation used when the iframe dialog appears.

```javascript
Page.Widgets.dialog.animation = "flash";
```

#### Events 

- Triggered on iframe dialog open.

```javascript
Page.iframedialogOpened = function ($event, widget) {
    // Dynamically set the iframe URL based on the selected module
    widget.url = Page.Widgets.moduleList.selecteditem.type === "API"
        ? "https://docs.example.com/api-guide"
        : "https://docs.example.com/user-guide";

    // Optionally, set the dialog title dynamically
    widget.title = "Documentation - " + Page.Widgets.moduleList.selecteditem.name;
};
```

#### Methods

- Opens the iframe dialog.

```javascript
Page.Widgets.iframedialog.open();
```

- Closes the iframe dialog.

```javascript
Page.Widgets.iframedialog.close();
```