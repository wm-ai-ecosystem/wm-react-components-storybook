import React, { useEffect, useRef } from "react";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

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

  if (!show && !loadedRef.current) {
    return null;
  }
  return (
    <div
      {...rest}
      style={{
        ...styles,
        ...(width !== undefined && { width: parseFloat(width) }),
        ...(height !== undefined && { height: parseFloat(height) }),
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default WmPrefab;
