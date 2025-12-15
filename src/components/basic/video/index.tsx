import React, { HtmlHTMLAttributes, memo, useMemo } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmVideoProps from "./props";
import { prefixPrefabResourceUrl } from "@wavemaker/react-runtime/utils/resource-url";

const DEFAULT_CLASS = "app-video";

const Video = styled("video")({
  width: "100%",
  height: "auto",
});

const Source = styled("source")({});

const WmVideo = memo(
  (props: WmVideoProps) => {
    const {
      subtitlelang = "en",
      videoposter = "resources/images/imagelists/default-image.png",
      className,
      ...restProps
    } = props;

    const computedPoster = useMemo(
      () => prefixPrefabResourceUrl(videoposter, props.prefabName),
      [videoposter]
    );
    const computedMp4 = useMemo(
      () => prefixPrefabResourceUrl(props.mp4format, props.prefabName),
      [props.mp4format]
    );
    const computedWebm = useMemo(
      () => prefixPrefabResourceUrl(props.webmformat, props.prefabName),
      [props.webmformat]
    );
    const computedOgg = useMemo(
      () => prefixPrefabResourceUrl(props.oggformat, props.prefabName),
      [props.oggformat]
    );
    const computedSubtitles = useMemo(
      () => prefixPrefabResourceUrl(props.subtitlesource, props.prefabName),
      [props.subtitlesource]
    );

    return (
      <Box
        className={clsx(DEFAULT_CLASS, className)}
        title={props.hint}
        aria-label={props.arialabel}
        style={props.styles}
        {...restProps}
      >
        <Video
          controls={props.controls}
          poster={computedPoster}
          muted={props.muted}
          loop={props.loop}
          autoPlay={props.autoplay}
          preload={props.videopreload}
          tabIndex={props.tabindex}
          {...({ name: props.name } as HtmlHTMLAttributes<HTMLVideoElement>)}
        >
          {computedMp4 && <Source src={computedMp4} type="video/mp4" />}
          {computedWebm && <Source src={computedWebm} type="video/webm" />}
          {computedOgg && <Source src={computedOgg} type="video/ogg" />}

          {/* Conditionally render track element for subtitles */}
          {computedSubtitles && (
            <track
              kind="subtitles"
              label={subtitlelang}
              srcLang={subtitlelang}
              src={computedSubtitles}
              default
            />
          )}

          {props.videosupportmessage || "Your browser does not support the video tag."}
        </Video>
      </Box>
    );
  },
  (prev, current) => {
    const keys: (keyof WmVideoProps)[] = [
      "mp4format",
      "webmformat",
      "oggformat",
      "subtitlelang",
      "subtitlesource",
      "poster",
      "hint",
    ];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmVideo.displayName = "WmVideo";

export default withBaseWrapper(WmVideo);
