interface I18nService {
  selectedLocale?: string;
  getSelectedLocale: () => string;
  isRTLLocale: (newLocale?: string) => any;
  setRTL: (locale?: string) => any;
}

interface DialogServiceInterface {
  registerDialog: (name: string, dialogInstance: any) => void;
  unregisterDialog: (name: string) => void;
  open: (dialogName: string) => void;
  close: (dialogName: string) => void;
  getDialog: (dialogName: string) => any;
  getAllDialogs: () => Record<string, any>;
  isDialogOpen: (dialogName: string) => boolean;
}

const map = new Map<string, any>();

const get = <T>(t: string): T => {
  return map.get(t) as T;
};

const set = <T>(t: string, o: T) => {
  map.set(t, o);
};

const remove = <T>(t: string): T => {
  const v = map.get(t) as T;
  v && map.delete(t);
  return v;
};

const getDependency = (t: string) => {
  const v = map.get(t);
  if (v) {
    return v;
  }
  return null;
};

const getApp = () => {
  const entries = Object.fromEntries(map.entries());
  return entries;
};

const getInstance = <T>(key: string) => {
  return {
    set: (o: T) => set(key, o),
    get: () => get(key) as T,
    remove: () => remove(key) as T,
  };
};

const appstore = {
  set: set,
  get: get,
  remove: remove,
  getDependency: getDependency,
  getApp: getApp,
  I18nService: getInstance<I18nService>("I18nService"),
  DialogService: getInstance<DialogServiceInterface>("DialogService"),
};

// Initialize I18nService with default implementation if not already set
if (!appstore.I18nService.get()) {
  appstore.I18nService.set({
    selectedLocale: "en",
    getSelectedLocale: function () {
      // Try to get from session storage first
      if (typeof window !== "undefined") {
        const sessionLocale = window.sessionStorage?.getItem("selectedLocale");
        if (sessionLocale) {
          return sessionLocale;
        }
      }
      // Fall back to the selectedLocale property or default
      return this.selectedLocale || "en";
    },
    isRTLLocale: (newLocale?: string) => {
      // Default RTL implementation - can be overridden
      const rtlLocales = ["ar", "he", "fa", "ur"];
      const locale = newLocale || appstore.I18nService.get()?.getSelectedLocale() || "en";
      return rtlLocales.some(rtl => locale.startsWith(rtl));
    },
    setRTL: (locale?: string) => {
      // Default setRTL implementation - can be overridden
      if (typeof document !== "undefined") {
        const isRTL = appstore.I18nService.get()?.isRTLLocale(locale);
        document.body.style.direction = isRTL ? "rtl" : "ltr";
      }
    },
  });
}

export default appstore;
