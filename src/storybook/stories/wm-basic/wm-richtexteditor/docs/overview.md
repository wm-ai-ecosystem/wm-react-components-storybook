# Overview

A **Richtext Editor** component allows users to create formatted/styled text similar to entering text into a word processor. The richtext editor is used to generate HTML text codes for your website or blog. The toolbar includes text-specific buttons. This makes it easy to create headers, bold text, italic, lists, set text alignment, embed images, audio, video, and more. Users can also add tables, change fonts, apply changes to font size and color.

### Markup

```javascript
<wm-richtexteditor name="richtexteditor"></wm-richtexteditor>
```


### Examples

#### Properties 

- Enable preview mode to display the formatted HTML content created in the richtext editor.

```javascript
Page.Widgets.richtexteditor.showpreview = true;
```

- Set the richtext editor to read-only mode to prevent editing while allowing content to be viewed.

```javascript
Page.Widgets.richtexteditor.readonly = true;
```


#### Events 


- Triggered on change whenever the value of the richtext editor is updated.

```javascript
    Page.richtexteditorChange = function ($event, widget, newVal, oldVal) {
      console.log("Old Value:", oldVal);
      console.log("New Value:", newVal);
};
```

- Triggered before the richtext editor is rendered on the page.

```javascript
    Page.richtexteditorBeforerender = function ($event, widget) {
    console.log("Rich Text Editor is about to render.");
};
```

