import React, { memo } from "react";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

interface WmButtonGroupProps extends BaseProps {
  vertical?: boolean;
  show?: boolean;
  horizontalalign?: string;
  children: React.ReactNode;
}

const DEFAULT_CLASS = "btn-group app-button-group";

const StyledButtonGroup = styled("div")(
  ({ vertical, horizontalalign }: { vertical?: boolean; horizontalalign?: string }) => ({
    display: "inline-flex",
    ...(vertical ? { flexDirection: "column" } : {}),
    ...(horizontalalign === "center" ? { justifyContent: "center" } : {}),
    ...(horizontalalign === "right" ? { justifyContent: "flex-end" } : {}),
  })
);

function WmButtonGroup(props: WmButtonGroupProps) {
  const {
    name,
    vertical,
    show = true,
    horizontalalign,
    children,
    styles,
    className,
    ...restProps
  } = props;

  const listItemStyles = {
    ...styles,
    display: show ? "inline-flex" : "none",
  };

  return (
    <StyledButtonGroup
      style={listItemStyles}
      className={clsx(DEFAULT_CLASS, className)}
      vertical={vertical}
      horizontalalign={horizontalalign}
      hint={name}
      title={name}
      id={name}
      name={name}
      {...restProps}
    >
      {children}
    </StyledButtonGroup>
  );
}

WmButtonGroup.displayName = "WmButtonGroup";

export default memo(withBaseWrapper(WmButtonGroup));
