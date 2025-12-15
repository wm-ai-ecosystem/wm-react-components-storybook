import React, { memo, useMemo } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { prefixPrefabResourceUrl } from "@wavemaker/react-runtime/utils/resource-url";

interface WmAudioProps extends BaseProps {
  mp3format?: string;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  audiopreload?: "auto" | "metadata" | "none";
  audiosupportmessage?: string;
  autoplay?: boolean;
  arialabel?: string;
  tabindex?: number;
  prefabName?: string;
}

const DEFAULT_CLASS = "app-audio";

const WmAudio = memo(
  (props: WmAudioProps) => {
    const {
      mp3format,
      prefabName,
      muted,
      controls,
      loop,
      audiopreload,
      audiosupportmessage,
      autoplay,
      hint,
      arialabel,
      tabindex,
      styles,
      className,
      ...restProps
    } = props;

    const computedSrc = useMemo(() => prefixPrefabResourceUrl(mp3format), [mp3format, prefabName]);

    return (
      <Box
        className={clsx(DEFAULT_CLASS, className)}
        title={hint}
        aria-label={arialabel}
        tabIndex={tabindex}
        sx={styles}
        style={styles}
        {...restProps}
      >
        <audio
          title={hint}
          src={computedSrc}
          muted={muted}
          controls={controls}
          loop={loop}
          preload={audiopreload}
          autoPlay={autoplay}
        >
          {audiosupportmessage}
          Your browser does not support the audio element.
        </audio>
      </Box>
    );
  },
  (prev, current) => {
    const keys: (keyof WmAudioProps)[] = ["mp3format", "hint", "arialabel", "tabindex"];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmAudio.displayName = "WmAudio";

export default withBaseWrapper(WmAudio);
