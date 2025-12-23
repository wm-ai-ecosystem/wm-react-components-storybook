import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface ContainerProps extends BaseProps {
  direction?: "row" | "column";
  wrap?: boolean;
  alignment?: string;
  gap?: string | number;
  columngap?: string | number;
  clipcontent?: string | boolean;
  position?: string;
  overflow?: string;
  zindex?: string | number;
  styles?: any;
  className?: string;
  children?: React.ReactNode;
  renderPartial?: (props: any, onLoad?: any) => React.ReactNode;
  display?: string;
}

export default ContainerProps;
