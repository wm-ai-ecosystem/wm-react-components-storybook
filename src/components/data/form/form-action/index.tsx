import clsx from "clsx";
import { useEffect, memo } from "react";

import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import { WmAnchor } from "@wavemaker/react-runtime/components/basic/anchor";
import BaseProps from "@wavemaker/react-runtime/higherOrder/props";
import { useFormContext } from "@wavemaker/react-runtime/components/data/form/form-context";

interface WmFormActionsProps extends BaseProps {
  onClick: (event: any) => void;
  formKey: string;
  name: string;
  displayName: string;
  btnClass: string;
  className: string;
  iconclass: string;
  type: "submit" | "reset" | "button";
  disabled: boolean;
  widgetType: "button" | "anchor";
  formaction?: boolean;
}

const WmFormActions = memo((props: WmFormActionsProps) => {
  const {
    position = "footer",
    btnClass,
    updateMode,
    displayName,
    headeraction = false,
    showViewMode,
    ...rest
  } = props;

  const isheaderaction = position === "header" && !headeraction;

  // Get formRef from context
  const formRef = useFormContext();

  // register header action
  useEffect(() => {
    if (formRef && position.includes("header") && formRef.registerHeaderAction) {
      formRef.registerHeaderAction(props.name, props);
    }
  }, [formRef, props]);

  // check for view mode and update mode
  if ((formRef?.isViewMode && updateMode) || (!formRef?.isViewMode && !updateMode)) return null;
  else if (isheaderaction) return null;

  if (props.widgettype === "anchor") {
    return (
      <WmAnchor
        {...rest}
        title={displayName}
        caption={displayName}
        className={clsx(btnClass, rest.className)}
      />
    );
  }

  return (
    <WmButton
      className={clsx(btnClass, rest.className)}
      caption={displayName}
      title={displayName}
      iconclass={props.iconclass}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      name={props.name}
      show={props.show?.toString()}
      showindevices={props.showindevices}
      styles={props.styles}
      conditionalstyles={props.conditionalstyles}
      conditionalclass={props.conditionalclass}
      animation={props.animation}
      listener={props.listener}
      title={props.title || props.displayName}
    />
  );
});

WmFormActions.displayName = "WmFormActions";

export default WmFormActions;
