import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import Tooltip from "@mui/material/Tooltip";
import { isEmpty, isEqual } from "lodash-es";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { Box } from "@mui/material";
import { RatingItem, WmRatingProps } from "./props";
import { transformDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

const DEFAULT_MAX_VALUE = 5;
const DEFAULT_ICON_CLASS = {
  active: "wi wi-star",
  inactive: "wi wi-star-border",
};
const DEFAULT_COLORS = {
  inactive: "#ccc",
};

const WmRating = memo((props: WmRatingProps) => {
  const {
    maxvalue = DEFAULT_MAX_VALUE,
    name,
    caption,
    readonly,
    showcaptions = true,
    show = true,
    iconcolor,
    iconsize,
    activeiconclass = DEFAULT_ICON_CLASS.active,
    inactiveiconclass = DEFAULT_ICON_CLASS.inactive,
    datasetItems = [],
    value,
    datafield = "index",
    displayfield,
    displaylabel,
    onChange,
    displayexpression,
    invokeEventCallback = () => {},
    setDatasetItems: propsSetDatasetItems,
    width,
    datavalue,
    height,
    dataset,
    styles,
  } = props;

  // State management
  const [selectedRatingValue, setSelectedRatingValue] = useState<number>(0);
  const [hoveredRatingValue, setHoveredRatingValue] = useState<number | null>(null);
  const [ratingItems, setRatingItems] = useState<RatingItem[]>([]);
  const [currentCaption, setCurrentCaption] = useState<string>(caption || "");
  const [processedDataset, setProcessedDataset] = useState<any[]>([]);
  const [hover, setHover] = useState<Boolean>(false);

  const ratingsRef = useRef<HTMLDivElement>(null);
  const previousValue = useRef<any>(value);

  // Helper functions
  const setDatasetItems = useCallback(
    (items: any[]) => {
      if (propsSetDatasetItems) {
        propsSetDatasetItems(items);
      }
    },
    [propsSetDatasetItems]
  );

  const updateCaptionElement = useCallback((text: string) => {
    setCurrentCaption(text);
  }, []);

  const isStarActive = useCallback(
    (index: number): boolean => {
      return index <= selectedRatingValue;
    },
    [selectedRatingValue]
  );

  const isStarHovered = useCallback(
    (index: number): boolean => {
      return hoveredRatingValue !== null && index <= hoveredRatingValue;
    },
    [hoveredRatingValue]
  );

  const getStarState = useCallback(
    (index: number) => {
      const isActive = isStarActive(index);
      const isHovered = isStarHovered(index);
      return {
        isActive: isActive,
        isHovered: isHovered,
        color: isActive ? iconcolor : isHovered ? iconcolor : DEFAULT_COLORS.inactive,
        iconClass: isActive ? activeiconclass : inactiveiconclass,
        sx: {
          fontSize: iconsize,
          opacity: readonly ? 0.5 : 1,
          pointerEvents: readonly ? ("none" as const) : ("auto" as const),
          transition: "all 0.2s ease-in-out",
          color: isActive ? iconcolor : DEFAULT_COLORS.inactive,
          borderColor: isHovered ? iconcolor : "transparent",
          "& .app-icon": {
            color: "inherit",
          },
        },
      };
    },
    [isStarActive, isStarHovered, iconcolor, activeiconclass, inactiveiconclass, iconsize, readonly]
  );

  // Event handlers
  const invokeOnChange = useCallback(
    (newValue: any) => {
      const oldValue = previousValue.current;

      if (invokeEventCallback) {
        invokeEventCallback("change", { value: newValue, oldValue: oldValue });
      }

      onChange?.(undefined, WmRating, newValue, oldValue);
    },
    [onChange, invokeEventCallback]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredRatingValue(null);
    const selectedItem = ratingItems.find(item => item.index === selectedRatingValue);
    updateCaptionElement(selectedItem ? selectedItem.label : currentCaption || caption || "");
  }, [ratingItems, selectedRatingValue, currentCaption, updateCaptionElement, caption]);

  const handleMouseOver = useCallback(
    (rate: RatingItem) => {
      if (readonly) return;
      setHoveredRatingValue(rate.index);
      updateCaptionElement(rate.label);
    },
    [readonly, updateCaptionElement]
  );

  const handleRatingClick = useCallback(
    (rate: RatingItem) => {
      if (readonly) return;

      const newRating = rate.index === selectedRatingValue ? 0 : rate.index;
      setSelectedRatingValue(newRating);

      if (showcaptions) {
        const selectedItem =
          newRating > 0 ? ratingItems.find(item => item.index === newRating) : null;
        const newCaption = selectedItem ? selectedItem.label : caption || "";
        setCurrentCaption(newCaption);
        updateCaptionElement(newCaption);
      }

      const effectiveDataset = processedDataset.length > 0 ? processedDataset : datasetItems;
      const selectedDatasetItem =
        newRating > 0 ? effectiveDataset.find(item => item.index === newRating) : null;

      if (effectiveDataset.length) {
        const updatedDatasetItems = effectiveDataset.map(item => ({
          ...item,
          selected: item.index === newRating,
        }));
        setDatasetItems(updatedDatasetItems);
      }

      const newValue = newRating > 0 ? selectedDatasetItem?.value || rate.value : 0;
      invokeOnChange(newValue);
      previousValue.current = newValue;
    },
    [
      readonly,
      selectedRatingValue,
      showcaptions,
      ratingItems,
      datasetItems,
      processedDataset,
      setDatasetItems,
      updateCaptionElement,
      invokeOnChange,
      caption,
    ]
  );

  // Data processing
  const processDataset = useCallback(() => {
    if (!dataset) return;

    let processedData: any[] = [];

    if (Array.isArray(dataset)) {
      dataset.forEach((item, idx) => {
        if (typeof item === "string") {
          if (item.includes(",")) {
            const parts = item.split(",").map(part => part.trim());
            processedData = parts.map((part, index) => ({
              index: index + 1,
              value: index + 1,
              label: part,
              key: index + 1,
            }));
          } else {
            processedData.push({
              index: idx + 1,
              value: idx + 1,
              label: item,
              key: idx + 1,
            });
          }
        } else if (typeof item === "object" && item !== null) {
          processedData.push(item);
        }
      });
    }

    setProcessedDataset(processedData);
  }, [dataset]);

  const prepareRatingDataset = useCallback(() => {
    const data = processedDataset.length > 0 ? processedDataset : datasetItems || [];
    const maxVal = Math.min(maxvalue || data.length, 10) || DEFAULT_MAX_VALUE;

    // Use transformDataset utility to create the dataset
    let transformedItems = transformDataset(
      data,
      datafield,
      displayfield,
      displaylabel,
      displayexpression,
      undefined,
      undefined,
      undefined
    ) as RatingItem[];

    // If no data provided, create default numeric rating items
    if (!data.length) {
      transformedItems = Array.from({ length: maxVal }, (_, i) => ({
        key: maxVal - i,
        value: maxVal - i,
        index: maxVal - i,
        label: `${maxVal - i}`,
      }));
    }

    // Sort items by index in descending order to maintain left-to-right star activation
    transformedItems.sort((a, b) => b.index - a.index);

    if (!isEqual(transformedItems, ratingItems)) {
      setRatingItems(transformedItems);
      if (!data.length || (processedDataset.length > 0 && data === processedDataset)) {
        const currentDatasetItems = processedDataset.length > 0 ? processedDataset : datasetItems;
        if (!isEqual(transformedItems, currentDatasetItems)) {
          setDatasetItems(transformedItems);
        }
      }
    }
  }, [
    datasetItems,
    processedDataset,
    maxvalue,
    datafield,
    displayexpression,
    setDatasetItems,
    ratingItems,
    displaylabel,
    displayfield,
  ]);

  const onDatavalueChange = useCallback(
    (dataVal: any) => {
      const effectiveDataset = processedDataset.length > 0 ? processedDataset : datasetItems;

      if (!isEmpty(effectiveDataset)) {
        let selectedItem = effectiveDataset.find(item => item.selected);

        if (!selectedItem && dataVal !== undefined) {
          selectedItem = effectiveDataset.find(
            item =>
              item.index?.toString() === dataVal?.toString() ||
              item.value?.toString() === dataVal?.toString()
          );

          if (selectedItem) {
            const updatedDatasetItems = effectiveDataset.map(item => ({
              ...item,
              selected: item === selectedItem,
            }));
            setDatasetItems(updatedDatasetItems);
          }
        }

        if (!selectedItem) {
          setSelectedRatingValue(0);
          setCurrentCaption(caption || "");
          updateCaptionElement(caption || "");
        } else {
          setSelectedRatingValue(selectedItem.index);
          setCurrentCaption(selectedItem.label);
          updateCaptionElement(selectedItem.label);
        }
      } else {
        if (!isNaN(Number(dataVal))) {
          const rating = Math.min(
            Math.max(parseFloat(dataVal as string), 0),
            maxvalue || DEFAULT_MAX_VALUE
          );
          setSelectedRatingValue(rating);

          const selectedItem = ratingItems.find(item => item.index === rating);
          if (selectedItem) {
            setCurrentCaption(selectedItem.label);
            updateCaptionElement(selectedItem.label);
          } else {
            setCurrentCaption(caption || "");
            updateCaptionElement(caption || "");
          }
        } else {
          setSelectedRatingValue(0);
          setCurrentCaption(caption || "");
          updateCaptionElement(caption || "");
        }
      }
    },
    [
      datasetItems,
      processedDataset,
      maxvalue,
      ratingItems,
      setDatasetItems,
      updateCaptionElement,
      caption,
    ]
  );

  // Effects
  useEffect(() => {
    processDataset();
  }, [processDataset]);

  useEffect(() => {
    prepareRatingDataset();
  }, [prepareRatingDataset]);

  useEffect(() => {
    if (datavalue !== undefined) {
      onDatavalueChange(datavalue);
    }
  }, [datavalue]);

  // Render methods
  const renderStar = (rate: RatingItem) => {
    const { isActive, iconClass, sx } = getStarState(rate.index);

    return (
      <Tooltip key={rate.key} title={rate.label} enterDelay={500} enterNextDelay={500}>
        <Box
          component="label"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            handleRatingClick(rate);
          }}
          onMouseOver={() => handleMouseOver(rate)}
          onMouseLeave={handleMouseLeave}
          sx={sx}
          className={clsx("app-icon-container", isActive && "active")}
        >
          <Box component="i" className={clsx("app-icon", iconClass)} aria-hidden="true" />
          <input
            type="radio"
            role="radio"
            name={name}
            aria-label={(rate.label || rate.index) + " out of " + ratingItems.length + " ratings"}
            aria-checked={isStarActive(rate.index) ? "true" : "false"}
          />
        </Box>
      </Tooltip>
    );
  };

  function showHideOnHover() {
    setHover(!hover);
  }

  return (
    <Box
      hidden={props.hidden}
      sx={{ ...styles, height: height, width: width }}
      className={clsx("app-ratings", { disabled: readonly })}
      ref={ratingsRef}
      tabIndex={props.tabindex ?? 0}
    >
      <Box
        className="ratings-wrapper"
        onMouseEnter={showHideOnHover}
        onMouseLeave={showHideOnHover}
      >
        <Box className="rating-style">{ratingItems.map(renderStar)}</Box>
        {showcaptions && (selectedRatingValue !== 0 || hover) && (
          <label className="caption">
            {currentCaption || caption || (showcaptions ? datavalue : "")}
          </label>
        )}
      </Box>
    </Box>
  );
});

WmRating.displayName = "WmRating";

export default withBaseWrapper(withFormController(WmRating));
