import React, { useState, useEffect, useRef } from "react";
import { Markdown, DocsContainer } from "@storybook/addon-docs/blocks";

interface DocumentationProps {
  overview?: string;
  properties?:string;
  events?:string;
  methods?:string;
  styling?: string;
  style?: string;
  token?: string;
  externalLink?: {
    href: string;
    label?: string;
  };
}

// Wrapper component to provide Storybook docs context
const MarkdownWrapper: React.FC<{ children: string }> = ({ children }) => {
  // Create a minimal channel implementation
  const channel = {
    on: () => () => {},
    emit: () => {},
    once: () => () => {},
    off: () => {},
    removeListener: () => {},
    addListener: () => () => {},
  };

  const context = {
    id: 'custom-docs',
    title: 'Documentation',
    name: 'Documentation',
    importPath: '',
    storyById: () => ({}),
    componentStoriesFromCSFFile: () => [],
    channel,
    store: {
      getState: () => ({}),
      subscribe: () => () => {},
    },
  };

  return (
    <DocsContainer context={context as any}>
      <Markdown>{children}</Markdown>
    </DocsContainer>
  );
};

export const ComponentDocumentation: React.FC<DocumentationProps> = ({
  overview,
  properties,
  events,
  methods,
  styling,
  style,
  token,
  externalLink,
}) => {
  // Get parent window for Storybook iframe, fallback to current window
  const getParentWindow = () => {
    try {
      return window.parent !== window ? window.parent : window;
    } catch {
      return window;
    }
  };

  // Initialize tab from URL hash (with 'tab-' prefix to avoid ID conflicts)
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const parentWin = getParentWindow();
      const hash = parentWin.location.hash.replace('#tab-', '');
      return hash || "overview";
    } catch {
      return "overview";
    }
  });

  const activeColor = "#296df6"; // Blue theme

  // Refs to track scroll prevention
  const isChangingTab = useRef(false);
  const savedScrollPosition = useRef({ x: 0, y: 0 });

  // Aggressive scroll prevention during tab changes
  useEffect(() => {
    const parentWin = getParentWindow();

    const preventScroll = (e: Event) => {
      if (isChangingTab.current) {
        e.preventDefault();
        e.stopPropagation();
        parentWin.scrollTo(savedScrollPosition.current.x, savedScrollPosition.current.y);
      }
    };

    try {
      // Listen to ALL scroll-related events
      parentWin.addEventListener('scroll', preventScroll, { passive: false });
      parentWin.document.addEventListener('scroll', preventScroll, { passive: false });

      return () => {
        parentWin.removeEventListener('scroll', preventScroll);
        parentWin.document.removeEventListener('scroll', preventScroll);
      };
    } catch (e) {
      return () => {};
    }
  }, []);

  // Update URL hash when tab changes (prevents scroll with replaceState)
  const handleTabChange = (tab: string) => {
    try {
      const parentWin = getParentWindow();

      // Save scroll position BEFORE any changes
      savedScrollPosition.current = {
        x: parentWin.scrollX || 0,
        y: parentWin.scrollY || 0
      };

      // Set flag to prevent scroll
      isChangingTab.current = true;

      // Update state
      setActiveTab(tab);

      // Update URL with 'tab-' prefix to avoid matching content IDs
      const url = parentWin.location.href.split('#')[0];
      parentWin.history.replaceState(null, '', url + '#tab-' + tab);

      // Force scroll back immediately
      parentWin.scrollTo(savedScrollPosition.current.x, savedScrollPosition.current.y);

      // Keep preventing scroll for a short period while React renders
      setTimeout(() => {
        parentWin.scrollTo(savedScrollPosition.current.x, savedScrollPosition.current.y);
      }, 0);

      setTimeout(() => {
        parentWin.scrollTo(savedScrollPosition.current.x, savedScrollPosition.current.y);
        isChangingTab.current = false; // Release scroll lock
      }, 100);
    } catch (e) {
      setActiveTab(tab);
      isChangingTab.current = false;
      console.warn('Could not update URL hash:', e);
    }
  };

  // Initialize: Set hash to overview if none exists, detect story changes
  useEffect(() => {
    const parentWin = getParentWindow();
    let previousPath = '';

    try {
      previousPath = parentWin.location.search;

      // Set initial hash if missing (with tab- prefix)
      if (!parentWin.location.hash) {
        const url = parentWin.location.href.split('#')[0];
        parentWin.history.replaceState(null, '', url + '#tab-overview');
      }
    } catch (e) {
      console.warn('Could not access parent window:', e);
    }

    // Listen for hash changes (back/forward navigation)
    const handleHashChange = () => {
      try {
        const currentPath = parentWin.location.search;
        const hash = parentWin.location.hash.replace('#tab-', '');

        // Story changed - reset to overview
        if (previousPath && currentPath !== previousPath) {
          setActiveTab('overview');
          const url = parentWin.location.href.split('#')[0];
          parentWin.history.replaceState(null, '', url + '#tab-overview');
        } else {
          // Same story - update tab
          setActiveTab(hash || 'overview');
        }

        previousPath = currentPath;
      } catch (e) {
        console.warn('Error handling hash change:', e);
      }
    };

    // Listen on parent window
    try {
      parentWin.addEventListener('hashchange', handleHashChange);
      parentWin.addEventListener('popstate', handleHashChange);

      return () => {
        parentWin.removeEventListener('hashchange', handleHashChange);
        parentWin.removeEventListener('popstate', handleHashChange);
      };
    } catch (e) {
      console.warn('Could not add event listeners:', e);
      return () => {};
    }
  }, []);

  const renderTab = (key: string, label: string) => (
    <button
      style={{
        padding: "10px 20px",
        border: "none",
        background: "transparent",
        color: activeTab === key ? activeColor : "inherit",
        borderBottom:
          activeTab === key
            ? `2px solid ${activeColor}`
            : "2px solid transparent",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        outline: "none",
        opacity: activeTab === key ? 1 : 0.7,
        transition: "all 0.2s ease",
        borderRadius: "0",
      }}
      onClick={(e) => {
        e.preventDefault(); // Prevent any default button behavior
        handleTabChange(key);
      }}
      onMouseDown={(e) => e.preventDefault()} // Prevent focus change
      className="doc-tab"
    >
      {label}
    </button>
  );

  return (
    <div
      className="component-documentation-container"
      style={{ fontFamily: "sans-serif" }}
    >
      <style>{`
        /* Prevent ALL automatic scrolling */
        html, body {
          scroll-behavior: auto !important;
          overflow-anchor: none !important;
        }

        /* Prevent scroll anchoring in container */
        * {
          overflow-anchor: none !important;
        }

        .component-documentation-container {
          --primary-blue: #296df6;
          --bg-soft: #f8fafc;
          --border-color: #e2e8f0;
          --text-primary: #1e293b;
        }

        /* Container Styling */
        .component-documentation-container {
          color: var(--text-primary);
          min-width: 100%;
          padding: 0 24px;
        }

        /* Accordion (Details) Styling */
        .component-documentation-container details {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }


        .component-documentation-container details[open] {
          box-shadow: 0 10px 15px -3px rgba(41, 109, 246, 0.1), 0 4px 6px -2px rgba(41, 109, 246, 0.05);
        }

        .component-documentation-container summary {
          padding: 16px 20px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
          color: var(--text-primary);
          background: #ffffff;
          list-style: none; /* Hide default triangle */
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid transparent;
          transition: background-color 0.2s ease;
        }
        
        .component-documentation-container summary:hover {
          background-color: #f1f5f9;
        }

        .component-documentation-container summary::-webkit-details-marker {
          display: none;
        }

        /* Custom Accordion Icon */
        .component-documentation-container summary::after {
          content: "+";
          color: var(--primary-blue);
          font-size: 20px;
          font-weight: 400;
          line-height: 1;
          margin-left: 10px;
          transform: rotate(0deg);
          transition: transform 0.2s ease;
        }

        .component-documentation-container details[open] summary::after {
          content: "−"; /* Minus sign */
          transform: rotate(180deg);
        }

        .component-documentation-container details[open] summary {
          background-color: #eff6ff;
          border-bottom: 1px solid var(--border-color);
          color: var(--primary-blue);
        }

        /* Content inside details */
        .component-documentation-container details > div, 
        .component-documentation-container details > table {
          padding: 20px; 
          margin: 0;
        }
        
        .component-documentation-container details .sbdocs-wrapper{
          min-height: auto;
        }

        /* Ensure table inside details takes full width and looks good */
        .component-documentation-container details table {
          width: 100%;
          margin: 0;
        }

        /* Table Styling */
        .component-documentation-container table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 20px 0 30px;
          // border: 1px solid var(--border-color);
          border:none !important;
          border-radius: 8px;
          overflow: hidden;
          font-size: 14px;
        }

        .component-documentation-container th {
          background: var(--primary-blue);
          color: #ffffff !important;
          padding: 14px 16px;
          text-align: left;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
        }

        .component-documentation-container td {
          padding: 14px 16px;
          border:none !important;
          color: #475569;
          background: #fff;
        }

        /* docs table foont size */
        .component-documentation-container td span{
          font-size: 14px !important;
        }

        .component-documentation-container tr:last-child td {
          border-bottom: none;
        }

        .component-documentation-container tr:nth-child(even) td {
          background-color: #f8fafc;
        }
        
        .component-documentation-container tr:hover td {
          background-color: #eff6ff; 
        }

        .component-documentation-container details > div img{
          margin: 24px 0 8px !important;
        }

        /* Inline Code Styling */
        .component-documentation-container code {
          background: rgba(41, 109, 246, 0.1);
          color: var(--primary-blue);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }

        .component-documentation-container p + p{
          margin: 12px 0 !important
        }

        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6{
          margin: 24px 0 8px !important;
          padding: 0 0 12px !important;
        }

        h3, h4, h5, h6, .h3, .h4, .h5, .h6{
          padding: 0 0 4px !important;
        }

        ul, ol{
          margin: 12px 0 !important;
        }

        ul li{
          list-style-type: disc !important;
          margin-left: 24px !important;
        }

        ol li {
          list-style-type: decimal !important;
          margin-left: 24px !important;
        }

        .sbdocs-wrapper{
          padding: 0;
          flex-direction: row;
          justify-content: flex-start;
        }

        .doc-tab, .doc-tab:hover, .doc-tab:active, .doc-tab:focus{
          background-color: transparent !important;
        }

        .docblock-source{
          margin: 16px 0 40px;
        }

        /* Copy button of the code */ 
        .docblock-source button{
          font-size: 0 !important;
          border: none !important;
          position: relative;
          box-shadow: none !important;
        }

        /* Keep the pseudo-icon hidden by default and reveal on hover of the block or the button */
        .docblock-source button::before {
          content: "\\f1fa";
          font-size: 18px;
          display: inline-block;
          font-family: 'wavicon' !important;
          color: var(--wm-color-black);
          opacity: 0;
          background: transparent;
          width: 18px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          vertical-align: middle;
          transition: opacity 150ms ease, visibility 150ms ease;
          visibility: hidden;
        }

        /* Reveal icon when hovering the docblock or the button itself */
        .docblock-source:hover button::before,
        .docblock-source button:hover::before {
          opacity: 0.7;
          visibility: visible;
        }

        .docblock-source:hover button:focus::before{
          color: var(--primary-blue);
          opacity: 1;
        }

        .external-link-container{
          display: flex;
          justify-content: flex-end;
          margin-bottom: 16px;
        }

        a.external-link{
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--primary-blue);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 2px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        a.external-link:hover{
          // background-color: rgba(41, 109, 246, 0.08);
          text-decoration: underline;
        }

        .external-link img{
          width: 12px;
          height: 14px;
        }

      `}</style>

      {externalLink && (
        <div className="external-link-container">
          <a
            href={externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            <img
              src="/figmaLogo.png"
              alt="Figma"
            />
            {externalLink.label || "View in Figma"}
          </a>
        </div>
      )}

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(128,128,128,0.2)",
          marginBottom: "12px",
        }}
      >
        {overview && renderTab("overview", "Overview")}
        {properties && renderTab("properties", "Properties")}
        {events && renderTab("events", "Events")}
        {methods && renderTab("methods", "Methods")}
        {styling && renderTab("styling", "Styling")}
        {(style || token) && renderTab("styling", "Styling")}
      </div>

      <div style={{ padding: "10px 0" }}>
        {activeTab === "overview" && overview && (
          <div>
            <MarkdownWrapper>{overview}</MarkdownWrapper>
          </div>
        )}
        {activeTab === "properties" && properties && (
          <div>
            <MarkdownWrapper>{properties}</MarkdownWrapper>
          </div>
        )}
         {activeTab === "events" && events && (
          <div>
            <MarkdownWrapper>{events}</MarkdownWrapper>
          </div>
        )}
         {activeTab === "methods" && methods && (
          <div>
            <MarkdownWrapper>{methods}</MarkdownWrapper>
          </div>
        )}
        {activeTab === "styling" && (styling || style || token) && (
          <div>
            {styling && <MarkdownWrapper>{styling}</MarkdownWrapper>}
            {(style || token) && (
              <>
                {style && (
                  <details>
                    <summary>Variants</summary>
                    <div>
                      <MarkdownWrapper>{style}</MarkdownWrapper>
                    </div>
                  </details>
                )}
                {token && (
                  <details open>
                    <summary>Design Tokens</summary>
                    <div>
                      <MarkdownWrapper>{token}</MarkdownWrapper>
                    </div>
                  </details>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
