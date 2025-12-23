import React, { memo, useMemo } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import Label from "@wavemaker/react-runtime/components/basic/label";
import Image from "next/image";
import { prefixPrefabResourceUrl } from "@wavemaker/react-runtime/utils/resource-url";

interface WmIconProps extends BaseProps {
  caption?: string;
  iconclass?: string;
  iconurl?: string;
  iconposition?: "left" | "right";
  iconsize?: string;
  arialabel?: string;
  prefabName?: string;
}

const DEFAULT_CLASS = "app-icon-wrapper";

export const WmIcon = memo((props: WmIconProps) => {
  const {
    name,
    listener,
    caption,
    hint,
    iconclass = "wm-sl-l sl-user",
    iconurl,
    prefabName,
    iconposition = "left",
    iconsize,
    arialabel,
    styles,
    className,
    id,
  } = props;
  const computedIconUrl = useMemo(
    () => prefixPrefabResourceUrl(iconurl, prefabName),
    [iconurl, prefabName]
  );

  const listItemStyles = {
    ...styles,
    fontSize: iconsize,
  };

  return (
    <Box
      className={clsx(DEFAULT_CLASS, className)}
      sx={{
        ...listItemStyles,
        flexDirection: iconposition === "right" ? "row-reverse" : "row",
      }}
      component={"span"}
      aria-label={arialabel}
      id={id}
      data-icon-position={iconposition}
      hidden={props.hidden}
    >
      <Box component="span" className="sr-only">
        {caption} Icon
      </Box>
      {computedIconUrl ? (
        <Image
          data-identifier="img"
          alt="Image"
          src={computedIconUrl}
          className={clsx("anchor-image-icon", iconclass)}
          aria-hidden="true"
          style={{
            width: iconsize || "auto",
            height: iconsize || "auto",
          }}
          width={parseInt(iconsize || "24", 10)}
          height={parseInt(iconsize || "24", 10)}
        />
      ) : (
        <i
          className={clsx("app-icon", iconclass)}
          aria-hidden="true"
          style={{
            width: iconsize || "auto",
            height: iconsize || "auto",
          }}
        />
      )}
      {caption && (
        <Label
          listener={listener}
          aria-hidden="true"
          className="app-label"
          name={name}
          caption={caption}
          hint={hint}
        />
      )}
    </Box>
  );
});

WmIcon.displayName = "WmIcon";

export default withBaseWrapper(WmIcon);
