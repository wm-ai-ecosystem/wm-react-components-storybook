# Overview

The **Iframe Dialog** is a dialog component that displays content from an external URL within your application. It allows you to embed web pages, documentation, or other web resources in a popup window, while keeping users within your app. Only secure URLs can be used for security reasons.

### Markup

```javascript
<wm-iframedialog on-ok="Widgets.iframedialog.close()" name="iframedialog" class="modal-dialog modal-xs" variant="default:xs"></wm-iframedialog>
```

### Examples

#### Properties 

- This iframe dialog has a configurable title property that determines the text displayed in the dialog header. The title can be bound to localized messages (i18N) for multi-language support and can be set either in the markup or updated dynamically via script.

```javascript
<wm-iframedialog title="bind:appLocale.LBL_EXTERNAL_CONTENT" name="iframedialog"></wm-iframedialog>
```

```javascript
// Set the iframe dialog title dynamically using a localized message (i18N)
Page.Widgets.iframedialog.title = Page.appLocale.LBL_EXTERNAL_CONTENT;
//Page.Widgets.iframedialog.title = "External Content";
```

#### Events 

- This is the markup for an iframe dialog with an on-opened event, executed when the dialog is displayed.

```javascript
<wm-iframedialog on-opened="iframedialogOpened($event, widget)" name="iframedialog"></wm-iframedialog>
```

```javascript
Page.iframedialogOpened = function ($event, widget) {
  // Example: Dynamically set the iframe URL based on the selected module
  widget.url = Page.Widgets.moduleList.selecteditem.type === "API"
      ? "https://docs.example.com/api-guide"
      : "https://docs.example.com/user-guide";

  // Optionally, dynamically set the dialog title based on selected module
  widget.title = "Documentation - " + Page.Widgets.moduleList.selecteditem.name;
};
```

#### Methods

- This method opens the iframe dialog programmatically.

```javascript
// Open the iframe dialog and display it to the user
Page.Widgets.iframedialog.open();
```

- This method closes the iframe dialog programmatically.

```javascript
// Close the iframe dialog and hide it from the user
Page.Widgets.iframedialog.close();
```