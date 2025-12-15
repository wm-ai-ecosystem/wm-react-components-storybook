import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
export interface TreeNodeData {
  name?: string;
  label?: string;
  icon?: string;
  nodeId?: string;
  id?: string;
  data?: any;
  checked?: boolean;
  [key: string]: any;
}

export interface TreeItem {
  name: string;
  label: string;
  icon?: string;
  nodeId: string;
  data: TreeNodeData;
  children?: TreeItem[];
  open?: boolean;
  checked?: boolean;
  parent?: TreeItem;
  tId?: string; // For compatibility with zTree
  isParent?: boolean;
}

export interface WmTreeProps extends BaseProps {
  dataset?: any;
  datavalue?: string;
  treeicons?: string;
  levels?: number;
  nodelabel?: string;
  nodeicon?: string;
  nodechildren?: string;
  nodeid?: string;
  nodeaction?: string;
  nodeclick?: "expand" | "none";
  tabindex?: number;
  name: string;
  class?: string;
  className?: string;
  orderby?: string;
  show?: boolean;
  horizontalalign?: string;
  listener: Record<string, any>;
  width?: string | number;
  height?: string | number;
  onExpand?: (event: React.MouseEvent, widget: any, item: any, path: string) => void;
  onCollapse?: (event: React.MouseEvent, widget: any, item: any, path: string) => void;
  onSelect?: (event: React.MouseEvent, widget: any, item: any, path: string) => void;
  onCheck?: (event: React.MouseEvent, widget: any, item: any, checked: boolean) => void;
}

export interface TreeNodeComponentProps {
  node: TreeItem;
  treeicons: string;
  isCheckboxTree: boolean;
  isRadioTree: boolean;
  selectedItem: TreeItem | null;
  handleNodeClick: (event: React.MouseEvent, node: TreeItem) => void;
  toggleNodeExpansion: (event: React.MouseEvent, node: TreeItem) => void;
  toggleNodeChecked: (event: React.MouseEvent, node: TreeItem) => void;
  handleRadioSelect: (event: React.MouseEvent, node: TreeItem) => void;
  depth?: number;
  treeName: string;
}
