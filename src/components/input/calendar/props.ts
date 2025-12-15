import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

// Interface for WmCalendar props
export interface WmCalendarProps extends BaseProps {
  name?: string;
  dataset?: any;
  datavalue?: any;
  eventtitle?: string;
  eventstart?: string;
  eventend?: string;
  eventallday?: string;
  eventclass?: string;
  tabindex?: number;
  controls?: string;
  calendartype?: string;
  view?: string;
  selectionmode?: string;
  height?: string | number;
  width?: string | number;
  // Event handlers
  onSelect?: (event: any) => void;
  onBeforeRender?: (event: any) => void;
  onEventDrop?: (event: any) => void;
  onEventResize?: (event: any) => void;
  onEventClick?: (event: any) => void;
  onEventRender?: (event: any) => void;
  onViewRender?: (event: any) => void;
  onDateClick?: (event: any) => void;
  listener: Record<string, any>;
  className: string;
  // Base wrapper properties
  show?: boolean;
  styles?: React.CSSProperties;
  conditionalstyle?: React.CSSProperties;
  conditionalclass?: string;
  animation?: string;
  showindevices?: string[];
  iswidget?: string;
  formfield?: boolean;
  Variables?: any;
}

// Global type declaration for window.app
declare global {
  interface Window {
    app?: {
      subscribe: (event: string, handler: (data: any) => void) => () => void;
      appLocale?: {
        LABEL_CALENDAR_YEAR?: string;
        LABEL_CALENDAR_MONTH?: string;
        LABEL_CALENDAR_WEEK?: string;
        LABEL_CALENDAR_DAY?: string;
        LABEL_CALENDAR_TODAY?: string;
      };
    };
  }
}
