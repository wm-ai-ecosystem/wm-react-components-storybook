import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "@wavemaker/react-runtime/store/slices/authSlice";
import appConfigReducer from "@wavemaker/react-runtime/store/slices/appConfigSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import i18nReducer from "@wavemaker/react-runtime/store/slices/i18nSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  info: appConfigReducer,
  i18n: i18nReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/loadSecurityInfo/fulfilled"],
        ignoredActionPaths: ["meta.arg", "payload.config", "payload.request"],
        ignoredPaths: ["auth.securityConfig"],
      },
    }),
});

// Only setup listeners on the client side (not during SSR)
if (typeof window !== "undefined") {
  setupListeners(store.dispatch);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
