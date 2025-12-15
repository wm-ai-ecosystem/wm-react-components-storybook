import clsx from "clsx";
import Box from "@mui/material/Box";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface PageContentProps extends BaseProps {
  columnwidth?: number;
}

const DEFAULT_CLASS = "app-page-content app-content-column";

function WmPageContent(props: PageContentProps) {
  const { className, columnwidth, styles } = props;
  return (
    <div
      style={styles}
      className={clsx(DEFAULT_CLASS, className, `col-sm-${columnwidth} col-md-${columnwidth}`)}
    >
      {props.children}
    </div>
  );
}

WmPageContent.displayName = "WmPageContent";

export default withBaseWrapper(WmPageContent);
