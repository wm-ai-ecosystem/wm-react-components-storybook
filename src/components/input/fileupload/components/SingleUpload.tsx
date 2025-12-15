import React from "react";
import Box from "@mui/material/Box";
import { SingleFileUploadProps } from "../props";

const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
  fileInputRef,
  caption,
  displayname,
  contenttype,
  extensions,
  filetype,
  chooseFilter,
  disabled,
  readonly,
  required,
  arialabel,
  tabindex,
  iconclass,
  styles,
  triggerFileSelect,
  onFileSelect,
  onBeforeselect,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    onBeforeselect?.(e);
  };
  return (
    <div className="app-single-file-upload">
      <div className="app-button-wrapper">
        <Box component="form" className="form-horizontal">
          <input
            ref={fileInputRef}
            type="file"
            name="files"
            accept={chooseFilter}
            disabled={disabled || readonly}
            required={required}
            aria-label={arialabel || displayname || "File selection field"}
            onChange={onFileSelect}
            className="file-input"
            tabIndex={tabindex}
            style={{ display: "none" }}
            onClick={handleClick}
          />
          <button
            id="dropzone"
            type="button"
            className="app-button btn btn-default"
            onClick={disabled || readonly ? undefined : triggerFileSelect}
            disabled={disabled || readonly}
            style={styles}
          >
            <i className={iconclass}></i>
            <span>{caption || displayname || "Select File"}</span>
          </button>
        </Box>
      </div>
    </div>
  );
};

export default SingleFileUpload;
