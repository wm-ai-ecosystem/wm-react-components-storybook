import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
export interface DataSetItem {
  key: string;
  value: any;
  label: string;
  displayValue: string;
  displayImage?: string | null;
  dataObject?: any;
}

export interface ChipItem extends DataSetItem {
  active?: boolean;
  isDuplicate?: boolean;
  imgSrc?: string | null;
  iscustom?: boolean;
}

export interface WmChipsProps extends BaseProps {
  allowonlyselect?: boolean;
  autofocus?: boolean;
  chipclass?: string;
  className?: string;
  datafield?: string;
  dataset?: any[] | string | any;
  datavalue?: any[] | string | any;
  dateformat?: string;
  disabled?: boolean;
  displayexpression?: (data: any) => string;
  displayfield?: string;
  displayimagesrc?: string;
  enablereorder?: boolean;
  groupby?: string;
  inputposition?: "first" | "last";
  inputwidth?: "default" | "full" | string;
  limit?: number;
  match?: string;
  matchmode?: string;
  maxsize?: number;
  minchars?: number;
  name: string;
  orderby?: string;
  placeholder?: string;
  readonly?: boolean;
  searchkey?: string;
  showsearchicon?: boolean;
  tabindex?: number;
  type?: "search" | "autocomplete";
  debouncetime?: number;
  datacompletemsg?: string;
  width?: string | number;
  height?: string | number;
  styles?: Record<string, any>;
  listener: Record<string, any>;
  compareby?: string;
  dataoptions?: any;
  datasource?: any;
  datavaluesource?: any;
  onAdd?: (event: Event, widget: any, item: ChipItem) => void;
  onBeforeadd?: (event: Event, widget: any, newItem: DataSetItem) => boolean | void;
  onBeforeremove?: (event: Event, widget: any, item: ChipItem | ChipItem[]) => boolean | void;
  onBeforereorder?: (
    event: Event,
    widget: any,
    data: ChipItem[],
    changedItem: {
      oldIndex: number;
      newIndex: number;
      item: ChipItem;
    }
  ) => boolean | void;
  onBeforeservicecall?: (widget: any, inputData: any) => void;
  onChipclick?: (event: Event, widget: any, item: ChipItem) => void;
  onChipselect?: (event: Event, widget: any, item: ChipItem) => void;
  onChange?: (event: Event, widget: any, newVal: any[], oldVal: any[]) => void;
  onRemove?: (event: Event, widget: any, item: ChipItem | ChipItem[]) => void;
  onReorder?: (
    event: Event,
    widget: any,
    data: ChipItem[],
    changedItem: {
      oldIndex: number;
      newIndex: number;
      item: ChipItem;
    }
  ) => void;
  [key: string]: any;
  dataPath?: string;
}
