import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
  Method,
} from "axios";
import { createContext, useContext, useRef, useMemo, ReactNode } from "react";
// @ts-ignore
import { HttpClientService } from "@wavemaker/variables";
import { WS_CONSTANTS } from "@wavemaker/react-runtime/variables/constants";
import { store } from "../store";
import { XSRF_HEADER_NAME } from "../store/slices/authSlice";
// Types
interface HttpContextType extends HttpClientService {
  axiosInstance: AxiosInstance;
}

interface HttpProviderProps {
  children: ReactNode;
  baseURL?: string;
}

// Create the HTTP service class implementing HttpClientService
class ModernHttpService implements HttpClientService {
  private axiosInstance: AxiosInstance;
  localeObject: any = store.getState().i18n.appLocale;

  constructor(baseURL: string = "") {
    this.axiosInstance = axios.create({ baseURL });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Create new headers instance
        const state = store.getState();
        const token = state.auth.token;
        const baseUrl = state.info?.appConfig?.url || "";
        const headers = new AxiosHeaders(config.headers);
        // Check if this is a file download operation
        const wmVariable = (config as any).__wmVariable;
        const isFileDownload = wmVariable?.operation === "getDownloadFile";

        // Only set Accept header for non-download operations
        if (!isFileDownload) {
          headers.set("Accept", "application/json");
        }

        config.headers = headers;
        config.withCredentials = config.withCredentials ?? true;
        if (config.url?.startsWith(baseUrl) && token) {
          if (config.headers) config.headers[XSRF_HEADER_NAME] = token;
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return {
          ...response,
          body: response.data,
          type: 4, // mimic Angular's HttpEventType.Response
        };
      },
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
        }
        throw error.response || error;
      }
    );
  }

  async send(options: any, variable: any): Promise<any> {
    const serviceInfo = variable.serviceInfo;
    let headers = new AxiosHeaders(options.headers);
    let requestBody: any = options.data;
    variable.cancelTokenSource = axios.CancelToken.source();
    let url: string = options.url;
    if (serviceInfo) {
      serviceInfo.proxySettings = serviceInfo?.proxySettings || { web: true };
      let isProxyCall = serviceInfo?.proxySettings?.web;
      url = isProxyCall ? options.url : serviceInfo?.directPath;
    }

    if (variable.category === "wm.CrudVariable") {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        url = url;
      } else {
        url = variable.config.baseUrl + options.url.replace(".//", "/").replace("./", "/");
      }
    } else if (
      variable.category === "wm.LiveVariable" &&
      !(url.startsWith("http://") || url.startsWith("https://"))
    ) {
      url = variable.config.baseUrl + options.url.replace("./", "/");
    } else if (url === serviceInfo?.directPath && options.url.startsWith("http")) {
      url = options.url;
    } else {
      url = variable.config.baseUrl + options.url.replace("./services", "")?.replace("./", "/");
    }

    // Ensure all requests are marked as XMLHttpRequest if not a direct call
    if (!options.isDirectCall) {
      headers = headers.set("X-Requested-With", "XMLHttpRequest");
    }

    const methodType = (serviceInfo?.methodType || options.method || "get").toLowerCase() as Method;
    const isNonDataMethod =
      WS_CONSTANTS.NON_DATA_AXIOS_METHODS.indexOf(methodType.toUpperCase()) > -1;

    const axiosConfig: any = {
      url: url.endsWith("/") ? url.slice(0, -1) : url,
      method: methodType,
      headers,
      cancelToken: variable.cancelTokenSource.token,
      withCredentials: options?.withCredentials !== false,
      ...(isNonDataMethod ? {} : { data: requestBody || {} }),
      __wmVariable: {
        name: variable.name,
        owner: variable.config._context.name,
        operation: variable.operation, // Add operation to the context
      },
    };

    // Set responseType for file download operations to prevent XML parsing errors
    if (
      variable.operation === "getDownloadFile" ||
      serviceInfo?.operationId === "FileController_getDownloadFile"
    ) {
      axiosConfig.responseType = "blob";
    }

    // Add progress tracking if provided
    if (options?.onUploadProgress) {
      axiosConfig.onUploadProgress = options.onUploadProgress;
    }

    try {
      const response = await this.axiosInstance.request(axiosConfig);

      // If this is a download operation, handle it with the working pattern
      if (
        variable.operation === "getDownloadFile" ||
        serviceInfo?.operationId === "FileController_getDownloadFile"
      ) {
        return this.handleFileDownload(response, options, variable);
      }

      return response;
    } catch (error: any) {
      throw error.response || error;
    }
  }

  async sendCall(requestParams: any, variable: any): Promise<any> {
    try {
      const response = await this.send(requestParams, variable);
      return response;
    } catch (error) {
      throw error;
    }
  }

  setLocale(locale: string) {
    this.localeObject = locale;
  }

  getLocale() {
    return this.localeObject;
  }

  cancel(variable: any): void {
    if (variable.cancelTokenSource) {
      variable.cancelTokenSource.cancel("Operation cancelled by user");
    }
  }

  /**
   * Handle file download operations with proper filename extraction and blob processing
   * @param response - Axios response object
   * @param options - Request options
   * @param variable - Variable configuration
   * @returns Modified response object with download success information
   */
  private handleFileDownload(response: AxiosResponse, options: any, variable: any): AxiosResponse {
    let filename = "download";
    const contentDisposition = response.headers["content-disposition"];

    if (contentDisposition) {
      // Simple extraction: look for filename= followed by the value
      const filenameMatch = contentDisposition.match(/filename[*]?=['"]?([^'";]+)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].trim();
      }
    }

    // Fallback to URL parameter or variable name
    if (!filename || filename === "download") {
      if (options.url && options.url.includes("file=")) {
        const urlParams = new URLSearchParams(options.url.split("?")[1]);
        filename = urlParams.get("file") || variable.name || "download";
      }
    }

    // Create blob URL and trigger download
    const blob = response.data; // This should be a blob due to responseType: "blob"
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.click();

    // Clean up the blob URL
    URL.revokeObjectURL(url);

    // Return success response for the variable
    return {
      ...response,
      data: { success: true, filename, downloaded: true },
    };
  }

  async uploadFile(url: string, data: any, variable: any, options?: any): Promise<any> {
    try {
      const requestParams = {
        url,
        data, // Send individual file
        method: "POST",
        headers: new AxiosHeaders({
          "Content-Type": "multipart/form-data",
        }),
        onUploadProgress: (progressEvent: any) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            options.notify(progress);
          }
        },
      };
      return new Promise((resolve, reject) => {
        variable.request = this.send(requestParams, variable)
          .then((event: any) => {
            resolve(event.data);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    } catch (error) {
      console.error("Unexpected error in uploadFile:", error);
      throw error;
    }
  }
}

// Create Context
const HttpContext = createContext<HttpContextType | null>(null);

// Provider Component
export const HttpProvider = ({ children, baseURL = "" }: HttpProviderProps) => {
  const httpService = useRef(new ModernHttpService(baseURL));

  const contextValue = useMemo(
    () => ({
      ...httpService.current,
      axiosInstance: httpService.current["axiosInstance"],
      send: httpService.current.send.bind(httpService.current),
      sendCall: httpService.current.sendCall.bind(httpService.current),
      cancel: httpService.current.cancel.bind(httpService.current),
      uploadFile: httpService.current.uploadFile.bind(httpService.current),
      getLocale: httpService.current.getLocale.bind(httpService.current),
    }),
    []
  );

  return <HttpContext.Provider value={contextValue}>{children}</HttpContext.Provider>;
};

// Hook
export const useHttp = () => {
  const context = useContext(HttpContext);
  if (!context) {
    throw new Error("useHttp must be used within an HttpProvider");
  }
  return context;
};

// Export singleton instance for direct usage
export const httpService = new ModernHttpService();
export default httpService;
