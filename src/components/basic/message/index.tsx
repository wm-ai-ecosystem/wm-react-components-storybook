import { memo, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import BaseProps from "@wavemaker/react-runtime/higherOrder/props";
import WmMessageProps, { MessageType } from "./props";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import clsx from "clsx";

const MESSAGE_TYPES: Record<string, MessageType> = {
  success: {
    class: "alert-success",
    iconClass: "wm-sl-l sl-check",
  },
  error: {
    class: "alert-danger",
    iconClass: "wi wi-cancel",
  },
  warning: {
    class: "alert-warning",
    iconClass: "wm-sl-l sl-alarm-bell",
  },
  info: {
    class: "alert-info",
    iconClass: "wi wi-info",
  },
  loading: {
    class: "alert-info alert-loading",
    iconClass: "fa fa-spinner fa-spin",
  },
};

const DEFAULT_CLS = "alert app-message";

export const WmMessage = memo(
  (props: WmMessageProps) => {
    const {
      caption = "Message",
      type = "success",
      hideclose = false,
      close,
      styles,
      open,
      name,
      animation,
      className,
    } = props;

    if (!open) return null;

    const getMessageType = (type: string) => {
      return MESSAGE_TYPES[type] || MESSAGE_TYPES.info;
    };

    const messageType = getMessageType(type);
    const messageClass = messageType.class;
    const iconClass = messageType.iconClass;

    return (
      <Box
        hidden={props.hidden}
        component="div"
        style={styles}
        className={clsx(
          DEFAULT_CLS,
          messageClass,
          animation ? `animated ${animation}` : "",
          className
        )}
        title={caption}
      >
        <Box
          component="i"
          aria-hidden="true"
          title={`${type}Alert`}
          className={`icon ${type} ${iconClass}`}
        />
        <Box component="span">{caption || ""}</Box>
        {!hideclose && (
          <WmButton
            title="Close"
            type="button"
            className="btn-transparent close"
            onClick={close}
            aria-label="Close"
            listener={{}}
            name=""
          >
            <span aria-hidden="true">&times;</span>
          </WmButton>
        )}
      </Box>
    );
  },
  (prev, next) => {
    const keys: (keyof WmMessageProps)[] = [
      "caption",
      "type",
      "hideclose",
      "onClose",
      "styles",
      "open",
      "hidden",
    ];
    return keys.every(key => prev[key] === next[key]);
  }
);

WmMessage.displayName = "WmMessage";

const WmMessageWrapper = (Component: React.ComponentType<BaseProps>) => {
  const WrappedComponent = (props: WmMessageProps) => {
    const { onClose } = props;
    const [messageOpen, setMessageOpen] = useState(true);
    const [messageCaption, setMessageCaption] = useState(props.caption);

    const hideMessage = () => {
      setMessageOpen(false);
    };

    const showMessage = (caption?: any) => {
      if (caption) {
        setMessageCaption(caption);
      }
      setMessageOpen(true);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      hideMessage();
      onClose?.(event);
    };

    const updatedProps = useMemo(() => {
      return {
        ...props,
        hideMessage,
        showMessage,
        close: handleClose,
        open: messageOpen,
        ...(messageCaption !== undefined && { caption: messageCaption }),
      };
    }, [props, messageOpen, handleClose, messageCaption]);

    return <Component {...updatedProps} />;
  };

  return WrappedComponent;
};

export default WmMessageWrapper(withBaseWrapper(WmMessage));
