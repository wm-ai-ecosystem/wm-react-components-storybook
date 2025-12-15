import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export type FileUploadState = {
  name?: string;
  progress?: number;
  status?: string;
  errMsg?: string;
  uniqueId?: string;
  _response?: any;
  size?: number;
  storageName?: string;
};

export interface WmFileUploadProps extends BaseProps {
  // Core props from Angular
  caption?: string;
  name: string;
  hint?: string;
  arialabel?: string;
  tabindex?: number;
  multiple?: boolean;
  fileuploadmessage?: string;
  show?: string | boolean;
  disabled?: boolean;
  contenttype?: string;
  maxfilesize?: string | number;
  iconclass?: string;
  cleariconclass?: string;
  cleariconhint?: string;
  uploadpath?: string;
  datasource?: any;
  selectedFiles?: string;
  destination?: string;
  filelistheight?: number;
  width?: string;
  showprogressbar?: boolean;
  showprogressbarpercentage?: boolean;
  deleteiconhint?: string;

  // Form widget props
  extensions?: string;
  filetype?: string;
  readonly?: boolean;
  required?: boolean;

  // Additional props
  deletedatasource?: any;
  displayname?: string;
  height?: string;

  // Event handlers
  onBeforeselect?: (
    $event: React.MouseEvent | React.ChangeEvent,
    widget: any,
    selectedFiles: File[]
  ) => void;
  onSelect?: (
    $event: React.MouseEvent | React.ChangeEvent,
    widget: any,
    selectedFiles: File[]
  ) => void;
  onDelete?: ($event: React.MouseEvent | React.ChangeEvent, widget: any, file: File) => void;
  onBeforedelete?: ($event: React.MouseEvent | React.ChangeEvent, widget: any, file: File) => void;
  onError?: ($event: React.MouseEvent | React.ChangeEvent, widget: any, file: File) => void;
}

export interface CommonFileProps {
  uploadedFiles: (File & FileUploadState)[];
  selectedFolders: File[];
  filelistheight?: string | number;
  readonly?: boolean;
  clearSelectedFile: (file: FileUploadState & File) => void;
  onBeforedelete: (e: React.MouseEvent, file: FileUploadState & File) => void;
  onFileDelete: (e: React.MouseEvent, file: FileUploadState & File) => void;
  setSelectedFolders: React.Dispatch<React.SetStateAction<File[]>>;
}

export interface SingleFileUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  caption?: string;
  displayname?: string;
  contenttype?: string;
  extensions?: string;
  filetype?: string;
  chooseFilter?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  arialabel?: string;
  tabindex?: number;
  iconclass?: string;
  styles?: React.CSSProperties;
  triggerFileSelect: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBeforeselect: (e: React.MouseEvent) => void;
}

export interface MultipleFileUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  multiple: boolean;
  caption?: string;
  contenttype?: string;
  extensions?: string;
  filetype?: string;
  chooseFilter?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  arialabel?: string;
  displayname?: string;
  tabindex?: number;
  iconclass?: string;
  fileuploadmessage?: string;
  highlightDropArea: boolean;
  triggerFileSelect: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dragOverHandler: (e: React.DragEvent) => void;
  onFileDrop: (e: React.DragEvent) => void;
  setHighlightDropArea: (highlight: boolean) => void;
  onBeforeselect: (e: React.MouseEvent) => void;
  styles?: React.CSSProperties;
}

export interface UploadVariable {
  name: string;
  serviceInfo: {
    consumes: string[];
    parameters: Array<{ name: string }>;
  };
  params: {
    files: File;
    uploadPath: string;
  };
  config: {
    baseUrl: string;
    _context: {
      name: string;
    };
  };
}

export interface DeleteVariable {
  name: string;
  config: {
    baseUrl: string;
    _context: { name: string };
  };
}

export interface UploadResponse {
  fileName?: string;
  [key: string]: unknown;
}
