import { DatasetAwareNavProps, NavNode } from "@wavemaker/react-runtime/higherOrder/DataNav";

export interface BreadCrumbProps extends DatasetAwareNavProps {
  listener: Record<string, any>;
  onBeforenavigate?: (props: BreadCrumbProps, node: NavNode) => boolean | void;
  navNodes?: NavNode[];
}
