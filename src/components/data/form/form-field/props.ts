import BaseProps from "@wavemaker/react-runtime/higherOrder/props";
interface FormFieldProps extends BaseProps {
  readonly?: boolean;
  displayname?: string;
  key?: string;
  type?: string;
  widget?: string;
  textalign?: string;
  placeholder?: string;
  title?: string;
  required?: boolean;
  value?: string;
  dataentrymode?: string;
  debouncetime?: number;
  defaultvalue?: string;
  field?: string;
  filterexpressions?: string;
  generator?: string;
  hint?: string;
  inputtype?: string;
  isformfield?: boolean;
  limit?: number;
  lookuptype?: string;
  lookupfield?: string;
  name: string;
  matchmode?: string;
  maxdefaultvalue?: string;
  maxplaceholder?: string;
  mobileDisplay?: boolean;
  period?: boolean;
  pcDisplay?: boolean;
  primaryKey?: boolean;
  relatedEntityName?: string;
  tabletDisplay?: boolean;
  validationmessage?: string;
  viewmodewidget?: string;
  widgettype?: string;
  datafield?: string;
  displayfield?: string;
  displaylabel?: string;
  dataset?: any[];
  searchkey?: string;
}
export default FormFieldProps;

export interface FieldDataSetProps
  extends Pick<
    FormFieldProps,
    "dataset" | "datafield" | "displayfield" | "displaylabel" | "searchkey"
  > {}
