import { useRef, useMemo } from "react";
import { getListState, ListStateData } from "../components/data/list/utils/list-helpers";
import {
  convertFilterArrayToObject,
  getTableState,
  TableStateData,
} from "../components/data/table/utils/table-helpers";
import { StorageType } from "@wavemaker/react-runtime/utils/state-persistance";
import { DataSource } from "../components/data/types";
import EventNotifier from "@wavemaker/react-runtime/core/event-notifier";
// @ts-ignore - Using yalc linked local package
import { wmSetDependency } from "@wavemaker/variables";
import isEqual from "lodash-es/isEqual";

interface DataSourceSubscriptionOptions {
  datasource: any;
  statehandler: StorageType;
  name: string;
  onPageRestored?: (page: number) => void;
  widgetType?: "list" | "table";
}

// Create a singleton EventNotifier instance that all components will share
let sharedEventNotifier: EventNotifier | null = null;

const getSharedEventNotifier = () => {
  if (!sharedEventNotifier) {
    // Create new EventNotifier only once
    sharedEventNotifier = new EventNotifier();
    sharedEventNotifier.notify = sharedEventNotifier.notifyApp.bind(sharedEventNotifier);
    // Set it in the external dependency store (from @wavemaker/variables)
    wmSetDependency("appManager", sharedEventNotifier);
  }
  return sharedEventNotifier;
};

/**
 * This function accepts two data sources and will check if both are same by comparing the unique id and
 * context in which datasources are present
 * @returns {*} boolean true/ false
 */
const isDataSourceEqual = (d1: any, d2: any): boolean => {
  return (
    d1.execute(DataSource.Operation.GET_UNIQUE_IDENTIFIER) ===
    d2.execute(DataSource.Operation.GET_UNIQUE_IDENTIFIER)
  );
  // && isEqual(d1.execute(DataSource.Operation.GET_CONTEXT_IDENTIFIER), d2.execute(DataSource.Operation.GET_CONTEXT_IDENTIFIER));
};

/**
 * Hook to subscribe to 'toggle-variable-state' event
 * Handles state params for pagination when events are fired
 * Subscription happens only once when datasource and EventNotifier are available
 */
export const useDataSourceSubscription = ({
  datasource,
  statehandler,
  name,
  onPageRestored,
  widgetType = "list",
}: DataSourceSubscriptionOptions): void => {
  const pageLoadRef = useRef(true); // Track if this is the first page load
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Get the shared EventNotifier instance
  const eventNotifier = getSharedEventNotifier();

  // Subscribe only once when datasource and EventNotifier become available
  useMemo(() => {
    // Skip if prerequisites not met
    if (!datasource || !eventNotifier) {
      return;
    }

    // Clean up previous subscription if exists
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    // Handler for toggle-variable-state event
    function handleLoading(data: any) {
      if (!data?.variable && !data.active) {
        return;
      }

      if (
        datasource &&
        datasource.execute &&
        datasource.execute(DataSource.Operation.IS_API_AWARE) &&
        isDataSourceEqual(data.variable, datasource)
      ) {
        // Handle state params only on page load (first time)
        if (pageLoadRef.current && statehandler && statehandler.toLowerCase() !== "none") {
          pageLoadRef.current = false; // Mark as handled

          // Use appropriate state getter based on widget type
          const widgetState: ListStateData | TableStateData | null =
            widgetType === "table"
              ? getTableState(name, statehandler)
              : getListState(name, statehandler);

          if (widgetState) {
            // Ensure options object exists
            data.options = data.options || {};

            // Set page number for server-side pagination
            data.options.page = widgetState.pagination;

            // Set page size
            if (widgetState.pagesize) {
              datasource.maxResults = widgetState.pagesize;
              data.options.pagesize = widgetState.pagesize;
            }
            if (widgetType === "table") {
              const tableState = widgetState as TableStateData;
              if (tableState.search && tableState.search.length > 0) {
                data.options.filterFields = convertFilterArrayToObject(tableState.search);
              }
              if (tableState.sort && tableState.sort.field.length > 0) {
                data.options.orderBy = `${tableState.sort.field} ${tableState.sort.direction}`;
              }
            }

            // Notify parent component about the restored page
            if (onPageRestored) {
              onPageRestored(widgetState.pagination);
            }
          }
        }
      }
    }

    // Subscribe to toggle-variable-state event
    const unsubscribe = eventNotifier.subscribe("toggle-variable-state", handleLoading);
    unsubscribeRef.current = unsubscribe;

    // Return cleanup function
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [datasource, statehandler, name, onPageRestored, widgetType, eventNotifier]);
};
