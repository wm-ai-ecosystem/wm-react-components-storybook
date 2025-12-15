import React from "react";
import clsx from "clsx";
import Snackbar from "@mui/material/Snackbar";
import WmPageToast from "@wavemaker/react-runtime/components/page/toast-container";

import { Toast, TOAST_CONFIG, ToastPosition } from "@wavemaker/react-runtime/actions/types";

const GET_POSITION = (
  position: ToastPosition
): {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
} => {
  const [vertical, horizontal] = position.split(" ");

  return {
    vertical: vertical === "bottom" ? "bottom" : "top",
    horizontal: horizontal === "right" ? "right" : horizontal === "left" ? "left" : "center",
  };
};

interface CustomToastProps {
  toast: Toast;
  onClose: () => void;
}
const CustomToast = ({ toast, onClose }: CustomToastProps) => {
  const {
    text,
    type = "info",
    position = toast.placement || TOAST_CONFIG.DEFAULT_POSITION,
    onClick,
  } = toast;

  const ispage = toast.content && typeof toast.content === "object";

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      try {
        onClick();
      } catch (err) {
        console.error("Error in toast onClick callback:", err);
      }
    }
    onClose();
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    onClose && onClose();
  };

  const anchorOrigin = GET_POSITION(position);

  if (ispage && toast.content !== undefined) {
    return (
      <Snackbar
        open={true}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        message={null}
        TransitionProps={{
          appear: false,
          style: {
            transition: "ease-in-out 0.3s",
          },
        }}
        onClick={handleClick}
      >
        <WmPageToast component={toast.content.component} />
      </Snackbar>
    );
  }

  const positions = ["top center", "bottom center"];

  return (
    <Snackbar
      open={true}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      autoHideDuration={toast.duration}
      className={clsx("toast-container", {
        [`toast-${position.replaceAll(" ", "-")}`]: !positions.includes(position),
      })}
      disableWindowBlurListener={true}
      message={
        <div className="toast-title">
          {type.toUpperCase()}
          <div className="toast-message">{text}</div>
        </div>
      }
      TransitionProps={{ appear: false }}
      onClick={handleClick}
      sx={{
        "& .MuiSnackbarContent-root": {
          alignItems: "unset !important",
        },
        "& .MuiSnackbar-root": {
          all: "unset !important",
        },
      }}
      style={{
        ...(position === "top center" && {
          top: "var(--wm-toast-position-top)",
        }),
        ...(position === "bottom center" && {
          bottom: "var(--wm-toast-position-bottom)",
        }),
      }}
      ContentProps={{
        sx: {
          "& .MuiSnackbarContent-message": {
            all: "unset",
          },
        },
        style: {
          ...(position === "center center" && {
            transform: "translateX(50%)",
          }),
        },
        className: `toast toast-${type} `,
      }}
    />
  );
};

export default CustomToast;
