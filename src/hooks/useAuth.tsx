import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  loadSecurityInfo,
  login,
  logout,
  canAccessPage,
  checkAccess,
  LoginOptions,
  USER_ROLE,
  navigateToLandingPage,
} from "@wavemaker/react-runtime/store/slices/authSlice";
import includes from "lodash-es/includes";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, loggedInUser, securityConfig, isPageLoading, error } = useAppSelector(
    state => state.auth
  );

  const handleLogin = async (options: LoginOptions) => {
    try {
      const loginResponse = await dispatch(login(options)).unwrap();
      return loginResponse;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async (baseURL: string) => {
    try {
      const logoutResponse = await dispatch(logout({ baseURL })).unwrap();
      return logoutResponse;
    } catch (error) {
      return error;
    }
  };

  const checkCanAccessPage = async (pageName: string) => {
    const baseUrl = securityConfig?.baseUrl || "";
    return await dispatch(canAccessPage({ pageName })).unwrap();
  };

  const hasAccessToWidget = (widgetRoles: string) => {
    const widgetRolesArr = widgetRoles.split(",");

    // Access the widget when 'Everyone' is chosen
    if (includes(widgetRolesArr, USER_ROLE.EVERYONE)) {
      return true;
    }

    // Access the widget when 'Anonymous' is chosen and user is not authenticated
    if (includes(widgetRolesArr, USER_ROLE.ANONYMOUS) && !loggedInUser?.isAuthenticated) {
      return true;
    }

    // Access the widget when 'Only Authenticated Users' is chosen and user is authenticated
    if (includes(widgetRolesArr, USER_ROLE.AUTHENTICATED) && loggedInUser?.isAuthenticated) {
      return true;
    }

    // Access the widget when widget role and logged in user role matches
    return !!loggedInUser?.isAuthenticated && matchRoles(widgetRolesArr, loggedInUser?.roles || []);
  };

  const matchRoles = (widgetRoles: Array<string>, userRoles: Array<string>) => {
    return widgetRoles.some(role => includes(userRoles, role));
  };

  const getLoggedInUserDetails = async (baseURL: string) => {
    if (!baseURL) {
      return Promise.resolve({});
    }

    return await dispatch(loadSecurityInfo(baseURL)).unwrap();
  };

  const authNavigateToLandingPage = async (options: { baseUrl: string; pageName: string }) => {
    try {
      await dispatch(navigateToLandingPage(options)).unwrap();
      return true;
    } catch (error) {
      return error || false;
    }
  };

  return {
    isLoggedIn,
    loggedInUser,
    securityConfig,
    isPageLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    canAccessPage: checkCanAccessPage,
    hasAccessToWidget,
    getLoggedInUserDetails,
    navigateToLandingPage: authNavigateToLandingPage,
  };
};

export const usePageAccess = (pageName: string) => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector(state => state.auth);

  const [state, setState] = useState({
    hasAccess: false,
    loading: true,
    currentPage: pageName,
  });

  const hasAccess = pageName === state.currentPage ? state.hasAccess : false;
  const loading = pageName !== state.currentPage || state.loading;

  useEffect(() => {
    // Set loading to true and hasAccess to false immediately for new page
    if (pageName !== state.currentPage) {
      setState(prev => ({
        ...prev,
        currentPage: pageName,
        hasAccess: false,
        loading: true,
      }));
    }

    const checkAccess = async () => {
      try {
        const access = await dispatch(canAccessPage({ pageName })).unwrap();

        setState(prev => {
          if (prev.currentPage !== pageName) return prev;
          return {
            ...prev,
            hasAccess: access,
            loading: false,
          };
        });
      } catch (error) {
        console.error("Error checking page access:", error);
        setState(prev => {
          if (prev.currentPage !== pageName) return prev;
          return {
            ...prev,
            hasAccess: false,
            loading: false,
          };
        });
      }
    };

    checkAccess();
  }, [pageName, loggedInUser, dispatch]);

  return {
    hasAccess,
    loading,
  };
};

export const useWidgetAccess = (widgetRoles: string) => {
  const { hasAccessToWidget } = useAuth();
  return hasAccessToWidget(widgetRoles);
};

export const useAccess = (name: string, type: "PAGE" | "PARTIAL" | "PREFAB") => {
  const dispatch = useAppDispatch();
  const { loggedInUser, securityConfig } = useAppSelector(state => state.auth);

  const [state, setState] = useState({
    hasAccess: false,
    loading: true,
    currentItem: `${type}-${name}`,
  });

  const hasAccess = `${type}-${name}` === state.currentItem ? state.hasAccess : false;
  const loading = `${type}-${name}` !== state.currentItem || state.loading;

  useEffect(() => {
    // If name is empty, skip access check and mark as not loading
    if (!name) {
      setState(prev => ({
        ...prev,
        currentItem: `${type}-${name}`,
        hasAccess: true, // Allow access when no name specified
        loading: false,
      }));
      return;
    }

    // Set loading to true and hasAccess to false immediately for new item
    const currentItemKey = `${type}-${name}`;
    if (currentItemKey !== state.currentItem) {
      setState(prev => ({
        ...prev,
        currentItem: currentItemKey,
        hasAccess: false,
        loading: true,
      }));
    }

    const checkItemAccess = async () => {
      try {
        const access = await dispatch(checkAccess({ name, type })).unwrap();

        setState(prev => {
          if (prev.currentItem !== currentItemKey) return prev;
          return {
            ...prev,
            hasAccess: access,
            loading: false,
          };
        });
      } catch (error) {
        console.error(`Error checking ${type.toLowerCase()} access:`, error);
        setState(prev => {
          if (prev.currentItem !== currentItemKey) return prev;
          return {
            ...prev,
            hasAccess: false,
            loading: false,
          };
        });
      }
    };

    checkItemAccess();
  }, [name, type, loggedInUser, securityConfig, dispatch]);

  return {
    hasAccess,
    loading,
  };
};

/**
 * Synchronous access checker for use outside of React components
 * @param name - Name of the page or partial
 * @param type - Type: 'PAGE' or 'PARTIAL'
 * @param authState - Current auth state from Redux store
 * @param appConfig - App configuration containing pages and partials
 * @returns boolean indicating if access is granted
 */
export const checkAccessSync = (
  name: string,
  type: "PAGE" | "PARTIAL",
  authState: any,
  appConfig: any
): boolean => {
  const userRoles = authState?.loggedInUser?.roles || [];
  const isAuthenticated = authState?.loggedInUser?.isAuthenticated || false;
  const isSecurityEnabled = authState?.securityConfig?.isSecurityEnabled;

  // If security is not enabled, allow access to everything
  if (!isSecurityEnabled) {
    return true;
  }

  // Get the appropriate config based on type
  const configs = type === "PAGE" ? appConfig?.pages || [] : appConfig?.partials || [];

  // Extract only serializable properties for access control (avoid components)
  const serializableConfigs = configs.map((item: any) => ({
    name: item.name,
    permission: item.permission,
    allowedRoles: item.allowedRoles,
    type: item.type,
  }));

  const config = serializableConfigs.find(
    (item: { name: string }) => item.name.toLowerCase() === name.toLowerCase()
  );

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

      return allowedRoles.some((role: string) => userRoles.includes(role));

    default:
      // Unknown permission type, deny access for security
      return false;
  }
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, error } = useAppSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (options: LoginOptions) => {
    setLoading(true);
    setLoginError(null);

    try {
      await dispatch(login(options)).unwrap();
      return true;
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error: loginError || error,
    isLoggedIn,
    handleLogin,
    clearError: () => setLoginError(null),
  };
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogout = async (baseURL: string) => {
    setLoading(true);
    setLogoutError(null);

    try {
      await dispatch(logout({ baseURL })).unwrap();
      return true;
    } catch (err) {
      setLogoutError(err instanceof Error ? err.message : "Logout failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error: logoutError,
    handleLogout,
    clearError: () => setLogoutError(null),
  };
};

export const useCurrentUser = () => {
  const { loggedInUser, isLoggedIn } = useAppSelector(state => state.auth);

  return {
    user: loggedInUser,
    isLoggedIn,
    hasRole: (role: string) => {
      if (!loggedInUser || !loggedInUser.roles) return false;
      return loggedInUser.roles.includes(role);
    },
    hasAnyRole: (roles: string[]) => {
      if (!loggedInUser || !loggedInUser.roles) return false;
      return roles.some(role => loggedInUser.roles.includes(role));
    },
    hasAllRoles: (roles: string[]) => {
      if (!loggedInUser || !loggedInUser.roles) return false;
      return roles.every(role => loggedInUser.roles.includes(role));
    },
  };
};
