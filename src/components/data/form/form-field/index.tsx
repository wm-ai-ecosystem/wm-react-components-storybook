import React, { memo } from "react";
import isEqual from "lodash-es/isEqual";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import FormFieldProps from "./props";
import BaseField from "./base-field";

const WmFormField = memo(
  (props: FormFieldProps) => {
    // Use renderFormFields prop to render the actual form field component
    // This allows parent components to pass in form fields wrapped with withFormController
    if (props.renderFormFields) {
      if (props.formRef) {
        return <>{props.renderFormFields({ ...props })}</>;
      } else {
        return null;
      }
    }

    // Fallback: render nothing if no renderFormFields is provided
    console.warn("WmFormField: renderFormFields prop is required");
    return null;
  },
  (prev, next) => {
    return isEqual(prev, next);
  }
);

WmFormField.displayName = "WmFormField";

export default BaseField(withBaseWrapper(WmFormField));
