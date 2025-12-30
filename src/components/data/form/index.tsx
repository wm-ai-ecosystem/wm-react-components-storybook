import type { Ref } from "react";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmMessage } from "@wavemaker/react-runtime/components/basic/message";
import BaseForm from "./base-form";
import FormProps from "./props";
import WmFormHeader from "./form-header";
import { removeInvalidAttributes } from "@wavemaker/react-runtime/utils/attr";

const WmForm = (props: FormProps) => {
  const shouldHideHeader = props.isLayoutDialog || props.isInsideWizard;

  return (
    <form
      {...removeInvalidAttributes(props)}
      hidden={props.hidden || false}
      name={props.name}
      defaultmode={props.defaultmode}
      captionposition={props.captionposition}
      captionalign={props.captionalign}
      numberoffields={props.numberoffields}
      className={props.className}
      id={props.id}
      onSubmit={props.submit}
      style={{ ...props.styles, ...props.conditionalstyle }}
      onReset={props.formreset}
      ref={props.formElementRef as Ref<HTMLFormElement>}
    >
      {!shouldHideHeader &&
        (props?.title ||
          props?.subheading ||
          props?.iconclass ||
          props?.headerActions?.length > 0 ||
          props?.collapsible) && (
          <WmFormHeader
            title={props.title}
            subheading={props.subheading}
            iconclass={props.iconclass}
            collapsible={props.collapsible}
            expanded={props.expanded}
            headerActions={props.headerActions}
            expandCollapsePanel={props.expandCollapsePanel}
            isViewMode={props.isViewMode}
          />
        )}
      {/* render message if showmessage is true and messagelayout is Inline */}
      {props?.showmessage && props?.messagelayout === "Inline" && (
        <WmMessage
          aria-hidden={!props?.statusMessage?.caption}
          aria-label={props?.statusMessage?.caption}
          caption={props?.statusMessage?.caption}
          type={props?.statusMessage?.type}
          open={props?.showmessage}
          close={props?.clearMessage}
          name=""
          listener={{}}
        />
      )}
      {props.children}
    </form>
  );
};

WmForm.displayName = "WmForm";

const WmFormWithBaseWrapper = withBaseWrapper(WmForm);

export default BaseForm(WmFormWithBaseWrapper);
