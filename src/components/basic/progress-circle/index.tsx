import React, { useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";

import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { TYPE_CLASS_MAP_PC, WmProgressCircleProps } from "./props";
import { progressBarConstants } from "../../constants";

const WmProgressCircle = (props: WmProgressCircleProps) => {
  const {
    datavalue = "30",
    minvalue = progressBarConstants.DEFAULT_MIN_VALUE,
    maxvalue = progressBarConstants.DEFAULT_MAX_VALUE,
    type = progressBarConstants.DEFAULT_TYPE,
    displayformat = "9%",
    captionplacement = "inside",
    title,
    subtitle,
    className = "",
    arialabel,
    tabindex = 0,
    hint,
    name,
    listener,
    onClick,
    onDoubleClick,
    onMouseEnter,
    onMouseLeave,
    onBeforerender,
    styles = {},
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize core calculations
  const {
    percentageValue,
    displayValue,
    progressColor,
    strokeWidth,
    normalizedRadius,
    circumference,
    strokeDashoffset,
    isPercent,
    progressPath,
  } = useMemo(() => {
    // Calculate percentage
    const value = typeof datavalue === "string" ? parseFloat(datavalue) : datavalue;
    const percent = ((value - minvalue) / (maxvalue - minvalue)) * 100;
    const percentageVal = Math.min(Math.max(percent, 0), 100);

    // Format display value
    const decimalPlaces =
      progressBarConstants.DECIMAL_COUNT_MAP[
        displayformat as keyof typeof progressBarConstants.DECIMAL_COUNT_MAP
      ];
    const isPercent = displayformat.includes("%");
    const displayVal = percentageVal.toFixed(decimalPlaces);

    const stroke = 5;
    const radius = 45;
    const normalized = radius - stroke / 2;
    const circum = normalized * 2 * Math.PI;
    const offset = circum - (percentageVal / 100) * circum;

    // Calculate the path for the progress arc
    const angle = (percentageVal / 100) * 360;
    const rad = ((angle - 90) * Math.PI) / 180;
    const x = 50 + normalized * Math.cos(rad);
    const y = 50 + normalized * Math.sin(rad);
    const largeArcFlag = angle > 180 ? 1 : 0;
    const path = `M 50,${50 - normalized} A ${normalized} ${normalized} 0 ${largeArcFlag} 1 ${x} ${y}`;

    return {
      percentageValue: percentageVal,
      displayValue: displayVal,
      progressColor:
        type !== "default"
          ? `var(--wm-progress-circle-${type}-stroke-active)`
          : "var(--wm-progress-circle-stroke-active)",
      strokeWidth: stroke,
      normalizedRadius: normalized,
      circumference: circum,
      strokeDashoffset: offset,
      isPercent,
      progressPath: path,
    };
  }, [datavalue, minvalue, maxvalue, type, displayformat]);

  // Default styles if not provided
  const finalStyles = {
    width: "150px",
    height: "150px",
    ...styles,
  };

  useEffect(() => {
    listener.onChange(name, {
      percentagevalue: percentageValue,
    });
    onBeforerender?.(listener, listener?.Widgets[name]);
  }, [percentageValue]);

  return (
    <Box
      component="div"
      ref={containerRef}
      className={`progress app-progress circle ${TYPE_CLASS_MAP_PC[type]} ${className}`}
      aria-label={arialabel}
      onClick={e => onClick?.(e, props)}
      onDoubleClick={e => onDoubleClick?.(e, props)}
      onMouseEnter={e => onMouseEnter?.(e, props)}
      onMouseLeave={e => onMouseLeave?.(e, props)}
      tabIndex={tabindex}
      aria-valuenow={percentageValue}
      aria-valuemin={minvalue}
      aria-valuemax={maxvalue}
      role="progressbar"
      title={hint}
      style={finalStyles}
    >
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Background circle */}
        <circle fill="transparent" strokeWidth={strokeWidth} r={normalizedRadius} cx="50" cy="50" />

        {/* Progress path */}
        <path
          d={progressPath}
          fill="none"
          strokeWidth={strokeWidth}
          style={{
            stroke: progressColor,
            strokeLinecap: "round",
            transition: "all 0.3s ease",
          }}
        />

        {/* SVG Text Content */}
        {captionplacement === "inside" && (
          <>
            {!title && (
              <text x="50" y="50" textAnchor="middle">
                <tspan x="50" y="55" fontWeight="normal" style={{ fontSize: "0.70em" }}>
                  {displayValue}
                </tspan>
                <tspan fontWeight="normal" style={{ fontSize: "0.45em" }}>
                  {isPercent ? "%" : ""}
                </tspan>
              </text>
            )}

            {title && (
              <text x="50" y={subtitle ? "40" : "50"} textAnchor="middle">
                <tspan
                  x="50"
                  y={subtitle ? "40" : "50"}
                  fontWeight="400"
                  style={{ fontSize: "0.70em" }}
                >
                  {title}
                </tspan>
              </text>
            )}

            {subtitle && (
              <text x="50" y="60" textAnchor="middle">
                <tspan x="50" y="60" fontWeight="400" style={{ fontSize: "0.70em" }}>
                  {subtitle}
                </tspan>
              </text>
            )}
          </>
        )}
      </svg>
    </Box>
  );
};

WmProgressCircle.displayName = "WmProgressCircle";

export default withBaseWrapper(WmProgressCircle);
