export interface ToastOptions {
  text: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  position?: ToastPosition;
  onClick?: () => void;
  onClose?: () => void;
  placement?: ToastPosition;
  content?: Record<string, any> | undefined;
  name?: string;
}

export type ToastPosition =
  | "top left"
  | "top center"
  | "top right"
  | "center left"
  | "center center"
  | "center right"
  | "bottom left"
  | "bottom center"
  | "bottom right";

export const TOAST_CONFIG = {
  CONTAINER_ID: "mui-toast-container",
  DEFAULT_DURATION: 3000,
  DEFAULT_POSITION: "bottom right" as ToastPosition,
};

export interface Toast extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  showToast: (options: ToastOptions) => string;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}
