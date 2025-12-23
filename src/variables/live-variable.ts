import { VariableConfig, VariableEvents } from "./base-variable";
import { isEqual, isUndefined, isFunction, forEach, isEmpty } from "lodash-es";
// @ts-ignore
import { LiveVariable as _LiveVariable } from "@wavemaker/variables";
import httpService from "@wavemaker/react-runtime/hooks/useHttp";
import { deepCopy } from "@wavemaker/react-runtime/core/util";
import Formatters from "@wavemaker/react-runtime/core/formatters";
import { IPaginationMeta } from "../components/data/list/components/props";

export interface LiveVariableConfig extends VariableConfig {
  baseUrl: string;
  maxResults: number;
  _context: any;
  onCanUpdate: any;
  onBeforeUpdate: any;
  onResult: any;
  onBeforeDatasetReady: any;
  inFlightBehavior: string;
  type: string;
  autoUpdate: boolean;
  orderBy: string;
  category: string;
  liveSource: string;
  propertiesMap: any;
  properties: any;
  tableName: string;
  tableType: string;
  relatedTables: any;
  filterExpressions: any;
  filterProvider: any;
  pagination: IPaginationMeta;
  loading: boolean;
  _id: string;
  execute: (operation: string, options?: any) => Promise<any>;
  invoke: (options?: any) => Promise<any>;
  inputFields: any;
  filterFields: any;
  update: (options?: any) => Promise<any>;
  listRecords: (options?: any, onSuccess?: Function, onError?: Function) => Promise<any>;
  updateRecord: (options?: any, success?: any, error?: any) => Promise<any>;
  insertRecord: (options?: any, success?: any, error?: any) => Promise<any>;
  deleteRecord: (options?: any, success?: any, error?: any) => Promise<any>;
  notify: (event: VariableEvents, args: any) => void;
}

enum _LiveVariableEvents {
  BEFORE_INVOKE = "beforeInvoke",
}
export type LiveVariableEvents = _LiveVariableEvents | VariableEvents;

class LiveVariable extends _LiveVariable {
  private params: any = {};
  private filters: any = {};
  private filterValues: any = {};
  private lastFilters: any = {};

  constructor(public config: LiveVariableConfig) {
    const variableConfig: any = {
      name: config.name,
      dataSet: config.paramProvider(),
      inputFields: config.paramProvider(),
      filterExpressions: config.filterExpressions,
      filterFields: config.paramProvider(),
      isList: config.isList,
      maxResults: config.maxResults,
      _context: config._context,
      operation: config.operation,
      type: config.type,
      autoUpdate: config.autoUpdate,
      liveSource: config.liveSource,
      orderBy: config.orderBy,
      category: config.category,
      properties: config.properties,
      propertiesMap: config.propertiesMap,
      tableName: config.tableName,
      tableType: config.tableType,
      relatedTables: config.relatedTables,
      httpClientService: httpService,
      httpService: httpService,
      inFlightBehavior: config.inFlightBehavior,
      _id: config._id,
      onSuccess: (context: any, args: any) => {
        this.notify(VariableEvents.AFTER_INVOKE, [args.variable, args.data, args.options]);
        this.notify(VariableEvents.SUCCESS, [args.variable, args.data, args.options]);
        return config.onSuccess && config.onSuccess(args.variable, args.data, args.options);
      },
      onCanUpdate: (context: any, args: any) => {
        return config.onCanUpdate && config.onCanUpdate(args.variable, args.data, args.options);
      },
      onBeforeUpdate: (context: any, args: any) => {
        return (
          config.onBeforeUpdate &&
          config.onBeforeUpdate(args.variable, args.dataFilter || args.inputData, args.options)
        );
      },
      onResult: (context: any, args: any) => {
        this.notify(VariableEvents.AFTER_INVOKE, [args.variable, args.data, args.options]);
        return config.onResult && config.onResult(args.variable, args.data, args.options);
      },
      onBeforeDatasetReady: (context: any, args: any) => {
        return (
          config.onBeforeDatasetReady &&
          config.onBeforeDatasetReady(args.variable, args.data, args.options)
        );
      },
      onError: (context: any, args: any) => {
        this.notify(VariableEvents.AFTER_INVOKE, [args.variable, args.data, args.options]);
        this.notify(VariableEvents.ERROR, [args.variable, args.data, args.options]);
        return config.onError && config.onError(args.variable, args.data, args.options);
      },
    };

    super(variableConfig);
    this.dateFormatter = Formatters.get("toDate");
    this.init();
  }

  setFilterExpValue(filter: any) {
    this.filterExpressions?.rules.forEach((r: any) => {
      r.value = filter[r.target];
    });
  }

  setFilter(key: any, val?: any) {
    // Call parent to update filterExpressions.rules array
    const filterExpressions = super.setFilter(key, val);

    // Convert rules array to key-value object for API
    const filterObj: any = {};
    filterExpressions.rules.forEach((rule: any) => {
      if (rule.target && rule.value !== undefined && rule.value !== "") {
        filterObj[rule.target] = rule.value;
      }
    });

    this.filterValues = filterObj;
    return this;
  }

  invokeOnParamChange() {
    const last = this.params;
    const latest = this.config.paramProvider();
    if (this.config.operation === "read") {
      const lastFilter = this.lastFilters;
      const latestFilter = deepCopy(
        {} as any,
        (this.config.filterProvider && this.config.filterProvider()) || {},
        this.filterValues || {}
      );
      if (!isEqual(lastFilter, latestFilter)) {
        this.setFilterExpValue(latestFilter);
        if (this.autoUpdate && !isEmpty(latestFilter) && isFunction(this.update)) {
          this.filters = latestFilter;
          this.lastFilters = latestFilter;
          this.invoke();
        }
      }
    }
    if (!isEqual(last, latest)) {
      if (this.config.operation === "read") {
        forEach(latest, (val: any, key: any) => {
          this.filterFields[key] = {
            value: val,
          };
        });
      } else {
        this.inputFields = latest;
      }
      /* if auto-update set for the variable with read operation only, get its data */
      // @ts-ignore
      if (
        this.autoUpdate &&
        !isUndefined(latest) &&
        isFunction(this[this.config.operation + "Record"])
      ) {
        this.invoke();
      }
    }
    return Promise.resolve(this);
  }

  listRecords(options?: any, onSuccess?: Function, onError?: Function) {
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    const providerFilters = this.config.filterProvider && this.config.filterProvider();

    this.filters = deepCopy({} as any, providerFilters || {}, this.filterValues || {});

    // Merge with options if provided
    if (options) {
      this.filters = deepCopy(
        {} as any,
        this.filters,
        options.filterFields ? options.filterFields : options
      );
    }
    options = options || {};
    options.filterFields = this.filters;
    this.setFilterExpValue(this.filters);
    this.lastFilters = this.filters;
    return super.listRecords(options, onSuccess, onError);
  }

  updateRecord(options?: any, success?: any, error?: any) {
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    return super.updateRecord(options, success, error);
  }

  insertRecord(options?: any, success?: any, error?: any) {
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    return super.insertRecord(options, success, error);
  }

  deleteRecord(options?: any, success?: any, error?: any) {
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    return super.deleteRecord(options, success, error);
  }
}

export default LiveVariable;
