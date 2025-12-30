import React, { memo, useEffect, useMemo, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { transformDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import {
  IProgressInfo,
  TYPE_CLASS_MAP,
} from "@wavemaker/react-runtime/components/basic/progress-bar/props";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmProgressBarProps } from "@wavemaker/react-runtime/components/basic/progress-bar/props";
import {
  getDecimalCount,
  isPercentageValue,
  findValueOf,
} from "@wavemaker/react-runtime/utils/format-util";
import { progressBarConstants } from "@wavemaker/react-runtime/components/constants";

const WmProgressBar = memo(
  (props: WmProgressBarProps) => {
    const {
      type = progressBarConstants.DEFAULT_TYPE,
      datavalue = 30,
      minvalue = progressBarConstants.DEFAULT_MIN_VALUE,
      maxvalue = progressBarConstants.DEFAULT_MAX_VALUE,
      captionplacement = progressBarConstants.DEFAULT_CAPTION_PLACEMENT,
      tabindex,
      arialabel,
      dataset,
      displayformat,
      styles,
      className,
      hint,
      height,
      width,
      listener,
      onClick,
      onDoubleClick,
      onMouseenter,
      onMouseleave,
      ...rest
    } = props;

    const transformedDataset = useMemo(() => {
      const firstItem = dataset?.[0];
      const firstKey = firstItem ? Object.keys(firstItem)[0] : "";
      return transformDataset(dataset, datavalue, firstKey, "", "", "", "", "");
    }, [dataset]);

    const [progressData, setProgressData] = useState<IProgressInfo[]>([
      {
        cls: TYPE_CLASS_MAP[type || "default"],
        progressBarWidth: "0%",
        displayValue: "0",
      },
    ]);

    const getFormattedDisplayVal = useCallback(
      (val: string | number): string => {
        const format = displayformat || "9";
        let formattedValue = parseFloat(String(val)).toFixed(
          getDecimalCount(format, progressBarConstants.DECIMAL_COUNT_MAP)
        );

        if (format.includes("%")) {
          formattedValue += "%";
        }
        return formattedValue;
      },
      [displayformat]
    );

    const prepareData = useCallback(() => {
      if (
        transformedDataset &&
        Array.isArray(transformedDataset) &&
        transformedDataset.length > 0 &&
        type &&
        datavalue
      ) {
        const newProgressData = transformedDataset.map((datum: any): IProgressInfo => {
          const valFromDatum = findValueOf(datum, datavalue as string);
          const valStr = String(valFromDatum?.dataObject?.[datavalue] || datavalue);

          let progressBarWidthStr = valStr;
          if (valStr && !valStr.includes("%")) {
            progressBarWidthStr = `${valStr}%`;
          }
          const cls = TYPE_CLASS_MAP[type];

          const displayValue = getFormattedDisplayVal(valStr);

          return {
            cls: cls,
            progressBarWidth: progressBarWidthStr,
            displayValue: displayValue,
          };
        });
        setProgressData(newProgressData);
      } else {
        let calculatedWidth: string = "0%";
        let valueForDisplayFormat: string | number = 0;

        if (datavalue !== undefined && datavalue !== null) {
          const datavalueStr = String(datavalue);
          if (isPercentageValue(datavalueStr)) {
            calculatedWidth = datavalueStr || "0%";
            valueForDisplayFormat = datavalueStr;
          } else {
            const denominator = Number(maxvalue) - Number(minvalue) || 1;
            calculatedWidth = `${((Number(datavalueStr) - Number(minvalue)) * 100) / denominator}%`;
            valueForDisplayFormat = calculatedWidth;
          }
        }
        setProgressData([
          {
            displayValue: getFormattedDisplayVal(String(valueForDisplayFormat)),
            progressBarWidth: calculatedWidth,
            cls: TYPE_CLASS_MAP[type || "default"],
          },
        ]);
      }
    }, [
      transformedDataset,
      datavalue,
      type,
      minvalue,
      maxvalue,
      getFormattedDisplayVal,
      setProgressData,
    ]);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        onClick?.(event, props);

        if (listener?.onChange) {
          listener.onChange(props.name, {
            datavalue: datavalue,
          });
        }
      },
      [onClick, listener, datavalue, props]
    );

    const handleDoubleClick = useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        onDoubleClick?.(event, props);
      },
      [onDoubleClick]
    );

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        onMouseenter?.(event, props);
      },
      [onMouseenter]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        onMouseleave?.(event, props);
      },
      [onMouseleave]
    );

    useEffect(() => {
      prepareData();
    }, [prepareData]);

    const events = {
      ...(onClick ? { onClick: handleClick } : {}),
      ...(onDoubleClick ? { onDoubleClick: handleDoubleClick } : {}),
      ...(onMouseenter ? { onMouseEnter: handleMouseEnter } : {}),
      ...(onMouseleave ? { onMouseLeave: handleMouseLeave } : {}),
    };
    return (
      <Box
        className={clsx(progressBarConstants.DEFAULT_CLASS, className)}
        {...rest}
        style={styles}
        aria-label={arialabel}
        title={hint}
      >
        {progressData.map((bar, index) => (
          <Box
            {...events}
            role="progressbar"
            key={index}
            className={`multi-bar ${bar.cls}`}
            style={{ width: bar.progressBarWidth }}
            aria-valuenow={bar.displayValue}
            aria-valuemin={minvalue}
            aria-valuemax={maxvalue}
            tabIndex={tabindex}
          >
            {captionplacement === "inside" && (
              <Box
                component="span"
                className="app-progress-label"
                data-caption-placement={captionplacement}
              >
                {bar.displayValue}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    );
  },
  (prev, current) => {
    return (
      prev.datavalue === current.datavalue &&
      prev.type === current.type &&
      prev.height === current.height &&
      prev.width === current.width &&
      JSON.stringify(prev.dataset) === JSON.stringify(current.dataset) &&
      prev.minvalue === current.minvalue &&
      prev.maxvalue === current.maxvalue &&
      prev.hidden === current.hidden
    );
  }
);

WmProgressBar.displayName = "WmProgressBar";

export default withBaseWrapper(WmProgressBar);
