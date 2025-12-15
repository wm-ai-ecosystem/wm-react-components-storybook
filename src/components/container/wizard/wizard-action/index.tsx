import { Box, Button } from "@mui/material";
import clsx from "clsx";
import { DefaultActionsProps } from "../props";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { memo } from "react";
import isEqual from "lodash-es/isEqual";

const ACTIONS_CLASS = "app-wizard-actions panel-footer";

const WmWizardAction = memo(
  ({ children, actionsalignment = "right" }: DefaultActionsProps) => {
    return <Box className={clsx(ACTIONS_CLASS, actionsalignment)}>{children}</Box>;
  },
  (prev, next) => {
    return (
      prev.actionsalignment === next.actionsalignment &&
      prev.children === next.children &&
      prev.listener === next.listener
    );
  }
);

WmWizardAction.displayName = "WmWizardAction";
export default withBaseWrapper(WmWizardAction);
