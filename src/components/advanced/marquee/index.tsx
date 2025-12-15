import React, { memo, useMemo, useCallback, useState } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmMarqueeProps from "./props";

const DEFAULT_CLASS = "app-marquee app-container";

const WmMarquee = memo(
  (props: WmMarqueeProps) => {
    const {
      direction = "left",
      scrollamount = 6,
      scrolldelay = 85,
      className,
      styles,
      children,
      id,
      ...restProps
    } = props;

    // State to track if animation is paused on hover
    const [isPaused, setIsPaused] = useState(false);

    // Generate unique animation name for this instance
    const animationName = useMemo(
      () => `marquee-${direction}-${Math.random().toString(36).substr(2, 9)}`,
      [direction]
    );

    // Calculate animation duration based on scrollamount and scrolldelay
    const animationDuration = useMemo(() => {
      const baseSpeed = 10;
      const delayFactor = scrolldelay / 85;
      const speedFactor = scrollamount / 6;

      return `${(baseSpeed * delayFactor) / speedFactor}s`;
    }, [scrollamount, scrolldelay]);

    const animationCSS = useMemo(() => {
      const animations = {
        left: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        right: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        up: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        down: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      };

      return animations[direction];
    }, [direction]);

    const containerStyles = useMemo(
      () => ({
        overflow: "hidden",
        whiteSpace: direction === "left" || direction === "right" ? "nowrap" : "normal",
        height: direction === "up" || direction === "down" ? "100%" : "auto",
        position: "relative" as const,
        ...styles,
      }),
      [direction, styles]
    );

    // Content styles with animation
    const contentStyles = useMemo(
      () => ({
        display: "inline-block",
        animationName: `${animationName}`,
        animationDuration: animationDuration,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDirection: "normal",
        animationFillMode: "none",
        animationPlayState: isPaused ? "paused" : "running",
        width: direction === "up" || direction === "down" ? "100%" : "auto",
      }),
      [animationName, animationDuration, direction, isPaused]
    );

    // Event handlers
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        props?.onClick?.(event, props);
      },
      [props]
    );

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setIsPaused(true);
        props?.onMouseEnter?.(event, props);
      },
      [props]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setIsPaused(false);
        props?.onMouseLeave?.(event, props);
      },
      [props]
    );

    return (
      <>
        <style>
          {`
            @keyframes ${animationName} {
              ${Object.entries(animationCSS)
                .map(
                  ([key, value]) =>
                    `${key} { ${Object.entries(value)
                      .map(([prop, val]) => `${prop}: ${val}`)
                      .join("; ")} }`
                )
                .join(" ")}
            }
          `}
        </style>

        <Box
          component="div"
          className={clsx(DEFAULT_CLASS, className)}
          sx={containerStyles}
          id={id}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          <Box component="div" sx={contentStyles}>
            {children}
          </Box>
        </Box>
      </>
    );
  },
  (prevProps, nextProps) => {
    const keys: (keyof WmMarqueeProps)[] = [
      "direction",
      "scrollamount",
      "scrolldelay",
      "className",
      "children",
    ];
    return keys.every(key => prevProps[key] === nextProps[key]);
  }
);

WmMarquee.displayName = "WmMarquee";

export default withBaseWrapper(WmMarquee);
