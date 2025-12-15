import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface WmVideoProps extends BaseProps {
  arialabel?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  oggformat?: string;
  poster?: string;
  mp4format?: string;
  subtitlelang?: string;
  subtitlesource?: string;
  tabindex?: number;
  videosupportmessage?: string;
  videopreload?: "auto" | "metadata" | "none";
  webmformat?: string;
  prefabName?: string;
}

export default WmVideoProps;
