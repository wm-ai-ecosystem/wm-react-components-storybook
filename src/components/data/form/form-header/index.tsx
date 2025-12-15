import { memo } from "react";
import clsx from "clsx";
import { isEqual } from "lodash-es";
import { WmIcon } from "@wavemaker/react-runtime/components/basic/icon";
import WmFormActions from "@wavemaker/react-runtime/components/data/form/form-action";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import FormProps from "../props";

type FormHeaderProps = Pick<
  FormProps,
  | "title"
  | "subheading"
  | "iconclass"
  | "collapsible"
  | "expanded"
  | "headerActions"
  | "expandCollapsePanel"
  | "isViewMode"
>;

const WmFormHeader = (props: FormHeaderProps) => {
  return (
    <div className="panel-heading">
      <h3 className="panel-title">
        <div className="pull-left">
          {props.iconclass && <WmIcon name="" listener={{}} iconclass={props.iconclass} />}
        </div>
        <div className="pull-left">
          <div className="heading">{props.title}</div>
          <div className="description">{props.subheading}</div>
        </div>

        {/* render header actions */}
        <div className="form-action panel-actions basic-btn-grp">
          {props?.headerActions &&
            Object.keys(props?.headerActions)?.map((actionName: any, index: any) => {
              return (
                <div className="form-action panel-actions basic-btn-grp" key={index}>
                  <WmFormActions {...props?.headerActions[actionName]} headeraction={true} />
                </div>
              );
            })}

          {/* render collapsible icon if collapsible is true */}
          {props.collapsible && (
            <div className="form-action panel-actions basic-btn-grp">
              <WmButton
                name=""
                listener={{}}
                type="button"
                className={clsx(
                  "app-icon wi panel-action",
                  props.expanded ? "wi-minus" : "wi-plus"
                )}
                title={props.expanded ? "Collapse" : "Expand"}
                onClick={() => {
                  props.expandCollapsePanel();
                }}
              />
            </div>
          )}
        </div>
      </h3>
    </div>
  );
};

WmFormHeader.displayName = "WmFormHeader";

export default WmFormHeader;
