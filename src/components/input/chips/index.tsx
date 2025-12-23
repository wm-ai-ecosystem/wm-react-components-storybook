import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import clsx from "clsx";
import { debounce, isEqual, toString, trim, find, slice } from "lodash";
import WmSearch from "@wavemaker/react-runtime/components/basic/search";
import { WmChipsProps, DataSetItem, ChipItem } from "./props";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import SortableChip from "./SortableChip";
import { generateStableKey, processDataset, performAddItem, performRemoveItem } from "./utils";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

const DEFAULT_CLASS = "app-chips nav nav-pills list-inline";

const WmChips = React.forwardRef<HTMLDivElement, WmChipsProps>((props, ref) => {
  const {
    allowonlyselect = false,
    autofocus = false,
    chipclass = "",
    className = "",
    datafield = "All Fields",
    dataset = ["Option 1", "Option 2", "Option 3"],
    datavalue,
    dateformat,
    disabled = false,
    displayexpression,
    displayfield,
    displayimagesrc,
    enablereorder = false,
    groupby,
    inputposition = "last",
    inputwidth = "default",
    limit,
    match,
    matchmode = "contains",
    maxsize,
    minchars = 1,
    name,
    orderby,
    placeholder = "Type here..",
    readonly = false,
    searchkey,
    showsearchicon = false,
    tabindex = 0,
    type = "search",
    debouncetime = 250,
    datacompletemsg = "No more data to load",
    width,
    height,
    styles = {},
    listener,
    // Event handlers
    onAdd,
    onBeforeadd,
    onBeforeremove,
    onBeforereorder,
    onBeforeservicecall,
    onChipclick,
    onChipselect,
    onChange,
    onRemove,
    onReorder,
    dataPath,
  } = props;

  // State management
  const [chipsList, setChipsList] = useState<ChipItem[]>([]);
  const [saturate, setSaturate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modelByValue, setModelByValue] = useState<any[]>([]);
  const [datasetItems, setDatasetItems] = useState<DataSetItem[]>([]);
  const [uniqueKeyCounter, setUniqueKeyCounter] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Computed values
  const maxSizeReached = "Max size reached";
  const isFullWidth = inputwidth === "full";

  // Generate stable unique key that doesn't change on re-renders
  const generateStableKeyCb = useCallback(
    (item: any, index: number) => {
      return generateStableKey(item, index, datafield);
    },
    [datafield]
  );

  // Generate unique key for new chips (only when adding new items)
  const generateUniqueKey = useCallback(() => {
    const key = `chip_new_${uniqueKeyCounter}`;
    setUniqueKeyCounter(prev => prev + 1);
    return key;
  }, [uniqueKeyCounter]);

  const processDatasetCb = useCallback(
    (data: any) => {
      return processDataset(
        data,
        displayfield,
        displayexpression,
        displayimagesrc,
        datafield,
        generateStableKeyCb
      );
    },
    [displayfield, displayexpression, displayimagesrc, datafield, generateStableKeyCb]
  );

  useEffect(() => {
    const items = processDatasetCb(dataset);
    setDatasetItems(items);
    setIsInitialized(true);
  }, [dataset]);

  const createCustomDataModel = useCallback(
    (val: string) => {
      const fieldKey = displayfield || "label";
      const customObj: any = {};
      customObj[fieldKey] = val;
      customObj._uniqueKey = generateUniqueKey();
      return customObj;
    },
    [displayfield, generateUniqueKey]
  );

  const updateMaxSize = useCallback(
    (currentLength?: number) => {
      const length = currentLength !== undefined ? currentLength : chipsList.length;
      setSaturate(maxsize > 0 && length === maxsize);
    },
    [maxsize, chipsList.length]
  );

  const updateQueryModel = useCallback(
    async (data: any) => {
      if (!data || !isInitialized) {
        setChipsList([]);
        setModelByValue([]);
        return;
      }
      let dataValue: any[];
      if (typeof data === "string") {
        dataValue = data.split(",");
      } else if (Array.isArray(data)) {
        dataValue = [...data];
      } else {
        dataValue = [data];
      }
      setChipsList([]);
      if (maxsize && dataValue.length > maxsize) {
        dataValue = slice(dataValue, 0, maxsize);
      }
      const newChipsList: ChipItem[] = [];
      const searchQuery: Array<string> = [];
      dataValue.forEach((val: any, i: number) => {
        const itemFound = find(datasetItems, item => {
          const value_obj = val.dataObject ? val.dataObject : val;
          return isEqual(item.value, value_obj);
        });
        if (itemFound) {
          newChipsList.push({
            ...itemFound,
            key: generateStableKeyCb(itemFound.value, i), // Use stable key for dataset items
            active: false,
            isDuplicate: false,
            imgSrc: itemFound.displayImage,
            iscustom: false,
          });
        } else if (datafield === "All Fields") {
          let dataObj = val;
          let isCustom = false;
          if (!isEqual(val, dataObj)) {
            dataObj = createCustomDataModel(val);
            isCustom = true;
            if (dataObj) {
              dataValue[i] = dataObj;
            }
          }
          const finalDataObj = dataObj || val;
          const chipObj: ChipItem = {
            key: generateStableKeyCb(finalDataObj, i),
            value: finalDataObj,
            label: isCustom
              ? val
              : finalDataObj[displayfield || "label" || Object.keys(finalDataObj)[0]] || "",
            displayValue: isCustom
              ? val
              : finalDataObj[displayfield || Object.keys(finalDataObj)[0]] || "",
            displayImage: null,
            dataObject: finalDataObj,
            active: false,
            isDuplicate: false,
            imgSrc: null,
            iscustom: isCustom,
          };
          newChipsList.push(chipObj);
        } else {
          searchQuery.push(val);
        }
      });
      if (searchQuery.length && datafield !== "All Fields") {
        searchQuery.forEach((val, searchIndex) => {
          const chipObj: ChipItem = {
            key: generateStableKeyCb(val, newChipsList.length + searchIndex),
            value: val,
            label: String(val),
            displayValue: String(val),
            displayImage: null,
            dataObject: val,
            active: false,
            isDuplicate: false,
            imgSrc: null,
            iscustom: true,
          };
          newChipsList.push(chipObj);
        });
      }
      setChipsList(newChipsList);
      setModelByValue(dataValue);
      updateMaxSize(newChipsList.length);
    },
    [
      datasetItems,
      maxsize,
      datafield,
      displayfield,
      generateStableKeyCb,
      createCustomDataModel,
      isInitialized,
    ]
  );

  const debouncedUpdateQueryModel = useMemo(() => {
    return debounce(updateQueryModel, 150);
  }, [updateQueryModel]);

  useEffect(() => {
    if (isInitialized && datavalue !== undefined) {
      debouncedUpdateQueryModel(datavalue);
    }
  }, [datavalue, debouncedUpdateQueryModel]);

  const addItem = useCallback(
    (newItem: DataSetItem | string) => {
      performAddItem(
        newItem,
        chipsList,
        modelByValue,
        setChipsList,
        setModelByValue,
        setSearchQuery,
        updateMaxSize,
        listener,
        name,
        datafield,
        displayfield,
        createCustomDataModel,
        generateUniqueKey,
        maxsize,
        onBeforeadd,
        onChange,
        onAdd,
        props
      );
    },
    [
      chipsList,
      modelByValue,
      updateMaxSize,
      onChange,
      onAdd,
      onBeforeadd,
      listener,
      name,
      datafield,
      displayfield,
      createCustomDataModel,
      generateUniqueKey,
      maxsize,
      props,
    ]
  );

  const removeItem = useCallback(
    (event: React.MouseEvent, item: ChipItem, index: number) => {
      performRemoveItem(
        event,
        item,
        index,
        chipsList,
        modelByValue,
        setChipsList,
        setModelByValue,
        updateMaxSize,
        listener,
        name,
        onBeforeremove,
        onChange,
        onRemove,
        props
      );
    },
    [
      chipsList,
      modelByValue,
      updateMaxSize,
      onChange,
      onRemove,
      onBeforeremove,
      listener,
      name,
      props,
    ]
  );

  const handleChipClick = useCallback(
    (event: React.MouseEvent, chip: ChipItem, index: number) => {
      if (readonly) return;
      if (onChipclick && listener?.Widgets && name && name in listener.Widgets) {
        onChipclick(event as any, listener.Widgets[name], chip);
      }
    },
    [readonly, onChipclick, listener, name]
  );

  const handleChipSelect = useCallback(
    (chip: ChipItem, index: number) => {
      if (readonly) return;
      const newChipsList = chipsList.map((item, i) => ({
        ...item,
        active: i === index,
      }));
      setChipsList(newChipsList);
      if (onChipselect && listener?.Widgets && name && name in listener.Widgets) {
        onChipselect(new MouseEvent("focus") as any, listener.Widgets[name], chip);
      }
    },
    [readonly, chipsList, onChipselect, listener, name]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index?: number) => {
      if (readonly) return;
      if ((event.key == "Backspace" || event.key == "Delete") && index !== undefined) {
        removeItem(event as unknown as React.MouseEvent, chipsList[index], index);
      }
    },
    [readonly, chipsList, removeItem]
  );

  const handleSearchSelect = useCallback(
    (event: any, widget: any, selectedValue: any) => {
      if (selectedValue) {
        addItem(selectedValue);
        setSearchQuery("");
      }
    },
    [addItem]
  );

  const handleSearchSubmit = useCallback(
    (event: any, widget: any) => {
      const currentQuery = widget?.query || searchQuery;
      const trimmedQuery = trim(currentQuery);
      if (!trimmedQuery) return;
      if (allowonlyselect) return;
      if (maxsize && chipsList.length >= maxsize) return;
      addItem(trimmedQuery);
    },
    [searchQuery, allowonlyselect, addItem, maxsize, chipsList.length]
  );

  const handleSearchChange = useCallback((event: any, widget: any, newValue: string) => {
    setSearchQuery(newValue || "");
  }, []);

  const handleSearchAction = useCallback(
    (event: any, widget: any) => {
      const currentQuery = widget?.query || searchQuery;
      const trimmedQuery = trim(currentQuery);
      if (!trimmedQuery) return;
      if (allowonlyselect) return;
      if (maxsize && chipsList.length >= maxsize) return;
      addItem(trimmedQuery);
    },
    [searchQuery, allowonlyselect, addItem, maxsize, chipsList.length]
  );

  const handleSearchKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        const inputElement = event.target as HTMLInputElement;
        const currentQuery = inputElement?.value || searchQuery || "";
        const trimmedQuery = trim(currentQuery);
        if (!trimmedQuery) {
          return;
        }
        if (allowonlyselect) {
          return;
        }
        if (maxsize && chipsList.length >= maxsize) {
          return;
        }
      }
    },
    [searchQuery, allowonlyselect, maxsize, chipsList.length]
  );

  const renderChipsList = () => {
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: { distance: 5 },
      })
    );
    const handleDndEnd = (event: any) => {
      const { active, over } = event;
      if (!over || !enablereorder) return;
      if (active.id === over.id) return;
      const oldIndex = chipsList.findIndex(chip => chip.key === active.id);
      const newIndex = chipsList.findIndex(chip => chip.key === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const newChipsList = arrayMove(chipsList, oldIndex, newIndex);
      const changedItem = { oldIndex, newIndex, item: newChipsList[newIndex] };
      if (onBeforereorder && listener?.Widgets && name && name in listener.Widgets) {
        const allowReorder = onBeforereorder(
          new MouseEvent("dragend") as any,
          listener.Widgets[name],
          newChipsList,
          changedItem
        );
        if (allowReorder === false) {
          return;
        }
      }
      const newModelByValue = arrayMove(modelByValue, oldIndex, newIndex);
      setChipsList(newChipsList);
      setModelByValue(newModelByValue);
      if (onChange && listener?.Widgets && name && name in listener.Widgets) {
        onChange(
          new MouseEvent("dragend") as any,
          listener.Widgets[name],
          newModelByValue,
          modelByValue
        );
      }
      if (onReorder && listener?.Widgets && name && name in listener.Widgets) {
        onReorder(
          new MouseEvent("dragend") as any,
          listener.Widgets[name],
          newChipsList,
          changedItem
        );
      }
    };
    if (enablereorder && !readonly && !disabled) {
      return (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDndEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext
            items={chipsList.map(chip => chip.key)}
            strategy={horizontalListSortingStrategy}
          >
            <Box
              component="ul"
              display="flex"
              flexWrap="wrap"
              gap={1}
              className={DEFAULT_CLASS}
              name={name}
            >
              {inputposition === "first" && renderSearchInput()}
              {chipsList.map((chip, index) => (
                <SortableChip
                  key={chip.key}
                  chip={chip}
                  index={index}
                  readonly={readonly}
                  disabled={disabled}
                  chipclass={chipclass}
                  enablereorder={enablereorder}
                  handleChipClick={handleChipClick}
                  handleChipSelect={handleChipSelect}
                  handleKeyDown={handleKeyDown}
                  removeItem={removeItem}
                  chipsList={chipsList}
                  setChipsList={setChipsList}
                />
              ))}
              {inputposition === "last" && renderSearchInput()}
            </Box>
          </SortableContext>
        </DndContext>
      );
    }
    return (
      <Box
        component="ul"
        display="flex"
        flexWrap="wrap"
        gap={1}
        className={DEFAULT_CLASS}
        name={name}
        aria-readonly={readonly}
        readonly={readonly}
      >
        {inputposition === "first" && renderSearchInput()}
        {chipsList.map((chip, index) => (
          <SortableChip
            key={chip.key}
            chip={chip}
            index={index}
            readonly={readonly}
            disabled={disabled}
            chipclass={chipclass}
            enablereorder={false}
            handleChipClick={handleChipClick}
            handleChipSelect={handleChipSelect}
            handleKeyDown={handleKeyDown}
            removeItem={removeItem}
            chipsList={chipsList}
            setChipsList={setChipsList}
          />
        ))}
        {inputposition === "last" && renderSearchInput()}
      </Box>
    );
  };

  const renderSearchInput = () => {
    return (
      <Box
        component="li"
        className={clsx("app-chip-search", className, { "full-width": isFullWidth })}
      >
        <WmSearch
          name={"app-chip-search"}
          disabled={disabled || saturate}
          readonly={readonly}
          datafield={datafield}
          searchkey={searchkey}
          orderby={orderby}
          placeholder={saturate ? maxSizeReached : placeholder}
          showsearchicon={showsearchicon}
          tabindex={tabindex}
          minchars={minchars}
          debouncetime={debouncetime}
          matchmode={matchmode}
          datacompletemsg={datacompletemsg}
          groupby={groupby}
          match={match}
          dateformat={dateformat}
          dataset={dataset}
          displayfield={displayfield}
          displayexpression={displayexpression}
          displayimagesrc={displayimagesrc}
          type={type}
          limit={limit}
          datavalue={searchQuery}
          onSelect={handleSearchSelect}
          onSubmit={handleSearchSubmit}
          onSearch={handleSearchAction}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onBeforeservicecall={onBeforeservicecall}
          listener={listener}
          class="app-chip-input"
          width={isFullWidth ? "100%" : undefined}
          autofocus={autofocus}
          dataPath={dataPath}
        />
      </Box>
    );
  };
  return (
    <Box
      hidden={props.hidden ?? false}
      ref={ref}
      component="div"
      style={{ width: width, height: height, ...styles }}
    >
      {renderChipsList()}
    </Box>
  );
});

WmChips.displayName = "WmChips";

export default withBaseWrapper(withFormController(WmChips));
