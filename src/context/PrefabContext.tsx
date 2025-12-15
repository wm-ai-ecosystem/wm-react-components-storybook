import { createContext, useEffect, useRef } from "react";
import { isEqual } from "lodash";
import { EVENTEMITTER_METHODS } from "@/core/constants/events";

interface PrefabContextProps {
  inbound: Record<string, any>;
  outbound: Record<string, any>;
  prefabName: string;
}

const PrefabContext = createContext<PrefabContextProps>({
  inbound: {},
  outbound: {},
  prefabName: "",
});

const getChangedKeys = (
  prev: Record<string, any>,
  curr: Record<string, any>
): Array<{ key: string; oldValue: any; newValue: any }> => {
  const changes: Array<{ key: string; oldValue: any; newValue: any }> = [];
  const keys = new Set([...Object.keys(prev), ...Object.keys(curr)]);
  keys.forEach(key => {
    const ignoredKeys = ["name", "prefabname", "data-widget-id", "prefabName"];
    if (ignoredKeys.includes(key)) {
      return;
    }
    // Handle functions - compare their definitions to avoid unnecessary renders
    const prevValue = prev[key];
    const currValue = curr[key];

    if (typeof prevValue === "function" && typeof currValue === "function") {
      // Compare function definitions instead of function instances
      if (
        prevValue.toString() !== currValue.toString() &&
        prevValue === undefined &&
        currValue !== undefined
      ) {
        changes.push({
          key,
          oldValue: prevValue,
          newValue: currValue,
        });
      }
      return;
    }

    if (!isEqual(prevValue, currValue) && currValue !== undefined && currValue !== null) {
      changes.push({
        key,
        oldValue: prevValue,
        newValue: currValue,
      });
    }
  });
  return changes;
};

const PrefabProvider = ({
  value: Context,
  children,
}: {
  value: PrefabContextProps;
  children: React.ReactNode;
}) => {
  const prevOutboundRef = useRef<Record<string, any>>(Context.outbound);
  const pendingChangesRef = useRef<Array<{ key: string; oldValue: any; newValue: any }>>([]);
  const retryCountRef = useRef<number>(0);
  const isInitialMountRef = useRef<boolean>(true);
  const maxRetries = 20;
  const initialMountMaxRetries = 30;
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const currInbound = Context.inbound;

    if (isEqual(prevOutboundRef.current, currInbound)) {
      return;
    }

    // Fix: Compare prevInboundRef.current with currInbound, not prevOutboundRef
    const inboundChanges = getChangedKeys(prevOutboundRef.current, currInbound);

    // Update ref for next comparison
    prevOutboundRef.current = currInbound;

    if (inboundChanges.length > 0) {
      // Merge new changes with pending changes (deduplicate by key)
      const changeMap = new Map<string, { key: string; oldValue: any; newValue: any }>();

      // Add existing pending changes first
      pendingChangesRef.current.forEach(change => {
        changeMap.set(change.key, change);
      });

      // Overwrite with new changes (they're more recent)
      inboundChanges.forEach(change => {
        changeMap.set(change.key, change);
      });

      pendingChangesRef.current = Array.from(changeMap.values());
      retryCountRef.current = 0;

      // Cancel any pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Try to emit with retry mechanism
      const tryEmit = () => {
        // Convert array to object format that BasePage expects: {0: change1, 1: change2, ...}
        const changesAsObject: Record<number, { key: string; oldValue: any; newValue: any }> = {};
        pendingChangesRef.current.forEach((change, index) => {
          changesAsObject[index] = change;
        });

        // Emit the event
        // Note: EventEmitter.emit returns true if there are listeners, false otherwise
        const hasListeners = EVENTEMITTER_METHODS.PREFAB_STATE_SYNC_EMIT(
          Context.prefabName,
          changesAsObject
        );

        // Determine max retries based on whether this is initial mount
        const currentMaxRetries = isInitialMountRef.current ? initialMountMaxRetries : maxRetries;

        // If no listeners were registered and we haven't exceeded max retries, retry
        if (!hasListeners && retryCountRef.current < currentMaxRetries) {
          retryCountRef.current += 1;

          // On initial mount, use more RAF cycles for slower machines
          const rafCycles = isInitialMountRef.current ? 10 : 5;

          let rafChain: () => void = tryEmit;
          for (let i = 0; i < rafCycles; i++) {
            const next = rafChain;
            rafChain = () => {
              rafIdRef.current = requestAnimationFrame(() => {
                next();
              });
            };
          }

          rafChain();
        } else {
          // Successfully emitted (listeners received it) or max retries reached
          if (hasListeners) {
            // Success! Mark as no longer initial mount after first successful emission
            isInitialMountRef.current = false;
          } else {
            // Max retries reached but no listeners found
            // This could happen if BasePage is taking longer than expected
            // Reset the flag to allow normal retry behavior for future updates
            // This prevents being stuck in initial mount mode indefinitely
            isInitialMountRef.current = false;
            console.warn(
              "PrefabContext: Max retries reached without finding listeners. " +
                "BasePage may not be ready yet. Future updates will use normal retry behavior."
            );
          }
          pendingChangesRef.current = [];
          retryCountRef.current = 0;
          rafIdRef.current = null;
        }
      };

      // Start emission process: wait for React commit, then BasePage initialization
      // Use more RAF cycles on initial mount (hard reload scenarios)
      const initialRafCycles = isInitialMountRef.current ? 5 : 3;

      queueMicrotask(() => {
        // Build RAF chain: each cycle waits for the next frame
        let rafChain: () => void = tryEmit;
        for (let i = 0; i < initialRafCycles; i++) {
          const next = rafChain;
          rafChain = () => {
            rafIdRef.current = requestAnimationFrame(() => {
              next();
            });
          };
        }

        // Start the chain
        rafChain();
      });
    }
  }, [Context.inbound]);

  // Cleanup RAF on unmount and reset state on remount
  useEffect(() => {
    return () => {
      // Cancel any pending RAF operations
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      // Reset state for clean remount
      pendingChangesRef.current = [];
      retryCountRef.current = 0;
      // Reset initial mount flag on unmount so next mount starts fresh
      // This ensures proper behavior if component unmounts and remounts
      isInitialMountRef.current = true;
    };
  }, []);

  return <PrefabContext.Provider value={Context}>{children}</PrefabContext.Provider>;
};

export default PrefabProvider;
