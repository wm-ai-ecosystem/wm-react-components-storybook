import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import FolderIcon from "@mui/icons-material/Folder";
import ClearIcon from "@mui/icons-material/Clear";
import { getFileIconClass } from "../../../constants";
import { CommonFileProps, FileUploadState } from "../props";

const CommonFile: React.FC<CommonFileProps> = ({
  uploadedFiles,
  selectedFolders,
  filelistheight,
  readonly,
  clearSelectedFile,
  onBeforedelete,
  onFileDelete,
  setSelectedFolders,
}) => {
  const fileUploadComponents: React.ReactNode[] = [];
  // Render uploaded files list
  if (uploadedFiles.length > 0) {
    fileUploadComponents.push(
      <div
        key="file-list"
        className="file-list-container"
        style={{ maxHeight: filelistheight || 400, overflow: "auto" }}
      >
        <List className="list-group file-upload" dense>
          {uploadedFiles.map((file, index) => (
            <ListItem
              key={file.uniqueId || `file-${index}`}
              file={file}
              index={index}
              clearSelectedFile={clearSelectedFile}
              onBeforedelete={onBeforedelete}
              onFileDelete={onFileDelete}
            />
          ))}
        </List>
      </div>
    );
  }

  // Render selected folders list
  if (selectedFolders.length > 0) {
    fileUploadComponents.push(
      <List key="folder-list" dense>
        {selectedFolders.map((folder, index) => (
          <li key={index} className="file-upload-status error">
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={folder.name} secondary="Folders cannot be uploaded" />
            <IconButton
              onClick={() => setSelectedFolders(prev => prev.filter((_, i) => i !== index))}
              edge="end"
              aria-label="clear"
              size="small"
              disabled={readonly}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </List>
    );
  }

  return <>{fileUploadComponents}</>;
};

export default CommonFile;

export const ListItem = ({
  file,
  index,
  clearSelectedFile,
  onBeforedelete,
  onFileDelete,
}: {
  file: FileUploadState & File;
  index: number;
  clearSelectedFile: (file: FileUploadState & File) => void;
  onBeforedelete: (e: React.MouseEvent, file: FileUploadState & File) => void;
  onFileDelete: (e: React.MouseEvent, file: FileUploadState & File) => void;
}) => {
  return (
    <li
      key={`file-${file.uniqueId || index}`}
      className={`file-upload-status list-group-item ${file.status || ""}`}
    >
      <Box component="div" className="media upload-file-list" sx={{ width: "100%" }}>
        <div
          className={`${getFileIconClass(file.storageName || file.name)} file-icon media-left media-middle`}
        ></div>
        <div className="media-body media-middle file-details">
          <p className="uploaddetails col-md-3">
            <span className="upload-title">{file.storageName || file.name}</span>
            {file.status === "success" && (
              <span className={`status-icon text-success wi wi-check-circle`}></span>
            )}
            <br />
            <span className="filesize">
              {Math.round(((file._response && file._response[0]?.length) || file.size || 0) / 1024)}{" "}
              KB
            </span>
            {file.status === "error" && (
              <span className="status-icon status-icon text-danger wi wi-error"></span>
            )}
            {file.status === "error" && <span className="error-message">Upload Failed</span>}
          </p>
          {file.status === "onProgress" && file.progress !== undefined && file.progress >= 0 && (
            <div className="col-md-1 upload-progress-percentage">{file.progress || 0}%</div>
          )}
        </div>
        <div className="media-right media-middle">
          <a
            type="button"
            className="btn btn-transparent btn-default status-icon"
            onClick={() => {
              clearSelectedFile(file);
            }}
          >
            <i className="wi wi-clear"></i>
          </a>
        </div>
        <div className="media-right media-middle">
          <a
            type="button"
            className="btn btn-transparent btn-default status-icon"
            onClick={e => {
              onBeforedelete?.(e, file);
              onFileDelete(e, file);
            }}
          >
            <i className="wi wi-delete"></i>
          </a>
        </div>
      </Box>
    </li>
  );
};
