import { forEach } from "lodash-es";
import { FileUploadState } from "./props";
import {
  fileUploadConstants,
  isImageFile,
  isAudioFile,
  isVideoFile,
  isDocumentFile,
  getFileExtension,
} from "../../constants";

// Simple app function to call notifyApp on listener
const app = (listener: any) => ({
  notifyApp: (message: string, type: string) => {
    if (listener && listener.App && listener.App.notifyApp) {
      listener.App.notifyApp(message, type);
    }
  },
});

export const dialogService = {
  showAppConfirmDialog: ({ title, message, onOk, onCancel }: any) => {
    if (confirm(`${title}: ${message}`)) {
      onOk();
    } else {
      onCancel();
    }
  },
  closeAppConfirmDialog: () => {},
};

export const getDefaultChooseFilter = (allowedExtensions: string[]) => {
  return allowedExtensions.includes("*/*") ? "" : allowedExtensions.join(" ");
};

export const isValidFile = (filename: string, contenttype: string, extensionName: string) => {
  if (!contenttype) {
    return true;
  }

  const contentTypes = contenttype
    .toLowerCase()
    .split(" ")
    .map(type => type.trim());

  // Check for direct extension match (e.g., ".csv", ".pdf")
  if (contentTypes.some(type => type === `.${extensionName.toLowerCase()}`)) {
    return true;
  }

  // Check for MIME type patterns
  for (const type of contentTypes) {
    if (type === "image/*" || type === "image") {
      if (isImageFile(filename)) return true;
    }
    if (type === "audio/*" || type === "audio") {
      if (isAudioFile(filename)) return true;
    }
    if (type === "video/*" || type === "video") {
      if (isVideoFile(filename)) return true;
    }
    if (type === "document" || type === "pdf" || type === "doc") {
      if (isDocumentFile(filename)) return true;
    }
  }

  return false;
};

export const getValidFiles = (
  $files: FileList | File[],
  contenttype: string,
  extensions: string,
  filetype: string,
  chooseFilter: string,
  maxfilesize: string | number,
  onError?: any,
  listener?: any
) => {
  const validFiles: File[] = [];
  const errorFiles: File[] = [];
  const MAXFILEUPLOAD_SIZE =
    (typeof maxfilesize === "number" ? maxfilesize : parseFloat((maxfilesize as string) || "10")) *
    fileUploadConstants.DEFAULT_VALUES.FILESIZE_MB;
  const MAX_FILE_UPLOAD_FORMATTED_SIZE = (maxfilesize || "1") + "MB";

  const currentChooseFilter =
    chooseFilter === fileUploadConstants.DEFAULT_CLASSES.DEVICE_CONTENTTYPES.FILES
      ? ""
      : contenttype || extensions || filetype || chooseFilter;
  forEach($files, file => {
    // Check file extension
    if (!isValidFile(file.name, currentChooseFilter, getFileExtension(file.name))) {
      const msg = `Invalid file extension ${currentChooseFilter}`;
      handleErrorFiles("INVALID_FILE_EXTENSION", msg, file, errorFiles, onError, listener);
      return;
    }
    // Check file size
    if (file.size > MAXFILEUPLOAD_SIZE) {
      const msg = `File size exceeded limit. Max upload size is ${MAX_FILE_UPLOAD_FORMATTED_SIZE}`;
      handleErrorFiles("INVALID_FILE_SIZE", msg, file, errorFiles, onError, listener);
      return;
    }

    validFiles.push(file);
  });

  return { validFiles, errorFiles };
};

export const handleErrorFiles = (
  key: string,
  msg: string,
  file: File,
  errorFiles: File[],
  onError?: any,
  listener?: any
) => {
  if (!onError) {
    app(listener).notifyApp(msg, "Error");
  }
  const error = {
    key,
    message: msg,
  };
  onError?.(event, listener, file);
  (file as any).error = error;
  errorFiles.push(file);
};

export const clearFile = (files: (File & FileUploadState)[], file: FileUploadState | File) => {
  return files.filter(fileObj => {
    const fileObjResponse = fileObj._response?.fileName;
    const fileResponse = (file as any)._response?.fileName;

    return (
      fileObjResponse !== fileResponse || fileObj.name !== (file as any).name || file !== fileObj
    );
  });
};

export const generateFileId = () => {
  // Use crypto.randomUUID() if available (modern browsers), fallback to custom implementation
  if (typeof window !== "undefined" && typeof crypto !== "undefined" && crypto.randomUUID) {
    return "file-" + crypto.randomUUID();
  }

  // Fallback for older browsers
  return "file-" + Date.now().toString(36) + Math.random().toString(36).substr(2);
};
