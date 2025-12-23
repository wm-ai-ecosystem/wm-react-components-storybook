import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface DocumentationProps {
  overview?: string;
  properties?:string;
  events?:string;
  methods?:string;
  styling?: string;
}

export const ComponentDocumentation: React.FC<DocumentationProps> = ({
  overview,
  properties,
  events,
  methods,
  styling,  
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
      }}
      onClick={() => setActiveTab(key)}
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
          margin: 20px 0;
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
      `}</style>

      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(128,128,128,0.2)",
          marginBottom: "20px",
        }}
      >
        {overview && renderTab("overview", "Overview")}
        {properties && renderTab("properties", "Properties")}
        {events && renderTab("events", "Events")}
        {methods && renderTab("methods", "Methods")}
        {styling && renderTab("styling", "Styling")}
      </div>

      <div style={{ padding: "10px 0" }}>
        {activeTab === "overview" && overview && (
          <div>
            <ReactMarkdown>{overview}</ReactMarkdown>
          </div>
        )}
        {activeTab === "properties" && properties && (
          <div>
            <ReactMarkdown>{properties}</ReactMarkdown>
          </div>
        )}
         {activeTab === "events" && events && (
          <div>
            <ReactMarkdown>{events}</ReactMarkdown>
          </div>
        )}
         {activeTab === "methods" && methods && (
          <div>
            <ReactMarkdown>{methods}</ReactMarkdown>
          </div>
        )}
        {activeTab === "styling" && styling && (
          <div>
            <ReactMarkdown>{styling}</ReactMarkdown>
          </div>
        )}
       
      </div>
    </div>
  );
};
