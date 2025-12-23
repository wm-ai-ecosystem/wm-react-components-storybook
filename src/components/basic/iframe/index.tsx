import React, { useMemo } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import {
  securityService,
  SecurityContext,
  isInsecureContentRequest,
} from "@wavemaker/react-runtime/core/util/security";
import { needsEncoding } from "./iframe.utils";

// Extend BaseProps with optional properties
export interface WmIframeProps extends Omit<BaseProps, "name"> {
  iframesrc?: string;
  encodeurl?: boolean;
  name?: string;
  hint?: string;
  arialabel?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  styles?: React.CSSProperties;
}

const DEFAULT_CLASS = "embed-responsive app-iframe";

export const WmIframe: React.FC<WmIframeProps> = props => {
  const {
    iframesrc,
    encodeurl = false,
    name,
    hint,
    arialabel,
    width = "300px",
    height = "150px",
    className,
    styles,
  } = props;

  const { safeIframeSrc, showContentLoadError, errorMsg } = useMemo(() => {
    if (!iframesrc) {
      return {
        safeIframeSrc: undefined,
        showContentLoadError: false,
        errorMsg: "",
      };
    }

    let url = iframesrc;
    if (encodeurl && needsEncoding(url)) {
      url = encodeURIComponent(url);
    }

    // Check for insecure content request
    const isInsecure = isInsecureContentRequest(url);
    const error = isInsecure ? `Error: Cannot display content from ${iframesrc}` : "";

    // Only process URL if it's secure
    const trustedUrl = !isInsecure
      ? securityService.trustAs(url, SecurityContext.RESOURCE_URL)
      : "";

    return {
      safeIframeSrc: trustedUrl,
      showContentLoadError: isInsecure,
      errorMsg: error,
    };
  }, [iframesrc, encodeurl]);

  return (
    <Box
      component="div"
      className={DEFAULT_CLASS}
      width={width}
      height={height}
      style={styles}
      title={hint}
      hidden={props.hidden}
    >
      <Box
        seamless={true}
        component="iframe"
        className={clsx("embed-responsive-item iframe-content", className)}
        src={safeIframeSrc}
        title={arialabel || "iframe"}
        name={name}
        sx={{
          border: 0,
          margin: 0,
          width: width || "100%",
          height: height || "400px",
          ...styles,
        }}
        aria-label={arialabel || "iframe"}
      />
      {showContentLoadError && (
        <Box component="div" className="wm-content-info readonly-wrapper">
          <Box component="p" className="wm-message" title={hint || errorMsg}>
            {errorMsg}
          </Box>
        </Box>
      )}
    </Box>
  );
};

WmIframe.displayName = "WmIframe";

export default withBaseWrapper(WmIframe);
