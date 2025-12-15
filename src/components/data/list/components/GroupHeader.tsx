import React from "react";
import clsx from "clsx";
import { GroupHeaderProps } from "./props";

/**
 * Group header component for grouped lists
 */
export const GroupHeader: React.FC<GroupHeaderProps> = ({
  groupKey,
  displayCount,
  isCollapsed,
  collapsible,
  showcount,
  onHeaderClick,
}) => (
  <li
    className={clsx("app-list-item-header list-item list-group-header", {
      "collapsible-content": collapsible,
    })}
    onClick={() => onHeaderClick(groupKey)}
  >
    <h4>
      {groupKey}
      <div className="header-action">
        {collapsible && (
          <i
            className={clsx(
              "app-icon wi action",
              isCollapsed ? "wi-chevron-down" : "wi-chevron-up"
            )}
          ></i>
        )}
        {showcount && <span className="label label-default">{displayCount}</span>}
      </div>
    </h4>
  </li>
);
