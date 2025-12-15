import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

export interface MessageType {
  class: string;
  iconClass: string;
}

interface WmMessageProps extends BaseProps {
  caption?: string;
  type?: string;
  hideclose?: boolean;
  show?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  animation?: string;
}

export default WmMessageProps;
