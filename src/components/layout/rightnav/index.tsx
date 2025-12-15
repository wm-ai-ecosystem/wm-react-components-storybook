import clsx from "clsx";
import Box from "@mui/material/Box";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { memo } from "react";

const DEFAULT_CLASS = "app-right-panel";

interface RightNavProps extends BaseProps {
  columnwidth?: string;
}

const WmRightPanel = memo(
  (props: RightNavProps) => {
    const { styles, children, className, columnwidth = 2, id } = props;
    return (
      <Box id={id} sx={styles} className={clsx(DEFAULT_CLASS, className, `col-sm-${columnwidth}`)}>
        {children}
      </Box>
    );
  },
  () => true
);

WmRightPanel.displayName = "WmRightPanel";

export default withBaseWrapper(WmRightPanel);
