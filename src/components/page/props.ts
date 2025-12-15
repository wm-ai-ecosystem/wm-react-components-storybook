import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface WmPageProps extends BaseProps {
  pagetitle?: string;
  onNavHeightChange?: (isFull: boolean) => void;
  OnAttach?: (event: { type: string; target: Window }, props: WmPageProps) => void;
  OnDetach?: (event: { type: string; target: Window }, props: WmPageProps) => void;
  OnDestroy?: (event: { type: string; target: Window }, props: WmPageProps) => void;
  OnOrientationChange?: (event: Event, props: WmPageProps) => void;
  OnResize?: (
    event: { type: string; target: Window },
    props: WmPageProps,
    size: { width: number; height: number }
  ) => void;
}

export default WmPageProps;
