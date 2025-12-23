import React, { useEffect, useRef } from "react";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { removeInvalidAttributes } from "@wavemaker/react-runtime/utils/attr";

const WmPrefab = (props: BaseProps) => {
  const {
    styles,
    onLoad,
    onDestroy,
    onRender,
    children,
    trafficlayer,
    transitlayer,
    stopover,
    onMarkerclick,
    onMarkerhover,
    onMarkerdragend,
    show = true,
    listener,
    width,
    height,
    ...rest
  } = props;
  const loadedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (onLoad && !loadedRef.current) {
      setTimeout(() => {
        onLoad(Event, { ref: ref.current });
      }, 1000);
      loadedRef.current = true;
    }
    return () => {
      if (onDestroy) {
        onDestroy(Event, { ref: ref.current });
      }
    };
  }, [onLoad, onDestroy]);

  return (
    <div
      {...removeInvalidAttributes(rest, ["hidden"])}
      style={{
        ...styles,
        ...(width !== undefined && { width: parseFloat(width as string) }),
        ...(height !== undefined && { height: parseFloat(height as string) }),
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default WmPrefab;
