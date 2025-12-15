import React, { useEffect } from "react";
import clsx from "clsx";
import { Tabs } from "@base-ui-components/react/tabs";

import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

import WmTabPaneProps from "./props";
import { useTabsContext } from "..";

export const WmTabpane = (props: WmTabPaneProps) => {
  const { className, disabled, renderPartial, name, index } = props;
  const { selectedIndex, setSelectedIndex } = useTabsContext();

  const wasActiveRef = React.useRef<boolean>(false);
  const loadedRef = React.useRef<boolean>(false);

  useEffect(() => {
    const isActive = selectedIndex === index;
    const widgetInstance = props?.listener?.Widgets?.[name as string];

    if (isActive) {
      if (!loadedRef.current) {
        props?.onLoad?.(null as any, widgetInstance);
        loadedRef.current = true;
      }
      if (!wasActiveRef.current) {
        props?.onSelect?.(null as any, widgetInstance, index as number);
        wasActiveRef.current = true;
      }
    } else if (wasActiveRef.current) {
      props?.onDeselect?.(null as any, widgetInstance, index as number);
      wasActiveRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, name]);

  useEffect(() => {
    if (props.listener && props.listener.onChange) {
      props.listener.onChange(name, {
        select: () => setSelectedIndex(index as number),
      });
    }
  }, []);

  return (
    <Tabs.Panel
      value={index}
      className={clsx("tab-pane", {
        disabled: disabled,
        [className as string]: !!className,
        active: selectedIndex === index,
      })}
      role="tabpanel"
      style={{ width: "100%", ...props?.styles }}
      data-pane-name={name}
    >
      <div className="tab-body" data-widget-id={props["data-widget-id"]}>
        {renderPartial ? renderPartial(props, props.onLoad) : props.children}
      </div>
    </Tabs.Panel>
  );
};

WmTabpane.displayName = "WmTabpane";

export default withBaseWrapper(WmTabpane);
