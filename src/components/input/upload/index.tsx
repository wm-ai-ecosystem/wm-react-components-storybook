import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import clsx from "clsx";
import Link from "next/link";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import withFormController from "../../data/form/form-controller/withFormController";
import { WmUploadProps } from "./props";
import Image from "next/image";

const WmUpload = memo(
  (props: WmUploadProps) => {
    const {
      name,
      formField,
      datavalue,
      readonly = false,
      required = false,
      type,
      onChange,
      className,
      style,
      onFocus,
      onBlur,
      disabled = false,
      listener,
    } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const prevDatavalue = useRef<any>(datavalue);

    // Check if we have existing file data
    const isImage = formField?.filetype === "image";

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;

      // For blob type, we need to call listener.onChange to update the form data
      // The form controller will handle the actual value from the event.target.value
      if (type === "file") {
        listener?.onChange?.(name, {
          datavalue: file,
        });
      } else if (type === "blob") {
        // For blob type, pass the file name/path from the input value
        listener?.onChange?.(name, {
          datavalue: event.target.value,
        });
      }
      if (onChange) {
        onChange(event, listener?.Widgets[name], file, prevDatavalue.current);
      }

      prevDatavalue.current = file;
    };

    const handleFileFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(event, listener?.Widgets[name]);
      }
    };

    const handleFileBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event, listener?.Widgets[name]);
      }
    };

    // Render existing file display
    const renderExistingFile = useCallback(() => {
      const fileUrl = formField?.href || formField?.datavalue;

      if (!fileUrl || type !== "file") return null;

      return (
        <div className="existing-file-display">
          {isImage ? (
            <Link className="form-control-static" href={fileUrl}>
              <Image
                style={{ height: "2em" }}
                className="wi wi-file"
                src={fileUrl}
                alt="Existing file"
              />
            </Link>
          ) : (
            <Link className="form-control-static" href={fileUrl}>
              <i className="wi wi-file"></i>
            </Link>
          )}
        </div>
      );
    }, [formField?.href, formField?.datavalue, isImage, type]);

    return (
      <div className={className} style={style}>
        {renderExistingFile()}

        <input
          hidden={props.hidden}
          ref={fileInputRef}
          type="file"
          name={`${name}_formWidget`}
          className="app-blob-upload"
          required={required}
          readOnly={readonly}
          disabled={disabled}
          onChange={handleFileChange}
          onFocus={handleFileFocus}
          onBlur={handleFileBlur}
        />
      </div>
    );
  },
  (prev, current) => {
    const keys: (keyof WmUploadProps)[] = [
      "name",
      "formField",
      "datavalue",
      "readonly",
      "required",
      "type",
      "onChange",
      "className",
      "style",
    ];

    return keys.every(key => prev[key] === current[key]);
  }
);

export default withBaseWrapper(withFormController(WmUpload));
