import { ActionConfig, BaseAction } from "./base-action";
import { VariableEvents } from "@wavemaker/react-runtime/variables/base-variable";
import { merge } from "lodash-es";
import React from "react";
import { toastService } from "./toast.service";

export interface NotificationActionConfig extends ActionConfig {
  showDialog: Function;
  onOk?: Function;
  onCancel?: Function;
  onClose?: Function;
  operation: string;
  partialContent?: React.ReactNode;
  toasterService?: () => any;
}

const DEFAULT_DURATION = 3000;

type Toast_type = "success" | "error" | "warning" | "info";

const NOTIFICATION_TYPE: Record<string, Toast_type> = {
  success: "success",
  error: "error",
  warning: "warning",
  information: "info",
  info: "info",
};

export class NotificationAction extends BaseAction<NotificationActionConfig> {
  constructor(config: NotificationActionConfig) {
    super(config);
  }

  private prepareToastOptions(params: any = {}): any {
    const configParams = this.config.paramProvider();
    const mergedParams = { ...configParams, ...params };

    const alertClass = String(mergedParams.class)?.toLowerCase() ?? "info";
    const type = NOTIFICATION_TYPE[alertClass] || "info";

    // get toast position
    const position = mergedParams.toasterPosition ?? "top right";

    // Determine duration (0 means stay until dismissed)
    let duration: number | null = parseInt(String(mergedParams.duration));
    if (isNaN(duration)) {
      duration = type === "success" ? DEFAULT_DURATION : null;
    }

    // Create final options object
    return {
      text: mergedParams.text || mergedParams.message || "",
      type,
      position,
      content: this.config.partialContent,
      duration,
      name: this.name,
      styles: mergedParams.styles || {},
      hideOnClick: mergedParams.hideOnClick !== false,
      onClose: () => {
        if (this.config.onClose) {
          this.config.onClose(this, null);
        }
      },
      onClick: () => {
        if (this.config.onOk) {
          this.config.onOk(this, null);
        }
      },
    };
  }

  public invoke(params?: any, onSuccess?: Function, onError?: Function): Promise<any> {
    // Priority: params.data > params > this.dataSet
    const mergedParams = params?.data
      ? merge(this.config.paramProvider(), params.data)
      : params
        ? merge(this.config.paramProvider(), params)
        : merge(this.config.paramProvider(), this.dataSet);

    // Notify before invoke
    this.notify(VariableEvents.BEFORE_INVOKE, [this, mergedParams]);

    try {
      // Handle different operation types
      if (this.config.operation === "toast") {
        this.showToast(mergedParams);
      } else if (this.config.showDialog) {
        const dialogData = {
          ...mergedParams,
          onOk: () => this.config.onOk?.(this, mergedParams),
          onCancel: () => this.config.onCancel?.(this, mergedParams),
          onClose: () => this.config.onClose?.(this, mergedParams),
        };

        this.config.showDialog(dialogData);
      }

      // Call success callback
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(this, mergedParams);
      }
      this.notify(VariableEvents.SUCCESS, [this, mergedParams]);
    } catch (error) {
      // Handle errors
      console.error("Error in notification action:", error);
      if (onError) onError(this, error);
      this.notify(VariableEvents.ERROR, [this, error]);
      return Promise.reject(error);
    }

    this.notify(VariableEvents.AFTER_INVOKE, [this, mergedParams]);
    return Promise.resolve(this);
  }

  private showToast(params: any): void {
    try {
      let service = this.config.toasterService?.();

      if (!service) {
        service = toastService;
      }

      if (service && typeof service.showToast === "function") {
        service.showToast(this.prepareToastOptions(params));
      } else {
        console.warn("Toast service not available");
      }
    } catch (error) {
      console.error("Error showing toast:", error);
    }
  }

  public getMessage() {}
}
