// @ts-ignore
import {
  CrudVariable as _CrudVariable,
  getTarget,
  setValueToNode,
  getTargetNodeKey,
  internalBoundNodeMap,
} from "@wavemaker/variables";
import { VariableConfig, VariableEvents } from "./base-variable";

import { isEqual, isUndefined, isFunction, forEach, isEmpty, isArray, set } from "lodash-es";
import httpService from "@wavemaker/react-runtime/hooks/useHttp";
import { deepCopy } from "@wavemaker/react-runtime/core/util";
import Formatters from "@wavemaker/react-runtime/core/formatters";

export interface CrudVariableConfig extends VariableConfig {
  name: string;
  dataSet: any;
  inputFields: any;
  filterExpressions: any;
  filterFields: any;
  crudOperationId: string;
  baseUrl: string;
  maxResults: number;
  onCanUpdate: any;
  onBeforeUpdate: any;
  onResult: any;
  onBeforeDatasetReady: any;
  onError: any;
  controller: string;
  dataBinding: Record<string, unknown>;
}

class CrudVariable extends _CrudVariable<CrudVariableConfig> {
  params: any = {};
  filters: any = {};

  constructor(public config: CrudVariableConfig) {
    const variableConfig: any = {
      category: "wm.CrudVariable",
      name: config.name,
      dataSet: config.paramProvider(),
      dataBinding: config.dataBinding,
      inputFields: config.paramProvider(),
      filterExpressions: config.filterExpressions,
      filterFields: config.paramProvider(),
      isList: config.isList,
      operation: config.operation,
      httpClientService: httpService,
      httpService: httpService,
      maxResults: config.maxResults || 10,
      _id: config._id,
      crudOperationId: config.crudOperationId,
      controller: config.controller,
      _context: config._context || {
        prefabname: config.name,
      },
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

  invokeOnParamChange() {
    const last = this.params;
    const latest = this.config.paramProvider();
    if (this.config.operation === "read") {
      const lastFilter = this.filters;
      const latestFilter = this.config.filterProvider && this.config.filterProvider();
      if (!isEqual(lastFilter, latestFilter)) {
        this.setFilterExpValue(latestFilter);
        if (this.autoUpdate && !isEmpty(latestFilter) && isFunction(this.update)) {
          this.filters = latestFilter;
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
    this.processBinding(this);
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    this.filters = this.config.filterProvider && this.config.filterProvider();
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
    return super.listRecords(options, onSuccess, onError);
  }

  updateRecord(options?: any, success?: any, error?: any) {
    this.processBinding(this);
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    return super.updateRecord(options, success, error);
  }

  insertRecord(options?: any, success?: any, error?: any) {
    this.processBinding(this);
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    return super.insertRecord(options, success, error);
  }

  deleteRecord(options?: any, success?: any, error?: any) {
    this.processBinding(this);
    this.notify(VariableEvents.BEFORE_INVOKE, [this]);
    return super.deleteRecord(options, success, error);
  }

  processBindExp(d: any, variable: CrudVariable) {
    const root = getTarget(variable),
      targetNodeKey = getTargetNodeKey(d.target),
      runMode = true;
    let v = isArray(d.value) ? d.value[0] : d.value;
    if (v && !isUndefined(d.value)) {
      setValueToNode(d.target, d, root, variable, d.value, true);
      if (runMode && root !== targetNodeKey) {
        if (!internalBoundNodeMap.has(variable)) {
          internalBoundNodeMap.set(variable, {});
        }
        set(internalBoundNodeMap.get(variable), [variable.name, root, d.target], d.value);
      }
    }
    return {
      name: d.target,
      value: v,
    };
  }

  processBinding(variable: any) {
    const fn = variable.config.dataBinding;
    let bindMap = isFunction(fn) ? fn() : fn;

    if (isEmpty(bindMap)) {
      return;
    }

    const flattenedBindInfo: any[] = [];

    forEach(bindMap, (bindNodes, operationType) => {
      bindNodes = bindNodes || [];
      bindNodes.forEach(bindNode => {
        bindNode.target = operationType + "." + bindNode.target;
        flattenedBindInfo.push(bindNode);
      });
    });
    bindMap = flattenedBindInfo;

    variable["_binddataBinding"] = bindMap;
    if (!bindMap || !isArray(bindMap)) {
      return;
    }
    flattenedBindInfo.forEach(node => {
      /* for static variable change the binding with target 'dataBinding' to 'dataSet', as the results have to reflect directly in the dataSet */
      if (variable.category === "wm.Variable" && node.target === "dataBinding") {
        node.target = "dataSet";
      }
      this.processBindExp(node, variable);
    });
  }

  invoke(options?: any, onSuccess?: Function, onError?: Function) {
    this.processBinding(this);
    return super.invoke(options, onSuccess, onError);
  }
}

export default CrudVariable;
