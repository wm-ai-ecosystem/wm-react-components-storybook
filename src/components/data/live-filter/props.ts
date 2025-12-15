import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

export default interface LiveFilterProps extends BaseProps {
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
  pagesize?: number;
  autoupdate?: boolean;
  enableemptyfilter?: string;
  // live-filter specific
  dataSource?: string;
  orderBy?: string;
}

export const DEFAULT_PROPS: Partial<LiveFilterProps> = {
  iconclass: "wi wi-filter-list",
  pagesize: 20,
  autoupdate: true,
  enableemptyfilter: " ",
};
