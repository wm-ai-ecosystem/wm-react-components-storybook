# Overview

The **Audio** component supports audio playback using the MP3 format only, offering reliable cross-platform playback controls within the application.

### Markup

```javascript
<wm-audio controls="controls" audiopreload="none" name="audio" mp3format="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></wm-audio>
```


### Examples

#### Properties

- Enable autoplay.

```javascript
Page.Widgets.audio.autoplay = true;
```

- Enable looping.

```javascript
Page.Widgets.audio.loop = true;
```

- Mute audio.

```javascript
Page.Widgets.audio.muted = true;
```

- Show controls.

```javascript
Page.Widgets.audio.controls = true;
```