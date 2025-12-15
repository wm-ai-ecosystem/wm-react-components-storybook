import React from "react";
import Box from "@mui/material/Box";
import { MultipleFileUploadProps } from "../props";

const MultipleFileUpload: React.FC<MultipleFileUploadProps> = ({
  fileInputRef,
  multiple,
  contenttype,
  extensions,
  filetype,
  caption = "Upload",
  chooseFilter,
  disabled,
  readonly,
  required,
  arialabel,
  displayname,
  tabindex,
  iconclass,
  fileuploadmessage,
  highlightDropArea,
  triggerFileSelect,
  onFileSelect,
  dragOverHandler,
  onFileDrop,
  setHighlightDropArea,
  onBeforeselect,
  styles,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    onBeforeselect?.(e);
  };
  return (
    <div className="app-multi-file-upload">
      <div
        className={`drop-box ${highlightDropArea ? "highlight-drop-box" : ""}`}
        id="dropzone"
        onClick={disabled || readonly ? undefined : triggerFileSelect}
        onDragOver={dragOverHandler}
        onDrop={onFileDrop}
        onDragLeave={() => setHighlightDropArea(false)}
        style={styles}
      >
        <i className={iconclass}></i>
        <div className="message">
          <label className="upload-label" htmlFor="Upload">
            {caption}
          </label>
          <Box component="form" className="form-horizontal">
            <input
              ref={fileInputRef}
              type="file"
              name="files"
              multiple={multiple}
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
            <a
              className="app-anchor upload-label"
              onClick={disabled || readonly ? undefined : triggerFileSelect}
            >
              {fileuploadmessage || "Drop your files here or click here to browse"}
            </a>
          </Box>
          <label className="upload-extensions" htmlFor="extensions">
            {chooseFilter || "All files"} only{" "}
          </label>
        </div>
      </div>
    </div>
  );
};

export default MultipleFileUpload;
