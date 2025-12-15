import React, { useEffect, useRef } from "react";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

let timeoutId: any = null;
const WmPrefabContainer = (props: BaseProps) => {
  const DEFAULT_CLASS = "app-prefab-container full-height";
  const { styles, onLoad, onDestroy, children, className, ...rest } = props;
  const loadedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (onLoad && !loadedRef.current) {
      timeoutId = setTimeout(() => {
        onLoad(Event, { ref: ref.current });
      }, 1000);
      loadedRef.current = true;
    }
    return () => {
      if (onDestroy) {
        onDestroy(Event, { ref: ref.current });
      }
      if (timeoutId) {
        clearTimeout(timeoutId as unknown as number);
      }
    };
  }, [onLoad, onDestroy]);

  return (
    <div style={styles} {...rest} ref={ref} className={className || DEFAULT_CLASS}>
      {children}
    </div>
  );
};

export default WmPrefabContainer;
