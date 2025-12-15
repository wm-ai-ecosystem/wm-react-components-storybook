import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import clsx from "clsx";
import Container from "@mui/material/Container";
import React from "react";

import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmPageProps from "./props";

const DEFAULT_CLASS = "app-page container";

function WmPage(props: WmPageProps) {
  const propsRef = useRef(props);
  propsRef.current = props;

  const [windowSize, setWindowSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  const [hasFullNavHeight, setHasFullNavHeight] = useState(false);

  const handleNavHeightChange = useCallback((isFull: boolean) => {
    setHasFullNavHeight(isFull);
  }, []);

  const handleResize = useCallback(() => {
    const newSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    setWindowSize(prevSize => {
      // Only update if size actually changed
      if (prevSize.width !== newSize.width || prevSize.height !== newSize.height) {
        const currentProps = propsRef.current;
        if (currentProps.OnResize) {
          currentProps.OnResize({ type: "resize", target: window }, currentProps, newSize);
        }
        return newSize;
      }
      return prevSize;
    });
  }, []);

  // Memoized orientation change handler
  const handleOrientationChange = useCallback((event: Event) => {
    const currentProps = propsRef.current;
    if (currentProps.OnOrientationChange) {
      currentProps.OnOrientationChange(event, currentProps);
    }
  }, []);

  useEffect(() => {
    if (props.OnAttach) {
      props.OnAttach({ type: "attach", target: window }, props);
    }

    return () => {
      const currentProps = propsRef.current;
      if (currentProps.OnDetach) {
        currentProps.OnDetach({ type: "detach", target: window }, currentProps);
      }
      if (currentProps.OnDestroy) {
        currentProps.OnDestroy({ type: "destroy", target: window }, currentProps);
      }
    };
  }, []); // Empty dependency array - only run once

  // Handle resize events
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Call once initially if OnResize exists
    if (props.OnResize) {
      props.OnResize({ type: "resize", target: window }, props, windowSize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (!props.OnOrientationChange) return;

    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [handleOrientationChange, props.OnOrientationChange]);

  // Extract the props we're setting explicitly to avoid overrides
  const { className, styles, children, ...restProps } = props;

  const childrenWithCallback = useMemo(() => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onNavHeightChange: handleNavHeightChange,
          ...(child.props as any),
        });
      }
      return child;
    });
  }, [children, handleNavHeightChange]);

  return (
    <Container
      {...restProps}
      className={clsx(DEFAULT_CLASS, { "app-nav-full": hasFullNavHeight }, className)}
      sx={{
        ...styles,
      }}
    >
      {childrenWithCallback}
    </Container>
  );
}

WmPage.displayName = "WmPage";

export default withBaseWrapper(WmPage);
