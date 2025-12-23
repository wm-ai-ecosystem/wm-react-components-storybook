import React, { memo } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface WmCarouselTemplateProps extends BaseProps {
  // Layout properties
  horizontalalign?: "left" | "center" | "right";

  // Content
  children?: React.ReactNode;

  // Template context (provided by parent carousel)
  item?: any;
  index?: number;
}

const DEFAULT_CLASS = "app-carousel-item item";

const WmCarouselTemplate = memo(
  (props: WmCarouselTemplateProps) => {
    const {
      name,
      horizontalalign = "center",
      children,
      className,
      styles,
      item,
      index,
      ...rest
    } = props;

    const getAlignmentStyles = () => {
      switch (horizontalalign) {
        case "left":
          return { justifyContent: "flex-start", textAlign: "left" as const };
        case "right":
          return { justifyContent: "flex-end", textAlign: "right" as const };
        case "center":
        default:
          return { justifyContent: "center", textAlign: "center" as const };
      }
    };

    return (
      <Box
        className={clsx(DEFAULT_CLASS, className)}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          ...getAlignmentStyles(),
          ...styles,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for memoization
    const keysToCompare: (keyof WmCarouselTemplateProps)[] = [
      "horizontalalign",
      "children",
      "className",
      "styles",
      "item",
      "index",
    ];

    return keysToCompare.every(key => {
      if (key === "item") {
        return JSON.stringify(prevProps[key]) === JSON.stringify(nextProps[key]);
      }
      return prevProps[key] === nextProps[key];
    });
  }
);

WmCarouselTemplate.displayName = "WmCarouselTemplate";

export default withBaseWrapper(WmCarouselTemplate);
