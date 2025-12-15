import { Middleware } from "redux";
import { loadSecurityInfo, setPageLoading } from "@wavemaker/react-runtime/store/slices/authSlice";
import { ROUTING_BASEPATH } from "@/core/constants";
export interface RouterLike {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
}

let router: RouterLike | null = null;

export const setRouter = (routerInstance: RouterLike) => {
  router = routerInstance;
};

export const navigationMiddleware: Middleware = store => next => async action => {
  const result = next(action);

  if (loadSecurityInfo.rejected.match(action)) {
    const state = store.getState();
    const loginPage = state.auth.securityConfig?.loginConfig?.pageName || "Login";

    if (router) {
      store.dispatch(setPageLoading(false));
      router.push(`/${ROUTING_BASEPATH}/${loginPage}`);
    }
  }

  return result;
};

export const getRouterInstance = (): RouterLike | null => router;
