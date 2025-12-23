import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import DOMPurify from "dompurify";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

interface WmHtmlProps extends BaseProps {
  horizontalalign?: "left" | "center" | "right";
  height?: string;
  width?: string;
  show?: boolean;
  styles?: React.CSSProperties;
  hint?: string;
}

// Get dynamic styles based props
const getStyles = (props: WmHtmlProps): React.CSSProperties => {
  const { styles = {}, height, width, horizontalalign } = props;

  return {
    ...styles,
    ...(height ? { height } : {}),
    ...(width ? { width } : {}),
    ...(horizontalalign ? { textAlign: horizontalalign } : {}),
  };
};

const WmHtml = (props: WmHtmlProps) => {
  const {
    name,
    className,
    arialabel,
    onMouseEnter,
    onMouseLeave,
    onClick,
    onDoubleClick,
    onTap,
    onDoubletap,
    // Event functions coming from BaseProps
    eventCallback,
    forwardedRef,
    hint,
  } = props;

  const htmlRef = useRef<HTMLDivElement | null>(null);
  const [initialContentSet, setInitialContentSet] = useState(false);
  const [boundContentAttr, setBoundContentAttr] = useState<string | null>(null);
  const touchStartRef = useRef<number>(0);

  // Initialize content and check for bound content
  useEffect(() => {
    const element = htmlRef.current;
    if (!element) return;

    // Check for content.bind attribute
    const bindAttr = element.getAttribute("content.bind");
    setBoundContentAttr(bindAttr);

    // If there's a bound content attribute, clear the content
    if (bindAttr && !initialContentSet) {
      setInitialContentSet(true);
    }
  }, [initialContentSet]);

  // Event handlers with proper types
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e, props);
      eventCallback?.("click", { $event: e });
    },
    [onClick, props, eventCallback]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onDoubleClick?.(e, props);
      eventCallback?.("dblclick", { $event: e });
    },
    [onDoubleClick, props, eventCallback]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e, props);
      eventCallback?.("mouseenter", { $event: e });
    },
    [onMouseEnter, props, eventCallback]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e, props);
      eventCallback?.("mouseleave", { $event: e });
    },
    [onMouseLeave, props, eventCallback]
  );

  // Improved touch event handling
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const currentTime = new Date().getTime();

      if (onTap) {
        onTap(e, props);
      }
      eventCallback?.("tap", { $event: e });

      if (currentTime - touchStartRef.current < 300) {
        if (onDoubletap) {
          onDoubletap(e, props);
        }
        eventCallback?.("doubletap", { $event: e });
      }

      touchStartRef.current = currentTime;
    },
    [onTap, onDoubletap, props, eventCallback]
  );

  const handleRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      htmlRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef && node) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      props?.onFocus?.(e, props);
    },
    [props?.onFocus, props]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      props?.onBlur?.(e, props);
    },
    [props?.onBlur, props]
  );

  const domEvents = {
    ...(props?.onFocus && { onFocus: handleFocus }),
    ...(props?.onBlur && { onBlur: handleBlur }),
    ...(props?.onClick && { onClick: handleClick }),
    ...(props?.onDoubleClick && { onDoubleClick: handleDoubleClick }),
    ...(props?.onMouseEnter && { onMouseEnter: handleMouseEnter }),
    ...(props?.onMouseLeave && { onMouseLeave: handleMouseLeave }),
    ...(props?.onTouchStart && { onTouchStart: handleTouchStart }),
  };

  return (
    <Box
      component="div"
      ref={handleRefCallback}
      title={hint}
      className={`${className} app-html-container`}
      data-element-type="wm-html"
      data-name={name}
      aria-label={arialabel}
      {...domEvents}
      style={getStyles(props)}
      hidden={props.hidden}
    >
      {props.children}
    </Box>
  );
};

export default withBaseWrapper(WmHtml);
