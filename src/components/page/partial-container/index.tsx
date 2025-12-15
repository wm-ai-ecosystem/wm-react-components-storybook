import React, { memo } from "react";
import Container from "@mui/material/Container";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import appstore from "@wavemaker/react-runtime/core/appstore";

const WmPartialContainer = memo(
  (props: BaseProps) => {
    const { prefab, content, prefabName } = props;

    const params = {} as any;
    Object.keys(props).forEach((k: string) => {
      //@ts-ignore
      params[k] = props[k];
    });

    const contentToRender = () => {
      if (prefab) {
        // @ts-ignore
        const partials = appstore.get(`${prefabName}-partials`).partials;
        const partial = partials.find((p: any) => p.name === content);
        return <>{partial ? React.createElement(partial.component, params) : null}</>;
      }

      // @ts-ignore
      const partials = appstore.get("AppConfig").partials;
      const partial = partials.find((p: any) => p.name === content);
      return <>{partial ? React.createElement(partial.component, params) : null}</>;
    };

    return <Container>{contentToRender()}</Container>;
  },
  (prevProps, nextProps) => {
    const keys = ["content", "prefab", "prefabName", "partialName"];
    return keys.every(key => prevProps[key] === nextProps[key]);
  }
);

WmPartialContainer.displayName = "WmPartialContainer";

export default WmPartialContainer;
