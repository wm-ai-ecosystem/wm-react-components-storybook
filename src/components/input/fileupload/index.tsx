import React, { memo } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { fileUploadConstants } from "@wavemaker/react-runtime/components/constants";
import { WmFileUploadProps } from "./props";
import { useFileUpload } from "./useFileUpload";
import SingleFileUpload from "./components/SingleUpload";
import MultipleFileUpload from "./components/MultiUpload";
import CommonFile from "./components/ListItems";
import WmConfirmDialog from "@wavemaker/react-runtime/components/dialogs/confirm-dialog";

const WmFileUpload = memo(
  (props: WmFileUploadProps) => {
    const {
      caption = fileUploadConstants.DEFAULT_CLASSES.DEFAULT_CAPTIONS.SELECT,
      name,
      hint,
      arialabel,
      tabindex = fileUploadConstants.DEFAULT_VALUES.TAB_INDEX,
      multiple = fileUploadConstants.DEFAULT_VALUES.MULTIPLE,
      fileuploadmessage = fileUploadConstants.DEFAULT_VALUES.FILEUPLOAD_MESSAGE,
      disabled = !fileUploadConstants.DEFAULT_VALUES.ENABLED,
      contenttype = "",
      iconclass = fileUploadConstants.DEFAULT_VALUES.ICON_CLASS,
      extensions,
      filetype,
      readonly = false,
      required = false,
      displayname,
      width = fileUploadConstants.DEFAULT_VALUES.WIDTH,
      height,
      styles,
      className,
      id,
      filelistheight,
    } = props;

    const {
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
      // Get confirm dialog state from hook
      confirmDialogOpen,
      confirmDialogProps,
      closeConfirmDialog,
      ...events
    } = useFileUpload(props);

    return (
      <Box
        component="div"
        className={clsx("app-fileupload", className)}
        id={id}
        title={hint}
        hidden={props.hidden}
        style={{ width: "100%" }}
      >
        {!multiple ? (
          <SingleFileUpload
            fileInputRef={fileInputRef}
            caption={caption}
            displayname={displayname}
            contenttype={contenttype}
            extensions={extensions}
            filetype={filetype}
            chooseFilter={chooseFilter}
            disabled={disabled}
            readonly={readonly}
            required={required}
            arialabel={arialabel}
            tabindex={tabindex}
            iconclass={iconclass}
            styles={styles}
            triggerFileSelect={triggerFileSelect}
            onFileSelect={onFileSelect}
            onBeforeselect={props.onBeforeselect}
            {...events}
          />
        ) : (
          <MultipleFileUpload
            fileInputRef={fileInputRef}
            caption={caption}
            multiple={multiple}
            contenttype={contenttype}
            extensions={extensions}
            filetype={filetype}
            chooseFilter={chooseFilter}
            disabled={disabled}
            readonly={readonly}
            required={required}
            arialabel={arialabel}
            displayname={displayname}
            tabindex={tabindex}
            iconclass={iconclass}
            styles={styles}
            fileuploadmessage={fileuploadmessage}
            highlightDropArea={highlightDropArea}
            triggerFileSelect={triggerFileSelect}
            onFileSelect={onFileSelect}
            dragOverHandler={dragOverHandler}
            onFileDrop={onFileDrop}
            setHighlightDropArea={setHighlightDropArea}
            onBeforeselect={props.onBeforeselect}
            {...events}
          />
        )}

        <CommonFile
          uploadedFiles={uploadedFiles}
          selectedFolders={selectedFolders}
          filelistheight={filelistheight}
          readonly={readonly}
          clearSelectedFile={clearSelectedFile}
          onFileDelete={onFileDelete}
          setSelectedFolders={setSelectedFolders}
          onBeforedelete={props.onBeforedelete}
          {...events}
        />

        <WmConfirmDialog
          name="fileUploadConfirmDialog"
          isopen={confirmDialogOpen}
          title={confirmDialogProps?.title || ""}
          message={confirmDialogProps?.message || ""}
          oktext={confirmDialogProps?.oktext || "OK"}
          canceltext={confirmDialogProps?.canceltext || "Cancel"}
          onOk={event => {
            confirmDialogProps?.onOk();
            closeConfirmDialog();
          }}
          isDialog={false}
          onCancel={event => {
            confirmDialogProps?.onCancel();
            closeConfirmDialog();
          }}
          onClose={closeConfirmDialog}
          listener={{}}
        />
      </Box>
    );
  },
  (prevProps, nextProps) => {
    const keysToCheck: (keyof WmFileUploadProps)[] = [
      "caption",
      "name",
      "hint",
      "arialabel",
      "tabindex",
      "multiple",
      "fileuploadmessage",
      "show",
      "disabled",
      "contenttype",
      "maxfilesize",
      "iconclass",
      "cleariconclass",
      "cleariconhint",
      "uploadpath",
      "datasource",
      "selectedFiles",
      "destination",
      "filelistheight",
      "width",
      "showprogressbar",
      "showprogressbarpercentage",
      "deleteiconhint",
      "extensions",
      "filetype",
      "readonly",
      "required",
      "deletedatasource",
      "displayname",
      "height",
      "onBeforeselect",
      "onSelect",
      "onDelete",
      "onBeforedelete",
      "onError",
      "hidden",
    ];

    // Check if any props that affect rendering have changed
    const propsChanged = keysToCheck.some(key => prevProps[key] !== nextProps[key]);

    // Also check if the file lists have changed
    const filesChanged =
      prevProps.datasource !== nextProps.datasource ||
      prevProps.deletedatasource !== nextProps.deletedatasource;

    return !propsChanged && !filesChanged;
  }
);

WmFileUpload.displayName = "WmFileUpload";

export default withBaseWrapper(WmFileUpload);
