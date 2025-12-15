import React, { memo, HTMLAttributes, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";
import clsx from "clsx";
import { TransitionProps } from "@mui/material/transitions";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "modal fade in";

interface WmDialogProps extends BaseProps {
  open?: boolean;
  onClose?: (e: any) => void;
  closable?: boolean;
  sheet?: boolean;
  modal?: boolean;
  onTransitionEntered?: () => void;
}

const FadeTransition = React.forwardRef(function FadeTransition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return (
    <Fade
      ref={ref}
      {...props}
      timeout={{
        enter: 300,
        exit: 0,
      }}
      easing={{
        enter: "cubic-bezier(0.4, 0, 0.2, 1)",
        exit: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {props.children}
    </Fade>
  );
});

// Memoized body scroll management
const useBodyScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (!lock || typeof document === "undefined") return;

    const body = document.body;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [lock]);
};

export const WmDialog = memo((props: WmDialogProps) => {
  const { children, className, open = false, onClose, modal = false, onTransitionEntered } = props;

  const transitionType = FadeTransition;
  const pageRef = document.getElementsByClassName("app-page")[0] || null;

  const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    // Block backdrop click only when modal || Block escape only when modal and explicitly not closable
    if (
      (reason === "backdropClick" && modal) ||
      (reason === "escapeKeyDown" && modal && props.closable === false)
    ) {
      return;
    }

    // Otherwise, call the onClose callback
    if (onClose) {
      onClose(event);
    }
  };

  if (!open) {
    return null;
  }
  useBodyScrollLock(open);

  const sheetPositionStyles = {
    ...(props.sheetposition === "top" && {
      position: "absolute",
      top: 0,
    }),
    ...(props.sheetposition === "bottom" && {
      position: "absolute",
      bottom: 0,
    }),
    ...(props.sheetposition === "left" && {
      alignItems: "flex-start",
      height: "var(--wm-modal-full-screen-height)",
      maxHeight: "var(--wm-modal-full-screen-height)",
    }),
    ...(props.sheetposition === "right" && {
      alignItems: "flex-end",
      height: "var(--wm-modal-full-screen-height)",
      maxHeight: "var(--wm-modal-full-screen-height)",
    }),
  };

  return (
    <Dialog
      {...{ name: props.name as HTMLAttributes<HTMLDivElement> }}
      open={open}
      onClose={handleClose}
      className={clsx(DEFAULT_CLASS, className)}
      TransitionComponent={transitionType}
      TransitionProps={{
        onEntered: onTransitionEntered,
      }}
      aria-modal={modal}
      style={{
        ...props.styles,
        minHeight: "var(--wm-modal-full-screen-height)",
        display: "block",
        ...(props.sheetposition && {
          padding: 0,
        }),
      }}
      container={pageRef}
      disableEscapeKeyDown={modal && props.closable === false}
      fullWidth
      keepMounted
      sx={{
        "& .MuiDialog-scrollPaper": {
          ...(props.sheet && {
            borderRadius: 0,
          }),
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
        "& .MuiDialog-paper": {
          margin: "0 !important",
          padding: "0 !important",
          borderRadius: "0 !important",
          ...(props.sheetposition && {
            width: "var(--wm-modal-full-screen-width)",
            maxWidth: "var(--wm-modal-full-screen-width)",
            ...sheetPositionStyles,
          }),
        },
      }}
    >
      {children}
    </Dialog>
  );
});

WmDialog.displayName = "WmDialog";

export default WmDialog;
