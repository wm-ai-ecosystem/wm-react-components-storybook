import { clone, isEqual } from "lodash-es";
import { VariableConfig, VariableEvents } from "./base-variable";
import { ModelVariable as _ModelVariable } from "@wavemaker/variables";

export class ModelVariable extends _ModelVariable {
  config: any;
  lastParams: any;
  dataSet: any;
  private initialized: boolean = false;

  constructor(config: VariableConfig) {
    // Initialize with empty dataset first
    const variable = {
      name: config.name,
      dataSet: config.paramProvider() || { dataValue: "" }, // Default empty value
      isList: config.isList,
      twoWayBinding: config.twoWayBinding,
    };

    super(variable);
    this.config = config;
    this.invoke();
  }

  invoke(params?: any, onSuccess?: Function, onError?: Function) {
    let result;

    try {
      this.dataSet = this.config.paramProvider();

      this.notify(VariableEvents.BEFORE_INVOKE, [this, this.dataSet]);
      result = super.execute(params, () => {});
      this.config.onSuccess && this.config.onSuccess(this, this.dataSet);
      onSuccess && onSuccess(this, this.dataSet);
      this.notify(VariableEvents.SUCCESS, [this, this.dataSet]);
    } catch (error) {
      this.config.onError && this.config.onError(this, this.dataSet);
      onError && onError(this, this.dataSet);
      this.notify(VariableEvents.ERROR, [this, this.dataSet]);
    }

    this.notify(VariableEvents.AFTER_INVOKE, [this, this.dataSet]);
    return result;
  }

  invokeOnParamChange() {
    const latest = this.config.paramProvider();
    if (!isEqual(this.lastParams, latest)) {
      this.invoke();
      this.lastParams = clone(latest);
    }
    return Promise.resolve(this);
  }
}
