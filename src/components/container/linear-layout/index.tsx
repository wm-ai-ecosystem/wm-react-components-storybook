import React, { HtmlHTMLAttributes, useMemo } from "react";
import clsx from "clsx";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-linear-layout clearfix";

interface LinearLayoutProps extends BaseProps {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  horizontalalign?: "left" | "right" | "center";
  verticalalign?: "top" | "bottom" | "center";
  spacing?: string | number;
}

const hAlignValues = {
  left: "flex-start",
  right: "flex-end",
  center: "center",
} as const;

const vAlignValues = {
  top: "flex-start",
  bottom: "flex-end",
  center: "center",
} as const;

function WmLinearLayout(props: LinearLayoutProps) {
  const {
    styles,
    className,
    children,
    direction = "row",
    horizontalalign = "left",
    verticalalign = "top",
    spacing,
    id,
    name,
  } = props;

  // Calculate flex styles based on direction and alignment
  const computedStyles = useMemo(() => {
    const flexStyles: React.CSSProperties = {
      ...styles,
      display: "flex",
      flexDirection: direction,
    };

    // Apply alignment based on direction
    if (direction === "row" || direction === "row-reverse") {
      flexStyles.justifyContent = hAlignValues[horizontalalign];
      flexStyles.alignItems = vAlignValues[verticalalign];
    } else if (direction === "column" || direction === "column-reverse") {
      flexStyles.justifyContent = vAlignValues[verticalalign];
      flexStyles.alignItems = hAlignValues[horizontalalign];
    }

    return flexStyles;
  }, [styles, direction, horizontalalign, verticalalign]);

  // Generate spacing class
  const spacingClass = spacing ? `app-linear-layout-spacing-${spacing}` : "";
  const directionClass = `app-linear-layout-direction-${direction}`;

  return (
    <div
      style={computedStyles}
      className={clsx(DEFAULT_CLASS, directionClass, spacingClass, className)}
      data-widget-id={props["data-widget-id"]}
      id={id}
      {...({ name } as HtmlHTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}

WmLinearLayout.displayName = "WmLinearLayout";

export default withBaseWrapper(WmLinearLayout);
