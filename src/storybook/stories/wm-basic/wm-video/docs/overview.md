# Overview

The **Video** component enables video playback within the application and provides consistent playback controls across supported platforms. It supports formats such as MP4, WebM, and Ogg, depending on browser compatibility.

### Markup

```javascript
<wm-video controls="controls" videopreload="none" name="video" variant="standard"></wm-video>
```

### Examples

#### Properties 

- This video supports autoplay, looping, muting, and showing controls, which can be set in the markup or dynamically via script.

```javascript
<wm-video autoplay="true" loop="true" muted="true" controls="true" mp4format="https://videos.pexels.com/video-files/5155396/5155396-uhd_2560_1440_30fps.mp4" name="video"></wm-video>
```

```javascript
// Enable autoplay so the video starts automatically when loaded
Page.Widgets.video.autoplay = true;

// Enable looping to play the video repeatedly
Page.Widgets.video.loop = true;

// Mute the video by default
Page.Widgets.video.muted = true;

// Show video controls (play, pause, volume) to the user
Page.Widgets.video.controls = true;
```

