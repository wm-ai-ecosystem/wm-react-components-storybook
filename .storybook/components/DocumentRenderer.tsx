import React, { useState } from "react";
import { Markdown, DocsContainer } from "@storybook/addon-docs/blocks";

interface DocumentationProps {
  overview?: string;
  properties?:string;
  events?:string;
  methods?:string;
  styling?: string;
  style?: string;
  token?: string;
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
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const activeColor = "#296df6"; // Blue theme

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
      onClick={() => setActiveTab(key)}
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
          border-color: var(--primary-blue);
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
        
        /* Ensure table inside details takes full width and looks good */
        .component-documentation-container details table {
          width: 100%;
          border: none;
          box-shadow: none;
          margin: 0;
        }

        /* Table Styling */
        .component-documentation-container table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 20px 0 30px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          font-size: 14px;
        }

        .component-documentation-container th {
          background: var(--primary-blue);
          color: #ffffff;
          padding: 14px 16px;
          text-align: left;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
        }

        .component-documentation-container td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-color);
          color: #475569;
          background: #fff;
        }

        .component-documentation-container tr:last-child td {
          border-bottom: none;
        }

        .component-documentation-container tr:nth-child(even) td {
          background-color: #f8fafc;
        }
        
        .component-documentation-container tr:hover td {
          background-color: #eff6ff; /* Light blue hover */
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

        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6{
          margin: 24px 0 8px !important;
          padding: 0 0 12px !important
        }

        ul, ol{
          margin: 16px 0 !important
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
          margin: 20px 0 40px;
        }

      `}</style>

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
        {(style || token) && renderTab("designSystem", "Styling")}
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
        {activeTab === "styling" && styling && (
          <div>
            <MarkdownWrapper>{styling}</MarkdownWrapper>
          </div>
        )}
        {activeTab === "designSystem" && (style || token) && (
          <div>
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
          </div>
        )}

      </div>
    </div>
  );
};
