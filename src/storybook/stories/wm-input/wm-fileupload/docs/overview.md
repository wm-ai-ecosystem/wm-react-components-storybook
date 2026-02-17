# Overview

The **FileUpload** component lets users select and upload files from their device to a server. It provides a simple, intuitive interface for file selection and transfer.

### Markup

```javascript
<wm-fileupload name="fileupload" cleariconclass="wi wi-clear" cleariconhint="Clear" variant="standard"
on-select="Variables.FileServiceUploadFile.invoke()"
on-delete="Variables.FileServiceDeleteFile.invoke()"></wm-fileupload>
```

### Examples

#### Properties

- This fileupload restricts the allowed file types, which can be configured in the markup or dynamically via script.

```javascript
<wm-fileupload contenttype=".gif .jpe .jpeg .jpg .png image/*" name="fileupload"></wm-fileupload>
```

```javascript
// Allow only image files to be uploaded
Page.Widgets.fileupload.contenttype = ".gif .jpe .jpeg .jpg .png image/*";
```

- This fileupload sets the maximum allowed file size, which can be configured in the markup or dynamically via script.

```javascript
<wm-fileupload maxfilesize="10" name="fileupload"></wm-fileupload>
```

```javascript
// Limit file uploads to 10 MB
Page.Widgets.fileupload.maxfilesize = 10;
```

#### Events

- This is the markup for a fileupload with an on-select event, executed when the user selects files to trigger actions or invoke service variables.

```javascript
<wm-fileupload on-select="fileuploadSelect($event, widget, selectedFiles)" name="fileupload"></wm-fileupload>
```

```javascript
Page.fileuploadSelect = function ($event, widget, selectedFiles) {
  // Note: The service variable 'FileServiceUploadFile' is automatically created when the FileUpload component is dragged onto the Studio canvas.

  // Bind the selected files as input to the service variable
  Page.Variables.FileServiceUploadFile.setInput("files", selectedFiles);

  // Invoke the service to process the selected files
  Page.Variables.FileServiceUploadFile.invoke();
};
```

#### Methods

- This method clears all files currently selected or uploaded in the FileUpload component. 

```javascript
// Remove all selected or uploaded files
Page.Widgets.fileupload.clear();
```
