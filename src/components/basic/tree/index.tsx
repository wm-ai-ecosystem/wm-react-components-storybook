import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import clsx from "clsx";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import isArray from "lodash-es/isArray";
import isEmpty from "lodash-es/isEmpty";
import isObject from "lodash-es/isObject";
import isString from "lodash-es/isString";
import { getOrderedDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import { TreeItem, WmTreeProps } from "./props";
import Box from "@mui/material/Box";
import TreeNodeComponent from "./Components/TreeNodeComponent";
import { processNode, generateUniqueNodeId, findNodeById } from "./utils";

const DEFAULT_CLASS = "app-tree";
const DEFAULT_TREE_ICON_CLASS = "plus-minus";

const WmTree = (props: WmTreeProps) => {
  const {
    dataset = "node1, node2, node3",
    datavalue,
    treeicons = DEFAULT_TREE_ICON_CLASS,
    levels = 0,
    nodelabel = "",
    nodeicon = "",
    nodechildren = "",
    nodeid = "",
    nodeaction = "",
    nodeclick = "none",
    tabindex = 0,
    name = "treeview",
    class: classFromProps,
    className,
    orderby = "",
    onExpand,
    onCollapse,
    onSelect,
    onCheck,
    horizontalalign = "left",
    listener,
    width,
    height,
  } = props;

  // Combined class for both props.class and props.className
  const combinedClassName = clsx(classFromProps, className);
  const isCheckboxTree = combinedClassName?.includes("Checkbox");
  const isRadioTree = combinedClassName?.includes("Radio");

  // Component state
  const [treeNodes, setTreeNodes] = useState<TreeItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<TreeItem | null>(null);
  const [radioSelectedNodeId, setRadioSelectedNodeId] = useState<string | null>(null);

  // Unique ID generator for ensuring nodeId uniqueness
  const usedNodeIds = useRef(new Set<string>());

  // Function to get nodes from string input
  const getNodesFromString = useCallback(
    (value: string): TreeItem[] => {
      if (!value) return [];
      return value.split(",").map((item, index) => ({
        name: item.trim(),
        label: item.trim(),
        nodeId: `string_node_${index}_${item.trim()}`,
        tId: `${name}_string_node_${index}_${item.trim()}`,
        data: { label: item.trim() },
        children: [],
        open: levels > 0,
        checked: false,
      }));
    },
    [levels, name]
  );

  // Get initial nodes from dataset
  const getNodes = useCallback(
    (newVal: any): TreeItem[] => {
      usedNodeIds.current.clear();
      const processNodeOptions = {
        levels,
        nodelabel,
        nodeicon,
        nodechildren,
        nodeid,
        generateUniqueNodeId: (baseId: string) => generateUniqueNodeId(baseId, usedNodeIds.current),
      };
      if (isArray(newVal)) {
        return newVal.map((item, index) =>
          processNode(item, 0, undefined, newVal, index, name, processNodeOptions)
        );
      } else if (isObject(newVal) && newVal !== null) {
        return [processNode(newVal, 0, undefined, [newVal], 0, name, processNodeOptions)];
      } else if (isString(newVal) && !isEmpty(newVal)) {
        return getNodesFromString(newVal.trim());
      }
      return [];
    },
    [getNodesFromString, levels, nodelabel, nodeicon, nodechildren, nodeid, name]
  );

  // Get path to node (for event callbacks)
  const getPath = useCallback((node: TreeItem): string => {
    if (!node) return "";

    const path: string[] = [];
    let currentNode: TreeItem | undefined = node;

    while (currentNode) {
      path.unshift(currentNode.name);
      currentNode = currentNode.parent;
    }

    return `/${path.join("/")}`;
  }, []);

  const toggleNodeExpansion = useCallback(
    (event: React.MouseEvent, node: TreeItem) => {
      if (event) {
        event.stopPropagation(); // Prevent triggering node selection
      }

      // Toggle the open state
      const updatedNode = { ...node, open: !node.open };

      // Update the node in the tree
      const updateNodeInTree = (nodes: TreeItem[], targetNode: TreeItem): TreeItem[] => {
        return nodes.map(n => {
          if (n.nodeId === targetNode.nodeId) {
            return updatedNode;
          } else if (n.children?.length) {
            return { ...n, children: updateNodeInTree(n.children, targetNode) };
          }
          return n;
        });
      };

      const updatedNodes = updateNodeInTree(treeNodes, node);
      setTreeNodes(updatedNodes);

      const path = getPath(node);
      if (updatedNode.open) {
        if (onExpand && event && name) {
          onExpand(event, listener?.Widgets[name], node.data, path);
        }
      } else {
        if (onCollapse && event && name) {
          onCollapse(event, listener?.Widgets[name], node.data, path);
        }
      }
    },
    [getPath, name, onCollapse, onExpand, treeNodes]
  );

  // Handle node selection
  const selectNode = useCallback(
    (event: React.MouseEvent | undefined, node: TreeItem) => {
      if (!node) return;
      setSelectedItem(node);
      if (event && nodeclick === "expand" && node.children?.length) {
        toggleNodeExpansion(event, node);
      }

      if (onSelect && event && name) {
        onSelect(event, listener?.Widgets[name], node.data, getPath(node));
      }
    },
    [name, nodeaction, nodeclick, onSelect, toggleNodeExpansion]
  );

  // Handle node click
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: TreeItem) => {
      selectNode(event, node);
    },
    [selectNode]
  );

  // Handle checkbox toggle
  const toggleNodeChecked = useCallback(
    (event: React.MouseEvent, node: TreeItem) => {
      event.stopPropagation(); // Prevent triggering node selection

      // Toggle the checked state
      const newCheckedState = !node.checked;

      // Update the tree with cascading effect
      const updateCheckedState = (
        nodes: TreeItem[],
        nodeId: string,
        checked: boolean
      ): TreeItem[] => {
        return nodes.map(node => {
          if (node.nodeId === nodeId) {
            // Update this node's checked state
            const updatedNode = { ...node, checked };

            // Update all children recursively if any
            if (node.children?.length) {
              updatedNode.children = updateAllChildrenChecked(node.children, checked);
            }

            // Also update the data object to maintain consistency
            if (updatedNode.data) {
              updatedNode.data = { ...updatedNode.data, checked };
            }

            return updatedNode;
          } else if (node.children?.length) {
            // Check if the target node is in the children
            const updatedChildren = updateCheckedState(node.children, nodeId, checked);

            // Check if all children are checked or unchecked to update parent accordingly
            const allChildrenChecked = updatedChildren.every(child => child.checked);
            const anyChildChecked = updatedChildren.some(child => child.checked);

            const updatedCheckedState =
              nodeId !== node.nodeId
                ? checked
                  ? allChildrenChecked
                  : anyChildChecked
                    ? node.checked
                    : false
                : node.checked;

            // Update the data object to maintain consistency
            const updatedNode = {
              ...node,
              children: updatedChildren,
              checked: updatedCheckedState,
            };

            if (updatedNode.data) {
              updatedNode.data = { ...updatedNode.data, checked: updatedCheckedState };
            }

            return updatedNode;
          }
          return node;
        });
      };

      // Helper function to set all children to the same checked state
      const updateAllChildrenChecked = (nodes: TreeItem[], checked: boolean): TreeItem[] => {
        return nodes.map(node => {
          const updatedNode = {
            ...node,
            checked,
            children: node.children?.length
              ? updateAllChildrenChecked(node.children, checked)
              : node.children,
          };

          // Update the data object to maintain consistency
          if (updatedNode.data) {
            updatedNode.data = { ...updatedNode.data, checked };
          }

          return updatedNode;
        });
      };

      const updatedNodes = updateCheckedState(treeNodes, node.nodeId, newCheckedState);
      setTreeNodes(updatedNodes);

      if (onCheck) {
        onCheck(event, undefined, node.data, newCheckedState);
      }
    },
    [name, onCheck, treeNodes]
  );

  // Handle radio button selection
  const handleRadioSelect = useCallback(
    (event: React.MouseEvent, node: TreeItem) => {
      event.stopPropagation(); // Prevent triggering node selection

      // Already selected, skip
      if (radioSelectedNodeId === node.nodeId) {
        return;
      }

      // Set new selected radio
      setRadioSelectedNodeId(node.nodeId);

      // Update all nodes in the tree to set the correct radio state
      const updateRadioState = (nodes: TreeItem[], selectedNodeId: string): TreeItem[] => {
        return nodes.map(node => {
          const isChecked = node.nodeId === selectedNodeId;

          // Update this node
          const updatedNode = {
            ...node,
            checked: isChecked,
          };

          // Update the data object to maintain consistency
          if (updatedNode.data) {
            updatedNode.data = { ...updatedNode.data, checked: isChecked };
          }

          // Update children recursively if any
          if (node.children?.length) {
            updatedNode.children = updateRadioState(node.children, selectedNodeId);
          }

          return updatedNode;
        });
      };

      const updatedNodes = updateRadioState(treeNodes, node.nodeId);
      setTreeNodes(updatedNodes);

      if (onCheck) {
        onCheck(event, undefined, node.data, true);
      }
    },
    [name, onCheck, radioSelectedNodeId, treeNodes]
  );

  // Implement programmatic API methods
  const selectById = useCallback(
    (nodeId?: string) => {
      if (!nodeId) {
        setSelectedItem(null);
        return;
      }
      const node = findNodeById(treeNodes, nodeId);
      if (node) {
        selectNode(undefined, node);
        if (isRadioTree) {
          setRadioSelectedNodeId(node.nodeId);
          const updateRadioState = (nodes: TreeItem[], selectedNodeId: string): TreeItem[] => {
            return nodes.map(node => {
              const isChecked = node.nodeId === selectedNodeId;
              const updatedNode = {
                ...node,
                checked: isChecked,
              };
              if (updatedNode.data) {
                updatedNode.data = { ...updatedNode.data, checked: isChecked };
              }
              if (node.children?.length) {
                updatedNode.children = updateRadioState(node.children, selectedNodeId);
              }
              return updatedNode;
            });
          };
          const updatedNodes = updateRadioState(treeNodes, node.nodeId);
          setTreeNodes(updatedNodes);
        }
        let currentNode = node.parent;
        const nodesToExpand: TreeItem[] = [];
        while (currentNode) {
          nodesToExpand.push(currentNode);
          currentNode = currentNode.parent;
        }
        if (nodesToExpand.length) {
          const updateNodeOpenState = (
            nodes: TreeItem[],
            nodesToExpand: TreeItem[]
          ): TreeItem[] => {
            return nodes.map(node => {
              if (nodesToExpand.some(n => n.nodeId === node.nodeId)) {
                return {
                  ...node,
                  open: true,
                  children: node.children
                    ? updateNodeOpenState(node.children, nodesToExpand)
                    : undefined,
                };
              } else if (node.children?.length) {
                return { ...node, children: updateNodeOpenState(node.children, nodesToExpand) };
              }
              return node;
            });
          };
          const updatedNodes = updateNodeOpenState(treeNodes, nodesToExpand);
          setTreeNodes(updatedNodes);
        }
      }
    },
    [isRadioTree]
  );

  const deselectById = useCallback(() => {
    setSelectedItem(null);
    if (isRadioTree) {
      setRadioSelectedNodeId(null);
      const clearCheckedState = (nodes: TreeItem[]): TreeItem[] => {
        return nodes.map(node => {
          const updatedNode = {
            ...node,
            checked: false,
            children: node.children?.length ? clearCheckedState(node.children) : node.children,
          };
          if (updatedNode.data) {
            updatedNode.data = { ...updatedNode.data, checked: false };
          }
          return updatedNode;
        });
      };
      setTreeNodes(clearCheckedState(treeNodes));
    }
  }, [isRadioTree]);

  // Memoized sorted nodes to avoid re-sorting on every render
  const sortedTreeNodes = useMemo(() => {
    return orderby ? getOrderedDataset(treeNodes, orderby) : treeNodes;
  }, [orderby, treeNodes]);

  // Process dataset when it changes
  useEffect(() => {
    try {
      const parsedNodes = getNodes(dataset);
      setTreeNodes(parsedNodes);
    } catch (error) {
      setTreeNodes([]);
    }
  }, [dataset, getNodes]);

  // Handle datavalue changes - following Angular's approach
  useEffect(() => {
    if (!datavalue || !sortedTreeNodes.length) return;
    if (selectedItem) return;
    let targetNode: TreeItem | null = null;
    if (datavalue === "FirstNode") {
      targetNode = sortedTreeNodes[0];
    } else if (datavalue === "LastNode") {
      targetNode = sortedTreeNodes[sortedTreeNodes.length - 1];
    } else {
      targetNode = findNodeById(sortedTreeNodes, datavalue);
    }

    if (targetNode) {
      selectNode(undefined, targetNode);
      if (targetNode.children?.length) {
        const updateNodeOpenState = (nodes: TreeItem[], targetNodeId: string): TreeItem[] => {
          return nodes.map(node => {
            if (node.nodeId === targetNodeId) {
              return {
                ...node,
                open: true,
                children: node.children
                  ? updateNodeOpenState(node.children, targetNodeId)
                  : undefined,
              };
            } else if (node.children?.length) {
              return { ...node, children: updateNodeOpenState(node.children, targetNodeId) };
            }
            return node;
          });
        };

        const updatedNodes = updateNodeOpenState(treeNodes, targetNode.nodeId);
        setTreeNodes(updatedNodes);
      }
    }
  }, [datavalue, sortedTreeNodes.length, selectedItem, treeNodes, selectNode]); // Added selectNode to dependencies

  //Handled methods
  useEffect(() => {
    if (listener?.onChange) {
      listener.onChange(name, {
        selectById,
        deselectById,
      });
    }
  }, [selectById, deselectById]);

  return (
    <Box
      component="ul"
      className={clsx(DEFAULT_CLASS, combinedClassName, "ztree")}
      id={name}
      name={name}
      tabIndex={tabindex}
      style={{ ...props.styles, width: width, height: height, textAlign: horizontalalign }}
    >
      {sortedTreeNodes.length > 0 ? (
        sortedTreeNodes.map(node => (
          <TreeNodeComponent
            key={node.nodeId}
            node={node}
            treeicons={treeicons}
            isCheckboxTree={isCheckboxTree}
            isRadioTree={isRadioTree}
            selectedItem={selectedItem}
            handleNodeClick={handleNodeClick}
            toggleNodeExpansion={toggleNodeExpansion}
            toggleNodeChecked={toggleNodeChecked}
            handleRadioSelect={handleRadioSelect}
            treeName={name}
          />
        ))
      ) : (
        <li style={{ padding: 16, color: "text.secondary" }}>No tree data available</li>
      )}
    </Box>
  );
};

WmTree.displayName = "WmTree";

export default withBaseWrapper(WmTree);
