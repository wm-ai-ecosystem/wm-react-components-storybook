import React, { memo, useEffect, useState, useCallback, useMemo } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { find, isArray, isEqual, isString, toString, get } from "lodash-es";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { defaultItems } from "@wavemaker/react-runtime/components/constants";
import {
  transformDataset,
  transformDataWithKeys,
} from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import { DatasetItem, GroupedDataset, WmCheckboxsetProps } from "./props";
import { Input } from "@base-ui-components/react/input";
import { getCheckboxsetDisplayValues } from "./utils";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";
import { getItemsPerRowClass } from "@wavemaker/react-runtime/components/data/list/utils/list-helpers";
import { ALL_FIELDS } from "@wavemaker/react-runtime/components/constants";

const DEFAULT_CLASS = "app-checkboxset list-group inline";

// Helper function to normalize datavalue to always be an array
const normalizeDatavalue = (datavalue: any): any[] => {
  if (datavalue === undefined || datavalue === null) {
    return [];
  }
  if (isArray(datavalue)) {
    return datavalue;
  }
  if (isString(datavalue)) {
    return datavalue.split(",").map((item: string) => item.trim());
  }
  // Convert single value to array
  return [datavalue];
};

export const WmCheckboxset = memo(
  (props: WmCheckboxsetProps) => {
    const {
      disabled = false,
      readonly = false,
      required = false,
      label = "",
      datafield = "",
      displayfield = "",
      getDisplayExpression,
      dataset = "Option 1, Option 2, Option 3",
      datavalue = [],
      usekeys = false,
      groupby = "",
      match = "",
      orderby = "",
      layout = "stacked",
      itemclass,
      listclass,
      showcount = false,
      show = true,
      name,
      collapsible = false,
      collapsed = false,
      tabIndex = 0,
      styles,
      onChange,
      onClick,
      onMouseEnter,
      onMouseLeave,
      datasetItems = [],
      selectedItems = [],
      groupedData = [],
      onchange,
      validation,
      isDestroyed,
      compareby = [],
      itemsperrow,
      displayValue,
      listener,
      className,
      dataPath,
    } = props;

    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [localSelectedKeys, setLocalSelectedKeys] = useState<any[]>(() =>
      normalizeDatavalue(datavalue)
    );
    const [localDatasetItems, setLocalDatasetItems] = useState<DatasetItem[]>([]);
    const [groupedDataset, setGroupedDataset] = useState<GroupedDataset[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Generate itemsPerRowClass
    const itemsPerRowClass = useMemo(() => getItemsPerRowClass(itemsperrow), [itemsperrow]);

    const transformedDataset = useMemo(() => {
      if (!dataset) return [];
      if (usekeys) {
        return transformDataWithKeys(dataset as any);
      }
      const data = transformDataset(
        dataset,
        datafield,
        displayfield,
        undefined,
        getDisplayExpression,
        orderby,
        groupby,
        dataPath,
        "",
        match
      );
      return data;
    }, [
      dataset,
      datafield,
      displayfield,
      getDisplayExpression,
      orderby,
      groupby,
      match,
      usekeys,
      dataPath,
    ]);

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
        console.error("WmCheckboxset: Error processing dataset", e);
        setError("Error processing dataset");
        setLocalDatasetItems([]);
      } finally {
        setIsLoading(false);
      }
    }, [dataset, transformedDataset]);

    // Process grouping
    useEffect(() => {
      if (groupby && localDatasetItems.length > 0) {
        try {
          const groupedData = transformedDataset as any;
          setGroupedDataset(prevGrouped => {
            if (!isEqual(prevGrouped, groupedData)) {
              return groupedData;
            }
            return prevGrouped;
          });

          if (collapsible) {
            const initialExpandedState: Record<string, boolean> = {};
            groupedData.forEach((group: GroupedDataset) => {
              initialExpandedState[group.key] = !collapsed;
            });
            setExpandedItems(initialExpandedState);
          }
        } catch (e) {
          console.error("WmCheckboxset: Error grouping data", e);
          setGroupedDataset([]);
        }
      } else {
        setGroupedDataset([]);
      }
    }, [groupby, localDatasetItems, collapsible, transformedDataset, collapsed]);

    // Initialize selected keys from datavalue or from selectedItems
    useEffect(() => {
      const normalizedDatavalue = normalizeDatavalue(datavalue);

      if (!isEqual(normalizedDatavalue, localSelectedKeys) && datavalue !== undefined) {
        if (normalizedDatavalue.length > 0) {
          setLocalSelectedKeys(normalizedDatavalue);
        } else if (selectedItems && selectedItems.length > 0) {
          const matchedKeys = selectedItems
            .map(selectedVal => {
              const selectedItem = find(localDatasetItems, item => {
                if (typeof selectedVal === "object" && typeof item.value === "object") {
                  if (compareby && compareby.length) {
                    return compareby.every(
                      field => get(selectedVal, field) === get(item.value, field)
                    );
                  }
                  return isEqual(selectedVal, item.value);
                }
                return toString(selectedVal) === toString(item.value);
              });

              return selectedItem ? selectedItem.key : null;
            })
            .filter(key => key !== null);

          if (matchedKeys.length > 0 && !isEqual(matchedKeys, localSelectedKeys)) {
            setLocalSelectedKeys(matchedKeys);
          }
        }
      }
    }, [datavalue]); // Removed localSelectedKeys from deps

    useEffect(() => {
      if (onchange && !isEqual(localSelectedKeys, datavalue)) {
        const timeoutId = setTimeout(() => {
          onchange(localSelectedKeys);
        }, 0);

        return () => clearTimeout(timeoutId);
      }
    }, [localSelectedKeys, onchange, datavalue]);

    const handleGroupClick = useCallback((key: string, event?: React.MouseEvent<HTMLElement>) => {
      setExpandedItems(prevState => ({ ...prevState, [key]: !prevState[key] }));
    }, []);

    const handleCheckboxChange = useCallback(
      (
        event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>,
        key: string,
        dataObject: any
      ) => {
        if (disabled || readonly) return;

        const currentSelectedKeys = Array.isArray(localSelectedKeys) ? localSelectedKeys : [];
        const isCurrentlySelected = currentSelectedKeys.some(k => {
          if (datafield == ALL_FIELDS) {
            if (usekeys) {
              return toString(k) === toString(key);
            }
            return isEqual(k, dataObject);
          }
          if (typeof k === "object" && datafield) {
            return k[datafield] === key;
          }
          return toString(k) === toString(key);
        });

        const isChecked = !isCurrentlySelected;
        let newKeys;

        if (isChecked) {
          const selectedItem = find(localDatasetItems, item => {
            if (datafield == ALL_FIELDS) {
              return isEqual(item.value, dataObject);
            }
            return toString(item.key) === toString(key);
          });

          if (usekeys) {
            newKeys = [...currentSelectedKeys, key];
          } else {
            let value: string;
            if (typeof selectedItem?.value == "object") {
              value = selectedItem?.value.value;
            } else {
              value = selectedItem?.value;
            }

            newKeys = [...currentSelectedKeys, selectedItem?.value || key];
          }
        } else {
          newKeys = currentSelectedKeys.filter(k => {
            if (datafield == ALL_FIELDS) {
              if (usekeys) {
                return toString(k) !== toString(key);
              }
              return !isEqual(k, dataObject);
            }
            if (typeof k === "object" && datafield) {
              return k[datafield] !== key;
            }
            return toString(k) !== toString(key);
          });
        }

        setLocalSelectedKeys(newKeys);
        if (onchange) {
          onchange(newKeys);
        }
        if (onChange && name) {
          onChange(event, listener.Widgets[name], newKeys, currentSelectedKeys);
        }
        if (onClick && name) {
          onClick(event, listener.Widgets[name]);
        }
        if (listener?.onChange) {
          const displayValues = getCheckboxsetDisplayValues(
            localDatasetItems,
            newKeys,
            datafield,
            usekeys
          );
          listener.onChange(props.fieldName || name, {
            datavalue: newKeys,
            displayValue: displayValues,
          });
        }
      },
      [
        localDatasetItems,
        localSelectedKeys,
        disabled,
        readonly,
        usekeys,
        datafield,
        onchange,
        props,
        onChange,
        name,
      ]
    );

    const isItemChecked = useCallback(
      (item: DatasetItem) => {
        const currentSelectedKeys = Array.isArray(localSelectedKeys) ? localSelectedKeys : [];
        return currentSelectedKeys.some(k => {
          if (datafield == ALL_FIELDS) {
            return usekeys ? toString(k) === toString(item.key) : isEqual(k, item.value);
          }
          return toString(k) === toString(item.key);
        });
      },
      [localSelectedKeys, datafield, usekeys]
    );

    const renderCheckboxItem = useCallback(
      (item: DatasetItem, index: number) => {
        const isChecked = isItemChecked(item);

        return (
          <ListItem
            key={toString(item.key + "_" + index)}
            className={clsx("checkbox app-checkbox", itemclass, itemsPerRowClass, {
              active: isChecked,
              disabled: disabled || readonly,
            })}
            onClick={e => {
              const tag = (e.target as HTMLElement).tagName;
              if (tag !== "INPUT" && tag !== "LABEL" && tag !== "SPAN") {
                handleCheckboxChange(e, toString(item.key), item?.dataObject);
              }
            }}
            component="li"
            sx={{ all: "unset" }}
          >
            <label
              className={clsx("app-checkboxset-label", { disabled: disabled })}
              title={item.label}
            >
              <Input
                name={`checkboxset_${name}`}
                type="checkbox"
                disabled={disabled || readonly}
                data-attr-index={item.key}
                value={item.key}
                tabIndex={tabIndex}
                checked={isChecked}
                role="checkbox"
                aria-checked={isChecked}
                onChange={e => handleCheckboxChange(e, toString(item.key), item?.dataObject)}
                style={disabled || readonly ? { background: "transparent" } : undefined}
              />
              <Typography
                component="span"
                className="caption"
                id={`checkbox-list-label-${item.key + "_" + index}`}
              >
                {item.label}
              </Typography>
            </label>
          </ListItem>
        );
      },
      [
        isItemChecked,
        handleCheckboxChange,
        disabled,
        readonly,
        tabIndex,
        name,
        itemclass,
        itemsPerRowClass,
      ]
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
                {collapsible && (
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
                  />
                )}
                {showcount && (
                  <Typography variant="caption" className="label label-default">
                    {group.data?.length || 0}
                  </Typography>
                )}
              </Box>
            </Box>
          </ListItem>
        );
      },
      [expandedItems, handleGroupClick, collapsible, showcount]
    );
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    if (isLoading) {
      return <div className="loading-state">Loading...</div>;
    }
    if (!localDatasetItems || localDatasetItems.length === 0) {
      return (
        <List className={clsx(DEFAULT_CLASS, itemclass, listclass)} sx={styles}>
          <ListItem>
            <ListItemText primary="No items to display" />
          </ListItem>
        </List>
      );
    }
    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      if (onMouseEnter) {
        onMouseEnter(event, listener?.Widgets[name]);
      }
    };
    const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
      if (onMouseLeave) {
        onMouseLeave(event, listener?.Widgets[name]);
      }
    };
    return (
      <List
        hidden={props.hidden}
        style={styles}
        className={clsx(DEFAULT_CLASS, className, itemclass, listclass)}
        onMouseEnter={event => handleMouseEnter(event)}
        onMouseLeave={event => handleMouseLeave(event)}
        aria-readonly={readonly}
        name={name}
        role="group"
        datafield={datafield}
        displayfield={displayfield}
      >
        {label && (
          <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </Typography>
        )}

        {groupby && groupedDataset.length > 0
          ? groupedDataset.map(group => (
              <List
                component="li"
                className="app-list-item-group"
                role="presentation"
                key={`group_${group.key}`}
              >
                <List
                  component="ul"
                  className={clsx("item-group", { "collapse-open": expandedItems[group.key] })}
                  sx={{ pl: 2 }}
                >
                  {renderGroupHeader(group)}
                  {(!collapsible || expandedItems[group.key]) &&
                    group.data?.map((item, index) => renderCheckboxItem(item, index))}
                </List>
              </List>
            ))
          : localDatasetItems.map((item, index) => renderCheckboxItem(item, index))}
      </List>
    );
  },
  (prev, current) => {
    const keys: (keyof WmCheckboxsetProps)[] = [
      "datavalue",
      "dataset",
      "show",
      "disabled",
      "readonly",
      "orderby",
      "groupby",
      "collapsible",
      "datasetItems",
      "collapsed",
      "onClick",
      "onChange",
      "onMouseEnter",
      "onMouseLeave",
      "getDisplayExpression",
      "datafield",
      "displayfield",
      "dataset",
      "datavalue",
      "usekeys",
      "groupby",
      "hidden",
    ];
    return keys.every(key => {
      if (key === "datasetItems") {
        return isEqual(prev[key], current[key]);
      }
      return prev[key] === current[key];
    });
  }
);
WmCheckboxset.displayName = "WmCheckboxset";
export default withBaseWrapper(withFormController(WmCheckboxset));
