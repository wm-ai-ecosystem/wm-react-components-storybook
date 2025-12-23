import React, { HtmlHTMLAttributes, memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmPictureProps from "./props";
import { prefixPrefabResourceUrl } from "@wavemaker/react-runtime/utils/resource-url";

const DEFAULT_CLASS = "app-picture";

const StyledImage = styled("img")(({ styleConfig }: any) => ({
  ...(styleConfig || {}),
}));

export const WmPicture = memo(
  (props: WmPictureProps) => {
    let {
      pictureaspect = "None",
      resizemode = "fill",
      pictureplaceholder = "resources/images/imagelists/default-image.png",
      tabindex = 0,
      onLoad,
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      children,
      ref,
      ...restProps
    } = props;

    const [imgSource, setImgSource] = useState<string | undefined>(props.picturesource);
    const [imageWidth, setImageWidth] = useState<string | undefined>(props.width || "auto");
    const [imageHeight, setImageHeight] = useState<string | undefined>(props.height || "auto");

    useEffect(() => {
      let source = props.picturesource || "";
      if (props.encodeurl) {
        source = encodeURIComponent(source);
      }
      const prefixed = prefixPrefabResourceUrl(
        source || props.pictureplaceholder || "",
        props.prefabName
      );
      setImgSource(prefixed);
    }, [props.picturesource, props.encodeurl, props.pictureplaceholder, props.prefabName]);

    useEffect(() => {
      switch (props.pictureaspect) {
        case "H":
          setImageWidth(props.width || "100%");
          setImageHeight("auto");
          break;
        case "V":
          setImageWidth("auto");
          setImageHeight(props.height || "100%");
          break;
        case "Both":
          setImageWidth(props.height || "100%");
          setImageHeight(props.height || "100%");
          break;
        case "None":
        default:
          setImageWidth(props.width);
          setImageHeight(props.height);
          break;
      }
    }, [props.pictureaspect, props.width, props.height]);

    const styleConfig = {
      objectFit: resizemode || "cover",
    };

    const onClickHandler = (event: React.MouseEvent<HTMLImageElement>) => {
      onClick && onClick(event, props);
    };
    const onDoubleClickHandler = (event: React.MouseEvent<HTMLImageElement>) => {
      onDoubleClick && onDoubleClick(event, props);
    };
    const onMouseEnterHandler = (event: React.MouseEvent<HTMLImageElement>) => {
      onMouseEnter && onMouseEnter(event, props);
    };
    const onMouseLeaveHandler = (event: React.MouseEvent<HTMLImageElement>) => {
      onMouseLeave && onMouseLeave(event, props);
    };

    return (
      <>
        <StyledImage
          {...restProps}
          ref={ref as React.Ref<HTMLImageElement>}
          data-identifier="img"
          title={props.hint || props.name}
          onClick={onClickHandler}
          onDoubleClick={onDoubleClickHandler}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          src={imgSource || pictureplaceholder}
          alt={props.alttext || "image alt text not provided"}
          className={clsx(DEFAULT_CLASS, { [`img-${props.shape}`]: props.shape }, props.className)}
          sx={styleConfig}
          style={props.styles}
          height={imageHeight}
          width={imageWidth}
          aria-label={props.arialabel || "Picture content"}
          tabIndex={tabindex}
          {...({ name: props.name } as HtmlHTMLAttributes<HTMLImageElement>)}
        />
        {children}
      </>
    );
  },
  (prev, current) => {
    return prev.picturesource === current.picturesource;
  }
);

WmPicture.displayName = "WmPicture";

export default withBaseWrapper(WmPicture);
