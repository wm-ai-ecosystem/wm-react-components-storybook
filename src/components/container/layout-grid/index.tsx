import React from "react";
import clsx from "clsx";
import { Container } from "@mui/material";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-grid-layout clearfix";

function WmLayoutGrid(props: BaseProps) {
  const { styles, className, children, ...restProps } = props;

  return (
    <Container
      style={{
        ...styles,
        minWidth: "100%",
      }}
      className={clsx(DEFAULT_CLASS, className)}
      {...restProps}
    >
      {children}
    </Container>
  );
}
WmLayoutGrid.displayName = "WmLayoutGrid";
export default withBaseWrapper(WmLayoutGrid);
