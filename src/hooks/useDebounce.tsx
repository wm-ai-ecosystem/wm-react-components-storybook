import { useRef, useCallback } from "react";

/**
 * A hook that returns a debounced version of the provided callback function.
 * The callback will only be executed after the specified delay has passed since the last invocation.
 *
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the callback function with a cancel method
 */
export const useDebounceCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T & { cancel: () => void } => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      // Clear the previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        timeoutRef.current = null;
      }, delay);
    }) as T,
    [callback, delay]
  );

  // Add cancel method to the debounced function
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Attach cancel method to the debounced function
  (debouncedCallback as any).cancel = cancel;

  return debouncedCallback as T & { cancel: () => void };
};

/**
 * A simpler debounce utility function that can be used outside of React components
 *
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function with a cancel method
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T & { cancel: () => void } => {
  let timeoutId: NodeJS.Timeout | null = null;

  const debouncedFunction = ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  }) as T;

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  (debouncedFunction as any).cancel = cancel;
  return debouncedFunction as T & { cancel: () => void };
};
