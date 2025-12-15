import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import withBaseWrapper, { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
interface DialogHeaderProps extends BaseProps {
  closable?: boolean;
  title?: string;
  headinglevel?: "h1" | "h2" | "h4";
  iconclass?: string;
  iconurl?: string;
  iconwidth?: string;
  iconheight?: string;
  iconmargin?: string;
  heading: string;
  subheading?: string;
  onClose: () => void;
  titleid: string;
  dialogLocale?: {
    LABEL_CLOSE: string;
  };
}

const DEFAULT_ICON_DIMENSIONS = "21px";
const DEFAULT_CLASS = "app-dialog-header modal-header";

export const WmDialogHeader = (props: DialogHeaderProps) => {
  const {
    closable = true,
    title = "Alert",
    headinglevel = "h4",
    iconclass,
    iconurl,
    iconwidth = DEFAULT_ICON_DIMENSIONS,
    iconheight = DEFAULT_ICON_DIMENSIONS,
    iconmargin,
    heading,
    subheading,
    onClose,
    titleid,
    dialogLocale = { LABEL_CLOSE: "Close" },
    isDialog = true,
  } = props;

  const variant = headinglevel;

  return (
    <Box
      className={DEFAULT_CLASS}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant={variant}
        id={titleid}
        component={variant}
        sx={{ display: "flex", alignItems: "center" }}
        className="app-dialog-title modal-title"
      >
        {isDialog ? (
          iconurl && iconurl !== "" ? (
            <img
              src={iconurl}
              alt="dialog icon"
              style={{ width: iconwidth, height: iconheight, margin: iconmargin }}
            />
          ) : (
            <Box
              component="i"
              className={iconclass}
              style={{ width: iconwidth, height: iconheight, margin: iconmargin }}
            />
          )
        ) : (
          <></>
        )}

        <Box component="span" className="dialog-heading" id={props.titleid}>
          {heading}
        </Box>
        {subheading && (
          <Box
            component="span"
            className="dialog-sub-heading"
            title={subheading}
            style={{ marginLeft: "8px" }}
          >
            {subheading}
          </Box>
        )}
      </Typography>
      {closable && (
        <IconButton
          aria-label={`Close ${title ? title : ""} dialog`}
          onClick={onClose}
          title={dialogLocale.LABEL_CLOSE}
          className="app-dialog-close close"
        >
          {isDialog ? (
            <Box component="i" className="app-icon wi wi-clear" aria-hidden="true" />
          ) : (
            <></>
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default withBaseWrapper(WmDialogHeader);
