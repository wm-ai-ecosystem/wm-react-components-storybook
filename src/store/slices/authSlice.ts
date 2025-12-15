import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import each from "lodash-es/each";
import { getRouterInstance } from "@wavemaker/react-runtime/store/middleware/navigationMiddleware";
import { getServiceDefinitions } from "@wavemaker/react-runtime/store/slices/appConfigSlice";
import { getCurrentRouteQueryParam, handle401 } from "@wavemaker/react-runtime/core/app.service";
import { checkPublicAccess, getValidJSON } from "@wavemaker/react-runtime/core/util";
import { clearAccessCache } from "@wavemaker/react-runtime/hooks/useAccess";
import { ROUTING_BASEPATH } from "@/core/constants";

export const XSRF_COOKIE_NAME = process.env.NEXT_PUBLIC_XSRF_COOKIE_NAME || "wm_xsrf_token";
export const XSRF_HEADER_NAME = process.env.NEXT_PUBLIC_XSRF_HEADER_NAME || "X-WM-XSRF-TOKEN";
export const SESSION = "SESSION";

export interface LoggedInUserConfig {
  isAuthenticated: boolean;
  isSecurityEnabled: boolean;
  roles: Array<string>;
  name: string;
  id: string;
  tenantId: string;
  userAttributes: any;
  landingPage: string;
}

export enum USER_ROLE {
  EVERYONE = "Everyone",
  ANONYMOUS = "Anonymous",
  AUTHENTICATED = "Authenticated",
}

export interface LoginOptions {
  baseURL: string;
  formData: Record<string, string>;
  useDefaultSuccessHandler?: boolean;
}

export interface AuthState {
  isLoggedIn: boolean;
  isPageLoading: boolean;
  loggedInUser: LoggedInUserConfig | null;
  securityConfig: any;
  token: string | null;
  landingPage: string;
  error: string | null;
}

export const defaultUserState: LoggedInUserConfig = {
  isAuthenticated: false,
  isSecurityEnabled: false,
  roles: [],
  name: "",
  id: "",
  tenantId: "",
  userAttributes: {},
  landingPage: "",
};

const initialState: AuthState = {
  isLoggedIn: false,
  isPageLoading: false,
  loggedInUser: null,
  securityConfig: null,
  token: null,
  landingPage: "",
  error: null,
};

export const loadSecurityInfo = createAsyncThunk(
  "auth/loadSecurityInfo",
  async (baseURL: string, { dispatch, rejectWithValue }) => {
    const pathname = window.location.pathname;

    const cookieToken = document?.cookie?.split(";").filter(item => item.includes("wm_xsrf_token"));
    if (cookieToken && cookieToken.length > 0) {
      const wmXsrfToken = cookieToken[0].split("=")[1];
      if (wmXsrfToken) {
        dispatch(setToken(wmXsrfToken));
      }
    }

    try {
      dispatch(setPageLoading(true));
      const response = await axios.get(`${baseURL}/services/security/info`);
      const details = response.data;

      const secConfig = details || {};
      secConfig.isSecurityEnabled = !!details?.securityEnabled;

      if (typeof details !== "string" && (!details?.securityEnabled || details?.authenticated)) {
        if (details?.authenticated) {
          const router = getRouterInstance();
          const user: LoggedInUserConfig = {
            isAuthenticated: Boolean(details.authenticated),
            isSecurityEnabled: Boolean(details.authenticated),
            roles: Array.isArray(details.userInfo?.userRoles) ? details.userInfo.userRoles : [],
            name: details.userInfo?.userName || "",
            id: details.userInfo?.userId || "",
            tenantId: details.userInfo?.tenantId || "",
            userAttributes:
              typeof details.userInfo?.userAttributes === "object"
                ? details.userInfo.userAttributes
                : {},
            landingPage: details.userInfo?.landingPage || "",
          };
          await dispatch(getServiceDefinitions(baseURL)).unwrap();

          dispatch(setLoggedInUser(user));
          dispatch(setIsLoggedIn(true));
          dispatch(setLandingPage(details.userInfo.landingPage));

          // Clear access cache when user logs in (permissions might have changed)
          clearAccessCache();
          const landingPage = details.userInfo.landingPage;
          const loginPage = secConfig.loginConfig?.pageName;

          // Extract the last segment of the pathname (the page name)
          const currentPageName = pathname.split("/").filter(Boolean).pop();
          const isOnLoginPage = currentPageName === loginPage;

          if (router && landingPage && isOnLoginPage) {
            router.push(`/${ROUTING_BASEPATH}/${landingPage}`);
          }
        } else {
          await dispatch(getServiceDefinitions(baseURL)).unwrap();
        }
        dispatch(setSecurityConfig(secConfig));
        return Promise.resolve(details);
      } else {
        await dispatch(getServiceDefinitions(baseURL)).unwrap();
        dispatch(setSecurityConfig(secConfig));
        // if security is not enabled don't redirect to login page
        if (!secConfig.isSecurityEnabled) {
          return Promise.resolve({});
        }
        await dispatch(redirectToLogin({ securityConfig: secConfig })).unwrap();
        return Promise.resolve({});
      }
    } catch (error: any) {
      await dispatch(redirectToLogin({})).unwrap();
      throw error;
    } finally {
      dispatch(setPageLoading(false));
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (options: LoginOptions, { dispatch, getState, rejectWithValue }: any) => {
    let payload = "";
    each(options.formData, (value, name) => {
      payload += (payload ? "&" : "") + encodeURIComponent(name) + "=" + encodeURIComponent(value);
    });

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${options.baseURL}/j_spring_security_check`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const xsrfCookieValue = response.data ? response.data[XSRF_COOKIE_NAME] : "";
      dispatch(setToken(xsrfCookieValue));
      dispatch(setIsLoggedIn(true));

      await dispatch(loadSecurityInfo(options.baseURL)).unwrap();

      // Clear access cache after successful login
      clearAccessCache();

      return getState().auth.loggedInUser;
    } catch (error: any) {
      console.error("Login error:", error);

      // Extract relevant error information
      const errorInfo = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      };

      return rejectWithValue(errorInfo);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (options: any, { dispatch }) => {
  let responseData = null;
  try {
    const response = await axios.post(`${options.baseURL}/j_spring_security_logout`, null, {
      withCredentials: true,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    responseData = response?.data;
    const redirectURI = getValidJSON(response?.data);

    console.debug("Logout response", responseData, redirectURI);
    if (redirectURI && redirectURI.result) {
      window.location.href = redirectURI.result;
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    dispatch(setIsLoggedIn(false));
    dispatch(setLoggedInUser(null));
    dispatch(setLandingPage(""));
    dispatch(setSecurityConfig({}));

    // Clear access cache when user logs out
    clearAccessCache();

    await dispatch(redirectToLogin({})).unwrap();
  }

  return Promise.resolve(responseData);
});

export const canAccessPage = createAsyncThunk(
  "auth/canAccessPage",
  async ({ pageName }: { pageName: string }, { getState, dispatch }) => {
    const state = getState() as any;
    const userRoles = state.auth.loggedInUser?.roles || [];
    const isSecurityEnabled = state.auth.securityConfig?.isSecurityEnabled;
    const pages = state.info.appConfig?.pages || [];
    const routeConfig = pages.find((route: { name: string }) => route.name === pageName);

    if (!isSecurityEnabled || !routeConfig) {
      return true;
    } else if (
      (!routeConfig.allowedRoles || routeConfig.allowedRoles.length === 0) &&
      checkPublicAccess(pageName)
    ) {
      return true;
    }

    const hasRequiredRole = routeConfig?.allowedRoles?.some((role: any) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      dispatch(redirectToLogin({ redirectTo: pageName })).unwrap();
    }

    return hasRequiredRole;
  }
);

export const checkAccess = createAsyncThunk(
  "auth/checkAccess",
  async (
    { name, type }: { name: string; type: "PAGE" | "PARTIAL" | "PREFAB" },
    { getState, dispatch }
  ) => {
    const state = getState() as any;
    const userRoles = state.auth.loggedInUser?.roles || [];
    const isAuthenticated = state.auth.loggedInUser?.isAuthenticated || false;
    const isSecurityEnabled = state.auth.securityConfig?.isSecurityEnabled;
    // If security is not enabled, allow access to everything
    if (!isSecurityEnabled) {
      return true;
    }

    // Get the appropriate config based on type
    const configs =
      type === "PAGE"
        ? state.info.appConfig?.pages || []
        : type === "PREFAB"
          ? state.info.prefabs[name]?.pages || []
          : state.info.appConfig?.partials || [];

    const config =
      type === "PREFAB"
        ? configs[0]
        : configs?.find((item: { name: string }) => item.name.toLowerCase() === name.toLowerCase());

    // If no config found, deny access for security
    if (!config) {
      return false;
    }

    // Check permission type
    switch (config.permission) {
      case "PermitAll":
        return true;

      case "Authenticated":
        return isAuthenticated;

      case "Role":
        if (!isAuthenticated) {
          return false;
        }

        // Check if user has any of the required roles
        const allowedRoles = config.allowedRoles || [];
        if (allowedRoles.length === 0) {
          // If no roles specified but permission is Role, deny access
          return false;
        }
        const hasRole = allowedRoles.some((role: string) => userRoles.includes(role));
        return hasRole;

      default:
        // Unknown permission type, deny access for security
        return false;
    }
  }
);

export const navigateToLandingPage = createAsyncThunk(
  "auth/navigate/landingpage",
  async ({ baseUrl, pageName }: { baseUrl: string; pageName: string }, { getState, dispatch }) => {
    const state = getState() as any;
    const { auth = {} } = state;
    const redirectTo = getCurrentRouteQueryParam("redirectTo");

    // Priority: redirectTo param > stored landingPage > user's default landingPage > Main
    let landingPageToNavigate;
    if (redirectTo) {
      // Use the redirectTo parameter from URL
      landingPageToNavigate = `/${ROUTING_BASEPATH}/${redirectTo}`;
    } else if (auth.landingPage) {
      // Use stored landing page
      landingPageToNavigate = auth.landingPage;
    } else {
      // Use user's default landing page or Main
      landingPageToNavigate = auth.loggedInUser?.landingPage || `/${ROUTING_BASEPATH}/Main`;
    }

    const router = getRouterInstance();
    if (router) {
      router.push(landingPageToNavigate);
    }

    // Clear the stored landing page after navigation
    if (auth.landingPage) {
      dispatch(setLandingPage(""));
    }
  }
);

export const redirectToLogin = createAsyncThunk(
  "auth/navigate/loginPage",
  async (
    { redirectTo, securityConfig }: { redirectTo?: string; securityConfig?: any },
    { getState }
  ) => {
    const state = getState();
    const homePage = (state as any).info?.appConfig?.appProperties?.homePage;
    if (securityConfig?.loginConfig?.type === "SSO") {
      // const authUrl = `${baseUrl}/services/security/ssologin`;
      // (window.parent || window).location.href = authUrl;
      handle401();
    } else {
      const loginPage = securityConfig?.loginConfig?.pageName || "Login";

      // Store landing page for post-login redirect
      if (redirectTo && !redirectTo.startsWith("/" + loginPage)) {
        setLandingPage(`/${ROUTING_BASEPATH}/${redirectTo}`);
      }

      const router = getRouterInstance();
      const isPublicPage = checkPublicAccess();
      if (router && !isPublicPage) {
        // Build login URL with redirectTo query parameter
        const loginPath = `/${ROUTING_BASEPATH}/${loginPage}`;
        const loginUrl =
          redirectTo && redirectTo.toLowerCase() !== homePage.toLowerCase()
            ? `${loginPath}?redirectTo=${redirectTo}`
            : loginPath;
        router.push(loginUrl);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoggedInUser: (state, action: PayloadAction<LoggedInUserConfig | null>) => {
      state.loggedInUser = action.payload
        ? {
            ...defaultUserState,
            ...action.payload,
            roles: action.payload.roles || [],
            userAttributes: action.payload.userAttributes || {},
            isAuthenticated: Boolean(action.payload.isAuthenticated),
            isSecurityEnabled: Boolean(action.payload.isSecurityEnabled),
          }
        : defaultUserState;
    },
    setSecurityConfig: (state, action: PayloadAction<any>) => {
      state.securityConfig = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLandingPage: (state, action: PayloadAction<string>) => {
      state.landingPage = action.payload;
    },
    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isPageLoading = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const {
  setIsLoggedIn,
  setLoggedInUser,
  setSecurityConfig,
  setToken,
  setLandingPage,
  setPageLoading,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
