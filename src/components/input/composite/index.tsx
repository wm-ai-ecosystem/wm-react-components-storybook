import React, { useRef, useEffect, useCallback } from "react";
import clsx from "clsx";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmLabel from "@wavemaker/react-runtime/components/basic/label";

const DEFAULT_CLASS = "form-group app-composite-widget clearfix";

interface WmCompositeProps extends BaseProps {
  captionposition: string;
  required?: boolean;
}

const CAPTION_POSITION: Record<string, string> = {
  left: "caption-left",
  right: "caption-right",
  top: "caption-top",
  floating: "caption-floating",
};

export function WmComposite(props: WmCompositeProps) {
  const { children, styles, className, captionposition = "left", id, required } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const isFloating = captionposition === "floating";

  // Utility: Check if input has a value
  const hasInputValue = useCallback(
    (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean => {
      return Boolean(input.value?.trim());
    },
    []
  );

  // Utility: Toggle float-active class
  const toggleFloatActive = useCallback((shouldFloat: boolean) => {
    if (!containerRef.current) return;
    containerRef.current.classList.toggle("float-active", shouldFloat);
  }, []);

  // Handle focus event - activate floating label and show placeholder
  const handleFocus = useCallback(
    (event: Event) => {
      if (!isFloating) return;

      toggleFloatActive(true);

      // Show placeholder on focus
      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const originalPlaceholder = target.getAttribute("data-original-placeholder");
      if (originalPlaceholder) {
        target.setAttribute("placeholder", originalPlaceholder);
      }
    },
    [isFloating, toggleFloatActive]
  );

  // Handle blur event - check if input has value
  const handleBlur = useCallback(
    (event: Event) => {
      if (!isFloating) return;

      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

      // Keep float-active if input has value, otherwise remove it
      toggleFloatActive(hasInputValue(target));

      // Always hide placeholder on blur
      target.setAttribute("placeholder", "");
    },
    [isFloating, toggleFloatActive, hasInputValue]
  );

  // Setup event listeners for floating label behavior
  useEffect(() => {
    if (!isFloating || !containerRef.current) return;

    const container = containerRef.current;
    const INPUT_SELECTOR = "input, select, textarea";
    const inputElements = container.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(INPUT_SELECTOR);

    if (inputElements.length === 0) return;

    // Initialize each input
    inputElements.forEach(input => {
      // Store and hide placeholder
      const originalPlaceholder = input.getAttribute("placeholder");
      if (originalPlaceholder) {
        input.setAttribute("data-original-placeholder", originalPlaceholder);
        input.setAttribute("placeholder", "");
      }

      // Check initial value and set float state
      if (hasInputValue(input)) {
        toggleFloatActive(true);
      }

      // Attach event listeners
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    // Cleanup function
    return () => {
      inputElements.forEach(input => {
        // Restore placeholder
        const originalPlaceholder = input.getAttribute("data-original-placeholder");
        if (originalPlaceholder) {
          input.setAttribute("placeholder", originalPlaceholder);
          input.removeAttribute("data-original-placeholder");
        }

        // Remove event listeners
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, [isFloating, children, handleFocus, handleBlur, hasInputValue, toggleFloatActive]);

  // Inject required prop into WmLabel children (memoized)
  const childElements = React.useMemo(() => {
    if (!required) return children;

    return React.Children.map(children, child => {
      if (
        React.isValidElement(child) &&
        (child.type === WmLabel || (child.type as any).displayName === "WmLabel") &&
        (child.props as any).required === undefined
      ) {
        return React.cloneElement(child, { required } as any);
      }
      return child;
    });
  }, [children, required]);

  return (
    <div
      ref={containerRef}
      style={styles}
      className={clsx(
        { [DEFAULT_CLASS]: true, [className || ""]: Boolean(className) },
        `${CAPTION_POSITION[captionposition]} ${required ? "required" : ""}`
      )}
      id={id}
    >
      {childElements}
    </div>
  );
}

WmComposite.displayName = "WmComposite";

export default withBaseWrapper(WmComposite);
