import React, { useEffect } from "react";

import { ToastOptions, ToastContextValue } from "@wavemaker/react-runtime/actions/types";
import { useToast } from "./toast-provider";

class ToastService {
  private static instance: ToastService;
  private context: ToastContextValue | null = null;
  private activeToasts = new Map<
    string,
    {
      timeoutId?: ReturnType<typeof setTimeout>;
      onClose?: () => void;
    }
  >();

  constructor() {
    if (ToastService.instance) {
      return ToastService.instance;
    }

    this.showToast = this.showToast.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.hideAllToasts = this.hideAllToasts.bind(this);
    this.setContext = this.setContext.bind(this);

    ToastService.instance = this;
  }

  public setContext(context: ToastContextValue | null): void {
    this.context = context;
  }

  public showToast(options: ToastOptions): string {
    if (!this.context) {
      console.warn("Toast service used before context is set. Make sure ToastProvider is mounted.");
      return "error";
    }

    this.hideAllToasts();

    const id = this.context.showToast(options);

    // Track the toast
    this.activeToasts.set(id, {
      onClose: options.onClose,
    });

    return id;
  }

  public hideToast(id: string): void {
    if (!this.context) return;

    const toastData = this.activeToasts.get(id);
    if (toastData) {
      if (toastData.timeoutId) {
        clearTimeout(toastData.timeoutId);
      }
      this.activeToasts.delete(id);
    }

    this.context.hideToast(id);
  }

  public hideAllToasts(): void {
    if (!this.context) return;

    this.activeToasts.forEach(data => {
      if (data.timeoutId) {
        clearTimeout(data.timeoutId);
      }
    });

    this.activeToasts.clear();
    this.context.hideAllToasts();
  }
}

// Create singleton instance
export const toastService = new ToastService();

export const ToastInitializer = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  useEffect(() => {
    toastService.setContext(toast);

    return () => {
      // Clear context reference
      toastService.setContext(null);
    };
  }, [toast]);

  return <>{children}</>;
};
