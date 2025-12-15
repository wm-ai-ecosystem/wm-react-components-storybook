import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface WmNavProps extends BaseProps {
  layout: string;
  type: string;
  autoclose: string;
  autoopen: string;
  class: string;
  dataset: any;
  iconposition: string;
  isactive: string;
  // itemlabel: string;
  itemlabel?: string | ((item: any, fragment?: any) => string);
  itemhint: string;
  itemlink: string;
  itemicon: string;
  itemclass: string;
  itemchildren: string;
  itemaction: string;
  itembadge: string;
  itemtarget: string;
  name: string;
  orderby: string;
  show: boolean;
  showonhover: boolean;
  userrole: string;
}

export default WmNavProps;
