import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@wavemaker/react-runtime/store";
import merge from "lodash-es/merge";
import { MockApp, ProxyTarget } from "@wavemaker/react-runtime/types";
import BaseFragment from "@wavemaker/react-runtime/higherOrder/BasePage";
import appstore from "@wavemaker/react-runtime/core/appstore";
import { getPrefabDefinitions } from "@wavemaker/react-runtime/store/slices/appConfigSlice";

export const BasePartial = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  addPageScript: (app: MockApp, pageProxy: ProxyTarget) => void,
  getVariables: (pageProxy: ProxyTarget) => {
    Variables: Record<string, any>;
    Actions: Record<string, any>;
  },
  componentInfo?: any
) => {
  const BasePartialWrapper = (props: any) => {
    const { prefabName } = props;
    const dispatch = useAppDispatch();
    const info = useAppSelector((state: any) => state.info);
    const i18n = useAppSelector((state: any) => state.i18n);

    // Get prefab definitions from state if available
    const prefabDefinitions = useAppSelector((state: any) =>
      state.info.prefabs[prefabName] ? state.info.prefabs[prefabName].serviceDefs : {}
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [serviceDefs, setServiceDefs] = useState<Record<string, any>>(prefabDefinitions || {});

    const baseUrl = info?.appConfig?.url
      ? `${info.appConfig.url}/services/prefabs/${prefabName}/servicedefs`
      : "";
    const appLocale = merge({}, i18n?.appLocale || {}, i18n?.prefabMessages?.[prefabName] || {});

    // Fetch service definitions when component mounts only if not already in state
    useEffect(() => {
      // Skip fetching if we already have the definitions in state
      if (prefabDefinitions || !baseUrl) {
        setLoading(false);
        return;
      }

      const fetchServiceDefs = async () => {
        if (!baseUrl) {
          console.warn("Base URL is not available");
          setLoading(false);
          return;
        }

        try {
          const response = await dispatch(
            getPrefabDefinitions({ prefabName: prefabName, baseUrl })
          ).unwrap();
          setServiceDefs(response || {});
          appstore.set(`${prefabName}-partials`, {
            partials: componentInfo.partials,
          });
        } catch (error) {
          console.error("Failed to fetch service definitions:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchServiceDefs();
    }, [baseUrl, prefabDefinitions, prefabName]);

    if (loading) {
      return <div>Loading....</div>;
    }

    const FragmentConsumer = (fragmentProps: any) => {
      const combinedProps = {
        ...props,
        ...fragmentProps,
      };

      return <WrappedComponent {...combinedProps} />;
    };

    // Apply BaseFragment HOC to our FragmentConsumer
    const EnhancedComponent = BaseFragment(
      FragmentConsumer,
      addPageScript,
      getVariables,
      componentInfo,
      {
        serviceDefs,
        appLocale,
        baseUrl: baseUrl || "",
        Prefab: true,
        prefabName: prefabName,
      }
    );

    return <EnhancedComponent {...props} />;
  };

  return React.memo(BasePartialWrapper);
};

// Export the BasePrefab function as the default export
export default BasePartial;
