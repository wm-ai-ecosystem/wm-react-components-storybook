import { memo } from "react";
import { List } from "@mui/material";
import { AnimationType, PositionType } from "../props";
import clsx from "clsx";
import { ANIMATION_CLASSES } from "../constants";

const getAnimationClass = (type?: AnimationType, position?: PositionType): string => {
  if (!type || !position || !ANIMATION_CLASSES[type]) return "";
  return ANIMATION_CLASSES[type][position] || ANIMATION_CLASSES[type].name;
};

// Reusable menu list class builder
export const buildMenuListClasses = (
  iconposition: string,
  menulayout: string,
  horizontalPos: string,
  panelPosition?: string,
  animateitems?: AnimationType,
  menuposition?: PositionType,
  isHovered?: boolean
) => {
  return clsx(
    `icon-position-${iconposition}`,
    `menu-layout-${menulayout}`,
    "dropdown-menu",
    (horizontalPos === "left" && isHovered) || panelPosition === "left" ? "pull-right" : "",
    !panelPosition && horizontalPos === "left" ? "pull-right" : "",
    menulayout === "horizontal" ? "horizontal" : "",
    animateitems && `animated ${getAnimationClass(animateitems, menuposition)}`
  );
};

// Reusable Menu List Component
export const MenuList = memo(
  ({
    className,
    style,
    role = "menu",
    children,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }: {
    className?: string;
    style?: React.CSSProperties;
    role?: string;
    children: React.ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  }) => (
    <List
      className={className}
      role={role}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </List>
  )
);

MenuList.displayName = "MenuList";

// Reusable Collapsible Menu Component
export const CollapsibleMenu = memo(
  ({
    isOpen,
    verticalPos,
    children,
    className,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }: {
    isOpen: boolean;
    verticalPos: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  }) => {
    // Don't render anything if not open
    if (!isOpen) return null;

    return (
      <MenuList
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {children}
      </MenuList>
    );
  }
);

CollapsibleMenu.displayName = "CollapsibleMenu";
