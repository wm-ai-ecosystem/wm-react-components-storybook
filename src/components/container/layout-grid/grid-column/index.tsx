import clsx from "clsx";
import { Container } from "@mui/material";
import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

interface GridColumnProps extends BaseProps {
  columnwidth?: number;
}

const DEFAULT_CLASS = "app-grid-column";

const WmGridColumn = (props: GridColumnProps) => {
  const {
    columnwidth,
    className,
    children,
    styles,
    containerProps,
    horizontalalign = "right",
    ...otherProps
  } = props;

  return (
    <Container
      disableGutters
      maxWidth={false}
      style={styles}
      className={clsx(DEFAULT_CLASS, className, columnwidth && `col-sm-${columnwidth}`)}
      {...otherProps}
    >
      {children}
    </Container>
  );
};

WmGridColumn.displayName = "WmGridColumn";

export default withBaseWrapper(WmGridColumn);
