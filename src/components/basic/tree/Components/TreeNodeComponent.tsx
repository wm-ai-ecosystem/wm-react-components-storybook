import React from "react";
import clsx from "clsx";
import Collapse from "@mui/material/Collapse";
import { TreeNodeComponentProps } from "../props";
import Box from "@mui/material/Box";

const TreeNodeComponent = React.memo(
  ({
    node,
    treeicons,
    isCheckboxTree,
    isRadioTree,
    selectedItem,
    handleNodeClick,
    toggleNodeExpansion,
    toggleNodeChecked,
    handleRadioSelect,
    depth = 0,
    treeName,
  }: TreeNodeComponentProps) => {
    const hasChildren = node.children && node.children.length > 0;

    // Generate a unique ID for DOM selection (similar to tId in zTree)
    node.tId = node.tId || `${treeName}_${node.nodeId}`;
    node.isParent = hasChildren;

    const renderExpandCollapseIcon = () => {
      if (hasChildren) {
        return (
          <Box
            component="span"
            className={clsx(
              "button",
              `level${depth}`,
              "switch",
              depth === 0
                ? node.open
                  ? "roots_open"
                  : "roots_close"
                : node.open
                  ? "bottom_open"
                  : "bottom_close",
              treeicons,
              "treenode_switch"
            )}
            treeicons={treeicons}
            onClick={(event: React.MouseEvent) => toggleNodeExpansion(event, node)}
            id={`${node.tId}_switch`}
            title=""
            {...({ treenode_switch: "true" } as any)}
          />
        );
      }
      return (
        <Box
          component="span"
          treeicons={treeicons}
          className={clsx(
            "button",
            `level${depth}`,
            "switch",
            "bottom_docu",
            treeicons,
            "treenode_switch"
          )}
          {...({ treenode_switch: "true" } as any)}
        />
      );
    };

    const renderCheckboxOrRadio = () => {
      if (!isCheckboxTree && !isRadioTree) return null;

      return (
        <Box
          component="span"
          className={clsx(
            "button",
            "chk",
            isRadioTree ? "radio_false_full" : "checkbox_false_full",
            node.checked && (isRadioTree ? "radio_true_full" : "checkbox_true_full")
          )}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            if (isRadioTree) {
              handleRadioSelect(event, node);
            } else {
              toggleNodeChecked(event, node);
            }
          }}
          treeicons={treeicons}
          id={`${node.tId}_check`}
          {...({ treenode_check: "true" } as any)}
        />
      );
    };

    const renderNodeIcon = () => {
      if (!node.icon) return null;

      return (
        <Box
          component="span"
          className={clsx("button", "ico_open", "treenode_ico")}
          id={`${node.tId}_ico`}
          title=""
          {...({ treenode_ico: "true" } as any)}
        />
      );
    };

    const renderNodeContent = () => {
      return (
        <Box
          component="a"
          onClick={(event: React.MouseEvent) => handleNodeClick(event, node)}
          className={clsx(
            `level${depth}`,
            "glyphicon",
            node.icon || "glyphicon-music",
            { curSelectedNode: selectedItem?.nodeId === node.nodeId },
            "treenode_a"
          )}
          data-node-id={node.nodeId}
          id={`${node.tId}_a`}
          title={node.label}
          {...({ treenode_a: "true" } as any)}
        >
          {renderNodeIcon()}
          <Box component="span" className="node_name" id={`${node.tId}_span`}>
            {node.label}
          </Box>
        </Box>
      );
    };

    const renderChildNodes = () => {
      if (!hasChildren) return null;

      return (
        <Collapse in={!!node.open}>
          <Box
            component="ul"
            className={clsx(`level${depth}`, "line")}
            id={`${node.tId}_ul`}
            style={{
              marginLeft: "20px",
              listStyle: "none",
              padding: 0,
              display: node.open ? "block" : "none",
            }}
          >
            {node.children &&
              node.children.map(childNode => (
                <TreeNodeComponent
                  key={childNode.nodeId}
                  node={childNode}
                  treeicons={treeicons}
                  isCheckboxTree={isCheckboxTree}
                  isRadioTree={isRadioTree}
                  selectedItem={selectedItem}
                  handleNodeClick={handleNodeClick}
                  toggleNodeExpansion={toggleNodeExpansion}
                  toggleNodeChecked={toggleNodeChecked}
                  handleRadioSelect={handleRadioSelect}
                  depth={depth + 1}
                  treeName={treeName}
                />
              ))}
          </Box>
        </Collapse>
      );
    };

    return (
      <Box
        component="li"
        key={node.nodeId}
        className={clsx(`level${depth}`, {
          selected: selectedItem?.nodeId === node.nodeId,
        })}
        id={node.tId}
        tabIndex={selectedItem?.nodeId === node.nodeId ? 0 : -1}
        {...({ treenode: "true" } as any)}
      >
        {renderExpandCollapseIcon()}
        {renderCheckboxOrRadio()}
        {renderNodeContent()}
        {renderChildNodes()}
      </Box>
    );
  }
);

TreeNodeComponent.displayName = "TreeNodeComponent";

export default TreeNodeComponent;
