import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface EditorOptions {
  buttons?: string[];
  toolbar?: boolean | string | string[][] | { [key: string]: any } | { buttons: string[] };
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  height?: number | string;
  width?: number | string;
  readOnly?: boolean;
  disabled?: boolean;
  statusbar?: boolean;
  uploader?: any;
  toolbarAdaptive?: boolean;
  buttonsMD?: string[];
  buttonsSM?: string[];
  buttonsXS?: string[];
  enableDragAndDropFileToEditor?: boolean;
  askBeforePasteHTML?: boolean;
  askBeforePasteFromWord?: boolean;
  disablePlugins?: string[];
  autoHeight?: boolean;
  autoresize?: boolean;
  style?: {
    height?: string;
    minHeight?: string;
    maxHeight?: string;
  };
  onBlur?: (newContent: string, event?: any) => void;
  onChange?: (newContent: string) => void;
  onFocus?: (event?: any) => void;
  onReady?: () => void;
  [key: string]: any;
}

export interface EditorOperation {
  type: string;
  value?: any;
}

export interface RichTextEditorProps extends BaseProps {
  name: string;
  placeholder?: string;
  tabindex?: number;
  datavalue?: string;
  readonly?: boolean;
  showpreview?: boolean;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  styles?: {
    height?: string | number;
    width?: string | number;
    [key: string]: any;
  };
  hint?: string;
  arialabel?: string;
  onBeforerender?: (event: React.ChangeEvent<any>, widget: Record<string, any>) => void;
  onChange?: (
    event: React.ChangeEvent<any>,
    widget: Record<string, any>,
    newDatavalue: string,
    oldDatavalue: string
  ) => void;
  listener: Record<string, any>;
}
