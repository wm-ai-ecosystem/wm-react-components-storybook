"use client";

import EventNotifier from "@/core/event-notifier";
import get from "lodash-es/get";

let MINIMUM_MOBILE_WIDTH = 480;
let MINIMUM_TAB_WIDTH = 768;
let MINIMUM_LARGE_SCREEN_WIDTH = 1200;

const enum SCREEN_TYPE {
  MOBILE,
  TABLET,
  LARGE_SCREEN_DEVICES,
}

export const enum ViewportEvent {
  ORIENTATION_CHANGE = "orientationchange",
  RESIZE = "resize",
}

export interface IViewportService {
  notify: (eventname: ViewportEvent, options?: Array<any>) => void;
  subscribe: (eventname: ViewportEvent, callback: (data: any) => void) => () => void;
}

const isAndroid = () => {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
};
const isAndroidTablet = () => {
  if (typeof navigator === "undefined") return false;
  return /android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent);
};
const isIos = () => {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export class ViewportService implements IViewportService {
  public orientation = {
    isPortrait: false,
    isLandscape: false,
  };

  public isMobileType = false;
  public isTabletType = false;
  private type: SCREEN_TYPE | undefined;
  public _eventNotifier = new EventNotifier();
  private screenWidth: number = 0;
  private screenHeight: number = 0;
  private selectedViewPort: any;
  private boundResizeFn: (($event: Event) => void) | null = null;

  constructor() {
    if (typeof window === "undefined") return;

    this.setScreenType();
    this.boundResizeFn = this.resizeFn.bind(this);
    window.addEventListener(ViewportEvent.RESIZE, this.boundResizeFn);

    const query = window.matchMedia("(orientation: portrait)");
    if (query.matches) {
      this.orientation.isPortrait = true;
    } else {
      this.orientation.isLandscape = true;
    }

    // Add a media query change listener
    // addEventListener is not supported ios browser
    if (query.addEventListener) {
      query.addEventListener("change", ($event: MediaQueryListEvent) =>
        this.orientationChange($event, !$event.matches)
      );
    } else if ((query as any).addListener) {
      (query as any).addListener(($event: MediaQueryListEvent) =>
        this.orientationChange($event, !$event.matches)
      );
    }
  }

  update(selectedViewPort: Object) {
    this.selectedViewPort = selectedViewPort;
    this.setScreenType();
  }

  private orientationChange($event: MediaQueryListEvent | Event, isLandscape: boolean) {
    if (isLandscape !== this.orientation.isLandscape) {
      this.orientation.isPortrait = !isLandscape;
      this.orientation.isLandscape = isLandscape;
      this.notify(ViewportEvent.ORIENTATION_CHANGE, {
        $event,
        data: { isPortrait: !isLandscape, isLandscape: isLandscape },
      });
    }
  }

  private resizeFn($event: Event) {
    const $el = document.querySelector(".wm-app");
    if (!$el) {
      return;
    }

    this.setScreenType();
    this.orientationChange($event, this.screenWidth >= this.screenHeight);
    this.notify(ViewportEvent.RESIZE, {
      $event,
      data: { screenWidth: this.screenWidth, screenHeight: this.screenHeight },
    });
  }

  public subscribe(eventName: string, callback: (data: any) => void): () => void {
    return this._eventNotifier.subscribe(eventName, callback);
  }

  public notify(eventName: string, ...data: Array<any>) {
    this._eventNotifier.notify(eventName, data);
  }

  private setScreenType() {
    if (typeof window === "undefined") {
      return;
    }
    const $el = document.querySelector(".wm-app");
    if (!$el) return;

    this.screenWidth = $el.clientWidth;
    this.screenHeight = $el.clientHeight;

    this.isTabletType = false;
    this.isMobileType = false;

    if (get(this.selectedViewPort, "deviceCategory")) {
      const deviceCategory = this.selectedViewPort.deviceCategory;
      if (deviceCategory === "Tab") {
        this.isTabletType = true;
      } else if (deviceCategory === "Smartphone") {
        this.isMobileType = true;
      }
    } else {
      MINIMUM_MOBILE_WIDTH =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue("--screen-xs")) || 480;
      MINIMUM_TAB_WIDTH =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue("--screen-sm")) || 768;
      MINIMUM_LARGE_SCREEN_WIDTH =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue("--screen-lg")) ||
        1200;

      if (this.screenWidth >= MINIMUM_LARGE_SCREEN_WIDTH) {
        this.isTabletType = isAndroid() || isIos() || isAndroidTablet();
        this.isMobileType = false;
      } else if (this.screenWidth >= MINIMUM_TAB_WIDTH) {
        this.type = SCREEN_TYPE.TABLET;
        this.isTabletType = true;
      } else {
        this.type = SCREEN_TYPE.MOBILE;
        this.isMobileType = true;
      }
    }
  }

  getViewport() {
    return {
      screenWidth: this.screenWidth,
      screenHeight: this.screenHeight,
      windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
      windowHeight: typeof window !== "undefined" ? window.innerHeight : 0,
      isMobile: this.isMobileType,
      isTablet: this.isTabletType,
      isDesktop: !this.isMobileType && !this.isTabletType,
      orientation: this.orientation,
    };
  }

  destroy() {
    this._eventNotifier.destroy();
    if (typeof window !== "undefined" && this.boundResizeFn) {
      window.removeEventListener("resize", this.boundResizeFn);
    }
  }
}

// Lazy singleton initialization - only create instance when first accessed
let viewportServiceInstance: ViewportService | null = null;

// SSR-safe stub that matches ViewportService interface
const createSSRStub = (): ViewportService => {
  const stub = {
    orientation: { isPortrait: false, isLandscape: false },
    isMobileType: false,
    isTabletType: false,
    type: undefined,
    _eventNotifier: new EventNotifier(),
    screenWidth: 0,
    screenHeight: 0,
    selectedViewPort: undefined,
    boundResizeFn: null,
    subscribe: () => () => {},
    notify: () => {},
    update: () => {},
    getViewport: () => ({
      screenWidth: 0,
      screenHeight: 0,
      windowWidth: 0,
      windowHeight: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      orientation: { isPortrait: false, isLandscape: false },
    }),
    destroy: () => {},
  };
  return stub as unknown as ViewportService;
};

function getViewportService(): ViewportService {
  if (typeof window === "undefined") {
    // During SSR, return stub without creating real instance
    if (!viewportServiceInstance) {
      viewportServiceInstance = createSSRStub();
    }
    return viewportServiceInstance;
  }

  if (!viewportServiceInstance) {
    viewportServiceInstance = new ViewportService();
  }
  return viewportServiceInstance;
}

// Export singleton instance with lazy initialization using Proxy
export const viewportService = new Proxy({} as ViewportService, {
  get(_target, prop) {
    const service = getViewportService();
    const value = service[prop as keyof ViewportService];
    // Bind methods to maintain correct 'this' context
    if (typeof value === "function") {
      return value.bind(service);
    }
    return value;
  },
});
