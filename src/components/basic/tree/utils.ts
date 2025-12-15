import isArray from "lodash-es/isArray";
import cloneDeep from "lodash-es/cloneDeep";
import get from "lodash-es/get";
import { TreeNodeData, TreeItem } from "./props";

// Helper function to get nested property (local version for processNode)
export const getNestedPropertyLocal = (obj: any, path: string): any => {
  if (!path || !obj) return undefined;
  try {
    const normalizedPath = path.replace(/\[(\d+)\]/g, ".$1").replace(/^\./, "");

    return get(obj, normalizedPath);
  } catch (error) {
    return undefined;
  }
};

// Function to generate unique nodeId
export const generateUniqueNodeId = (baseId: string, usedNodeIds: Set<string>): string => {
  let uniqueId = baseId;
  let counter = 1;

  while (usedNodeIds.has(uniqueId)) {
    uniqueId = `${baseId}_${counter}`;
    counter++;
  }

  usedNodeIds.add(uniqueId);
  return uniqueId;
};

// Process a single node and its children with depth tracking
export const processNode = (
  item: TreeNodeData,
  depth: number,
  parent: TreeItem | undefined,
  rootDataset: any[] | undefined,
  nodeIndex: number | undefined,
  treeName: string | undefined,
  options: {
    levels: number;
    nodelabel: string;
    nodeicon: string;
    nodechildren: string;
    nodeid: string;
    generateUniqueNodeId: (baseId: string) => string;
  }
): TreeItem => {
  const { levels, nodelabel, nodeicon, nodechildren, nodeid, generateUniqueNodeId } = options;

  // Helper functions for property resolution
  const getLabelValue = () => {
    if (nodelabel && (nodelabel.includes("[") || nodelabel.includes("."))) {
      // Try to get the property from the current item only (like Angular's getEvaluatedData)
      const currentItemValue = getNestedPropertyLocal(item, nodelabel);
      if (currentItemValue !== undefined) {
        return currentItemValue;
      }
      // If not found on current item, fall back to default values (don't do global search)
    }
    return item[nodelabel] ?? item.label ?? item.name ?? String(item);
  };

  const getIconValue = () => {
    if (nodeicon && (nodeicon.includes("[") || nodeicon.includes("."))) {
      // Try to get the property from the current item only (like Angular's getEvaluatedData)
      const currentItemValue = getNestedPropertyLocal(item, nodeicon);
      if (currentItemValue !== undefined) {
        return currentItemValue;
      }
      // If not found on current item, fall back to default values (don't do global search)
    }
    return item[nodeicon] ?? item.icon;
  };

  const getNodeIdValue = () => {
    if (nodeid && (nodeid.includes("[") || nodeid.includes("."))) {
      // Try to get the property from the current item only (like Angular's getEvaluatedData)
      const currentItemValue = getNestedPropertyLocal(item, nodeid);
      if (currentItemValue !== undefined) {
        return String(currentItemValue);
      }
      // If not found on current item, return undefined (no fallback like Angular)
      return undefined;
    }

    // For direct properties, return the value or undefined (no fallback like Angular)
    const directValue = item[nodeid];
    if (directValue !== undefined) {
      return String(directValue);
    }

    // If no nodeid specified or found, generate a fallback for React's internal use
    if (!nodeid) {
      const fallbackId = item.nodeId ?? item.id ?? `node_${Date.now()}_${Math.random()}`;
      return String(fallbackId);
    }

    return undefined;
  };

  const getChildrenValue = () => {
    if (nodechildren && (nodechildren.includes("[") || nodechildren.includes("."))) {
      // Try to get the property from the current item only (like Angular's getEvaluatedData)
      const currentItemValue = getNestedPropertyLocal(item, nodechildren);
      if (currentItemValue !== undefined) {
        return currentItemValue;
      }
      // If not found on current item, fall back to default values (don't do global search)
    }
    // Use logical OR (||) like Angular to fall back to item.children only if the result is falsy
    return item[nodechildren] || item.children;
  };

  const labelValue = getLabelValue();
  const iconValue = getIconValue();
  const nodeIdValue = getNodeIdValue();
  const childrenData = getChildrenValue();

  // Ensure we have a unique nodeId for React's internal use
  // If nodeIdValue is undefined (like Angular), generate a fallback
  const finalNodeId = nodeIdValue || generateUniqueNodeId(`node_${Date.now()}_${nodeIndex || 0}`);

  const node: TreeItem = {
    name: String(labelValue || ""),
    label: String(labelValue || ""),
    icon: iconValue,
    nodeId: String(finalNodeId),
    data: cloneDeep(item),
    open: depth < levels,
    checked: item.checked || false,
    parent,
    tId: treeName ? `${treeName}_${finalNodeId}` : `tree_node_${finalNodeId}`,
    isParent: isArray(childrenData) && childrenData.length > 0,
  };

  if (isArray(childrenData) && childrenData.length > 0) {
    node.children = childrenData.map((child, index) =>
      processNode(child, depth + 1, node, rootDataset, index, treeName, options)
    );
  }

  return node;
};

export const findNodeById = (nodes: TreeItem[], id: string): TreeItem | null => {
  for (const node of nodes) {
    if (String(node.nodeId) === String(id)) return node;
    if (node.children?.length) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};
