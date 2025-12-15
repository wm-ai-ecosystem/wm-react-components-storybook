import React, { useCallback, useMemo, useRef, useEffect } from "react";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { Card, CardHeader, CardMedia, Avatar, Typography, Box, CardProps } from "@mui/material";
import Image from "next/image";
import WmMenu from "@wavemaker/react-runtime/components/navigation/menu";
import { WmCardProps } from "./props";
import clsx from "clsx";

// Import the card sub-components to check their types
import WmCardContent from "./card-content";
import WmCardActions from "./card-actions";
import WmCardFooter from "./card-footer";

const WmCard: React.FC<WmCardProps> = props => {
  const {
    name,
    title,
    subheading,
    iconclass,
    iconurl,
    actions,
    picturesource,
    picturetitle,
    imageheight = "200px",
    itemaction,
    itemchildren,
    itemicon,
    itemlabel,
    itemlink,
    userrole,
    isactive,
    autoclose = "always",
    children,
    className = "",
    onClick,
    onDblclick,
    onMouseover,
    onMouseout,
    onMouseenter,
    onMouseleave,
    animation,
    height,
    width,
    cardItem,
    listener,
  } = props;

  const cardRef = useRef<HTMLDivElement>(null);

  // Compute if header should be shown
  const showHeader = useMemo(() => {
    return !!(title || subheading || iconclass || iconurl || actions);
  }, [title, subheading, iconclass, iconurl, actions]);

  // Handle keyboard events
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      cardRef.current?.click();
    }
  }, []);

  // Event handlers
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      // adds this to update the url when the card is clicked
      onClick?.(event, listener?.Widgets[name], cardItem, listener);
    },
    [onClick, listener, name]
  );

  const handleDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      onDblclick?.(event, listener?.Widgets[name], cardItem, listener);
    },
    [onDblclick, props]
  );

  const handleMouseOver = useCallback(
    (event: React.MouseEvent) => {
      onMouseover?.(event, listener?.Widgets[name], cardItem, listener);
    },
    [onMouseover, props]
  );

  const handleMouseOut = useCallback(
    (event: React.MouseEvent) => {
      onMouseout?.(event, listener?.Widgets[name], cardItem, listener);
    },
    [onMouseout, props]
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent) => {
      onMouseenter?.(event, listener?.Widgets[name], cardItem, listener);
    },
    [onMouseenter, props]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent) => {
      onMouseleave?.(event, listener?.Widgets[name], cardItem, listener);
    },
    [onMouseleave, props]
  );

  // Set tabindex on mount
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.setAttribute("tabindex", "0");
    }
  }, []);

  // Parse actions data for menu items
  const menuItems = useMemo(() => {
    if (!actions) return [];
    try {
      if (actions.startsWith("[") || actions.startsWith("{")) {
        return JSON.parse(actions);
      }
      return actions.split(",").map((action, index) => ({
        id: index,
        label: action.trim(),
        action: itemaction,
        icon: itemicon,
        link: itemlink,
        children: itemchildren,
      }));
    } catch (error) {
      console.warn("Failed to parse actions data:", error);
      return [];
    }
  }, [actions, itemaction, itemicon, itemlink, itemchildren]);

  // Helper function to check if a child is a specific component type
  const isComponentType = (child: React.ReactElement, ComponentType: any) => {
    return React.isValidElement(child) && child.type === ComponentType;
  };

  // Custom card props for MUI Card
  const cardProps: CardProps = {
    ref: cardRef,
    className: clsx("app-card card app-panel", className, animation ? `animated ${animation}` : ""),
    onKeyDown: handleKeyDown,
    onClick: handleClick,
    onDoubleClick: handleDoubleClick,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      width: width,
      height: height,
    },
  };

  // Render avatar for header
  const renderAvatar = () => {
    if (iconclass && !iconurl) {
      return (
        <Avatar className="app-card-avatar">
          <i className={`app-icon ${iconclass}`} />
        </Avatar>
      );
    }
    if (iconurl) {
      return (
        <Avatar className="app-card-avatar">
          <Image src={iconurl} alt="" width={40} height={40} style={{ borderRadius: "50%" }} />
        </Avatar>
      );
    }
    return null;
  };

  // Render action menu
  const renderActionMenu = () => {
    if (!actions) return null;

    return (
      <WmMenu
        type="anchor"
        iconclass="wm-sl-l sl-more-menu-vertical"
        menuposition="down,left"
        hint="Actions"
        caption=""
        dataset={menuItems}
        autoclose={autoclose}
        itemlabel={itemlabel}
        itemicon={itemicon}
        itemlink={itemlink}
        itemaction={itemaction}
        itemchildren={itemchildren}
        userrole={userrole}
        isactive={isactive}
        className="panel-action"
      />
    );
  };

  const cardHeaderProps = {
    className: "app-card-header panel-heading",
    avatar: renderAvatar(),
    action: renderActionMenu(),
    ...(title && {
      title: (
        <Typography variant="h4" className="card-heading">
          {title}
        </Typography>
      ),
    }),
    ...(subheading && {
      subheader: (
        <Typography variant="h5" className="card-subheading text-muted">
          {subheading}
        </Typography>
      ),
    }),
  };

  return (
    <Card {...cardProps}>
      {/* Card Header */}
      {showHeader && <CardHeader {...cardHeaderProps} />}

      {/* Card Image */}
      {picturesource && (
        <CardMedia
          component="div"
          className="app-card-image"
          style={{ maxHeight: imageheight }}
          sx={{
            padding: "0",
            margin: "0",
            backgroundColor: "transparent",
          }}
        >
          <Image
            src={picturesource}
            alt={picturetitle || ""}
            width={0}
            height={0}
            sizes="100vw"
            className="card-image"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </CardMedia>
      )}

      {/* Card Content */}
      {React.Children.map(children, child => {
        if (isComponentType(child as React.ReactElement, WmCardContent)) {
          return child;
        }
        return null;
      })}

      {/* Card Actions */}
      {React.Children.map(children, child => {
        if (isComponentType(child as React.ReactElement, WmCardActions)) {
          return child;
        }
        return null;
      })}

      {/* Card Footer */}
      <Box>
        {React.Children.map(children, child => {
          if (isComponentType(child as React.ReactElement, WmCardFooter)) {
            return child;
          }
          return null;
        })}
      </Box>
    </Card>
  );
};

export default withBaseWrapper(React.memo(WmCard));
