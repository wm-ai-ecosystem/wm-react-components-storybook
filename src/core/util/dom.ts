"use client";

let $RAF: (callback: FrameRequestCallback) => number;
let $RAFQueue: any[] = [];

if (typeof window !== "undefined") {
  $RAF = window.requestAnimationFrame;
} else {
  $RAF = callback => setTimeout(callback, 0);
}

const invokeLater = (fn: Function) => {
  if (!$RAFQueue.length) {
    $RAF(() => {
      $RAFQueue.forEach(f => f());
      $RAFQueue.length = 0;
    });
  }
  $RAFQueue.push(fn);
};

export const setCSS = (
  node: HTMLElement,
  cssName: string,
  val?: string | number,
  sync?: boolean
) => {
  if (typeof window === "undefined") return;
  // @ts-ignore
  const task = () => (node.style[cssName] = val);
  sync ? task() : invokeLater(task);
};

// Helper to check if something is a DOM element
export const isDOMElement = (obj: any): boolean => {
  if (!obj || typeof obj !== "object") return false;

  // Check for DOM node characteristics
  if (typeof window !== "undefined") {
    return (
      obj instanceof Element ||
      obj instanceof Node ||
      (obj.nodeType && typeof obj.nodeName === "string")
    );
  }

  return false;
};

// Create empty wrapper for when elements are not found (like empty jQuery object)
const createEmptyWrapper = () => {
  return {
    0: null,
    length: 0,

    // Empty wrapper methods that do nothing (jQuery-like behavior)
    find: () => createEmptyWrapper(),
    attr: () => createEmptyWrapper(),
    removeAttr: () => createEmptyWrapper(),
    get: () => null,
  };
};

// Minimal wrapper with essential jQuery methods that are actually used
export const wrapWithNativeDOM = (element: HTMLElement | null): any => {
  if (!element || !isDOMElement(element)) {
    return createEmptyWrapper();
  }

  // Create wrapper object with essential jQuery methods
  const wrapper = {
    // Array-like properties for jQuery compatibility
    0: element,
    length: 1,

    // Essential jQuery methods using native DOM
    find: (selector: string) => {
      const found = element.querySelector(selector) as HTMLElement;
      return found ? wrapWithNativeDOM(found) : createEmptyWrapper();
    },

    attr: (name: string, value?: string) => {
      if (value === undefined) {
        return element.getAttribute(name);
      }
      element.setAttribute(name, value);
      return wrapper;
    },

    removeAttr: (name: string) => {
      element.removeAttribute(name);
      return wrapper;
    },

    // Direct access to native element
    get: () => element,
  };

  return wrapper;
};

// Backward compatibility alias
export const wrapWithJQuery = wrapWithNativeDOM;
