import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
  useMemo,
  HtmlHTMLAttributes,
} from "react";
import { find, findIndex, forEach, toString } from "lodash-es";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import Box from "@mui/material/Box";
import { InputBase } from "@mui/material";
import { transformDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import { DataSetItem, WmSwitchProps } from "./prop";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

const DEFAULT_CLS = "app-switch";

const defaultProps: Partial<WmSwitchProps & BaseProps> = {
  show: true,
  tabindex: 0,
  checkediconclass: "",
  displayfield: "label",
  multiple: false,
  disabled: false,
  required: false,
  allowempty: true,
  acceptsArray: false,
  dataset: "yes, no, maybe",
  datavalue: "yes",
};

const useSwitch = (props: WmSwitchProps) => {
  const {
    dataset = defaultProps.dataset,
    datasetItems: propDatasetItems,
    multiple = defaultProps.multiple,
    value,
    toBeProcessedValue,
    onChange,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    disabled = defaultProps.disabled,
    compareby,
    datafield,
    allowempty = defaultProps.allowempty,
    acceptsArray = defaultProps.acceptsArray,
    datavalue = defaultProps.datavalue,
    listener,
    displayfield,
    orderby,
    displayExpression,
    name,
    dataPath,
  } = props;

  // Consolidated dataset transformation - handles both initial value and updates
  const transformedDataset = useMemo(() => {
    if (propDatasetItems?.length) return propDatasetItems;
    return transformDataset(
      dataset,
      datafield,
      displayfield,
      undefined,
      displayExpression,
      orderby,
      null,
      dataPath
    );
  }, [dataset, datafield, displayfield, displayExpression, orderby, propDatasetItems]);

  const [datasetItems, setDatasetItems] = useState<DataSetItem[]>(transformedDataset);
  const [selectedItem, setSelectedItem] = useState<DataSetItem | null>(null);
  const [modelByValue, setModelByValue] = useState<any>(null);
  const [modelByKey, setModelByKey] = useState<any>(null);
  const [CHDisplayValue, setDisplayValue] = useState<string | string[]>("");
  const switchRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  // This flag helps us distinguish between programmatic updates and user clicks
  const [isUserInteraction, setIsUserInteraction] = useState(false);
  const btnWidth = useMemo(() => {
    return datasetItems?.length && !multiple ? 100 / datasetItems.length : 0;
  }, [datasetItems?.length, multiple]);

  const updateHighlighter = useCallback(
    (skipAnimation = false) => {
      if (!overlayRef.current || !switchRef.current) return;

      const index = selectedItem ? findIndex(datasetItems, { key: selectedItem.key }) : -1;
      if (index === -1) return;

      const left = index * btnWidth;
      if (skipAnimation) {
        overlayRef.current.style.left = `${left}%`;
      } else {
        overlayRef.current.style.left = `${left}%`;
      }
    },
    [btnWidth, datasetItems, selectedItem]
  );

  useEffect(() => {
    if (overlayRef.current && btnWidth > 0) {
      overlayRef.current.style.width = `${btnWidth}%`;
    }
  }, [btnWidth]);

  // Update datasetItems when transformedDataset changes
  useEffect(() => {
    setDatasetItems(prevItems => {
      // Only update if actually different
      if (JSON.stringify(prevItems) !== JSON.stringify(transformedDataset)) {
        return transformedDataset;
      }
      return prevItems;
    });
  }, [transformedDataset]);

  // This is the key fix: we only run the value update logic when it's NOT a user interaction
  // This prevents the useEffect from overriding user clicks
  const onValueUpdateFn = useCallback(() => {
    if (isUserInteraction) {
      return; // Don't override user interactions
    }

    if (value !== undefined || toBeProcessedValue !== undefined || datavalue !== undefined) {
      const selected = find(
        datasetItems,
        (item: any) =>
          item.value === (value || toBeProcessedValue || datavalue) ||
          toString(item.key) === toString(value || toBeProcessedValue || datavalue)
      );
      if (selected) {
        const updatedItems = datasetItems.map(item => ({
          ...item,
          selected: toString(item.key) === toString(selected.key),
        }));
        setDatasetItems(updatedItems);
        setSelectedItem(selected);
        setModelByKey(selected.key);
        setModelByValue(selected.value);
      }
    } else if (datasetItems?.length > 0 && !selectedItem && datavalue) {
      const firstItem = datasetItems[0];
      const updatedItems = datasetItems.map((item, idx) => ({
        ...item,
        selected: idx === 0,
      }));
      setDatasetItems(updatedItems);
      setSelectedItem(firstItem);
      setModelByKey(firstItem.key);
      setModelByValue(firstItem.value);
    }
  }, [datasetItems, value, toBeProcessedValue, datavalue, selectedItem, isUserInteraction]);

  useEffect(() => {
    onValueUpdateFn();
  }, [value, toBeProcessedValue, datavalue, datasetItems?.length]);

  useEffect(() => {
    if (selectedItem) {
      updateHighlighter(true);
    }
  }, [selectedItem, updateHighlighter]);

  const selectOpt = useCallback(
    (event: React.MouseEvent, index: number, option: DataSetItem) => {
      event.preventDefault();
      if (disabled) return;

      // Mark this as a user interaction to prevent useEffect interference
      setIsUserInteraction(true);

      if (multiple) {
        const updatedItems = datasetItems.map((item, idx) => ({
          ...item,
          selected: idx === index ? !item.selected : item.selected,
        }));

        const keys: string[] = [];
        forEach(updatedItems, (item: any) => {
          if (item.selected) {
            keys.push(item.key);
          }
        });

        // Use a single state update to avoid conflicts
        setDatasetItems(updatedItems);
        setModelByKey(keys);
        setModelByValue(keys.map(key => find(updatedItems, { key })?.value));
        setSelectedItem(find(updatedItems, { selected: true }) || null);

        const datavalueArray = keys.map(key => find(updatedItems, { key })?.value);
        const displayValueArray = keys.map(key => find(updatedItems, { key })?.label);

        if (listener?.onChange) {
          listener.onChange(name, {
            ...props,
            datavalue: datavalueArray,
            displayValue: displayValueArray,
          });
        }
        if (onChange) {
          onChange(
            event,
            listener?.Widgets[name],
            keys.map(key => find(updatedItems, { key })?.value),
            keys
          );
        }
      } else {
        // Handle single selection logic
        let targetIndex = index;
        if (
          !multiple &&
          selectedItem &&
          index === findIndex(datasetItems, { key: selectedItem.key })
        ) {
          if (datasetItems.length === 2) {
            targetIndex = index === 1 ? 0 : 1;
          } else {
            // Reset the user interaction flag before returning
            setIsUserInteraction(false);
            return;
          }
        }

        const updatedItems = [...datasetItems];
        updatedItems.forEach(item => (item.selected = false));
        updatedItems[targetIndex].selected = true;

        const selectedOption = updatedItems[targetIndex];

        // Batch all state updates together to ensure they happen atomically
        setDatasetItems(updatedItems);
        setSelectedItem(selectedOption);
        setModelByKey(selectedOption.key);
        setModelByValue(selectedOption.value);

        // Update overlay position immediately for immediate visual feedback
        if (overlayRef.current) {
          overlayRef.current.style.transition = "left 300ms";
          const left = targetIndex * btnWidth;
          overlayRef.current.style.left = `${left}%`;
        }

        if (listener?.onChange) {
          listener.onChange(props?.fieldName || name, {
            datavalue: selectedOption.value,
            displayValue: selectedOption.label,
          });
        }
        if (onChange) {
          onChange(
            event,
            listener?.Widgets[name],
            selectedOption.value,
            selectedItem?.label as string
          );
        }
      }

      // Reset the user interaction flag after a short delay to allow for programmatic updates again
      setTimeout(() => {
        setIsUserInteraction(false);
      }, 100);

      if (onBlur) {
        onBlur();
      }
    },
    [datasetItems, disabled, multiple, onChange, onBlur, onClick, selectedItem, btnWidth, listener]
  );

  const handleOnMouseEnter = (event: React.MouseEvent, option: DataSetItem) => {
    if (disabled || !onMouseEnter) return;
    onMouseEnter(event, listener?.Widgets[name]);
  };

  const handleOnMouseLeave = (event: React.MouseEvent, option: DataSetItem) => {
    if (disabled || !onMouseLeave) return;
    onMouseLeave(event, listener?.Widgets[name]);
  };

  const handleOnClick = (event: React.MouseEvent, index: number, option: DataSetItem) => {
    selectOpt(event, index, option);
    if (disabled || !onClick) return;
    onClick(event, listener?.Widgets[name]);
  };

  return {
    datasetItems,
    selectedItem,
    btnWidth,
    switchRef,
    overlayRef,
    selectOpt,
    updateHighlighter,
    modelByValue,
    modelByKey,
    CHDisplayValue,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnClick,
  };
};

const SwitchOption = memo(
  ({
    opt,
    index,
    getHint,
    selectOpt,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnClick,
    disabled = false,
    iconclass,
    checkediconclass,
    displayfield,
  }: {
    opt: DataSetItem;
    index: number;
    getHint: (opt: DataSetItem, index: number) => string;
    selectOpt: (event: React.MouseEvent, index: number, option: DataSetItem) => void;
    handleOnMouseEnter: (event: React.MouseEvent, option: DataSetItem) => void;
    handleOnMouseLeave: (event: React.MouseEvent, option: DataSetItem) => void;
    handleOnClick: (event: React.MouseEvent, index: number, option: DataSetItem) => void;
    disabled?: boolean;
    iconclass?: string;
    checkediconclass?: string;
    displayfield?: string;
  }) => (
    <Box
      component="a"
      key={opt.key}
      href="javascript:void(0);"
      className={`btn btn-default ${opt.selected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
      title={getHint(opt, index)}
      role="button"
      aria-pressed={opt.selected ? "true" : "false"}
      onClick={e => handleOnClick(e, index, opt)}
      onMouseEnter={e => handleOnMouseEnter(e, opt)}
      onMouseLeave={e => handleOnMouseLeave(e, opt)}
      {...({
        name: `wm-switch-${opt.key}`,
      } as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {iconclass && opt.dataObject?.[iconclass] && (!opt.selected || !checkediconclass) && (
        <Box
          component="i"
          aria-hidden="true"
          className={`app-icon ${opt.dataObject[iconclass] || opt["icon"]}`}
        />
      )}
      {opt.selected && checkediconclass && (
        <Box component="i" aria-hidden="true" className={checkediconclass} />
      )}
      <Box component="span" className="caption">
        {(displayfield && opt[displayfield]) || opt.label}
      </Box>
    </Box>
  )
);

SwitchOption.displayName = "SwitchOption";

const WmSwitch: React.FC<WmSwitchProps> = memo(
  ({
    dataset,
    datasetItems: propDatasetItems,
    multiple = defaultProps.multiple,
    disabled = defaultProps.disabled,
    required = defaultProps.required,
    name,
    hint,
    iconclass,
    checkediconclass = defaultProps.checkediconclass,
    displayfield = defaultProps.displayfield,
    datafield,
    value,
    onChange,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    compareby,
    toBeProcessedValue,
    show = defaultProps.show,
    tabindex = defaultProps.tabindex,
    arialabel = "Switch choose options",
    className,
    datavalue,
    displayExpression,
    orderby,
    displayValue,
    listener,
    styles,
    dataPath,
    hidden,
    ...rest
  }) => {
    const {
      datasetItems,
      selectedItem,
      switchRef,
      overlayRef,
      selectOpt,
      updateHighlighter,
      handleOnMouseEnter,
      handleOnMouseLeave,
      handleOnClick,
      modelByValue,
      modelByKey,
      CHDisplayValue,
      btnWidth,
    } = useSwitch({
      dataset,
      datasetItems: propDatasetItems,
      multiple,
      value,
      toBeProcessedValue,
      onChange,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onBlur,
      disabled,
      compareby,
      datafield,
      datavalue,
      name,
      displayfield,
      displayExpression,
      orderby,
      listener,
      dataPath,
    });

    const getHint = useCallback(
      (opt: DataSetItem, index: number) => {
        if (!hint) return opt[displayfield as keyof DataSetItem] || opt.label;
        if (Array.isArray(hint)) {
          return hint[index - 1] || hint[0] || opt[displayfield as keyof DataSetItem] || opt.label;
        }
        return hint;
      },
      [hint, displayfield]
    );

    return (
      <Box
        hidden={hidden}
        className={DEFAULT_CLS}
        {...({ name } as HtmlHTMLAttributes<HTMLDivElement>)}
        aria-label={arialabel}
        {...({ datavalue } as HtmlHTMLAttributes<HTMLDivElement>)}
      >
        <Box
          ref={switchRef}
          role="group"
          className={`btn-group btn-group-justified ${multiple ? "multi-select" : ""} ${className || ""}`}
          style={{ overflow: "visible", position: "relative", ...styles }}
          tabIndex={tabindex}
          aria-label={arialabel}
        >
          {datasetItems &&
            datasetItems.map((opt, index) => (
              <SwitchOption
                key={opt.key}
                opt={opt}
                index={index}
                getHint={getHint}
                selectOpt={selectOpt}
                disabled={disabled}
                iconclass={iconclass}
                checkediconclass={checkediconclass}
                displayfield={displayfield}
                handleOnMouseEnter={handleOnMouseEnter}
                handleOnMouseLeave={handleOnMouseLeave}
                handleOnClick={handleOnClick}
              />
            ))}
        </Box>
        {!multiple && (
          <Box
            component="span"
            ref={overlayRef}
            title={selectedItem ? selectedItem.label : modelByKey}
            aria-hidden="true"
            className="btn btn-primary app-switch-overlay switch-handle"
          >
            {checkediconclass && <Box component="i" className={checkediconclass} />}
            <Box component="span" className="caption">
              {selectedItem ? selectedItem.label : modelByKey}
            </Box>
          </Box>
        )}
        <InputBase
          name={name}
          className="model-holder ng-hide"
          disabled={disabled}
          value={modelByKey || ""}
          required={required}
          aria-hidden="true"
          readOnly
        />
      </Box>
    );
  }
);

WmSwitch.displayName = "WmSwitch";

export default withBaseWrapper(withFormController(WmSwitch));
