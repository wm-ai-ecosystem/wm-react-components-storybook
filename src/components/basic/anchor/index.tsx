"use client";
import { memo, useMemo, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Badge from "@mui/material/Badge";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmAnchorProps from "./props";

import { getCurrentPath } from "@/core/util/utils";
// Define regex outside component to avoid recreation on each render
const GO_TO_PAGE_REGEX = /(?:\w+\?\.)?Actions(?:\?\.)?goToPage_(\w+)(?:\?\.)?invoke\(\)/;

const DEFAULT_CLASS = "app-anchor";

const getCurrentPageName = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[segments.length - 1];
};

export const WmAnchor = (props: WmAnchorProps) => {
  const {
    caption = "Link",
    iconclass,
    styles,
    className,
    iconheight,
    iconwidth,
    iconmargin,
    iconurl,
    iconposition = "left",
    badgevalue,
    listener,
    hyperlink,
    encodeurl,
    onClick,
    shortcutkey,
    arialabel,
    target,
    itemLink,
    ...restProps
  } = props;

  const path = getCurrentPath();
  const [isActive, setIsActive] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Extract navigation info from onClick
  const navigationInfo = useMemo(() => {
    if (!onClick) return { hasGoToPageExpr: false, goToPageName: null, isCurrentPage: false };

    const fnStr = onClick.toString();
    const match = GO_TO_PAGE_REGEX.exec(fnStr);

    if (!match) return { hasGoToPageExpr: false, goToPageName: null, isCurrentPage: false };

    const pageName = match[1];
    const currentPageName = getCurrentPageName(path);

    return {
      hasGoToPageExpr: true,
      goToPageName: pageName,
      isCurrentPage: pageName === currentPageName,
    };
  }, [onClick, path]);

  // Process hyperlink for href attribute
  const processedHyperlink = useMemo(() => {
    if (!hyperlink) return "#";

    let processedLink = hyperlink;
    if (encodeurl === "true") {
      processedLink = encodeURIComponent(processedLink);
    }

    if (processedLink.startsWith("www.")) {
      processedLink = `//${processedLink}`;
    }

    return processedLink;
  }, [hyperlink, encodeurl]);

  // Check if hyperlink matches current path
  const doesHyperlinkMatchCurrentPath = useMemo(() => {
    if (!hyperlink) return false;

    let processedLink = hyperlink;
    if (processedLink.startsWith("www.")) {
      processedLink = `//${processedLink}`;
    }

    try {
      if (processedLink.startsWith("/")) {
        return path === processedLink;
      }

      const url = new URL(processedLink, window.location.origin);
      return path === url.pathname;
    } catch {
      return path.endsWith(processedLink);
    }
  }, [hyperlink, path]);

  // Determine active state
  useEffect(() => {
    const activeByHyperlink = doesHyperlinkMatchCurrentPath;
    const activeByNavigationExpr = navigationInfo.isCurrentPage;

    setIsActive(activeByHyperlink || activeByNavigationExpr);
  }, [caption, path, doesHyperlinkMatchCurrentPath, navigationInfo.isCurrentPage, itemLink]);

  useEffect(() => {
    if (!linkRef.current) return;

    if (!hyperlink) {
      // Same as Angular: if no hyperlink, set javascript:void(0)
      linkRef.current.setAttribute("href", "javascript:void(0)");
    } else {
      // If there is a hyperlink, set the processed link
      linkRef.current.setAttribute("href", processedHyperlink);
    }
  }, [hyperlink, processedHyperlink]);

  // Calculate icon position styles
  const iconPositionStyles = useMemo(() => {
    if (iconposition === "top") {
      return {
        flexDirection: "column",
        alignItems: "center",
      };
    }
    return {
      direction: iconposition === "right" ? "rtl" : "ltr",
    };
  }, [iconposition]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hyperlink || navigationInfo.hasGoToPageExpr) {
      e.preventDefault();
    }

    if (onClick) {
      onClick(e);
    }
  };

  function handleMouseEnter(event: React.MouseEvent<HTMLAnchorElement>) {
    props.onMouseEnter?.(event, props);
  }
  function handleMouseLeave(event: React.MouseEvent<HTMLAnchorElement>) {
    props.onMouseLeave?.(event, props);
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    props.onDoubleClick?.(event, props);
  }

  function handleFocus(event: React.FocusEvent<HTMLAnchorElement>) {
    props.onFocus?.(event, props);
  }

  function handleBlur(event: React.FocusEvent<HTMLAnchorElement>) {
    props.onBlur?.(event, props);
  }

  // Disable context menu if no hyperlink
  const handleContextMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hyperlink) {
      e.preventDefault();
    }
  };

  const domEvents = {
    ...(props.onMouseEnter && { onMouseEnter: handleMouseEnter }),
    ...(props.onMouseLeave && { onMouseLeave: handleMouseLeave }),
    ...(props.onDoubleClick && { onDoubleClick: handleDoubleClick }),
    ...(props.onFocus && { onFocus: handleFocus }),
    ...(props.onBlur && { onBlur: handleBlur }),
    ...(props.onClick && { onClick: handleClick }),
  };

  const iconstyles = {
    height: iconheight || "auto",
    width: iconwidth || "auto",
    margin: iconmargin || "0 4",
  };
  return (
    <Link
      ref={linkRef}
      {...domEvents}
      style={{
        ...iconPositionStyles,
        ...styles,
      }}
      caption={caption}
      role="link"
      tabIndex={props.tabindex}
      className={clsx({
        [DEFAULT_CLASS]: true,
        [className || ""]: Boolean(className),
        ["active"]: isActive,
      })}
      onContextMenu={handleContextMenu}
      accessKey={shortcutkey}
      aria-label={
        arialabel || (badgevalue && caption ? `${caption} ${badgevalue}` : caption) || null
      }
      aria-current={isActive ? "page" : undefined}
      target={target}
      title={props.hint}
      data-identifier="anchor"
      {...(restProps as any)}
      name={props.name}
    >
      {iconurl && (
        <Image
          alt="Image"
          src={iconurl}
          className={clsx("anchor-image-icon", iconclass)}
          aria-hidden="true"
          style={iconstyles}
          width={parseInt(iconwidth || "24", 10)}
          height={parseInt(iconheight || "24", 10)}
        />
      )}
      {iconclass && (
        <i className={clsx("app-icon", iconclass)} aria-hidden="true" style={iconstyles} />
      )}
      {caption && (
        <>
          <Box component="span" className="sr-only">
            {`${caption} ${listener?.appLocale?.LABEL_ICON}`}
          </Box>
          <Box component="span" className="anchor-caption">
            {caption}
          </Box>
        </>
      )}
      {badgevalue && (
        <Badge
          component="span"
          sx={{
            fontSize: "inherit",
            "& .MuiBadge-badge": {
              transform: "none",
            },
          }}
          title={String(badgevalue)}
          badgeContent={badgevalue}
          className="badge pull-right"
        />
      )}
    </Link>
  );
};

WmAnchor.displayName = "WmAnchor";

export default withBaseWrapper(
  memo(WmAnchor, (prev, next) => {
    const keysToCompare: (keyof WmAnchorProps)[] = [
      "caption",
      "iconclass",
      "iconheight",
      "iconwidth",
      "iconurl",
      "iconmargin",
      "hyperlink",
      "iconposition",
      "badgevalue",
      "encodeurl",
      "className",
      "styles",
      "onClick",
      "arialabel",
      "target",
      "shortcutkey",
    ];

    return keysToCompare.every(key => prev[key] === next[key]);
  })
);
