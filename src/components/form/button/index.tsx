import { HtmlHTMLAttributes, memo, ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

interface WmButtonProps extends BaseProps {
  caption?: string;
  iconurl?: string;
  iconclass?: string;
  iconwidth?: string;
  iconheight?: string;
  iconmargin?: string;
  badgevalue?: string | number;
  shortcutkey?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
}

const DEFAULT_CLASS = "btn app-button";

export const WmButton = memo(
  (props: WmButtonProps) => {
    const {
      iconurl,
      iconclass,
      iconwidth,
      iconheight,
      iconmargin,
      iconposition = "left",
      caption,
      badgevalue,
      children,
      styles,
      conditionalstyles,
      className,
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeydown,
      onKeypress,
      onKeyup,
      listener,
      name,
      disabled,
      type = "button",
      shortcutkey,
      arialabel = caption,
      show = "true",
      ...restProps
    } = props;

    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (!shortcutkey) return;

      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.altKey && e.key.toLowerCase() === shortcutkey.toLowerCase()) {
          e.preventDefault();
          btnRef.current?.focus();
        }
      };

      window.addEventListener("keydown", handleGlobalKeyDown);
      return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [shortcutkey]);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      event.stopPropagation();
      onClick?.(event, props);
    }

    function handleOnBlur(event: React.FocusEvent<HTMLButtonElement>) {
      event.preventDefault();
      onBlur?.(event, props);
    }
    function handleOnFocus(event: React.FocusEvent<HTMLButtonElement>) {
      event.preventDefault();
      event.stopPropagation();
      onFocus?.(event, props);
    }

    function handleMouseEnter(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      event.stopPropagation();
      onMouseEnter?.(event, props);
    }
    function handleMouseLeave(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      event.stopPropagation();
      onMouseLeave?.(event, props);
    }

    function handleDoubleClick(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      onDoubleClick?.(event, props);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
      event.preventDefault();
      event.stopPropagation();
      onKeydown?.(event, props);
    }

    function handleKeyUp(event: React.KeyboardEvent<HTMLButtonElement>) {
      event.preventDefault();
      event.stopPropagation();
      onKeyup?.(event, props);
    }
    function handleKeyPress(event: React.KeyboardEvent<HTMLButtonElement>) {
      event.preventDefault();
      event.stopPropagation();
      onKeypress?.(event, props);
    }

    const EVENTS = {
      ...(onBlur && { onBlur: handleOnBlur }),
      ...(onFocus && { onFocus: handleOnFocus }),
      ...(onMouseEnter && { onMouseEnter: handleMouseEnter }),
      ...(onMouseLeave && { onMouseLeave: handleMouseLeave }),
      ...(onDoubleClick && { onDoubleClick: handleDoubleClick }),
      ...(onKeydown && { onKeyDown: handleKeyDown }),
      ...(onKeyup && { onKeyUp: handleKeyUp }),
      ...(onClick && { onClick: handleClick }),
      ...(onKeypress && { onKeyPress: handleKeyPress }),
    };

    return (
      <Button
        sx={{
          all: "initial",
          position: "relative",
          boxSizing: "border-box",
        }}
        style={styles}
        className={clsx(DEFAULT_CLASS, className)}
        disableFocusRipple={true}
        disableRipple={true}
        disableElevation={true}
        disableTouchRipple={true}
        icon-position={props.iconposition}
        {...({ name: name } as HtmlHTMLAttributes<HTMLButtonElement>)}
        id={name}
        type={type}
        ref={btnRef}
        caption={caption}
        disabled={disabled}
        aria-label={arialabel}
        title={props.hint}
        show={show?.toString()}
        {...restProps}
        {...EVENTS}
      >
        {iconurl && (
          <Image
            data-identifier="img"
            alt="button image"
            src={iconurl}
            className="button-image-icon"
            width={parseInt(iconwidth || "24", 10)}
            height={parseInt(iconheight || "24", 10)}
            style={{
              width: iconwidth || "auto",
              height: iconheight || "auto",
              margin: iconmargin || "0 4",
            }}
          />
        )}
        {iconclass && (
          <>
            <i
              className={clsx("app-icon", iconclass)}
              aria-hidden="true"
              style={{
                width: iconwidth || "auto",
                height: iconheight || "auto",
                margin: iconmargin || "0 4",
                fontSize: iconheight || "24",
              }}
            />
            <Box component="span" className="sr-only">
              {caption} {listener?.appLocale?.LABEL_ICON}
            </Box>
          </>
        )}
        <Box
          component="span"
          className="btn-caption"
          dangerouslySetInnerHTML={{ __html: caption || "" }}
          sx={{
            color: "inherit",
            fontSize: "inherit",
            fontFamily: "inherit",
            fontStyle: "inherit",
          }}
        />
        {children}
        {badgevalue && (
          <Badge
            sx={{
              all: "initial",
              lineHeight: "inherit",
              letterSpacing: "inherit",
              fontSize: "inherit",
            }}
            badgeContent={badgevalue}
            slotProps={{
              badge: {
                className: "badge pull-right",
                style: {
                  position: "absolute",
                  right: "0em",
                  top: "0em",
                  height: "inherit",
                  fontFamily: "initial",
                  width: "inherit",
                },
              },
            }}
          />
        )}
      </Button>
    );
  },
  (prev, current) => {
    const keys: (keyof WmButtonProps)[] = [
      "iconurl",
      "iconclass",
      "icon",
      "width",
      "iconheight",
      "iconmargin",
      "caption",
      "badgevalue",
      "disabled",
      "hidden",
    ];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmButton.displayName = "WmButton";

export default memo(withBaseWrapper(WmButton));
