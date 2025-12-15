import React from "react";
import { LegendItem } from "../utils";

interface FuriousLegendItemProps {
  entry: LegendItem;
  index: number;
  isSelected: boolean;
  onItemClick: (value: string, event: React.MouseEvent) => void;
}

export const FuriousLegendItem: React.FC<FuriousLegendItemProps> = ({
  entry,
  index,
  isSelected,
  onItemClick,
}) => (
  <div
    key={`legend-${index}`}
    className="legend-item"
    style={{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      userSelect: "none",
      border: `2px solid ${entry.color}`,
      borderRadius: "5px",
      backgroundColor: isSelected ? entry.color : "transparent",
    }}
    onClick={e => onItemClick(entry.value, e)}
  >
    <label
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        margin: 2,
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => {}} // Handled by parent div's onClick
        style={{
          width: "16px",
          height: "16px",
          margin: 0,
          cursor: "pointer",
          opacity: 0,
          position: "absolute",
        }}
      />
      <span
        style={{
          width: "16px",
          height: "16px",
          border: `2px solid ${isSelected ? "#fff" : entry.color}`,
          borderRadius: "2px",
          backgroundColor: isSelected ? entry.color : "transparent",
          position: "relative",
          display: "inline-block",
        }}
      >
        {isSelected && (
          <span
            style={{
              content: '""',
              position: "absolute",
              left: "4px",
              top: "1px",
              width: "4px",
              height: "8px",
              border: "solid white",
              borderWidth: "0 2px 2px 0",
              transform: "rotate(45deg)",
            }}
          />
        )}
      </span>
      <span style={{ fontSize: "14px", fontWeight: 700, color: isSelected ? "#fff" : entry.color }}>
        {entry.value.length > 10 ? entry.value.slice(0, 10) + "..." : entry.value}
      </span>
    </label>
  </div>
);
