import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface WmPictureProps extends BaseProps {
  picturesource?: string;
  pictureplaceholder?: string;
  alttext?: string;
  encodeurl?: boolean;
  pictureaspect?: "None" | "H" | "V" | "Both";
  shape?: string;
  resizemode?: string;
  arialabel?: string;
  width?: string;
  height?: string;
  tabindex?: number;
  prefabName?: string;
}

export default WmPictureProps;
