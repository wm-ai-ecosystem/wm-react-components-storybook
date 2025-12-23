import { useCallback, useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash-es";
import { WmFileUploadProps, FileUploadState } from "./props";
import { fileUploadConstants } from "@wavemaker/react-runtime/components/constants";
import { getDefaultChooseFilter, getValidFiles, clearFile, generateFileId } from "./Utils";
import { eventObserver } from "@wavemaker/react-runtime/core/event-notifier";

export const useFileUpload = (props: WmFileUploadProps) => {
  const {
    name,
    multiple = fileUploadConstants.DEFAULT_VALUES.MULTIPLE,
    disabled = !fileUploadConstants.DEFAULT_VALUES.ENABLED,
    contenttype = "",
    maxfilesize,
    uploadpath,
    datasource,
    extensions,
    filetype,
    readonly = false,
    deletedatasource,
    onError,
    onSelect,
    onBeforeselect,
    onDelete,
    listener,
  } = props;

  const allowedFileUploadExtensions =
    listener?.appConfig?.appProperties?.allowedFileUploadExtensions;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for managing confirm dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogProps, setConfirmDialogProps] = useState({
    title: "",
    message: "",
    oktext: "OK",
    canceltext: "Cancel",
    onOk: () => {},
    onCancel: () => {},
  });

  // Function to show confirm dialog
  const showConfirmDialog = (props: {
    title: string;
    message: string;
    oktext?: string;
    canceltext?: string;
    onOk: () => void;
    onCancel?: () => void;
  }) => {
    setConfirmDialogProps({
      title: props.title,
      message: props.message,
      oktext: props.oktext || "OK",
      canceltext: props.canceltext || "Cancel",
      onOk: props.onOk,
      onCancel: props.onCancel || (() => {}),
    });
    setConfirmDialogOpen(true);
  };

  // Function to close confirm dialog
  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  // Helper function to normalize extensions (handles both space and comma separated)
  const normalizeExtensions = useCallback((extensionString: string): string => {
    if (!extensionString) return "";

    // Split by both comma and space, then filter out empty strings
    const extensions = extensionString.split(/[,\s]+/).filter(ext => ext.trim());

    return extensions
      .map(ext => {
        const trimmedExt = ext.trim();
        // Handle MIME type patterns (e.g., "image/*")
        if (trimmedExt.includes("/")) {
          return trimmedExt;
        }
        // Ensure extensions start with a dot
        if (trimmedExt.startsWith(".")) {
          return trimmedExt;
        }
        return `.${trimmedExt}`;
      })
      .join(",");
  }, []);

  const getChooseFilter = () => {
    const normalizedContenttype = normalizeExtensions(contenttype);
    const normalizedExtensions = normalizeExtensions(extensions || "");
    const normalizedFiletype = normalizeExtensions(filetype || "");
    const defaultFilter = getDefaultChooseFilter(DEFAULT_ALLOWED_EXTENSIONS);
    return normalizedContenttype || normalizedExtensions || normalizedFiletype || defaultFilter;
  };

  const DEFAULT_ALLOWED_EXTENSIONS =
    allowedFileUploadExtensions
      ?.split(" ")
      .map((item: string) => item.trim())
      .map((item: string) => (item.endsWith("/*") ? item : `.${item}`)) || [];

  const [chooseFilter, setChooseFilter] = useState(() => {
    return getChooseFilter();
  });

  const [highlightDropArea, setHighlightDropArea] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<(File & FileUploadState)[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<File[]>([]);

  const invokeEventCallback = useCallback(
    (eventName: string, payload: any) => {
      const eventHandler = listener?.Widgets?.[name]?.[eventName];
      return eventHandler
        ? eventHandler(payload.$event, listener.Widgets[name], payload.files) || true
        : true;
    },
    [listener, name]
  );

  const fileUploadProgress = (progress: any) => {
    setUploadedFiles(prevFiles => {
      return prevFiles.map(file => {
        if (file.name === progress.fileName && file.uniqueId === progress.uniqueId) {
          file.progress = progress.progress;
          if (file.progress === 100) {
            file.status = "success";
          } else {
            file.status = progress.status;
            if (progress.errMsg) {
              file.errMsg = progress.errMsg;
              file.status = "error";
            }
          }
        }
        return file;
      });
    });
  };

  // Setup progress tracking with EventNotifier
  useEffect(() => {
    if (datasource && datasource._progressObservable) {
      datasource._progressObservable.subscribe((progress: any) => {
        fileUploadProgress(progress);

        // Move notifyApp calls outside of setState to avoid render phase issues
        if (progress.progress === 100) {
          listener?.App?.notifyApp("File uploaded successfully", "Success");
        } else if (progress.errMsg) {
          listener?.App?.notifyApp("File upload failed", "Error");
        }
      });
    }
    return () => {
      if (datasource && datasource?._progressObservable) {
        datasource?._progressObservable?.unsubscribe();
      }
    };
  }, [invokeEventCallback]);

  useEffect(() => {
    // Normalize extensions to handle both space and comma separated values
    const selected = getChooseFilter();
    setChooseFilter(selected);
  }, [contenttype, extensions, filetype, normalizeExtensions, DEFAULT_ALLOWED_EXTENSIONS]);

  useEffect(() => {
    const selected =
      contenttype ?? extensions ?? filetype ?? getDefaultChooseFilter(DEFAULT_ALLOWED_EXTENSIONS);
    setChooseFilter(selected);
  }, [contenttype, extensions, filetype]);

  useEffect(() => {
    // Add event listeners for drag and drop
    if (disabled || readonly) {
      setHighlightDropArea(false);
      window.removeEventListener("focus", disableDropZone);
    } else {
      document.addEventListener("dragover", dragOverCb);
      document.addEventListener("drop", dropCb);
      document.addEventListener("mouseleave", dropCb);
    }

    return () => {
      document.removeEventListener("dragover", dragOverCb);
      document.removeEventListener("drop", dropCb);
      document.removeEventListener("mouseleave", dropCb);
    };
  }, [disabled, readonly]);

  const dragOverCb = (e: Event) => {
    e.preventDefault();
    const dropzone = document.getElementById("dropzone");
    if (dropzone) {
      dropzone.classList.add("highlight-drop-box");
    }
  };

  const dropCb = () => {
    const dropzone = document.getElementById("dropzone");
    if (dropzone) {
      dropzone.classList.remove("highlight-drop-box");
    }
    setHighlightDropArea(false);
  };

  const dragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlightDropArea(true);
  };

  const disableDropZone = () => {
    setHighlightDropArea(false);
    window.removeEventListener("focus", disableDropZone);
  };

  const onBeforeSelectEventCall = (
    $event: React.MouseEvent | React.ChangeEvent,
    $files: FileList | File[]
  ) => {
    const files = getValidFiles(
      $files,
      contenttype,
      extensions || "",
      filetype || "",
      chooseFilter,
      maxfilesize || "10",
      onError,
      listener
    );

    if (!isEmpty(files.errorFiles)) {
      invokeEventCallback("error", {
        $event: { ...$event, files: files.errorFiles },
        files: files.errorFiles,
      });
    }
    if (files.validFiles.length) {
      const beforeSelectVal = invokeEventCallback("beforeselect", {
        $event: { ...$event, files: files.validFiles },
        files: files.validFiles,
      });

      if (onBeforeselect) {
        const event = { ...$event, _reactName: "onBeforeselect" };
        onBeforeselect(event, listener?.Widgets?.[name], files.validFiles);
      }
      // Proceed only if neither callback returns false
      if (beforeSelectVal !== false) {
        const filesWithIds = files.validFiles.map(file => {
          const fileWithId = file as File & FileUploadState;

          if (!fileWithId.name) {
            (fileWithId as any).name = file.name;
          }
          if (!fileWithId.size) {
            (fileWithId as any).size = file.size;
          }

          // Add our custom properties
          fileWithId.uniqueId = generateFileId();

          // Set initial status
          if (datasource) {
            fileWithId.status = "onProgress";
            fileWithId.progress = 0;
          } else {
            fileWithId.status = "success";
          }

          return fileWithId;
        });

        if (datasource) {
          datasource._progressObservable = eventObserver();
        }
        setUploadedFiles(prev => (multiple ? [...prev, ...filesWithIds] : [...filesWithIds]));
        datasource.dataBinding.files = filesWithIds;
        datasource.dataSet = filesWithIds;
        listener?.onChange(name, { selectedFiles: filesWithIds });
        onSelect?.($event, fileInputRef.current?.files?.[0], filesWithIds);
      }
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFolders([]);

    onBeforeSelectEventCall(e, e.target.files || []);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    let listOfFiles: File[] = [];
    setSelectedFolders([]);

    const filesData = e.dataTransfer.items;
    if (filesData.length > 0) {
      for (let i = 0; i < filesData.length; i++) {
        // Using explicit type assertion since webkitGetAsEntry is non-standard
        const entry = (filesData[i] as any).webkitGetAsEntry?.();

        if (entry && entry.isFile) {
          const file = filesData[i].getAsFile();
          if (file) listOfFiles.push(file);
        } else if (entry && entry.isDirectory) {
          const file = filesData[i].getAsFile();
          if (file) setSelectedFolders(prev => [...prev, file]);
        }
      }
      onBeforeSelectEventCall(e, listOfFiles);
    }
  };

  const clearSelectedFile = (file: FileUploadState & File) => {
    // setSelectedFilesList((prev) => clearFile(prev as (File & FileUploadState)[], file));
    setUploadedFiles(prev => clearFile(prev, file));
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current && !disabled && !readonly) {
      fileInputRef.current.click();
    }
  };

  const deleteFileProgress = (file: FileUploadState & File) => {
    deletedatasource._deleteFileObservable.subscribe((response: any) => {
      if (response.status === "success") {
        setUploadedFiles(prev => prev.filter(fileObj => file !== fileObj) || []);
        setSelectedFolders(prev => prev.filter(fileObj => file !== fileObj) || []);
      }
    });
  };

  const onFileDelete = (e: React.MouseEvent, file: FileUploadState & File) => {
    if (!file || readonly) return;

    const beforeDeleteVal = invokeEventCallback("beforedelete", { $event: file });
    if (beforeDeleteVal !== false) {
      showConfirmDialog({
        title: "Delete file",
        message: "Are you sure you want to delete this file?",
        oktext: "Ok",
        canceltext: "Cancel",
        onOk: () => {
          try {
            if (deletedatasource) {
              deletedatasource._deleteFileObservable = eventObserver();
              deleteFileProgress(file);
              const fileName = file._response?.[0]?.fileName || file.name;
              deletedatasource.setInput("file", fileName);
              const event = { ...e, _reactName: "onDelete" };
              onDelete?.(event, listener?.Widgets?.[name]);
              listener && listener?.App?.notifyApp("File deleted successfully", "Success");
            }
          } catch (error) {
            listener && listener?.App?.notifyApp("Service Call Failed", "Error");
          } finally {
            closeConfirmDialog();
          }
        },
        onCancel: () => {
          closeConfirmDialog();
        },
      });
    }
  };

  const handleBeforeSelect = useCallback(
    (event: React.MouseEvent | React.ChangeEvent, widget: any, selectedFiles: File[]) => {
      onBeforeselect?.(event, widget, selectedFiles);
    },
    [onBeforeselect]
  );

  const handleError = useCallback(
    (event: React.MouseEvent | React.ChangeEvent, widget: any, file: File) => {
      onError?.(event, widget, file);
    },
    [onError]
  );

  const events = {
    ...(onBeforeselect ? { onBeforeselect: handleBeforeSelect } : {}),
    ...(onError ? { onError: handleError } : {}),
  };

  return {
    fileInputRef,
    chooseFilter,
    highlightDropArea,
    uploadedFiles,
    selectedFolders,
    setSelectedFolders,
    dragOverHandler,
    onFileSelect,
    onFileDrop,
    setHighlightDropArea,
    clearSelectedFile,
    triggerFileSelect,
    onFileDelete,
    // Confirm dialog state and functions
    confirmDialogOpen,
    confirmDialogProps,
    showConfirmDialog,
    closeConfirmDialog,
    ...events,
  };
};
