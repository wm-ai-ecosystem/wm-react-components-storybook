# Overview

An inline frame (**Iframe**) is used to embed another document within the current HTML document. Frames allow a visual HTML Browser window to be split into segments, each of which can show a different document. The iframe element represents a nested browsing context.

### Markup

```javascript
<wm-iframe name="iframe" variant="standard"></wm-iframe>
```

### Examples

#### Properties

- The iframe source and encoding can be set in the markup or dynamically via script.

```javascript
<wm-iframe iframesrc="https://www.wavemaker.com" encodeurl="true" name="iframe"></wm-iframe>
```

```javascript
// Set the iframe's source URL and enable URL encoding dynamically
Page.Widgets.iframe.iframesrc = "https://www.wavemaker.com";
Page.Widgets.iframe.encodeurl = true;
```