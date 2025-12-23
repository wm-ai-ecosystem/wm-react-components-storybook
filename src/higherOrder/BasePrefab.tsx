import React, { useEffect, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "@wavemaker/react-runtime/store";
import merge from "lodash-es/merge";
import { MockApp, ProxyTarget } from "@wavemaker/react-runtime/types";
import BasePage from "@wavemaker/react-runtime/higherOrder/BasePage";
import appstore from "@wavemaker/react-runtime/core/appstore";
import { getPrefabDefinitions } from "@wavemaker/react-runtime/store/slices/appConfigSlice";
import PrefabProvider from "@wavemaker/react-runtime/context/PrefabContext";
import { WmSpinner } from "@/components/basic/spinner";
import withBaseWrapper from "./withBaseWrapper";
import { metadataService } from "@wavemaker/react-runtime/variables/metadata.service";

interface ComponentInfo {
  type: "PARTIAL" | "PREFAB";
  componentName: string;
  partials: any[];
  pages: any[];
  prefabInfo: any;
  componentType: "PREFAB";
}

export const BasePrefab = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  addPageScript: (app: MockApp, pageProxy: ProxyTarget) => void,
  getVariables: (pageProxy: ProxyTarget) => {
    Variables: Record<string, any>;
    Actions: Record<string, any>;
  },
  componentInfo?: ComponentInfo
) => {
  // Create a wrapper component to handle data fetching
  const BasePrefabWrapper = memo(
    (props: any) => {
      const { prefabname } = props;
      const { pages, partials, componentType, ...rest } = componentInfo || {};
      const dispatch = useAppDispatch();
      const appConfig = useAppSelector((state: any) => state.info.appConfig);
      const i18n = useAppSelector((state: any) => state.i18n);
      // Get prefab definitions from state if available
      const prefabDefinitions = useAppSelector((state: any) =>
        state.info[prefabname] ? state.info[prefabname] : null
      );

      const [loading, setLoading] = useState<boolean>(prefabDefinitions ? false : true);
      const [serviceDefs, setServiceDefs] = useState<Record<string, any>>(prefabDefinitions || {});
      const baseUrl = appConfig?.url || "";
      // Fetch service definitions when component mounts only if not already in state
      useEffect(() => {
        // Skip fetching if we already have the definitions in state
        if (prefabDefinitions || !baseUrl) {
          metadataService.setMetadata(prefabDefinitions || {}, prefabname);
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
            // Dispatch Redux action to store in state
            const response = await dispatch(
              getPrefabDefinitions({
                prefabName: prefabname,
                baseUrl: baseUrl,
                pages: pages || [],
              })
            ).unwrap();
            setServiceDefs(response || {});
            metadataService.setMetadata(response?.serviceDefs || {}, prefabname);
            appstore.set(`${prefabname}-partials`, {
              partials: partials || [],
            });
            // Call metadata service's load method to set metadata with correct base URL
            // This is equivalent to Angular's this.$metadata.load(prefabName)
            await metadataService.load(prefabname, baseUrl);
          } catch (error) {
            console.error("Failed to fetch service definitions:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchServiceDefs();
      }, [baseUrl, prefabname, dispatch, prefabDefinitions]);

      if (!prefabname) {
        return null;
      }

      if (loading) {
        return (
          <WmSpinner
            show={true}
            className="baseprefab-spinner"
            name="baseprefab-spinner"
            listener={{}}
          />
        );
      }

      const appLocale = merge({}, i18n?.appLocale || {}, i18n?.prefabMessages?.[prefabname] || {});

      const FragmentConsumer = (fragmentProps: any) => {
        const combinedProps = {
          ...props,
          ...fragmentProps,
        };

        return <WrappedComponent {...combinedProps} />;
      };

      // Apply BasePage HOC to our FragmentConsumer
      const EnhancedComponent = BasePage(
        FragmentConsumer,
        addPageScript,
        getVariables,
        { ...rest, componentName: prefabname, componentType },
        {
          serviceDefs: serviceDefs?.serviceDefs || {},
          appLocale,
          prefab: true,
          prefabName: prefabname,
          name: props.name,
        }
      );

      return (
        <>
          <EnhancedComponent {...props} />
        </>
      );
    },
    (next, prev) => next.prefabname === prev.prefabname
  );

  BasePrefabWrapper.displayName = "BasePrefabWrapper";

  const BasePrefabWithProvider = (props: any) => {
    return (
      <div hidden={props.hidden}>
        <PrefabProvider
          value={{
            inbound: props.inbound || {},
            outbound: props.outbound || {},
            prefabName: props.name,
          }}
        >
          <BasePrefabWrapper {...props} />
        </PrefabProvider>
      </div>
    );
  };
  BasePrefabWithProvider.displayName = "BasePrefabWithProvider";
  return withBaseWrapper(BasePrefabWithProvider);
};

export default BasePrefab;
