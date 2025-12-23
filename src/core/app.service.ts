import { getRouterInstance } from "@wavemaker/react-runtime/store/middleware/navigationMiddleware";
import { store } from "@wavemaker/react-runtime/store";
import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { XSRF_HEADER_NAME } from "@wavemaker/react-runtime/store/slices/authSlice";
import get from "lodash-es/get";
import isEmpty from "lodash-es/isEmpty";
import appstore from "./appstore";

export async function loadWmProperties(baseUrl: string) {
  try {
    const response = await axios.get(`${baseUrl ?? ""}/services/application/wmProperties.js`);
    const text = response.data;

    const jsonData = text.substring(text.indexOf("{"), text.length - 1);
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Failed to load WM properties:", error);
    return getDefaultProperties();
  }
}

export function getDefaultProperties() {
  return {
    defaultLanguage: "en",
    defaultTimezone: "UTC",
  };
}

const LOGIN_METHOD = {
  DIALOG: "DIALOG",
  PAGE: "PAGE",
  SSO: "SSO",
};

const createQueryString = (params?: Record<string, string | undefined>): string => {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .forEach(([key, value]) => {
      searchParams.set(key, value as string);
    });

  return searchParams.toString();
};

const mergeQueryParams = (
  baseParams: Record<string, string> = {},
  additionalParams: Record<string, string> = {}
): Record<string, string> => {
  return { ...baseParams, ...additionalParams };
};

/**
 * Gets the page which needs to be redirected to on successful login
 * @param config,
 * @param page, page name for redirection
 * @returns {any|string}
 */

export const getCurrentRouteQueryParam = (paramName: string): string | null => {
  if (typeof window === "undefined") return null; // Ensure this runs only in the browser

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(paramName);
};

export const getRedirectPage = (config: any, page?: string) => {
  const state = store.getState();
  const { info } = state;
  const homePage = info.appConfig.appProperties.homePage,
    loginPage = get(config, "loginConfig.pageName");
  let prevRedirectPage,
    redirectPage = page;

  // If user is already on Home page or Login page, they should not be redirected to that page, hence return undefined
  if (redirectPage === homePage || redirectPage === loginPage) {
    /*
     * Find previous redirect page from URL, if exists, user should redirect to that page.
     * USE CASE:
     *  - User is on http://localhost:8080/app/Login?redirectTo=page
     *  - A variable call fails resulting in 401
     *  - In this case, redirectTo page should be 'page' and not undefined
     */
    prevRedirectPage = getCurrentRouteQueryParam("redirectTo") ?? undefined;
    redirectPage = !isEmpty(prevRedirectPage) ? prevRedirectPage : undefined;
  }

  return redirectPage;
};

export const handle401 = async (
  page?: string,
  options?: { queryParams?: Record<string, string> }
) => {
  const state = store.getState();
  const { securityConfig } = state.auth;
  if (!securityConfig) return;

  if (!securityConfig?.securityEnabled) return;

  const router = getRouterInstance();
  if (!router) {
    console.error("Router is not defined");
    return;
  }
  const loginConfig = securityConfig.loginConfig || {};
  const userInfo = securityConfig.userInfo;
  const loginMethod = (loginConfig?.type || LOGIN_METHOD.PAGE).toUpperCase();

  if (userInfo?.userName) {
    const sessionTimeoutConfig = loginConfig.sessionTimeout || { type: LOGIN_METHOD.DIALOG };
    const sessionTimeoutMethod = (sessionTimeoutConfig.type || LOGIN_METHOD.DIALOG).toUpperCase();

    switch (sessionTimeoutMethod) {
      case LOGIN_METHOD.DIALOG:
        showLoginDialog();
        break;

      case LOGIN_METHOD.PAGE:
        page = page || "";

        const sessionTimeoutQueryParams = mergeQueryParams(
          { redirectTo: page },
          options?.queryParams
        );

        if (page !== sessionTimeoutConfig.pageName) {
          const queryString = createQueryString(sessionTimeoutQueryParams);
          router.push(`${sessionTimeoutConfig.pageName}${queryString ? `?${queryString}` : ""}`);
        }
        break;

      case LOGIN_METHOD.SSO:
        await handleSSOLogin(loginConfig, options);
        break;
    }
  } else {
    switch (loginMethod) {
      case LOGIN_METHOD.DIALOG:
        showLoginDialog(true);
        break;

      case LOGIN_METHOD.PAGE:
        page = page || getRedirectPage(securityConfig, page) || "";

        const loginQueryParams = mergeQueryParams({ redirectTo: page }, options?.queryParams);
        const queryString = createQueryString(loginQueryParams);
        /* 
          Prevents the page from refreshing if the user is already on the login page.
        */
        const isNotOnLoginPage = window.location.pathname.endsWith(loginConfig.pageName);
        const hasQueryString = queryString !== "";

        if (!isNotOnLoginPage && hasQueryString) {
          router.push(`${loginConfig.pageName}${queryString ? `?${queryString}` : ""}`);
        }
        break;

      case LOGIN_METHOD.SSO:
        await handleSSOLogin(loginConfig, options);
        break;
    }
  }
};

// Placeholder methods - implement based on your app's specific requirements
const showLoginDialog = (noRedirect = false) => {
  const DialogService = appstore.getDependency("DialogService");
  DialogService.open("CommonLoginDialog");
};

const getRedirectedRouteQueryParams = (): Record<string, string> => {
  if (typeof window === "undefined") {
    return {}; // Prevents errors during SSR
  }

  const params = new URLSearchParams(window.location.search);
  let queryParams: Record<string, string> = {};

  params.forEach((value, key) => {
    queryParams[key] = value;
  });

  return queryParams;
};

// accepts query object like {a:1, b:2} and returns a=1&b=2 string
export const getQueryString = (queryObject: Record<string, string | number | boolean>): string => {
  return Object.entries(queryObject)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};

const handleSSOLogin = async (config: any, options?: any) => {
  const state = store.getState();
  const { info } = state;
  const baseUrl = info.appConfig.url || "";
  const SSO_URL = baseUrl + "/services/security/ssologin",
    PREVIEW_WINDOW_NAME = "WM_PREVIEW_WINDOW";
  let page, queryParams;
  page = getRedirectPage(config);

  page = page ? "?redirectPage=" + encodeURIComponent(page) : "";
  /*
   * For preview, getRedirectedRouteQueryParams() gets the queryparams form the activated route
   * For deployed app, canactivate guard resolved to false and gets the queryparams from the canactivate gurard(no active route component)
   */
  queryParams = (options && options.queryParams) || getRedirectedRouteQueryParams();
  queryParams = getQueryString(queryParams);
  queryParams = queryParams ? "?" + queryParams : "";
  // showing a redirecting message
  // appending redirect to page and page params
  // const ssoUrl = getDeployedURL() + SSO_URL + page + queryParams; Not sure where should get getDeployedURL(), so removed for now, but this is required in actual implementation
  const ssoUrl = SSO_URL + page + queryParams;
  /*
   * remove iFrame when redirected to IdP login page.
   * this is being done as IDPs do not allow to get themselves loaded into iFrames.
   * remove-toolbar has been assigned with a window name WM_PREVIEW_WINDOW, check if the iframe is our toolbar related and
   * safely change the location of the parent toolbar with current url.
   */
  if (window.self !== window.top) {
    try {
      if (window.parent && window.location.origin === window.parent.origin) {
        if (window.parent.name === PREVIEW_WINDOW_NAME) {
          window.parent.location.href = window.self.location.href;
          window.parent.name = "";
        }
      } else {
        window.location.href = ssoUrl;
      }
    } catch (error) {
      window.location.href = ssoUrl;
    }
  } else {
    window.location.href = ssoUrl;
  }
};

export const setupAxiosInterceptors = () => {
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const state = store.getState();
      const token = state.auth.token;
      const baseUrl = state.info?.appConfig?.url || "";

      // Remove manual Cookie header setting as it's restricted by browsers
      // and withCredentials already handles cookie transmission

      if (config.url?.startsWith(baseUrl) && token) {
        if (config.headers) config.headers[XSRF_HEADER_NAME] = token;
      }
      return config;
    },
    error => {
      // Handle request config errors
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const state = store.getState();
        const { info } = state;

        // Check for 401 Unauthorized
        if (
          error.response.status === 401 &&
          error.response.config.url?.startsWith(info.appConfig.url) &&
          !error.response.config.url?.includes("/services/")
        ) {
          handle401();
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      // Always return a rejected promise to allow further error handling
      return Promise.reject(error);
    }
  );
};
