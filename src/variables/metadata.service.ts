import { store } from "@wavemaker/react-runtime/store";
import axios from "axios";

interface ServiceDefinition {
  [key: string]: any;
}

interface SecurityDefinitions {
  [key: string]: any;
  oauthProvider?: {
    [key: string]: any;
  };
}

interface MetadataResponse {
  serviceDefs: ServiceDefinition;
  securityDefinitions?: SecurityDefinitions;
}

export class MetadataService {
  public metadataMap: Map<string, ServiceDefinition> = new Map();
  public providerMap: Map<string, SecurityDefinitions> = new Map();
  public readonly CONTEXT_APP = "app";

  constructor() {}

  public isLoaded(context?: string): boolean {
    const ctx = context || this.CONTEXT_APP;
    return this.metadataMap.has(ctx);
  }

  public async load(prefabName?: string, prefabBaseUrl?: string): Promise<ServiceDefinition> {
    const state = store.getState();
    const appConfig = state.info?.appConfig || {};
    const baseUrl = prefabBaseUrl ?? appConfig.url ?? "";
    const isPreview = appConfig.isPreview || false;
    const serviceDefSources = (window as any)._WM_APP_PROPERTIES?.serviceDefSources || "DYNAMIC";

    let url: string;
    const serviceDefFileName = prefabName
      ? `${prefabName}-prefab-servicedefs.json`
      : "app-servicedefs.json";

    if (isPreview || serviceDefSources === "DYNAMIC") {
      const previewPath = prefabName ? `prefabs/${prefabName}` : "";
      url = `${baseUrl}/services/${previewPath}/servicedefs`;
    } else {
      url = `${baseUrl}/services/servicedefs/${serviceDefFileName}`;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(url, { withCredentials: true })
        .then((response: any) => {
          this.metadataMap = this.metadataMap || new Map();
          this.providerMap = this.providerMap || new Map();

          const responseBody: MetadataResponse = response.data || {};

          this.metadataMap.set(prefabName || this.CONTEXT_APP, responseBody.serviceDefs);

          if (responseBody.securityDefinitions) {
            this.providerMap.set(prefabName || this.CONTEXT_APP, responseBody.securityDefinitions);
          }

          resolve(responseBody.serviceDefs);
        })
        .catch(reject);
    });
  }

  public setMetadata(metadata: ServiceDefinition, context?: string): void {
    this.metadataMap.set(context || this.CONTEXT_APP, metadata);
  }

  public getByOperationId(operationId: string, context?: string): any {
    const ctx = context || this.CONTEXT_APP;
    const map = this.metadataMap.get(ctx);
    return map && map[operationId];
  }

  public getByProviderId(providerId: string, context?: string): any {
    const ctx = context || this.CONTEXT_APP;
    const map = this.providerMap.get(ctx);
    return map && map[providerId];
  }

  public getByCrudId(crudId: string, context?: string): any[] {
    const ctx = context || this.CONTEXT_APP;
    let map: any = store.getState().info?.serviceDefs;
    if (ctx !== this.CONTEXT_APP) {
      map = store.getState().info?.prefabs?.[ctx]?.serviceDefs;
    }
    const ops: any[] = [];

    if (map) {
      for (const key in map) {
        if (map[key] && map[key].crudOperationId === crudId) {
          ops.push(map[key]);
        }
      }
    }

    return ops;
  }

  public getMessage(): void {
    // Placeholder method to match Angular interface
  }
}

// Export singleton instance for easy usage
export const metadataService = new MetadataService();
