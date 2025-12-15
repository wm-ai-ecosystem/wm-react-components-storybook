/**
 * Utility to wrap all methods in a script object with jQuery error handling
 * This prevents jQuery usage from breaking the React application
 */

/**
 * Configuration for unsupported libraries
 */

interface LibraryConfig {
  identifiers: string[];
  errorMessage: string;
  notificationMessage: string;
}

interface UnsupportedLibraries {
  [key: string]: LibraryConfig;
}

const UNSUPPORTED_LIBRARIES: UnsupportedLibraries = {
  jquery: {
    identifiers: ["jQuery", "$"],
    errorMessage: "jQuery is not supported in React App",
    notificationMessage: "jQuery functionality is not supported. Check console for details.",
  },
  // Add more libraries here in future
};

/**
 * Result of unsupported library detection
 */
interface DetectionResult {
  isUnsupported: boolean;
  library: string | null;
  config?: LibraryConfig;
}

/**
 * Detects if an error is related to any unsupported library
 * @param error - The error object to check
 * @returns Object with isUnsupported flag and library info
 */
function detectUnsupportedLibrary(error: { stack?: any; message?: string }): DetectionResult {
  if (!error || !error.stack) {
    return { isUnsupported: false, library: null };
  }

  const errorMessage = error.message || "";
  const stackTrace = String(error.stack);

  // Check each configured library
  for (const [libraryName, config] of Object.entries(UNSUPPORTED_LIBRARIES)) {
    const identifiers = config.identifiers;

    // Check if error message contains library identifiers
    if (identifiers.some(identifier => errorMessage.includes(identifier))) {
      return {
        isUnsupported: true,
        library: libraryName,
        config: config,
      };
    }

    // Check if stack trace contains library identifiers
    const stackLines = stackTrace.split("\n");
    for (const line of stackLines) {
      if (identifiers.some(identifier => line.includes(identifier))) {
        return {
          isUnsupported: true,
          library: libraryName,
          config: config,
        };
      }
    }
  }

  return { isUnsupported: false, library: null };
}

/**
 * Checks if an error is related to jQuery usage
 * @param error - The error object to check
 * @returns true if the error is jQuery-related
 */
export const isJQueryError = (error: any): boolean => {
  if (!error?.stack) return false;

  const UnSupportedFunctionality = ["jQuery", "$"];

  // Check if error message contains jQuery references
  if (error.message && UnSupportedFunctionality.some(func => error.message.includes(func))) {
    return true;
  }

  // Check stack trace for jQuery references
  const stackLines = error.stack.split("\n");
  for (const line of stackLines) {
    if (UnSupportedFunctionality.some(func => line.includes(func))) {
      return true;
    }
  }

  return false;
};

interface AppContext {
  notifyApp?: (message: string, type: string) => void;
}

/**
 * Wraps all methods with unsupported library error handling
 * @param pageProxy - The page/prefab proxy object
 * @param appContext - App context for notifications
 * @param componentName - Name of component for logging
 * @param libraryConfig - Optional: specific libraries to check (default: all)
 */
export const wrapWithThirdPartyErrorGuard = (
  pageProxy: Record<string, any>,
  appContext: AppContext | null | undefined,
  componentName: string,
  libraryConfig: UnsupportedLibraries = UNSUPPORTED_LIBRARIES
): void => {
  const skipProperties = [
    "Variables",
    "Actions",
    "Widgets",
    "App",
    "pageParams",
    "serviceDefinitions",
    "baseUrl",
    "appConfig",
    "notification",
    "toaster",
    "onContentReady",
    "onChange",
    "cleanup",
    "eval",
    "appLocale",
    "executeStartup",
    "formatters",
    "type",
    "componentName",
    "componentType",
    "prefabname",
    "onPropertyChange",
  ];

  Object.keys(pageProxy).forEach((methodName: string) => {
    if (typeof pageProxy[methodName] === "function" && !skipProperties.includes(methodName)) {
      const originalMethod = pageProxy[methodName] as (...args: any[]) => any;

      pageProxy[methodName] = function (this: any, ...args: any[]) {
        try {
          return originalMethod.apply(this, args);
        } catch (error: unknown) {
          // Detect which unsupported library caused the error
          const detection = detectUnsupportedLibrary(error as { stack?: any; message?: string });

          if (detection.isUnsupported && detection.library && detection.config) {
            const library = detection.library;
            const config = detection.config;

            // Log detailed error
            console.error(
              `[${library.toUpperCase()} ERROR] in ${componentName}.${methodName}()`,
              `\n${config.errorMessage}`,
              "\nError:",
              error
            );

            // Show user notification
            if (appContext?.notifyApp) {
              appContext.notifyApp(config.notificationMessage, "Error");
            }

            // Return undefined to prevent further errors
            return undefined;
          } else {
            // Not an unsupported library error - log normally
            console.log(`Error in ${componentName}.${methodName}():`);
          }
        }
      };

      // Preserve function name for debugging
      Object.defineProperty(pageProxy[methodName], "name", {
        value: `wrapped_${methodName}`,
        writable: false,
      });
    }
  });
};
