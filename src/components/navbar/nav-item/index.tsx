import { memo } from "react";
import clsx from "clsx";
import ListItem from "@mui/material/ListItem";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-nav-item";

export const WmNavItem = memo(
  (props: BaseProps) => {
    const { className, styles, id, onMouseEnter, onMouseLeave, ...rest } = props;
    return (
      <ListItem
        {...rest}
        name={name}
        id={id}
        sx={{
          display: "block",
          ...styles,
          width: "inherit",
          margin: "inherit",
          padding: "inherit",
          textAlign: styles?.textAlign ? `${styles.textAlign} !important` : "inherit",
        }}
        className={clsx(DEFAULT_CLASS, className)}
        title={props.hint}
        onMouseEnter={onMouseEnter as any}
        onMouseLeave={onMouseLeave as any}
      >
        {props.children}
      </ListItem>
    );
  },
  (prev, current) => {
    const keys: (keyof BaseProps)[] = ["className", "styles", "children", "hidden"];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmNavItem.displayName = "WmNavItem";

export default memo(withBaseWrapper(WmNavItem));
