# Overview

The **Audio** component supports audio playback using the MP3 format only, offering reliable cross-platform playback controls within the application.

### Markup

```javascript
<wm-audio name="audio" controls="controls" audiopreload="none" variant="standard"></wm-audio>
```


### Examples

#### Properties

- This audio supports autoplay, looping, muting, and showing controls, which can be set in the markup or dynamically via script.

```javascript
<wm-audio autoplay="true" loop="true" muted="true" controls="true" mp3format="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3&quot;" name="audio"></wm-audio>
```

```javascript
// Enable autoplay so the audio starts automatically when loaded
Page.Widgets.audio.autoplay = true;

// Enable looping to play the audio repeatedly
Page.Widgets.audio.loop = true;

// Mute the audio by default
Page.Widgets.audio.muted = true;

// Show audio controls (play, pause, volume) to the user
Page.Widgets.audio.controls = true;
```


<!-- - Enable autoplay.

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
``` -->