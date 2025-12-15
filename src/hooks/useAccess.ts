import { useState, useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@wavemaker/react-runtime/store";
import { checkAccess } from "@/store/slices/authSlice";

// Global cache for access results to prevent duplicate checks
const accessCache = new Map<string, { hasAccess: boolean; loading: boolean; error: any }>();
const pendingChecks = new Map<string, Promise<boolean>>();

export interface UseAccessOptions {
  componentName: string;
  type: "PAGE" | "PARTIAL" | "PREFAB";
  enabled?: boolean; // Allow disabling access check for testing
}

export const useAccess = (options: UseAccessOptions) => {
  const { componentName, type, enabled = true } = options;
  const dispatch = useAppDispatch();

  // Get security config from store
  const isSecurityEnabled = useAppSelector(
    (state: any) => state.auth.securityConfig?.isSecurityEnabled
  );

  // Create a unique key for this component
  const cacheKey = `${type}_${componentName}`;

  // Local state for this component
  const [localState, setLocalState] = useState(() => {
    // Check if we already have cached result
    const cached = accessCache.get(cacheKey);

    // If security is disabled, default to access granted
    const defaultAccess = !isSecurityEnabled ? true : false;

    return {
      hasAccess: cached?.hasAccess ?? defaultAccess,
      loading: cached?.loading ?? (isSecurityEnabled ? true : false),
      error: cached?.error ?? null,
    };
  });

  const mountedRef = useRef(true);
  const hasCheckedRef = useRef(false);

  // Memoized access check function
  const checkComponentAccess = useCallback(async (): Promise<boolean> => {
    // If security is disabled, always allow access
    if (!isSecurityEnabled) {
      return true;
    }

    // If access check is disabled (for testing), allow access
    if (!enabled) {
      return true;
    }

    // Check if we already have a pending check for this component
    if (pendingChecks.has(cacheKey)) {
      return pendingChecks.get(cacheKey)!;
    }

    // Create new access check promise
    const checkPromise = dispatch(checkAccess({ name: componentName, type })).unwrap();

    // Store the pending promise
    pendingChecks.set(cacheKey, checkPromise);

    try {
      const result = await checkPromise;
      return result;
    } catch (error) {
      // On error, default to no access for security
      return false;
    } finally {
      // Remove from pending checks
      pendingChecks.delete(cacheKey);
    }
  }, [dispatch, componentName, type, isSecurityEnabled, enabled, cacheKey]);

  // Effect to perform access check
  useEffect(() => {
    // Don't check if component is unmounted
    if (!mountedRef.current) return;

    // Don't check multiple times
    if (hasCheckedRef.current) return;

    // Check if we already have valid cached result
    const cached = accessCache.get(cacheKey);
    if (cached && !cached.loading) {
      setLocalState(cached);
      hasCheckedRef.current = true;
      return;
    }

    // Start access check
    const performCheck = async () => {
      if (!mountedRef.current) return;

      // Update cache and local state to loading
      const loadingState = { hasAccess: false, loading: true, error: null };
      accessCache.set(cacheKey, loadingState);
      setLocalState(loadingState);

      try {
        const hasAccess = await checkComponentAccess();

        if (!mountedRef.current) return;
        // Update cache and local state with result
        const resultState = { hasAccess, loading: false, error: null };
        accessCache.set(cacheKey, resultState);
        setLocalState(resultState);
        hasCheckedRef.current = true;
      } catch (error) {
        if (!mountedRef.current) return;

        // Update cache and local state with error
        const errorState = { hasAccess: false, loading: false, error };
        accessCache.set(cacheKey, errorState);
        setLocalState(errorState);
        hasCheckedRef.current = true;
      }
    };

    performCheck();
  }, [checkComponentAccess, cacheKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      // Optionally clear cache entry on unmount to free memory
      // accessCache.delete(cacheKey);
      // pendingChecks.delete(cacheKey);
    };
  }, [cacheKey]);

  // Retry function for manual retry
  const retry = useCallback(() => {
    hasCheckedRef.current = false;
    accessCache.delete(cacheKey);
    pendingChecks.delete(cacheKey);

    // Trigger re-check
    const performCheck = async () => {
      const loadingState = { hasAccess: false, loading: true, error: null };
      accessCache.set(cacheKey, loadingState);
      setLocalState(loadingState);

      try {
        const hasAccess = await checkComponentAccess();
        const resultState = { hasAccess, loading: false, error: null };
        accessCache.set(cacheKey, resultState);
        setLocalState(resultState);
        hasCheckedRef.current = true;
      } catch (error) {
        const errorState = { hasAccess: false, loading: false, error };
        accessCache.set(cacheKey, errorState);
        setLocalState(errorState);
        hasCheckedRef.current = true;
      }
    };

    performCheck();
  }, [checkComponentAccess, cacheKey]);

  return {
    hasAccess: localState.hasAccess,
    loading: localState.loading,
    error: localState.error,
    retry,
    // Expose cache key for debugging
    cacheKey,
  };
};

// Utility function to clear all access cache (useful for logout)
export const clearAccessCache = () => {
  accessCache.clear();
  pendingChecks.clear();
};

// Utility function to preload access for multiple components
export const preloadAccess = async (
  components: Array<{ name: string; type: "PAGE" | "PARTIAL" | "PREFAB" }>,
  dispatch: any
) => {
  const promises = components.map(({ name, type }) => {
    const cacheKey = `${type}_${name}`;
    if (!accessCache.has(cacheKey)) {
      return dispatch(checkAccess({ name, type })).unwrap();
    }
    return Promise.resolve(accessCache.get(cacheKey)?.hasAccess);
  });

  return Promise.allSettled(promises);
};

export default useAccess;
