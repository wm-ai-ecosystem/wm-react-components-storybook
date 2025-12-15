import React, { useRef, useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import debounce from "lodash/debounce";
import Popover, { PopoverOrigin } from "@mui/material/Popover";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmAnchor } from "@wavemaker/react-runtime/components/basic/anchor";
import WmPopoverProps, { DEFAULT_PROPS } from "./props";

const WmPopover = (Props: WmPopoverProps) => {
  const props = { ...DEFAULT_PROPS, ...Props };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [placement, setPlacement] = useState(props.popoverplacement || "bottom");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const loadedRef = useRef(false);
  const [open, setOpen] = useState(false);

  const isOpen = Boolean(anchorEl);

  function handleLoad() {
    if (props.onLoad && !loadedRef.current) {
      loadedRef.current = true;
      const widgetInstance = { isOpen, ...props };
      props.onLoad(widgetInstance);
    }
  }

  useEffect(() => {
    handleLoad();
  }, [!loadedRef.current]);

  const calculatePlacement = () => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const viewWidth = window.innerWidth;
    const height = parseInt(props.popoverheight);
    const width = parseInt(props.popoverwidth);

    if (props.popoverplacement === "top" && rect.top < height) setPlacement("bottom");
    else if (props.popoverplacement === "bottom" && viewHeight - rect.bottom < height)
      setPlacement("top");
    else if (props.popoverplacement === "left" && rect.left < width) setPlacement("right");
    else if (props.popoverplacement === "right" && viewWidth - rect.right < width)
      setPlacement("left");
    else setPlacement(props.popoverplacement || "bottom");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setAnchorEl(anchorRef.current);
    } else if (event.key === "Escape") {
      setAnchorEl(null);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (anchorEl) {
      if (isDialogOpen) {
        setIsDialogOpen(false);
        setAnchorEl(null);
        props?.onHide?.(event.nativeEvent, props);
        return;
      }
      debounce(() => {
        setAnchorEl(null);
        props?.onHide?.(event.nativeEvent, props);
      }, 500);
    } else {
      if (open) {
        setOpen(false);
        return;
      }
      calculatePlacement();
      setAnchorEl(event.currentTarget);
      props?.onShow?.(event.nativeEvent, props);
      setIsDialogOpen(true);
    }
  };

  const anchorOrigin = {
    vertical: placement === "top" ? "top" : placement === "bottom" ? "bottom" : "center",
    horizontal: placement === "left" ? "left" : placement === "right" ? "right" : "center",
  } as PopoverOrigin;

  const transformOrigin = {
    vertical: placement === "top" ? "bottom" : placement === "bottom" ? "top" : "center",
    horizontal: placement === "left" ? "right" : placement === "right" ? "left" : "center",
  } as PopoverOrigin;

  function handleClose(event: React.MouseEvent<HTMLElement>, reason: string) {
    if (props.autoclose === "disabled") {
      return;
    }
    // Always: close when user clicks anywhere on the page
    else if (props.autoclose === "always") {
      setAnchorEl(null);
      props?.onHide?.(event.nativeEvent, props);
      return;
    }

    // Outside Click: close when user clicks outside the popover content
    else if (props.autoclose === "outsideClick") {
      if (reason === "backdropClick") {
        setAnchorEl(null);
        props?.onHide?.(event.nativeEvent, props);
      }
      return;
    }

    // Default behavior for any other autoclose value
    setAnchorEl(null);
    props?.onHide?.(event.nativeEvent, props);
  }

  const arrowStyles = useMemo(() => {
    if (!anchorRef.current) return {};
    return {
      ...(placement === "top" && {
        left: "calc(50% - 10px)",
      }),
      ...(placement === "bottom" && {
        left: "calc(50% - 10px)",
      }),
      ...((placement === "left" || placement === "right") && {
        top: anchorRef.current
          ? `${anchorRef.current.getBoundingClientRect().top + anchorRef.current.getBoundingClientRect().height / 2 - 10}px`
          : "calc(50% - 10px)",
      }),
    };
  }, [placement, props.popoverplacement, calculatePlacement]);

  const popoverHeight = props.popoverheight.includes("px")
    ? props.popoverheight
    : `${props.popoverheight}px`;
  const popoverWidth = props.popoverwidth.includes("px")
    ? props.popoverwidth
    : `${props.popoverwidth}px`;

  return (
    <>
      <div
        className={clsx({
          "disable-popover": props.disabled,
          "app-popover-wrapper": true,
        })}
        style={props.styles}
        name={props.name}
      >
        <WmAnchor
          hint={props.hint || props.name}
          ref={anchorRef}
          tabIndex={props.tabindex}
          className={clsx(props.className, {
            "disable-popover": props.disabled,
          })}
          styles={props.styles}
          onClick={handleClick}
          onMouseEnter={event => {
            if (props.interaction === "hover") {
              handleClick(event);
            }
          }}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="true"
          arialabel={props.arialabel}
          caption={props.caption}
          iconclass={props.iconclass}
          iconheight={props.iconheight}
          iconmargin={props.iconmargin}
          iconposition={props.iconposition}
          iconurl={props.iconurl}
          iconwidth={props.iconwidth}
          badgevalue={props.badgevalue}
          encodeurl={props.encodeurl}
          shortcutkey={props.shortcutkey}
        />
      </div>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        transitionDuration={{
          enter: 0,
          exit: 0,
        }}
        disableScrollLock
        slotProps={{
          paper: {
            style: {
              height: popoverHeight,
              width: popoverWidth,
            },
            className: clsx(
              placement,
              "app-popover in popover",
              props.contentanimation && `animated ${props.contentanimation}`,
              `popover-${placement}`,
              `bs-popover-${placement}`
            ),
          },
        }}
        style={{
          pointerEvents: props.autoclose === "disabled" ? "none" : "auto",
          height: popoverHeight,
          width: popoverWidth,
        }}
      >
        <div
          className={clsx("popover-arrow arrow", props.popoverarrow === false && "hidden")}
          style={arrowStyles}
        />

        {props.title && <div className="popover-title popover-header">{props.title}</div>}
        <div className="popover-content popover-body">
          {props.render && props.content ? props.render(props, handleLoad) : props.children}
        </div>
      </Popover>
    </>
  );
};

export default withBaseWrapper(WmPopover);
