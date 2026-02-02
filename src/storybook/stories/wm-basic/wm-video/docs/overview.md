# Overview

The **Video** component enables video playback within the application and provides consistent playback controls across supported platforms. It supports formats such as MP4, WebM, and Ogg, depending on browser compatibility.

### Markup

```javascript
    <wm-video controls="controls" videopreload="none" name="video" mp4format="https://videos.pexels.com/video-files/5155396/5155396-uhd_2560_1440_30fps.mp4"></wm-video>
```


### Examples

#### Properties 

- Enable autoplay.

```javascript
Page.Widgets.video.autoplay = true;
```

- Enable looping.

```javascript
Page.Widgets.video.loop = true;
```

- Mute video.

```javascript
Page.Widgets.video.muted = true;
```

- Show controls.

```javascript
Page.Widgets.video.controls = true;
```

