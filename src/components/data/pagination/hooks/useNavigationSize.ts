import { useState, useCallback, useEffect } from "react";
import { UseNavigationSizeProps } from "./props";

export const useNavigationSize = ({ navigation, navigationsize }: UseNavigationSizeProps) => {
  const [navigationClass, setNavigationClass] = useState<string>("");

  // Update navigation size based on navigation and navigationSize props
  const updateNavSize = useCallback(() => {
    const sizeClasses: Record<string, Record<string, string>> = {
      Pager: {
        small: "pager-sm",
        large: "pager-lg",
      },
      Basic: {
        small: "pagination-sm",
        large: "pagination-lg",
      },
      Classic: {
        small: "pagination-sm",
        large: "pagination-lg",
      },
    };

    if (navigation && navigationsize && sizeClasses[navigation]) {
      setNavigationClass(sizeClasses[navigation][navigationsize]);
    } else {
      setNavigationClass("");
    }
  }, [navigation, navigationsize]);

  useEffect(() => {
    updateNavSize();
  }, [updateNavSize]);

  return {
    navigationClass,
    updateNavSize,
  };
};
