import React, { useState, useMemo, createContext, useContext, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Toast,
  ToastOptions,
  TOAST_CONFIG,
  ToastContextValue,
} from "@wavemaker/react-runtime/actions/types";
import { ToastInitializer } from "@wavemaker/react-runtime/actions/toast.service";
import CustomToast from "@wavemaker/react-runtime/actions/toast";

// toast context
const ToastContext = createContext<ToastContextValue | null>(null);

// custom hook to use the toast context
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastPortalProps {
  toast: Toast | null;
  onClose: (id: string) => void;
}
export const ToastPortal = ({ toast, onClose }: ToastPortalProps) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Lazy initialization - only create the container if it doesn't exist
    if (!containerRef.current) {
      let element = document.getElementById(TOAST_CONFIG.CONTAINER_ID);
      if (!element) {
        element = document.createElement("div");
        element.id = TOAST_CONFIG.CONTAINER_ID;
        document.body.appendChild(element);
      }
      containerRef.current = element;
    }

    return () => {
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    };
  }, []);
  if (!toast) return null;

  return containerRef.current
    ? ReactDOM.createPortal(
        <CustomToast key={toast.id} toast={toast} onClose={() => onClose(toast.id)} />,
        containerRef.current
      )
    : null;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (options: ToastOptions): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: Toast = { ...options, id };

    setToast(newToast);

    const duration =
      typeof options.duration === "number"
        ? options.duration
        : options.type === "success"
          ? TOAST_CONFIG.DEFAULT_DURATION
          : 0;

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }

    return id;
  };

  // Hide toast function
  const hideToast = (id: string): void => {
    if (typeof toast?.onClose === "function") {
      toast.onClose();
    }
    setToast(null);
  };

  // Hide all toasts function
  const hideAllToasts = (): void => {
    if (typeof toast?.onClose === "function") {
      toast.onClose();
    }
    setToast(null);
  };

  // Create context value with memoization
  const contextValue = useMemo(() => ({ showToast, hideToast, hideAllToasts }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastInitializer>
        {children}
        <ToastPortal toast={toast} onClose={hideToast} />
      </ToastInitializer>
    </ToastContext.Provider>
  );
};
