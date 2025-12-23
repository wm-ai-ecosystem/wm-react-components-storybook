import React, { memo } from "react";
import clsx from "clsx";
import isEqual from "lodash-es/isEqual";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import FormFieldProps from "./props";
import BaseField from "./base-field";

import { WmComposite } from "@wavemaker/react-runtime/components/input/composite";

const DEFAULT_CLASS = "ng-pristine ng-invalid ng-touched";
const DEFAULT_COMPOSITE_CLASS = "app-composite-widget caption-left clearfix form-group live-field";

const WmFormField = memo(
  (props: FormFieldProps) => {
    // Use renderFormFields prop to render the actual form field component
    // This allows parent components to pass in form fields wrapped with withFormController
    function renderFormFields() {
      if (props.formRef) {
        return <>{props.renderFormFields({ ...props })}</>;
      } else {
        return null;
      }
    }

    const itemsPerRow = props?.formRef?.itemsPerRow || "";
    if (props.hidden) {
      return null;
    }

    return (
      <div
        className={clsx(props.className, itemsPerRow, DEFAULT_CLASS)}
        id={props.id}
        style={{ ...props.conditionalstyle }}
        data-displayname={props.displayname}
        data-name={props.name}
        data-placeholder={props.placeholder}
        name={props.name}
        displayname={props.displayname}
        placeholder={props.placeholder}
        hidden={props.hidden}
        data-role={props.role || "form-field"}
      >
        <WmComposite
          captionposition={props.captionposition || "left"}
          listener={{}}
          name=""
          className={DEFAULT_COMPOSITE_CLASS}
        >
          {renderFormFields()}
        </WmComposite>
      </div>
    );
  },
  (prev, next) => {
    return isEqual(prev, next);
  }
);

WmFormField.displayName = "WmFormField";

export default BaseField(withBaseWrapper(WmFormField));
