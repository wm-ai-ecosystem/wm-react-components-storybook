import { HtmlHTMLAttributes, useEffect, useRef, useMemo } from "react";
import { clsx } from "clsx";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { ContainerProps } from "./props";
import { calculateAlignmentStyles, calculateSpacingStyles } from "./alignment-utils";

const DEFAULT_CLASS = "app-container";

// Alignment matrix (assumes direction: 'row' as base)
const alignmentMatrix = {
  "top-left": { justifyContent: "flex-start", alignItems: "flex-start" },
  "top-center": { justifyContent: "center", alignItems: "flex-start" },
  "top-right": { justifyContent: "flex-end", alignItems: "flex-start" },
  "middle-left": { justifyContent: "flex-start", alignItems: "center" },
  "middle-center": { justifyContent: "center", alignItems: "center" },
  "middle-right": { justifyContent: "flex-end", alignItems: "center" },
  "bottom-left": { justifyContent: "flex-start", alignItems: "flex-end" },
  "bottom-center": { justifyContent: "center", alignItems: "flex-end" },
  "bottom-right": { justifyContent: "flex-end", alignItems: "flex-end" },
  start: { justifyContent: "space-between", alignItems: "flex-start" },
  center: { justifyContent: "space-between", alignItems: "center" },
  end: { justifyContent: "space-between", alignItems: "flex-end" },
};

export const WmContainer = (props: ContainerProps) => {
  const {
    className,
    styles,
    children,
    renderPartial,
    id,
    display,
    direction = "row",
    wrap = false,
    alignment,
    gap,
    columngap,
  } = props;
  const isLoaded = useRef(false);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onClick?.(event, props);
  }

  function handleOnBlur(event: React.FocusEvent<HTMLButtonElement>) {
    props?.onBlur?.(event, props);
  }
  function handleOnFocus(event: React.FocusEvent<HTMLButtonElement>) {
    props?.onFocus?.(event, props);
  }

  function handleMouseEnter(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onMouseEnter?.(event, props);
  }
  function handleMouseLeave(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onMouseLeave?.(event, props);
  }
  function handleMouseOver(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onMouseOver?.(event, props);
  }
  function handleMouseOut(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onMouseOut?.(event, props);
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onDoubleClick?.(event, props);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    props?.onKeydown?.(event, props);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLButtonElement>) {
    props?.onKeyup?.(event, props);
  }

  const domEvents = {
    ...(props?.onBlur && { onBlur: handleOnBlur }),
    ...(props?.onFocus && { onFocus: handleOnFocus }),
    ...(props?.onMouseEnter && { onMouseEnter: handleMouseEnter }),
    ...(props?.onMouseLeave && { onMouseLeave: handleMouseLeave }),
    ...(props?.onDoubleClick && { onDoubleClick: handleDoubleClick }),
    ...(props?.onKeydown && { onKeyDown: handleKeyDown }),
    ...(props?.onKeyup && { onKeyUp: handleKeyUp }),
    ...(props?.onClick && { onClick: handleClick }),
    ...(props?.onMouseOver && { onMouseOver: handleMouseOver }),
    ...(props?.onMouseOut && { onMouseOut: handleMouseOut }),
  };

  const customStyles: Record<string, string> = {};
  if (styles?.backgroundImage) {
    customStyles.backgroundImage = `${styles?.backgroundImage?.includes("url(") ? styles?.backgroundImage : "url(" + styles?.backgroundImage + ")"}`;
  }

  // Memoize the computed styles for performance
  const computedStyles = useMemo(() => {
    const base = alignment && (alignmentMatrix as any)[alignment];
    if (!base) {
      return {
        ...styles,
        ...customStyles,
        display: display || props.direction ? "flex" : "",
        ["flex-flow"]: direction || "row",
      };
    }
    const alignmentStyles = calculateAlignmentStyles(alignmentMatrix, alignment, direction, wrap);
    const spacingStyles = calculateSpacingStyles(
      alignmentMatrix,
      gap,
      columngap,
      alignment,
      direction,
      wrap
    );

    return {
      ...styles,
      ...customStyles,
      ...alignmentStyles,
      ...spacingStyles,
      display: display || "flex",
      ["flex-flow"]: direction || "row",
    };
  }, [styles, customStyles, alignment, direction, wrap, gap, columngap, display]);

  useEffect(() => {
    if (props?.onLoad && !isLoaded.current) {
      props?.onLoad?.(props);
      isLoaded.current = true;
    }
  }, [props?.onLoad]);

  return (
    <div
      style={computedStyles}
      className={clsx({
        [className || ""]: Boolean(className),
        [DEFAULT_CLASS]: true,
      })}
      data-widget-id={props["data-widget-id"]}
      id={id}
      hidden={props.hidden}
      {...domEvents}
      {...({ name: props.name } as HtmlHTMLAttributes<HTMLDivElement>)}
    >
      {renderPartial ? renderPartial(props, props.onLoad) : children}
    </div>
  );
};

WmContainer.displayName = "WmContainer";

export default withBaseWrapper(WmContainer);
