import React from "react";
import { FieldValidationErrorProps } from "../props";

export const FieldValidationError: React.FC<FieldValidationErrorProps> = ({
  showError,
  title = "Field validation failed",
}) => {
  if (!showError) {
    return null;
  }

  return (
    <span
      className="text-danger wi wi-error"
      data-placement="top"
      data-container="body"
      title={title}
    />
  );
};

export default FieldValidationError;
