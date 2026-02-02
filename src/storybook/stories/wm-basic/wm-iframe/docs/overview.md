# Overview

An inline frame (**Iframe**) is used to embed another document within the current HTML document. Frames allow a visual HTML Browser window to be split into segments, each of which can show a different document. The iframe element represents a nested browsing context.

### Markup

```javascript
<wm-iframe name="iframe" iframesrc="https://www.wavemaker.com/"></wm-iframe>
```


### Examples

#### Properties

- Embedding a iframesrc with encoded URL parameters.

```javascript
Page.Widgets.iframe.iframesrc = "https://www.wavemaker.com";
Page.Widgets.iframe.encodeurl = true;
```