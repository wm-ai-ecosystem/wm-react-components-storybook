import { VariableConfig, VariableEvents } from "./base-variable";
import { forEach, isEmpty, isEqual, isNumber, isObject, isString, merge } from "lodash-es";
import { deepCopy } from "@wavemaker/react-runtime/core/util/common";
import { ServiceVariable as _ServiceVariable } from "@wavemaker/variables";
import { httpService } from "@wavemaker/react-runtime/hooks/useHttp";
import { findValueOf } from "../utils/format-util";
import EventNotifier from "@wavemaker/react-runtime/core/event-notifier";
import Formatters from "@wavemaker/react-runtime/core/formatters";

export interface ServiceVariableConfig extends VariableConfig {
  baseUrl: string;
  maxResults: number;
  _context: any;
  serviceType: string;
  onCanUpdate: any;
  onBeforeUpdate: any;
  onResult: any;
  onBeforeDatasetReady: any;
  inFlightBehavior: string;
  controller: string;
  getServiceInfo: Function;
}

enum _ServiceVariableEvents {
  BEFORE_INVOKE = "beforeInvoke",
}
export type ServiceVariableEvents = _ServiceVariableEvents | VariableEvents;

export class ServiceVariable extends _ServiceVariable {
  private cancelTokenSource: any;
  private initialized: boolean = false;
  params: any = undefined;
  private lastInvokedParams: any = undefined;
  private dateFormatter: any;
  private lastParams: any = undefined;
  private lastParamProviderValues: any = undefined;

  constructor(public config: ServiceVariableConfig) {
    // Initialize with minimal configuration first
    let variableConfig: any = {
      name: config.name,
      dataSet: config.paramProvider(), // Default empty value
      dataBinding: {},
      firstRecord: {},
      lastRecord: {},
      isList: config.isList,
      service: config.service,
      serviceType: config.serviceType,
      maxResults: config.maxResults,
      _context: config._context,
      operation: config.operation,
      operationId: config.operationId,
      operationType: config.operationType,
      controller: config.controller,
      serviceInfo: config.getServiceInfo(),
      httpClientService: httpService,
      inFlightBehavior: config.inFlightBehavior,
      spinnerMessage: config.spinnerMessage,
      spinnerContext: config.spinnerContext,
      onSuccess: (context: any, args: any) => {
        this.notify(VariableEvents.AFTER_INVOKE, [args.variable, args.data, args.options]);
        this.notify(VariableEvents.SUCCESS, [args.variable, args.data, args.options]);
        this.updateFirstAndLastRecord(args.data);
        return config.onSuccess && config.onSuccess(args.variable, args.data, args.options);
      },
      onError: (context: any, args: any) => {
        this.notify(VariableEvents.AFTER_INVOKE, [args.variable, args.data, args.options]);
        this.notify(VariableEvents.ERROR, [args.variable, args.data, args.options]);
        EventNotifier.ROOT.notify("SERVICE_ERROR", [args.variable, args.data, args.options]);

        return config.onError && config.onError(args.variable, args.data, args.options);
      },
      onCanUpdate: (context: any, args: any) => {
        return config.onCanUpdate && config.onCanUpdate(args.variable, args.data, args.options);
      },
      onBeforeUpdate: (context: any, args: any) => {
        this.notify(VariableEvents.BEFORE_INVOKE, [args.variable, args.inputData, args.options]);
        return (
          config.onBeforeUpdate &&
          config.onBeforeUpdate(args.variable, args.inputData, args.options)
        );
      },
      onResult: (context: any, args: any) => {
        return config.onResult && config.onResult(args.variable, args.data, args.options);
      },
      onBeforeDatasetReady: (context: any, args: any) => {
        return (
          config.onBeforeDatasetReady &&
          config.onBeforeDatasetReady(args.variable, args.data, args.options)
        );
      },
    };
    super(variableConfig);

    // Set up event handlers
    this.setupEventHandlers(config);

    this.dateFormatter = Formatters.get("toDate");
  }
  // Method to update firstRecord and lastRecord from the current dataset
  private updateFirstAndLastRecord(data: any) {
    try {
      const dataSet = (this as any).dataSet;
      const isList = (this as any).isList;

      if (isList && Array.isArray(dataSet)) {
        // For list variables, set firstRecord and lastRecord to the actual first and last items
        (this as any).firstRecord = dataSet.length > 0 ? dataSet[0] : {};
        (this as any).lastRecord = dataSet.length > 0 ? dataSet[dataSet.length - 1] : {};
      } else {
        // For non-list variables, firstRecord and lastRecord are the same as the dataset
        (this as any).firstRecord = dataSet || {};
        (this as any).lastRecord = dataSet || {};
      }
    } catch (error) {
      console.error("Error updating firstRecord and lastRecord:", error);
    }
  }

  private setupEventHandlers(config: ServiceVariableConfig) {
    // Implementation for setting up event handlers
  }

  async invokeOnParamChange() {
    // Get current values from all sources
    const currentParams = this.params || {};
    const currentParamProvider = this.config.paramProvider() || {};
    const currentDataBinding = this.dataBinding || {};

    // Detect what CHANGED since last invocation
    const paramsChanged = !isEqual(this.lastParams, currentParams);
    const paramProviderChanged = !isEqual(this.lastParamProviderValues, currentParamProvider);

    // Smart merge based on what actually changed:
    let latest;

    if (paramsChanged && !paramProviderChanged) {
      // Only script/params changed → params should win
      latest = merge({}, currentParamProvider, currentDataBinding, currentParams);
    } else if (paramProviderChanged && !paramsChanged) {
      // Only UI/paramProvider changed → paramProvider should win
      latest = merge({}, currentParams, currentDataBinding, currentParamProvider);
    } else if (paramsChanged && paramProviderChanged) {
      // Both changed → params wins (script is more intentional than UI)
      latest = merge({}, currentParamProvider, currentDataBinding, currentParams);
    } else {
      // Neither changed (first call) → params wins by default
      latest = merge({}, currentParamProvider, currentDataBinding, currentParams);
    }

    let last = this.lastInvokedParams || {};

    if (!isEqual(last, latest) && latest !== undefined && !isEmpty(latest)) {
      // Update all tracking values
      this.lastInvokedParams = deepCopy({} as any, latest);
      this.lastParams = deepCopy({} as any, currentParams);
      this.lastParamProviderValues = deepCopy({} as any, currentParamProvider);

      try {
        // Create a new Promise that wraps the invoke call
        await new Promise((resolve, reject) => {
          this.invoke(
            latest,
            (data: any) => resolve(data),
            (error: any) => reject(error)
          );
        });
      } catch (error) {
        console.error("Error in invokeOnParamChange:", error);
      }
    } else {
      // Even if not invoking, update tracking to detect future changes
      this.lastParams = deepCopy({} as any, currentParams);
      this.lastParamProviderValues = deepCopy({} as any, currentParamProvider);
    }

    return this;
  }

  public async doNext() {
    let page = 0 as any;
    if (isString(this.pagination.page)) {
      page = parseInt(this.pagination.page) + 1 + "";
    } else {
      page = this.pagination.page + 1;
    }
    return new Promise((resolve, reject) => {
      this.invoke(
        {
          page: page,
        },
        (dataset: any) => resolve(dataset),
        reject
      );
    });
  }

  onDataUpdated() {
    console.log("called in onDataUpdated");
  }

  invoke(options?: any, onSuccess?: Function, onError?: Function) {
    this.params = merge({}, this.params, this.config.paramProvider());
    this.params = deepCopy({} as any, this.params, this.dataBinding);
    if (options) {
      this.params = deepCopy(
        {} as any,
        this.params,
        options.inputFields ? options.inputFields : options
      );
    }
    options = options || {};
    options.inputFields = this.params;
    this.lastInvokedParams = this.params;

    // Normalize orderBy option
    if (!(options as any).orderBy) {
      const cfg: any = this.config as any;
      const defaultOrder =
        cfg?.orderBy || cfg?.orderby || (this as any).orderBy || (this as any).orderby;
      if (defaultOrder) {
        const norm = String(defaultOrder);
        (options as any).orderBy = norm.includes(":") ? norm.replace(/:/g, " ") : norm;
      }
    }
    // Get the latest service definition
    this.serviceInfo = this.config.getServiceInfo();
    if (!this.serviceInfo) {
      console.error(`Service Info is missing for (${this.name}) variable.`);
    }

    return super.invoke(options, onSuccess, onError);
  }
  setInput(key: any, val?: any, options?: any) {
    this.params = merge({}, _setInput(this.params, key, val, options));
    return this.params;
  }
}

export const _setInput = (targetObj: any, key: any, val: any, options?: any) => {
  targetObj = targetObj || {};
  let keys,
    lastKey,
    paramObj: any = {};

  // content type check
  if (isObject(options)) {
    // @ts-ignore
    switch (options.type) {
      case "file":
        //val = getBlob(val, options.contentType);
        break;
      case "number":
        val = isNumber(val) ? val : parseInt(val, 10);
        break;
    }
  }

  if (isObject(key)) {
    // check if the passed parameter is an object itself
    paramObj = key;
  } else if (key.indexOf(".") > -1) {
    // check for '.' in key e.g. 'employee.department'
    keys = key.split(".");
    lastKey = keys.pop();
    // Finding the object based on the key
    targetObj = findValueOf(targetObj, keys.join("."), true);
    key = lastKey;
    paramObj[key] = val;
  } else {
    paramObj[key] = val;
  }

  forEach(paramObj, function (paramVal, paramKey) {
    targetObj[paramKey] = paramVal;
  });
  return targetObj;
};
