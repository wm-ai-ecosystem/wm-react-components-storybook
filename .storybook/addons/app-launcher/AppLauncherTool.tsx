/**
 * ============================================================================
 * APP LAUNCHER TOOL
 * ============================================================================
 *
 * This component renders the AppLauncher from wm-ui-components in the
 * Storybook toolbar (top header), as the first item in the right-side button group.
 * 
 * Uses a MutationObserver that waits for the toolbar to stabilize, then
 * appends directly to the right group. No React re-rendering conflicts.
 * 
 * Optimized for performance: debounced observer, early exit, single timeout fallback.
 */

import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AppLauncher } from "wm-ui-components";

export const AppLauncherTool: React.FC = () => {
  useEffect(() => {
    let mounted = true;
    let observer: MutationObserver | null = null;
    let debounceTimer: NodeJS.Timeout | null = null;
    let appended = false;

    const tryAppend = () => {
      if (!mounted || appended) return;

      const toolbar = document.querySelector('div[role="toolbar"]');
      if (!toolbar) return;

      // Get direct child divs of the toolbar
      const childDivs = Array.from(toolbar.querySelectorAll(':scope > div')) as HTMLElement[];
      if (childDivs.length < 2) return; // Need at least 2 groups

      const rightGroup = childDivs[1]; // second group (right-side)
      if (!rightGroup) return;

      // Check if AppLauncher already exists in the right group
      if (rightGroup.querySelector('.app-launcher-wrapper')) {
        appended = true;
        if (observer) observer.disconnect();
        return;
      }

      // Create the wrapper div and append directly to the right group
      const wrapper = document.createElement('div');
      wrapper.className = 'app-launcher-wrapper';

      try {
        // Append to right group (will be first item)
        rightGroup.insertBefore(wrapper, rightGroup.firstChild);

        // Render AppLauncher component into the wrapper using a portal
        const root = createRoot(wrapper);
        root.render(<AppLauncher excludeId="webstorybook" />);

        appended = true;
        if (observer) observer.disconnect();
      } catch (e) {
        console.warn('Failed to append AppLauncher:', e);
      }
    };

    // Debounced mutation observer callback to avoid excessive re-checks
    const onMutation = () => {
      if (appended) {
        if (observer) observer.disconnect();
        return;
      }

      // Debounce to avoid running tryAppend on every single DOM change
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(tryAppend, 100);
    };

    // Set up observer to detect when toolbar becomes available
    // Limit to subtree changes only (not all node changes)
    observer = new MutationObserver(onMutation);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Try immediately on component mount
    tryAppend();

    // Fallback: if toolbar still not ready after 3 seconds, give up
    const timeoutId = setTimeout(() => {
      if (!appended && observer) {
        observer.disconnect();
        if (debounceTimer) clearTimeout(debounceTimer);
      }
    }, 3000);

    return () => {
      mounted = false;
      if (observer) observer.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  // Return null since we're rendering into a portal
  return null;
};
