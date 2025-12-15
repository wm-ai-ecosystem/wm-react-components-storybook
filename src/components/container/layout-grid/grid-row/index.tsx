import clsx from "clsx";
import { Container } from "@mui/material";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-grid-row clearfix";

function WmGridRow(props: BaseProps) {
  return (
    <Container
      style={props.styles}
      className={clsx(DEFAULT_CLASS, props.className)}
      // {...props}
      // disableGutters
      // maxWidth={false}
    >
      {props.children}
    </Container>
  );
}

WmGridRow.displayName = "WmGridRow";

export default withBaseWrapper(WmGridRow);
