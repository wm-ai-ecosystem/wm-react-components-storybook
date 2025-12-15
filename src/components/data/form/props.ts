import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface FormProps extends BaseProps {
  errormessage?: string;
  captionposition?: string;
  title?: string;
  enctype?: string;
  method?: string;
  dataset?: string;
  captionalign?: string;
  subheading?: string;
  iconclass?: string;
  autocomplete?: boolean;
  collapsible?: boolean;
  expanded?: boolean;
  formdatasource?: string;
  numberoffields?: number;
  tabindex?: number;
  formType?: string;
  isViewMode?: boolean;
  isLayoutDialog?: boolean;
  isInsideWizard?: boolean;
}

export default FormProps;
