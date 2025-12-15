import * as React from "react";

interface DialogInstance {
  open: () => void;
  close: (event?: React.SyntheticEvent) => void;
  isOpen: boolean;
  component: React.ComponentType<any>;
}

interface DialogServiceInterface {
  registerDialog(name: string, dialogInstance: DialogInstance): void;
  unregisterDialog(name: string): void;
  open(dialogName: string): void;
  close(dialogName: string): void;
  getDialog(dialogName: string): DialogInstance | null;
  getAllDialogs(): Record<string, DialogInstance>;
  isDialogOpen(dialogName: string): boolean;
}

class DialogService implements DialogServiceInterface {
  private dialogs: Map<string, DialogInstance> = new Map();

  registerDialog(name: string, dialogInstance: DialogInstance): void {
    this.dialogs.set(name, dialogInstance);
  }

  unregisterDialog(name: string): void {
    this.dialogs.delete(name);
  }

  open(dialogName: string): void {
    const dialog = this.dialogs.get(dialogName);
    if (dialog) {
      dialog.open();
    } else {
      console.error(
        `Dialog "${dialogName}" not found. Available dialogs: ${Array.from(this.dialogs.keys()).join(", ")}`
      );
    }
  }

  close(dialogName: string): void {
    const dialog = this.dialogs.get(dialogName);
    if (dialog) {
      dialog.close();
    } else {
      console.error(
        `Dialog "${dialogName}" not found. Available dialogs: ${Array.from(this.dialogs.keys()).join(", ")}`
      );
    }
  }

  getDialog(dialogName: string): DialogInstance | null {
    return this.dialogs.get(dialogName) || null;
  }

  getAllDialogs(): Record<string, DialogInstance> {
    return Object.fromEntries(this.dialogs.entries());
  }

  isDialogOpen(dialogName: string): boolean {
    const dialog = this.dialogs.get(dialogName);
    return dialog ? dialog.isOpen : false;
  }

  getDialogNames(): string[] {
    return Array.from(this.dialogs.keys());
  }

  clear(): void {
    this.dialogs.clear();
  }
}

// Create a singleton instance
const dialogService = new DialogService();

export default dialogService;
export type { DialogInstance, DialogServiceInterface };
