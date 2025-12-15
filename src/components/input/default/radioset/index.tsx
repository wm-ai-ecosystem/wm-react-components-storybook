import React, { memo, useEffect, useState, useCallback, useMemo } from "react";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Input } from "@base-ui-components/react/input";
import { find, isEqual, toString } from "lodash-es";
import { transformDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import { WmRadiosetProps, GroupedDataset, DatasetItem, StyledListProps } from "./props";
import { defaultItems } from "@wavemaker/react-runtime/components/constants";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";
import { getItemsPerRowClass } from "@wavemaker/react-runtime/components/data/list/utils/list-helpers";

const DEFAULT_CLASS = "app-radioset list-group inline";

const StyledList = styled(List)<{ ownerState: StyledListProps }>(({ ownerState }) => ({
  listStyleType: "none",
  padding: 0,
  margin: 0,
  width: ownerState.width || "100%",
  ...(ownerState.collapsible && {
    "& li.app-list-item-group": {
      "& ul.item-group": {
        padding: 0,
        display: "none",
      },
      "& ul.collapse-open": {
        display: "block",
      },
    },
  }),
  ...(ownerState.disabled && {
    opacity: 0.5,
    userSelect: "none",
  }),
}));

const WmRadioset = memo(
  (props: WmRadiosetProps) => {
    const {
      class: className,
      collapsible = false,
      compareby = [],
      datafield = "",
      dataset,
      datavalue,
      disabled = false,
      getDisplayExpression,
      displayfield = "",
      displayValue,
      groupby,
      itemclass = "",
      itemsperrow = "xs-1 sm-1 md-1 lg-1",
      listclass = "",
      match,
      name,
      orderby,
      readonly = false,
      required = false,
      show = true,
      showcount = false,
      tabindex = 0,
      usekeys = false,
      onClick,
      onChange,
      onMouseenter,
      onMouseleave,
      onTap,
      datasetItems = [],
      selectedItems = [],
      onblur,
      validation,
      groupedData,
      handleHeaderClick: externalHandleHeaderClick,
      toggleAllHeaders,
      isDestroyed,
      width,
      height,
      listener,
      styles,
      dataPath,
    } = props;

    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [selectedKey, setSelectedKey] = useState<string | number | undefined>(undefined);
    const [localDatasetItems, setLocalDatasetItems] = useState<DatasetItem[]>([]);
    const [groupedDataset, setGroupedDataset] = useState<GroupedDataset[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const itemsPerRowClass = useMemo(() => getItemsPerRowClass(itemsperrow), [itemsperrow]);

    const handleBlur = useCallback(() => {
      if (onblur) onblur();
    }, [onblur]);

    const transformedDataset = useMemo(() => {
      if (!dataset) return [];
      return transformDataset(
        dataset,
        datafield,
        displayfield,
        undefined,
        getDisplayExpression,
        orderby,
        groupby,
        dataPath
      );
    }, [dataset, datafield, displayfield, getDisplayExpression, orderby, groupby]);

    useEffect(() => {
      setIsLoading(true);
      setError(null);

      try {
        if (datasetItems && datasetItems.length > 0) {
          setLocalDatasetItems(datasetItems);
        } else if (dataset) {
          setLocalDatasetItems(prevItems => {
            if (!isEqual(prevItems, transformedDataset)) {
              return transformedDataset;
            }
            return prevItems;
          });
        } else {
          setLocalDatasetItems(defaultItems);
        }
      } catch (e) {
        console.error("WmRadioset: Error processing dataset", e);
        setError("Error processing dataset");
        setLocalDatasetItems([]);
      } finally {
        setIsLoading(false);
      }
    }, [dataset, transformedDataset]);

    useEffect(() => {
      if (groupby && localDatasetItems.length > 0) {
        try {
          setGroupedDataset(prevGrouped => {
            if (!isEqual(prevGrouped, transformedDataset)) {
              return transformedDataset;
            }
            return prevGrouped;
          });
          if (collapsible) {
            const initialExpandedState: Record<string, boolean> = {};
            transformedDataset.forEach((group: GroupedDataset) => {
              initialExpandedState[group.key] = true;
            });
            setExpandedItems(initialExpandedState);
          }
        } catch (e) {
          console.error("WmRadioset: Error grouping data", e);
          setGroupedDataset([]);
        }
      } else {
        setGroupedDataset([]);
      }
    }, [groupby, localDatasetItems, collapsible, transformedDataset]);

    useEffect(() => {
      setSelectedKey(datavalue);
    }, [datavalue]);

    const handleGroupClick = useCallback(
      (key: string, event?: React.MouseEvent<HTMLElement>) => {
        setExpandedItems(prevState => ({ ...prevState, [key]: !prevState[key] }));
        if (externalHandleHeaderClick && event) {
          externalHandleHeaderClick(key);
        }
      },
      [externalHandleHeaderClick]
    );

    const handleRadioChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedKey = event.target.value;
        setSelectedKey(newSelectedKey);

        const selectedItem = find(
          localDatasetItems,
          item => toString(item.key) === toString(newSelectedKey)
        );

        if (selectedItem) {
          if (onChange) {
            onChange(event, props, selectedItem.value, selectedKey);
          }
          if (listener?.onChange) {
            listener.onChange(props.name, {
              datavalue: selectedItem.key,
              displayValue: selectedItem.label,
            });
          }
        }
      },
      [localDatasetItems, onChange, props]
    );

    const handleItemClick = useCallback(
      (item: DatasetItem, event: React.MouseEvent<HTMLElement>) => {
        if (disabled || readonly) return;

        const newKey = toString(item.key);
        setSelectedKey(newKey);

        if (item) {
          if (onClick) {
            onClick(event, props, item.value, selectedKey);
          }
          if (onChange) {
            onChange(event, props, item.value, selectedKey);
          }
          if (listener?.onChange) {
            listener.onChange(name, {
              ...props,
              datavalue: newKey,
              displayValue: item.label,
            });
          }
        }
      },
      [disabled, readonly, onClick, onChange, props, name]
    );

    const renderRadio = useCallback(
      (item: DatasetItem, index: number) => {
        const isChecked = toString(selectedKey) === toString(item.key);
        return (
          <ListItem
            key={toString(item.key) + index}
            className={clsx("radio app-radio", { active: isChecked })}
            onClick={e => handleItemClick(item, e)}
            component="li"
          >
            <Box
              component="label"
              className={`app-radioset-label ${disabled || readonly ? "disabled" : ""}`}
            >
              <Input
                data-attr-index={index}
                type="radio"
                checked={isChecked}
                disabled={disabled || readonly}
                name={`radioset_${name || "unnamed"}`}
                tabIndex={tabindex}
                aria-label={item.label}
                value={item.key}
                onChange={handleRadioChange}
                role="radio"
                aria-checked={isChecked}
              />
              <Box component="span" className="caption customTemplate">
                {item.label}
              </Box>
            </Box>
          </ListItem>
        );
      },
      [selectedKey, handleRadioChange, handleItemClick, disabled, readonly, name]
    );

    const renderGroupHeader = useCallback(
      (group: GroupedDataset) => {
        return (
          <ListItem
            key={`group_${group.key}`}
            className={clsx("list-group-header", collapsible ? "collapsible-content" : "")}
            onClick={e => handleGroupClick(group.key, e)}
            component="li"
          >
            <Box component="h4" className="group-title">
              {group.key || "Ungrouped"}
              <Box component="div" className="header-action">
                {collapsible ? (
                  <Box
                    component="i"
                    className={clsx(
                      "app-icon wi action",
                      expandedItems[group.key] ? "wi-chevron-up" : "wi-chevron-down"
                    )}
                    title="Collapse/Expand"
                    onClick={e => {
                      e.stopPropagation();
                      handleGroupClick(group.key);
                    }}
                  ></Box>
                ) : null}
              </Box>
              {showcount && (
                <Typography variant="caption" className="label label-default">
                  {group.data?.length || 0}
                </Typography>
              )}
            </Box>
          </ListItem>
        );
      },
      [expandedItems, handleGroupClick, disabled, readonly, collapsible, showcount]
    );

    if (error) {
      return <Box className="error-message">{error}</Box>;
    }

    if (isLoading) {
      return <Box className="loading-state">Loading...</Box>;
    }
    if (!localDatasetItems || localDatasetItems.length === 0) {
      return (
        <Box className={clsx(className, DEFAULT_CLASS, itemsPerRowClass, listclass, itemclass)}>
          <Box className="empty-state">No items to display</Box>
        </Box>
      );
    }

    const events = {
      ...(props.onMouseEnter && { onMouseEnter: props.onMouseEnter }),
      ...(props.onMouseLeave && { onMouseLeave: props.onMouseLeave }),
    };
    return (
      <Box
        {...events}
        className={clsx(className, DEFAULT_CLASS, itemsPerRowClass, listclass, itemclass)}
        sx={{ ...styles, height: height, width: width }}
      >
        <RadioGroup
          onMouseEnter={onMouseenter}
          onMouseLeave={onMouseleave}
          name={`radioset_${name || "unnamed"}`}
          value={selectedKey !== undefined ? toString(selectedKey) : ""}
          onChange={handleRadioChange}
          onBlur={handleBlur}
          className={clsx({ "collapsible-radio-group": collapsible })}
        >
          {groupby && groupedDataset.length > 0 ? (
            <Box component="ul" className={clsx(DEFAULT_CLASS)}>
              {groupedDataset.map(group => (
                <List
                  component="li"
                  className="app-list-item-group"
                  role="presentation"
                  key={`group_fragment_${group.key}`}
                >
                  <Box component="ul" className={clsx("item-group")}>
                    {renderGroupHeader(group)}
                    {collapsible
                      ? expandedItems[group.key]
                        ? group.data?.map((item, index) => renderRadio(item, index))
                        : null
                      : group.data?.map((item, index) => renderRadio(item, index))}
                  </Box>
                </List>
              ))}
            </Box>
          ) : (
            <StyledList
              name={name}
              role="radiogroup"
              ownerState={{ collapsible, disabled, width }}
              className={clsx("styledList custom", DEFAULT_CLASS)}
            >
              {localDatasetItems.map((item, index) => renderRadio(item, index))}
            </StyledList>
          )}
        </RadioGroup>
        <Input disabled={disabled || readonly} hidden className="model-holder" />
        {(readonly || disabled) && (
          <Box component="div" aria-readonly="true" className="readonly-wrapper"></Box>
        )}
      </Box>
    );
  },
  (prev: WmRadiosetProps, current: WmRadiosetProps) => {
    const keys: (keyof WmRadiosetProps)[] = [
      "datavalue",
      "dataset",
      "show",
      "disabled",
      "readonly",
      "orderby",
      "groupby",
      "collapsible",
      "datasetItems",
    ];
    return keys.every(key => {
      if (key === "datasetItems") {
        return isEqual(prev[key], current[key]);
      }
      return prev[key] === current[key];
    });
  }
);

WmRadioset.displayName = "WmRadioset";

export default withBaseWrapper(withFormController(WmRadioset));
