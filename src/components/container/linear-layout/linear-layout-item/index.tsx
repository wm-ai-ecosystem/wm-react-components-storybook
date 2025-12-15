import React, { HtmlHTMLAttributes, useMemo } from "react";
import clsx from "clsx";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-linear-layout-item clearfix";

interface LinearLayoutItemProps extends BaseProps {
  flexgrow?: number;
}

function WmLinearLayoutItem(props: LinearLayoutItemProps) {
  const { styles, className, children, flexgrow, id, name } = props;

  // Calculate flex styles
  const computedStyles = useMemo(() => {
    const flexStyles: React.CSSProperties = {
      ...styles,
    };

    if (flexgrow !== undefined) {
      flexStyles.flexGrow = flexgrow;
    }

    return flexStyles;
  }, [styles, flexgrow]);

  return (
    <div
      style={computedStyles}
      className={clsx(DEFAULT_CLASS, className)}
      data-widget-id={props["data-widget-id"]}
      id={id}
      {...({ name } as HtmlHTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}

WmLinearLayoutItem.displayName = "WmLinearLayoutItem";

export default withBaseWrapper(WmLinearLayoutItem);
