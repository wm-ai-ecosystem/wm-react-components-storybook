import React, { memo, Suspense, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import appstore from "@wavemaker/react-runtime/core/appstore";
import { WmSpinner } from "@/components/basic/spinner";

const WmPartialContainer = memo(
  (props: BaseProps) => {
    const { prefab, content, prefabName, onLoad } = props;
    const loadedRef = useRef(false);
    const params = {} as any;

    function handleLoad(widget: any) {
      if (onLoad && !loadedRef.current) {
        loadedRef.current = true;
        widget.viewParent = props.listener;
        onLoad(widget);
      }
    }

    Object.keys(props).forEach((k: string) => {
      //@ts-ignore
      params[k] = props[k];
    });

    const contentToRender = () => {
      if (prefab) {
        // @ts-ignore
        const partials = appstore.get(`${prefabName}-partials`).partials;
        const partial = partials.find((p: any) => p.name === content);
        return (
          <>
            {partial
              ? React.createElement(partial.component, { ...params, onRender: handleLoad })
              : null}
          </>
        );
      }

      // @ts-ignore
      const partials = appstore.get("AppConfig").partials;
      const partial = partials.find((p: any) => p.name === content);
      return (
        <>
          {partial
            ? React.createElement(partial.component, { ...params, onRender: handleLoad })
            : null}
        </>
      );
    };

    return (
      <Container className="partial-container">
        <Suspense fallback={<WmSpinner show={true} />}>{contentToRender()}</Suspense>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    const keys = ["content", "prefab", "prefabName", "partialName"];
    return keys.every(key => prevProps[key] === nextProps[key]);
  }
);

WmPartialContainer.displayName = "WmPartialContainer";

export default WmPartialContainer;
