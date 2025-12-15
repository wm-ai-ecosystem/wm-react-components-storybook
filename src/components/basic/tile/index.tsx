import React, { memo } from "react";
import Box from "@mui/material/Box";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import clsx from "clsx";

const DEFAULT_TILE_CLASS = "app-tile";

function WmTile(props: BaseProps) {
  const { styles, className, ...restProps } = props;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onClick?.(event, props);
  }

  function handleOnBlur(event: React.FocusEvent<HTMLButtonElement>) {
    props?.onBlur?.(event, props);
  }
  function handleOnFocus(event: React.FocusEvent<HTMLButtonElement>) {
    props?.onFocus?.(event, props);
  }

  function handleMouseOver(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onMouseOver?.(event, props);
  }
  function handleMouseOut(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onMouseOut?.(event, props);
  }

  function handleMouseEnter(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onMouseEnter?.(event, props);
  }
  function handleMouseLeave(event: React.MouseEvent<HTMLButtonElement>) {
    props?.onMouseLeave?.(event, props);
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
    ...(props?.onMouseOver && { onMouseOver: handleMouseOver }),
    ...(props?.onMouseOut && { onMouseOut: handleMouseOut }),
    ...(props?.onDoubleClick && { onDoubleClick: handleDoubleClick }),
    ...(props?.onKeydown && { onKeyDown: handleKeyDown }),
    ...(props?.onKeyup && { onKeyUp: handleKeyUp }),
    ...(props?.onClick && { onClick: handleClick }),
  };

  return (
    <Box
      className={clsx(DEFAULT_TILE_CLASS, className)}
      style={styles}
      {...restProps}
      {...domEvents}
    >
      {props.children}
    </Box>
  );
}

WmTile.displayName = "WmTile";

export default withBaseWrapper(WmTile);
